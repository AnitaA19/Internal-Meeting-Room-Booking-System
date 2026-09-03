import { Link } from "react-router-dom";

import { buildNewBookingUrl } from "../../../lib/bookingPrefill";
import { getNextTimeSlot } from "../../../lib/timeOptions";
import type { Booking } from "../../bookings/types/booking";
import type { Room } from "../../rooms/types/room";
import { getScheduleSlotHours } from "../scheduleConstants";
import { ScheduleBookingBlock } from "./ScheduleBookingBlock";

type ScheduleRoomRowProps = {
  room: Room;
  isoDate: string;
  bookings: Booking[];
};

export function ScheduleRoomRow({ room, isoDate, bookings }: ScheduleRoomRowProps) {
  const hours = getScheduleSlotHours();
  const booked = bookings.filter((booking) => booking.status !== "cancelled").length;

  return (
    <div className="schedule-room-row">
      <div className="schedule-room-label">
        <Link to={`/rooms/${room.id}`} className="truncate font-medium hover:text-brand">
          {room.name}
        </Link>
        <p className="truncate text-xs text-muted">
          {room.capacity} seats · {booked} booked
        </p>
      </div>

      <div className="schedule-timeline">
        {hours.map((hour) => {
          const start = `${String(hour).padStart(2, "0")}:00`;

          return (
            <Link
              key={start}
              to={buildNewBookingUrl({
                roomId: room.id,
                date: isoDate,
                start,
                end: getNextTimeSlot(start),
              })}
              className="schedule-slot"
              aria-label={`Book ${room.name} at ${start}`}
            />
          );
        })}

        {bookings.map((booking) => (
          <ScheduleBookingBlock key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}
