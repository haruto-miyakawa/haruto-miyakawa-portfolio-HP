import type { Metadata } from "next";
import Link from "next/link";
import { about } from "@/content/content.data";
import { Lines } from "@/components/Lines";
import { icons } from "@/components/icons";

export const metadata: Metadata = {
  title: "About — Haruto Miyakawa",
  description: "妥協なき創作を、誠実に。Web Engineer / AI Builder, Haruto Miyakawa の自己紹介。",
};

const cardHeadIcons = {
  profile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" /></svg>,
  values: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5.5 4h13l3 5-9.5 11L3 9l2.5-5Z" /><path d="M3 9h18M9 4l-1 5 4 11 4-11-1-5" /></svg>,
  whatIDo: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M9 21h6M12 17v4M7 8h7M7 11h4" /></svg>,
  tech: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" /></svg>,
};

export default function AboutPage() {
  return (
    <>
      <div className="ab-hero-img">
        <img src="/assets/hero.png" alt="Sunset desk scene" />
      </div>

      {/* BREADCRUMB */}
      <nav className="crumbs">
        <Link href="/">Home</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-cur">About</span>
      </nav>

      {/* HERO */}
      <section className="ab-hero">
        <div className="ab-hero-content">
          <h1 className="ab-title">About Me</h1>
          <p className="ab-catch">{about.catch}</p>
          <div className="ab-intro">
            {about.intro.map((p, i) => (
              <p key={i}>
                <Lines text={p} />
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* CARDS */}
      <div className="ab-cards">
        {/* Profile */}
        <section className="ab-card">
          <div className="ab-card-head">
            <span className="ab-card-ic">{cardHeadIcons.profile}</span>
            <span className="ab-card-title">Profile</span>
            <span className="ab-card-rule" />
          </div>
          <div className="pf-list">
            {about.profileRows.map((row) => (
              <div key={row.label} className="pf-row">
                <span className="pf-key">
                  {icons[row.icon]}
                  {row.label}
                </span>
                <span className="pf-val">
                  <Lines text={row.value} />
                </span>
              </div>
            ))}
          </div>
          <div className="pf-note">
            <span className="pf-note-ic">{icons.star}</span>
            <p>{about.profileNote}</p>
          </div>
        </section>

        {/* Values */}
        <section className="ab-card">
          <div className="ab-card-head">
            <span className="ab-card-ic">{cardHeadIcons.values}</span>
            <span className="ab-card-title">Values</span>
            <span className="ab-card-rule" />
          </div>
          <div className="val-list">
            {about.values.map((v) => (
              <div key={v.title} className="val-item">
                <div className="val-ic">{icons[v.icon]}</div>
                <div>
                  <div className="val-t">{v.title}</div>
                  <div className="val-d">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What I Do */}
        <section className="ab-card">
          <div className="ab-card-head">
            <span className="ab-card-ic">{cardHeadIcons.whatIDo}</span>
            <span className="ab-card-title">What I Do</span>
            <span className="ab-card-rule" />
          </div>
          <div className="val-list">
            {about.whatIDo.map((w) => (
              <div key={w.title} className="val-item">
                <div className="val-ic">{icons[w.icon]}</div>
                <div>
                  <div className="val-t">{w.title}</div>
                  <div className="val-d">{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech I Use */}
        <section className="ab-card">
          <div className="ab-card-head">
            <span className="ab-card-ic">{cardHeadIcons.tech}</span>
            <span className="ab-card-title">Tech I Use</span>
            <span className="ab-card-rule" />
          </div>
          <div className="tech-grid">
            {about.tech.map((t) => (
              <div key={t.name} className="tech-cell">
                {t.emblem === "N" || t.emblem === "TS" ? (
                  <span className="tech-emblem tech-mark">{t.emblem}</span>
                ) : (
                  <span className="tech-emblem">{icons[t.emblem]}</span>
                )}
                <div className="tech-tx">
                  <div className="tech-name">{t.name}</div>
                  <div className="tech-use">{t.use}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
