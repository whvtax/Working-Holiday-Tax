import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from '@/app/abn-form/FormClient'

export const metadata: Metadata = {
  title: 'ABN-Antrag stellen | Working Holiday Tax',
  description: 'Schick uns deine Daten zur ABN-Registrierung. Wir kümmern uns um den kompletten Antrag.',
  keywords: ['ABN Antrag Formular', 'ABN online beantragen', 'ABN Formular Working Holiday', 'ABN Antrag absenden'],
  alternates: {
    canonical: '/de/abn-form',
    languages: {
      'en-AU': '/abn-form',
      'de': '/de/abn-form',
      'x-default': '/abn-form',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/abn-form`,
    siteName: 'Working Holiday Tax',
    title: 'ABN-Antrag stellen',
    description: 'Schick uns deine Daten zur ABN-Registrierung.',
  },
  twitter: { card: 'summary', title: 'ABN-Antrag stellen', description: 'Schick uns deine Daten zur ABN-Registrierung.' },
  robots: { index: false, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
    { '@type': 'ListItem', position: 2, name: 'ABN', item: `${SITE_URL}/de/abn` },
    { '@type': 'ListItem', position: 3, name: 'Antrag', item: `${SITE_URL}/de/abn-form` },
  ],
}

export default function GermanABNFormPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FormClient defaultLang="de" />
    </>
  )
}
