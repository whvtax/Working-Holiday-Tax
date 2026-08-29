import type { Metadata, Viewport } from 'next'
import { RootDocument } from '@/components/layout/RootDocument'
import { SITE_URL } from '@/lib/constants'

/**
 * Root layout for the English site.
 *
 * WHY THERE ARE THREE OF THESE. `<html lang>` can only be set in a root
 * layout, and it has to be right in the STATIC HTML. One shared root layout
 * meant every page hardcoded lang="en-AU" and a script patched /de and /ja
 * after hydration, so about 330 German and Japanese pages were served to any
 * crawler that does not run JS as Australian English. Route groups give each
 * language its own root layout without changing a single URL: (site), (de) and
 * (ja) are grouping folders and never appear in a path.
 *
 * Everything except the language is shared, in components/layout/RootDocument.
 */
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
  // The page background (tailwind `canvas`), NOT the brand green.
  //
  // WHY (Jo, 28 Aug). theme-color tells a phone browser what to paint its own
  // toolbar with. Set to the brand green it painted roughly 120pt of Safari's
  // chrome in exactly the same colour as our 68px nav, with no line between
  // them, so the top of every page on a phone read as one green block about
  // three times the height of the real header. Measured: the page itself only
  // ever paints one green band, the nav, and it is 68px.
  //
  // Matching the page background lets the browser's chrome disappear into the
  // page, which is what it is there for.
  themeColor: '#F5F9F7',
}

export default function SiteRootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en-AU">{children}</RootDocument>
}
