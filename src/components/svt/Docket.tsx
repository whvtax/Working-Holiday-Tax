'use client'

import { useReveal } from './useReveal'
import styles from './Docket.module.css'

export interface DocketRow {
  label: string
  value: string
  /** The bottom line: bold, value on an ink chip. */
  total?: boolean
}

/** Receipt-style breakdown. A description list, so screen readers pair each
 *  label with its amount. */
export function Docket({ rows, label }: { rows: readonly DocketRow[]; label: string }) {
  const ref = useReveal<HTMLDListElement>()
  return (
    <dl ref={ref} className={styles.docket} aria-label={label}>
      {rows.map((r, i) => (
        <div key={r.label} className={[styles.row, r.total ? styles.total : ''].join(' ')} style={{ '--i': i } as React.CSSProperties}>
          <dt data-mono-words="">{r.label}</dt>
          <dd><span className={r.total ? styles.highlight : undefined}>{r.value}</span></dd>
        </div>
      ))}
    </dl>
  )
}
