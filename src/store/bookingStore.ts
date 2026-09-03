import { create } from "zustand";

import type { BookingInput } from "../features/bookings/bookingInput";
import { cancelBookingAction } from "../features/bookings/cancelBooking";
import { createBooking } from "../features/bookings/createBooking";
import type { Booking } from "../features/bookings/types/booking";
import { updateBooking } from "../features/bookings/updateBooking";
import { bookingRepository } from "../lib/repositories";

type BookingStore = {
  bookings: Booking[];
  sync: () => void;
  getBookingById: (id: string) => Booking | undefined;
  createBooking: (input: BookingInput) => ReturnType<typeof createBooking>;
  updateBooking: (id: string, input: BookingInput) => ReturnType<typeof updateBooking>;
  cancelBooking: (id: string) => ReturnType<typeof cancelBookingAction>;
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: bookingRepository.getAllBookings(),

  sync: () => {
    set({ bookings: bookingRepository.getAllBookings() });
  },

  getBookingById: (id) => {
    return get().bookings.find((booking) => booking.id === id);
  },

  createBooking: (input) => {
    const result = createBooking(input);

    if (result.success) {
      set({ bookings: bookingRepository.getAllBookings() });
    }

    return result;
  },

  updateBooking: (id, input) => {
    const result = updateBooking(id, input);

    if (result.success) {
      set({ bookings: bookingRepository.getAllBookings() });
    }

    return result;
  },

  cancelBooking: (id) => {
    const result = cancelBookingAction(id);

    if (result.success) {
      set({ bookings: bookingRepository.getAllBookings() });
    }

    return result;
  },
}));
