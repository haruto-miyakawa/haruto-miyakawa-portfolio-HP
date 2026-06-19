// /play 用の効果音エンジン。jsfxr で 4 音を生成し、自前の AudioContext で再生する。
//
// 設計方針:
// - クライアント専用。SSR では何もしない（window は遅延参照）。jsfxr の toBuffer は
//   純粋計算なので import 自体は SSR でも安全。
// - autoplay 制約対応: 最初のユーザー操作（pointerdown / touchend / keydown）で
//   AudioContext を resume してから鳴らす。unlock 前の playSfx() は無音で握りつぶす。
// - jsfxr は内部 AudioContext を外部公開しないため、jsfxr は「サンプル生成器」としてのみ使い
//   （toBuffer = 8bit unsigned PCM）、再生は自前 AudioContext で行う（unlock/mute を完全制御）。
// - generate(preset) は毎回ランダムなので、各音は一度生成した固定パラメータを埋め込む（決定的）。
// - ミュートは localStorage("sfx-muted") に永続（デフォルト OFF = 音 ON）。
//   prefers-reduced-motion とは独立（音はモーションではないため別管理）。
import { sfxr, type SfxrParams } from "jsfxr";

export type SfxKey = "examine" | "approach" | "enter" | "return";

// jsfxr の generate(preset) を一度生成して固定した決定的パラメータ（外部音声ファイル不使用）。
//   examine  = pickupCoin（しらべる/決定の明るい確定音）
//   approach = blipSelect（ゾーン接近の控えめな通知音）
//   enter    = powerUp（GAME に入る・上昇する音）
//   return   = blipSelect を低く下降（-freq_ramp）させた「戻る」音
const PARAMS: Record<SfxKey, SfxrParams> = {
  examine: { oldParams: true, wave_type: 1, p_env_attack: 0, p_env_sustain: 0.02332800323418706, p_env_punch: 0.3571783175471856, p_env_decay: 0.36350760063043996, p_base_freq: 0.6376455890863646, p_freq_limit: 0, p_freq_ramp: 0, p_freq_dramp: 0, p_vib_strength: 0, p_vib_speed: 0, p_arp_mod: 0.5752059662194866, p_arp_speed: 0.5625077884949244, p_duty: 0, p_duty_ramp: 0, p_repeat_speed: 0, p_pha_offset: 0, p_pha_ramp: 0, p_lpf_freq: 1, p_lpf_ramp: 0, p_lpf_resonance: 0, p_hpf_freq: 0, p_hpf_ramp: 0, sound_vol: 0.25, sample_rate: 44100, sample_size: 8 },
  approach: { oldParams: true, wave_type: 1, p_env_attack: 0, p_env_sustain: 0.16310954956032567, p_env_punch: 0, p_env_decay: 0.08793531612334947, p_base_freq: 0.4660746491100795, p_freq_limit: 0, p_freq_ramp: 0, p_freq_dramp: 0, p_vib_strength: 0, p_vib_speed: 0, p_arp_mod: 0, p_arp_speed: 0, p_duty: 1, p_duty_ramp: 0, p_repeat_speed: 0, p_pha_offset: 0, p_pha_ramp: 0, p_lpf_freq: 1, p_lpf_ramp: 0, p_lpf_resonance: 0, p_hpf_freq: 0.1, p_hpf_ramp: 0, sound_vol: 0.25, sample_rate: 44100, sample_size: 8 },
  enter: { oldParams: true, wave_type: 1, p_env_attack: 0, p_env_sustain: 0.16259696182501512, p_env_punch: 0, p_env_decay: 0.37707149068175694, p_base_freq: 0.41326352595142635, p_freq_limit: 0, p_freq_ramp: 0.17844247953342368, p_freq_dramp: 0, p_vib_strength: 0.3949122102346469, p_vib_speed: 0.35557935164767557, p_arp_mod: 0, p_arp_speed: 0, p_duty: 1, p_duty_ramp: 0, p_repeat_speed: 0, p_pha_offset: 0, p_pha_ramp: 0, p_lpf_freq: 1, p_lpf_ramp: 0, p_lpf_resonance: 0, p_hpf_freq: 0, p_hpf_ramp: 0, sound_vol: 0.25, sample_rate: 44100, sample_size: 8 },
  return: { oldParams: true, wave_type: 0, p_env_attack: 0, p_env_sustain: 0.05, p_env_punch: 0, p_env_decay: 0.22, p_base_freq: 0.35, p_freq_limit: 0, p_freq_ramp: -0.3, p_freq_dramp: 0, p_vib_strength: 0, p_vib_speed: 0, p_arp_mod: 0, p_arp_speed: 0, p_duty: 0.11898789509073199, p_duty_ramp: 0, p_repeat_speed: 0, p_pha_offset: 0, p_pha_ramp: 0, p_lpf_freq: 1, p_lpf_ramp: 0, p_lpf_resonance: 0, p_hpf_freq: 0.1, p_hpf_ramp: 0, sound_vol: 0.25, sample_rate: 44100, sample_size: 8 },
};

export const SFX_MUTE_KEY = "sfx-muted";
const MASTER_GAIN = 0.45;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let unlocked = false;
let unlockBound = false;
const samples: Partial<Record<SfxKey, Float32Array>> = {};
const buffers: Partial<Record<SfxKey, AudioBuffer>> = {};

const isClient = (): boolean => typeof window !== "undefined";

/** jsfxr で 4 音のサンプルを一度だけレンダリング（8bit unsigned → float[-1,1]）。AudioContext 不要。 */
function renderSamples(): void {
  if (samples.examine) return;
  (Object.keys(PARAMS) as SfxKey[]).forEach((k) => {
    const raw = sfxr.toBuffer(PARAMS[k]); // 8bit unsigned PCM (0..255, center 128)
    const f = new Float32Array(raw.length);
    for (let i = 0; i < raw.length; i++) f[i] = (raw[i] - 128) / 128;
    samples[k] = f;
  });
}

/** AudioContext と AudioBuffer を遅延生成（最初の unlock 時に同期で構築）。 */
function ensureCtx(): void {
  if (ctx || !isClient()) return;
  const AC =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = MASTER_GAIN;
  master.connect(ctx.destination);
  renderSamples();
  (Object.keys(PARAMS) as SfxKey[]).forEach((k) => {
    const f = samples[k]!;
    const sr = (PARAMS[k].sample_rate as number) || 44100;
    const ab = ctx!.createBuffer(1, f.length, sr);
    ab.getChannelData(0).set(f);
    buffers[k] = ab;
  });
}

/** 最初のユーザー操作で AudioContext を resume。以降は通常再生可能に。 */
function unlock(): void {
  if (!isClient()) return;
  ensureCtx();
  if (ctx && ctx.state === "suspended") void ctx.resume().catch(() => {});
  // iOS Safari: ジェスチャ内で無音バッファを一度鳴らして出力を確実に解錠する。
  if (ctx) {
    try {
      const warm = ctx.createBufferSource();
      warm.buffer = ctx.createBuffer(1, 1, 22050);
      warm.connect(ctx.destination);
      warm.start(0);
    } catch {
      /* no-op */
    }
  }
  unlocked = true;
  window.removeEventListener("pointerdown", unlock);
  window.removeEventListener("touchend", unlock);
  window.removeEventListener("keydown", unlock);
}

function bindUnlock(): void {
  if (unlockBound || !isClient()) return;
  unlockBound = true;
  // pointerdown / touchend / keydown のいずれか最初の操作で解錠（iOS Safari の touchend も含む）。
  window.addEventListener("pointerdown", unlock, { passive: true });
  window.addEventListener("touchend", unlock, { passive: true });
  window.addEventListener("keydown", unlock);
}

export function isSfxMuted(): boolean {
  if (!isClient()) return false;
  try {
    return localStorage.getItem(SFX_MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setSfxMuted(muted: boolean): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(SFX_MUTE_KEY, muted ? "1" : "0");
  } catch {
    /* private browsing */
  }
}

/** 効果音を鳴らす。unlock 前 / ミュート時は無音で握りつぶす（エラーを投げない）。 */
export function playSfx(key: SfxKey): void {
  if (!isClient() || !unlocked || isSfxMuted() || !ctx || !master) return;
  if (ctx.state === "suspended") void ctx.resume().catch(() => {});
  const buf = buffers[key];
  if (!buf) return;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.connect(master);
  try {
    src.start();
  } catch {
    /* no-op */
  }
}

// クライアントで import された時点で一度だけ unlock リスナーを張る。
if (isClient()) bindUnlock();
