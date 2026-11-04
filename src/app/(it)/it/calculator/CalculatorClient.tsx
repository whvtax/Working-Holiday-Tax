'use client'
import { useEffect, useRef, useState } from 'react'
import { CalculatorView, type CalcStrings } from '@/components/wht/CalculatorBlocks'
import { Mark } from '@/components/wht/Type'
import { waUrl } from '@/lib/wa'
import { trackCalculator, trackWhatsApp } from '@/lib/analytics'

/*
 * Italian version of the reframed calculator. The estimate is a qualifier, not
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

const money = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '\u00a0$\u00a0AUD'

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

  // Departing Australia Superannuation Payment: 65% for anyone who has held a
  // 417 or 462 visa, 35% for other temporary residents.
  const rate = visa === 'whm' ? 65 : 35
  const sup: SuperCalc | null =
    supBal > 0
      ? { gross: supBal, rate, tax: supBal * (rate / 100), net: supBal * (1 - rate / 100) }
      : null

  const refund = d > 0 ? d : 0
  const total = refund + (sup ? sup.net : 0)

  if (d > 0) return { label: 'Rimborso indicativo', amount: money(d),  sub: 'Stima indicativa, prima del 2% di Medicare levy', owing: false, refund, sup, total }
  if (d < 0) return { label: 'Tasse da pagare (indicative)',  amount: money(-d), sub: 'Con questi numeri risultano tasse da pagare. Le deduzioni spesso cambiano il quadro.', owing: true,  refund: 0, sup, total }
  return             { label: 'Saldo indicativo', amount: money(0), sub: 'Con questi numeri non devi niente e non ti torna niente.', owing: false, refund: 0, sup, total }
}

/** The one-line summary that travels into the WhatsApp prefill. */
function detailFor(r: Result, hasAbn: boolean): string {
  const bits: string[] = []
  bits.push(r.owing ? `la stima indicava ${r.amount} da pagare` : `stima ${r.amount}`)
  if (r.sup) bits.push(`super ${money(r.sup.net)} dopo la tassa DASP`)
  if (hasAbn) bits.push('ho lavorato anche con un ABN')
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
    mygov: 'Riporti la cifra e myGov la accetta.',
    us: 'Partiamo dalla stessa cifra, poi controlliamo cosa non include.',
  },
  {
    mygov: 'La residenza fiscale è una casella da spuntare. Nessuno ti dice quale risposta è vera per te.',
    us: 'Dipende dai fatti individuali del tuo anno. La valutiamo noi, caso per caso, e la decisione finale spetta all’ATO.',
  },
  {
    mygov: 'Le deduzioni sono una casella vuota, e nessuna stima può compilarla al posto tuo.',
    us: 'Sappiamo cosa può dedurre il tuo tipo di lavoro e cosa deve esserci a supporto di ogni deduzione.',
  },
  {
    mygov: 'Nessuno controlla le settimane in cui il datore di lavoro non aveva ancora il tuo TFN e ti ha trattenuto il 45%.',
    us: 'Riconciliamo ogni datore di lavoro dell’anno e controlliamo quella differenza.',
  },
]

const T: CalcStrings = {
  eyebrow: 'Prima una cifra approssimativa',
  h1: <><Mark>Calcolatore</Mark> del rimborso tasse in Australia (Working Holiday)</>,
  lead: 'Inserisci quanto hai guadagnato e quanto è stato trattenuto. In pochi secondi ti torna una cifra indicativa.',
  incomeLabel: 'Reddito totale',
  withheldLabel: 'Tasse trattenute dai datori di lavoro',
  withheldHint: 'Lo trovi nell’income statement o nel payment summary, sommato su tutti i lavori.',
  visaLabel: 'Residenza fiscale',
  visaPlaceholder: 'Scegli la tua situazione',
  optWhm: 'Working holiday maker (417 / 462)',
  optRes: 'Residente fiscale australiano',
  visaHint: 'Una scelta indicativa: la tua situazione reale la verifichiamo noi.',
  superLabel: 'Saldo della superannuation',
  optional: '(facoltativo)',
  superHint: 'Se hai mai avuto un visto 417 o 462, sul saldo si applica l’aliquota DASP del 65% (qui calcolata sull’intero importo).',
  abnLabel: 'Ho fatturato anche con un ABN',
  abnHint: 'Consegne, lavori da subappaltatore, qualsiasi cosa per cui hai emesso fattura.',
  calculate: 'Calcola',
  resultNote: 'Considera questa cifra solo indicativa. Il numero vero dipende da tre cose che questa pagina non può stabilire: quale residenza fiscale è vera per te, se vale l’esenzione dalla Medicare levy e cosa puoi dedurre con il tuo lavoro. La stima non include la Medicare levy del 2%.',
  sendWa: 'Mandaci questi dati su WhatsApp',
  sendNote: 'I tuoi numeri finiscono già nel messaggio. Risposta in circa un’ora.',
  supTitle: 'Superannuation (DASP)',
  balance: 'Saldo',
  taxAt: (rate) => `Tassa al ${rate}%`,
  youReceive: 'Ricevi',
  supNote: 'La super viene pagata solo dopo che hai lasciato l’Australia e il tuo visto è scaduto o è stato annullato.',
  supLink: 'Come funziona la richiesta DASP',
  totalLabel: 'Totale indicativo',
  footnote: 'Il calcolatore usa le aliquote 2025/26 e solo i numeri che inserisci, quindi non è la tua cifra definitiva.',
  doEyebrow: 'Fai da te',
  doTitle: <>Su myGov, la cifra che scrivi <Mark>è quella che viene inviata.</Mark></>,
  doIntro: 'Una stima vale quanto quello che hai scritto, e qui mancano tre cose.',
  colMygov: 'Su myGov',
  colUs: 'Con noi',
  doStatement: 'Non devi mai entrare in myGov, collegare un documento australiano o capire quale modulo è quale. Ce la vediamo direttamente noi con l’ATO.',
  diffTitle: 'Cosa rende diverso il numero vero da questo?',
  diffParas: [
    'Tre cose, e nessuna è su questa pagina. La prima è la tua residenza fiscale. Dipende dai fatti individuali del tuo anno ed è l’ATO a decidere. La valutiamo noi, caso per caso.',
    'La seconda è la Medicare levy. È il 2% del reddito imponibile, viene applicata di default, e se si applica nel tuo caso dipende dalla tua situazione individuale.',
    'La terza sono le spese deducibili, su myGov una casella vuota. Chi raccoglie frutta, chi fa il barista e chi lavora in cantiere non possono dedurre le stesse cose.',
  ],
  linkMedicare: 'L’esenzione dalla Medicare levy',
  linkSuper: 'Recuperare la super dopo la partenza',
  linkExpenses: 'Cosa puoi dedurre',
  faqTitle: 'Domande sulla stima',
  ctaTitle: 'Inviare è facile. Il lavoro vero viene prima.',
  ctaText: 'Mandaci i tuoi numeri e ti diciamo cosa c’è nel tuo anno. La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa. La garanzia vale solo per le dichiarazioni con reddito TFN.',
  ctaNote: 'Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.',
  ctaButton: 'Scrivici su WhatsApp',
  ctaReply: 'Risposta in circa un’ora.',
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
    if (!i || safeWit === '' || !visa) { setErr('Compila tutti e tre i campi.'); return }
    if (w > i) { setErr('Le tasse trattenute non possono superare il tuo reddito totale.'); return }
    setErr('')
    const allowedVisa = ['whm', 'res'] as const
    if (!(allowedVisa as readonly string[]).includes(visa)) { setErr('Scelta non valida.'); return }
    setResult(calc(i, w, visa as 'whm' | 'res', s))
    trackCalculator({ lang: 'it', hasAbn })
  }

  const waHref = result
    ? waUrl({ topic: 'calculator', lang: 'it', tier: hasAbn ? 'tfn-abn' : 'tfn', detail: detailFor(result, hasAbn) })
    : waUrl({ topic: 'calculator', lang: 'it' })

  const onWaTap = () => {
    try { navigator.vibrate?.(10) } catch { /* not supported, which is fine */ }
    trackWhatsApp({ position: 'calculator-result', topic: 'calculator', lang: 'it', tier: hasAbn ? 'tfn-abn' : 'tfn' })
  }

  return (
    <CalculatorView
      t={T}
      hrefs={{ superannuation: '/it/superannuation', medicare: '/it/medicare', expenses: '/it/expenses' }}
      photo={photo}
      faqs={faqs}
      mygov={MYGOV}
      income={income} withheld={withheld} visa={visa} superBal={superBal} hasAbn={hasAbn} err={err}
      setIncome={setIncome} setWithheld={setWithheld} setVisa={setVisa} setSuperBal={setSuperBal} setHasAbn={setHasAbn}
      onRun={run} result={result} resultRef={resultRef} money={money} waHref={waHref} onWaTap={onWaTap}
    />
  )
}
