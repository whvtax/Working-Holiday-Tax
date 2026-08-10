'use client'
import { useState } from 'react'
import { WA_URL } from '@/lib/constants'

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

  if (d > 0) return { label: 'Geschätzte Rückzahlung', amount: money(d),  sub: visa === 'whm' ? 'Working Holiday Maker Steuersatz' : 'Australischer Steuerresidentensatz (ohne 2 % Medicare Levy)', owing: false, refund, sup, total }
  if (d < 0) return { label: 'Steuerschuld',  amount: money(-d), sub: 'Du musst eventuell Steuer nachzahlen. Schreib uns für eine Beratung.', owing: true,  refund: 0, sup, total }
  return             { label: 'Ausgeglichen', amount: money(0), sub: 'Keine Rückzahlung, keine Steuerschuld.', owing: false, refund: 0, sup, total }
}

export function CalculatorClient({ faqs = [] }: Props) {
  const [income,   setIncome]   = useState('')
  const [withheld, setWithheld] = useState('')
  const [visa,     setVisa]     = useState('')
  const [superBal, setSuperBal] = useState('')
  const [result,   setResult]   = useState<Result | null>(null)
  const [err,      setErr]      = useState('')

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
    if (!i || safeWit === '' || !visa) { setErr('Bitte fülle alle drei Felder aus.'); return }
    if (w > i) { setErr('Die einbehaltene Steuer kann nicht höher sein als dein Gesamteinkommen.'); return }
    setErr('')
    // Allowlist check - never trust client-side select value
    const allowedVisa = ['whm', 'res'] as const
    if (!(allowedVisa as readonly string[]).includes(visa)) { setErr('Ungültige Auswahl.'); return }
    setResult(calc(i, w, visa as 'whm' | 'res', s))
  }

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
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
              WHV Steuerrechner
            </h1>

            <p className="font-light mx-auto"
              style={{
                fontSize: 'clamp(13px,1.2vw,14.5px)',
                lineHeight: 1.7,
                color: 'rgba(10,15,13,0.6)',
                maxWidth: '38ch',
              }}>
              Steuerrückerstattung und Superannuation nach Abzug der 65-%-DASP-Steuer, in zwei Minuten geschätzt.
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
                  <label htmlFor="cv" className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-2.5">Steuerresidentenstatus</label>
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
                {/* Superannuation balance - optional */}
                <div>
                  <label htmlFor="cs" className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-2.5">
                    Superannuation-Guthaben <span style={{ textTransform: 'none', letterSpacing: 0, opacity: 0.55 }}>(optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-subtle">AUD</span>
                    <input
                      id="cs" type="number" placeholder="0" value={superBal} min={0} max={5000000} inputMode="numeric"
                      onChange={e => setSuperBal(e.target.value)}
                      className="input-base"
                      style={{ paddingLeft: '56px' }}
                    />
                  </div>
                  <p className="text-[12px] text-subtle mt-2 leading-[1.6]">Steht auf der Abrechnung deines Super-Fonds. Wer jemals ein 417- oder 462-Visum hatte, zahlt auf das gesamte Guthaben den DASP-Satz von 65 %.</p>
                </div>


                {err && <p role="alert" className="text-[13px] text-red-500 font-medium">{err}</p>}
              </div>

              <button type="button" onClick={run}
                className="btn-primary w-full flex items-center justify-center"
                style={{ height: '52px', fontSize: '15px', borderRadius: '100px' }}>
                Berechnen
              </button>

              {result && (
                <div role="status" aria-live="polite"
                  style={{
                    marginTop: '20px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: `1.5px solid ${result.owing ? '#FDBA74' : '#C8EAE0'}`,
                    background: result.owing ? '#FEF3F0' : '#EAF6F1',
                  }}>

                  <div style={{ padding: '22px 20px 18px', textAlign: 'center' }}>
                    <p className="font-semibold uppercase"
                      style={{ fontSize: '10.5px', letterSpacing: '0.14em', marginBottom: '7px', color: result.owing ? 'rgba(154,52,18,0.8)' : 'rgba(11,82,64,0.7)' }}>
                      {result.label}
                    </p>
                    <p className="font-black"
                      style={{ fontSize: 'clamp(30px,6vw,42px)', lineHeight: 1.04, letterSpacing: '-0.03em', color: result.owing ? '#9A3412' : '#0B5240' }}>
                      {result.amount}
                    </p>
                    <p style={{ fontSize: '12.5px', lineHeight: 1.6, marginTop: '9px', color: 'rgba(10,15,13,0.58)' }}>
                      {result.sub}
                    </p>
                  </div>

                  {result.sup && (
                    <div style={{ borderTop: '1px solid rgba(11,82,64,0.12)', background: 'rgba(255,255,255,0.55)', padding: '16px 20px' }}>
                      <p className="font-semibold uppercase"
                        style={{ fontSize: '10.5px', letterSpacing: '0.14em', color: 'rgba(11,82,64,0.7)', marginBottom: '11px' }}>
                        Superannuation (DASP)
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '6px' }}>
                        <span style={{ color: 'rgba(10,15,13,0.6)' }}>Guthaben</span>
                        <span style={{ fontWeight: 500 }}>{money(result.sup.gross)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '9px', paddingBottom: '9px', borderBottom: '1px solid rgba(11,82,64,0.1)' }}>
                        <span style={{ color: 'rgba(10,15,13,0.6)' }}>Steuer {result.sup.rate} %</span>
                        <span style={{ fontWeight: 500, color: '#9A3412' }}>-{money(result.sup.tax)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0B5240' }}>Du erhältst</span>
                        <span className="font-black" style={{ fontSize: '19px', letterSpacing: '-0.02em', color: '#0B5240' }}>{money(result.sup.net)}</span>
                      </div>
                      <p style={{ fontSize: '11.5px', lineHeight: 1.6, marginTop: '11px', color: 'rgba(10,15,13,0.48)' }}>
                        Das Super-Guthaben wird erst ausgezahlt, wenn du Australien verlassen hast und dein Visum abgelaufen oder annulliert ist.
                      </p>
                    </div>
                  )}

                  {result.sup && !result.owing && (
                    <div style={{ borderTop: '1px solid rgba(11,82,64,0.12)', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span className="font-semibold uppercase" style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(11,82,64,0.75)' }}>
                        Geschätzte Summe
                      </span>
                      <span className="font-black" style={{ fontSize: '23px', letterSpacing: '-0.025em', color: '#0B5240' }}>{money(result.total)}</span>
                    </div>
                  )}

                  <div style={{ padding: '0 20px 20px' }}>
                    <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                      className="btn-primary w-full flex items-center justify-center"
                      style={{ height: '48px', fontSize: '14px', borderRadius: '100px' }}>
                      Genaue Zahl erhalten →
                    </a>
                  </div>
                </div>
              )}

              <p className="text-[12px] text-subtle mt-4 leading-[1.6] text-center">
                Das ist nur eine Schätzung, die genaue Rückzahlung steht fest, nachdem wir deine Unterlagen geprüft haben.
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
      <section style={{ background: '#0B5240', paddingTop: '50px', paddingBottom: '60px' }}>
        <div className="max-w-[640px] mx-auto px-5 md:px-8 lg:px-12 text-center">
          <p className="font-semibold uppercase mb-3" style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.14em' }}>
            Bereit zum Einreichen?
          </p>
          <h2 className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(24px, 2.8vw, 34px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '14px', maxWidth: '20ch' }}>
            Hol dir die maximale Rückerstattung, die dir zusteht
          </h2>
          <p className="font-light mx-auto" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: '24px', maxWidth: '46ch' }}>
            Wir finden Abzüge, die deine Rückerstattung erhöhen.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto"
            style={{ minHeight: '54px', padding: '0 36px', fontSize: '15px', minWidth: '260px' }}>
            Steuererklärung starten →
          </a>
        </div>
      </section>
    </>
  )
}
