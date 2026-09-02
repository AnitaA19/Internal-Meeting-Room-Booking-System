import type { Booking } from "./types/booking";

export function hasRoomConflict(
  bookings: Booking[],
  roomId: string,
  startTime: Date,
  endTime: Date,
): boolean {
  return bookings.some(
    (booking) =>
      booking.roomId === roomId &&
      booking.status !== "cancelled" &&
      startTime < booking.endTime &&
      endTime > booking.startTime,
  );
}
