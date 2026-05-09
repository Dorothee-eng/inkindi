import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const SITE = {
  name: 'INKINDI',
  tagline: 'Modern Luxury Jewelry, Rooted in African Heritage',
  url: 'https://inkindi.vercel.app',
  description:
    'INKINDI is a modern luxury jewelry house designing necklaces, earrings, rings and bracelets for the contemporary woman. Hand-finished, ethically sourced, and rooted in African heritage.',
};

export const viewport: Viewport = {
  themeColor: '#FBF7F0',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'luxury jewelry',
    'women jewelry',
    'African luxury',
    'fine jewelry',
    'necklaces',
    'earrings',
    'rings',
    'bracelets',
    'Rwanda jewelry',
    'Kigali jewelry',
    'Inkindi',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: 'website',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ['/og.png'],
  },
  alternates: { canonical: SITE.url },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  verification: {
    // Paste the token Google Search Console gives you under
    // "HTML tag" verification (the value of the content="..." attribute):
    // google: 'YOUR-GOOGLE-SEARCH-CONSOLE-TOKEN',
  },
  formatDetection: { telephone: false, address: false, email: false },
  category: 'Fashion',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col">
        <AnnouncementBar />
        <Navbar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE.name,
              url: SITE.url,
              logo: `${SITE.url}/favicon.ico`,
              sameAs: [
                'https://www.instagram.com/inkindi',
                'https://www.tiktok.com/@inkindi',
                'https://www.pinterest.com/inkindi',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
