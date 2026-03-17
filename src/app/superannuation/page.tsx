import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { Accordion } from '@/components/ui/Accordion'
import { CtaBand } from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'Superannuation for WHV Holders',
  description: 'Claim your Australian super back after leaving. We manage the entire DASP process.',
}

const faqs = [
  { question:"Can I claim super if I plan to return to Australia?", answer:'Yes. You can claim your DASP even if you intend to return on a different visa. Once your current visa expires or is cancelled you are eligible to claim.' },
  { question:"I left Australia years ago — is it too late?", answer:'No. After a period of inactivity unclaimed super is transferred to the ATO where it can be claimed at any time. There is no deadline.' },
  { question:"Do sole traders receive super?", answer:'No. Super contributions are only required from employers for employees. If you worked solely under an ABN as a sole trader, your clients were not required to pay super on your invoices.' },
  { question:"When are super contributions paid?", answer:'Employers must pay super quarterly by 28 January, 28 April, 28 July and 28 October. Contributions typically appear in your fund within a few days of each deadline.' },
]

export default function SuperannuationPage() {
  return (
    <>
      <PageHeader kicker="Service guide" title="Claim Your Super" titleEm="After Leaving Australia."
        sub="Your employer contributes 11.5% of your wages to your super account. We help you claim every dollar back when you leave."
        breadcrumbs={[{label:'Home',href:'/'},{label:'Superannuation'}]}
        cta={{ label:'Check my super' }} />

      <section id="guide" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="reveal-left">
              <span className="section-label">What is super?</span>
              <h2 className="section-h2">Money your employer <em>paid on your behalf.</em></h2>
              <div className="prose-wht">
                <p>Superannuation (super) is Australia&apos;s mandatory retirement savings system. Your employer is legally required to contribute 11.5% of your gross salary to a super fund on top of your wages.</p>
                <p>For Working Holiday Makers the funds can be claimed back once you permanently leave Australia and your visa has expired or been cancelled via the Departing Australia Superannuation Payment (DASP) process.</p>
                <h3>Tax on withdrawal</h3>
                <p>Working Holiday Maker visa holders are taxed at 65% on withdrawal, meaning you receive 35 cents for every dollar. For most clients this still represents thousands of dollars.</p>
              </div>
              <div className="info-block"><p>If your super fund cannot identify you it transfers your balance to the ATO. You can still claim at any time — there is no deadline.</p></div>
            </div>
            <div className="grid grid-cols-1 gap-4 reveal-right">
              {[
                {title:'Documents required', body:'Passport details, personal information, super fund name, member number, and account opening date.'},
                {title:'Processing time',    body:'Your super refund is usually paid within 7–28 days after the ATO approves your application.'},
                {title:'100% online',        body:'All services are completely online. No paperwork, no office visits required from anywhere in the world.'},
              ].map((c,i) => (
                <div key={i} className="bg-white border border-border rounded-[18px] p-7 transition-all hover:border-forest-300 hover:-translate-y-1">
                  <p className="text-[15px] font-semibold text-ink mb-2">{c.title}</p>
                  <p className="text-[13.5px] font-light text-muted leading-[1.7]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-forest-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="mb-16 reveal"><span className="section-label">FAQs</span><h2 className="section-h2">Common super <em>questions.</em></h2></div>
          <div className="reveal delay-1"><Accordion items={faqs} /></div>
        </div>
      </section>

      <CtaBand eyebrow="Ready to claim?" heading="Your super is" headingEm="waiting for you." sub="We manage the entire DASP process. You just send us your documents." primaryLabel="Check my super" clipTop />
    </>
  )
}
