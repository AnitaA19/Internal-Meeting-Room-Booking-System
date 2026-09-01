import type { Booking } from "./types/booking";
import type { Employee } from "../employees/types/employee";
import type { Room } from "../rooms/types/room";

type SearchContext = {
  roomById: Map<string, Room>;
  employeeById: Map<string, Employee>;
};

export function searchBookings(
  bookings: Booking[],
  query: string,
  { roomById, employeeById }: SearchContext,
): Booking[] {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return bookings;
  }

  return bookings.filter((booking) => {
    const room = roomById.get(booking.roomId);
    const organizer = employeeById.get(booking.userId);

    return (
      booking.title.toLowerCase().includes(trimmed) ||
      room?.name.toLowerCase().includes(trimmed) ||
      organizer?.name.toLowerCase().includes(trimmed)
    );
  });
}
