import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { guides, getGuideBySlug, getCategoryMeta, getCategoryColor } from '../data'
import GuideArticle from './GuideArticle'
import StickyBreadcrumbs from './StickyBreadcrumbs'
import CategoryHero from './CategoryHero'

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
    keywords: [
      'working holiday tax Australia',
      'working holiday visa',
      '417 visa',
      '462 visa',
      guide.category,
      'backpacker tax',
      'WHM tax',
    ],
    alternates: {
      canonical: `https://workingholidaytax.com.au/blog/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://workingholidaytax.com.au/blog/${guide.slug}`,
      type: 'article',
      siteName: 'Working Holiday Tax',
      locale: 'en_AU',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
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

function calcWordCount(body: string) {
  return body.trim().split(/\s+/).length
}

// Extracts H2 questions and their first-paragraph answers from the markdown body.
// Used to build a FAQPage JSON-LD block that AI search engines (ChatGPT, Perplexity,
// Google AI Overviews, etc.) can ingest and cite directly.
function extractFAQs(body: string): Array<{ question: string; answer: string }> {
  const sections = body.split(/^## /m).slice(1)
  const faqs: Array<{ question: string; answer: string }> = []

  for (const section of sections) {
    const lines = section.split('\n')
    const heading = lines[0]?.trim() ?? ''
    if (!heading) continue
    if (!/[?]/.test(heading)) continue

    let answer = ''
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) {
        if (answer) break
        continue
      }
      if (line.startsWith('##') || line.startsWith('#')) break
      if (line.startsWith('-') || line.startsWith('*')) {
        if (!answer) continue
        break
      }
      answer = answer ? `${answer} ${line}` : line
      if (answer.length > 280) break
    }

    if (!answer) continue

    const cleanedAnswer = answer
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\s+/g, ' ')
      .trim()

    faqs.push({ question: heading, answer: cleanedAnswer })
  }

  return faqs.slice(0, 10)
}

function getLeadParagraph(body: string): string {
  const firstParagraph = body.trim().split(/\n\n/)[0] ?? ''
  return firstParagraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug)
  if (!guide) notFound()

  const categoryInfo = getCategoryMeta(guide.category)
  const categoryColors = getCategoryColor(guide.category)
  const nextGuide = getNextGuide(guide)
  const relatedGuides = getRelatedGuides(guide)
  const readTime = calcReadTime(guide.body)
  const wordCount = calcWordCount(guide.body)
  const faqs = extractFAQs(guide.body)
  const leadParagraph = getLeadParagraph(guide.body)

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    name: guide.title,
    description: guide.description,
    abstract: leadParagraph,
    articleSection: guide.category,
    articleBody: leadParagraph,
    wordCount,
    timeRequired: `PT${readTime}M`,
    inLanguage: 'en-AU',
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
      logo: {
        '@type': 'ImageObject',
        url: 'https://workingholidaytax.com.au/icon-512.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://workingholidaytax.com.au/blog/${guide.slug}`,
    },
    audience: {
      '@type': 'Audience',
      name: 'Working holiday visa holders in Australia (subclass 417 and 462)',
    },
    about: [
      { '@type': 'Thing', name: 'Working Holiday Visa Australia' },
      { '@type': 'Thing', name: guide.category },
    ],
    keywords: [
      'working holiday tax',
      'Australia',
      '417 visa',
      '462 visa',
      guide.category,
      'backpacker tax',
    ].join(', '),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.guide-lead'],
    },
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

  // FAQPage schema built from the article's H2 questions and their snippet-quotable
  // first sentences. This is what surfaces in Google AI Overviews, ChatGPT citations,
  // Perplexity answers, and Bing Copilot replies.
  const faqLd = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  } : null

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://workingholidaytax.com.au/blog/${guide.slug}`,
    url: `https://workingholidaytax.com.au/blog/${guide.slug}`,
    name: guide.title,
    description: guide.description,
    inLanguage: 'en-AU',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Working Holiday Tax',
      url: 'https://workingholidaytax.com.au',
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: 'https://workingholidaytax.com.au/og-image.png',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.guide-lead'],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      <main style={{ paddingTop: '68px', background: '#fff', minHeight: '100vh' }}>

        {/* Sticky breadcrumbs (appear after scrolling past hero) */}
        {categoryInfo && (
          <StickyBreadcrumbs
            category={categoryInfo.category}
            categorySlug={categoryInfo.slug}
            title={guide.title}
          />
        )}

        {/* Hero - uses category color for the background */}
        <div style={{ background: categoryColors.bg }}>
          <div style={{ padding: '12px 0' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '6px', alignItems: 'center', fontSize: '12px', color: 'rgba(10,15,13,0.45)', flexWrap: 'wrap' }}>
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
              <span style={{ color: '#8AADA3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '50%' }}>{guide.title}</span>
            </div>
          </div>

          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 20px 3rem' }}>
            <div className="article-hero-layout">
              <div className="article-hero-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  {categoryInfo && (
                    <>
                      <Link
                        href={`/blog/category/${categoryInfo.slug}`}
                        style={{
                          fontSize: '11px',
                          padding: '4px 12px',
                          borderRadius: '100px',
                          background: '#fff',
                          color: categoryColors.text,
                          fontWeight: 600,
                          textDecoration: 'none',
                          letterSpacing: '0.02em',
                          border: `1px solid ${categoryColors.border}`,
                        }}
                      >
                        {guide.category}
                      </Link>
                      <span style={{ color: 'rgba(0,0,0,0.15)' }}>·</span>
                    </>
                  )}
                  <span style={{ fontSize: '12px', color: 'rgba(10,15,13,0.55)' }}>{guide.date}</span>
                  <span style={{ color: 'rgba(0,0,0,0.15)' }}>·</span>
                  <span style={{ fontSize: '12px', color: 'rgba(10,15,13,0.55)' }}>{readTime} min read</span>
                </div>

                {/* H1 - larger and clearer hierarchy vs H2 in body */}
                <h1
                  className="font-serif font-black"
                  style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1rem', color: '#080F0D' }}
                >
                  {guide.title}
                </h1>

                <p className="guide-lead" style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: 'rgba(10,15,13,0.7)', lineHeight: 1.6, marginBottom: '0', fontWeight: 300 }}>
                  {guide.description}
                </p>
              </div>

              {/* Decorative category illustration - hidden on small mobile */}
              <div className="article-hero-image">
                <CategoryHero category={guide.category} title={guide.title} />
              </div>
            </div>
          </div>
        </div>

        {/* Article - wider container to fit the TOC sidebar on desktop */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <article style={{ padding: '2rem 0 3rem 0' }} itemScope itemType="https://schema.org/Article">
            <meta itemProp="headline" content={guide.title} />
            <meta itemProp="datePublished" content={guide.date} />
            <meta itemProp="author" content="Working Holiday Tax" />
            <GuideArticle guide={guide} nextGuide={nextGuide} />
          </article>

          {/* Related articles - now with category-colored badges */}
          {relatedGuides.length > 0 && (
            <div style={{ borderTop: '1px solid #E2EFE9', paddingTop: '2.5rem', paddingBottom: '3rem', maxWidth: '780px' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#2FA880', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                Read also
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {relatedGuides.map(g => {
                  const gColors = getCategoryColor(g.category)
                  return (
                    <Link key={g.slug} href={`/blog/${g.slug}`} style={{ textDecoration: 'none' }} className="related-link">
                      <div style={{ border: '1px solid #E2EFE9', borderRadius: '12px', padding: '1.1rem 1.4rem', transition: 'border-color 0.2s ease, transform 0.2s ease' }} className="related-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span style={{
                            fontSize: '10px',
                            padding: '2px 8px',
                            borderRadius: '100px',
                            background: gColors.bg,
                            color: gColors.text,
                            fontWeight: 600,
                            letterSpacing: '0.02em',
                            border: `1px solid ${gColors.border}`,
                          }}>
                            {g.category}
                          </span>
                          <span style={{ fontSize: '11px', color: '#8AADA3' }}>{g.readTime} min read</span>
                        </div>
                        <p style={{ fontSize: '14.5px', fontWeight: 600, color: '#0B5240', marginBottom: '6px', lineHeight: 1.3 }}>
                          {g.title}
                        </p>
                        <p style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
                          {g.description}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* related-card styles are in globals.css */}

              {categoryInfo && (
                <div style={{ marginTop: '24px' }}>
                  <Link
                    href={`/blog/category/${categoryInfo.slug}`}
                    style={{ fontSize: '13px', color: '#0B5240', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    View all {categoryInfo.category} articles →
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
