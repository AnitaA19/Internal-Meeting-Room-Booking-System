import type { Booking } from "./types/booking";
import { employeeRepository, roomRepository } from "../../lib/repositories";
import { indexById } from "../../lib/indexById";

export function getBookingsPageData(allBookings: Booking[]) {
  const bookings = [...allBookings].sort(
    (left, right) => left.startTime.getTime() - right.startTime.getTime(),
  );

  return {
    bookings,
    roomById: indexById(roomRepository.getAllRooms()),
    employeeById: indexById(employeeRepository.getAllEmployees()),
  };
}
