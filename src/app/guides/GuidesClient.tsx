'use client'

import { useState } from 'react'
import Link from 'next/link'
import { type Guide, type Category, categories, getCategoryColor } from './data'

const PER_PAGE = 6

const categoryIcons: Record<string, string> = {
  'TFN':              '🪪',
  'ABN':              '🏢',
  'Tax Return':       '📋',
  'Super':            '🏦',
  'Work Rights':      '⚖️',
  'Medicare & Other': '🏥',
}

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

export default function GuidesClient({
  guides,
  initialCategory,
}: {
  guides: Guide[]
  initialCategory?: Category
}) {
  const [activeCategory, setActiveCategory] = useState<Category | undefined>(initialCategory)
  const [page, setPage] = useState(1)

  const filtered = activeCategory
    ? guides.filter(g => g.category === activeCategory)
    : guides

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleCategory = (cat: Category | undefined) => {
    setActiveCategory(cat)
    setPage(1)
  }

  return (
    <>
      {/* Filters */}
      <section style={{ borderBottom: '1px solid #E2EFE9', background: '#fff', position: 'sticky', top: '68px', zIndex: 10 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', gap: '8px', padding: '12px 0', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleCategory(undefined)}
              style={{
                padding: '6px 16px',
                borderRadius: '100px',
                border: `1px solid ${!activeCategory ? '#0B5240' : '#E2EFE9'}`,
                background: !activeCategory ? '#0B5240' : 'transparent',
                color: !activeCategory ? '#fff' : '#587066',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              All guides
            </button>
            {categories.map(cat => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '100px',
                    border: `1px solid ${isActive ? '#0B5240' : '#E2EFE9'}`,
                    background: isActive ? '#0B5240' : 'transparent',
                    color: isActive ? '#fff' : '#587066',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px 80px' }}>
        <div className="guides-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}>
          {paginated.map(guide => {
            const color = getCategoryColor(guide.category)
            const icon = categoryIcons[guide.category] || '📄'
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
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
                {/* Icon */}
                <div className="guide-card-icon" style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: color.bg,
                  border: `1px solid ${color.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0,
                }}>
                  {icon}
                </div>

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
