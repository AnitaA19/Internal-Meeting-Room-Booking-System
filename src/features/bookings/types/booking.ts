export type BookingStatus = "confirmed" | "pending" | "cancelled";

export interface Booking {
  id: string;
  title: string;
  roomId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  participantIds: string[];
  notes?: string;
}
