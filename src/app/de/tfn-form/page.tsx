import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
// Reuse the English form - it supports defaultLang prop
import { FormClient } from '@/app/tfn-form/FormClient'

export const metadata: Metadata = {
  title: 'TFN-Antrag stellen | Working Holiday Tax',
  description: 'Schick uns deine Daten, um eine Tax File Number zu beantragen. Wir reichen deinen Antrag beim ersten Mal korrekt ein - meistens innerhalb von 28 Tagen.',
  keywords: ['TFN Antrag Formular', 'TFN online beantragen', 'TFN Formular Working Holiday', 'TFN Antrag absenden', 'Tax File Number beantragen', 'TFN für Deutsche', 'australische Steuernummer Antrag', 'TFN Antragsformular Australien'],
  alternates: {
    canonical: '/de/tfn-form',
    languages: {
      'en-AU': '/tfn-form',
      'de': '/de/tfn-form',
      'ja': '/ja/tfn-form',
      'x-default': '/tfn-form',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/tfn-form`,
    siteName: 'Working Holiday Tax',
    title: 'TFN-Antrag stellen',
    description: 'Schick uns deine Daten zur TFN-Beantragung.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`], card: 'summary', title: 'TFN-Antrag stellen', description: 'Schick uns deine Daten zur TFN-Beantragung.' },
  robots: { index: false, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  inLanguage: 'de',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
    { '@type': 'ListItem', position: 2, name: 'TFN', item: `${SITE_URL}/de/tfn` },
    { '@type': 'ListItem', position: 3, name: 'Antrag', item: `${SITE_URL}/de/tfn-form` },
  ],
}

export default function GermanTFNFormPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FormClient defaultLang="de" />
    </>
  )
}
