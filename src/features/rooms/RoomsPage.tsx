import { useState } from "react";

import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { roomRepository } from "../../lib/repositories";
import { RoomCard } from "./components/RoomCard";
import { filterRoomsByName } from "./filterRooms";

export function RoomsPage() {
  const [search, setSearch] = useState("");
  const rooms = roomRepository.getAllRooms();
  const filteredRooms = filterRoomsByName(rooms, search);

  const resultText =
    search.trim().length > 0
      ? `${filteredRooms.length} of ${rooms.length} rooms`
      : `${rooms.length} rooms`;

  return (
    <>
      <PageHeader
        title="Rooms"
        subtitle="Browse meeting rooms across the office."
        aside={resultText}
      />

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by name"
        className="mb-6 w-full rounded-xl bg-card px-4 py-3 text-sm placeholder:text-subtle focus:ring-1 focus:ring-white/20 focus:outline-none"
      />

      {filteredRooms.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <EmptyState message={`No rooms match "${search.trim()}".`} />
      )}
    </>
  );
}
