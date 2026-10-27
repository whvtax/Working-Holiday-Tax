import type { ShortAnswer as Short } from '@/lib/svt/content/guides-en'
import { UI, type SvtLocale } from '@/lib/svt/i18n'
import { Mark } from './Type'
import styles from './ShortAnswer.module.css'

/** The answer box every guide and article opens with (decision 005): a
 *  pale-lime docket with the one rule, optionally a ticked form or up to
 *  three key figures, and the official source it comes from. */
export function ShortAnswer({ short, source, locale }: { short: Short; source?: { label: string; href: string }; locale: SvtLocale }) {
  const t = UI[locale].guide
  const { answer, mark } = short
  const at = mark ? answer.indexOf(mark) : -1
  return (
    <section className={styles.docket} aria-labelledby="short-answer">
      <h2 id="short-answer" className={styles.label} data-mono-words="">{t.inShort}</h2>
      <p className={styles.answer}>
        {at >= 0 ? <>{answer.slice(0, at)}<Mark>{mark}</Mark>{answer.slice(at + (mark?.length ?? 0))}</> : answer}
      </p>
      {short.form ? (
        <div className={styles.form}>
          <p className={styles.question}>{short.form.question}</p>
          <ul className={styles.rows}>
            {short.form.rows.map(r => (
              <li key={r.label} className={styles.row}>
                <span className={styles.rowLabel}>{r.label}{r.sub ? <span className={styles.sub}>{r.sub}</span> : null}<span className="svt-visually-hidden">: {r.answer === 'yes' ? t.yes : t.no}</span></span>
                <span className={styles.ticks} aria-hidden="true">
                  <span className={r.answer === 'yes' ? styles.on : styles.off}>{t.yes}</span>
                  <span className={r.answer === 'no' ? styles.on : styles.off}>{t.no}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {short.facts?.length ? (
        <dl className={styles.facts}>
          {short.facts.map(f => (
            <div key={f.figure} className={styles.fact}>
              <dt className={styles.figure}>{f.figure}</dt>
              <dd className={styles.factLabel}>{f.label}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {source ? (
        <p className={styles.source}><span data-mono-words="">{t.source}:</span> <a href={source.href} rel="noopener noreferrer" target="_blank">{source.label}<span className="svt-visually-hidden">{t.newTab}</span></a></p>
      ) : null}
    </section>
  )
}
