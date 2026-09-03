import { isSameDay } from "date-fns";
import { Link, Navigate, useParams } from "react-router-dom";

import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { buildNewBookingUrl } from "../../lib/bookingPrefill";
import { formatTime, toIsoDate } from "../../lib/formatDate";
import { roomRepository } from "../../lib/repositories";
import { useBookingStore } from "../../store/bookingStore";
import { BookingStatusLabel } from "../bookings/components/BookingStatusLabel";

const roomTypeNames = {
  meeting: "Meeting room",
  conference: "Conference",
  interview: "Interview",
  training: "Training",
} as const;

export function RoomDetailPage() {
  const { id } = useParams();
  const bookings = useBookingStore((state) => state.bookings);
  const room = roomRepository.getAllRooms().find((entry) => entry.id === id);
  const today = toIsoDate(new Date());

  if (!room) {
    return <Navigate to="/rooms" replace />;
  }

  const roomBookings = bookings
    .filter(
      (booking) =>
        booking.roomId === room.id &&
        booking.status !== "cancelled" &&
        isSameDay(booking.startTime, new Date()),
    )
    .sort((left, right) => left.startTime.getTime() - right.startTime.getTime());

  return (
    <>
      <PageHeader
        title={room.name}
        subtitle={`Floor ${room.floor} · ${room.location}`}
        actions={
          <Link to="/rooms" className="action-link">
            Back to rooms
          </Link>
        }
      />

      <div className="mb-8 rounded-xl border border-white/5 bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted">{roomTypeNames[room.type]}</p>
            <p className="mt-1 text-sm text-muted">Up to {room.capacity} people</p>
          </div>
          <Link
            to={buildNewBookingUrl({ roomId: room.id, date: today, start: "09:00", end: "10:00" })}
            className="btn-primary"
          >
            Book this room
          </Link>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {room.amenities.map((amenity) => (
            <li
              key={amenity}
              className="rounded-md bg-elevated px-2.5 py-1 text-xs text-muted"
            >
              {amenity}
            </li>
          ))}
        </ul>
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-xs font-medium tracking-wider text-muted">TODAY</h2>
          <span className="text-sm text-muted">{roomBookings.length}</span>
        </div>

        {roomBookings.length > 0 ? (
          <div className="rounded-xl bg-card">
            {roomBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between gap-4 border-b border-white/5 px-6 py-4 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{booking.title}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {formatTime(booking.startTime)} – {formatTime(booking.endTime)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <BookingStatusLabel status={booking.status} />
                  <Link to={`/bookings/${booking.id}/edit`} className="action-edit">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No meetings in this room today." />
        )}
      </section>
    </>
  );
}
