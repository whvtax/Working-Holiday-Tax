import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Tax Return in Australia for WHV Holders',
  description: 'Get your Australian tax refund. We prepare and lodge your tax return for WHV holders — online, fast, and handled for you.',
}

const faqs = [
  {
    question: 'Do I need to lodge a tax return?',
    answer: 'If you earned income in Australia during the financial year (July 1 to June 30), you are generally required to lodge a tax return. Even if tax was withheld at the correct rate, you may still be owed a refund.',
  },
  {
    question: 'When is the tax return deadline?',
    answer: 'The standard deadline for individuals is October 31. If you use a registered tax agent (like us), you may be eligible for an extended deadline.',
  },
  {
    question: 'What is the Working Holiday Maker tax rate?',
    answer: 'Working Holiday Visa holders are taxed at 15% on the first $45,000 of income. A higher rate applies above that threshold.',
  },
  {
    question: 'Can I claim deductions?',
    answer: 'Yes. You can claim work-related expenses such as uniforms, tools, certifications, and some travel. You need receipts or records to support your claims.',
  },
  {
    question: 'I left Australia — can I still lodge?',
    answer: 'Yes. We handle tax returns entirely online. Many of our clients lodge after leaving Australia.',
  },
]

const DEDUCTIONS = [
  {
    title: 'Work uniforms and clothing',
    body: 'Protective or compulsory work clothing — such as safety boots, high-visibility vests, or branded uniforms.',
  },
  {
    title: 'Tools and equipment',
    body: 'Tools or equipment you purchased for work and used directly in your job.',
  },
  {
    title: 'Licences and certifications',
    body: 'Costs for licences required for your work — such as RSA, White Card, or forklift certification.',
  },
  {
    title: 'Laundry and cleaning',
    body: 'Washing and drying of work uniforms and protective clothing.',
  },
  {
    title: 'Work-related travel',
    body: 'Travel between work sites — not from home to your regular workplace.',
  },
  {
    title: 'Charitable donations',
    body: 'Donations of $2 or more to registered Australian charities.',
  },
]

const STEPS = [
  {
    n: '1',
    title: 'Send us your details',
    body: 'Message us on WhatsApp. We ask for your income details, payment summaries, and any work-related expenses.',
  },
  {
    n: '2',
    title: 'We review everything',
    body: 'We check your income, deductions, and residency situation to make sure everything is correct before we prepare your return.',
  },
  {
    n: '3',
    title: 'We prepare and lodge',
    body: 'We prepare your return and lodge it directly with the ATO. You do not need to deal with any forms or government portals.',
  },
  {
    n: '4',
    title: 'ATO processes your return',
    body: 'The ATO assesses your return and issues a Notice of Assessment. Any refund due is paid directly to your bank account.',
  },
]

export default function TaxReturnPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-8 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-6" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Tax Return</span>
          </nav>

          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase text-forest-500" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>Service guide</span>
            </div>
            <h1 className="font-serif font-black text-ink mb-2.5" style={{ fontSize: 'clamp(20px,3.5vw,38px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              Get your tax refund.<br /><span style={{ color: '#0B5240' }}>We handle the rest.</span>
            </h1>
            <p className="font-semibold text-ink mb-3" style={{ fontSize: '14px', letterSpacing: '-0.01em' }}>
              Most WHV travellers are owed a refund. We make sure you claim everything you are entitled to — and meet your deadline.
            </p>
            <p className="font-light leading-[1.7] mb-5" style={{ fontSize: '14px', color: 'rgba(10,15,13,0.55)', maxWidth: '420px' }}>
              The ATO financial year ends 30 June. If you worked in Australia, you likely need to lodge — and may be owed money back.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-5">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '46px', padding: '0 22px', fontSize: '13.5px' }}>
                Get started on WhatsApp
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <Link href="#how-it-works" className="btn-ghost-dark" style={{ height: '46px', padding: '0 18px', fontSize: '13.5px' }}>
                How it works
              </Link>
            </div>
            <p className="text-[10.5px] sm:text-[11.5px]" style={{ color: 'rgba(10,15,13,0.38)' }}>
              Under the supervision of a registered tax agent approved by the ATO
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT IS A TAX RETURN ─────────────────────────────────────────── */}
      <section className="py-7 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-16 items-start">
            <div className="reveal">
              <span className="section-label">What is a tax return?</span>
              <h2 className="font-serif font-black text-ink mt-1 mb-2" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                You may be owed money.<br /><em className="not-italic font-normal text-forest-400">A return is how you claim it.</em>
              </h2>
              <div className="prose-wht max-w-[480px]">
                <p>At the end of each Australian financial year (July 1 to June 30), you are required to report your income to the ATO.</p>
                <p>Your employer withholds tax throughout the year. The tax return compares what was withheld against what you actually owe. If too much was taken — which is common for WHV holders — you receive a refund.</p>
                <p>You can also claim work-related deductions, which reduces your taxable income and can increase the amount you get back.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 reveal delay-1">
              {[
                { title: 'Financial year', body: '1 July to 30 June. You lodge after the year ends — usually by 31 October.' },
                { title: 'Who must lodge', body: 'Anyone who earned income in Australia during the financial year, including WHV holders.' },
                { title: 'Tax rate (WHV)', body: '15% on income up to $45,000. A higher rate applies above that threshold.' },
                { title: 'Refunds', body: 'If more tax was withheld than you owed, the ATO refunds the difference to your bank account.' },
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

      {/* ── WHAT YOU CAN CLAIM ───────────────────────────────────────────── */}
      <section className="py-7 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mb-7 reveal">
            <span className="section-label">Deductions</span>
            <h2 className="font-serif font-black text-ink mt-1 mb-2" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Reduce your tax bill<br /><em className="not-italic font-normal text-forest-400">with work deductions.</em>
            </h2>
            <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '12.5px' }}>
              Every legitimate deduction reduces your taxable income — meaning more money back. You can only claim what is directly work-related and supported by records or receipts.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 reveal delay-1">
            {DEDUCTIONS.map((d, i) => (
              <div key={i} className="bg-white rounded-xl p-5" style={{ border: '1.5px solid #E2EFE9', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                <p className="text-[12.5px] font-semibold text-ink mb-1.5">{d.title}</p>
                <p className="text-[13px] font-light text-muted leading-[1.7]">{d.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 max-w-xl reveal delay-2">
            <div className="info-block">
              <p>You cannot claim personal expenses, fines, or travel between home and your regular workplace. If you are unsure whether something qualifies, ask us.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-7 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center mb-6 reveal">
            <span className="section-label center">How it works</span>
            <h2 className="font-serif font-black text-ink mt-1 mb-2" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              From your documents<br /><em className="not-italic font-normal text-forest-400">to your refund.</em>
            </h2>
            <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '12.5px' }}>
              Send us your documents. We prepare, lodge, and chase the ATO so you can focus on other things.
            </p>
          </div>

          {/* Desktop timeline */}
          <div className="reveal delay-1">
            <div className="hidden lg:block">
              <div className="relative flex items-start">
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)', zIndex: 0 }} aria-hidden="true" />
                {STEPS.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center px-3" style={{ zIndex: 1 }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white mb-4 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 3px #EEF7F2, 0 0 0 4px #C8EAE0' }}>
                      {s.n}
                    </div>
                    <p className="text-[12.5px] font-semibold text-ink mb-1.5 text-center" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.65] text-center">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:hidden flex flex-col">
              {STEPS.map((s, i) => (
                <div key={i} className="flex gap-3 pb-5">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white" style={{ background: '#0B5240' }}>{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2 min-h-[32px]" style={{ background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
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

      {/* ── TIMELINE + WHAT TO HAVE READY ───────────────────────────────── */}
      <section className="py-7 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
            <div className="reveal">
              <span className="section-label">Timing</span>
              <h2 className="font-serif font-black text-ink mt-1 mb-2" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Typical timeline<br /><em className="not-italic font-normal text-forest-400">for your refund.</em>
              </h2>
              <div className="space-y-0">
                {[
                  { label: 'Our preparation',   body: 'We typically prepare your return within 2 to 3 business days of receiving all your documents.' },
                  { label: 'ATO processing',    body: 'The ATO usually processes returns within 7 to 14 business days. During peak periods (August to October) it can take longer.' },
                  { label: 'Your refund',       body: 'Once the ATO issues a Notice of Assessment, any refund is paid directly to your bank account — wherever you are in the world.' },
                ].map((item, i) => (
                  <div key={i} className="py-3.5" style={{ borderTop: '1px solid #E2EFE9' }}>
                    <p className="text-[12.5px] font-semibold text-ink mb-1" style={{ letterSpacing: '-0.01em' }}>{item.label}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.75]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>
            <div className="reveal delay-1">
              <span className="section-label">What to have ready</span>
              <h2 className="font-serif font-black text-ink mt-1 mb-2" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Documents<br /><em className="not-italic font-normal text-forest-400">you will need.</em>
              </h2>
              <div className="space-y-3 mb-6">
                {[
                  'Tax File Number (TFN)',
                  'Payment summaries or PAYG summaries from each employer',
                  'Bank account details for your refund',
                  'Receipts for any work-related expenses you want to claim',
                  'Dates you were in Australia (if you worked for part of the year)',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                      <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[12.5px] font-light text-body leading-[1.65]">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-4 py-3" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                <p className="text-[13px] font-light text-body leading-[1.75]">
                  <span className="font-semibold text-forest-500">Not sure what you have?</span> Message us anyway. We will tell you exactly what we need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-7 lg:py-14" style={{ background: '#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl mb-7 reveal">
            <span className="section-label">Common questions</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-1" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Common tax return questions.
            </h2>
          </div>
          <div className="max-w-2xl reveal delay-1">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="Need help?"
        heading="Need help with"
        headingEm="your tax return?"
        sub="We handle everything — from reviewing your documents to lodging with the ATO."
        primaryLabel="Get started on WhatsApp"
      />
    </>
  )
}
