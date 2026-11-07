'use client'
import { useEffect, useRef, useState } from 'react'
import { CalculatorView, type CalcStrings } from '@/components/wht/CalculatorBlocks'
import { Mark } from '@/components/wht/Type'
import { waUrl } from '@/lib/wa'
import { trackCalculator, trackWhatsApp } from '@/lib/analytics'

/*
 * Version française du calculateur reformulé. L'estimation est un outil de
 * qualification, pas le produit, et le résultat est amené à l'écran car sur
 * téléphone il s'affichait sous la ligne de flottaison.
 */

type SuperCalc = { gross: number; rate: number; tax: number; net: number }

type Result = { label: string; amount: string; sub: string; owing: boolean; refund: number; sup: SuperCalc | null; total: number }

type FAQ = { question: string; answer: string }

type Props = {
  faqs?: FAQ[]
  photo?: React.ReactNode
}

const money = (n: number) => Math.round(n).toLocaleString('fr-FR') + ' $'

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
  // 5 Nov 2026: was 65 or 35 by the visa choice; every reader here has held a 417 or 462 visa, so DASP is 65%.
  const rate = 65
  const sup: SuperCalc | null =
    supBal > 0
      ? { gross: supBal, rate, tax: supBal * (rate / 100), net: supBal * (1 - rate / 100) }
      : null

  const refund = d > 0 ? d : 0
  const total = refund + (sup ? sup.net : 0)

  if (d > 0) return { label: 'Remboursement indicatif', amount: money(d),  sub: visa === 'whm' ? 'Taux des working holiday makers appliqués' : 'Taux des résidents fiscaux australiens appliqués, avant la Medicare levy de 2 %', owing: false, refund, sup, total }
  if (d < 0) return { label: 'Impôt à payer indicatif',  amount: money(-d), sub: 'Avec ces chiffres, il y a de l’impôt à payer. Les déductions changent souvent la donne.', owing: true,  refund: 0, sup, total }
  return             { label: 'Solde indicatif', amount: money(0), sub: 'Avec ces chiffres, rien à payer et rien à récupérer.', owing: false, refund: 0, sup, total }
}

/** La ligne de résumé qui part dans le message WhatsApp. */
function detailFor(r: Result, hasAbn: boolean): string {
  const bits: string[] = []
  bits.push(r.owing ? `estimation : ${r.amount} à payer` : `estimation : ${r.amount}`)
  if (r.sup) bits.push(`super ${money(r.sup.net)} après la taxe DASP`)
  if (hasAbn) bits.push('a aussi travaillé avec un ABN')
  return bits.join(', ')
}

/**
 * L'objection avec laquelle chaque contact arrive, posée au sujet d'une
 * estimation. Elle se place juste sous le résultat : le chiffre est là, donc
 * "je peux déposer moi-même". Chaque ligne porte sur l'écart entre un calcul
 * sur les chiffres connus et une décision sur ceux qu'on ne connaît pas.
 */
const MYGOV = [
  {
    mygov: 'Vous recopiez le chiffre et myGov l’accepte.',
    us: 'Nous partons du même chiffre, puis nous passons en revue ce qu’il ne contient pas.',
  },
  {
    mygov: 'La résidence fiscale est une case à cocher. Rien ne vous dit quelle réponse est la bonne pour vous.',
    us: 'Selon votre situation, la résidence fiscale peut changer les taux de toute votre année. Nous prenons position et nous l’assumons.',
  },
  {
    mygov: 'Les déductions sont une case vide, et aucune estimation ne peut la remplir pour vous.',
    us: 'Nous savons ce que votre type de travail peut réclamer, et ce qui doit justifier chaque déduction.',
  },
  {
    mygov: 'Rien ne vérifie les semaines précédant l’arrivée de votre TFN chez votre employeur, prélevées à 45 %.',
    us: 'Nous rapprochons chaque employeur de l’année et nous réclamons cet écart.',
  },
]

const T: CalcStrings = {
  eyebrow: "D’abord un ordre de grandeur",
  h1: <>Calculateur de <Mark>tax return</Mark> pour PVT en Australie</>,
  lead: "Indiquez ce que vous avez gagné et ce qui a été prélevé. Un chiffre indicatif s’affiche en quelques secondes.",
  incomeLabel: "Revenu total gagné",
  withheldLabel: "Impôt retenu par vos employeurs",
  withheldHint: "Sur votre income statement ou payment summary, additionné sur tous vos jobs.",
  visaLabel: "Statut de résidence fiscale",
  visaPlaceholder: "Choisissez votre statut",
  optWhm: "Working holiday maker (417 / 462)",
  optRes: "Résident fiscal australien",
  visaHint: "Ce qui s’applique dépend des faits de votre année, et c’est l’ATO qui décide. Prenez working holiday maker comme point de départ.",
  superLabel: "Solde de la super (superannuation)",
  optional: "(facultatif)",
  superHint: "Si vous avez un jour détenu un visa 417 ou 462, le taux DASP de 65 % s’applique à la part imposable du solde.",
  abnLabel: "J’ai aussi facturé avec un ABN",
  abnHint: "Livraison, sous-traitance, tout ce que vous avez facturé.",
  calculate: "Calculer",
  resultNote: "Prenez ce résultat comme une indication. Le vrai chiffre dépend de trois choses que cette page ne peut pas trancher : quelle résidence fiscale est la vôtre, si l’exemption de la Medicare levy s’applique, et ce que votre type de travail permet de déduire.",
  sendWa: "Nous l’envoyer sur WhatsApp",
  sendNote: "Vos chiffres sont ajoutés au message. Réponse en général dans l’heure.",
  supTitle: "Super (DASP)",
  balance: "Solde",
  taxAt: (rate) => `Taxe à ${rate} %`,
  youReceive: "Vous recevez",
  supNote: "La super n’est versée qu’après votre départ d’Australie et l’expiration ou l’annulation de votre visa.",
  supLink: "Comment fonctionne la demande DASP",
  totalLabel: "Total indicatif",
  footnote: "Le calculateur utilise les taux 2025-26 et uniquement les chiffres que vous saisissez, et les montants sont en dollars australiens (AUD). Ce n’est pas votre chiffre final.",
  doEyebrow: "Le faire soi-même",
  doTitle: <>Saisissez un petit chiffre dans myGov et <Mark>c’est un petit chiffre qui sera déposé.</Mark></>,
  doIntro: "Une estimation ne vaut que ce que vous y avez saisi, et quatre choses lui manquent.",
  colMygov: "Sur myGov",
  colUs: "Avec nous",
  doStatement: "Vous n’aurez jamais à vous connecter à myGov, à lier une pièce d’identité ou à deviner quel formulaire remplir. Nous traitons directement avec l’ATO.",
  diffTitle: "Qu’est-ce qui rend le vrai chiffre différent de celui-ci ?",
  diffParas: [
    "Trois choses, dont aucune n’est sur cette page. La première est votre résidence fiscale. Elle peut changer les taux qui s’appliquent à une année. Elle dépend de votre situation personnelle, est examinée au cas par cas, et c’est l’ATO qui décide.",
    "La deuxième est la Medicare levy. Elle représente 2 % du revenu imposable, elle est ajoutée par défaut au calcul de votre impôt, et selon votre droit à Medicare, vous ne l’avez peut-être jamais due. La faire retirer passe par une attestation que presque personne ne demande.",
    "La troisième, ce sont les déductions, une case vide sur myGov. Ce qu’un ouvrier agricole, un barista et un employé de la restauration peuvent chacun réclamer n’est pas la même liste.",
  ],
  linkTaxReturn: 'Comment se passe la tax return en PVT',
  linkMedicare: "L’exemption de la Medicare levy",
  linkSuper: "Réclamer sa super après son départ",
  linkExpenses: "Ce que vous pouvez vraiment déduire",
  faqTitle: "Questions sur l’estimation",
  ctaTitle: "N’importe qui peut cliquer sur « envoyer ». Le vrai travail se fait avant.",
  ctaText: "Envoyez-nous vos chiffres et nous vous dirons ce qui est en jeu pour votre année. Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique. La garantie ne s’applique qu’aux déclarations avec revenus sous TFN.",
  ctaNote: "Vérifié et validé par un agent fiscal enregistré avant d’être déposé auprès de l’ATO.",
  ctaButton: "Écrivez-nous sur WhatsApp",
  ctaReply: "Réponse en général dans l’heure.",
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
    if (!i || safeWit === '' || !visa) { setErr('Remplissez les trois champs.'); return }
    if (w > i) { setErr('L’impôt retenu ne peut pas dépasser le revenu total.'); return }
    setErr('')
    // Allowlist check - never trust client-side select value
    const allowedVisa = ['whm', 'res'] as const
    if (!(allowedVisa as readonly string[]).includes(visa)) { setErr('Sélection invalide.'); return }
    setResult(calc(i, w, visa as 'whm' | 'res', s))
    trackCalculator({ lang: 'fr', hasAbn })
  }

  const waHref = result
    ? waUrl({ topic: 'calculator', lang: 'fr', tier: hasAbn ? 'tfn-abn' : 'tfn', detail: detailFor(result, hasAbn) })
    : waUrl({ topic: 'calculator', lang: 'fr' })

  const onWaTap = () => {
    try { navigator.vibrate?.(10) } catch { /* unsupported, which is fine */ }
    trackWhatsApp({ position: 'calculator-result', topic: 'calculator', lang: 'fr', tier: hasAbn ? 'tfn-abn' : 'tfn' })
  }

  return (
    <CalculatorView
      t={T}
      hrefs={{ superannuation: '/fr/superannuation', medicare: '/fr/medicare', expenses: '/fr/expenses', taxReturn: '/fr/tax-return-australie-pvt' }}
      photo={photo}
      faqs={faqs}
      mygov={MYGOV}
      income={income} withheld={withheld} visa={visa} superBal={superBal} hasAbn={hasAbn} err={err}
      setIncome={setIncome} setWithheld={setWithheld} setVisa={setVisa} setSuperBal={setSuperBal} setHasAbn={setHasAbn}
      onRun={run} result={result} resultRef={resultRef} money={money} waHref={waHref} onWaTap={onWaTap}
    />
  )
}
