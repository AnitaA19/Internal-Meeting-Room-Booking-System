import type { Booking } from "../types/booking";
import bookingData from "../../../data/bookings.json";

class BookingRepository {
  private bookings: Booking[];

  constructor() {
    this.bookings = bookingData.map(
      (booking): Booking => ({
        ...booking,
        startTime: new Date(booking.startTime),
        endTime: new Date(booking.endTime),
        status: booking.status as Booking["status"],
      }),
    );
  }

  getAllBookings(): Booking[] {
    return this.bookings;
  }

  getBookingById(id: string): Booking | undefined {
    return this.bookings.find((booking) => booking.id === id);
  }
}

export default BookingRepository;
