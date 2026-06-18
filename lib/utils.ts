const MONTHS_LONG: Record<string, string> = {
  Jan: 'January', Feb: 'February', Mar: 'March',    Apr: 'April',
  May: 'May',     Jun: 'June',     Jul: 'July',      Aug: 'August',
  Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December',
};

// "12-Jan-2026" → "January 12, 2026"
export function apiDateToDisplay(apiDate: string): string {
  const parts = apiDate.split('-');
  if (parts.length !== 3) return apiDate;
  const [d, mon, y] = parts;
  return `${MONTHS_LONG[mon] ?? mon} ${parseInt(d, 10)}, ${y}`;
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

