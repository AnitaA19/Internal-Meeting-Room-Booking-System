import { useState } from "react";

import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { roomRepository } from "../../lib/repositories";
import { RoomCard } from "./components/RoomCard";
import { RoomFiltersBar } from "./components/RoomFiltersBar";
import { RoomSearch } from "./components/RoomSearch";
import { applyRoomFilters, defaultRoomFilters, getRoomFloors } from "./filterRooms";
import { searchRooms } from "./searchRooms";

export function RoomsPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(defaultRoomFilters);

  const rooms = roomRepository.getAllRooms();
  const filteredRooms = searchRooms(applyRoomFilters(rooms, filters), query);
  const floors = getRoomFloors(rooms);

  const resultText = `${filteredRooms.length} of ${rooms.length} rooms`;

  return (
    <>
      <PageHeader
        title="Rooms"
        subtitle="Browse meeting rooms across the office."
        aside={resultText}
      />

      <div className="mb-6 flex flex-col gap-3">
        <RoomSearch query={query} onChange={setQuery} />
        <RoomFiltersBar filters={filters} floors={floors} onChange={setFilters} />
      </div>

      {filteredRooms.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <EmptyState message="No rooms match your search or filters." />
      )}
    </>
  );
}
