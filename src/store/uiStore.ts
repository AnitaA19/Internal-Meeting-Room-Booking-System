import { create } from "zustand";

type ToastType = "success" | "error";

type Toast = {
  message: string;
  type: ToastType;
};

type ConfirmRequest = {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
};

type UiStore = {
  toast: Toast | null;
  confirm: ConfirmRequest | null;
  showToast: (message: string, type?: ToastType) => void;
  clearToast: () => void;
  askConfirm: (request: ConfirmRequest) => void;
  clearConfirm: () => void;
};

export const useUiStore = create<UiStore>((set) => ({
  toast: null,
  confirm: null,

  showToast: (message, type = "success") => {
    set({ toast: { message, type } });
  },

  clearToast: () => {
    set({ toast: null });
  },

  askConfirm: (request) => {
    set({ confirm: request });
  },

  clearConfirm: () => {
    set({ confirm: null });
  },
}));
