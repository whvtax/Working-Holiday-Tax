import styles from './Type.module.css'

/** Amber highlighter band behind a few words of a heading (never amber text). */
export function Mark({ children }: { children: React.ReactNode }) {
  return <span className={styles.mark}>{children}</span>
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className={styles.lead}>{children}</p>
}
