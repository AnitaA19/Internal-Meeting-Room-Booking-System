import type { RoomType } from "./types/room";

export const roomTypeLabels: Record<RoomType, string> = {
  meeting: "Meeting room",
  conference: "Conference",
  interview: "Interview",
  training: "Training",
};

const amenityShortNames: Record<string, string> = {
  "Video Conferencing": "Video conf.",
  TV: "Display",
  Microphone: "Speakerphone",
  Speakers: "Speakers",
};

export function shortAmenity(name: string): string {
  return amenityShortNames[name] ?? name;
}
