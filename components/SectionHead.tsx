import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

/** 見出し（タイトル + グラデーションの罫線 + 任意の右側要素 / リンク）。 */
export function SectionHead({
  title,
  star,
  link,
  right,
}: {
  title: ReactNode;
  star?: boolean;
  link?: { label: string; href: string };
  right?: ReactNode;
}) {
  return (
    <div className="sec-head">
      <div className="sec-title">
        {star && <span className="star">✦</span>} {title}
      </div>
      <div className="sec-rule" />
      {link && (
        <Link className="sec-link" href={link.href}>
          {link.label} <ArrowRight />
        </Link>
      )}
      {right}
    </div>
  );
}
