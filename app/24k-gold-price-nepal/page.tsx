import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: '24K Gold Price Nepal Today – 24 Carat Gold Rate Per Tola | GoldNepal',
  description:
    '24K gold price in Nepal today per tola and per 10 gram. 24 carat gold is the same as hallmark gold and fine gold 9999 — 99.9% pure. Updated daily.',
  keywords: '24k gold price nepal, 24 carat gold price nepal, 24k gold rate nepal, 24 karat gold nepal, 24k suna ko bhaau nepal, pure gold 24k nepal, 24k gold per tola nepal, twenty four karat gold nepal, 24 carat suna bhaau',
  alternates: { canonical: '/24k-gold-price-nepal/' },
};

const FAQS = [
  {
    q: 'What is 24K gold?',
    a: '24-karat (24K) gold is the purest form of gold, with 99.9% gold content. In Nepal, 24K gold is the same as hallmark gold and fine gold 9999 — all terms refer to gold of the highest purity grade.',
  },
  {
    q: 'What is the 24K gold price per tola in Nepal?',
    a: 'Today\'s 24K gold price per tola in Nepal is shown in the rate table above. The Nepal Gold & Silver Dealers\' Association sets this rate daily in Nepalese Rupees.',
  },
  {
    q: 'Is 24K gold used for jewellery in Nepal?',
    a: '24K gold is very soft and is mainly used for investment (coins, bars) rather than everyday jewellery. Most Nepali jewellery is made from tejabi gold, which is slightly less pure but more durable for intricate designs.',
  },
];

export default async function Gold24KPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/gold-price-nepal/">Gold Price Nepal</Link>
        <span className="breadcrumb-sep">›</span>
        <span>24K Gold Price</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">24K Gold Price Nepal – {todayDisplay()}</h1>
        <p className="page-sub">24 carat · Fine Gold 9999 · Hallmark Gold — per tola &amp; per 10 gram</p>
      </div>

      {latest ? (
        <>
          <div className="price-hero">
            <div className="price-hero-main">
              <div className="price-hero-icon" aria-hidden="true">🏅</div>
              <div className="price-hero-info">
                <div className="price-hero-label">24K Gold Price Nepal (Hallmark / Fine Gold 9999)</div>
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
        <h2><span className="y-bar" />About 24K Gold Price in Nepal</h2>
        <p>
          <strong>24K gold</strong> (24 carat) is 99.9% pure gold — the same as hallmark gold and
          fine gold 9999 in Nepal. All three names refer to the same official gold grade and carry
          the same daily price from the Nepal Gold &amp; Silver Dealers&apos; Association.
        </p>
        <p>
          24K gold is primarily used for investment products such as gold bars and coins. For
          jewellery, most Nepali craftsmen prefer tejabi gold due to its added hardness.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/hallmark-gold-price-nepal/" className="tag-pill">Hallmark Gold</Link>
          <Link href="/fine-gold-9999-price-nepal/" className="tag-pill">Fine Gold 9999</Link>
          <Link href="/tejabi-gold-price-nepal/" className="tag-pill">Tejabi Gold</Link>
          <Link href="/gold-price-nepal-per-tola/" className="tag-pill">Per Tola</Link>
          <Link href="/gold-price-nepal-per-10gm/" className="tag-pill">Per 10g</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
