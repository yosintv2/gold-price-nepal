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
  keywords: 'tejabi gold price nepal, tejabi suna ko bhaau, tejabi gold rate nepal, tejabi suna nepal, tejabi gold per tola nepal, tejabi suna bhaau aaja, tejabi sunn ko bhaau, tejabi gold today, tejabi sunn nepal, तेजाबी सुन को भाउ, tejabi gold jewellery nepal',
  alternates: { canonical: '/tejabi-gold-price-nepal/' },
};

const FAQS = [
  {
    q: 'What is tejabi gold?',
    a: 'Tejabi gold (तेजाबी सुन) is a traditional gold alloy widely used for making jewellery in Nepal. It has a slightly lower gold content than hallmark (Fine Gold 9999 / 24K), making it more malleable for fine jewellery work. Its price per tola is lower than hallmark gold.',
  },
  {
    q: "What is today's tejabi gold price in Nepal?",
    a: "Today's tejabi gold price in Nepal per tola and per 10 gram is shown in the table above. The Nepal Gold & Silver Dealers' Association publishes the official tejabi rate every business day.",
  },
  {
    q: 'What is the difference between tejabi and hallmark gold?',
    a: 'Hallmark gold (Fine Gold 9999 / 24K) is 99.9% pure gold, while tejabi gold has a slightly lower gold purity. Tejabi is preferred for jewellery in Nepal because it is more durable for crafting intricate designs, and it costs less per tola than hallmark gold.',
  },
  {
    q: 'Is tejabi gold a good investment in Nepal?',
    a: 'Tejabi gold is more commonly used for jewellery rather than pure investment. For investment purposes, hallmark gold (Fine Gold 9999) is preferred as it has higher purity and better resale value. However, tejabi jewellery holds its value well in the Nepali market.',
  },
  {
    q: 'What is tejabi sunn ko bhaau today?',
    a: 'Tejabi sunn ko bhaau (तेजाबी सुन को भाउ) aaja is shown in the price table at the top of this page, updated daily from the Nepal Gold & Silver Dealers\' Association.',
  },
];

export default async function TejabiGoldPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/gold-price-nepal/">Gold Price Nepal</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Tejabi Gold</span>
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

      <section className="seo-section">
        <h2><span className="y-bar" />About Tejabi Gold in Nepal</h2>
        <p>
          <strong>Tejabi gold</strong> (तेजाबी सुन) is the most widely used gold for jewellery making
          in Nepal. While slightly less pure than hallmark gold (Fine Gold 9999 / 24K), it is more
          suitable for creating detailed, intricate jewellery designs and is favoured by goldsmiths
          across Nepal.
        </p>
        <p>
          The tejabi gold price in Nepal is set daily by the Nepal Gold &amp; Silver Dealers&apos;
          Association alongside hallmark gold rates. Tejabi sunn ko bhaau is announced every
          business morning and reflects both global gold market movements and local demand.
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
