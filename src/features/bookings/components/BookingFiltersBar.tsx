import type { BookingFilters } from "../filterBookings";

const statusFilters: { value: BookingFilters["status"]; label: string }[] = [
  { value: "all", label: "All" },
  { value: "confirmed", label: "Confirmed" },
  { value: "pending", label: "Pending" },
  { value: "cancelled", label: "Cancelled" },
];

type BookingFiltersBarProps = {
  filters: BookingFilters;
  onChange: (filters: BookingFilters) => void;
};

export function BookingFiltersBar({ filters, onChange }: BookingFiltersBarProps) {
  return (
    <div className="filter-group">
      {statusFilters.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange({ status: option.value })}
          className={
            filters.status === option.value ? "filter-pill-active" : "filter-pill"
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
