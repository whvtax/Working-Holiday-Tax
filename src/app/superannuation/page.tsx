import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Super Withdrawal (DASP) for Working Holiday Visa Holders',
  description: 'Claim your Australian superannuation after leaving. Your employer paid 11.5% of your wages into super — we help you get it back via DASP.',
}

const faqs = [
  {
    question: 'When can I claim my super?',
    answer: 'Once you have permanently left Australia and your Working Holiday Visa has expired or been cancelled, you can apply for a DASP. You do not need to wait — you can apply as soon as you are eligible.',
  },
  {
    question: 'How much tax is taken from my super withdrawal?',
    answer: 'Working Holiday Visa holders are taxed at 65% on DASP withdrawals. This means you receive 35 cents for every dollar in your fund. For most travellers, this still represents a meaningful amount.',
  },
  {
    question: 'I left Australia years ago — can I still claim?',
    answer: 'Yes. There is no deadline. If your super fund could not locate you, your balance may have been transferred to the ATO, where it can still be claimed at any time.',
  },
  {
    question: 'I worked for multiple employers — do I have multiple super accounts?',
    answer: 'Possibly. Each employer may have contributed to a different fund. We help you locate all your super accounts before submitting your DASP application.',
  },
  {
    question: 'Do I receive super if I worked under an ABN?',
    answer: 'Generally no. Super contributions are only required from employers for employees. If you invoiced clients as a sole trader under an ABN, your clients were not required to pay super on your invoices.',
  },
]

const STEPS = [
  {
    n: '1',
    title: 'Confirm eligibility',
    body: 'You must have left Australia and your WHV must be expired or cancelled. We check your eligibility before we start.',
  },
  {
    n: '2',
    title: 'Locate your super',
    body: 'We help you find all your super accounts — including any transferred to the ATO — so nothing is left behind.',
  },
  {
    n: '3',
    title: 'We submit the DASP',
    body: 'We prepare and lodge your Departing Australia Superannuation Payment application on your behalf.',
  },
  {
    n: '4',
    title: 'Receive your payment',
    body: 'Once approved by the ATO, your super is paid directly to your overseas bank account — usually within 7 to 28 days.',
  },
]

export default function SuperannuationPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-8 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-6" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Superannuation</span>
          </nav>

          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>Service guide</span>
            </div>
            <h1 className="font-serif font-black text-ink mb-2.5" style={{ fontSize: 'clamp(20px,3.5vw,38px)', lineHeight: 1.06, letterSpacing: '-0.025em' }}>
              Your employer owes you<br /><span style={{ color: '#0B5240' }}>superannuation.</span>
            </h1>
            <p className="font-semibold text-ink mb-2.5" style={{ fontSize: '14px', letterSpacing: '-0.01em' }}>
              Every employer in Australia pays 11.5% of your wages into a super fund — on top of your salary. That money is yours. We help you claim it back.
            </p>
            <p className="font-light leading-[1.7] mb-5" style={{ fontSize: '14px', color: 'rgba(10,15,13,0.55)', maxWidth: '420px' }}>
              Once you leave Australia and your visa expires, you can claim it all back through a DASP (Departing Australia Superannuation Payment). We manage the process from start to finish.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 items-stretch sm:items-stretch sm:items-center mb-5">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '46px', padding: '0 22px', fontSize: '13.5px' }}>
                Claim my super now
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <Link href="#how-it-works" className="btn-ghost-dark" style={{ height: '46px', padding: '0 18px', fontSize: '13.5px' }}>
                How we claim it
              </Link>
            </div>
            <p className="text-[11px]" style={{ color: 'rgba(10,15,13,0.38)' }}>
              Free to start&nbsp;•&nbsp;Registered tax agent&nbsp;•&nbsp;1,200+ travellers helped
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT IS SUPER ─────────────────────────────────────────────────── */}
      <section className="py-7 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-16 items-start">
            <div className="reveal">
              <span className="section-label">What is superannuation?</span>
              <h2 className="font-serif font-black text-ink mt-1 mb-3" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Money sitting in a fund<br /><em className="not-italic font-normal text-forest-400">waiting to be claimed.</em>
              </h2>
              <div className="prose-wht max-w-[460px]">
                <p>Superannuation is Australia&apos;s retirement savings system. Every employer must contribute 11.5% of your gross wages into a fund — separately from your salary. It is not optional.</p>
                <p>As a Working Holiday Visa holder, you can reclaim this entire balance when you leave Australia through the DASP (Departing Australia Superannuation Payment) process.</p>
              </div>
              <div className="info-block">
                <p>WHV holders are taxed at 65% on withdrawal — meaning you keep 35 cents per dollar. Even after tax, most travellers receive hundreds to thousands of dollars.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 reveal delay-1">
              {[
                { title: 'Contribution rate',  body: '11.5% of your gross wages paid by your employer into a super fund.' },
                { title: 'Who can claim',      body: 'WHV holders who have permanently left Australia and whose visa has expired or been cancelled.' },
                { title: 'Processing time',    body: 'DASP payments are typically made within 7 to 28 days after ATO approval.' },
                { title: 'Payment method',     body: 'Paid directly to your overseas bank account — wherever you are in the world.' },
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

      {/* ── ELIGIBILITY + WHAT YOU NEED ───────────────────────────────────── */}
      <section className="py-7 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
            <div className="reveal">
              <span className="section-label">Who can claim?</span>
              <h2 className="font-serif font-black text-ink mt-1 mb-3" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                You can claim as soon as<br /><em className="not-italic font-normal text-forest-400">your visa expires.</em>
              </h2>
              <div className="space-y-0">
                {[
                  { label: 'Visa expired or cancelled', body: 'Your Working Holiday Visa must have expired or been cancelled. You do not need to wait — you can apply as soon as you leave.' },
                  { label: 'No current Australian visa', body: 'You must not hold another Australian visa that allows you to remain in or return to Australia.' },
                  { label: 'Super contributions on record', body: 'You must have received at least one super contribution from an employer during your time in Australia.' },
                ].map((item, i) => (
                  <div key={i} className="py-3.5" style={{ borderTop: '1px solid #E2EFE9' }}>
                    <p className="text-[12.5px] font-semibold text-ink mb-1" style={{ letterSpacing: '-0.01em' }}>{item.label}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.7]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>
            <div className="reveal delay-1">
              <span className="section-label">What you will need</span>
              <h2 className="font-serif font-black text-ink mt-1 mb-3" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Documents and details<br /><em className="not-italic font-normal text-forest-400">we will ask for.</em>
              </h2>
              <div className="space-y-2.5 mb-5">
                {[
                  'Passport details and copy',
                  'Tax File Number (TFN)',
                  'Super fund name and member number (if known)',
                  'Employer names and approximate employment dates',
                  'Overseas bank account details for your payment',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="7" cy="7" r="6.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                      <path d="M4.5 7l2 2 3-3" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[12.5px] font-light text-body leading-[1.65]">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-4 py-3" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                <p className="text-[12.5px] font-light text-body leading-[1.7]">
                  <span className="font-semibold text-forest-500">Not sure what you have?</span> Message us anyway. We will tell you exactly what we need and help you track down your super fund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-7 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center mb-6 reveal">
            <span className="section-label center">Step by step</span>
            <h2 className="font-serif font-black text-ink mt-1 mb-2" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Four steps to<br /><em className="not-italic font-normal text-forest-400">claim your super.</em>
            </h2>
            <p className="font-light text-muted leading-[1.65]" style={{ fontSize: '12.5px' }}>
              We locate all your super accounts, prepare the DASP application, and submit it to the ATO.
            </p>
          </div>
          <div className="reveal delay-1">
            {/* Desktop */}
            <div className="hidden lg:block">
              <div className="relative flex items-start">
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-3.5 h-px" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)', zIndex: 0 }} aria-hidden="true" />
                {STEPS.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center px-3" style={{ zIndex: 1 }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white mb-4 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 3px #EEF7F2, 0 0 0 4px #C8EAE0' }}>
                      {s.n}
                    </div>
                    <p className="text-[12.5px] font-semibold text-ink mb-1.5 text-center" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p className="text-[11.5px] font-light text-muted leading-[1.65] text-center">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Mobile */}
            <div className="lg:hidden flex flex-col">
              {STEPS.map((s, i) => (
                <div key={i} className="flex gap-3 pb-5">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white" style={{ background: '#0B5240' }}>{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2 min-h-[28px]" style={{ background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                  </div>
                  <div className="pt-0.5">
                    <p className="text-[13px] font-semibold text-ink mb-0.5" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.65]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-7 reveal delay-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '44px', padding: '0 22px', fontSize: '13.5px' }}>
              Claim my super now
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-7 lg:py-14" style={{ background: '#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-6 lg:gap-16 items-start">
            <div className="reveal">
              <span className="section-label">Common questions</span>
              <h2 className="font-serif font-black text-ink mt-1 mb-3" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Super questions — answered.
              </h2>
              <p className="font-light text-muted leading-[1.65] mb-5" style={{ fontSize: '12.5px' }}>
                Not sure if you can claim, or how much you might receive? Ask us directly on WhatsApp.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex" style={{ height: '42px', padding: '0 18px', fontSize: '13px' }}>
                Ask on WhatsApp
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
            <div className="reveal delay-1">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="Ready to claim?"
        heading="Thousands of dollars"
        headingEm="could be owed to you."
        sub="We locate all your super accounts, handle the DASP claim, and make sure you receive every dollar."
        primaryLabel="Claim my super now"
      />
    </>
  )
}
