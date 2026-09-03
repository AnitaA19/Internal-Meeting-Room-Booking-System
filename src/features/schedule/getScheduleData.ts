import type { Booking } from "../bookings/types/booking";
import type { Room } from "../rooms/types/room";
import { roomRepository } from "../../lib/repositories";
import { getBookingsForDate } from "./getBookingsForDate";

export type ScheduleData = {
  rooms: Room[];
  bookings: Booking[];
  bookingsByRoom: Map<string, Booking[]>;
};

export function getScheduleData(isoDate: string, allBookings: Booking[]): ScheduleData {
  const rooms = roomRepository.getAllRooms().filter((room) => room.status !== "maintenance");
  const bookings = getBookingsForDate(allBookings, isoDate);
  const bookingsByRoom = new Map<string, Booking[]>();

  for (const booking of bookings) {
    const roomBookings = bookingsByRoom.get(booking.roomId) ?? [];
    roomBookings.push(booking);
    bookingsByRoom.set(booking.roomId, roomBookings);
  }

  return { rooms, bookings, bookingsByRoom };
}
