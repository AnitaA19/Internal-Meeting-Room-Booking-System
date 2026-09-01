import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";

export function BookingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Bookings" subtitle="Create and manage meeting bookings." />
      <EmptyState message="Booking management will be added here." />
    </div>
  );
}
