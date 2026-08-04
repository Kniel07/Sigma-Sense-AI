import type { AgentResponse } from "@/lib/agents/types";
import { ConfidenceBar } from "./ConfidenceBar";

// The one component every AI output must render through. See
// Design Phase / UX Decisions: "AI never states a bare conclusion."
export function ReasoningTrace({ response }: { response: AgentResponse }) {
  return (
    <div className="border border-line bg-panel-raised rounded p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-signal-blue">
          {response.agentType.replace(/_/g, " ")}
        </span>
        <ConfidenceBar confidence={response.confidence} />
      </div>

      <p className="text-sm text-foreground">{response.summary}</p>

      {response.evidence.length > 0 && (
        <ul className="space-y-1">
          {response.evidence.map((e, i) => (
            <li key={i} className="flex gap-2 text-xs text-muted">
              <span className={e.direction === "support" ? "text-signal-teal" : "text-signal-rust"}>
                {e.direction === "support" ? "✓" : "✗"}
              </span>
              {e.description}
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-line pt-3">
        <div className="text-xs uppercase tracking-wider text-muted mb-1">Recommendation</div>
        <p className="text-sm text-foreground">{response.recommendation}</p>
      </div>

      <details className="text-xs text-muted">
        <summary className="cursor-pointer select-none">Reasoning</summary>
        <p className="mt-1">{response.reasoning}</p>
      </details>
    </div>
  );
}
