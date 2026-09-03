import type { ScheduleView } from "../parseScheduleView";

type ScheduleViewToggleProps = {
  view: ScheduleView;
  onChange: (view: ScheduleView) => void;
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
