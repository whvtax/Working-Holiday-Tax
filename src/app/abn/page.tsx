import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { NextStep } from '@/components/ui/NextStep'
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
  { title: 'Working as an employee with an ABN', body: 'If your employer controls your work, you may be considered an employee.' },
  { title: 'Incorrect business activity',        body: 'Your ABN activity should match the work you actually do.' },
  { title: 'Not tracking your income properly',  body: 'You need to track your income and set aside money for tax.' },
  { title: 'Not lodging your tax return',        body: 'You must report your ABN income in your tax return.' },
]

const STEPS = [
  { n: '1', title: 'Check if you need an ABN',  body: 'Make sure you are working as a contractor and not as an employee. Have your TFN and basic details ready before you apply.' },
  { n: '2', title: 'Submit your application',   body: 'Apply online with your personal and work details in a few minutes. The process is simple, free, and done online.' },
  { n: '3', title: 'Application review',        body: 'Your application is reviewed online after you submit your details. Most ABNs are approved instantly, while some may take longer.' },
  { n: '4', title: 'Receive your ABN',          body: 'Once approved, your ABN is issued and ready to use immediately. You can start working and invoicing without any delays.' },
]

export default function ABNPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white hero-section">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 pt-8 pb-6 lg:pt-14 lg:pb-12">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-6" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">ABN Registration</span>
          </nav>

          <div className="max-w-[600px] mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>ABN Registration</span>
            </div>

            {/* Headline — matches TFN system */}
                        <h1 className="font-serif font-black text-ink" style={{ fontSize:'clamp(24px,3.2vw,40px)', lineHeight:1.06, letterSpacing:'-0.03em', marginBottom:'14px' }}>
              Register your ABN correctly<br />
              <span style={{ color:'#0B5240' }}>and start working legally.</span>
            </h1>

            <p className="font-semibold text-ink" style={{ fontSize:'15px', letterSpacing:'-0.01em', marginBottom:'6px' }}>
              We handle the registration so your ABN matches your actual work.
            </p>

            <p className="font-light" style={{ fontSize:'14.5px', lineHeight:1.65, color:'rgba(10,15,13,0.6)', maxWidth:'44ch', marginBottom:'24px' }}>
              No rejections, no delays. Set up correctly from the start.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-row gap-3 items-center" style={{ marginBottom:'20px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex"
                style={{ height:'52px', padding:'0 32px', fontSize:'15px', borderRadius:'100px' }}>
                Register your ABN →
              </a>
              <a href="#how-it-works" className="btn-ghost-dark inline-flex" style={{ height:'52px', padding:'0 24px', fontSize:'15px' }}>
                How it works →
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {['1,200+ travellers helped', 'Response within 1 hour', 'ATO compliant', 'By a registered tax agent'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5" style={{ fontSize:'12px', color:'rgba(10,15,13,0.45)', whiteSpace:'nowrap' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── URGENCY STRIP ─────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-8 lg:py-10 text-center">
          <div className="max-w-[560px] mx-auto">
            <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(18px,2.2vw,26px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '8px' }}>
              Not sure if you need an ABN?<br />Get a clear answer in minutes.
            </p>
            <p className="font-light" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}>
              We tell you exactly what applies to your situation.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold"
              style={{ height: '46px', padding: '0 24px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px' }}>
              Chat with experts →
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW WE HELP ───────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '40px' }}>
            <span className="section-label center">How we help</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{
              fontSize: 'clamp(17px, 2.04vw, 24px)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              maxWidth: '22ch',
              marginTop: '8px',
              marginBottom: '10px',
              textWrap: 'balance',
            }}>
              We tell you what you need.<br /><em className="not-italic font-normal text-forest-400">Then we set it up correctly.</em>
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '30ch', margin: '0 auto' }}>
              We make sure it&apos;s set up correctly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 reveal delay-1" style={{ marginBottom: '40px' }}>
            {[
              { n: '01', title: 'We tell you if you need one', body: 'Not sure if your work requires an ABN? We check your situation and give you a clear answer - no guessing.' },
              { n: '02', title: 'We set it up correctly',      body: 'We handle the registration so your ABN matches your actual work. No rejections, no delays.' },
              { n: '03', title: 'Done right from day one',     body: 'Avoid costly mistakes from the start. We make sure everything is correct so you can focus on working.' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#F7FCF9', border: '1px solid #C8EAE0' }}>
                <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-subtle block" style={{ marginBottom: '12px' }}>{item.n}</span>
                <h3 className="font-semibold text-ink" style={{ fontSize: '14px', letterSpacing: '-0.01em', marginBottom: '6px' }}>{item.title}</h3>
                <p className="font-light text-muted leading-[1.65]" style={{ fontSize: '13px' }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center reveal delay-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 32px', fontSize: '15px', maxWidth: '300px', width: '100%' }}>
              Register your ABN →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: 'rgba(10,15,13,0.4)' }}>
              Australian Business Register compliant
            </p>
          </div>
        </div>
      </section>

      {/* ── COMMON MISTAKES ───────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#FFFDF7' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Common mistakes</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{
              fontSize: 'clamp(17px, 2.04vw, 24px)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              maxWidth: '22ch',
              marginTop: '8px',
              marginBottom: '8px',
              textWrap: 'balance',
            }}>
              Setting up an ABN incorrectly<br /><em className="not-italic font-normal text-forest-400">can cost you later.</em>
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13px', lineHeight: 1.65, maxWidth: '32ch' }}>
              These are common mistakes that can delay your setup and cause problems later.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal delay-1" style={{ marginBottom: '28px' }}>
            {MISTAKES.map((m, i) => (
              <div key={i} className="rounded-xl flex flex-col"
                style={{ padding: '20px', background: '#FFFCF5', border: '1.5px solid #F0D99A', boxShadow: '0 1px 4px rgba(0,0,0,.03)' }}>
                <div className="flex items-center justify-center rounded-lg flex-shrink-0" style={{ width: '30px', height: '30px', background: '#FDF0D5', border: '1px solid #F0D99A', marginBottom: '12px' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v4M6 8.5v.5" stroke="#C47E10" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-[13.5px] font-semibold text-ink" style={{ marginBottom: '6px' }}>{m.title}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65] flex-1">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO REGISTER ───────────────────────────────────────────────── */}
      <section id="how-to-register" className="py-10 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '48px' }}>
            <span className="section-label center">Step by step</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{
              fontSize: 'clamp(17px, 2.04vw, 24px)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              maxWidth: '22ch',
              marginTop: '8px',
              marginBottom: '10px',
              textWrap: 'balance',
            }}>
              Getting your ABN<br /><em className="not-italic font-normal text-forest-400">takes about 10 minutes.</em>
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '13.5px' }}>
              The process is straightforward. We guide you through every step.
            </p>
          </div>

          <div className="reveal delay-1">
            {/* Desktop */}
            <div className="hidden lg:block">
              <div className="relative flex items-start">
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)' }} aria-hidden="true" />
                {STEPS.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0" style={{ background: '#0B5240', marginBottom: '16px', boxShadow: '0 0 0 4px #EEF7F2, 0 0 0 5px #C8EAE0' }}>
                      {s.n}
                    </div>
                    <p className="text-[13.5px] font-semibold text-ink text-center" style={{ marginBottom: '6px', letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p className="text-[12px] font-light text-muted leading-[1.65] text-center">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex flex-col">
              {STEPS.map((s, i) => (
                <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length - 1 ? '20px' : '0' }}>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white" style={{ background: '#0B5240' }}>{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2" style={{ minHeight: '20px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                  </div>
                  <div style={{ paddingTop: '3px' }}>
                    <p className="text-[13.5px] font-semibold text-ink" style={{ marginBottom: '4px', letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.65]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS AN ABN ────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center">

            <div className="reveal">
              <span className="section-label">What is an ABN?</span>
              <h2 className="font-serif font-black text-ink" style={{
                fontSize: 'clamp(15px, 1.87vw, 22px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                maxWidth: '22ch',
                marginTop: '8px',
                marginBottom: '20px',
                textWrap: 'balance',
              }}>
                An Australian Business Number lets you work<br /><em className="not-italic font-normal text-forest-400">and invoice legally in Australia.</em>
              </h2>

              <div style={{ marginBottom: '20px' }}>
                <p className="text-[13.5px] font-light text-body leading-[1.75]" style={{ maxWidth: '36ch', marginBottom: '12px' }}>
                  An ABN is an 11 digit number that identifies you when working as a contractor or freelancer in Australia. You include it on every invoice you send.
                </p>
                <p className="text-[13.5px] font-light text-body leading-[1.75]" style={{ maxWidth: '36ch' }}>
                  With an ABN, no tax is withheld automatically. You receive the full amount and manage your own tax.
                </p>
              </div>
            </div>

            <div className="reveal delay-1">
              <span className="section-label block" style={{ marginBottom: '12px' }}>When you need one</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-6 lg:gap-10 items-start">
            <div className="reveal">
              <span className="section-label">Questions</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(17px, 2.04vw, 24px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '20ch', marginTop: '8px', marginBottom: '10px', textWrap: 'balance' }}>
                ABN questions, answered.
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.65, maxWidth: '28ch', marginBottom: '24px' }}>
                Still unsure? Ask our tax experts.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex"
                style={{ height: '48px', padding: '0 22px', fontSize: '14px' }}>
              Ask us now →
              </a>
            </div>
            <div className="reveal delay-1 max-w-[680px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="What's next?"
        heading="Time to lodge your tax return?"
        body="At the end of the Australian financial year, you will need to lodge a tax return and declare your ABN income."
        cta="Learn about tax returns →"
        href="/tax-return"
      />


    </>
  )
}
