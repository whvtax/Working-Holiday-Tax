'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { type Guide, type Category, categories, getCategoryColor, categoryMeta } from './data'
import CategoryHero from './[slug]/CategoryHero'
import { fuzzySearch } from './search'
import { trackEvent, trackSearchDebounced } from './analytics'


export type BlogUIStrings = {
  breadcrumbHome: string
  breadcrumbBlog: string
  blogLabel: string
  h1Line1: string
  h1Line2: string
  description: string
  statsArticles: string
  statsCategories: string
  statsCountries: string
  statsBackpackers: string
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
  h1Line1: 'Everything you need to know',
  h1Line2: 'about tax in Australia',
  description: 'Practical articles on TFN, tax returns, super, and ABN - written for working holiday makers, explained simply.',
  statsArticles: 'Articles',
  statsCategories: 'Categories',
  statsCountries: 'Countries',
  statsBackpackers: 'backpackers helped',
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

function Pagination({
  total,
  page,
  onPage,
}: {
  total: number
  page: number
  onPage: (p: number) => void
}) {
  const totalPages = Math.ceil(total / PER_PAGE)
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

  const btnBase: React.CSSProperties = {
    minWidth: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    border: '1px solid #E2EFE9',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    color: '#587066',
    transition: 'all 0.2s ease',
    padding: '0 12px',
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '48px', flexWrap: 'wrap' }}>
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        style={{ ...btnBase, opacity: page === 1 ? 0.3 : 1 }}
        className="pagination-btn"
      >
        ‹
      </button>
      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={`dot-${i}`} style={{ ...btnBase, border: 'none', cursor: 'default', color: '#8AADA3' }}>…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPage(p as number)}
            style={{
              ...btnBase,
              background: page === p ? '#0B5240' : 'transparent',
              color: page === p ? '#fff' : '#587066',
              border: `1px solid ${page === p ? '#0B5240' : '#E2EFE9'}`,
              fontWeight: page === p ? 700 : 500,
            }}
            className="pagination-btn"
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPage(page + 1)}
        disabled={page === Math.ceil(total / PER_PAGE)}
        style={{ ...btnBase, opacity: page === Math.ceil(total / PER_PAGE) ? 0.3 : 1 }}
        className="pagination-btn"
      >
        ›
      </button>
    </div>
  )
}

function getCategorySlug(cat: Category): string {
  const meta = categoryMeta.find(c => c.category === cat)
  return meta?.slug ?? ''
}

export default function BlogClient({
  guides,
  initialCategory,
  lang = 'en',
  ui = enUI,
  blogBasePath = '/blog',
  homePath = '/',
}: {
  guides: Guide[]
  initialCategory?: Category
  lang?: 'en' | 'de'
  ui?: BlogUIStrings
  blogBasePath?: string
  homePath?: string
}) {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>(initialCategory ?? 'All')

  // Filter by category and search
  const filtered = useMemo(() => {
    let result = guides
    if (activeCategory !== 'All') {
      result = result.filter(g => g.category === activeCategory)
    }
    if (searchQuery.trim()) {
      // Fuzzy search handles typos, synonyms (super → superannuation, etc.), and partial matches.
      // Results are also re-sorted by relevance score.
      result = fuzzySearch(result, searchQuery)
    }
    return result
  }, [guides, activeCategory, searchQuery])

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

  const handleSearchChange = (q: string) => {
    setSearchQuery(q)
    setPage(1)
    if (q.trim()) {
      // Compute result count for the analytics event (so we can see no-results queries)
      const filteredForCount = activeCategory !== 'All'
        ? guides.filter(g => g.category === activeCategory)
        : guides
      const resultCount = fuzzySearch(filteredForCount, q).length
      trackSearchDebounced(q, resultCount)
    }
  }

  return (
    <>
      {/* All blog styles are in globals.css for cleanliness and proper SSR */}

      {/* Hero */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-12">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <a href={homePath} className="transition-colors hover:text-forest-500" style={{ color: 'inherit', textDecoration: 'none' }}>{ui.breadcrumbHome}</a>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">{ui.breadcrumbBlog}</span>
          </nav>

          <div style={{ maxWidth: '720px', marginBottom: '32px' }}>

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>
                {ui.blogLabel}
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '12px' }}>
              <span style={{ display: 'block' }}>{ui.h1Line1}</span>
              <span style={{ display: 'block', color: '#0B5240' }}>{ui.h1Line2}</span>
            </h1>

            <p className="font-light"
              style={{ fontSize: 'clamp(13px,1.2vw,16px)', lineHeight: 1.65, color: 'rgba(10,15,13,0.58)', maxWidth: '52ch', marginBottom: '24px' }}>
              {ui.description}
            </p>

            {/* Stats grid - credibility signals at the top, focused on what working holiday makers care about */}
            <div className="hero-stats">
              <div className="stat-card" style={{ padding: '16px 18px', background: '#F7F9F8', borderRadius: '12px', border: '1px solid #E2EFE9' }}>
                <div className="font-serif" style={{ fontSize: '26px', fontWeight: 800, color: '#0B5240', lineHeight: 1 }}>{guides.length}</div>
                <div style={{ fontSize: '11.5px', color: '#587066', marginTop: '5px', fontWeight: 500, letterSpacing: '0.02em' }}>{ui.statsArticles}</div>
              </div>
              <div className="stat-card" style={{ padding: '16px 18px', background: '#F7F9F8', borderRadius: '12px', border: '1px solid #E2EFE9' }}>
                <div className="font-serif" style={{ fontSize: '26px', fontWeight: 800, color: '#0B5240', lineHeight: 1 }}>{categories.length}</div>
                <div style={{ fontSize: '11.5px', color: '#587066', marginTop: '5px', fontWeight: 500, letterSpacing: '0.02em' }}>{ui.statsCategories}</div>
              </div>
              <div className="stat-card" style={{ padding: '16px 18px', background: '#EAF6F1', borderRadius: '12px', border: '1px solid #C8EAE0' }}>
                <div className="font-serif" style={{ fontSize: '26px', fontWeight: 800, color: '#0B5240', lineHeight: 1 }}>2025-26</div>
                <div style={{ fontSize: '11.5px', color: '#0B5240', marginTop: '5px', fontWeight: 500, letterSpacing: '0.02em' }}>{lang === 'de' ? 'Steuerjahr' : 'Tax year'}</div>
              </div>
              <div className="stat-card" style={{ padding: '16px 18px', background: '#FDF0D5', borderRadius: '12px', border: '1px solid #E9A020' }}>
                <div className="font-serif" style={{ fontSize: '26px', fontWeight: 800, color: '#7A4A00', lineHeight: 1 }}>{lang === 'de' ? 'Frei' : 'Free'}</div>
                <div style={{ fontSize: '11.5px', color: '#7A4A00', marginTop: '5px', fontWeight: 500, letterSpacing: '0.02em' }}>{lang === 'de' ? 'Kostenlos' : 'No sign-up'}</div>
              </div>
            </div>
          </div>

          {/* Search input */}
          <div style={{ maxWidth: '560px', marginBottom: '24px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#8AADA3' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={ui.searchPlaceholder}
              className="search-input"
              style={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                paddingRight: searchQuery ? '40px' : '16px',
                borderRadius: '12px',
                border: '1px solid #E2EFE9',
                background: '#fff',
                fontSize: '14px',
                color: '#2A3C34',
                fontWeight: 400,
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              aria-label={ui.searchPlaceholder}
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="clear-search-btn"
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#8AADA3', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label={ui.clearSearch}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Category filter pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              onClick={() => handleCategoryChange('All')}
              className="category-pill"
              style={{
                padding: '8px 16px',
                borderRadius: '100px',
                border: `1px solid ${activeCategory === 'All' ? '#E9A020' : '#E2EFE9'}`,
                background: activeCategory === 'All' ? '#E9A020' : 'transparent',
                color: activeCategory === 'All' ? '#1A2822' : '#587066',
                fontSize: '13px',
                fontWeight: activeCategory === 'All' ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {ui.allArticles}
              <span style={{
                fontSize: '11px',
                padding: '1px 6px',
                borderRadius: '100px',
                background: activeCategory === 'All' ? 'rgba(26,40,34,0.15)' : '#E2EFE9',
                color: activeCategory === 'All' ? '#1A2822' : '#587066',
                fontWeight: 600,
              }}>
                {countsByCategory.All}
              </span>
            </button>
            {categories.map(cat => {
              const colors = getCategoryColor(cat)
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className="category-pill"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '100px',
                    border: `1px solid ${isActive ? colors.border : '#E2EFE9'}`,
                    background: isActive ? colors.bg : 'transparent',
                    color: isActive ? colors.text : '#587066',
                    fontSize: '13px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {cat}
                  <span style={{
                    fontSize: '11px',
                    padding: '1px 6px',
                    borderRadius: '100px',
                    background: isActive ? 'rgba(0,0,0,0.08)' : '#E2EFE9',
                    color: isActive ? colors.text : '#587066',
                    fontWeight: 600,
                  }}>
                    {countsByCategory[cat] ?? 0}
                  </span>
                </button>
              )
            })}
          </div>

        </div>
      </section>

      {/* Grid */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px 80px', borderTop: '1px solid #E2EFE9' }}>

        {/* Result count + search context */}
        {searchQuery && (
          <div style={{ marginBottom: '24px', padding: '12px 16px', background: '#F7F9F8', borderRadius: '10px', fontSize: '13px', color: '#587066' }}>
            {filtered.length === 0
              ? <>{ui.noResults} <strong style={{ color: '#0B5240' }}>&ldquo;{searchQuery}&rdquo;</strong>. {ui.tryDifferent}</>
              : <>{ui.showingResults} <strong style={{ color: '#0B5240' }}>{filtered.length}</strong> {filtered.length === 1 ? ui.article : ui.articles} {ui.matching} <strong style={{ color: '#0B5240' }}>&ldquo;{searchQuery}&rdquo;</strong></>
            }
          </div>
        )}

        {filtered.length === 0 && !searchQuery ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#587066' }}>
            <p style={{ fontSize: '14px' }}>{ui.noArticlesCategory}</p>
          </div>
        ) : (
          <div className="blog-grid">
            {paginated.map(article => {
              const colors = getCategoryColor(article.category)
              return (
                <Link
                  key={article.slug}
                  href={`${blogBasePath}/${article.slug}`}
                  className="blog-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    padding: '0',
                    background: '#fff',
                    textDecoration: 'none',
                    borderRadius: '16px',
                    border: '1px solid #E2EFE9',
                  }}
                >
                  {/* Decorative category illustration at the top of the card */}
                  <div className="blog-card-hero" style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: '15px 15px 0 0' }}>
                    <CategoryHero category={article.category} title={article.title} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px 22px 22px', flex: 1 }}>
                    {/* Category badge + meta */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '10.5px',
                        padding: '3px 10px',
                        borderRadius: '100px',
                        background: colors.bg,
                        color: colors.text,
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                        border: `1px solid ${colors.border}`,
                      }}>
                        {article.category}
                      </span>
                      <span style={{ color: '#CDE3DB' }}>·</span>
                      <span style={{ fontSize: '11.5px', color: '#8AADA3' }}>{article.readTime} {ui.minRead}</span>
                    </div>

                    {/* Title */}
                    <h2
                      className="font-serif"
                      style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', lineHeight: 1.35, letterSpacing: '-0.015em', margin: 0 }}
                    >
                      {article.title}
                    </h2>

                    {/* Description */}
                    <p style={{ fontSize: '13px', color: '#587066', lineHeight: 1.65, margin: 0, fontWeight: 300, flex: 1 }}>
                      {article.description}
                    </p>

                    {/* CTA */}
                    <span style={{ fontSize: '12.5px', color: '#0B5240', fontWeight: 600, marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      {ui.readMore} <span className="read-arrow">→</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          total={filtered.length}
          page={page}
          onPage={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        />

        {/* Count */}
        {filtered.length > 0 && (
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#8AADA3', marginTop: '16px' }}>
            {ui.showing} {(page - 1) * PER_PAGE + 1}-{Math.min(page * PER_PAGE, filtered.length)} {ui.of} {filtered.length} {filtered.length === 1 ? ui.article : ui.articles}
          </p>
        )}
      </section>
    </>
  )
}
