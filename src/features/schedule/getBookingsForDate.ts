import { isSameDay } from "date-fns";

import type { Booking } from "../bookings/types/booking";

export function parseIsoDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getBookingsForDate(bookings: Booking[], isoDate: string): Booking[] {
  const date = parseIsoDate(isoDate);

  return bookings
    .filter(
      (booking) => booking.status !== "cancelled" && isSameDay(booking.startTime, date),
    )
    .sort((left, right) => left.startTime.getTime() - right.startTime.getTime());
}
