import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'ABN Registration for Working Holiday Visa Holders',
  description: 'Register your ABN correctly as a Working Holiday Visa contractor. We handle registration and tax obligations — simple, fast, online.',
}

const faqs = [
  {
    question: 'Can I have both a TFN and an ABN?',
    answer: 'Yes. Many WHV holders work as both employees (using a TFN) and contractors (using an ABN) at different times. You can hold both at the same time.',
  },
  {
    question: 'Is the ABN registration free?',
    answer: 'Yes. Registering an ABN through the Australian Business Register is free. There are no government fees.',
  },
  {
    question: 'Do I need to register for GST?',
    answer: 'Only if your annual turnover from business activity exceeds $75,000. Below that threshold, GST registration is optional. Most WHV contractors do not need to register for GST.',
  },
  {
    question: 'What happens to my ABN when I leave Australia?',
    answer: 'You can cancel your ABN when you stop your business activity. If you leave Australia without cancelling, you should cancel it through the Australian Business Register website.',
  },
  {
    question: 'Can my ABN be rejected?',
    answer: 'Yes. The ATO may reject your application if you are not considered to be running a genuine business or enterprise. If you are simply an employee, you do not qualify for an ABN.',
  },
]

const MISTAKES = [
  {
    title: 'Using an ABN when you are an employee',
    body: 'An ABN is for genuine contractors and self-employed workers. If your client controls your hours, tools, and methods, you are likely an employee — not a contractor.',
  },
  {
    title: 'Incorrect business activity description',
    body: 'The business activity you list on your registration must match what you actually do. Using a vague or incorrect description can cause issues later.',
  },
  {
    title: 'Not keeping income records',
    body: 'When you work under an ABN, no tax is withheld from your invoices. You are responsible for tracking your income and paying tax when you lodge your return.',
  },
  {
    title: 'Missing the tax lodgement',
    body: 'ABN income must still be declared in your tax return. Some travellers assume ABN work does not need to be reported — this is incorrect.',
  },
]

const STEPS = [
  {
    n: '1',
    title: 'Check if you need one',
    body: 'Confirm you are doing genuine contractor or freelance work — not employment. Have your TFN, visa details, and a description of your work activity ready.',
  },
  {
    n: '2',
    title: 'Submit your registration',
    body: 'Apply through the Australian Business Register website. It takes around 10 minutes and there is no cost.',
  },
  {
    n: '3',
    title: 'Application review',
    body: 'The ATO reviews your application. Most ABNs are issued immediately online. In some cases, additional review may be required.',
  },
  {
    n: '4',
    title: 'Receive your ABN',
    body: 'Your 11-digit ABN is issued and you can begin using it on invoices straight away.',
  },
]

export default function ABNPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-6 lg:py-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-5" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">ABN Registration</span>
          </nav>

          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase text-forest-500" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>Service guide</span>
            </div>
            <h1 className="font-serif font-black text-ink mb-2.5" style={{ fontSize: 'clamp(20px,3.5vw,38px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              Invoice legally.<br /><span style={{ color: '#0B5240' }}>Pay the right tax.</span>
            </h1>
            <p className="font-semibold text-ink mb-3" style={{ fontSize: '14px', letterSpacing: '-0.01em' }}>
              We register your ABN and make sure your tax obligations are set up correctly from day one.
            </p>
            <p className="font-light leading-[1.7] mb-5 mx-auto" style={{ fontSize: '14px', color: 'rgba(10,15,13,0.55)', maxWidth: '420px' }}>
              If you are doing freelance, contract, or sole trader work in Australia, you need an ABN. Getting it wrong has consequences — we make sure you get it right.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-4">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '46px', padding: '0 22px', fontSize: '13.5px' }}>
                Get started on WhatsApp
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <Link href="#how-to-register" className="btn-ghost-dark" style={{ height: '46px', padding: '0 18px', fontSize: '13.5px' }}>
                How to register
              </Link>
            </div>
            <p className="text-[10.5px] sm:text-[11.5px]" style={{ color: 'rgba(10,15,13,0.38)' }}>
              Under the supervision of a registered tax agent approved by the ATO
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT IS AN ABN ───────────────────────────────────────────────── */}
      <section className="py-7 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-16 items-start">
            <div className="reveal">
              <span className="section-label">What is an ABN?</span>
              <h2 className="font-serif font-black text-ink mt-1 mb-2" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Your number to invoice<br /><em className="not-italic font-normal text-forest-400">and trade legally.</em>
              </h2>
              <div className="prose-wht max-w-[480px]">
                <p>An ABN (Australian Business Number) is an 11-digit number that identifies you as a contractor or sole trader. You include it on every invoice you send to clients.</p>
                <p>Unlike employee work, no tax is withheld from ABN payments. You receive the full invoice amount — and are responsible for reporting and paying tax yourself.</p>
              </div>
              <div className="info-block">
                <p>An ABN is different from a TFN. Your TFN is used when you work as an employee. Your ABN is used when you work as a contractor or freelancer.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 reveal delay-1">
              {[
                { title: 'Issued by',        body: 'The Australian Business Register (ABR), which is administered by the ATO.' },
                { title: 'Format',           body: 'An 11-digit number you include on all invoices you issue to clients.' },
                { title: 'Cost',             body: 'Free. Registering through the official ABR website has no government fees.' },
                { title: 'Processing time',  body: 'Most ABNs are issued immediately online. Some applications may require additional review.' },
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

      {/* ── WHEN YOU NEED ONE + IMPORTANT TO UNDERSTAND ──────────────────── */}
      <section className="py-7 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">

            {/* When */}
            <div className="reveal">
              <span className="section-label">When you need one</span>
              <h2 className="font-serif font-black text-ink mt-1 mb-3" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                You need an ABN when<br /><em className="not-italic font-normal text-forest-400">you are not an employee.</em>
              </h2>
              <p className="font-light text-muted leading-[1.7] mb-5" style={{ fontSize: '13px' }}>
                You generally need an ABN when you are providing services as a contractor or freelancer — not as an employee. Common examples include:
              </p>
              <div className="space-y-3 mb-6">
                {[
                  'Freelance work (photography, design, writing)',
                  'Trades and labour on a contract basis',
                  'Farm work or harvest work on an ABN arrangement',
                  'Digital or remote work invoiced to Australian clients',
                  'Any situation where you send invoices for services',
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
            </div>

            {/* Important */}
            <div className="reveal delay-1">
              <span className="section-label">Important to understand</span>
              <h2 className="font-serif font-black text-ink mt-1 mb-3" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                ABN means you handle<br /><em className="not-italic font-normal text-forest-400">your own tax.</em>
              </h2>
              <div className="space-y-0">
                {[
                  {
                    label: 'No tax is withheld from your pay',
                    body: 'Clients pay your invoice in full. No tax is taken out automatically. You must set aside money for your tax bill — typically 15–25% of income.',
                  },
                  {
                    label: 'You must declare all ABN income',
                    body: 'Every dollar earned under your ABN must be reported in your annual tax return. The ATO receives data from business clients — underreporting carries risk.',
                  },
                  {
                    label: 'No super paid on your behalf',
                    body: 'Unlike employment, clients are not required to pay super on contractor invoices. Your retirement savings are your own responsibility.',
                  },
                ].map((item, i) => (
                  <div key={i} className="py-3.5" style={{ borderTop: '1px solid #E2EFE9' }}>
                    <p className="text-[12.5px] font-semibold text-ink mb-1" style={{ letterSpacing: '-0.01em' }}>{item.label}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.75]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
              <div className="mt-6 rounded-xl px-4 py-3" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                <p className="text-[13px] font-light text-body leading-[1.75]">
                  <span className="font-semibold text-forest-500">Not sure which applies to you?</span> The employee vs contractor distinction matters for your tax. Ask us and we will help you work it out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO REGISTER ──────────────────────────────────────────────── */}
      <section id="how-to-register" className="py-7 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center mb-6 reveal">
            <span className="section-label center">Step by step</span>
            <h2 className="font-serif font-black text-ink mt-1 mb-2" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Getting your ABN<br /><em className="not-italic font-normal text-forest-400">takes about 10 minutes.</em>
            </h2>
            <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '12.5px' }}>
              The process is straightforward. Here is what happens at each stage.
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

      {/* ── COMMON MISTAKES ───────────────────────────────────────────────── */}
      <section className="py-7 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mb-7 reveal">
            <span className="section-label">Common mistakes</span>
            <h2 className="font-serif font-black text-ink mt-1 mb-2" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Common mistakes that<br /><em className="not-italic font-normal text-forest-400">cost you later.</em>
            </h2>
            <p className="font-light text-muted leading-[1.7]" style={{ fontSize: '12.5px' }}>
              These are the most common issues we see with ABN registrations and obligations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 reveal delay-1">
            {MISTAKES.map((m, i) => (
              <div key={i} className="bg-white rounded-xl p-3.5 flex flex-col" style={{ border: '1.5px solid #E2EFE9', boxShadow: '0 1px 4px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.04)' }}>
                <div className="w-6 h-6 rounded-lg flex items-center justify-center mb-3 flex-shrink-0" style={{ background: '#FDF0D5' }}>
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v4M6 8.5v.5" stroke="#E9A020" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-[13px] font-semibold text-ink mb-1.5">{m.title}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65] flex-1">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-7 lg:py-14" style={{ background: '#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl mb-7 reveal">
            <span className="section-label">Common questions</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-1" style={{ fontSize: 'clamp(16px,2vw,22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              ABN questions, answered.
            </h2>
          </div>
          <div className="max-w-2xl reveal delay-1">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="Not sure?"
        heading="Not sure if you"
        headingEm="need an ABN?"
        sub="We will help you understand your situation and register correctly if needed."
        primaryLabel="Get started on WhatsApp"
      />
    </>
  )
}
