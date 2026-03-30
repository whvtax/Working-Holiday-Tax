import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { AGENT_NAME, AGENT_ABN, AGENT_TPB } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Client Agreement',
  description: 'Working Holiday Tax client agreement and terms of service.',
  alternates: { canonical: '/client-agreement' },
}

const sections = [
  {
    title: '1. Definitions',
    body: 'For the purposes of this Agreement: Client means the individual using the Service and entering into this Agreement. Provider means Working Holiday Tax, operating under the supervision of a registered tax agent as defined above. Service means tax-related services provided by the Provider, including preparation, lodgment, and advisory support for Australian tax returns. Tax Return means the official Australian tax return prepared and lodged on behalf of the Client with the Australian Taxation Office (ATO). Refund means any refund, payment, or credit issued by the ATO to the Client\'s nominated account.',
  },
  {
    title: '2. Acceptance of Terms',
    body: 'By registering for or using the Service, you agree to be bound by this Agreement in its entirety. This Agreement constitutes the entire understanding between the Client and the Provider, superseding any prior communications or representations.',
  },
  {
    title: '3. Bank Account Details and Liability',
    body: 'You must provide accurate bank account details, including BSB and account number, for an account you own and control. The Provider is not responsible for any errors, misplacement, or loss of funds resulting from incorrect bank details. You acknowledge that all responsibility for verifying account information rests with you.',
  },
  {
    title: '4. Intellectual Property',
    body: 'The Service and all associated materials contain copyrighted content, trademarks, and other proprietary information protected under Australian law. Except as explicitly permitted, no content may be copied, downloaded, redistributed, or commercially exploited without written consent from the Provider. Clients are granted limited, personal use rights to documents produced for their own tax purposes.',
  },
  {
    title: '5. Fees and Charges',
    body: 'The standard fee for lodging a Tax File Number (TFN) tax return is AUD $200 + GST, subject to complexity. Additional fees for complex returns will be communicated before submission. All fees are non-refundable unless otherwise specified in writing.',
  },
  {
    title: '6. Payment Terms',
    body: 'Fees are due upon submission of your tax return. Payment may be made via bank transfer or credit card. Payment does not guarantee a tax refund or specific financial outcome. You may request supporting documentation detailing charges applied to your account.',
  },
  {
    title: '7. Use of the Service',
    body: 'You are solely responsible for accuracy, completeness, and truthfulness of all information provided. You irrevocably appoint the Provider as your authorized agent to lodge your tax return with the ATO. You must promptly notify the Provider of any changes to submitted information. You agree to indemnify the Provider for losses arising from false, misleading, or incomplete information. Failure to provide accurate information may result in penalties, termination, or legal action.',
  },
  {
    title: '8. Access for Compliance and Audit',
    body: 'You authorize the Provider to share information with the Tax Practitioners Board, auditors, or reviewers as required for compliance, audit, or quality assurance purposes.',
  },
  {
    title: '9. Changes to Agreement',
    body: 'The Provider may modify this Agreement at any time. Changes will be posted on the Service or communicated via email or prepaid post. Continued use constitutes acceptance of changes.',
  },
  {
    title: '10. Continued Use Constitutes Acceptance',
    body: 'The Provider may suspend, modify, or discontinue any part of the Service at any time, without prior notice.',
  },
  {
    title: '11. Disclaimer of Warranties',
    body: 'Use of the Service is at your own risk. The Provider does not guarantee any refund or specific financial outcome. The Provider\'s responsibility is limited to preparing and lodging your tax return based on the information you provide.',
  },
  {
    title: '12. Tax Agent Authority',
    body: 'By using the Service, you authorize the Provider to add your TFN to the Provider\'s ATO tax agent list, request extensions of time where applicable, and receive all ATO correspondence on your behalf.',
  },
  {
    title: '13. Use of Personal Information',
    body: 'You consent to the Provider obtaining personal information from the ATO, government agencies, banks, or information you provide. Information will be used for preparation and lodgment of your tax return. Cancellation requests must be received at least 24 hours prior to lodgment. Data processing is conducted in accordance with the Privacy Act 1988 (Cth).',
  },
  {
    title: '14. Privacy',
    body: 'Personal information is handled according to applicable laws and the Provider\'s Privacy Policy. For full details, review our Privacy Policy.',
  },
  {
    title: '15. Lodgment Authorization',
    body: 'By accepting communications, you authorize the Provider to lodge your tax return with the ATO upon receipt of a signed tax return (digital or manual), without further confirmation.',
  },
  {
    title: '16. Limitation of Liability',
    body: 'Where law implies conditions that cannot be excluded, they apply. The Provider\'s liability is limited to supplying the service again or covering its cost.',
  },
  {
    title: '17. Indemnity',
    body: 'You agree to indemnify and hold harmless the Provider and affiliates from any claims or losses arising from your use of the Service.',
  },
  {
    title: '18. Binding Communication',
    body: 'Any communication via WhatsApp, email, or other channels is binding, as if sent by post. The Provider may verify identity to prevent misuse.',
  },
  {
    title: '19. Termination',
    body: 'Either party may terminate the Agreement at any time. The Provider may terminate immediately if conduct is unacceptable or there is a breach.',
  },
  {
    title: '20. Use of Subcontractors',
    body: 'The Provider may engage subcontractors in Australia or overseas. The Provider remains fully responsible for the Service and outcomes.',
  },
  {
    title: '21. Declaration',
    body: 'By using the Service, you declare that all information is true and correct, the Provider is authorized to lodge your tax return, and you agree to comply with all terms, understanding that false information may lead to termination or legal consequences.',
  },
  {
    title: '22. Accuracy of Information and Statutory Declaration',
    body: 'You declare that all information provided to the Provider in connection with the Service — including but not limited to personal details, income, employment, bank account information, passport details, and tax file number — is true, complete, and accurate to the best of your knowledge. You acknowledge that knowingly providing false, misleading, or incomplete information to the Provider or to the Australian Taxation Office (ATO) may constitute a criminal offence and may result in significant financial penalties, prosecution, and repayment obligations under Australian tax law, including the Taxation Administration Act 1953 (Cth). You agree to promptly notify the Provider of any error or change in the information you have provided. The Provider bears no responsibility for outcomes arising from inaccurate or incomplete information supplied by the Client.',
  },
  {
    title: '26. Governing Law',
    body: 'This Agreement is governed by the laws of Victoria, Australia. Invalid provisions will be severed without affecting the rest. Disputes shall first be attempted to resolve via mediation before court proceedings.',
  },
  {
    title: '26. Confidentiality',
    body: 'Your information is kept confidential. Disclosure only occurs as required by law or for purposes of fulfilling this Agreement.',
  },
  {
    title: '26. Service Provider Information',
    body: 'All services on workingholidaytax.com.au are provided by Working Holiday Tax, operating under supervision of a registered tax agent, The Accounting Academy Pty Limited (ABN: 26 669 927 959), Tax Agent Number 26233096.',
  },
]

export default function ClientAgreementPage() {
  return (
    <>
      <PageHeader
        kicker="Legal"
        title="Client Agreement"
        titleEm=""
        sub="Last updated: 1 July 2027. By using our services you agree to these terms."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Client Agreement' }]}
      />

      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl">

            {/* Agent disclosure */}
            <div className="rounded-xl px-5 py-4 mb-10" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
              <p className="text-[13px] font-light text-body leading-[1.75]">
                Working Holiday Tax, operating under the supervision of a registered tax agent,{' '}
                <strong className="font-semibold text-ink">{AGENT_NAME} (ABN: {AGENT_ABN}), Tax Agent Number {AGENT_TPB}</strong>.
              </p>
            </div>

            {/* Intro */}
            <p className="text-[13px] font-light text-body leading-[1.75] mb-10">
              By using the Service, you confirm that you have read, understood, and agreed to comply with all terms and conditions set forth in this Agreement between yourself (the &ldquo;Client&rdquo;) and the Provider. This Agreement governs your use of our Australian tax services, including preparation and lodgment of tax returns and related assistance.
            </p>

            {/* Sections */}
            {sections.map((s, i) => (
              <div key={i} className={`mb-7 reveal delay-${(i % 4) + 1}`}>
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
