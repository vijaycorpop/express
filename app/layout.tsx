import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClientLayout } from './layout-client';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://panda-express-nutrition.net'),
  title: 'Panda Express Nutrition | Calculate Panda Express Menu Nutrition Facts',
  description: 'Calculate nutrition facts for Panda Express menu items. Get accurate calories, protein, carbs, fat content for entire menu. Make healthier choices at Panda Express.',
  keywords: 'Panda Express nutrition, Panda Express nutrition calculator, Panda Express calories, Panda Express menu nutrition facts, Chinese food nutrition calculator',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://panda-express-nutrition.net',
    siteName: 'Panda Express Nutrition',
    title: 'Panda Express Nutrition Calculator',
    description: 'Calculate nutrition facts for Panda Express menu items. Get accurate calories, protein, carbs, fat content for entire menu. Make healthier choices at Panda Express.',  
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Panda Express Nutrition Calculator',
    description: 'Calculate nutrition facts for Panda Express menu items. Make healthier choices.',
  },
  alternates: {
    canonical: 'https://panda-express-nutrition.net',
    languages: {
      'en-US': 'https://panda-express-nutrition.net'
    }
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en-US" 
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <link rel="apple-touch-icon" type="image/png" href="/images/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta httpEquiv="content-language" content="en-US" />
        <meta httpEquiv="X-DNS-Prefetch-Control" content="on" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
        {process.env.NODE_ENV === 'production' && (
          <meta
            httpEquiv="Content-Security-Policy"
            content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self';"
          />
        )}
      </head>
      <body className={inter.className}>
        <ClientLayout>
          <main>
            {children}
          </main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
