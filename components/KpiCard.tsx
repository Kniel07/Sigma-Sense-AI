export function KpiCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: string | number;
  unit?: string;
}) {
  return (
    <div className="border border-line bg-panel rounded p-4">
      <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
      <div className="mt-2 font-mono text-2xl tabular text-foreground">
        {value}
        {unit && <span className="text-sm text-muted ml-1">{unit}</span>}
      </div>
    </div>
  );
}
