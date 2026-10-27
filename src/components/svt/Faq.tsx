import styles from './Faq.module.css'

export interface FaqItem { q: string; a: string }

/**
 * Accordion built on <details name>: one answer open at a time, no
 * JavaScript, keyboard and screen-reader support from the browser. Browsers
 * without the `name` attribute simply allow several open at once.
 */
export function Faq({ items, group, openFirst = true }: { items: readonly FaqItem[]; group: string; openFirst?: boolean }) {
  return (
    <div className={styles.list}>
      {items.map((it, i) => (
        <details key={it.q} name={group} className={styles.item} open={openFirst && i === 0}>
          <summary className={styles.q}><span>{it.q}</span><span className={styles.sign} aria-hidden="true" /></summary>
          <p className={styles.a}>{it.a}</p>
        </details>
      ))}
    </div>
  )
}
