import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "404 — ページが見つかりません",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="status-page">
      <div className="status-code">404</div>
      <h1 className="status-title">ページが見つかりません</h1>
      <p className="status-text">お探しのページは移動または削除された可能性があります。</p>
      <Link className="btn btn-primary" href="/">
        Home に戻る <ArrowRight sw={2.2} />
      </Link>
    </div>
  );
}
