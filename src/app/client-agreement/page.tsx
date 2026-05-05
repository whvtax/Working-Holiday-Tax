import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { AGENT_NAME, AGENT_ABN, AGENT_TPB } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Client Agreement',
  description: 'Working Holiday Tax client agreement and terms of service.',
  alternates: { canonical: '/client-agreement' },
}

type Section = {
  title: string
  body?: string
  items?: string[]
}

const sections: Section[] = [
  {
    title: '1. Definitions',
    body: 'For the purposes of this Agreement:',
    items: [
      'Client means the individual who uses the Service and enters into this Agreement.',
      'Provider means Working Holiday Tax, operating under the supervision of a registered tax agent as outlined above.',
      'Service means the tax-related services provided by the Provider, including tax return preparation, lodgment, and related support for Australian tax matters.',
      'Tax Return means the Australian income tax return prepared and lodged on behalf of the Client with the Australian Taxation Office (ATO).',
      "Refund means any refund, payment, or credit issued by the ATO and paid to the Client's nominated account.",
    ],
  },
  {
    title: '2. Acceptance of Terms',
    body: 'By accessing or using our Service, you confirm that you have read, understood, and agree to be bound by these Terms. These Terms constitute the entire agreement between you and the Provider and replace any prior communications or representations. By using our Service, you appoint the Provider as your authorised agent to prepare and lodge your tax return with the Australian Taxation Office (ATO) on your behalf.',
  },
  {
    title: '3. Nature of Service',
    body: 'Our service includes preparation and lodgment of tax returns based on information you provide. All final tax assessments, refunds, or decisions are made solely by the ATO. We do not guarantee:',
    items: [
      'Any tax refund amount.',
      'Any specific tax outcome.',
      'Any processing time.',
    ],
  },
  {
    title: '4. Client Responsibility',
    body: 'You are responsible for ensuring all information you provide is accurate, complete, and up to date. Specifically, you agree that:',
    items: [
      'You have provided true and correct information.',
      'You will notify us of any changes.',
      'You are responsible for verifying your bank account details and personal details.',
    ],
  },
  {
    title: '5. Intellectual Property',
    body: 'All materials provided through the Service, including documents, content, and branding, are protected under Australian intellectual property laws. You may not copy, reproduce, distribute, or use any materials for commercial purposes without prior written consent. Clients are granted a limited, non-transferable right to use documents solely for personal tax purposes.',
  },
  {
    title: '6. Fees and Charges',
    items: [
      'Standard tax return service fees start from AUD $200 + GST, depending on complexity.',
      'Any additional fees will be communicated before work is completed.',
      'All fees are non-refundable once work has commenced.',
    ],
  },
  {
    title: '7. Payment Terms',
    body: 'Payment is required upon lodgment of your tax return. Payment does not affect or guarantee your refund or ATO outcome.',
  },
  {
    title: '8. Limitation of Liability',
    body: 'To the maximum extent permitted by law, the Provider is not responsible for:',
    items: [
      'Any decisions, delays, audits, or assessments made by the ATO.',
      'Any financial loss, penalties, or outcomes resulting from ATO actions.',
      'Any issues arising from incorrect, incomplete, or misleading information provided by the Client.',
    ],
  },
  {
    title: '9. Indemnity',
    body: 'You agree to indemnify and hold harmless the Provider, including its directors, employees, contractors, and affiliates, from and against any claims, losses, or expenses arising out of or in connection with:',
    items: [
      'Any inaccurate, incomplete, or misleading information provided by you.',
      'Your failure to comply with your tax obligations.',
      'Any ATO assessments, audits, reviews, or enforcement actions.',
    ],
  },
  {
    title: '10. Data & Privacy Compliance',
    body: 'You authorise us to collect, use, and share relevant personal information as required to provide the Service, including with the ATO, the Tax Practitioners Board (TPB), and other government agencies where required by law. Your information will only be used for:',
    items: [
      'Tax preparation, lodgment, and compliance.',
      'Related administrative purposes.',
    ],
  },
  {
    title: '11. Disclaimer of Warranties',
    body: 'Use of the Service is at your own risk. The Provider does not guarantee any tax refund or specific financial outcome. Our responsibility is limited to preparing and lodging your tax return based on the information you provide. The Provider may also suspend, modify, or discontinue any part of the Service at any time without prior notice.',
  },
  {
    title: '12. Privacy',
    body: 'Personal information is collected, used, and stored in accordance with applicable Australian privacy laws and our Privacy Policy. We only use your information for the purpose of providing the Service, including tax preparation, lodgment, and related compliance obligations. For full details on how your data is handled, please refer to our Privacy Policy.',
  },
  {
    title: '13. Lodgment Authorisation',
    body: 'By providing a signed or confirmed tax return (digital or manual), you authorise the Provider to lodge your tax return with the Australian Taxation Office (ATO) on your behalf. No additional confirmation will be required once authorisation has been received.',
  },
  {
    title: '14. Binding Communications',
    body: 'All communications made via email, WhatsApp, SMS, or other digital platforms are considered valid, binding, and equivalent to written communication. The Provider may take reasonable steps to verify identity to prevent fraud or misuse of the Service.',
  },
  {
    title: '15. Termination',
    body: 'Either party may terminate this Agreement at any time. The Provider may immediately suspend or terminate the Service if:',
    items: [
      'There is a breach of these Terms.',
      'Fraudulent, misleading, or unlawful behaviour is suspected.',
      'Continued service would create legal or compliance risk.',
    ],
  },
  {
    title: '16. Use of Subcontractors',
    body: 'The Provider may engage qualified subcontractors or third-party service providers, including those located outside Australia, to assist in delivering the Service. The Provider remains fully responsible for the delivery of the Service in accordance with this Agreement.',
  },
  {
    title: '17. Declaration',
    body: 'By using the Service, you confirm that:',
    items: [
      'All information provided is true, complete, and accurate.',
      'You authorise the Provider to act on your behalf for tax lodgment purposes.',
      'You understand that false or misleading information may result in penalties, termination of service, or legal consequences.',
      'You agree to comply with all terms of this Agreement.',
    ],
  },
  {
    title: '18. Accuracy of Information and Statutory Declaration',
    body: 'You declare that all information provided to the Provider — including personal details, income, employment information, bank details, passport information, and Tax File Number (TFN) — is true, complete, and accurate. You acknowledge that:',
    items: [
      'Providing false or misleading information to the Provider or the ATO may constitute an offence under Australian law, including the Taxation Administration Act 1953 (Cth), and may result in penalties, prosecution, or repayment obligations.',
      'You agree to promptly notify the Provider of any changes or corrections to the information provided.',
      'The Provider is not liable for any outcomes or losses arising from inaccurate or incomplete information supplied by the Client.',
    ],
  },
  {
    title: '19. Governing Law',
    body: 'This Agreement is governed by the laws of Victoria, Australia. If any provision is found to be invalid or unenforceable, the remaining provisions will continue in full force. Any dispute will first be attempted to be resolved through good faith negotiation or mediation before legal proceedings.',
  },
  {
    title: '20. Confidentiality',
    body: 'All Client information is treated as confidential and will only be disclosed where:',
    items: [
      'Required by law.',
      'Required by regulatory authorities (including ATO or TPB).',
      'Necessary to perform the Service.',
    ],
  },
  {
    title: '21. Service Provider Information',
    body: `All services provided via workingholidaytax.com.au are delivered by Working Holiday Tax, operating under the supervision of a registered tax agent: ${AGENT_NAME}, ABN: ${AGENT_ABN}, Tax Agent Number: ${AGENT_TPB}.`,
  },
]

export default function ClientAgreementPage() {
  return (
    <>
      <PageHeader
        kicker="Legal"
        title="Client Agreement"
        titleEm=""
        sub="Last updated: May 2026. By using our services you agree to these terms."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Client Agreement' }]}
      />

      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl">

            {/* Agent disclosure */}
            <div className="rounded-xl px-5 py-4 mb-10" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
              <p className="text-[13px] font-light text-body leading-[1.75]">
                Working Holiday Tax operates under the supervision of a registered tax agent,{' '}
                <strong className="font-semibold text-ink">{AGENT_NAME} (ABN: {AGENT_ABN}), Tax Agent Number {AGENT_TPB}</strong>.
              </p>
            </div>

            {/* Intro */}
            <p className="text-[13px] font-light text-body leading-[1.75] mb-10">
              This Agreement is between you (the &ldquo;Client&rdquo;) and Working Holiday Tax (the &ldquo;Provider&rdquo;) and governs your use of our Australian tax services, including tax return preparation, lodgment, and related support.
            </p>

            {/* Sections */}
            {sections.map((s, i) => (
              <div key={i} className={`mb-8 reveal delay-${(i % 4) + 1}`}>
                <h2 className="font-serif text-[16px] font-bold text-ink mb-2">{s.title}</h2>
                {s.body && (
                  <p className="text-[13px] font-light text-body leading-[1.75] mb-2">{s.body}</p>
                )}
                {s.items && (
                  <ul className="mt-2 space-y-1.5">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className="mt-[7px] flex-shrink-0 rounded-full" style={{ width: '5px', height: '5px', minWidth: '5px', background: '#0B5240' }} />
                        <span className="text-[13px] font-light text-body leading-[1.75]">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  )
}
