'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { type Guide, type Category, categories, categoryMeta } from './data'
import { Section } from '@/components/wht/Section'
import { Mark } from '@/components/wht/Type'
import { blocks } from '@/components/wht/Blocks'
import { blog, PageHead, ArticleCard, CtaBand } from '@/components/wht/BlogBlocks'
import { GuideCta } from '@/components/ui/GuideCta'
import { trackEvent } from './analytics'

const VISUALLY_HIDDEN: React.CSSProperties = {
  position: 'absolute', width: 1, height: 1, margin: -1, padding: 0, overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0,
}


export type BlogUIStrings = {
  breadcrumbHome: string
  breadcrumbBlog: string
  blogLabel: string
  h1Line1: string
  h1Line2: string
  description: string
  statsArticles: string
  statsCategories: string
  searchPlaceholder: string
  clearSearch: string
  allArticles: string
  noResults: string
  showingResults: string
  resultsMatching: string
  matching: string
  tryDifferent: string
  noArticlesCategory: string
  minRead: string
  readMore: string
  showing: string
  of: string
  article: string
  articles: string
}

const enUI: BlogUIStrings = {
  breadcrumbHome: 'Home',
  breadcrumbBlog: 'Blog',
  blogLabel: 'Blog',
  h1Line1: 'Working holiday tax guides:',
  h1Line2: 'TFN, tax returns, super and ABN',
  description: 'Get your tax refund, claim your superannuation, set up your TFN or ABN. Practical guides for 417 and 462 visa backpackers.',
  statsArticles: 'Articles',
  statsCategories: 'Categories',
  searchPlaceholder: 'Search articles...',
  clearSearch: 'Clear search',
  allArticles: 'All articles',
  noResults: 'No articles found for',
  showingResults: 'Showing',
  resultsMatching: 'articles matching',
  matching: 'matching',
  tryDifferent: 'Try a different search term or browse all articles.',
  noArticlesCategory: 'No articles in this category yet.',
  minRead: 'min read',
  readMore: 'Read more',
  showing: 'Showing',
  of: 'of',
  article: 'article',
  articles: 'articles',
}

const PER_PAGE = 9

const STAT_UI: Record<'en' | 'de' | 'ja' | 'fr' | 'it' | 'es', { taxYear: string; freeNum: string; freeLabel: string }> = {
  en: { taxYear: 'Tax year', freeNum: 'Free', freeLabel: 'No sign-up' },
  de: { taxYear: 'Steuerjahr', freeNum: 'Frei', freeLabel: 'Kostenlos' },
  ja: { taxYear: '税年度', freeNum: '無料', freeLabel: '登録不要' },
  fr: { taxYear: 'Année fiscale', freeNum: 'Gratuit', freeLabel: 'Sans inscription' },
  it: { taxYear: 'Anno fiscale', freeNum: 'Gratis', freeLabel: 'Senza registrazione' },
  es: { taxYear: 'Año fiscal', freeNum: 'Gratis', freeLabel: 'Sin registro' },
}

// Icon-only prev/next controls need a name of their own, and the surrounding
// nav needs one too. These are the only three strings Pagination adds, so they
// live here rather than being pushed into BlogUIStrings, which is shared with
// the German and Japanese blogs and typed against their own data files.
type BlogLang = 'en' | 'de' | 'ja' | 'fr' | 'it' | 'es'

const PAGINATION_UI: Record<BlogLang, { nav: string; prev: string; next: string; page: (n: number) => string }> = {
  en: { nav: 'Pagination', prev: 'Previous page', next: 'Next page', page: (n) => `Page ${n}` },
  de: { nav: 'Seitennavigation', prev: 'Vorherige Seite', next: 'Nächste Seite', page: (n) => `Seite ${n}` },
  ja: { nav: 'ページ送り', prev: '前のページ', next: '次のページ', page: (n) => `${n}ページ目` },
  fr: { nav: 'Pagination', prev: 'Page précédente', next: 'Page suivante', page: (n) => `Page ${n}` },
  it: { nav: 'Paginazione', prev: 'Pagina precedente', next: 'Pagina successiva', page: (n) => `Pagina ${n}` },
  es: { nav: 'Paginación', prev: 'Página anterior', next: 'Página siguiente', page: (n) => `Página ${n}` },
}

function Pagination({
  total,
  page,
  onPage,
  lang = 'en',
}: {
  total: number
  page: number
  onPage: (p: number) => void
  lang?: BlogLang
}) {
  const totalPages = Math.ceil(total / PER_PAGE)
  const t = PAGINATION_UI[lang] ?? PAGINATION_UI.en
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages: (number | '...')[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
      return pages
    }
    pages.push(1)
    if (page > 3) pages.push('...')
    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (page < totalPages - 2) pages.push('...')
    pages.push(totalPages)
    return pages
  }

  return (
    <nav aria-label={t.nav} className={blog.pager}>
      <button
        type="button"
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        aria-label={t.prev}
        className={blog.pageBtn}
      >
        <span aria-hidden="true">‹</span>
      </button>
      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={`dot-${i}`} aria-hidden="true" className={blog.pageBtn} style={{ border: 'none', background: 'transparent', cursor: 'default' }}>…</span>
        ) : (
          <button
            type="button"
            key={p}
            onClick={() => onPage(p as number)}
            aria-label={t.page(p as number)}
            aria-current={page === p ? 'page' : undefined}
            className={`${blog.pageBtn} ${page === p ? blog.pageOn : ''}`}
          >
            {p}
          </button>
        )
      )}
      <button
        type="button"
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        aria-label={t.next}
        className={blog.pageBtn}
      >
        <span aria-hidden="true">›</span>
      </button>
    </nav>
  )
}

// English category slugs, keyed by category. The German and Japanese blogs
// pass their own map because their Medicare hub is /medicare where English
// uses /medicare-and-other.
const EN_CATEGORY_SLUGS: Record<string, string> = Object.fromEntries(
  categoryMeta.map(c => [c.category, c.slug])
)

function getCategorySlug(cat: Category, slugs: Record<string, string>): string {
  return slugs[cat] ?? EN_CATEGORY_SLUGS[cat] ?? ''
}

/**
 * A modifier-click, a middle-click or a right-click has to behave like a real
 * link (new tab, copy address), so only a plain left click is intercepted to
 * run the instant client-side filter instead of navigating.
 */
function isPlainLeftClick(e: React.MouseEvent): boolean {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey
}

export type GuideCard = Omit<Guide, 'body'>

export default function BlogClient({
  guides,
  initialCategory,
  lang = 'en',
  ui = enUI,
  blogBasePath = '/blog',
  homePath = '/',
  categoryBasePath = '/blog/category',
  categorySlugs = EN_CATEGORY_SLUGS,
  visibleCategories,
  categoryLabels,
  photo,
}: {
  /**
   * Deliberately without `body`.
   *
   * This is a client component, so every field on every object here is
   * serialised into the RSC payload and shipped to the phone. Passing the full
   * Guide type meant /blog sent the complete text of all 154 articles, 351 KB
   * gzipped, of which the page renders not one word. The listing needs the
   * card fields only.
   */
  guides: GuideCard[]
  initialCategory?: Category
  lang?: BlogLang
  ui?: BlogUIStrings
  blogBasePath?: string
  homePath?: string
  /** Where this locale's category hubs live, e.g. '/de/blog/category'. */
  categoryBasePath?: string
  /** Category -> slug for this locale. Must be a plain object: it crosses the
   *  server/client boundary, so it cannot be a function. */
  categorySlugs?: Record<string, string>
  /** fr / it / es: only these categories get a pill and a count (those with at least one guide). Plain array: crosses the server/client boundary. */
  visibleCategories?: Category[]
  /** fr / it / es: display labels for the category pills and card meta. Plain object. */
  categoryLabels?: Record<string, string>
  /** Optional page photo, rendered by the server page (it reads the image manifest). */
  photo?: React.ReactNode
}) {
  const [page, setPage] = useState(1)
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>(initialCategory ?? 'All')

  // Filter by category
  const filtered = useMemo(() => {
    let result = guides
    if (activeCategory !== 'All') {
      result = result.filter(g => g.category === activeCategory)
    }
    return result
  }, [guides, activeCategory])

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // Count articles per category for badge counts in the filter pills.
  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = { All: guides.length }
    for (const g of guides) {
      counts[g.category] = (counts[g.category] ?? 0) + 1
    }
    return counts
  }, [guides])

  // Reset to page 1 when filters change
  const handleCategoryChange = (cat: Category | 'All') => {
    setActiveCategory(cat)
    setPage(1)
    trackEvent('blog_category_filter', { category: cat })
  }

  const stat = STAT_UI[lang] ?? STAT_UI.en
  const statTitle = stat.taxYear
  const freeNum = stat.freeNum
  const freeLabel = stat.freeLabel
  const cats = visibleCategories ?? categories
  const labelOf = (c: string) => categoryLabels?.[c] ?? c

  return (
    <div className={blocks.underHeader}>
      <PageHead
        titleId="blog-title"
        crumbsLabel="Breadcrumb"
        crumbs={[
          { label: ui.breadcrumbHome, href: homePath },
          { label: ui.breadcrumbBlog },
        ]}
        top={<p className={blog.countRow}>{ui.blogLabel}</p>}
        title={<>{ui.h1Line1} <Mark>{ui.h1Line2}</Mark></>}
        lead={ui.description}
      >
        <ul className={blog.stats}>
          <li className={blog.stat}><p className={blog.statNum}>{guides.length}</p><p className={blog.statLabel}>{ui.statsArticles}</p></li>
          <li className={blog.stat}><p className={blog.statNum}>{cats.length}</p><p className={blog.statLabel}>{ui.statsCategories}</p></li>
          <li className={blog.stat}><p className={blog.statNum}>2025-26</p><p className={blog.statLabel}>{statTitle}</p></li>
          <li className={blog.stat}><p className={blog.statNum}>{freeNum}</p><p className={blog.statLabel}>{freeLabel}</p></li>
        </ul>

        {/* Category filter pills.
            These are anchors pointing at the real category page, so a crawler
            reaches every category hub; a plain left click still preventDefaults
            into the same instant client-side filter. prefetch={false} because
            the click does not navigate. */}
        <nav aria-label={ui.statsCategories} className={blog.pills}>
          <Link
            href={blogBasePath}
            prefetch={false}
            onClick={(e) => {
              if (!isPlainLeftClick(e)) return
              e.preventDefault()
              handleCategoryChange('All')
            }}
            aria-current={activeCategory === 'All' ? 'true' : undefined}
            className={`${blog.pill} ${activeCategory === 'All' ? blog.pillOn : ''}`}
          >
            {ui.allArticles}
            <span className={blog.pillCount}>{countsByCategory.All}</span>
          </Link>
          {cats.map(cat => (
            <Link
              key={cat}
              href={`${categoryBasePath}/${getCategorySlug(cat, categorySlugs)}`}
              prefetch={false}
              onClick={(e) => {
                if (!isPlainLeftClick(e)) return
                e.preventDefault()
                handleCategoryChange(cat)
              }}
              aria-current={activeCategory === cat ? 'true' : undefined}
              className={`${blog.pill} ${activeCategory === cat ? blog.pillOn : ''}`}
            >
              {labelOf(cat)}
              <span className={blog.pillCount}>{countsByCategory[cat] ?? 0}</span>
            </Link>
          ))}
        </nav>
      </PageHead>

      {photo ? <div className={blog.photoWrap}>{photo}</div> : null}

      <Section tone="pale" width="wide">
        {/* Heading level 2 for the card list, so the cards' h3 titles do not skip a level under the page h1. */}
        <h2 style={VISUALLY_HIDDEN}>{activeCategory === 'All' ? ui.allArticles : labelOf(activeCategory)}</h2>
        {filtered.length === 0 ? (
          <div className={blog.empty}>
            <p>{ui.noArticlesCategory}</p>
          </div>
        ) : (
          <div className={blog.grid}>
            {paginated.map(article => (
              <ArticleCard
                key={article.slug}
                href={`${blogBasePath}/${article.slug}`}
                meta={`${labelOf(article.category)} · ${article.readTime} ${ui.minRead}`}
                title={article.title}
                desc={article.description}
                cta={ui.readMore}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          total={filtered.length}
          page={page}
          lang={lang}
          onPage={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        />

        {/* Count */}
        {filtered.length > 0 && (
          <p className={blog.countNote}>
            {ui.showing} {(page - 1) * PER_PAGE + 1}-{Math.min(page * PER_PAGE, filtered.length)} {ui.of} {filtered.length} {filtered.length === 1 ? ui.article : ui.articles}
          </p>
        )}
      </Section>

      <CtaBand>
        <GuideCta category="Tax Return" slug="blog-index" lang={lang} />
      </CtaBand>

      <div aria-hidden="true" className="md:hidden" style={{ height: 'calc(84px + env(safe-area-inset-bottom, 0px))' }} />
    </div>
  )
}
