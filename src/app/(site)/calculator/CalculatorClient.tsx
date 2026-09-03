'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { waUrl } from '@/lib/wa'
import { trackCalculator, trackWhatsApp } from '@/lib/analytics'

/*
 * The calculator is a qualifier, not the product.
 *
 * Two things were wrong with it. It was framed as a free giveaway, which made
 * the estimate look like the thing being sold, and on a phone the result
 * rendered below the fold with no scroll, so tapping Calculate looked like
 * nothing had happened. Both are fixed here: the framing says plainly what the
 * figure cannot know, and the result is scrolled into view and focused.
 */

type SuperCalc = { gross: number; rate: number; tax: number; net: number }

type Result = { label: string; amount: string; sub: string; owing: boolean; refund: number; sup: SuperCalc | null; total: number }

type FAQ = { question: string; answer: string }

type Props = {
  faqs?: FAQ[]
}

const money = (n: number) => '$' + Math.round(n).toLocaleString('en-AU')

function calc(inc: number, wit: number, visa: 'whm' | 'res', supBal: number): Result {
  let tax = 0
  if (visa === 'whm') {
    // WHM scale 2025-26: 15% to $45k, then 30% / 37% / 45% - no tax-free threshold
    if      (inc <= 45000)  tax = inc * 0.15
    else if (inc <= 135000) tax = 6750  + (inc - 45000)  * 0.3
    else if (inc <= 190000) tax = 33750 + (inc - 135000) * 0.37
    else                    tax = 54100 + (inc - 190000) * 0.45
  } else {
    if      (inc <= 18200)  tax = 0
    else if (inc <= 45000)  tax = (inc - 18200) * 0.16
    else if (inc <= 135000) tax = 4288  + (inc - 45000)  * 0.3
    else if (inc <= 190000) tax = 31288 + (inc - 135000) * 0.37
    else                    tax = 51638 + (inc - 190000) * 0.45
  }
  const d = wit - tax

  // Departing Australia Superannuation Payment.
  // 65% applies to anyone who has held a 417 or 462 visa at any point.
  // 35% is the taxed-element rate for other temporary residents.
  const rate = visa === 'whm' ? 65 : 35
  const sup: SuperCalc | null =
    supBal > 0
      ? { gross: supBal, rate, tax: supBal * (rate / 100), net: supBal * (1 - rate / 100) }
      : null

  const refund = d > 0 ? d : 0
  const total = refund + (sup ? sup.net : 0)

  if (d > 0) return { label: 'Indicative refund', amount: money(d),  sub: visa === 'whm' ? 'Working holiday maker rates applied' : 'Australian resident rates applied, before the 2% Medicare levy', owing: false, refund, sup, total }
  if (d < 0) return { label: 'Indicative tax owing',  amount: money(-d), sub: 'On these figures there is tax owing. Deductions often change that.', owing: true,  refund: 0, sup, total }
  return             { label: 'Indicative balance', amount: money(0), sub: 'On these figures, nothing owed and nothing back.', owing: false, refund: 0, sup, total }
}

/** The one-line summary that travels into the WhatsApp prefill. */
function detailFor(r: Result, hasAbn: boolean): string {
  const bits: string[] = []
  bits.push(r.owing ? `estimate showed ${r.amount} owing` : `estimate ${r.amount}`)
  if (r.sup) bits.push(`super ${money(r.sup.net)} after DASP tax`)
  if (hasAbn) bits.push('worked on an ABN too')
  return bits.join(', ')
}

/**
 * The objection every lead arrives holding, answered about an estimate.
 *
 * It sits directly under the result rather than above the tool, because on this
 * page the objection lands the moment the figure appears: I have a number now,
 * I can lodge it myself. Every row is about the distance between arithmetic on
 * the figures you have and a position taken on the ones you do not.
 */
const MYGOV = [
  {
    mygov: 'You copy the figure across and myGov takes it.',
    us: 'We start from the same figure, then go through what it does not include.',
  },
  {
    mygov: 'Residency is a tick box. Nothing tells you which answer is true for you.',
    us: 'Read correctly, residency can change the rates for your whole year. We take a position on it and stand behind it.',
  },
  {
    mygov: 'Deductions are a blank box, and no estimate can fill one in for you.',
    us: 'We know what your line of work is allowed to claim, and what has to sit behind each claim.',
  },
  {
    mygov: 'Nothing checks the weeks before your tax file number reached your employer, withheld at 45%.',
    us: 'We reconcile every employer you had for the year and claim that gap back.',
  },
]

export function CalculatorClient({ faqs = [] }: Props) {
  const [income,   setIncome]   = useState('')
  const [withheld, setWithheld] = useState('')
  const [visa,     setVisa]     = useState('')
  const [superBal, setSuperBal] = useState('')
  const [hasAbn,   setHasAbn]   = useState(false)
  const [result,   setResult]   = useState<Result | null>(null)
  const [err,      setErr]      = useState('')
  const resultRef = useRef<HTMLDivElement | null>(null)

  /*
   * The bug this fixes: on a 375px screen the result box renders below the
   * fold, so the button appeared to do nothing. Scroll it into view once it
   * exists, and honour prefers-reduced-motion by jumping instead of gliding.
   */
  useEffect(() => {
    if (!result) return
    const node = resultRef.current
    if (!node) return
    let reduce = false
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch { /* older browsers */ }
    try {
      node.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    } catch {
      node.scrollIntoView()
    }
    node.focus({ preventScroll: true })
  }, [result])

  const run = () => {
    // Strip anything that isn't a digit or decimal point before parsing
    const safeInc = income.replace(/[^0-9.]/g, '')
    const safeWit = withheld.replace(/[^0-9.]/g, '')
    const safeSup = superBal.replace(/[^0-9.]/g, '')
    const rawI = parseFloat(safeInc)
    const rawW = parseFloat(safeWit)
    const rawS = parseFloat(safeSup)
    // Explicit NaN check then clamp to sane bounds
    const i = isFinite(rawI) ? Math.min(Math.max(rawI, 0), 10_000_000) : 0
    const w = isFinite(rawW) ? Math.min(Math.max(rawW, 0), 5_000_000)  : 0
    const s = isFinite(rawS) ? Math.min(Math.max(rawS, 0), 5_000_000) : 0
    if (!i || safeWit === '' || !visa) { setErr('Please fill in all three fields.'); return }
    if (w > i) { setErr('Tax withheld cannot exceed total income.'); return }
    setErr('')
    // Allowlist check - never trust client-side select value
    const allowedVisa = ['whm', 'res'] as const
    if (!(allowedVisa as readonly string[]).includes(visa)) { setErr('Invalid selection.'); return }
    setResult(calc(i, w, visa as 'whm' | 'res', s))
    trackCalculator({ lang: 'en', hasAbn })
  }

  const waHref = result
    ? waUrl({ topic: 'calculator', lang: 'en', tier: hasAbn ? 'tfn-abn' : 'tfn', detail: detailFor(result, hasAbn) })
    : waUrl({ topic: 'calculator', lang: 'en' })

  const onWaTap = () => {
    try { navigator.vibrate?.(10) } catch { /* unsupported, which is fine */ }
    trackWhatsApp({ position: 'calculator-result', topic: 'calculator', lang: 'en', tier: hasAbn ? 'tfn-abn' : 'tfn' })
  }

  const LABEL = 'block font-semibold uppercase text-muted'
  // 11.5px, uppercase and tracked out is the hardest setting to read at arm's
// length, and these are the labels naming what to type on the page that
// qualifies the lead. The inputs themselves were already a correct 16px.
const LABEL_S: React.CSSProperties = { fontSize: '13px', letterSpacing: '0.06em', marginBottom: '10px' }
  // 16px minimum, or iOS zooms the whole page on focus.
  const FIELD: React.CSSProperties = { fontSize: '16px', height: '54px' }

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">
          <div className="max-w-[620px] mx-auto text-center">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240' }}>
                Rough figure first
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(26px,3.2vw,42px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '12px' }}>
              Working holiday tax refund calculator
            </h1>

            <p className="hero-sub mx-auto"
              style={{ fontSize: '16.5px', lineHeight: 1.62, color: '#2A3C34', maxWidth: '46ch' }}>
              Put in what you earned and what was withheld. An indicative figure comes back in a few seconds.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator body */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-14">
          <div className="max-w-xl mx-auto w-full">

            <div className="space-y-5 mb-6">
              {/* Income */}
              <div>
                <label htmlFor="ci" className={LABEL} style={LABEL_S}>Total income earned</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium" style={{ fontSize: '14px', color: '#4C6459' }}>AUD</span>
                  <input
                    id="ci" type="number" placeholder="0" value={income} min={0} max={10000000}
                    inputMode="decimal" enterKeyHint="next"
                    onChange={e => setIncome(e.target.value)}
                    className="input-base"
                    style={{ ...FIELD, paddingLeft: '60px' }}
                  />
                </div>
              </div>

              {/* Withheld */}
              <div>
                <label htmlFor="cw" className={LABEL} style={LABEL_S}>Tax withheld by your employers</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium" style={{ fontSize: '14px', color: '#4C6459' }}>AUD</span>
                  <input
                    id="cw" type="number" placeholder="0" value={withheld} min={0} max={5000000}
                    inputMode="decimal" enterKeyHint="next"
                    onChange={e => setWithheld(e.target.value)}
                    className="input-base"
                    style={{ ...FIELD, paddingLeft: '60px' }}
                  />
                </div>
                <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '8px' }}>
                  On your income statement or payment summary, added up across every job.
                </p>
              </div>

              {/* Visa */}
              <div>
                <label htmlFor="cv" className={LABEL} style={LABEL_S}>Tax residency status</label>
                <div className="relative">
                  <select
                    id="cv" value={visa} onChange={e => setVisa(e.target.value)}
                    className="input-base appearance-none cursor-pointer pr-10"
                    style={{ ...FIELD, color: visa ? undefined : '#4C6459' }}
                  >
                    <option value="">Select your status</option>
                    <option value="whm">Working holiday maker (417 / 462)</option>
                    <option value="res">Australian tax resident</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                    <path d="M1 1l5 5 5-5" stroke="#4C6459" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '8px' }}>
                  Most people pick working holiday maker because that is the visa.
                </p>
              </div>

              {/* Superannuation balance - optional */}
              <div>
                <label htmlFor="cs" className={LABEL} style={LABEL_S}>
                  Superannuation balance <span style={{ textTransform: 'none', letterSpacing: 0, opacity: 0.7 }}>(optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium" style={{ fontSize: '14px', color: '#4C6459' }}>AUD</span>
                  <input
                    id="cs" type="number" placeholder="0" value={superBal} min={0} max={5000000}
                    inputMode="decimal" enterKeyHint="done"
                    onChange={e => setSuperBal(e.target.value)}
                    className="input-base"
                    style={{ ...FIELD, paddingLeft: '60px' }}
                  />
                </div>
                <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '8px', lineHeight: 1.6 }}>
                  If you have ever held a 417 or 462 visa, the 65% DASP rate applies to the whole balance.
                </p>
              </div>

              {/* ABN, because it changes what the review has to do */}
              <div className="rounded-xl" style={{ border: '1.5px solid #E2EFE9', background: '#F7FBF9' }}>
                <label htmlFor="cabn" className="flex items-start gap-3 cursor-pointer" style={{ padding: '14px 16px', minHeight: '44px' }}>
                  <input
                    id="cabn" type="checkbox" checked={hasAbn}
                    onChange={e => setHasAbn(e.target.checked)}
                    style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: '#0B5240', flexShrink: 0 }}
                  />
                  <span>
                    <span className="font-semibold text-ink" style={{ fontSize: '15px', display: 'block' }}>
                      I also invoiced under an ABN
                    </span>
                    <span style={{ fontSize: '13px', color: '#4C6459', lineHeight: 1.6 }}>
                      Delivery riding, subcontracting, anything you invoiced for.
                    </span>
                  </span>
                </label>
              </div>

              {err && <p role="alert" style={{ fontSize: '14px', color: '#9A3412', fontWeight: 500 }}>{err}</p>}
            </div>

            <button type="button" onClick={run}
              className="btn-primary w-full flex items-center justify-center"
              style={{ minHeight: '54px', fontSize: '16px', borderRadius: '100px' }}>
              Calculate
            </button>

            {result && (
              <div
                ref={resultRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                style={{
                  marginTop: '20px',
                  scrollMarginTop: '80px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  outline: 'none',
                  border: `1.5px solid ${result.owing ? '#FDBA74' : '#C8EAE0'}`,
                  background: result.owing ? '#FEF3F0' : '#EAF6F1',
                }}>

                <div style={{ padding: '22px 20px 18px', textAlign: 'center' }}>
                  <p className="font-semibold uppercase"
                    style={{ fontSize: '11px', letterSpacing: '0.14em', marginBottom: '7px', color: result.owing ? '#9A3412' : '#0B5240' }}>
                    {result.label}
                  </p>
                  <p className="font-black"
                    style={{ fontSize: 'clamp(30px,6vw,42px)', lineHeight: 1.04, letterSpacing: '-0.03em', color: result.owing ? '#9A3412' : '#0B5240' }}>
                    {result.amount}
                  </p>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, marginTop: '9px', color: '#2A3C34' }}>
                    {result.sub}
                  </p>
                </div>

                {/* What the figure cannot know, then the handoff. */}
                <div style={{ padding: '0 20px 18px' }}>
                  {/* "That is what the review works out." was a closing line
                      that added no fact to the three already named. */}
                  <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#2A3C34', marginBottom: '14px' }}>
                    Treat this as indicative. The real number moves on three things this page cannot
                    settle: which residency position is true for you, whether the Medicare levy
                    exemption applies, and what your line of work can deduct.
                  </p>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={onWaTap}
                    className="btn-primary w-full flex items-center justify-center"
                    style={{ minHeight: '50px', fontSize: '15px', borderRadius: '100px' }}>
                    Send this to us on WhatsApp
                  </a>
                  <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '9px', textAlign: 'center' }}>
                    Your figures go into the message. Replies in about an hour.
                  </p>
                </div>

                {result.sup && (
                  <div style={{ borderTop: '1px solid rgba(11,82,64,0.12)', background: 'rgba(255,255,255,0.55)', padding: '16px 20px' }}>
                    <p className="font-semibold uppercase"
                      style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#0B5240', marginBottom: '11px' }}>
                      Superannuation (DASP)
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                      <span style={{ color: '#4C6459' }}>Balance</span>
                      <span style={{ fontWeight: 500 }}>{money(result.sup.gross)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '9px', paddingBottom: '9px', borderBottom: '1px solid rgba(11,82,64,0.1)' }}>
                      <span style={{ color: '#4C6459' }}>Tax at {result.sup.rate}%</span>
                      <span style={{ fontWeight: 500, color: '#9A3412' }}>-{money(result.sup.tax)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#0B5240' }}>You receive</span>
                      <span className="font-black" style={{ fontSize: '19px', letterSpacing: '-0.02em', color: '#0B5240' }}>{money(result.sup.net)}</span>
                    </div>
                    <p style={{ fontSize: '13px', lineHeight: 1.6, marginTop: '11px', color: '#4C6459' }}>
                      Super is only paid out after you have left Australia and your visa has expired or been
                      cancelled.{' '}
                      <Link href="/superannuation" style={{ color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                        How the DASP claim works
                      </Link>
                    </p>
                  </div>
                )}

                {result.sup && !result.owing && (
                  <div style={{ borderTop: '1px solid rgba(11,82,64,0.12)', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="font-semibold uppercase" style={{ fontSize: '11.5px', letterSpacing: '0.1em', color: '#0B5240' }}>
                      Indicative total
                    </span>
                    <span className="font-black" style={{ fontSize: '23px', letterSpacing: '-0.025em', color: '#0B5240' }}>{money(result.total)}</span>
                  </div>
                )}
              </div>
            )}

            <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '16px', lineHeight: 1.6 }}>
              The calculator uses the 2025-26 rates and only the figures you type in, so it is not your
              final number.
            </p>
          </div>
        </div>
      </section>

      {/* The objection, answered about an estimate. */}
      <section className="py-10 lg:py-14" style={{ background: '#fff', borderTop: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px]">

            <p className="font-medium uppercase"
              style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#16775C', marginBottom: '12px' }}>
              Doing it yourself
            </p>

            <h2 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.16, letterSpacing: '-0.025em', marginBottom: '16px' }}>
              <span style={{ display: 'block', color: '#2A3C34', fontWeight: 400 }}>Type a low number into myGov{' '}</span>
              <span style={{ display: 'block' }}>and a low number is what gets lodged.{' '}</span>
            </h2>

            {/* Was "...and four things are missing from what you typed", which
                said "what you typed" twice in one line. */}
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#4C6459', maxWidth: '56ch', marginBottom: '20px' }}>
              An estimate is only as good as what you typed, and four things are missing from it.
            </p>

            <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
              {MYGOV.map((row, i) => (
                <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                  <div style={{ padding: '13px 16px', background: '#FFFFFF' }}>
                    {/* Printed on the first row only. On a phone the rows stack,
                        so repeating both labels eight times was the same two
                        words marching down the screen. Column headings on
                        desktop, the key on mobile. */}
                    {i === 0 && (
                      <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#4C6459', marginBottom: '5px' }}>
                        On myGov
                      </p>
                    )}
                    <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#2A3C34', margin: 0, overflowWrap: 'break-word' }}>{row.mygov}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                    style={{ padding: '13px 16px', background: '#F2FAF7' }}>
                    {i === 0 && (
                      <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240', marginBottom: '5px' }}>
                        With us
                      </p>
                    )}
                    <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#080F0D', fontWeight: 500, margin: 0, overflowWrap: 'break-word' }}>{row.us}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-serif" style={{ fontSize: '18px', lineHeight: 1.45, color: '#0B5240', marginTop: '22px', maxWidth: '46ch', fontWeight: 700 }}>
              You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly.
            </p>
          </div>
        </div>
      </section>

      {/* What the review adds. The spine's "what you would get wrong alone". */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px]">
            <h2 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.16, letterSpacing: '-0.025em', marginBottom: '16px' }}>
              What makes the real number different from this one?
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#2A3C34', marginBottom: '14px' }}>
              Three things, none of them on this page. The first is your residency position. Read correctly,
              it can change which rates apply to your whole year. It is a judgement about your circumstances,
              worth more than everything else combined.
            </p>
            {/* Was one five sentence block carrying both the second and the
                third thing. Split at the turn, where the levy ends and the
                deductions begin. */}
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#2A3C34', marginBottom: '14px' }}>
              The second is the Medicare levy. It is 2% of taxable income, it comes off by default, and
              most 417 and 462 holders never owed it. Removing it needs a certificate almost nobody applies
              for.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#2A3C34', marginBottom: '14px' }}>
              The third is deductions, a blank box on myGov. What a farm hand, a barista and a hospitality
              worker can each claim is not the same list.
            </p>
            <div className="flex flex-wrap gap-3" style={{ marginTop: '18px' }}>
              <Link href="/medicare"
                className="inline-flex items-center rounded-xl border border-ink/10 transition-colors hover:border-forest-500 hover:text-forest-500"
                style={{ padding: '12px 16px', minHeight: '44px', fontSize: '14px', color: '#080F0D' }}>
                The Medicare levy exemption
              </Link>
              <Link href="/superannuation"
                className="inline-flex items-center rounded-xl border border-ink/10 transition-colors hover:border-forest-500 hover:text-forest-500"
                style={{ padding: '12px 16px', minHeight: '44px', fontSize: '14px', color: '#080F0D' }}>
                Claiming your super after you leave
              </Link>
              <Link href="/expenses"
                className="inline-flex items-center rounded-xl border border-ink/10 transition-colors hover:border-forest-500 hover:text-forest-500"
                style={{ padding: '12px 16px', minHeight: '44px', fontSize: '14px', color: '#080F0D' }}>
                What you can actually deduct
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      {faqs.length > 0 && (
        <section style={{ background: '#fff', paddingTop: '50px', paddingBottom: '50px' }}>
          <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12">
            <h2 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.16, letterSpacing: '-0.025em', marginBottom: '18px' }}>
              Questions about the estimate
            </h2>

            <div className="flex flex-col" style={{ gap: '4px' }}>
              {faqs.map((f, i) => (
                <details key={i} name="calculator-faq" className="contact-faq-item">
                  <summary className="contact-faq-summary">
                    <span style={{ flex: 1 }}>{f.question}</span>
                    <span className="contact-faq-plus" aria-hidden="true">+</span>
                  </summary>
                  {/* One <p> per paragraph. The FAQPage schema in page.tsx
                      still uses the raw string, so the structured data is
                      unchanged. */}
                  {f.answer.split('\n\n').map((para, j) => (
                    <p key={j} className="contact-faq-answer">{para}</p>
                  ))}
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section style={{ background: '#0B5240', paddingTop: '50px', paddingBottom: '60px' }}>
        <div className="max-w-[640px] mx-auto px-5 md:px-8 lg:px-12 text-center">
          <h2 className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(23px,2.8vw,33px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '14px', maxWidth: '22ch' }}>
            Anyone can press submit. The work happens before that.
          </h2>
          <p className="mx-auto" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '10px', maxWidth: '46ch' }}>
            Send us your figures and we will tell you what is in play for your year. If your refund is less
            than our fee, we refund the difference. If you owe tax instead, the fee covers our review and is not refundable.
          </p>
          <p className="mx-auto" style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: '22px', maxWidth: '46ch' }}>
            Reviewed and signed off by a registered tax agent before it is lodged
            with the ATO.
          </p>
          <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={onWaTap}
            className="btn-primary w-full sm:w-auto"
            style={{ minHeight: '54px', padding: '0 36px', fontSize: '16px', minWidth: '260px' }}>
            Message us on WhatsApp
          </a>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '12px' }}>
            Replies in about an hour.
          </p>
        </div>
      </section>
    </>
  )
}
