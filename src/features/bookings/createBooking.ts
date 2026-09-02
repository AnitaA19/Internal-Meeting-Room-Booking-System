import type { Booking } from "./types/booking";
import { bookingRepository } from "../../lib/repositories";
import { hasRoomConflict } from "./hasRoomConflict";

export type CreateBookingInput = {
  title: string;
  roomId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
};

type CreateBookingResult =
  | { success: true; booking: Booking }
  | { success: false; error: string };

function combineDateAndTime(date: string, time: string): Date {
  return new Date(`${date}T${time}:00`);
}

export function createBooking(input: CreateBookingInput): CreateBookingResult {
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

  const booking: Booking = {
    id: `booking-${crypto.randomUUID()}`,
    title,
    roomId: input.roomId,
    userId: input.userId,
    startTime,
    endTime,
    status: "confirmed",
    participantIds: [input.userId],
  };

  bookingRepository.createBooking(booking);

  return { success: true, booking };
}
