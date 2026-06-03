import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, profile } from "@/content/content.data";
import { Lines } from "@/components/Lines";
import { Shot } from "@/components/mockups";
import { Gallery } from "@/components/Gallery";
import { ArrowUpRight, Check, icons } from "@/components/icons";

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies[slug];
  if (!cs) return {};
  return { title: `${cs.title} — Works — Haruto Miyakawa`, description: cs.lead };
}

/* ---- セクション別アイコン（HTML から忠実移植） ---- */
const csoIcons = {
  challenge: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 16.5h.01" /></svg>,
  solution: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 4 10.5c-.7.6-1 1.2-1 2H9c0-.8-.3-1.4-1-2A6 6 0 0 1 12 3Z" /></svg>,
  outcome: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5M4 19h16M7 15l3-3 3 2 5-6" /></svg>,
};

const csoArrow = (
  <div className="cso-arrow">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  </div>
);

const tldrIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h12a2 2 0 0 1 2 2v13l-4-2-4 2-4-2V5ZM4 5a2 2 0 0 0-2 2v11" /></svg>
);

const featureIcons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12h6M9 16h6M9 8h2M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 1 0 9 9M12 7v5l3 2M21 5l-2 2-2-2" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z M9 13l2 2 4-4" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 2M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /></svg>,
];

const mailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18v12H3zM3 7l9 6 9-6" /></svg>
);

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseStudies[slug];
  if (!cs) notFound();

  return (
    <>
      <nav className="crumbs">
        <Link href="/">Home</Link>
        <span className="crumb-sep">/</span>
        <Link href="/works">Works</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-cur">{cs.title}</span>
      </nav>

      {/* HERO */}
      <section className="cs-hero">
        <div className="cs-hero-main">
          <span className="cat-badge">{cs.categoryLabel}</span>
          <h1 className="cs-title">{cs.title}</h1>
          <p className="cs-lead">{cs.lead}</p>
          {cs.body && <p className="cs-body">{cs.body}</p>}
          <div className="cs-cta">
            {cs.links.map((l, i) => (
              <a key={l.kind} className={`btn ${i === 0 ? "btn-primary" : "btn-ghost"}`} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} <ArrowUpRight />
              </a>
            ))}
          </div>
        </div>
        <div className="cs-hero-shot">
          <div className="frame">
            <Shot mock={cs.shotMock} url={cs.url} />
          </div>
        </div>
      </section>

      <div className="cs-grid">
        <div className="cs-col">
          {/* META STRIP */}
          <section className="cs-section">
            <div className="meta-strip">
              {cs.meta.map((m) => (
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
                <span className="star">✦</span> プロジェクトの概要 (TL;DR)
              </div>
              <div className="sec-rule" />
            </div>
            <div className="tldr">
              <div className="tldr-ic">{tldrIcon}</div>
              <p>{cs.tldr}</p>
            </div>
          </section>

          {/* CHALLENGE / SOLUTION / OUTCOME */}
          <section className="cs-section">
            <div className="cso">
              <div className="cso-card">
                <div className="cso-head">
                  <span className="cso-ic">{csoIcons.challenge}</span>
                  <div>
                    <div className="cso-n">01 課題</div>
                    <div className="cso-en">Challenge</div>
                  </div>
                </div>
                <p className="cso-body">
                  {cs.challenge.heading && (
                    <>
                      <strong>{cs.challenge.heading}</strong>
                      <br />
                    </>
                  )}
                  {cs.challenge.body}
                </p>
                {cs.challenge.points && (
                  <ul className="cso-list">
                    {cs.challenge.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
              </div>
              {csoArrow}
              <div className="cso-card">
                <div className="cso-head">
                  <span className="cso-ic">{csoIcons.solution}</span>
                  <div>
                    <div className="cso-n">02 解決策</div>
                    <div className="cso-en">Solution</div>
                  </div>
                </div>
                <p className="cso-body">
                  {cs.solution.heading && (
                    <>
                      <strong>{cs.solution.heading}</strong>
                      <br />
                    </>
                  )}
                  {cs.solution.body}
                </p>
                {cs.solution.points && (
                  <ul className="cso-list">
                    {cs.solution.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
              </div>
              {csoArrow}
              <div className="cso-card">
                <div className="cso-head">
                  <span className="cso-ic">{csoIcons.outcome}</span>
                  <div>
                    <div className="cso-n">03 成果</div>
                    <div className="cso-en">Outcome</div>
                  </div>
                </div>
                <p className="cso-body">
                  {cs.outcome.heading && (
                    <>
                      <strong>{cs.outcome.heading}</strong>
                      <br />
                    </>
                  )}
                  {cs.outcome.body}
                </p>
                {cs.outcome.facts && (
                  <div className="fact-badges">
                    {cs.outcome.facts.map((f) => (
                      <span key={f} className="fact-badge">
                        <Check sw={2.2} />
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT RAIL */}
        <aside className="cs-rail">
          <section className="rail-block">
            <div className="rail-head">
              <span>プロジェクト概要</span>
              <span className="sec-rule" />
            </div>
            <div className="ov-list">
              {cs.overview.map((o) => (
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
              {cs.highlights.map((h) => (
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
              <span>関連リンク</span>
              <span className="sec-rule" />
            </div>
            <div className="rel-list">
              {cs.relatedLinks.map((r) => (
                <a key={r.label} className="rel-link" href={r.href} target="_blank" rel="noopener noreferrer">
                  {r.label} <ArrowUpRight sw={1.8} />
                </a>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* GALLERY（実スクショがある場合のみ表示） */}
      {cs.gallery && cs.gallery.length > 0 && <Gallery items={cs.gallery} url={cs.url ?? ""} />}

      {/* FEATURES（機能ブレイクダウンがある場合のみ表示） */}
      {cs.features && cs.features.length > 0 && (
        <section className="cs-section cs-wide">
          <div className="sec-head">
            <div className="sec-title">
              <span className="star">✦</span> 主な機能
            </div>
            <div className="sec-rule" />
          </div>
          <div className="feat-list">
            {cs.features.map((f, i) => (
              <article key={f.title} className={`feat${f.reverse ? " rev" : ""}`}>
                <div className="feat-info">
                  <div className="feat-ic">{featureIcons[i]}</div>
                  <div>
                    <h4 className="feat-t">{f.title}</h4>
                    <p className="feat-d">{f.desc}</p>
                    <div className="feat-tags">
                      {f.tags.map((t) => (
                        <span key={t} className="ftag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="feat-shot">
                  <Shot mock={f.mock} url={cs.url} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* TECH STACK */}
      <section className="cs-section cs-wide">
        <div className="sec-head">
          <div className="sec-title">
            <span className="star">✦</span> 技術スタック
          </div>
          <div className="sec-rule" />
        </div>
        <div className="stack-strip">
          {cs.stack.map((s) => (
            <div key={s.name} className="stack-item">
              <span className="stack-mark">{s.mark}</span>
              {s.name}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="cs-contact">
        <p className="cs-contact-lead">ご質問やご依頼など、お気軽にご連絡ください。</p>
        <div className="cs-contact-btns">
          <a className="btn btn-ghost" href={cs.github} target="_blank" rel="noopener noreferrer">
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
