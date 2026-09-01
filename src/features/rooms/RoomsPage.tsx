import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";

export function RoomsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Rooms" subtitle="Browse and filter meeting rooms." />
      <EmptyState message="Room list will be added here." />
    </div>
  );
}
