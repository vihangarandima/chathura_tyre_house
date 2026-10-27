import type { Metadata, Viewport } from 'next';
import { Archivo, Geist, JetBrains_Mono, Noto_Sans_Sinhala } from 'next/font/google';
import { site } from '@/content/site';
import en from '@/content/en';
import { LangProvider } from '@/lib/i18n';
import '@/styles/globals.css';

const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-display',
});
const body = Geist({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--font-body', preload: false });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], display: 'swap', variable: '--font-mono', preload: false });
const sinhala = Noto_Sans_Sinhala({
  subsets: ['sinhala'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-si',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: en.meta.title,
  description: en.meta.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: en.meta.title,
    description: en.meta.description,
    type: 'website',
    locale: 'en_LK',
    images: [{ url: '/render/og.png', width: 1200, height: 630, alt: site.shortName }],
  },
  twitter: { card: 'summary_large_image', images: ['/render/og.png'] },
  icons: { icon: '/icon.svg', apple: '/render/apple-icon.png' },
};

export const viewport: Viewport = {
  themeColor: '#E3120B',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const DAY_SCHEMA: Record<string, string> = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutomotiveBusiness',
  additionalType: 'https://schema.org/TireShop',
  name: site.legalName,
  alternateName: site.shortName,
  url: site.url,
  image: `${site.url}/render/og.png`,
  telephone: site.phones.landline.tel,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressCountry: site.address.countryCode,
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.address.geo.lat, longitude: site.address.geo.lng },
  openingHoursSpecification: Object.entries(site.hours)
    .filter(([, h]) => h)
    .map(([d, h]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: DAY_SCHEMA[d], opens: h!.open, closes: h!.close })),
  aggregateRating: { '@type': 'AggregateRating', ratingValue: site.rating.value, reviewCount: site.rating.count },
  sameAs: [site.social.facebook, site.social.tiktok],
};

// Runs before paint: enables JS-only hidden states (reveals) without a flash.
const boot = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${sinhala.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
