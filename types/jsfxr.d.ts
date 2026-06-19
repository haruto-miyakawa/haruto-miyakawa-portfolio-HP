// jsfxr@1.4.x は型定義を同梱しないため最小限の宣言を補う。
// 本プロジェクトで使うのは sfxr.toBuffer（純粋なサンプル生成）のみ。
declare module "jsfxr" {
  /** sfxr の "sound definition"（p_* パラメータ群）。 */
  export type SfxrParams = Record<string, number | boolean>;

  export const sfxr: {
    /** プリセット名から sound を生成（毎回ランダム要素あり）。 */
    generate(preset: string): SfxrParams;
    /** レンダリング済みサンプル列を返す（既定 8bit unsigned PCM, 0..255）。 */
    toBuffer(synthdef: SfxrParams): number[];
    /** WAV の dataURI とヘッダを返す。 */
    toWave(synthdef: SfxrParams): { dataURI: string; header: { sampleRate: number } };
    play(synthdef: SfxrParams | string): unknown;
    toAudio(synthdef: SfxrParams | string): { play(): unknown; setVolume(v: number): unknown };
    b58encode(synthdef: SfxrParams): string;
    b58decode(s: string): SfxrParams;
  };

  export const jsfxr: unknown;
  const _default: unknown;
  export default _default;
}
