import { addDays, endOfDay, startOfDay } from "date-fns";

import type { Booking } from "./types/booking";

export function getUpcomingBookings(bookings: Booking[], days = 2): Booking[] {
  const rangeStart = startOfDay(new Date());
  const rangeEnd = endOfDay(addDays(rangeStart, days - 1));

  return bookings.filter(
    (booking) => booking.startTime >= rangeStart && booking.startTime <= rangeEnd,
  );
}
