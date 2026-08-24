'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { waUrl } from '@/lib/wa'
import { trackCalculator, trackWhatsApp } from '@/lib/analytics'

/*
 * German mirror of the reframed calculator. The estimate is a qualifier, not
 * the product, and the result is scrolled into view because on a phone it
 * rendered below the fold and the button looked broken.
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
    // WHM scale 2025-26: 15% to $45k, then 30% / 37% / 45%, no tax-free threshold
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

  const rate = visa === 'whm' ? 65 : 35
  const sup: SuperCalc | null =
    supBal > 0
      ? { gross: supBal, rate, tax: supBal * (rate / 100), net: supBal * (1 - rate / 100) }
      : null

  const refund = d > 0 ? d : 0
  const total = refund + (sup ? sup.net : 0)

  if (d > 0) return { label: 'Grobe Rückzahlung', amount: money(d),  sub: visa === 'whm' ? 'Steuersatz für Working Holiday Maker angewendet' : 'Steuersatz für australische Steuerresidenten, ohne die 2 % Medicare Levy', owing: false, refund, sup, total }
  if (d < 0) return { label: 'Grobe Steuerschuld',  amount: money(-d), sub: 'Mit diesen Zahlen ergibt sich eine Nachzahlung. Absetzbare Kosten ändern das oft.', owing: true,  refund: 0, sup, total }
  return             { label: 'Ausgeglichen', amount: money(0), sub: 'Mit diesen Zahlen weder Rückzahlung noch Nachzahlung.', owing: false, refund: 0, sup, total }
}

/** Die Zeile, die in die WhatsApp Nachricht wandert. */
function detailFor(r: Result, hasAbn: boolean): string {
  const bits: string[] = []
  bits.push(r.owing ? `Schätzung zeigte ${r.amount} Nachzahlung` : `Schätzung ${r.amount}`)
  if (r.sup) bits.push(`Super ${money(r.sup.net)} nach DASP-Steuer`)
  if (hasAbn) bits.push('auch mit ABN gearbeitet')
  return bits.join(', ')
}

/**
 * Der Einwand, mit dem jeder Lead ankommt, hier konkret zur Schätzung.
 *
 * Er steht direkt unter dem Ergebnis und nicht über dem Rechner, weil er auf
 * dieser Seite genau in dem Moment auftaucht, in dem die Zahl erscheint: Ich
 * habe jetzt eine Zahl, das reiche ich selbst ein. Jede Zeile handelt vom
 * Abstand zwischen Rechnen mit bekannten Zahlen und einer Entscheidung über die
 * unbekannten.
 */
const MYGOV = [
  {
    mygov: 'Du überträgst die Zahl und myGov nimmt sie an.',
    us: 'Wir starten mit derselben Zahl und gehen dann durch, was sie nicht enthält.',
  },
  {
    mygov: 'Der Residentenstatus ist ein Häkchen. Welche Antwort für dich stimmt, steht nirgends.',
    us: 'Ein deutscher Pass kann den vollen Steuerfreibetrag tragen. Wir legen uns darauf fest und stehen dafür ein.',
  },
  {
    mygov: 'Werbungskosten sind ein leeres Feld, und keine Schätzung füllt es für dich.',
    us: 'Wir wissen, was deine Art von Arbeit absetzen darf und welcher Nachweis hinter jedem Posten stehen muss.',
  },
  {
    mygov: 'Niemand prüft die Wochen, bevor deine Steuernummer beim Arbeitgeber war, einbehalten mit 45 %.',
    us: 'Wir gleichen jeden Arbeitgeber des Jahres ab und holen diese Lücke zurück.',
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
    const safeInc = income.replace(/[^0-9.]/g, '')
    const safeWit = withheld.replace(/[^0-9.]/g, '')
    const safeSup = superBal.replace(/[^0-9.]/g, '')
    const rawI = parseFloat(safeInc)
    const rawW = parseFloat(safeWit)
    const rawS = parseFloat(safeSup)
    const i = isFinite(rawI) ? Math.min(Math.max(rawI, 0), 10_000_000) : 0
    const w = isFinite(rawW) ? Math.min(Math.max(rawW, 0), 5_000_000)  : 0
    const s = isFinite(rawS) ? Math.min(Math.max(rawS, 0), 5_000_000) : 0
    if (!i || safeWit === '' || !visa) { setErr('Bitte fülle alle drei Felder aus.'); return }
    if (w > i) { setErr('Die einbehaltene Steuer kann nicht höher sein als dein Gesamteinkommen.'); return }
    setErr('')
    const allowedVisa = ['whm', 'res'] as const
    if (!(allowedVisa as readonly string[]).includes(visa)) { setErr('Ungültige Auswahl.'); return }
    setResult(calc(i, w, visa as 'whm' | 'res', s))
    trackCalculator({ lang: 'de', hasAbn })
  }

  const waHref = result
    ? waUrl({ topic: 'calculator', lang: 'de', tier: hasAbn ? 'tfn-abn' : 'tfn', detail: detailFor(result, hasAbn) })
    : waUrl({ topic: 'calculator', lang: 'de' })

  const onWaTap = () => {
    try { navigator.vibrate?.(10) } catch { /* nicht unterstützt, das ist in Ordnung */ }
    trackWhatsApp({ position: 'calculator-result', topic: 'calculator', lang: 'de', tier: hasAbn ? 'tfn-abn' : 'tfn' })
  }

  const LABEL = 'block font-semibold uppercase text-muted'
  const LABEL_S: React.CSSProperties = { fontSize: '11.5px', letterSpacing: '0.1em', marginBottom: '10px' }
  // 16px Minimum, sonst zoomt iOS beim Antippen die ganze Seite.
  const FIELD: React.CSSProperties = { fontSize: '16px', height: '54px' }

  return (
    <>
      {/* Kopfbereich */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">
          <div className="max-w-[620px] mx-auto text-center">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240' }}>
                Erst mal grob
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(26px,3.2vw,42px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '12px' }}>
              Steuerrechner für Work and Travel in Australien
            </h1>

            <p className="hero-sub mx-auto"
              style={{ fontSize: '16.5px', lineHeight: 1.62, color: '#2A3C34', maxWidth: '46ch' }}>
              Trag ein, was du verdient hast und was einbehalten wurde. Die grobe Zahl kommt in ein paar
              Sekunden zurück.
            </p>
          </div>
        </div>
      </section>

      {/* Rechner */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-14">
          <div className="max-w-xl mx-auto w-full">

            <div className="space-y-5 mb-6">
              <div>
                <label htmlFor="ci" className={LABEL} style={LABEL_S}>Gesamteinkommen</label>
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

              <div>
                <label htmlFor="cw" className={LABEL} style={LABEL_S}>Von Arbeitgebern einbehaltene Steuer</label>
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
                  Steht auf deinem Income Statement oder Payment Summary, zusammengezählt über alle Jobs.
                </p>
              </div>

              <div>
                <label htmlFor="cv" className={LABEL} style={LABEL_S}>Steuerresidentenstatus</label>
                <div className="relative">
                  <select
                    id="cv" value={visa} onChange={e => setVisa(e.target.value)}
                    className="input-base appearance-none cursor-pointer pr-10"
                    style={{ ...FIELD, color: visa ? undefined : '#4C6459' }}
                  >
                    <option value="">Wähle deinen Status</option>
                    <option value="whm">Working Holiday Maker (417 / 462)</option>
                    <option value="res">Australischer Steuerresident</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                    <path d="M1 1l5 5 5-5" stroke="#4C6459" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '8px' }}>
                  Die meisten wählen Working Holiday Maker, weil das auf dem Visum steht. Was für dich
                  zutrifft, ist eine Beurteilung, keine Einstellung.
                </p>
              </div>

              <div>
                <label htmlFor="cs" className={LABEL} style={LABEL_S}>
                  Superannuation Guthaben <span style={{ textTransform: 'none', letterSpacing: 0, opacity: 0.7 }}>(optional)</span>
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
                  Steht auf der Abrechnung deines Superfonds. Wer jemals ein 417 oder 462 Visum hatte,
                  zahlt auf das gesamte Guthaben den DASP-Satz von 65 %.
                </p>
              </div>

              <div className="rounded-xl" style={{ border: '1.5px solid #E2EFE9', background: '#F7FBF9' }}>
                <label htmlFor="cabn" className="flex items-start gap-3 cursor-pointer" style={{ padding: '14px 16px', minHeight: '44px' }}>
                  <input
                    id="cabn" type="checkbox" checked={hasAbn}
                    onChange={e => setHasAbn(e.target.checked)}
                    style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: '#0B5240', flexShrink: 0 }}
                  />
                  <span>
                    <span className="font-semibold text-ink" style={{ fontSize: '15px', display: 'block' }}>
                      Ich habe zusätzlich über eine ABN abgerechnet
                    </span>
                    <span style={{ fontSize: '13px', color: '#4C6459', lineHeight: 1.6 }}>
                      Lieferdienst, Subunternehmer, alles, wofür du Rechnungen gestellt hast. Davon wurde
                      nichts einbehalten, dieser Rechner sieht es also nicht.
                    </span>
                  </span>
                </label>
              </div>

              {err && <p role="alert" style={{ fontSize: '14px', color: '#9A3412', fontWeight: 500 }}>{err}</p>}
            </div>

            <button type="button" onClick={run}
              className="btn-primary w-full flex items-center justify-center"
              style={{ minHeight: '54px', fontSize: '16px', borderRadius: '100px' }}>
              Berechnen
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

                <div style={{ padding: '0 20px 18px' }}>
                  <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#2A3C34', marginBottom: '14px' }}>
                    Nimm das als groben Anhaltspunkt. Die echte Zahl hängt an drei Dingen, die diese Seite
                    nicht klären kann: welcher Residentenstatus für dich tatsächlich gilt, ob die Medicare
                    Levy Befreiung greift und was du in deinem Job absetzen kannst. Genau das arbeiten wir
                    bei der Prüfung heraus.
                  </p>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={onWaTap}
                    className="btn-primary w-full flex items-center justify-center"
                    style={{ minHeight: '50px', fontSize: '15px', borderRadius: '100px' }}>
                    Zahlen per WhatsApp schicken
                  </a>
                  <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '9px', textAlign: 'center' }}>
                    Deine Zahlen stehen dann schon in der Nachricht. Antwort in etwa einer Stunde.
                  </p>
                </div>

                {result.sup && (
                  <div style={{ borderTop: '1px solid rgba(11,82,64,0.12)', background: 'rgba(255,255,255,0.55)', padding: '16px 20px' }}>
                    <p className="font-semibold uppercase"
                      style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#0B5240', marginBottom: '11px' }}>
                      Superannuation (DASP)
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                      <span style={{ color: '#4C6459' }}>Guthaben</span>
                      <span style={{ fontWeight: 500 }}>{money(result.sup.gross)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '9px', paddingBottom: '9px', borderBottom: '1px solid rgba(11,82,64,0.1)' }}>
                      <span style={{ color: '#4C6459' }}>Steuer {result.sup.rate} %</span>
                      <span style={{ fontWeight: 500, color: '#9A3412' }}>-{money(result.sup.tax)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#0B5240' }}>Du erhältst</span>
                      <span className="font-black" style={{ fontSize: '19px', letterSpacing: '-0.02em', color: '#0B5240' }}>{money(result.sup.net)}</span>
                    </div>
                    <p style={{ fontSize: '13px', lineHeight: 1.6, marginTop: '11px', color: '#4C6459' }}>
                      Super wird erst ausgezahlt, wenn du Australien verlassen hast und dein Visum
                      abgelaufen oder annulliert ist.{' '}
                      <Link href="/de/superannuation" style={{ color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                        So läuft der DASP-Antrag
                      </Link>
                    </p>
                  </div>
                )}

                {result.sup && !result.owing && (
                  <div style={{ borderTop: '1px solid rgba(11,82,64,0.12)', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="font-semibold uppercase" style={{ fontSize: '11.5px', letterSpacing: '0.1em', color: '#0B5240' }}>
                      Grobe Summe
                    </span>
                    <span className="font-black" style={{ fontSize: '23px', letterSpacing: '-0.025em', color: '#0B5240' }}>{money(result.total)}</span>
                  </div>
                )}
              </div>
            )}

            <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '16px', lineHeight: 1.6 }}>
              Der Rechner nutzt die Sätze für 2025-26 und ausschließlich die Zahlen, die du eingibst.
              Deine endgültige Zahl ist er also nicht.
            </p>
          </div>
        </div>
      </section>

      {/* Der Einwand, konkret zur Schätzung */}
      <section className="py-10 lg:py-14" style={{ background: '#fff', borderTop: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px]">

            <p className="font-medium uppercase"
              style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#16775C', marginBottom: '12px' }}>
              Selbst machen
            </p>

            <h2 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.16, letterSpacing: '-0.025em', marginBottom: '12px' }}>
              <span style={{ display: 'block', color: '#2A3C34', fontWeight: 400 }}>Tipp bei myGov eine zu niedrige Zahl ein{' '}</span>
              <span style={{ display: 'block' }}>und genau die wird eingereicht.{' '}</span>
            </h2>

            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#4C6459', maxWidth: '56ch', marginBottom: '20px' }}>
              Eine Schätzung ist nur so gut wie das, was du eingetippt hast, und vier Dinge fehlen darin.
            </p>

            <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
              {MYGOV.map((row, i) => (
                <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                  <div style={{ padding: '15px 18px', background: '#FFFFFF' }}>
                    <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#4C6459', marginBottom: '5px' }}>
                      Auf myGov
                    </p>
                    <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#2A3C34', margin: 0, overflowWrap: 'break-word', hyphens: 'auto' }}>{row.mygov}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                    style={{ padding: '15px 18px', background: '#F2FAF7' }}>
                    <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240', marginBottom: '5px' }}>
                      Mit uns
                    </p>
                    <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#080F0D', fontWeight: 500, margin: 0, overflowWrap: 'break-word', hyphens: 'auto' }}>{row.us}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-serif" style={{ fontSize: '18px', lineHeight: 1.45, color: '#0B5240', marginTop: '22px', maxWidth: '48ch', fontWeight: 700 }}>
              Du wirst dich nie bei myGov einloggen, keinen Ausweis verknüpfen und nicht herausfinden müssen, welches
              Formular welches ist. Wir regeln das direkt mit dem ATO.
            </p>
          </div>
        </div>
      </section>

      {/* Was die Prüfung ergänzt */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px]">
            <h2 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.16, letterSpacing: '-0.025em', marginBottom: '12px' }}>
              Was macht die echte Zahl anders als diese?
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#2A3C34', marginBottom: '14px' }}>
              Drei Dinge, und keins davon steht auf dieser Seite. Erstens dein Residentenstatus. Mit einem
              deutschen Pass kann der volle Freibetrag von 18.200 $ gelten statt des Working Holiday Satzes
              ab dem ersten Dollar, und kein Tageszähler entscheidet das. Es ist eine Beurteilung deiner
              Umstände, und sie ist mehr wert als alles andere zusammen.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#2A3C34', marginBottom: '14px' }}>
              Zweitens die Medicare Levy. Sie beträgt 2 % des zu versteuernden Einkommens, wird
              standardmäßig abgezogen, und die meisten mit 417 oder 462 Visum schuldeten sie nie.
              Weggenommen wird sie mit einer Bescheinigung, die kaum jemand beantragt. Drittens die
              absetzbaren Kosten, bei myGov ein leeres Feld. Was eine Erntehelferin, ein Barista und
              jemand im Hospitality jeweils absetzen kann, ist nicht dieselbe Liste.
            </p>
            <div className="flex flex-wrap gap-3" style={{ marginTop: '18px' }}>
              <Link href="/de/medicare"
                className="inline-flex items-center rounded-xl border border-ink/10 transition-colors hover:border-forest-500 hover:text-forest-500"
                style={{ padding: '12px 16px', minHeight: '44px', fontSize: '14px', color: '#080F0D' }}>
                Die Medicare Levy Befreiung
              </Link>
              <Link href="/de/superannuation"
                className="inline-flex items-center rounded-xl border border-ink/10 transition-colors hover:border-forest-500 hover:text-forest-500"
                style={{ padding: '12px 16px', minHeight: '44px', fontSize: '14px', color: '#080F0D' }}>
                Super nach der Abreise zurückholen
              </Link>
              <Link href="/de/expenses"
                className="inline-flex items-center rounded-xl border border-ink/10 transition-colors hover:border-forest-500 hover:text-forest-500"
                style={{ padding: '12px 16px', minHeight: '44px', fontSize: '14px', color: '#080F0D' }}>
                Was du absetzen kannst
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section style={{ background: '#fff', paddingTop: '50px', paddingBottom: '50px' }}>
          <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12">
            <h2 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.16, letterSpacing: '-0.025em', marginBottom: '18px' }}>
              Fragen zur Schätzung
            </h2>

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

      {/* Abschluss CTA */}
      <section style={{ background: '#0B5240', paddingTop: '50px', paddingBottom: '60px' }}>
        <div className="max-w-[640px] mx-auto px-5 md:px-8 lg:px-12 text-center">
          <h2 className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(23px,2.8vw,33px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '14px', maxWidth: '22ch' }}>
            Absenden kann jeder. Die Arbeit passiert davor.
          </h2>
          <p className="mx-auto" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '10px', maxWidth: '46ch' }}>
            Schick uns deine Zahlen und wir sagen dir, was in deinem Jahr drin ist. Wenn deine
            Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz.
          </p>
          <p className="mx-auto" style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: '22px', maxWidth: '46ch' }}>
            Von unserem Team vorbereitet, von einem registrierten Steuerberater geprüft und freigegeben,
            bevor es beim ATO eingereicht wird.
          </p>
          <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={onWaTap}
            className="btn-primary w-full sm:w-auto"
            style={{ minHeight: '54px', padding: '0 36px', fontSize: '16px', minWidth: '260px' }}>
            Schreib uns auf WhatsApp
          </a>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '12px' }}>
            Antwort in etwa einer Stunde. Frag erst mal alles, was du wissen willst.
          </p>
        </div>
      </section>
    </>
  )
}
