import { Link, Navigate, useParams } from "react-router-dom";

import { PageHeader } from "../../components/ui/PageHeader";
import { formatShortDate, formatTimeRange } from "../../lib/formatDate";
import { employeeRepository, roomRepository } from "../../lib/repositories";
import { useBookingStore } from "../../store/bookingStore";
import { isCancellable } from "./cancelBooking";
import { BookingStatusLabel } from "./components/BookingStatusLabel";
import { isEditable } from "./updateBooking";
import { useCancelBooking } from "./useCancelBooking";

export function BookingDetailPage() {
  const { id } = useParams();
  const booking = useBookingStore((state) =>
    id ? state.getBookingById(id) : undefined,
  );
  const requestCancel = useCancelBooking();

  if (!booking) {
    return <Navigate to="/bookings" replace />;
  }

  const room = roomRepository.getRoomById(booking.roomId);
  const organizer = employeeRepository.getEmployeeById(booking.userId);
  const attendees = booking.participantIds
    .map((participantId) => employeeRepository.getEmployeeById(participantId))
    .filter((person) => person !== undefined);
  const canEdit = isEditable(booking);
  const canCancel = isCancellable(booking);

  return (
    <>
      <PageHeader
        title={booking.title}
        subtitle={room ? `${room.name} · Floor ${room.floor}` : "Unknown room"}
        actions={
          <Link to="/bookings" className="action-link">
            All bookings
          </Link>
        }
      />

      <div className="rounded-xl border border-white/5 bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <BookingStatusLabel status={booking.status} />
          <div className="flex gap-2">
            {canEdit && (
              <Link to={`/bookings/${booking.id}/edit`} className="action-edit">
                Edit
              </Link>
            )}
            {canCancel && (
              <button
                type="button"
                onClick={() => requestCancel(booking.id)}
                className="action-cancel"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium tracking-wider text-muted">WHEN</dt>
            <dd className="mt-1 text-sm">
              {formatShortDate(booking.startTime)}
              <span className="mt-0.5 block text-white">
                {formatTimeRange(booking.startTime, booking.endTime)}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wider text-muted">ROOM</dt>
            <dd className="mt-1 text-sm">
              {room ? (
                <Link to={`/rooms/${room.id}`} className="hover:text-brand">
                  {room.name}
                </Link>
              ) : (
                "—"
              )}
              {room && (
                <span className="mt-0.5 block text-sm text-muted">
                  {room.location} · {room.capacity} seats
                </span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wider text-muted">ORGANIZER</dt>
            <dd className="mt-1 text-sm">
              {organizer?.name ?? "—"}
              {organizer && (
                <span className="mt-0.5 block text-sm text-muted">{organizer.department}</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wider text-muted">PEOPLE</dt>
            <dd className="mt-1 text-sm">
              {attendees.length === 0
                ? "—"
                : attendees.map((person) => person.name).join(", ")}
            </dd>
          </div>
        </dl>

        {booking.notes && (
          <div className="mt-6 border-t border-white/5 pt-5">
            <p className="text-xs font-medium tracking-wider text-muted">NOTES</p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-muted">{booking.notes}</p>
          </div>
        )}
      </div>
    </>
  );
}
