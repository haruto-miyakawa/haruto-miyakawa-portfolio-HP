import type { CSSProperties } from "react";
import type { WorkMock, PaperThumb, ShotMock } from "@/content/content.data";

/** CSS カスタムプロパティを含む style を許可するためのキャストヘルパ */
const cssVars = (vars: Record<string, string | number>) => vars as CSSProperties;

/* ============================================================
   Work カードのミニモック（.mk-*）
   ============================================================ */
function MkDash() {
  return (
    <div className="mk mk-dash">
      <div className="mk-side">
        {[80, 60, 70, 55, 65].map((w, i) => (
          <div key={i} className="mk-pill" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="mk-body">
        <div className="mk-row w50" />
        <div className="mk-card">
          <div className="mk-row w70" />
          <div className="mk-row w40" />
        </div>
        <div className="mk-bars">
          {[40, 70, 55, 90, 65, 80].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MkTravel() {
  return (
    <div className="mk mk-travel">
      <div className="mk-photo" />
      <div style={{ padding: "8px 8px 0" }}>
        <div className="mk-row w70" style={{ background: "var(--mk-row-1)" }} />
      </div>
      <div className="mk-tcards">
        {[80, 70, 75].map((w, i) => (
          <div key={i} className="mk-tcard">
            <div className="tt" />
            <div className="mk-pill" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MkChat() {
  return (
    <div className="mk mk-chat">
      <div className="mk-list">
        {[70, 55, 65, 50, 60].map((w, i) => (
          <div key={i} className="mk-li">
            <div className="mk-dot" />
            <div className="mk-pill" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
      <div className="mk-conv">
        <div className="bubble in">
          <div className="ln" style={{ width: "90%" }} />
          <div className="ln" style={{ width: "60%" }} />
        </div>
        <div className="bubble out">
          <div className="ln" style={{ width: "80%" }} />
          <div className="ln" style={{ width: "50%" }} />
        </div>
        <div className="bubble in">
          <div className="ln" style={{ width: "75%" }} />
        </div>
      </div>
    </div>
  );
}

function MkCode() {
  const lines = [
    { pad: 0, segs: [["t-kw", 22], ["t-fn", 40], ["t-pl", 14]] },
    { pad: 14, segs: [["t-var", 30], ["t-pl", 10], ["t-str", 48]] },
    { pad: 14, segs: [["t-kw", 18], ["t-var", 34]] },
    { pad: 28, segs: [["t-fn", 44], ["t-str", 26]] },
    { pad: 14, segs: [["t-pl", 10]] },
    { pad: 0, segs: [["t-kw", 26], ["t-fn", 36]] },
    { pad: 14, segs: [["t-var", 24], ["t-pl", 8], ["t-str", 40]] },
    { pad: 0, segs: [["t-pl", 8]] },
  ] as const;
  return (
    <div className="mk mk-code">
      <div className="mk-gutter">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
      <div className="mk-codebody">
        {lines.map((line, i) => (
          <div key={i} className="cline" style={line.pad ? { paddingLeft: line.pad } : undefined}>
            {line.segs.map(([cls, w], j) => (
              <i key={j} className={`cseg ${cls}`} style={{ width: w }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function MkAnalytics() {
  return (
    <div className="mk mk-analytics">
      <div className="mk-stats">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="mk-stat" />
        ))}
      </div>
      <div className="mk-charts">
        <div className="mk-chart">
          {[40, 65, 50, 80, 60, 90].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mk-chart">
          {[70, 45, 85, 55, 75, 50].map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MkPortfolio() {
  return (
    <div className="mk mk-portfolio">
      <div className="mk-pf-left">
        <div className="mk-row w40" style={{ background: "var(--mk-row-2)" }} />
        <div className="mk-row w70" style={{ background: "var(--mk-row-3)" }} />
        <div className="mk-row w50" style={{ background: "var(--mk-row-3)" }} />
        <div style={{ display: "flex", gap: 5, marginTop: 4 }}>
          <span className="mk-tagp" />
          <span className="mk-tagp" />
        </div>
      </div>
      <div className="mk-device">
        <div className="mk-device-screen" />
      </div>
    </div>
  );
}

export function WorkMockView({ mock }: { mock: WorkMock }) {
  switch (mock) {
    case "dash":
      return <MkDash />;
    case "travel":
      return <MkTravel />;
    case "chat":
      return <MkChat />;
    case "code":
      return <MkCode />;
    case "analytics":
      return <MkAnalytics />;
    case "portfolio":
      return <MkPortfolio />;
  }
}

/* ============================================================
   Work カードのサムネ（実スクショ or ブランド代替タイル）
   ============================================================ */
const WORK_MONO: Record<string, string> = {
  "つむぐ": "つ",
  "講義議事録ジェネレーター": "講",
  "家電ガイド": "家",
};
const BADGE_HUE: Record<string, string> = { Web: "web", Tool: "tool", AI: "ai" };

export function WorkThumb({ title, badge, thumb }: { title: string; badge: string; thumb?: string }) {
  if (thumb) {
    return <img src={thumb} alt={`${title} のスクリーンショット`} loading="lazy" />;
  }
  const hue = BADGE_HUE[badge] ?? "web";
  const mono = WORK_MONO[title] ?? title.slice(0, 1);
  return (
    <div className={`bt bt-${hue}`} aria-hidden="true">
      <span className="bt-mono">{mono}</span>
    </div>
  );
}

/* ============================================================
   Research カードのサムネイル（.rth.th-*）
   ============================================================ */
export function ResearchThumb({ type }: { type: PaperThumb }) {
  switch (type) {
    case "cubes":
      return (
        <div className="rth th-cubes">
          {[
            { x: "18%", y: "55%", c: "var(--mk-cube-orange)", r: "-12deg" },
            { x: "38%", y: "38%", c: "var(--mk-cube-amber)", r: "8deg" },
            { x: "55%", y: "60%", c: "var(--mk-cube-violet)", r: "-6deg" },
            { x: "70%", y: "42%", c: "var(--mk-cube-rose)", r: "14deg" },
            { x: "84%", y: "62%", c: "var(--mk-cube-indigo)", r: "-10deg" },
          ].map((cb, i) => (
            <span key={i} className="cb" style={cssVars({ "--x": cb.x, "--y": cb.y, "--c": cb.c, "--r": cb.r })} />
          ))}
        </div>
      );
    case "traffic":
      return (
        <div className="rth th-traffic">
          {[
            { a: "18deg", t: "30%", c: "var(--mk-cube-orange)" },
            { a: "-12deg", t: "50%", c: "var(--mk-cube-amber)" },
            { a: "8deg", t: "68%", c: "var(--mk-cube-rose)" },
            { a: "24deg", t: "80%", c: "var(--mk-cube-violet)" },
          ].map((tl, i) => (
            <span key={i} className="tl" style={cssVars({ "--a": tl.a, "--t": tl.t, "--c": tl.c })} />
          ))}
        </div>
      );
    case "collage":
      return (
        <div className="rth th-collage">
          <span className="cw" style={cssVars({ "--x": "10%", "--y": "18%", "--w": "60%", "--h": "46%" })} />
          <span className="cw" style={cssVars({ "--x": "32%", "--y": "34%", "--w": "60%", "--h": "50%", opacity: 0.95 })} />
          <span className="cw" style={cssVars({ "--x": "50%", "--y": "24%", "--w": "46%", "--h": "60%", opacity: 0.9 })} />
        </div>
      );
    case "galaxy":
      return (
        <div className="rth th-galaxy">
          <span className="gx" style={cssVars({ "--x": "24%", "--y": "46%", "--s": "46px" })} />
          <span className="gx" style={cssVars({ "--x": "52%", "--y": "40%", "--s": "60px" })} />
          <span className="gx" style={cssVars({ "--x": "78%", "--y": "52%", "--s": "42px" })} />
        </div>
      );
    case "wave":
      return (
        <div className="rth th-wave">
          <svg viewBox="0 0 200 90" preserveAspectRatio="none">
            <polyline
              points="0,60 20,40 40,52 60,28 80,46 100,22 120,40 140,18 160,38 180,24 200,34"
              fill="none"
              style={{ stroke: "var(--mk-line-orange)" }}
              strokeWidth="2"
            />
            <polyline
              points="0,72 20,64 40,68 60,56 80,62 100,50 120,60 140,48 160,58 180,46 200,52"
              fill="none"
              style={{ stroke: "var(--mk-line-violet)" }}
              strokeWidth="1.6"
              opacity="0.7"
            />
          </svg>
        </div>
      );
    case "cloud":
      return (
        <div className="rth th-cloud">
          <span className="sky" />
          <span className="dots" />
        </div>
      );
    case "terrain":
      return (
        <div className="rth th-terrain">
          <span className="mt mt1" />
          <span className="mt mt2" />
          <span className="mt mt3" />
        </div>
      );
  }
}

/* ============================================================
   地形セル（Paper Detail の .tcell）
   ============================================================ */
export function TerrainCell({ variant }: { variant: "mtn" | "valley" | "plain" | "hero" }) {
  return (
    <div className={`tcell t-${variant}`}>
      <span className="t-sky" />
      <span className="t-mtn" />
    </div>
  );
}

/* ============================================================
   Case Study の画面モック（ブラウザフレーム + 中身）
   ============================================================ */
function ShotChat() {
  return (
    <div className="b-chat">
      <div className="b-side">
        {[72, 56, 64, 50, 60, 46].map((w, i) => (
          <div key={i} className="b-li">
            <span className="b-dot" />
            <span className="b-row" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
      <div className="b-conv">
        <div className="b-bubble in">
          <span className="b-ln" style={{ width: "92%" }} />
          <span className="b-ln" style={{ width: "74%" }} />
          <span className="b-ln" style={{ width: "83%" }} />
        </div>
        <div className="b-bubble out">
          <span className="b-ln" style={{ width: "78%" }} />
          <span className="b-ln" style={{ width: "54%" }} />
        </div>
        <div className="b-bubble in">
          <span className="b-ln" style={{ width: "88%" }} />
          <span className="b-ln" style={{ width: "66%" }} />
          <span className="b-ln" style={{ width: "48%" }} />
        </div>
        <div className="b-bubble out">
          <span className="b-ln" style={{ width: "60%" }} />
        </div>
        <div className="b-inputbar">
          <span className="b-input" />
          <span className="b-send" />
        </div>
      </div>
    </div>
  );
}

function ShotDashboard() {
  return (
    <div className="b-dash">
      <div className="b-dside">
        {[70, 52, 62, 48, 58, 44].map((w, i) => (
          <span key={i} className="b-pill" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="b-dmain">
        <div className="b-cards">
          {[0, 1, 2].map((i) => (
            <div key={i} className="b-mini">
              <span className="b-pill" style={{ width: "60%" }} />
              <span className="b-pill" style={{ width: "40%", height: 9 }} />
            </div>
          ))}
        </div>
        <div className="b-block">
          <div className="b-bars">
            {[40, 68, 52, 84, 60, 76, 46, 70].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="b-rows">
          {[88, 72, 80].map((w, i) => (
            <span key={i} className="b-pill" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ShotUpload() {
  return (
    <div className="b-upload">
      <div className="b-drop">
        <span className="b-cloud" />
        <span className="b-row" style={{ width: "46%" }} />
        <span className="b-row" style={{ width: "30%", height: 5 }} />
      </div>
      <div className="b-files">
        {["PDF", "TXT", "URL"].map((t) => (
          <div key={t} className="b-file">
            <span className="b-ftag">{t}</span>
            <span className="b-pill" style={{ width: "55%" }} />
            <span className="b-check" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ShotCite() {
  return (
    <div className="b-cite">
      <div className="b-conv" style={{ flex: 1 }}>
        <div className="b-bubble in">
          <span className="b-ln" style={{ width: "92%" }} />
          <span className="b-ln" style={{ width: "78%" }} />
          <span className="b-hl" />
          <span className="b-ln" style={{ width: "60%" }} />
        </div>
        <div className="b-bubble out">
          <span className="b-ln" style={{ width: "70%" }} />
        </div>
      </div>
      <div className="b-srcs">
        {[0, 1].map((i) => (
          <div key={i} className="b-src">
            <span className="b-srcdot" />
            <span className="b-pill" style={{ width: "70%" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ShotPhone() {
  return (
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="p-top">
          <span className="b-pill" style={{ width: "40%", background: "var(--mk-row-2)" }} />
        </div>
        <div className="b-bubble in">
          <span className="b-ln" style={{ width: "90%" }} />
          <span className="b-ln" style={{ width: "66%" }} />
        </div>
        <div className="b-bubble out">
          <span className="b-ln" style={{ width: "74%" }} />
          <span className="b-ln" style={{ width: "50%" }} />
        </div>
        <div className="b-bubble in">
          <span className="b-ln" style={{ width: "82%" }} />
          <span className="b-ln" style={{ width: "58%" }} />
        </div>
        <div className="p-input" />
      </div>
    </div>
  );
}

function ShotInner({ mock }: { mock: ShotMock }) {
  switch (mock) {
    case "chat":
      return <ShotChat />;
    case "dashboard":
      return <ShotDashboard />;
    case "upload":
      return <ShotUpload />;
    case "cite":
      return <ShotCite />;
    case "phone":
      return <ShotPhone />;
  }
}

/** ブラウザ風フレーム付きスクリーンショット。phone はモバイルフレーム。 */
export function Shot({ mock, url }: { mock: ShotMock; url?: string }) {
  if (mock === "phone") {
    return (
      <div className="shot shot-mobile">
        <div className="shot-body">
          <ShotPhone />
        </div>
      </div>
    );
  }
  return (
    <div className="shot">
      <div className="shot-bar">
        <span className="shot-dots">
          <i style={{ background: "var(--mk-wl-red)" }} />
          <i style={{ background: "var(--mk-wl-amber)" }} />
          <i style={{ background: "var(--mk-wl-green)" }} />
        </span>
        {url ? <span className="shot-url">{url}</span> : <span className="shot-url" />}
      </div>
      <div className="shot-body">
        <ShotInner mock={mock} />
      </div>
    </div>
  );
}
