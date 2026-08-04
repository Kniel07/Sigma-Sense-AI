import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const investigations = await prisma.investigation.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(investigations);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.title || !body.organizationId) {
    return NextResponse.json(
      { error: "title and organizationId are required" },
      { status: 400 }
    );
  }

  const investigation = await prisma.investigation.create({
    data: {
      title: body.title,
      organizationId: body.organizationId,
      phase: "DEFINE",
    },
  });

  return NextResponse.json(investigation, { status: 201 });
}
