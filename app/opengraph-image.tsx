import { ImageResponse } from "next/og";
import { OG_BG_TOP, OG_BG_MID, OG_BG_BOT, OG_TEXT, OG_ACCENT, OG_ACCENT_2, OG_TEXT_MUTED, OG_FONT_FAMILY } from "@/constants/theme-values";

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
          background: `linear-gradient(135deg, ${OG_BG_TOP} 0%, ${OG_BG_MID} 58%, ${OG_BG_BOT} 100%)`,
          color: OG_TEXT,
          fontFamily: OG_FONT_FAMILY,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, color: OG_ACCENT, letterSpacing: 4 }}>
          <div style={{ width: 46, height: 3, background: OG_ACCENT }} />
          PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.04 }}>Haruto Miyakawa</div>
          <div style={{ fontSize: 44, color: OG_ACCENT_2 }}>Web Engineer / AI Builder</div>
        </div>
        <div style={{ fontSize: 28, color: OG_TEXT_MUTED }}>
          Building products that solve real problems with frontend &amp; AI.
        </div>
      </div>
    ),
    { ...size },
  );
}
