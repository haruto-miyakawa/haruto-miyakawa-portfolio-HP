"use client";

import { useEffect, useState } from "react";
import { hasSeenSfxNotice, markSfxNoticeSeen } from "@/lib/sfx";

// 初回訪問時だけ、控えめに「このサイトには効果音がある（初期オフ）」と知らせるトースト。
// 一度表示したら localStorage("sfx-notice-seen") で再表示しない。
// prefers-reduced-motion 時はフェードなし（CSS 側で対応）。音の ON/OFF とは無関係。
export function SfxNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (hasSeenSfxNotice()) return;
    // 着地直後の邪魔を避け、少し置いてから出す。
    const showTimer = window.setTimeout(() => {
      setShow(true);
      markSfxNoticeSeen(); // 表示した時点で「見た」扱い（閉じ忘れても再表示しない）
    }, 1200);
    return () => window.clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!show) return;
    const hideTimer = window.setTimeout(() => setShow(false), 8000);
    return () => window.clearTimeout(hideTimer);
  }, [show]);

  if (!show) return null;

  return (
    <div className="sfx-notice" role="status" aria-live="polite">
      <p className="sfx-notice-text">
        このサイトには ささやかな効果音があります。初期設定はオフ — ランタンの灯る世界（ゲームモード）でオンにできます。
      </p>
      <button
        type="button"
        className="sfx-notice-close"
        aria-label="お知らせを閉じる"
        onClick={() => setShow(false)}
      >
        ✕
      </button>
    </div>
  );
}
