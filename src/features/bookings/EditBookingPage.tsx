import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { PageHeader } from "../../components/ui/PageHeader";
import { useBookingStore } from "../../store/bookingStore";
import { useUiStore } from "../../store/uiStore";
import { bookingToFormInput } from "./bookingTime";
import { isEditable } from "./updateBooking";
import { BookingForm } from "./components/BookingForm";

export function EditBookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = useBookingStore((state) =>
    id ? state.getBookingById(id) : undefined,
  );
  const updateBooking = useBookingStore((state) => state.updateBooking);
  const showToast = useUiStore((state) => state.showToast);

  if (!booking) {
    return <Navigate to="/bookings" replace />;
  }

  if (!isEditable(booking)) {
    return <Navigate to={`/bookings/${booking.id}`} replace />;
  }

  return (
    <>
      <PageHeader
        title="Edit booking"
        subtitle={booking.title}
        actions={
          <Link to={`/bookings/${booking.id}`} className="action-link">
            Back
          </Link>
        }
      />
      <BookingForm
        initialValues={bookingToFormInput(booking)}
        submitLabel="Save changes"
        onCancel={() => navigate(`/bookings/${booking.id}`)}
        onSubmit={(values) => {
          const result = updateBooking(booking.id, values);

          if (result.success) {
            showToast("Booking updated.");
            return { success: true, bookingId: result.booking.id };
          }

          return { success: false, error: result.error };
        }}
      />
    </>
  );
}
