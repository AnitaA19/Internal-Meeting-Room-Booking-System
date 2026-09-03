import { toIsoDate } from "../../../lib/formatDate";
import type { ScheduleData } from "../getScheduleData";
import { getNowLinePercent } from "../getTimelinePosition";
import { SCHEDULE_SLOT_COUNT } from "../scheduleConstants";
import { ScheduleRoomRow } from "./ScheduleRoomRow";
import { ScheduleTimeHeader } from "./ScheduleTimeHeader";

type ScheduleGridProps = {
  isoDate: string;
  data: ScheduleData;
};

export function ScheduleGrid({ isoDate, data }: ScheduleGridProps) {
  const showNow = isoDate === toIsoDate(new Date());
  const nowPercent = showNow ? getNowLinePercent() : null;

  return (
    <div className="schedule-grid overflow-x-auto rounded-xl border border-white/5 bg-card">
      <div
        className="relative min-w-[56rem]"
        style={{ "--schedule-cols": SCHEDULE_SLOT_COUNT } as React.CSSProperties}
      >
        <ScheduleTimeHeader />
        {data.rooms.map((room) => (
          <ScheduleRoomRow
            key={room.id}
            room={room}
            isoDate={isoDate}
            bookings={data.bookingsByRoom.get(room.id) ?? []}
          />
        ))}

        {nowPercent !== null && (
          <div
            className="schedule-now"
            style={{ left: `calc(12rem + (100% - 12rem) * ${nowPercent / 100})` }}
          >
            <span className="schedule-now-pill">now</span>
          </div>
        )}
      </div>
    </div>
  );
}
