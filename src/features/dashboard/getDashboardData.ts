import { isSameDay } from "date-fns";

import type { Booking } from "../bookings/types/booking";
import type { Employee } from "../employees/types/employee";
import type { Room } from "../rooms/types/room";
import { indexById } from "../../lib/indexById";
import { employeeRepository, roomRepository } from "../../lib/repositories";

export type DashboardData = {
  today: Date;
  todaysBookings: Booking[];
  activeCount: number;
  roomCount: number;
  freeRoomCount: number;
  remainingToday: number;
  roomById: Map<string, Room>;
  employeeById: Map<string, Employee>;
};

function isBookingActiveNow(booking: Booking, now: Date): boolean {
  return (
    booking.status !== "cancelled" &&
    booking.startTime <= now &&
    booking.endTime > now
  );
}

export function getDashboardData(allBookings: Booking[]): DashboardData {
  const today = new Date();
  const rooms = roomRepository.getAllRooms();
  const roomById = indexById(rooms);
  const employeeById = indexById(employeeRepository.getAllEmployees());

  const activeBookings = allBookings.filter((booking) => booking.status !== "cancelled");
  const todaysBookings = activeBookings
    .filter((booking) => isSameDay(booking.startTime, today))
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  const openRooms = rooms.filter((room) => room.status !== "maintenance");
  const busyRoomIds = new Set(
    allBookings
      .filter((booking) => isBookingActiveNow(booking, today))
      .map((booking) => booking.roomId),
  );

  return {
    today,
    todaysBookings,
    activeCount: activeBookings.length,
    roomCount: rooms.length,
    freeRoomCount: openRooms.filter((room) => !busyRoomIds.has(room.id)).length,
    remainingToday: todaysBookings.filter((booking) => booking.endTime > today).length,
    roomById,
    employeeById,
  };
}
