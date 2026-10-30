import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from './FormClient'

export const metadata: Metadata = {
  title: 'Submit Your Super Claim',
  description: 'Submit your details to claim your Australian superannuation (DASP). We handle the entire process when you leave Australia.',
  keywords: ['DASP form', 'super claim form Australia', 'superannuation withdrawal form', 'claim super working holiday'],
  alternates: {
    canonical: '/rh84sez58',
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
    locale: 'en_AU',
    url: `${SITE_URL}/rh84sez58`,
    siteName: 'Working Holiday Tax',
    title: 'Submit Your Super Claim',
    description: 'Submit your details to claim your Australian superannuation (DASP).',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`], card: 'summary', title: 'Submit Your Super Claim', description: 'Submit your details to claim your Australian superannuation.' },
  robots: { index: false, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Super', item: `${SITE_URL}/superannuation` },
    { '@type': 'ListItem', position: 3, name: 'Application', item: `${SITE_URL}/rh84sez58` },
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
