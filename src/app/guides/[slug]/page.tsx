import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { guides, getGuideBySlug, getCategoryColor } from '../data'
import { WA_URL } from '@/lib/constants'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return guides.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug)
  if (!guide) return {}
  return {
    title: `${guide.title} | Working Holiday Tax`,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://workingholidaytax.com.au/guides/${guide.slug}`,
    },
  }
}

function parseBody(body: string) {
  const lines = body.trim().split('\n')
  const elements: React.ReactNode[] = []
  let key = 0
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          className="font-serif"
          style={{ fontSize: 'clamp(17px, 2.5vw, 19px)', fontWeight: 700, color: '#080F0D', marginTop: '2rem', marginBottom: '0.65rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}
        >
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={key++}
          className="font-serif"
          style={{ fontSize: '15px', fontWeight: 700, color: '#1A2822', marginTop: '1.5rem', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}
        >
          {line.replace('### ', '')}
        </h3>
      )
    } else if (line.length > 0) {
      const withLinks = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_: string, text: string, href: string) =>
        `<a href="${href}" style="color:#0B5240;text-decoration:none;border-bottom:1px solid #C8EAE0;">${text}</a>`
      )
      elements.push(
        <p
          key={key++}
          style={{ fontSize: '14.5px', color: '#2A3C34', lineHeight: 1.85, marginBottom: '0.9rem', fontWeight: 300 }}
          dangerouslySetInnerHTML={{ __html: withLinks }}
        />
      )
    }
    i++
  }
  return elements
}

function getRelated(current: { slug: string; category: string }) {
  return guides
    .filter(g => g.slug !== current.slug && g.category === current.category)
    .slice(0, 4)
}

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug)
  if (!guide) notFound()

  const color = getCategoryColor(guide.category)
  const related = getRelated(guide)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date,
    dateModified: guide.date,
    author: {
      '@type': 'Organization',
      name: 'Working Holiday Tax',
      url: 'https://workingholidaytax.com.au',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Working Holiday Tax',
      url: 'https://workingholidaytax.com.au',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://workingholidaytax.com.au/guides/${guide.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ paddingTop: '68px', background: '#fff', minHeight: '100vh' }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid #E2EFE9', padding: '10px 0' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '6px', alignItems: 'center', fontSize: '11.5px', color: '#8AADA3', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#587066', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/guides" style={{ color: '#587066', textDecoration: 'none' }}>Tax Guides</Link>
            <span>/</span>
            <span style={{ color: '#8AADA3' }}>{guide.title}</span>
          </div>
        </div>

        {/* Layout */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) min(220px, 30%)',
            gap: '0',
          }}>

            {/* Article */}
            <article style={{ padding: '2rem 2rem 3rem 0', borderRight: '1px solid #E2EFE9', minWidth: 0 }}>

              {/* Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '10.5px', fontWeight: 600, padding: '3px 10px',
                  borderRadius: '100px', background: color.bg, color: color.text,
                  border: `1px solid ${color.border}`, letterSpacing: '0.02em',
                }}>
                  {guide.category}
                </span>
                <span style={{ fontSize: '11.5px', color: '#8AADA3' }}>{guide.date}</span>
                <span style={{ color: '#CDE3DB' }}>·</span>
                <span style={{ fontSize: '11.5px', color: '#8AADA3' }}>{guide.readTime} min read</span>
              </div>

              {/* Title */}
              <h1
                className="font-serif font-black text-ink"
                style={{ fontSize: 'clamp(22px, 3.5vw, 30px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '0.75rem' }}
              >
                {guide.title}
              </h1>

              {/* Lead */}
              <p style={{ fontSize: '15px', color: '#587066', lineHeight: 1.7, marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #E2EFE9', fontWeight: 300 }}>
                {guide.description}
              </p>

              {/* Body */}
              <div>{parseBody(guide.body)}</div>

              {/* Divider */}
              <div style={{ height: '1px', background: '#E2EFE9', margin: '2.5rem 0' }} />

              {/* CTA */}
              <div style={{ background: '#0B5240', borderRadius: '16px', padding: '1.5rem 1.75rem' }}>
                <p style={{ fontSize: '10.5px', fontWeight: 600, color: '#2FA880', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Need help?
                </p>
                <h3
                  className="font-serif"
                  style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: 1.2 }}
                >
                  {guide.ctaHeading}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '1.25rem', fontWeight: 300 }}>
                  {guide.ctaBody}
                </p>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
                >
                  {guide.ctaLabel} →
                </a>
              </div>

              {/* Mobile sidebar - shows below article on small screens */}
              <div className="lg:hidden" style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h4 style={{ fontSize: '10px', fontWeight: 600, color: '#8AADA3', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                    Our services
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {[
                      { label: 'TFN application', href: '/tfn' },
                      { label: 'ABN registration', href: '/abn' },
                      { label: 'Tax return', href: '/tax-return' },
                      { label: 'Super withdrawal', href: '/superannuation' },
                    ].map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="btn-primary"
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 14px', fontSize: '12.5px' }}
                      >
                        {item.label}
                        <span>→</span>
                      </Link>
                    ))}
                  </div>
                </div>
                {related.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '10px', fontWeight: 600, color: '#8AADA3', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                      Related guides
                    </h4>
                    {related.map((g, idx) => (
                      <Link
                        key={g.slug}
                        href={`/guides/${g.slug}`}
                        style={{
                          display: 'flex', flexDirection: 'column', gap: '2px',
                          padding: '8px 0', textDecoration: 'none',
                          borderBottom: idx < related.length - 1 ? '1px solid #E2EFE9' : 'none',
                        }}
                      >
                        <span style={{ fontSize: '10px', color: '#8AADA3', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{g.category}</span>
                        <span style={{ fontSize: '12px', color: '#587066', lineHeight: 1.4 }}>{g.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

            </article>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex" style={{ flexDirection: 'column', padding: '2rem 0 3rem 1.5rem', gap: '2rem' }}>

              <div>
                <h4 style={{ fontSize: '10px', fontWeight: 600, color: '#8AADA3', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                  Our services
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { label: 'TFN application', href: '/tfn' },
                    { label: 'ABN registration', href: '/abn' },
                    { label: 'Tax return', href: '/tax-return' },
                    { label: 'Super withdrawal', href: '/superannuation' },
                  ].map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="btn-primary"
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 14px', fontSize: '12.5px' }}
                    >
                      {item.label}
                      <span>→</span>
                    </Link>
                  ))}
                </div>
              </div>

              {related.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '10px', fontWeight: 600, color: '#8AADA3', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                    Related guides
                  </h4>
                  {related.map((g, idx) => (
                    <Link
                      key={g.slug}
                      href={`/guides/${g.slug}`}
                      style={{
                        display: 'flex', flexDirection: 'column', gap: '2px',
                        padding: '8px 0', textDecoration: 'none',
                        borderBottom: idx < related.length - 1 ? '1px solid #E2EFE9' : 'none',
                      }}
                    >
                      <span style={{ fontSize: '10px', color: '#8AADA3', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{g.category}</span>
                      <span style={{ fontSize: '12px', color: '#587066', lineHeight: 1.4 }}>{g.title}</span>
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href="/guides"
                style={{ fontSize: '12px', color: '#0B5240', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                ← All tax guides
              </Link>

            </aside>
          </div>
        </div>

      </main>
    </>
  )
}
