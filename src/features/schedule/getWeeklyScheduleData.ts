import { addDays, isSameDay, startOfWeek } from "date-fns";

import type { Booking } from "../bookings/types/booking";
import type { Room } from "../rooms/types/room";
import { toIsoDate } from "../../lib/formatDate";
import { roomRepository } from "../../lib/repositories";
import { parseIsoDate } from "./getBookingsForDate";

export type WeekDay = {
  iso: string;
  weekday: string;
  day: number;
};

export type WeeklyScheduleData = {
  rooms: Room[];
  days: WeekDay[];
  bookingsByRoomAndDay: Map<string, Map<string, Booking[]>>;
  bookingCount: number;
};

export function getWeekDays(isoDate: string): WeekDay[] {
  const date = parseIsoDate(isoDate);
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });

  return Array.from({ length: 7 }, (_, index) => {
    const day = addDays(weekStart, index);

    return {
      iso: toIsoDate(day),
      weekday: day.toLocaleDateString("en-GB", { weekday: "short" }),
      day: day.getDate(),
    };
  });
}

export function getWeeklyScheduleData(
  isoDate: string,
  allBookings: Booking[],
): WeeklyScheduleData {
  const rooms = roomRepository.getAllRooms().filter((room) => room.status !== "maintenance");
  const days = getWeekDays(isoDate);

  const activeBookings = allBookings.filter((booking) => booking.status !== "cancelled");
  const bookingsByRoomAndDay = new Map<string, Map<string, Booking[]>>();
  let bookingCount = 0;

  for (const room of rooms) {
    const dayMap = new Map<string, Booking[]>();

    for (const day of days) {
      const dayDate = parseIsoDate(day.iso);
      const dayBookings = activeBookings
        .filter(
          (booking) =>
            booking.roomId === room.id && isSameDay(booking.startTime, dayDate),
        )
        .sort((left, right) => left.startTime.getTime() - right.startTime.getTime());

      dayMap.set(day.iso, dayBookings);
      bookingCount += dayBookings.length;
    }

    bookingsByRoomAndDay.set(room.id, dayMap);
  }

  return { rooms, days, bookingsByRoomAndDay, bookingCount };
}
