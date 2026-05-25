'use client'
import { useState } from 'react'
import { WA_URL } from '@/lib/constants'

type Result = { label: string; amount: string; sub: string; pct: number; owing: boolean }

type FAQ = { question: string; answer: string }

type Props = {
  faqs?: FAQ[]
}

function calc(inc: number, wit: number, visa: 'whm' | 'res'): Result {
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
  if (d > 0) return { label: 'Geschätzte Rückzahlung', amount: `$${Math.round(d).toLocaleString()}`, sub: visa === 'whm' ? 'Working Holiday Maker Steuersatz' : 'Australischer Steuerresidenten-Satz', pct: safePct, owing: false }
  if (d < 0) return { label: 'Steuerschuld',        amount: `$${Math.round(Math.abs(d)).toLocaleString()}`, sub: 'Du musst eventuell Steuer nachzahlen. Schreib uns für eine Beratung.', pct: safePct, owing: true }
  return             { label: 'Ausgeglichen',         amount: '$0', sub: 'Keine Rückzahlung, keine Steuerschuld.', pct: 50, owing: false }
}

export function CalculatorClient({ faqs = [] }: Props) {
  const [income,   setIncome]   = useState('')
  const [withheld, setWithheld] = useState('')
  const [visa,     setVisa]     = useState('')
  const [result,   setResult]   = useState<Result | null>(null)
  const [err,      setErr]      = useState('')

  const run = () => {
    // Strip anything that isn't a digit or decimal point before parsing
    const safeInc = income.replace(/[^0-9.]/g, '')
    const safeWit = withheld.replace(/[^0-9.]/g, '')
    const rawI = parseFloat(safeInc)
    const rawW = parseFloat(safeWit)
    // Explicit NaN check then clamp to sane bounds
    const i = isFinite(rawI) ? Math.min(Math.max(rawI, 0), 10_000_000) : 0
    const w = isFinite(rawW) ? Math.min(Math.max(rawW, 0), 5_000_000)  : 0
    if (!i || !w || !visa) { setErr('Bitte fülle alle drei Felder aus.'); return }
    if (w > i) { setErr('Die einbehaltene Steuer kann nicht höher sein als dein Gesamteinkommen.'); return }
    setErr('')
    // Allowlist check - never trust client-side select value
    const allowedVisa = ['whm', 'res'] as const
    if (!(allowedVisa as readonly string[]).includes(visa)) { setErr('Ungültige Auswahl.'); return }
    setResult(calc(i, w, visa as 'whm' | 'res'))
  }

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">
          <div className="max-w-[560px] lg:max-w-[700px] mx-auto text-center">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>
                Kostenloses Tool
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{
                fontSize: 'clamp(24px,3.2vw,44px)',
                lineHeight: 1.06,
                letterSpacing: '-0.03em',
                marginBottom: '10px',
              }}>
              Steuerrechner für Working Holiday Visum.
            </h1>

            <p className="font-light mx-auto"
              style={{
                fontSize: 'clamp(13px,1.2vw,14.5px)',
                lineHeight: 1.7,
                color: 'rgba(10,15,13,0.6)',
                maxWidth: '38ch',
              }}>
              Schätze deine australische Steuerrückzahlung sofort.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator body */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="max-w-xl mx-auto w-full">

            {/* Left  -  form */}
            <div>
              <div className="space-y-5 mb-6">
                {/* Income */}
                <div>
                  <label htmlFor="ci" className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-2.5">Gesamteinkommen</label>
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
                  <label htmlFor="cw" className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-2.5">Vom Arbeitgeber einbehaltene Steuer</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-subtle">AUD</span>
                    <input
                      id="cw" type="number" placeholder="0" value={withheld} min={0} max={5000000} inputMode="numeric"
                      onChange={e => setWithheld(e.target.value)}
                      className="input-base"
                      style={{ paddingLeft: '56px' }}
                    />
                  </div>
                  <p className="text-[12px] text-subtle mt-2">Findest du auf deinem Payment Summary oder PAYG Summary</p>
                </div>

                {/* Visa */}
                <div>
                  <label htmlFor="cv" className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-2.5">Steuerresidenten-Status</label>
                  <div className="relative">
                    <select
                      id="cv" value={visa} onChange={e => setVisa(e.target.value)}
                      className="input-base appearance-none cursor-pointer pr-10"
                      style={{ color: visa ? undefined : '#8AADA3' }}
                    >
                      <option value="">Wähle deinen Status</option>
                      <option value="whm">Working Holiday Maker (417 / 462)</option>
                      <option value="res">Australischer Steuerresident</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                      <path d="M1 1l5 5 5-5" stroke="#8AADA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {err && <p role="alert" className="text-[13px] text-red-500 font-medium">{err}</p>}
              </div>

              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary w-full flex items-center justify-center"
                style={{ height: '52px', fontSize: '15px', borderRadius: '100px' }}>
                Meine Rückzahlung berechnen →
              </a>

              <p className="text-[12px] text-subtle mt-4 leading-[1.6] text-center">
                Basierend auf aktuellen ATO-Steuersätzen. Das ist nur eine Schätzung - die genaue Rückzahlung steht fest, nachdem wir deine Unterlagen geprüft haben.
              </p>
            </div>


          </div>
        </div>
      </section>

      {/* FAQ section */}
      {faqs.length > 0 && (
        <section style={{ background: '#F5F9F7', paddingTop: '50px', paddingBottom: '50px' }}>
          <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="text-center mb-8">
              <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
                Häufige Fragen
              </p>
              <h2 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
                Zum Steuerrechner
              </h2>
            </div>

            <div className="flex flex-col" style={{ gap: '4px' }}>
              {faqs.map((f, i) => (
                <details key={i} name="calculator-faq" className="contact-faq-item">
                  <summary className="contact-faq-summary">
                    <span style={{ flex: 1 }}>{f.question}</span>
                    <span className="contact-faq-plus" aria-hidden="true">+</span>
                  </summary>
                  <p className="contact-faq-answer">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-white" style={{ paddingTop: '50px', paddingBottom: '60px' }}>
        <div className="max-w-[640px] mx-auto px-5 md:px-8 lg:px-12 text-center">
          <p className="font-semibold uppercase mb-3" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
            Bereit zum Einreichen?
          </p>
          <h2 className="font-serif font-black text-ink mx-auto"
            style={{ fontSize: 'clamp(24px, 2.8vw, 34px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '14px', maxWidth: '20ch' }}>
            Wir holen die maximale Rückzahlung für dich
          </h2>
          <p className="font-light mx-auto" style={{ fontSize: '15px', color: '#587066', lineHeight: 1.7, marginBottom: '24px', maxWidth: '46ch' }}>
            Dieser Rechner gibt dir nur eine Schätzung. Oft finden wir absetzbare Kosten und Steuergutschriften, die deine Rückzahlung noch erhöhen.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center w-full sm:w-auto"
            style={{ minHeight: '54px', padding: '0 36px', fontSize: '15px', minWidth: '260px' }}>
            Steuererklärung starten →
          </a>
        </div>
      </section>
    </>
  )
}
