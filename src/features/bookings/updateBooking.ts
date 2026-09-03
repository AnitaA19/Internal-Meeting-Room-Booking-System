import type { Booking } from "./types/booking";
import { bookingRepository, roomRepository } from "../../lib/repositories";
import type { BookingInput } from "./bookingInput";
import { resolveBookingInput } from "./bookingTime";
import { hasRoomConflict } from "./hasRoomConflict";

type UpdateBookingResult =
  | { success: true; booking: Booking }
  | { success: false; error: string };

export function isEditable(booking: Booking): boolean {
  return booking.status !== "cancelled" && booking.endTime > new Date();
}

export function updateBooking(
  bookingId: string,
  input: BookingInput,
): UpdateBookingResult {
  const existing = bookingRepository.getBookingById(bookingId);

  if (!existing) {
    return { success: false, error: "Booking not found." };
  }

  if (!isEditable(existing)) {
    return { success: false, error: "This one can no longer be edited." };
  }

  const parsed = resolveBookingInput(input);

  if (!parsed.ok) {
    return { success: false, error: parsed.error };
  }

  const { value } = parsed;
  const room = roomRepository.getRoomById(value.roomId);

  if (!room || (room.status === "maintenance" && room.id !== existing.roomId)) {
    return { success: false, error: "That room is out of service." };
  }

  if (
    hasRoomConflict(
      bookingRepository.getAllBookings(),
      value.roomId,
      value.startTime,
      value.endTime,
      bookingId,
    )
  ) {
    return { success: false, error: "That room is already taken for this slot." };
  }

  const updatedBooking: Booking = {
    ...existing,
    ...value,
  };

  bookingRepository.updateBooking(updatedBooking);

  return { success: true, booking: updatedBooking };
}
