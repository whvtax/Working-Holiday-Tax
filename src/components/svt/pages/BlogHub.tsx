import { blogFor } from '@/lib/svt/content/blog-i18n'
import { UI, localePath, type SvtLocale } from '@/lib/svt/i18n'
import { Section } from '../Section'
import { Lead, Mark } from '../Type'
import { LanguageSwitch } from '../LanguageSwitch'
import styles from './BlogHub.module.css'

/** Reading order of the groups: first job, tax time, work rights, ABN, leaving. */
const GROUPS = ['TFN', 'Tax return', 'Work', 'ABN', 'Super'] as const

/** The articles, grouped by topic (21 in one list was a wall), newest first
 *  inside each group. Plain list, no card grid of stock images. */
export function BlogHub({ locale }: { locale: SvtLocale }) {
  const t = UI[locale].blog
  const all = blogFor(locale)
  const groups = GROUPS
    .map(c => ({ c, items: all.filter(a => a.category === c).sort((x, y) => y.updated.localeCompare(x.updated)) }))
    .filter(g => g.items.length > 0)
  const id = (c: string) => `topic-${c.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <>
      <Section width="wide">
        <h1 style={{ fontSize: 'var(--svt-h1)', lineHeight: 1.06, fontWeight: 700, letterSpacing: '-0.025em', maxWidth: 760 }}>{t.title}<Mark>{t.titleMark}</Mark>{t.titleAfter ?? ''}</h1>
        <Lead>{t.lead}</Lead>
        <LanguageSwitch current={locale} path="/blog" />
        <nav aria-label={t.nav} className={styles.jump}>
          {groups.map(g => <a key={g.c} href={`#${id(g.c)}`}>{t.categories[g.c]} <span data-mono-words="">{g.items.length}</span></a>)}
        </nav>
      </Section>
      <Section width="wide">
      {groups.map(g => (
        <div key={g.c} className={styles.block}>
          <h2 id={id(g.c)} className={styles.group}>{t.categories[g.c]}</h2>
          <ul className={styles.list}>
            {g.items.map(a => (
              <li key={a.slug} className={styles.item}>
                <a href={localePath(locale, `/blog/${a.slug}`)}>
                  <span className={styles.title}>{a.meta.title}</span>
                  <span className={styles.desc}>{a.meta.description}</span>
                  <span className={styles.meta}><time dateTime={a.updated} data-mono-words="">{a.updated}</time></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      </Section>
    </>
  )
}
