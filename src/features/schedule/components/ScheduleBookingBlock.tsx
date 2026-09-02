import { Link } from "react-router-dom";

import { formatTime } from "../../../lib/formatDate";
import type { Booking } from "../../bookings/types/booking";
import type { Employee } from "../../employees/types/employee";
import { getTimelinePosition } from "../getTimelinePosition";

type ScheduleBookingBlockProps = {
  booking: Booking;
  organizer?: Employee;
};

export function ScheduleBookingBlock({ booking, organizer }: ScheduleBookingBlockProps) {
  const { left, width } = getTimelinePosition(booking.startTime, booking.endTime);

  if (width <= 0) {
    return null;
  }

  return (
    <Link
      to={`/bookings/${booking.id}/edit`}
      className="schedule-block"
      style={{ left: `${left}%`, width: `${width}%` }}
      title={`${booking.title} · ${formatTime(booking.startTime)} – ${formatTime(booking.endTime)}`}
    >
      <p className="truncate text-xs font-medium">{booking.title}</p>
      <p className="truncate text-[10px] text-muted">
        {formatTime(booking.startTime)} · {organizer?.name.split(" ")[0] ?? "—"}
      </p>
    </Link>
  );
}
