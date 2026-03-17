import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { Accordion } from '@/components/ui/Accordion'
import { CtaBand } from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'Tax Return for WHV Holders',
  description: 'We prepare, review and lodge your Australian tax return — maximising every deduction. Free eligibility check.',
}

function RateTable({ rows }: { rows: {income:string;rate:string}[] }) {
  return (
    <div className="rate-table">
      <table className="w-full"><thead><tr><th>Taxable income</th><th>Tax rate</th></tr></thead>
      <tbody>{rows.map((r,i) => <tr key={i}><td>{r.income}</td><td>{r.rate}</td></tr>)}</tbody></table>
    </div>
  )
}

const ratesWHM = [{income:'$0 – $45,000',rate:'15%'},{income:'$45,001 – $135,000',rate:'$6,750 + 30%'},{income:'$135,001 – $190,000',rate:'$33,750 + 37%'},{income:'$190,001+',rate:'$54,100 + 45%'}]
const ratesRes = [{income:'$0 – $18,200',rate:'Nil'},{income:'$18,201 – $45,000',rate:'16%'},{income:'$45,001 – $135,000',rate:'$4,288 + 30%'},{income:'$135,001 – $190,000',rate:'$31,288 + 37%'},{income:'$190,001+',rate:'$51,638 + 45%'}]
const deductions = [
  {title:'Uniforms & clothing',body:'Safety boots, high-visibility vests, and other required protective clothing.'},
  {title:'Certifications & licences',body:'RSA, WWCC, White Card, forklift licence and other required work certifications.'},
  {title:'Tools & equipment',body:'Tools and equipment purchased for and used in your work.'},
  {title:'Work-related travel',body:'Travel between work sites — not from home to your primary place of work.'},
  {title:'Laundry costs',body:'Washing, drying and ironing work uniforms and protective clothing.'},
  {title:'Charitable donations',body:'Donations over $2 to ATO-registered charities are fully tax deductible.'},
]
const residencyFaqs = [
  { question:'NDA countries — UK, Germany, Norway and more', answer:'WHV holders from the UK, Germany, Norway, Israel, Finland, Chile, Japan and Turkey may qualify as Australian tax residents if they stayed 183+ days and had their usual place of abode in Australia. If eligible, full resident rates apply — including the $18,200 tax-free threshold.' },
  { question:'All other countries — WHM rate applies', answer:'WHV holders from non-NDA countries are generally taxed at 15% on income up to $45,000 regardless of how long they stayed in Australia.' },
  { question:'Not sure which rate applies?', answer:'Message us on WhatsApp. We assess your specific situation and determine the correct rate before lodging — ensuring the maximum refund you are legally entitled to.' },
]

export default function TaxReturnPage() {
  return (
    <>
      <PageHeader kicker="Service guide" title="We handle your" titleEm="tax return, start to finish."
        sub="We prepare, review and lodge your Australian tax return — maximising every deduction you are legally entitled to claim."
        breadcrumbs={[{label:'Home',href:'/'},{label:'Tax Return'}]}
        cta={{ label:'Free eligibility check' }} />

      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="mb-16 reveal">
            <span className="section-label">What we do</span>
            <h2 className="section-h2">Everything handled <em>without the stress.</em></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {title:'Documents required',body:'TFN, full name, date of birth, bank account details, payment summaries, and receipts for any work-related expenses.'},
              {title:'Processing time',body:'Your refund is typically received within 7–14 days after the ATO approves your return and issues your Notice of Assessment.'},
              {title:'100% online',body:'No office visit, no scanning, no complicated forms. You send documents via WhatsApp or email — we handle everything.'},
            ].map((c,i) => (
              <div key={i} className={`bg-white border border-border rounded-[18px] p-7 transition-all hover:border-forest-300 hover:-translate-y-1 reveal delay-${i+1}`}>
                <p className="text-[15px] font-semibold text-ink mb-2">{c.title}</p>
                <p className="text-[13.5px] font-light text-muted leading-[1.7]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="rates" className="py-28 bg-forest-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="mb-16 reveal"><span className="section-label">Tax rates 2024–25</span><h2 className="section-h2">Understanding <em>your tax rate.</em></h2></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="reveal"><h3 className="font-serif text-[18px] font-bold text-ink mb-4">Working Holiday Maker rates</h3><RateTable rows={ratesWHM} /></div>
            <div className="reveal delay-1"><h3 className="font-serif text-[18px] font-bold text-ink mb-4">Australian resident rates</h3><RateTable rows={ratesRes} /></div>
          </div>
        </div>
      </section>

      <section id="deductions" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="mb-16 reveal"><span className="section-label">Maximise your refund</span><h2 className="section-h2">Deductions you <em>can legally claim.</em></h2><p className="text-[16px] font-light text-muted leading-[1.75] max-w-[520px] mt-4">Work-related expenses reduce your taxable income — meaning a larger refund. Keep receipts for everything.</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {deductions.map((d,i) => (
              <div key={i} className={`bg-forest-50 border border-border rounded-[14px] px-6 py-5 reveal delay-${(i%3)+1}`}>
                <p className="text-[14px] font-semibold text-ink mb-1.5">{d.title}</p>
                <p className="text-[13px] font-light text-muted leading-[1.65]">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="residency" className="py-28 bg-forest-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="mb-16 reveal"><span className="section-label">Tax residency</span><h2 className="section-h2">Are you a tax <em>resident of Australia?</em></h2></div>
          <div className="reveal delay-1"><Accordion items={residencyFaqs} /></div>
        </div>
      </section>

      <CtaBand eyebrow="Ready?" heading="Get your" headingEm="refund back." sub="Free eligibility check. We tell you exactly what you are entitled to before we start." primaryLabel="Check my tax — free" secondaryLabel="Estimate first" secondaryHref="/calculator" clipTop />
    </>
  )
}
