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
    <div className="flex flex-wrap gap-2">
      {statusFilters.map((option) => {
        const isActive = filters.status === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange({ status: option.value })}
            className={
              isActive
                ? "rounded-full bg-brand px-4 py-1.5 text-sm font-medium text-brand-dark"
                : "rounded-full px-4 py-1.5 text-sm font-medium text-muted hover:text-white"
            }
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
