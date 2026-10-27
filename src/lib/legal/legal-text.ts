// ============================================================
// The legal text, shared by every brand (Jo, 26 Oct: the Client Agreement and
// the Privacy Policy are the same on every site, only the name changes).
// Edit the wording here once and every brand's page follows.
// ============================================================
import { AGENT_NAME, AGENT_ABN, AGENT_TPB } from '@/lib/constants'

export type LegalSection = {
  title: string
  body?: string
  items?: string[]
}

export interface LegalBrand {
  /** The trading name, as it appears in the text. */
  name: string
  /** The bare domain, e.g. workingholidaytax.com.au */
  domain: string
  email: string
  phone: string
}

export function clientAgreementSections(b: LegalBrand): LegalSection[] {
  return [
  {
    title: '1. Definitions',
    body: 'For the purposes of this Agreement:',
    items: [
      'Client means the individual who uses the Service and enters into this Agreement.',
      `Provider means ${b.name}, operating under the supervision of a registered tax agent as outlined above.`,
      'Service means the tax-related services provided by the Provider, including tax return preparation, lodgment, and related support for Australian tax matters.',
      'Review means the assessment carried out by the Provider of the Client\u2019s income, residency position and entitlements, in order to identify the deductions, offsets and exemptions available to the Client. The Review forms part of the single engagement described in clause 3 and is not separately charged.',
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
    body: 'Our service is a single engagement. We review your circumstances, including your residency position for tax purposes, any Medicare levy exemption available to you and the deductions that apply to the work you actually did, and we then prepare and lodge your tax return based on the information you provide. The applicable fee is disclosed to you and accepted by you before the engagement begins, and is payable in advance. All final tax assessments, refunds, or decisions are made solely by the ATO. We do not guarantee:',
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
    body: 'Our service has a single fee, which depends on the type of income you received. The applicable fee is disclosed to you and accepted by you before any work begins, and is payable in advance.',
    items: [
      'Tax return, TFN income only (AUD $220, GST inclusive): the full engagement, covering the Review of your circumstances and the preparation and lodgment of your Tax Return.',
      'Tax return, TFN and ABN income (AUD $385, GST inclusive): as above, where you also received income under an Australian Business Number, which requires your business income and expenses to be reconciled and your GST position considered.',
      'The fee is charged for the Review and the professional work performed. It is a fixed amount and is never calculated as a percentage of your Refund. Whether a Refund is paid, how large it is, or whether you owe tax is determined solely by the ATO.',
      'Refund guarantee: if the ATO pays you a Refund and that Refund is less than the fee you paid, the Provider will refund you the difference between the fee and the Refund, once the ATO has issued your Notice of Assessment. The guarantee applies to the tax return the fee was paid for and to the Refund as assessed by the ATO before any offset under clause 22. It does not apply to a review of a return you have already lodged yourself or through someone else: that fee is charged for the review itself and is payable whatever the outcome.',
      'If no Refund is paid, including where the ATO assesses that you owe money, the fee covers the work completed and is non-refundable, subject only to your rights under the Australian Consumer Law. The fee is likewise not refundable once the Review has begun, except under the guarantee above.',
      'Return prepared and awaiting your approval: if we have completed your Tax Return and made it available to you for review, approval or signature, the fee is payable in full, whether or not you subsequently authorise us to lodge it. At that point the work has been performed and delivered; only lodgment, which is an administrative step, remains outstanding. This does not apply where you withdraw because we have failed to provide the Service with due care and skill, or otherwise failed to meet the consumer guarantees under the Australian Consumer Law.',
      'Work outside the scope of a standard individual return (for example prior-year returns, additional business schedules, or amendments to a previously lodged return) will be separately quoted and agreed in writing before that work begins.',
      'Nothing in this clause limits, excludes or modifies any right or remedy you may have under the Australian Consumer Law.',
    ],
  },
  {
    title: '7. Payment Terms',
    body: 'The fee is payable in advance. Once payment has been received we send you the full questionnaire and begin work. Payment does not affect or guarantee your Refund or ATO outcome. The fee is refundable only under the refund guarantee in clause 6.',
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
    body: `All services provided via ${b.domain} are delivered by ${b.name}, operating under the supervision of a registered tax agent: ${AGENT_NAME}, ABN: ${AGENT_ABN}, Tax Agent Number: ${AGENT_TPB}.`,
  },
  {
    title: '22. Refunds, ATO Debts and Offsets',
    body: 'Your Refund is paid by the ATO, not by the Provider. You should be aware that:',
    items: [
      'The ATO may reduce or withhold your Refund to offset an existing debt, including a tax debt, a Higher Education Loan Program (HELP) debt, a Child Support liability, or a debt owed to another government agency.',
      'An offset of this kind does not change the fee payable under clause 6, because the amount offset has been applied to a debt you owed rather than lost. The fee is charged for the professional work performed, not for the size of the Refund you ultimately receive.',
      'The Refund is paid directly into the bank account you nominate. The Provider does not receive, hold or deduct fees from your Refund.',
      'You are responsible for the accuracy of the bank account details you provide. The Provider is not liable for a Refund paid to an incorrect account where those details were supplied by you.',
      'Where you nominate an overseas account, payment timing and any bank charges are determined by the ATO and the financial institutions involved.',
    ],
  },
  {
    title: '23. Cancellation and Cooling-off',
    body: 'You may cancel this Agreement at any time by notifying us in writing. The consequences are as follows:',
    items: [
      'Before we begin work on your Tax Return, the fee is refunded to you in full.',
      'Once we have begun work, clause 6 determines what is payable.',
      'If this Agreement is an unsolicited consumer agreement under the Australian Consumer Law (for example, where we first approached you), you have a statutory cooling-off period of 10 business days during which you may terminate the Agreement, and we will not supply chargeable services or accept payment during that period unless you ask us to and the law permits it.',
      'Nothing in this clause limits your statutory rights to a remedy where the Service is not supplied with due care and skill.',
    ],
  },
  {
    title: '24. Complaints and Concerns',
    body: 'If you are not satisfied with any aspect of the Service, we want to hear about it and we will work with you to resolve it:',
    items: [
      'Contact us in the first instance using the details on our contact page. We will acknowledge your complaint and aim to respond within 14 days.',
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
}

export function privacySections(b: LegalBrand): LegalSection[] {
  return [
  {
    title: '1. Introduction',
    body: `This Privacy Policy explains how ${b.name} ("we", "us", "our") collects, uses, discloses, and protects your personal information in accordance with the Privacy Act 1988 (Cth), the Australian Privacy Principles (APPs), and the Notifiable Data Breaches (NDB) scheme. We also comply with our obligations to the ATO and relevant regulators, including strict confidentiality requirements. By using our website or engaging our services, you consent to the collection and use of your information as described in this Privacy Policy.`,
  },
  {
    title: '2. General Information Disclaimer',
    body: 'The information provided on our website is for general informational purposes only and does not constitute personal tax advice. For advice specific to your individual circumstances, you should consult a tax agent or qualified professional.',
  },
  {
    title: '3. Information We Collect',
    body: 'We may collect personal information necessary to provide our services, including:',
    items: [
      'Full name and contact details (email, phone, address).',
      'Tax File Number (TFN) and ATO correspondence.',
      'Income, employment, and financial information.',
      "Identification documents (such as passport or driver's licence).",
      'Bank account details (required for refunds).',
      'Information provided through forms, email, phone, or website interactions.',
      'Non-identifiable data such as IP address, browser type, and pages visited.',
    ],
  },
  {
    title: '4. How We Use Your Information',
    body: 'We use your personal information to:',
    items: [
      'Prepare and lodge tax returns with the Australian Taxation Office (ATO).',
      'Verify identity and comply with legal and regulatory obligations.',
      'Provide tax-related services and support.',
      'Communicate with you regarding your tax matters.',
      'Improve our services and customer experience.',
      'Send service-related updates (you may opt out of marketing communications at any time).',
    ],
  },
  {
    title: '5. Data Security',
    body: 'We take reasonable steps to protect your personal information from misuse, loss, or unauthorised access. This includes:',
    items: [
      'Encrypted website connections (SSL).',
      'Secure storage systems with restricted access.',
      'Access controls limited to authorised personnel.',
      'Confidentiality obligations for all staff and contractors.',
    ],
  },
  {
    title: '6. Cookies and Website Tracking',
    body: 'We use cookies and analytics tools (including Google Analytics) to understand website usage, improve user experience, and monitor performance and traffic. You may disable cookies through your browser settings. By continuing to use our website, you consent to the use of cookies in accordance with this Policy.',
  },
  {
    title: '7. Third-Party Disclosure',
    body: 'We do not sell or trade your personal information. We may share limited information with:',
    items: [
      'Trusted service providers assisting in operations or communications.',
      'Regulatory authorities such as the ATO where required by law.',
    ],
  },
  {
    title: '8. Data Retention',
    body: 'We retain personal and tax-related records for a minimum of 5 to 7 years in accordance with Australian taxation and regulatory requirements. After this period, information is securely destroyed or de-identified unless required for ongoing legal, compliance, or service obligations.',
  },
  {
    title: '9. Your Rights',
    body: 'You have the right to:',
    items: [
      'Access personal information we hold about you.',
      'Request correction of inaccurate information.',
      'Request deletion of information, subject to legal obligations.',
      'Opt out of marketing communications at any time.',
    ],
  },
  {
    title: '10. Complaints and Dispute Resolution',
    body: 'If you have a concern about how your personal information is handled, you may contact us in writing. We will respond within 30 days. If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC): www.oaic.gov.au.',
  },
  {
    title: '11. Contact Us',
    body: 'If you have any questions about this Privacy Policy or how your information is handled, please contact us:',
    items: [
      `Phone: ${b.phone}`,
      `Email: ${b.email}`,
    ],
  },
  ]
}

/** The agent line shown above the Client Agreement. */
export function agentDisclosure(b: LegalBrand): { lead: string; agent: string } {
  return {
    lead: `${b.name} operates under the supervision of a registered tax agent,`,
    agent: `${AGENT_NAME} (ABN: ${AGENT_ABN}), Tax Agent Number ${AGENT_TPB}`,
  }
}

export function clientAgreementIntro(b: LegalBrand): string {
  return `This Agreement is between you (the \u201cClient\u201d) and ${b.name} (the \u201cProvider\u201d) and governs your use of our Australian tax services, including tax return preparation, lodgment, and related support.`
}
