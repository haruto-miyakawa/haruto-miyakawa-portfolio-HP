"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // 本番ではここでエラー監視(Sentry等)へ送る
    console.error(error);
  }, [error]);

  return (
    <div className="status-page">
      <div className="status-code">500</div>
      <h1 className="status-title">問題が発生しました</h1>
      <p className="status-text">一時的なエラーの可能性があります。少し時間をおいて再度お試しください。</p>
      <div className="status-actions">
        <button className="btn btn-primary" onClick={() => reset()}>
          再試行する
        </button>
        <Link className="btn btn-ghost" href="/">
          Home に戻る
        </Link>
      </div>
    </div>
  );
}
