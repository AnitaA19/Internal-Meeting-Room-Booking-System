import type { Room, RoomType } from "./types/room";

export type RoomFilters = {
  type: RoomType | "all";
  floor: number | "all";
};

export const defaultRoomFilters: RoomFilters = {
  type: "all",
  floor: "all",
};

export function applyRoomFilters(rooms: Room[], filters: RoomFilters): Room[] {
  return rooms.filter((room) => {
    if (filters.type !== "all" && room.type !== filters.type) {
      return false;
    }

    if (filters.floor !== "all" && room.floor !== filters.floor) {
      return false;
    }

    return true;
  });
}

export function getRoomFloors(rooms: Room[]): number[] {
  return [...new Set(rooms.map((room) => room.floor))].sort((a, b) => a - b);
}
