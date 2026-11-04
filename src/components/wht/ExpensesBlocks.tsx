/**
 * The occupation-expenses page in the WHT layout system (/expenses and
 * /expenses/<job> in en, de and ja). Same content contract as the original
 * template, so a page file only changes which component it renders.
 * Schema builders are unchanged: the markup is new, the data is not.
 */
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { Accordion } from '@/components/ui/Accordion'
import { WaButton } from '@/components/wht/WaButton'
import { Section as Block } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { ImageSlot } from '@/components/wht/ImageSlot'
import { PagePhoto } from '@/components/wht/PagePhoto'
import { Compare, LinkRows, blocks } from '@/components/wht/Blocks'
import styles from './ExpensesBlocks.module.css'

/* ── Content types (same shape as the pages already provide) ───────────── */

export type Section =
  | { kind: 'answer'; h2: string; paras: string[] }
  | { kind: 'items'; h2: string; intro: string; items: { t: string; d: string }[] }
  | { kind: 'traps'; h2: string; intro: string; wrong: { t: string; d: string }[]; missed: { t: string; d: string }[] }
  | { kind: 'numbered'; h2: string; intro: string; steps: string[]; note?: string }
  | { kind: 'tables'; h2: string; intro: string; tables: { label: string; rows: string[][] }[]; note?: string }
  | { kind: 'occupations'; h2: string; intro: string; jobs: { href: string; title: string; line: string }[] }
  | { kind: 'note'; label: string; title: string; body: string }

export interface JobExpensesUi {
  ctaLabel: string
  ctaSub: string
  guaranteeHeading: string
  guaranteeBody: string
  faqHeading: string
  guidesHeading: string
  otherJobs: string
  servicesLabel: string
  wrongLabel: string
  missedLabel: string
  disclaimer: string
  hubHref: string
}

export interface MygovUi {
  kicker: string
  h2lead: string
  h2accent: string
  lede: string
  colLeft: string
  colRight: string
  close: string
}

export interface JobExpensesContent {
  lang: 'en' | 'de' | 'ja' | 'fr' | 'it' | 'es'
  /** The page's own path, e.g. '/de/expenses/hospitality'. */
  path: string
  /** Route key without language prefix, for the page photo ('expenses/fifo'). Omit on the hub. */
  photoKey?: string
  articleHeadline: string
  articleDescription: string
  inLanguage: string
  WA: string
  UI: JobExpensesUi
  crumbs: { name: string; item: string }[]
  hero: { kicker: string; h1lead: string; h1accent: string; lede: string }
  sections: Section[]
  faqs: { question: string; answer: string }[]
  guides: { href: string; label: string; desc: string }[]
  services: { href: string; label: string }[]
  /** The hub only: the myGov comparison block under the hero. */
  mygov?: { ui: MygovUi; rows: { mygov: string; us: string }[] }
  /** The "see the other jobs" link. The hub passes false. */
  hubLink?: boolean
  /** The hub only: a hero photo slot instead of a page photo. */
  heroSlot?: { id: string; subject: string; alt: string }
}

function Paras({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split('\n\n').map((para, i) => (
        <p key={i} className={[blocks.text, className].filter(Boolean).join(' ')}>{para}</p>
      ))}
    </>
  )
}

function Group({ label, tone, items }: { label: string; tone: 'wrong' | 'missed'; items: { t: string; d: string }[] }) {
  return (
    <div>
      <p className={`${styles.groupLabel} ${tone === 'wrong' ? styles.groupWrong : styles.groupMissed}`}>{label}</p>
      <ul className={styles.list}>
        {items.map((it, i) => (
          <li key={i} className={styles.item}>
            <h3 className={styles.itemTitle}>{it.t}</h3>
            <p className={styles.itemBody}>{it.d}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function JobExpensesPage({ content: c }: { content: JobExpensesContent }) {
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
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Working Holiday Tax',
      url: SITE_URL,
    },
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

  // Japanese has no inter-word spaces, so the highlighted words join directly.
  const joiner = c.lang === 'ja' ? null : ' '
  const cellCls = c.lang === 'de' ? `${styles.cellWrap} ${styles.cellDe}` : styles.cellWrap

  // White and pale alternate down the page, starting white under the hero.
  let n = 0
  const nextTone = () => (n++ % 2 === 0 ? 'white' : 'pale') as 'white' | 'pale'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      {/* HERO */}
      <div className={blocks.underHeader}>
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <ol className={styles.crumbList}>
            {c.crumbs.map((b, i) => (
              <li key={i} className={styles.crumbItem}>
                {i > 0 && <span aria-hidden="true" className={styles.crumbSep}>/</span>}
                {i === c.crumbs.length - 1 ? (
                  <span aria-current="page" className={styles.crumbHere}>{b.name}</span>
                ) : (
                  <Link href={b.item} className={styles.crumbLink}>{b.name}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Hero
          title={
            <>
              <span className={blocks.kicker}>{c.hero.kicker}</span>
              {c.hero.h1lead}{joiner}<Mark>{c.hero.h1accent}</Mark>
            </>
          }
          media={c.heroSlot
            ? <ImageSlot id={c.heroSlot.id} className={heroStyles.media} subject={c.heroSlot.subject} alt={c.heroSlot.alt} priority />
            : undefined}
        >
          <div className="hero-sub"><Lead>{c.hero.lede}</Lead></div>
          <WaButton href={c.WA} position="hero" topic="expenses" lang={c.lang}>{c.UI.ctaLabel}</WaButton>
          <p className={heroStyles.note}>{c.UI.ctaSub}</p>
        </Hero>
      </div>

      {c.photoKey && (
        <div className={styles.photoWrap}>
          <PagePhoto page={c.photoKey} locale={c.lang} />
        </div>
      )}

      {/* THE OBJECTION, ANSWERED ABOUT DEDUCTIONS (hub only) */}
      {c.mygov && (
        <Block
          tone={nextTone()}
          eyebrow={c.mygov.ui.kicker}
          title={<>{c.mygov.ui.h2lead}{joiner}<Mark>{c.mygov.ui.h2accent}</Mark></>}
          titleId="mygov-title"
        >
          <p className={`${blocks.text} ${blocks.muted}`}>{c.mygov.ui.lede}</p>
          <div className={cellCls}>
            <Compare
              rows={c.mygov.rows.map(r => ({ left: r.mygov, right: r.us }))}
              leftLabel={c.mygov.ui.colLeft}
              rightLabel={c.mygov.ui.colRight}
            />
          </div>
          <p className={`${blocks.statement} ${styles.mygovClose}`}>{c.mygov.ui.close}</p>
        </Block>
      )}

      {/* BODY SECTIONS */}
      {c.sections.map((s, i) => {
        const tone = nextTone()
        const id = `s${i}-title`
        switch (s.kind) {
          case 'answer':
            return (
              <Block key={i} tone={tone} title={s.h2} titleId={id}>
                {s.paras.map((p, j) => <p key={j} className={blocks.text}>{p}</p>)}
              </Block>
            )
          case 'items':
            return (
              <Block key={i} tone={tone} title={s.h2} titleId={id}>
                <p className={`${blocks.text} ${blocks.muted}`}>{s.intro}</p>
                <ul className={styles.list}>
                  {s.items.map((it, j) => (
                    <li key={j} className={styles.item}>
                      <h3 className={styles.itemTitle}>{it.t}</h3>
                      <p className={styles.itemBody}>{it.d}</p>
                    </li>
                  ))}
                </ul>
              </Block>
            )
          case 'traps':
            return (
              <Block key={i} tone={tone} title={s.h2} titleId={id}>
                <p className={`${blocks.text} ${blocks.muted}`}>{s.intro}</p>
                <Group label={c.UI.wrongLabel} tone="wrong" items={s.wrong} />
                <Group label={c.UI.missedLabel} tone="missed" items={s.missed} />
              </Block>
            )
          case 'numbered':
            return (
              <Block key={i} tone={tone} title={s.h2} titleId={id}>
                <p className={`${blocks.text} ${blocks.muted}`}>{s.intro}</p>
                <ol className={styles.steps}>
                  {s.steps.map((t, j) => (
                    <li key={j} className={styles.step}>
                      <span className={styles.stepNum} aria-hidden="true">{String(j + 1).padStart(2, '0')}</span>
                      <p className={styles.stepText}>{t}</p>
                    </li>
                  ))}
                </ol>
                {s.note && <p className={blocks.text}>{s.note}</p>}
              </Block>
            )
          case 'tables':
            return (
              <Block key={i} tone={tone} title={s.h2} titleId={id}>
                <p className={`${blocks.text} ${blocks.muted}`}>{s.intro}</p>
                <div className={styles.tables}>
                  {s.tables.map((t, j) => (
                    <div key={j} className={styles.tableCard}>
                      <p className={styles.tableLabel}>{t.label}</p>
                      <div className={styles.tableScroll}>
                        <table className={styles.table}>
                          <tbody>
                            {t.rows.map((r, k) => (
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
              </Block>
            )
          case 'occupations':
            return (
              <Block key={i} tone={tone} title={s.h2} titleId={id}>
                <p className={`${blocks.text} ${blocks.muted}`}>{s.intro}</p>
                <LinkRows items={s.jobs.map(jb => ({ href: jb.href, title: jb.title, desc: jb.line }))} />
              </Block>
            )
          case 'note':
            return (
              <Block key={i} tone={tone} width="wide">
                <div className={`${blocks.notice} ${styles.noteWrap}`}>
                  <p className={styles.noteLabel}>{s.label}</p>
                  <p className={styles.noteTitle}>{s.title}</p>
                  <div className={styles.noteBody}><Paras text={s.body} /></div>
                </div>
              </Block>
            )
        }
      })}

      {/* FAQ */}
      <Block tone={nextTone()} title={c.UI.faqHeading} titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqSchema above uses the raw string. */}
        <Accordion items={c.faqs} />
      </Block>

      {/* GUIDES */}
      <Block tone={nextTone()} title={c.UI.guidesHeading} titleId="guides-title">
        <LinkRows items={c.guides.map(g => ({ href: g.href, title: g.label, desc: g.desc }))} />
        <p className={styles.noteLabel}>{c.UI.servicesLabel}</p>
        <div className={styles.chips}>
          {c.services.map((s, i) => (
            <Link key={i} href={s.href} className={styles.chip}>{s.label}</Link>
          ))}
        </div>
        {c.hubLink !== false && (
          <p><Link href={c.UI.hubHref} className={blocks.textLink}>{c.UI.otherJobs}</Link></p>
        )}
      </Block>

      {/* DISCLAIMER */}
      <Block tone="white" width="wide">
        <p className={styles.legal}>{c.UI.disclaimer}</p>
      </Block>

      {/* CLOSING CTA */}
      <Block tone="forest" title={c.UI.guaranteeHeading} titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>{c.UI.guaranteeBody}</p>
        <WaButton href={c.WA} position="section" topic="expenses" lang={c.lang} tone="light">{c.UI.ctaLabel}</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>{c.UI.ctaSub}</p>
      </Block>

      <MobileCta href={c.WA} lang={c.lang} topic="expenses" />
    </>
  )
}
