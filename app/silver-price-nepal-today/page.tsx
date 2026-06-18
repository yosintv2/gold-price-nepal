import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Silver Price Nepal Today – Aajako Chandi Ko Bhaau | GoldNepal',
  description:
    "Today's silver price in Nepal per tola and per 10 gram. Aajako chandi ko bhaau Nepal — updated daily from Nepal Gold & Silver Dealers' Association.",
  keywords: 'silver price nepal today, aajako chandi ko bhaau, chandi price today nepal, silver rate today nepal, chandi ko bhaau aaja nepal, today silver price nepal, silver per tola today nepal, chandi bhaau today, aajako chandi bhaau nepal',
  alternates: { canonical: '/silver-price-nepal-today/' },
};

const FAQS = [
  {
    q: "What is today's silver price in Nepal?",
    a: "Today's silver price in Nepal per tola and per 10 gram is shown in the table above. The rate is updated every business day by the Nepal Gold & Silver Dealers' Association.",
  },
  {
    q: 'What is aajako chandi ko bhaau?',
    a: "Aajako chandi ko bhaau (आजको चाँदी को भाउ) means today's silver price in Nepali. The current silver rate per tola and per 10 gram is displayed at the top of this page.",
  },
  {
    q: 'How does silver price change in Nepal?',
    a: "Silver prices in Nepal are influenced by global silver spot prices, the USD-NPR exchange rate, and local demand. Prices are announced each morning by the Nepal Gold & Silver Dealers' Association.",
  },
];

export default async function SilverPriceTodayPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/silver-price-nepal/">Silver Price Nepal</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Today</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Silver Price Nepal Today – {todayDisplay()}</h1>
        <p className="page-sub">Aajako chandi ko bhaau — चाँदी — per tola &amp; per 10 gram</p>
      </div>

      {latest ? (
        <>
          <div className="price-hero">
            <div className="price-hero-main">
              <div className="price-hero-icon" aria-hidden="true">🪙</div>
              <div className="price-hero-info">
                <div className="price-hero-label">Today&apos;s Silver Price Nepal (चाँदी — Chandi)</div>
                <div className="price-hero-row">
                  <span className="price-hero-price">{formatNPR(latest.silver.tola)}</span>
                  <span className="price-hero-per">/ tola</span>
                </div>
                <div className="price-hero-row price-hero-row-10g">
                  <span className="price-hero-price-10g">{formatNPR(latest.silver.gram10)}</span>
                  <span className="price-hero-per">/ 10g</span>
                </div>
                <div className="price-hero-date">As of {apiDateToDisplay(latest.date)}</div>
              </div>
            </div>
          </div>
          <PriceTable day={latest} highlight="silver" showDate />
        </>
      ) : (
        <div className="state-center">
          <div className="state-icon">📊</div>
          <div className="state-title">Rates unavailable</div>
          <div className="state-sub">Please try again later.</div>
        </div>
      )}

      <section className="seo-section">
        <h2><span className="y-bar" />Silver Price Nepal Today</h2>
        <p>
          <strong>Aajako chandi ko bhaau</strong> (today&apos;s silver price in Nepal) is published
          every business day by the Nepal Gold &amp; Silver Dealers&apos; Association alongside gold
          rates. Silver (चाँदी) is used extensively in traditional Nepali jewellery, religious
          items, and cultural artefacts.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/silver-price-nepal/" className="tag-pill">Silver Price Nepal</Link>
          <Link href="/gold-price-nepal/" className="tag-pill">Gold Price Nepal</Link>
          <Link href="/hallmark-gold-price-nepal-today/" className="tag-pill">Hallmark Gold Today</Link>
          <Link href="/history/" className="tag-pill">Price History</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
