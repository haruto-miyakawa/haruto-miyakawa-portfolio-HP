"use client";

import { useRef } from "react";
import { Shot } from "@/components/mockups";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import type { CaseStudy } from "@/content/content.data";

export function Gallery({ items, url }: { items: NonNullable<CaseStudy["gallery"]>; url: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const amount = card ? card.getBoundingClientRect().width + 18 : 320;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="cs-section cs-wide">
      <div className="sec-head">
        <div className="sec-title">
          <span className="star">✦</span> 画面ギャラリー
        </div>
        <div className="sec-rule" />
        <div className="gal-nav">
          <button className="gal-btn" onClick={() => scroll(-1)} aria-label="前へ">
            <ChevronLeft />
          </button>
          <button className="gal-btn" onClick={() => scroll(1)} aria-label="次へ">
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="gal-track" ref={trackRef}>
        {items.map((g, i) => (
          <article key={i} className="gal-card">
            <div className="gal-shot">
              <Shot mock={g.mock} url={url} />
            </div>
            <h4 className="gal-t">{g.title}</h4>
            <p className="gal-d">{g.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
