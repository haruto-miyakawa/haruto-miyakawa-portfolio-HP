import type { Metadata } from "next";
import { ExplorationSceneLoader } from "@/components/game/ExplorationSceneLoader";

export const metadata: Metadata = {
  title: "探索シーン",
  robots: { index: false, follow: false },
};

export default function PlayPage() {
  return (
    <div className="play-page">
      <ExplorationSceneLoader />
    </div>
  );
}
