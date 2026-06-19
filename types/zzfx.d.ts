// zzfx@1.3.x は型定義を同梱しないため最小限の宣言を補う。
// 本プロジェクトで使うのは ZZFX.buildSamples（純粋なサンプル生成）のみ。
// 注: ZzFX.js はモジュール評価時に new AudioContext するため、必ずクライアントで
//     動的 import すること（SSR で評価すると AudioContext 未定義でクラッシュする）。
declare module "zzfx" {
  export const ZZFX: {
    volume: number;
    sampleRate: number;
    audioContext: AudioContext;
    /** ZzFX パラメータ列から生のサンプル配列を生成（再生はしない・純関数）。 */
    buildSamples(...params: number[]): number[];
    play(...params: number[]): AudioBufferSourceNode;
    playSamples(
      channels: number[][],
      volumeScale?: number,
      rate?: number,
      pan?: number,
      loop?: boolean,
    ): AudioBufferSourceNode;
  };
  export function zzfx(...params: number[]): AudioBufferSourceNode;
}
