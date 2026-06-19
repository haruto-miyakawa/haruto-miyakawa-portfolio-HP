// /play 用の効果音エンジン。ZzFX(MIT) の buildSamples を自前にベンダリングし、
// 自前の AudioContext で再生する。
//
// 設計方針（画面遷移/bfcache をまたいでも一貫して鳴るように再設計）:
// - クライアント専用。SSR では何もしない（window は遅延参照）。
// - サンプル生成は完全同期（zzfxBuildSamples = AudioContext 不要の純関数）。動的 import を廃止。
//   getBuffer が再生時に同期でサンプル生成＋AudioBuffer 化してキャッシュ→以後は使い回し。
//   ＝どの realm（bfcache 復元・別ドキュメント）でも、初回再生から取りこぼさず鳴る。
// - 【自己初期化】playSfx は必ずユーザー操作（クリック/キー）から呼ばれるので、その場で
//   AudioContext を生成・resume する（init）。事前の unlock やページ読込時の初期化に依存しない。
//   → /play で音ON → 現実に戻る（別 realm）→ ランタン押下、でも ctx を作り直して鳴る。
// - 単一 AudioContext ＋ マスター GainNode 1 つ。latencyHint:"interactive" で出力遅延最小化。
// - ミュートは localStorage("sfx-muted") に永続。【デフォルト OFF=ミュート】（"0" のときだけ ON）。
//   オフは playSfx 早期 return ＋ master.gain=0。prefers-reduced-motion とは独立。
// - iOS: init はユーザー操作内で resume＋無音1サンプル再生。
// - 金属ランタン音(enter)は public/sfx のファイルがあれば後追いで差し替え（無ければシンセ）。
import { zzfxBuildSamples } from "@/lib/zzfxBuildSamples";

export type SfxKey = "examine" | "return" | "enter";

export const SFX_MUTE_KEY = "sfx-muted";
export const SFX_NOTICE_KEY = "sfx-notice-seen";

// 金属ランタン音の差し替え用パス。ここに CC0 の音源(mp3 など)を置くと自動で優先使用される。
const LANTERN_SFX_URL = "/sfx/lantern.mp3";

const MASTER_GAIN = 0.5;
const SAMPLE_RATE = 44100;

// ── ZzFX パラメータ（zzfxBuildSamples の 21 引数順）──────────────────────────
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
let lanternUpgradeStarted = false;
const sampleCache: Partial<Record<SfxKey, Float32Array>> = {};
const buffers: Partial<Record<SfxKey, AudioBuffer>> = {};

const isClient = (): boolean => typeof window !== "undefined";

/** キャッシュ済み（無ければ同期生成）の AudioBuffer を返す。 */
function getBuffer(key: SfxKey): AudioBuffer | null {
  const existing = buffers[key];
  if (existing) return existing;
  if (!ctx) return null;
  let s = sampleCache[key];
  if (!s) {
    const raw = zzfxBuildSamples(...PARAMS[key]); // 同期・AudioContext 不要
    if (!raw.length) return null;
    s = Float32Array.from(raw);
    sampleCache[key] = s;
  }
  const buf = ctx.createBuffer(1, s.length, SAMPLE_RATE);
  buf.getChannelData(0).set(s);
  buffers[key] = buf;
  return buf;
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

/** AudioContext とマスター Gain を生成（無ければ）。必ずユーザー操作内で呼ぶ。 */
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

/** ctx を作って解錠（必ずユーザー操作＝ジェスチャ内で呼ぶ）。冪等。
 *  遷移後の別 realm でも、最初の playSfx/トグルでここが走り ctx を作り直す。 */
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
  void upgradeLanternFromFile();
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
  // 音を ON にした瞬間に初期化（このコールはトグルのクリック＝ジェスチャ内）。
  if (!muted) init();
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

/** 効果音を鳴らす。呼び出しは必ずユーザー操作起点なので、その場で ctx を用意して鳴らす。
 *  ミュート時は無音で握りつぶす（例外なし）。遷移後の別 realm でも ctx を作り直して鳴る。 */
export function playSfx(key: SfxKey): void {
  if (!isClient() || isSfxMuted()) return;
  init(); // 必要なら ctx 生成＋resume（ジェスチャ内なので autoplay 制約OK）
  if (!ctx || !master) return;
  if (ctx.state === "suspended") void ctx.resume().catch(() => {});
  const buf = getBuffer(key); // 未生成でも同期で作る＝取りこぼしなし
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
