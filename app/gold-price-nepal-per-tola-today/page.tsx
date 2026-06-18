import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Gold Price Per Tola Nepal Today – Ek Tola Suna Ko Bhaau Aaja | GoldNepal',
  description:
    "Gold price per tola in Nepal today. Aajako ek tola suna ko bhaau — hallmark and tejabi gold rate per tola in NPR. 1 tola = 11.66 grams. Updated daily.",
  keywords: 'gold price per tola nepal today, ek tola suna ko bhaau aaja, gold per tola today nepal, tola suna ko bhaau nepal today, 1 tola gold price today nepal, aajako tola suna bhaau, gold rate per tola nepal today, tola gold price today',
  alternates: { canonical: '/gold-price-nepal-per-tola-today/' },
};

const FAQS = [
  {
    q: "What is today's gold price per tola in Nepal?",
    a: "Today's gold price per tola in Nepal is shown in the table above. Both hallmark gold (Fine Gold 9999 / 24K) and tejabi gold rates per tola are displayed. 1 tola = 11.664 grams.",
  },
  {
    q: 'What is ek tola suna ko bhaau aaja?',
    a: 'Ek tola suna ko bhaau aaja (एक तोला सुनको भाउ आज) means today\'s gold price per one tola in Nepali. The current tola price for hallmark and tejabi gold is shown at the top of this page.',
  },
  {
    q: 'How much is one tola of gold worth in Nepal today?',
    a: 'One tola of hallmark gold price in Nepal today is shown in the stats above. Tejabi gold per tola is slightly lower. Both rates are updated daily from the Nepal Gold & Silver Dealers\' Association.',
  },
];

export default async function GoldPerTolaTodayPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/gold-price-nepal-per-tola/">Gold Per Tola</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Today</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Gold Price Per Tola Nepal Today – {todayDisplay()}</h1>
        <p className="page-sub">Ek tola suna ko bhaau aaja — 1 tola = 11.66 grams</p>
      </div>

      {latest ? (
        <>
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-val">{formatNPR(latest.hallmark.tola)}</div>
              <div className="stat-label">Hallmark Gold / Tola</div>
            </div>
            <div className="stat-card">
              <div className="stat-val">{formatNPR(latest.tajabi.tola)}</div>
              <div className="stat-label">Tejabi Gold / Tola</div>
            </div>
            <div className="stat-card">
              <div className="stat-val">{formatNPR(latest.silver.tola)}</div>
              <div className="stat-label">Silver / Tola</div>
            </div>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 14px' }}>
            As of {apiDateToDisplay(latest.date)}
          </p>
          <PriceTable day={latest} showDate />
        </>
      ) : (
        <div className="state-center">
          <div className="state-icon">📊</div>
          <div className="state-title">Rates unavailable</div>
          <div className="state-sub">Please try again later.</div>
        </div>
      )}

      <section className="seo-section">
        <h2><span className="y-bar" />Today&apos;s Gold Price Per Tola Nepal</h2>
        <p>
          The <strong>gold price per tola</strong> in Nepal today is updated every business morning
          by the Nepal Gold &amp; Silver Dealers&apos; Association. One tola equals 11.664 grams —
          the traditional South Asian unit still widely used in Nepal&apos;s gold market.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/gold-price-nepal-per-tola/" className="tag-pill">Gold Per Tola</Link>
          <Link href="/gold-price-nepal-per-10gm-today/" className="tag-pill">Gold Per 10g Today</Link>
          <Link href="/hallmark-gold-price-nepal-today/" className="tag-pill">Hallmark Gold Today</Link>
          <Link href="/history/" className="tag-pill">Price History</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
