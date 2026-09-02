export function getTimeOptions(): { value: string; label: string }[] {
  const options: { value: string; label: string }[] = [];

  for (let hour = 8; hour <= 20; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 20 && minute > 0) {
        break;
      }

      const value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      const label = formatTimeLabel(value);
      options.push({ value, label });
    }
  }

  return options;
}

export function formatTimeLabel(time24: string): string {
  const [hours, minutes] = time24.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
}

export function getNextTimeSlot(time24: string): string | undefined {
  const options = getTimeOptions();
  const index = options.findIndex((option) => option.value === time24);

  return options[index + 1]?.value;
}

export function getTimeOptionsAfter(minTime?: string): { value: string; label: string }[] {
  const options = getTimeOptions();

  if (!minTime) {
    return options;
  }

  return options.filter((option) => option.value > minTime);
}
