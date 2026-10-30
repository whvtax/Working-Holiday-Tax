import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from '@/app/(site)/rh84sez58/FormClient'

export const metadata: Metadata = {
  title: 'Superannuation beim Abschied von Australien',
  description: 'Schick uns deine Angaben zu deiner Superannuation, wenn du Australien verlässt. Wir melden uns mit den nächsten Schritten bei dir.',
  keywords: ['Super Auszahlung Antrag', 'DASP beantragen', 'Super Refund Working Holiday', 'Super Formular Deutsch', 'Departing Australia Superannuation Payment Antrag', 'Super zurückholen Australien', 'WHV Super Auszahlung Formular', 'Backpacker Super Antrag'],
  alternates: {
    canonical: '/de/rh84sez58',
    languages: {
      'en': '/rh84sez58', 'en-AU': '/rh84sez58',
      'de': '/de/rh84sez58',
      'ja': '/ja/rh84sez58',
      'x-default': '/rh84sez58',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/rh84sez58`,
    siteName: 'Working Holiday Tax',
    title: 'Superannuation beim Abschied von Australien',
    description: 'Schick uns deine Angaben zu deiner Superannuation.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`], card: 'summary', title: 'Superannuation beim Abschied von Australien', description: 'Schick uns deine Angaben zu deiner Superannuation.' },
  robots: { index: false, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  inLanguage: 'de',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
    { '@type': 'ListItem', position: 2, name: 'Super', item: `${SITE_URL}/de/superannuation` },
    { '@type': 'ListItem', position: 3, name: 'Antrag', item: `${SITE_URL}/de/rh84sez58` },
  ],
}

export default function GermanSuperFormPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FormClient defaultLang="de" />
    </>
  )
}
