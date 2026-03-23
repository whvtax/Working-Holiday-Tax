'use client'
import Link from 'next/link'
import { useState } from 'react'
import { WA_URL } from '@/lib/constants'

/* ─── Icons (inline, zero deps) ─────────────────────────────────── */
const Star  = () => <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>
const Check = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>

/* ─── Inline refund calculator ───────────────────────────────────── */
function calcWHM(inc: number, wit: number) {
  const tax = inc <= 45000 ? inc * 0.15 : 6750 + (inc - 45000) * 0.3
  const diff = wit - tax
  return { amount: Math.round(Math.abs(diff)), owing: diff < 0 }
}

function Calculator() {
  const [inc, setInc] = useState('')
  const [wit, setWit] = useState('')
  const [res, setRes] = useState<{ amount: number; owing: boolean } | null>(null)
  const [err, setErr] = useState('')

  const run = () => {
    const i = parseFloat(inc) || 0
    const w = parseFloat(wit) || 0
    if (!i || !w) { setErr('Enter both fields.'); return }
    if (w > i)    { setErr('Tax withheld cannot exceed income.'); return }
    setErr(''); setRes(calcWHM(i, w))
  }

  const fmt = (n: number) => '$' + n.toLocaleString('en-AU')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div>
        <label htmlFor="calc-i" style={{ display: 'block', fontSize: '12.5px', fontWeight: 500, color: '#587066', marginBottom: '6px' }}>
          Total income earned in Australia (AUD)
        </label>
        <input id="calc-i" type="number" inputMode="numeric" value={inc}
          onChange={e => { setInc(e.target.value); setRes(null); setErr('') }}
          placeholder="e.g. 28000" className="input-base" />
      </div>

      <div>
        <label htmlFor="calc-w" style={{ display: 'block', fontSize: '12.5px', fontWeight: 500, color: '#587066', marginBottom: '4px' }}>
          Total tax withheld by employer(s) (AUD)
        </label>
        <p style={{ fontSize: '11.5px', color: '#8AADA3', marginBottom: '6px' }}>From your payslips or payment summaries</p>
        <input id="calc-w" type="number" inputMode="numeric" value={wit}
          onChange={e => { setWit(e.target.value); setRes(null); setErr('') }}
          placeholder="e.g. 7500" className="input-base" />
      </div>

      {err && <p style={{ fontSize: '13px', color: '#DC2626' }}>{err}</p>}

      <button onClick={run} className="btn-primary w-full justify-center" style={{ height: '52px', fontSize: '15.5px' }}>
        See how much I can get back →
      </button>

      {res && !res.owing && res.amount > 0 && (
        <div className="rounded-2xl text-center" style={{ padding: '22px', background: 'linear-gradient(135deg, #0B5240, #16775C)', marginTop: '4px' }}>
          <p style={{ fontSize: '11.5px', fontWeight: 600, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
            Your estimated refund
          </p>
          <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(40px, 9vw, 56px)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '8px' }}>
            {fmt(res.amount)}
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginBottom: '16px' }}>
            Based on the 15% WHM rate · Confirmed after document review
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="w-full justify-center font-semibold inline-flex items-center"
            style={{ height: '48px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14.5px' }}>
            Claim this refund →
          </a>
        </div>
      )}

      {res && res.owing && (
        <div className="rounded-2xl text-center" style={{ padding: '20px', background: '#FEF2F2', border: '1.5px solid #FECACA' }}>
          <p className="font-serif font-black" style={{ fontSize: '32px', color: '#DC2626', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '8px' }}>
            {fmt(res.amount)} owing
          </p>
          <p style={{ fontSize: '13px', color: '#991B1B', marginBottom: '14px', lineHeight: 1.6 }}>
            You may owe additional tax — often because of the wrong rate applied during the year. We can review and correct it.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary w-full justify-center" style={{ height: '44px', fontSize: '13.5px' }}>
            Get my situation reviewed (free) →
          </a>
        </div>
      )}

      {res && !res.owing && res.amount === 0 && (
        <div className="rounded-2xl text-center" style={{ padding: '20px', background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
          <p className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '6px' }}>Tax looks balanced.</p>
          <p style={{ fontSize: '13px', color: '#587066', lineHeight: 1.6, marginBottom: '14px' }}>
            But your super (12% of wages) is likely still unclaimed. That&apos;s separate from tax.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary w-full justify-center" style={{ height: '44px', fontSize: '13.5px' }}>
            Check my super balance →
          </a>
        </div>
      )}

      {!res && (
        <p style={{ fontSize: '11.5px', color: '#8AADA3', textAlign: 'center' }}>
          Free · No account · No data stored · Based on current ATO rates
        </p>
      )}
    </div>
  )
}

/* ─── FAQ accordion ──────────────────────────────────────────────── */
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid #C8EAE0' }}>
      <button onClick={() => setOpen(o => !o)} aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 text-left"
        style={{ padding: '17px 0', background: 'none', border: 'none', cursor: 'pointer' }}>
        <span className="font-semibold text-ink" style={{ fontSize: '14px', lineHeight: 1.4 }}>{q}</span>
        <span aria-hidden="true" style={{
          width: '24px', height: '24px', borderRadius: '50%', border: '1.5px solid #C8EAE0',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px',
          background: open ? '#0B5240' : 'transparent', transform: open ? 'rotate(45deg)' : 'none', transition: 'all .2s',
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 2v6M2 5h6" stroke={open ? '#fff' : '#0B5240'} strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      {open && <p className="font-light text-muted" style={{ fontSize: '14px', lineHeight: 1.75, paddingBottom: '17px' }}>{a}</p>}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAGE  —  10 sections, one purpose each
═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      {/* ▓▓ 1. HERO ─────────────────────────────────────────────
          Purpose: Loss aversion + curiosity → scroll to calculator
      ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(11,82,64,0.07) 0%, transparent 70%)',
        }} />

        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-12 pb-14 md:pt-16 md:pb-20" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">

            {/* Left */}
            <div>
              {/* Loss hook */}
              <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full"
                style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <circle cx="6.5" cy="6.5" r="6" stroke="#DC2626" strokeWidth="1.3"/>
                  <path d="M6.5 3.5v3.5M6.5 9.5v.3" stroke="#DC2626" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#991B1B' }}>
                  No TFN? You&apos;re losing 32% of every payslip
                </span>
              </div>

              {/* Headline — specific outcome + curiosity */}
              <h1 className="font-serif font-black text-ink" style={{
                fontSize: 'clamp(29px, 4.8vw, 52px)',
                lineHeight: 1.04, letterSpacing: '-0.035em', marginBottom: '16px',
              }}>
                Most working holiday travellers overpay tax.{' '}
                <span style={{ color: '#0B5240' }}>Check if you&apos;re one of them.</span>
              </h1>

              {/* Single supporting line — no fluff */}
              <p style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', lineHeight: 1.68, color: 'rgba(10,15,13,0.58)', maxWidth: '42ch', marginBottom: '22px', fontWeight: 300 }}>
                Wrong tax rate, unclaimed super, missed return. The calculator shows your estimated refund in 30 seconds.
              </p>

              {/* Urgency note */}
              <div className="flex items-start gap-2.5" style={{ marginBottom: '26px', padding: '12px 14px', background: '#FFFCF5', border: '1px solid #F0D99A', borderRadius: '10px' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '1px' }}>
                  <circle cx="7" cy="7" r="6.2" stroke="#C47E10" strokeWidth="1.3"/>
                  <path d="M7 4v4M7 10v.3" stroke="#C47E10" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <p style={{ fontSize: '13px', color: '#92600A', lineHeight: 1.55 }}>
                  <strong>Tax year ends 30 June.</strong> Super has no deadline — but funds get harder to trace over time.
                </p>
              </div>

              {/* 3 trust facts — tight, specific */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', paddingTop: '20px', borderTop: '1px solid #E2EFE9' }}>
                {[
                  'Supervised by a registered tax agent (TPB #26233096)',
                  '1,200+ WHV travellers helped from 40+ countries',
                  'Tax returns prepared within 1–2 business days',
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check />
                    <p style={{ fontSize: '13px', color: '#587066', lineHeight: 1.5 }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Calculator as primary CTA */}
            <div className="rounded-2xl bg-white" style={{ padding: '26px', border: '1.5px solid #C8EAE0', boxShadow: '0 8px 40px rgba(11,82,64,0.11)' }}>
              <p className="font-serif font-black text-ink" style={{ fontSize: '19px', letterSpacing: '-0.025em', marginBottom: '4px' }}>
                How much tax can you get back?
              </p>
              <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.5, marginBottom: '20px' }}>
                Enter your Australian income and tax withheld. Takes 30 seconds.
              </p>
              <Calculator />
            </div>
          </div>
        </div>
      </section>

      {/* ▓▓ 2. PROOF BAR ────────────────────────────────────────
          Purpose: Instant social proof — scannable numbers only
      ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { n: '4.9★', l: 'Rating' },
              { n: '1,200+', l: 'Travellers helped' },
              { n: '40+', l: 'Countries' },
              { n: '< 24h', l: 'Response' },
              { n: '100%', l: 'Online' },
            ].map((s, i) => (
              <div key={i} className="text-center" style={{ minWidth: '72px' }}>
                <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(16px, 2.5vw, 21px)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.48)', marginTop: '3px' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ▓▓ 3. PROBLEM ──────────────────────────────────────────
          Purpose: Make the pain specific and personal — 3 mistakes
      ──────────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '72px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 36px)', lineHeight: 1.06, letterSpacing: '-0.03em', maxWidth: '24ch' }}>
              3 mistakes that cost most WHV travellers money.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                n: '01',
                title: 'Working without a TFN',
                stat: '47%',
                statLabel: 'tax rate without one',
                fix: 'Correct rate is 15%. Every dollar over-withheld can come back in your tax return.',
                bg: '#FEF2F2', border: '#FECACA', statColor: '#DC2626',
              },
              {
                n: '02',
                title: 'Not lodging a tax return',
                stat: '~$2k',
                statLabel: 'average overpayment',
                fix: 'If your employer withheld more than 15% of your income, a return gets you the difference.',
                bg: '#FFFCF5', border: '#F0D99A', statColor: '#C47E10',
              },
              {
                n: '03',
                title: 'Leaving super unclaimed',
                stat: '12%',
                statLabel: 'of wages paid in',
                fix: 'Employer super contributions sit in a fund until you claim. Most travellers never do.',
                bg: '#EAF6F1', border: '#C8EAE0', statColor: '#0B5240',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl" style={{ padding: '22px', background: item.bg, border: `1.5px solid ${item.border}` }}>
                <span className="font-medium text-subtle uppercase" style={{ fontSize: '10px', letterSpacing: '0.12em', display: 'block', marginBottom: '10px' }}>{item.n}</span>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '12px', lineHeight: 1.3 }}>{item.title}</h3>
                <div style={{ marginBottom: '12px' }}>
                  <span className="font-serif font-black" style={{ fontSize: '32px', color: item.statColor, letterSpacing: '-0.04em', lineHeight: 1 }}>{item.stat}</span>
                  <span style={{ fontSize: '12px', color: item.statColor, marginLeft: '6px', fontWeight: 500 }}>{item.statLabel}</span>
                </div>
                <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.65 }}>{item.fix}</p>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '32px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex w-full sm:w-auto justify-center"
              style={{ height: '50px', padding: '0 36px', fontSize: '15px', maxWidth: '300px', margin: '0 auto' }}>
              Check my refund for free →
            </a>
          </div>
        </div>
      </section>

      {/* ▓▓ 4. WHY CHOOSE US ────────────────────────────────────
          Purpose: Defend the choice — specific, not generic
      ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#F4F9F6', padding: '72px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-start">

            <div>
              <span className="section-label" style={{ marginBottom: '12px', display: 'inline-flex' }}>Why us</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px, 3vw, 34px)', lineHeight: 1.07, letterSpacing: '-0.03em', marginBottom: '16px' }}>
                We only work with WHV holders. Not general tax.
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '14.5px', lineHeight: 1.7, marginBottom: '24px', maxWidth: '38ch' }}>
                Most tax services treat a working holiday traveller like any other client. We built this specifically for the 417 and 462 visa — with the rates, processes, and ATO requirements that actually apply to you.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex w-full sm:w-auto justify-center"
                style={{ height: '48px', padding: '0 28px', fontSize: '14.5px' }}>
                Check my tax situation (free) →
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { title: 'Registered tax agent oversight', body: 'Every lodgement is prepared under the supervision of a TPB-registered tax agent. Number 26233096 — verifiable on tpb.gov.au.' },
                { title: 'Fully remote — works from anywhere', body: 'Already left Australia? In another country? Everything runs on WhatsApp. No myGov, no ATO portal, no Australian address required.' },
                { title: 'WHV specialists, not generalists', body: 'We handle the 15% WHM rate, DASP super claims, TFN applications, and ABN registration. This is the only tax we do, every day.' },
                { title: 'Fast — returns ready in 1–2 days', body: 'Once we have your documents, your return is typically prepared within 1–2 business days. Super claims depend on ATO processing.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl"
                  style={{ padding: '16px 18px', background: '#fff', border: '1px solid #C8EAE0' }}>
                  <Check />
                  <div>
                    <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '3px' }}>{item.title}</p>
                    <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.6 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ▓▓ 5. SOCIAL PROOF ─────────────────────────────────────
          Purpose: Real people, specific outcomes — scannable
      ──────────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '72px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <h2 className="font-serif font-black text-ink text-center mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 34px)', lineHeight: 1.07, letterSpacing: '-0.03em', marginBottom: '36px', maxWidth: '26ch' }}>
            Travellers who were in your exact situation.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ alignItems: 'stretch' }}>
            {[
              {
                tag: '4 jobs · tax return + super',
                quote: "I had 4 jobs across 8 months and had no idea my tax was wrong. They sorted my return and super claim in under a week.",
                name: "Liam O.", country: "Ireland · WHV 417",
                initials: "L", bg: "#DBEAFE", fg: "#1E40AF",
              },
              {
                tag: 'super claim from Germany',
                quote: "Already back in Germany when I realised I never claimed super. Messaged on WhatsApp, sent my details, it was handled. Never logged in to anything Australian.",
                name: "Max F.", country: "Germany · WHV 417",
                initials: "M", bg: "#D1FAE5", fg: "#065F46",
              },
              {
                tag: 'wrong rate corrected',
                quote: "First employer withheld 47% because I had no TFN. These guys corrected it in my return. I had no idea that was even possible.",
                name: "Emma T.", country: "United Kingdom · WHV 417",
                initials: "E", bg: "#FCE7F3", fg: "#9D174D",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding: '22px', border: '1px solid #E2EFE9', boxShadow: '0 2px 12px rgba(11,82,64,.06)', height: '100%' }}>
                <div className="inline-flex items-center px-2.5 py-1 rounded-full" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0', marginBottom: '12px', width: 'fit-content' }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#0B5240' }}>{t.tag}</p>
                </div>
                <div className="flex gap-0.5" style={{ marginBottom: '10px' }}>
                  {Array.from({ length: 5 }).map((_, si) => <Star key={si} />)}
                </div>
                <p className="font-light text-body flex-1" style={{ fontSize: '13.5px', lineHeight: 1.75, marginBottom: '16px' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2.5" style={{ paddingTop: '12px', borderTop: '1px solid #E2EFE9' }}>
                  <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                    style={{ width: '34px', height: '34px', fontSize: '12px', background: t.bg, color: t.fg }}>{t.initials}</div>
                  <div>
                    <p className="font-semibold text-ink" style={{ fontSize: '12.5px' }}>{t.name}</p>
                    <p className="text-subtle" style={{ fontSize: '11.5px', marginTop: '1px' }}>{t.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ▓▓ 6. HOW IT WORKS ─────────────────────────────────────
          Purpose: Remove friction — show it's simple
      ──────────────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ background: '#EEF7F2', padding: '72px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '44px' }}>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 34px)', lineHeight: 1.07, letterSpacing: '-0.03em' }}>
              One message. Everything handled.
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '14.5px', lineHeight: 1.65, maxWidth: '36ch', marginTop: '10px' }}>
              No accounts. No ATO portal. No paperwork on your end.
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex items-start relative" style={{ marginBottom: '44px' }}>
            <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px"
              style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)' }} aria-hidden="true" />
            {[
              { n: '1', t: 'Message us', b: 'WhatsApp · tell us what you need' },
              { n: '2', t: 'Send your details', b: 'Short checklist · payslips + TFN' },
              { n: '3', t: 'We prepare it', b: 'Under registered oversight' },
              { n: '4', t: 'You get the result', b: 'Refund, TFN, or super payment' },
            ].map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center px-4" style={{ zIndex: 1 }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                  style={{ background: '#0B5240', fontSize: '13px', marginBottom: '14px', boxShadow: '0 0 0 4px #EEF7F2, 0 0 0 5px #C8EAE0' }}>{s.n}</div>
                <p className="font-semibold text-ink text-center" style={{ fontSize: '13.5px', marginBottom: '4px' }}>{s.t}</p>
                <p className="font-light text-muted text-center" style={{ fontSize: '12px', lineHeight: 1.55 }}>{s.b}</p>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col" style={{ gap: '0', marginBottom: '36px' }}>
            {[
              { n: '1', t: 'Message us on WhatsApp', b: 'Tell us what you need' },
              { n: '2', t: 'Send your details', b: 'Payslips, TFN, passport' },
              { n: '3', t: 'We prepare it', b: 'Under registered oversight' },
              { n: '4', t: 'You get the result', b: 'Refund, TFN, or super payment' },
            ].map((s, i, arr) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < arr.length - 1 ? '18px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ background: '#0B5240', fontSize: '12px' }}>{s.n}</div>
                  {i < arr.length - 1 && <div className="flex-1 w-px mt-2"
                    style={{ minHeight: '18px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                </div>
                <div style={{ paddingTop: '3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '3px' }}>{s.t}</p>
                  <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.6 }}>{s.b}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex w-full sm:w-auto justify-center"
              style={{ height: '52px', padding: '0 40px', fontSize: '15.5px', maxWidth: '320px', margin: '0 auto' }}>
              Start for free →
            </a>
            <p style={{ marginTop: '9px', fontSize: '12px', color: '#8AADA3' }}>No commitment · Free first conversation</p>
          </div>
        </div>
      </section>

      {/* ▓▓ 7. FAQ ──────────────────────────────────────────────
          Purpose: Remove last objections before they leave
      ──────────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '72px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px, 2.8vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '14px' }}>
                Common questions.
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '22px' }}>
                Not answered here? Message us — first conversation is always free.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex w-full sm:w-auto justify-center"
                style={{ height: '46px', padding: '0 22px', fontSize: '14px' }}>
                Ask us directly →
              </a>
            </div>

            <div style={{ alignSelf: 'start' }}>
              {[
                { q: "How much does it cost?", a: "Fees vary by service. Message us for a clear quote — the first conversation is free, no obligation." },
                { q: "How long does it take?", a: "Tax returns: 1–2 business days after we receive your documents. Super claims: we submit quickly, ATO processing takes a few weeks. TFN: a few days." },
                { q: "Is this legit? Are you registered?", a: "Yes. Every lodgement is prepared under supervision of a TPB-registered tax agent, number 26233096 — verifiable on tpb.gov.au. Real people, not a platform." },
                { q: "What happens after I message you?", a: "We ask a few questions, tell you exactly what we can do and what it costs. If you proceed, we send a short document checklist. No ATO portal, no myGov required." },
                { q: "I already left Australia — is it too late?", a: "No. Tax returns can be lodged from overseas. Super claims (DASP) are actually only available after you leave. Everything is done online via WhatsApp." },
                { q: "I worked for multiple employers — is that complicated?", a: "Not for you. We consolidate income from all employers and lodge a single correct return. More employers = more important to get right." },
              ].map((faq, i) => <FAQ key={i} q={faq.q} a={faq.a} />)}
              <div style={{ borderTop: '1px solid #C8EAE0' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ▓▓ 8. FINAL CTA ────────────────────────────────────────
          Purpose: One strong close — urgency + loss aversion
      ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#0B5240', padding: '80px 0' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 55% 100% at 95% 50%, rgba(233,160,32,0.14) 0%, transparent 55%)',
        }} />
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center" style={{ position: 'relative', zIndex: 1 }}>

          <h2 className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(24px, 4vw, 46px)', lineHeight: 1.05, letterSpacing: '-0.035em', marginBottom: '14px', maxWidth: '20ch' }}>
            You are probably owed money. Check now.
          </h2>

          <p style={{ fontSize: 'clamp(14px, 1.7vw, 16px)', color: 'rgba(255,255,255,0.6)', maxWidth: '42ch', margin: '0 auto 28px', lineHeight: 1.7, fontWeight: 300 }}>
            One WhatsApp message starts everything. No accounts, no portals, no waiting in queues.
          </p>

          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold w-full sm:w-auto transition-all"
            style={{ height: '58px', padding: '0 50px', fontSize: '17px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', maxWidth: '400px', margin: '0 auto 18px', display: 'flex', boxShadow: '0 6px 24px rgba(233,160,32,0.3)' }}>
            Check my refund (free) →
          </a>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {['Free to check', 'No commitment', 'Works from anywhere'].map((t, i) => (
              <span key={i} style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.38)' }}>✓ {t}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
