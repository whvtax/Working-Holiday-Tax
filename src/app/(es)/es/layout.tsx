import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'

/**
 * Spanish section layout (ADR 013).
 * Wraps all /es/* pages. Provides default metadata, OpenGraph, hreflang.
 * Pages override these in their own metadata exports.
 *
 * The <html lang="es"> attribute is set in the (es) root layout
 * (src/app/(es)/layout.tsx), so it is correct in the static HTML.
 *
 * hreflang is by language (`es`), not by country, as decided in ADR 013.
 * No page exists under /es until its copy has passed review, and ES_PAGES in
 * src/lib/locale-pages.ts controls what the sitemap and the language switcher list.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Impuestos en Australia: visa 462 y 417 | Working Holiday Tax',
    template: '%s | Working Holiday Tax',
  },
  description:
    'Declaración de impuestos en Australia con una visa working holiday (subclass 417 y 462). TFN, retiro de la super (DASP) y ABN, todo por internet.',
  keywords: [
    'declaración de impuestos Australia working holiday',
    'tax return Australia working holiday',
    'devolución de impuestos Australia',
    'impuestos Australia visa working holiday',
    'solicitar el TFN Australia',
    'recuperar la super Australia',
    'DASP Australia',
    'ABN Australia working holiday',
    'visa 417 impuestos',
    'visa 462 impuestos',
    'Medicare levy working holiday',
  ],
  authors: [{ name: 'Working Holiday Tax' }],
  creator: 'Working Holiday Tax',
  publisher: 'Working Holiday Tax',
  category: 'Declaración de impuestos',
  alternates: {
    canonical: `${SITE_URL}/es`,
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
    locale: 'es_LA',
    alternateLocale: ['en_AU'],
    url: `${SITE_URL}/es`,
    siteName: 'Working Holiday Tax',
    title: 'Impuestos en Australia: visa 462 y 417 | Working Holiday Tax',
    description: 'Declaración de impuestos en Australia con una visa working holiday. TFN, super (DASP) y ABN, todo por internet.',
    images: [{
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Declaración de impuestos en Australia para titulares de una visa working holiday',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Declaración de impuestos en Australia para titulares de visa working holiday',
    description: 'Tu declaración de impuestos de Australia, de principio a fin y por internet, para titulares de una visa working holiday.',
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

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
