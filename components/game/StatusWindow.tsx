interface StatusWindowProps {
  children: React.ReactNode;
  title?: string;
}

// Wraps About page content with RPG status-window chrome in game mode.
// No fabricated HP/Lv stats — factual profile rows only.
export function StatusWindow({ children, title = "STATUS" }: StatusWindowProps) {
  return (
    <div className="status-window">
      <div className="sw-titlebar">
        <span className="sw-corner" aria-hidden="true">╔</span>
        <span className="sw-title">{title}</span>
        <span className="sw-corner" aria-hidden="true">╗</span>
      </div>
      <div className="sw-body">{children}</div>
      <div className="sw-footer" aria-hidden="true">
        <span>╚═══════════════════╝</span>
      </div>
    </div>
  );
}
