import { Users } from "lucide-react";
import { Link } from "react-router-dom";

import type { Booking } from "../../bookings/types/booking";
import { shortAmenity } from "../roomLabels";
import { getBookedPercentToday, getRoomOccupancy } from "../getRoomOccupancy";
import type { Room } from "../types/room";

const occupancyLabel = {
  free: "Free",
  "in-use": "In use",
  maintenance: "Maintenance",
} as const;

const occupancyClass = {
  free: "room-badge-free",
  "in-use": "room-badge-busy",
  maintenance: "room-badge-down",
} as const;

type RoomCardProps = {
  room: Room;
  bookings: Booking[];
};

export function RoomCard({ room, bookings }: RoomCardProps) {
  const occupancy = getRoomOccupancy(room, bookings);
  const bookedPercent = getBookedPercentToday(room.id, bookings);

  return (
    <Link to={`/rooms/${room.id}`} className="room-card">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold">{room.name}</h2>
        <span className={occupancyClass[occupancy]}>{occupancyLabel[occupancy]}</span>
      </div>

      <p className="mt-2 text-sm text-muted">
        Floor {room.floor}, {room.location}
      </p>

      <p className="mt-3 flex items-center gap-2 text-sm text-muted">
        <Users className="size-3.5 shrink-0" strokeWidth={1.75} />
        <span>
          {room.capacity} seats
          <span className="mx-1.5 text-subtle">·</span>
          {bookedPercent}% booked today
        </span>
      </p>

      {room.amenities.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2 border-t border-white/5 pt-4">
          {room.amenities.map((amenity) => (
            <li key={amenity} className="room-tag">
              {shortAmenity(amenity)}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
