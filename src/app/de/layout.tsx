import type { Metadata } from 'next'
import { SITE_URL, AGENT_NAME } from '@/lib/constants'

/**
 * German section layout.
 * Wraps all /de/* pages. Provides default German metadata, OpenGraph, hreflang.
 * Pages can override these in their own metadata exports.
 *
 * NOTE: The lang attribute on <html> is set dynamically by a script in the
 * root layout (src/app/layout.tsx) based on the URL pathname.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Working Holiday Tax Australien - Steuer, Super & TFN für Backpacker',
    template: '%s | Working Holiday Tax',
  },
  description:
    'Registrierter Steueragent für Working Holiday Visainhaber (Subclass 417 und 462) in Australien. TFN, Steuererklärung, Superauszahlung (DASP) und ABN - wir erledigen alles für dich.',
  keywords: [
    'Working Holiday Australien Steuer',
    'Steuererklärung Backpacker Australien',
    'TFN beantragen Australien',
    'Backpacker Steuer Australien',
    'Super auszahlen Australien',
    'DASP Auszahlung',
    '417 Visum Steuer',
    '462 Visum Steuer',
    'ABN Registrierung Australien',
    'Steuersatz Working Holiday Maker',
    'Working Holiday Visum Steuern',
    'Steuerrückzahlung Australien',
    'Backpacker Steuerrückerstattung',
    'Medicare Levy Befreiung',
    'Work and Travel Australien Steuer',
    'Steuerberater Australien Deutsch',
  ],
  authors: [{ name: AGENT_NAME }],
  creator: AGENT_NAME,
  publisher: AGENT_NAME,
  category: 'Steuerberatung',
  alternates: {
    canonical: `${SITE_URL}/de`,
    languages: {
      'en-AU': SITE_URL,
      'de': `${SITE_URL}/de`,
      'ja': `${SITE_URL}/ja`,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    alternateLocale: ['en_AU'],
    url: `${SITE_URL}/de`,
    siteName: 'Working Holiday Tax',
    title: 'Working Holiday Tax Australien - Steuer, Super & TFN für Backpacker',
    description: 'Registrierter Steueragent für Working Holiday Maker in Australien. TFN, Steuererklärung, Super und ABN - alles erledigt.',
    images: [{
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Working Holiday Tax - Steuerservice für Backpacker in Australien',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Working Holiday Tax Australien - für Backpacker',
    description: 'Registrierter Steueragent für Working Holiday Maker in Australien.',
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

export default function GermanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
