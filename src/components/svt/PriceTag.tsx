import styles from './PriceTag.module.css'

interface PriceTagProps {
  amount: string
  unit: string
  sub?: string
}

/** Prices are always set in IBM Plex Mono with the lime chip (locked design). */
export function PriceTag({ amount, unit, sub }: PriceTagProps) {
  return (
    <div className={styles.tag}>
      <p className={styles.main}>
        <span className={styles.amount}>{amount}</span>
        <span className={styles.unit} data-mono-words=""> {unit}</span>
      </p>
      {sub ? <p className={styles.sub} data-mono-words="">{sub}</p> : null}
    </div>
  )
}
