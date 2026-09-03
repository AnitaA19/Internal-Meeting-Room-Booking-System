import { Link } from "react-router-dom";

import { formatTime } from "../../../lib/formatDate";
import type { Booking } from "../../bookings/types/booking";
import { getTimelinePosition } from "../getTimelinePosition";

type ScheduleBookingBlockProps = {
  booking: Booking;
};

export function ScheduleBookingBlock({ booking }: ScheduleBookingBlockProps) {
  const { left, width } = getTimelinePosition(booking.startTime, booking.endTime);

  if (width <= 0) {
    return null;
  }

  const pending = booking.status === "pending";
  const range = `${formatTime(booking.startTime)}-${formatTime(booking.endTime)}`;

  return (
    <Link
      to={`/bookings/${booking.id}`}
      className={pending ? "schedule-block-pending" : "schedule-block-confirmed"}
      style={{ left: `${left}%`, width: `${width}%` }}
      title={`${booking.title} · ${range}`}
    >
      <p className="truncate text-[11px] font-medium leading-tight">{booking.title}</p>
      <p className="truncate text-[10px] leading-tight opacity-80">{range}</p>
    </Link>
  );
}
