// 画像最適化: 巨大 PNG を WebP に変換（リサイズ + 圧縮）。
// 実行: node scripts/optimize-images.mjs
import sharp from "sharp";
import { stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "public");

/** painterly: lossy webp + リサイズ / pixel: lossless（ドット維持） */
const jobs = [
  { in: "assets/hero-Works.png", out: "assets/hero-Works.webp", width: 1600, q: 72 },
  { in: "assets/hero-Research.png", out: "assets/hero-Research.webp", width: 1600, q: 72 },
  { in: "assets/hero-AboutMe.png", out: "assets/hero-AboutMe.webp", width: 1600, q: 72 },
  { in: "assets/lantern.png", out: "assets/lantern.webp", width: 300, q: 82 },
  { in: "assets/hero.png", out: "assets/hero.webp", width: 1280, q: 70 }, // pixelated 表示＋暗いscrim下なので lossy で十分
  { in: "projects/tsumugu/editor.png", out: "projects/tsumugu/editor.webp", width: 1440, q: 80 },
  { in: "projects/tsumugu/home.png", out: "projects/tsumugu/home.webp", width: 1440, q: 80 },
  { in: "projects/tsumugu/preview.png", out: "projects/tsumugu/preview.webp", width: 1440, q: 80 },
];

const kb = (b) => `${(b / 1024).toFixed(0)}KB`;
let before = 0;
let after = 0;

for (const job of jobs) {
  const src = path.join(ROOT, job.in);
  const dst = path.join(ROOT, job.out);
  const meta = await sharp(src).metadata();
  let pipe = sharp(src);
  if (job.width && meta.width > job.width) pipe = pipe.resize({ width: job.width });
  pipe = job.lossless ? pipe.webp({ lossless: true, effort: 6 }) : pipe.webp({ quality: job.q, effort: 6 });
  await pipe.toFile(dst);
  const sBefore = (await stat(src)).size;
  const sAfter = (await stat(dst)).size;
  before += sBefore;
  after += sAfter;
  console.log(`${job.in.padEnd(34)} ${meta.width}x${meta.height}  ${kb(sBefore).padStart(7)} -> ${kb(sAfter).padStart(7)}  (${job.out})`);
}

console.log(`\nTOTAL  ${kb(before)} -> ${kb(after)}  (-${(100 - (after / before) * 100).toFixed(0)}%)`);
