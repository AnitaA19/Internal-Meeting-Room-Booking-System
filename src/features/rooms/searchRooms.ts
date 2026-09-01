import type { Room } from "./types/room";

export function searchRooms(rooms: Room[], query: string): Room[] {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return rooms;
  }

  return rooms.filter((room) => room.name.toLowerCase().includes(trimmed));
}
