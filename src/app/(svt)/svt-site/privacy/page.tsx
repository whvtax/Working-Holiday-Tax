import type { Metadata } from 'next'
import { SVT_LEGAL } from '@/lib/legal/brands'
import { privacySections } from '@/lib/legal/legal-text'
import { LegalDocument } from '@/components/svt/LegalDocument'

// Same text as every brand, only the name, domain and contacts change (Jo, 26 Oct).
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Student Visa Tax collects, uses and protects your personal information.',
  alternates: { canonical: '/privacy' },
  // Same text as the other brand's legal page, so kept out of search (Jo, 27 Oct).
  robots: { index: false, follow: true },
}

export default function SvtPrivacy() {
  return (
    <LegalDocument
      title="Privacy Policy"
      updated="Last updated: May 2026. We are committed to protecting your privacy."
      intro="We are committed to protecting your privacy and handling your personal information responsibly."
      sections={privacySections(SVT_LEGAL)}
    />
  )
}
