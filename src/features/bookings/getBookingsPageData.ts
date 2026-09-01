import { bookingRepository, employeeRepository, roomRepository } from "../../lib/repositories";
import { getUpcomingBookings } from "./getUpcomingBookings";

export function getBookingsPageData() {
  const allBookings = bookingRepository
    .getAllBookings()
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  const bookings = getUpcomingBookings(allBookings);
  const rooms = roomRepository.getAllRooms();
  const employees = employeeRepository.getAllEmployees();

  return {
    bookings,
    roomById: new Map(rooms.map((room) => [room.id, room])),
    employeeById: new Map(employees.map((employee) => [employee.id, employee])),
  };
}
