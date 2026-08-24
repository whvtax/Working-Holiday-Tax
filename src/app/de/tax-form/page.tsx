import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from '@/app/tax-form/FormClient'

export const metadata: Metadata = {
  title: 'Steuererklärung starten (417 und 462)',
  description: 'Schick uns deine Angaben. Wir bereiten deine australische Steuererklärung vor und reichen sie beim ATO ein, meist innerhalb von 24 Stunden nach deiner Antwort.',
  keywords: ['Steuererklärung Antrag', 'Tax Return Formular Deutsch', 'Steuererklärung online', 'Steuerrückerstattung beantragen', 'WHV Steuererklärung einreichen', 'Backpacker Steuererklärung Formular', 'Steuererklärung Australien Deutsch', 'australische Steuererklärung Antrag'],
  alternates: {
    canonical: '/de/tax-form',
    languages: {
      'en-AU': '/tax-form',
      'de': '/de/tax-form',
      'ja': '/ja/tax-form',
      'x-default': '/tax-form',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/tax-form`,
    siteName: 'Working Holiday Tax',
    title: 'Steuererklärungsantrag stellen',
    description: 'Schick uns deine Daten zur Steuererklärung.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`], card: 'summary', title: 'Steuererklärungsantrag stellen', description: 'Schick uns deine Daten zur Steuererklärung.' },
  robots: { index: false, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  inLanguage: 'de',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
    { '@type': 'ListItem', position: 2, name: 'Steuererklärung', item: `${SITE_URL}/de/tax-return` },
    { '@type': 'ListItem', position: 3, name: 'Antrag', item: `${SITE_URL}/de/tax-form` },
  ],
}

export default function GermanTaxFormPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Suspense fallback={null}><FormClient defaultLang="de" /></Suspense>
    </>
  )
}
