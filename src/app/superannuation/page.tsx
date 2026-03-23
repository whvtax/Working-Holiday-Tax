import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Super Withdrawal (DASP) for Working Holiday Visa Holders',
  description: 'Claim your Australian superannuation after leaving. We guide you through the DASP process with professional oversight.',
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
    question: 'I left Australia years ago — can I still claim?',
    answer: 'Yes. There is no time limit to claim your super. Even if your balance was transferred to the ATO, you can still claim it.',
  },
  {
    question: 'I worked for multiple employers — do I have multiple super accounts?',
    answer: 'You may have multiple super accounts from different employers. We help you find and consolidate everything before submitting your claim.',
  },
  {
    question: 'Do I receive super if I worked under an ABN?',
    answer: 'Generally no. Super is usually paid only to employees. If you worked under an ABN, clients are not required to pay super.',
  },
]

const STEPS = [
  { n: '1', title: 'Confirm eligibility',     body: 'Check if you can claim your super.' },
  { n: '2', title: 'Locate your funds',        body: 'We help identify your super accounts.' },
  { n: '3', title: 'We prepare and submit',    body: 'Handled correctly with the ATO.' },
  { n: '4', title: 'You receive your payment', body: 'We guide you until completion.' },
]

const BENEFITS = [
  { title: 'Check your eligibility',    body: 'We confirm if you can make a claim.' },
  { title: 'Understand your super',     body: 'We help you identify your funds.' },
  { title: 'Claim handled correctly',   body: 'Prepared with professional oversight.' },
  { title: 'Clear, guided process',     body: 'We support you step by step.' },
]

const TESTIMONIALS = [
  { name: 'Liam', from: 'UK',      quote: 'Clear and simple process from start to finish.',                    initials: 'L', bgColor: '#DBEAFE', textColor: '#1E40AF' },
  { name: 'Max',  from: 'Germany', quote: 'Everything was explained clearly and handled professionally.',       initials: 'M', bgColor: '#D1FAE5', textColor: '#065F46' },
]

const WHEN_CAN_CLAIM = [
  'When you have left Australia',
  'When your visa has expired or been cancelled',
  'When your employment has ended',
]

const WHAT_YOU_NEED = [
  'Passport details',
  'Tax File Number (if available)',
  'Super fund details (if known)',
  'Bank account for payment',
]

const IconStar = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/>
  </svg>
)

const TickIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}>
    <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
    <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function SuperannuationPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-10 pb-12 lg:pt-14 lg:pb-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6" style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Superannuation</span>
          </nav>

          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>Super Withdrawal</span>
            </div>

            <h1 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              Claim your super when you leave Australia,{' '}
              <span style={{ color: '#0B5240' }}>the right way.</span>
            </h1>

            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.6)', maxWidth: '44ch', marginBottom: '28px', fontWeight: 300 }}>
              We guide you through the process and handle your claim with professional oversight.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center" style={{ marginBottom: '20px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height: '52px', padding: '0 32px', fontSize: '15px', borderRadius: '100px' }}>
                Start your super claim →
              </a>
              <Link href="#how-it-works" className="btn-ghost-dark inline-flex justify-center" style={{ height: '52px', padding: '0 24px', fontSize: '15px' }}>
                How it works →
              </Link>
            </div>

            <p style={{ fontSize: '13px', color: 'rgba(10,15,13,0.4)' }}>
              Used by working holiday travellers across Australia
            </p>
          </div>
        </div>
      </section>

      {/* ── GREEN STRIP ──────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-10 text-center">
          <p className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '8px' }}>
            You may have super to claim.
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: '46ch', margin: '0 auto 20px', lineHeight: 1.65, fontWeight: 300 }}>
            If you worked in Australia, you may have funds available. We help you understand your eligibility.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold w-full sm:w-auto"
            style={{ height: '48px', padding: '0 28px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px', maxWidth: '240px', margin: '0 auto' }}>
            Check your eligibility →
          </a>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '36px' }}>
            <span className="section-label center">What we do for you</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px' }}>
              Guided from start to finish.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '36px', alignItems: 'stretch' }}>
            {BENEFITS.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 10px rgba(11,82,64,.05)', height: '100%' }}>
                <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '8px', lineHeight: 1.3 }}>{item.title}</p>
                <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex w-full sm:w-auto justify-center"
              style={{ height: '52px', padding: '0 32px', fontSize: '15px', maxWidth: '280px', margin: '0 auto' }}>
              Start your super claim →
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '32px' }}>
            <span className="section-label center">What travellers say</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px' }}>
              Real experiences from travellers like you.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto" style={{ alignItems: 'stretch' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.07)', border: '1px solid #E2EFE9', height: '100%' }}>
                <div className="flex gap-0.5" style={{ marginBottom: '12px' }}>
                  {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
                </div>
                <p className="font-light text-body flex-1" style={{ fontSize: '14px', lineHeight: 1.75, marginBottom: '16px' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2.5" style={{ paddingTop: '14px', borderTop: '1px solid #E2EFE9' }}>
                  <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                    style={{ width: '32px', height: '32px', fontSize: '11px', background: t.bgColor, color: t.textColor }}>{t.initials}</div>
                  <div>
                    <p className="font-semibold text-ink" style={{ fontSize: '12px', lineHeight: 1.2 }}>{t.name}</p>
                    <p className="text-subtle" style={{ fontSize: '11px', marginTop: '2px' }}>{t.from}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label center">How it works</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px' }}>
              4 simple steps.
            </h2>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block" style={{ marginBottom: '48px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px"
                style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)' }} aria-hidden="true" />
              {STEPS.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ background: '#0B5240', fontSize: '13px', marginBottom: '16px', boxShadow: '0 0 0 4px #EEF7F2, 0 0 0 5px #C8EAE0' }}>{s.n}</div>
                  <p className="font-semibold text-ink text-center" style={{ fontSize: '13.5px', marginBottom: '6px' }}>{s.title}</p>
                  <p className="font-light text-muted text-center" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col" style={{ marginBottom: '32px' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length - 1 ? '20px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ background: '#0B5240', fontSize: '12px' }}>{s.n}</div>
                  {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2"
                    style={{ minHeight: '20px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                </div>
                <div style={{ paddingTop: '3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px' }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex w-full sm:w-auto justify-center"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '280px', margin: '0 auto' }}>
              Start your super claim →
            </a>
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY + REQUIREMENTS ───────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            <div>
              <span className="section-label">Eligibility</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '24px' }}>
                When you can claim.
              </h2>
              <div className="flex flex-col" style={{ gap: '14px' }}>
                {WHEN_CAN_CLAIM.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <TickIcon />
                    <p className="font-light text-body" style={{ fontSize: '14px', lineHeight: 1.65 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="section-label">Requirements</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '24px' }}>
                What you may need.
              </h2>
              <div className="flex flex-col" style={{ gap: '14px' }}>
                {WHAT_YOU_NEED.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <TickIcon />
                    <p className="font-light text-body" style={{ fontSize: '14px', lineHeight: 1.65 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section style={{ background: '#F4F9F6', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-12 items-start">
            <div>
              <span className="section-label">Questions</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                Super questions, answered.
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '14px', lineHeight: 1.65, marginBottom: '24px' }}>
                Still unsure? We&apos;re happy to help.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex w-full sm:w-auto justify-center"
                style={{ height: '48px', padding: '0 24px', fontSize: '14px' }}>
                Get help →
              </a>
            </div>
            <div className="max-w-[680px]" style={{ alignSelf: 'start' }}>
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#1A5C44', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center">
          <h2 className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '22ch' }}>
            Claim your super the right way.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: '42ch', margin: '0 auto 28px', lineHeight: 1.7, fontWeight: 300 }}>
            Simple process, clear guidance, and support from start to finish.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex w-full sm:w-auto justify-center"
            style={{ height: '54px', padding: '0 40px', fontSize: '15px', maxWidth: '280px', margin: '0 auto' }}>
            Start your super claim →
          </a>
        </div>
      </section>

      {/* ── MEDICARE STRIP ───────────────────────────────────────────────── */}
      <NextStep
        eyebrow="What's next?"
        heading="Check your Medicare status."
        body="You may need to understand your Medicare obligations before leaving Australia."
        cta="Check Medicare eligibility →"
        href="/medicare"
      />
    </>
  )
}
