export default function Loading() {
  return (
    <div className="route-loading" aria-busy="true" aria-live="polite">
      <span className="route-spinner" />
      <span className="route-loading-label">読み込み中…</span>
    </div>
  );
}
