import Link from "next/link";
import { SectionHead } from "@/components/SectionHead";
import { WorkThumb } from "@/components/mockups";
import { Lines } from "@/components/Lines";
import { ArrowRight, homeTechIcons } from "@/components/icons";
import { featuredWorks, homeHero, homeAbout, homeTech, processSteps, profile } from "@/content/content.data";
import {
  LABEL_FEATURED_WORKS, LABEL_VIEW_ALL_WORKS, LABEL_VIEW_MY_WORKS,
  LABEL_MY_PROCESS, LABEL_AVAILABLE_FOR_WORK, LABEL_GET_IN_TOUCH,
  LABEL_CTA_HEAD_L1, LABEL_CTA_HEAD_L2,
  LABEL_ABOUT_ME, LABEL_MORE_ABOUT_ME, LABEL_TECH_I_USE,
} from "@/constants/labels";

const processIcons = [
  <svg key="s" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-4.3-4.3" />
  </svg>,
  <svg key="p" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 3.5 20.5 9.5 8 22H2v-6z" />
    <path d="m12 6 6 6" />
  </svg>,
  <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4" />
  </svg>,
  <svg key="g" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19V5M4 19h16M7 15l3-3 3 2 5-6" />
  </svg>,
];

const processArrow = (
  <div className="parrow">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  </div>
);

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-img">
          <img className="pixel-art" src="/assets/hero.webp" alt="夕暮れの風景" decoding="async" fetchPriority="high" />
        </div>
        <div className="hero-content">
          {homeHero.hello && <div className="hero-hello">{homeHero.hello}</div>}
          <h1 className="hero-h1">
            <Lines text={homeHero.headingLines.join("\n")} />
          </h1>
          {homeHero.jp && <p className="hero-jp">{homeHero.jp}</p>}
          <p className="hero-body">
            <Lines text={homeHero.body} />
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#works">
              {LABEL_VIEW_MY_WORKS} <ArrowRight sw={2.2} />
            </a>
          </div>
          <div className="taglist">
            {homeHero.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
            <span className="tag more">···</span>
          </div>
        </div>
      </section>

      {/* LOWER */}
      <div className="lower">
        {/* LEFT COLUMN */}
        <div className="col-left">
          {/* FEATURED WORKS */}
          <section id="works">
            <SectionHead title={LABEL_FEATURED_WORKS} star link={{ label: LABEL_VIEW_ALL_WORKS, href: "/works" }} />
            <div className="works">
              {featuredWorks.map((work) => (
                <article key={work.title} className="work">
                  <div className="thumb">
                    <span className="thumb-badge">{work.badge}</span>
                    <WorkThumb title={work.title} badge={work.badge} thumb={work.thumb} />
                  </div>
                  <h3 className="work-title">{work.title}</h3>
                  <p className="work-desc">{work.description}</p>
                  <div className="chips">
                    {work.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* MY PROCESS */}
          <section>
            <SectionHead title={LABEL_MY_PROCESS} />
            <div className="process">
              {processSteps.map((step, i) => (
                <div key={step.title} style={{ display: "contents" }}>
                  <div className="pstep">
                    <div className="picon">{processIcons[i]}</div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                  {i < processSteps.length - 1 && processArrow}
                </div>
              ))}
            </div>
          </section>

          {/* AVAILABLE FOR WORK */}
          <section className="cta-banner">
            <div className="cta-glow" />
            <div className="cta-inner">
              <div className="cta-copy">
                <div className="cta-status">
                  <span className="cta-dot" />
                  {LABEL_AVAILABLE_FOR_WORK}
                </div>
                <h3 className="cta-head">
                  {LABEL_CTA_HEAD_L1}
                  <br />
                  {LABEL_CTA_HEAD_L2}
                </h3>
                <p className="cta-sub">
                  新しいプロダクトやインターン・業務委託のご相談を歓迎しています。お気軽にご連絡ください。
                </p>
              </div>
              <div className="cta-actions">
                <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                  {LABEL_GET_IN_TOUCH} <ArrowRight sw={2.2} />
                </a>
                <a className="cta-mail" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-right">
          {/* ABOUT ME */}
          <section>
            <SectionHead title={LABEL_ABOUT_ME} />
            <div className="about-name">{homeAbout.name}</div>
            <p className="about-bio">{homeAbout.bio}</p>
            <ul className="about-list">
              {homeAbout.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <Link className="about-more" href="/about">
              {LABEL_MORE_ABOUT_ME} <ArrowRight />
            </Link>
          </section>

          {/* TECH I USE */}
          <section>
            <SectionHead title={LABEL_TECH_I_USE} />
            <div className="tech">
              {homeTech.map((tech) => (
                <div key={tech.name} className="tech-item">
                  <div className="tech-emblem">{homeTechIcons[tech.name]}</div>
                  <div>
                    <div className="tech-name">{tech.name}</div>
                    <div className="tech-desc">{tech.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
