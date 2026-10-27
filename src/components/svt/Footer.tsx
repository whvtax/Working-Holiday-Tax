import { SVT_PUBLIC, svtWhatsappUrl } from '@/lib/svt/brand-public'
import { AGENT_TPB } from '@/lib/agent'
import { guideLinksFor, navFor } from '@/lib/svt/pages'
import { UI, fill, localePath, type SvtLocale } from '@/lib/svt/i18n'
import { Logo } from './Logo'
import styles from './Footer.module.css'

/** Same layout as the WHT footer (Jo, 27 Oct): brand column with the TPB
 *  seal, then guides, learn and connect, and a bottom bar with the legal
 *  links. SVT's own colours, words and links only. */
export function Footer({ locale = 'en' }: { locale?: SvtLocale }) {
  const ui = UI[locale]
  const t = ui.footer
  const guides = guideLinksFor(locale).filter(l => !l.href.endsWith('/about'))
  const learn = navFor(locale)
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <p className={styles.brand}><Logo tone="ink" size={30} decorative />{SVT_PUBLIC.name}</p>
            <p className={styles.tagline}>{t.tagline}</p>
            <p className={styles.intro}>{t.intro}</p>
            <a className={styles.ask} href={svtWhatsappUrl(ui.whatsappHello)} data-wa-pos="footer">{t.askUs} <span aria-hidden="true">→</span></a>
            <span className={styles.seal}>
              <img src="/svt-assets/img/tpb-registered.png" alt={fill(t.sealAlt, { tpb: AGENT_TPB })} width={509} height={319} loading="lazy" decoding="async" />
            </span>
          </div>
          <nav aria-label={t.guidesAria}>
            <p className={styles.head}>{t.guidesAria}</p>
            <ul className={styles.col}>{guides.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
          </nav>
          <nav aria-label={t.learn}>
            <p className={styles.head}>{t.learn}</p>
            <ul className={styles.col}>{learn.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
          </nav>
          <nav aria-label={t.connect}>
            <p className={styles.head}>{t.connect}</p>
            <ul className={styles.col}>
              <li><a href={svtWhatsappUrl(ui.whatsappHello)} data-wa-pos="footer">WhatsApp</a></li>
              <li><a href={`mailto:${SVT_PUBLIC.email}`}>{t.email}</a></li>
            </ul>
          </nav>
        </div>
      </div>
      </div>
      <div className={styles.bottom}>
      <div className={styles.inner}>
          <div className={styles.bar}>
            <span>© {year} {t.copyright}</span>
            <ul className={styles.links}>
              <li><a href={localePath(locale, '/about')}>{t.about}</a></li>
              <li aria-hidden="true" className={styles.dot}>·</li>
              {/* Legal pages are English only (as on every brand). */}
              <li><a href="/client-agreement" hrefLang="en-AU">{t.clientAgreement}</a></li>
              <li aria-hidden="true" className={styles.dot}>·</li>
              <li><a href="/privacy" hrefLang="en-AU">{t.privacy}</a></li>
            </ul>
          </div>
      </div>
      </div>
    </footer>
  )
}
