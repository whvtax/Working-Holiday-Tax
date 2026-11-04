'use client'
import { useEffect, useRef, useState } from 'react'
import { CalculatorView, type CalcStrings } from '@/components/wht/CalculatorBlocks'
import { Mark } from '@/components/wht/Type'
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
  photo?: React.ReactNode
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
    mygov: 'Residency is a tick box. Nothing there explains how it is assessed.',
    us: 'Residency can change the rates for a year. It depends on your individual facts and is for the ATO to decide, and we review it as part of your return.',
  },
  {
    mygov: 'Deductions are a blank box, and no estimate can fill one in for you.',
    us: 'We know what your line of work is allowed to claim, and what has to sit behind each claim.',
  },
  {
    mygov: 'Nothing checks the weeks before your tax file number reached your employer, withheld at 45%.',
    us: 'We reconcile every employer you had for the year and deal with that gap in the return.',
  },
]

const T: CalcStrings = {
  eyebrow: "Rough figure first",
  h1: <>Working holiday tax <Mark>refund calculator</Mark></>,
  lead: "Put in what you earned and what was withheld. An indicative figure comes back in a few seconds.",
  incomeLabel: "Total income earned",
  withheldLabel: "Tax withheld by your employers",
  withheldHint: "On your income statement or payment summary, added up across every job.",
  visaLabel: "Tax residency status",
  visaPlaceholder: "Select your status",
  optWhm: "Working holiday maker (417 / 462)",
  optRes: "Australian tax resident",
  visaHint: "Which one applies depends on the facts of your year and is for the ATO to decide. Use working holiday maker as a starting point.",
  superLabel: "Superannuation balance",
  optional: "(optional)",
  superHint: "If you have ever held a 417 or 462 visa, the 65% DASP rate applies to the whole balance.",
  abnLabel: "I also invoiced under an ABN",
  abnHint: "Delivery riding, subcontracting, anything you invoiced for.",
  calculate: "Calculate",
  resultNote: "Treat this as indicative. The real number moves on three things this page cannot settle: which residency position applies to you, whether the Medicare levy exemption applies, and what your line of work can deduct.",
  sendWa: "Send this to us on WhatsApp",
  sendNote: "Your figures go into the message. Replies in about an hour.",
  supTitle: "Superannuation (DASP)",
  balance: "Balance",
  taxAt: (rate) => `Tax at ${rate}%`,
  youReceive: "You receive",
  supNote: "Super is only paid out after you have left Australia and your visa has expired or been cancelled.",
  supLink: "How the DASP claim works",
  totalLabel: "Indicative total",
  footnote: "The calculator uses the 2025-26 rates and only the figures you type in, so it is not your final number.",
  doEyebrow: "Doing it yourself",
  doTitle: <>Type a low number into myGov and <Mark>a low number is what gets lodged.</Mark></>,
  doIntro: "An estimate is only as good as what you typed, and four things are missing from it.",
  colMygov: "On myGov",
  colUs: "With us",
  doStatement: "You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly.",
  diffTitle: "What makes the real number different from this one?",
  diffParas: [
    "Three things, none of them on this page. The first is your residency position. It can change which rates apply to a year. It depends on your individual circumstances, is assessed case by case and is for the ATO to decide.",
    "The second is the Medicare levy. It is 2% of taxable income, it comes off by default, and depending on your entitlement to Medicare you may never have owed it. Removing it needs a certificate almost nobody applies for.",
    "The third is deductions, a blank box on myGov. What a farm hand, a barista and a hospitality worker can each claim is not the same list.",
  ],
  linkMedicare: "The Medicare levy exemption",
  linkSuper: "Claiming your super after you leave",
  linkExpenses: "What you can actually deduct",
  faqTitle: "Questions about the estimate",
  ctaTitle: "Anyone can press submit. The work happens before that.",
  ctaText: "Send us your figures and we will tell you what is in play for your year. Our guarantee: if your tax refund is less than our fee, we refund the difference after your Notice of Assessment. If there is no refund, or you owe money to the ATO instead, the full fee applies. The guarantee covers returns with TFN income only.",
  ctaNote: "Reviewed and signed off by a registered tax agent before it is lodged with the ATO.",
  ctaButton: "Message us on WhatsApp",
  ctaReply: "Replies in about an hour.",
}

export function CalculatorClient({ faqs = [], photo }: Props) {
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

  return (
    <CalculatorView
      t={T}
      hrefs={{ superannuation: '/superannuation', medicare: '/medicare', expenses: '/expenses' }}
      photo={photo}
      faqs={faqs}
      mygov={MYGOV}
      income={income} withheld={withheld} visa={visa} superBal={superBal} hasAbn={hasAbn} err={err}
      setIncome={setIncome} setWithheld={setWithheld} setVisa={setVisa} setSuperBal={setSuperBal} setHasAbn={setHasAbn}
      onRun={run} result={result} resultRef={resultRef} money={money} waHref={waHref} onWaTap={onWaTap}
    />
  )
}
