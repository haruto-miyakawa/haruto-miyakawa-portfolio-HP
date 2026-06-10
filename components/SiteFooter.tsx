import Link from "next/link";
import { profile, navItems } from "@/content/content.data";
import { GithubIcon, XIcon, MailIcon } from "@/components/icons";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="sf-top">
        <div className="sf-brand">
          <div className="sf-name">{profile.name}</div>
          <div className="sf-role">Web Engineer / AI Builder</div>
        </div>
        <nav className="sf-nav" aria-label="フッターナビゲーション">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href}>
              {item.label}
            </Link>
          ))}
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
          トップへ戻る ↑
        </a>
      </div>
    </footer>
  );
}
