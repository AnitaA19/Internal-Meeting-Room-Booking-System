import { SCHEDULE_END_HOUR, SCHEDULE_START_HOUR } from "./scheduleConstants";

const scheduleStartMinutes = SCHEDULE_START_HOUR * 60;
const scheduleEndMinutes = SCHEDULE_END_HOUR * 60;
const totalMinutes = scheduleEndMinutes - scheduleStartMinutes;

function toMinutes(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

export function getTimelinePosition(startTime: Date, endTime: Date) {
  const start = Math.max(toMinutes(startTime), scheduleStartMinutes);
  const end = Math.min(toMinutes(endTime), scheduleEndMinutes);
  const duration = Math.max(end - start, 0);

  return {
    left: ((start - scheduleStartMinutes) / totalMinutes) * 100,
    width: (duration / totalMinutes) * 100,
  };
}

export function getNowLinePercent(now = new Date()): number | null {
  const minutes = toMinutes(now);

  if (minutes < scheduleStartMinutes || minutes > scheduleEndMinutes) {
    return null;
  }

  return ((minutes - scheduleStartMinutes) / totalMinutes) * 100;
}
