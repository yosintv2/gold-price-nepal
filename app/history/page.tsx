import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchAllGoldDays, apiDateToParams } from '@/lib/api';
import { apiDateToDisplay, formatNPR } from '@/lib/utils';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Gold Price History Nepal – Historical Gold Rates | GoldNepal',
  description:
    'Historical gold price in Nepal: browse past hallmark gold, tajabi gold and silver rates per tola. Full date-by-date price archive from Nepal Gold & Silver Dealers\' Association.',
  alternates: { canonical: '/history/' },
};

const FAQS = [
  {
    q: 'Where can I find historical gold prices in Nepal?',
    a: 'GoldNepal maintains a complete archive of daily gold and silver prices in Nepal. Browse the table above to see past rates, or click any date to view the full price breakdown for that day.',
  },
  {
    q: 'How far back does Nepal gold price history go?',
    a: 'The gold price history on GoldNepal covers all available dates from the Nepal Gold & Silver Dealers\' Association records. Click any date in the table to view detailed rates for that day.',
  },
];

export default async function HistoryPage() {
  const allDays = await fetchAllGoldDays();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Gold Price History</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Gold Price History Nepal</h1>
        <p className="page-sub">
          Full archive of daily gold &amp; silver rates — {allDays.length} days on record
        </p>
      </div>

      <div className="history-table-wrap">
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Hallmark / Tola</th>
              <th>Tajabi / Tola</th>
              <th>Silver / Tola</th>
            </tr>
          </thead>
          <tbody>
            {allDays.map((d, i) => {
              const p = apiDateToParams(d.date);
              return (
                <tr key={d.date} className={i === 0 ? 'history-today' : undefined}>
                  <td>
                    {p ? (
                      <Link href={`/${p.year}/${p.month}/${p.day}/`} className="history-date-link">
                        {apiDateToDisplay(d.date)}
                      </Link>
                    ) : apiDateToDisplay(d.date)}
                  </td>
                  <td className="history-price">{formatNPR(d.hallmark.tola)}</td>
                  <td className="history-price">{formatNPR(d.tajabi.tola)}</td>
                  <td className="history-price">{formatNPR(d.silver.tola)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <section className="seo-section">
        <h2><span className="y-bar" />About Nepal Gold Price History</h2>
        <p>
          This page archives all daily gold and silver prices in Nepal published by the Nepal
          Gold &amp; Silver Dealers&apos; Association (NGSDA). Each entry shows hallmark gold
          (Fine Gold 9999 / 24K), tajabi gold, and silver rates per tola.
        </p>
        <p>
          Click any date to view a dedicated page with the full price breakdown including per-10-gram
          rates for that specific day.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/" className="tag-pill">Today&apos;s Rate</Link>
          <Link href="/hallmark-gold-price-nepal/" className="tag-pill">Hallmark Gold</Link>
          <Link href="/tajabi-gold-price-nepal/" className="tag-pill">Tajabi Gold</Link>
          <Link href="/silver-price-nepal/" className="tag-pill">Silver Price</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
