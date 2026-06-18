import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchLatestRate } from '@/lib/api';
import { apiDateToDisplay, formatNPR, todayDisplay } from '@/lib/utils';
import PriceTable from '@/components/PriceTable';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Ajako Sunn Ko Bhau – आजको सुनको भाउ Nepal | GoldNepal',
  description:
    'Ajako sunn ko bhau Nepal — आजको सुनको भाउ। Today gold price Nepal in Nepali. Hallmark, tejabi suna ra chandi ko aajako bhaau per tola ra 10 gram ma.',
  keywords: 'ajako sunn ko bhau, aajako suna ko bhaau, ajako sunn ko bhaau nepal, aajako sunn ko bhaau, nepal ma ajako sunn bhaau, ajako suna ko bhaau nepal, gold price today nepali, आजको सुनको भाउ, ajako sunn bhaau nepal, sunn ko bhaau aaja nepal',
  alternates: { canonical: '/ajako-sunn-ko-bhau/' },
};

const FAQS = [
  {
    q: 'Ajako sunn ko bhau kati ho? (आजको सुनको भाउ कति हो?)',
    a: 'Ajako sunn ko bhau maathiko table ma chha. Hallmark suna (Fine Gold 9999) ra tejabi suna ko aajako bhaau pratyek tola ra 10 gram ma dekhaueko chha.',
  },
  {
    q: 'Aajako tejabi suna ko bhaau kati ho?',
    a: 'Aajako tejabi suna ko bhaau maathiko price table ma chha. Tejabi suna (तेजाबी सुन) Nepal ma gahana banaunaako laagi sababhanda beshee prayog garindaa chha.',
  },
  {
    q: 'Aajako chandi ko bhaau kati ho? (आजको चाँदी को भाउ?)',
    a: 'Aajako chandi ko bhaau (silver price) pani maathiko price table ma chha — hallmark ra tejabi suna ko bhaau saathai. Chandi ko bhaau pratyek tola ra 10 gram ma prakaashit chha.',
  },
  {
    q: 'Nepal ma suna kin-bech kati bajey gardaa chha?',
    a: 'Nepal ma suna ko byabasaayik saudag (buy-sell) pratyek byabasayik din hun sakdaa chha. Nepal Gold & Silver Dealers\' Association le bihaan nai aajako suna ko bhaau ghoshit gardaa chha.',
  },
];

export default async function AjakoSunnKoBhauPage() {
  const latest = await fetchLatestRate();

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Ajako Sunn Ko Bhau</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Ajako Sunn Ko Bhau – {todayDisplay()}</h1>
        <p className="page-sub">आजको सुनको भाउ — Nepal Gold Price in Nepali</p>
      </div>

      {latest ? (
        <>
          <div className="price-hero">
            <div className="price-hero-main">
              <div className="price-hero-icon" aria-hidden="true">🥇</div>
              <div className="price-hero-info">
                <div className="price-hero-label">Ajako Hallmark Sunn Ko Bhaau (आजको सुनको भाउ)</div>
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
        <h2><span className="y-bar" />Ajako Sunn Ko Bhaau Nepal</h2>
        <p>
          <strong>Ajako sunn ko bhaau</strong> (आजको सुनको भाउ) Nepal ma pratyek byabasayik din
          Nepal Gold &amp; Silver Dealers&apos; Association le ghoshit gardaa chha. Hallmark suna
          (Fine Gold 9999 / 24K), tejabi suna (तेजाबी सुन), ra chandi (चाँदी) ko bhaau yahan
          pratyek tola ra 10 gram ma updaet hunchha.
        </p>
        <p>
          Nepal ma suna ko bhaau international market ra USD-NPR vinimay dar ma aadharit hunchha.
          Dashain, Tihar, ra bihawako mosam ma suna ko maang badhnaa le bhaau kahi badhna sakdaa chha.
        </p>
        <div className="tag-cloud" style={{ marginTop: 12 }}>
          <Link href="/sunn-ko-bhau-aja/" className="tag-pill">Sunn Ko Bhau Aja</Link>
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
