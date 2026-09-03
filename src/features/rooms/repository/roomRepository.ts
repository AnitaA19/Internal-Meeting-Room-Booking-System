import type { Room } from "../types/room";
import roomData from "../../../data/rooms.json";

class RoomRepository {
  private rooms: Room[];

  constructor() {
    this.rooms = roomData.map(
      (room): Room => ({
        ...room,
        type: room.type as Room["type"],
        status: room.status === "maintenance" ? "maintenance" : "open",
      }),
    );
  }

  getAllRooms(): Room[] {
    return this.rooms;
  }

  getRoomById(id: string): Room | undefined {
    return this.rooms.find((room) => room.id === id);
  }
}

export default RoomRepository;
