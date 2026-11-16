export const timeZoneOptions = [
  { value: "America/Los_Angeles", label: "Pacific Time" },
  { value: "America/Denver", label: "Mountain Time" },
  { value: "America/Chicago", label: "Central Time" },
  { value: "America/New_York", label: "Eastern Time" },
  { value: "Asia/Taipei", label: "Taiwan Time" },
  { value: "Europe/London", label: "United Kingdom Time" },
  { value: "UTC", label: "UTC" }
] as const;

export function deviceTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}

export function isValidTimeZone(value: string) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: value }).format();
    return true;
  } catch {
    return false;
  }
}

export function timeZoneAbbreviation(timeZone: string, value: Date | string | number = new Date()) {
  const part = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short"
  }).formatToParts(new Date(value)).find(item => item.type === "timeZoneName");
  return part?.value.replace("GMT", "UTC") || timeZone;
}

export function formatSessionDate(value: string | number | Date, timeZone: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short"
  }).format(new Date(value));
}

export function formatSessionTime(value: string | number | Date, timeZone: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).format(new Date(value));
}

export function formatSessionRange(startsAt: string, endsAt: string, timeZone: string) {
  return `${formatSessionDate(startsAt, timeZone)} · ${formatSessionTime(startsAt, timeZone)}–${formatSessionTime(endsAt, timeZone)} ${timeZoneAbbreviation(timeZone, startsAt)}`;
}
