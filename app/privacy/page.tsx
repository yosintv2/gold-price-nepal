import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | GoldNepal',
  description: 'Privacy policy for GoldNepal — how we use cookies and data.',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Privacy Policy</span>
      </nav>

      <div className="page-head">
        <h1 className="page-title">Privacy Policy</h1>
        <p className="page-sub">Last updated: June 2026</p>
      </div>

      <section className="seo-section">
        <h2><span className="y-bar" />Data We Collect</h2>
        <p>
          GoldNepal uses Google Analytics to understand how visitors use this site. Analytics data
          includes pages visited, time on site, and approximate location (country/city level).
          No personal information is collected.
        </p>
        <p>
          We use Google AdSense to display advertisements. AdSense may use cookies to serve
          relevant ads based on your browsing history.
        </p>

        <h3>Cookies</h3>
        <p>
          We use cookies for analytics (Google Analytics) and advertising (Google AdSense).
          You can accept or decline cookies using the banner shown on your first visit.
          Declining will disable analytics and personalised ads.
        </p>

        <h3>Third-Party Services</h3>
        <p>
          Gold price data is sourced from the Nepal Gold &amp; Silver Dealers&apos; Association
          via a public API. No user data is shared with this API.
        </p>

        <h3>Contact</h3>
        <p>
          For privacy-related questions, visit our <Link href="/" style={{ color: 'var(--gold-dark)' }}>homepage</Link>.
        </p>
      </section>
    </>
  );
}
