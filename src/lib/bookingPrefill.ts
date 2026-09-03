import type { BookingInput } from "../features/bookings/bookingInput";
import { emptyBookingInput } from "../features/bookings/bookingInput";
import { getNextTimeSlot } from "./timeOptions";

export function parseBookingPrefill(searchParams: URLSearchParams): BookingInput {
  const base = emptyBookingInput();
  const startTime = searchParams.get("start") ?? base.startTime;

  return {
    ...base,
    roomId: searchParams.get("room") || base.roomId,
    date: searchParams.get("date") || base.date,
    startTime: searchParams.get("start") || base.startTime,
    endTime: searchParams.get("end") || getNextTimeSlot(startTime) || base.endTime,
  };
}

export function buildNewBookingUrl(options: {
  roomId: string;
  date: string;
  start: string;
  end?: string;
}): string {
  const params = new URLSearchParams({
    room: options.roomId,
    date: options.date,
    start: options.start,
  });

  if (options.end) {
    params.set("end", options.end);
  }

  return `/bookings/new?${params.toString()}`;
}
