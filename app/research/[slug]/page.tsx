import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { paperDetails, profile } from "@/content/content.data";
import { Lines } from "@/components/Lines";
import { TerrainCell } from "@/components/mockups";
import { ArrowUpRight, Check, icons } from "@/components/icons";

export function generateStaticParams() {
  return Object.keys(paperDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pd = paperDetails[slug];
  if (!pd) return {};
  return { title: `${pd.title.replace(/\n/g, " ")} — Research`, description: pd.lead };
}

const diamondIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l4 5-4 13-4-13 4-5Z" /></svg>
);
const csoProblem = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 16.5h.01" /></svg>;
const csoApproach = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 4 10.5c-.7.6-1 1.2-1 2H9c0-.8-.3-1.4-1-2A6 6 0 0 1 12 3Z" /></svg>;
const csoResults = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5M4 19h16M8 15l3-4 3 2 4-6" /></svg>;
const csoArrow = (
  <div className="cso-arrow">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  </div>
);
const fileIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M14 3v4h4M9 13h6M9 17h4" /></svg>;
const mailIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6 8.5-6" /></svg>;

function renderAuthors(authors: string, highlight?: string) {
  return authors.split(", ").map((name, i) => (
    <span key={name}>
      {i > 0 && ", "}
      {name === highlight ? <strong>{name}</strong> : name}
    </span>
  ));
}

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
          {pd.body && <p className="cs-body">{pd.body}</p>}
          {pd.links.length > 0 && (
            <div className="cs-cta">
              {pd.links.map((l, i) => (
                <a key={l.label} className={`btn ${i === 0 ? "btn-pub" : "btn-ghost"}`} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} <ArrowUpRight />
                </a>
              ))}
            </div>
          )}
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
            <div className={`meta-strip${pd.meta.length === 6 ? " pd-meta6" : ""}`}>
              {pd.meta.map((m) => (
                <div key={m.label} className="meta-card">
                  <div className="meta-ic">{icons[m.icon]}</div>
                  <div>
                    <div className="meta-l">{m.label}</div>
                    <div className="meta-v">
                      {m.status && <span className="ok-dot" />}
                      <Lines text={m.value} />
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

          {/* PROBLEM / APPROACH / RESULTS（または検証予定） */}
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
              <div className={`cso-card${pd.results.stats ? " cso-res" : ""}`}>
                <div className="cso-head">
                  <span className="cso-ic">{csoResults}</span>
                  <div>
                    <div className="cso-n">03 {pd.results.label}</div>
                    <div className="cso-en">{pd.results.en}</div>
                  </div>
                </div>
                <p className="cso-body">{pd.results.body}</p>
                {pd.results.stats && (
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
                )}
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
              {pd.overview.map((o) => (
                <div key={o.label} className="ov-row">
                  <div className="ov-ic">{icons[o.icon]}</div>
                  <div>
                    <div className="ov-l">{o.label}</div>
                    {o.link ? (
                      <a className="ov-link" href={o.href} target="_blank" rel="noopener noreferrer">
                        {o.value} <ArrowUpRight sw={1.8} />
                      </a>
                    ) : (
                      <div className="ov-v">
                        {o.status && <span className="ok-dot" />}
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
          {pd.stack && pd.stack.length > 0 && (
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
          )}
          {pd.relatedLinks.length > 0 && (
            <section className="rail-block">
              <div className="rail-head">
                <span>関連リンク</span>
                <span className="sec-rule" />
              </div>
              <div className="rel-list">
                {pd.relatedLinks.map((r) => (
                  <a key={r.label} className="rel-link" href={r.href} target="_blank" rel="noopener noreferrer">
                    {r.label} <ArrowUpRight sw={1.8} />
                  </a>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>

      {/* CONTRIBUTIONS（発表済みのみ） */}
      {pd.contributions && pd.contributions.length > 0 && (
        <section className="cs-section cs-wide pd-contrib">
          <div className="sec-head">
            <div className="sec-title">
              貢献 <span className="sec-en">(Contributions)</span>
            </div>
            <div className="sec-rule" />
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
        </section>
      )}

      {/* PUBLICATION（発表済みのみ） */}
      {pd.publication && (
        <section className="cs-section cs-wide">
          <div className="pd-pub-card">
            <div className="pd-card-head">
              {fileIcon} Publication
            </div>
            <span className="status-badge sb-sm">{pd.publication.statusBadge}</span>
            <h3 className="pd-pub-title">{pd.publication.title}</h3>
            <p className="pd-authors">{renderAuthors(pd.publication.authors, pd.publication.authorHighlight)}</p>
            <p className="pd-affil">{pd.publication.affiliation}</p>
            <div className="chips pd-pub-chips">
              {pd.publication.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <div className="pd-pub-btns">
              {pd.publication.links.map((l) => (
                <a key={l.label} className="pd-pillbtn" href={l.href} target="_blank" rel="noopener noreferrer">
                  {fileIcon} {l.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT CTA */}
      <section className="cs-contact">
        <p className="cs-contact-lead">ご質問や共同研究のご相談など、お気軽にご連絡ください。</p>
        <div className="cs-contact-btns">
          {pd.github && (
            <a className="btn btn-ghost" href={pd.github} target="_blank" rel="noopener noreferrer">
              <img className="btn-ic-img" src="/assets/github.png" alt="" />
              GitHub で見る
            </a>
          )}
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            {mailIcon}
            メールを送る
          </a>
        </div>
      </section>
    </>
  );
}
