import type { Metadata } from "next";
import { ResearchGrid } from "@/components/ResearchGrid";
import { CardLink } from "@/components/CardLink";
import { ResearchThumb } from "@/components/mockups";
import { Lines } from "@/components/Lines";
import { ArrowRight, icons } from "@/components/icons";
import { researchHero, featuredResearch, researchAreas, researchHighlights } from "@/content/content.data";

export const metadata: Metadata = {
  title: "Research — Haruto Miyakawa",
  description: "探究心を原動力に、実世界の課題解決を目指した研究を行っています。国際会議や学会での発表・採択実績。",
};

const interestIcons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /><circle cx="12" cy="12" r="3" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.3A3.5 3.5 0 0 1 17 18Z" /><circle cx="9" cy="14" r=".6" fill="currentColor" /><circle cx="13" cy="13" r=".6" fill="currentColor" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20l4-16M19 20l-4-16M3 9h18M3 15h18" /></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 10h8M8 14h5" /><path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /></svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="9" r="3" /><path d="M3 19c0-2.8 2.2-5 5-5M14 8h6M14 12h6M14 16h4" /></svg>,
  <svg key="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5.5a3 3 0 0 0-4 4L4 16v3h3l6.5-6.5a3 3 0 0 0 4-4l-2 2-2-2 2-2Z" /></svg>,
];

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
          <img src="/assets/hero.png" alt="Sunset desk scene" />
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
              {researchHero.interests.map((interest, i) => (
                <span key={interest} className="ri-tag">
                  {interestIcons[i]}
                  {interest}
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
              <ResearchThumb type="terrain" />
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
                <a className="rc-link" href="#">
                  Read Paper <ArrowRight />
                </a>
              </div>
            </div>
          </CardLink>

          <ResearchGrid detailSlug={detailSlug} />

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
