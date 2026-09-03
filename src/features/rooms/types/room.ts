export type RoomType = "meeting" | "conference" | "interview" | "training";
export type RoomStatus = "open" | "maintenance";

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  status: RoomStatus;
  capacity: number;
  floor: number;
  location: string;
  amenities: string[];
}
