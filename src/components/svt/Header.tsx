import { SVT_PUBLIC, svtWhatsappUrl } from '@/lib/svt/brand-public'
import { guideLinksFor, navFor } from '@/lib/svt/pages'
import { longFor } from '@/lib/svt/content/long/library'
import { UI, localePath, type SvtLocale } from '@/lib/svt/i18n'
import { Logo } from './Logo'
import styles from './Header.module.css'

const DEDUCTION_MENU: ReadonlyArray<{ slug: string; label: Record<SvtLocale, string> }> = [
  { slug: 'deductions-by-job-international-students', label: { en: 'All jobs', zh: '全部工作', vi: 'Tất cả công việc' } },
  { slug: 'hospitality-tax-deductions-students', label: { en: 'Hospitality', zh: '餐饮服务', vi: 'Nhà hàng' } },
  { slug: 'chef-kitchen-hand-tax-deductions-students', label: { en: 'Kitchen and chef', zh: '厨房和厨师', vi: 'Bếp' } },
  { slug: 'food-delivery-tax-deductions-students', label: { en: 'Food delivery', zh: '送外卖', vi: 'Giao đồ ăn' } },
  { slug: 'rideshare-tax-deductions-students', label: { en: 'Rideshare', zh: '网约车', vi: 'Xe công nghệ' } },
  { slug: 'retail-tax-deductions-students', label: { en: 'Retail', zh: '零售超市', vi: 'Bán lẻ' } },
  { slug: 'cleaner-tax-deductions-students', label: { en: 'Cleaning', zh: '清洁', vi: 'Dọn dẹp' } },
  { slug: 'aged-care-disability-tax-deductions-students', label: { en: 'Aged care', zh: '养老护理', vi: 'Chăm sóc người cao tuổi' } },
  { slug: 'warehouse-labouring-tax-deductions-students', label: { en: 'Warehouse', zh: '仓库', vi: 'Kho hàng' } },
  { slug: 'construction-tax-deductions-students', label: { en: 'Construction', zh: '建筑工地', vi: 'Xây dựng' } },
  { slug: 'farm-work-tax-deductions-students', label: { en: 'Farm work', zh: '农场', vi: 'Nông trại' } },
  { slug: 'tutor-childcare-tax-deductions-students', label: { en: 'Tutor and childcare', zh: '家教和托儿', vi: 'Gia sư, trông trẻ' } },
]

export function Header({ locale = 'en' }: { locale?: SvtLocale }) {
  const t = UI[locale]
  const nav = navFor(locale)
  // "Deductions by job", like the Expenses menu on WHT (Jo, 27 Oct): one or
  // two words per job, only articles that exist in this language.
  const have = new Set(longFor(locale).filter(a => a.category === 'Deductions').map(a => a.slug))
  const deductions = DEDUCTION_MENU.filter(d => have.has(d.slug))
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a href={localePath(locale, '/')} className={styles.brand} aria-label={t.homeAria}>
          <Logo decorative />
          <span>{SVT_PUBLIC.name}</span>
        </a>
        <nav className={styles.nav} aria-label={t.mainNav}>
          {nav.slice(0, 2).map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
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
                {deductions.map(d => <a key={d.slug} href={localePath(locale, `/blog/${d.slug}`)}>{d.label[locale]}</a>)}
              </div>
            </div>
          ) : null}
          {nav.slice(2).map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
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
