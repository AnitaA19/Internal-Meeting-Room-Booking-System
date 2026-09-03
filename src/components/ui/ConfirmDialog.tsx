import { useUiStore } from "../../store/uiStore";

export function ConfirmDialog() {
  const confirm = useUiStore((state) => state.confirm);
  const clearConfirm = useUiStore((state) => state.clearConfirm);

  if (!confirm) {
    return null;
  }

  function handleConfirm() {
    if (!confirm) {
      return;
    }

    confirm.onConfirm();
    clearConfirm();
  }

  return (
    <div className="dialog-backdrop" role="presentation" onClick={clearConfirm}>
      <div
        className="dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-title" className="text-base font-semibold">
          {confirm.title}
        </h2>
        <p className="mt-2 text-sm text-muted">{confirm.message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={clearConfirm} className="btn-ghost">
            Keep
          </button>
          <button type="button" onClick={handleConfirm} className="btn-primary">
            {confirm.confirmLabel ?? "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
