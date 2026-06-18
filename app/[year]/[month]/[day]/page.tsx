import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchAllGoldDays, fetchDayByParams, fetchAllParams, apiDateToParams, apiDateToISO } from '@/lib/api';
import { apiDateToDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';

// Static export: only serve pre-generated paths.
export const dynamicParams = false;

interface Params {
  year: string;
  month: string;
  day: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  try {
    return await fetchAllParams();
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  try {
    const { year, month, day } = await params;
    const goldDay = await fetchDayByParams(year, month, day);
    const dateStr = goldDay ? apiDateToDisplay(goldDay.date) : `${day}/${month}/${year}`;
    return {
      title: `Gold Price Nepal ${dateStr} – Historical Rate | GoldNepal`,
      description: `Gold and silver price in Nepal on ${dateStr}. Hallmark gold, tajabi gold and silver rates per tola and per 10 gram from Nepal Gold & Silver Dealers' Association.`,
      alternates: { canonical: `/${year}/${month}/${day}/` },
    };
  } catch {
    return { title: 'Gold Price Nepal – Historical Rate | GoldNepal' };
  }
}

export default async function DayPage({ params }: { params: Promise<Params> }) {
  const { year, month, day } = await params;

  const [goldDay, allDays] = await Promise.all([
    fetchDayByParams(year, month, day),
    fetchAllGoldDays(),
  ]);

  if (!goldDay) {
    return (
      <div className="state-center">
        <div className="state-icon">📅</div>
        <div className="state-title">No data for this date</div>
        <div className="state-sub">
          <Link href="/history/" style={{ color: 'var(--gold-dark)' }}>View gold price history →</Link>
        </div>
      </div>
    );
  }

  const displayDate = apiDateToDisplay(goldDay.date);
  const isoDate = apiDateToISO(goldDay.date);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `Gold Price Nepal – ${displayDate}`,
    description: `Hallmark gold, tajabi gold and silver prices in Nepal on ${displayDate}, per tola and per 10 gram.`,
    datePublished: isoDate,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    creator: { '@type': 'Organization', name: "Nepal Gold & Silver Dealers' Association" },
    distribution: [{
      '@type': 'DataDownload',
      contentUrl: 'https://gold-api.singhs.com.np/gold_rates.json',
      encodingFormat: 'application/json',
    }],
  };

  const idx = allDays.findIndex(d => d.date === goldDay.date);
  const prevDay = allDays[idx + 1] ?? null;
  const nextDay = allDays[idx - 1] ?? null;

  const dayHref = (d: { date: string }) => {
    const p = apiDateToParams(d.date);
    return p ? `/${p.year}/${p.month}/${p.day}/` : null;
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/history/">History</Link>
        <span className="breadcrumb-sep">›</span>
        <span>{displayDate}</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Gold Price Nepal – {displayDate}</h1>
        <p className="page-sub">Hallmark gold, tajabi gold &amp; silver rates on this date</p>
      </div>

      <PriceTable day={goldDay} showDate />

      <div style={{ display: 'flex', gap: 10, margin: '16px 0', flexWrap: 'wrap' }}>
        {prevDay && dayHref(prevDay) && (
          <Link href={dayHref(prevDay)!} className="btn-back">
            ← {apiDateToDisplay(prevDay.date)}
          </Link>
        )}
        {nextDay && dayHref(nextDay) && (
          <Link href={dayHref(nextDay)!} className="btn-back" style={{ marginLeft: 'auto' }}>
            {apiDateToDisplay(nextDay.date)} →
          </Link>
        )}
      </div>

      <div style={{ margin: '8px 0 24px' }}>
        <Link href="/history/" className="btn-back">← Back to History</Link>
        <Link href="/" className="btn-back" style={{ marginLeft: 8 }}>Today&apos;s Rate</Link>
      </div>
    </>
  );
}
