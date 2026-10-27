import { UI, type SvtLocale } from '@/lib/svt/i18n'
import styles from './TrustStrip.module.css'

/** One line under the hero (Jo, 27 Oct): the supervision sentence moved out,
 *  this is the reminder students need. */
export function TrustStrip({ locale = 'en' }: { locale?: SvtLocale }) {
  const t = UI[locale].trust
  return (
    <section className={styles.strip} aria-label={t.aria}>
      <div className={styles.inner}>
        <p className={styles.point}><span className={styles.dot} aria-hidden="true" />{t.myGov}</p>
      </div>
    </section>
  )
}
