"use client";

import { Fragment, useRef } from "react";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import { TerrainCell } from "@/components/mockups";

const heads = ["Input (Condition)", "Ours (Proposed)", "Baseline (PGM)", "Baseline (StyleGAN)", "Ground Truth"];
const rows: { label: string; variant: "mtn" | "valley" | "plain" }[] = [
  { label: "山岳地形", variant: "mtn" },
  { label: "渓谷地形", variant: "valley" },
  { label: "平原地形", variant: "plain" },
];

export function QualitativeGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const scroll = (amount: number) => gridRef.current?.scrollBy({ left: amount, behavior: "smooth" });

  return (
    <div className="ql-wrap">
      <button className="ql-nav ql-prev" onClick={() => scroll(-220)} aria-label="前へ">
        <ChevronLeft />
      </button>
      <button className="ql-nav ql-next" onClick={() => scroll(220)} aria-label="次へ">
        <ChevronRight />
      </button>
      <div className="ql-grid" ref={gridRef}>
        <div className="ql-cell ql-corner" />
        {heads.map((h) => (
          <div key={h} className="ql-head">
            {h}
          </div>
        ))}
        {rows.map((row) => (
          <Fragment key={row.label}>
            <div className="ql-rowlabel">{row.label}</div>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="ql-cell">
                <TerrainCell variant={row.variant} />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
