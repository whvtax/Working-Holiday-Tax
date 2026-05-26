import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { RevealObserver } from '@/components/ui/RevealObserver'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { SITE_URL, AGENT_NAME } from '@/lib/constants'
import PublicShellClient from '@/components/layout/PublicShellClient'
import { MobileLanguageBanner } from '@/components/ui/MobileLanguageBanner'

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
    default: 'Working Holiday Tax - Australian Tax for WHV Holders',
    template: '%s | Working Holiday Tax',
  },
  description:
    'Registered tax agent for Working Holiday Visa holders (subclass 417 and 462) in Australia. TFN, tax returns, super withdrawal (DASP) and ABN - all handled for you.',
  keywords: [
    'working holiday tax',
    'WHV tax return',
    'TFN application Australia',
    'backpacker tax',
    'superannuation Australia',
    'DASP super refund',
    '417 visa tax',
    '462 visa tax',
    'ABN registration Australia',
    'Australian tax for backpackers',
    'working holiday maker tax rate',
    'Medicare levy exemption',
    'registered tax agent Australia',
  ],
  authors: [{ name: AGENT_NAME }],
  creator: AGENT_NAME,
  publisher: AGENT_NAME,
  category: 'Tax Services',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: 'Working Holiday Tax',
    title: 'Working Holiday Tax - Australian Tax for WHV Holders',
    description: 'Registered tax agent for Working Holiday Visa holders in Australia. TFN, tax returns, super withdrawal (DASP) and ABN - all handled for you.',
    images: [{
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Working Holiday Tax - Australian tax services for backpackers',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Working Holiday Tax - Australian Tax for WHV Holders',
    description: 'Registered tax agent for Working Holiday Visa holders in Australia.',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
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
    // Organization - the legal entity
    {
      '@type': ['Organization', 'ProfessionalService', 'AccountingService'],
      '@id': 'https://workingholidaytax.com.au/#business',
      name: 'Working Holiday Tax',
      legalName: 'The Accounting Academy Pty Ltd',
      alternateName: ['WHT', 'WorkingHolidayTax'],
      url: 'https://workingholidaytax.com.au',
      logo: {
        '@type': 'ImageObject',
        url: 'https://workingholidaytax.com.au/icon-192.png',
        width: 192,
        height: 192,
      },
      image: 'https://workingholidaytax.com.au/og-image.png',
      telephone: '+61424513998',
      email: 'info@workingholidaytax.com.au',
      description: 'Registered tax agent specialising in TFN applications, tax returns, superannuation (DASP) and ABN registrations for working holiday visa holders (subclass 417 and 462) in Australia.',
      slogan: 'Australian tax, sorted.',
      foundingDate: '2020',
      // ABN of the business (Australian Business Number)
      taxID: '26 669 927 959',
      // Tax Agent Number (TPB registration)
      identifier: [
        {
          '@type': 'PropertyValue',
          name: 'ABN',
          value: '26 669 927 959',
        },
        {
          '@type': 'PropertyValue',
          name: 'Tax Agent Number',
          value: '26233096',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'AU',
        addressRegion: 'Australia',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Australia',
      },
      priceRange: '$$',
      currenciesAccepted: 'AUD',
      paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
      sameAs: [
        'https://www.tiktok.com/@workingholidaytax',
        'https://instagram.com/workingholidaytax',
      ],
      knowsAbout: [
        'Australian taxation',
        'Working Holiday Visa tax',
        'Tax File Number (TFN) applications',
        'Australian Business Number (ABN) registration',
        'Departing Australia Superannuation Payment (DASP)',
        'Backpacker tax',
        'Medicare Levy exemption',
        'Working Holiday Maker tax rates',
        '417 visa tax',
        '462 visa tax',
      ],
      audience: {
        '@type': 'Audience',
        audienceType: 'Working Holiday Visa holders in Australia (subclass 417 and 462)',
        geographicArea: {
          '@type': 'Country',
          name: 'Australia',
        },
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: '+61424513998',
          email: 'info@workingholidaytax.com.au',
          areaServed: 'AU',
          availableLanguage: ['en', 'English'],
          contactOption: 'TollFree',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'WhatsApp',
          telephone: '+61424513998',
          areaServed: 'AU',
          availableLanguage: ['en', 'English'],
        },
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
            itemOffered: {
              '@type': 'Service',
              name: 'TFN Application',
              description: 'Apply for your Australian Tax File Number as a working holiday maker.',
              url: 'https://workingholidaytax.com.au/tfn',
              provider: { '@id': 'https://workingholidaytax.com.au/#business' },
              areaServed: 'AU',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Tax Return Lodgement',
              description: 'Lodge your Australian tax return and claim your refund as a working holiday maker.',
              url: 'https://workingholidaytax.com.au/tax-return',
              provider: { '@id': 'https://workingholidaytax.com.au/#business' },
              areaServed: 'AU',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Super Withdrawal (DASP)',
              description: 'Claim your Australian superannuation through the Departing Australia Superannuation Payment process.',
              url: 'https://workingholidaytax.com.au/superannuation',
              provider: { '@id': 'https://workingholidaytax.com.au/#business' },
              areaServed: 'AU',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'ABN Registration',
              description: 'Register your Australian Business Number to work as a contractor or sole trader.',
              url: 'https://workingholidaytax.com.au/abn',
              provider: { '@id': 'https://workingholidaytax.com.au/#business' },
              areaServed: 'AU',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Medicare Levy Exemption',
              description: 'Apply for a Medicare Levy Exemption Certificate to remove the 2% levy from your tax return.',
              url: 'https://workingholidaytax.com.au/medicare',
              provider: { '@id': 'https://workingholidaytax.com.au/#business' },
              areaServed: 'AU',
            },
          },
        ],
      },
    },
    // Website - for sitelinks search box
    {
      '@type': 'WebSite',
      '@id': 'https://workingholidaytax.com.au/#website',
      url: 'https://workingholidaytax.com.au',
      name: 'Working Holiday Tax',
      description: 'Australian tax, sorted. For working holiday makers.',
      publisher: { '@id': 'https://workingholidaytax.com.au/#business' },
      inLanguage: 'en-AU',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://workingholidaytax.com.au/blog?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
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
        {/* Sync html[lang] with current route. /de/* → "de", /ja/* → "ja", others → "en-AU".
            This ensures locale-specific CSS rules (hyphenation, line-break) apply correctly. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var setLang = function(){
                  var p = window.location.pathname || '/';
                  var isDE = p === '/de' || p.indexOf('/de/') === 0;
                  var isJA = p === '/ja' || p.indexOf('/ja/') === 0;
                  document.documentElement.lang = isJA ? 'ja' : isDE ? 'de' : 'en-AU';
                };
                setLang();
                // Re-run on client-side route changes (Next.js navigation)
                var lastPath = window.location.pathname;
                setInterval(function(){
                  if (window.location.pathname !== lastPath) {
                    lastPath = window.location.pathname;
                    setLang();
                  }
                }, 200);
              })();
            `,
          }}
        />
      </head>
      <body>
        {/* Skip-to-content link for keyboard users. CSS-only (no JS event handlers
            so this works inside a Server Component). Visually hidden until focused. */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <div className="grain" aria-hidden="true" />
        {/* PublicShellClient hides Nav/Footer on /crm/* routes */}
        <PublicShellClient nav={<Nav />} footer={<Footer />}>
          <main id="main-content">{children}</main>
        </PublicShellClient>
        <RevealObserver />
        <ScrollToTop />
        <MobileLanguageBanner />
      </body>
    </html>
  )
}
