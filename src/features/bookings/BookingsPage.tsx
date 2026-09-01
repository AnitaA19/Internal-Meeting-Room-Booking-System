import { useState } from "react";

import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { BookingDateGroup } from "./components/BookingDateGroup";
import { BookingFiltersBar } from "./components/BookingFiltersBar";
import { BookingSearch } from "./components/BookingSearch";
import { applyBookingFilters, defaultBookingFilters } from "./filterBookings";
import { getBookingsPageData } from "./getBookingsPageData";
import { groupBookingsByDate } from "./groupBookingsByDate";
import { searchBookings } from "./searchBookings";

export function BookingsPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(defaultBookingFilters);

  const { bookings, roomById, employeeById } = getBookingsPageData();
  const filteredBookings = searchBookings(
    applyBookingFilters(bookings, filters),
    query,
    { roomById, employeeById },
  );
  const dayGroups = groupBookingsByDate(filteredBookings);

  return (
    <>
      <PageHeader
        title="Bookings"
        subtitle="Everything booked over the next two days."
        actions={<BookingFiltersBar filters={filters} onChange={setFilters} />}
      />

      <div className="mb-6">
        <BookingSearch query={query} onChange={setQuery} />
      </div>

      {dayGroups.length > 0 ? (
        <div className="flex flex-col gap-8">
          {dayGroups.map((group) => (
            <BookingDateGroup
              key={group.date.toISOString()}
              date={group.date}
              bookings={group.bookings}
              roomById={roomById}
              employeeById={employeeById}
            />
          ))}
        </div>
      ) : (
        <EmptyState message="No bookings match your search or filters." />
      )}
    </>
  );
}
