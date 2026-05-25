import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from '@/app/super-form/FormClient'

export const metadata: Metadata = {
  title: 'Super-Auszahlung beantragen (DASP) | Working Holiday Tax',
  description: 'Beantrage deine Super-Auszahlung (DASP), wenn du Australien verlässt. Wir kümmern uns um den kompletten Prozess.',
  keywords: ['Super Auszahlung Antrag', 'DASP beantragen', 'Super Refund Working Holiday', 'Super Formular Deutsch'],
  alternates: {
    canonical: '/de/super-form',
    languages: {
      'en-AU': '/super-form',
      'de': '/de/super-form',
      'x-default': '/super-form',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/super-form`,
    siteName: 'Working Holiday Tax',
    title: 'Super-Auszahlung beantragen (DASP)',
    description: 'Beantrage deine Super-Auszahlung, wenn du Australien verlässt.',
  },
  twitter: { card: 'summary', title: 'Super-Auszahlung beantragen', description: 'Beantrage deine Super-Auszahlung, wenn du Australien verlässt.' },
  robots: { index: false, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
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
