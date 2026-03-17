import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { Accordion } from '@/components/ui/Accordion'
import { WA_URL, EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Working Holiday Tax. We reply within minutes, 7 days a week.',
}

const faqs = [
  { question:'How fast do you reply?',               answer:'Usually within a few minutes on WhatsApp during business hours. For emails we aim to respond within 2–4 hours.' },
  { question:'Is asking questions free?',             answer:'Yes. Asking questions and your eligibility check are completely free. We only charge once your return is ready to lodge — and we tell you the fee upfront.' },
  { question:'Can I contact you after leaving Australia?', answer:'Yes. Our service is 100% online and available from anywhere in the world. Many clients contact us after they have already left Australia.' },
  { question:'What languages do you support?',        answer:'We primarily operate in English. Contact us and we will do our best to assist regardless of language.' },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader kicker="Get in touch" title="We&apos;re here" titleEm="to help you."
        sub="Ask us anything about your Australian tax. Most questions get answered within minutes."
        breadcrumbs={[{label:'Home',href:'/'},{label:'Contact'}]} />

      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-24">
            {[
              { title:'WhatsApp', sub:'0424 513 998', detail:'Fastest response', href:WA_URL, ext:true },
              { title:'Email',    sub:EMAIL,           detail:'Within 2–4 hours', href:`mailto:${EMAIL}`, ext:false },
              { title:'Available',sub:'7 days a week', detail:'Worldwide support', href:null, ext:false },
            ].map((c,i) => (
              <div key={i} className={`text-center border border-border rounded-[18px] p-8 transition-all reveal delay-${i+1} ${c.href ? 'cursor-pointer hover:border-forest-300 hover:-translate-y-1':''}`}
                {...(c.href ? {onClick:()=>c.ext?window.open(c.href!,'_blank'):window.location.href=c.href!} : {})}>
                <p className="text-[15px] font-semibold text-ink mb-1">{c.title}</p>
                <p className="text-[13px] font-light text-muted">{c.sub}</p>
                <p className="text-[12px] text-subtle mt-0.5">{c.detail}</p>
              </div>
            ))}
          </div>
          <div className="max-w-xl mx-auto">
            <div className="mb-14 reveal"><span className="section-label">FAQs</span><h2 className="section-h2">Quick answers.</h2></div>
            <div className="reveal delay-1"><Accordion items={faqs} /></div>
          </div>
        </div>
      </section>
    </>
  )
}
