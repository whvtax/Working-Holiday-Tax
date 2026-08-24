'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
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

  const rate = visa === 'whm' ? 65 : 35
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
    us: 'その年度のすべての雇用主を突き合わせ、その差額を取り戻します。',
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

  const LABEL = 'block font-semibold text-muted'
  const LABEL_S: React.CSSProperties = { fontSize: '12.5px', letterSpacing: '0.04em', marginBottom: '10px' }
  // 16px未満だとiOSがフォーカス時にページ全体を拡大します。
  const FIELD: React.CSSProperties = { fontSize: '16px', height: '54px' }

  return (
    <>
      {/* ページ冒頭 */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">
          <div className="max-w-[620px] mx-auto text-center">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240' }}>
                まずは目安から
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(25px,3.2vw,40px)', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              ワーホリのタックスリターン計算ツール
            </h1>

            <p className="hero-sub mx-auto"
              style={{ fontSize: '16.5px', lineHeight: 1.8, color: '#2A3C34', maxWidth: '34ch' }}>
              収入と源泉徴収額を入力してください。数秒で目安の金額が出ます。
            </p>
          </div>
        </div>
      </section>

      {/* 計算フォーム */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-14">
          <div className="max-w-xl mx-auto w-full">

            <div className="space-y-5 mb-6">
              <div>
                <label htmlFor="ci" className={LABEL} style={LABEL_S}>総収入</label>
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
                <label htmlFor="cw" className={LABEL} style={LABEL_S}>源泉徴収された税額</label>
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
                  Income StatementまたはPayment Summaryに記載されています。すべての勤務先を合計してください。
                </p>
              </div>

              <div>
                <label htmlFor="cv" className={LABEL} style={LABEL_S}>税務居住者ステータス</label>
                <div className="relative">
                  <select
                    id="cv" value={visa} onChange={e => setVisa(e.target.value)}
                    className="input-base appearance-none cursor-pointer pr-10"
                    style={{ ...FIELD, color: visa ? undefined : '#4C6459' }}
                  >
                    <option value="">ステータスを選択</option>
                    <option value="whm">ワーキングホリデーメーカー（417 / 462）</option>
                    <option value="res">オーストラリア税務居住者</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                    <path d="M1 1l5 5 5-5" stroke="#4C6459" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '8px' }}>
                  ビザの名称からワーキングホリデーメーカーを選ぶ方がほとんどです。
                </p>
              </div>

              <div>
                <label htmlFor="cs" className={LABEL} style={LABEL_S}>
                  スーパー残高 <span style={{ opacity: 0.7 }}>（任意）</span>
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
                <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '8px', lineHeight: 1.7 }}>
                  417・462ビザを一度でも保持した場合、残高全額に65%のDASP税率が適用されます。
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
                      ABNでの請求もありました
                    </span>
                    <span style={{ fontSize: '13px', color: '#4C6459', lineHeight: 1.7 }}>
                      デリバリー、業務委託など請求書を出した仕事です。
                    </span>
                  </span>
                </label>
              </div>

              {err && <p role="alert" style={{ fontSize: '14px', color: '#9A3412', fontWeight: 500 }}>{err}</p>}
            </div>

            <button type="button" onClick={run}
              className="btn-primary w-full flex items-center justify-center"
              style={{ minHeight: '54px', fontSize: '16px', borderRadius: '100px' }}>
              計算する
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
                  <p className="font-semibold"
                    style={{ fontSize: '12px', letterSpacing: '0.08em', marginBottom: '7px', color: result.owing ? '#9A3412' : '#0B5240' }}>
                    {result.label}
                  </p>
                  <p className="font-black"
                    style={{ fontSize: 'clamp(30px,6vw,42px)', lineHeight: 1.04, letterSpacing: '-0.03em', color: result.owing ? '#9A3412' : '#0B5240' }}>
                    {result.amount}
                  </p>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, marginTop: '9px', color: '#2A3C34' }}>
                    {result.sub}
                  </p>
                </div>

                <div style={{ padding: '0 20px 18px' }}>
                  <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#2A3C34', marginBottom: '14px' }}>
                    あくまで目安の数字です。実際の金額は、このページでは決められない3つの点で変わります。どちらの居住区分が当てはまるか、メディケア税の免除が使えるか、そしてあなたの職種で何を控除できるか。それを詰めるのが確認作業です。
                  </p>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={onWaTap}
                    className="btn-primary w-full flex items-center justify-center"
                    style={{ minHeight: '50px', fontSize: '15px', borderRadius: '100px' }}>
                    この試算をWhatsAppで送る
                  </a>
                  <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '9px', textAlign: 'center' }}>
                    入力した数字がメッセージに入ります。返信は約1時間以内。
                  </p>
                </div>

                {result.sup && (
                  <div style={{ borderTop: '1px solid rgba(11,82,64,0.12)', background: 'rgba(255,255,255,0.55)', padding: '16px 20px' }}>
                    <p className="font-semibold"
                      style={{ fontSize: '12px', letterSpacing: '0.08em', color: '#0B5240', marginBottom: '11px' }}>
                      スーパー受取（DASP）
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                      <span style={{ color: '#4C6459' }}>残高</span>
                      <span style={{ fontWeight: 500 }}>{money(result.sup.gross)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '9px', paddingBottom: '9px', borderBottom: '1px solid rgba(11,82,64,0.1)' }}>
                      <span style={{ color: '#4C6459' }}>税金 {result.sup.rate}%</span>
                      <span style={{ fontWeight: 500, color: '#9A3412' }}>-{money(result.sup.tax)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#0B5240' }}>受取額</span>
                      <span className="font-black" style={{ fontSize: '19px', letterSpacing: '-0.02em', color: '#0B5240' }}>{money(result.sup.net)}</span>
                    </div>
                    <p style={{ fontSize: '13px', lineHeight: 1.7, marginTop: '11px', color: '#4C6459' }}>
                      スーパーの受け取りは、オーストラリアを出国し、ビザが失効または取り消された後に限られます。
                      <Link href="/ja/superannuation" style={{ color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                        DASP申請の流れはこちら
                      </Link>
                    </p>
                  </div>
                )}

                {result.sup && !result.owing && (
                  <div style={{ borderTop: '1px solid rgba(11,82,64,0.12)', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="font-semibold" style={{ fontSize: '12.5px', letterSpacing: '0.04em', color: '#0B5240' }}>
                      合計の目安
                    </span>
                    <span className="font-black" style={{ fontSize: '23px', letterSpacing: '-0.025em', color: '#0B5240' }}>{money(result.total)}</span>
                  </div>
                )}
              </div>
            )}

            <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '16px', lineHeight: 1.7 }}>
              この計算ツールが使うのは2025-26年度の税率と、入力された数字だけです。最終的な金額にはなりません。
            </p>
          </div>
        </div>
      </section>

      {/* 反論への回答、概算に即して */}
      <section className="py-10 lg:py-14" style={{ background: '#fff', borderTop: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px]">

            <p className="font-medium uppercase"
              style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#16775C', marginBottom: '12px' }}>
              自分でやる場合
            </p>

            <h2 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(20px,2.5vw,29px)', lineHeight: 1.3, letterSpacing: '-0.015em', marginBottom: '12px' }}>
              <span style={{ display: 'block', color: '#2A3C34', fontWeight: 400 }}>少ない金額を入力すれば、</span>
              <span style={{ display: 'block' }}>myGovはその金額のまま提出します。</span>
            </h2>

            <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#4C6459', maxWidth: '42ch', marginBottom: '20px' }}>
              概算の精度は、入力した数字までです。そこに入っていないものが、下の4つです。
            </p>

            <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
              {MYGOV.map((row, i) => (
                <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                  <div style={{ padding: '15px 18px', background: '#FFFFFF' }}>
                    <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#4C6459', marginBottom: '5px' }}>
                      myGovの場合
                    </p>
                    <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#2A3C34', margin: 0, overflowWrap: 'break-word' }}>{row.mygov}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                    style={{ padding: '15px 18px', background: '#F2FAF7' }}>
                    <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240', marginBottom: '5px' }}>
                      当社の場合
                    </p>
                    <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#080F0D', fontWeight: 500, margin: 0, overflowWrap: 'break-word' }}>{row.us}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-serif" style={{ fontSize: '17px', lineHeight: 1.75, color: '#0B5240', marginTop: '22px', maxWidth: '36ch', fontWeight: 700 }}>
              myGovにログインすることも、IDを連携することも、どの書類がどれかを調べることもありません。ATOとは当社が直接やり取りします。
            </p>
          </div>
        </div>
      </section>

      {/* 確認作業で変わるところ */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px]">
            <h2 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(20px,2.5vw,29px)', lineHeight: 1.3, letterSpacing: '-0.015em', marginBottom: '12px' }}>
              実際の金額がこの数字と変わる理由は。
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#2A3C34', marginBottom: '14px' }}>
              3つあり、どれもこのページには入っていません。1つ目は居住区分です。判断ひとつで1年全体の税率が変わることがあります。ご本人の状況によって決まる判断であり、他のどの要素よりも金額への影響が大きい部分です。
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#2A3C34', marginBottom: '14px' }}>
              2つ目はメディケア税です。課税所得の2%が既定で差し引かれますが、417・462ビザの多くはそもそも支払う義務がありません。外すにはほとんど誰も申請しない証明書が必要です。3つ目は控除で、myGovではただの空欄です。ファーム、カフェ、ホスピタリティで、申告できる項目はそれぞれ違います。
            </p>
            <div className="flex flex-wrap gap-3" style={{ marginTop: '18px' }}>
              <Link href="/ja/medicare"
                className="inline-flex items-center rounded-xl border border-ink/10 transition-colors hover:border-forest-500 hover:text-forest-500"
                style={{ padding: '12px 16px', minHeight: '44px', fontSize: '14px', color: '#080F0D' }}>
                メディケア税の免除について
              </Link>
              <Link href="/ja/superannuation"
                className="inline-flex items-center rounded-xl border border-ink/10 transition-colors hover:border-forest-500 hover:text-forest-500"
                style={{ padding: '12px 16px', minHeight: '44px', fontSize: '14px', color: '#080F0D' }}>
                帰国後のスーパー受取
              </Link>
              <Link href="/ja/expenses"
                className="inline-flex items-center rounded-xl border border-ink/10 transition-colors hover:border-forest-500 hover:text-forest-500"
                style={{ padding: '12px 16px', minHeight: '44px', fontSize: '14px', color: '#080F0D' }}>
                実際に控除できるもの
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
              style={{ fontSize: 'clamp(20px,2.5vw,29px)', lineHeight: 1.3, letterSpacing: '-0.015em', marginBottom: '18px' }}>
              試算についてのよくある質問
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

      {/* 最後のCTA */}
      <section style={{ background: '#0B5240', paddingTop: '50px', paddingBottom: '60px' }}>
        <div className="max-w-[640px] mx-auto px-5 md:px-8 lg:px-12 text-center">
          <h2 className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(22px,2.8vw,32px)', lineHeight: 1.35, letterSpacing: '-0.015em', marginBottom: '14px', maxWidth: '20ch' }}>
            提出は誰でもできます。仕事はその前にあります。
          </h2>
          <p className="mx-auto" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.85, marginBottom: '10px', maxWidth: '34ch' }}>
            試算した数字をお送りください。あなたの1年で何が効くのかをお伝えします。還付金が当社の料金を下回った場合は、差額を返金します。お客様が損をすることはありません。
          </p>
          <p className="mx-auto" style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '22px', maxWidth: '34ch' }}>
            申告書は、ATOへ提出する前に登録税理士が確認して承認します。
          </p>
          <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={onWaTap}
            className="btn-primary w-full sm:w-auto"
            style={{ minHeight: '54px', padding: '0 36px', fontSize: '16px', minWidth: '260px' }}>
            WhatsAppで相談する
          </a>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '12px' }}>
            返信は約1時間以内。
          </p>
        </div>
      </section>
    </>
  )
}
