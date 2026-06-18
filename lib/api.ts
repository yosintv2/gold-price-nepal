const API_URL = 'https://gold-api.singhs.com.np/gold_rates.json';

interface RateEntry {
  item: string;
  unit: string;
  price: number;
}

interface DayRate {
  date: string;
  currency: string;
  rates: RateEntry[];
}

export interface GoldDay {
  date: string;          // "14-Jan-2026"
  hallmark: { tola: number; gram10: number };
  tajabi:   { tola: number; gram10: number };
  silver:   { tola: number; gram10: number };
}

function getPrice(rates: RateEntry[], keyword: string, unit: string): number {
  return rates.find(r =>
    r.item.toLowerCase().includes(keyword.toLowerCase()) && r.unit === unit
  )?.price ?? 0;
}

function parseDay(raw: DayRate): GoldDay {
  return {
    date: raw.date,
    hallmark: {
      tola:   getPrice(raw.rates, 'hallmark', 'Tola'),
      gram10: getPrice(raw.rates, 'hallmark', '10 gram'),
    },
    tajabi: {
      tola:   getPrice(raw.rates, 'tajabi', 'Tola'),
      gram10: getPrice(raw.rates, 'tajabi', '10 gram'),
    },
    silver: {
      tola:   getPrice(raw.rates, 'silver', 'Tola'),
      gram10: getPrice(raw.rates, 'silver', '10 gram'),
    },
  };
}

export async function fetchAllGoldDays(): Promise<GoldDay[]> {
  try {
    const res = await fetch(API_URL, {
      // force-cache deduplicates the request within one Next.js build worker.
      // AbortSignal.timeout fails fast if the API is slow in CI.
      cache: 'force-cache',
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) return [];
    const data: DayRate[] = await res.json();
    return data
      .filter(d => d.date && d.date.trim() !== '' && Array.isArray(d.rates) && d.rates.length > 0)
      .map(parseDay)
      .reverse(); // newest first
  } catch {
    return [];
  }
}

export async function fetchLatestRate(): Promise<GoldDay | null> {
  const days = await fetchAllGoldDays();
  return days[0] ?? null;
}

// Month abbreviations used in the API date format "14-Jan-2026"
const MONTH_TO_NUM: Record<string, string> = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04',
  May: '05', Jun: '06', Jul: '07', Aug: '08',
  Sep: '09', Oct: '10', Nov: '11', Dec: '12',
};
const NUM_TO_MONTH: Record<string, string> = {
  '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
  '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
  '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec',
};

// Parse "14-Jan-2026" → { year, month, day } for URL segments.
// day is always zero-padded ("04", "14").
export function apiDateToParams(apiDate: string): { year: string; month: string; day: string } | null {
  const parts = apiDate.trim().split('-');
  if (parts.length !== 3) return null;
  const [d, mon, y] = parts;
  const month = MONTH_TO_NUM[mon];
  if (!month || !y || !d) return null;
  return { year: y, month, day: d.padStart(2, '0') };
}

// Reconstruct the API date string from URL params.
// Tries both "4-Jan-2026" and "04-Jan-2026" since the API
// may or may not zero-pad single-digit days.
export function paramsToApiDate(year: string, month: string, day: string): string[] {
  const mon = NUM_TO_MONTH[month];
  if (!mon) return [];
  const dayInt = parseInt(day, 10);
  const candidates = [
    `${dayInt}-${mon}-${year}`,                       // "4-Jan-2026"
    `${String(dayInt).padStart(2, '0')}-${mon}-${year}`, // "04-Jan-2026"
  ];
  // deduplicate (e.g. day 14 → both forms are the same)
  return [...new Set(candidates)];
}

export async function fetchDayByParams(year: string, month: string, day: string): Promise<GoldDay | null> {
  const days = await fetchAllGoldDays();
  const candidates = paramsToApiDate(year, month, day);
  return days.find(d => candidates.includes(d.date)) ?? null;
}

// "14-Jan-2026" → "2026-01-14" (ISO, for schema markup)
export function apiDateToISO(apiDate: string): string {
  const p = apiDateToParams(apiDate);
  if (!p) return apiDate;
  return `${p.year}-${p.month}-${p.day}`;
}

// All URL param sets derived from the API date list.
export async function fetchAllParams(): Promise<{ year: string; month: string; day: string }[]> {
  const days = await fetchAllGoldDays();
  return days
    .map(d => apiDateToParams(d.date))
    .filter((p): p is { year: string; month: string; day: string } => p !== null);
}
