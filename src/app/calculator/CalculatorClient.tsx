'use client'
import { useState } from 'react'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

type Result = { label: string; amount: string; sub: string; pct: number; owing: boolean }

function calc(inc: number, wit: number, visa: string): Result {
  let tax = 0
  if (visa === 'whm') {
    tax = inc <= 45000 ? inc * 0.15 : 6750 + (inc - 45000) * 0.3
  } else {
    if      (inc <= 18200)  tax = 0
    else if (inc <= 45000)  tax = (inc - 18200) * 0.16
    else if (inc <= 135000) tax = 4288  + (inc - 45000)  * 0.3
    else if (inc <= 190000) tax = 31288 + (inc - 135000) * 0.37
    else                    tax = 56838 + (inc - 190000) * 0.45
  }
  const d = wit - tax
  // H6: guard against division-by-zero when wit === 0
  const safePct = wit > 0 ? Math.min(100, (Math.abs(d) / wit) * 100) : 50

  if (d > 0)  return { label: 'Estimated refund', amount: `$${Math.round(d).toLocaleString()}`,           sub: visa === 'whm' ? 'Working Holiday Maker rate applied' : 'Australian resident rates applied', pct: safePct, owing: false }
  if (d < 0)  return { label: 'Tax owing',        amount: `$${Math.round(Math.abs(d)).toLocaleString()}`, sub: 'You may owe additional tax. Contact us to discuss your options.',                          pct: safePct, owing: true  }
  return              { label: 'Balanced',         amount: '$0',                                           sub: 'No refund or tax owing.',                                                                  pct: 50,      owing: false }
}

export function CalculatorClient() {
  const [income,   setIncome]   = useState('')
  const [withheld, setWithheld] = useState('')
  const [visa,     setVisa]     = useState('')
  const [result,   setResult]   = useState<Result | null>(null)
  const [err,      setErr]      = useState('')

  const run = () => {
    const i = parseFloat(income) || 0
    const w = parseFloat(withheld) || 0
    if (!i || !w || !visa) { setErr('Please fill in all three fields.'); return }
    setErr('')
    setResult(calc(i, w, visa))
  }

  const inputCls = "w-full h-[54px] bg-white border border-border rounded-[12px] px-4 font-sans text-[15px] text-ink outline-none placeholder:text-subtle transition-all focus:border-forest-500 focus:shadow-[0_0_0_3px_rgba(11,82,64,0.1)]"

  return (
    <>
      {/* Header */}
      <div className="relative overflow-hidden bg-ink-2 pt-[68px] grid-bg">
        <div className="absolute pointer-events-none" aria-hidden="true" style={{ top: '-25%', right: '-15%', width: '65%', paddingBottom: '65%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(11,82,64,.6) 0%,transparent 68%)' }} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14 pt-24 pb-24 relative z-10 text-center">
          {/* M4: use Link for internal nav */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-[12px] text-white/30 mb-6">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <span className="text-white/15" aria-hidden="true">/</span>
            <span aria-current="page">Calculator</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-forest-300/10 border border-forest-300/22 rounded-full px-3.5 py-1.5 mb-6">
            <span className="w-[6px] h-[6px] rounded-full bg-forest-300" aria-hidden="true" />
            <span className="text-[10.5px] font-medium tracking-[0.1em] uppercase text-forest-300">Free tool</span>
          </div>
          <h1 className="font-serif font-black text-white tracking-[-2px] leading-[1] mb-5" style={{ fontSize: 'clamp(38px,7vw,72px)' }}>
            Working Holiday<br /><em className="not-italic font-normal text-white/50">Tax Calculator.</em>
          </h1>
          <p className="text-[17px] font-light text-white/48 leading-[1.7] max-w-[460px] mx-auto">
            Estimate your Australian tax refund instantly. No sign-up, no personal data stored.
          </p>
        </div>
      </div>

      {/* Form */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="max-w-xl mx-auto">
            <div className="bg-forest-50 border border-border rounded-[22px] p-8 md:p-10">
              <div className="space-y-5">
                <div>
                  <label htmlFor="ci" className="block text-[11px] font-medium tracking-[0.1em] uppercase text-muted mb-2">Total income earned (AUD)</label>
                  <input id="ci" type="number" placeholder="e.g. 30,000" value={income} min={0} inputMode="numeric" onChange={e => setIncome(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="cw" className="block text-[11px] font-medium tracking-[0.1em] uppercase text-muted mb-2">Tax withheld by employer (AUD)</label>
                  <input id="cw" type="number" placeholder="e.g. 4,500" value={withheld} min={0} inputMode="numeric" onChange={e => setWithheld(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="cv" className="block text-[11px] font-medium tracking-[0.1em] uppercase text-muted mb-2">Tax residency status</label>
                  <div className="relative">
                    <select
                      id="cv"
                      value={visa}
                      onChange={e => setVisa(e.target.value)}
                      className="w-full h-[54px] bg-white border border-border rounded-[12px] px-4 pr-10 font-sans text-[15px] text-ink outline-none appearance-none cursor-pointer transition-all focus:border-forest-500"
                    >
                      <option value="">Select your status</option>
                      <option value="whm">Working Holiday Maker (417 / 462)</option>
                      <option value="res">Australian tax resident</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                      <path d="M1 1l5 5 5-5" stroke="#587066" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                {err && <p role="alert" className="text-[13px] text-red-500">{err}</p>}
                <button onClick={run} className="w-full h-[58px] bg-amber text-ink-2 rounded-full text-[15px] font-semibold shadow-[0_4px_20px_rgba(233,160,32,.28)] transition-all hover:bg-amber-300 hover:text-white hover:-translate-y-0.5 mt-2">
                  Calculate my refund
                </button>
              </div>

              {result && (
                <div className="border-t border-border mt-8 pt-8">
                  <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-subtle mb-2">{result.label}</p>
                  <p className="font-serif font-black text-[52px] tracking-[-2px] leading-none mb-1.5" style={{ color: result.owing ? '#E9A020' : '#0B5240' }}>
                    {result.amount}
                  </p>
                  <p className="text-[12px] text-subtle mb-5">{result.sub}</p>
                  <div className="h-[2.5px] bg-border rounded-sm overflow-hidden mb-7" aria-hidden="true">
                    <div className="h-full bg-amber rounded-sm transition-all duration-700" style={{ width: `${result.pct}%` }} />
                  </div>
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-[56px] bg-wa text-white rounded-full text-[14.5px] font-semibold flex items-center justify-center gap-2.5 mb-4 transition-all hover:bg-green-600 hover:-translate-y-0.5"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="9.5" fill="rgba(255,255,255,.14)" />
                      <path d="M10 3C6.1 3 3 6.1 3 10c0 1.3.36 2.52.98 3.56L3 17l3.5-.96C7.5 16.67 8.73 17 10 17c3.9 0 7-3.1 7-7s-3.1-7-7-7z" fill="white" />
                      <path d="M13.6 13.1c-.13.35-.84.7-1.16.73-.3.04-.6.16-2-.52-1.7-.8-2.8-2.53-2.88-2.65-.08-.12-.72-1.07-.72-2.04s.52-1.44.7-1.64c.18-.2.4-.24.53-.24h.38c.12 0 .27 0 .4.32.13.32.46 1.37.5 1.47.04.1.06.22 0 .35l-.36.48c-.1.12-.2.25-.08.48.12.23.52.94 1.1 1.46.58.52 1.08.74 1.3.83.22.1.3.08.4-.05l.37-.52c.1-.14.22-.12.36-.06.14.06.94.52 1.1.62.16.1.27.15.3.23.04.32-.08.9-.2 1.2z" fill="rgba(255,255,255,0.9)" />
                    </svg>
                    Claim this refund on WhatsApp
                  </a>
                  <p className="text-[11px] text-subtle leading-[1.65]">Estimate based on standard ATO rates. Exact figure confirmed after document review. No personal data is stored.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
