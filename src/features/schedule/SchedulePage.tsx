import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";

export function SchedulePage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Schedule" subtitle="Daily and weekly room schedule." />
      <EmptyState message="Calendar view will be added here." />
    </div>
  );
}
