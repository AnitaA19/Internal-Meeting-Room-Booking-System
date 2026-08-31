import type { Booking } from "../types/booking";

import bookingData from "../../../data/bookings.json";

import { setItem, getItem } from "../../../lib/storage";

const BOOKINGS_STORAGE_KEY = "bookings";

class BookingRepository {
  private bookings: Booking[];

  constructor() {
    const savedBookings = getItem<Booking[]>(BOOKINGS_STORAGE_KEY);

    if (savedBookings) {
      this.bookings = savedBookings.map(
        (booking): Booking => ({
          ...booking,
          startTime: new Date(booking.startTime),
          endTime: new Date(booking.endTime),
          status: booking.status as Booking["status"],
        }),
      );
    } else {
      this.bookings = bookingData.map(
        (booking): Booking => ({
          ...booking,
          startTime: new Date(booking.startTime),
          endTime: new Date(booking.endTime),
          status: booking.status as Booking["status"],
        }),
      );
    }
  }

  getAllBookings(): Booking[] {
    return this.bookings;
  }

  getBookingById(id: string): Booking | undefined {
    return this.bookings.find((booking) => booking.id === id);
  }

  createBooking(newBooking: Booking): void {
    this.bookings = [...this.bookings, newBooking];

    setItem(BOOKINGS_STORAGE_KEY, this.bookings);
  }

  updateBooking(updatedBooking: Booking): void {
    this.bookings = this.bookings.map((booking) =>
      booking.id === updatedBooking.id ? updatedBooking : booking,
    );
    setItem(BOOKINGS_STORAGE_KEY, this.bookings);
  }

  cancelBooking(bookingId: string): void {
    this.bookings = this.bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: "cancelled" } : booking,
    );
    setItem(BOOKINGS_STORAGE_KEY, this.bookings);
  }
}

export default BookingRepository;
