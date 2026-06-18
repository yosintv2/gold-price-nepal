import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Silver Price Nepal Today – Chandi Bhaau Per Tola & 10 Gram | GoldNepal',
  description:
    'Silver price in Nepal today per tola and per 10 gram. Chandi ko bhaau Nepal — updated daily from Nepal Gold & Silver Dealers\' Association.',
  keywords: 'silver price nepal, chandi ko bhaau nepal, chandi price nepal, silver rate nepal today, silver price per tola nepal, chandi bhaau nepal, aajako chandi ko bhaau, silver rate nepal, chandi bhaau today nepal',
  alternates: { canonical: '/silver-price-nepal/' },
};

const FAQS = [
  {
    q: 'What is the silver price today in Nepal?',
    a: 'Today\'s silver price in Nepal per tola and per 10 gram is displayed in the table above. The Nepal Gold & Silver Dealers\' Association (NGSDA) publishes official silver rates every business day.',
  },
  {
    q: 'How is silver price set in Nepal?',
    a: 'The silver price in Nepal is determined daily by the Nepal Gold & Silver Dealers\' Association. It is influenced by global silver spot prices, the USD-NPR exchange rate, and demand in the Nepali market.',
  },
  {
    q: 'What unit is silver sold in Nepal?',
    a: 'Silver in Nepal is sold per tola (11.66 grams) and per 10 grams, the same units used for gold. Both silver price per tola and per 10 gram are listed on this page daily.',
  },
  {
    q: 'What is chandi in Nepal?',
    a: 'Chandi (चाँदी) is the Nepali word for silver. Silver is widely used in Nepal for traditional jewellery, religious items, and cultural artefacts.',
  },
];

export default async function SilverPricePage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Silver Price Nepal</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Silver Price Nepal – {todayDisplay()}</h1>
        <p className="page-sub">Chandi ko bhaau — per tola &amp; per 10 gram, updated daily</p>
      </div>

      {latest ? (
        <>
          <div className="price-hero">
            <div className="price-hero-icon" aria-hidden="true">🪙</div>
            <div className="price-hero-info">
              <div className="price-hero-label">Silver Price Nepal Today (चाँदी — Chandi)</div>
              <div className="price-hero-price">{formatNPR(latest.silver.tola)}</div>
              <div className="price-hero-unit">per tola &nbsp;·&nbsp; {formatNPR(latest.silver.gram10)} per 10g</div>
              <div className="price-hero-date">As of {apiDateToDisplay(latest.date)}</div>
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
        <h2><span className="y-bar" />About Silver Price in Nepal</h2>
        <p>
          <strong>Silver (chandi / चाँदी)</strong> is an important precious metal in Nepal, used
          extensively in traditional jewellery, religious items, and crafts. The silver price in
          Nepal is published daily by the Nepal Gold &amp; Silver Dealers&apos; Association
          alongside gold rates.
        </p>
        <p>
          Nepal silver prices track global silver market trends but also reflect local demand,
          particularly during festival seasons when silver jewellery consumption rises significantly.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/gold-price-nepal/" className="tag-pill">Gold Price Nepal</Link>
          <Link href="/hallmark-gold-price-nepal/" className="tag-pill">Hallmark Gold</Link>
          <Link href="/tajabi-gold-price-nepal/" className="tag-pill">Tajabi Gold</Link>
          <Link href="/history/" className="tag-pill">Historical Rates</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
