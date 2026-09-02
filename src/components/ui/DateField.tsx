import { Calendar } from "lucide-react";
import { useRef } from "react";

import { fieldClassName } from "./FormField";

type DateFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function DateField({ value, onChange }: DateFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function openPicker() {
    inputRef.current?.showPicker?.();
    inputRef.current?.focus();
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${fieldClassName} date-input pr-10`}
      />
      <button
        type="button"
        onClick={openPicker}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted hover:text-white"
        aria-label="Open calendar"
      >
        <Calendar className="size-4" strokeWidth={1.75} />
      </button>
    </div>
  );
}
