import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Gold Price in Nepal – Today\'s Rate Per Tola & 10 Gram | GoldNepal',
  description:
    'Gold price in Nepal: hallmark gold, fine gold 9999, tajabi gold and silver price per tola and per 10 gram. Updated daily from Nepal Gold & Silver Dealers\' Association.',
  alternates: { canonical: '/gold-price-nepal/' },
};

const FAQS = [
  {
    q: 'What is the gold price in Nepal?',
    a: 'Gold price in Nepal is published daily by the Nepal Gold & Silver Dealers\' Association. It covers hallmark gold (Fine Gold 9999 / 24K) and tajabi gold rates in NPR per tola and per 10 gram.',
  },
  {
    q: 'How is gold price determined in Nepal?',
    a: 'Nepal gold prices are set by the Nepal Gold & Silver Dealers\' Association (NGSDA) every business day, influenced by international gold prices, the USD/NPR exchange rate, and local market conditions.',
  },
  {
    q: 'What unit is gold sold in Nepal?',
    a: 'Gold in Nepal is traditionally sold by tola (1 tola = 11.66 grams) and by 10 gram. Both units are listed on this page daily.',
  },
];

export default async function GoldPriceNepalPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Gold Price Nepal</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Gold Price in Nepal – {todayDisplay()}</h1>
        <p className="page-sub">Hallmark gold, tajabi gold and silver — per tola &amp; per 10 gram</p>
      </div>

      {latest ? (
        <>
          <div className="price-hero">
            <div className="price-hero-icon" aria-hidden="true">🥇</div>
            <div className="price-hero-info">
              <div className="price-hero-label">Gold Price in Nepal Today</div>
              <div className="price-hero-price">{formatNPR(latest.hallmark.tola)}</div>
              <div className="price-hero-unit">Hallmark Gold per tola &nbsp;·&nbsp; {formatNPR(latest.hallmark.gram10)} per 10g</div>
              <div className="price-hero-date">As of {apiDateToDisplay(latest.date)}</div>
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
        <h2><span className="y-bar" />About Gold Price in Nepal</h2>
        <p>
          The <strong>gold price in Nepal</strong> is officially announced every business day by the
          Nepal Gold &amp; Silver Dealers&apos; Association. Rates are quoted in Nepalese Rupees (NPR)
          per tola and per 10 grams for both hallmark gold and tajabi gold.
        </p>
        <p>
          Nepal&apos;s gold market is one of the most active in South Asia. The price closely tracks
          international spot prices but is also influenced by the Indian gold market and the USD-NPR
          exchange rate.
        </p>
        <h3>Related Gold Price Pages</h3>
        <div className="tag-cloud">
          <Link href="/hallmark-gold-price-nepal/" className="tag-pill">Hallmark Gold</Link>
          <Link href="/fine-gold-9999-price-nepal/" className="tag-pill">Fine Gold 9999</Link>
          <Link href="/24k-gold-price-nepal/" className="tag-pill">24K Gold</Link>
          <Link href="/tajabi-gold-price-nepal/" className="tag-pill">Tajabi Gold</Link>
          <Link href="/silver-price-nepal/" className="tag-pill">Silver</Link>
          <Link href="/history/" className="tag-pill">Historical Rates</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
