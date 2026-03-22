import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Tax Return in Australia for WHV Holders',
  description: 'Get your Australian tax refund. We prepare and lodge your tax return for WHV holders — online, fast, and handled for you.',
}

const faqs = [
  {
    question: 'Do I need to lodge a tax return if I only worked for a short time?',
    answer: 'Yes. If you earned income in Australia, you may still need to lodge a tax return, even if you only worked for a short period.',
  },
  {
    question: 'What happens if I do not lodge my tax return?',
    answer: 'If you are required to lodge and do not do so, the ATO may apply penalties or take further action.',
  },
  {
    question: 'Can I lodge my tax return after leaving Australia?',
    answer: 'Yes. You can lodge your tax return from overseas after you leave Australia.',
  },
  {
    question: 'What documents do I need to complete my tax return?',
    answer: 'You will need your TFN, income details, and any records for work-related expenses you want to claim.',
  },
  {
    question: 'How do I know if my tax return has been completed?',
    answer: 'Once your tax return is processed, the ATO issues a Notice of Assessment confirming the final outcome.',
  },
]

const DEDUCTIONS = [
  {
    title: 'Work uniforms and clothing',
    body: 'Protective or required work clothing, such as safety boots, high-visibility vests, or branded uniforms.',
  },
  {
    title: 'Tools and equipment',
    body: 'Tools or equipment purchased for work and used directly in your job.',
  },
  {
    title: 'Licences and certifications',
    body: 'Costs for licences required for your work, such as RSA, White Card, or WWCC.',
  },
  {
    title: 'Laundry and cleaning',
    body: 'Cleaning and maintenance of work-related or protective clothing.',
  },
  {
    title: 'Work-related travel',
    body: 'Travel between job sites - not travel from home to your regular workplace.',
  },
  {
    title: 'Charitable donations',
    body: 'Donations of $2 or more to registered Australian charities.',
  },
]

const STEPS = [
  {
    n: '1',
    title: 'Send us your details',
    body: 'Provide your income details, payment summaries, and any work-related expenses.',
  },
  {
    n: '2',
    title: 'We review everything',
    body: 'We check your income, deductions, and residency status to ensure everything is correct.',
  },
  {
    n: '3',
    title: 'We prepare and lodge',
    body: 'We prepare your tax return and lodge it directly with the ATO on your behalf.',
  },
  {
    n: '4',
    title: 'ATO processes your return',
    body: 'The ATO reviews your return and issues a Notice of Assessment with the final outcome.',
  },
]

export default function TaxReturnPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-8 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-6" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Tax Return</span>
          </nav>

          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase text-forest-500" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>Service guide</span>
            </div>
            <h1 className="font-serif font-black text-ink mb-2.5" style={{ fontSize: 'clamp(20px,3.5vw,38px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              Lodge your tax return correctly.<br /><span style={{ color: '#0B5240' }}>We handle everything for you.</span>
            </h1>
            <p className="font-semibold text-ink mb-3" style={{ fontSize: '14px', letterSpacing: '-0.01em' }}>
              If you earned income in Australia, you are required to lodge a tax return.
              We make sure everything is done accurately and on time.
            </p>
            <p className="font-light leading-[1.7] mb-5" style={{ fontSize: '14px', color: 'rgba(10,15,13,0.55)', maxWidth: '420px' }}>
              You may have tax to pay or be eligible for a refund
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-5">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '46px', padding: '0 22px', fontSize: '13.5px' }}>
                Start your tax return
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <Link href="#how-it-works" className="btn-ghost-dark" style={{ height: '46px', padding: '0 18px', fontSize: '13.5px' }}>
                How it works
              </Link>
            </div>
            <p className="text-[10.5px] sm:text-[11.5px]" style={{ color: 'rgba(10,15,13,0.38)' }}>
              Handled under a registered tax agent • Fully ATO compliant
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT IS A TAX RETURN ─────────────────────────────────────────── */}
      <section className="py-7 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-16 items-start">
            <div className="reveal">
              <span className="section-label">What is a tax return?</span>
              <h2 className="font-serif font-black text-ink mt-1 mb-2" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                You may need to lodge a tax return to determine<br /><em className="not-italic font-normal text-forest-400">your final tax outcome.</em>
              </h2>
              <div className="prose-wht max-w-[480px]">
                <p>At the end of each Australian financial year (1 July to 30 June), you report your income to the ATO.</p>
                <p>Your employer withholds tax during the year. Your tax return compares what was withheld with what you were required to pay. The result may be a balance to pay or a refund.</p>
                <p>You may also claim work-related deductions, which can affect your final outcome.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 reveal delay-1">
              {[
                { title: 'Financial year', body: '1 July to 30 June. This is the period your income is reported for.' },
                { title: 'Lodgment deadline', body: '31 October if you lodge yourself, or later if you use a registered tax agent.' },
                { title: 'ATO processing', body: 'Most tax returns are processed within 2 to 4 weeks after lodgement.' },
                { title: 'Amendment period', body: 'Up to 2 years to review or amend your tax return if needed.' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-xl px-3.5 py-2.5" style={{ border: '1px solid #C8EAE0', boxShadow: '0 1px 3px rgba(0,0,0,.03)' }}>
                  <p className="text-[13px] font-semibold text-ink mb-0.5">{c.title}</p>
                  <p className="text-[12.5px] font-light text-muted leading-[1.65]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TAX RATES ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-3xl reveal">
            <span className="section-label">Tax rates</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-2" style={{ fontSize: 'clamp(18px,2.4vw,28px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Tax rates in Australia.
            </h2>
            <p className="font-light text-muted leading-[1.7] mb-8" style={{ fontSize: '13px' }}>
              There are different tax rates for Working Holiday visa holders and Australian residents.
            </p>

            {/* Two tables side by side on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-w-0">

              {/* WHV table */}
              <div className="min-w-0">
                <h3 className="font-semibold text-ink mb-3" style={{ fontSize: '13px', letterSpacing: '-0.01em' }}>Working Holiday visa holders</h3>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #C8EAE0' }}>
                  <table className="w-full" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                    <thead>
                      <tr style={{ background: '#EAF6F1' }}>
                        <th className="text-left font-semibold text-ink" style={{ fontSize: '11.5px', padding: '10px 14px', letterSpacing: '0.01em', width: '55%' }}>Taxable income</th>
                        <th className="text-left font-semibold text-ink" style={{ fontSize: '11.5px', padding: '10px 14px', letterSpacing: '0.01em', width: '45%' }}>Tax rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['$0 – $45,000',         '15%'],
                        ['$45,001 – $135,000',   '$6,750 + 30%'],
                        ['$135,001 – $190,000',  '$33,750 + 37%'],
                        ['$190,001+',            '$54,100 + 45%'],
                      ].map(([income, rate], i) => (
                        <tr key={i} style={{ borderTop: '1px solid #E2EFE9', background: i % 2 === 0 ? '#ffffff' : '#F7FCF9' }}>
                          <td className="font-light text-body" style={{ fontSize: '12px', padding: '9px 14px' }}>{income}</td>
                          <td className="font-medium text-ink" style={{ fontSize: '12px', padding: '9px 14px' }}>{rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Resident table */}
              <div className="min-w-0">
                <h3 className="font-semibold text-ink mb-3" style={{ fontSize: '13px', letterSpacing: '-0.01em' }}>Australian residents</h3>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #C8EAE0' }}>
                  <table className="w-full" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                    <thead>
                      <tr style={{ background: '#EAF6F1' }}>
                        <th className="text-left font-semibold text-ink" style={{ fontSize: '11.5px', padding: '10px 14px', letterSpacing: '0.01em', width: '55%' }}>Taxable income</th>
                        <th className="text-left font-semibold text-ink" style={{ fontSize: '11.5px', padding: '10px 14px', letterSpacing: '0.01em', width: '45%' }}>Tax rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['$0 – $18,200',         'Nil'],
                        ['$18,201 – $45,000',    '16%'],
                        ['$45,001 – $135,000',   '$4,288 + 30%'],
                        ['$135,001 – $190,000',  '$31,288 + 37%'],
                        ['$190,001+',            '$51,638 + 45%'],
                      ].map(([income, rate], i) => (
                        <tr key={i} style={{ borderTop: '1px solid #E2EFE9', background: i % 2 === 0 ? '#ffffff' : '#F7FCF9' }}>
                          <td className="font-light text-body" style={{ fontSize: '12px', padding: '9px 14px' }}>{income}</td>
                          <td className="font-medium text-ink" style={{ fontSize: '12px', padding: '9px 14px' }}>{rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-5 rounded-xl px-4 py-3" style={{ background: '#FFFCF5', border: '1px solid #F0D99A' }}>
              <p className="font-light text-body leading-[1.7]" style={{ fontSize: '12.5px' }}>
                If your employer is not registered as a Working Holiday employer, you may be taxed at 30% instead of the Working Holiday rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU CAN CLAIM ───────────────────────────────────────────── */}
      <section className="py-7 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mb-7 reveal">
            <span className="section-label">Deductions</span>
            <h2 className="font-serif font-black text-ink mt-1 mb-2" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Work-related deductions<br /><em className="not-italic font-normal text-forest-400">can affect your tax outcome.</em>
            </h2>
            <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '12.5px' }}>
              You may be able to claim work-related deductions. Only expenses directly related to your work and supported by records or receipts can be included.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 reveal delay-1">
            {DEDUCTIONS.map((d, i) => (
              <div key={i} className="bg-white rounded-xl p-5" style={{ border: '1.5px solid #E2EFE9', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                <p className="text-[12.5px] font-semibold text-ink mb-1.5">{d.title}</p>
                <p className="text-[13px] font-light text-muted leading-[1.7]">{d.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 max-w-xl reveal delay-2">
            <div className="info-block">
              <p>Personal expenses, fines, and travel between home and your regular workplace are not claimable. </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-7 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center mb-6 reveal">
            <span className="section-label center">How it works</span>
            <h2 className="font-serif font-black text-ink mt-1 mb-2" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              From your documents<br /><em className="not-italic font-normal text-forest-400">to your tax outcome.</em>
            </h2>
            <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '12.5px' }}>
              Send us your details. We prepare and lodge your tax return with the ATO.
            </p>
          </div>

          {/* Desktop timeline */}
          <div className="reveal delay-1">
            <div className="hidden lg:block">
              <div className="relative flex items-start">
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)', zIndex: 0 }} aria-hidden="true" />
                {STEPS.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center px-3" style={{ zIndex: 1 }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white mb-4 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 3px #EEF7F2, 0 0 0 4px #C8EAE0' }}>
                      {s.n}
                    </div>
                    <p className="text-[12.5px] font-semibold text-ink mb-1.5 text-center" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.65] text-center">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:hidden flex flex-col">
              {STEPS.map((s, i) => (
                <div key={i} className="flex gap-3 pb-5">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white" style={{ background: '#0B5240' }}>{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2 min-h-[32px]" style={{ background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                  </div>
                  <div className="pt-1">
                    <p className="text-[14px] font-semibold text-ink mb-1.5" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.7]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE + WHAT TO HAVE READY ───────────────────────────────── */}
      <section className="py-7 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
            <div className="reveal">
              <span className="section-label">Timing</span>
              <h2 className="font-serif font-black text-ink mt-1 mb-2" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Typical timeline<br /><em className="not-italic font-normal text-forest-400">for your tax return.</em>
              </h2>
              <div className="space-y-0">
                {[
                  { label: 'Our preparation',   body: 'We typically prepare your tax return within 24 hours after receiving all required details.' },
                  { label: 'ATO processing',    body: 'The ATO usually processes tax returns within 7 to 14 business days. During peak periods, processing may take longer.' },
                  { label: 'Final outcome',     body: 'Once the ATO issues a Notice of Assessment, your final tax outcome is confirmed and any amount due is paid to your Australian bank account.' },
                ].map((item, i) => (
                  <div key={i} className="py-3.5" style={{ borderTop: '1px solid #E2EFE9' }}>
                    <p className="text-[12.5px] font-semibold text-ink mb-1" style={{ letterSpacing: '-0.01em' }}>{item.label}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.75]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>
            <div className="reveal delay-1">
              <span className="section-label">What to have ready</span>
              <h2 className="font-serif font-black text-ink mt-1 mb-2" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Documents<br /><em className="not-italic font-normal text-forest-400">you will need.</em>
              </h2>
              <div className="space-y-3 mb-6">
                {[
                  'Tax File Number (TFN)',
                  'Bank account details (if applicable)',
                  'Receipts for any work-related expenses you want to claim',
                  'Personal details (such as your address and contact phone number)',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                      <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[12.5px] font-light text-body leading-[1.65]">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-4 py-3 mb-3" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                <p className="text-[13px] font-light text-body leading-[1.75]">
                  Not sure what you have? We can help you check what is required.
                </p>
              </div>
              <div className="rounded-xl px-4 py-3" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                <p className="text-[12.5px] font-light leading-[1.75]" style={{ color: '#991B1B' }}>
                  A registered tax agent will never ask for your passwords, SMS verification codes, or access to your myGov or myID account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-16 items-start">

            {/* Left */}
            <div className="reveal">
              <span className="section-label">Questions</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(18px,2.4vw,28px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Tax return questions, answered.
              </h2>
              <p className="font-light text-muted leading-[1.65] mb-5" style={{ fontSize: '13px' }}>
                Still unsure? Ask our tax experts.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex"
                style={{ height: '42px', padding: '0 18px', fontSize: '13px' }}>
                Get help now →
              </a>
            </div>

            {/* Right */}
            <div className="reveal delay-1 max-w-[680px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="Need help?"
        heading="Need help with"
        headingEm="your tax return?"
        sub="We review your details and lodge your tax return with the ATO."
        primaryLabel="Get started"
        trustLine="Check your eligibility for free"
      />
    </>
  )
}
