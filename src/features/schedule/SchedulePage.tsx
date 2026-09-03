import { useMemo } from "react";

import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { formatShortDate } from "../../lib/formatDate";
import { toIsoDate } from "../../lib/formatDate";
import { useQueryParam, useQueryParams } from "../../lib/useQueryParams";
import { useBookingStore } from "../../store/bookingStore";
import { ScheduleDateNav } from "./components/ScheduleDateNav";
import { ScheduleGrid } from "./components/ScheduleGrid";
import {
  parseScheduleView,
  ScheduleViewToggle,
} from "./components/ScheduleViewToggle";
import { WeeklyScheduleGrid } from "./components/WeeklyScheduleGrid";
import { getScheduleData } from "./getScheduleData";
import { getWeekDays, getWeeklyScheduleData } from "./getWeeklyScheduleData";
import { parseIsoDate } from "./getBookingsForDate";

export function SchedulePage() {
  const [searchParams, updateParams] = useQueryParams();
  const [date, setDate] = useQueryParam("date", toIsoDate(new Date()));
  const bookings = useBookingStore((state) => state.bookings);
  const view = parseScheduleView(searchParams.get("view"));

  const scheduleData = useMemo(
    () => getScheduleData(date, bookings),
    [bookings, date],
  );
  const weeklyData = useMemo(
    () => getWeeklyScheduleData(date, bookings),
    [bookings, date],
  );

  const weekDays = getWeekDays(date);
  const weekLabel = `${formatShortDate(parseIsoDate(weekDays[0].iso))} – ${formatShortDate(parseIsoDate(weekDays[6].iso))}`;

  function setView(nextView: "daily" | "weekly") {
    updateParams((params) => {
      if (nextView === "daily") {
        params.delete("view");
      } else {
        params.set("view", nextView);
      }
    });
  }

  const meetingCount = view === "daily" ? scheduleData.bookings.length : weeklyData.bookingCount;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Schedule"
        subtitle={view === "daily" ? "Room availability across the day." : weekLabel}
        aside={`${meetingCount} meetings`}
        actions={<ScheduleViewToggle view={view} onChange={setView} />}
      />

      <ScheduleDateNav value={date} onChange={setDate} />

      {scheduleData.rooms.length > 0 ? (
        view === "daily" ? (
          <ScheduleGrid isoDate={date} data={scheduleData} />
        ) : (
          <WeeklyScheduleGrid data={weeklyData} />
        )
      ) : (
        <EmptyState message="No rooms available." />
      )}
    </div>
  );
}
