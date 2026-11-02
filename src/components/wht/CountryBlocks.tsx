import Link from 'next/link'
import styles from './CountryBlocks.module.css'

/** Link and list styles shared by the two passport pages (UK, Germany). */
export const countryStyles = styles

export interface Crumb { name: string; item: string }

/** Breadcrumb trail above the hero. The last crumb is the current page. */
export function Crumbs({ items, label = 'Breadcrumb' }: { items: Crumb[]; label?: string }) {
  return (
    <nav aria-label={label} className={styles.crumbs}>
      <ol>
        {items.map((b, i) => (
          <li key={i}>
            {i > 0 && <span aria-hidden="true" className={styles.sep}>/</span>}
            {i === items.length - 1 ? <span aria-current="page">{b.name}</span> : <Link href={b.item}>{b.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Titled hairline rows: "what is different about this passport". */
export function Differences({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className={styles.diffs}>
      {items.map((c, i) => (
        <div key={i} className={styles.diff}>
          <h3 className={styles.diffTitle}>{c.t}</h3>
          <p>{c.d}</p>
        </div>
      ))}
    </div>
  )
}

/** A captioned two column rate table in one pale card. */
export function RateTable({ caption, rows }: { caption: string; rows: string[][] }) {
  return (
    <div className={styles.table}>
      <p className={styles.caption}>{caption}</p>
      <div className={styles.scroll}>
        <table>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <th scope="row">{r[0]}</th>
                <td>{r[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/** Numbered plain list of sentences. */
export function NumberList({ items }: { items: string[] }) {
  return (
    <ol className={styles.numbers}>
      {items.map((t, i) => (
        <li key={i}>
          <span aria-hidden="true" className={styles.n}>{String(i + 1).padStart(2, '0')}</span>
          <span>{t}</span>
        </li>
      ))}
    </ol>
  )
}
