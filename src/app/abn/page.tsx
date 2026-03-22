import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { NextStep, RelatedServices } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'ABN Registration for Working Holiday Visa Holders',
  description: 'Register your ABN correctly as a Working Holiday Visa contractor. We handle registration and tax obligations - simple, fast, online.',
}

const faqs = [
  {
    question: 'Can I have both a TFN and an ABN?',
    answer: 'Yes. You can have both, one for employment and one for contract work.',
  },
  {
    question: 'Can I get an ABN without a TFN?',
    answer: 'No. You must have a TFN before applying for an ABN.',
  },
  {
    question: 'Do I need to register for GST?',
    answer: 'Only if you earn over $75,000 per year. Most people on a Working Holiday do not need GST.',
  },
  {
    question: 'What happens to my ABN when I leave Australia?',
    answer: 'You can cancel your ABN when you stop working in Australia. This can be done online.',
  },
  {
    question: 'Can my ABN be rejected?',
    answer: 'Yes. If your details do not match your work, your ABN may be rejected.',
  },
]

const MISTAKES = [
  {
    title: 'Working as an employee with an ABN',
    body: 'If your employer controls your work, you may be considered an employee.',
  },
  {
    title: 'Incorrect business activity',
    body: 'Your ABN activity should match the work you actually do.',
  },
  {
    title: 'Not tracking your income properly',
    body: 'You need to track your income and set aside money for tax.',
  },
  {
    title: 'Not lodging your tax return',
    body: 'You must report your ABN income in your tax return.',
  },
]

const STEPS = [
  {
    n: '1',
    title: 'Check if you need an ABN',
    body: 'Make sure you are working as a contractor and not as an employee. Have your TFN and basic details ready before you apply.',
  },
  {
    n: '2',
    title: 'Submit your application',
    body: 'Apply online with your personal and work details in a few minutes. The process is simple, free, and done online.',
  },
  {
    n: '3',
    title: 'Application review',
    body: 'Your application is reviewed online after you submit your details. Most ABNs are approved instantly, while some may take longer.',
  },
  {
    n: '4',
    title: 'Receive your ABN',
    body: 'Once approved, your ABN is issued and ready to use immediately. You can start working and invoicing without any delays.',
  },
]

export default function ABNPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white hero-min hero-section">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 pt-8 pb-6 lg:pt-14 lg:pb-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-8" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">ABN Registration</span>
          </nav>

          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>ABN Registration</span>
            </div>

            <h1 className="font-serif font-black text-ink mb-4" style={{ fontSize: 'clamp(28px,3.5vw,44px)', lineHeight: 1.06, letterSpacing: '-0.03em' }}>
              Work legally with an ABN.<br />
              <span style={{ color: '#0B5240' }}>Pay the correct tax.</span>
            </h1>

            <p className="font-light leading-[1.8] mb-8" style={{ fontSize: '15px', color: 'rgba(10,15,13,0.6)', maxWidth: '480px' }}>
              Set up your ABN correctly from day one and avoid costly mistakes.
              We make sure it&apos;s done right from the start.
            </p>

            {/* Primary CTA — dominant */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-6">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary"
                style={{ height: '52px', padding: '0 32px', fontSize: '15px' }}>
                Register your ABN →
              </a>
              <Link href="#how-to-register"
                className="btn-ghost-dark"
                style={{ height: '52px', padding: '0 24px', fontSize: '15px' }}>
                How it works
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                '1,200+ travellers helped',
                'ATO compliant',
                'Response within 1 hour',
              ].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5" style={{ fontSize: '12px', color: 'rgba(10,15,13,0.5)' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <circle cx="6" cy="6" r="5.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                    <path d="M3.5 6l2 2 3-3" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NOT SURE? — FIRST DECISION POINT ─────────────────────────────── */}
      <section style={{ background: '#1A5C44' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-white mb-1" style={{ fontSize: '16px' }}>
                Not sure if you need an ABN?
              </p>
              <p className="font-light" style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.7)' }}>
                Get a clear answer in minutes - no obligation.
              </p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 font-semibold transition-all"
              style={{ height: '46px', padding: '0 22px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px', whiteSpace: 'nowrap' }}>
              Chat with experts →
            </a>
          </div>
        </div>
      </section>

      {/* ── MISTAKES / RISK — MOVED HIGH ─────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#FFFDF7' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mb-10 reveal">
            <span className="section-label">Common mistakes</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(20px,2.6vw,30px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              Setting up an ABN incorrectly<br />
              <em className="not-italic font-normal text-forest-400">can cost you later.</em>
            </h2>
            <p className="font-light text-muted leading-[1.65]" style={{ fontSize: '13.5px' }}>
              These are common mistakes that can delay your setup and cause problems later.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal delay-1">
            {MISTAKES.map((m, i) => (
              <div key={i} className="rounded-xl p-5 flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: '#FFFCF5', border: '1.5px solid #F0D99A', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 flex-shrink-0" style={{ background: '#FDF0D5', border: '1px solid #F0D99A' }}>
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v4M6 8.5v.5" stroke="#C47E10" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-[14px] font-bold text-ink mb-2">{m.title}</p>
                <p className="text-[13px] font-light text-muted leading-[1.7] flex-1">{m.body}</p>
              </div>
            ))}
          </div>

          {/* Solution nudge */}
          <div className="mt-8 rounded-xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 reveal delay-2" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
            <p className="text-[14px] font-light text-body leading-[1.65]">
              Not sure you are doing it right? We check everything and guide you before you submit.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1.5 font-semibold whitespace-nowrap"
              style={{ fontSize: '14px', color: '#0B5240' }}>
              We handle it for you →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOLUTION — WE HANDLE IT ───────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center mb-12 reveal">
            <span className="section-label center">How we help</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-4" style={{ fontSize: 'clamp(20px,2.6vw,30px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              We tell you what you need.<br />
              <em className="not-italic font-normal text-forest-400">Then we set it up correctly.</em>
            </h2>
            <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '14px' }}>
              If you are working as a freelancer or contractor in Australia, you need an ABN.
              We make sure it&apos;s set up correctly from the start.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 reveal delay-1">
            {[
              {
                n: '01',
                title: 'We tell you if you need one',
                body: 'Not sure if your work requires an ABN? We check your situation and give you a clear answer — no guessing.',
              },
              {
                n: '02',
                title: 'We set it up correctly',
                body: 'We handle the registration so your ABN matches your actual work. No rejections, no delays.',
              },
              {
                n: '03',
                title: 'Done right from day one',
                body: 'Avoid costly mistakes from the start. We make sure everything is correct so you can focus on working.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: '#F7FCF9', border: '1px solid #C8EAE0' }}>
                <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-subtle mb-4 block">{item.n}</span>
                <h3 className="font-semibold text-ink mb-3" style={{ fontSize: '15px', letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '13.5px' }}>{item.body}</p>
              </div>
            ))}
          </div>

          {/* CTA after solution */}
          <div className="text-center mt-10 reveal delay-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary"
              style={{ height: '52px', padding: '0 32px', fontSize: '15px' }}>
              Register your ABN →
            </a>
            <p className="mt-3 text-[12px]" style={{ color: 'rgba(10,15,13,0.45)' }}>
              Free to start&nbsp;•&nbsp;Registered tax agent&nbsp;•&nbsp;ATO compliant
            </p>
          </div>
        </div>
      </section>

      {/* ── GUIDED FLOW ───────────────────────────────────────────────────── */}
      <section id="how-to-register" className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

          <div className="max-w-xl mx-auto text-center mb-12 reveal">
            <span className="section-label center">Step by step</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(20px,2.6vw,30px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              Getting your ABN<br />
              <em className="not-italic font-normal text-forest-400">takes about 10 minutes.</em>
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '14px' }}>
              The process is straightforward. We guide you through every step.
            </p>
          </div>

          <div className="reveal delay-1">
            {/* Desktop */}
            <div className="hidden lg:block">
              <div className="relative flex items-start">
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-[2px]" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)', zIndex: 0 }} aria-hidden="true" />
                {STEPS.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white mb-5 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 4px #EEF7F2, 0 0 0 5px #C8EAE0' }}>
                      {s.n}
                    </div>
                    <p className="text-[14px] font-semibold text-ink mb-2 text-center" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.7] text-center">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex flex-col">
              {STEPS.map((s, i) => (
                <div key={i} className="flex gap-4 pb-7">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white" style={{ background: '#0B5240' }}>{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2 min-h-[32px]" style={{ background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                  </div>
                  <div className="pt-1">
                    <p className="text-[14px] font-semibold text-ink mb-1.5" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.65]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS AN ABN (INFO — MOVED LOWER) ─────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">

            <div className="reveal">
              <span className="section-label">What is an ABN?</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(20px,2.5vw,30px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
                An Australian Business Number lets you work<br />
                <em className="not-italic font-normal text-forest-400">and invoice legally in Australia.</em>
              </h2>

              <div className="space-y-4 mb-6 max-w-[480px]">
                <p className="text-[13.5px] font-light text-body leading-[1.75]">
                  An ABN is an 11 digit number that identifies you when working as a contractor or freelancer in Australia. You include it on every invoice you send.
                </p>
                <p className="text-[13.5px] font-light text-body leading-[1.75]">
                  With an ABN, no tax is withheld automatically. You receive the full amount and manage your own tax.
                </p>
              </div>

              <div className="rounded-xl px-5 py-4 max-w-[480px]" style={{ background: '#EAF6F1', borderLeft: '3px solid #0B5240' }}>
                <p className="text-[14px] font-semibold text-ink leading-[1.8]">
                  TFN = employee income<br />
                  ABN = freelance income
                </p>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-1 gap-3 reveal delay-1">
                {[
                  { title: 'Issued by',       body: 'The Australian Business Register, administered by the ATO.' },
                  { title: 'Format',          body: 'An 11 digit number you include on your invoices.' },
                  { title: 'Cost',            body: 'Free to apply. No government fees.' },
                  { title: 'Processing time', body: 'Most ABNs are issued immediately online after approval.' },
                ].map((c, i) => (
                  <div key={i} className="rounded-xl px-5 py-4" style={{ border: '1px solid #E2EFE9', background: '#FAFCFB' }}>
                    <p className="text-[13px] font-semibold text-ink mb-0.5">{c.title}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.65]">{c.body}</p>
                  </div>
                ))}
              </div>

              {/* When you need one */}
              <div className="mt-6 reveal delay-2">
                <span className="section-label" style={{ marginBottom: '12px', display: 'block' }}>When you need one</span>
                <div className="space-y-2.5">
                  {[
                    ['Freelance work', '(design, photography, writing)'],
                    ['Contract or casual jobs', 'where you invoice'],
                    ['Farm or harvest work', 'paid on ABN'],
                    ['Remote work', 'for Australian clients'],
                    ['Any job', 'where you send invoices instead of payslips'],
                  ].map(([bold, rest], i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                        <circle cx="7" cy="7" r="6.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                        <path d="M4.5 7l2 2 3-3" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-[13px] font-light text-body leading-[1.65]">
                        <span className="font-semibold">{bold}</span> {rest}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CROSS LINK ────────────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid #E2EFE9', borderBottom: '1px solid #E2EFE9', background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="font-light text-muted" style={{ fontSize: '13.5px' }}>
            Working in Australia? Make sure you also have a TFN.
          </p>
          <a href="/tfn" className="inline-flex items-center gap-1.5 font-semibold whitespace-nowrap transition-colors hover-forest-light flex-shrink-0" style={{ fontSize: '13px', color: '#0B5240' }}>
            Apply for your TFN →
          </a>
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 lg:gap-16 items-start">

            <div className="reveal">
              <span className="section-label">Questions</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(20px,2.6vw,30px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
                ABN questions, answered.
              </h2>
              <p className="font-light text-muted leading-[1.65] mb-6" style={{ fontSize: '13.5px' }}>
                Still unsure? Ask our tax experts.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex"
                style={{ height: '48px', padding: '0 22px', fontSize: '14px' }}>
                Ask us now →
              </a>
            </div>

            <div className="reveal delay-1 max-w-[700px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="What's next?"
        heading="ABN sorted? Time to lodge your tax return."
        body="At the end of the Australian financial year, you will need to lodge a tax return and declare your ABN income."
        cta="Learn about tax returns →"
        href="/tax-return"
      />

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
      <RelatedServices items={[
        { label: 'TFN Application',   desc: 'Required to work in Australia', href: '/tfn' },
        { label: 'Tax Return',        desc: 'Declare your income and claim your refund', href: '/tax-return' },
        { label: 'Super Withdrawal',  desc: 'Claim your super when you leave', href: '/superannuation' },
      ]} />

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="Not sure?"

        heading="Not sure if you need an ABN?"
        headingEm="Get a clear answer in minutes."
        sub="We'll tell you if you need an ABN and set it up correctly."
        primaryLabel="Chat with experts"
      />
    </>
  )
}
