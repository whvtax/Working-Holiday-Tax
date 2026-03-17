import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { Accordion } from '@/components/ui/Accordion'
import { CtaBand } from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'TFN Application',
  description: 'Get your Australian Tax File Number as a Working Holiday Maker. Free guidance from a registered tax agent.',
}

const faqs = [
  { question:'What is a TFN Declaration Form?', answer:'It is completed when you start a new job so your employer deducts the correct amount of tax. Working Holiday Visa holders should select "No" for tax residency and the tax-free threshold.' },
  { question:'Where will my TFN be sent?', answer:'Your TFN is mailed to your nominated Australian address. Use an address where you will be for at least 28 days — a hostel address or PO Box is fine.' },
  { question:'What if I lose my TFN?', answer:'Call the ATO on 13 28 61 (Mon–Fri, 8am–6pm) to retrieve your TFN. For language support call 13 14 50 first.' },
  { question:'Can I get a TFN on a tourist visa?', answer:'No. A tourist visa does not permit you to work in Australia, so you are not eligible for a TFN on a tourist visa.' },
  { question:'Can I start work before receiving my TFN?', answer:'Yes, but you must provide it to your employer within 28 days to avoid the maximum 47% withholding rate being applied to your wages.' },
]

export default function TFNPage() {
  return (
    <>
      <PageHeader kicker="Service guide" title="Get Your TFN as a" titleEm="Working Holiday Maker."
        sub="Your Tax File Number sorted before your first payslip — correctly, the first time, with full guidance from us."
        breadcrumbs={[{label:'Home',href:'/'},{label:'TFN'}]}
        cta={{ label:'Get my TFN — free' }} />

      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="max-w-2xl mb-16 reveal">
            <span className="section-label">What is a TFN?</span>
            <h2 className="section-h2">Your Australian tax identity number.</h2>
            <div className="prose-wht">
              <p>A Tax File Number (TFN) is a unique 9-digit number issued by the Australian Taxation Office (ATO). It is your personal tax identifier for working, paying tax, and lodging a tax return in Australia.</p>
              <p>Without a TFN your employer is required by law to withhold tax at the highest rate — 47%. Providing your TFN means the correct Working Holiday Maker rate of 15% is applied instead.</p>
            </div>
            <div className="info-block"><p>You can start work without a TFN, but you must provide it within 28 days to avoid the 47% rate.</p></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title:'Documents required', body:'Passport details, Australian postal address, Australian mobile number, and a valid email for ATO updates.' },
              { title:'Processing time',    body:'Your TFN is issued within 7–28 days by post, and usually available by phone about one week after application.' },
              { title:'Service fee',        body:'Applying through the official ATO website with our guidance is completely free. We walk you through every step.' },
            ].map((c,i) => (
              <div key={i} className={`bg-white border border-border rounded-[18px] p-7 transition-all hover:border-forest-300 hover:-translate-y-1 reveal delay-${i+1}`}>
                <p className="text-[15px] font-semibold text-ink mb-2">{c.title}</p>
                <p className="text-[13.5px] font-light text-muted leading-[1.7]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 bg-forest-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="mb-16 reveal">
            <span className="section-label">Common questions</span>
            <h2 className="section-h2">TFN FAQs</h2>
          </div>
          <div className="reveal delay-1"><Accordion items={faqs} /></div>
        </div>
      </section>

      <CtaBand eyebrow="Get started" heading="Ready to get" headingEm="your TFN?" sub="We guide you through the official ATO process step by step — correctly, the first time." primaryLabel="Get my TFN — free" clipTop />
    </>
  )
}
