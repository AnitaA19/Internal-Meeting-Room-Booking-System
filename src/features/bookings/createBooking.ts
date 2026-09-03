import type { Booking } from "./types/booking";
import { bookingRepository } from "../../lib/repositories";
import {
  ensureOrganizerInParticipants,
  type BookingInput,
} from "./bookingInput";
import { combineDateAndTime } from "./bookingTime";
import { hasRoomConflict } from "./hasRoomConflict";

type CreateBookingResult =
  | { success: true; booking: Booking }
  | { success: false; error: string };

export function createBooking(input: BookingInput): CreateBookingResult {
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

  if (hasRoomConflict(existingBookings, input.roomId, startTime, endTime)) {
    return { success: false, error: "This room is already booked for that time." };
  }

  const participantIds = ensureOrganizerInParticipants(
    input.participantIds.length > 0 ? input.participantIds : [input.userId],
    input.userId,
  );

  const booking: Booking = {
    id: `booking-${crypto.randomUUID()}`,
    title,
    roomId: input.roomId,
    userId: input.userId,
    startTime,
    endTime,
    status: input.status,
    participantIds,
    notes: input.notes.trim() || undefined,
  };

  bookingRepository.createBooking(booking);

  return { success: true, booking };
}

// Keep legacy export name for any external refs
export type { BookingInput as CreateBookingInput };
