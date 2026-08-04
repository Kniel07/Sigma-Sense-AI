import type { AgentResponse } from "./types";

/**
 * STUB AGENT -- prototype scope only.
 *
 * This is a deterministic placeholder standing in for the real
 * Six Sigma Coach agent (see Design Phase doc, Multi-Agent Architecture).
 * It exists so the UI contract (AgentResponse) can be built and tested
 * end-to-end before the LLM-backed agent is wired in. Replace the body
 * of `draftCharter` with a real model call in the Build phase follow-up;
 * do not change the AgentResponse shape without updating ReasoningTrace.
 */
export function draftCharter(input: {
  problemStatement: string;
  businessImpact: string;
}): AgentResponse {
  return {
    agentType: "six_sigma_coach",
    summary: "Draft charter generated from Define-phase inputs.",
    evidence: [
      {
        description: `Problem statement provided: "${input.problemStatement.slice(0, 80)}"`,
        direction: "support",
      },
    ],
    confidence: 0.4,
    recommendation:
      "Confirm the CTQ and target state with the process owner before advancing to Measure.",
    reasoning:
      "Charter drafted directly from user-provided fields; no historical or measurement evidence exists yet, so confidence is intentionally low until data arrives.",
  };
}
