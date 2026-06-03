"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

/** カード全体をクリック可能にするラッパ（内部の <a> クリックは除外）。 */
export function CardLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  const router = useRouter();
  return (
    <div
      className={className}
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("a")) router.push(href);
      }}
    >
      {children}
    </div>
  );
}
