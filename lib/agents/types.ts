// Every AI agent in SigmaSense must return this shape. This is the
// enforcement point for the platform's core rule: the AI never states a
// bare conclusion. UI components (ReasoningTrace) render this contract
// directly, so an agent cannot bypass the Evidence -> Confidence ->
// Recommendation pattern even if a future implementation is careless.

export interface AgentEvidenceItem {
  description: string;
  direction: "support" | "contradict";
  sourceExperimentId?: string;
}

export interface AgentResponse {
  agentType:
    | "six_sigma_coach"
    | "statistics"
    | "manufacturing_expert"
    | "root_cause"
    | "documentation"
    | "knowledge";
  summary: string;
  evidence: AgentEvidenceItem[];
  confidence: number; // 0-1
  recommendation: string;
  reasoning: string;
}
