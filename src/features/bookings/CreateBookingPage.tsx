import { Link, useSearchParams } from "react-router-dom";

import { PageHeader } from "../../components/ui/PageHeader";
import { parseBookingPrefill } from "../../lib/bookingPrefill";
import { useBookingStore } from "../../store/bookingStore";
import { useUiStore } from "../../store/uiStore";
import { BookingForm } from "./components/BookingForm";

export function CreateBookingPage() {
  const [searchParams] = useSearchParams();
  const createBooking = useBookingStore((state) => state.createBooking);
  const showToast = useUiStore((state) => state.showToast);

  return (
    <>
      <PageHeader
        title="New booking"
        subtitle="Reserve a room for your meeting."
        actions={
          <Link to="/bookings" className="action-link">
            Back to bookings
          </Link>
        }
      />
      <BookingForm
        initialValues={parseBookingPrefill(searchParams)}
        submitLabel="Create booking"
        onSubmit={(values) => {
          const result = createBooking(values);

          if (result.success) {
            showToast("Booking created.");
            return { success: true, bookingId: result.booking.id };
          }

          return { success: false, error: result.error };
        }}
      />
    </>
  );
}
