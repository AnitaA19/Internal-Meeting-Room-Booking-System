import { useMemo } from "react";

import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";
import { SearchInput } from "../../components/ui/SearchInput";
import { useQueryParams } from "../../lib/useQueryParams";
import { roomRepository } from "../../lib/repositories";
import { useBookingStore } from "../../store/bookingStore";
import { RoomCard } from "./components/RoomCard";
import { RoomFiltersBar } from "./components/RoomFiltersBar";
import {
  applyRoomFilters,
  defaultRoomFilters,
  getRoomFloors,
  parseCapacityBucket,
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
    capacity: parseCapacityBucket(searchParams.get("capacity")),
  };

  const bookings = useBookingStore((state) => state.bookings);
  const rooms = useMemo(() => roomRepository.getAllRooms(), []);
  const filteredRooms = searchRooms(applyRoomFilters(rooms, filters), query);
  const floors = getRoomFloors(rooms);

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

      if (nextFilters.capacity === defaultRoomFilters.capacity) {
        params.delete("capacity");
      } else {
        params.set("capacity", nextFilters.capacity);
      }
    });
  }

  return (
    <>
      <PageHeader
        title="Rooms"
        subtitle="Pick a room by type, floor, or size."
        aside={`${filteredRooms.length} of ${rooms.length}`}
      />

      <div className="mb-6 flex flex-col gap-3">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Name, floor, or amenity"
        />
        <RoomFiltersBar filters={filters} floors={floors} onChange={setFilters} />
      </div>

      {filteredRooms.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} bookings={bookings} />
          ))}
        </div>
      ) : (
        <EmptyState message="No rooms match that." />
      )}
    </>
  );
}
