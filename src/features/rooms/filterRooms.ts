import type { Room } from "./types/room";

export function filterRoomsByName(rooms: Room[], query: string): Room[] {
  const trimmed = query.trim().toLowerCase();
  
  if(!trimmed.length) return rooms;

  return rooms.filter(room => room.name.toLowerCase().includes(trimmed));
}
