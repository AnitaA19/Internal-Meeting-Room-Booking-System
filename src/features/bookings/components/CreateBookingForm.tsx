import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { DateField } from "../../../components/ui/DateField";
import { FormField } from "../../../components/ui/FormField";
import { SelectField } from "../../../components/ui/SelectField";
import { TimePicker } from "../../../components/ui/TimePicker";
import { toIsoDate } from "../../../lib/formatDate";
import { getNextTimeSlot } from "../../../lib/timeOptions";
import { employeeRepository, roomRepository } from "../../../lib/repositories";
import { createBooking, type CreateBookingInput } from "../createBooking";

const emptyForm: CreateBookingInput = {
  title: "",
  roomId: "",
  userId: "",
  date: toIsoDate(new Date()),
  startTime: "09:00",
  endTime: "10:00",
};

export function CreateBookingForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateBookingInput>(emptyForm);
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

    const result = createBooking(form);

    if (!result.success) {
      setError(result.error);
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
          Create booking
        </button>
        <button type="button" onClick={() => navigate("/bookings")} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
