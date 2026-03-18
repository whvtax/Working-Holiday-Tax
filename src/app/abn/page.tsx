import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'ABN Registration for Working Holiday Visa Holders',
  description: 'Register your ABN correctly as a Working Holiday Visa contractor. We handle registration and tax obligations - simple, fast, online.',
}

const faqs = [
  {
    question: 'Can I have both a TFN and an ABN?',
    answer: 'Yes. You can have both - one for employment (TFN) and one for contracting (ABN).',
  },
  {
    question: 'Is the ABN registration free?',
    answer: 'Yes. ABN registration is free.',
  },
  {
    question: 'Do I need to register for GST?',
    answer: 'Only if you earn over $75,000 per year. Most people don\'t need GST.',
  },
  {
    question: 'What happens to my ABN when I leave Australia?',
    answer: 'You can cancel your ABN when you stop working. Do it through the official ABR website.',
  },
  {
    question: 'Can my ABN be rejected?',
    answer: 'Yes. If you\'re not running a real business, your ABN can be rejected.',
  },
]

const MISTAKES = [
  {
    title: 'Using ABN as an employee',
    body: 'If your employer controls your work, you\'re likely an employee.',
  },
  {
    title: 'Wrong activity description',
    body: 'Your ABN activity must match what you do.',
  },
  {
    title: 'Not tracking your income',
    body: 'You must track your income and set aside tax.',
  },
  {
    title: 'Not lodging your tax return',
    body: 'ABN income must be reported.',
  },
]

const STEPS = [
  {
    n: '1',
    title: 'Check if you need one',
    body: 'Make sure you\'re working as a contractor (not employee). Have your TFN and basic details ready.',
  },
  {
    n: '2',
    title: 'Submit your registration',
    body: 'Apply online in about 10 minutes - free.',
  },
  {
    n: '3',
    title: 'Application review',
    body: 'Most ABNs are approved instantly. Some may take longer.',
  },
  {
    n: '4',
    title: 'Receive your ABN',
    body: 'Receive your ABN and start invoicing.',
  },
]

export default function ABNPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-8 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-6" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">ABN Registration</span>
          </nav>

          {/* Left-aligned hero */}
          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>Service guide</span>
            </div>

            <h1 className="font-serif font-black text-ink mb-3" style={{ fontSize: 'clamp(22px,3.5vw,40px)', lineHeight: 1.06, letterSpacing: '-0.025em' }}>
              Invoice legally.<br />
              <span style={{ color: '#0B5240' }}>Pay the right tax.</span>
            </h1>

            <p className="font-semibold text-ink mb-2" style={{ fontSize: '14.5px', letterSpacing: '-0.01em' }}>
              Set up your ABN properly from day one - and avoid costly mistakes.
            </p>

            <p className="font-light leading-[1.75] mb-6" style={{ fontSize: '14px', color: 'rgba(10,15,13,0.58)', maxWidth: '520px' }}>
              If you&apos;re working as a freelancer or contractor in Australia, you need an ABN.
              We make sure you get it right - quickly and correctly.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center mb-5">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary"
                style={{ height: '46px', padding: '0 24px', fontSize: '14px' }}>
                Register my ABN →
              </a>
              <Link href="#how-to-register"
                className="btn-ghost-dark"
                style={{ height: '46px', padding: '0 20px', fontSize: '14px' }}>
                How to register
              </Link>
            </div>

            <p className="text-[11px]" style={{ color: 'rgba(10,15,13,0.38)' }}>
              Under the supervision of a registered tax agent approved by the ATO
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT IS AN ABN ───────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">

            {/* Left — left-aligned */}
            <div className="reveal">
              <span className="section-label">What is an ABN?</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-4" style={{ fontSize: 'clamp(18px,2.4vw,28px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Your number to invoice<br />
                <em className="not-italic font-normal text-forest-400">and trade legally.</em>
              </h2>

              <div className="space-y-4 max-w-[520px]">
                <p className="text-[13.5px] font-light text-body leading-[1.75]">
                  An ABN is an 11-digit number that lets you work as a contractor or freelancer in Australia.
                  You use it on every invoice you send.
                </p>
                <p className="text-[13.5px] font-light text-body leading-[1.75]">
                  With an ABN, no tax is taken out automatically.
                  You receive the full amount - and handle your own tax.
                </p>
              </div>

              {/* TFN vs ABN comparison — visually prominent */}
              <div className="mt-5 rounded-xl px-4 py-4 max-w-[520px]" style={{ background: '#EAF6F1', borderLeft: '3px solid #0B5240' }}>
                <p className="text-[13.5px] font-semibold text-ink leading-[1.8]">
                  TFN = employee income<br />
                  ABN = contractor or freelance income
                </p>
              </div>
            </div>

            {/* Right — fact cards, tighter */}
            <div className="grid grid-cols-1 gap-2.5 reveal delay-1">
              {[
                { title: 'Issued by',       body: 'The Australian Business Register (ABR), administered by the ATO.' },
                { title: 'Format',          body: 'An 11-digit number you include on all invoices.' },
                { title: 'Cost',            body: 'Free. No government fees.' },
                { title: 'Processing time', body: 'Most ABNs are issued immediately online.' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-xl px-4 py-3" style={{ border: '1px solid #C8EAE0', boxShadow: '0 1px 3px rgba(0,0,0,.03)' }}>
                  <p className="text-[13px] font-semibold text-ink mb-0.5">{c.title}</p>
                  <p className="text-[12.5px] font-light text-muted leading-[1.65]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHEN YOU NEED ONE + IMPORTANT TO UNDERSTAND ──────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* When — left-aligned */}
            <div className="reveal">
              <span className="section-label">When you need one</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-4" style={{ fontSize: 'clamp(18px,2.4vw,28px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                You need an ABN when<br />
                <em className="not-italic font-normal text-forest-400">you are not an employee.</em>
              </h2>
              <p className="font-light text-muted leading-[1.7] mb-5" style={{ fontSize: '13px' }}>
                You need an ABN if you work as a contractor or freelancer - not an employee. For example:
              </p>
              <div className="space-y-2.5">
                {[
                  ['Freelance work', '(design, photography, writing)'],
                  ['Contract trades', 'or labour work'],
                  ['Farm or harvest work', 'on ABN'],
                  ['Remote or online work', 'for Australian clients'],
                  ['Any work', 'where you invoice clients'],
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

            {/* Important — left-aligned */}
            <div className="reveal delay-1">
              <span className="section-label">Important to understand</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-4" style={{ fontSize: 'clamp(18px,2.4vw,28px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                ABN means you handle<br />
                <em className="not-italic font-normal text-forest-400">your own tax.</em>
              </h2>
              <div className="space-y-0">
                {[
                  {
                    label: 'No tax withheld',
                    body: 'You get paid in full - no tax is withheld. Set aside ~15-25% for tax.',
                  },
                  {
                    label: 'Report all income',
                    body: 'You must report all ABN income in your tax return. The ATO can track this.',
                  },
                  {
                    label: 'No super paid for you',
                    body: 'No super is paid for you. You are responsible for your own savings.',
                  },
                ].map((item, i) => (
                  <div key={i} className="py-3.5" style={{ borderTop: '1px solid #E2EFE9' }}>
                    <p className="text-[13px] font-semibold text-ink mb-0.5" style={{ letterSpacing: '-0.01em' }}>{item.label}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.7]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
              <div className="mt-5 rounded-xl px-4 py-3" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                <p className="text-[13px] font-light text-body leading-[1.7]">
                  <span className="font-semibold text-forest-500">Not sure if you need an ABN?</span>{' '}
                  We&apos;ll help you figure it out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO REGISTER ──────────────────────────────────────────────── */}
      <section id="how-to-register" className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

          {/* Centered heading */}
          <div className="max-w-xl mx-auto text-center mb-10 reveal">
            <span className="section-label center">Step by step</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-2" style={{ fontSize: 'clamp(18px,2.4vw,28px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Getting your ABN<br />
              <em className="not-italic font-normal text-forest-400">takes about 10 minutes.</em>
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '12.5px' }}>
              The process is straightforward.
            </p>
          </div>

          {/* Desktop timeline */}
          <div className="reveal delay-1">
            <div className="hidden lg:block">
              <div className="relative flex items-start">
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-[2px]" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)', zIndex: 0 }} aria-hidden="true" />
                {STEPS.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center px-4" style={{ zIndex: 1 }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white mb-4 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 3px #EEF7F2, 0 0 0 4px #C8EAE0' }}>
                      {s.n}
                    </div>
                    <p className="text-[13px] font-semibold text-ink mb-1.5 text-center" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p className="text-[11.5px] font-light text-muted leading-[1.65] text-center">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
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
        </div>
      </section>

      {/* ── COMMON MISTAKES ───────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mb-8 reveal">
            <span className="section-label">Common mistakes</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-2" style={{ fontSize: 'clamp(18px,2.4vw,28px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Common mistakes that<br />
              <em className="not-italic font-normal text-forest-400">cost you later.</em>
            </h2>
            <p className="font-light text-muted leading-[1.65]" style={{ fontSize: '13px' }}>
              These are the most common issues with ABN registrations and obligations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 reveal delay-1">
            {MISTAKES.map((m, i) => (
              <div key={i} className="rounded-xl p-4 flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: '#FFFCF5', border: '1.5px solid #F0D99A', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-3 flex-shrink-0" style={{ background: '#FDF0D5', border: '1px solid #F0D99A' }}>
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v4M6 8.5v.5" stroke="#C47E10" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-[13px] font-bold text-ink mb-1.5">{m.title}</p>
                <p className="text-[12px] font-light text-muted leading-[1.65] flex-1">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-16 items-start">

            {/* Left — left-aligned */}
            <div className="reveal">
              <span className="section-label">Questions</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(18px,2.4vw,28px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                ABN questions, answered.
              </h2>
              <p className="font-light text-muted leading-[1.65] mb-5" style={{ fontSize: '13px' }}>
                Still unsure? Ask us directly - we reply within minutes.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex"
                style={{ height: '42px', padding: '0 18px', fontSize: '13px' }}>
                Ask us now →
              </a>
            </div>

            {/* Right — left-aligned, max-width constrained */}
            <div className="reveal delay-1 max-w-[700px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="Not sure?"
        heading="Not sure if you need an ABN?"
        headingEm="We'll tell you in minutes."
        sub="We'll tell you if you need an ABN and set it up correctly."
        primaryLabel="Get started on WhatsApp"
      />
    </>
  )
}
