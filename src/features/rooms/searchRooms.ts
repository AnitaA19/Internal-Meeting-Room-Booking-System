import type { Room } from "./types/room";
import { roomTypeLabels } from "./roomLabels";

export function searchRooms(rooms: Room[], query: string): Room[] {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return rooms;
  }

  return rooms.filter((room) => {
    const haystack = [
      room.name,
      room.location,
      roomTypeLabels[room.type],
      `floor ${room.floor}`,
      String(room.capacity),
      ...room.amenities,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(trimmed);
  });
}
