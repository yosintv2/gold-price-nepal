import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: `Gold Price Today in Nepal – ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} | GoldNepal`,
  description:
    'Gold price today in Nepal: live hallmark gold, fine gold 9999, 24K and tejabi gold rates per tola and per 10 gram. Updated every business day.',
  keywords: 'gold price today in nepal, gold price nepal today, aajako suna ko bhaau nepal, today gold price nepal, today gold rate nepal, gold rate today nepal, nepal gold rate today, live gold price nepal',
  alternates: { canonical: '/gold-price-nepal-today/' },
};

const FAQS = [
  {
    q: 'What is the gold price today in Nepal?',
    a: 'Today\'s gold price in Nepal is shown in the table above. The Nepal Gold & Silver Dealers\' Association publishes hallmark gold (fine gold 9999 / 24K) and tejabi gold rates in NPR per tola and per 10 gram each business day.',
  },
  {
    q: 'Is today\'s Nepal gold price updated in real time?',
    a: 'Nepal gold prices are set once per business day, not in real time. GoldNepal updates rates daily as soon as the NGSDA publishes the official figures.',
  },
];

export default async function GoldPriceNepalTodayPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Gold Price Today in Nepal</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Gold Price Today in Nepal – {todayDisplay()}</h1>
        <p className="page-sub">Live hallmark, tajabi and silver rates — updated daily</p>
      </div>

      {latest ? (
        <>
          <div className="price-hero">
            <div className="price-hero-main">
              <div className="price-hero-icon" aria-hidden="true">🥇</div>
              <div className="price-hero-info">
                <div className="price-hero-label">Today's Hallmark Gold Price Nepal (Fine Gold 9999 / 24K)</div>
                <div className="price-hero-row">
                  <span className="price-hero-price">{formatNPR(latest.hallmark.tola)}</span>
                  <span className="price-hero-per">/ tola</span>
                </div>
                <div className="price-hero-row price-hero-row-10g">
                  <span className="price-hero-price-10g">{formatNPR(latest.hallmark.gram10)}</span>
                  <span className="price-hero-per">/ 10g</span>
                </div>
                <div className="price-hero-date">Rate date: {apiDateToDisplay(latest.date)}</div>
              </div>
            </div>
          </div>
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
        <h2><span className="y-bar" />Today&apos;s Gold Rate — Nepal</h2>
        <p>
          The <strong>gold price today in Nepal</strong> covers hallmark fine gold 9999 (24K) and
          tejabi gold in Nepalese Rupees. The Nepal Gold &amp; Silver Dealers&apos; Association
          (NGSDA) releases official rates every business morning.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/hallmark-gold-price-nepal/" className="tag-pill">Hallmark Gold Price</Link>
          <Link href="/tejabi-gold-price-nepal/" className="tag-pill">Tejabi Gold Price</Link>
          <Link href="/silver-price-nepal/" className="tag-pill">Silver Price Today</Link>
          <Link href="/history/" className="tag-pill">View Rate History</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
