// /play 用の効果音エンジン。ZzFX(MIT) で波形を生成し、自前の AudioContext で再生する。
//
// 設計方針:
// - クライアント専用。SSR では何もしない（window は遅延参照）。
//   ※ ZzFX.js はモジュール評価時に new AudioContext するため、zzfx は必ず
//      クライアントで「動的 import」する（SSR で評価するとクラッシュするため）。
// - ラグ解消: 初回 unlock 時に全 SFX を一度だけ AudioBuffer 化してキャッシュ。
//   再生はキャッシュ済みバッファを使い捨て BufferSource で鳴らすだけ（波形生成しない）。
//   playbackRate を ±5% ランダム化して機械的反復を防ぐ。
// - 単一 AudioContext ＋ マスター GainNode 1 つに全 SFX を通す（音量/ミュート一元）。
// - autoplay 制約: 最初のユーザー操作（pointerdown / touchend / keydown）で
//   AudioContext を resume＋iOS 用に無音 1 サンプル再生。これは「ジェスチャ内で同期」実行する
//   （zzfx の動的 import 解決を待たない）。unlock 前 / ミュート時の playSfx は無音で握りつぶす。
// - ミュートは localStorage("sfx-muted") に永続。【デフォルト OFF=ミュート】（"0" のときだけ ON）。
//   オフは master.gain=0 で実装。prefers-reduced-motion とは独立（音はモーションではない）。
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
let buffersBuilt = false;
const buffers: Partial<Record<SfxKey, AudioBuffer>> = {};

const isClient = (): boolean => typeof window !== "undefined";

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
}

function bufferFromSamples(samples: number[]): AudioBuffer | null {
  if (!ctx || samples.length === 0) return null;
  const b = ctx.createBuffer(1, samples.length, SAMPLE_RATE);
  b.getChannelData(0).set(samples);
  return b;
}

/** zzfx を動的 import して全 SFX バッファを一度だけ構築（非同期）。 */
async function buildBuffers(): Promise<void> {
  if (buffersBuilt || !ctx) return;
  buffersBuilt = true;
  let ZZFX: typeof import("zzfx").ZZFX;
  try {
    ({ ZZFX } = await import("zzfx"));
  } catch {
    buffersBuilt = false;
    return;
  }
  // zzfx が内部で作る未使用の AudioContext は破棄（自前 ctx に一本化）。
  try {
    ZZFX.audioContext?.close?.();
  } catch {
    /* no-op */
  }
  (Object.keys(PARAMS) as SfxKey[]).forEach((k) => {
    const buf = bufferFromSamples(ZZFX.buildSamples(...PARAMS[k]));
    if (buf) buffers[k] = buf;
  });
  // 金属ランタン音: ファイルがあれば decode して差し替え（無ければシンセのまま）。
  try {
    const res = await fetch(LANTERN_SFX_URL);
    if (res.ok && ctx) {
      const decoded = await ctx.decodeAudioData(await res.arrayBuffer());
      buffers.enter = decoded;
    }
  } catch {
    /* ファイル無し: シンセのフォールバックを使う */
  }
}

/** AudioContext を作って解錠（必ずユーザー操作＝ジェスチャ内で呼ぶ）。冪等。 */
function init(): void {
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
  void buildBuffers();
}

/** 最初のユーザー操作で解錠。ただし音オフ（デフォルト）の間は AudioContext も
 *  zzfx も生成しない（音を使わない来訪者に無駄な初期化をしないため）。
 *  音を ON にした瞬間（setSfxMuted(false)）に init() する。 */
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
  // 音を ON にした瞬間に初期化（このコールはトグルのクリック＝ジェスチャ内で起きる）。
  if (!muted) {
    unlocked = true;
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

/** 効果音を鳴らす。unlock 前 / ミュート時は無音で握りつぶす（例外なし）。 */
export function playSfx(key: SfxKey): void {
  if (!isClient() || !unlocked || isSfxMuted() || !ctx || !master) return;
  if (ctx.state === "suspended") void ctx.resume().catch(() => {});
  const buf = buffers[key];
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

// クライアントで import された時点で一度だけ unlock リスナーを張る。
if (isClient()) bindUnlock();
