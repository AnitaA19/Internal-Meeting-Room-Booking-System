import type { BookingStatus } from "../types/booking";

const dotColor: Record<BookingStatus, string> = {
  confirmed: "bg-status-confirmed",
  pending: "bg-status-pending",
  cancelled: "bg-subtle",
};

const statusText: Record<BookingStatus, string> = {
  confirmed: "Confirmed",
  pending: "Pending",
  cancelled: "Cancelled",
};

type BookingStatusLabelProps = {
  status: BookingStatus;
  className?: string;
};

export function BookingStatusLabel({ status, className = "" }: BookingStatusLabelProps) {
    return (
    <span className={["inline-flex items-center gap-2 text-sm text-muted", className].filter(Boolean).join(" ")}>
      <span className={`size-2 rounded-full ${dotColor[status]}`} />
      {statusText[status]}
    </span>
  );
}
