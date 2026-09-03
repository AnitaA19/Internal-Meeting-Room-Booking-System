import type { RoomType } from "../types/room";
import { SelectField } from "../../../components/ui/SelectField";
import type { CapacityBucket, RoomFilters } from "../filterRooms";

const roomTypeOptions: { value: RoomType | "all"; label: string }[] = [
  { value: "all", label: "All types" },
  { value: "meeting", label: "Meeting room" },
  { value: "conference", label: "Conference" },
  { value: "interview", label: "Interview" },
  { value: "training", label: "Training" },
];

const capacityOptions: { value: CapacityBucket; label: string }[] = [
  { value: "all", label: "Any size" },
  { value: "small", label: "Up to 4" },
  { value: "medium", label: "5–10 people" },
  { value: "large", label: "11+" },
];

type RoomFiltersBarProps = {
  filters: RoomFilters;
  floors: number[];
  onChange: (filters: RoomFilters) => void;
};

export function RoomFiltersBar({ filters, floors, onChange }: RoomFiltersBarProps) {
  const floorOptions = [
    { value: "all", label: "All floors" },
    ...floors.map((floor) => ({ value: String(floor), label: `Floor ${floor}` })),
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <SelectField
        value={filters.type}
        onChange={(type) =>
          onChange({ ...filters, type: type as RoomFilters["type"] })
        }
        options={roomTypeOptions}
      />
      <SelectField
        value={String(filters.floor)}
        onChange={(floor) =>
          onChange({
            ...filters,
            floor: floor === "all" ? "all" : Number(floor),
          })
        }
        options={floorOptions}
      />
      <SelectField
        value={filters.capacity}
        onChange={(capacity) =>
          onChange({ ...filters, capacity: capacity as CapacityBucket })
        }
        options={capacityOptions}
      />
    </div>
  );
}
