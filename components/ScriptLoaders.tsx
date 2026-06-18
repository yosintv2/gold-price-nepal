'use client';

import Script from 'next/script';

export default function ScriptLoaders() {
  return (
    <>
      <Script id="ga4-consent-default" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied'});`}
      </Script>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`gtag('js',new Date());gtag('config','G-XXXXXXXXXX');if(localStorage.getItem('cookie-consent')==='accepted'){gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted'});}`}
      </Script>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
}
