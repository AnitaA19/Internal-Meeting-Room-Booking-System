import { isSameDay } from "date-fns";
import { Link, Navigate, useParams } from "react-router-dom";

import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { buildNewBookingUrl } from "../../lib/bookingPrefill";
import { formatTime, toIsoDate } from "../../lib/formatDate";
import { roomRepository } from "../../lib/repositories";
import { useBookingStore } from "../../store/bookingStore";
import { BookingStatusLabel } from "../bookings/components/BookingStatusLabel";
import { getRoomOccupancy } from "./getRoomOccupancy";
import { roomTypeLabels } from "./roomLabels";

export function RoomDetailPage() {
  const { id } = useParams();
  const bookings = useBookingStore((state) => state.bookings);
  const room = id ? roomRepository.getRoomById(id) : undefined;
  const today = toIsoDate(new Date());

  if (!room) {
    return <Navigate to="/rooms" replace />;
  }

  const occupancy = getRoomOccupancy(room, bookings);
  const canBook = occupancy !== "maintenance";
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
            All rooms
          </Link>
        }
      />

      <div className="mb-8 rounded-xl border border-white/5 bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted">{roomTypeLabels[room.type]}</p>
            <p className="mt-1 text-sm text-muted">Up to {room.capacity} people</p>
          </div>
          {canBook ? (
            <Link
              to={buildNewBookingUrl({
                roomId: room.id,
                date: today,
                start: "09:00",
                end: "10:00",
              })}
              className="btn-primary"
            >
              Book this room
            </Link>
          ) : (
            <span className="room-badge-down">Maintenance</span>
          )}
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
              <Link
                key={booking.id}
                to={`/bookings/${booking.id}`}
                className="flex items-center justify-between gap-4 border-b border-white/5 px-5 py-4 last:border-b-0 hover:bg-white/[0.02]"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{booking.title}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {formatTime(booking.startTime)} – {formatTime(booking.endTime)}
                  </p>
                </div>
                <BookingStatusLabel status={booking.status} />
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState message="Nothing booked in here today." />
        )}
      </section>
    </>
  );
}
