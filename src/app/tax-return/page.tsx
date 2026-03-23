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
  { title: 'Work uniforms and clothing',   body: 'Protective or required work clothing, such as safety boots, high-visibility vests, or branded uniforms.' },
  { title: 'Tools and equipment',          body: 'Tools or equipment purchased for work and used directly in your job.' },
  { title: 'Licences and certifications',  body: 'Costs for licences required for your work, such as RSA, White Card, or WWCC.' },
  { title: 'Laundry and cleaning',         body: 'Cleaning and maintenance of work-related or protective clothing.' },
  { title: 'Work-related travel',          body: 'Travel between job sites - not travel from home to your regular workplace.' },
  { title: 'Charitable donations',         body: 'Donations of $2 or more to registered Australian charities.' },
]

const STEPS = [
  { n: '1', title: 'Send us your details',     body: 'Provide your income details, payment summaries, and any work-related expenses.' },
  { n: '2', title: 'We review everything',     body: 'We check your income, deductions, and residency status to ensure everything is correct.' },
  { n: '3', title: 'We prepare and lodge',     body: 'We prepare your tax return and lodge it directly with the ATO on your behalf.' },
  { n: '4', title: 'ATO processes your return', body: 'The ATO reviews your return and issues a Notice of Assessment with the final outcome.' },
]

const TESTIMONIALS = [
  {
    name: 'Emma T.',
    from: 'United Kingdom · WHV 417',
    quote: 'Got my TFN sorted in two days, and they handled my entire tax return when I left. No stress, just money back in my account.',
    amount: '$2,450',
    initials: 'E',
    bgColor: '#FCE7F3',
    textColor: '#9D174D',
  },
  {
    name: 'Max Fischer',
    from: 'Germany · WHV 417',
    quote: 'Fast, clear, and genuinely helpful. They explained everything simply and helped me get my super back after I left.',
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

          <div className="max-w-[620px] mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>Tax Return</span>
            </div>

            <h1 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px, 3.23vw, 37px)', lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: '18ch', marginBottom: '12px', textWrap: 'balance' }}>
              Lodge your tax return correctly.<br />
              <span style={{ color: '#0B5240' }}>We handle everything for you.</span>
            </h1>

            <p className="font-light" style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'rgba(10,15,13,0.6)', maxWidth: '26ch', marginBottom: '24px', textWrap: 'balance' }}>
              If you earned income in Australia, you are required to lodge a tax return. We make sure everything is done accurately and on time.
            </p>

            {/* Primary CTA */}
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 32px', fontSize: '15px', maxWidth: '300px', width: '100%', display: 'flex', marginLeft: 'auto', marginRight: 'auto', marginBottom: '16px' }}>
              Start your tax return →
            </a>

            {/* Trust under CTA */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {['1,200+ travellers helped', '4.9 Google rating', 'Response within 1 hour'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5" style={{ fontSize: '12.5px', color: 'rgba(10,15,13,0.45)' }}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                    <path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MONEY TRIGGER ─────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-10 lg:py-14">
          <div className="max-w-[560px]">
            <p className="font-serif font-black text-white mb-2" style={{ fontSize: 'clamp(15px, 2.21vw, 24px)', letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: '24ch', textWrap: 'balance' }}>
              Most working holiday travellers overpay tax - we make sure you don&apos;t.
            </p>
            <p className="font-light mb-5" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)' }}>
              You may have tax to pay or be eligible for a refund. Either way, we handle it correctly.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold transition-all"
              style={{ height: '48px', padding: '0 24px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px', maxWidth: '300px', width: '100%', justifyContent: 'center' }}>
              Check my refund now →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label">What we do for you</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(17px, 2.04vw, 24px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '24ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              We handle your tax return from start to finish.
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '32ch' }}>
              No stress, no confusion. Just a correctly lodged return and the best possible outcome.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 reveal delay-1">
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10l4.5 4.5 7.5-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>,
                title: 'We review your full situation',
                body: 'We check your income, deductions, and residency status to ensure everything is correct.',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="11.5" x2="11" y2="11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
                title: 'We lodge your return correctly',
                body: 'We prepare your tax return and lodge it directly with the ATO on your behalf.',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>,
                title: 'We maximise your refund',
                body: 'We identify every deduction you are entitled to - nothing is missed.',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                title: 'No stress, no confusion',
                body: 'Send us your details and we handle everything. No ATO portals, no paperwork.',
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
          </div>
        </div>
      </section>

      {/* ── EARLY SOCIAL PROOF ────────────────────────────────────────────── */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center mb-8 reveal">
            <span className="section-label center">Real results</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(17px, 1.87vw, 22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Real experiences from backpackers like you.
            </h2>
          </div>
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
              There is a better way.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto reveal delay-1">
            <div className="rounded-2xl" style={{ padding: '18px 20px', background: '#fff', border: '1px solid #E2EFE9' }}>
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-muted mb-4">Lodge via ATO yourself</p>
              <div className="space-y-3">
                {[
                  'Confusing government forms',
                  'Easy to miss deductions',
                  'Time consuming',
                  'No guidance if something goes wrong',
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
                  'Every deduction identified',
                  'No stress or confusion',
                  'Real support throughout',
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


      {/* ── CROSS LINK ────────────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid #E2EFE9', borderBottom: '1px solid #E2EFE9', background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="font-light text-muted" style={{ fontSize: '13.5px' }}>
            Leaving Australia? You may also be owed superannuation.
          </p>
          <a href="/superannuation" className="inline-flex items-center gap-1.5 font-semibold whitespace-nowrap transition-colors hover-forest-light flex-shrink-0" style={{ fontSize: '13px', color: '#0B5240' }}>
            Claim your super →
          </a>
        </div>
      </div>

      {/* ── TAX RATES ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-3xl reveal">
            <span className="section-label">Tax rates</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(17px, 2.04vw, 24px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '8px', maxWidth: '22ch', textWrap: 'balance' }}>
              Tax rates in Australia.
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.65, marginBottom: '28px', maxWidth: '36ch' }}>
              There are different tax rates for Working Holiday visa holders and Australian residents.
            </p>

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
                  <h3 className="font-semibold text-ink mb-3" style={{ fontSize: '13px', letterSpacing: '-0.01em' }}>{table.label}</h3>
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

            <div className="mt-5 rounded-xl px-4 py-3" style={{ background: '#FFFCF5', border: '1.5px solid #E9A020', borderRadius: '12px' }}>
              <p className="font-light text-body leading-[1.7]" style={{ fontSize: '12.5px' }}>
                If your employer is not registered as a Working Holiday employer, you may be taxed at 30% instead of the Working Holiday rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEDUCTIONS ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Deductions</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(17px, 2.04vw, 24px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              Work-related deductions<br /><em className="not-italic font-normal text-forest-400">can affect your tax outcome.</em>
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '32ch' }}>
              You may be able to claim work-related deductions. Only expenses directly related to your work and supported by records or receipts can be included.
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
              <p>Personal expenses, fines, and travel between home and your regular workplace are not claimable.</p>
            </div>
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
              Send us your details. We prepare and lodge your tax return with the ATO.
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
          </div>
        </div>
      </section>

      {/* ── TIMING + DOCUMENTS ───────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            <div className="reveal">
              <span className="section-label">Timing</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-6" style={{ fontSize: 'clamp(17px, 1.87vw, 22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Typical timeline<br />
                <em className="not-italic font-normal text-forest-400">for your tax return.</em>
              </h2>
              <div className="space-y-0">
                {[
                  { label: 'Our preparation',  body: 'We typically prepare your tax return within 24 hours after receiving all required details.' },
                  { label: 'ATO processing',   body: 'The ATO usually processes tax returns within 7 to 14 business days. During peak periods, processing may take longer.' },
                  { label: 'Final outcome',    body: 'Once the ATO issues a Notice of Assessment, your final tax outcome is confirmed and any amount due is paid to your Australian bank account.' },
                ].map((item, i) => (
                  <div key={i} style={{ paddingTop: '14px', paddingBottom: '14px', borderTop: '1px solid #EDF4F0' }}>
                    <p className="text-[13px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '4px' }}>{item.label}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.75]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>

            <div className="reveal delay-1">
              <span className="section-label">What to have ready</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-5" style={{ fontSize: 'clamp(17px, 1.87vw, 22px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Documents<br />
                <em className="not-italic font-normal text-forest-400">you will need.</em>
              </h2>
              <div className="flex flex-col mb-5" style={{ gap: '12px' }}>
                {[
                  'Tax File Number (TFN)',
                  'Bank account details (if applicable)',
                  'Receipts for any work-related expenses you want to claim',
                  'Personal details (such as your address and contact phone number)',
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
              <div className="rounded-xl px-4 py-3" style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '12px 16px', borderRadius: '12px' }}>
                <p className="font-light leading-[1.75]" style={{ fontSize: '12.5px', color: '#991B1B' }}>
                  A registered tax agent will never ask for your passwords, SMS verification codes, or access to your myGov or myID account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 lg:gap-16 items-start">
            <div className="reveal">
              <span className="section-label">Questions</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(17px, 2.04vw, 24px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '20ch', marginTop: '8px', marginBottom: '10px', textWrap: 'balance' }}>
                Tax return questions, answered.
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.65, maxWidth: '26ch', marginBottom: '24px' }}>
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

      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="What's next?"
        heading="Lodged your return? Now claim your super."
        body="Your employer paid superannuation on top of your wages. When you leave Australia, you can claim it all back."
        cta="Learn about super withdrawal →"
        href="/superannuation"
      />

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
      

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="Need help?"

        heading="Need help with"
        headingEm="your tax return?"
        sub="We review your details and lodge your tax return with the ATO."
        primaryLabel="Get started →"
        trustLine="Check your eligibility for free"
      />
    </>
  )
}
