import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PhaseRail } from "@/components/PhaseRail";
import { DefineForm } from "./DefineForm";
import { ReasoningTrace } from "@/components/ReasoningTrace";
import { draftCharter } from "@/lib/agents/sixSigmaCoach";

export default async function DefinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const investigation = await prisma.investigation.findUnique({ where: { id } });

  if (!investigation) notFound();

  const agentResponse = investigation.problemStatement
    ? draftCharter({
        problemStatement: investigation.problemStatement,
        businessImpact: investigation.businessImpact ?? "",
      })
    : null;

  return (
    <div className="instrument-grid min-h-screen">
      <header className="border-b border-line bg-panel/60 backdrop-blur px-8 py-5">
        <h1 className="text-lg font-semibold tracking-tight">{investigation.title}</h1>
        <p className="text-xs text-muted">Define phase</p>
      </header>

      <main className="px-8 py-8 max-w-6xl mx-auto flex gap-8">
        <PhaseRail current={investigation.phase} />

        <div className="flex-1 grid md:grid-cols-2 gap-6">
          <DefineForm investigation={investigation} />

          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-wider text-muted">
              Six Sigma Coach
            </h2>
            {agentResponse ? (
              <ReasoningTrace response={agentResponse} />
            ) : (
              <div className="border border-line border-dashed rounded p-6 text-sm text-muted">
                Fill in the problem statement and save -- the coach agent will
                draft a charter once there's evidence to reason from.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
