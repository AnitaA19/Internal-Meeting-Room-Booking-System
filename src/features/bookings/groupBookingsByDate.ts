import { startOfDay } from "date-fns";

import type { Booking } from "./types/booking";

export type BookingDayGroup = {
  date: Date;
  bookings: Booking[];
};

export function groupBookingsByDate(bookings: Booking[]): BookingDayGroup[] {
  const groups = new Map<number, BookingDayGroup>();

  for (const booking of bookings) {
    const day = startOfDay(booking.startTime).getTime();

    if (!groups.has(day)) {
      groups.set(day, { date: startOfDay(booking.startTime), bookings: [] });
    }

    groups.get(day)!.bookings.push(booking);
  }

  return [...groups.values()].sort((a, b) => a.date.getTime() - b.date.getTime());
}
