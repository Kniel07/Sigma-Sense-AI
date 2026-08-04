import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const investigation = await prisma.investigation.findUnique({ where: { id } });

  if (!investigation) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json(investigation);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  // Define-phase fields only, in prototype scope. Phase-gating logic
  // (blocking Analyze until data-quality passes) belongs here in the
  // next build increment -- not yet implemented.
  const investigation = await prisma.investigation.update({
    where: { id },
    data: {
      problemStatement: body.problemStatement,
      businessImpact: body.businessImpact,
      currentState: body.currentState,
      targetState: body.targetState,
      ctq: body.ctq,
      voc: body.voc,
      phase: body.phase,
    },
  });

  return NextResponse.json(investigation);
}
