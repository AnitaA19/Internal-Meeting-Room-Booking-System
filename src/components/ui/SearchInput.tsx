type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/5 bg-card px-4 py-3 text-sm placeholder:text-subtle focus:border-white/10 focus:ring-0 focus:outline-none"
    />
  );
}
