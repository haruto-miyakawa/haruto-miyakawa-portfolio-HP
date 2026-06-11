import Link from "next/link";
import { profile, navItems } from "@/content/content.data";
import { GithubIcon, XIcon, MailIcon } from "@/components/icons";
import { DualLabel } from "@/components/DualLabel";
import {
  LABEL_ROLE, LABEL_BACK_TO_TOP,
  LABEL_GAME_WORKS, LABEL_GAME_RESEARCH, LABEL_GAME_ABOUT,
} from "@/constants/labels";

const footerGameLabels: Record<string, string | null> = {
  home: null,
  works: LABEL_GAME_WORKS,
  research: LABEL_GAME_RESEARCH,
  about: LABEL_GAME_ABOUT,
};

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="sf-top">
        <div className="sf-brand">
          <div className="sf-name">{profile.name}</div>
          <div className="sf-role">{LABEL_ROLE}</div>
        </div>
        <nav className="sf-nav" aria-label="フッターナビゲーション">
          {navItems.map((item) => {
            const gameLabel = footerGameLabels[item.key] ?? null;
            return (
              <Link key={item.key} href={item.href}>
                {gameLabel ? <DualLabel pro={item.label} game={gameLabel} /> : item.label}
              </Link>
            );
          })}
        </nav>
        <div className="sf-social">
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a href={profile.xUrl} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <XIcon />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Mail">
            <MailIcon />
          </a>
        </div>
      </div>
      <div className="sf-bottom">
        <span>© {year} Haruto Miyakawa</span>
        <a className="sf-toplink" href="#main">
          {LABEL_BACK_TO_TOP}
        </a>
      </div>
    </footer>
  );
}
