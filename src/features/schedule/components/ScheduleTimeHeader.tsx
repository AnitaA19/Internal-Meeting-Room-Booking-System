import { getScheduleHourLabels } from "../scheduleConstants";

export function ScheduleTimeHeader() {
  const labels = getScheduleHourLabels();
  const last = labels.length - 1;

  return (
    <div className="schedule-time-header">
      <div className="schedule-room-label">
        <span className="text-[11px] font-medium tracking-wider text-muted">ROOM</span>
      </div>
      <div className="schedule-hour-labels">
        {labels.map((hour, index) => (
          <span
            key={hour}
            className="absolute top-3 text-[11px] tabular-nums text-muted"
            style={{
              left: `${(index / last) * 100}%`,
              transform:
                index === 0 ? undefined : index === last ? "translateX(-100%)" : "translateX(-50%)",
            }}
          >
            {String(hour).padStart(2, "0")}
          </span>
        ))}
      </div>
    </div>
  );
}
