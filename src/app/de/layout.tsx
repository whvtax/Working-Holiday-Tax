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
    default: 'Steuerrückerstattung Australien für Working Holiday Maker | WHV Steuer',
    template: '%s | Working Holiday Tax',
  },
  description:
    'Hol dir deine Steuerrückerstattung in Australien als Working Holiday Maker (Subclass 417 und 462). Registrierter Steueragent für Steuererklärung, TFN, Superauszahlung (DASP) und ABN - alles online.',
  keywords: [
    'Steuerrückerstattung Australien',
    'Steuerrückzahlung Working Holiday',
    'Backpacker Steuerrückerstattung',
    'Steuer zurückholen Australien',
    'Steuer zurück Australien Backpacker',
    'WHV Steuerrückerstattung',
    'Working Holiday Steuerrückzahlung',
    'Steuerrückerstattung 417 Visum',
    'Steuerrückerstattung 462 Visum',
    'Steuererklärung Australien Backpacker',
    'Australien Steuer zurück',
    'Steuerrückerstattung Working Holiday Maker',
    'Work and Travel Steuerrückerstattung',
    'Working Holiday Australien Steuer',
    'TFN beantragen Australien',
    'Backpacker Steuer Australien',
    'Super auszahlen Australien',
    'DASP Auszahlung',
    'DASP Rückerstattung',
    '417 Visum Steuer',
    '462 Visum Steuer',
    'ABN Registrierung Australien',
    'Steuersatz Working Holiday Maker',
    'Working Holiday Visum Steuern',
    'Backpacker Steuerrückerstattung Rechner',
    'Medicare Levy Befreiung',
    'Work and Travel Australien Steuer',
    'Steuerberater Australien Deutsch',
    'wie bekomme ich Steuern zurück Australien',
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
    title: 'Steuerrückerstattung Australien für Working Holiday Maker | WHV Steuer',
    description: 'Hol dir deine Steuerrückerstattung in Australien als Working Holiday Maker. Registrierter Steueragent für Steuererklärung, TFN, Super (DASP) und ABN - alles online erledigt.',
    images: [{
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Steuerrückerstattung Australien für Working Holiday Maker - Backpacker Steuer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steuerrückerstattung Australien für Backpacker - WHV',
    description: 'Hol dir deine Steuerrückerstattung als Working Holiday Maker in Australien. Registrierter Steueragent - alles online.',
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
