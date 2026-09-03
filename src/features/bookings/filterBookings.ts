import type { Booking, BookingStatus } from "./types/booking";

export type BookingRange = "upcoming" | "past" | "all";

export type BookingFilters = {
  status: BookingStatus | "all";
  range: BookingRange;
};

export const defaultBookingFilters: BookingFilters = {
  status: "all",
  range: "upcoming",
};

const bookingStatuses: BookingStatus[] = ["confirmed", "pending", "cancelled"];

export function parseBookingStatus(value: string | null): BookingFilters["status"] {
  if (value && bookingStatuses.includes(value as BookingStatus)) {
    return value as BookingStatus;
  }

  return "all";
}

export function parseBookingRange(value: string | null): BookingRange {
  if (value === "past" || value === "all") {
    return value;
  }

  return "upcoming";
}

export function applyBookingFilters(
  bookings: Booking[],
  filters: BookingFilters,
  now = new Date(),
): Booking[] {
  return bookings.filter((booking) => {
    if (filters.status !== "all" && booking.status !== filters.status) {
      return false;
    }

    if (filters.range === "upcoming" && booking.endTime <= now) {
      return false;
    }

    if (filters.range === "past" && booking.endTime > now) {
      return false;
    }

    return true;
  });
}
