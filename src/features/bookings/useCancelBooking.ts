import { useBookingStore } from "../../store/bookingStore";
import { useUiStore } from "../../store/uiStore";

export function useCancelBooking() {
  const cancelBooking = useBookingStore((state) => state.cancelBooking);
  const askConfirm = useUiStore((state) => state.askConfirm);
  const showToast = useUiStore((state) => state.showToast);

  return (bookingId: string) => {
    askConfirm({
      title: "Cancel this meeting?",
      message: "The room will be freed up for this slot.",
      confirmLabel: "Cancel meeting",
      onConfirm: () => {
        const result = cancelBooking(bookingId);

        if (result.success) {
          showToast("Meeting cancelled.");
          return;
        }

        showToast(result.error, "error");
      },
    });
  };
}
