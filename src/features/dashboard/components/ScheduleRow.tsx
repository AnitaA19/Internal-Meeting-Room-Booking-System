import { Link } from "react-router-dom";

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
    <Link
      to={`/bookings/${booking.id}`}
      className="flex flex-col gap-3 border-b border-white/5 px-4 py-4 last:border-b-0 hover:bg-white/[0.02] sm:flex-row sm:items-center sm:gap-6 sm:px-6"
    >
      <div className="sm:w-24 sm:shrink-0">
        <p className="font-semibold tabular-nums">{formatTime(booking.startTime)}</p>
        <p className="mt-0.5 text-sm text-muted">to {formatTime(booking.endTime)}</p>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{booking.title}</p>
        <p className="mt-0.5 truncate text-sm text-subtle">
          {organizerLabel} · {peopleCount} {peopleCount === 1 ? "person" : "people"}
        </p>
      </div>

      <div className="min-w-0 sm:w-40">
        <p className="truncate font-medium">{room?.name ?? "—"}</p>
        {room && (
          <p className="mt-0.5 truncate text-sm text-muted">
            Floor {room.floor}, {room.location}
          </p>
        )}
      </div>

      <div className="sm:w-28 sm:text-right">
        <BookingStatusLabel status={booking.status} />
      </div>
    </Link>
  );
}
