import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: '24K Gold Price Nepal Today – Aajako 24 Carat Suna Ko Bhaau | GoldNepal',
  description:
    "24K gold price in Nepal today per tola and per 10 gram. Aajako 24 carat suna ko bhaau Nepal — Fine Gold 9999 / Hallmark — updated daily.",
  keywords: '24k gold price nepal today, 24 carat gold price nepal today, aajako 24k suna ko bhaau, 24 karat gold nepal today, 24k gold rate today nepal, 24 carat gold rate nepal, pure gold 24k price nepal, 24k suna ko bhaau aaja',
  alternates: { canonical: '/24k-gold-price-nepal-today/' },
};

const FAQS = [
  {
    q: "What is the 24K gold price in Nepal today?",
    a: "Today's 24K gold price in Nepal per tola and per 10 gram is shown in the table above. 24K gold is the same as Fine Gold 9999 and hallmark gold — 99.9% pure. The rate is published daily by the Nepal Gold & Silver Dealers' Association.",
  },
  {
    q: 'What is aajako 24K suna ko bhaau?',
    a: 'Aajako 24K suna ko bhaau (आजको २४ क्यारेट सुनको भाउ) means today\'s 24-karat gold price in Nepali. The current rate is displayed at the top of this page per tola and per 10 gram.',
  },
  {
    q: 'Why is 24K gold the most expensive in Nepal?',
    a: '24K gold (Fine Gold 9999) is the purest form of gold at 99.9% purity, which is why it commands the highest price per tola in Nepal. It is preferred for investment, gold bars, and certified jewellery.',
  },
];

export default async function Gold24KTodayPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/24k-gold-price-nepal/">24K Gold</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Today&apos;s Rate</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">24K Gold Price Nepal Today – {todayDisplay()}</h1>
        <p className="page-sub">Aajako 24 carat suna ko bhaau — Hallmark / Fine Gold 9999</p>
      </div>

      {latest ? (
        <>
          <div className="price-hero">
            <div className="price-hero-main">
              <div className="price-hero-icon" aria-hidden="true">🏅</div>
              <div className="price-hero-info">
                <div className="price-hero-label">24K Gold Price Nepal Today (Hallmark / Fine Gold 9999)</div>
                <div className="price-hero-row">
                  <span className="price-hero-price">{formatNPR(latest.hallmark.tola)}</span>
                  <span className="price-hero-per">/ tola</span>
                </div>
                <div className="price-hero-row price-hero-row-10g">
                  <span className="price-hero-price-10g">{formatNPR(latest.hallmark.gram10)}</span>
                  <span className="price-hero-per">/ 10g</span>
                </div>
                <div className="price-hero-date">As of {apiDateToDisplay(latest.date)}</div>
              </div>
            </div>
          </div>
          <PriceTable day={latest} highlight="hallmark" showDate />
        </>
      ) : (
        <div className="state-center">
          <div className="state-icon">📊</div>
          <div className="state-title">Rates unavailable</div>
          <div className="state-sub">Please try again later.</div>
        </div>
      )}

      <section className="seo-section">
        <h2><span className="y-bar" />24K Gold Price Nepal Today</h2>
        <p>
          <strong>24K gold</strong> (also known as Fine Gold 9999 or hallmark gold) is the purest
          gold available in Nepal. Today&apos;s 24 carat gold price in Nepal is updated every
          business day by the Nepal Gold &amp; Silver Dealers&apos; Association (NGSDA).
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/24k-gold-price-nepal/" className="tag-pill">24K Gold Price</Link>
          <Link href="/hallmark-gold-price-nepal-today/" className="tag-pill">Hallmark Gold Today</Link>
          <Link href="/fine-gold-9999-price-nepal-today/" className="tag-pill">Fine Gold 9999 Today</Link>
          <Link href="/history/" className="tag-pill">Price History</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
