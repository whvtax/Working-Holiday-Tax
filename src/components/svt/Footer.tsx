import { SVT_PUBLIC } from '@/lib/svt/brand-public'
import { AGENT_NAME, AGENT_TPB } from '@/lib/constants'
import { guideLinksFor } from '@/lib/svt/pages'
import { UI, fill, type SvtLocale } from '@/lib/svt/i18n'
import { Logo } from './Logo'
import styles from './Footer.module.css'

export function Footer({ locale = 'en' }: { locale?: SvtLocale }) {
  const t = UI[locale].footer
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}><Logo tone="mist" size={36} decorative />{SVT_PUBLIC.name}</p>
        <p className={styles.legal}>{fill(t.supervision, { agent: AGENT_NAME, tpb: AGENT_TPB })}</p>
        <nav aria-label={t.guidesAria}>
          <ul className={styles.links}>
            {guideLinksFor(locale).map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
          </ul>
        </nav>
        <ul className={styles.links}>
          {/* Legal pages are English only (as on every brand). */}
          <li><a href="/client-agreement" hrefLang="en-AU">{t.clientAgreement}</a></li>
          <li><a href="/privacy" hrefLang="en-AU">{t.privacy}</a></li>
          <li><a href={`mailto:${SVT_PUBLIC.email}`}>{SVT_PUBLIC.email}</a></li>
        </ul>
        {t.legalEnglishOnly ? <p className={styles.legal}>{t.legalEnglishOnly}</p> : null}
      </div>
    </footer>
  )
}
