import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Tajabi Gold Price Nepal Today – Per Tola & 10 Gram | GoldNepal',
  description:
    'Tajabi gold price in Nepal today per tola and per 10 gram. Tajabi gold is the most popular jewellery gold in Nepal. Updated daily from NGSDA.',
  alternates: { canonical: '/tajabi-gold-price-nepal/' },
};

const FAQS = [
  {
    q: 'What is tajabi gold?',
    a: 'Tajabi gold is a traditional gold alloy widely used for making jewellery in Nepal. It has a slightly lower gold content than hallmark (Fine Gold 9999), making it more malleable for fine jewellery work. Its price per tola is lower than hallmark gold.',
  },
  {
    q: 'What is today\'s tajabi gold price in Nepal?',
    a: 'Today\'s tajabi gold price in Nepal per tola and per 10 gram is shown in the table above. The Nepal Gold & Silver Dealers\' Association publishes the official tajabi rate every business day.',
  },
  {
    q: 'What is the difference between tajabi and hallmark gold?',
    a: 'Hallmark gold (Fine Gold 9999 / 24K) is 99.9% pure gold, while tajabi gold has a slightly lower gold purity. Tajabi is preferred for jewellery in Nepal because it is more durable for crafting intricate designs, and it costs less per tola than hallmark gold.',
  },
  {
    q: 'Is tajabi gold a good investment in Nepal?',
    a: 'Tajabi gold is more commonly used for jewellery rather than pure investment. For investment purposes, hallmark gold (Fine Gold 9999) is preferred as it has higher purity and better resale value. However, tajabi jewellery holds its value well in the Nepali market.',
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
        <span>Tajabi Gold</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Tajabi Gold Price Nepal – {todayDisplay()}</h1>
        <p className="page-sub">Nepal&apos;s most popular jewellery gold — per tola &amp; per 10 gram</p>
      </div>

      {latest ? (
        <>
          <div className="price-hero">
            <div className="price-hero-icon" aria-hidden="true">💛</div>
            <div className="price-hero-info">
              <div className="price-hero-label">Tajabi Gold Price Nepal (तजबी सुन)</div>
              <div className="price-hero-price">{formatNPR(latest.tajabi.tola)}</div>
              <div className="price-hero-unit">per tola &nbsp;·&nbsp; {formatNPR(latest.tajabi.gram10)} per 10g</div>
              <div className="price-hero-date">As of {apiDateToDisplay(latest.date)}</div>
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

      <section className="seo-section">
        <h2><span className="y-bar" />About Tajabi Gold in Nepal</h2>
        <p>
          <strong>Tajabi gold</strong> (तजबी सुन) is the most widely used gold for jewellery making
          in Nepal. While slightly less pure than hallmark gold (Fine Gold 9999), it is more suitable
          for creating detailed, intricate jewellery designs and is favoured by goldsmiths across Nepal.
        </p>
        <p>
          The tajabi gold price in Nepal is set daily by the Nepal Gold &amp; Silver Dealers&apos;
          Association alongside hallmark gold rates.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/hallmark-gold-price-nepal/" className="tag-pill">Hallmark Gold</Link>
          <Link href="/fine-gold-9999-price-nepal/" className="tag-pill">Fine Gold 9999</Link>
          <Link href="/24k-gold-price-nepal/" className="tag-pill">24K Gold</Link>
          <Link href="/silver-price-nepal/" className="tag-pill">Silver Price</Link>
          <Link href="/history/" className="tag-pill">Historical Rates</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
