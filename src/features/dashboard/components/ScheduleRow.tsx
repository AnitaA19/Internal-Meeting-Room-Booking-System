import type { Booking } from "../../bookings/types/booking";
import type { Employee } from "../../employees/types/employee";
import type { Room } from "../../rooms/types/room";
import { BookingStatusLabel } from "../../bookings/components/BookingStatusLabel";
import { formatTimeRange } from "../../../lib/formatDate";
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
    <div className="grid grid-cols-[7rem_1fr_6rem_6.5rem] items-center gap-4 border-b border-white/5 px-6 py-4 last:border-b-0">
      <p className="text-sm tabular-nums text-muted">
        {formatTimeRange(booking.startTime, booking.endTime)}
      </p>

      <div className="min-w-0">
        <p className="truncate font-medium">{booking.title}</p>
        <p className="mt-0.5 truncate text-sm text-subtle">
          {organizerLabel} · {peopleCount} {peopleCount === 1 ? "person" : "people"}
        </p>
      </div>

      <p className="text-sm text-muted">{room?.name ?? "—"}</p>

      <BookingStatusLabel status={booking.status} />
    </div>
  );
}
