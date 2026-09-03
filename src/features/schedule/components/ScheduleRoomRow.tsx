import { Link } from "react-router-dom";

import { buildNewBookingUrl } from "../../../lib/bookingPrefill";
import { getNextTimeSlot } from "../../../lib/timeOptions";
import type { Booking } from "../../bookings/types/booking";
import type { Employee } from "../../employees/types/employee";
import type { Room } from "../../rooms/types/room";
import { getScheduleHours } from "../scheduleConstants";
import { ScheduleBookingBlock } from "./ScheduleBookingBlock";

type ScheduleRoomRowProps = {
  room: Room;
  isoDate: string;
  bookings: Booking[];
  employeeById: Map<string, Employee>;
};

export function ScheduleRoomRow({
  room,
  isoDate,
  bookings,
  employeeById,
}: ScheduleRoomRowProps) {
  const hours = getScheduleHours();

  return (
    <div className="schedule-room-row">
      <div className="schedule-room-label">
        <Link to={`/rooms/${room.id}`} className="truncate font-medium hover:text-brand">
          {room.name}
        </Link>
        <p className="truncate text-xs text-muted">
          Floor {room.floor} · {room.capacity} seats
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
          <ScheduleBookingBlock
            key={booking.id}
            booking={booking}
            organizer={employeeById.get(booking.userId)}
          />
        ))}
      </div>
    </div>
  );
}
