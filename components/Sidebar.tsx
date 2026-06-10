"use client";

import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);

  // ルート遷移したらドロワーを閉じる
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ドロワー展開中は背面スクロールをロックし、Esc で閉じる
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const contactLinks = (
    <div className="contact">
      <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
        <img className="ic-img" src="/assets/github.png" alt="" />
        GitHub
      </a>
      <a href={profile.xUrl} target="_blank" rel="noopener noreferrer">
        <img className="ic-img" src="/assets/x.png" alt="" />
        X (Twitter)
      </a>
      <a href={`mailto:${profile.email}`}>
        <img className="ic-img" src="/assets/mail.png" alt="" />
        Mail
      </a>
    </div>
  );

  return (
    <>
      {/* ===== デスクトップ：固定サイドバー ===== */}
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
          {contactLinks}
        </div>

        <div className="lantern-wrap">
          <img src="/assets/lantern.png" alt="" />
        </div>
      </aside>

      {/* ===== モバイル：トップバー ===== */}
      <header className="topbar">
        <Link href="/" className="tb-brand" aria-label={profile.name}>
          <img className="tb-av pixel-art" src="/assets/avatar.png" alt="" />
          <span className="tb-name">{profile.name}</span>
        </Link>
        <button
          type="button"
          className={`menu-btn${open ? " open" : ""}`}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* ===== モバイル：ドロワー ＋ 背面オーバーレイ ===== */}
      <div className={`drawer-backdrop${open ? " open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside
        id="mobile-drawer"
        className={`drawer${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="ナビゲーション"
      >
        <div className="drawer-id">
          <div className="id-name">{profile.name}</div>
          <div className="id-role">
            <Lines text={profile.roleLines.join("\n")} />
          </div>
        </div>

        <nav className="drawer-nav">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`drawer-item${current === item.key ? " active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {navIcons[item.key]}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="drawer-contact">
          <div className="side-label">Contact</div>
          {contactLinks}
        </div>
      </aside>
    </>
  );
}
