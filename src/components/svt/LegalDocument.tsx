import type { LegalSection } from '@/lib/legal/legal-text'
import styles from './LegalDocument.module.css'

interface LegalDocumentProps {
  title: string
  updated: string
  box?: React.ReactNode
  intro?: string
  sections: readonly LegalSection[]
}

/** Renders the shared legal text (src/lib/legal) in the SVT style. The words
 *  come from the shared module only; this component adds none of its own. */
export function LegalDocument({ title, updated, box, intro, sections }: LegalDocumentProps) {
  return (
    <article className={styles.page}>
      <div className={styles.inner}>
        <header>
          <h1 className={styles.h1}>{title}</h1>
          <p className={styles.updated}>{updated}</p>
        </header>
        {box ? <div className={styles.box}>{box}</div> : null}
        {intro ? <p className={styles.text}>{intro}</p> : null}
        {sections.map(s => (
          <section key={s.title} className={styles.section}>
            <h2 className={styles.h2}>{s.title}</h2>
            {s.body ? <p className={styles.text}>{s.body}</p> : null}
            {s.items ? <ul className={styles.list}>{s.items.map(item => <li key={item}>{item}</li>)}</ul> : null}
          </section>
        ))}
      </div>
    </article>
  )
}
