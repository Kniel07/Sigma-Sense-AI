"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewInvestigation() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/investigations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // organizationId is hardcoded for the prototype -- real
      // multi-tenant auth is out of scope for this build increment.
      body: JSON.stringify({ title, organizationId: "org_prototype" }),
    });

    if (!res.ok) {
      setError("Could not create investigation. Check DATABASE_URL is configured.");
      setSubmitting(false);
      return;
    }

    const investigation = await res.json();
    router.push(`/investigations/${investigation.id}/define`);
  }

  return (
    <div className="instrument-grid min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-line bg-panel rounded p-6 space-y-4"
      >
        <h1 className="text-base font-semibold">New Investigation</h1>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted">Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Crimp height variation -- Line 4"
            className="mt-1 w-full bg-panel-raised border border-line rounded px-3 py-2 text-sm outline-none focus:border-signal-amber"
          />
        </div>
        {error && <p className="text-xs text-signal-rust">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-signal-amber text-background font-medium rounded px-4 py-2 text-sm disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Start Investigation"}
        </button>
      </form>
    </div>
  );
}
