import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { KpiCard } from "@/components/KpiCard";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  let investigations: Awaited<ReturnType<typeof prisma.investigation.findMany>> = [];
  try {
    investigations = await prisma.investigation.findMany({
      orderBy: { updatedAt: "desc" },
      take: 10,
    });
  } catch {
    // DATABASE_URL not configured yet -- render an empty state instead
    // of crashing the prototype. See README for DB setup.
    investigations = [];
  }

  return (
    <div className="instrument-grid min-h-screen">
      <header className="border-b border-line bg-panel/60 backdrop-blur px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">SigmaSense AI</h1>
          <p className="text-xs text-muted">Investigation control panel</p>
        </div>
        <Link
          href="/investigations/new"
          className="text-sm font-medium bg-signal-amber text-background rounded px-4 py-2 hover:opacity-90"
        >
          New Investigation
        </Link>
      </header>

      <main className="px-8 py-8 max-w-6xl mx-auto space-y-8">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard label="Active Investigations" value={investigations.filter(i => i.status === "active").length} />
          <KpiCard label="Completed" value={investigations.filter(i => i.status === "closed").length} />
          <KpiCard label="Sigma Level" value="--" />
          <KpiCard label="DPMO" value="--" />
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-wider text-muted mb-3">Investigations</h2>
          <div className="border border-line rounded overflow-hidden">
            {investigations.length === 0 && (
              <div className="p-8 text-center text-sm text-muted">
                No investigations yet. Connect a database (see README) and create the first one.
              </div>
            )}
            {investigations.map((inv) => (
              <Link
                key={inv.id}
                href={`/investigations/${inv.id}/define`}
                className="flex items-center justify-between px-4 py-3 border-t border-line first:border-t-0 hover:bg-panel-raised"
              >
                <div>
                  <div className="text-sm font-medium">{inv.title}</div>
                  <div className="text-xs text-muted">{inv.phase}</div>
                </div>
                <span className="text-xs font-mono text-signal-blue">{inv.status}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
