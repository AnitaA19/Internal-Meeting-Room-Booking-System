type ScheduleLegendProps = {
  className?: string;
};

export function ScheduleLegend({ className }: ScheduleLegendProps) {
  return (
    <div className={className ?? "flex items-center gap-4 text-xs text-muted"}>
      <span className="inline-flex items-center gap-2">
        <span className="size-2 rounded-full bg-brand" />
        Confirmed
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="size-2 rounded-full border border-dashed border-status-pending" />
        Pending
      </span>
    </div>
  );
}
