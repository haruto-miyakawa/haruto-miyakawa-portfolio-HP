import Link from "next/link";
import { SectionHead } from "@/components/SectionHead";
import { WorkMockView } from "@/components/mockups";
import { Lines } from "@/components/Lines";
import { ArrowRight, homeTechIcons } from "@/components/icons";
import { featuredWorks, homeHero, homeAbout, homeTech, processSteps, profile } from "@/content/content.data";

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
          <img src="/assets/hero.png" alt="Sunset scene" />
        </div>
        <div className="hero-content">
          <div className="hero-hello">{homeHero.hello}</div>
          <h1 className="hero-h1">
            <Lines text={homeHero.headingLines.join("\n")} />
          </h1>
          <p className="hero-jp">{homeHero.jp}</p>
          <p className="hero-body">
            <Lines text={homeHero.body} />
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#works">
              View My Works <ArrowRight sw={2.2} />
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
            <SectionHead title="Featured Works" star link={{ label: "View all works", href: "/works" }} />
            <div className="works">
              {featuredWorks.map((work) => (
                <article key={work.title} className="work">
                  <div className="thumb">
                    <span className="thumb-badge">{work.badge}</span>
                    <WorkMockView mock={work.mock} />
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
            <SectionHead title="My Process" />
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
                  Available for work
                </div>
                <h3 className="cta-head">
                  Let&apos;s build something
                  <br />
                  meaningful together.
                </h3>
                <p className="cta-sub">
                  新しいプロダクトやインターン・業務委託のご相談を歓迎しています。お気軽にご連絡ください。
                </p>
              </div>
              <div className="cta-actions">
                <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                  Get in touch <ArrowRight sw={2.2} />
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
            <SectionHead title="About Me" />
            <div className="about-name">{homeAbout.name}</div>
            <p className="about-bio">{homeAbout.bio}</p>
            <ul className="about-list">
              {homeAbout.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <Link className="about-more" href="/about">
              More About Me <ArrowRight />
            </Link>
          </section>

          {/* TECH I USE */}
          <section>
            <SectionHead title="Tech I Use" />
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
