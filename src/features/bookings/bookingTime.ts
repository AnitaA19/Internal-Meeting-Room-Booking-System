import type { Booking, BookingStatus } from "./types/booking";
import {
  ensureOrganizerInParticipants,
  type BookingInput,
} from "./bookingInput";
import { toIsoDate } from "../../lib/formatDate";

export type ResolvedBookingInput = {
  title: string;
  roomId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  participantIds: string[];
  notes?: string;
};

export function resolveBookingInput(
  input: BookingInput,
): { ok: true; value: ResolvedBookingInput } | { ok: false; error: string } {
  const title = input.title.trim();

  if (!title) {
    return { ok: false, error: "Give the meeting a title." };
  }

  if (!input.roomId) {
    return { ok: false, error: "Pick a room." };
  }

  if (!input.userId) {
    return { ok: false, error: "Pick an organizer." };
  }

  const startTime = combineDateAndTime(input.date, input.startTime);
  const endTime = combineDateAndTime(input.date, input.endTime);

  if (Number.isNaN(startTime.getTime()) || Number.isNaN(endTime.getTime())) {
    return { ok: false, error: "Check the date and time." };
  }

  if (endTime <= startTime) {
    return { ok: false, error: "End needs to be after the start." };
  }

  return {
    ok: true,
    value: {
      title,
      roomId: input.roomId,
      userId: input.userId,
      startTime,
      endTime,
      status: input.status,
      participantIds: ensureOrganizerInParticipants(
        input.participantIds.length > 0 ? input.participantIds : [input.userId],
        input.userId,
      ),
      notes: input.notes.trim() || undefined,
    },
  };
}

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
