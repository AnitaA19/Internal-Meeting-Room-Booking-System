import { useMemo } from "react";

import { PageHeader } from "../../components/ui/PageHeader";
import { Metric } from "../../components/ui/Metric";
import { formatDashboardDate } from "../../lib/formatDate";
import { useBookingStore } from "../../store/bookingStore";
import { TodaySchedule } from "./components/TodaySchedule";
import { getDashboardData } from "./getDashboardData";

export function DashboardPage() {
  const bookings = useBookingStore((state) => state.bookings);
  const data = useMemo(() => getDashboardData(bookings), [bookings]);

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle={formatDashboardDate(data.today)}
        aside={`${data.freeRoomCount} rooms free right now`}
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric title="Rooms" count={data.roomCount} />
        <Metric title="Free now" count={data.freeRoomCount} />
        <Metric title="Meetings today" count={data.todaysBookings.length} />
        <Metric title="Active bookings" count={data.activeCount} />
      </div>

      <TodaySchedule
        bookings={data.todaysBookings}
        roomById={data.roomById}
        employeeById={data.employeeById}
        remainingToday={data.remainingToday}
      />
    </>
  );
}
