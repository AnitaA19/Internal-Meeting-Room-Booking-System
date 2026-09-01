import { SearchInput } from "../../../components/ui/SearchInput";

type BookingSearchProps = {
  query: string;
  onChange: (query: string) => void;
};

export function BookingSearch({ query, onChange }: BookingSearchProps) {
  return (
    <SearchInput
      value={query}
      onChange={onChange}
      placeholder="Search by meeting, room, or organizer"
    />
  );
}
