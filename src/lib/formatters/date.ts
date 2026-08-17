export function formatDateId(date: string | Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatPeriodId(start: string, end: string): string {
  return `${formatDateId(start)} - ${formatDateId(end)}`;
}
