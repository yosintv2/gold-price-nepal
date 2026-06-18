import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScriptLoaders from '@/components/ScriptLoaders';
import CookieBanner from '@/components/CookieBanner';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.goldnepal.com';

export const metadata: Metadata = {
  title: 'Gold Price in Nepal Today – Live Gold & Silver Rates | GoldNepal',
  description:
    'Today\'s gold price in Nepal: hallmark gold, fine gold 9999, 24K, tajabi gold and silver rates per tola and per 10 gram. Updated daily from Nepal Gold & Silver Dealers\' Association.',
  keywords:
    'gold price in nepal, gold price nepal today, hallmark gold price nepal, fine gold 9999 price nepal, 24k gold price nepal, tajabi gold price nepal, silver price nepal, suna ko bhaau nepal',
  authors: [{ name: 'GoldNepal' }],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    siteName: 'GoldNepal',
    title: 'Gold Price in Nepal Today – Live Rates | GoldNepal',
    description: 'Daily gold and silver prices in Nepal — hallmark, fine gold 9999, tajabi and silver rates per tola and per 10 gram.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price in Nepal Today | GoldNepal',
    description: 'Live gold and silver rates in Nepal per tola and per 10 gram. Updated daily.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL + '/' },
  applicationName: 'GoldNepal',
  category: 'finance',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'GoldNepal',
        url: SITE_URL + '/',
        description: 'Daily gold and silver price guide for Nepal.',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'GoldNepal',
        url: SITE_URL + '/',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/icon.svg`,
        },
        description: 'GoldNepal provides daily gold and silver price information for Nepal.',
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1a1812" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <div className="container">
          {children}
        </div>
        <Footer />
        <CookieBanner />
        <ScriptLoaders />
      </body>
    </html>
  );
}
