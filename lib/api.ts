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
  date: string;          // "12-Jan-2026"
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

let _cache: GoldDay[] | null = null;

export async function fetchAllGoldDays(): Promise<GoldDay[]> {
  if (_cache) return _cache;
  try {
    const res = await fetch(API_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data: DayRate[] = await res.json();
    _cache = data
      .filter(d => d.date && Array.isArray(d.rates) && d.rates.length > 0)
      .map(parseDay)
      .reverse(); // newest first
    return _cache;
  } catch {
    return [];
  }
}

export async function fetchLatestRate(): Promise<GoldDay | null> {
  const days = await fetchAllGoldDays();
  return days[0] ?? null;
}

export async function fetchDayByParams(year: string, month: string, day: string): Promise<GoldDay | null> {
  const days = await fetchAllGoldDays();
  // API date: "12-Jan-2026". URL params: year="2026", month="01", day="12"
  const MONTHS: Record<string, string> = {
    '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
    '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
    '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec',
  };
  const mon = MONTHS[month];
  if (!mon) return null;
  const target = `${parseInt(day, 10)}-${mon}-${year}`;
  return days.find(d => d.date === target) ?? null;
}
