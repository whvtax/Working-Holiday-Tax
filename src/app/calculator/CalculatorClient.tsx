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
  const safePct = wit > 0 ? Math.min(100, (Math.abs(d) / wit) * 100) : 50
  if (d > 0) return { label: 'Estimated refund', amount: `$${Math.round(d).toLocaleString()}`, sub: visa === 'whm' ? 'Working Holiday Maker rate applied' : 'Australian resident rates applied', pct: safePct, owing: false }
  if (d < 0) return { label: 'Tax owing',        amount: `$${Math.round(Math.abs(d)).toLocaleString()}`, sub: 'You may owe additional tax. Contact us to discuss.', pct: safePct, owing: true }
  return             { label: 'Balanced',         amount: '$0', sub: 'No refund or tax owing.', pct: 50, owing: false }
}

export function CalculatorClient() {
  const [income,   setIncome]   = useState('')
  const [withheld, setWithheld] = useState('')
  const [visa,     setVisa]     = useState('')
  const [result,   setResult]   = useState<Result | null>(null)
  const [err,      setErr]      = useState('')

  const run = () => {
    const i = Math.min(Math.max(parseFloat(income) || 0, 0), 10_000_000)
    const w = Math.min(Math.max(parseFloat(withheld) || 0, 0), 5_000_000)
    if (!i || !w || !visa) { setErr('Please fill in all three fields.'); return }
    if (w > i) { setErr('Tax withheld cannot exceed total income.'); return }
    setErr('')
    const allowedVisa = ['whm', 'res']
    if (!allowedVisa.includes(visa)) { setErr('Invalid selection.'); return }
    setResult(calc(i, w, visa))
  }

  return (
    <>
      {/* Page header */}
      <div className="relative overflow-hidden bg-white pt-[68px]">
        <div className="absolute pointer-events-none" aria-hidden="true" style={{ top: '-30%', right: '-15%', width: '65%', paddingBottom: '65%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(11,82,64,.6) 0%,transparent 68%)' }} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14 pt-24 pb-28 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-8" style={{ color: 'rgba(255,255,255,0.28)' }}>
            <Link href="/" className="transition-colors hover:text-ink/60">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.15)' }}>/</span>
            <span aria-current="page">Calculator</span>
          </nav>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-300" aria-hidden="true" />
              <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-forest-500">Free tool</span>
            </div>
            <h1 className="font-serif font-black text-ink mb-4" style={{ fontSize: 'clamp(38px,6vw,64px)', lineHeight: 1, letterSpacing: '-0.04em' }}>
              Tax Refund Calculator.
            </h1>
            <p className="text-[17px] font-light leading-[1.7]" style={{ color: 'rgba(255,255,255,0.42)', maxWidth: '440px' }}>
              Estimate your Australian tax refund instantly. No sign-up, no personal data stored.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator body */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-start">

            {/* Left  -  form */}
            <div>
              <div className="space-y-5 mb-6">
                {/* Income */}
                <div>
                  <label htmlFor="ci" className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-2.5">Total income earned</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-subtle">AUD</span>
                    <input
                      id="ci" type="number" placeholder="0" value={income} min={0} max={10000000} inputMode="numeric"
                      onChange={e => setIncome(e.target.value)}
                      className="input-base"
                      style={{ paddingLeft: '56px' }}
                    />
                  </div>
                </div>

                {/* Withheld */}
                <div>
                  <label htmlFor="cw" className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-2.5">Tax withheld by employer</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-subtle">AUD</span>
                    <input
                      id="cw" type="number" placeholder="0" value={withheld} min={0} max={5000000} inputMode="numeric"
                      onChange={e => setWithheld(e.target.value)}
                      className="input-base"
                      style={{ paddingLeft: '56px' }}
                    />
                  </div>
                  <p className="text-[12px] text-subtle mt-2">Found on your payment summary or PAYG summary</p>
                </div>

                {/* Visa */}
                <div>
                  <label htmlFor="cv" className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-2.5">Tax residency status</label>
                  <div className="relative">
                    <select
                      id="cv" value={visa} onChange={e => setVisa(e.target.value)}
                      className="input-base appearance-none cursor-pointer pr-10"
                      style={{ color: visa ? undefined : '#8AADA3' }}
                    >
                      <option value="">Select your status</option>
                      <option value="whm">Working Holiday Maker (417 / 462)</option>
                      <option value="res">Australian tax resident</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                      <path d="M1 1l5 5 5-5" stroke="#8AADA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {err && <p role="alert" className="text-[13px] text-red-500 font-medium">{err}</p>}
              </div>

              <button onClick={run} className="btn-primary w-full" style={{ height: '56px', fontSize: '15px', borderRadius: '14px' }}>
                Calculate my refund
              </button>

              <p className="text-[12px] text-subtle mt-4 leading-[1.6]">
                Based on current ATO rates. This is an estimate only  -  your exact refund is confirmed after we review your documents.
              </p>
            </div>

            {/* Right  -  result panel */}
            <div>
              {!result ? (
                /* Empty state  -  clean, inviting */
                <div className="rounded-2xl p-8 text-center" style={{ background: '#F7FBF9', border: '1.5px dashed #C8EAE0', minHeight: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#EAF6F1' }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <circle cx="11" cy="11" r="8" stroke="#0B5240" strokeWidth="1.4"/>
                      <path d="M11 7v4.5l3 2" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-[15px] font-semibold text-ink mb-1.5">Your estimate will appear here</p>
                  <p className="text-[13px] text-subtle leading-[1.6]">Fill in your income details and hit<br />calculate to see your refund</p>
                </div>
              ) : (
                /* Result state  -  product-quality, clear hierarchy */
                <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 8px 32px rgba(11,82,64,.1)' }}>
                  {/* Result header */}
                  <div className="p-8 pb-7" style={{ background: result.owing ? '#1A2822' : '#1A5C44' }}>
                    <p className="text-[11px] font-medium tracking-[0.1em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>{result.label}</p>
                    <p className="font-serif font-black text-ink mb-1.5" style={{ fontSize: '56px', lineHeight: 1, letterSpacing: '-0.04em' }}>
                      {result.amount}
                    </p>
                    <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.48)' }}>{result.sub}</p>

                    {/* Progress bar */}
                    <div className="mt-6 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.12)' }}>
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${result.pct}%`, background: result.owing ? '#E9A020' : 'rgba(255,255,255,0.7)' }} />
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-6 bg-white">
                    <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                      className="w-full h-[52px] rounded-xl flex items-center justify-center gap-2.5 font-semibold transition-all mb-4"
                      style={{ background: '#22C55E', color: 'white', fontSize: '14.5px' }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.36 2.72.99 3.87L2 18l4.18-.98C7.3 17.65 8.62 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8z" fill="rgba(255,255,255,0.2)"/>
                        <path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.36 2.72.99 3.87L2 18l4.18-.98C7.3 17.65 8.62 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8z" stroke="white" strokeWidth="0.5"/>
                        <path d="M13.1 12.8c-.12.32-.77.64-1.06.67-.28.03-.55.14-1.83-.48-1.56-.73-2.57-2.32-2.64-2.43-.07-.11-.66-.98-.66-1.87s.48-1.32.64-1.5c.16-.18.36-.22.48-.22h.35c.11 0 .25 0 .37.3.12.3.42 1.26.46 1.35.04.09.05.2 0 .32l-.33.44c-.09.11-.18.23-.07.44.11.21.48.86 1.01 1.34.53.48.99.68 1.19.76.2.09.28.07.37-.05l.34-.48c.09-.13.2-.11.33-.06.13.06.86.48 1.01.57.15.09.25.14.28.21.04.3-.07.83-.18 1.12z" fill="white"/>
                      </svg>
                      Claim this refund on WhatsApp
                    </a>
                    <p className="text-[11.5px] text-subtle leading-[1.6] text-center">
                      No personal data stored. Estimate only  -  exact figure confirmed after document review.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
