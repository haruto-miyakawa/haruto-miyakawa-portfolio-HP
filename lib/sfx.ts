// /play 用の効果音エンジン。ZzFX(MIT) で波形を生成し、自前の AudioContext で再生する。
//
// 設計方針:
// - クライアント専用。SSR では何もしない（window は遅延参照）。
//   ※ ZzFX.js はモジュール評価時に new AudioContext するため、zzfx は必ず
//      クライアントで「動的 import」する（SSR で評価するとクラッシュするため）。
// - 【ラグ/取りこぼし対策（最重要）】波形サンプルを「ジェスチャより前」に事前生成して
//   キャッシュ（ZZFX.buildSamples は AudioContext 不要の純関数）。AudioBuffer は再生時に
//   キャッシュ済みサンプルから同期でオンデマンド生成（getBuffer）。これにより、ランタン進入や
//   もどる等の「ワンショットが init と同時に発火」しても、動的 import の解決を待たずに即鳴る。
//   旧実装は buildBuffers が動的 import の後（非同期）だったため、init 直後に撃つ enter/return は
//   buffers[key]===undefined で無音 return されていた（examine は後から撃つので鳴っていた）。
// - 単一 AudioContext ＋ マスター GainNode 1 つに全 SFX を通す（音量/ミュート一元）。
//   latencyHint:"interactive" で出力遅延を最小化。
// - autoplay 制約: 最初のユーザー操作（pointerdown/touchend/keydown）で resume＋iOS 無音再生。
//   unlock 前 / ミュート時の playSfx は無音で握りつぶす。
// - ミュートは localStorage("sfx-muted") に永続。【デフォルト OFF=ミュート】（"0" のときだけ ON）。
//   オフは master.gain=0 で実装。prefers-reduced-motion とは独立。
// - 金属ランタン音(enter)は public/sfx のファイルがあれば優先、無ければ ZzFX シンセにフォールバック。

export type SfxKey = "examine" | "return" | "enter";

export const SFX_MUTE_KEY = "sfx-muted";
export const SFX_NOTICE_KEY = "sfx-notice-seen";

// 金属ランタン音の差し替え用パス。ここに CC0 の音源(mp3 など)を置くと自動で優先使用される。
const LANTERN_SFX_URL = "/sfx/lantern.mp3";

const MASTER_GAIN = 0.5;
const SAMPLE_RATE = 44100;

// ── ZzFX パラメータ（buildSamples の 21 引数順）──────────────────────────────
// volume, randomness, frequency, attack, sustain, release, shape(0:sine),
// shapeCurve, slide, deltaSlide, pitchJump, pitchJumpTime, repeatTime, noise,
// modulation, bitCrush, delay, sustainVolume, decay, tremolo, filter
// UI音はサイン波(shape=0)で統一。attack>0・短release・高域控えめ＝温かく刺さらない音。
const PARAMS: Record<SfxKey, number[]> = {
  // (a) しらべる: 明るすぎない確定音。+pitchJump で「わずかに上昇する2音感」。
  examine: [1, 0.05, 480, 0.012, 0.05, 0.14, 0, 1, 0, 0, 150, 0.07],
  // (d) PRO復帰: サインを下降させた離脱音（pitchJump マイナス）。
  return: [0.85, 0.05, 440, 0.012, 0.04, 0.18, 0, 1, 0, 0, -180, 0.06],
  // (c) GAME進入: 金属ランプを動かす音の暫定シンセ（saw＋少量noise＋modulation＋短い）。
  //     public/sfx/lantern.mp3 を置けば自動で実録音に差し替わる。
  enter: [1, 0.05, 720, 0, 0.01, 0.16, 2, 1, 0, 0, 0, 0, 0.03, 0.05, 9, 0, 0, 0.4, 0.09],
};

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let unlocked = false;
let unlockBound = false;
let prerenderStarted = false;
let lanternUpgradeStarted = false;
const sampleCache: Partial<Record<SfxKey, Float32Array>> = {};
const buffers: Partial<Record<SfxKey, AudioBuffer>> = {};

const isClient = (): boolean => typeof window !== "undefined";

/** 波形サンプルを事前生成してキャッシュ（AudioContext 不要・dynamic import）。
 *  ジェスチャより前に済ませることで、再生時の非同期待ち＝取りこぼしを無くす。 */
async function prerenderSamples(): Promise<void> {
  if (prerenderStarted || !isClient()) return;
  prerenderStarted = true;
  let ZZFX: typeof import("zzfx").ZZFX;
  try {
    ({ ZZFX } = await import("zzfx"));
  } catch {
    prerenderStarted = false;
    return;
  }
  // zzfx が内部で作る未使用の AudioContext は破棄（自前 ctx に一本化）。
  try {
    ZZFX.audioContext?.close?.();
  } catch {
    /* no-op */
  }
  (Object.keys(PARAMS) as SfxKey[]).forEach((k) => {
    try {
      const s = ZZFX.buildSamples(...PARAMS[k]);
      if (s && s.length) sampleCache[k] = Float32Array.from(s);
    } catch {
      /* この音だけスキップ */
    }
  });
  buildBuffersFromCache(); // ctx が既にあれば即バッファ化
}

/** キャッシュ済みサンプルから AudioBuffer を同期生成（必要時にオンデマンド）。 */
function getBuffer(key: SfxKey): AudioBuffer | null {
  const existing = buffers[key];
  if (existing) return existing;
  if (!ctx) return null;
  const s = sampleCache[key];
  if (!s || s.length === 0) return null;
  const b = ctx.createBuffer(1, s.length, SAMPLE_RATE);
  b.getChannelData(0).set(s);
  buffers[key] = b;
  return b;
}

function buildBuffersFromCache(): void {
  if (!ctx) return;
  (Object.keys(sampleCache) as SfxKey[]).forEach((k) => getBuffer(k));
}

/** 金属ランタン音: ファイルがあれば decode して差し替え（無ければシンセのまま）。任意・後追い。 */
async function upgradeLanternFromFile(): Promise<void> {
  if (lanternUpgradeStarted || !ctx) return;
  lanternUpgradeStarted = true;
  try {
    const res = await fetch(LANTERN_SFX_URL);
    if (res.ok && ctx) {
      buffers.enter = await ctx.decodeAudioData(await res.arrayBuffer());
    }
  } catch {
    /* ファイル無し: シンセのフォールバックを使う */
  }
}

/** 自前 AudioContext とマスター Gain を同期生成（ジェスチャ内で呼ぶ）。 */
function ensureCtx(): void {
  if (ctx || !isClient()) return;
  const AC =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  // latencyHint: "interactive" で出力バッファを最小化し、start()〜可聴の遅延を抑える。
  ctx = new AC({ latencyHint: "interactive" });
  master = ctx.createGain();
  master.gain.value = isSfxMuted() ? 0 : MASTER_GAIN;
  master.connect(ctx.destination);
  buildBuffersFromCache(); // 事前生成済みサンプルがあれば同期でバッファ化
  void upgradeLanternFromFile();
}

/** AudioContext を作って解錠（必ずユーザー操作＝ジェスチャ内で呼ぶ）。冪等。 */
function init(): void {
  void prerenderSamples(); // まだなら事前生成を開始
  ensureCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") void ctx.resume().catch(() => {});
  // iOS Safari: ジェスチャ内で無音 1 サンプルを鳴らして出力を確実に解錠。
  try {
    const warm = ctx.createBufferSource();
    warm.buffer = ctx.createBuffer(1, 1, 22050);
    warm.connect(ctx.destination);
    warm.start(0);
  } catch {
    /* no-op */
  }
}

/** 最初のユーザー操作で解錠。音オフ（デフォルト）の間は AudioContext を生成しない。 */
function unlock(): void {
  if (!isClient()) return;
  unlocked = true;
  if (!isSfxMuted()) init();
  window.removeEventListener("pointerdown", unlock);
  window.removeEventListener("touchend", unlock);
  window.removeEventListener("keydown", unlock);
}

function bindUnlock(): void {
  if (unlockBound || !isClient()) return;
  unlockBound = true;
  window.addEventListener("pointerdown", unlock, { passive: true });
  window.addEventListener("touchend", unlock, { passive: true });
  window.addEventListener("keydown", unlock);
}

// ── ミュート（デフォルト OFF=ミュート。"0" のときだけ ON）─────────────────────
export function isSfxMuted(): boolean {
  if (!isClient()) return true;
  try {
    return localStorage.getItem(SFX_MUTE_KEY) !== "0";
  } catch {
    return true;
  }
}

export function setSfxMuted(muted: boolean): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(SFX_MUTE_KEY, muted ? "1" : "0");
  } catch {
    /* private browsing */
  }
  // 音を ON にした瞬間に事前生成＋初期化（このコールはトグルのクリック＝ジェスチャ内）。
  if (!muted) {
    unlocked = true;
    void prerenderSamples();
    init();
  }
  // マスター Gain で即時反映（軽いランプでプチノイズ回避）。
  if (ctx && master) {
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(muted ? 0 : MASTER_GAIN, now + 0.03);
  }
}

// ── 告知UI（初回のみ表示）─────────────────────────────────────────────────────
export function hasSeenSfxNotice(): boolean {
  if (!isClient()) return true;
  try {
    return localStorage.getItem(SFX_NOTICE_KEY) === "1";
  } catch {
    return true;
  }
}

export function markSfxNoticeSeen(): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(SFX_NOTICE_KEY, "1");
  } catch {
    /* private browsing */
  }
}

/** 効果音を鳴らす。unlock 前 / ミュート時は無音で握りつぶす（例外なし）。
 *  バッファは getBuffer で同期生成済み/オンデマンド取得＝再生時の非同期待ちなし。 */
export function playSfx(key: SfxKey): void {
  if (!isClient() || !unlocked || isSfxMuted() || !ctx || !master) return;
  if (ctx.state === "suspended") void ctx.resume().catch(() => {});
  const buf = getBuffer(key);
  if (!buf) return;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.playbackRate.value = 1 + (Math.random() * 2 - 1) * 0.05; // ±5% で反復感を消す
  src.connect(master);
  try {
    src.start();
  } catch {
    /* no-op */
  }
}

// クライアントで import された時点で: unlock リスナーを張る＋音 ON 設定なら事前生成を先行。
if (isClient()) {
  bindUnlock();
  if (!isSfxMuted()) void prerenderSamples();
}
