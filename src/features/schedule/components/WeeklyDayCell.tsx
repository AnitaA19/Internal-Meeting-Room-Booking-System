import { Link } from "react-router-dom";

import { formatTime } from "../../../lib/formatDate";
import { buildNewBookingUrl } from "../../../lib/bookingPrefill";
import type { Booking } from "../../bookings/types/booking";

type WeeklyDayCellProps = {
  roomId: string;
  isoDate: string;
  bookings: Booking[];
};

export function WeeklyDayCell({ roomId, isoDate, bookings }: WeeklyDayCellProps) {
  return (
    <div className="weekly-day-cell">
      {bookings.length === 0 ? (
        <Link
          to={buildNewBookingUrl({
            roomId,
            date: isoDate,
            start: "09:00",
            end: "10:00",
          })}
          className="weekly-slot-empty"
        >
          —
        </Link>
      ) : (
        bookings.map((booking) => (
          <Link
            key={booking.id}
            to={`/bookings/${booking.id}`}
            className={
              booking.status === "pending"
                ? "weekly-booking-chip-pending"
                : "weekly-booking-chip"
            }
            title={booking.title}
          >
            <span className="truncate text-[11px] font-medium">{booking.title}</span>
            <span className="truncate text-[10px] text-muted">
              {formatTime(booking.startTime)}
            </span>
          </Link>
        ))
      )}
    </div>
  );
}
