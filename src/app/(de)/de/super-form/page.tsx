import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from '@/app/(site)/super-form/FormClient'

export const metadata: Metadata = {
  title: 'Superauszahlung (DASP) beantragen',
  description: 'Nach dem Rückflug holen wir deine Super zurück. Wir reichen den Antrag bei deinem Superfonds und beim ATO ein, die Auszahlung geht auf dein Konto.',
  keywords: ['Super Auszahlung Antrag', 'DASP beantragen', 'Super Refund Working Holiday', 'Super Formular Deutsch', 'Departing Australia Superannuation Payment Antrag', 'Super zurückholen Australien', 'WHV Super Auszahlung Formular', 'Backpacker Super Antrag'],
  alternates: {
    canonical: '/de/super-form',
    languages: {
      'en': '/super-form', 'en-AU': '/super-form',
      'de': '/de/super-form',
      'ja': '/ja/super-form',
      'x-default': '/super-form',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/super-form`,
    siteName: 'Working Holiday Tax',
    title: 'Superauszahlung beantragen (DASP)',
    description: 'Beantrage deine Superauszahlung, wenn du Australien verlässt.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`], card: 'summary', title: 'Superauszahlung beantragen', description: 'Beantrage deine Superauszahlung, wenn du Australien verlässt.' },
  robots: { index: false, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  inLanguage: 'de',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
    { '@type': 'ListItem', position: 2, name: 'Super', item: `${SITE_URL}/de/superannuation` },
    { '@type': 'ListItem', position: 3, name: 'Antrag', item: `${SITE_URL}/de/super-form` },
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
