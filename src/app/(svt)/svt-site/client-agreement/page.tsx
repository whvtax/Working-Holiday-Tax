import type { Metadata } from 'next'
import { SVT_LEGAL } from '@/lib/legal/brands'
import { agentDisclosure, clientAgreementIntro, clientAgreementSections } from '@/lib/legal/legal-text'
import { LegalDocument } from '@/components/svt/LegalDocument'

// Same text as every brand, only the name, domain and contacts change (Jo, 26 Oct).
export const metadata: Metadata = {
  title: 'Client Agreement',
  description: 'The terms of the Student Visa Tax service.',
  alternates: { canonical: '/client-agreement' },
}

export default function SvtClientAgreement() {
  const d = agentDisclosure(SVT_LEGAL)
  return (
    <LegalDocument
      title="Client Agreement"
      updated="Last updated: September 2026. By using our services you agree to these terms."
      box={<p>{d.lead} <strong>{d.agent}</strong>.</p>}
      intro={clientAgreementIntro(SVT_LEGAL)}
      sections={clientAgreementSections(SVT_LEGAL)}
    />
  )
}
