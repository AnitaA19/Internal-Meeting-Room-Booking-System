export function formatShortName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);

  if (parts.length < 2) {
    return fullName;
  }

  return `${parts[0][0]}. ${parts[parts.length - 1]}`;
}
