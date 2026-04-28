import type { Metadata } from 'next'
import Link from 'next/link'
import { guides, categories, getCategoryColor, type Category } from './data'

export const metadata: Metadata = {
  title: 'Tax Guides for Working Holiday Makers | Working Holiday Tax',
  description: 'Clear, honest guides covering TFN, ABN, tax returns, superannuation, work rights and more - written for working holiday visa holders in Australia.',
  openGraph: {
    title: 'Tax Guides for Working Holiday Makers',
    description: 'Everything you need to know about tax in Australia, explained simply.',
    url: 'https://workingholidaytax.com.au/guides',
  },
}

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const activeCategory = category as Category | undefined
  const filtered = activeCategory
    ? guides.filter(g => g.category === activeCategory)
    : guides

  return (
    <main style={{ paddingTop: '68px', background: '#fff', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ borderBottom: '1px solid #E2EFE9', paddingTop: '48px', paddingBottom: '40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
          <p className="section-label" style={{ marginBottom: '12px' }}>Tax Guides</p>
          <h1
            className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(26px, 4vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '12px', maxWidth: '640px' }}
          >
            Everything you need to know about tax in Australia
          </h1>
          <p style={{ fontSize: '15px', color: '#587066', lineHeight: 1.65, maxWidth: '540px', fontWeight: 300 }}>
            Clear, honest guides for working holiday makers. No jargon, no confusing forms - just the information you need, explained simply.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ borderBottom: '1px solid #E2EFE9', background: '#fff', position: 'sticky', top: '68px', zIndex: 10 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', gap: '8px', padding: '12px 0', flexWrap: 'wrap' }}>
            <Link
              href="/guides"
              style={{
                padding: '6px 16px',
                borderRadius: '100px',
                border: `1px solid ${!activeCategory ? '#0B5240' : '#E2EFE9'}`,
                background: !activeCategory ? '#0B5240' : 'transparent',
                color: !activeCategory ? '#fff' : '#587066',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              All guides
            </Link>
            {categories.map(cat => {
              const isActive = activeCategory === cat
              return (
                <Link
                  key={cat}
                  href={`/guides?category=${encodeURIComponent(cat)}`}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '100px',
                    border: `1px solid ${isActive ? '#0B5240' : '#E2EFE9'}`,
                    background: isActive ? '#0B5240' : 'transparent',
                    color: isActive ? '#fff' : '#587066',
                    fontSize: '13px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cat}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1px',
          background: '#E2EFE9',
          border: '1px solid #E2EFE9',
          borderRadius: '16px',
          overflow: 'hidden',
        }}>
          {filtered.map(guide => {
            const color = getCategoryColor(guide.category)
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  padding: '24px',
                  background: '#fff',
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#F5F9F7'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: 600,
                    padding: '3px 10px',
                    borderRadius: '100px',
                    background: color.bg,
                    color: color.text,
                    border: `1px solid ${color.border}`,
                    letterSpacing: '0.02em',
                  }}>
                    {guide.category}
                  </span>
                  <span style={{ fontSize: '11.5px', color: '#8AADA3' }}>{guide.date}</span>
                </div>
                <h2
                  className="font-serif"
                  style={{ fontSize: '15px', fontWeight: 700, color: '#080F0D', lineHeight: 1.35, letterSpacing: '-0.015em', margin: 0 }}
                >
                  {guide.title}
                </h2>
                <p style={{ fontSize: '13px', color: '#587066', lineHeight: 1.65, margin: 0, fontWeight: 300 }}>
                  {guide.description}
                </p>
                <span style={{ fontSize: '12.5px', color: '#0B5240', fontWeight: 600, marginTop: '4px' }}>
                  Read guide →
                </span>
              </Link>
            )
          })}
        </div>
      </section>

    </main>
  )
}
