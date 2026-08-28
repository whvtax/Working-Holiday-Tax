import type { Metadata, Viewport } from 'next'
type __FontOpts = { variable: string; [k: string]: unknown }
const __stub = (o: __FontOpts) => ({ variable: o.variable, className: '', style: { fontFamily: '' } })
const Fraunces = __stub
const DM_Sans = __stub
const Inter = __stub
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { RevealObserver } from '@/components/ui/RevealObserver'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { SITE_URL } from '@/lib/constants'
import { Analytics } from '@/components/layout/Analytics'
import PublicShellClient from '@/components/layout/PublicShellClient'
import { MobileLanguageBanner } from '@/components/ui/MobileLanguageBanner'
import { LangSync } from '@/components/ui/LangSync'

// Fraunces replaces Playfair Display. Playfair is a display face: its hairlines
// are drawn for 44px headlines and thin out at the 21px where most of this
// site's headings actually sit on a phone. Fraunces holds its weight there, is
// rounder, and is not on every other site. It is variable, so SOFT and opsz are
// requested alongside the weight range and set in globals.css.
const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
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

// The admin's interface font — the CRM and Will only. It is NOT the site's font:
// the public pages keep DM Sans, which is the brand.
//
// Why a different face for the admin: DM Sans is a geometric sans, drawn for
// headings and marketing copy. The admin is a dense reference tool read at
// 12.5px for hours, and it is almost entirely numbers — TFNs, ABNs, phone
// numbers, refund amounts, counts. Two measured reasons Inter suits it better:
//
//   1. DM Sans has NO tabular-figures feature. The admin's CSS asks for
//      `font-variant-numeric: tabular-nums` on every KPI value and numeric
//      table column, and on DM Sans that request does nothing — the digits are
//      proportional, so columns of amounts never actually line up. Inter has
//      real `tnum`, so those columns align for the first time.
//   2. Inter's x-height is 0.546em against DM Sans' 0.504em — 8% more
//      lowercase at the same size, which is where small-size legibility lives.
//
// preload:false on purpose: this is declared in the root layout so the token is
// available everywhere, but only `.crm-scope` and `.will-scope` ever reference
// it. Browsers fetch a webfont only when something actually renders in it, so a
// visitor to the public site never downloads Inter. Preloading would defeat
// that and cost every marketing page a font it will not use.
// No `weight` array on purpose: omitting it loads Inter's VARIABLE font, and
// the admin's stylesheet asks for 450 and 650 in thirteen places (nav rows,
// tile values, section headings, chat names). Static instances only exist at
// the hundreds, so those weights would snap to 400/600/700 or be synthesised,
// and the whole type hierarchy would flatten by a step.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
  preload: false,
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
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'AU',
        addressRegion: 'Australia',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Australia',
      },
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
  // This layout used to read headers() three times, for the locale, the CSP
  // nonce and the pathname. Any one of those reads opts every route out of
  // static generation, which is why only 3 of 562 pages were prerendered and
  // every visitor waited on a Sydney lambda for HTML that never changes. For an
  // audience that is 99.999% mobile and largely outside Australia, that is the
  // single most expensive line on the site.
  //
  // All three are handled elsewhere now:
  //   locale   -> a pre-paint script below sets <html lang> before first paint,
  //               and hreflang plus <LangSync/> cover the rest.
  //   pathname -> <Analytics/> reads it on the client.
  //   nonce    -> CSP nonce mode is OFF by default (CSP_NONCE_ENABLED) and the
  //               static CSP in next.config.js with 'unsafe-inline' applies.
  //               ⚠️ If nonce mode is ever switched on, the JSON-LD block below
  //               and <Analytics/> need a nonce again, which means either
  //               restoring the header read (and losing static generation) or
  //               relying on 'strict-dynamic'. Verify in a preview deployment
  //               before enabling it in production.
  return (
    <html lang="en-AU" className={`${fraunces.variable} ${dmSans.variable} ${inter.variable}`}>
      <head>
        {/* Fonts are self-hosted by next/font/google at build time, so no
            runtime connection to Google Font origins is needed. */}
        {/* Set <html lang> from the URL before first paint, so /de and /ja do
            not ship as en-AU. Runs synchronously ahead of render, which keeps
            the page static while still giving assistive tech and crawlers the
            right language. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var p=location.pathname;var l=p==='/de'||p.indexOf('/de/')===0?'de-DE':p==='/ja'||p.indexOf('/ja/')===0?'ja-JP':'en-AU';document.documentElement.lang=l}catch(e){}})()",
          }}
        />
        <script
          type="application/ld+json"
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
        <Analytics />
        <RevealObserver />
        <ScrollToTop />
      </body>
    </html>
  )
}
