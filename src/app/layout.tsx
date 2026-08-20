import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import Script from 'next/script'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { RevealObserver } from '@/components/ui/RevealObserver'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { SITE_URL, GA_MEASUREMENT_ID } from '@/lib/constants'
import PublicShellClient from '@/components/layout/PublicShellClient'
import { MobileLanguageBanner } from '@/components/ui/MobileLanguageBanner'
import { LangSync } from '@/components/ui/LangSync'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  // 700-900 included because headings ask for them (the form title is 800).
  // Without these the browser falls back to 600 or fakes the weight, and bold
  // headings render noticeably softer than intended.
  weight: ['300', '400', '500', '600', '700', '800', '900'],
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
    default: 'Working Holiday Tax Refund Australia - WHV Tax Return Specialists',
    template: '%s | Working Holiday Tax',
  },
  description:
    'Get your Australian tax refund as a Working Holiday Maker (subclass 417 and 462). Backpacker tax specialists for WHV tax returns, TFN, super refund (DASP) and ABN - lodged online.',
  keywords: [
    'working holiday tax refund',
    'WHV tax refund Australia',
    'backpacker tax refund',
    'Australian tax refund working holiday',
    'tax refund 417 visa',
    'tax refund 462 visa',
    'claim tax back Australia',
    'working holiday tax return',
    'WHV tax return',
    'how to get tax refund Australia working holiday',
    'tax refund for backpackers Australia',
    'working holiday maker tax refund',
    'Australian tax return for foreigners',
    'tax back Australia backpacker',
    'TFN application Australia',
    'backpacker tax',
    'superannuation refund Australia',
    'DASP super refund',
    '417 visa tax',
    '462 visa tax',
    'ABN registration Australia',
    'Australian tax for backpackers',
    'working holiday maker tax rate',
    'Medicare levy exemption',
    'backpacker tax specialist Australia',
    'tax refund estimate Australia',
    'end of financial year tax return WHV',
  ],
  authors: [{ name: 'Working Holiday Tax' }],
  creator: 'Working Holiday Tax',
  publisher: 'Working Holiday Tax',
  category: 'Tax Services',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: 'Working Holiday Tax',
    title: 'Working Holiday Tax Refund Australia - WHV Tax Return Specialists',
    description: 'Get your Australian tax refund as a Working Holiday Maker. Backpacker tax specialists for WHV tax returns, TFN, super refund (DASP) and ABN - all online.',
    images: [{
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Working Holiday Tax Refund - Australian tax services for backpackers',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Working Holiday Tax Refund Australia - WHV Tax Return',
    description: 'Get your Australian tax refund as a Working Holiday Maker. Backpacker tax specialists - all online.',
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
      description: 'Specialists in TFN applications, tax returns, superannuation (DASP) and ABN registrations for working holiday visa holders (subclass 417 and 462) in Australia.',
      slogan: 'Australian tax, sorted.',
      foundingDate: '2020',
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
              description: 'Lodge your Australian tax return as a working holiday maker - handled end to end by backpacker tax specialists.',
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
  // Server-render the correct <html lang> per locale by reading the `x-locale`
  // request header that middleware sets from the URL prefix. This fixes /de and
  // /ja pages previously shipping lang="en-AU" in the initial HTML (bad for SEO
  // and screen readers). TRADE-OFF: reading headers() opts routes out of static
  // generation. If you prefer fully static pages over correct server-side lang,
  // revert to `const lang = 'en-AU'` and rely on <LangSync/> alone.
  const lang = headers().get('x-locale') ?? 'en-AU'
  // Present only when CSP nonce mode is enabled (middleware). null otherwise,
  // in which case the static 'unsafe-inline' CSP covers the inline script.
  const nonce = headers().get('x-nonce') ?? undefined
  // Don't tag the internal CRM/admin area - it's staff usage, not public
  // traffic, and would otherwise pollute GA4's acquisition/behaviour data.
  // (/crm is also disallowed in robots.ts for the same "not public" reason.)
  const isAdminArea = (headers().get('x-pathname') ?? '').startsWith('/crm')
  return (
    <html lang={lang} className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        {/* Fonts are self-hosted by next/font/google at build time, so no
            runtime connection to Google Font origins is needed. */}
        <script
          type="application/ld+json"
          nonce={nonce}
          // JSONLD-04: escape HTML/JS-context characters so a field containing
          // `</script>` (or U+2028/U+2029) cannot break out of the JSON-LD block.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrg)
              .replace(/</g, '\\u003c')
              .replace(/>/g, '\\u003e')
              .replace(/&/g, '\\u0026')
              .replace(/\u2028/g, '\\u2028')
              .replace(/\u2029/g, '\\u2029'),
          }}
        />
        {/* Google Analytics 4. Loaded afterInteractive so it never blocks
            first paint / LCP. Skipped entirely on /crm (see isAdminArea). */}
        {!isAdminArea && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
              nonce={nonce}
            />
            <Script id="ga4-init" strategy="afterInteractive" nonce={nonce}>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        {/* Skip-to-content link for keyboard users. CSS-only (no JS event handlers
            so this works inside a Server Component). Visually hidden until focused. */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Decorative film-grain overlay (fixed, non-interactive) */}
        <div className="grain" aria-hidden="true" />

        <div>
          <PublicShellClient nav={<Nav />} footer={<Footer />}>
            <main id="main-content">{children}</main>
          </PublicShellClient>
        </div>

        <MobileLanguageBanner />
        <LangSync />
        <RevealObserver />
        <ScrollToTop />
      </body>
    </html>
  )
}
