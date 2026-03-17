import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { AGENT_NAME, AGENT_ABN, AGENT_TPB } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Client Agreement',
  description: 'Working Holiday Tax client agreement and terms of service.',
}

const sections = [
  { title:'1. Acceptance of terms',  body:'By using our services you confirm you have read, understood, and agreed to this Agreement. It governs your use of our Australian tax services including preparation and lodgement of tax returns and related assistance.' },
  { title:'2. Fees and charges',     body:'The standard fee for lodging a TFN tax return is AUD $200 + GST, subject to complexity. Additional fees for complex returns will be communicated before submission. All fees are non-refundable unless otherwise specified in writing.' },
  { title:'3. Payment terms',        body:'Fees are due upon submission of your tax return. Payment may be made via bank transfer or card. Payment does not guarantee a specific tax outcome or refund amount.' },
  { title:'4. Your responsibilities',body:'You are solely responsible for the accuracy and completeness of all information provided. You must promptly notify us of any changes. You agree to indemnify us for losses arising from false, misleading, or incomplete information.' },
  { title:'5. Bank account details', body:'You must provide accurate bank account details for an account you own and control. We are not responsible for loss of funds resulting from incorrect bank details you provide.' },
  { title:'6. Privacy',              body:'Your personal information is handled in accordance with the Privacy Act 1988 (Cth) and our Privacy Policy. We never sell or trade your personal information to third parties.' },
  { title:'7. Limitation of liability', body:'Our responsibility is limited to preparing and lodging your return based on the information you provide. We do not guarantee any specific financial outcome or refund amount.' },
  { title:'8. Governing law',        body:'This Agreement is governed by the laws of Victoria, Australia. Disputes shall first be attempted to resolve via mediation before court proceedings.' },
]

export default function ClientAgreementPage() {
  return (
    <>
      <PageHeader kicker="Legal" title="Client Agreement" titleEm=""
        sub="Last updated: July 1, 2024. By using our services you agree to these terms."
        breadcrumbs={[{label:'Home',href:'/'},{label:'Client Agreement'}]} />

      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl">
            <div className="rounded-xl px-5 py-4 mb-8" style={{ background: "#EAF6F1", border: "1px solid #C8EAE0" }}>
              <p className="text-[13px] font-light text-body leading-[1.75]">
                Working Holiday Tax operates under the supervision of a registered tax agent,{' '}
                <strong className="font-semibold text-ink">{AGENT_NAME} (ABN: {AGENT_ABN}), Tax Agent Number {AGENT_TPB}</strong>.
              </p>
            </div>
            {sections.map((s,i) => (
              <div key={i} className={`mb-7 reveal delay-${(i%4)+1}`}>
                <h2 className="font-serif text-[16px] font-bold text-ink mb-2">{s.title}</h2>
                <p className="text-[13px] font-light text-body leading-[1.75]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
