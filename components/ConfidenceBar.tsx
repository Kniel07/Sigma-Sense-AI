// Signature element: renders confidence as a segmented instrument gauge,
// not a generic rounded progress bar -- reinforces "evidence accumulates
// in discrete units" rather than "progress toward completion."
export function ConfidenceBar({
  confidence,
  segments = 20,
}: {
  confidence: number; // 0-1
  segments?: number;
}) {
  const filled = Math.round(confidence * segments);
  const color =
    confidence >= 0.85 ? "bg-signal-teal" : confidence >= 0.5 ? "bg-signal-amber" : "bg-signal-rust";

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-[2px]">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`h-4 w-1.5 rounded-[1px] ${i < filled ? color : "bg-line"}`}
          />
        ))}
      </div>
      <span className="font-mono text-sm tabular text-muted">
        {Math.round(confidence * 100)}%
      </span>
    </div>
  );
}
