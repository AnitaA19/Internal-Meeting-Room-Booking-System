import { Clock } from "lucide-react";
import { useState } from "react";

import { formatTimeLabel, getTimeOptionsAfter } from "../../lib/timeOptions";

type TimePickerProps = {
  value: string;
  onChange: (value: string) => void;
  minTime?: string;
  placeholder?: string;
};

export function TimePicker({
  value,
  onChange,
  minTime,
  placeholder = "Select time",
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const options = getTimeOptionsAfter(minTime);
  const displayValue = value ? formatTimeLabel(value) : placeholder;

  function selectTime(time: string) {
    onChange(time);
    setOpen(false);
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="picker-field"
      >
        <span className={value ? "text-white" : "text-subtle"}>{displayValue}</span>
        <Clock className="size-4 text-muted" strokeWidth={1.75} />
      </button>

      {open && (
        <div className="picker-box mt-2">
          <div className="picker-grid">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => selectTime(option.value)}
                className={option.value === value ? "time-slot-active" : "time-slot"}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
