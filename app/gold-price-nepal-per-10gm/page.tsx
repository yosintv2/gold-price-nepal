import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Gold Price in Nepal Per 10 Gram Today – 10 Gram Suna Ko Bhaau | GoldNepal',
  description:
    'Gold price in Nepal per 10 gram today. Hallmark gold and tejabi gold rate per 10 grams in Nepalese Rupees. Updated daily from NGSDA.',
  keywords: 'gold price per 10 gram nepal, 10 gram gold price nepal, das gram suna ko bhaau, gold per 10g nepal, 10g gold rate nepal, suna das gram nepal, 10 gram suna bhaau aaja, nepal gold per gram today, gold rate 10 gram nepal',
  alternates: { canonical: '/gold-price-nepal-per-10gm/' },
};

const FAQS = [
  {
    q: 'What is the gold price per 10 grams in Nepal?',
    a: 'Today\'s gold price per 10 grams in Nepal is shown in the table above for both hallmark gold (Fine Gold 9999 / 24K) and tejabi gold. This rate is published daily by the Nepal Gold & Silver Dealers\' Association.',
  },
  {
    q: 'Is 10 gram or tola the standard unit for gold in Nepal?',
    a: 'Both units are officially used in Nepal. Tola (11.66g) is the traditional measurement and more commonly used in local trading, while 10 grams is the internationally recognised unit. Nepal publishes rates in both units every day.',
  },
];

export default async function GoldPer10GmPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/gold-price-nepal/">Gold Price Nepal</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Per 10 Gram</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Gold Price in Nepal Per 10 Gram – {todayDisplay()}</h1>
        <p className="page-sub">Hallmark, tajabi &amp; silver rates per 10 grams in NPR</p>
      </div>

      {latest ? (
        <>
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-val">{formatNPR(latest.hallmark.gram10)}</div>
              <div className="stat-label">Hallmark Gold / 10g</div>
            </div>
            <div className="stat-card">
              <div className="stat-val">{formatNPR(latest.tajabi.gram10)}</div>
              <div className="stat-label">Tejabi Gold / 10g</div>
            </div>
            <div className="stat-card">
              <div className="stat-val">{formatNPR(latest.silver.gram10)}</div>
              <div className="stat-label">Silver / 10g</div>
            </div>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 14px' }}>
            As of {apiDateToDisplay(latest.date)}
          </p>
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
        <h2><span className="y-bar" />Gold Price Per 10 Gram Nepal</h2>
        <p>
          The <strong>gold price per 10 gram</strong> in Nepal is published daily alongside the
          per-tola rate by the Nepal Gold &amp; Silver Dealers&apos; Association. The international
          10-gram unit is increasingly popular alongside the traditional tola measurement.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/gold-price-nepal-per-tola/" className="tag-pill">Gold Price Per Tola</Link>
          <Link href="/hallmark-gold-price-nepal/" className="tag-pill">Hallmark Gold</Link>
          <Link href="/tejabi-gold-price-nepal/" className="tag-pill">Tejabi Gold</Link>
          <Link href="/silver-price-nepal/" className="tag-pill">Silver Price</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
