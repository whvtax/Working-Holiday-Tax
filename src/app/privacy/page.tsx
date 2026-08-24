import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { EMAIL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Working Holiday Tax privacy policy - how we collect, use and protect your personal information.',
  alternates: {
    canonical: '/privacy',
    languages: {
      'en-AU': '/privacy',
      'de': '/de/privacy',
      'ja': '/ja/privacy',
      'x-default': '/privacy',
    },
  },
  // Force the same share image as the homepage for every link to this page.
  openGraph: {
    url: `${SITE_URL}/privacy`,
    title: 'Privacy Policy',
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
    title: '1. Introduction',
    body: 'This Privacy Policy explains how Working Holiday Tax ("we", "us", "our") collects, uses, discloses, and protects your personal information in accordance with the Privacy Act 1988 (Cth), the Australian Privacy Principles (APPs), and the Notifiable Data Breaches (NDB) scheme. We also comply with our obligations to the ATO and relevant regulators, including strict confidentiality requirements. By using our website or engaging our services, you consent to the collection and use of your information as described in this Privacy Policy.',
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
      'Phone: 0424 513 998',
      `Email: ${EMAIL}`,
    ],
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

      <section className="pt-0 pb-10 lg:pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl">

            {/* Intro statement */}
            <p className="text-[13px] font-light text-body leading-[1.75] mb-8">
              We are committed to protecting your privacy and handling your personal information responsibly.
            </p>

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
