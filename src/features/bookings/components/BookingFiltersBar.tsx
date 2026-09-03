import type { BookingFilters, BookingRange } from "../filterBookings";

const rangeFilters: { value: BookingRange; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
  { value: "all", label: "All" },
];

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
    <div className="flex flex-col items-stretch gap-2 sm:items-end">
      <div className="filter-group">
        {rangeFilters.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange({ ...filters, range: option.value })}
            className={
              filters.range === option.value ? "filter-pill-active" : "filter-pill"
            }
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="filter-group">
        {statusFilters.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange({ ...filters, status: option.value })}
            className={
              filters.status === option.value ? "filter-pill-active" : "filter-pill"
            }
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
