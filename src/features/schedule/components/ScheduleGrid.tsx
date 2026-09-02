import type { ScheduleData } from "../getScheduleData";
import { SCHEDULE_HOUR_COUNT } from "../scheduleConstants";
import { ScheduleRoomRow } from "./ScheduleRoomRow";
import { ScheduleTimeHeader } from "./ScheduleTimeHeader";

type ScheduleGridProps = {
  data: ScheduleData;
};

export function ScheduleGrid({ data }: ScheduleGridProps) {
  return (
    <div className="schedule-grid overflow-x-auto rounded-xl border border-white/5 bg-card">
      <div
        className="min-w-[64rem]"
        style={{ "--schedule-cols": SCHEDULE_HOUR_COUNT } as React.CSSProperties}
      >
        <ScheduleTimeHeader />
        {data.rooms.map((room) => (
          <ScheduleRoomRow
            key={room.id}
            room={room}
            bookings={data.bookingsByRoom.get(room.id) ?? []}
            employeeById={data.employeeById}
          />
        ))}
      </div>
    </div>
  );
}
