import type { Room, RoomType } from "../types/room";

const roomTypeNames: Record<RoomType, string> = {
  meeting: "Meeting room",
  conference: "Conference",
  interview: "Interview",
  training: "Training",
};

type RoomCardProps = {
  room: Room;
};

export function RoomCard({ room }: RoomCardProps) {
  return (
    <article className="rounded-xl bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold">{room.name}</h2>
        <span className="shrink-0 text-sm text-muted">{roomTypeNames[room.type]}</span>
      </div>

      <p className="mt-2 text-sm text-muted">
        Floor {room.floor} · {room.location} · up to {room.capacity} people
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {room.amenities.map((amenity) => (
          <li
            key={amenity}
            className="rounded-md bg-elevated px-2.5 py-1 text-xs text-muted"
          >
            {amenity}
          </li>
        ))}
      </ul>
    </article>
  );
}
