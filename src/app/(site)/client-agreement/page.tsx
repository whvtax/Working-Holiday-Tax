import type { Metadata } from 'next'
import { LegalDoc } from '@/components/wht/LegalBlocks'
import { SITE_URL } from '@/lib/constants'
import { WHT_LEGAL } from '@/lib/legal/brands'
import { agentDisclosure, clientAgreementIntro, clientAgreementSections } from '@/lib/legal/legal-text'

const sections = clientAgreementSections(WHT_LEGAL)
const disclosure = agentDisclosure(WHT_LEGAL)

export const metadata: Metadata = {
  title: 'Client Agreement',
  description: 'Working Holiday Tax client agreement.',
  alternates: {
    canonical: '/client-agreement',
    languages: {
      'en': '/client-agreement', 'en-AU': '/client-agreement',
      'de': '/de/client-agreement',
      'ja': '/ja/client-agreement',
      'x-default': '/client-agreement',
    },
  },
  // Force the same share image as the homepage for every link to this page.
  openGraph: {
    url: `${SITE_URL}/client-agreement`,
    title: 'Client Agreement',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${SITE_URL}/og-image.png`],
  },
}


export default function ClientAgreementPage() {
  return (
    <LegalDoc
      kicker="Legal"
      title="Client Agreement"
      sub="Last updated: September 2026. By using our services you agree to these terms."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Client Agreement' }]}
      notice={<>
        {disclosure.lead}{' '}
        <strong>{disclosure.agent}</strong>.
      </>}
      intro={clientAgreementIntro(WHT_LEGAL)}
      sections={sections}
    />
  )
}
