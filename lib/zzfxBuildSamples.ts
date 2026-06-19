// ZzFX のサンプル生成（buildSamples）を自前にベンダリングしたもの。
//
// 出典: ZzFX v1.3.2 — "Zuper Zmall Zound Zynth" © 2019 Frank Force, MIT License
//       https://github.com/KilledByAPixel/ZzFX  （ZZFX.buildSamples を移植）
//
// なぜベンダリングするか:
//   npm の zzfx は「モジュール評価時に new AudioContext」するため SSR でクラッシュし、
//   クライアントでも動的 import（非同期）が必須だった。その非同期がゆえに、画面遷移や
//   bfcache 復元をまたぐと「サンプル未生成のまま再生→無音」になる不整合が起きていた。
//   buildSamples 自体は AudioContext 不要の純関数なので、これだけを同期関数として取り込み、
//   どの遷移後でも getBuffer が即座に波形を生成できるようにする。
//
// 注意: 音量は ZzFX の master volume 既定値(0.3)を定数として掛け、従来の音量を維持する。

const ZZFX_SAMPLE_RATE = 44100;
const ZZFX_VOLUME = 0.3;

/** ZzFX パラメータ列から生のサンプル配列（mono, 44100Hz, おおむね [-1,1]）を返す純関数。 */
export function zzfxBuildSamples(
  volume = 1,
  randomness = 0.05,
  frequency = 220,
  attack = 0,
  sustain = 0,
  release = 0.1,
  shape = 0,
  shapeCurve = 1,
  slide = 0,
  deltaSlide = 0,
  pitchJump = 0,
  pitchJumpTime = 0,
  repeatTime = 0,
  noise = 0,
  modulation = 0,
  bitCrush = 0,
  delay = 0,
  sustainVolume = 1,
  decay = 0,
  tremolo = 0,
  filter = 0,
): number[] {
  const sampleRate = ZZFX_SAMPLE_RATE;
  const PI2 = Math.PI * 2;
  const abs = Math.abs;
  const sign = (v: number) => (v < 0 ? -1 : 1);

  let startSlide = (slide *= (500 * PI2) / sampleRate / sampleRate);
  let startFrequency = (frequency *=
    ((1 + randomness * 2 * Math.random() - randomness) * PI2) / sampleRate);
  let modOffset = 0;
  let repeat = 0;
  let crush = 0;
  let jump = 1;
  let length: number;
  const b: number[] = [];
  let t = 0;
  let i = 0;
  let s = 0;
  let f: number;

  // biquad LP/HP filter 係数
  const quality = 2;
  const w = (PI2 * abs(filter) * 2) / sampleRate;
  const cos = Math.cos(w);
  const alpha = Math.sin(w) / 2 / quality;
  const a0 = 1 + alpha;
  const a1 = (-2 * cos) / a0;
  const a2 = (1 - alpha) / a0;
  const b0 = (1 + sign(filter) * cos) / 2 / a0;
  const b1 = -(sign(filter) + cos) / a0;
  const b2 = b0;
  let x2 = 0;
  let x1 = 0;
  let y2 = 0;
  let y1 = 0;

  const minAttack = 9; // attack=0 のポップ音を防ぐ
  attack = attack * sampleRate || minAttack;
  decay *= sampleRate;
  sustain *= sampleRate;
  release *= sampleRate;
  delay *= sampleRate;
  deltaSlide *= (500 * PI2) / sampleRate ** 3;
  modulation *= PI2 / sampleRate;
  pitchJump *= PI2 / sampleRate;
  pitchJumpTime *= sampleRate;
  repeatTime = (repeatTime * sampleRate) | 0;
  volume *= ZZFX_VOLUME;

  for (length = (attack + decay + sustain + release + delay) | 0; i < length; b[i++] = s * volume) {
    if (!(++crush % ((bitCrush * 100) | 0))) {
      // 波形
      s = shape
        ? shape > 1
          ? shape > 2
            ? shape > 3
              ? shape > 4
                ? ((t / PI2) % 1 < shapeCurve / 2 ? 1 : 0) * 2 - 1 // 5 square duty
                : Math.sin(t ** 3) //                                4 noise
              : Math.max(Math.min(Math.tan(t), 1), -1) //            3 tan
            : 1 - (((2 * t) / PI2) % 2 + 2) % 2 //                   2 saw
          : 1 - 4 * abs(Math.round(t / PI2) - t / PI2) //            1 triangle
        : Math.sin(t); //                                           0 sin

      // tremolo / shape curve / エンベロープ
      s =
        (repeatTime ? 1 - tremolo + tremolo * Math.sin((PI2 * i) / repeatTime) : 1) *
        (shape > 4 ? s : sign(s) * abs(s) ** shapeCurve) *
        (i < attack
          ? i / attack // attack
          : i < attack + decay
            ? 1 - ((i - attack) / decay) * (1 - sustainVolume) // decay
            : i < attack + decay + sustain
              ? sustainVolume // sustain
              : i < length - delay
                ? ((length - i - delay) / release) * sustainVolume // release
                : 0); // post release

      // delay
      s = delay
        ? s / 2 +
          (delay > i
            ? 0
            : ((i < length - delay ? 1 : (length - i) / delay) * b[(i - delay) | 0]) / 2 / volume)
        : s;

      // filter
      if (filter) s = y1 = b2 * x2 + b1 * (x2 = x1) + b0 * (x1 = s) - a2 * y2 - a1 * (y2 = y1);
    }

    f = (frequency += slide += deltaSlide) * Math.cos(modulation * modOffset++); // modulation
    t += f + f * noise * Math.sin(i ** 5); // noise

    if (jump && ++jump > pitchJumpTime) {
      frequency += pitchJump;
      startFrequency += pitchJump;
      jump = 0;
    }

    if (repeatTime && !(++repeat % repeatTime)) {
      frequency = startFrequency;
      slide = startSlide;
      if (!jump) jump = 1;
    }
  }

  return b;
}
