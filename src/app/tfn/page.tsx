import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'TFN Application for Working Holiday Visa Holders',
  description: 'Get your Tax File Number sorted quickly and correctly. Step-by-step guidance for Working Holiday Visa travellers from a registered tax agent.',
}

const faqs = [
  {
    question: 'Can I start work before I receive my TFN?',
    answer: 'Yes — but you must give your TFN to your employer within 28 days of starting. Until then, they must withhold tax at the highest rate (47%). Apply before or as soon as you start work.',
  },
  {
    question: 'Where will my TFN be sent?',
    answer: 'By post to your nominated Australian address. Use an address where you will be for at least 28 days — a hostel or PO Box is fine.',
  },
  {
    question: 'Can I get a TFN on a tourist visa?',
    answer: 'No. You need a work-eligible visa — such as a Working Holiday Visa (subclass 417 or 462). Tourist visas do not qualify.',
  },
  {
    question: 'What if I lose my TFN?',
    answer: 'Call the ATO on 13 28 61 (Monday to Friday, 8am–6pm), or find it on previous tax returns or via the ATO online portal.',
  },
  {
    question: 'What is a TFN Declaration Form?',
    answer: 'A form you complete when you start a new job. It tells your employer how much tax to withhold. As a WHV holder, select "No" for the tax-free threshold.',
  },
]

const MISTAKES = [
  {
    title: 'Incorrect visa details',
    body: 'Always use the exact subclass shown in your passport or ImmiAccount. Wrong details are the most common reason for delays.',
  },
  {
    title: 'Wrong postal address',
    body: 'Your TFN is posted, not emailed. Use a stable Australian address where you will be for at least 28 days.',
  },
  {
    title: 'Applying too late',
    body: 'You have 28 days from starting work. Apply immediately — do not wait until your employer asks for it.',
  },
  {
    title: 'Using unofficial websites',
    body: 'Apply only through the official ATO website. The application is free. Any site charging a fee is unnecessary.',
  },
]

const STEPS = [
  {
    n: '1',
    title: 'Check your eligibility',
    body: 'Confirm you hold a work-eligible visa (WHV 417 or 462). Have your passport and visa details ready.',
  },
  {
    n: '2',
    title: 'Submit your application',
    body: 'Apply via the official ATO website. Takes around 10 minutes. Completely free.',
  },
  {
    n: '3',
    title: 'ATO reviews your details',
    body: 'Processing takes 7 to 28 days by post. You may be able to confirm by phone within a week.',
  },
  {
    n: '4',
    title: 'Receive your TFN',
    body: 'Your TFN arrives by post. Give it to your employer straight away.',
  },
]

// Reusable inline CTA
function InlineCTA({ label = 'Get your TFN sorted — start here' }: { label?: string }) {
  return (
    <div className="mt-6">
      <a href={WA_URL} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-medium transition-colors"
        style={{ fontSize: '13px', color: '#0B5240' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#16775C'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#0B5240'}>
        {label}
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M2.5 6.5h8M7.5 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  )
}

export default function TFNPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-6 lg:py-12">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-5" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">TFN Application</span>
          </nav>

          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>TFN Application</span>
            </div>

            <h1 className="font-serif font-black text-ink mb-2.5" style={{ fontSize: 'clamp(20px,3.5vw,38px)', lineHeight: 1.06, letterSpacing: '-0.025em' }}>
              Get your TFN sorted<br /><span style={{ color: '#0B5240' }}>quickly and correctly.</span>
            </h1>

            <p className="font-light leading-[1.7] mb-5 mx-auto" style={{ fontSize: '14px', color: 'rgba(10,15,13,0.58)', maxWidth: '400px' }}>
              Without a TFN, your employer takes 47% of your pay. Apply before you start work — we make it quick and correct.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 items-stretch sm:items-center justify-center mb-4">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '46px', padding: '0 22px', fontSize: '13.5px' }}>
                Start your TFN on WhatsApp
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <Link href="#how-to-apply" className="btn-ghost-dark" style={{ height: '46px', padding: '0 18px', fontSize: '13.5px' }}>
                How it works
              </Link>
            </div>

            <p className="text-[11px]" style={{ color: 'rgba(10,15,13,0.38)' }}>
              Free to start&nbsp;•&nbsp;Registered tax agent&nbsp;•&nbsp;1,200+ travellers helped
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT IS A TFN ─────────────────────────────────────────────────── */}
      <section className="py-7 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-20 items-start">

            <div className="reveal">
              <span className="section-label">What is a TFN?</span>
              <h2 className="font-serif font-black text-ink mt-1.5 mb-3" style={{ fontSize: 'clamp(18px,2.4vw,28px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                A number that lets you<br /><em className="not-italic font-normal text-forest-400">work at the right tax rate.</em>
              </h2>
              <div className="space-y-3 mb-4 max-w-[440px]">
                {[
                  'A unique 9-digit number that identifies you in the Australian tax system.',
                  'Required when you start work, lodge a tax return, or access government services.',
                  'Permanent — it stays with you for life, even if you leave and return to Australia.',
                  'Applied for free through the official ATO website.',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="7" cy="7" r="6.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                      <path d="M4.5 7l2 2 3-3" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[12.5px] font-light text-body leading-[1.65]">{point}</p>
                  </div>
                ))}
              </div>
              <div className="info-block">
                <p>The application is free. Your TFN arrives by post — usually within 7 to 28 days.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 reveal delay-1">
              {[
                { title: 'Issued by',        body: 'The Australian Taxation Office (ATO) — the official government tax authority.' },
                { title: 'Processing time',  body: 'Usually 7 to 28 days by post. In some cases you can confirm by phone within a week.' },
                { title: 'Cost',             body: 'Free. Apply directly on the ATO website. No fees or third parties needed.' },
                { title: 'What you need',    body: 'Passport, valid Australian visa, an Australian postal address, and a contact email.' },
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

      {/* ── WHY YOU NEED ONE + WHO NEEDS ONE ──────────────────────────────── */}
      <section className="py-7 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20">

            {/* Why */}
            <div className="reveal">
              <span className="section-label">Why you need one</span>
              <h2 className="font-serif font-black text-ink mt-1.5 mb-4" style={{ fontSize: 'clamp(17px,2.1vw,24px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                No TFN means<br /><em className="not-italic font-normal text-forest-400">47% tax withheld from every payslip.</em>
              </h2>
              <div className="space-y-0">
                {[
                  {
                    label: 'Legal requirement for working',
                    body: 'Every employer in Australia must collect your TFN. Without it, they withhold 47% of your income.',
                  },
                  {
                    label: 'Pay the correct WHV tax rate',
                    body: 'With your TFN, the correct rate of 15% applies on earnings up to $45,000 — not 47%.',
                  },
                  {
                    label: 'Claim a tax refund when you leave',
                    body: 'You need a TFN to lodge a tax return and recover any overpaid tax at the end of the year.',
                  },
                ].map((item, i) => (
                  <div key={i} className="py-3.5" style={{ borderTop: '1px solid #E2EFE9' }}>
                    <p className="text-[13px] font-semibold text-ink mb-0.5" style={{ letterSpacing: '-0.01em' }}>{item.label}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.7]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
              <InlineCTA label="Apply now — we guide you through it" />
            </div>

            {/* Who */}
            <div className="reveal delay-1">
              <span className="section-label">Who needs a TFN?</span>
              <h2 className="font-serif font-black text-ink mt-1.5 mb-3" style={{ fontSize: 'clamp(17px,2.1vw,24px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Anyone earning income<br /><em className="not-italic font-normal text-forest-400">in Australia.</em>
              </h2>
              <p className="font-light text-muted leading-[1.7] mb-4" style={{ fontSize: '12.5px' }}>
                You need a TFN if you work, earn income, or plan to lodge a tax return. This includes:
              </p>
              <div className="space-y-2.5 mb-5">
                {[
                  'Working Holiday Visa holders (subclass 417 or 462)',
                  'New arrivals starting work immediately',
                  'Travellers doing seasonal or casual work',
                  'Contractors or sole traders invoicing clients',
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
              <div className="rounded-xl px-4 py-3.5" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                <p className="text-[12.5px] font-light text-body leading-[1.7]">
                  <span className="font-semibold text-forest-500">Apply as soon as you arrive.</span> You can start work first, but you must provide your TFN within 28 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO APPLY ──────────────────────────────────────────────────── */}
      <section id="how-to-apply" className="py-7 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

          <div className="max-w-xl mx-auto text-center mb-8 reveal">
            <span className="section-label center">How to apply</span>
            <h2 className="font-serif font-black text-ink mt-1.5 mb-2" style={{ fontSize: 'clamp(17px,2.1vw,26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Apply in 10 minutes.<br /><em className="not-italic font-normal text-forest-400">We walk you through every step.</em>
            </h2>
            <p className="font-light text-muted leading-[1.65]" style={{ fontSize: '12.5px' }}>
              Free to apply. We walk you through every step on WhatsApp.
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

          {/* CTA after steps */}
          <div className="text-center mt-8 reveal delay-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '44px', padding: '0 22px', fontSize: '13.5px' }}>
              Start your TFN on WhatsApp
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── COMMON MISTAKES ───────────────────────────────────────────────── */}
      <section className="py-7 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

          <div className="max-w-xl mb-8 reveal">
            <span className="section-label">Avoid these mistakes</span>
            <h2 className="font-serif font-black text-ink mt-1.5 mb-2" style={{ fontSize: 'clamp(17px,2.1vw,26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Four mistakes that delay<br /><em className="not-italic font-normal text-forest-400">your TFN application.</em>
            </h2>
            <p className="font-light text-muted leading-[1.65]" style={{ fontSize: '12.5px' }}>
              These are the most common mistakes that delay TFN applications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 reveal delay-1">
            {MISTAKES.map((m, i) => (
              <div key={i} className="rounded-xl p-4 flex flex-col" style={{ background: '#FFFCF5', border: '1.5px solid #F0D99A', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                <div className="w-6 h-6 rounded-md flex items-center justify-center mb-3 flex-shrink-0" style={{ background: '#FDF0D5' }}>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v4M6 8.5v.5" stroke="#C47E10" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-[12.5px] font-semibold text-ink mb-1.5">{m.title}</p>
                <p className="text-[12px] font-light text-muted leading-[1.65] flex-1">{m.body}</p>
              </div>
            ))}
          </div>

          {/* Soft CTA below mistakes */}
          <div className="mt-6 rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 reveal delay-2" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
            <p className="text-[13px] font-light text-body leading-[1.65]">
              <span className="font-semibold text-forest-500">Not sure if you are doing it right?</span> We guide you through the entire process and check everything before you submit.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1.5 font-semibold whitespace-nowrap transition-colors"
              style={{ fontSize: '12.5px', color: '#0B5240' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#16775C'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#0B5240'}>
              We handle this for you
              <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2.5 6.5h8M7.5 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
              <h2 className="font-serif font-black text-ink mt-1.5 mb-3" style={{ fontSize: 'clamp(17px,2.1vw,26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                TFN questions, answered.
              </h2>
              <p className="font-light text-muted leading-[1.65] mb-5" style={{ fontSize: '12.5px' }}>
                Still not sure? Ask us directly on WhatsApp — we reply within minutes.
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

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="Apply now"
        heading="Start work at the right tax rate."
        headingEm=""
        sub="We guide you through the TFN application in minutes — no errors, no delays, no 47% tax."
        primaryLabel="Get your TFN sorted"
      />
    </>
  )
}
