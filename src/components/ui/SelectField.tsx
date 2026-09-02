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
        className="control-select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="control-icon" strokeWidth={1.75} />
    </div>
  );
}
