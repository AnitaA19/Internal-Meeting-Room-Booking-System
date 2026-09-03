import type { Booking } from "./types/booking";
import { employeeRepository, roomRepository } from "../../lib/repositories";
import { getUpcomingBookings } from "./getUpcomingBookings";

export function getBookingsPageData(allBookings: Booking[]) {
  const bookings = getUpcomingBookings(
    [...allBookings].sort((a, b) => a.startTime.getTime() - b.startTime.getTime()),
  );
  const rooms = roomRepository.getAllRooms();
  const employees = employeeRepository.getAllEmployees();

  return {
    bookings,
    roomById: new Map(rooms.map((room) => [room.id, room])),
    employeeById: new Map(employees.map((employee) => [employee.id, employee])),
  };
}
