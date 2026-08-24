import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from './FormClient'

export const metadata: Metadata = {
  title: 'Submit Your Tax Return',
  description: 'Submit your details and documents to lodge your Australian tax return. We prepare everything and maximise your refund.',
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
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/tax-form`,
    siteName: 'Working Holiday Tax',
    title: 'Submit Your Tax Return',
    description: 'Submit your details and documents to lodge your Australian tax return.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`], card: 'summary', title: 'Submit Your Tax Return', description: 'Submit your details to lodge your Australian tax return.' },
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
      <Suspense fallback={null}><FormClient /></Suspense>
    </>
  )
}
