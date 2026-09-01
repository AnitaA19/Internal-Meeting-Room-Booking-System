type MetricProps = {
  title: string;
  count: number;
};

export function Metric({ title, count }: MetricProps) {
  return (
    <div className="rounded-xl bg-card px-6 py-5">
      <p className="text-3xl font-semibold tracking-tight tabular-nums">{count}</p>
      <p className="mt-1 text-sm text-muted">{title}</p>
    </div>
  );
}
