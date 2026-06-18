import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Tejabi Gold Price Nepal Today – Tejabi Sunn Ko Bhaau | GoldNepal',
  description:
    'Tejabi gold price in Nepal today per tola and per 10 gram. Tejabi sunn ko bhaau Nepal — the most popular jewellery gold. Updated daily from NGSDA.',
  keywords: 'tejabi gold price nepal, tejabi suna ko bhaau, tejabi gold rate nepal, tejabi suna nepal, tejabi gold per tola nepal, tejabi suna bhaau aaja, tejabi gold today',
  alternates: { canonical: '/tejabi-gold-price-nepal/' },
};

const FAQS = [
  {
    q: 'What is tejabi gold?',
    a: 'Tejabi gold (तेजाबी सुन) is a traditional gold alloy widely used for making jewellery in Nepal. It has a slightly lower gold content than hallmark (Fine Gold 9999 / 24K), making it more malleable for fine jewellery work.',
  },
  {
    q: "What is today's tejabi gold price in Nepal?",
    a: "Today's tejabi gold price in Nepal per tola and per 10 gram is shown in the table above, published daily by Nepal Gold & Silver Dealers' Association.",
  },
  {
    q: 'What is the difference between tejabi and hallmark gold?',
    a: 'Hallmark gold (Fine Gold 9999 / 24K) is 99.9% pure gold, while tejabi gold has a slightly lower gold purity. Tejabi is preferred for jewellery because it is more durable for intricate designs and costs less per tola.',
  },
];

export default async function TajabiGoldPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/gold-price-nepal/">Gold Price Nepal</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/tejabi-gold-price-nepal/">Tejabi Gold</Link>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Tejabi Gold Price Nepal – {todayDisplay()}</h1>
        <p className="page-sub">Tejabi Sunn Ko Bhaau — तेजाबी सुन — per tola &amp; per 10 gram</p>
      </div>

      {latest ? (
        <>
          <div className="price-hero">
            <div className="price-hero-main">
              <div className="price-hero-icon" aria-hidden="true">💛</div>
              <div className="price-hero-info">
                <div className="price-hero-label">Tejabi Gold Price Nepal (तेजाबी सुन)</div>
                <div className="price-hero-row">
                  <span className="price-hero-price">{formatNPR(latest.tajabi.tola)}</span>
                  <span className="price-hero-per">/ tola</span>
                </div>
                <div className="price-hero-row price-hero-row-10g">
                  <span className="price-hero-price-10g">{formatNPR(latest.tajabi.gram10)}</span>
                  <span className="price-hero-per">/ 10g</span>
                </div>
                <div className="price-hero-date">As of {apiDateToDisplay(latest.date)}</div>
              </div>
            </div>
          </div>
          <PriceTable day={latest} highlight="tajabi" showDate />
        </>
      ) : (
        <div className="state-center">
          <div className="state-icon">📊</div>
          <div className="state-title">Rates unavailable</div>
          <div className="state-sub">Please try again later.</div>
        </div>
      )}

      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '12px 0' }}>
        This page has moved. Visit <Link href="/tejabi-gold-price-nepal/" style={{ color: 'var(--gold-dark)' }}>Tejabi Gold Price Nepal</Link> for the latest rates.
      </p>

      <Faq items={FAQS} />
    </>
  );
}
