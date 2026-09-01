type PageHeaderProps = {
  title: string;
  subtitle?: string;
  aside?: string;
};

export function PageHeader({ title, subtitle, aside }: PageHeaderProps) {
  return (
    <header className="mb-8 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {aside && <p className="text-sm text-muted">{aside}</p>}
    </header>
  );
}
