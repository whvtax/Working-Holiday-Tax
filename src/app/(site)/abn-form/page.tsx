import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { FormClient } from './FormClient'

export const metadata: Metadata = {
  title: 'Submit Your ABN Application',
  description: 'Submit your details to register an Australian Business Number. We set up your ABN correctly for your work type.',
  keywords: ['ABN registration form', 'apply ABN online', 'ABN form working holiday', 'register ABN sole trader'],
  alternates: {
    canonical: '/abn-form',
    languages: {
      'en': '/abn-form', 'en-AU': '/abn-form',
      'de': '/de/abn-form',
      'ja': '/ja/abn-form',
      'x-default': '/abn-form',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/abn-form`,
    siteName: 'Working Holiday Tax',
    title: 'Submit Your ABN Application',
    description: 'Submit your details to register an Australian Business Number.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`], card: 'summary', title: 'Submit Your ABN Application', description: 'Submit your details to register an Australian Business Number.' },
  robots: { index: false, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'ABN', item: `${SITE_URL}/abn` },
    { '@type': 'ListItem', position: 3, name: 'Application', item: `${SITE_URL}/abn-form` },
  ],
}

export default function ABNFormPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FormClient />
    </>
  )
}
