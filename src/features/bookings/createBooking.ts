import type { Booking } from "./types/booking";
import { bookingRepository, roomRepository } from "../../lib/repositories";
import type { BookingInput } from "./bookingInput";
import { resolveBookingInput } from "./bookingTime";
import { hasRoomConflict } from "./hasRoomConflict";

type CreateBookingResult =
  | { success: true; booking: Booking }
  | { success: false; error: string };

export function createBooking(input: BookingInput): CreateBookingResult {
  const parsed = resolveBookingInput(input);

  if (!parsed.ok) {
    return { success: false, error: parsed.error };
  }

  const { value } = parsed;
  const room = roomRepository.getRoomById(value.roomId);

  if (!room || room.status === "maintenance") {
    return { success: false, error: "That room is out of service." };
  }

  if (value.participantIds.length > room.capacity) {
    return {
      success: false,
      error: `${room.name} holds ${room.capacity} — trim the attendee list.`,
    };
  }

  if (
    hasRoomConflict(
      bookingRepository.getAllBookings(),
      value.roomId,
      value.startTime,
      value.endTime,
    )
  ) {
    return { success: false, error: "That room is already taken for this slot." };
  }

  const booking: Booking = {
    id: `booking-${crypto.randomUUID()}`,
    ...value,
  };

  bookingRepository.createBooking(booking);

  return { success: true, booking };
}
