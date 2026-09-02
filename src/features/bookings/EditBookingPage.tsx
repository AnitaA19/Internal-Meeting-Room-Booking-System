import { Link, Navigate, useParams } from "react-router-dom";

import { PageHeader } from "../../components/ui/PageHeader";
import { bookingRepository } from "../../lib/repositories";
import { bookingToFormInput } from "./bookingTime";
import { isEditable, updateBooking } from "./updateBooking";
import { BookingForm } from "./components/BookingForm";

export function EditBookingPage() {
  const { id } = useParams();
  const booking = id ? bookingRepository.getBookingById(id) : undefined;

  if (!booking) {
    return <Navigate to="/bookings" replace />;
  }

  if (!isEditable(booking)) {
    return <Navigate to="/bookings" replace />;
  }

  return (
    <>
      <PageHeader
        title="Edit booking"
        subtitle={booking.title}
        actions={
          <Link to="/bookings" className="action-link">
            Back to bookings
          </Link>
        }
      />
      <BookingForm
        initialValues={bookingToFormInput(booking)}
        submitLabel="Save changes"
        onSubmit={(values) => {
          const result = updateBooking(booking.id, values);
          return result.success
            ? { success: true }
            : { success: false, error: result.error };
        }}
      />
    </>
  );
}
