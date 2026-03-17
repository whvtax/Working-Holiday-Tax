import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { CtaBand } from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'Medicare for WHV Holders',
  description: 'Understanding Medicare eligibility and the Medicare levy exemption for Working Holiday Makers.',
}

const rhca = ['United Kingdom','New Zealand','Ireland','Sweden','Netherlands','Finland','Belgium','Italy','Malta','Norway','Slovenia']

export default function MedicarePage() {
  return (
    <>
      <PageHeader kicker="Guide" title="Medicare for" titleEm="Working Holiday Makers."
        sub="Understanding your Medicare eligibility and how to apply for an exemption from the Medicare levy."
        breadcrumbs={[{label:'Home',href:'/'},{label:'Medicare'}]} />

      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="max-w-2xl">
            <div className="reveal">
              <span className="section-label">What is Medicare?</span>
              <h2 className="section-h2">Australia&apos;s public <em>health system.</em></h2>
              <div className="prose-wht">
                <p>Medicare is Australia&apos;s public healthcare system providing free or subsidised medical services for eligible people — including GP visits, public hospital treatment, and some prescription medications.</p>
                <p>Medicare is funded through the Medicare levy, which is 2% of your taxable income calculated when you lodge your tax return.</p>
                <h3>Are WHV holders eligible?</h3>
                <p>Most Working Holiday Visa holders are not eligible for Medicare. If you are from a country with a Reciprocal Health Care Agreement (RHCA) with Australia you may be eligible for limited access.</p>
              </div>
              <div className="info-block"><p>If you are not eligible for Medicare you must apply for a Medicare levy exemption before lodging your tax return to avoid paying the 2% levy unnecessarily.</p></div>
            </div>
            <div className="mt-16 reveal delay-2">
              <h3 className="font-serif text-[20px] font-bold text-ink mb-5">RHCA countries</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {rhca.map(c => <div key={c} className="bg-forest-100 border border-forest-200 rounded-[10px] px-4 py-3 text-[13.5px] font-medium text-forest-500">{c}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand eyebrow="Need help?" heading="Questions about" headingEm="Medicare?" sub="We determine your Medicare status as part of your tax return and apply the correct exemption automatically." primaryLabel="Ask us a question" clipTop />
    </>
  )
}
