import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { Accordion } from '@/components/ui/Accordion'
import type { JobExpensesContent } from '@/components/expenses/JobExpensesPage'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { WaButton } from '@/components/wht/WaButton'
import { PagePhoto } from '@/components/wht/PagePhoto'
import { LinkRows, blocks } from '@/components/wht/Blocks'
import styles from './JobPageBlocks.module.css'

function Paras({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((p, i) => (
        <p key={i} className={blocks.text}>{p}</p>
      ))}
    </>
  )
}

function Facts({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className={styles.facts}>
      {items.map((it, i) => (
        <div key={i} className={styles.fact}>
          <h3 className={styles.factTitle}>{it.t}</h3>
          <p className={styles.factBody}>{it.d}</p>
        </div>
      ))}
    </div>
  )
}

/**
 * The occupation-expenses page in the WHT layout system (/expenses/<job>, en, de, ja).
 * Same content contract as JobExpensesPage, so a page switches by changing one import.
 */
export function JobExpensesWhtPage({ content: c }: { content: JobExpensesContent }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: c.crumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: `${SITE_URL}${b.item === '/' ? '' : b.item}`,
    })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.articleHeadline,
    description: c.articleDescription,
    url: `${SITE_URL}${c.path}`,
    inLanguage: c.inLanguage,
    author: { '@type': 'Organization', '@id': `${SITE_URL}/#business`, name: 'Working Holiday Tax', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Working Holiday Tax',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png` },
    },
  }
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${c.path}#webpage`,
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
    url: `${SITE_URL}${c.path}`,
  }

  // Route key for the page photo: the path without its language prefix.
  const pageKey = c.path.replace(/^\/(de|ja)(?=\/)/, '').replace(/^\//, '')
  // Body sections alternate white and pale, starting white.
  const tone = (i: number) => (i % 2 === 0 ? 'white' : 'pale') as 'white' | 'pale'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <div className={blocks.underHeader}>
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <ol>
            {c.crumbs.map((b, i) => (
              <li key={i}>
                {i > 0 && <span aria-hidden="true" className={styles.sep}>/</span>}
                {i === c.crumbs.length - 1 ? (
                  <span aria-current="page">{b.name}</span>
                ) : (
                  <Link href={b.item}>{b.name}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Hero
          eyebrow={c.hero.kicker}
          title={<>{c.hero.h1lead}{c.lang === 'ja' ? null : ' '}<Mark>{c.hero.h1accent}</Mark></>}
        >
          <div className="hero-sub"><Lead>{c.hero.lede}</Lead></div>
          <WaButton href={c.WA} position="hero" topic="expenses" lang={c.lang}>{c.UI.ctaLabel}</WaButton>
          <p className={heroStyles.note}>{c.UI.ctaSub}</p>
        </Hero>
      </div>

      <div className={styles.photo}><PagePhoto page={pageKey} locale={c.lang} /></div>

      {c.sections.map((s, i) => {
        const t = tone(i)
        const id = `sec-${i}`
        if (s.kind === 'note') {
          return (
            <Section key={i} tone={t} title={s.label} titleId={id}>
              <div className={`${blocks.notice} ${blocks.stack}`}>
                <h3 className={blocks.cardTitle}>{s.title}</h3>
                <Paras text={s.body} />
              </div>
            </Section>
          )
        }
        return (
          <Section key={i} tone={t} title={s.h2} titleId={id}>
            {s.kind === 'answer' && s.paras.map((p, j) => <p key={j} className={blocks.text}>{p}</p>)}

            {s.kind === 'items' && (
              <>
                <p className={`${blocks.text} ${blocks.muted}`}>{s.intro}</p>
                <Facts items={s.items} />
              </>
            )}

            {s.kind === 'traps' && (
              <>
                <p className={`${blocks.text} ${blocks.muted}`}>{s.intro}</p>
                <div className={styles.group}>
                  <p className={styles.groupLabel}>{c.UI.wrongLabel}</p>
                  <Facts items={s.wrong} />
                </div>
                <div className={styles.group}>
                  <p className={`${styles.groupLabel} ${styles.groupLabelGood}`}>{c.UI.missedLabel}</p>
                  <Facts items={s.missed} />
                </div>
              </>
            )}

            {s.kind === 'numbered' && (
              <>
                <p className={`${blocks.text} ${blocks.muted}`}>{s.intro}</p>
                <ol className={styles.steps}>
                  {s.steps.map((st, j) => (
                    <li key={j} className={styles.step}>
                      <span className={styles.stepNum} aria-hidden="true">{String(j + 1).padStart(2, '0')}</span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
                {s.note && <p className={blocks.text}>{s.note}</p>}
              </>
            )}

            {s.kind === 'tables' && (
              <>
                <p className={`${blocks.text} ${blocks.muted}`}>{s.intro}</p>
                <div className={blocks.stack}>
                  {s.tables.map((tb, j) => (
                    <div key={j} className={styles.tableCard}>
                      <p className={styles.tableLabel}>{tb.label}</p>
                      <div className={styles.tableScroll}>
                        <table className={styles.table}>
                          <tbody>
                            {tb.rows.map((r, k) => (
                              <tr key={k}>
                                <th scope="row">{r[0]}</th>
                                <td>{r[1]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
                {s.note && <p className={blocks.text}>{s.note}</p>}
              </>
            )}

            {s.kind === 'occupations' && (
              <>
                <p className={`${blocks.text} ${blocks.muted}`}>{s.intro}</p>
                <LinkRows items={s.jobs.map(jb => ({ href: jb.href, title: jb.title, desc: jb.line }))} />
              </>
            )}
          </Section>
        )
      })}

      <Section tone={tone(c.sections.length)} title={c.UI.faqHeading} titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqSchema above uses the raw string. */}
        <Accordion items={c.faqs} />
      </Section>

      <Section tone={tone(c.sections.length + 1)} title={c.UI.guidesHeading} titleId="guides-title">
        <LinkRows items={c.guides.map(g => ({ href: g.href, title: g.label, desc: g.desc }))} />
        <p className={styles.groupLabel}>{c.UI.servicesLabel}</p>
        <div className={styles.chips}>
          {c.services.map((sv, i) => (
            <Link key={i} href={sv.href} className={styles.chip}>{sv.label}</Link>
          ))}
        </div>
        {c.hubLink !== false && (
          <p><Link href={c.UI.hubHref} className={blocks.textLink}>{c.UI.otherJobs}</Link></p>
        )}
      </Section>

      <Section tone="forest" title={c.UI.guaranteeHeading} titleId="cta-title" className={styles.closing}>
        <p className={`${blocks.text} ${blocks.onForest}`}>{c.UI.guaranteeBody}</p>
        <WaButton href={c.WA} position="section" topic="expenses" lang={c.lang} tone="light">{c.UI.ctaLabel}</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>{c.UI.ctaSub}</p>
        <p className={styles.disclaimer}>{c.UI.disclaimer}</p>
      </Section>

      <MobileCta href={c.WA} lang={c.lang} topic="expenses" />
    </>
  )
}
