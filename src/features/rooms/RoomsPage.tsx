import { useMemo } from "react";

import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { useQueryParams } from "../../lib/useQueryParams";
import { roomRepository } from "../../lib/repositories";
import { RoomCard } from "./components/RoomCard";
import { RoomFiltersBar } from "./components/RoomFiltersBar";
import { RoomSearch } from "./components/RoomSearch";
import {
  applyRoomFilters,
  defaultRoomFilters,
  getRoomFloors,
  parseRoomFloor,
  parseRoomType,
  type RoomFilters,
} from "./filterRooms";
import { searchRooms } from "./searchRooms";

export function RoomsPage() {
  const [searchParams, updateParams] = useQueryParams();

  const query = searchParams.get("q") ?? "";
  const filters: RoomFilters = {
    type: parseRoomType(searchParams.get("type")),
    floor: parseRoomFloor(searchParams.get("floor")),
  };

  const rooms = roomRepository.getAllRooms();
  const filteredRooms = useMemo(
    () => searchRooms(applyRoomFilters(rooms, filters), query),
    [rooms, filters, query],
  );
  const floors = getRoomFloors(rooms);

  const resultText = `${filteredRooms.length} of ${rooms.length} rooms`;

  function setQuery(nextQuery: string) {
    updateParams((params) => {
      if (nextQuery) {
        params.set("q", nextQuery);
      } else {
        params.delete("q");
      }
    });
  }

  function setFilters(nextFilters: RoomFilters) {
    updateParams((params) => {
      if (nextFilters.type === defaultRoomFilters.type) {
        params.delete("type");
      } else {
        params.set("type", nextFilters.type);
      }

      if (nextFilters.floor === defaultRoomFilters.floor) {
        params.delete("floor");
      } else {
        params.set("floor", String(nextFilters.floor));
      }
    });
  }

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
