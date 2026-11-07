/**
 * Approximate sunrise time (UTC ms) for a calendar date at a location.
 * Standard almanac algorithm; accurate to a minute or two, which is plenty
 * for a "Sunrise in …" line. Returns null during polar day/night.
 */
export function sunriseUtc(year: number, month: number, day: number, lat: number, lng: number): number | null {
  const rad = Math.PI / 180;
  const mod = (a: number, b: number) => ((a % b) + b) % b;
  const n = Math.floor((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 0)) / 864e5);
  const lngHour = lng / 15;
  const t = n + (6 - lngHour) / 24;
  const M = 0.9856 * t - 3.289;
  const L = mod(M + 1.916 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 282.634, 360);
  let RA = mod(Math.atan(0.91764 * Math.tan(L * rad)) / rad, 360);
  RA = (RA + (Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90)) / 15;
  const sinDec = 0.39782 * Math.sin(L * rad);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.cos(90.833 * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
  if (cosH > 1 || cosH < -1) return null;
  const H = (360 - Math.acos(cosH) / rad) / 15;
  const T = H + RA - 0.06571 * t - 6.622;
  const ut = mod(T - lngHour, 24);
  return Date.UTC(year, month - 1, day) + ut * 3600e3;
}

/** Calendar parts of `date` in a given IANA time zone. */
export function zonedParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { year: get("year"), month: get("month"), day: get("day"), hour: get("hour"), minute: get("minute") };
}

/** "GMT+9", "GMT-3:30", "GMT" for a time zone at a moment. */
export function gmtLabel(date: Date, timeZone: string): string {
  const name = new Intl.DateTimeFormat("en-GB", { timeZone, timeZoneName: "shortOffset" })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value;
  return name ?? "GMT";
}
