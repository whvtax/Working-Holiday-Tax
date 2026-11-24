import Link from 'next/link'
import type React from 'react'
import { jsonLdHtml } from '@/lib/json-ld-html'
import { SITE_URL } from '@/lib/constants'
import { newLocaleLanguages } from '@/lib/locale-pages'
import type { WaLang } from '@/lib/wa'
import { Accordion, type AccItem } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead } from '@/components/wht/Type'
import { blocks } from '@/components/wht/Blocks'
import { Crumb, TitleLinks, coreBlocks } from '@/components/wht/CoreBlocks'

/*
 * The "leaving Australia" hub, shared by the six language versions
 * (/leaving-australia and /de, /ja, /fr, /it, /es). Each page.tsx owns its
 * metadata and its words; this file owns the layout and the JSON-LD, so the
 * six pages cannot drift apart in structure.
 *
 * The page answers one question in order: what to do before you fly, what is
 * still open after you leave, and in which order. It links the money pages
 * (tax return, superannuation) and every problem guide that exists in that
 * language, and adds nothing that is not on an ATO page (facts: plan3
 * r16-facts.md, r13, r14, r20; each section carries its source).
 */

export const LEAVING_PATH = '/leaving-australia'
export const LEAVING_MODIFIED = '2026-11-24'

/** hreflang for every language version: the same map on all six pages and in the sitemap. */
export function leavingLanguages(): Record<string, string> {
  return {
    'en-AU': `${SITE_URL}${LEAVING_PATH}`,
    de: `${SITE_URL}/de${LEAVING_PATH}`,
    ja: `${SITE_URL}/ja${LEAVING_PATH}`,
    ...newLocaleLanguages(LEAVING_PATH),
    'x-default': `${SITE_URL}${LEAVING_PATH}`,
  }
}

/** ATO and myGov pages the six versions cite. */
export const SRC = {
  earlyLodge: 'https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-before-leaving-australia',
  fromOverseas: 'https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia',
  progress: 'https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return',
  missingRefund: 'https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds',
  dasp: 'https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp',
  atoHeld: 'https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/ato-held-super',
  paydaySuper: 'https://www.ato.gov.au/businesses-and-organisations/super-for-employers/about-payday-super',
  mygov: 'https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato',
} as const

/**
 * Guide links for one language. A guide is linked in the page's language only
 * when it exists there; in running text a missing one falls back to the English
 * guide with a note, and in lists it is left out.
 */
export function makeGuides(prefix: string, isLive: (slug: string) => boolean, enNote: string) {
  const href = (slug: string) => (isLive(slug) ? `${prefix}/blog/${slug}` : `/blog/${slug}`)
  const link = (slug: string, text: React.ReactNode) => (
    <Link href={href(slug)} className={blocks.textLink}>
      {text}
      {isLive(slug) ? null : enNote}
    </Link>
  )
  const list = (items: { slug: string; label: string }[]) =>
    items.filter(i => isLive(i.slug)).map(i => ({ href: href(i.slug), label: i.label }))
  return { href, link, list, isLive }
}

const cellStyle = { padding: '10px 12px', borderTop: '1px solid var(--wht-line)', textAlign: 'left' as const, verticalAlign: 'top' as const }

/** The order of steps, as a two column table. */
export function StepTable({ head, rows, caption }: {
  head: [string, string]
  rows: { when: string; what: React.ReactNode }[]
  caption: React.ReactNode
}) {
  return (
    <div style={{ overflowX: 'auto' }} tabIndex={0} role="region" aria-label={head.join(', ')}>
      <table className={blocks.text} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <caption className={blocks.small} style={{ textAlign: 'left', captionSide: 'bottom', paddingTop: 10 }}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col" style={cellStyle}>{head[0]}</th>
            <th scope="col" style={cellStyle}>{head[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <th scope="row" style={cellStyle}>{r.when}</th>
              <td style={cellStyle}>{r.what}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** A numbered list of steps with a bold lead-in. */
export function StepList({ items }: { items: { title: string; body: React.ReactNode }[] }) {
  return (
    <ol className={blocks.text} style={{ paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((it, i) => (
        <li key={i}>
          <strong>{it.title}</strong> {it.body}
        </li>
      ))}
    </ol>
  )
}

/** A plain list of links (the problem guides). */
export function LinkList({ items }: { items: { href: string; label: string }[] }) {
  return (
    <ul className={blocks.text} style={{ paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map(it => (
        <li key={it.href}>
          <Link href={it.href} className={blocks.textLink}>{it.label}</Link>
        </li>
      ))}
    </ul>
  )
}

export interface LeavingSection {
  id: string
  title: string
  tone?: 'white' | 'pale' | 'amber'
  body: React.ReactNode
}

export interface LeavingPageProps {
  lang: WaLang
  /** BCP 47 tag for JSON-LD, e.g. en-AU, de-DE. */
  inLanguage: string
  /** This version's path, e.g. /de/leaving-australia. */
  path: string
  /** The language home, e.g. /de. */
  homeHref: string
  crumb: { home: string; current: string; label: string }
  wa: string
  hero: {
    eyebrow: React.ReactNode
    title: React.ReactNode
    lead: React.ReactNode
    sub: React.ReactNode
    cta: string
    hint: string
    hintHref: string
    note: string
  }
  sections: LeavingSection[]
  faqTitle: string
  faqs: AccItem[]
  guidesTitle: string
  guides: { href: string; label: string }[]
  cta: { title: string; text: string; button: string; note: string }
  /** The page name for the WebPage schema (the H1 as plain text). */
  name: string
}

export function LeavingAustraliaPage(p: LeavingPageProps) {
  const url = `${SITE_URL}${p.path}`
  const homeUrl = p.homeHref === '/' ? SITE_URL : `${SITE_URL}${p.homeHref}`

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: p.inLanguage,
    mainEntity: p.faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: p.crumb.home, item: homeUrl },
      { '@type': 'ListItem', position: 2, name: p.crumb.current, item: url },
    ],
  }
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: p.name,
    inLanguage: p.inLanguage,
    dateModified: LEAVING_MODIFIED,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(breadcrumbSchema) }} />

      <div className={blocks.underHeader}>
        <Crumb home={p.crumb.home} current={p.crumb.current} label={p.crumb.label} href={p.homeHref} />
        <Hero eyebrow={p.hero.eyebrow} title={p.hero.title}>
          <div className="hero-sub">
            <Lead>{p.hero.lead}</Lead>
            <p className={blocks.text}>{p.hero.sub}</p>
          </div>
          <div className={coreBlocks.actions}>
            <WaButton href={p.wa} position="hero" topic="tax-return" lang={p.lang}>{p.hero.cta}</WaButton>
            <a href={p.hero.hintHref} className={coreBlocks.hint}>{p.hero.hint}</a>
          </div>
          <p className={heroStyles.note}>{p.hero.note}</p>
        </Hero>
      </div>

      {p.sections.map(s => (
        <Section key={s.id} id={s.id} tone={s.tone ?? 'white'} title={s.title} titleId={`${s.id}-title`}>
          {s.body}
        </Section>
      ))}

      <Section title={p.faqTitle} titleId="faq-title">
        <Accordion items={p.faqs} />
      </Section>

      <Section tone="pale" title={p.guidesTitle} titleId="guides-title">
        <TitleLinks items={p.guides} />
      </Section>

      <Section tone="forest" title={p.cta.title} titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>{p.cta.text}</p>
        <WaButton href={p.wa} position="footer" topic="tax-return" lang={p.lang} tone="light">{p.cta.button}</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>{p.cta.note}</p>
      </Section>

      <MobileCta href={p.wa} lang={p.lang} topic="tax-return" />
    </>
  )
}
