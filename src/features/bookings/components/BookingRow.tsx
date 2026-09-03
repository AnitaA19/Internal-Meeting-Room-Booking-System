import { Link } from "react-router-dom";

import type { Booking } from "../types/booking";
import type { Employee } from "../../employees/types/employee";
import type { Room } from "../../rooms/types/room";
import { isCancellable } from "../cancelBooking";
import { isEditable } from "../updateBooking";
import { BookingStatusLabel } from "./BookingStatusLabel";
import { formatTime } from "../../../lib/formatDate";
import { formatShortName } from "../../../lib/formatName";

type BookingRowProps = {
  booking: Booking;
  room?: Room;
  organizer?: Employee;
  onCancel: (bookingId: string) => void;
};

export function BookingRow({ booking, room, organizer, onCancel }: BookingRowProps) {
  const attendeeCount = booking.participantIds.length;
  const organizerName = organizer ? formatShortName(organizer.name) : "Unknown";
  const canCancel = isCancellable(booking);
  const canEdit = isEditable(booking);

  return (
    <div className="booking-row">
      <div className="booking-row-time">
        <p className="font-semibold tabular-nums">{formatTime(booking.startTime)}</p>
        <p className="mt-0.5 text-sm text-muted">to {formatTime(booking.endTime)}</p>
      </div>

      <div className="booking-row-title">
        <Link
          to={`/bookings/${booking.id}`}
          className="block truncate font-medium hover:text-brand"
        >
          {booking.title}
        </Link>
        <p className="mt-0.5 truncate text-sm text-muted">
          {organizerName} · {attendeeCount}{" "}
          {attendeeCount === 1 ? "person" : "people"}
        </p>
      </div>

      <div className="booking-row-room">
        <p className="truncate font-medium">{room?.name ?? "—"}</p>
        <p className="mt-0.5 truncate text-sm text-muted">
          {room ? `Floor ${room.floor}, ${room.location}` : "—"}
        </p>
      </div>

      <div className="booking-row-status">
        <BookingStatusLabel status={booking.status} className="w-[6.75rem]" />
      </div>

      <div className="booking-row-actions">
        {canEdit ? (
          <Link to={`/bookings/${booking.id}/edit`} className="action-edit">
            Edit
          </Link>
        ) : (
          <span />
        )}
        {canCancel ? (
          <button
            type="button"
            onClick={() => onCancel(booking.id)}
            className="action-cancel"
          >
            Cancel
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
