import { useEffect } from "react";

import { useUiStore } from "../../store/uiStore";

export function Toast() {
  const toast = useUiStore((state) => state.toast);
  const clearToast = useUiStore((state) => state.clearToast);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(clearToast, 3200);
    return () => window.clearTimeout(timer);
  }, [clearToast, toast]);

  if (!toast) {
    return null;
  }

  return (
    <div
      className={toast.type === "success" ? "toast toast-success" : "toast toast-error"}
      role="status"
    >
      {toast.message}
    </div>
  );
}
