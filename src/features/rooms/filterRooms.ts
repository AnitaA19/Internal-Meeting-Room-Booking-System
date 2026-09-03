import type { Room, RoomType } from "./types/room";

export type CapacityBucket = "all" | "small" | "medium" | "large";

export type RoomFilters = {
  type: RoomType | "all";
  floor: number | "all";
  capacity: CapacityBucket;
};

export const defaultRoomFilters: RoomFilters = {
  type: "all",
  floor: "all",
  capacity: "all",
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

export function parseCapacityBucket(value: string | null): CapacityBucket {
  if (value === "small" || value === "medium" || value === "large") {
    return value;
  }

  return "all";
}

function matchesCapacity(capacity: number, bucket: CapacityBucket): boolean {
  if (bucket === "all") {
    return true;
  }

  if (bucket === "small") {
    return capacity <= 4;
  }

  if (bucket === "medium") {
    return capacity >= 5 && capacity <= 10;
  }

  return capacity >= 11;
}

export function applyRoomFilters(rooms: Room[], filters: RoomFilters): Room[] {
  return rooms.filter((room) => {
    if (filters.type !== "all" && room.type !== filters.type) {
      return false;
    }

    if (filters.floor !== "all" && room.floor !== filters.floor) {
      return false;
    }

    return matchesCapacity(room.capacity, filters.capacity);
  });
}

export function getRoomFloors(rooms: Room[]): number[] {
  return [...new Set(rooms.map((room) => room.floor))].sort((a, b) => a - b);
}
