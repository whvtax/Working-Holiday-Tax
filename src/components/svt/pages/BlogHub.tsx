import { blogFor } from '@/lib/svt/content/blog-i18n'
import { readingMinutes } from '@/lib/svt/library'
import { longFor } from '@/lib/svt/content/long/library'
import { UI, fill, localePath, type SvtLocale } from '@/lib/svt/i18n'
import { Mark } from '../Type'
import { LanguageSwitch } from '../LanguageSwitch'
import styles from './BlogHub.module.css'
import { BlogBrowser, type BlogCard } from './BlogBrowser'

/** Reading order of the groups: first job, tax time, work rights, ABN, leaving. */
const GROUPS = ['TFN', 'Tax return', 'Deductions', 'Work', 'ABN', 'Super', 'Medicare'] as const

/** Same principle as the WHT blog page (Jo, 27 Oct): breadcrumb, a clear
 *  title and intro, a row of facts, topic pills with counts, then cards. */
export function BlogHub({ locale }: { locale: SvtLocale }) {
  const ui = UI[locale]
  const t = ui.blog
  const cjk = locale === 'zh'
  // The original articles and the long-form library, as one list of cards.
  const all = [
    ...blogFor(locale).map(a => ({
      slug: a.slug, category: a.category, title: a.meta.title, description: a.meta.description, updated: a.updated,
      minutes: readingMinutes([a.lead, ...a.sections.flatMap(s => [s.title, ...s.blocks.map(b => ('p' in b ? b.p : 'list' in b ? b.list.join(' ') : b.note))])].join(' '), cjk),
    })),
    ...longFor(locale).map(a => ({
      slug: a.slug, category: a.category, title: a.title, description: a.description, updated: a.updated,
      minutes: readingMinutes(a.body, cjk),
    })),
  ]
  const groups = GROUPS
    .map(c => ({ c, items: all.filter(a => a.category === c).sort((x, y) => y.updated.localeCompare(x.updated)) }))
    .filter(g => g.items.length > 0)
  // Topic order, newest first inside each topic, as one list of cards.
  const cards: BlogCard[] = groups.flatMap(g => g.items.map(a => ({
    slug: a.slug, href: localePath(locale, `/blog/${a.slug}`), category: a.category, categoryLabel: t.categories[a.category],
    title: a.title, description: a.description, updated: a.updated, minRead: fill(ui.guide.minRead, { n: String(a.minutes) }),
  })))
  return (
    <>
      <section className={styles.hero} aria-labelledby="blog-title">
        <div className={styles.inner}>
          <p className={styles.crumb}><a href={localePath(locale, '/')}>{ui.guide.home}</a> / {t.nav}</p>
          <p className={styles.eyebrow}><span aria-hidden="true" className={styles.dot} />{t.nav}</p>
          <h1 id="blog-title" className={styles.h1}>{t.title}<Mark>{t.titleMark}</Mark>{t.titleAfter ?? ''}</h1>
          <p className={styles.intro}>{t.intro}</p>
          <ul className={styles.stats}>
            <li><strong>{all.length}</strong><span>{t.statArticles}</span></li>
            <li><strong>{groups.length}</strong><span>{t.statTopics}</span></li>
            <li><strong data-mono-words="">2025-26</strong><span>{t.statTaxYear}</span></li>
            <li className={styles.statFree}><strong>{t.statFree}</strong><span>{t.statFreeNote}</span></li>
          </ul>
          <LanguageSwitch current={locale} path="/blog" compact />
        </div>
      </section>
      <section id="articles" className={styles.body} aria-labelledby="articles-title">
        <div className={styles.inner}>
          <h2 id="articles-title" className="svt-visually-hidden">{t.all}</h2>
          <BlogBrowser
            cards={cards}
            topics={groups.map(g => ({ key: g.c, label: t.categories[g.c], count: g.items.length }))}
            labels={{ all: t.all, topicsAria: `${t.nav}, ${t.statTopics}`, updated: t.updated, previous: t.pager.previous, next: t.pager.next, pageOf: t.pager.pageOf, paginationAria: t.pager.aria }}
          />
        </div>
      </section>
    </>
  )
}
