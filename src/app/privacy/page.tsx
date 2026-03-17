import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Working Holiday Tax privacy policy — how we collect, use and protect your personal information.',
}

const sections = [
  { title:'1. Introduction',          body:"This Privacy Policy explains how Working Holiday Tax collects, uses, discloses, and safeguards your personal information in compliance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs)." },
  { title:'2. Information we collect',body:'We may collect your full name, contact details, Tax File Number (TFN), financial records, identification documents, employment details, and information submitted via WhatsApp, email, or our website.' },
  { title:'3. How we use your information', body:'Your information is used to prepare and lodge your tax return, verify your identity, communicate with you, and comply with legal obligations. We never sell or trade your personal information.' },
  { title:'4. Data security',         body:'We implement strict security measures including SSL encryption, secure electronic storage, and access limited to authorised personnel. In the event of a breach we will notify you as required under the NDB scheme.' },
  { title:'5. Data retention',        body:'In compliance with ATO and TPB requirements we retain tax records for a minimum of 5–7 years before securely destroying or anonymising them.' },
  { title:'6. Your rights',           body:'You have the right to access, correct, or request deletion of your personal information, subject to legal obligations. You may also opt out of marketing communications at any time.' },
  { title:'7. Cookies',               body:'Our website uses cookies and analytics tools to monitor performance. By continuing to use our site you consent to the use of cookies in line with this Privacy Policy.' },
  { title:'8. Contact',               body:`If you have questions about this Privacy Policy contact us at ${EMAIL} or 0424 513 998.` },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHeader kicker="Legal" title="Privacy Policy" titleEm=""
        sub="Last updated: July 1, 2024. We take your privacy seriously."
        breadcrumbs={[{label:'Home',href:'/'},{label:'Privacy Policy'}]} />

      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="max-w-2xl">
            {sections.map((s,i) => (
              <div key={i} className={`mb-10 reveal delay-${(i%4)+1}`}>
                <h2 className="font-serif text-[22px] font-bold text-ink mb-3">{s.title}</h2>
                <p className="text-[15px] font-light text-body leading-[1.8]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
