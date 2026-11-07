'use client'

import type { ReactNode, RefObject } from 'react'
import Link from 'next/link'
import { Accordion } from '@/components/ui/Accordion'
import { Hero } from './Hero'
import { Section } from './Section'
import { Lead } from './Type'
import { LinkButton } from './Button'
import { Compare, blocks } from './Blocks'
import styles from './CalculatorBlocks.module.css'

export interface CalcResultView {
  label: string
  amount: string
  sub: string
  owing: boolean
  total: number
  sup: { gross: number; rate: number; tax: number; net: number } | null
}

/** Every word the calculator page prints around the form. Result labels come from the page's own calc(). */
export interface CalcStrings {
  eyebrow: string
  h1: ReactNode
  lead: string
  incomeLabel: string
  withheldLabel: string
  withheldHint: string
  visaLabel: string
  visaPlaceholder: string
  optWhm: string
  optRes: string
  visaHint: string
  superLabel: string
  optional: string
  superHint: string
  abnLabel: string
  abnHint: string
  calculate: string
  resultNote: string
  sendWa: string
  sendNote: string
  supTitle: string
  balance: string
  taxAt: (rate: number) => string
  youReceive: string
  supNote: string
  supLink: string
  totalLabel: string
  footnote: string
  doEyebrow: string
  doTitle: ReactNode
  doIntro: string
  colMygov: string
  colUs: string
  doStatement: string
  diffTitle: string
  diffParas: string[]
  linkMedicare: string
  linkSuper: string
  linkExpenses: string
  /** Optional link to the tax return service or guide page (5 Nov 2026). Shown only with hrefs.taxReturn. */
  linkTaxReturn?: string
  faqTitle: string
  ctaTitle: string
  ctaText: string
  ctaNote: string
  ctaButton: string
  ctaReply: string
}

export interface CalcHrefs { superannuation: string; medicare: string; expenses: string; taxReturn?: string }

export interface CalcViewProps {
  t: CalcStrings
  hrefs: CalcHrefs
  photo?: ReactNode
  faqs: { question: string; answer: string }[]
  mygov: { mygov: string; us: string }[]
  income: string
  withheld: string
  visa: string
  superBal: string
  hasAbn: boolean
  err: string
  setIncome: (v: string) => void
  setWithheld: (v: string) => void
  setVisa: (v: string) => void
  setSuperBal: (v: string) => void
  setHasAbn: (v: boolean) => void
  onRun: () => void
  result: CalcResultView | null
  resultRef: RefObject<HTMLDivElement | null>
  money: (n: number) => string
  waHref: string
  onWaTap: () => void
}

/** Layout and copy of the calculator page. State and arithmetic stay in the page's CalculatorClient. */
export function CalculatorView({ resultRef, ...p }: CalcViewProps) {
  const { t, result } = p
  return (
    <>
      <div className={blocks.underHeader}>
        <Hero eyebrow={t.eyebrow} title={t.h1}>
          <div className="hero-sub"><Lead>{t.lead}</Lead></div>
        </Hero>
      </div>

      {p.photo}

      <Section tone="pale" width="wide">
        <div className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="ci" className={styles.label}>{t.incomeLabel}</label>
            <div className={styles.inputWrap}>
              <span className={styles.prefix}>AUD</span>
              <input id="ci" type="number" placeholder="0" value={p.income} min={0} max={10000000}
                inputMode="decimal" enterKeyHint="next" onChange={e => p.setIncome(e.target.value)}
                className={`input-base ${styles.input} ${styles.withPrefix}`} />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="cw" className={styles.label}>{t.withheldLabel}</label>
            <div className={styles.inputWrap}>
              <span className={styles.prefix}>AUD</span>
              <input id="cw" type="number" placeholder="0" value={p.withheld} min={0} max={5000000}
                inputMode="decimal" enterKeyHint="next" onChange={e => p.setWithheld(e.target.value)}
                className={`input-base ${styles.input} ${styles.withPrefix}`} />
            </div>
            <p className={styles.hint}>{t.withheldHint}</p>
          </div>

          <div className={styles.field}>
            <label htmlFor="cv" className={styles.label}>{t.visaLabel}</label>
            <div className={styles.inputWrap}>
              <select id="cv" value={p.visa} onChange={e => p.setVisa(e.target.value)}
                className={`input-base ${styles.input} ${styles.select}`} style={{ color: p.visa ? undefined : '#525A57' }}>
                <option value="">{t.visaPlaceholder}</option>
                <option value="whm">{t.optWhm}</option>
                <option value="res">{t.optRes}</option>
              </select>
              <svg className={styles.chevron} width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                <path d="M1 1l5 5 5-5" stroke="#525A57" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className={styles.hint}>{t.visaHint}</p>
          </div>

          <div className={styles.field}>
            <label htmlFor="cs" className={styles.label}>
              {t.superLabel} <span className={styles.optional}>{t.optional}</span>
            </label>
            <div className={styles.inputWrap}>
              <span className={styles.prefix}>AUD</span>
              <input id="cs" type="number" placeholder="0" value={p.superBal} min={0} max={5000000}
                inputMode="decimal" enterKeyHint="done" onChange={e => p.setSuperBal(e.target.value)}
                className={`input-base ${styles.input} ${styles.withPrefix}`} />
            </div>
            <p className={styles.hint}>{t.superHint}</p>
          </div>

          <label htmlFor="cabn" className={styles.check}>
            <input id="cabn" type="checkbox" checked={p.hasAbn} onChange={e => p.setHasAbn(e.target.checked)} className={styles.checkbox} />
            <span>
              <span className={styles.checkTitle}>{t.abnLabel}</span>
              <span className={styles.hint}>{t.abnHint}</span>
            </span>
          </label>

          {p.err && <p role="alert" className={styles.error}>{p.err}</p>}

          <button type="button" onClick={p.onRun} className={styles.run}>{t.calculate}</button>

          {result && (
            <div ref={resultRef} tabIndex={-1} role="status" aria-live="polite"
              className={`${styles.result} ${result.owing ? styles.resultOwing : ''}`}>
              <div className={styles.resultTop}>
                <p className={styles.resultLabel}>{result.label}</p>
                <p className={styles.resultAmount}>{result.amount}</p>
                <p className={blocks.text}>{result.sub}</p>
              </div>

              <div className={styles.resultBlock}>
                <p className={blocks.text}>{t.resultNote}</p>
                <LinkButton href={p.waHref} target="_blank" rel="noopener noreferrer" onClick={p.onWaTap} size="md">{t.sendWa}</LinkButton>
                <p className={blocks.small}>{t.sendNote}</p>
              </div>

              {result.sup && (
                <div className={`${styles.resultBlock} ${styles.ruled}`}>
                  <p className={styles.resultLabel}>{t.supTitle}</p>
                  <div className={styles.line}><span>{t.balance}</span><span>{p.money(result.sup.gross)}</span></div>
                  <div className={styles.line}><span>{t.taxAt(result.sup.rate)}</span><span className={styles.minus}>-{p.money(result.sup.tax)}</span></div>
                  <div className={`${styles.line} ${styles.lineStrong}`}><span>{t.youReceive}</span><span className={styles.net}>{p.money(result.sup.net)}</span></div>
                  <p className={blocks.small}>
                    {t.supNote}{' '}
                    <Link href={p.hrefs.superannuation} className={blocks.textLink}>{t.supLink}</Link>
                  </p>
                </div>
              )}

              {result.sup && !result.owing && (
                <div className={`${styles.line} ${styles.ruled} ${styles.total}`}>
                  <span className={styles.resultLabel}>{t.totalLabel}</span>
                  <span className={styles.net}>{p.money(result.total)}</span>
                </div>
              )}
            </div>
          )}

          <p className={blocks.small}>{t.footnote}</p>
        </div>
      </Section>

      <Section eyebrow={t.doEyebrow} title={t.doTitle} titleId="calc-do-title">
        <p className={`${blocks.text} ${blocks.muted}`}>{t.doIntro}</p>
        <Compare rows={p.mygov.map(r => ({ left: r.mygov, right: r.us }))} leftLabel={t.colMygov} rightLabel={t.colUs} />
        <p className={blocks.statement}>{t.doStatement}</p>
      </Section>

      <Section tone="pale" title={t.diffTitle} titleId="calc-diff-title">
        {t.diffParas.map((para, i) => <p key={i} className={blocks.text}>{para}</p>)}
        <div className={styles.links}>
          {p.hrefs.taxReturn && t.linkTaxReturn && (
            <Link href={p.hrefs.taxReturn} className={blocks.textLink}>{t.linkTaxReturn}</Link>
          )}
          <Link href={p.hrefs.medicare} className={blocks.textLink}>{t.linkMedicare}</Link>
          <Link href={p.hrefs.superannuation} className={blocks.textLink}>{t.linkSuper}</Link>
          <Link href={p.hrefs.expenses} className={blocks.textLink}>{t.linkExpenses}</Link>
        </div>
      </Section>

      {p.faqs.length > 0 && (
        <Section title={t.faqTitle} titleId="calc-faq-title">
          <Accordion items={p.faqs} />
        </Section>
      )}

      <Section tone="forest" title={t.ctaTitle} titleId="calc-cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>{t.ctaText}</p>
        <p className={`${blocks.small} ${blocks.onForest}`}>{t.ctaNote}</p>
        <LinkButton href={p.waHref} target="_blank" rel="noopener noreferrer" onClick={p.onWaTap} tone="light">{t.ctaButton}</LinkButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>{t.ctaReply}</p>
      </Section>
    </>
  )
}
