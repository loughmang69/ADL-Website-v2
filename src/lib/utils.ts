/** Format an ISO date string as e.g. "May 12, 2026". */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/** Truncate to a max length on a word boundary, adding an ellipsis. */
export function truncate(text: string, max: number): string {
  if (!text || text.length <= max) return text ?? "";
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return `${slice.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

/** Human label for an estimated reading time in minutes. */
export function readTimeLabel(minutes?: number): string {
  const m = Math.max(1, Math.round(minutes ?? 1));
  return `${m} min read`;
}

/** Initials from a name, max two characters. */
export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
