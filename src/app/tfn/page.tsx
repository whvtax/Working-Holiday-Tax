import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'TFN Application for Working Holiday Visa Holders',
  description: 'Get your Tax File Number sorted fast. Apply correctly the first time with step-by-step guidance from a registered tax agent.',
}

const faqs = [
  {
    question: 'Can I start work before I receive my TFN?',
    answer: 'Yes. You can start working, but you must provide your TFN within 28 days. Until then, your employer may withhold tax at a higher rate.',
  },
  {
    question: 'Where will my TFN be sent?',
    answer: 'Your TFN is sent by post to your Australian address. Make sure you use an address where you can receive mail.',
  },
  {
    question: 'Can I get a TFN on a tourist visa?',
    answer: 'No. You need a valid work visa, such as a Working Holiday visa 417 or 462.',
  },
  {
    question: 'What if I lose my TFN?',
    answer: 'You can find your TFN in previous tax returns, request it from the ATO, or ask your tax agent.',
  },
  {
    question: 'What is a TFN Declaration Form?',
    answer: 'A form you complete when starting a job. It tells your employer how much tax to withhold from your pay.',
  },
]

const MISTAKES = [
  {
    title: 'Incorrect personal details',
    body: 'Make sure your personal details and visa subclass match your passport and ImmiAccount. Errors here can delay your application.',
  },
  {
    title: 'Wrong postal address',
    body: 'Your TFN is sent by post. Use a reliable Australian address where you can receive mail (you can use your hostel address).',
  },
  {
    title: 'Applying too late',
    body: 'You must provide your TFN within 28 days of starting work. Apply early to avoid delays.',
  },
  {
    title: 'Using unofficial websites',
    body: 'Apply only through the official ATO website. The application is free, so avoid unnecessary fees.',
  },
]

const STEPS = [
  {
    n: '1',
    title: 'Check your eligibility',
    body: 'Make sure you are in Australia and have a valid visa and your passport details ready.',
  },
  {
    n: '2',
    title: 'Submit your application',
    body: 'Apply through the official ATO website. The process takes around 10 minutes and is free.',
  },
  {
    n: '3',
    title: 'ATO reviews your details',
    body: 'Your application is reviewed by the ATO, and you will receive confirmation by email.',
  },
  {
    n: '4',
    title: 'Receive your TFN',
    body: 'Your TFN is sent by post once your application is approved. You can receive it by phone after about a week.',
  },
]

export default function TFNPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 pt-10 pb-8 lg:pt-16 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-8" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">TFN Application</span>
          </nav>

          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>TFN Application</span>
            </div>

            <h1 className="font-serif font-black text-ink mb-4" style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.06, letterSpacing: '-0.03em' }}>
              Get your TFN sorted quickly<br />
              <span style={{ color: '#0B5240' }}>and start working sooner.</span>
            </h1>

            <p className="font-semibold text-ink mb-3" style={{ fontSize: '16px', letterSpacing: '-0.01em' }}>
              We guide you through every step and make sure your application is correct the first time.
            </p>

            <p className="font-light leading-[1.8] mb-8" style={{ fontSize: '15px', color: 'rgba(10,15,13,0.6)', maxWidth: '520px' }}>
              Without a TFN you pay 47% tax. Apply before you start work.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-6">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary"
                style={{ height: '52px', padding: '0 32px', fontSize: '15px' }}>
                Start your TFN →
              </a>
              <Link href="#how-to-apply"
                className="btn-ghost-dark"
                style={{ height: '52px', padding: '0 24px', fontSize: '15px' }}>
                How it works
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                'Handled under a registered tax agent',
                'Fully ATO compliant',
                '1,200+ travellers helped',
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

      {/* ── URGENCY STRIP ─────────────────────────────────────────────────── */}
      <section style={{ background: '#1A5C44' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-white mb-0.5" style={{ fontSize: '15px' }}>
                Without a TFN, 47% tax is withheld from every payslip.
              </p>
              <p className="font-light" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                Apply before you start work to pay the correct rate from day one.
              </p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 font-semibold transition-all"
              style={{ height: '44px', padding: '0 20px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '13.5px', whiteSpace: 'nowrap' }}>
              Apply now →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT IS A TFN ─────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">

            <div className="reveal">
              <span className="section-label">What is a TFN?</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(22px,2.8vw,32px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
                A Tax File Number you need to work and pay
                <br /><em className="not-italic font-normal text-forest-400">the correct tax in Australia.</em>
              </h2>
              <div className="space-y-4 mb-6 max-w-[460px]">
                {[
                  'A unique 9-digit number that identifies you in the Australian tax system.',
                  'Required to work, lodge a tax return, and access government services.',
                  'Stays with you for life, even if you leave and return to Australia.',
                  'Free to apply through the official ATO website.',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                      <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[13.5px] font-light text-body leading-[1.7]">{point}</p>
                  </div>
                ))}
              </div>
              <div className="info-block">
                <p>Free to apply. Your TFN usually arrives within 7 to 28 days by post.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 reveal delay-1">
              {[
                { title: 'Issued by',         body: 'The Australian Taxation Office (ATO), Australia\'s official tax authority.' },
                { title: 'Delivery address',  body: 'After approval, your TFN is issued and sent by post to your Australian address.' },
                { title: 'Application cost',  body: 'Free via the ATO. We offer a guided service to help you apply correctly.' },
                { title: 'What you need',     body: 'Passport, valid visa, Australian address, contact email, and an Australian phone number.' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-xl px-5 py-4" style={{ border: '1px solid #C8EAE0', boxShadow: '0 1px 3px rgba(0,0,0,.03)' }}>
                  <p className="text-[13px] font-semibold text-ink mb-1">{c.title}</p>
                  <p className="text-[13px] font-light text-muted leading-[1.65]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY + WHO ──────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            <div className="reveal">
              <span className="section-label">Why you need one</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-6" style={{ fontSize: 'clamp(22px,2.8vw,32px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
                Without a TFN, 47% tax is withheld<br />
                <em className="not-italic font-normal text-forest-400">from your income.</em>
              </h2>
              <div className="space-y-0">
                {[
                  {
                    label: 'Legal requirement',
                    body: 'Employers in Australia require your TFN for tax purposes. Without it, higher tax is withheld.',
                  },
                  {
                    label: 'Correct tax rate',
                    body: 'With a TFN, you pay the correct tax rate starting from 15% for WHV holders.',
                  },
                  {
                    label: 'Tax refund',
                    body: 'A TFN is required to lodge your tax return, set up a super account, and open a bank account.',
                  },
                ].map((item, i) => (
                  <div key={i} className="py-5" style={{ borderTop: '1px solid #E2EFE9' }}>
                    <p className="text-[14px] font-semibold text-ink mb-1.5" style={{ letterSpacing: '-0.01em' }}>{item.label}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.7]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
              <div className="mt-6">
                <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium transition-colors hover-forest-light"
                  style={{ fontSize: '13.5px', color: '#0B5240' }}>
                  Apply now and get guided support →
                </a>
              </div>
            </div>

            <div className="reveal delay-1">
              <span className="section-label">Who needs a TFN?</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(22px,2.8vw,32px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
                If you earn income in Australia,<br />
                <em className="not-italic font-normal text-forest-400">you need a TFN.</em>
              </h2>
              <p className="font-light text-muted leading-[1.7] mb-5" style={{ fontSize: '13.5px' }}>
                No matter your visa or job, if you earn income in Australia, you need a TFN.
              </p>
              <div className="space-y-4 mb-6">
                {[
                  'Working Holiday Visa holders (subclass 417 or 462)',
                  'New arrivals starting work',
                  'Seasonal or casual workers',
                  'Contractors or sole traders invoicing clients',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                      <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[13.5px] font-light text-body leading-[1.65]">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-5 py-4" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                <p className="text-[13.5px] font-light text-body leading-[1.7]">
                  You can start working, but you must provide your TFN within 28 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO APPLY ──────────────────────────────────────────────────── */}
      <section id="how-to-apply" className="py-14 lg:py-20" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

          <div className="max-w-xl mx-auto text-center mb-12 reveal">
            <span className="section-label center">How to apply</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(22px,2.8vw,32px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              Apply in minutes.<br />
              <em className="not-italic font-normal text-forest-400">Start working sooner.</em>
            </h2>
            <p className="font-semibold text-ink mb-1" style={{ fontSize: '14px' }}>
              Get guided support throughout the process.
            </p>
            <p className="font-light text-muted" style={{ fontSize: '13px' }}>
              Free to apply. Simple and fully guided.
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
                <div key={i} className="flex gap-4 pb-6">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white" style={{ background: '#0B5240' }}>{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2 min-h-[32px]" style={{ background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                  </div>
                  <div className="pt-1">
                    <p className="text-[14px] font-semibold text-ink mb-1" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.65]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10 reveal delay-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '52px', padding: '0 32px', fontSize: '15px' }}>
              Start your TFN →
            </a>
          </div>
        </div>
      </section>

      {/* ── COMMON MISTAKES ───────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

          <div className="max-w-xl mb-10 reveal">
            <span className="section-label">Avoid these mistakes</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(22px,2.8vw,32px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              4 mistakes that delay<br />
              <em className="not-italic font-normal text-forest-400">your TFN application.</em>
            </h2>
            <p className="font-light text-muted leading-[1.65]" style={{ fontSize: '13.5px' }}>
              These mistakes can delay your application and delay when you can start working.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal delay-1">
            {MISTAKES.map((m, i) => (
              <div key={i} className="rounded-xl p-5 flex flex-col" style={{ background: '#FFFCF5', border: '1.5px solid #F0D99A', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                <div className="w-7 h-7 rounded-md flex items-center justify-center mb-4 flex-shrink-0" style={{ background: '#FDF0D5' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v4M6 8.5v.5" stroke="#C47E10" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-[13.5px] font-semibold text-ink mb-2">{m.title}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.7] flex-1">{m.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 reveal delay-2" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
            <p className="text-[13.5px] font-light text-body leading-[1.65]">
              Not sure you are doing it right? We check everything and guide you before you submit.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1.5 font-semibold whitespace-nowrap transition-colors hover-forest-light"
              style={{ fontSize: '13.5px', color: '#0B5240' }}>
              We handle it for you →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20" style={{ background: '#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 lg:gap-16 items-start">

            <div className="reveal">
              <span className="section-label">Questions</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(22px,2.8vw,32px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
                TFN questions, answered.
              </h2>
              <p className="font-light text-muted leading-[1.65] mb-6" style={{ fontSize: '13.5px' }}>
                Still unsure? Ask our tax experts.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex"
                style={{ height: '48px', padding: '0 22px', fontSize: '14px' }}>
                Get help now →
              </a>
            </div>

            <div className="reveal delay-1 max-w-[680px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="Apply now"
        heading="Start working with the correct tax rate."
        headingEm=""
        sub="Apply in minutes with expert guidance. No errors, no delays, no overpaid tax."
        primaryLabel="Start your TFN application"
      />
    </>
  )
}
