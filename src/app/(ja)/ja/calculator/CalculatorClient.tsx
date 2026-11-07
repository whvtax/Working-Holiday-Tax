'use client'
import { useEffect, useRef, useState } from 'react'
import { CalculatorView, type CalcStrings } from '@/components/wht/CalculatorBlocks'
import { Mark } from '@/components/wht/Type'
import { waUrl } from '@/lib/wa'
import { trackCalculator, trackWhatsApp } from '@/lib/analytics'

/*
 * Japanese mirror of the reframed calculator. The estimate is a qualifier, not
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

  if (d > 0) return { label: '還付の目安', amount: money(d),  sub: visa === 'whm' ? 'ワーキングホリデーメーカーの税率で計算しています' : 'オーストラリア税務居住者の税率、2%のメディケア税は含みません', owing: false, refund, sup, total }
  if (d < 0) return { label: '納税の目安',  amount: money(-d), sub: 'この数字では追加納税になります。控除で変わることがよくあります。', owing: true,  refund: 0, sup, total }
  return             { label: '差し引きゼロ', amount: money(0), sub: 'この数字では還付も追加納税もありません。', owing: false, refund: 0, sup, total }
}

/** WhatsAppの本文に載る1行。 */
function detailFor(r: Result, hasAbn: boolean): string {
  const bits: string[] = []
  bits.push(r.owing ? `試算では${r.amount}の納税` : `試算の目安は${r.amount}`)
  if (r.sup) bits.push(`スーパーは課税後${money(r.sup.net)}`)
  if (hasAbn) bits.push('ABNでの仕事もあり')
  return bits.join('、')
}

/**
 * 誰もが抱えたまま来る反論を、概算に即して答える。
 *
 * 計算ツールの上ではなく結果の直下に置いた。このページではまさに数字が出た瞬間に
 * この反論が生まれるからである。すでに手元にある数字で計算することと、手元にない
 * ものについて判断することの距離が、各行の主題になっている。
 */
const MYGOV = [
  {
    mygov: '数字をそのまま転記すれば、myGovはそれを受け付けます。',
    us: '同じ数字から始めて、そこに入っていないものを一つずつ確認します。',
  },
  {
    mygov: '居住区分はチェック欄です。どちらがあなたに当てはまるのかは書かれていません。',
    us: '居住区分の判断ひとつで、1年全体の税率が変わることがあります。当社は根拠をもって立場を決めます。',
  },
  {
    mygov: '控除は空欄で、どんな概算もそこを埋めてはくれません。',
    us: 'あなたの職種で何が控除でき、それぞれに何の裏づけが必要かを把握しています。',
  },
  {
    mygov: 'TFNが雇用主に届く前の45%源泉徴収の期間は、どこでも確認されません。',
    us: 'その年度のすべての雇用主を突き合わせ、差額があれば申告に反映します。',
  },
]

const T: CalcStrings = {
  eyebrow: "まずは目安から",
  h1: <>ワーホリのタックスリターン<Mark>計算ツール</Mark></>,
  lead: "収入と源泉徴収額を入力してください。数秒で目安の金額が出ます。",
  incomeLabel: "総収入",
  withheldLabel: "源泉徴収された税額",
  withheldHint: "インカムステートメント（Income Statement）またはPayment Summaryに記載されています。すべての勤務先を合計してください。",
  visaLabel: "税務居住者ステータス",
  visaPlaceholder: "ステータスを選択",
  optWhm: "ワーキングホリデーメーカー（417 / 462）",
  optRes: "オーストラリア税務居住者",
  visaHint: "どちらが当てはまるかは、その年のご本人の事情によって異なります。迷う場合は、このまま当社にご相談ください。",
  superLabel: "スーパー残高",
  optional: "（任意）",
  superHint: "417・462ビザを一度でも保持した場合、DASPの課税対象部分には65%が源泉徴収されます。ワーホリの方は、通常、残高のほぼ全額が課税対象部分です。",
  abnLabel: "ABNでの請求もありました",
  abnHint: "デリバリー、業務委託など請求書を出した仕事です。",
  calculate: "計算する",
  resultNote: "あくまで目安の数字です。実際の金額は、このページでは決められない3つの点で変わります。どちらの居住区分が当てはまるか、メディケア税の免除が使えるか、そしてあなたの職種で何を控除できるか。",
  sendWa: "この試算をWhatsAppで送る",
  sendNote: "入力した数字がメッセージに入ります。返信は約1時間以内。",
  supTitle: "スーパー受取（DASP）",
  balance: "残高",
  taxAt: (rate) => `税金 ${rate}%`,
  youReceive: "受取額",
  supNote: "スーパーの受け取りは、オーストラリアを出国し、ビザが失効または取り消された後に限られます。",
  supLink: "DASP申請の流れはこちら",
  totalLabel: "合計の目安",
  footnote: "この計算ツールが使うのは2025-26年度の税率と、入力された数字だけです。最終的な金額ではありません。",
  doEyebrow: "自分でやる場合",
  doTitle: <>少ない金額を入力すれば、<Mark>myGovはその金額のまま</Mark>提出します。</>,
  doIntro: "概算の精度は、入力した数字までです。そこに入っていないものが、下の4つです。",
  colMygov: "myGovの場合",
  colUs: "当社の場合",
  doStatement: "myGovにログインすることも、IDを連携することも、どの書類がどれかを調べることもありません。ATOとは当社が直接やり取りします。",
  diffTitle: "実際の金額が、この数字と変わる理由",
  diffParas: [
    "3つあり、どれもこのページには入っていません。1つ目は居住区分です。判断ひとつで1年全体の税率が変わることがあります。ご本人の状況によって決まる判断で、最終的な判断はATOが行います。",
    "2つ目はメディケア税です。課税所得の2%が査定の際に自動的に加算されますが、ご本人の事情によっては、そもそも支払う義務がない場合があります。外すにはほとんど誰も申請しない証明書が必要です。",
    "3つ目は控除で、myGovではただの空欄です。ファーム、カフェ、ホスピタリティで、申告できる項目はそれぞれ違います。",
  ],
  linkTaxReturn: 'ワーホリのタックスリターンの流れ',
  linkMedicare: "メディケア税の免除について",
  linkSuper: "帰国後のスーパー受取",
  linkExpenses: "実際に控除できるもの",
  faqTitle: "試算についてのよくある質問",
  ctaTitle: "提出は誰でもできます。仕事はその前にあります。",
  ctaText: "試算した数字をお送りください。あなたの1年で何が効くのかをお伝えします。当社の保証：還付金が当社の料金より少ない場合は、ATOの課税通知書（Notice of Assessment）の発行後に差額を返金します。還付がない場合、またはATOへの納税が発生した場合は、料金の全額をいただきます。この保証の対象は、TFN所得のあるタックスリターンに限られます。",
  ctaNote: "申告書は、ATOへ提出する前に登録タックスエージェントが確認して承認します。",
  ctaButton: "WhatsAppで相談する",
  ctaReply: "返信は約1時間以内。",
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
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch { /* 古いブラウザ */ }
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
    if (!i || safeWit === '' || !visa) { setErr('3つの項目をすべてご入力ください。'); return }
    if (w > i) { setErr('源泉徴収税額は総収入を超えることはできません。'); return }
    setErr('')
    const allowedVisa = ['whm', 'res'] as const
    if (!(allowedVisa as readonly string[]).includes(visa)) { setErr('無効な選択です。'); return }
    setResult(calc(i, w, visa as 'whm' | 'res', s))
    trackCalculator({ lang: 'ja', hasAbn })
  }

  const waHref = result
    ? waUrl({ topic: 'calculator', lang: 'ja', tier: hasAbn ? 'tfn-abn' : 'tfn', detail: detailFor(result, hasAbn) })
    : waUrl({ topic: 'calculator', lang: 'ja' })

  const onWaTap = () => {
    try { navigator.vibrate?.(10) } catch { /* 非対応でも問題ありません */ }
    trackWhatsApp({ position: 'calculator-result', topic: 'calculator', lang: 'ja', tier: hasAbn ? 'tfn-abn' : 'tfn' })
  }

  return (
    <CalculatorView
      t={T}
      hrefs={{ superannuation: '/ja/superannuation', medicare: '/ja/medicare', expenses: '/ja/expenses', taxReturn: '/ja/tax-return' }}
      photo={photo}
      faqs={faqs}
      mygov={MYGOV}
      income={income} withheld={withheld} visa={visa} superBal={superBal} hasAbn={hasAbn} err={err}
      setIncome={setIncome} setWithheld={setWithheld} setVisa={setVisa} setSuperBal={setSuperBal} setHasAbn={setHasAbn}
      onRun={run} result={result} resultRef={resultRef} money={money} waHref={waHref} onWaTap={onWaTap}
    />
  )
}
