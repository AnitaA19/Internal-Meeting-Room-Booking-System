import type { Booking } from "./types/booking";
import type { BookingInput } from "./bookingInput";
import { toIsoDate } from "../../lib/formatDate";

export function combineDateAndTime(date: string, time: string): Date {
  return new Date(`${date}T${time}:00`);
}

export function toTimeInput(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function bookingToFormInput(booking: Booking): BookingInput {
  return {
    title: booking.title,
    roomId: booking.roomId,
    userId: booking.userId,
    date: toIsoDate(booking.startTime),
    startTime: toTimeInput(booking.startTime),
    endTime: toTimeInput(booking.endTime),
    status: booking.status === "cancelled" ? "confirmed" : booking.status,
    participantIds: booking.participantIds,
    notes: booking.notes ?? "",
  };
}
