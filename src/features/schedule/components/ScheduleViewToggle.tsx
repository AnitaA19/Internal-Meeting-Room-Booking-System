type ScheduleViewToggleProps = {
  view: "daily" | "weekly";
  onChange: (view: "daily" | "weekly") => void;
};

export function ScheduleViewToggle({ view, onChange }: ScheduleViewToggleProps) {
  return (
    <div className="filter-group">
      <button
        type="button"
        onClick={() => onChange("daily")}
        className={view === "daily" ? "filter-pill-active" : "filter-pill"}
      >
        Day
      </button>
      <button
        type="button"
        onClick={() => onChange("weekly")}
        className={view === "weekly" ? "filter-pill-active" : "filter-pill"}
      >
        Week
      </button>
    </div>
  );
}

export function parseScheduleView(value: string | null): "daily" | "weekly" {
  return value === "weekly" ? "weekly" : "daily";
}
