import { isSameDay } from "date-fns";

import type { Booking } from "../bookings/types/booking";
import type { Employee } from "../employees/types/employee";
import type { Room } from "../rooms/types/room";
import { bookingRepository, employeeRepository, roomRepository } from "../../lib/repositories";

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

export function getDashboardData(): DashboardData {
  const today = new Date();
  const rooms = roomRepository.getAllRooms();
  const employees = employeeRepository.getAllEmployees();
  const bookings = bookingRepository.getAllBookings();

  const roomById = new Map(rooms.map((room) => [room.id, room]));
  const employeeById = new Map(employees.map((employee) => [employee.id, employee]));

  const activeBookings = bookings.filter((booking) => booking.status !== "cancelled");
  const todaysBookings = activeBookings
    .filter((booking) => isSameDay(booking.startTime, today))
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  const busyRoomIds = new Set(
    bookings
      .filter((booking) => isBookingActiveNow(booking, today))
      .map((booking) => booking.roomId),
  );

  return {
    today,
    todaysBookings,
    activeCount: activeBookings.length,
    roomCount: rooms.length,
    freeRoomCount: rooms.length - busyRoomIds.size,
    remainingToday: todaysBookings.filter((booking) => booking.endTime > today).length,
    roomById,
    employeeById,
  };
}
