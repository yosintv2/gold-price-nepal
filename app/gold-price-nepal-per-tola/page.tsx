import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Gold Price in Nepal Per Tola Today – Tola Suna Ko Bhaau | GoldNepal',
  description:
    'Gold price in Nepal per tola today. Hallmark gold and tejabi gold rate per tola in Nepalese Rupees. 1 tola = 11.66 grams. Updated daily.',
  keywords: 'gold price per tola nepal, ek tola suna ko bhaau nepal, gold per tola nepal, tola gold price nepal, 1 tola gold price nepal, suna per tola nepal, gold tola rate nepal, tola suna bhaau aaja, nepal gold per tola today',
  alternates: { canonical: '/gold-price-nepal-per-tola/' },
};

const FAQS = [
  {
    q: 'How much is one tola of gold in Nepal?',
    a: 'One tola of hallmark gold (Fine Gold 9999 / 24K) price in Nepal is shown in the table above. One tola equals 11.66 grams. This is the most common unit for buying and selling gold in Nepal.',
  },
  {
    q: 'What is one tola in grams?',
    a: 'One tola equals 11.664 grams (often rounded to 11.66g). Tola is the traditional South Asian unit of weight for precious metals, still widely used in Nepal, India, and Pakistan.',
  },
  {
    q: 'Why is gold measured in tola in Nepal?',
    a: 'Tola is a traditional unit of measurement rooted in South Asian history. In Nepal, tola remains the standard unit for gold and silver trading, alongside the international 10-gram measurement.',
  },
];

export default async function GoldPerTolaPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/gold-price-nepal/">Gold Price Nepal</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Per Tola</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Gold Price in Nepal Per Tola – {todayDisplay()}</h1>
        <p className="page-sub">1 tola = 11.66 grams — hallmark, tajabi &amp; silver rates</p>
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
        <h2><span className="y-bar" />Gold Price Per Tola Nepal</h2>
        <p>
          The <strong>gold price per tola</strong> in Nepal is the most commonly used reference
          for buying and selling gold. One tola equals 11.664 grams — a traditional South Asian
          unit of weight that remains the standard in Nepal&apos;s gold market.
        </p>
        <p>
          Both hallmark gold (Fine Gold 9999 / 24K) and tejabi gold are priced per tola by the
          Nepal Gold &amp; Silver Dealers&apos; Association every business day.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/gold-price-nepal-per-10gm/" className="tag-pill">Gold Price Per 10g</Link>
          <Link href="/hallmark-gold-price-nepal/" className="tag-pill">Hallmark Gold</Link>
          <Link href="/tejabi-gold-price-nepal/" className="tag-pill">Tejabi Gold</Link>
          <Link href="/silver-price-nepal/" className="tag-pill">Silver Per Tola</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
