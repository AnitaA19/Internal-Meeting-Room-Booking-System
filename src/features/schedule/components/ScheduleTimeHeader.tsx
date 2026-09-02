import { getScheduleHours } from "../scheduleConstants";

export function ScheduleTimeHeader() {
  const hours = getScheduleHours();

  return (
    <div className="schedule-time-header">
      <div className="schedule-room-label" />
      <div className="schedule-timeline">
        {hours.map((hour) => (
          <span key={hour} className="schedule-hour">
            {String(hour).padStart(2, "0")}:00
          </span>
        ))}
      </div>
    </div>
  );
}
