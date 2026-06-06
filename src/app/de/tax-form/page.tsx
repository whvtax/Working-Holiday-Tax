import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from '@/app/tax-form/FormClient'

export const metadata: Metadata = {
  title: 'Steuererklärungsantrag stellen | Working Holiday Tax',
  description: 'Reiche deine australische Steuererklärung als Working Holiday Maker online ein. Registrierter Steueragent – meistens innerhalb von 24 Stunden eingereicht beim ATO.',
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
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/tax-form`,
    siteName: 'Working Holiday Tax',
    title: 'Steuererklärungsantrag stellen',
    description: 'Schick uns deine Daten zur Steuererklärung.',
  },
  twitter: { card: 'summary', title: 'Steuererklärungsantrag stellen', description: 'Schick uns deine Daten zur Steuererklärung.' },
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
      <FormClient defaultLang="de" />
    </>
  )
}
