import { getSelectableDays } from "../../lib/formatDate";

type DateFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function DateField({ value, onChange }: DateFieldProps) {
  const days = getSelectableDays(14);
  const todayIso = days[0]?.iso;
  const tomorrowIso = days[1]?.iso;

  return (
    <div className="picker-box">
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => todayIso && onChange(todayIso)}
          className={value === todayIso ? "filter-pill-active" : "filter-pill"}
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => tomorrowIso && onChange(tomorrowIso)}
          className={value === tomorrowIso ? "filter-pill-active" : "filter-pill"}
        >
          Tomorrow
        </button>
      </div>

      <div className="day-grid">
        {days.map((day) => (
          <button
            key={day.iso}
            type="button"
            onClick={() => onChange(day.iso)}
            className={value === day.iso ? "day-chip-active" : "day-chip"}
          >
            <span className="text-[11px] text-muted">{day.weekday}</span>
            <span className="text-sm font-medium">{day.day}</span>
            <span className="text-[10px] text-subtle">{day.month}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
