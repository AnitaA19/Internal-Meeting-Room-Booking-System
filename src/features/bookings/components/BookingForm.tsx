import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { DateField } from "../../../components/ui/DateField";
import { FormField } from "../../../components/ui/FormField";
import { SelectField } from "../../../components/ui/SelectField";
import { TimePicker } from "../../../components/ui/TimePicker";
import { getNextTimeSlot } from "../../../lib/timeOptions";
import { employeeRepository, roomRepository } from "../../../lib/repositories";
import type { CreateBookingInput } from "../createBooking";

type BookingFormProps = {
  initialValues: CreateBookingInput;
  submitLabel: string;
  onSubmit: (values: CreateBookingInput) => { success: boolean; error?: string };
  onCancel?: () => void;
};

export function BookingForm({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: BookingFormProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateBookingInput>(initialValues);
  const [error, setError] = useState("");

  const rooms = roomRepository.getAllRooms();
  const employees = employeeRepository.getAllEmployees();

  const roomOptions = [
    { value: "", label: "Select a room" },
    ...rooms.map((room) => ({ value: room.id, label: room.name })),
  ];

  const employeeOptions = [
    { value: "", label: "Select organizer" },
    ...employees.map((employee) => ({ value: employee.id, label: employee.name })),
  ];

  function updateField<K extends keyof CreateBookingInput>(
    field: K,
    value: CreateBookingInput[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleStartTimeChange(startTime: string) {
    setForm((current) => {
      const nextEnd =
        !current.endTime || current.endTime <= startTime
          ? getNextTimeSlot(startTime) ?? current.endTime
          : current.endTime;

      return { ...current, startTime, endTime: nextEnd };
    });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    const result = onSubmit(form);

    if (!result.success) {
      setError(result.error ?? "Something went wrong.");
      return;
    }

    navigate("/bookings");
  }

  function handleCancel() {
    if (onCancel) {
      onCancel();
      return;
    }

    navigate("/bookings");
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-white/5 bg-card p-6">
      <div className="flex flex-col gap-5">
        <FormField label="Meeting title">
          <input
            type="text"
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="e.g. Product sync"
            className="control"
          />
        </FormField>

        <FormField label="Room">
          <SelectField
            value={form.roomId}
            onChange={(roomId) => updateField("roomId", roomId)}
            options={roomOptions}
          />
        </FormField>

        <FormField label="Organizer">
          <SelectField
            value={form.userId}
            onChange={(userId) => updateField("userId", userId)}
            options={employeeOptions}
          />
        </FormField>

        <FormField label="Date">
          <DateField value={form.date} onChange={(date) => updateField("date", date)} />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Start">
            <TimePicker value={form.startTime} onChange={handleStartTimeChange} />
          </FormField>

          <FormField label="End">
            <TimePicker
              value={form.endTime}
              onChange={(endTime) => updateField("endTime", endTime)}
              minTime={form.startTime}
            />
          </FormField>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-status-pending">{error}</p>}

      <div className="mt-6 flex gap-3">
        <button type="submit" className="btn-primary">
          {submitLabel}
        </button>
        <button type="button" onClick={handleCancel} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
