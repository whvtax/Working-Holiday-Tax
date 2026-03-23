'use client'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { WA_URL } from '@/lib/constants'

/* ─── Icons ─────────────────────────────────────────────────────── */
const Star   = () => <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>
const Tick   = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
const Cross  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7.5" fill="#FEF2F2" stroke="#FECACA" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#DC2626" strokeWidth="1.4" strokeLinecap="round"/></svg>

/* ─── Calculator ─────────────────────────────────────────────────── */
function calcWHM(inc: number, wit: number) {
  const tax = inc <= 45000 ? inc * 0.15 : 6750 + (inc - 45000) * 0.3
  const diff = wit - tax
  return { refund: Math.round(Math.abs(diff)), owing: diff < 0, balanced: diff === 0 }
}

function InlineCalculator() {
  const [income,   setIncome]   = useState('')
  const [withheld, setWithheld] = useState('')
  const [result,   setResult]   = useState<ReturnType<typeof calcWHM> | null>(null)
  const [err,      setErr]      = useState('')
  const resultRef = useRef<HTMLDivElement>(null)

  const run = () => {
    const i = parseFloat(income.replace(/[^0-9.]/g, '')) || 0
    const w = parseFloat(withheld.replace(/[^0-9.]/g, '')) || 0
    if (!i || !w) { setErr('Please fill in both fields to see your estimate.'); return }
    if (w > i) { setErr('Tax withheld cannot be more than your total income.'); return }
    if (i > 500_000) { setErr('Please enter your actual income amount.'); return }
    setErr('')
    setResult(calcWHM(i, w))
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
  }

  const fmt = (n: number) => '$' + n.toLocaleString('en-AU')

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
        <div>
          <label htmlFor="hp-income" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#587066', marginBottom: '7px' }}>
            Total income earned in Australia (AUD)
          </label>
          <input
            id="hp-income"
            type="number"
            inputMode="numeric"
            value={income}
            onChange={e => { setIncome(e.target.value); setResult(null); setErr('') }}
            placeholder="e.g. 28,000"
            className="input-base"
          />
        </div>
        <div>
          <label htmlFor="hp-withheld" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#587066', marginBottom: '7px' }}>
            Total tax withheld by your employer(s) (AUD)
          </label>
          <p style={{ fontSize: '12px', color: '#8AADA3', marginBottom: '7px' }}>
            Find this on your payslips or payment summaries — check your email from each employer.
          </p>
          <input
            id="hp-withheld"
            type="number"
            inputMode="numeric"
            value={withheld}
            onChange={e => { setWithheld(e.target.value); setResult(null); setErr('') }}
            placeholder="e.g. 7,500"
            className="input-base"
          />
        </div>
      </div>

      {err && <p style={{ fontSize: '13px', color: '#DC2626', marginBottom: '12px' }}>{err}</p>}

      <button
        onClick={run}
        className="btn-primary w-full justify-center"
        style={{ height: '54px', fontSize: '16px', marginBottom: '12px' }}
      >
        See how much I can get back →
      </button>

      <p style={{ fontSize: '11.5px', color: '#8AADA3', textAlign: 'center' }}>
        Based on the 15% WHM rate · No account needed · No data stored
      </p>

      {result && (
        <div ref={resultRef} style={{ marginTop: '20px' }}>
          {result.owing ? (
            <div className="rounded-2xl text-center" style={{ padding: '24px', background: '#FEF2F2', border: '1.5px solid #FECACA' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#991B1B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Estimated tax owing
              </p>
              <p className="font-serif font-black" style={{ fontSize: '40px', color: '#DC2626', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '10px' }}>
                {fmt(result.refund)}
              </p>
              <p style={{ fontSize: '13px', color: '#991B1B', marginBottom: '16px', lineHeight: 1.6 }}>
                You may owe additional tax. This is common if you were on the wrong rate during the year.
                We can review your situation and make sure the correct amount is lodged.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary w-full justify-center" style={{ height: '48px', fontSize: '14px' }}>
                Get my situation reviewed (free) →
              </a>
            </div>
          ) : result.balanced ? (
            <div className="rounded-2xl text-center" style={{ padding: '24px', background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
              <p className="font-serif font-black" style={{ fontSize: '32px', color: '#0B5240', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '8px' }}>$0</p>
              <p style={{ fontSize: '13.5px', color: '#587066', marginBottom: '16px', lineHeight: 1.6 }}>
                You appear to be balanced — but do you have unclaimed super? Most WHV holders are owed super on top of their wages.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary w-full justify-center" style={{ height: '48px', fontSize: '14px' }}>
                Check my super balance →
              </a>
            </div>
          ) : (
            <div className="rounded-2xl" style={{ padding: '24px', background: 'linear-gradient(135deg, #0B5240 0%, #16775C 100%)', border: '1px solid #083D30' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px', textAlign: 'center' }}>
                Your estimated refund
              </p>
              <p className="font-serif font-black text-center" style={{ fontSize: 'clamp(44px, 10vw, 60px)', color: '#fff', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '6px' }}>
                {fmt(result.refund)}
              </p>
              <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: '20px' }}>
                Based on the 15% WHM rate. Actual outcome confirmed after we review your documents.
              </p>

              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px' }}>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                  <strong style={{ color: '#fff' }}>Plus:</strong> Your employer also paid{' '}
                  <strong style={{ color: '#E9A020' }}>super on top of your wages</strong> — that&apos;s
                  another 12% you can claim when you leave Australia.
                </p>
              </div>

              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="w-full justify-center font-semibold inline-flex items-center transition-all"
                style={{ height: '52px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '15px', boxShadow: '0 4px 16px rgba(233,160,32,0.35)' }}>
                Claim this refund →
              </a>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', textAlign: 'center', marginTop: '10px' }}>
                Free first conversation · No commitment to proceed
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ─── FAQ item ───────────────────────────────────────────────────── */
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid #C8EAE0' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-4 text-left"
        style={{ padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer' }}
        aria-expanded={open}
      >
        <span className="font-semibold text-ink" style={{ fontSize: '14.5px', lineHeight: 1.4 }}>{q}</span>
        <span aria-hidden="true" style={{
          width: '26px', height: '26px', borderRadius: '50%', border: '1.5px solid #C8EAE0',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px',
          background: open ? '#0B5240' : 'transparent', transition: 'all 0.2s',
          transform: open ? 'rotate(45deg)' : 'none',
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 2v6M2 5h6" stroke={open ? '#fff' : '#0B5240'} strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      {open && <p className="font-light text-muted" style={{ fontSize: '14px', lineHeight: 1.78, paddingBottom: '18px' }}>{a}</p>}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO — Loss aversion first, calculator as primary CTA
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '100%', zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 85% 50% at 50% 0%, rgba(11,82,64,0.065) 0%, transparent 70%)',
        }} />

        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-12 pb-14 md:pt-18 md:pb-20" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-start">

            {/* ── Left: Copy ── */}
            <div>
              {/* Loss aversion badge */}
              <div className="inline-flex items-center gap-2.5 mb-5 px-4 py-2 rounded-full" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 2v5M7 9.5v.5" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round"/>
                  <circle cx="7" cy="7" r="6" stroke="#DC2626" strokeWidth="1.3"/>
                </svg>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#991B1B', letterSpacing: '0.02em' }}>
                  No TFN? You&apos;re losing 32% of every payslip right now
                </span>
              </div>

              {/* Headline — curiosity + loss + outcome */}
              <h1 className="font-serif font-black text-ink" style={{
                fontSize: 'clamp(30px, 5vw, 54px)',
                lineHeight: 1.04,
                letterSpacing: '-0.035em',
                marginBottom: '20px',
              }}>
                Most working holiday travellers in Australia leave money on the table.
                <span style={{ color: '#0B5240' }}> Check if you&apos;re one of them.</span>
              </h1>

              {/* Specific problem + solution */}
              <p style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', lineHeight: 1.7, color: 'rgba(10,15,13,0.62)', maxWidth: '44ch', marginBottom: '14px', fontWeight: 300 }}>
                Wrong tax rate, unclaimed super, missed lodgement — these are not rare mistakes.
                They happen to the majority of WHV holders. The calculator on the right shows
                your estimated refund in 30 seconds.
              </p>

              {/* Urgency sub-message */}
              <div className="flex items-start gap-2.5" style={{ marginBottom: '28px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <circle cx="8" cy="8" r="7" fill="#FDF0D5" stroke="#F0D99A" strokeWidth="0.5"/>
                  <path d="M8 4.5v4M8 10v.5" stroke="#92600A" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <p style={{ fontSize: '13.5px', color: '#92600A', lineHeight: 1.6 }}>
                  <strong>The Australian tax year ends 30 June.</strong> If you worked here this year and haven&apos;t lodged yet, the window is closing. Super claims have no deadline — but the longer you wait, the harder it is to track.
                </p>
              </div>

              {/* Trust strip */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '22px', borderTop: '1px solid #E2EFE9' }}>
                {[
                  { icon: '🇦🇺', text: 'Supervised by a Tax Practitioners Board registered agent (TPB #26233096)' },
                  { icon: '🌍', text: '1,200+ WHV travellers helped from 40+ countries — including from overseas' },
                  { icon: '⚡', text: 'Tax returns typically prepared within 1–2 business days of receiving your details' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
                    <p style={{ fontSize: '13px', color: '#587066', lineHeight: 1.55 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Calculator (primary CTA) ── */}
            <div>
              <div className="rounded-2xl bg-white" style={{ padding: '28px', border: '1.5px solid #C8EAE0', boxShadow: '0 8px 40px rgba(11,82,64,0.12)' }}>
                {/* Calculator header */}
                <div style={{ marginBottom: '20px' }}>
                  <p className="font-serif font-black text-ink" style={{ fontSize: '20px', letterSpacing: '-0.025em', marginBottom: '4px' }}>
                    How much tax can you get back?
                  </p>
                  <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.55 }}>
                    Enter your income and what was withheld. We apply the correct 15% WHM rate and show your refund estimate instantly.
                  </p>
                </div>

                <InlineCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. SOCIAL PROOF BAR — Immediate credibility after hero
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: '#0B5240', padding: '0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { n: '4.9★', l: 'Average rating' },
              { n: '1,200+', l: 'WHV travellers helped' },
              { n: '40+', l: 'Countries served' },
              { n: '< 24h', l: 'First response' },
              { n: '100%', l: 'Online process' },
            ].map((s, i) => (
              <div key={i} className="text-center" style={{ minWidth: '80px' }}>
                <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(17px, 2.5vw, 22px)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '3px' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. PROBLEM AGITATION — Make it personal and specific
      ════════════════════════════════════════════════════════ */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '44px' }}>
            <span className="section-label center">The three money mistakes most WHV holders make</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 38px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginTop: '12px', maxWidth: '24ch' }}>
              You probably made at least one of these. Here&apos;s what it costs.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                label: 'Mistake #1',
                title: 'No TFN (or TFN provided too late)',
                cost: '32% extra tax withheld on every payslip until it was fixed',
                fix: 'A tax return corrects this. Every dollar withheld at the wrong rate comes back.',
                color: '#FEF2F2',
                border: '#FECACA',
                costColor: '#991B1B',
              },
              {
                label: 'Mistake #2',
                title: 'Left without lodging a tax return',
                cost: 'Average Australian wage for a working holiday year is $28,000. At 15%, that is $4,200 tax. Most people overpay that.',
                fix: 'A tax return is how you get the difference back. It can be lodged from overseas.',
                color: '#FFFCF5',
                border: '#F0D99A',
                costColor: '#92600A',
              },
              {
                label: 'Mistake #3',
                title: 'Super sitting unclaimed in a fund',
                cost: '12% of every dollar you earned is sitting in a super fund right now — untouched.',
                fix: 'The DASP process lets you withdraw it after your visa expires. We handle the claim for you.',
                color: '#EAF6F1',
                border: '#C8EAE0',
                costColor: '#0B5240',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl" style={{ padding: '24px', background: item.color, border: `1.5px solid ${item.border}` }}>
                <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: item.costColor, marginBottom: '10px' }}>{item.label}</p>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '12px', lineHeight: 1.35 }}>{item.title}</h3>
                <div style={{ paddingBottom: '12px', marginBottom: '12px', borderBottom: `1px solid ${item.border}` }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: item.costColor, marginBottom: '4px' }}>The cost</p>
                  <p className="font-light text-body" style={{ fontSize: '13.5px', lineHeight: 1.65 }}>{item.cost}</p>
                </div>
                <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0B5240', marginBottom: '4px' }}>The fix</p>
                <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.65 }}>{item.fix}</p>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '36px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex w-full sm:w-auto justify-center"
              style={{ height: '52px', padding: '0 40px', fontSize: '15px', maxWidth: '320px', margin: '0 auto' }}>
              Check how much I can get back (free) →
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. TESTIMONIALS — Specific, outcome-driven, relatable
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: '#F4F9F6', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <span className="section-label center">Travellers who were in your exact situation</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginTop: '12px' }}>
              Real people. Real outcomes.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ alignItems: 'stretch' }}>
            {[
              {
                quote: "I had 4 jobs across 8 months — farm, hostel, café, construction — and had zero idea what tax I was actually paying. They went through every employer, found the overpayments, and sorted both my return and my super claim at the same time. Done in less than a week.",
                name: "Liam O.", country: "Ireland", visa: "WHV 417",
                initials: "L", bg: "#DBEAFE", fg: "#1E40AF",
                tag: "4 employers · tax return + super",
              },
              {
                quote: "I was already home in Germany and realised I never touched my super. I had no idea you could still claim it. Sent them my passport and Australian bank details on WhatsApp. They submitted the DASP and I got a transfer to my account a few weeks later. Never had to log in to anything Australian.",
                name: "Max F.", country: "Germany", visa: "WHV 417",
                initials: "M", bg: "#D1FAE5", fg: "#065F46",
                tag: "super claim from overseas",
              },
              {
                quote: "My first employer didn't have my TFN so they deducted 47% for 3 months. I had no idea that was wrong until I spoke to these guys. My tax return factored in the correct rate and I got back the difference. I wish I knew this existed earlier.",
                name: "Emma T.", country: "United Kingdom", visa: "WHV 417",
                initials: "E", bg: "#FCE7F3", fg: "#9D174D",
                tag: "wrong tax rate corrected",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.04), 0 6px 24px rgba(11,82,64,.07)', height: '100%' }}>

                <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0', marginBottom: '14px', width: 'fit-content' }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#0B5240', letterSpacing: '0.04em' }}>{t.tag}</p>
                </div>

                <div className="flex gap-0.5" style={{ marginBottom: '12px' }}>
                  {Array.from({ length: 5 }).map((_, si) => <Star key={si} />)}
                </div>

                <p className="font-light text-body flex-1" style={{ fontSize: '13.5px', lineHeight: 1.78, marginBottom: '18px' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3" style={{ paddingTop: '14px', borderTop: '1px solid #E2EFE9' }}>
                  <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                    style={{ width: '36px', height: '36px', fontSize: '13px', background: t.bg, color: t.fg }}>{t.initials}</div>
                  <div>
                    <p className="font-semibold text-ink" style={{ fontSize: '13px' }}>{t.name}</p>
                    <p className="text-subtle" style={{ fontSize: '11.5px', marginTop: '1px' }}>{t.country} · {t.visa}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. DIFFERENTIATION — Why us, defensible and specific
      ════════════════════════════════════════════════════════ */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            <div>
              <span className="section-label">Why this service, specifically</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginTop: '12px', marginBottom: '16px' }}>
                This is not a general tax service that also handles WHV holders.
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
                This is a service built specifically for people on a working holiday visa — the 15% WHM rate, the DASP super claim, the TFN process — handled every day, for people in your exact situation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { title: 'TPB-registered oversight', body: 'Every lodgement is prepared under the supervision of a registered tax agent. TPB number 26233096 — publicly verifiable on the TPB register.' },
                  { title: 'WHV specialists only', body: 'We do not handle business tax, company returns, or general accounting. Only working holiday makers. This means we know the edge cases, the common mistakes, and the ATO requirements for your visa type.' },
                  { title: 'Works from anywhere', body: 'Already left? Travelling? In another time zone? The entire service runs on WhatsApp. No myGov account, no ATO portal, no Australian address required.' },
                  { title: '1–2 day preparation time', body: 'Once we have your documents, we typically have your return ready within 1–2 business days. Super claims depend on ATO processing — but we submit immediately.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Tick />
                    <div>
                      <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '3px' }}>{item.title}</p>
                      <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.65 }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Comparison */}
              <div className="rounded-2xl" style={{ padding: '24px', background: '#fff', border: '1.5px solid #E2EFE9', marginBottom: '16px' }}>
                <p className="font-semibold text-muted" style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Going through the ATO yourself</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {[
                    'Need a myGov account + identity verification',
                    'Easy to select wrong visa type and get taxed incorrectly',
                    'No one to tell you what deductions you can claim',
                    'Super DASP process is confusing — most skip it',
                    'If something is wrong, you find out after the ATO processes it',
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '22px' }}>
                  {[
                    'Start with one WhatsApp message — no accounts or portals',
                    'We verify your visa type and apply the correct 15% rate',
                    'We identify all deductions that apply to your situation',
                    'We submit your DASP claim — you receive the payment',
                    'We review before lodging — errors are caught before the ATO sees them',
                  ].map((t, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Tick />
                      <p className="font-semibold text-ink" style={{ fontSize: '13px', lineHeight: 1.6 }}>{t}</p>
                    </div>
                  ))}
                </div>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-primary w-full justify-center"
                  style={{ height: '50px', fontSize: '14.5px' }}>
                  Check my refund for free →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. PROCESS — Simple, fast, no jargon
      ════════════════════════════════════════════════════════ */}
      <section id="how-it-works" style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label center">What happens after you contact us</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginTop: '12px', marginBottom: '10px' }}>
              One WhatsApp message starts everything.
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '15px', lineHeight: 1.65, maxWidth: '40ch' }}>
              No accounts to create. No ATO portals. No paperwork on your end.
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block" style={{ marginBottom: '48px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px"
                style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)' }} aria-hidden="true" />
              {[
                { n: '1', title: 'Message us on WhatsApp', body: 'Tell us what you need — return, TFN, super, or ABN. We reply within 24 hours.' },
                { n: '2', title: 'Send us your details', body: 'We give you a short checklist. Payslips, TFN, passport. That\'s usually it.' },
                { n: '3', title: 'We prepare everything', body: 'Return, claim, or application — reviewed and prepared under registered oversight.' },
                { n: '4', title: 'Outcome confirmed', body: 'You receive your TFN, lodgement confirmation, or super payment. We stay available.' },
              ].map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ background: '#0B5240', fontSize: '13px', marginBottom: '16px', boxShadow: '0 0 0 4px #EEF7F2, 0 0 0 5px #C8EAE0' }}>{s.n}</div>
                  <p className="font-semibold text-ink text-center" style={{ fontSize: '13.5px', marginBottom: '6px' }}>{s.title}</p>
                  <p className="font-light text-muted text-center" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col" style={{ marginBottom: '36px' }}>
            {[
              { n: '1', title: 'Message us on WhatsApp', body: 'Tell us what you need. We reply within 24 hours.' },
              { n: '2', title: 'Send us your details', body: 'Short checklist — payslips, TFN, passport.' },
              { n: '3', title: 'We prepare everything', body: 'Reviewed and prepared under registered oversight.' },
              { n: '4', title: 'Outcome confirmed', body: 'Return lodged, payment received, TFN issued.' },
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
              style={{ height: '54px', padding: '0 44px', fontSize: '16px', maxWidth: '340px', margin: '0 auto' }}>
              Start for free on WhatsApp →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12.5px', color: '#8AADA3' }}>No commitment · Free first conversation</p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. FAQ — Remove every remaining objection
      ════════════════════════════════════════════════════════ */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.9fr] gap-10 lg:gap-16 items-start">
            <div>
              <span className="section-label">The questions everyone asks</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '12px', marginBottom: '14px' }}>
                Everything you need to know before starting.
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                Still have a question? Message us on WhatsApp — first conversation is always free.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex w-full sm:w-auto justify-center"
                style={{ height: '48px', padding: '0 24px', fontSize: '14.5px' }}>
                Ask us directly →
              </a>
            </div>

            <div style={{ alignSelf: 'start' }}>
              {[
                { q: "How much does this cost?", a: "Fees vary depending on the service. Message us on WhatsApp and we give you a clear quote based on your situation. The first conversation is always free — no cost to ask questions or get an estimate." },
                { q: "How long does it take?", a: "Tax returns are usually prepared within 1–2 business days after we receive your documents. TFN applications are confirmed within a few days. Super claims depend on ATO processing — we submit immediately but the ATO can take several weeks to process a DASP." },
                { q: "Is this actually legitimate? Are you registered?", a: "Yes. Every lodgement is prepared under the supervision of a Tax Practitioners Board registered agent, TPB registration number 26233096. You can verify this directly on the TPB public register at tpb.gov.au. We are not a platform or a bot — this is handled by real people who do this every day." },
                { q: "What happens after I message you?", a: "We ask a few questions about your situation — visa type, how long you worked, how many employers. We then tell you exactly what we can do and what it costs. If you want to proceed, we send a short checklist. No myGov, no ATO portals, no accounts needed." },
                { q: "I already left Australia — can I still do this?", a: "Yes, and this is one of the most common situations we handle. Tax returns can be lodged from overseas. Super claims (DASP) are actually only available after you leave Australia and your visa expires. Everything is done online via WhatsApp." },
                { q: "I worked for multiple employers. Is that more complicated?", a: "Not for you. We request the income summaries from each employer, consolidate the figures, and lodge a single return. The more employers you had, the more important it is to have this done correctly — it is very easy to miss an overpayment from one of them." },
              ].map((faq, i) => (
                <FAQ key={i} q={faq.q} a={faq.a} />
              ))}
              <div style={{ borderTop: '1px solid #C8EAE0' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. FINAL CTA — Strong close, urgency, last push
      ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: '#0B5240', padding: '88px 0' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 100% at 95% 50%, rgba(233,160,32,0.15) 0%, transparent 55%)',
        }} />
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center" style={{ position: 'relative', zIndex: 1 }}>

          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ background: 'rgba(233,160,32,0.15)', border: '1px solid rgba(233,160,32,0.3)' }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="6" stroke="rgba(233,160,32,0.8)" strokeWidth="1.2"/>
              <path d="M6.5 3.5v3.5l2 1" stroke="rgba(233,160,32,0.9)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.75)' }}>
              Tax year ends 30 June · Super claims: no deadline but funds become harder to trace over time
            </span>
          </div>

          <h2 className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(26px, 4.5vw, 50px)', lineHeight: 1.04, letterSpacing: '-0.035em', marginBottom: '18px', maxWidth: '22ch' }}>
            You are probably owed money. The question is whether you&apos;ll claim it.
          </h2>

          <p style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'rgba(255,255,255,0.62)', maxWidth: '46ch', margin: '0 auto 32px', lineHeight: 1.72, fontWeight: 300 }}>
            Tax return, TFN, super withdrawal, ABN — one WhatsApp message starts everything.
            No accounts, no portals, no queues. We handle it and tell you exactly what you&apos;re getting back.
          </p>

          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold transition-all w-full sm:w-auto"
            style={{ height: '60px', padding: '0 52px', fontSize: '17px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', maxWidth: '400px', margin: '0 auto 20px', display: 'flex', boxShadow: '0 6px 24px rgba(233,160,32,0.35)' }}>
            Check how much I can get back →
          </a>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {['Free to check — no commitment', 'Supervised by a registered tax agent', '1,200+ WHV travellers already helped'].map((t, i) => (
              <span key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.42)' }}>✓ {t}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
