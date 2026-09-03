import { useMemo } from "react";
import { Link } from "react-router-dom";

import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { useQueryParams } from "../../lib/useQueryParams";
import { useBookingStore } from "../../store/bookingStore";
import { BookingDateGroup } from "./components/BookingDateGroup";
import { BookingFiltersBar } from "./components/BookingFiltersBar";
import { BookingSearch } from "./components/BookingSearch";
import {
  applyBookingFilters,
  defaultBookingFilters,
  parseBookingRange,
  parseBookingStatus,
  type BookingFilters,
} from "./filterBookings";
import { getBookingsPageData } from "./getBookingsPageData";
import { groupBookingsByDate } from "./groupBookingsByDate";
import { searchBookings } from "./searchBookings";
import { useCancelBooking } from "./useCancelBooking";

export function BookingsPage() {
  const [searchParams, updateParams] = useQueryParams();
  const bookings = useBookingStore((state) => state.bookings);
  const requestCancel = useCancelBooking();

  const query = searchParams.get("q") ?? "";
  const filters: BookingFilters = {
    status: parseBookingStatus(searchParams.get("status")),
    range: parseBookingRange(searchParams.get("range")),
  };

  const { bookings: allBookings, roomById, employeeById } = useMemo(
    () => getBookingsPageData(bookings),
    [bookings],
  );
  const filteredBookings = searchBookings(
    applyBookingFilters(allBookings, filters),
    query,
    { roomById, employeeById },
  );
  const dayGroups = groupBookingsByDate(filteredBookings);

  function setQuery(nextQuery: string) {
    updateParams((params) => {
      if (nextQuery) {
        params.set("q", nextQuery);
      } else {
        params.delete("q");
      }
    });
  }

  function setFilters(nextFilters: BookingFilters) {
    updateParams((params) => {
      if (nextFilters.status === defaultBookingFilters.status) {
        params.delete("status");
      } else {
        params.set("status", nextFilters.status);
      }

      if (nextFilters.range === defaultBookingFilters.range) {
        params.delete("range");
      } else {
        params.set("range", nextFilters.range);
      }
    });
  }

  return (
    <>
      <PageHeader
        title="Bookings"
        subtitle="Search, edit, or cancel meetings."
        actions={<BookingFiltersBar filters={filters} onChange={setFilters} />}
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link to="/bookings/new" className="btn-primary shrink-0 px-4">
          New booking
        </Link>
        <div className="flex-1">
          <BookingSearch query={query} onChange={setQuery} />
        </div>
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
              onCancel={requestCancel}
            />
          ))}
        </div>
      ) : (
        <EmptyState message="Nothing matches these filters." />
      )}
    </>
  );
}
