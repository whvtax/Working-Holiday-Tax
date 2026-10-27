import { SVT_PUBLIC, svtWhatsappUrl } from '@/lib/svt/brand-public'
import { guideLinksFor, navFor } from '@/lib/svt/pages'
import { UI, localePath, type SvtLocale } from '@/lib/svt/i18n'
import { Logo } from './Logo'
import styles from './Header.module.css'

export function Header({ locale = 'en' }: { locale?: SvtLocale }) {
  const t = UI[locale]
  const nav = navFor(locale)
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a href={localePath(locale, '/')} className={styles.brand} aria-label={t.homeAria}>
          <Logo decorative />
          <span>{SVT_PUBLIC.name}</span>
        </a>
        <nav className={styles.nav} aria-label={t.mainNav}>
          {nav.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          <a className={styles.cta} href={svtWhatsappUrl(t.whatsappHello)} data-wa-pos="nav">{t.whatsappCta}</a>
        </nav>
        <details className={styles.menu}>
          <summary className={styles.menuButton}>{t.menu}</summary>
          <nav className={styles.panel} aria-label={t.mainNav}>
            {[...nav, ...guideLinksFor(locale)].map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
        </details>
      </div>
    </header>
  )
}
