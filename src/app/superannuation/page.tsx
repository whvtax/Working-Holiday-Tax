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
    answer: 'You can claim your super once you have left Australia and your visa has expired or been cancelled.',
  },
  {
    question: 'How much tax is taken from my super withdrawal?',
    answer: 'Super withdrawals for Working Holiday visa holders are taxed at 65%.',
  },
  {
    question: 'I left Australia years ago - can I still claim?',
    answer: 'Yes. There is no time limit to claim your super. Even if your balance was transferred to the ATO, you can still claim it.',
  },
  {
    question: 'I worked for multiple employers - do I have multiple super accounts?',
    answer: 'you may have multiple super accounts from different employers. We help you find and combine everything before submitting your claim.',
  },
  {
    question: 'Do I receive super if I worked under an ABN?',
    answer: 'Generally no. Super is usually paid only to employees. If you worked under an ABN, clients are not required to pay super.',
  },
]

const STEPS = [
  {
    n: '1',
    title: 'Confirm eligibility',
    body: 'Make sure you have left Australia and your visa has expired or been cancelled. We confirm you are eligible before starting the process.',
  },
  {
    n: '2',
    title: 'Locate your super',
    body: 'We find all your super accounts, including any held by the ATO. Nothing is missed, and everything is included in your claim.',
  },
  {
    n: '3',
    title: 'We submit the DASP',
    body: 'We prepare and submit your super claim to the ATO on your behalf. Everything is handled correctly to avoid delays or issues.',
  },
  {
    n: '4',
    title: 'Receive your payment',
    body: 'Once approved, your super is paid to your bank account. Most payments are received within a few weeks.',
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
              Don&apos;t leave money behind.<br /><span style={{ color: '#0B5240' }}>Get your super back.</span>
            </h1>
            <p className="font-semibold text-ink mb-2.5" style={{ fontSize: '14px', letterSpacing: '-0.01em' }}>
              Every employer in Australia pays 12% of your wages into a super fund.
              That money is yours, and you can claim it back.
            </p>
            <p className="font-light leading-[1.7] mb-5" style={{ fontSize: '14px', color: 'rgba(10,15,13,0.55)', maxWidth: '420px' }}>
              Once you leave Australia, you can claim your super back.
              We manage the full process for you from start to finish.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 items-stretch sm:items-center mb-5">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '46px', padding: '0 22px', fontSize: '13.5px' }}>
                Claim your super
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <Link href="#how-it-works" className="btn-ghost-dark" style={{ height: '46px', padding: '0 18px', fontSize: '13.5px' }}>
                How it works
              </Link>
            </div>
            <p className="text-[11px]" style={{ color: 'rgba(10,15,13,0.38)' }}>
              Handled under a registered tax agent&nbsp;•&nbsp;Fully ATO compliant
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
                Your money sitting in a fund<br /><em className="not-italic font-normal text-forest-400">waiting to be claimed.</em>
              </h2>
              <div className="prose-wht max-w-[460px]">
                <p>Super is money your employer pays on top of your salary. In Australia, this is 12% of your wages and it is required by law.</p>
                <p>If you are on a Working Holiday visa, you can claim this money back when you leave Australia.</p>
              </div>
              <div className="info-block">
                <p>When you claim your super, tax is applied and you keep about 35% of the total.
                Even after tax, most travellers receive hundreds to thousands of dollars.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 reveal delay-1">
              {[
                { title: 'Contribution rate',  body: '12% of your wages paid by your employer into your super fund.' },
                { title: 'Who can claim',      body: 'Working Holiday visa holders who have left Australia and whose visa has expired or been cancelled.' },
                { title: 'Processing time',    body: 'Usually up to 28 days after approval for balances under $5,000.' },
                { title: 'Payment method',     body: 'Paid directly to your Australian bank account.' },
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
                You can claim your super when<br /><em className="not-italic font-normal text-forest-400">you leave Australia.</em>
              </h2>
              <div className="space-y-0">
                {[
                  { label: 'Your visa has expired or been cancelled', body: 'You can apply as soon as you leave Australia - no need to wait.' },
                  { label: 'You no longer hold an Australian visa', body: 'You must not have another active visa in Australia.' },
                  { label: 'You have super contributions', body: 'Make sure your latest super payment has been received from your employer.' },
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
                What you will need<br /><em className="not-italic font-normal text-forest-400">to claim your super.</em>
              </h2>
              <div className="space-y-2.5 mb-5">
                {[
                  'Passport details',
                  'Tax File Number (TFN)',
                  'Super fund name and member number (if known)',
                  'Super fund start date (if known)',
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
                  Not sure what you have? We&apos;ll help you figure it out.
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
              We find your super, prepare your claim, and submit everything for you.
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
              Claim your super
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
                Super questions, answered.
              </h2>
              <p className="font-light text-muted leading-[1.65] mb-5" style={{ fontSize: '12.5px' }}>
                Not sure if you can claim or how much you&apos;ll get? Ask our experts.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex" style={{ height: '42px', padding: '0 18px', fontSize: '13px' }}>
                Get help from experts
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
            <div className="reveal delay-1 max-w-[680px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="Ready to claim?"
        heading="Thousands of dollars"
        headingEm="could be waiting for you."
        sub="We find your super, handle your claim, and make sure you get every dollar."
        primaryLabel="Claim your super"
      />
    </>
  )
}
