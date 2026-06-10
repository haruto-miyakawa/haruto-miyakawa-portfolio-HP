import { ImageResponse } from "next/og";

export const alt = "Haruto Miyakawa — Web Engineer / AI Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// SNS/検索のリンクプレビュー用 OG 画像（English: 既定フォントでCJKが豆腐になるのを回避）。
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #1a110d 0%, #110b09 58%, #0d0907 100%)",
          color: "#ece3da",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, color: "#e8924f", letterSpacing: 4 }}>
          <div style={{ width: 46, height: 3, background: "#e8924f" }} />
          PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.04 }}>Haruto Miyakawa</div>
          <div style={{ fontSize: 44, color: "#f0a766" }}>Web Engineer / AI Builder</div>
        </div>
        <div style={{ fontSize: 28, color: "#b9ada2" }}>
          Building products that solve real problems with frontend &amp; AI.
        </div>
      </div>
    ),
    { ...size },
  );
}
