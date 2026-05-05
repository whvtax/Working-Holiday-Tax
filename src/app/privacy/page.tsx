import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Working Holiday Tax privacy policy - how we collect, use and protect your personal information.',
  alternates: { canonical: '/privacy' },
}

const sections = [
  {
    title: '1. Introduction',
    body: "This Privacy Policy explains how Working Holiday Tax (\"we\", \"us\", \"our\") collects, uses, discloses, and protects your personal information in accordance with the Privacy Act 1988 (Cth), the Australian Privacy Principles (APPs), and the Notifiable Data Breaches (NDB) scheme. We also comply with our obligations as a registered tax agent under the Australian Taxation Office (ATO) and the Tax Practitioners Board (TPB), including strict confidentiality requirements. By using our website or engaging our services, you consent to the collection and use of your information as described in this Privacy Policy.",
  },
  {
    title: '2. General Information Disclaimer',
    body: 'The information provided on our website is for general informational purposes only and does not constitute personal tax advice. For advice specific to your individual circumstances, you should consult a registered tax agent or qualified professional.',
  },
  {
    title: '3. Information We Collect',
    body: "We may collect personal information necessary to provide our services, including but not limited to: full name and contact details (email, phone, address); Tax File Number (TFN) and ATO correspondence; income, employment, and financial information; identification documents (such as passport or driver's licence); bank account details (required for refunds); and information provided through forms, email, phone, or website interactions. We may also collect non-identifiable information automatically, including IP address and browser type, pages visited and session activity, and website usage and interaction data. This information is used to operate, maintain, and improve our services.",
  },
  {
    title: '4. How We Use Your Information',
    body: 'We use your personal information to prepare and lodge tax returns with the Australian Taxation Office (ATO); verify identity and comply with TPB and legal obligations; provide tax-related services and support; communicate with you regarding your tax matters; improve our services and customer experience; and send service-related updates (you may opt out of marketing communications at any time). We do not sell or trade your personal information. We only disclose information where required by law, regulation, or court order; required by the ATO, TPB, or other regulatory bodies; necessary to provide the requested service; or you have given explicit consent.',
  },
  {
    title: '5. Data Security',
    body: 'We take reasonable steps to protect your personal information from misuse, loss, unauthorised access, modification, or disclosure. This includes encrypted website connections (SSL), secure storage systems with restricted access, access controls limited to authorised personnel, and confidentiality obligations for all staff and contractors. In the event of a data breach likely to result in serious harm, we will act in accordance with the Notifiable Data Breaches (NDB) scheme and notify you and the Office of the Australian Information Commissioner (OAIC) where required.',
  },
  {
    title: '6. Cookies and Website Tracking',
    body: 'We use cookies and analytics tools (including Google Analytics) to understand website usage, improve user experience, and monitor performance and traffic. You may disable cookies through your browser settings. By continuing to use our website, you consent to the use of cookies in accordance with this Policy.',
  },
  {
    title: '7. Third-Party Disclosure',
    body: 'We do not sell or trade your personal information. We may share limited information with trusted service providers assisting in operations or communications, and regulatory authorities such as the ATO or TPB where required by law. All third parties are required to protect your information and use it only for authorised purposes.',
  },
  {
    title: '8. Data Retention',
    body: 'We retain personal and tax-related records for a minimum of 5 to 7 years in accordance with Australian taxation and regulatory requirements. After this period, information is securely destroyed or de-identified unless required for ongoing legal, compliance, or service obligations.',
  },
  {
    title: '9. Your Rights',
    body: 'You have the right to access personal information we hold about you; request correction of inaccurate information; request deletion of information, subject to legal obligations; and opt out of marketing communications at any time. To exercise your rights, contact us using the details below.',
  },
  {
    title: '10. Complaints and Dispute Resolution',
    body: 'If you have a concern about how your personal information is handled, you may contact us in writing. We will respond within 30 days. If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC): www.oaic.gov.au.',
  },
  {
    title: '11. Contact Us',
    body: `If you have any questions about this Privacy Policy or how your information is handled, please contact us. Phone: 0424 513 998. Email: ${EMAIL}.`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        kicker="Legal"
        title="Privacy Policy"
        titleEm=""
        sub={<><span className="hidden lg:inline">Last updated: May 2026. We are committed to protecting your privacy.</span><span className="lg:hidden">Last updated: May 2026.<br />We are committed to protecting your privacy.</span></>}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />

      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl">

            {/* Intro statement */}
            <p className="text-[13px] font-light text-body leading-[1.75] mb-10">
              We are committed to protecting your privacy and handling your personal information responsibly.
            </p>

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
