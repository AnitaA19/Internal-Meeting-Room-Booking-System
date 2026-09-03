import { Link } from "react-router-dom";

import type { Room } from "../../rooms/types/room";
import type { WeekDay, WeeklyScheduleData } from "../getWeeklyScheduleData";
import { WeeklyDayCell } from "./WeeklyDayCell";

type WeeklyScheduleGridProps = {
  data: WeeklyScheduleData;
};

export function WeeklyScheduleGrid({ data }: WeeklyScheduleGridProps) {
  return (
    <div className="weekly-grid overflow-x-auto rounded-xl border border-white/5 bg-card">
      <div className="min-w-[56rem]">
        <div className="weekly-header-row">
          <div className="weekly-room-label" />
          {data.days.map((day) => (
            <WeeklyDayHeader key={day.iso} day={day} />
          ))}
        </div>

        {data.rooms.map((room) => (
          <WeeklyRoomRow key={room.id} room={room} days={data.days} data={data} />
        ))}
      </div>
    </div>
  );
}

function WeeklyDayHeader({ day }: { day: WeekDay }) {
  return (
    <div className="weekly-day-header">
      <span className="text-[11px] text-muted">{day.weekday}</span>
      <span className="text-sm font-medium">{day.day}</span>
    </div>
  );
}

type WeeklyRoomRowProps = {
  room: Room;
  days: WeekDay[];
  data: WeeklyScheduleData;
};

function WeeklyRoomRow({ room, days, data }: WeeklyRoomRowProps) {
  const roomDays = data.bookingsByRoomAndDay.get(room.id);

  return (
    <div className="weekly-room-row">
      <div className="weekly-room-label">
        <Link to={`/rooms/${room.id}`} className="truncate font-medium hover:text-brand">
          {room.name}
        </Link>
        <p className="truncate text-xs text-muted">Floor {room.floor}</p>
      </div>

      {days.map((day) => (
        <WeeklyDayCell
          key={day.iso}
          roomId={room.id}
          isoDate={day.iso}
          bookings={roomDays?.get(day.iso) ?? []}
        />
      ))}
    </div>
  );
}
