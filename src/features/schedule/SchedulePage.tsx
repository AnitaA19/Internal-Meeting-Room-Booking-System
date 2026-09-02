import { useMemo } from "react";

import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { toIsoDate } from "../../lib/formatDate";
import { useQueryParam } from "../../lib/useQueryParams";
import { ScheduleDateNav } from "./components/ScheduleDateNav";
import { ScheduleGrid } from "./components/ScheduleGrid";
import { getScheduleData } from "./getScheduleData";

export function SchedulePage() {
  const [date, setDate] = useQueryParam("date", toIsoDate(new Date()));
  const scheduleData = useMemo(() => getScheduleData(date), [date]);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Schedule"
        subtitle="Room availability across the day."
        aside={`${scheduleData.bookings.length} meetings`}
      />

      <ScheduleDateNav value={date} onChange={setDate} />

      {scheduleData.rooms.length > 0 ? (
        <ScheduleGrid data={scheduleData} />
      ) : (
        <EmptyState message="No rooms available." />
      )}
    </div>
  );
}
