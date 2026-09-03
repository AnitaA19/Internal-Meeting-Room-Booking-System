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
  onCancel: (bookingId: string) => void;
};

export function BookingDateGroup({
  date,
  bookings,
  roomById,
  employeeById,
  onCancel,
}: BookingDateGroupProps) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-3 px-1">
        <h2 className="shrink-0 text-xs font-medium tracking-wider text-muted">
          {formatDateHeading(date)}
        </h2>
        <div className="h-px min-w-0 flex-1 bg-white/10" />
        <span className="shrink-0 text-sm text-muted">{bookings.length}</span>
      </div>

      <div className="rounded-xl bg-card">
        {bookings.map((booking) => (
          <BookingRow
            key={booking.id}
            booking={booking}
            room={roomById.get(booking.roomId)}
            organizer={employeeById.get(booking.userId)}
            onCancel={onCancel}
          />
        ))}
      </div>
    </section>
  );
}
