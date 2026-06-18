import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Fine Gold 9999 Price Nepal Today – 24K Pure Gold Rate | GoldNepal',
  description:
    'Fine gold 9999 price in Nepal today per tola and per 10 gram. Fine gold 9999 is 99.9% pure (24K) — same as hallmark gold. Daily updated rates from NGSDA.',
  keywords: 'fine gold 9999 price nepal, 9999 gold price nepal, pure gold price nepal, fine gold nepal, 9999 gold rate nepal, 24k fine gold nepal, fine gold per tola nepal, 9999 suna ko bhaau nepal, 99.9 pure gold nepal',
  alternates: { canonical: '/fine-gold-9999-price-nepal/' },
};

const FAQS = [
  {
    q: 'What is fine gold 9999 in Nepal?',
    a: 'Fine gold 9999 means the gold is 99.99% pure — the highest purity grade available. In Nepal, fine gold 9999, hallmark gold, and 24K gold all refer to the same product and carry the same official price.',
  },
  {
    q: 'What is the fine gold 9999 price per tola in Nepal today?',
    a: 'Today\'s fine gold 9999 price per tola in Nepal is shown in the price table above, published daily by the Nepal Gold & Silver Dealers\' Association.',
  },
  {
    q: 'Is fine gold 9999 the same as 24K gold?',
    a: 'Yes. Fine gold 9999 denotes 99.99% purity, which is the same as 24-karat (24K) gold. In Nepal\'s market, fine gold 9999, hallmark gold, and 24K are used interchangeably and have the same price.',
  },
];

export default async function FineGold9999Page() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/gold-price-nepal/">Gold Price Nepal</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Fine Gold 9999</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Fine Gold 9999 Price Nepal – {todayDisplay()}</h1>
        <p className="page-sub">99.99% pure gold · Same as Hallmark Gold &amp; 24K</p>
      </div>

      {latest ? (
        <>
          <div className="price-hero">
            <div className="price-hero-icon" aria-hidden="true">🔬</div>
            <div className="price-hero-info">
              <div className="price-hero-label">Fine Gold 9999 Price Nepal (Hallmark / 24K)</div>
              <div className="price-hero-price">{formatNPR(latest.hallmark.tola)}</div>
              <div className="price-hero-unit">per tola &nbsp;·&nbsp; {formatNPR(latest.hallmark.gram10)} per 10g</div>
              <div className="price-hero-date">As of {apiDateToDisplay(latest.date)}</div>
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
        <h2><span className="y-bar" />About Fine Gold 9999 in Nepal</h2>
        <p>
          <strong>Fine Gold 9999</strong> is the purest grade of gold — 99.99% purity. In Nepal,
          fine gold 9999 is synonymous with <Link href="/hallmark-gold-price-nepal/" style={{ color: 'var(--gold-dark)' }}>
          hallmark gold</Link> and <Link href="/24k-gold-price-nepal/" style={{ color: 'var(--gold-dark)' }}>
          24K gold</Link>. The Nepal Gold &amp; Silver Dealers&apos; Association quotes a single
          price for all three names.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/hallmark-gold-price-nepal/" className="tag-pill">Hallmark Gold</Link>
          <Link href="/24k-gold-price-nepal/" className="tag-pill">24K Gold</Link>
          <Link href="/tajabi-gold-price-nepal/" className="tag-pill">Tajabi Gold</Link>
          <Link href="/silver-price-nepal/" className="tag-pill">Silver Price</Link>
          <Link href="/history/" className="tag-pill">Price History</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
