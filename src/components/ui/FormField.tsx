import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  children: ReactNode;
};

export function FormField({ label, children }: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted">{label}</span>
      {children}
    </label>
  );
}

export const fieldClassName =
  "w-full rounded-xl border border-white/5 bg-card px-4 py-3 text-sm text-white placeholder:text-subtle focus:border-white/10 focus:ring-0 focus:outline-none";
