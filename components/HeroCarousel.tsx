"use client";

import { useEffect, useState } from "react";

export interface HeroImage {
  src: string;
  caption: string;
}

/**
 * ヒーロー用の自動切り替えカルーセル（クロスフェード）。
 * - 5秒ごとに次へ／ループ。初期は先頭（editor）
 * - ドットで手動ジャンプ、ホバー中は自動送りを一時停止
 * - prefers-reduced-motion: reduce では自動送りを止め、フェードも無効（CSS側）
 */
export function HeroCarousel({ images }: { images: HeroImage[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  // prefers-reduced-motion の監視
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // 自動送り（active/paused/reduced が変わるたびに 5 秒タイマーを張り直す）
  useEffect(() => {
    if (reduced || paused || images.length <= 1) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % images.length), 5000);
    return () => clearTimeout(id);
  }, [active, paused, reduced, images.length]);

  return (
    <div
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hc-viewport">
        {images.map((img, i) => (
          <figure key={img.src} className={`hc-slide${i === active ? " active" : ""}`} aria-hidden={i !== active}>
            <img className="hc-img" src={img.src} alt={img.caption} />
            <figcaption className="hc-caption">{img.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="hc-dots" role="tablist" aria-label="スクリーンショット切り替え">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            className={`hc-dot${i === active ? " active" : ""}`}
            aria-label={`スライド ${i + 1} を表示`}
            aria-selected={i === active}
            role="tab"
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
