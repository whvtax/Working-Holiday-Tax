import Link from 'next/link'
import styles from './LegalBlocks.module.css'

export interface LegalSection { title: string; body?: string; items?: string[] }
export interface LegalCrumb { label: string; href?: string }

/**
 * Layout for the long legal documents (privacy policy, client agreement).
 * Only the layout lives here: the text is passed in untouched.
 */
export function LegalDoc({ kicker, title, sub, crumbs, notice, intro, sections }: {
  kicker: string
  title: string
  sub: React.ReactNode
  crumbs: LegalCrumb[]
  /** Pale panel above the intro (the agent disclosure). */
  notice?: React.ReactNode
  intro: React.ReactNode
  sections: LegalSection[]
}) {
  return (
    <>
      <header className={styles.head}>
        <div className={styles.headInner}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            {crumbs.map((c, i) => (
              <span key={i} className={styles.crumb}>
                {i > 0 && <span aria-hidden="true" className={styles.sep}>/</span>}
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </span>
            ))}
          </nav>
          <p className={styles.kicker}>{kicker}</p>
          <h1 className={styles.h1}>{title}</h1>
          <p className={styles.sub}>{sub}</p>
        </div>
      </header>
      <section className={styles.doc} data-layer="wht">
        <div className={styles.docInner}>
          {notice ? <div className={styles.notice}>{notice}</div> : null}
          <p className={styles.p}>{intro}</p>
          {sections.map((s, i) => (
            <div key={i} className={styles.block}>
              <h2 className={styles.h2}>{s.title}</h2>
              {s.body ? <p className={styles.p}>{s.body}</p> : null}
              {s.items ? (
                <ul className={styles.list}>
                  {s.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
