"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Investigation } from "@prisma/client";

export function DefineForm({ investigation }: { investigation: Investigation }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    problemStatement: investigation.problemStatement ?? "",
    businessImpact: investigation.businessImpact ?? "",
    currentState: investigation.currentState ?? "",
    targetState: investigation.targetState ?? "",
    ctq: investigation.ctq ?? "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save() {
    setSaving(true);
    await fetch(`/api/investigations/${investigation.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    router.refresh();
  }

  const fields: { key: keyof typeof form; label: string; hint: string }[] = [
    { key: "problemStatement", label: "Problem Statement", hint: "What is happening, where, and how big is the gap?" },
    { key: "businessImpact", label: "Business Impact", hint: "Cost, quality, safety, or delivery consequence" },
    { key: "currentState", label: "Current State", hint: "Baseline performance today" },
    { key: "targetState", label: "Target State", hint: "Where this needs to land" },
    { key: "ctq", label: "Customer Requirement (CTQ)", hint: "What the customer actually needs from this process" },
  ];

  return (
    <div className="space-y-4">
      {fields.map((f) => (
        <div key={f.key}>
          <label className="text-xs uppercase tracking-wider text-muted">{f.label}</label>
          <textarea
            value={form[f.key]}
            onChange={(e) => update(f.key, e.target.value)}
            placeholder={f.hint}
            rows={2}
            className="mt-1 w-full bg-panel-raised border border-line rounded px-3 py-2 text-sm outline-none focus:border-signal-amber resize-none"
          />
        </div>
      ))}
      <button
        onClick={save}
        disabled={saving}
        className="bg-signal-amber text-background font-medium rounded px-4 py-2 text-sm disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Define Phase"}
      </button>
    </div>
  );
}
