import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { paperDetails, profile } from "@/content/content.data";
import { Lines } from "@/components/Lines";
import { TerrainCell } from "@/components/mockups";
import { QualitativeGrid } from "@/components/QualitativeGrid";
import { ArrowUpRight, Check, icons } from "@/components/icons";

export function generateStaticParams() {
  return Object.keys(paperDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pd = paperDetails[slug];
  if (!pd) return {};
  return { title: `${pd.title.replace(/\n/g, " ")} — Research — Haruto Miyakawa`, description: pd.lead };
}

const diamondIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l4 5-4 13-4-13 4-5Z" /></svg>
);

const metaIcons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V8l8-4 8 4v13M4 21h16M9 21v-5h6v5M8 11h.01M12 11h.01M16 11h.01M8 14h.01M16 14h.01" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8.5 8.5h.01M15.5 15.5h.01M16 8 8 16" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /><path d="M16 6.5a3 3 0 0 1 0 6M21 19c0-2.4-1.6-4.2-3.8-4.8" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M8 10h.01M12 10h.01M16 10h.01M8 13.5h.01M12 13.5h.01M16 13.5h.01" /></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" /></svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4 9.2l5.4-.8L12 3.5Z" /></svg>,
];

const csoProblem = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 16.5h.01" /></svg>;
const csoApproach = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 4 10.5c-.7.6-1 1.2-1 2H9c0-.8-.3-1.4-1-2A6 6 0 0 1 12 3Z" /></svg>;
const csoResults = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5M4 19h16M8 15l3-4 3 2 4-6" /></svg>;
const csoArrow = (
  <div className="cso-arrow">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  </div>
);

const overviewIcons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 21h8" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5L16 9" /></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" /><path d="M14 10a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" /></svg>,
];

const fileIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v4h4M9 13h6M9 17h4" /></svg>;
const arxivIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h12a2 2 0 0 1 2 2v13l-4-2-4 2-4-2V5ZM4 5a2 2 0 0 0-2 2v11" /></svg>;
const bibtexIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v4h4M9 12h6M9 16h4" /></svg>;
const projectorIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M12 16v4M8 20h8" /></svg>;
const mailIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6 8.5-6" /></svg>;
const stepArrow = <div className="md-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></div>;
const diffuseArrow = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default async function PaperDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pd = paperDetails[slug];
  if (!pd) notFound();

  return (
    <>
      <nav className="crumbs">
        <Link href="/">Home</Link>
        <span className="crumb-sep">/</span>
        <Link href="/research">Research</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-cur">{pd.title.replace(/\n/g, " ")}</span>
      </nav>

      {/* HERO */}
      <section className="cs-hero">
        <div className="cs-hero-main">
          <span className="status-badge">
            {diamondIcon}
            {pd.statusBadge}
          </span>
          <h1 className="cs-title">
            <Lines text={pd.title} />
          </h1>
          <p className="cs-lead">{pd.lead}</p>
          <p className="cs-body">{pd.body}</p>
          <div className="cs-cta">
            <a className="btn btn-pub" href="#">
              Read Paper <ArrowUpRight />
            </a>
            <a className="btn btn-ghost" href={profile.githubUrl}>
              GitHub <ArrowUpRight />
            </a>
          </div>
        </div>
        <div className="cs-hero-shot">
          <div className="frame">
            <div className="pd-keyvis">
              <TerrainCell variant="hero" />
            </div>
          </div>
        </div>
      </section>

      <div className="cs-grid">
        <div className="cs-col">
          {/* META */}
          <section className="cs-section">
            <div className="meta-strip pd-meta6">
              {pd.meta.map((m, i) => (
                <div key={m.label} className="meta-card">
                  <div className="meta-ic">{metaIcons[i]}</div>
                  <div>
                    <div className="meta-l">{m.label}</div>
                    <div className="meta-v">
                      {m.value}
                      {m.sub && <span className="meta-sub">{m.sub}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TL;DR */}
          <section className="cs-section">
            <div className="sec-head">
              <div className="sec-title">
                <span className="star">✦</span> 研究概要 (TL;DR)
              </div>
              <div className="sec-rule" />
            </div>
            <div className="tldr pd-tldr">
              <p>{pd.tldr}</p>
              <div className="pd-tldr-tags">
                {pd.tldrTags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* PROBLEM / APPROACH / RESULTS */}
          <section className="cs-section">
            <div className="cso">
              <div className="cso-card">
                <div className="cso-head">
                  <span className="cso-ic">{csoProblem}</span>
                  <div>
                    <div className="cso-n">01 課題</div>
                    <div className="cso-en">Problem</div>
                  </div>
                </div>
                <p className="cso-body">{pd.problem.body}</p>
                <ul className="cso-list">
                  {pd.problem.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              {csoArrow}
              <div className="cso-card">
                <div className="cso-head">
                  <span className="cso-ic">{csoApproach}</span>
                  <div>
                    <div className="cso-n">02 提案手法</div>
                    <div className="cso-en">Approach</div>
                  </div>
                </div>
                <p className="cso-body">{pd.approach.body}</p>
                <ul className="cso-list">
                  {pd.approach.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              {csoArrow}
              <div className="cso-card cso-res">
                <div className="cso-head">
                  <span className="cso-ic">{csoResults}</span>
                  <div>
                    <div className="cso-n">03 結果</div>
                    <div className="cso-en">Results</div>
                  </div>
                </div>
                <p className="cso-body">{pd.results.body}</p>
                <div className="res-stats">
                  {pd.results.stats.map((s) => (
                    <div key={s.label} className="res-stat">
                      <div className="res-num">
                        {s.num}
                        <span>{s.unit}</span>
                      </div>
                      <div className="res-lab">{s.label}</div>
                      <div className="res-sub">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* METHOD OVERVIEW */}
          <section className="cs-section">
            <div className="sec-head">
              <div className="sec-title">
                <span className="star">✦</span> 手法概要 (Method Overview)
              </div>
              <div className="sec-rule" />
            </div>
            <div className="md-flow">
              <div className="md-step">
                <div className="md-label">
                  入力条件<span className="md-en">Condition</span>
                </div>
                <div className="md-viz">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></svg>
                </div>
                <p className="md-cap">地形タイプ、標高範囲、地形特徴マップなど</p>
              </div>
              {stepArrow}
              <div className="md-step">
                <div className="md-label">
                  3Dノイズ場の初期化<span className="md-en">Initialization</span>
                </div>
                <div className="md-viz md-noise">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="7" r="1" /><circle cx="11" cy="5" r="1" /><circle cx="16" cy="8" r="1" /><circle cx="8" cy="12" r="1" /><circle cx="14" cy="13" r="1" /><circle cx="18" cy="11" r="1" /><circle cx="6" cy="17" r="1" /><circle cx="12" cy="18" r="1" /><circle cx="17" cy="16" r="1" /></svg>
                </div>
              </div>
              {stepArrow}
              <div className="md-step md-wide">
                <div className="md-label">
                  拡散過程<span className="md-en">Diffusion Process</span>
                </div>
                <div className="md-diffuse">
                  <span className="dcube n0" />
                  {diffuseArrow}
                  <span className="dcube n1" />
                  {diffuseArrow}
                  <span className="dcube n2" />
                  {diffuseArrow}
                  <span className="dcube n3" />
                </div>
                <div className="md-T">
                  <span>T</span>
                  <span className="md-dots" />
                  <span>0</span>
                </div>
              </div>
              {stepArrow}
              <div className="md-step">
                <div className="md-label">
                  条件付き生成<span className="md-en">Conditional Generation</span>
                </div>
                <div className="md-viz">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></svg>
                </div>
              </div>
              {stepArrow}
              <div className="md-step">
                <div className="md-label">
                  高解像度地形<span className="md-en">High-res Terrain</span>
                </div>
                <div className="md-viz md-mtn">
                  <TerrainCell variant="mtn" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RAIL */}
        <aside className="cs-rail">
          <section className="rail-block">
            <div className="rail-head">
              <span>プロジェクト概要</span>
              <span className="sec-rule" />
            </div>
            <div className="ov-list">
              {pd.overview.map((o, i) => (
                <div key={o.label} className="ov-row">
                  <div className="ov-ic">{overviewIcons[i]}</div>
                  <div>
                    <div className="ov-l">{o.label}</div>
                    {o.links ? (
                      o.links.map((l) => (
                        <a key={l.label} className="ov-link" href="#">
                          {l.label} {l.external && <ArrowUpRight sw={1.8} />}
                        </a>
                      ))
                    ) : (
                      <div className="ov-v">
                        <Lines text={o.value} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="rail-block">
            <div className="rail-head">
              <span>ハイライト</span>
              <span className="sec-rule" />
            </div>
            <ul className="hl-list">
              {pd.highlights.map((h) => (
                <li key={h}>
                  <span className="hl-ic">
                    <Check />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </section>
          <section className="rail-block">
            <div className="rail-head">
              <span>技術スタック</span>
              <span className="sec-rule" />
            </div>
            <div className="pd-stack-wrap">
              {pd.stack.map((s) => (
                <span key={s} className="pd-stack">
                  {s}
                </span>
              ))}
            </div>
          </section>
          <section className="rail-block">
            <div className="rail-head">
              <span>関連リンク</span>
              <span className="sec-rule" />
            </div>
            <div className="rel-list">
              {pd.relatedLinks.map((r) => (
                <a key={r} className="rel-link" href="#">
                  {r} <ArrowUpRight sw={1.8} />
                </a>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* QUALITATIVE + QUANTITATIVE */}
      <section className="cs-section cs-wide">
        <div className="sec-head">
          <div className="sec-title">
            <span className="star">✦</span> 結果の可視化 (Qualitative Results)
          </div>
          <div className="sec-rule" />
        </div>
        <div className="pd-results">
          <QualitativeGrid />
          <div className="pd-side">
            <div className="qt-box">
              <div className="qt-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M3 14h18M9 4v16" /></svg>{" "}
                定量評価 <span>(Quantitative Results)</span>
              </div>
              <table className="qt-table">
                <thead>
                  <tr>
                    <th className="qt-metric">Metric</th>
                    <th className="qt-ours">Ours</th>
                    <th>PGM</th>
                    <th>StyleGAN</th>
                  </tr>
                </thead>
                <tbody>
                  {pd.quantitative.map((r) => (
                    <tr key={r.metric}>
                      <td className="qt-metric">{r.metric}</td>
                      <td className="qt-ours">{r.ours}</td>
                      <td>{r.pgm}</td>
                      <td>{r.stylegan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="qt-box">
              <div className="qt-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5M4 19h16" /><path d="M7 16c2-1 3-5 5-5s3 3 5 1" /></svg>{" "}
                サンプリング効率の比較
              </div>
              <div className="pd-legend">
                <span>
                  <i style={{ background: "#e8a05a" }} />
                  Ours (Proposed)
                </span>
                <span>
                  <i style={{ background: "#5fc4a0" }} />
                  PGM
                </span>
                <span>
                  <i style={{ background: "#e8865a" }} />
                  StyleGAN
                </span>
              </div>
              <svg viewBox="0 0 260 160" className="pd-linechart" preserveAspectRatio="none">
                <line x1="34" y1="10" x2="34" y2="132" stroke="rgba(255,255,255,0.12)" />
                <line x1="34" y1="132" x2="250" y2="132" stroke="rgba(255,255,255,0.12)" />
                <polyline points="46,118 86,100 126,86 166,74 206,66 246,60" fill="none" stroke="#e8a05a" strokeWidth="2" />
                <polyline points="46,98 86,76 126,58 166,46 206,38 246,34" fill="none" stroke="#5fc4a0" strokeWidth="2" />
                <polyline points="46,80 86,56 126,42 166,32 206,26 246,22" fill="none" stroke="#e8865a" strokeWidth="2" opacity="0.85" />
              </svg>
              <div className="pd-axis">
                <span>Sampling Steps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABLATION + CONTRIBUTIONS */}
      <section className="cs-section cs-wide">
        <div className="pd-abl-grid">
          <div>
            <div className="sec-head">
              <div className="sec-title">
                <span className="star">✦</span> アブレーションスタディ (Ablation Study)
              </div>
            </div>
            <table className="abl-table">
              <thead>
                <tr>
                  <th className="abl-set">Setting</th>
                  <th>
                    Multi-scale
                    <br />
                    Condition
                  </th>
                  <th>
                    Terrain
                    <br />
                    Constraint
                  </th>
                  <th>FID (↓)</th>
                  <th>RMSE (↓)</th>
                  <th>多様性スコア (↑)</th>
                </tr>
              </thead>
              <tbody>
                {pd.ablation.map((row) => (
                  <tr key={row.setting} className={row.best ? "abl-best" : ""}>
                    <td className="abl-set">{row.setting}</td>
                    <td>
                      <span className={row.multiScale ? "abl-c" : "abl-x"}>{row.multiScale ? "✓" : "✕"}</span>
                    </td>
                    <td>
                      <span className={row.terrain ? "abl-c" : "abl-x"}>{row.terrain ? "✓" : "✕"}</span>
                    </td>
                    <td className={row.best ? "abl-num" : ""}>{row.fid}</td>
                    <td className={row.best ? "abl-num" : ""}>{row.rmse}</td>
                    <td className={row.best ? "abl-num" : ""}>{row.diversity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pd-contrib">
            <div className="sec-head">
              <div className="sec-title">
                貢献 <span className="sec-en">(Contributions)</span>
              </div>
            </div>
            <ul className="contrib-list">
              {pd.contributions.map((c) => (
                <li key={c}>
                  <span className="hl-ic">
                    <Check />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PUBLICATION + PRESENTATION */}
      <section className="cs-section cs-wide">
        <div className="pd-pub-grid">
          <div className="pd-pub-card">
            <div className="pd-card-head">
              {fileIcon} Publication
            </div>
            <span className="status-badge sb-sm">{pd.publication.statusBadge}</span>
            <h3 className="pd-pub-title">{pd.publication.title}</h3>
            <p className="pd-authors">{pd.publication.authors}</p>
            <p className="pd-affil">{pd.publication.affiliation}</p>
            <div className="chips pd-pub-chips">
              {pd.publication.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <div className="pd-pub-btns">
              <a className="pd-pillbtn" href="#">
                {fileIcon} PDF
              </a>
              <a className="pd-pillbtn" href="#">
                {arxivIcon} arXiv
              </a>
              <a className="pd-pillbtn" href="#">
                {bibtexIcon} BibTeX
              </a>
            </div>
          </div>
          <div className="pd-pub-card">
            <div className="pd-card-head">
              {projectorIcon} Presentation
            </div>
            <span className="status-badge sb-sm">{pd.presentation.statusBadge}</span>
            <div className="pd-pres-row">
              <div className="pd-pres-info">
                <p className="pd-pres-date">{pd.presentation.date}</p>
                <p className="pd-pres-dur">{pd.presentation.duration}</p>
              </div>
              <div className="pd-slide">
                <div className="pd-slide-img">
                  <TerrainCell variant="hero" />
                  <span className="pd-slide-logo">ICCV</span>
                </div>
                <div className="pd-slide-cap">
                  <div className="pd-slide-t">{pd.presentation.slideTitle}</div>
                  <div className="pd-slide-a">{pd.presentation.slideAuthors}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED WORK */}
      <section className="cs-section cs-wide">
        <div className="sec-head">
          <div className="sec-title">
            <span className="star">✦</span> 関連研究 (Related Work)
          </div>
          <div className="sec-rule" />
        </div>
        <div className="pd-related">
          {pd.relatedWork.map((rw) => (
            <div key={rw.title} className="rw-item">
              <div className="rw-ic">{icons[rw.icon]}</div>
              <div>
                <div className="rw-t">{rw.title}</div>
                <div className="rw-d">{rw.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="cs-contact">
        <p className="cs-contact-lead">ご質問や共同研究のご相談など、お気軽にご連絡ください。</p>
        <div className="cs-contact-btns">
          <a className="btn btn-ghost" href={profile.githubUrl}>
            <img className="btn-ic-img" src="/assets/github.png" alt="" />
            GitHub で見る
          </a>
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            {mailIcon}
            メールを送る
          </a>
        </div>
      </section>
    </>
  );
}
