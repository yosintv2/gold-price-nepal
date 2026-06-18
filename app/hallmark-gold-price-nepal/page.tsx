import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Hallmark Gold Price Nepal Today – Per Tola & 10 Gram | GoldNepal',
  description:
    'Hallmark gold price in Nepal today per tola and per 10 gram. Hallmark gold is Fine Gold 9999 (24K) — the purest gold available in Nepal. Updated daily.',
  alternates: { canonical: '/hallmark-gold-price-nepal/' },
};

const FAQS = [
  {
    q: 'What is hallmark gold in Nepal?',
    a: 'Hallmark gold in Nepal is gold that has been certified by the Nepal Bureau of Standards and Metrology (NBSM) for purity. It is equivalent to Fine Gold 9999 — meaning 99.9% pure gold, the same as 24-karat gold.',
  },
  {
    q: 'What is today\'s hallmark gold price per tola in Nepal?',
    a: 'Today\'s hallmark gold price per tola in Nepal is displayed in the price table above. This is the official rate set daily by the Nepal Gold & Silver Dealers\' Association.',
  },
  {
    q: 'Is hallmark gold the same as 24K gold?',
    a: 'Yes. In Nepal, hallmark gold, fine gold 9999, and 24K gold all refer to the same product — gold with 99.9% or higher purity. All three carry the same price.',
  },
  {
    q: 'Why buy hallmark gold in Nepal?',
    a: 'Hallmark gold provides a certified purity guarantee, protecting buyers from adulteration. When buying gold jewellery or bars in Nepal, always look for the NBSM hallmark stamp to ensure you are getting certified quality.',
  },
];

export default async function HallmarkGoldPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/gold-price-nepal/">Gold Price Nepal</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Hallmark Gold</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Hallmark Gold Price Nepal – {todayDisplay()}</h1>
        <p className="page-sub">Fine Gold 9999 · 24K — certified purity, per tola &amp; per 10 gram</p>
      </div>

      {latest ? (
        <>
          <div className="price-hero">
            <div className="price-hero-icon" aria-hidden="true">✨</div>
            <div className="price-hero-info">
              <div className="price-hero-label">Hallmark Gold Price Nepal (Fine Gold 9999 / 24K)</div>
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
        <h2><span className="y-bar" />About Hallmark Gold Price in Nepal</h2>
        <p>
          <strong>Hallmark gold</strong> in Nepal refers to gold certified by the Nepal Bureau of
          Standards and Metrology. It is identical to Fine Gold 9999 — 99.9% pure, 24-karat gold.
          Hallmark gold commands the highest price per tola of any gold type sold in Nepal.
        </p>
        <p>
          The hallmark gold price in Nepal is set every business day by the Nepal Gold &amp; Silver
          Dealers&apos; Association (NGSDA) and closely follows international gold spot prices
          converted to Nepalese Rupees.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/fine-gold-9999-price-nepal/" className="tag-pill">Fine Gold 9999</Link>
          <Link href="/24k-gold-price-nepal/" className="tag-pill">24K Gold Price</Link>
          <Link href="/tajabi-gold-price-nepal/" className="tag-pill">Tajabi Gold</Link>
          <Link href="/gold-price-nepal-per-tola/" className="tag-pill">Per Tola Rate</Link>
          <Link href="/history/" className="tag-pill">Price History</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
