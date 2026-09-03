import { useSearchParams } from "react-router-dom";

import { parseBookingPrefill } from "../../../lib/bookingPrefill";
import { useBookingStore } from "../../../store/bookingStore";
import { useUiStore } from "../../../store/uiStore";
import { BookingForm } from "./BookingForm";

export function CreateBookingForm() {
  const [searchParams] = useSearchParams();
  const createBooking = useBookingStore((state) => state.createBooking);
  const showToast = useUiStore((state) => state.showToast);
  const initialValues = parseBookingPrefill(searchParams);

  return (
    <BookingForm
      initialValues={initialValues}
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
  );
}
