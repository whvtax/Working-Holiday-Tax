import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { CtaBand } from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'ABN Registration for WHV Holders',
  description: 'Register your Australian Business Number as a Working Holiday Maker sole trader.',
}

export default function ABNPage() {
  return (
    <>
      <PageHeader kicker="Service guide" title="Get Your ABN as a" titleEm="Sole Trader."
        sub="Working as a contractor or freelancer in Australia? We register your ABN and set you up to invoice correctly from day one."
        breadcrumbs={[{label:'Home',href:'/'},{label:'ABN'}]}
        cta={{ label:'Get my ABN' }} />

      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="reveal-left">
              <span className="section-label">What is an ABN?</span>
              <h2 className="section-h2">Your Australian <em>business identity.</em></h2>
              <div className="prose-wht">
                <p>An Australian Business Number (ABN) is an 11-digit number issued by the ATO. It is your business identity when working as a sole trader — a freelancer, contractor, or self-employed individual.</p>
                <p>When you work under an ABN you issue an invoice to your client for work completed. You are responsible for managing your own tax, and no superannuation is paid on your behalf by default.</p>
                <h3>ABN vs TFN</h3>
                <p>A TFN is for employees who receive a payslip with tax withheld automatically. An ABN is for sole traders who invoice for their work. You can hold both simultaneously if you work in both capacities.</p>
              </div>
              <div className="info-block"><p>Applying for an ABN through the official ABR website is free. We can submit the application on your behalf and ensure everything is set up correctly.</p></div>
            </div>
            <div className="grid grid-cols-1 gap-4 reveal-right">
              {[
                {title:'Documents required', body:'Your TFN, an Australian postal address, and your contact details.'},
                {title:'Processing time',    body:'Your ABN is usually issued instantly online, or within 28 days by mail and one week by phone.'},
                {title:'GST registration',   body:'GST registration is required if your annual turnover exceeds $75,000. Below this threshold it is optional.'},
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

      <CtaBand eyebrow="Ready?" heading="Get your" headingEm="ABN sorted." sub="We submit your application and guide you through invoicing correctly from day one." primaryLabel="Get my ABN" clipTop />
    </>
  )
}
