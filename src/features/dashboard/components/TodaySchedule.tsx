import type { Booking } from "../../bookings/types/booking";
import type { Employee } from "../../employees/types/employee";
import type { Room } from "../../rooms/types/room";
import { ScheduleRow } from "./ScheduleRow";

type TodayScheduleProps = {
  bookings: Booking[];
  roomById: Map<string, Room>;
  employeeById: Map<string, Employee>;
  remainingToday: number;
};

export function TodaySchedule({
  bookings,
  roomById,
  employeeById,
  remainingToday,
}: TodayScheduleProps) {
  return (
    <section className="rounded-xl bg-card">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <h2 className="font-semibold">Today’s schedule</h2>
        <span className="text-sm text-muted">{remainingToday} left</span>
      </div>

      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <ScheduleRow
            key={booking.id}
            booking={booking}
            room={roomById.get(booking.roomId)}
            organizer={employeeById.get(booking.userId)}
          />
        ))
      ) : (
        <p className="px-6 py-10 text-center text-sm text-muted">
          No meetings today.
        </p>
      )}
    </section>
  );
}
