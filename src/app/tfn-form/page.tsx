import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from './FormClient'

export const metadata: Metadata = {
  title: 'Submit Your TFN Application | Working Holiday Tax',
  description: 'Submit your details to apply for a Tax File Number. We process your application correctly the first time - usually within 28 days.',
  keywords: ['TFN application form', 'apply TFN online', 'TFN form working holiday', 'submit TFN application'],
  alternates: {
    canonical: '/tfn-form',
    languages: {
      'en-AU': '/tfn-form',
      'de': '/de/tfn-form',
      'ja': '/ja/tfn-form',
      'x-default': '/tfn-form',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/tfn-form`,
    siteName: 'Working Holiday Tax',
    title: 'Submit Your TFN Application',
    description: 'Submit your details to apply for a Tax File Number.',
  },
  twitter: { card: 'summary', title: 'Submit Your TFN Application', description: 'Submit your details to apply for a Tax File Number.' },
  robots: { index: false, follow: true },  // forms shouldn't be indexed
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'TFN', item: `${SITE_URL}/tfn` },
    { '@type': 'ListItem', position: 3, name: 'Application', item: `${SITE_URL}/tfn-form` },
  ],
}

export default function TFNFormPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FormClient />
    </>
  )
}
