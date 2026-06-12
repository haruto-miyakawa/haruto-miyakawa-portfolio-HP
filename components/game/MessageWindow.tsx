interface MessageWindowProps {
  lines: string[];
  /** Show ▼ cursor to indicate more text / confirm */
  cursor?: boolean;
}

export function MessageWindow({ lines, cursor = true }: MessageWindowProps) {
  return (
    <div className="msg-window" role="dialog" aria-label="メッセージウィンドウ">
      <div className="msg-body">
        {lines.map((line, i) => (
          <p key={i} className="msg-line">{line}</p>
        ))}
        {cursor && <span className="msg-cursor" aria-hidden="true">▼</span>}
      </div>
    </div>
  );
}
