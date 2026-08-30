import type { Room } from "../types/room";
import roomData from "../../../data/rooms.json";

class RoomRepository {
  private rooms: Room[];

  constructor() {
    this.rooms = roomData.map(
      (room): Room => ({
        ...room,
        type: room.type as Room["type"],
      }),
    );
  }

  getAllRooms(): Room[] {
    return this.rooms;
  }
}

export default RoomRepository;
