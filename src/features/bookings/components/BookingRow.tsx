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
    <div className="list-row py-5">
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

      <div className="list-row-actions">
        <BookingStatusLabel status={booking.status} />
        <div className="list-row-action-buttons">
          {canEdit && (
            <Link to={`/bookings/${booking.id}/edit`} className="action-edit">
              Edit
            </Link>
          )}
          {canCancel && (
            <button
              type="button"
              onClick={() => onCancel(booking.id)}
              className="action-cancel"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
