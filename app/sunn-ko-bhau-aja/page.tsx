import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Sunn Ko Bhau Aja – सुनको भाउ आज Nepal | GoldNepal',
  description:
    'Sunn ko bhau aja Nepal — आजको सुनको भाउ। Hallmark suna, tejabi suna ra chandi ko bhaau per tola ra 10 gram ma. Pratyek byabasayik din ma updaet garindai.',
  keywords: 'sunn ko bhau aja, suna ko bhaau aja, aajako suna ko bhaau, sunn ko bhau nepal, suna ko bhav aaja nepal, aajako sunn ko bhaau nepal, nepal sunn ko bhaau, sunn bhaau nepal today, gold price nepal today nepali, सुनको भाउ आज',
  alternates: { canonical: '/sunn-ko-bhau-aja/' },
};

const FAQS = [
  {
    q: 'Sunn ko bhau aja kati ho? (सुनको भाउ आज कति हो?)',
    a: 'Aajako sunn ko bhau Nepal ma maathiko table ma dekhaueko chha. Hallmark suna (Fine Gold 9999 / 24K) ra tejabi suna ko bhaau pratyek tola ra 10 gram ma prakaashit garindai chha.',
  },
  {
    q: 'Nepal ma suna ko bhaau kasari nirdharan garindai chha?',
    a: 'Nepal ma suna ko bhaau Nepal Gold & Silver Dealers\' Association le pratyek byabasayik din nirdharan gardaa chha. Yo bhaau international gold spot price ra USD-NPR exchange rate ma aadharit chha.',
  },
  {
    q: 'Hallmark suna ra tejabi suna ma ke farak chha?',
    a: 'Hallmark suna (Fine Gold 9999) 99.9% shuddha suna ho — 24 carat gold. Tejabi suna (तेजाबी सुन) bhanda halkaa kam shuddha chha tara gahana banaunaako laagi beshee upayukt chha. Tejabi suna ko bhaau hallmark bhanda halkaa sasto huncha.',
  },
  {
    q: 'Ek tola suna ko bhaau kati ho? (एक तोला सुनको भाउ कति हो?)',
    a: 'Ek tola suna ko aajako bhaau maathiko table ma chha. Ek tola = 11.664 gram huncha. Nepal ma suna ko khareed-bechmaulo laagi tola nai sababhanda thulo maapdanda ho.',
  },
];

export default async function SunnKoBhauAjaPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Sunn Ko Bhau Aja</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Sunn Ko Bhau Aja – {todayDisplay()}</h1>
        <p className="page-sub">सुनको भाउ आज — Nepal Gold Price Today in Nepali</p>
      </div>

      {latest ? (
        <>
          <div className="price-hero">
            <div className="price-hero-main">
              <div className="price-hero-icon" aria-hidden="true">🥇</div>
              <div className="price-hero-info">
                <div className="price-hero-label">Aajako Sunn Ko Bhaau Nepal (सुनको भाउ आज)</div>
                <div className="price-hero-row">
                  <span className="price-hero-price">{formatNPR(latest.hallmark.tola)}</span>
                  <span className="price-hero-per">/ tola</span>
                </div>
                <div className="price-hero-row price-hero-row-10g">
                  <span className="price-hero-price-10g">{formatNPR(latest.hallmark.gram10)}</span>
                  <span className="price-hero-per">/ 10g</span>
                </div>
                <div className="price-hero-date">As of {apiDateToDisplay(latest.date)} — Hallmark Gold (Fine Gold 9999 / 24K)</div>
              </div>
            </div>
          </div>

          <div className="price-hero-grid" style={{ marginTop: 10, marginBottom: 16 }}>
            <div className="price-hero-col">
              <div className="price-hero-col-label">Tejabi Sunn</div>
              <div className="price-hero-col-row">
                <span className="price-hero-price-10g">{formatNPR(latest.tajabi.tola)}</span>
                <span className="price-hero-col-per">/ tola</span>
              </div>
            </div>
            <div className="price-hero-col">
              <div className="price-hero-col-label">Chandi (Silver)</div>
              <div className="price-hero-col-row">
                <span className="price-hero-price-10g">{formatNPR(latest.silver.tola)}</span>
                <span className="price-hero-col-per">/ tola</span>
              </div>
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
        <h2><span className="y-bar" />Nepal Ma Sunn Ko Bhaau (नेपालमा सुनको भाउ)</h2>
        <p>
          <strong>Sunn ko bhau aja</strong> (सुनको भाउ आज) — Nepal ma aajako suna ko bhaau
          pratyeka byabasayik din Nepal Gold &amp; Silver Dealers&apos; Association le ghoshit
          gardaa chha. Hallmark suna (Fine Gold 9999 / 24K), tejabi suna (तेजाबी सुन), ra
          chandi (चाँदी) ko bhaau yahan pratyek tola ra 10 gram ma updaet garindai chha.
        </p>
        <p>
          Nepal ma suna ko bhaau antarraashtriyo gold spot price ra USD-NPR vinimay dar ma
          aadharit hundaa chha. Festival season (Dashain, Tihar) ma suna ko maang badhnaa le
          bhaau maath jaana sakdaa chha.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/ajako-sunn-ko-bhau/" className="tag-pill">Ajako Sunn Ko Bhau</Link>
          <Link href="/hallmark-gold-price-nepal/" className="tag-pill">Hallmark Gold</Link>
          <Link href="/tejabi-gold-price-nepal/" className="tag-pill">Tejabi Gold</Link>
          <Link href="/silver-price-nepal/" className="tag-pill">Chandi Price</Link>
          <Link href="/history/" className="tag-pill">Price History</Link>
        </div>
      </section>

      <Faq items={FAQS} />
    </>
  );
}
