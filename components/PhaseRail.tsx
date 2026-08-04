const PHASES = ["DEFINE", "MEASURE", "ANALYZE", "IMPROVE", "CONTROL"] as const;

export function PhaseRail({ current }: { current: string }) {
  const currentIdx = PHASES.indexOf(current as (typeof PHASES)[number]);

  return (
    <nav className="flex flex-col gap-1 w-40 shrink-0 border-r border-line pr-4">
      {PHASES.map((phase, i) => {
        const state =
          i < currentIdx ? "done" : i === currentIdx ? "active" : "locked";
        return (
          <div
            key={phase}
            className={`flex items-center gap-2 rounded px-2 py-2 text-sm font-medium tracking-wide ${
              state === "active"
                ? "bg-panel-raised text-foreground"
                : state === "done"
                ? "text-signal-teal"
                : "text-muted/50"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                state === "active"
                  ? "bg-signal-amber"
                  : state === "done"
                  ? "bg-signal-teal"
                  : "bg-line"
              }`}
            />
            {phase}
          </div>
        );
      })}
    </nav>
  );
}
