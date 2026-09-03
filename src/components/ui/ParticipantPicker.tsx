import type { Employee } from "../../features/employees/types/employee";

type ParticipantPickerProps = {
  employees: Employee[];
  selectedIds: string[];
  organizerId: string;
  onChange: (participantIds: string[]) => void;
};

export function ParticipantPicker({
  employees,
  selectedIds,
  organizerId,
  onChange,
}: ParticipantPickerProps) {
  function toggleParticipant(employeeId: string) {
    if (employeeId === organizerId) {
      return;
    }

    if (selectedIds.includes(employeeId)) {
      onChange(selectedIds.filter((id) => id !== employeeId));
      return;
    }

    onChange([...selectedIds, employeeId]);
  }

  return (
    <div className="participant-grid">
      {employees.map((employee) => {
        const isOrganizer = employee.id === organizerId;
        const isSelected = selectedIds.includes(employee.id);

        return (
          <label
            key={employee.id}
            className={
              isSelected || isOrganizer ? "participant-chip-active" : "participant-chip"
            }
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={isSelected || isOrganizer}
              disabled={isOrganizer}
              onChange={() => toggleParticipant(employee.id)}
            />
            <span className="truncate text-sm">{employee.name}</span>
            {isOrganizer && <span className="text-[10px] text-muted">Organizer</span>}
          </label>
        );
      })}
    </div>
  );
}
