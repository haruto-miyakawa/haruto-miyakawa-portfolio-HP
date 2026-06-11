import { LABEL_GAME_CLEAR, LABEL_GAME_NOW_PLAYING } from "@/constants/labels";

interface QuestCardProps {
  children: React.ReactNode;
  /** Derive from actual work status — no fabricated data */
  status: "complete" | "in-progress";
}

export function QuestCard({ children, status }: QuestCardProps) {
  const badge = status === "complete" ? LABEL_GAME_CLEAR : LABEL_GAME_NOW_PLAYING;
  const badgeClass = status === "complete" ? "qc-badge qc-clear" : "qc-badge qc-playing";

  return (
    <div className="quest-card">
      <span className={badgeClass} aria-label={status === "complete" ? "完了" : "進行中"}>
        {badge}
      </span>
      {children}
    </div>
  );
}
