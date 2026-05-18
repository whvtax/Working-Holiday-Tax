import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from './FormClient'

export const metadata: Metadata = {
  title: 'Submit Your Super Claim | Working Holiday Tax',
  description: 'Submit your details to claim your Australian superannuation (DASP). We handle the entire process when you leave Australia.',
  keywords: ['DASP form', 'super claim form Australia', 'superannuation withdrawal form', 'claim super working holiday'],
  alternates: { canonical: '/super-form' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/super-form`,
    siteName: 'Working Holiday Tax',
    title: 'Submit Your Super Claim',
    description: 'Submit your details to claim your Australian superannuation (DASP).',
  },
  twitter: { card: 'summary', title: 'Submit Your Super Claim', description: 'Submit your details to claim your Australian superannuation.' },
  robots: { index: false, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Super', item: `${SITE_URL}/superannuation` },
    { '@type': 'ListItem', position: 3, name: 'Application', item: `${SITE_URL}/super-form` },
  ],
}

export default function SuperFormPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FormClient />
    </>
  )
}
