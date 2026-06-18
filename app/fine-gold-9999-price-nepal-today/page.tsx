import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Fine Gold 9999 Price Nepal Today – 24K Hallmark Rate | GoldNepal',
  description:
    "Fine gold 9999 price in Nepal today per tola and per 10 gram. Today's 24K hallmark gold price — updated daily from Nepal Gold & Silver Dealers' Association.",
  keywords: 'fine gold 9999 price nepal today, fine gold price today nepal, 9999 gold price nepal today, 24k fine gold nepal today, fine gold rate today nepal, pure gold price nepal today, hallmark fine gold today nepal, aajako fine gold price nepal',
  alternates: { canonical: '/fine-gold-9999-price-nepal-today/' },
};

const FAQS = [
  {
    q: "What is the fine gold 9999 price in Nepal today?",
    a: "Today's fine gold 9999 price in Nepal is shown in the table above per tola and per 10 gram. Fine Gold 9999 is the same as hallmark gold — 99.9% pure, 24-karat gold. The price is set daily by the Nepal Gold & Silver Dealers' Association.",
  },
  {
    q: 'What does 9999 mean in gold?',
    a: '9999 in gold refers to purity of 99.99% — sometimes written as Fine Gold 9999 or 24K gold. In Nepal, both hallmark gold and fine gold 9999 refer to the same product: the purest commercially available gold.',
  },
  {
    q: 'Is fine gold 9999 the same as 24K gold in Nepal?',
    a: 'Yes. In Nepal, Fine Gold 9999, hallmark gold, and 24K gold all refer to certified gold with at least 99.9% purity. They are priced identically by the Nepal Gold & Silver Dealers\' Association.',
  },
];

export default async function FineGold9999TodayPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/fine-gold-9999-price-nepal/">Fine Gold 9999</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Today&apos;s Rate</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Fine Gold 9999 Price Nepal Today – {todayDisplay()}</h1>
        <p className="page-sub">Hallmark / 24K — purest gold available in Nepal</p>
      </div>

      {latest ? (
        <>
          <div className="price-hero">
            <div className="price-hero-main">
              <div className="price-hero-icon" aria-hidden="true">🔬</div>
              <div className="price-hero-info">
                <div className="price-hero-label">Fine Gold 9999 Price Nepal Today</div>
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
        <h2><span className="y-bar" />Fine Gold 9999 Price in Nepal Today</h2>
        <p>
          <strong>Fine Gold 9999</strong> (also called hallmark gold or 24K gold) is the purest form
          of gold sold in Nepal. Today&apos;s fine gold 9999 price per tola and per 10 gram is
          published every business day by the Nepal Gold &amp; Silver Dealers&apos; Association.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/fine-gold-9999-price-nepal/" className="tag-pill">Fine Gold 9999</Link>
          <Link href="/hallmark-gold-price-nepal-today/" className="tag-pill">Hallmark Gold Today</Link>
          <Link href="/24k-gold-price-nepal-today/" className="tag-pill">24K Gold Today</Link>
          <Link href="/history/" className="tag-pill">Price History</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
