type EmptyStateProps = {
  message: string;
};

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-xl bg-card px-6 py-12 text-center text-sm text-muted">
      {message}
    </div>
  );
}
