"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, profile, type NavKey } from "@/content/content.data";
import { navIcons } from "@/components/icons";
import { Lines } from "@/components/Lines";

function activeKey(pathname: string): NavKey {
  if (pathname.startsWith("/works")) return "works";
  if (pathname.startsWith("/research")) return "research";
  if (pathname.startsWith("/about")) return "about";
  return "home";
}

export function Sidebar() {
  const pathname = usePathname();
  const current = activeKey(pathname);

  return (
    <aside className="sidebar">
      <div className="id-block">
        <div className="avatar-frame">
          <img className="av-photo" src="/assets/avatar.png" alt={profile.name} />
          <img className="av-frame" src="/assets/frame.png" alt="" />
        </div>
        <div>
          <div className="id-name">{profile.name}</div>
          <div className="id-role">
            <Lines text={profile.roleLines.join("\n")} />
          </div>
        </div>
      </div>

      <nav className="nav">
        {navItems.map((item) => (
          <Link key={item.key} href={item.href} className={`nav-item${current === item.key ? " active" : ""}`}>
            {navIcons[item.key]}
            {item.label}
          </Link>
        ))}
      </nav>

      <div>
        <div className="side-label">Contact</div>
        <div className="contact">
          <a href={profile.githubUrl}>
            <img className="ic-img" src="/assets/github.png" alt="" />
            GitHub
          </a>
          <a href={profile.xUrl}>
            <img className="ic-img" src="/assets/x.png" alt="" />
            X (Twitter)
          </a>
          <a href={`mailto:${profile.email}`}>
            <img className="ic-img" src="/assets/mail.png" alt="" />
            Mail
          </a>
        </div>
      </div>

      <div className="lantern-wrap">
        <img src="/assets/lantern.png" alt="" />
      </div>
    </aside>
  );
}
