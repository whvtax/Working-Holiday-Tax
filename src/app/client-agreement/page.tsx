import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { AGENT_NAME, AGENT_ABN, AGENT_TPB, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Client Agreement',
  description: 'Working Holiday Tax client agreement.',
  alternates: {
    canonical: '/client-agreement',
    languages: {
      'en-AU': '/client-agreement',
      'de': '/de/client-agreement',
      'ja': '/ja/client-agreement',
      'x-default': '/client-agreement',
    },
  },
  // Force the same share image as the homepage for every link to this page.
  openGraph: {
    url: `${SITE_URL}/client-agreement`,
    title: 'Client Agreement | Working Holiday Tax',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${SITE_URL}/og-image.png`],
  },
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
      'Eligibility Assessment means the review carried out by the Provider of the Client\u2019s income, residency position and entitlements, in order to identify available deductions, offsets and exemptions and to estimate the Client\u2019s likely Refund.',
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
    body: 'Our service is provided in two stages: an Eligibility Assessment, in which we review your circumstances and identify what you are entitled to claim, and, if you choose to proceed, the preparation and lodgment of your tax return based on the information you provide. Each stage is separately priced under clause 6, and you will be told the applicable fee before any chargeable work begins. All final tax assessments, refunds, or decisions are made solely by the ATO. We do not guarantee:',
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
    body: 'Our service is delivered in two stages, each with its own fee. Both fees are disclosed to you and accepted by you before any chargeable work begins.',
    items: [
      'Eligibility Assessment (AUD $110, GST inclusive): a review of your income, residency position and entitlements, identifying the deductions, offsets and exemptions available to you and estimating your likely refund. This fee is charged for the professional time spent on that review. It is not a charge for lodgment, which is a separate service.',
      'No entitlement, no fee: if the Eligibility Assessment concludes that you are not entitled to a refund, the $110 fee is waived in full and nothing is payable by you.',
      'Full service (AUD $220, GST inclusive): if the Eligibility Assessment identifies an entitlement and you instruct us to prepare and lodge your return, the total fee for the engagement is $220. The $110 Eligibility Assessment fee is credited in full towards that amount, so the total payable never exceeds $220.',
      'If you choose to lodge independently or through another provider: where the Eligibility Assessment has been completed and identifies an entitlement, the $110 Eligibility Assessment fee remains payable for the work already performed. No further amount is payable and you remain free to lodge your return however you choose.',
      'Return prepared and awaiting your approval: if you have instructed us to proceed to preparation and we have completed your Tax Return and made it available to you for review, approval or signature, the full engagement fee of $220 is payable, whether or not you subsequently authorise us to lodge it. At that point the work has been performed and delivered; only lodgment, which is an administrative step, remains outstanding. This does not apply where you withdraw because we have failed to provide the Service with due care and skill, or otherwise failed to meet the consumer guarantees under the Australian Consumer Law.',
      'Where the full engagement fee becomes payable under the paragraph above, no additional charge applies and the prepared Tax Return remains available to you.',
      'Work outside the scope of a standard individual return (for example prior-year returns, business or ABN schedules, or amendments to a previously lodged return) will be separately quoted and agreed in writing before that work begins.',
      'Invoices are payable within 7 days of issue.',
      'Nothing in this clause limits, excludes or modifies any right or remedy you may have under the Australian Consumer Law.',
    ],
  },
  {
    title: '7. Payment Terms',
    body: 'Payment is required upon lodgment of your Tax Return, or, where clause 6 provides that a fee becomes payable before lodgment, upon the completion of the relevant stage of work. Payment does not affect or guarantee your refund or ATO outcome.',
  },
  {
    title: '8. Limitation of Liability',
    body: 'Certain guarantees under the Australian Consumer Law cannot be excluded, restricted or modified, and nothing in this Agreement attempts to do so. Subject to those guarantees, and to the maximum extent permitted by law, the Provider is not responsible for:',
    items: [
      'Any decisions, delays, audits, or assessments made by the ATO.',
      'Any financial loss, penalties, or outcomes resulting from ATO actions.',
      'Any issues arising from incorrect, incomplete, or misleading information provided by the Client.',
      'Where the Provider is liable and the relevant consumer guarantees permit it, the Provider\u2019s liability is limited, at the Provider\u2019s election, to re-supplying the Service or to refunding the fees paid by the Client for the Service.',
    ],
  },
  {
    title: '9. Indemnity',
    body: 'You agree to indemnify the Provider, including its directors, employees and contractors, against reasonable claims, losses and expenses to the extent they are caused by:',
    items: [
      'Any inaccurate, incomplete, or misleading information provided by you.',
      'Your failure to comply with your tax obligations.',
      'This indemnity does not apply to the extent that any claim, loss or expense is caused or contributed to by the Provider\u2019s own negligence, breach of this Agreement, or breach of law.',
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
    body: 'The Provider will supply the Service with due care and skill, as required by the Australian Consumer Law. The Provider does not, however, guarantee any tax refund, refund amount, or specific financial outcome, as these are determined solely by the ATO. Our responsibility is limited to preparing and lodging your tax return based on the information you provide. The Provider may suspend, modify, or discontinue parts of the Service, and where this affects a Service you have already paid for, you will be offered a refund of the affected fees.',
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
    body: 'Either party may terminate this Agreement at any time. Termination does not affect any fee that has already become payable under clause 6 for work completed before termination. The Provider may immediately suspend or terminate the Service if:',
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
    body: 'You declare that all information provided to the Provider - including personal details, income, employment information, bank details, passport information, and Tax File Number (TFN) - is true, complete, and accurate. You acknowledge that:',
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
  {
    title: '22. Refunds, ATO Debts and Offsets',
    body: 'Your Refund is paid by the ATO, not by the Provider. You should be aware that:',
    items: [
      'The ATO may reduce or withhold your Refund to offset an existing debt, including a tax debt, a Higher Education Loan Program (HELP) debt, a Child Support liability, or a debt owed to another government agency.',
      'An offset of this kind does not change the fees payable under clause 6, because those fees are charged for the professional work performed, not for the size of the Refund you ultimately receive.',
      'The Refund is paid directly into the bank account you nominate. The Provider does not receive, hold or deduct fees from your Refund.',
      'You are responsible for the accuracy of the bank account details you provide. The Provider is not liable for a Refund paid to an incorrect account where those details were supplied by you.',
      'Where you nominate an overseas account, payment timing and any bank charges are determined by the ATO and the financial institutions involved.',
    ],
  },
  {
    title: '23. Cancellation and Cooling-off',
    body: 'You may cancel this Agreement at any time by notifying us in writing. The consequences are as follows:',
    items: [
      'Before the Eligibility Assessment begins, no fee is payable.',
      'After the Eligibility Assessment has been completed, clause 6 determines what is payable.',
      'If this Agreement is an unsolicited consumer agreement under the Australian Consumer Law (for example, where we first approached you), you have a statutory cooling-off period of 10 business days during which you may terminate the Agreement, and we will not supply chargeable services or accept payment during that period unless you ask us to and the law permits it.',
      'Nothing in this clause limits your statutory rights to a remedy where the Service is not supplied with due care and skill.',
    ],
  },
  {
    title: '24. Complaints and Concerns',
    body: 'If you are not satisfied with any aspect of the Service, we want to hear about it and we will work with you to resolve it:',
    items: [
      'Contact us in the first instance using the details on our contact page. We will acknowledge your complaint and aim to respond within 14 days.',
      'If your complaint remains unresolved, you may raise it with the Tax Practitioners Board (TPB), which maintains a public register of registered tax agents and handles complaints about registered practitioners, at tpb.gov.au.',
      'You may also seek assistance from the ATO or from the consumer protection agency in your state or territory.',
      'Nothing in this Agreement prevents or discourages you from making a complaint to any regulator.',
    ],
  },
  {
    title: '25. Records and Documents',
    body: 'The Provider retains client records for the periods required by Australian taxation law and TPB obligations, generally at least five years. You may request a copy of the documents you have provided to us, and of the Tax Return prepared for you, at any time and at no charge.',
  },
  {
    title: '26. Changes to this Agreement',
    body: 'The Provider may update these Terms from time to time. The version of these Terms in force at the time you engage us for a particular service applies to that engagement. Material changes will be published on this page with an updated revision date, and any engagement already underway continues under the Terms that applied when it began.',
  },
]

export default function ClientAgreementPage() {
  return (
    <>
      <PageHeader
        kicker="Legal"
        title="Client Agreement"
        titleEm=""
        sub="Last updated: July 2026. By using our services you agree to these terms."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Client Agreement' }]}
      />

      <section className="pt-0 pb-10 lg:pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl">

            {/* Agent disclosure */}
            <div className="rounded-xl px-5 py-4 mb-8" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
              <p className="text-[13px] font-light text-body leading-[1.75]">
                Working Holiday Tax operates under the supervision of a registered tax agent,{' '}
                <strong className="font-semibold text-ink">{AGENT_NAME} (ABN: {AGENT_ABN}), Tax Agent Number {AGENT_TPB}</strong>.
              </p>
            </div>

            {/* Intro */}
            <p className="text-[13px] font-light text-body leading-[1.75] mb-8">
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
