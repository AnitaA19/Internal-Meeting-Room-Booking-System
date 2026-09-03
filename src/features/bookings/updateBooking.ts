import type { Booking } from "./types/booking";
import { bookingRepository } from "../../lib/repositories";
import {
  ensureOrganizerInParticipants,
  type BookingInput,
} from "./bookingInput";
import { combineDateAndTime } from "./bookingTime";
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
    return { success: false, error: "This booking cannot be edited." };
  }

  const title = input.title.trim();

  if (!title) {
    return { success: false, error: "Meeting title is required." };
  }

  if (!input.roomId) {
    return { success: false, error: "Select a room." };
  }

  if (!input.userId) {
    return { success: false, error: "Select an organizer." };
  }

  const startTime = combineDateAndTime(input.date, input.startTime);
  const endTime = combineDateAndTime(input.date, input.endTime);

  if (Number.isNaN(startTime.getTime()) || Number.isNaN(endTime.getTime())) {
    return { success: false, error: "Enter a valid date and time." };
  }

  if (endTime <= startTime) {
    return { success: false, error: "End time must be after start time." };
  }

  const existingBookings = bookingRepository.getAllBookings();

  if (
    hasRoomConflict(
      existingBookings,
      input.roomId,
      startTime,
      endTime,
      bookingId,
    )
  ) {
    return { success: false, error: "This room is already booked for that time." };
  }

  const participantIds = ensureOrganizerInParticipants(
    input.participantIds.length > 0 ? input.participantIds : [input.userId],
    input.userId,
  );

  const updatedBooking: Booking = {
    ...existing,
    title,
    roomId: input.roomId,
    userId: input.userId,
    startTime,
    endTime,
    status: input.status,
    participantIds,
    notes: input.notes.trim() || undefined,
  };

  bookingRepository.updateBooking(updatedBooking);

  return { success: true, booking: updatedBooking };
}
