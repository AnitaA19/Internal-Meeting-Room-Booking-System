import type { Booking } from "../types/booking";
import type { Employee } from "../../employees/types/employee";
import type { Room } from "../../rooms/types/room";
import { formatDateHeading } from "../../../lib/formatDate";
import { BookingRow } from "./BookingRow";

type BookingDateGroupProps = {
  date: Date;
  bookings: Booking[];
  roomById: Map<string, Room>;
  employeeById: Map<string, Employee>;
};

export function BookingDateGroup({
  date,
  bookings,
  roomById,
  employeeById,
}: BookingDateGroupProps) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-xs font-medium tracking-wider text-muted">
          {formatDateHeading(date)}
        </h2>
        <span className="text-sm text-muted">{bookings.length}</span>
      </div>

      <div className="overflow-x-auto rounded-xl bg-card">
        <div className="min-w-[640px]">
          {bookings.map((booking) => (
            <BookingRow
              key={booking.id}
              booking={booking}
              room={roomById.get(booking.roomId)}
              organizer={employeeById.get(booking.userId)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
