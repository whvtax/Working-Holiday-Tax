import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
// Reuse the English form - it supports defaultLang prop
import { FormClient } from '@/app/(site)/vukjw4byf/FormClient'

export const metadata: Metadata = {
  title: 'TFN online beantragen (417 und 462)',
  description: 'Schick uns deine Daten für den Antrag auf eine Tax File Number. Wir reichen ihn beim ersten Mal korrekt ein, die Nummer kommt meist innerhalb von 28 Tagen.',
  keywords: ['TFN Antrag Formular', 'TFN online beantragen', 'TFN Formular Working Holiday', 'TFN Antrag absenden', 'Tax File Number beantragen', 'TFN für Deutsche', 'australische Steuernummer Antrag', 'TFN Antragsformular Australien'],
  alternates: {
    canonical: '/de/vukjw4byf',
    languages: {
      'en': '/vukjw4byf', 'en-AU': '/vukjw4byf',
      'de': '/de/vukjw4byf',
      'ja': '/ja/vukjw4byf',
      'x-default': '/vukjw4byf',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/vukjw4byf`,
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
    { '@type': 'ListItem', position: 3, name: 'Antrag', item: `${SITE_URL}/de/vukjw4byf` },
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
