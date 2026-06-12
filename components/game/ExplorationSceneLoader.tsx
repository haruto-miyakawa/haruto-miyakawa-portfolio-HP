"use client";
import dynamic from "next/dynamic";

const ExplorationScene = dynamic(() => import("@/components/game/ExplorationScene"), {
  ssr: false,
  loading: () => <div className="play-loading" aria-label="読み込み中">Loading…</div>,
});

export function ExplorationSceneLoader() {
  return <ExplorationScene />;
}
