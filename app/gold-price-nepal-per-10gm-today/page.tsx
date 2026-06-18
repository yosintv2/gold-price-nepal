import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Gold Price Per 10 Gram Nepal Today – Das Gram Suna Ko Bhaau Aaja | GoldNepal',
  description:
    "Gold price per 10 gram in Nepal today. Aajako das gram suna ko bhaau — hallmark and tejabi gold rate per 10 grams in NPR. Updated daily from NGSDA.",
  keywords: 'gold price per 10 gram nepal today, das gram suna ko bhaau aaja, 10 gram gold price today nepal, gold per 10g today nepal, aajako 10 gram suna bhaau, 10 gram gold rate today nepal, das gram suna ko bhaau nepal, 10g gold price nepal today',
  alternates: { canonical: '/gold-price-nepal-per-10gm-today/' },
};

const FAQS = [
  {
    q: "What is today's gold price per 10 gram in Nepal?",
    a: "Today's gold price per 10 gram in Nepal for hallmark gold and tejabi gold is shown in the stats above. The rate is updated every business day by the Nepal Gold & Silver Dealers' Association.",
  },
  {
    q: 'What is das gram suna ko bhaau aaja?',
    a: 'Das gram suna ko bhaau aaja (दस ग्राम सुनको भाउ आज) means today\'s gold price per 10 grams in Nepali. The current 10-gram gold price in Nepal is displayed at the top of this page.',
  },
  {
    q: 'Is 10 gram or tola more commonly used for gold in Nepal?',
    a: 'Both units are officially published in Nepal. Tola (11.66g) is the traditional measurement preferred in local gold markets, while 10 grams is the internationally recognised standard. Nepal publishes rates in both units daily.',
  },
];

export default async function GoldPer10GmTodayPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/gold-price-nepal-per-10gm/">Gold Per 10g</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Today</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Gold Price Per 10 Gram Nepal Today – {todayDisplay()}</h1>
        <p className="page-sub">Das gram suna ko bhaau aaja — hallmark, tejabi &amp; silver</p>
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
        <h2><span className="y-bar" />Today&apos;s Gold Price Per 10 Gram Nepal</h2>
        <p>
          The <strong>gold price per 10 gram</strong> in Nepal today is published alongside the
          per-tola rate by the Nepal Gold &amp; Silver Dealers&apos; Association. The 10-gram unit
          is the international standard and increasingly popular for gold purchases in Nepal.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/gold-price-nepal-per-10gm/" className="tag-pill">Gold Per 10g</Link>
          <Link href="/gold-price-nepal-per-tola-today/" className="tag-pill">Gold Per Tola Today</Link>
          <Link href="/hallmark-gold-price-nepal-today/" className="tag-pill">Hallmark Gold Today</Link>
          <Link href="/history/" className="tag-pill">Price History</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
