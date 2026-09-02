import type { Booking } from "../../bookings/types/booking";
import type { Employee } from "../../employees/types/employee";
import type { Room } from "../../rooms/types/room";
import { ScheduleBookingBlock } from "./ScheduleBookingBlock";

type ScheduleRoomRowProps = {
  room: Room;
  bookings: Booking[];
  employeeById: Map<string, Employee>;
};

export function ScheduleRoomRow({ room, bookings, employeeById }: ScheduleRoomRowProps) {
  return (
    <div className="schedule-room-row">
      <div className="schedule-room-label">
        <p className="truncate font-medium">{room.name}</p>
        <p className="truncate text-xs text-muted">
          Floor {room.floor} · {room.capacity} seats
        </p>
      </div>

      <div className="schedule-timeline">
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
