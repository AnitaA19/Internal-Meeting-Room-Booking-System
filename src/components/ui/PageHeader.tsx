import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  aside?: string;
  actions?: ReactNode;
};

export function PageHeader({ title, subtitle, aside, actions }: PageHeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>

        {(actions || aside) && (
          <div className="flex flex-col items-start gap-3 sm:items-end">
            {aside && <p className="text-sm text-muted">{aside}</p>}
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
