import { SVT_PUBLIC, svtWhatsappUrl } from '@/lib/svt/brand-public'
import { guideLinksFor, navFor } from '@/lib/svt/pages'
import { longFor } from '@/lib/svt/content/long/library'
import { UI, localePath, type SvtLocale } from '@/lib/svt/i18n'
import { Logo } from './Logo'
import styles from './Header.module.css'

export function Header({ locale = 'en' }: { locale?: SvtLocale }) {
  const t = UI[locale]
  const nav = navFor(locale)
  // "Deductions by job", like the Expenses menu on WHT (Jo, 27 Oct).
  const deductions = longFor(locale).filter(a => a.category === 'Deductions')
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a href={localePath(locale, '/')} className={styles.brand} aria-label={t.homeAria}>
          <Logo decorative />
          <span>{SVT_PUBLIC.name}</span>
        </a>
        <nav className={styles.nav} aria-label={t.mainNav}>
          {/* Desktop dropdown, like the WHT menu (Jo, 27 Oct). Opens on hover
              and on keyboard focus; the links stay in the page for crawlers. */}
          <div className={styles.drop}>
            <button type="button" className={styles.dropBtn} aria-haspopup="true">{t.footer.guidesAria} <span aria-hidden="true">▾</span></button>
            <div className={styles.dropPanel}>
              {guideLinksFor(locale).map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
            </div>
          </div>
          {deductions.length ? (
            <div className={styles.drop}>
              <button type="button" className={styles.dropBtn} aria-haspopup="true">{t.blog.categories.Deductions} <span aria-hidden="true">▾</span></button>
              <div className={styles.dropPanel}>
                {deductions.map(a => <a key={a.slug} href={localePath(locale, `/blog/${a.slug}`)}>{a.title}</a>)}
              </div>
            </div>
          ) : null}
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
