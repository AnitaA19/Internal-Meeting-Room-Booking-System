import type { Booking } from "../bookings/types/booking";
import type { Employee } from "../employees/types/employee";
import type { Room } from "../rooms/types/room";
import { employeeRepository, roomRepository } from "../../lib/repositories";
import { getBookingsForDate } from "./getBookingsForDate";

export type ScheduleData = {
  rooms: Room[];
  bookings: Booking[];
  bookingsByRoom: Map<string, Booking[]>;
  employeeById: Map<string, Employee>;
};

export function getScheduleData(isoDate: string, allBookings: Booking[]): ScheduleData {
  const rooms = roomRepository.getAllRooms();
  const bookings = getBookingsForDate(allBookings, isoDate);
  const employees = employeeRepository.getAllEmployees();

  const bookingsByRoom = new Map<string, Booking[]>();

  for (const booking of bookings) {
    const roomBookings = bookingsByRoom.get(booking.roomId) ?? [];
    roomBookings.push(booking);
    bookingsByRoom.set(booking.roomId, roomBookings);
  }

  const employeeById = new Map(employees.map((employee) => [employee.id, employee]));

  return { rooms, bookings, bookingsByRoom, employeeById };
}
