import { AGENT_NAME, AGENT_TPB } from '@/lib/constants'
import { UI, fill, type SvtLocale } from '@/lib/svt/i18n'
import styles from './TrustStrip.module.css'

/** Wording is fixed by CLAUDE.md: "operates under the supervision of a
 *  registered tax agent". Never "we are registered tax agents". */
export function TrustStrip({ locale = 'en' }: { locale?: SvtLocale }) {
  const t = UI[locale].trust
  return (
    <section className={styles.strip} aria-label={t.aria}>
      <div className={styles.inner}>
        <p>
          {fill(t.supervision, { agent: AGENT_NAME, tpb: AGENT_TPB })}{' '}
          <a href={`https://www.tpb.gov.au/registrations_search?number=${AGENT_TPB}`} rel="noopener noreferrer" target="_blank">
            {t.check}<span className="svt-visually-hidden">{t.checkHint}</span>
          </a>
        </p>
        <p>{t.myGov}</p>
      </div>
    </section>
  )
}
