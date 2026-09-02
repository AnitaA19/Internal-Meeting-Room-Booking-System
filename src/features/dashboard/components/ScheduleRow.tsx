import type { Booking } from "../../bookings/types/booking";
import type { Employee } from "../../employees/types/employee";
import type { Room } from "../../rooms/types/room";
import { BookingStatusLabel } from "../../bookings/components/BookingStatusLabel";
import { formatTime } from "../../../lib/formatDate";
import { formatShortName } from "../../../lib/formatName";

type ScheduleRowProps = {
  booking: Booking;
  room?: Room;
  organizer?: Employee;
};

export function ScheduleRow({ booking, room, organizer }: ScheduleRowProps) {
  const peopleCount = booking.participantIds.length;
  const organizerLabel = organizer ? formatShortName(organizer.name) : "Unknown";

  return (
    <div className="list-row-compact">
      <div>
        <p className="font-semibold tabular-nums">{formatTime(booking.startTime)}</p>
        <p className="mt-0.5 text-sm text-muted">to {formatTime(booking.endTime)}</p>
      </div>

      <div className="min-w-0">
        <p className="truncate font-medium">{booking.title}</p>
        <p className="mt-0.5 truncate text-sm text-subtle">
          {organizerLabel} · {peopleCount} {peopleCount === 1 ? "person" : "people"}
        </p>
      </div>

      <div className="min-w-0">
        <p className="truncate font-medium">{room?.name ?? "—"}</p>
        {room && (
          <p className="mt-0.5 truncate text-sm text-muted">
            Floor {room.floor}, {room.location}
          </p>
        )}
      </div>

      <BookingStatusLabel status={booking.status} />
    </div>
  );
}
