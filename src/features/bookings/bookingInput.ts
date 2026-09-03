import type { BookingStatus } from "./types/booking";
import { toIsoDate } from "../../lib/formatDate";

export type BookingInput = {
  title: string;
  roomId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  participantIds: string[];
  notes: string;
};

export function emptyBookingInput(overrides: Partial<BookingInput> = {}): BookingInput {
  return {
    title: "",
    roomId: "",
    userId: "",
    date: toIsoDate(new Date()),
    startTime: "09:00",
    endTime: "10:00",
    status: "confirmed",
    participantIds: [],
    notes: "",
    ...overrides,
  };
}

export function ensureOrganizerInParticipants(
  participantIds: string[],
  userId: string,
): string[] {
  if (!userId) {
    return participantIds;
  }

  return participantIds.includes(userId)
    ? participantIds
    : [userId, ...participantIds];
}
