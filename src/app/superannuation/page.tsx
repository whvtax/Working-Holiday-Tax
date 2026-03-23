import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Super Withdrawal (DASP) for Working Holiday Visa Holders',
  description: 'Claim your Australian superannuation after leaving. Your employer paid 12% of your wages into super - we help you get it back via DASP.',
}

const faqs = [
  {
    question: 'When can I claim my super?',
    answer: 'You can claim your super once you have left Australia and your visa has expired or been cancelled.',
  },
  {
    question: 'How much tax is taken from my super withdrawal?',
    answer: 'Super withdrawals for Working Holiday visa holders are taxed at 65%.',
  },
  {
    question: 'I left Australia years ago - can I still claim?',
    answer: 'Yes. There is no time limit to claim your super. Even if your balance was transferred to the ATO, you can still claim it.',
  },
  {
    question: 'I worked for multiple employers - do I have multiple super accounts?',
    answer: 'You may have multiple super accounts from different employers. We help you find and combine everything before submitting your claim.',
  },
  {
    question: 'Do I receive super if I worked under an ABN?',
    answer: 'Generally no. Super is usually paid only to employees. If you worked under an ABN, clients are not required to pay super.',
  },
]

const STEPS = [
  { n: '1', title: 'Tell us about your situation', body: 'Share your visa and work details so we can guide you correctly.' },
  { n: '2', title: 'Send your details in minutes',  body: 'Passport, TFN and super fund info - quick and simple.' },
  { n: '3', title: 'We handle everything for you',  body: 'We prepare and submit your claim correctly.' },
  { n: '4', title: 'Receive your super payment',    body: 'Your money is paid directly to your Australian bank account.' },
]

const TESTIMONIALS = [
  {
    name: "Liam O'Brien",
    from: 'Ireland · WHV 417',
    quote: 'I had multiple employers and no idea how to claim my super. They handled everything and got it all back for me.',
    amount: '$3,200',
    initials: 'L',
    bgColor: '#DBEAFE',
    textColor: '#1E40AF',
  },
  {
    name: 'Max Fischer',
    from: 'Germany · WHV 417',
    quote: 'Super easy process. They explained everything clearly and made sure I got all my super back. Highly recommend.',
    amount: '$4,100',
    initials: 'M',
    bgColor: '#D1FAE5',
    textColor: '#065F46',
  },
]

const IconStar = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/>
  </svg>
)

export default function SuperannuationPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Superannuation</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                Super Withdrawal
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{
                fontSize:'clamp(24px,3.2vw,44px)',
                lineHeight:1.06,
                letterSpacing:'-0.03em',
                marginBottom:'10px',
                maxWidth:'18ch',
              }}>
              {/* Desktop: 2 lines — line 1 black, line 2 green */}
              <span className="hidden lg:block">
                Claim your super back<br />
                <span style={{ color:'#0B5240' }}>when you leave Australia</span>
              </span>
              {/* Mobile: single flow */}
              <span className="lg:hidden">Claim your super back when you leave Australia</span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.3vw,15.5px)', letterSpacing:'-0.01em', marginBottom:'6px', lineHeight:1.4 }}>
              We handle the full DASP process on your behalf.
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,14.5px)',
                lineHeight:1.7,
                color:'rgba(10,15,13,0.6)',
                maxWidth:'38ch',
                marginBottom:'0',
              }}>
              Most payments received within a few weeks. Fully online.
            </p>

            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4"
              style={{ marginTop:'22px', marginBottom:'18px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1' }}>
                Claim your super →
              </a>
              <a href="#how-it-works"
                className="hidden lg:inline-flex btn-ghost-dark justify-center"
                style={{ height:'54px', padding:'0 24px', fontSize:'15px', flex:'1' }}>
                See how it works →
              </a>
            </div>

            <div className="grid grid-cols-2 lg:flex lg:flex-nowrap items-center gap-x-5 lg:gap-x-7 gap-y-2">
              {['1,200+ backpackers helped','4.9★ from 300+ reviews','Registered Australian tax agent','Most replies within 1 hour'].map((t,i) => (
                <span key={i} className="inline-flex items-center gap-1.5"
                  style={{ fontSize:'12px', color:'rgba(10,15,13,0.45)' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── MONEY TRIGGER ─────────────────────────────────────────────────── */}
      <section className="py-8 lg:py-12" style={{ background: '#0B5240' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[560px] mx-auto text-center">
            <p className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(17px, 2.21vw, 26px)', letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: '22ch', marginBottom: '10px', textWrap: 'balance' }}>
              Don&apos;t leave your super behind.
            </p>
            <p className="font-light" style={{ fontSize: '13.5px', lineHeight: 1.65, color: 'rgba(255,255,255,0.6)', maxWidth: '28ch', marginBottom: '20px' }}>
              You can claim it back once you leave. We handle everything for you.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold transition-all"
              style={{ height: '48px', padding: '0 24px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px', maxWidth: '300px', width: '100%', justifyContent: 'center' }}>
              Check your super eligibility →
            </a>
          </div>
        </div>
      </section>

      {/* ── CLARITY — THIS IS YOUR MONEY ──────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">This is your money</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(17px, 2.04vw, 24px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '0', textWrap: 'balance' }}>
              Your super is already yours<br /><em className="not-italic font-normal text-forest-400">you just need to claim it.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-10 reveal delay-1">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.4"/><path d="M11 7v4.5l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                title: 'Employers pay it for you',
                body: 'Super is paid on top of your wages by your employer - required by law.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><rect x="3" y="6" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M7 6V5a4 4 0 018 0v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M9 12l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                title: 'It belongs to you',
                body: 'Your super builds up while you work - and you can claim it when you leave Australia.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M11 3v18M3 11h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.4"/></svg>,
                title: 'We claim it back for you',
                body: 'We find your super, prepare everything, and submit your claim - you receive the payment.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col" style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-forest-500" style={{ background: '#EAF6F1', marginBottom: '12px' }}>
                  {item.icon}
                </div>
                <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '6px' }}>{item.title}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ maxWidth: '26ch' }}>{item.body}</p>
              </div>
            ))}
          </div>

          {/* Key facts strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-5 reveal delay-2">
            {[
              { title: 'Contribution rate',  body: '12% of your wages is paid into your super fund.' },
              { title: 'Who can claim',      body: 'Working Holiday visa holders who have left Australia and their visa has expired.' },
              { title: 'Processing time',    body: 'Usually paid within a few weeks after approval.' },
              { title: 'Payment method',     body: 'Paid directly to your bank account.' },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-xl px-4 py-3.5 flex flex-col" style={{ border: '1px solid #C8EAE0' }}>
                <p className="text-[12px] font-semibold text-ink mb-1">{c.title}</p>
                <p className="text-[12px] font-light text-muted leading-[1.6]">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center reveal delay-3" style={{ marginTop: '28px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover-forest-light"
              style={{ fontSize: '13.5px', color: '#0B5240' }}>
              Check your super eligibility →
            </a>
          </div>
        </div>
      </section>

      {/* ── EARLY SOCIAL PROOF ────────────────────────────────────────────── */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-8 reveal">
            <span className="section-label center">Real results</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(17px, 1.87vw, 22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              See how travellers like you got their super back
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto reveal delay-1">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 flex flex-col" style={{ boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.07)', border: '1px solid #E2EFE9' }}>
                <div className="flex gap-0.5" style={{ marginBottom: '10px' }}>
                  {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
                </div>
                <p className="text-[13px] font-light text-body leading-[1.75] flex-1" style={{ marginBottom: '14px' }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #E2EFE9' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0" style={{ background: t.bgColor, color: t.textColor }}>{t.initials}</div>
                    <div>
                      <p className="text-[12.5px] font-semibold text-ink">{t.name}</p>
                      <p className="text-[11.5px] text-subtle mt-0.5">{t.from}</p>
                    </div>
                  </div>
                  <span className="font-serif font-black text-forest-500" style={{ fontSize: '17px', letterSpacing: '-0.03em' }}>{t.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '48px' }}>
            <span className="section-label center">How it works</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(17px, 2.04vw, 24px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              How it works in 4 simple steps
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '13.5px' }}>
              Simple, guided process from start to finish
            </p>
          </div>

          <div className="reveal delay-1">
            <div className="hidden lg:block">
              <div className="relative flex items-start">
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-[2px]" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)' }} aria-hidden="true" />
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
            <div className="lg:hidden flex flex-col">
              {STEPS.map((s, i) => (
                <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length - 1 ? '20px' : '0' }}>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white" style={{ background: '#0B5240' }}>{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2" style={{ minHeight: '20px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                  </div>
                  <div style={{ paddingTop: '3px' }}>
                    <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '4px' }}>{s.title}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.65]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10 reveal delay-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '52px', padding: '0 28px', fontSize: '14.5px', maxWidth: '300px', width: '100%' }}>
              Claim your super →
            </a>
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY + WHAT YOU NEED ───────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="reveal text-center lg:text-left">
              <span className="section-label center lg:text-left">Who can claim?</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(15px, 1.87vw, 22px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '20px', textWrap: 'balance' }}>
                You can claim your super<br />
                <em className="not-italic font-normal text-forest-400">when you leave Australia</em>
              </h2>
              <div className="space-y-0">
                {[
                  { label: 'Your visa has expired or been cancelled', body: 'You can apply as soon as you leave Australia - no waiting needed.' },
                  { label: 'You no longer hold an Australian visa',   body: 'You must not hold another active visa in Australia.' },
                  { label: 'You have super contributions',           body: 'Make sure your employer has paid your super.' },
                ].map((item, i) => (
                  <div key={i} style={{ paddingTop: '14px', paddingBottom: '14px', borderTop: '1px solid #EDF4F0' }}>
                    <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '4px' }}>{item.label}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.65]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>

            <div className="reveal delay-1 text-center lg:text-left">
              <span className="section-label center lg:text-left">What you will need</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(15px, 1.87vw, 22px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '18px', textWrap: 'balance' }}>
                What you need to claim your super
              </h2>
              <div className="space-y-3.5 mb-5">
                {[
                  'Your passport details',
                  'Your Tax File Number (TFN)',
                  'Your super fund name and member number (if known)',
                  'Your super fund start date (if known)',
                  'Your bank account details for payment',
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

            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-10 items-start">
            <div className="text-center">
              <span className="section-label center">Questions</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize:'clamp(17px, 2.04vw, 24px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px', marginBottom:'10px' }}>
                Super questions, answered.
              </h2>
              <p className="font-light text-muted" style={{ fontSize:'13px', lineHeight:1.65, marginBottom:'24px' }}>
                Have a question? Message us on WhatsApp.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
                style={{ height:'48px', padding:'0 24px', fontSize:'14px', width:'100%', maxWidth:'200px' }}>
                Get help now →
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
        heading="Check if you're eligible for Medicare"
        body="Depending on your country, you may be eligible for Medicare or exempt from the Medicare levy."
        cta="Check your Medicare eligibility →"
        href="/medicare"
      />

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
    </>
  )
}
