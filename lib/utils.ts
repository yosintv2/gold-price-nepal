const MONTHS_SHORT: Record<string, string> = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04',
  May: '05', Jun: '06', Jul: '07', Aug: '08',
  Sep: '09', Oct: '10', Nov: '11', Dec: '12',
};

const MONTHS_LONG: Record<string, string> = {
  Jan: 'January', Feb: 'February', Mar: 'March',    Apr: 'April',
  May: 'May',     Jun: 'June',     Jul: 'July',      Aug: 'August',
  Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December',
};

// "12-Jan-2026" → { year: "2026", month: "01", day: "12" }
export function apiDateToUrlParams(apiDate: string): { year: string; month: string; day: string } | null {
  const parts = apiDate.split('-');
  if (parts.length !== 3) return null;
  const [d, mon, y] = parts;
  const m = MONTHS_SHORT[mon];
  if (!m) return null;
  return { year: y, month: m, day: d.padStart(2, '0') };
}

// "12-Jan-2026" → "January 12, 2026"
export function apiDateToDisplay(apiDate: string): string {
  const parts = apiDate.split('-');
  if (parts.length !== 3) return apiDate;
  const [d, mon, y] = parts;
  return `${MONTHS_LONG[mon] ?? mon} ${parseInt(d, 10)}, ${y}`;
}

// "12-Jan-2026" → "2026-01-12" (ISO for schema)
export function apiDateToISO(apiDate: string): string {
  const p = apiDateToUrlParams(apiDate);
  if (!p) return apiDate;
  return `${p.year}-${p.month}-${p.day}`;
}

// Today's date as a display string
export function todayDisplay(): string {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// Format NPR price in Indian lakh system: ₨2,74,700
export function formatNPR(price: number): string {
  if (!price) return '—';
  return '₨' + price.toLocaleString('en-IN');
}

// Slug for URL building
export function toSlug(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// All available URL param sets from API date strings
export function datesFromApiDates(apiDates: string[]): { year: string; month: string; day: string }[] {
  return apiDates
    .map(apiDateToUrlParams)
    .filter((p): p is { year: string; month: string; day: string } => p !== null);
}
