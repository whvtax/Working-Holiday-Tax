'use client'
import { useEffect, useRef, useState } from 'react'
import { CalculatorView, type CalcStrings } from '@/components/wht/CalculatorBlocks'
import { Mark } from '@/components/wht/Type'
import { waUrl } from '@/lib/wa'
import { trackCalculator, trackWhatsApp } from '@/lib/analytics'

/*
 * Versión en español de la calculadora. La estimación es una forma de
 * orientarse, no el producto, y el resultado se desplaza hasta la vista porque
 * en el móvil quedaba bajo el pliegue.
 */

type SuperCalc = { gross: number; rate: number; tax: number; net: number }

type Result = { label: string; amount: string; sub: string; owing: boolean; refund: number; sup: SuperCalc | null; total: number }

type FAQ = { question: string; answer: string }

type Props = {
  faqs?: FAQ[]
  photo?: React.ReactNode
}

const money = (n: number) => Math.round(n).toLocaleString('es-AR') + '\u00A0AUD'

function calc(inc: number, wit: number, visa: 'whm' | 'res', supBal: number): Result {
  let tax = 0
  if (visa === 'whm') {
    // Escala WHM 2025-26: 15 % hasta 45.000, luego 30 / 37 / 45 %, sin tax-free threshold
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
  // 65 % para quien haya tenido una visa 462 o 417 en algún momento.
  // 35 % es la tasa del componente gravado para otros residentes temporales.
  // 5 Nov 2026: was `visa === 'whm' ? 65 : 35`. Everyone this calculator serves has held
  // a 417 or 462 visa, so choosing "tax resident" (for the refund scale) must not drop
  // the DASP estimate to 35%: a $10,000 balance showed $6,500 instead of $3,500.
  const rate = 65
  const sup: SuperCalc | null =
    supBal > 0
      ? { gross: supBal, rate, tax: supBal * (rate / 100), net: supBal * (1 - rate / 100) }
      : null

  const refund = d > 0 ? d : 0
  const total = refund + (sup ? sup.net : 0)

  if (d > 0) return { label: 'Devolución orientativa', amount: money(d),  sub: visa === 'whm' ? 'Con las tasas de working holiday maker' : 'Con las tasas de residente fiscal australiano, antes del Medicare levy del 2 %', owing: false, refund, sup, total }
  if (d < 0) return { label: 'Impuesto a pagar (orientativo)',  amount: money(-d), sub: 'Con estas cifras te saldría un impuesto a pagar. Las deducciones suelen cambiarlo.', owing: true,  refund: 0, sup, total }
  return             { label: 'Saldo orientativo', amount: money(0), sub: 'Con estas cifras, ni debes nada ni te devuelven nada.', owing: false, refund: 0, sup, total }
}

/** La línea de resumen que viaja en el mensaje de WhatsApp. */
function detailFor(r: Result, hasAbn: boolean): string {
  const bits: string[] = []
  bits.push(r.owing ? `la estimación mostró ${r.amount} a pagar` : `estimación ${r.amount}`)
  if (r.sup) bits.push(`super ${money(r.sup.net)} tras el impuesto del DASP`)
  if (hasAbn) bits.push('también trabajé con ABN')
  return bits.join(', ')
}

/**
 * La objeción con la que llega cada persona, respondida sobre una estimación.
 * Va justo debajo del resultado, porque la objeción aparece en cuanto sale la
 * cifra: ya tengo un número, lo presento yo.
 */
const MYGOV = [
  {
    mygov: 'Copias la cifra y myGov la acepta.',
    us: 'Partimos de la misma cifra y después repasamos lo que no incluye.',
  },
  {
    mygov: 'La residencia es una casilla. Nada te dice cuál de las respuestas es la cierta para ti.',
    us: 'Bien interpretada, la residencia puede cambiar las tasas de todo tu año. Tomamos una postura y la respaldamos.',
  },
  {
    mygov: 'Las deducciones son un cuadro en blanco, y ninguna estimación puede rellenarlo por ti.',
    us: 'Sabemos qué puede reclamar tu tipo de trabajo y qué tiene que respaldar cada reclamo.',
  },
  {
    mygov: 'Nada revisa las semanas anteriores a que tu tax file number llegara al empleador, retenidas al 45 %.',
    us: 'Conciliamos cada empleador que tuviste en el año y reclamamos esa diferencia.',
  },
]

const T: CalcStrings = {
  eyebrow: "Primero, una cifra aproximada",
  h1: <>Calculadora de <Mark>devolución de impuestos</Mark> en Australia</>,
  lead: "Escribe lo que ganaste y lo que te retuvieron. En unos segundos recibes una cifra orientativa.",
  incomeLabel: "Ingresos totales",
  withheldLabel: "Impuesto retenido por tus empleadores",
  withheldHint: "Figura en tu income statement o payment summary, sumado entre todos los trabajos.",
  visaLabel: "Residencia fiscal",
  visaPlaceholder: "Elige tu situación",
  optWhm: "Working holiday maker (462 / 417)",
  optRes: "Residente fiscal australiano",
  visaHint: "La mayoría elige working holiday maker, porque es la visa que tienen.",
  superLabel: "Saldo de la super",
  optional: "(opcional)",
  superHint: "Si alguna vez tuviste una visa 462 o 417, se aplica el 65 % del DASP a todo el saldo.",
  abnLabel: "También facturé con un ABN",
  abnHint: "Reparto, trabajo como subcontratista, todo lo que facturaste.",
  calculate: "Calcular",
  resultNote: "Tómalo como una cifra orientativa. El número real depende de tres cosas que esta página no puede resolver: qué residencia fiscal es la cierta en tu caso, si se aplica la exención del Medicare levy y qué puede deducir tu tipo de trabajo.",
  sendWa: "Envíanos esto por WhatsApp",
  sendNote: "Tus cifras van en el mensaje. Respondemos en aproximadamente una hora.",
  supTitle: "Super (DASP)",
  balance: "Saldo",
  taxAt: (rate) => `Impuesto al ${rate} %`,
  youReceive: "Recibes",
  supNote: "La super solo se paga cuando ya saliste de Australia y tu visa venció o fue cancelada.",
  supLink: "Cómo funciona el reclamo del DASP",
  totalLabel: "Total orientativo",
  footnote: "La calculadora usa las tasas 2025-26 y solo las cifras que escribes, así que no es tu número final.",
  doEyebrow: "Hacerlo por tu cuenta",
  doTitle: <>Si escribes un número bajo en myGov, <Mark>un número bajo es lo que se presenta.</Mark></>,
  doIntro: "Una estimación vale tanto como los datos que escribiste. Esto es lo que myGov no revisa por ti.",
  colMygov: "En myGov",
  colUs: "Con nosotros",
  doStatement: "No tendrás que entrar a myGov, vincular una identificación ni averiguar qué formulario es cuál. Preparamos todo por ti, y un agente fiscal registrado lo revisa y lo aprueba antes de presentarlo ante la ATO.",
  diffTitle: "¿Qué hace distinto al número real de este?",
  diffParas: [
    "Hay tres cosas que esta página no puede calcular. La primera es tu residencia fiscal. Bien interpretada, puede cambiar las tasas de todo tu año. Es una valoración de tus circunstancias y pesa más que todo lo demás junto.",
    "La segunda es el Medicare levy. Si se aplica a tu año depende de tu situación individual, y lo revisamos como parte de la preparación.",
    "La tercera son las deducciones, un cuadro en blanco en myGov. Lo que puede reclamar quien trabaja en el campo no es lo que reclama un barista o alguien de la cocina.",
  ],
  linkTaxReturn: 'Cómo se presenta el tax return',
  linkMedicare: "La exención del Medicare levy",
  linkSuper: "Cómo reclamar tu super al irte",
  linkExpenses: "Qué puedes deducir de verdad",
  faqTitle: "Preguntas sobre la estimación",
  ctaTitle: "Cualquiera puede enviar una declaración. El trabajo de verdad va antes.",
  ctaText: "Envíanos tus cifras y te contamos qué está en juego en tu año. Nuestra garantía: si tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes dinero a la ATO, se aplica la tarifa completa. La garantía cubre solo las declaraciones con ingresos con TFN.",
  ctaNote: "Revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO.",
  ctaButton: "Escríbenos por WhatsApp",
  ctaReply: "Respondemos en aproximadamente una hora.",
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

  // En pantallas de 375 px el resultado queda bajo el pliegue y el botón parecía no hacer nada.
  // Se desplaza hasta él y se respeta prefers-reduced-motion.
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
    // Se quita todo lo que no sea dígito o punto decimal antes de convertir
    const safeInc = income.replace(/[^0-9.]/g, '')
    const safeWit = withheld.replace(/[^0-9.]/g, '')
    const safeSup = superBal.replace(/[^0-9.]/g, '')
    const rawI = parseFloat(safeInc)
    const rawW = parseFloat(safeWit)
    const rawS = parseFloat(safeSup)
    // Comprobación de NaN y límites razonables
    const i = isFinite(rawI) ? Math.min(Math.max(rawI, 0), 10_000_000) : 0
    const w = isFinite(rawW) ? Math.min(Math.max(rawW, 0), 5_000_000)  : 0
    const s = isFinite(rawS) ? Math.min(Math.max(rawS, 0), 5_000_000) : 0
    if (!i || safeWit === '' || !visa) { setErr('Completa los tres campos.'); return }
    if (w > i) { setErr('El impuesto retenido no puede ser mayor que el ingreso total.'); return }
    setErr('')
    // Lista de valores permitidos: nunca se confía en el valor del select
    const allowedVisa = ['whm', 'res'] as const
    if (!(allowedVisa as readonly string[]).includes(visa)) { setErr('Selección no válida.'); return }
    setResult(calc(i, w, visa as 'whm' | 'res', s))
    trackCalculator({ lang: 'es', hasAbn })
  }

  const waHref = result
    ? waUrl({ topic: 'calculator', lang: 'es', tier: hasAbn ? 'tfn-abn' : 'tfn', detail: detailFor(result, hasAbn) })
    : waUrl({ topic: 'calculator', lang: 'es' })

  const onWaTap = () => {
    try { navigator.vibrate?.(10) } catch { /* unsupported, which is fine */ }
    trackWhatsApp({ position: 'calculator-result', topic: 'calculator', lang: 'es', tier: hasAbn ? 'tfn-abn' : 'tfn' })
  }

  return (
    <CalculatorView
      t={T}
      hrefs={{ superannuation: '/es/superannuation', medicare: '/es/medicare', expenses: '/es/expenses', taxReturn: '/es/devolucion-impuestos-australia' }}
      photo={photo}
      faqs={faqs}
      mygov={MYGOV}
      income={income} withheld={withheld} visa={visa} superBal={superBal} hasAbn={hasAbn} err={err}
      setIncome={setIncome} setWithheld={setWithheld} setVisa={setVisa} setSuperBal={setSuperBal} setHasAbn={setHasAbn}
      onRun={run} result={result} resultRef={resultRef} money={money} waHref={waHref} onWaTap={onWaTap}
    />
  )
}
