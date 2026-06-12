"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, profile, type NavKey } from "@/content/content.data";
import { navIcons, GithubIcon, XIcon, MailIcon } from "@/components/icons";
import { Lines } from "@/components/Lines";
import { DualLabel } from "@/components/DualLabel";
import {
  LABEL_CONTACT,
  LABEL_GAME_WORKS, LABEL_GAME_ABOUT, LABEL_GAME_RESEARCH,
  LABEL_GAME_CONTACT, LABEL_GAME_COMING_SOON, LABEL_GAME_RETURN,
} from "@/constants/labels";

function activeKey(pathname: string): NavKey {
  if (pathname.startsWith("/works")) return "works";
  if (pathname.startsWith("/research")) return "research";
  if (pathname.startsWith("/about")) return "about";
  return "home";
}

const gameLabels: Record<NavKey, string | null> = {
  home: null,
  works: LABEL_GAME_WORKS,
  research: LABEL_GAME_RESEARCH,
  about: LABEL_GAME_ABOUT,
};

function wipeAndApply(mode: "pro" | "game") {
  const wipe = document.getElementById("mode-wipe") as HTMLElement | null;
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const apply = () => {
    document.documentElement.dataset.mode = mode;
    try { localStorage.setItem("site-mode", mode); } catch { /* private browsing */ }
  };

  if (!wipe || prefersReduced) {
    apply();
    return;
  }

  wipe.classList.add("wipe-in");
  setTimeout(() => {
    apply();
    wipe.classList.remove("wipe-in");
    wipe.classList.add("wipe-out");
    setTimeout(() => { wipe.classList.remove("wipe-out"); }, 220);
  }, 220);
}

function handleLanternClick() { wipeAndApply("game"); }

const ReturnButton = () => (
  <button
    type="button"
    className="return-to-pro-btn"
    onClick={() => wipeAndApply("pro")}
  >
    ◀ {LABEL_GAME_RETURN}
  </button>
);

const LanternButton = () => (
  <button
    type="button"
    className="lantern-btn"
    aria-label="ゲームモードへ"
    onClick={handleLanternClick}
  >
    <img src="/assets/lantern.webp" alt="" loading="lazy" decoding="async" />
  </button>
);

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

        <div className="sidebar-mode-toggle">
          <ReturnButton />
        </div>

        <nav className="nav">
          {navItems.map((item) => {
            const gameLabel = gameLabels[item.key];
            return (
              <Link key={item.key} href={item.href} className={`nav-item${current === item.key ? " active" : ""}`}>
                {navIcons[item.key]}
                {gameLabel ? (
                  <DualLabel pro={item.label} game={gameLabel} />
                ) : (
                  item.label
                )}
              </Link>
            );
          })}
        </nav>

        <div>
          <div className="side-label">
            <DualLabel pro={LABEL_CONTACT} game={LABEL_GAME_CONTACT} />
          </div>
          {contactLinks}
        </div>

        {/* Game mode only: coming soon notice — not interactive */}
        <span className="press-start-link" aria-disabled="true">
          {LABEL_GAME_COMING_SOON}
        </span>

        <div className="lantern-wrap">
          <LanternButton />
        </div>
      </aside>

      {/* ===== モバイル：トップバー ===== */}
      <header className="topbar">
        <Link href="/" className="tb-brand" aria-label={profile.name}>
          <img className="tb-av pixel-art" src="/assets/avatar.png" alt="" />
          <span className="tb-name">{profile.name}</span>
        </Link>
        <ReturnButton />
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
          {navItems.map((item) => {
            const gameLabel = gameLabels[item.key];
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`drawer-item${current === item.key ? " active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {navIcons[item.key]}
                {gameLabel ? (
                  <DualLabel pro={item.label} game={gameLabel} />
                ) : (
                  item.label
                )}
              </Link>
            );
          })}
        </nav>

        <div className="drawer-contact">
          <div className="side-label">
            <DualLabel pro={LABEL_CONTACT} game={LABEL_GAME_CONTACT} />
          </div>
          {contactLinks}
        </div>

        {/* Game mode only: coming soon notice — not interactive */}
        <span className="press-start-link" aria-disabled="true">
          {LABEL_GAME_COMING_SOON}
        </span>

        <div className="lantern-wrap">
          <LanternButton />
        </div>

        <div className="drawer-mode-toggle">
          <ReturnButton />
        </div>
      </aside>
    </>
  );
}
