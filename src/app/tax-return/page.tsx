import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Tax Return in Australia for WHV Holders',
  description: 'Get your Australian tax refund. We prepare and lodge your tax return for WHV holders - online, fast, and handled for you.',
}

const faqs = [
  {
    question: 'Do I need to lodge a tax return if I only worked for a short time?',
    answer: 'Yes. If you earned income in Australia, you may still need to lodge a tax return, even if you only worked for a short period.',
  },
  {
    question: 'What happens if I do not lodge my tax return?',
    answer: 'If you are required to lodge and do not do so, the ATO may apply penalties or take further action.',
  },
  {
    question: 'Can I lodge my tax return after leaving Australia?',
    answer: 'Yes. You can lodge your tax return from overseas after you leave Australia.',
  },
  {
    question: 'What documents do I need to complete my tax return?',
    answer: 'You will need your TFN, income details, and any records for work-related expenses you want to claim.',
  },
  {
    question: 'How do I know if my tax return has been completed?',
    answer: 'Once your tax return is processed, the ATO issues a Notice of Assessment confirming the final outcome.',
  },
]

const DEDUCTIONS = [
  { title: 'Work uniforms and clothing',   body: 'Protective or required clothing like boots, high-vis, or uniforms.' },
  { title: 'Tools and equipment',          body: 'Work-related tools or equipment you purchased and used.' },
  { title: 'Licences and certifications',  body: 'Work licences like RSA, White Card, or similar.' },
  { title: 'Laundry and cleaning',         body: 'Cleaning and maintaining your work clothing.' },
  { title: 'Work-related travel',          body: 'Travel between job sites (not daily commute).' },
  { title: 'Charitable donations',         body: 'Donations to registered Australian charities.' },
]

const STEPS = [
  { n: '1', title: 'Tell us about your situation', body: 'Share your income and work details so we can guide you correctly.' },
  { n: '2', title: 'Send your details in minutes',  body: 'Payment summaries and basic info - quick and simple.' },
  { n: '3', title: 'We handle everything for you',  body: 'We prepare and lodge your tax return correctly.' },
  { n: '4', title: 'Get your refund paid',           body: 'Your refund is sent directly to your bank account.' },
]

const TESTIMONIALS = [
  {
    name: 'Emma T.',
    from: 'United Kingdom · WHV 417',
    quote: 'They handled my tax return from start to finish. I had no idea what I could claim, and ended up getting way more back than expected.',
    amount: '$2,450',
    initials: 'E',
    bgColor: '#FCE7F3',
    textColor: '#9D174D',
  },
  {
    name: 'Max Fischer',
    from: 'Germany · WHV 417',
    quote: 'Super easy process. They explained everything clearly and made sure I got the maximum refund back. Highly recommend.',
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

export default function TaxReturnPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white hero-min hero-section">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 pt-8 pb-6 lg:pt-14 lg:pb-12">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-6" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Tax Return</span>
          </nav>

          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>Tax Return</span>
            </div>

                        <h1 className="font-serif font-black text-ink" style={{ fontSize:'clamp(24px,3.2vw,40px)', lineHeight:1.06, letterSpacing:'-0.03em', marginBottom:'14px' }}>
              Get your tax refund sorted properly{' '}
              <span style={{ color:'#0B5240' }}>and maximise your return</span>
            </h1>

            <p className="font-semibold text-ink" style={{ fontSize:'15px', letterSpacing:'-0.01em', marginBottom:'6px' }}>
              We handle everything for you - from start to finish.
            </p>

            <p className="font-light" style={{ fontSize:'14.5px', lineHeight:1.65, color:'rgba(10,15,13,0.6)', maxWidth:'40ch', marginBottom:'24px' }}>
              Most returns are lodged within 24 hours - no confusion, no delays.
            </p>

            <div className="flex flex-col gap-3" style={{ marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center w-full"
                style={{ height:'52px', padding:'0 36px', fontSize:'15px', borderRadius:'100px' }}>
                Start your tax return →
              </a>
              <a href="#how-it-works" className="btn-ghost-dark inline-flex justify-center w-full" style={{ height:'52px', padding:'0 24px', fontSize:'15px' }}>
                See how it works →
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2" style={{ maxWidth:'340px' }}>
              {['1,200+ travellers helped', 'Response within 1 hour', 'ATO compliant', 'By a registered tax agent'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5" style={{ fontSize:'12px', color:'rgba(10,15,13,0.45)' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MONEY TRIGGER ─────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240', height: 'auto', paddingTop: '48px', paddingBottom: '48px' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-[560px] mx-auto text-center">
            <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(17px, 2.21vw, 26px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '10px' }}>
              Most WHV travellers overpay tax.<br />We help you get it back.
            </p>
            <p className="font-light" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}>
              Whether you’re owed money or need to pay, we handle everything correctly.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold transition-all"
              style={{ height: '46px', padding: '0 24px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px' }}>
              Check how much I can get back →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">What we do for you</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(17px, 2.04vw, 24px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '24ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              We handle your tax return from start to finish
              and maximise your refund
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '32ch' }}>
              No stress, no confusion - just a correctly lodged return and the most money back.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 reveal delay-1">
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10l4.5 4.5 7.5-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>,
                title: 'We review your full situation',
                body: 'We check your income, deductions, and residency status so nothing is missed.',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="11.5" x2="11" y2="11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
                title: 'We lodge your return correctly',
                body: 'We prepare and lodge your tax return directly with the ATO for you.',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>,
                title: 'We maximise your refund',
                body: "We claim every deduction you're entitled to - so you get the most back.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                title: 'No stress, no confusion',
                body: 'Send your details and we handle everything - no ATO portals or paperwork.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl flex gap-3" style={{ padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-forest-500" style={{ background: '#EAF6F1' }}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '6px' }}>{item.title}</p>
                  <p className="text-[13px] font-light text-muted leading-[1.7]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center reveal delay-2" style={{ marginTop: '32px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 28px', fontSize: '14.5px', maxWidth: '300px', width: '100%' }}>
              Start your tax return →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#8AADA3' }}>Takes 2 minutes&nbsp;&bull;&nbsp;No upfront fees</p>
          </div>
        </div>
      </section>

      {/* ── EARLY SOCIAL PROOF ────────────────────────────────────────────── */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center mb-8 reveal">
            <span className="section-label center">Real results</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(17px, 1.87vw, 22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              See how much backpackers like you get back
            </h2>
          </div>
          <p className="text-center font-medium text-muted" style={{ fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '16px', color: 'rgba(10,15,13,0.4)' }}>Real refunds from real travellers</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto reveal delay-1">
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

      {/* ── COMPARISON ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center mb-10 reveal">
            <span className="section-label center">Why not do it yourself?</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(17px, 1.87vw, 22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Don’t risk losing money on your tax return
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto reveal delay-1">
            <div className="rounded-2xl" style={{ padding: '18px 20px', background: '#fff', border: '1px solid #E2EFE9' }}>
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-muted mb-4">Lodge via ATO yourself</p>
              <div className="space-y-3">
                {[
                  'Confusing ATO forms and systems',
                  'Easy to miss deductions you\'re entitled to',
                  'Takes time and effort to get it right',
                  'No support if something goes wrong',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="7.5" fill="#FEF2F2" stroke="#FECACA" strokeWidth="0.5"/>
                      <path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                    <p className="text-[13px] font-light text-muted leading-[1.65]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl" style={{ padding: '18px 20px', background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-forest-500 mb-4">Use our service</p>
              <div className="space-y-3">
                {[
                  'Done correctly the first time',
                  'Every deduction claimed',
                  'No stress or confusion',
                  'Real support every step of the way',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                      <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[13px] font-semibold text-ink leading-[1.65]">{item}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '20px' }}>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-primary inline-flex"
                  style={{ height: '46px', padding: '0 20px', fontSize: '13.5px', maxWidth: '240px', width: '100%' }}>
              Start your tax return →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ── TAX RATES ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Tax rates</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(17px, 2.04vw, 24px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              How much tax you actually pay in Australia
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13px', lineHeight: 1.65, maxWidth: '40ch' }}>
              Tax rates are different depending on your visa and situation.
            </p>
          </div>

            <p className="text-center font-light text-muted mx-auto" style={{ fontSize: '14px', lineHeight: 1.65, maxWidth: '44ch', marginBottom: '24px' }}>Most WHV travellers pay 15% on their first $45,000 — but many overpay and claim it back later.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {[
                {
                  label: 'Working Holiday visa holders',
                  rows: [
                    ['$0 - $45,000', '15%'],
                    ['$45,001 - $135,000', '$6,750 + 30%'],
                    ['$135,001 - $190,000', '$33,750 + 37%'],
                    ['$190,001+', '$54,100 + 45%'],
                  ],
                },
                {
                  label: 'Australian residents',
                  rows: [
                    ['$0 - $18,200', 'Nil'],
                    ['$18,201 - $45,000', '16%'],
                    ['$45,001 - $135,000', '$4,288 + 30%'],
                    ['$135,001 - $190,000', '$31,288 + 37%'],
                    ['$190,001+', '$51,638 + 45%'],
                  ],
                },
              ].map((table, ti) => (
                <div key={ti} className="min-w-0 flex flex-col">
                  <h3 className="font-semibold text-ink mb-3 text-center" style={{ fontSize: '13px', letterSpacing: '-0.01em' }}>{table.label}</h3>
                  <div className="rounded-xl overflow-hidden flex-1" style={{ border: '1px solid #C8EAE0' }}>
                    <table className="w-full" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                      <thead>
                        <tr style={{ background: '#EAF6F1' }}>
                          <th className="text-left font-semibold text-ink" style={{ fontSize: '11px', padding: '8px 12px', letterSpacing: '0.02em', width: '55%' }}>Taxable income</th>
                          <th className="text-left font-semibold text-ink" style={{ fontSize: '11px', padding: '8px 12px', letterSpacing: '0.02em', width: '45%' }}>Tax rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map(([income, rate], i) => (
                          <tr key={i} style={{ borderTop: '1px solid #E2EFE9', background: i % 2 === 0 ? '#ffffff' : '#F7FCF9' }}>
                            <td className="font-light text-body" style={{ fontSize: '11.5px', padding: '8px 12px' }}>{income}</td>
                            <td className="font-medium text-ink" style={{ fontSize: '11.5px', padding: '8px 12px' }}>{rate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl px-5 py-3 mx-auto" style={{ background: '#FFFCF5', border: '1.5px solid #E9A020', borderRadius: '12px', maxWidth: 'fit-content' }}>
              <p className="font-light text-body" style={{ fontSize: '12.5px', lineHeight: 1.5, textAlign: 'center' }}>
                If your employer is not registered as a Working Holiday employer, you could be taxed at 30% instead of 15%.
              </p>
            </div>
            <div className="text-center mt-8">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-medium transition-all"
                style={{ fontSize: '14px', color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                Not sure if you paid too much tax? Check your refund now →
              </a>
            </div>
        </div>
      </section>

      {/* ── DEDUCTIONS ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Deductions</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(17px, 2.04vw, 24px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              Work-related deductions can increase your refund
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '32ch' }}>
              You may be able to claim more than you think - we make sure nothing is missed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal delay-1">
            {DEDUCTIONS.map((d, i) => (
              <div key={i} className="bg-white rounded-xl" style={{ padding: '16px 18px', border: '1px solid #E2EFE9', boxShadow: '0 1px 3px rgba(0,0,0,.03)' }}>
                <p className="text-[13px] font-semibold text-ink" style={{ marginBottom: '5px' }}>{d.title}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ maxWidth: '28ch' }}>{d.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 max-w-xl reveal delay-2">
            <div className="info-block">
              <p style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>Personal expenses, fines, and daily travel to work are not claimable.</p>
            </div>
          </div>

          <div className="text-center mt-8 reveal delay-3">
            <p className="font-light text-muted mx-auto" style={{ fontSize: '14px', lineHeight: 1.65, maxWidth: '40ch', marginBottom: '16px' }}>
              Not sure what you can claim? We check everything for you and maximise your refund.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '48px', padding: '0 28px', fontSize: '14px', maxWidth: '280px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              Start your tax return →
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '48px' }}>
            <span className="section-label center">How it works</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(17px, 2.04vw, 24px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              From your documents<br /><em className="not-italic font-normal text-forest-400">to your tax outcome.</em>
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '14px' }}>
              Simple, guided process from start to finish
            </p>
          </div>

          <div className="reveal delay-1">
            <div className="hidden lg:block">
              <div className="relative flex items-start">
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)', zIndex: 0 }} aria-hidden="true" />
                {STEPS.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white mb-5 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 4px #ffffff, 0 0 0 5px #C8EAE0' }}>
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
                <div key={i} className="flex gap-4" style={{ paddingBottom: '20px' }}>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white" style={{ background: '#0B5240' }}>{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2 min-h-[20px]" style={{ background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                  </div>
                  <div className="pt-1">
                    <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '4px' }}>{s.title}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.65]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10 reveal delay-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '52px', padding: '0 32px', fontSize: '15px' }}>
              Start your tax return →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#8AADA3' }}>Takes 2 minutes&nbsp;&bull;&nbsp;No upfront cost</p>
          </div>
        </div>
      </section>

      {/* ── TIMING + DOCUMENTS ───────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            <div className="reveal text-center lg:text-left">
              <span className="section-label center lg:text-left">Timing</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-6" style={{ fontSize: 'clamp(17px, 1.87vw, 22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                When you’ll get your refund
              </h2>
              <div className="space-y-0">
                {[
                  { label: 'Our preparation',  body: 'We prepare your return within 24 hours of receiving your details.' },
                  { label: 'ATO processing',   body: 'The ATO usually processes returns within 7–14 business days. This can be longer during busy periods.' },
                  { label: 'Final outcome',    body: 'Once your return is processed, your refund is paid directly to your Australian bank account.' },
                ].map((item, i) => (
                  <div key={i} style={{ paddingTop: '14px', paddingBottom: '14px', borderTop: '1px solid #EDF4F0' }}>
                    <p className="text-[13px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '4px' }}>{item.label}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.75]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>

            <div className="reveal delay-1 text-center lg:text-left">
              <span className="section-label center lg:text-left">What to have ready</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(17px, 1.87vw, 22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                What you need to get started
              </h2>
              <div className="flex flex-col mb-5" style={{ gap: '12px' }}>
                {[
                  'Tax File Number (TFN)',
                  'Bank account details (if applicable)',
                  'Receipts for any expenses you want to claim',
                  'Your personal details (address and contact number)',
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
              <div className="rounded-xl px-4 py-3 text-center" style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '12px 16px', borderRadius: '12px' }}>
                <p className="font-light leading-[1.75]" style={{ fontSize: '12.5px', color: '#991B1B' }}>
                  A registered tax agent will never ask for your password, SMS codes, or access to your myGov account.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-10 reveal">
            <p className="font-light text-muted" style={{ fontSize: '15px', lineHeight: 1.65, marginBottom: '16px' }}>
              Ready to get your refund? Start your tax return in minutes.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 32px', fontSize: '15px', maxWidth: '300px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              Start your tax return →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-6 lg:gap-10 items-start">
            <div className="text-center">
              <span className="section-label center">Questions</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize:'clamp(17px, 2.04vw, 24px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px', marginBottom:'10px' }}>
                Tax return questions, answered.
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
        heading="Don't leave your super behind"
        body="Your employer paid super on top of your wages. When you leave Australia, you can claim it back."
        cta="Check your super eligibility →"
        trustLine="Takes just a few minutes to check"
        href="/superannuation"
      />

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
    </>
  )
}
