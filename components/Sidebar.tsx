"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, profile, type NavKey } from "@/content/content.data";
import { navIcons, GithubIcon, XIcon, MailIcon } from "@/components/icons";
import { Lines } from "@/components/Lines";
import { LABEL_CONTACT } from "@/constants/labels";

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
  const drawerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // ルート遷移したらドロワーを閉じる
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 展開中: 背面スクロールをロック / フォーカスをドロワー内にトラップ / Escで閉じる / 閉じたらトリガーへ復帰
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const trigger = triggerRef.current;
    const focusables = drawer
      ? Array.from(drawer.querySelectorAll<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])'))
      : [];
    focusables[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [open]);

  const contactLinks = (
    <div className="contact">
      <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
        <GithubIcon />
        GitHub
      </a>
      <a href={profile.xUrl} target="_blank" rel="noopener noreferrer">
        <XIcon />
        X (Twitter)
      </a>
      <a href={`mailto:${profile.email}`}>
        <MailIcon />
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
          <div className="side-label">{LABEL_CONTACT}</div>
          {contactLinks}
        </div>

        <div className="lantern-wrap">
          <img src="/assets/lantern.webp" alt="" loading="lazy" decoding="async" />
        </div>
      </aside>

      {/* ===== モバイル：トップバー ===== */}
      <header className="topbar">
        <Link href="/" className="tb-brand" aria-label={profile.name}>
          <img className="tb-av pixel-art" src="/assets/avatar.png" alt="" />
          <span className="tb-name">{profile.name}</span>
        </Link>
        <button
          ref={triggerRef}
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
        ref={drawerRef}
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
          <div className="side-label">{LABEL_CONTACT}</div>
          {contactLinks}
        </div>
      </aside>
    </>
  );
}
