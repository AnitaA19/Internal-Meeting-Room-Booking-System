import type { BookingStatus } from "../types/booking";

const dotColor: Record<BookingStatus, string> = {
  confirmed: "bg-status-confirmed",
  pending: "bg-status-pending",
  cancelled: "bg-subtle",
};

type BookingStatusLabelProps = {
  status: BookingStatus;
};

export function BookingStatusLabel({ status }: BookingStatusLabelProps) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-muted capitalize">
      <span className={`size-2 rounded-full ${dotColor[status]}`} />
      {status}
    </span>
  );
}
