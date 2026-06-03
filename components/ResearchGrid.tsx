"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { publications, researchTabs, type PaperBadge } from "@/content/content.data";
import { ResearchThumb } from "@/components/mockups";
import { ArrowRight } from "@/components/icons";
import { Lines } from "@/components/Lines";

const badgeIcons: Record<PaperBadge, ReactNode> = {
  intl: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  domestic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M16 6.5a3 3 0 0 1 0 6M21 19c0-2.4-1.6-4.2-3.8-4.8" />
    </svg>
  ),
  reviewed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M14 3v4h4M9 13h6M9 17h4" />
    </svg>
  ),
  ongoing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" />
      <path d="M7.5 14h9" />
    </svg>
  ),
};

export function ResearchGrid() {
  const router = useRouter();
  const [activeCat, setActiveCat] = useState("all");

  return (
    <>
      <div className="rtabs">
        {researchTabs.map((tab) => (
          <button
            key={tab.key}
            className={`rtab${activeCat === tab.key ? " active" : ""}`}
            onClick={() => setActiveCat(tab.key)}
          >
            {tab.label} <span className="rtab-n">{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="rgrid">
        {publications.map((pub) => {
          const hide = activeCat !== "all" && !pub.cats.includes(activeCat);
          return (
            <article
              key={pub.slug}
              className={`rcard${hide ? " hide" : ""}`}
              onClick={(e) => {
                if (!(e.target as HTMLElement).closest("a")) router.push(`/research/${pub.slug}`);
              }}
            >
              <div className="rthumb">
                <span className={`rvbadge v-${pub.badge}`}>
                  {badgeIcons[pub.badge]}
                  {pub.badgeLabel}
                </span>
                {pub.status && <span className="rstatus ok">{pub.status}</span>}
                <ResearchThumb type={pub.thumb} />
              </div>
              <h3 className="rc-title">
                <Lines text={pub.title} />
              </h3>
              <p className="rc-desc">{pub.description}</p>
              <div className="chips rc-chips">
                {pub.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="rc-foot">
                <span className="rc-venue">{pub.venue}</span>
                <a className="rc-link" href="#">
                  {pub.linkLabel} <ArrowRight />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
