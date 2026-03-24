import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Working Holiday Tax privacy policy - how we collect, use and protect your personal information.',
}

const sections = [
  {
    title: '1. Introduction',
    body: 'This Privacy Policy explains how we, as a Registered Tax Agent in Australia, collect, use, disclose, and safeguard your personal information in compliance with the Privacy Act 1988 (Cth), the Australian Privacy Principles (APPs), and the Notifiable Data Breaches (NDB) scheme. We are also committed to meeting the professional standards of the Australian Taxation Office (ATO) and the Tax Practitioners Board (TPB) regarding client confidentiality. By using our website or engaging our services, you consent to the practices outlined in this Privacy Policy.',
  },
  {
    title: '2. Disclaimer - No Personal Tax Advice',
    body: 'All information provided on this website is for general purposes of understanding the Australian tax system and does not constitute personal tax advice. For guidance specific to your tax situation, please consult a qualified tax agent.',
  },
  {
    title: '3. Information We Collect',
    body: 'We may collect personal information necessary to provide our tax and advisory services, including but not limited to: full name and contact details (email, phone, mailing address); Tax File Number (TFN) and ATO correspondence; financial records, income and expense information; identification documents such as driver\'s license or passport; employment and business details; and information submitted via our website forms, emails, or telephone enquiries. We also automatically collect non-identifiable information when you use our website, such as IP address and browser type, referring pages and session statistics, and pages visited, time spent, and search queries. This information assists us in maintaining compliance, improving our services, and enhancing your experience.',
  },
  {
    title: '4. How We Use Your Information',
    body: 'Your personal information may be used to prepare and lodge your tax returns and related documents with the ATO; to verify your identity and maintain compliance with TPB regulations; to provide tax, accounting, and advisory services tailored to your needs; to communicate with you regarding your tax matters, appointments, and updates; to comply with legal and regulatory obligations under Australian law; to send relevant updates or communications (you may opt out at any time); and to improve our website, services, and client support. We will never sell or trade your personal information. Disclosure will only occur where required by law or a regulatory authority such as the ATO or TPB, where necessary for delivering the agreed services, or where you have provided explicit consent.',
  },
  {
    title: '5. Data Security',
    body: 'We implement strict security measures to protect your confidential tax and financial information, including Secure Socket Layer (SSL) encryption on our website, secure electronic storage systems with restricted access, physical safeguards for paper records, and access limited to authorized personnel bound by confidentiality obligations. In the event of a data breach likely to result in serious harm, we will notify you and the Office of the Australian Information Commissioner (OAIC) promptly, as required under the NDB scheme.',
  },
  {
    title: '6. Cookies and Website Tracking',
    body: 'Our website uses cookies and analytics tools including Google Analytics to monitor website performance and user experience, personalize your browsing experience, and deliver relevant advertising. You may manage or disable cookies in your browser settings. By continuing to use our site, you consent to the use of cookies in line with this Privacy Policy.',
  },
  {
    title: '7. Third-Party Disclosure',
    body: 'We do not sell, trade, or transfer your information to external parties. However, we may share limited data with trusted service providers who assist us in operating our website or managing communications, and with regulatory authorities such as the ATO or TPB when legally required. All third parties are contractually obligated to protect your data and use it only for authorized purposes.',
  },
  {
    title: '8. Data Retention',
    body: 'In compliance with ATO and TPB requirements, we retain tax records and personal information for a minimum of 5 to 7 years. After this period, data is securely destroyed or anonymized unless required for ongoing services or legal obligations.',
  },
  {
    title: '9. Your Rights',
    body: 'You have the right to access the personal information we hold about you, request corrections to inaccurate or incomplete data, request deletion of personal information subject to legal and compliance obligations, and opt out of marketing communications at any time. To exercise these rights, please contact us using the details below.',
  },
  {
    title: '10. Complaints and Dispute Resolution',
    body: 'If you have concerns about how we handle your personal information, you may submit a written complaint. We will respond within 30 days. If you are unsatisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at oaic.gov.au.',
  },
  {
    title: '11. Contact Us',
    body: `If you have any questions about this Privacy Policy or how your information is handled, please contact our Privacy Officer. Phone: 0424 513 998. Email: ${EMAIL}.`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        kicker="Legal"
        title="Privacy Policy"
        titleEm=""
        sub={<><span className="hidden lg:inline">Last updated: 1 July 2027. We take your privacy seriously.</span><span className="lg:hidden">Last updated: 1 July 2027.<br />We take your privacy seriously.</span></>}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />

      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl">
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
