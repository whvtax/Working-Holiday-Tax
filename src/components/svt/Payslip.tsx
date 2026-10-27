'use client'

import { useId, useState } from 'react'
import { payslipLines, type PayslipLineId } from '@/lib/svt/payslip'
import { UI, type SvtLocale } from '@/lib/svt/i18n'
import styles from './Payslip.module.css'

/** "Your payslip, line by line". Pick a line to read what it means. */
export function Payslip({ locale = 'en' }: { locale?: SvtLocale }) {
  const lines = payslipLines(locale)
  const [line, setLine] = useState<PayslipLineId>('tax')
  const id = useId()
  const current = lines.find(l => l.id === line) ?? lines[0]
  return (
    <div className={styles.wrap}>
      <fieldset className={styles.rows}>
        <legend className="svt-visually-hidden">{UI[locale].payslipLegend}</legend>
        {lines.map(l => (
          <label key={l.id} className={styles.row}>
            <input className={styles.input} type="radio" name={`${id}-line`} value={l.id} checked={line === l.id} onChange={() => setLine(l.id)} />
            <span className={styles.line}><span lang={locale === 'en' ? undefined : 'en'}>{l.label}</span><span>{l.amount}</span></span>
          </label>
        ))}
      </fieldset>
      <p className={styles.explain} aria-live="polite">{current.explain}</p>
    </div>
  )
}
