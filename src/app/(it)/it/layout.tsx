import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'

/**
 * Italian section layout (ADR 013).
 * Wraps all /it/* pages. Provides default metadata, OpenGraph, hreflang.
 * Pages override these in their own metadata exports.
 *
 * The <html lang="it"> attribute is set in the (it) root layout
 * (src/app/(it)/layout.tsx), so it is correct in the static HTML.
 *
 * hreflang is by language (`it`), not by country, as decided in ADR 013.
 * No page exists under /it until its copy has passed review, and IT_PAGES in
 * src/lib/locale-pages.ts controls what the sitemap and the language switcher list.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Tax return Australia per il working holiday | Working Holiday Tax',
    template: '%s | Working Holiday Tax',
  },
  description:
    'Tax return in Australia con un visto working holiday (417 e 462). TFN, rimborso della super (DASP) e ABN, tutto online. Scrivici su WhatsApp.',
  keywords: [
    'dichiarazione dei redditi Australia working holiday',
    'tax return Australia working holiday',
    'rimborso tasse Australia',
    'tasse Australia visto working holiday',
    'richiedere il TFN Australia',
    'riavere la super Australia',
    'DASP Australia',
    'ABN Australia working holiday',
    'visto 417 tasse',
    'visto 462 tasse',
    'Medicare levy working holiday',
  ],
  authors: [{ name: 'Working Holiday Tax' }],
  creator: 'Working Holiday Tax',
  publisher: 'Working Holiday Tax',
  category: 'Dichiarazione dei redditi',
  alternates: {
    canonical: `${SITE_URL}/it`,
    languages: {
      'en-AU': SITE_URL,
      'de': `${SITE_URL}/de`,
      'ja': `${SITE_URL}/ja`,
      ...newLocaleLanguages('/'),
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    alternateLocale: ['en_AU'],
    url: `${SITE_URL}/it`,
    siteName: 'Working Holiday Tax',
    title: 'Dichiarazione dei redditi in Australia per chi ha il visto working holiday | Working Holiday Tax',
    description: 'Dichiarazione dei redditi in Australia con un visto working holiday. TFN, super (DASP) e ABN, tutto online.',
    images: [{
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Dichiarazione dei redditi in Australia per chi ha un visto working holiday',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dichiarazione dei redditi in Australia per chi ha il visto working holiday',
    description: 'La tua dichiarazione dei redditi australiana, online, per chi ha un visto working holiday.',
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
}

export default function ItalianLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
