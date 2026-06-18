import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Hallmark Gold Price Nepal Today – Aajako Hallmark Suna Ko Bhaau | GoldNepal',
  description:
    "Today's hallmark gold price in Nepal per tola and per 10 gram. Aajako hallmark suna ko bhaau — Fine Gold 9999 / 24K — updated daily from NGSDA.",
  keywords: 'hallmark gold price nepal today, aajako hallmark suna ko bhaau, hallmark gold today nepal, hallmark suna bhaau aaja, hallmark gold rate today nepal, today hallmark gold price, fine gold 9999 price today nepal, 24k gold price nepal today',
  alternates: { canonical: '/hallmark-gold-price-nepal-today/' },
};

const FAQS = [
  {
    q: "What is today's hallmark gold price in Nepal?",
    a: "Today's hallmark gold price in Nepal is displayed in the table above. It is updated every business day by the Nepal Gold & Silver Dealers' Association. Hallmark gold is Fine Gold 9999 (24K) — 99.9% pure gold.",
  },
  {
    q: 'What is aajako hallmark suna ko bhaau?',
    a: "Aajako hallmark suna ko bhaau (आजको हलमार्क सुनको भाउ) means today's hallmark gold price in Nepali. The current rate per tola and per 10 gram is shown at the top of this page.",
  },
  {
    q: 'How often does the hallmark gold price change in Nepal?',
    a: "The hallmark gold price in Nepal is updated every business day. Prices are announced each morning by the Nepal Gold & Silver Dealers' Association based on international gold spot prices and the USD-NPR exchange rate.",
  },
];

export default async function HallmarkGoldTodayPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/hallmark-gold-price-nepal/">Hallmark Gold</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Today&apos;s Rate</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Hallmark Gold Price Nepal Today – {todayDisplay()}</h1>
        <p className="page-sub">Aajako hallmark suna ko bhaau — Fine Gold 9999 / 24K</p>
      </div>

      {latest ? (
        <>
          <div className="price-hero">
            <div className="price-hero-main">
              <div className="price-hero-icon" aria-hidden="true">✨</div>
              <div className="price-hero-info">
                <div className="price-hero-label">Today&apos;s Hallmark Gold Price Nepal</div>
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
        <h2><span className="y-bar" />Hallmark Gold Price Nepal Today</h2>
        <p>
          <strong>Aajako hallmark suna ko bhaau</strong> (today&apos;s hallmark gold price in Nepal)
          is set each morning by the Nepal Gold &amp; Silver Dealers&apos; Association. Hallmark gold
          is certified Fine Gold 9999 — equivalent to 24-karat gold at 99.9% purity.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/hallmark-gold-price-nepal/" className="tag-pill">Hallmark Gold Price</Link>
          <Link href="/24k-gold-price-nepal-today/" className="tag-pill">24K Gold Today</Link>
          <Link href="/tejabi-gold-price-nepal/" className="tag-pill">Tejabi Gold</Link>
          <Link href="/history/" className="tag-pill">Price History</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
