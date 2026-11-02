import Link from 'next/link'
import styles from './Blocks.module.css'

/** Shared WHT content blocks. Typography classes (text, muted, small, statement, kicker) live in `blocks`. */
export const blocks = styles

export interface CompareRow { left: string; right: string }

/** Two-column pale comparison card. Labels print once, on the first row. */
export function Compare({ rows, leftLabel, rightLabel }: { rows: CompareRow[]; leftLabel: string; rightLabel: string }) {
  return (
    <div className={styles.compare}>
      {rows.map((r, i) => (
        <div key={i} className={styles.compareRow}>
          <div className={styles.cell}>
            {i === 0 && <p className={styles.label}>{leftLabel}</p>}
            <p>{r.left}</p>
          </div>
          <div className={`${styles.cell} ${styles.cellUs}`}>
            {i === 0 && <p className={styles.label}>{rightLabel}</p>}
            <p>{r.right}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/** Three (or more) big figures in a row, one rule on top of each. */
export function Figures({ items }: { items: { figure: string; body: string }[] }) {
  return (
    <div className={styles.figures}>
      {items.map(f => (
        <div key={f.figure} className={styles.figure}>
          <p className={styles.figureNum}>{f.figure}</p>
          <p className={styles.text}>{f.body}</p>
        </div>
      ))}
    </div>
  )
}

/** Numbered hairline rows (an ordered list). */
export function Steps({ items }: { items: { n: string; title: string; body: string }[] }) {
  return (
    <ol className={styles.rows}>
      {items.map(s => (
        <li key={s.n} className={styles.row}>
          <span className={styles.num} aria-hidden="true">{s.n}</span>
          <div>
            <h3 className={styles.rowTitle}>{s.title}</h3>
            <p className={styles.rowBody}>{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export interface LinkRowItem { href: string; title: string; desc: string; eyebrow?: string; cta?: string }

/** Hairline list of whole-row links: services, guides, related pages. */
export function LinkRows({ items }: { items: LinkRowItem[] }) {
  return (
    <div>
      {items.map(it => (
        <Link key={it.href} href={it.href} className={styles.linkRow}>
          {it.eyebrow ? <span className={styles.eyebrowSm}>{it.eyebrow}</span> : null}
          <h3 className={styles.rowTitle}>{it.title}</h3>
          <p className={styles.rowBody}>{it.desc}</p>
          {it.cta ? <span className={styles.go}>{it.cta}</span> : null}
        </Link>
      ))}
    </div>
  )
}
