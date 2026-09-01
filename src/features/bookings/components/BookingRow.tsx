import type { Booking } from "../types/booking";
import type { Employee } from "../../employees/types/employee";
import type { Room } from "../../rooms/types/room";
import { BookingStatusLabel } from "./BookingStatusLabel";
import { formatTime } from "../../../lib/formatDate";
import { formatShortName } from "../../../lib/formatName";

type BookingRowProps = {
  booking: Booking;
  room?: Room;
  organizer?: Employee;
};

export function BookingRow({ booking, room, organizer }: BookingRowProps) {
  const attendeeCount = booking.participantIds.length;
  const organizerName = organizer ? formatShortName(organizer.name) : "Unknown";

  return (
    <div className="grid grid-cols-[4.5rem_1fr_10rem_auto] items-center gap-6 border-b border-white/5 px-6 py-5 last:border-b-0">
      <div>
        <p className="font-semibold tabular-nums">{formatTime(booking.startTime)}</p>
        <p className="mt-0.5 text-sm text-muted">to {formatTime(booking.endTime)}</p>
      </div>

      <div className="min-w-0">
        <p className="truncate font-medium">{booking.title}</p>
        <p className="mt-0.5 truncate text-sm text-muted">
          {organizerName} · {attendeeCount}{" "}
          {attendeeCount === 1 ? "attendee" : "attendees"}
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
