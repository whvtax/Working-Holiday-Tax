import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { RevealObserver } from '@/components/ui/RevealObserver'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { SITE_URL } from '@/lib/constants'
import PublicShellClient from '@/components/layout/PublicShellClient'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
    other: [{ rel: 'manifest', url: '/manifest.json' }],
  },
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Working Holiday Tax',
    template: '%s  -  Working Holiday Tax',
  },
  description:
    'Tax refund for a Working Holiday visa in Australia. workingholidaytax.com.au',
  keywords: ['working holiday tax', 'WHV tax return', 'TFN application Australia', 'backpacker tax', 'superannuation Australia'],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: 'Working Holiday Tax',
    title: 'Working Holiday Tax',
    description: 'Tax return for a Working Holiday visa in Australia. workingholidaytax.com.au',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Tax return for a Working Holiday visa in Australia' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  other: { 'facebook-domain-verification': '0omgb6quah0z1m44eiqboc87rsnhu1' },
}

// M3: explicit viewport export (Next.js 14 App Router recommendation)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B5240',
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://workingholidaytax.com.au/#business',
      name: 'Working Holiday Tax',
      url: 'https://workingholidaytax.com.au',
      telephone: '+61424513998',
      email: 'info@workingholidaytax.com.au',
      description: 'TFN, tax return, super withdrawal and ABN for Working Holiday Visa holders in Australia. Registered tax agent.',
      areaServed: 'AU',
      priceRange: '$$',
      image: 'https://workingholidaytax.com.au/og-image.png',
      sameAs: [
        'https://www.tiktok.com/@workingholidaytax',
        'https://instagram.com/workingholidaytax',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '300',
        bestRating: '5',
        worstRating: '1',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Tax Services for Working Holiday Makers',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'TFN Application', url: 'https://workingholidaytax.com.au/tfn' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Tax Return', url: 'https://workingholidaytax.com.au/tax-return' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Super Withdrawal', url: 'https://workingholidaytax.com.au/superannuation' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'ABN Registration', url: 'https://workingholidaytax.com.au/abn' },
          },
        ],
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        <div className="grain" aria-hidden="true" />
        {/* PublicShellClient hides Nav/Footer on /crm/* routes */}
        <PublicShellClient nav={<Nav />} footer={<Footer />}>
          <main id="main-content">{children}</main>
        </PublicShellClient>
        <RevealObserver />
        <ScrollToTop />
      </body>
    </html>
  )
}
