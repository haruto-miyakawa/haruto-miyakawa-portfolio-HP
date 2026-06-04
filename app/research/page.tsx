import type { Metadata } from "next";
import { ResearchGrid } from "@/components/ResearchGrid";
import { CardLink } from "@/components/CardLink";
import { ResearchThumb } from "@/components/mockups";
import { Lines } from "@/components/Lines";
import { ArrowRight, icons } from "@/components/icons";
import { researchHero, featuredResearch, researchAreas, researchHighlights } from "@/content/content.data";

export const metadata: Metadata = {
  title: "Research — Haruto Miyakawa",
  description: "探究心を原動力に、実世界の課題解決を目指した研究を行っています。査読付き国際会議での発表と進行中の研究。",
};

const featBadgeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l4 5-4 13-4-13 4-5Z" /></svg>
);

const filledStar = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9L12 3.5Z" fill="currentColor" stroke="none" /></svg>
);

export default function ResearchPage() {
  const detailSlug = featuredResearch.slug;
  return (
    <>
      {/* HEADER */}
      <section className="rhead">
        <div className="rhead-img">
          <img src="/assets/hero-Research.png" alt="夕暮れの机（ノートPCと本）" />
        </div>
        <div className="rhead-content">
          <div className="cta-status">
            <span className="cta-dot" />
            {researchHero.statusLabel}
          </div>
          <h1 className="rhead-title">{researchHero.title}</h1>
          <p className="rhead-lead">{researchHero.lead}</p>
          <p className="rhead-sub">{researchHero.sub}</p>
          <div className="ri-block">
            <div className="ri-label">{researchHero.interestsLabel}</div>
            <div className="ri-tags">
              {researchHero.interests.map((interest) => (
                <span key={interest.label} className="ri-tag">
                  {icons[interest.icon]}
                  {interest.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BODY GRID */}
      <div className="re-grid">
        <div className="re-main">
          <div className="sec-head">
            <div className="sec-title">
              <span className="star">✦</span> Featured Research
            </div>
            <div className="sec-rule" />
          </div>

          {/* FEATURED CARD */}
          <CardLink href={`/research/${detailSlug}`} className="feat-paper">
            <div className="fp-img">
              <ResearchThumb type={featuredResearch.thumb} />
              <span className="fp-badge">
                {featBadgeIcon}
                {featuredResearch.badgeLabel}
              </span>
            </div>
            <div className="fp-body">
              <button className="fp-star" aria-label="お気に入り">
                {filledStar}
              </button>
              <h2 className="fp-title">
                <Lines text={featuredResearch.title} />
              </h2>
              <p className="fp-desc">{featuredResearch.description}</p>
              <div className="chips fp-chips">
                {featuredResearch.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="fp-foot">
                <div className="fp-meta">
                  <span className="fp-venue">{featuredResearch.venue}</span>
                  <span className="fp-where">{featuredResearch.where}</span>
                </div>
                <a className="rc-link" href={featuredResearch.paperUrl} target="_blank" rel="noopener noreferrer">
                  Read Paper <ArrowRight />
                </a>
              </div>
            </div>
          </CardLink>

          <ResearchGrid />

          <a className="see-all" href="#">
            すべての研究を見る <ArrowRight />
          </a>
        </div>

        {/* RIGHT RAIL */}
        <aside className="re-rail">
          <section>
            <div className="rail-head">
              <span>研究関心</span>
              <span className="sec-rule" />
            </div>
            <div className="ri-areas">
              {researchAreas.map((area) => (
                <div key={area.title} className="ri-area">
                  <div className="ri-area-ic">{icons[area.icon]}</div>
                  <div className="ri-area-tx">
                    <div className="ri-area-t">{area.title}</div>
                    <div className="ri-area-d">{area.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div className="rail-head">
              <span>Research Highlights</span>
              <span className="sec-rule" />
            </div>
            <div className="rh-list">
              {researchHighlights.map((hl) => (
                <div key={hl.title} className="rh-item">
                  <div className="rh-ic">{icons[hl.icon]}</div>
                  <div>
                    <div className="rh-t">{hl.title}</div>
                    <div className="rh-d">
                      <Lines text={hl.desc} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <a className="cv-link" href="#">
            CV / Publications <ArrowRight />
          </a>
        </aside>
      </div>
    </>
  );
}
