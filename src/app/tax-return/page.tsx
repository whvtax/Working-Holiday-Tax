import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Tax Return in Australia for WHV Holders',
  description: 'We prepare and lodge your Australian tax return for Working Holiday Visa holders. Simple, online, handled for you.',
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
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-12 lg:py-16">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-8" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Tax Return</span>
          </nav>

          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase text-forest-500" style={{ fontSize: '11px', letterSpacing: '0.16em' }}>Service guide</span>
            </div>
            <h1 className="font-serif font-black text-ink mb-4" style={{ fontSize: 'clamp(28px,4vw,48px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              Tax return in Australia<br /><span style={{ color: '#0B5240' }}>done properly.</span>
            </h1>
            <p className="font-semibold text-ink mb-3" style={{ fontSize: '16px', letterSpacing: '-0.01em' }}>
              We prepare and lodge your tax return so you get what you are entitled to — without the stress.
            </p>
            <p className="font-light leading-[1.75] mb-8 mx-auto" style={{ fontSize: '15px', color: 'rgba(10,15,13,0.55)', maxWidth: '440px' }}>
              Every year, thousands of Working Holiday Visa travellers overpay tax or miss their deadline. We make sure that does not happen to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-5">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '48px', padding: '0 24px', fontSize: '14px' }}>
                Start on WhatsApp - free
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <Link href="#how-it-works" className="btn-ghost-dark" style={{ height: '48px', padding: '0 20px', fontSize: '14px' }}>
                How it works
              </Link>
            </div>
            <p className="text-[11.5px]" style={{ color: 'rgba(10,15,13,0.38)' }}>
              Under the supervision of a registered tax agent approved by the ATO
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT IS A TAX RETURN ─────────────────────────────────────────── */}
      <section className="py-14 lg:py-20" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
            <div className="reveal">
              <span className="section-label">What is a tax return?</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(22px,3vw,34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                A yearly summary of<br /><em className="not-italic font-normal text-forest-400">your income and tax.</em>
              </h2>
              <div className="prose-wht max-w-[480px]">
                <p>At the end of each financial year (July 1 to June 30), you are required to report your income to the ATO. This is called lodging a tax return.</p>
                <p>During the year, your employer withholds tax from your wages. The tax return reconciles what was withheld against what you actually owe. If more was withheld than you owed, you receive a refund.</p>
                <p>You can also claim deductions for work-related expenses, which reduces your taxable income and can increase your refund.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 reveal delay-1">
              {[
                { title: 'Financial year', body: '1 July to 30 June. You lodge after the year ends — usually by 31 October.' },
                { title: 'Who must lodge', body: 'Anyone who earned income in Australia during the financial year, including WHV holders.' },
                { title: 'Tax rate (WHV)', body: '15% on income up to $45,000. A higher rate applies above that threshold.' },
                { title: 'Refunds', body: 'If more tax was withheld than you owed, the ATO refunds the difference to your bank account.' },
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

      {/* ── WHAT YOU CAN CLAIM ───────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mb-10 reveal">
            <span className="section-label">Deductions</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(20px,2.8vw,32px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              What you may be<br /><em className="not-italic font-normal text-forest-400">able to claim.</em>
            </h2>
            <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '13.5px' }}>
              Deductions reduce your taxable income, which can result in a higher refund. You can only claim expenses that are directly related to your work and that you paid for yourself — and you need records to support them.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal delay-1">
            {DEDUCTIONS.map((d, i) => (
              <div key={i} className="bg-white rounded-xl p-5" style={{ border: '1.5px solid #E2EFE9', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                <p className="text-[13.5px] font-semibold text-ink mb-2">{d.title}</p>
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
      <section id="how-it-works" className="py-14 lg:py-20" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center mb-12 reveal">
            <span className="section-label center">How it works</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(20px,2.8vw,32px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              We handle everything<br /><em className="not-italic font-normal text-forest-400">from start to finish.</em>
            </h2>
            <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '13.5px' }}>
              You send us your documents. We do the rest.
            </p>
          </div>

          {/* Desktop timeline */}
          <div className="reveal delay-1">
            <div className="hidden lg:block">
              <div className="relative flex items-start">
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)', zIndex: 0 }} aria-hidden="true" />
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
            <div className="lg:hidden flex flex-col">
              {STEPS.map((s, i) => (
                <div key={i} className="flex gap-4 pb-7">
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
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="reveal">
              <span className="section-label">Timing</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(20px,2.8vw,30px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                How long does<br /><em className="not-italic font-normal text-forest-400">it take?</em>
              </h2>
              <div className="space-y-0">
                {[
                  { label: 'Our preparation',   body: 'We typically prepare your return within 2 to 3 business days of receiving all your documents.' },
                  { label: 'ATO processing',    body: 'The ATO usually processes returns within 7 to 14 business days. During peak periods (August to October) it can take longer.' },
                  { label: 'Your refund',       body: 'Once the ATO issues a Notice of Assessment, any refund is paid directly to your bank account — wherever you are in the world.' },
                ].map((item, i) => (
                  <div key={i} className="py-5" style={{ borderTop: '1px solid #E2EFE9' }}>
                    <p className="text-[14px] font-semibold text-ink mb-1.5" style={{ letterSpacing: '-0.01em' }}>{item.label}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.75]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>
            <div className="reveal delay-1">
              <span className="section-label">What to have ready</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(20px,2.8vw,30px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
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
                    <p className="text-[13.5px] font-light text-body leading-[1.7]">{item}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl px-5 py-4" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                <p className="text-[13px] font-light text-body leading-[1.75]">
                  <span className="font-semibold text-forest-500">Not sure what you have?</span> Message us anyway. We will tell you exactly what we need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20" style={{ background: '#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl mb-10 reveal">
            <span className="section-label">Common questions</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-1" style={{ fontSize: 'clamp(20px,2.8vw,32px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Tax return questions, answered.
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
        primaryLabel="Ask us on WhatsApp - free"
      />
    </>
  )
}
