import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'ABN Registration for Working Holiday Visa Holders',
  description: 'Register your ABN correctly as a Working Holiday Visa contractor. Clear process, professional guidance, correct setup.',
}

const faqs = [
  {
    question: 'Can I have both a TFN and an ABN?',
    answer: 'Yes. You can have both — one for employment and one for contract work.',
  },
  {
    question: 'Can I get an ABN without a TFN?',
    answer: 'No. You must have a TFN before applying for an ABN.',
  },
  {
    question: 'Do I need to register for GST?',
    answer: 'Only if you earn over $75,000 per year. Most people on a Working Holiday visa do not need GST.',
  },
  {
    question: 'What happens to my ABN when I leave Australia?',
    answer: 'You can cancel your ABN when you stop working in Australia. This can be done online.',
  },
  {
    question: 'Can my ABN be rejected?',
    answer: 'Yes. If your details do not match your work, your ABN application may be unsuccessful.',
  },
]

const STEPS = [
  { n: '1', title: 'Check your situation',        body: 'Confirm if you need an ABN.' },
  { n: '2', title: 'Submit your details',          body: 'Quick form with basic information.' },
  { n: '3', title: 'We prepare your application',  body: 'Handled correctly with guidance.' },
  { n: '4', title: 'You receive your ABN',         body: 'Ready to start working.' },
]

const BENEFITS = [
  { title: 'Clear guidance from the start', body: 'We help you understand if you need an ABN.' },
  { title: 'Registered correctly',          body: 'Your ABN matches your actual work.' },
  { title: 'Simple process',               body: 'No confusion, everything explained clearly.' },
  { title: 'Ongoing support',              body: "We're here if you need help later." },
]

const IMPORTANCE_CARDS = [
  { title: 'Correct business structure', body: 'Set up based on your situation.' },
  { title: 'Accurate activity description', body: 'Matches the work you actually do.' },
  { title: 'Clear income handling',      body: 'Understand how your earnings are reported.' },
  { title: 'Ongoing compliance',         body: 'Stay aligned with your obligations.' },
]

const WHEN_YOU_NEED = [
  'Freelance or contract work',
  'Invoicing clients',
  'Running a small business',
  'Working independently',
]

const TickIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}>
    <circle cx="7" cy="7" r="6.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
    <path d="M4.5 7l2 2 3-3" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function ABNPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-10 pb-12 lg:pt-14 lg:pb-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6" style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">ABN Registration</span>
          </nav>

          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>ABN Registration</span>
            </div>

            <h1 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              Register your ABN correctly, and{' '}
              <span style={{ color: '#0B5240' }}>start working the right way.</span>
            </h1>

            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.6)', maxWidth: '44ch', marginBottom: '28px', fontWeight: 300 }}>
              We guide you through the registration so your ABN matches your work and situation.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center" style={{ marginBottom: '20px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height: '52px', padding: '0 32px', fontSize: '15px', borderRadius: '100px' }}>
                Start your ABN →
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
            Not sure if you need an ABN?
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: '44ch', margin: '0 auto 20px', lineHeight: 1.65, fontWeight: 300 }}>
            We help you understand if an ABN is right for your situation.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold w-full sm:w-auto"
            style={{ height: '48px', padding: '0 28px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px', maxWidth: '240px', margin: '0 auto' }}>
            Check your situation →
          </a>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '36px' }}>
            <span className="section-label center">What we do for you</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px' }}>
              Clear, guided, and done correctly.
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
              style={{ height: '52px', padding: '0 32px', fontSize: '15px', maxWidth: '240px', margin: '0 auto' }}>
              Start your ABN →
            </a>
          </div>
        </div>
      </section>

      {/* ── GETTING IT RIGHT ─────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '36px' }}>
            <span className="section-label center">Getting it right</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px' }}>
              Getting your ABN right matters.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ alignItems: 'stretch' }}>
            {IMPORTANCE_CARDS.map((item, i) => (
              <div key={i} className="rounded-2xl flex flex-col"
                style={{ padding: '22px', background: '#F7FCF9', border: '1px solid #C8EAE0', height: '100%' }}>
                <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '8px', lineHeight: 1.3 }}>{item.title}</p>
                <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{item.body}</p>
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
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '240px', margin: '0 auto' }}>
              Start your ABN →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT IS AN ABN ───────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            <div>
              <span className="section-label">What an ABN is</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '18px' }}>
                An Australian Business Number.
              </h2>
              <p className="font-light text-body" style={{ fontSize: '14px', lineHeight: 1.75, maxWidth: '38ch' }}>
                An Australian Business Number is used when working as a contractor or running your own business. It identifies you when invoicing clients and managing your tax obligations.
              </p>
            </div>

            <div>
              <span className="section-label">When you may need one</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '20px' }}>
                Common situations.
              </h2>
              <div className="flex flex-col" style={{ gap: '14px' }}>
                {WHEN_YOU_NEED.map((item, i) => (
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
                ABN questions, answered.
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
            Set up your ABN the right way.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: '40ch', margin: '0 auto 28px', lineHeight: 1.7, fontWeight: 300 }}>
            Clear process, correct setup, and support when you need it.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex w-full sm:w-auto justify-center"
            style={{ height: '54px', padding: '0 40px', fontSize: '15px', maxWidth: '240px', margin: '0 auto' }}>
            Start your ABN →
          </a>
        </div>
      </section>

      {/* ── TAX RETURN STRIP ─────────────────────────────────────────────── */}
      <NextStep
        eyebrow="What's next?"
        heading="Need to lodge your tax return?"
        body="We can help you handle it correctly."
        cta="Learn about tax returns →"
        href="/tax-return"
      />
    </>
  )
}
