import type { GuideContent } from '@/lib/svt/content/guides-en'
import { SVT_PUBLIC, svtWhatsappUrl } from '@/lib/svt/brand-public'
import { breadcrumbList, faqPage, guidePageSchema, jsonLd, svtOrganization, svtWebsite } from '@/lib/svt/jsonld'
import { relatedLinks } from '@/lib/svt/pages'
import { placeOf, readingMinutes } from '@/lib/svt/library'
import { LOCALE_META, UI, fill, localePath, type SvtLocale } from '@/lib/svt/i18n'
import { LanguageSwitch } from './LanguageSwitch'
import { LinkButton } from './Button'
import { Faq } from './Faq'
import { ShortAnswer } from './ShortAnswer'
import { PagePhoto } from './PagePhoto'
import { Lead, Mark } from './Type'
import styles from './GuidePage.module.css'

/** One template for every SVT guide and article (decision 005): where it sits
 *  in the library, the short answer first, the sections, questions, then one
 *  path onward (next in the topic, the price, related pages) and the official
 *  sources. */
export function GuidePage({ g, locale = 'en', section, basePath: base, article = false, locales }: {
  g: GuideContent
  locale?: SvtLocale
  /** A crumb between Home and the page, e.g. the blog. */
  section?: { href: string; label: string }
  /** A library article outside the topic reading order: dated, Article markup. */
  article?: boolean
  /** Languages this page exists in, when not all of them. */
  locales?: readonly SvtLocale[]
  /** The language-free path of this page, for the language switch. */
  basePath?: string
}) {
  const t = UI[locale].guide
  const path = base ?? `/${g.slug}`
  const place = placeOf(path.slice(1))
  const topicName = place ? UI[locale].blog.categories[place.topic] : null
  const next = place?.next ? relatedLinks([place.next], locale)[0] : undefined
  const related = relatedLinks(g.related.filter(r => r !== place?.next), locale)
  const words = [g.lead, ...g.sections.flatMap(s => [s.title, ...s.blocks.map(b => ('p' in b ? b.p : 'list' in b ? b.list.join(' ') : b.note))])].join(' ')
  const minutes = readingMinutes(words, locale === 'zh')
  // Topic pages (articles and topic guides) show their date, matching the
  // Article markup; service pages carry it in the markup only.
  const isArticle = !!place || article
  const updated = isArticle ? g.updated : undefined
  const abs = (p: string) => `${SVT_PUBLIC.siteUrl}${p === '/' ? '' : p}`
  const url = abs(localePath(locale, path))
  const schema = [
    svtOrganization(),
    svtWebsite(),
    guidePageSchema({
      url, title: g.meta.title, description: g.meta.description, inLanguage: LOCALE_META[locale].hreflang,
      published: g.published, updated: g.updated, image: abs(`/svt-assets/og/og-${locale}.png`),
      citations: isArticle ? g.sources.map(s => s.href) : undefined,
      kind: isArticle ? 'Article' : g.slug === 'about' ? 'AboutPage' : 'WebPage',
    }),
    breadcrumbList([
      { name: t.home, url: abs(localePath(locale, '/')) },
      ...(section ? [{ name: section.label, url: abs(section.href) }] : []),
      { name: g.label, url },
    ]),
    ...(g.faq?.length ? [faqPage(g.faq)] : []),
  ]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <section className={styles.hero} aria-labelledby="guide-title">
        <div className={styles.heroInner}>
          <p className={styles.crumb}><a href={localePath(locale, '/')}>{t.home}</a> / {section ? <><a href={section.href}>{section.label}</a> / </> : null}{g.label}</p>
          {place && topicName ? (
            <p className={styles.topic}>
              <a href={`${localePath(locale, '/blog')}#topic-${place.topic.toLowerCase().replace(/\s+/g, '-')}`}>{topicName}</a>
              <span data-mono-words="">{fill(t.position, { i: String(place.index), n: String(place.total) })}</span>
            </p>
          ) : null}
          <h1 id="guide-title" className={styles.h1}>{g.h1.before}{g.h1.mark ? <Mark>{g.h1.mark}</Mark> : null}{g.h1.after ?? ''}</h1>
          <Lead>{g.lead}</Lead>
          <div className={styles.meta}>
            <p data-mono-words="">
              {updated ? <><time dateTime={updated}>{UI[locale].blog.updated} {updated}</time><span aria-hidden="true"> · </span></> : null}
              {fill(t.minRead, { n: String(minutes) })}
            </p>
            <LanguageSwitch current={locale} path={path} compact only={locales} />
          </div>
        </div>
      </section>
      <div className={styles.body}>
        <div className={styles.grid}>
          <div className={styles.content}>
            {/* The official source is shown for topic pages; service pages (price, how it works, about) answer about us. */}
            {g.short ? <ShortAnswer short={g.short} source={isArticle ? g.sources[0] : undefined} locale={locale} /> : null}
            <PagePhoto page={path.slice(1)} locale={locale} />
            {g.sections.map(sec => (
              <section key={sec.id} id={sec.id} className={styles.section} aria-labelledby={`${sec.id}-title`}>
                <h2 id={`${sec.id}-title`} className={styles.h2}>{sec.title}</h2>
                {sec.blocks.map((b, i) =>
                  'p' in b ? <p key={i} className={styles.p}>{b.p}</p>
                  : 'list' in b ? <ul key={i} className={styles.list}>{b.list.map(li => <li key={li}>{li}</li>)}</ul>
                  : <p key={i} className={styles.note}>{b.note}</p>,
                )}
              </section>
            ))}
            {g.faq?.length ? (
              <section className={styles.section} aria-labelledby="guide-questions">
                <h2 id="guide-questions" className={styles.h2}>{t.questions}</h2>
                <Faq items={g.faq} group={`svt-${g.slug}-faq`} openFirst={false} />
              </section>
            ) : null}
            <div className={styles.end}>
              {next && topicName ? (
                <a className={styles.next} href={next.href}>
                  <span className={styles.nextLabel}>{fill(t.next, { topic: topicName })}</span>
                  <span className={styles.nextTitle}>{next.label}</span>
                </a>
              ) : null}
              <div className={styles.cta}>
                <p className={styles.ctaTitle}>{t.ctaTitle}</p>
                <p className={styles.ctaText} data-mono-words="">{t.ctaPrice}</p>
                <LinkButton href={svtWhatsappUrl(fill(UI[locale].whatsappAbout, { topic: g.label }))} size="md" data-wa-pos="guide-end">{UI[locale].whatsappCta}</LinkButton>
              </div>
            </div>
            <section className={styles.sources} aria-labelledby="guide-sources">
              <h2 id="guide-sources">{t.sources}</h2>
              <ul>
                {g.sources.map(s => (
                  <li key={s.href}><a href={s.href} rel="noopener noreferrer" target="_blank">{s.label}<span className="svt-visually-hidden">{t.newTab}</span></a></li>
                ))}
              </ul>
            </section>
          </div>
          <aside className={styles.aside} aria-label={t.more}>
            <nav className={styles.toc} aria-label={t.onThisPage}>
              <p className={styles.tocTitle}>{t.onThisPage}</p>
              {g.short ? <a href="#short-answer">{t.inShort}</a> : null}
              {g.sections.map(sec => <a key={sec.id} href={`#${sec.id}`}>{sec.title}</a>)}
              {g.faq?.length ? <a href="#guide-questions">{t.questions}</a> : null}
            </nav>
            {related.length ? (
              <nav className={styles.related} aria-labelledby="related-title">
                <h2 id="related-title">{t.related}</h2>
                <ul>{related.map(r => <li key={r.href}><a href={r.href}>{r.label}</a></li>)}</ul>
              </nav>
            ) : null}
          </aside>
        </div>
      </div>
    </>
  )
}
