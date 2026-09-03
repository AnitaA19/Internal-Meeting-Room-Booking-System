export type ScheduleView = "daily" | "weekly";

export function parseScheduleView(value: string | null): ScheduleView {
  return value === "weekly" ? "weekly" : "daily";
}
