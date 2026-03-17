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
    answer: 'Yes. You can start work without a TFN, but you must provide it to your employer within 28 days. Until then, your employer must withhold tax at the highest rate (47%).',
  },
  {
    question: 'Where will my TFN be sent?',
    answer: 'Your TFN is mailed to your nominated Australian address. Use an address where you will be for at least 28 days - a hostel address or PO Box is fine.',
  },
  {
    question: 'Can I get a TFN on a tourist visa?',
    answer: 'No. A tourist visa does not permit you to work in Australia, so you are not eligible for a TFN. You need a Working Holiday Visa (subclass 417 or 462) or another work-eligible visa.',
  },
  {
    question: 'What if I lose my TFN?',
    answer: 'Call the ATO on 13 28 61 (Monday to Friday, 8am to 6pm) to retrieve your TFN. You can also find it on previous tax returns or on the ATO online portal.',
  },
  {
    question: 'What is a TFN Declaration Form?',
    answer: 'It is a form you complete when starting a new job. It tells your employer how much tax to withhold. As a Working Holiday Visa holder, select "No" for the tax-free threshold.',
  },
]

const MISTAKES = [
  {
    title: 'Wrong visa details',
    body: 'Always use the exact visa subclass shown in your passport or ImmiAccount. Incorrect visa details are one of the most common reasons applications are delayed.',
  },
  {
    title: 'Incorrect address',
    body: 'Your TFN is posted to the address you provide. Make sure it is a valid Australian address where you will be for at least 28 days.',
  },
  {
    title: 'Applying too late',
    body: 'Apply as soon as you arrive. You have 28 days from starting work to provide your TFN to your employer before they are required to withhold tax at the highest rate.',
  },
  {
    title: 'Using unofficial websites',
    body: 'Only apply through the official ATO website. Third-party services may charge unnecessary fees. The application itself is free.',
  },
]

const STEPS = [
  {
    n: '1',
    title: 'Check eligibility',
    body: 'Confirm you hold a valid work-eligible visa, such as a Working Holiday Visa (417 or 462). Have your passport and visa details ready.',
  },
  {
    n: '2',
    title: 'Submit your application',
    body: 'Apply online through the official ATO website. The process takes about 10 minutes and is completely free.',
  },
  {
    n: '3',
    title: 'ATO processes your application',
    body: 'The ATO reviews your application. Processing typically takes 7 to 28 days. You may be able to confirm your TFN by phone within a week.',
  },
  {
    n: '4',
    title: 'Receive your TFN',
    body: 'Your TFN is mailed to your Australian address. Provide it to your employer as soon as you receive it.',
  },
]

export default function TFNPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-[68px] flex flex-col bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 w-full py-12 lg:py-16 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-7" style={{ color: 'rgba(10,15,13,0.38)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.2)' }}>/</span>
            <span aria-current="page">TFN Application</span>
          </nav>

          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase text-forest-500" style={{ fontSize: '11px', letterSpacing: '0.16em' }}>Service guide</span>
            </div>

            <h1 className="font-serif font-black text-ink mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              Need a TFN<br /><span style={{ color: '#0B5240' }}>in Australia?</span>
            </h1>

            <p className="font-semibold text-ink mb-3" style={{ fontSize: '16px' }}>
              We guide Working Holiday Visa travellers through the TFN application - step by step.
            </p>

            <p className="font-light leading-[1.75] mb-8" style={{ fontSize: '15px', color: 'rgba(10,15,13,0.58)', maxWidth: '480px' }}>
              A TFN (Tax File Number) is required to work legally in Australia. We help you apply correctly the first time.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-start mb-5">
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

      {/* ── WHAT IS A TFN ── */}
      <section className="py-14 lg:py-20" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="reveal">
              <span className="section-label">What is a TFN?</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-4" style={{ fontSize: 'clamp(22px,3vw,34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Your personal tax number<br /><em className="not-italic font-normal text-forest-400">issued by the ATO.</em>
              </h2>
              <div className="prose-wht">
                <p>A Tax File Number (TFN) is a unique 9-digit number issued by the Australian Taxation Office (ATO). It identifies you in the Australian tax system.</p>
                <p>You use your TFN when you start work, lodge a tax return, or apply for government services. It stays with you for life - even if you leave and return to Australia.</p>
              </div>
              <div className="info-block mt-6">
                <p>The TFN application is free. You apply directly through the official ATO website and your number is posted to your Australian address.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 reveal delay-1">
              {[
                { title: 'Issued by',          body: 'The Australian Taxation Office (ATO) - the official Australian government tax authority.' },
                { title: 'Processing time',    body: 'Usually 7 to 28 days by post. You may be able to confirm your TFN by phone within one week.' },
                { title: 'Application cost',   body: 'Free. Apply directly through the ATO website. No third-party fees required.' },
                { title: 'What you need',      body: 'Your passport, a valid Australian visa, an Australian postal address, and a contact email.' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-xl px-5 py-4" style={{ border: '1px solid #C8EAE0' }}>
                  <p className="text-[13.5px] font-semibold text-ink mb-1">{c.title}</p>
                  <p className="text-[13px] font-light text-muted leading-[1.7]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY YOU NEED A TFN + WHO NEEDS ONE ── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Why */}
            <div className="reveal">
              <span className="section-label">Why you need one</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(20px,2.8vw,30px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Without a TFN, you pay<br /><em className="not-italic font-normal text-forest-400">the highest tax rate.</em>
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'To work legally',         body: 'Employers in Australia are required to collect your TFN. Without it, they must withhold tax at 47% - the highest possible rate.' },
                  { label: 'To pay the correct tax',  body: 'With your TFN, your employer applies the correct Working Holiday Maker tax rate of 15% on your earnings up to $45,000.' },
                  { label: 'To lodge a tax return',   body: 'You need a TFN to lodge a tax return and claim back any tax you have overpaid during the year.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 py-4" style={{ borderTop: '1px solid #E2EFE9' }}>
                    <div>
                      <p className="text-[14px] font-semibold text-ink mb-1" style={{ letterSpacing: '-0.01em' }}>{item.label}</p>
                      <p className="text-[13px] font-light text-muted leading-[1.7]">{item.body}</p>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>

            {/* Who */}
            <div className="reveal delay-1">
              <span className="section-label">Who needs a TFN?</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(20px,2.8vw,30px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Anyone working<br /><em className="not-italic font-normal text-forest-400">in Australia.</em>
              </h2>
              <p className="font-light text-muted leading-[1.75] mb-6" style={{ fontSize: '14px' }}>
                You need a TFN if you plan to work, earn income, or lodge a tax return in Australia. This includes:
              </p>
              <div className="space-y-3">
                {[
                  'Working Holiday Visa holders (subclass 417 or 462)',
                  'New arrivals planning to start work immediately',
                  'Anyone picking up seasonal or casual work',
                  'Travellers working as contractors or sole traders',
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
              <div className="mt-6 rounded-xl px-5 py-4" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                <p className="text-[13px] font-light text-body leading-[1.7]">
                  <span className="font-semibold text-forest-500">Apply as soon as you arrive.</span> You can start work without a TFN, but you must provide it within 28 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO APPLY ── */}
      <section id="how-to-apply" className="py-14 lg:py-20" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-10 reveal">
            <span className="section-label center">Step by step</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-2" style={{ fontSize: 'clamp(20px,2.8vw,32px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              How to apply for a TFN
            </h2>
            <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '13.5px' }}>
              The application is straightforward. Here is what happens at each stage.
            </p>
          </div>

          {/* Timeline — desktop */}
          <div className="reveal delay-1">
            <div className="hidden lg:block">
              <div className="relative flex items-start">
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px" style={{
                  background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)',
                  zIndex: 0,
                }} aria-hidden="true" />
                {STEPS.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center px-4" style={{ zIndex: 1 }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white mb-5 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 3px #EEF7F2, 0 0 0 4px #C8EAE0' }}>
                      {s.n}
                    </div>
                    <p className="text-[14px] font-semibold text-ink mb-1.5 text-center" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.7] text-center">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Mobile */}
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

      {/* ── COMMON MISTAKES ── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl mb-10 reveal">
            <span className="section-label">Common mistakes</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-2" style={{ fontSize: 'clamp(20px,2.8vw,32px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              What to avoid when<br /><em className="not-italic font-normal text-forest-400">applying for your TFN.</em>
            </h2>
            <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '13.5px' }}>
              These are the most common issues that can delay your application or cause problems later.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal delay-1">
            {MISTAKES.map((m, i) => (
              <div key={i} className="bg-white rounded-xl p-5" style={{ border: '1px solid #E2EFE9', boxShadow: '0 1px 3px rgba(0,0,0,.03)' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center mb-3" style={{ background: '#FDF0D5' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v4M6 8.5v.5" stroke="#E9A020" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-[13.5px] font-semibold text-ink mb-2">{m.title}</p>
                <p className="text-[13px] font-light text-muted leading-[1.7]">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 lg:py-20" style={{ background: '#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl mb-10 reveal">
            <span className="section-label">Common questions</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-0" style={{ fontSize: 'clamp(20px,2.8vw,32px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              TFN questions answered.
            </h2>
          </div>
          <div className="max-w-2xl reveal delay-1">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <CtaBand
        eyebrow="Need help?"
        heading="Need help with"
        headingEm="your TFN?"
        sub="We'll guide you through the process and make sure everything is done correctly."
        primaryLabel="Ask us on WhatsApp - free"
      />
    </>
  )
}
