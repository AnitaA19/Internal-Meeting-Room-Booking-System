import { toIsoDate } from "../../../lib/formatDate";
import { createBooking, type CreateBookingInput } from "../createBooking";
import { BookingForm } from "./BookingForm";

const emptyForm: CreateBookingInput = {
  title: "",
  roomId: "",
  userId: "",
  date: toIsoDate(new Date()),
  startTime: "09:00",
  endTime: "10:00",
};

export function CreateBookingForm() {
  return (
    <BookingForm
      initialValues={emptyForm}
      submitLabel="Create booking"
      onSubmit={(values) => {
        const result = createBooking(values);
        return result.success
          ? { success: true }
          : { success: false, error: result.error };
      }}
    />
  );
}
