import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'

/**
 * French section layout (ADR 013).
 * Wraps all /fr/* pages. Provides default metadata, OpenGraph, hreflang.
 * Pages override these in their own metadata exports.
 *
 * The <html lang="fr"> attribute is set in the (fr) root layout
 * (src/app/(fr)/layout.tsx), so it is correct in the static HTML.
 *
 * hreflang is by language (`fr`), not by country, as decided in ADR 013.
 * No page exists under /fr until its copy has passed review, and FR_PAGES in
 * src/lib/locale-pages.ts controls what the sitemap and the language switcher list.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Déclaration d’impôts en Australie pour les PVT | Working Holiday Tax',
    template: '%s | Working Holiday Tax',
  },
  description:
    'Déclaration d’impôts en Australie avec un visa vacances-travail (subclass 417 et 462). TFN, retrait de la super (DASP) et ABN : tout se fait en ligne, avec un contact direct sur WhatsApp.',
  keywords: [
    'déclaration d’impôts Australie PVT',
    'tax return Australie PVT',
    'remboursement d’impôts Australie',
    'impôts Australie visa vacances-travail',
    'PVT Australie impôts',
    'demander un TFN Australie',
    'récupérer sa super Australie',
    'DASP Australie',
    'ABN Australie PVT',
    'visa 417 impôts',
    'visa 462 impôts',
    'Medicare levy PVT',
  ],
  authors: [{ name: 'Working Holiday Tax' }],
  creator: 'Working Holiday Tax',
  publisher: 'Working Holiday Tax',
  category: 'Déclaration d’impôts',
  alternates: {
    canonical: `${SITE_URL}/fr`,
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
    locale: 'fr_FR',
    alternateLocale: ['en_AU'],
    url: `${SITE_URL}/fr`,
    siteName: 'Working Holiday Tax',
    title: 'Déclaration d’impôts en Australie pour les PVT | Working Holiday Tax',
    description: 'Déclaration d’impôts en Australie avec un visa vacances-travail. TFN, super (DASP) et ABN, tout se fait en ligne.',
    images: [{
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Déclaration d’impôts en Australie pour les titulaires d’un visa vacances-travail',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Déclaration d’impôts en Australie pour les PVT',
    description: 'Votre déclaration d’impôts australienne, de A à Z et en ligne, pour les titulaires d’un visa vacances-travail.',
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

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
