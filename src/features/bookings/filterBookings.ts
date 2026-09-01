import type { Booking, BookingStatus } from "./types/booking";

export type BookingFilters = {
  status: BookingStatus | "all";
};

export const defaultBookingFilters: BookingFilters = {
  status: "all",
};

export function applyBookingFilters(
  bookings: Booking[],
  filters: BookingFilters,
): Booking[] {
  if (filters.status === "all") {
    return bookings;
  }

  return bookings.filter((booking) => booking.status === filters.status);
}
