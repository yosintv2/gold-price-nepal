import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate, fetchAllGoldDays } from '@/lib/api';
import { apiDateToDisplay, apiDateToUrlParams, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Gold Price in Nepal Today – Live Gold & Silver Rates | GoldNepal',
  description:
    'Gold price in Nepal today: hallmark gold, fine gold 9999, 24K, tajabi and silver per tola and per 10 gram. Daily updated rates from Nepal Gold & Silver Dealers\' Association.',
  alternates: { canonical: '/' },
};

const HOME_FAQS = [
  {
    q: 'What is the gold price today in Nepal?',
    a: 'The gold price in Nepal is updated daily by the Nepal Gold & Silver Dealers\' Association (NGSDA). Today\'s hallmark gold (fine gold 9999 / 24K) rate and tajabi gold rate are displayed in the table above, in both per tola and per 10 gram units.',
  },
  {
    q: 'What is Hallmark Gold in Nepal?',
    a: 'Hallmark gold in Nepal refers to gold that has been certified for purity by the Nepal Bureau of Standards and Metrology. Hallmark gold is equivalent to Fine Gold 9999 (99.9% pure, also known as 24K gold) — the highest purity available.',
  },
  {
    q: 'What is Tajabi Gold?',
    a: 'Tajabi gold is a slightly lower purity gold commonly used in Nepali jewellery making. It is less pure than hallmark/fine gold 9999, which is why its price per tola is lower. Tajabi gold is widely used for traditional jewellery across Nepal.',
  },
  {
    q: 'How much is one tola of gold in Nepal?',
    a: 'One tola equals 11.66 grams. The current price of one tola of hallmark gold in Nepal is shown in the price table above, updated daily. Tajabi gold price per tola is also listed.',
  },
  {
    q: 'What is the difference between hallmark gold and tajabi gold?',
    a: 'Hallmark gold (Fine Gold 9999) is 99.9% pure 24-karat gold — the highest standard. Tajabi gold has a slightly lower gold content, making it more suitable for detailed jewellery work (it is more malleable) but priced lower per tola.',
  },
  {
    q: 'What is the silver price in Nepal today?',
    a: 'The current silver price in Nepal per tola and per 10 gram is shown in the price table above. Silver prices in Nepal are also set daily by the Nepal Gold & Silver Dealers\' Association.',
  },
  {
    q: 'How often are Nepal gold prices updated?',
    a: 'Gold and silver prices in Nepal are set every business day by the Nepal Gold & Silver Dealers\' Association (NGSDA). GoldNepal updates its rates daily to reflect the latest published figures.',
  },
  {
    q: 'What is Fine Gold 9999?',
    a: 'Fine gold 9999 means the gold is 99.99% pure — essentially the purest form of gold available for trade. In Nepal, fine gold 9999 and hallmark gold refer to the same product and carry the same price.',
  },
];

export default async function HomePage() {
  const [latest, allDays] = await Promise.all([
    fetchLatestRate(),
    fetchAllGoldDays(),
  ]);

  const recentDays = allDays.slice(0, 8);

  return (
    <>
      <div className="page-head">
        <h1 className="page-title">Gold Price in Nepal Today – {todayDisplay()}</h1>
        <p className="page-sub">
          Daily gold &amp; silver rates from Nepal Gold &amp; Silver Dealers&apos; Association
        </p>
      </div>

      {latest ? (
        <>
          {/* Hero price bar */}
          <div className="price-hero" role="region" aria-label="Today's gold price Nepal">
            <div className="price-hero-icon" aria-hidden="true">🥇</div>
            <div className="price-hero-info">
              <div className="price-hero-label">Hallmark Gold (Fine Gold 9999 · 24K)</div>
              <div className="price-hero-price">{formatNPR(latest.hallmark.tola)}</div>
              <div className="price-hero-unit">per tola &nbsp;·&nbsp; {formatNPR(latest.hallmark.gram10)} per 10g</div>
              <div className="price-hero-date">As of {apiDateToDisplay(latest.date)}</div>
            </div>
            <div className="price-hero-grid">
              <div className="price-hero-col">
                <div className="price-hero-col-label">Tajabi Gold</div>
                <div className="price-hero-col-val">{formatNPR(latest.tajabi.tola)}</div>
                <div className="price-hero-col-unit">per tola</div>
              </div>
              <div className="price-hero-col">
                <div className="price-hero-col-label">Silver</div>
                <div className="price-hero-col-val">{formatNPR(latest.silver.tola)}</div>
                <div className="price-hero-col-unit">per tola</div>
              </div>
            </div>
          </div>

          {/* Full price table */}
          <h2 className="section-heading">
            <div className="accent-bar" />
            Today&apos;s Gold &amp; Silver Rates — Nepal
          </h2>
          <PriceTable day={latest} showDate />

          {/* Recent history */}
          {recentDays.length > 1 && (
            <>
              <h2 className="section-heading">
                <div className="accent-bar" />
                Recent Gold Price History
              </h2>
              <div className="history-table-wrap">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Hallmark / Tola</th>
                      <th>Tajabi / Tola</th>
                      <th>Silver / Tola</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDays.map((d, i) => {
                      const p = apiDateToUrlParams(d.date);
                      return (
                        <tr key={d.date} className={i === 0 ? 'history-today' : undefined}>
                          <td>
                            {p ? (
                              <Link href={`/${p.year}/${p.month}/${p.day}/`} className="history-date-link">
                                {apiDateToDisplay(d.date)}
                              </Link>
                            ) : apiDateToDisplay(d.date)}
                          </td>
                          <td className="history-price">{formatNPR(d.hallmark.tola)}</td>
                          <td className="history-price">{formatNPR(d.tajabi.tola)}</td>
                          <td className="history-price">{formatNPR(d.silver.tola)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '-8px 0 16px' }}>
                <Link href="/history/" style={{ color: 'var(--gold-dark)', textDecoration: 'underline' }}>
                  View full gold price history →
                </Link>
              </p>
            </>
          )}
        </>
      ) : (
        <div className="state-center">
          <div className="state-icon">📊</div>
          <div className="state-title">Rates unavailable</div>
          <div className="state-sub">Could not load today&apos;s gold price. Please try again later.</div>
        </div>
      )}

      {/* Nepali section */}
      <div className="nepali-section">
        <h2>आजको सुन चाँदीको भाउ — नेपाल</h2>
        <p>
          नेपालमा सुनको भाउ नेपाल सुन तथा चाँदी व्यवसायी महासंघले प्रत्येक कार्य दिनमा निर्धारण गर्छ।
          हलमार्क सुन (फाइन गोल्ड ९९९९ / २४ क्यारेट) र तजबी सुनको भाउ तोला र १० ग्राम दुवैमा उपलब्ध छ।
        </p>
        {latest && (
          <div className="nepali-price-row">
            <div className="nepali-price-card">
              <div className="npc-label">हलमार्क सुन (प्रति तोला)</div>
              <div className="npc-val">{formatNPR(latest.hallmark.tola)}</div>
            </div>
            <div className="nepali-price-card">
              <div className="npc-label">तजबी सुन (प्रति तोला)</div>
              <div className="npc-val">{formatNPR(latest.tajabi.tola)}</div>
            </div>
            <div className="nepali-price-card">
              <div className="npc-label">चाँदी (प्रति तोला)</div>
              <div className="npc-val">{formatNPR(latest.silver.tola)}</div>
            </div>
          </div>
        )}
      </div>

      {/* Internal links */}
      <section className="seo-section" aria-label="More gold price pages">
        <h2><span className="y-bar" />Browse Gold Prices by Type</h2>
        <div className="tag-cloud">
          <Link href="/gold-price-nepal/" className="tag-pill">Gold Price Nepal</Link>
          <Link href="/gold-price-nepal-today/" className="tag-pill">Gold Price Nepal Today</Link>
          <Link href="/hallmark-gold-price-nepal/" className="tag-pill">Hallmark Gold Price</Link>
          <Link href="/fine-gold-9999-price-nepal/" className="tag-pill">Fine Gold 9999 Price</Link>
          <Link href="/24k-gold-price-nepal/" className="tag-pill">24K Gold Price</Link>
          <Link href="/tajabi-gold-price-nepal/" className="tag-pill">Tajabi Gold Price</Link>
          <Link href="/silver-price-nepal/" className="tag-pill">Silver Price Nepal</Link>
          <Link href="/gold-price-nepal-per-tola/" className="tag-pill">Gold Price Per Tola</Link>
          <Link href="/gold-price-nepal-per-10gm/" className="tag-pill">Gold Price Per 10g</Link>
          <Link href="/history/" className="tag-pill">📅 Historical Rates</Link>
        </div>
      </section>

      <Faq items={HOME_FAQS} />
    </>
  );
}
