import { SearchInput } from "../../../components/ui/SearchInput";

type RoomSearchProps = {
  query: string;
  onChange: (query: string) => void;
};

export function RoomSearch({ query, onChange }: RoomSearchProps) {
  return <SearchInput value={query} onChange={onChange} placeholder="Name, floor, or amenity" />;
}
