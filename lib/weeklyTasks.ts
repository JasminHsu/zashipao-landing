/** Returns the Monday date for the selected display timezone. */
export function weekStartInTimeZone(now = new Date(), timeZone = 'Asia/Taipei', offset = 0): string {
  const day = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  const date = new Date(`${day}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7 + offset * 7);
  return date.toISOString().slice(0, 10);
}

export function taipeiWeek(now = new Date(), offset = 0): string {
  return weekStartInTimeZone(now, 'Asia/Taipei', offset);
}

/** Normalizes any ISO calendar date to the Monday of that week. */
export function weekStartFromDate(value: string): string {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7);
  return date.toISOString().slice(0, 10);
}

export function moveWeek(value: string, offset: number): string {
  const date = new Date(`${weekStartFromDate(value)}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  date.setUTCDate(date.getUTCDate() + offset * 7);
  return date.toISOString().slice(0, 10);
}
