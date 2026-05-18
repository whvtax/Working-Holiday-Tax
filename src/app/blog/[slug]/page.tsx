import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { guides, getGuideBySlug, getCategoryMeta } from '../data'
import GuideArticle from './GuideArticle'

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
    alternates: {
      canonical: `https://workingholidaytax.com.au/blog/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://workingholidaytax.com.au/blog/${guide.slug}`,
      type: 'article',
    },
  }
}

function getNextGuide(current: { slug: string; category: string }) {
  const sameCategory = guides.filter(g => g.slug !== current.slug && g.category === current.category)
  if (sameCategory.length > 0) return sameCategory[Math.floor(Math.random() * sameCategory.length)]
  const others = guides.filter(g => g.slug !== current.slug)
  return others[Math.floor(Math.random() * others.length)] ?? null
}

function getRelatedGuides(current: { slug: string; category: string }, count = 3) {
  const sameCategory = guides.filter(g => g.slug !== current.slug && g.category === current.category)
  const shuffled = [...sameCategory].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function calcReadTime(body: string) {
  const words = body.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug)
  if (!guide) notFound()

  const categoryInfo = getCategoryMeta(guide.category)
  const nextGuide = getNextGuide(guide)
  const relatedGuides = getRelatedGuides(guide)
  const readTime = calcReadTime(guide.body)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    articleSection: guide.category,
    datePublished: guide.date,
    dateModified: guide.date,
    author: { '@type': 'Organization', name: 'Working Holiday Tax', url: 'https://workingholidaytax.com.au' },
    publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: 'https://workingholidaytax.com.au' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://workingholidaytax.com.au/blog/${guide.slug}` },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://workingholidaytax.com.au' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://workingholidaytax.com.au/blog' },
      ...(categoryInfo
        ? [{ '@type': 'ListItem', position: 3, name: categoryInfo.category, item: `https://workingholidaytax.com.au/blog/category/${categoryInfo.slug}` }]
        : []),
      { '@type': 'ListItem', position: categoryInfo ? 4 : 3, name: guide.title, item: `https://workingholidaytax.com.au/blog/${guide.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <main style={{ paddingTop: '68px', background: '#fff', minHeight: '100vh' }}>

        {/* Hero */}
        <div style={{ background: '#F7F9F8' }}>
          <div style={{ padding: '10px 0' }}>
            <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '6px', alignItems: 'center', fontSize: '11.5px', color: '#8AADA3', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: '#587066', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <Link href="/blog" style={{ color: '#587066', textDecoration: 'none' }}>Blog</Link>
              <span>/</span>
              {categoryInfo && (
                <>
                  <Link href={`/blog/category/${categoryInfo.slug}`} style={{ color: '#587066', textDecoration: 'none' }}>
                    {categoryInfo.category}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span style={{ color: '#8AADA3' }}>{guide.title}</span>
            </div>
          </div>

          <div style={{ maxWidth: '780px', margin: '0 auto', padding: '1rem 20px 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              {categoryInfo && (
                <>
                  <Link
                    href={`/blog/category/${categoryInfo.slug}`}
                    style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '100px', background: '#EAF6F1', color: '#0B5240', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.02em' }}
                  >
                    {guide.category}
                  </Link>
                  <span style={{ color: '#CDE3DB' }}>·</span>
                </>
              )}
              <span style={{ fontSize: '11.5px', color: '#8AADA3' }}>{guide.date}</span>
              <span style={{ color: '#CDE3DB' }}>·</span>
              <span style={{ fontSize: '11.5px', color: '#8AADA3' }}>{readTime} min read</span>
            </div>

            <h1
              className="font-serif font-black"
              style={{ fontSize: 'clamp(22px, 3.5vw, 30px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '0.75rem', color: '#0B5240' }}
            >
              {guide.title}
            </h1>

            <p style={{ fontSize: '15px', color: '#587066', lineHeight: 1.7, marginBottom: '0', fontWeight: 300 }}>
              {guide.description}
            </p>
          </div>
        </div>

        {/* Article */}
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 20px' }}>
          <article style={{ padding: '2rem 0 3rem 0' }}>
            <GuideArticle guide={guide} nextGuide={nextGuide} />
          </article>

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <div style={{ borderTop: '1px solid #E2EFE9', paddingTop: '2rem', paddingBottom: '3rem' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#2FA880', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Read also
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {relatedGuides.map(g => (
                  <Link key={g.slug} href={`/blog/${g.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ border: '1px solid #E2EFE9', borderRadius: '12px', padding: '1rem 1.25rem' }}>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#0B5240', marginBottom: '4px', lineHeight: 1.3 }}>
                        {g.title}
                      </p>
                      <p style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
                        {g.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {categoryInfo && (
                <div style={{ marginTop: '20px' }}>
                  <Link
                    href={`/blog/category/${categoryInfo.slug}`}
                    style={{ fontSize: '13px', color: '#0B5240', fontWeight: 600, textDecoration: 'none' }}
                  >
                    View all {categoryInfo.category} guides →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

      </main>
    </>
  )
}
