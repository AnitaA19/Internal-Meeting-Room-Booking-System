import { ChevronDown } from "lucide-react";

type SelectFieldProps = {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

export function SelectField({ value, onChange, options }: SelectFieldProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-xl border border-white/5 bg-card px-4 py-3 pr-10 text-sm text-white focus:border-white/10 focus:ring-0 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-card text-white">
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
        strokeWidth={1.75}
      />
    </div>
  );
}
