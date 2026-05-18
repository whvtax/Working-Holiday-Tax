'use client'

import { useState } from 'react'
import Link from 'next/link'
import { type Guide, type Category, categories, getCategoryColor, categoryMeta } from './data'

const PER_PAGE = 6



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
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    border: '1px solid #E2EFE9',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    color: '#587066',
    transition: 'all 0.15s',
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '48px' }}>
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        style={{ ...btnBase, opacity: page === 1 ? 0.3 : 1 }}
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
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPage(page + 1)}
        disabled={page === Math.ceil(total / PER_PAGE)}
        style={{ ...btnBase, opacity: page === Math.ceil(total / PER_PAGE) ? 0.3 : 1 }}
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
}: {
  guides: Guide[]
  initialCategory?: Category
}) {
  const [page, setPage] = useState(1)

  // The hub page (/blog) shows all guides. Category filtering moved to /blog/category/[slug]
  // for SEO. We keep initialCategory only as a defensive fallback; in practice this client is
  // always rendered without one on the main hub page.
  const filtered = initialCategory
    ? guides.filter(g => g.category === initialCategory)
    : guides

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <>
      {/* Hero with category links */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-12">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <a href="/" className="transition-colors hover:text-forest-500" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Blog</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>
                Blog
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '10px' }}>
              <span className="hidden lg:block">
                <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Everything you need to know</span>
                <span style={{ display: 'block', whiteSpace: 'nowrap', color: '#0B5240' }}>about tax in Australia</span>
              </span>
              <span className="lg:hidden">
                <span style={{ display: 'block', fontSize: '22px' }}>Everything you need to know</span>
                <span style={{ display: 'block', color: '#0B5240', fontSize: '22px' }}>about tax in Australia</span>
              </span>
            </h1>

            <p className="font-light"
              style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.65, color: 'rgba(10,15,13,0.58)', maxWidth: '44ch', marginBottom: '20px' }}>
              Clear, honest guides for working holiday makers. No jargon, no confusing forms - just the information you need, explained simply.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <Link
                href="/blog"
                style={{ padding: '6px 16px', borderRadius: '100px', border: `1px solid #E9A020`, background: '#E9A020', color: '#1A2822', fontSize: '13px', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}
              >
                All guides
              </Link>
              {categories.map(cat => {
                const slug = getCategorySlug(cat)
                return (
                  <Link
                    key={cat}
                    href={`/blog/category/${slug}`}
                    style={{ padding: '6px 16px', borderRadius: '100px', border: `1px solid #E2EFE9`, background: 'transparent', color: '#587066', fontSize: '13px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}
                  >
                    {cat}
                  </Link>
                )
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px 80px', borderTop: '1px solid #E2EFE9' }}>
        <div className="guides-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}>
          {paginated.map(guide => {
            const color = getCategoryColor(guide.category)
            return (
              <Link
                key={guide.slug}
                href={`/blog/${guide.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  padding: '28px',
                  background: '#fff',
                  textDecoration: 'none',
                  borderRadius: '16px',
                  border: '1px solid #E2EFE9',
                  transition: 'box-shadow 0.15s, border-color 0.15s',
                }}
                className="guide-card"
              >
                {/* Body */}
                <div className="guide-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                  {/* Meta */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11.5px', color: '#8AADA3' }}>{guide.readTime} min read</span>
                  </div>

                  {/* Title */}
                  <h2
                    className="font-serif"
                    style={{ fontSize: '15.5px', fontWeight: 700, color: '#080F0D', lineHeight: 1.35, letterSpacing: '-0.015em', margin: 0 }}
                  >
                    {guide.title}
                  </h2>

                  {/* Description */}
                  <p className="guide-card-desc" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.65, margin: 0, fontWeight: 300 }}>
                    {guide.description}
                  </p>

                  {/* CTA */}
                  <span style={{ fontSize: '12.5px', color: '#0B5240', fontWeight: 600, marginTop: '4px' }}>
                    Read guide →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Pagination */}
        <Pagination
          total={filtered.length}
          page={page}
          onPage={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        />

        {/* Count */}
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#8AADA3', marginTop: '16px' }}>
          Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} guides
        </p>
      </section>
    </>
  )
}
