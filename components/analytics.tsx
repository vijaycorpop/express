'use client';

import Script from 'next/script';

export function Analytics() {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=YOUR-GA4-ID`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'YOUR-GA4-ID');
        `}
      </Script>

      {/* Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-2679347385533785"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Add other tracking scripts here */}
    </>
  );
}
