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
    tax = inc <= 45000 ? inc * 0.15 : 6750 + (inc - 45000) * 0.3
  } else {
    if      (inc <= 18200)  tax = 0
    else if (inc <= 45000)  tax = (inc - 18200) * 0.16
    else if (inc <= 135000) tax = 4288  + (inc - 45000)  * 0.3
    else if (inc <= 190000) tax = 31288 + (inc - 135000) * 0.37
    else                    tax = 56838 + (inc - 190000) * 0.45
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

  if (d > 0) return { label: '推定還付金', amount: money(d),  sub: visa === 'whm' ? 'ワーキングホリデーメーカー税率' : 'オーストラリア税務居住者税率', owing: false, refund, sup, total }
  if (d < 0) return { label: '追加納税額',  amount: money(-d), sub: '追加で納税が必要な可能性があります。ご相談はお問い合わせください。', owing: true,  refund: 0, sup, total }
  return             { label: '相殺', amount: money(0), sub: '還付金も追加納税もありません。', owing: false, refund: 0, sup, total }
}

export function CalculatorClient({ faqs = [] }: Props) {
  const [income,   setIncome]   = useState('')
  const [withheld, setWithheld] = useState('')
  const [visa,     setVisa]     = useState('')
  const [superBal, setSuperBal] = useState('')
  const [result,   setResult]   = useState<Result | null>(null)
  const [err,      setErr]      = useState('')

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
    if (!i || !w || !visa) { setErr('3つの項目をすべてご入力ください。'); return }
    if (w > i) { setErr('源泉徴収税額は総収入を超えることはできません。'); return }
    setErr('')
    const allowedVisa = ['whm', 'res'] as const
    if (!(allowedVisa as readonly string[]).includes(visa)) { setErr('無効な選択です。'); return }
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
                無料ツール
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{
                fontSize: 'clamp(24px,3.2vw,44px)',
                lineHeight: 1.06,
                letterSpacing: '-0.03em',
                marginBottom: '10px',
              }}>
              WHV 税金計算機
            </h1>

            <p className="font-light mx-auto"
              style={{
                fontSize: 'clamp(13px,1.2vw,14.5px)',
                lineHeight: 1.7,
                color: 'rgba(10,15,13,0.6)',
                maxWidth: '38ch',
              }}>
              還付金と、65%のDASP税を引いた後に受け取れる年金額を試算します。
            </p>
          </div>
        </div>
      </section>

      {/* Calculator body */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
          <div className="max-w-xl mx-auto w-full">

            <div>
              <div className="space-y-5 mb-6">
                {/* Income */}
                <div>
                  <label htmlFor="ci" className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-2.5">総収入</label>
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
                  <label htmlFor="cw" className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-2.5">源泉徴収された税額</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-subtle">AUD</span>
                    <input
                      id="cw" type="number" placeholder="0" value={withheld} min={0} max={5000000} inputMode="numeric"
                      onChange={e => setWithheld(e.target.value)}
                      className="input-base"
                      style={{ paddingLeft: '56px' }}
                    />
                  </div>
                  <p className="text-[12px] text-subtle mt-2">Payment SummaryまたはPAYG Summaryに記載されています</p>
                </div>

                {/* Visa */}
                <div>
                  <label htmlFor="cv" className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-2.5">税務居住者ステータス</label>
                  <div className="relative">
                    <select
                      id="cv" value={visa} onChange={e => setVisa(e.target.value)}
                      className="input-base appearance-none cursor-pointer pr-10"
                      style={{ color: visa ? undefined : '#8AADA3' }}
                    >
                      <option value="">ステータスを選択</option>
                      <option value="whm">ワーキングホリデーメーカー（417 / 462）</option>
                      <option value="res">オーストラリア税務居住者</option>
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                      <path d="M1 1l5 5 5-5" stroke="#8AADA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                {/* Superannuation balance - optional */}
                <div>
                  <label htmlFor="cs" className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-muted mb-2.5">
                    年金（Super）残高 <span style={{ textTransform: 'none', letterSpacing: 0, opacity: 0.55 }}>(任意)</span>
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
                  <p className="text-[12px] text-subtle mt-2 leading-[1.6]">スーパー基金の残高証明に記載されています。417・462ビザを一度でも保持した場合、残高全額に65%のDASP税率が適用されます。</p>
                </div>


                {err && <p role="alert" className="text-[13px] text-red-500 font-medium">{err}</p>}
              </div>

              <button type="button" onClick={run}
                className="btn-primary w-full flex items-center justify-center"
                style={{ height: '52px', fontSize: '15px', borderRadius: '100px' }}>
                計算する
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
                        年金の一括請求（DASP）
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '6px' }}>
                        <span style={{ color: 'rgba(10,15,13,0.6)' }}>残高</span>
                        <span style={{ fontWeight: 500 }}>{money(result.sup.gross)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '9px', paddingBottom: '9px', borderBottom: '1px solid rgba(11,82,64,0.1)' }}>
                        <span style={{ color: 'rgba(10,15,13,0.6)' }}>税金 {result.sup.rate}%</span>
                        <span style={{ fontWeight: 500, color: '#9A3412' }}>-{money(result.sup.tax)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0B5240' }}>受取額</span>
                        <span className="font-black" style={{ fontSize: '19px', letterSpacing: '-0.02em', color: '#0B5240' }}>{money(result.sup.net)}</span>
                      </div>
                      <p style={{ fontSize: '11.5px', lineHeight: 1.6, marginTop: '11px', color: 'rgba(10,15,13,0.48)' }}>
                        Superの請求は、オーストラリアを出国し、ビザが失効または取り消された後にのみ可能です。
                      </p>
                    </div>
                  )}

                  {result.sup && !result.owing && (
                    <div style={{ borderTop: '1px solid rgba(11,82,64,0.12)', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span className="font-semibold uppercase" style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(11,82,64,0.75)' }}>
                        合計見込み
                      </span>
                      <span className="font-black" style={{ fontSize: '23px', letterSpacing: '-0.025em', color: '#0B5240' }}>{money(result.total)}</span>
                    </div>
                  )}

                  <div style={{ padding: '0 20px 20px' }}>
                    <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                      className="btn-primary w-full flex items-center justify-center"
                      style={{ height: '48px', fontSize: '14px', borderRadius: '100px' }}>
                      正確な金額を確認 →
                    </a>
                  </div>
                </div>
              )}

              <p className="text-[12px] text-subtle mt-4 leading-[1.6] text-center">
                これは見積もりです、正確な還付額は書類確認後に確定します。
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
                よくある質問
              </p>
              <h2 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
                税金計算機について
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
            申告の準備はできましたか？
          </p>
          <h2 className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(24px, 2.8vw, 34px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '14px', maxWidth: '20ch' }}>
            あなたが受け取れる還付金を最大限に
          </h2>
          <p className="font-light mx-auto" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: '24px', maxWidth: '46ch' }}>
            還付金を増やす控除を見つけます。
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto"
            style={{ minHeight: '54px', padding: '0 36px', fontSize: '15px', minWidth: '260px' }}>
            タックスリターンを始める →
          </a>
        </div>
      </section>
    </>
  )
}
