import type { Booking } from "../bookings/types/booking";
import {
  SCHEDULE_END_HOUR,
  SCHEDULE_START_HOUR,
} from "../schedule/scheduleConstants";
import type { Room } from "./types/room";

export type RoomOccupancy = "free" | "in-use" | "maintenance";

const WORK_MINUTES = (SCHEDULE_END_HOUR - SCHEDULE_START_HOUR) * 60;

export function getRoomOccupancy(
  room: Room,
  bookings: Booking[],
  now = new Date(),
): RoomOccupancy {
  if (room.status === "maintenance") {
    return "maintenance";
  }

  const busy = bookings.some(
    (booking) =>
      booking.roomId === room.id &&
      booking.status !== "cancelled" &&
      booking.startTime <= now &&
      booking.endTime > now,
  );

  return busy ? "in-use" : "free";
}

export function getBookedPercentToday(
  roomId: string,
  bookings: Booking[],
  now = new Date(),
): number {
  if (WORK_MINUTES <= 0) {
    return 0;
  }

  const windowStart = new Date(now);
  windowStart.setHours(SCHEDULE_START_HOUR, 0, 0, 0);

  const windowEnd = new Date(now);
  windowEnd.setHours(SCHEDULE_END_HOUR, 0, 0, 0);

  const ranges: Array<[number, number]> = [];

  for (const booking of bookings) {
    if (booking.roomId !== roomId || booking.status === "cancelled") {
      continue;
    }

    const start = Math.max(booking.startTime.getTime(), windowStart.getTime());
    const end = Math.min(booking.endTime.getTime(), windowEnd.getTime());

    if (end > start) {
      ranges.push([start, end]);
    }
  }

  ranges.sort((left, right) => left[0] - right[0]);

  let bookedMs = 0;
  let cursor = 0;

  for (const [start, end] of ranges) {
    const clippedStart = Math.max(start, cursor);
    if (end > clippedStart) {
      bookedMs += end - clippedStart;
      cursor = end;
    }
  }

  return Math.round((bookedMs / (WORK_MINUTES * 60_000)) * 100);
}
