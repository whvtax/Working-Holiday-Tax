import Link from 'next/link'
import styles from './BlogBlocks.module.css'

/** Blog-specific WHT blocks (article header, listing card, closing band). Typography classes live in `blog`. */
export const blog = styles

export interface Crumb { label: string; href?: string }

/** Breadcrumb trail; the last crumb is the current page. */
export function Crumbs({ items, ariaLabel }: { items: Crumb[]; ariaLabel?: string }) {
  return (
    <nav aria-label={ariaLabel} className={styles.crumbs}>
      {items.map((c, i) => {
        const last = i === items.length - 1
        return (
          <span key={i} style={{ display: 'contents' }}>
            {c.href && !last ? <Link href={c.href}>{c.label}</Link> : <span aria-current={last ? 'page' : undefined} className={last ? styles.crumbCurrent : undefined}>{c.label}</span>}
            {!last ? <span aria-hidden="true" className={styles.dot}>/</span> : null}
          </span>
        )
      })}
    </nav>
  )
}

/** Category chip (link) followed by plain meta parts, separated by dots. */
export function ArticleMeta({ chip, parts }: { chip?: { href: string; label: string }; parts: string[] }) {
  return (
    <div className={styles.meta}>
      {chip ? <><Link href={chip.href} className={styles.chip}>{chip.label}</Link><span aria-hidden="true" className={styles.dot}>·</span></> : null}
      {parts.map((p, i) => (
        <span key={i} style={{ display: 'contents' }}>
          {i > 0 ? <span aria-hidden="true" className={styles.dot}>·</span> : null}
          <span>{p}</span>
        </span>
      ))}
    </div>
  )
}

/** Left aligned header for articles and listing pages. */
export function PageHead({ crumbs, crumbsLabel, top, title, titleId = 'blog-title', lead, leadClassName, titleStyle, leadStyle, children }: {
  crumbs: Crumb[]
  crumbsLabel?: string
  top?: React.ReactNode
  title: React.ReactNode
  titleId?: string
  lead?: React.ReactNode
  leadClassName?: string
  titleStyle?: React.CSSProperties
  leadStyle?: React.CSSProperties
  children?: React.ReactNode
}) {
  return (
    <header className={styles.head} aria-labelledby={titleId}>
      <div className={styles.headInner}>
        <Crumbs items={crumbs} ariaLabel={crumbsLabel} />
        <div className={styles.headText}>
          {top}
          <h1 id={titleId} className={styles.h1} style={titleStyle}>{title}</h1>
          {lead ? <p className={[styles.lead, leadClassName].filter(Boolean).join(' ')} style={leadStyle}>{lead}</p> : null}
          {children}
        </div>
      </div>
    </header>
  )
}

/** A whole-card link in a listing. */
export function ArticleCard({ href, meta, title, desc, cta }: { href: string; meta: string; title: string; desc: string; cta: string }) {
  return (
    <Link href={href} className={styles.card}>
      <span className={styles.cardMeta}>{meta}</span>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{desc}</p>
      <span className={styles.go}>{cta} <span aria-hidden="true">→</span></span>
    </Link>
  )
}

/** Forest closing band; children are the shared guide CTA. */
export function CtaBand({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.ctaBand} data-layer="wht">
      <div className={styles.ctaInner}>{children}</div>
    </section>
  )
}

/** PAGE_SCENE key for a category hub's photo (one per hub; Work Rights has none). */
const CATEGORY_PHOTO: Record<string, string> = {
  tfn: 'tfn', abn: 'abn', 'tax-return': 'tax-return', super: 'superannuation',
  medicare: 'medicare', 'medicare-and-other': 'medicare',
}
export function categoryPhotoKey(slug: string): string | undefined {
  return CATEGORY_PHOTO[slug]
}
