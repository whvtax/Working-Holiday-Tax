'use client'
import type { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { WA_URL } from '@/lib/constants'

/* ─── Icons ─────────────────────────────────────────────────────── */
const Star    = () => <svg width="13" height="13" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>
const Tick    = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
const Cross   = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7.5" fill="#FEF2F2" stroke="#FECACA" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#DC2626" strokeWidth="1.4" strokeLinecap="round"/></svg>
const Shield  = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2L3 5v5c0 4.4 3 8.1 7 9 4-1 7-4.6 7-9V5l-7-3z" stroke="#0B5240" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7 10l2 2 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
const Clock   = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="#0B5240" strokeWidth="1.4"/><path d="M10 6v4.5l3 1.5" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round"/></svg>
const Globe   = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="#0B5240" strokeWidth="1.4"/><path d="M2 10h16M10 2c-2.5 3-4 5-4 8s1.5 5 4 8m0-16c2.5 3 4 5 4 8s-1.5 5-4 8" stroke="#0B5240" strokeWidth="1.3"/></svg>
const People  = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8" cy="6" r="3" stroke="#0B5240" strokeWidth="1.4"/><path d="M2 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round"/><circle cx="15" cy="7" r="2" stroke="#0B5240" strokeWidth="1.3"/><path d="M18 17c0-2.2-1.3-4-3-4.8" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round"/></svg>

/* ─── Inline calculator logic ───────────────────────────────────── */
function calcRefund(income: number, withheld: number): { amount: number; owing: boolean } {
  const tax = income <= 45000 ? income * 0.15 : 6750 + (income - 45000) * 0.3
  const diff = withheld - tax
  return { amount: Math.round(Math.abs(diff)), owing: diff < 0 }
}

/* ─── Static data ───────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "I had 4 jobs across 8 months and had no idea my tax was wrong. They found the issue, sorted my return and claimed my super. All done in under a week.",
    name: "Liam O.", country: "Ireland", visa: "WHV 417", initials: "L", bg: "#DBEAFE", fg: "#1E40AF",
  },
  {
    quote: "Already back in Germany when I realised I never claimed my super. Messaged them on WhatsApp, sent my passport and bank details, and it was handled. Never had to go near the ATO website.",
    name: "Max F.", country: "Germany", visa: "WHV 417", initials: "M", bg: "#D1FAE5", fg: "#065F46",
  },
  {
    quote: "My employer was deducting 32.5% instead of 15% for the first 3 months because I had no TFN. They fixed it all in my tax return. I had no idea that was even possible.",
    name: "Emma T.", country: "United Kingdom", visa: "WHV 417", initials: "E", bg: "#FCE7F3", fg: "#9D174D",
  },
]

const FAQS = [
  {
    q: "How much does this cost?",
    a: "Fees vary by service. Message us on WhatsApp for a clear quote based on your situation. There is no cost to ask — the first conversation is always free.",
  },
  {
    q: "How long does it take?",
    a: "Tax returns are usually prepared within 1–2 business days after we receive your details. Super claims take longer as the ATO processes them, but we submit everything quickly. TFN applications are typically confirmed within days.",
  },
  {
    q: "Is this legit? Are you actually registered?",
    a: "Yes. All lodgements are prepared under the supervision of a registered tax agent with the Tax Practitioners Board (TPB). Our agent number is publicly verifiable on the TPB register. We are not a generic tax platform — this is a specialist service run by real people.",
  },
  {
    q: "What happens after I message you?",
    a: "We review your situation, explain exactly what we can do for you, and give you a clear quote. If you want to proceed, we send a short checklist of what we need. No accounts to create, no forms to navigate.",
  },
  {
    q: "I already left Australia. Can I still lodge my return and claim super?",
    a: "Yes. This is one of the most common situations we handle. There is no requirement to be in Australia. Everything is done online and we work with clients all over the world.",
  },
  {
    q: "I worked for multiple employers. Is that a problem?",
    a: "Not for you. We consolidate income from all employers, match it against what was withheld, and ensure your return is lodged with the correct figures. It is actually more important to get this right when you had multiple jobs.",
  },
]

const SERVICES = [
  { href: '/tfn', n: '01', title: 'TFN Application', pain: 'No TFN = 47% tax on every payslip', gain: 'Correct rate from day one — no overpaying from the start' },
  { href: '/tax-return', n: '02', title: 'Tax Return', pain: 'Most WHV holders are on the wrong rate all year', gain: 'We calculate the correct amount and lodge with the ATO' },
  { href: '/superannuation', n: '03', title: 'Super Withdrawal', pain: 'Super sits untouched after most travellers leave', gain: 'We submit your DASP claim — you get paid to your bank' },
  { href: '/abn', n: '04', title: 'ABN Registration', pain: 'Wrong registration causes rejections and tax problems', gain: 'Correct setup matched to your actual work situation' },
]

/* ─── FAQ accordion (client-side) ──────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid #C8EAE0' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 text-left"
        style={{ padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer' }}
        aria-expanded={open}
      >
        <span className="font-semibold text-ink" style={{ fontSize: '14.5px', lineHeight: 1.4 }}>{q}</span>
        <span aria-hidden="true" className="flex-shrink-0"
          style={{
            width: '24px', height: '24px', borderRadius: '50%', border: '1.5px solid #C8EAE0',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px',
            background: open ? '#0B5240' : 'transparent', transition: 'all 0.2s',
            transform: open ? 'rotate(45deg)' : 'none',
          }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 2v6M2 5h6" stroke={open ? '#fff' : '#0B5240'} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      {open && (
        <p className="font-light text-muted" style={{ fontSize: '14px', lineHeight: 1.75, paddingBottom: '18px' }}>{a}</p>
      )}
    </div>
  )
}

/* ─── Inline refund calculator ──────────────────────────────────── */
function RefundCalculator() {
  const [income,   setIncome]   = useState('')
  const [withheld, setWithheld] = useState('')
  const [result,   setResult]   = useState<{ amount: number; owing: boolean } | null>(null)
  const [err,      setErr]      = useState('')

  const run = () => {
    const i = parseFloat(income.replace(/,/g, '')) || 0
    const w = parseFloat(withheld.replace(/,/g, '')) || 0
    if (!i || !w) { setErr('Please enter both fields.'); return }
    if (w > i)    { setErr('Tax withheld cannot be more than total income.'); return }
    if (i > 500000) { setErr('Please enter a realistic income amount.'); return }
    setErr('')
    setResult(calcRefund(i, w))
  }

  const fmt = (n: number) => '$' + n.toLocaleString('en-AU')

  return (
    <div className="rounded-2xl bg-white" style={{ padding: '28px 28px 24px', border: '1px solid #C8EAE0', boxShadow: '0 4px 32px rgba(11,82,64,0.09)' }}>
      <div style={{ marginBottom: '20px' }}>
        <p className="font-serif font-black text-ink" style={{ fontSize: '18px', letterSpacing: '-0.02em', marginBottom: '4px' }}>
          Estimate your tax refund
        </p>
        <p className="font-light text-muted" style={{ fontSize: '13px' }}>
          Based on the 15% WHM rate — Australia&apos;s correct rate for Working Holiday visas.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
        <div>
          <label htmlFor="calc-income" style={{ fontSize: '12.5px', fontWeight: 500, color: '#587066', display: 'block', marginBottom: '6px' }}>
            Total income earned in Australia (AUD)
          </label>
          <input
            id="calc-income"
            type="number"
            inputMode="numeric"
            value={income}
            onChange={e => { setIncome(e.target.value); setResult(null); setErr('') }}
            placeholder="e.g. 28000"
            className="input-base"
            style={{ fontSize: '15px' }}
          />
        </div>
        <div>
          <label htmlFor="calc-withheld" style={{ fontSize: '12.5px', fontWeight: 500, color: '#587066', display: 'block', marginBottom: '6px' }}>
            Total tax withheld by your employer(s) (AUD)
          </label>
          <input
            id="calc-withheld"
            type="number"
            inputMode="numeric"
            value={withheld}
            onChange={e => { setWithheld(e.target.value); setResult(null); setErr('') }}
            placeholder="e.g. 7500"
            className="input-base"
            style={{ fontSize: '15px' }}
          />
        </div>
      </div>

      {err && (
        <p style={{ fontSize: '12.5px', color: '#DC2626', marginBottom: '12px' }}>{err}</p>
      )}

      <button onClick={run} className="btn-primary w-full justify-center" style={{ height: '50px', fontSize: '15px', marginBottom: '16px' }}>
        Calculate my refund →
      </button>

      {result && (
        <div className="rounded-xl text-center" style={{
          padding: '16px',
          background: result.owing ? '#FEF2F2' : '#EAF6F1',
          border: `1.5px solid ${result.owing ? '#FECACA' : '#C8EAE0'}`,
        }}>
          <p style={{ fontSize: '12px', fontWeight: 500, color: result.owing ? '#991B1B' : '#0B5240', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {result.owing ? 'Estimated tax owing' : 'Estimated refund'}
          </p>
          <p className="font-serif font-black" style={{ fontSize: '32px', letterSpacing: '-0.04em', color: result.owing ? '#DC2626' : '#0B5240', lineHeight: 1 }}>
            {fmt(result.amount)}
          </p>
          {!result.owing && (
            <p style={{ fontSize: '12px', color: '#587066', marginTop: '6px' }}>
              This estimate is based on the 15% WHM rate. Actual outcome confirmed after we review your documents.
            </p>
          )}
          {!result.owing && result.amount > 0 && (
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
              style={{ height: '44px', fontSize: '13.5px', marginTop: '14px' }}>
              Claim this refund →
            </a>
          )}
        </div>
      )}

      <p style={{ fontSize: '11.5px', color: '#8AADA3', textAlign: 'center', marginTop: '12px' }}>
        Estimate only · No data stored · Based on current ATO WHM rates
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO
          Problem-first headline → concrete outcome → emotional trigger
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(11,82,64,0.07) 0%, transparent 65%)',
        }} />

        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-14 pb-16 md:pt-20 md:pb-24 text-center" style={{ position: 'relative', zIndex: 1 }}>

          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full" style={{ background: '#FDF0D5', border: '1px solid #F0D99A' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#92600A', letterSpacing: '0.06em' }}>
              ⚠ Without a TFN, employers withhold 47% tax from your pay
            </span>
          </div>

          {/* Headline — outcome + loss aversion */}
          <h1 className="font-serif font-black text-ink mx-auto" style={{
            fontSize: 'clamp(28px, 5.5vw, 58px)',
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
            marginBottom: '18px',
            maxWidth: '15ch',
          }}>
            Stop overpaying tax in Australia.{' '}
            <span style={{ color: '#0B5240' }}>We fix it for you.</span>
          </h1>

          {/* Subheadline — specific, outcome-driven */}
          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.65, color: 'rgba(10,15,13,0.62)', maxWidth: '46ch', margin: '0 auto 10px', fontWeight: 300 }}>
            Most working holiday travellers in Australia are on the wrong tax rate, miss their super, or leave without lodging a return.
            We handle TFN, tax return, and super — correctly, from anywhere in the world.
          </p>

          {/* Social proof inline */}
          <p style={{ fontSize: '13.5px', color: '#0B5240', fontWeight: 600, marginBottom: '30px' }}>
            1,200+ WHV travellers helped · 4.9★ rating · Supervised by a registered tax agent
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center" style={{ marginBottom: '24px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto justify-center"
              style={{ height: '56px', padding: '0 40px', fontSize: '16px', maxWidth: '320px' }}>
              Check my tax situation (free) →
            </a>
            <a href="#calculator" className="btn-ghost-dark w-full sm:w-auto justify-center"
              style={{ height: '56px', padding: '0 28px', fontSize: '15px', maxWidth: '240px' }}>
              Estimate my refund ↓
            </a>
          </div>

          {/* Micro trust */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {['Free to check — no commitment', 'Works from anywhere in the world', 'Response within 24 hours'].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-1.5" style={{ fontSize: '12.5px', color: 'rgba(10,15,13,0.48)' }}>
                <Tick />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: PROBLEM AGITATION — The cost of doing nothing
      ───────────────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-10 md:py-12">
          <p className="text-center font-semibold uppercase" style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.45)', marginBottom: '24px' }}>
            The real cost of getting it wrong
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
            {[
              { stat: '47%', label: 'Tax rate without a TFN', detail: 'Your employer must withhold this rate until you have a Tax File Number on file — even if your correct rate is 15%.' },
              { stat: '15%', label: 'Correct WHM tax rate', detail: 'Working Holiday Makers on a 417 or 462 visa are taxed at 15% on the first $45,000. Most never check if this was applied correctly.' },
              { stat: '12%', label: 'Of every wage paid as super', detail: 'Your employer pays this on top of your wages into a super fund. Most WHV holders leave Australia without ever claiming it.' },
            ].map((item, i) => (
              <div key={i}>
                <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(36px, 5.5vw, 52px)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '6px' }}>{item.stat}</p>
                <p className="font-semibold text-white" style={{ fontSize: '13px', marginBottom: '6px' }}>{item.label}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: '22ch', margin: '0 auto' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: REFUND CALCULATOR — High-intent hook
          Embedded inline so users get value without leaving the page
      ───────────────────────────────────────────────────────────── */}
      <section id="calculator" style={{ background: '#F4F9F6', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <div>
              <span className="section-label" style={{ marginBottom: '14px', display: 'inline-flex' }}>Free tax refund calculator</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 3.2vw, 38px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '16px' }}>
                Find out in 30 seconds if you&apos;re owed a refund.
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '15px', lineHeight: 1.7, marginBottom: '20px', maxWidth: '40ch' }}>
                Enter your Australian income and the tax your employer(s) withheld. The calculator applies the correct Working Holiday Maker rate (15%) and shows your estimated position.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'Based on current ATO WHM rates',
                  'No sign-up, no personal data stored',
                  'If you see a refund, we can help you claim it',
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Tick />
                    <p style={{ fontSize: '13.5px', color: '#587066' }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>

            <RefundCalculator />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: DIFFERENTIATION — Why us, specifically
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '44px' }}>
            <span className="section-label center">Why working holiday travellers choose us</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 38px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginTop: '12px', marginBottom: '12px' }}>
              We only work with WHV holders.<br />
              <span style={{ color: '#0B5240' }}>Not general tax. Not businesses. Just you.</span>
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '15px', lineHeight: 1.65, maxWidth: '50ch' }}>
              Most tax services treat a working holiday maker like any other client. We built this specifically for people on a 417 or 462 visa — because the rules, rates, and process are completely different.
            </p>
          </div>

          {/* 4 differentiator cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ marginBottom: '48px' }}>
            {[
              {
                icon: <People />,
                title: 'WHV specialists, not generalists',
                body: 'We know the 15% WHM rate, the DASP process, the TFN application, and exactly what the ATO requires for your visa type. This is the only type of tax we do — every single day.',
              },
              {
                icon: <Shield />,
                title: 'Supervised by a registered tax agent',
                body: 'Every file is prepared under the supervision of a Tax Practitioners Board registered agent (TPB number verifiable online). Your lodgement is legally compliant — not guessed at.',
              },
              {
                icon: <Globe />,
                title: 'Fully remote — works from any country',
                body: "Already left Australia? Travelling? Doesn't matter. Our entire service runs on WhatsApp. We've handled clients from 40+ countries. You never need to visit an office or log in to myGov.",
              },
              {
                icon: <Clock />,
                title: 'One conversation, everything handled',
                body: "No forms to fill in, no portals to navigate, no queues. Message us, send your details, and we take care of the rest. We tell you exactly what we need — nothing more.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 rounded-2xl"
                style={{ padding: '24px', background: '#F7FCF9', border: '1px solid #C8EAE0' }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-forest-500"
                  style={{ background: '#EAF6F1', marginTop: '1px' }}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-ink" style={{ fontSize: '14.5px', marginBottom: '6px' }}>{item.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.65 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* DIY vs Us */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="rounded-2xl" style={{ padding: '24px', background: '#fff', border: '1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Figuring it out yourself</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'ATO portal requires myGov + identity verification',
                  'Easy to select the wrong visa or residency type',
                  'No guidance on what deductions you can claim',
                  'Super left unclaimed — DASP process is confusing',
                  'No one to ask if something looks wrong',
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Cross />
                    <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.6 }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl" style={{ padding: '24px', background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Using our service</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' }}>
                {[
                  'Start with one WhatsApp message — no accounts needed',
                  'We confirm your visa type and apply the correct rate',
                  'We identify every deduction that applies to your situation',
                  'We submit your DASP super claim with the correct forms',
                  'Real person available throughout — ask us anything',
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Tick />
                    <p className="font-semibold text-ink" style={{ fontSize: '13px', lineHeight: 1.6 }}>{t}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
                style={{ height: '48px', fontSize: '14px' }}>
                Start for free on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: SOCIAL PROOF — Specific, outcome-driven stories
      ───────────────────────────────────────────────────────────── */}
      <section style={{ background: '#F4F9F6', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <span className="section-label center">Real travellers, real situations</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 38px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginTop: '12px' }}>
              People who were in exactly your situation.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: '48px', alignItems: 'stretch' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.06)', height: '100%' }}>
                <div className="flex gap-0.5" style={{ marginBottom: '14px' }}>
                  {Array.from({ length: 5 }).map((_, si) => <Star key={si} />)}
                </div>
                <p className="font-light text-body flex-1" style={{ fontSize: '14px', lineHeight: 1.78, marginBottom: '18px' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3" style={{ paddingTop: '14px', borderTop: '1px solid #E2EFE9' }}>
                  <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                    style={{ width: '36px', height: '36px', fontSize: '12px', background: t.bg, color: t.fg }}>{t.initials}</div>
                  <div>
                    <p className="font-semibold text-ink" style={{ fontSize: '13px' }}>{t.name}</p>
                    <p className="text-subtle" style={{ fontSize: '11.5px', marginTop: '1px' }}>{t.country} · {t.visa}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto" style={{ paddingTop: '32px', borderTop: '1px solid #E2EFE9' }}>
            {[
              { n: '4.9★', l: 'Average Google rating' },
              { n: '1,200+', l: 'WHV travellers helped' },
              { n: '40+', l: 'Countries served' },
              { n: '< 24h', l: 'Average response time' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-serif font-black text-forest-500" style={{ fontSize: 'clamp(20px, 3vw, 28px)', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.n}</p>
                <p className="text-subtle" style={{ fontSize: '12px', marginTop: '5px' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: SERVICES — Problem + solution per card
      ───────────────────────────────────────────────────────────── */}
      <section style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <span className="section-label center">What we handle for you</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 38px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginTop: '12px', marginBottom: '10px' }}>
              The four things most WHV holders need sorted.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ alignItems: 'stretch' }}>
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href}
                className="group bg-white rounded-2xl flex flex-col transition-all hover:shadow-lg"
                style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)', height: '100%' }}>
                <span className="font-medium text-subtle uppercase" style={{ fontSize: '10px', letterSpacing: '0.1em', marginBottom: '12px' }}>{s.n}</span>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '12px' }}>{s.title}</h3>
                <div className="flex items-start gap-2" style={{ marginBottom: '8px' }}>
                  <Cross />
                  <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.6 }}>{s.pain}</p>
                </div>
                <div className="flex items-start gap-2 flex-1">
                  <Tick />
                  <p className="font-light text-body" style={{ fontSize: '12.5px', lineHeight: 1.6 }}>{s.gain}</p>
                </div>
                <span className="flex items-center gap-1.5 font-medium text-forest-600 transition-all group-hover:gap-3 mt-4" style={{ fontSize: '12.5px' }}>
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: HOW IT WORKS — Demystify, remove friction
      ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label center">How it works</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 38px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginTop: '12px', marginBottom: '12px' }}>
              One WhatsApp message to start.
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '15px', lineHeight: 1.65, maxWidth: '42ch' }}>
              No accounts, no portals, no paperwork on your end. Send us a message and we handle the rest.
            </p>
          </div>

          {/* Desktop steps */}
          <div className="hidden lg:block" style={{ marginBottom: '48px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px"
                style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)' }} aria-hidden="true" />
              {[
                { n: '1', title: 'Message us on WhatsApp', body: 'Tell us what you need — TFN, tax return, super, ABN. Takes 2 minutes.' },
                { n: '2', title: 'We review your situation', body: 'We confirm your visa type, income details, and what applies to you.' },
                { n: '3', title: 'We prepare everything', body: 'Your return, claim, or application — done correctly under professional oversight.' },
                { n: '4', title: 'Done. You get the outcome', body: 'TFN confirmed, return lodged, super claimed. We stay available if needed.' },
              ].map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ background: '#0B5240', fontSize: '13px', marginBottom: '16px', boxShadow: '0 0 0 4px #fff, 0 0 0 5px #C8EAE0' }}>{s.n}</div>
                  <p className="font-semibold text-ink text-center" style={{ fontSize: '13.5px', marginBottom: '6px' }}>{s.title}</p>
                  <p className="font-light text-muted text-center" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile steps */}
          <div className="lg:hidden flex flex-col" style={{ marginBottom: '36px' }}>
            {[
              { n: '1', title: 'Message us on WhatsApp', body: 'Tell us what you need. Takes 2 minutes.' },
              { n: '2', title: 'We review your situation', body: 'We confirm your visa, income, and what applies.' },
              { n: '3', title: 'We prepare everything', body: 'Done correctly under professional oversight.' },
              { n: '4', title: 'Done. You get the outcome', body: 'We stay available until everything is complete.' },
            ].map((s, i, arr) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < arr.length - 1 ? '20px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ background: '#0B5240', fontSize: '12px' }}>{s.n}</div>
                  {i < arr.length - 1 && <div className="flex-1 w-px mt-2" style={{ minHeight: '20px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                </div>
                <div style={{ paddingTop: '3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '4px' }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex w-full sm:w-auto justify-center"
              style={{ height: '56px', padding: '0 44px', fontSize: '16px', maxWidth: '340px', margin: '0 auto' }}>
              Start for free on WhatsApp →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12.5px', color: '#8AADA3' }}>
              Free first conversation · No commitment to proceed
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: FAQ — Remove final objections
      ───────────────────────────────────────────────────────────── */}
      <section style={{ background: '#F4F9F6', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.9fr] gap-10 lg:gap-16 items-start">
            <div>
              <span className="section-label">Your questions, answered</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '12px', marginBottom: '14px' }}>
                The questions we hear from every traveller.
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                If something isn&apos;t covered here, message us directly — we usually reply within a few hours.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex w-full sm:w-auto justify-center"
                style={{ height: '48px', padding: '0 24px', fontSize: '14.5px' }}>
                Ask us on WhatsApp →
              </a>
            </div>

            <div style={{ alignSelf: 'start' }}>
              {FAQS.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
              <div style={{ borderTop: '1px solid #C8EAE0' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: FINAL CTA — Strong close with urgency
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#0B5240', padding: '80px 0' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 55% 90% at 95% 50%, rgba(233,160,32,0.14) 0%, transparent 55%)',
        }} />
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center" style={{ position: 'relative', zIndex: 1 }}>

          <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full" style={{ background: 'rgba(233,160,32,0.15)', border: '1px solid rgba(233,160,32,0.3)' }}>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
              The tax year runs April–June. Don&apos;t miss the window.
            </span>
          </div>

          <h2 className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(26px, 4.5vw, 50px)', lineHeight: 1.05, letterSpacing: '-0.035em', marginBottom: '18px', maxWidth: '20ch' }}>
            Every month you wait is money sitting in the wrong hands.
          </h2>

          <p style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'rgba(255,255,255,0.68)', maxWidth: '46ch', margin: '0 auto 32px', lineHeight: 1.7, fontWeight: 300 }}>
            Whether you need a TFN before your first shift, a tax return after your last, or super claimed after you&apos;ve already left — the process starts with one message.
          </p>

          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex w-full sm:w-auto justify-center"
            style={{ height: '58px', padding: '0 50px', fontSize: '17px', maxWidth: '380px', margin: '0 auto 20px' }}>
            Check my tax situation (free) →
          </a>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              'Free to start — no commitment',
              'Supervised by a registered tax agent',
              '1,200+ WHV travellers helped',
            ].map((t, i) => (
              <span key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.48)' }}>✓ {t}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
