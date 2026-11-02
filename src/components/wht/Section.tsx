import styles from './Section.module.css'

type Tone = 'white' | 'pale' | 'amber' | 'forest'

interface SectionProps {
  tone?: Tone
  /** Reading measure with the heading on the left from 1024px (default), or full width. */
  width?: 'narrow' | 'wide'
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  /** id of the heading, for aria-labelledby. Required when title is set. */
  titleId?: string
  id?: string
  className?: string
  children: React.ReactNode
}

/** The WHT section: heading column left, content right from 1024px. */
export function Section({ tone = 'white', width = 'narrow', eyebrow, title, titleId, id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      data-layer="wht"
      className={[styles.section, styles[tone], className].filter(Boolean).join(' ')}
      aria-labelledby={title ? titleId : undefined}
    >
      <div className={[styles.inner, width === 'narrow' ? styles.narrow : ''].join(' ')}>
        {title ? (
          <div>
            {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
            <h2 id={titleId} className={styles.title}>{title}</h2>
          </div>
        ) : null}
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  )
}
