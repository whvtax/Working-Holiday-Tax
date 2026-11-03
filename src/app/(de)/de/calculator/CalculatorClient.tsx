'use client'
import { useEffect, useRef, useState } from 'react'
import { CalculatorView, type CalcStrings } from '@/components/wht/CalculatorBlocks'
import { Mark } from '@/components/wht/Type'
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
  photo?: React.ReactNode
}

const money = (n: number) => Math.round(n).toLocaleString('de-DE') + ' $'

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

  if (d > 0) return { label: 'Grobe Erstattung', amount: money(d),  sub: visa === 'whm' ? 'Steuersatz für Working Holiday Maker angewendet' : 'Steuersatz für australische Steuerresidenten, ohne die 2 % Medicare Levy', owing: false, refund, sup, total }
  if (d < 0) return { label: 'Grobe Steuerschuld',  amount: money(-d), sub: 'Mit diesen Zahlen ergibt sich eine Nachzahlung. Absetzbare Kosten ändern das oft.', owing: true,  refund: 0, sup, total }
  return             { label: 'Ausgeglichen', amount: money(0), sub: 'Mit diesen Zahlen weder Erstattung noch Nachzahlung.', owing: false, refund: 0, sup, total }
}

/** Die Zeile, die in die WhatsApp-Nachricht wandert. */
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
    us: 'Richtig eingeordnet, kann der Wohnsitz die Sätze für dein ganzes Jahr ändern. Wir prüfen ihn im Einzelfall, und am Ende entscheidet das ATO.',
  },
  {
    mygov: 'Abzüge sind ein leeres Feld, und keine Schätzung füllt es für dich.',
    us: 'Wir wissen, was deine Art von Arbeit absetzen darf und welcher Nachweis dahinter stehen muss.',
  },
  {
    mygov: 'Niemand prüft die Wochen, in denen vor Eingang deiner TFN 45 % einbehalten wurden.',
    us: 'Wir gleichen jeden Arbeitgeber des Jahres ab und schließen diese Lücke.',
  },
]

const T: CalcStrings = {
  eyebrow: "Erst mal grob",
  h1: <><Mark>Steuerrechner</Mark> für Work and Travel in Australien</>,
  lead: "Trag ein, was du verdient hast und was einbehalten wurde. Die grobe Zahl kommt in Sekunden zurück.",
  incomeLabel: "Gesamteinkommen",
  withheldLabel: "Von Arbeitgebern einbehaltene Steuer",
  withheldHint: "Steht auf deinem Income Statement oder Payment Summary, zusammengezählt über alle Jobs.",
  visaLabel: "Steuerresidentenstatus",
  visaPlaceholder: "Wähle deinen Status",
  optWhm: "Working Holiday Maker (417 / 462)",
  optRes: "Australischer Steuerresident",
  visaHint: "Welcher Status für dich gilt, hängt von deinen Umständen ab. Der Rechner nimmt, was du auswählst.",
  superLabel: "Superannuation-Guthaben",
  optional: "(optional)",
  superHint: "Wer jemals ein 417- oder 462-Visum hatte, zahlt den DASP-Satz von 65 % auf den steuerpflichtigen Anteil, bei Working Holiday Makern praktisch das ganze Guthaben.",
  abnLabel: "Ich habe zusätzlich über eine ABN abgerechnet",
  abnHint: "Lieferdienst, Subunternehmer, alles, wofür du Rechnungen gestellt hast.",
  calculate: "Berechnen",
  resultNote: "Nimm das als groben Anhaltspunkt. Die echte Zahl hängt an drei Dingen, die diese Seite nicht klären kann: welcher Residentenstatus für dich gilt, ob die Medicare-Levy-Befreiung greift und was du in deinem Job absetzen kannst.",
  sendWa: "Zahlen per WhatsApp schicken",
  sendNote: "Deine Zahlen stehen dann schon in der Nachricht. Antwort in etwa einer Stunde.",
  supTitle: "Superannuation (DASP)",
  balance: "Guthaben",
  taxAt: (rate) => `Steuer ${rate} %`,
  youReceive: "Ausgezahlt wird",
  supNote: "Super wird erst ausgezahlt, wenn du Australien verlassen hast und dein Visum abgelaufen oder annulliert ist.",
  supLink: "So läuft der DASP-Antrag",
  totalLabel: "Grobe Summe",
  footnote: "Der Rechner nutzt die Sätze für 2025/26 und ausschließlich die Zahlen, die du eingibst. Deine endgültige Zahl ist er also nicht.",
  doEyebrow: "Selbst machen",
  doTitle: <>Tipp bei myGov eine zu niedrige Zahl ein und <Mark>genau die wird eingereicht.</Mark></>,
  doIntro: "Eine Schätzung ist nur so gut wie das, was du eingetippt hast, und drei Dinge fehlen darin.",
  colMygov: "Auf myGov",
  colUs: "Mit uns",
  doStatement: "Du musst dich nie bei myGov einloggen, keinen Ausweis verknüpfen und nicht herausfinden, welches Formular welches ist. Wir regeln das direkt mit dem ATO.",
  diffTitle: "Was macht die echte Zahl anders als diese?",
  diffParas: [
    "Drei Dinge, und keins davon steht auf dieser Seite. Erstens dein Residentenstatus. Richtig eingeordnet, kann er die Sätze für dein ganzes Jahr ändern. Es ist eine Beurteilung deiner Umstände, und am Ende entscheidet das ATO.",
    "Zweitens die Medicare Levy. Sie beträgt 2 % des zu versteuernden Einkommens, wird standardmäßig angesetzt, und ob sie bei dir überhaupt anfällt, hängt vom Einzelfall ab. Wegfallen kann sie mit einer Bescheinigung, die kaum jemand beantragt.",
    "Drittens die absetzbaren Kosten, bei myGov ein leeres Feld. Was ein Erntehelfer, ein Barista und jemand aus der Gastronomie jeweils absetzen kann, ist nicht dieselbe Liste.",
  ],
  linkMedicare: "Die Medicare-Levy-Befreiung",
  linkSuper: "Super nach der Abreise zurückholen",
  linkExpenses: "Was du absetzen kannst",
  faqTitle: "Fragen zur Schätzung",
  ctaTitle: "Absenden kann jeder. Die Arbeit passiert davor.",
  ctaText: "Schick uns deine Zahlen und wir sagen dir, was in deinem Jahr drin ist. Unsere Garantie: Ist deine Steuerrückerstattung geringer als unsere Gebühr, erstatten wir dir nach dem Notice of Assessment die Differenz. Gibt es keine Rückerstattung oder schuldest du dem ATO stattdessen Geld, gilt die volle Gebühr.",
  ctaNote: "Von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird.",
  ctaButton: "Schreib uns auf WhatsApp",
  ctaReply: "Antwort in etwa einer Stunde.",
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

  return (
    <CalculatorView
      t={T}
      hrefs={{ superannuation: '/de/superannuation', medicare: '/de/medicare', expenses: '/de/expenses' }}
      photo={photo}
      faqs={faqs}
      mygov={MYGOV}
      income={income} withheld={withheld} visa={visa} superBal={superBal} hasAbn={hasAbn} err={err}
      setIncome={setIncome} setWithheld={setWithheld} setVisa={setVisa} setSuperBal={setSuperBal} setHasAbn={setHasAbn}
      onRun={run} result={result} resultRef={resultRef} money={money} waHref={waHref} onWaTap={onWaTap}
    />
  )
}
