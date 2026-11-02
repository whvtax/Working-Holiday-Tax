import styles from './Hero.module.css'

/** WHT hero: text left, photo right from 1024px, photo band under the text on phones.
 *  `media` is normally <ImageSlot className={heroStyles.media} .../>; pass the className via heroMedia. */
export function Hero({ eyebrow, title, titleId = 'hero-title', children, media }: {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  titleId?: string
  children?: React.ReactNode
  media?: React.ReactNode
}) {
  return (
    <section className={styles.hero} aria-labelledby={titleId}>
      <div className={styles.grid}>
        <div className={styles.text}>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          <h1 id={titleId} className={styles.h1}>{title}</h1>
          {children}
        </div>
        {media}
      </div>
    </section>
  )
}

export const heroStyles = styles
