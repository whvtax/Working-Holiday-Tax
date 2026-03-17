import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'TFN Application for Working Holiday Visa Holders',
  description: 'Get your Australian Tax File Number as a Working Holiday Visa traveller. Step-by-step guidance from a registered tax agent.',
}

const faqs = [
  {
    question: 'Can I start work before I receive my TFN?',
    answer: 'Yes. You can start work without a TFN, but you must provide it to your employer within 28 days. Until then, your employer is required to withhold tax at the highest rate (47%).',
  },
  {
    question: 'Where will my TFN be sent?',
    answer: 'Your TFN is posted to your nominated Australian address. Use an address where you will be for at least 28 days — a hostel address or PO Box is fine.',
  },
  {
    question: 'Can I get a TFN on a tourist visa?',
    answer: 'No. A tourist visa does not allow you to work in Australia, so you are not eligible for a TFN. You need a Working Holiday Visa (subclass 417 or 462) or another work-eligible visa.',
  },
  {
    question: 'What if I lose my TFN?',
    answer: 'Call the ATO on 13 28 61 (Monday to Friday, 8am to 6pm). You can also find it on previous tax returns or through the ATO online services portal.',
  },
  {
    question: 'What is a TFN Declaration Form?',
    answer: 'A form you complete when starting a new job. It tells your employer how much tax to withhold. As a Working Holiday Visa holder, select "No" for the tax-free threshold.',
  },
]

const MISTAKES = [
  {
    title: 'Incorrect visa details',
    body: 'Use the exact visa subclass shown in your passport or ImmiAccount. Wrong visa details are one of the most common reasons applications are delayed.',
  },
  {
    title: 'Wrong postal address',
    body: 'Your TFN is sent by post. Make sure you enter a valid Australian address where you will be for at least 28 days.',
  },
  {
    title: 'Applying too late',
    body: 'Apply as soon as you arrive. You have 28 days from your first day of work to provide your TFN to your employer.',
  },
  {
    title: 'Using unofficial websites',
    body: 'Apply only through the official ATO website. Third-party services sometimes charge fees for something that is completely free.',
  },
]

const STEPS = [
  {
    n: '1',
    title: 'Check your eligibility',
    body: 'Make sure you hold a valid work-eligible visa — such as a Working Holiday Visa (417 or 462). Have your passport and visa details on hand.',
  },
  {
    n: '2',
    title: 'Submit your application',
    body: 'Apply through the official ATO website. It takes around 10 minutes and costs nothing.',
  },
  {
    n: '3',
    title: 'ATO processes your application',
    body: 'The ATO reviews your details. Processing usually takes 7 to 28 days. You may be able to confirm your TFN by phone within one week.',
  },
  {
    n: '4',
    title: 'Receive your TFN',
    body: 'Your TFN arrives by post to your Australian address. Give it to your employer as soon as it arrives.',
  },
]

export default function TFNPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-12 lg:py-16">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-8" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">TFN Application</span>
          </nav>

          {/* Centred hero content */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase text-forest-500" style={{ fontSize: '11px', letterSpacing: '0.16em' }}>Service guide</span>
            </div>

            <h1 className="font-serif font-black text-ink mb-4" style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              Need a TFN<br /><span style={{ color: '#0B5240' }}>in Australia?</span>
            </h1>

            <p className="font-semibold text-ink mb-3" style={{ fontSize: '16px', letterSpacing: '-0.01em' }}>
              We guide Working Holiday Visa travellers through the TFN application — step by step.
            </p>

            <p className="font-light leading-[1.75] mb-8 mx-auto" style={{ fontSize: '15px', color: 'rgba(10,15,13,0.55)', maxWidth: '440px' }}>
              A Tax File Number is required to work legally in Australia. We help you apply correctly the first time.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-5">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '48px', padding: '0 24px', fontSize: '14px' }}>
                Start on WhatsApp - free
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <Link href="#how-to-apply" className="btn-ghost-dark" style={{ height: '48px', padding: '0 20px', fontSize: '14px' }}>
                How to apply
              </Link>
            </div>

            <p className="text-[11.5px]" style={{ color: 'rgba(10,15,13,0.38)' }}>
              Under the supervision of a registered tax agent approved by the ATO
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT IS A TFN ─────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">

            {/* Left — explanation */}
            <div className="reveal">
              <span className="section-label">What is a TFN?</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(22px,3vw,34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Your personal tax number,<br /><em className="not-italic font-normal text-forest-400">issued by the ATO.</em>
              </h2>
              <div className="prose-wht max-w-[480px]">
                <p>A Tax File Number (TFN) is a unique 9-digit number the Australian Taxation Office (ATO) issues to identify you in the tax system.</p>
                <p>You need it when you start work, lodge a tax return, or access government services. Your TFN is permanent — it stays with you for life, even if you leave and return to Australia.</p>
              </div>
              <div className="info-block">
                <p>The application is free. You apply through the official ATO website and your TFN arrives by post to your Australian address.</p>
              </div>
            </div>

            {/* Right — quick facts */}
            <div className="grid grid-cols-1 gap-3 reveal delay-1">
              {[
                { title: 'Issued by',        body: 'The Australian Taxation Office (ATO) — the official government tax authority.' },
                { title: 'Processing time',  body: 'Usually 7 to 28 days by post. In some cases you can confirm by phone within a week.' },
                { title: 'Cost',             body: 'Free. Apply directly on the ATO website. No fees, no third parties needed.' },
                { title: 'What you need',    body: 'Passport, valid Australian visa, Australian postal address, and a contact email.' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-xl px-5 py-4" style={{ border: '1px solid #C8EAE0', boxShadow: '0 1px 3px rgba(0,0,0,.03)' }}>
                  <p className="text-[13.5px] font-semibold text-ink mb-1">{c.title}</p>
                  <p className="text-[13px] font-light text-muted leading-[1.7]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY YOU NEED ONE + WHO NEEDS ONE ──────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Why */}
            <div className="reveal">
              <span className="section-label">Why you need one</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-6" style={{ fontSize: 'clamp(20px,2.8vw,30px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Without a TFN, you pay<br /><em className="not-italic font-normal text-forest-400">the highest tax rate.</em>
              </h2>
              <div className="space-y-0">
                {[
                  {
                    label: 'To work legally',
                    body: 'Employers must collect your TFN. Without it, they are required to withhold tax at 47% — the maximum rate.',
                  },
                  {
                    label: 'To pay the right amount of tax',
                    body: 'With a TFN, your employer applies the correct Working Holiday Maker rate of 15% on earnings up to $45,000.',
                  },
                  {
                    label: 'To lodge a tax return',
                    body: 'You need a TFN to file a return and claim back any tax you overpaid during the year.',
                  },
                ].map((item, i) => (
                  <div key={i} className="py-5" style={{ borderTop: '1px solid #E2EFE9' }}>
                    <p className="text-[14px] font-semibold text-ink mb-1.5" style={{ letterSpacing: '-0.01em' }}>{item.label}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.75]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>

            {/* Who */}
            <div className="reveal delay-1">
              <span className="section-label">Who needs a TFN?</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(20px,2.8vw,30px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Anyone earning income<br /><em className="not-italic font-normal text-forest-400">in Australia.</em>
              </h2>
              <p className="font-light text-muted leading-[1.75] mb-6" style={{ fontSize: '14px' }}>
                You need a TFN if you work, earn income, or plan to lodge a tax return in Australia. This includes:
              </p>
              <div className="space-y-3 mb-6">
                {[
                  'Working Holiday Visa holders (subclass 417 or 462)',
                  'New arrivals starting work straight away',
                  'Travellers doing seasonal or casual work',
                  'Anyone working as a contractor or sole trader',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                      <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[13.5px] font-light text-body leading-[1.7]">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-5 py-4" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                <p className="text-[13px] font-light text-body leading-[1.75]">
                  <span className="font-semibold text-forest-500">Apply as soon as you arrive.</span> You can start work first, but you must give your TFN to your employer within 28 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO APPLY ──────────────────────────────────────────────────── */}
      <section id="how-to-apply" className="py-14 lg:py-20" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

          {/* Centred heading */}
          <div className="max-w-xl mx-auto text-center mb-12 reveal">
            <span className="section-label center">Step by step</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(20px,2.8vw,32px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              How to apply for a TFN
            </h2>
            <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '13.5px' }}>
              Straightforward and free. Here is what happens at each stage.
            </p>
          </div>

          {/* Desktop timeline */}
          <div className="reveal delay-1">
            <div className="hidden lg:block">
              <div className="relative flex items-start">
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px" style={{
                  background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)',
                  zIndex: 0,
                }} aria-hidden="true" />
                {STEPS.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white mb-5 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 3px #EEF7F2, 0 0 0 4px #C8EAE0' }}>
                      {s.n}
                    </div>
                    <p className="text-[13.5px] font-semibold text-ink mb-2 text-center" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.7] text-center">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile timeline */}
            <div className="lg:hidden flex flex-col">
              {STEPS.map((s, i) => (
                <div key={i} className="flex gap-4 pb-7">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white" style={{ background: '#0B5240' }}>
                      {s.n}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="flex-1 w-px mt-2 min-h-[32px]" style={{ background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />
                    )}
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

      {/* ── COMMON MISTAKES ───────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">

          {/* Left-aligned heading — informational section */}
          <div className="max-w-xl mb-10 reveal">
            <span className="section-label">Common mistakes</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(20px,2.8vw,32px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              What to watch out for<br /><em className="not-italic font-normal text-forest-400">when applying.</em>
            </h2>
            <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '13.5px' }}>
              Small errors can delay your TFN or cause problems later. Here is what to avoid.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal delay-1">
            {MISTAKES.map((m, i) => (
              <div key={i} className="bg-white rounded-xl p-5 flex flex-col" style={{ border: '1.5px solid #E2EFE9', boxShadow: '0 1px 4px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.04)' }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-4 flex-shrink-0" style={{ background: '#FDF0D5' }}>
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v4M6 8.5v.5" stroke="#E9A020" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-[13.5px] font-semibold text-ink mb-2">{m.title}</p>
                <p className="text-[13px] font-light text-muted leading-[1.7] flex-1">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20" style={{ background: '#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl mb-10 reveal">
            <span className="section-label">Common questions</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-1" style={{ fontSize: 'clamp(20px,2.8vw,32px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              TFN questions, answered.
            </h2>
          </div>
          <div className="max-w-2xl reveal delay-1">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="Need help?"
        heading="Need help with"
        headingEm="your TFN?"
        sub="We'll guide you through the process and make sure everything is submitted correctly."
        primaryLabel="Ask us on WhatsApp - free"
      />
    </>
  )
}
