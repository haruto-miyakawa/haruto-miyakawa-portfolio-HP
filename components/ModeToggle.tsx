"use client";
import { LABEL_MODE_PRO, LABEL_MODE_GAME } from "@/constants/labels";

function applyMode(mode: "pro" | "game") {
  document.documentElement.dataset.mode = mode;
  try { localStorage.setItem("site-mode", mode); } catch { /* private browsing */ }
}

export function ModeToggle() {
  function toggle() {
    const html = document.documentElement;
    const next = html.dataset.mode === "game" ? "pro" : "game";
    const wipe = document.getElementById("mode-wipe") as HTMLElement | null;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!wipe || prefersReduced) {
      applyMode(next);
      return;
    }

    wipe.classList.add("wipe-in");
    const t1 = setTimeout(() => {
      applyMode(next);
      wipe.classList.remove("wipe-in");
      wipe.classList.add("wipe-out");
      const t2 = setTimeout(() => {
        wipe.classList.remove("wipe-out");
      }, 220);
      // Store so hot-reload doesn't leak
      return () => clearTimeout(t2);
    }, 220);
    return () => clearTimeout(t1);
  }

  return (
    <button
      type="button"
      className="mode-toggle"
      aria-label="サイトモードを切り替える"
      onClick={toggle}
    >
      <span className="mt-pro">{LABEL_MODE_PRO}</span>
      <span className="mt-sep">/</span>
      <span className="mt-game">{LABEL_MODE_GAME}</span>
    </button>
  );
}
