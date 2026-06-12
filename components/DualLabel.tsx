// Renders both pro and game labels in the DOM simultaneously.
// CSS [data-mode="game"] controls which span is visible — no React state, no hydration mismatch.
// Screen readers always see the .dl-pro span; .dl-game is aria-hidden.
interface DualLabelProps {
  pro: string;
  game: string;
}
export function DualLabel({ pro, game }: DualLabelProps) {
  return (
    <>
      <span className="dl-pro">{pro}</span>
      <span className="dl-game" aria-hidden="true">{game}</span>
    </>
  );
}
