import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from './FormClient'

export const metadata: Metadata = {
  title: 'Submit Your Tax Return | Working Holiday Tax',
  description: 'Submit your details and documents to lodge your Australian tax return. We prepare and lodge everything for you and make sure you claim every deduction you are entitled to.',
  keywords: ['tax return form Australia', 'submit tax return WHV', 'lodge tax return working holiday', 'tax return application'],
  alternates: {
    canonical: '/tax-form',
    languages: {
      'en-AU': '/tax-form',
      'de': '/de/tax-form',
      'ja': '/ja/tax-form',
      'x-default': '/tax-form',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/tax-form`,
    siteName: 'Working Holiday Tax',
    title: 'Submit Your Tax Return',
    description: 'Submit your details and documents to lodge your Australian tax return.',
  },
  twitter: { card: 'summary', title: 'Submit Your Tax Return', description: 'Submit your details to lodge your Australian tax return.' },
  robots: { index: false, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Tax Return', item: `${SITE_URL}/tax-return` },
    { '@type': 'ListItem', position: 3, name: 'Application', item: `${SITE_URL}/tax-form` },
  ],
}

export default function TaxFormPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FormClient />
    </>
  )
}
