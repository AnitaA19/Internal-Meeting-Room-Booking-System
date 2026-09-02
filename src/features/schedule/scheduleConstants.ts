export const SCHEDULE_START_HOUR = 8;
export const SCHEDULE_END_HOUR = 20;
export const SCHEDULE_HOUR_COUNT = SCHEDULE_END_HOUR - SCHEDULE_START_HOUR + 1;

export function getScheduleHours(): number[] {
  const hours: number[] = [];

  for (let hour = SCHEDULE_START_HOUR; hour <= SCHEDULE_END_HOUR; hour++) {
    hours.push(hour);
  }

  return hours;
}
