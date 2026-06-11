import Link from "next/link";
import { WorkThumb } from "@/components/mockups";
import { ArrowRight } from "@/components/icons";
import { LABEL_CASE_STUDY, LABEL_GAME_CLEAR, LABEL_GAME_NOW_PLAYING } from "@/constants/labels";

interface WorkLike {
  title: string;
  description: string;
  badge: string;
  tags: string[];
  thumb?: string;
  slug?: string;
  hasCaseStudy?: boolean;
  footRight?: string;
  gameStatus?: "complete" | "in-progress";
}

type WorkCardProps = {
  work: WorkLike;
  variant: "home" | "list";
  visible?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

export function WorkCard({ work, variant, visible = true, onClick }: WorkCardProps) {
  const href = work.hasCaseStudy && work.slug ? `/works/${work.slug}` : "#";

  if (variant === "home") {
    return (
      <article className="work">
        <div className="thumb">
          <span className="thumb-badge">{work.badge}</span>
          <WorkThumb title={work.title} badge={work.badge} thumb={work.thumb} />
        </div>
        <h3 className="work-title">{work.title}</h3>
        <p className="work-desc">{work.description}</p>
        <div className="chips">
          {work.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </article>
    );
  }

  const gameStatusLabel = work.gameStatus === "in-progress" ? LABEL_GAME_NOW_PLAYING : LABEL_GAME_CLEAR;
  const gameBadgeClass = work.gameStatus === "in-progress" ? "qc-badge qc-playing" : "qc-badge qc-clear";

  return (
    <article className={`wcard quest-card${visible ? "" : " hide"}`} onClick={onClick}>
      <span className={gameBadgeClass} aria-label={work.gameStatus === "in-progress" ? "進行中" : "完了"}>
        {gameStatusLabel}
      </span>
      <div className="wthumb">
        <span className="wbadge">
          <span className="bdot" />
          {work.badge}
        </span>
        <WorkThumb title={work.title} badge={work.badge} thumb={work.thumb} />
      </div>
      <h3 className="wtitle">{work.title}</h3>
      <p className="wdesc">{work.description}</p>
      <div className="chips">
        {work.tags.map((tag) => (
          <span key={tag} className="chip">
            {tag}
          </span>
        ))}
      </div>
      <div className="wfoot">
        {work.hasCaseStudy ? (
          <Link className="wfoot-b" href={href}>
            {LABEL_CASE_STUDY} <ArrowRight />
          </Link>
        ) : (
          <a className="wfoot-b" href={href}>
            {work.footRight} <ArrowRight />
          </a>
        )}
      </div>
    </article>
  );
}
