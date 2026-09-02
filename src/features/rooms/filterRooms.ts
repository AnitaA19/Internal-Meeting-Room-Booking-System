import type { Room, RoomType } from "./types/room";

export type RoomFilters = {
  type: RoomType | "all";
  floor: number | "all";
};

export const defaultRoomFilters: RoomFilters = {
  type: "all",
  floor: "all",
};

const roomTypes: RoomType[] = ["meeting", "conference", "interview", "training"];

export function parseRoomType(value: string | null): RoomFilters["type"] {
  if (value && roomTypes.includes(value as RoomType)) {
    return value as RoomType;
  }

  return "all";
}

export function parseRoomFloor(value: string | null): RoomFilters["floor"] {
  if (!value || value === "all") {
    return "all";
  }

  const floor = Number(value);

  return Number.isFinite(floor) ? floor : "all";
}

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
