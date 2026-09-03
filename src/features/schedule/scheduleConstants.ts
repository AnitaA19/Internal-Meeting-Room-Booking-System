export const SCHEDULE_START_HOUR = 8;
export const SCHEDULE_END_HOUR = 18;

export const SCHEDULE_SLOT_COUNT = SCHEDULE_END_HOUR - SCHEDULE_START_HOUR;

export function getScheduleSlotHours(): number[] {
  return Array.from({ length: SCHEDULE_SLOT_COUNT }, (_, index) => SCHEDULE_START_HOUR + index);
}

export function getScheduleHourLabels(): number[] {
  return Array.from({ length: SCHEDULE_SLOT_COUNT + 1 }, (_, index) => SCHEDULE_START_HOUR + index);
}
