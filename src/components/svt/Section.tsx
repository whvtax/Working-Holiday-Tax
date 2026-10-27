import styles from './Section.module.css'

type Tone = 'white' | 'pale' | 'lime' | 'ink'

interface SectionProps {
  tone?: Tone
  /** Keep the content to a reading measure (default) or use the full width. */
  width?: 'narrow' | 'wide'
  title?: React.ReactNode
  /** id of the heading, for aria-labelledby. Required when title is set. */
  titleId?: string
  id?: string
  className?: string
  children: React.ReactNode
}

export function Section({ tone = 'white', width = 'narrow', title, titleId, id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={[styles.section, styles[tone], className].filter(Boolean).join(' ')}
      aria-labelledby={title ? titleId : undefined}
    >
      <div className={[styles.inner, width === 'narrow' ? styles.narrow : ''].join(' ')}>
        {title ? <h2 id={titleId} className={styles.title}>{title}</h2> : null}
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  )
}
