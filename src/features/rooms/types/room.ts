export type RoomType = "meeting" | "conference" | "interview" | "training";

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  capacity: number;
  floor: number;
  location: string;
  amenities: string[];
}
