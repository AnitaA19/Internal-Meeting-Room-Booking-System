import type { Booking } from "./types/booking";
import { bookingRepository } from "../../lib/repositories";

export function isCancellable(booking: Booking): boolean {
  return booking.status !== "cancelled" && booking.endTime > new Date();
}

type CancelBookingResult =
  | { success: true }
  | { success: false; error: string };

export function cancelBookingAction(bookingId: string): CancelBookingResult {
  const booking = bookingRepository.getBookingById(bookingId);

  if (!booking) {
    return { success: false, error: "Booking not found." };
  }

  if (!isCancellable(booking)) {
    return { success: false, error: "This booking cannot be cancelled." };
  }

  bookingRepository.cancelBooking(bookingId);

  return { success: true };
}
