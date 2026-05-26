import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { guides, getCategoryColor } from '@/app/blog/data'
import GuideArticle from '@/app/blog/[slug]/GuideArticle'
import StickyBreadcrumbs from '@/app/blog/[slug]/StickyBreadcrumbs'
import CategoryHero from '@/app/blog/[slug]/CategoryHero'
import { getJapaneseGuide, getJapaneseCategoryMeta, jaCategoryMeta, blogUI } from '../data'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  // Generate for all English posts - Japanese blog mirrors them
  return guides.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = getJapaneseGuide(params.slug)
  if (!result) return {}
  const { guide } = result
  return {
    title: `${guide.title} | Working Holiday Tax`,
    description: guide.description,
    keywords: [
      'オーストラリア ワーホリ 税金',
      'ワーキングホリデービザ',
      '417ビザ',
      '462ビザ',
      guide.category,
      'バックパッカー 税金',
      'WHM 税金',
    ],
    alternates: {
      canonical: `https://workingholidaytax.com.au/ja/blog/${guide.slug}`,
      languages: {
        'en-AU': `https://workingholidaytax.com.au/blog/${guide.slug}`,
        'de': `https://workingholidaytax.com.au/de/blog/${guide.slug}`,
        'ja': `https://workingholidaytax.com.au/ja/blog/${guide.slug}`,
        'x-default': `https://workingholidaytax.com.au/blog/${guide.slug}`,
      },
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://workingholidaytax.com.au/ja/blog/${guide.slug}`,
      type: 'article',
      siteName: 'Working Holiday Tax',
      locale: 'ja_JP',
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

function getRelatedGuides(current: { slug: string; category: string }, count = 3) {
  const sameCategory = guides.filter(g => g.slug !== current.slug && g.category === current.category)
  const shuffled = [...sameCategory]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  // Get Japanese versions of related guides
  return shuffled.slice(0, count).map(g => {
    const result = getJapaneseGuide(g.slug)
    return result ? result.guide : g
  })
}

function calcReadTime(body: string) {
  const words = body.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function calcWordCount(body: string) {
  return body.trim().split(/\s+/).length
}

function extractFAQs(body: string): Array<{ question: string; answer: string }> {
  const sections = body.split(/^## /m).slice(1)
  const faqs: Array<{ question: string; answer: string }> = []

  for (const section of sections) {
    const lines = section.split('\n')
    const heading = lines[0]?.trim() ?? ''
    if (!heading) continue
    if (!/[?？]/.test(heading)) continue

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

export default function JapaneseGuidePage({ params }: Props) {
  const result = getJapaneseGuide(params.slug)
  if (!result) notFound()
  const { guide, isTranslated } = result

  // Look up Japanese category meta by category name → find slug
  const categoryInfo = jaCategoryMeta.find(c => c.category === guide.category)
  const categoryColors = getCategoryColor(guide.category)
  const relatedGuides = getRelatedGuides(guide)
  const readTime = calcReadTime(guide.body)
  const wordCount = calcWordCount(guide.body)
  const faqs = extractFAQs(guide.body)
  const leadParagraph = getLeadParagraph(guide.body)

  // Set inLanguage based on whether body is Japanese or still English
  const articleLang = isTranslated ? 'ja' : 'en-AU'

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
    inLanguage: articleLang,
    datePublished: guide.date,
    dateModified: guide.date,
    author: { '@type': 'Organization', name: 'Working Holiday Tax', url: 'https://workingholidaytax.com.au' },
    publisher: {
      '@type': 'Organization',
      name: 'Working Holiday Tax',
      url: 'https://workingholidaytax.com.au',
      logo: { '@type': 'ImageObject', url: 'https://workingholidaytax.com.au/icon-512.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://workingholidaytax.com.au/ja/blog/${guide.slug}` },
    audience: { '@type': 'Audience', name: 'オーストラリアのワーキングホリデービザ保持者（サブクラス417・462）' },
    about: [
      { '@type': 'Thing', name: 'オーストラリアのワーキングホリデービザ' },
      { '@type': 'Thing', name: guide.category },
    ],
    keywords: [
      'Working Holiday Tax',
      'オーストラリア',
      '417ビザ',
      '462ビザ',
      guide.category,
      'バックパッカー 税金',
    ].join(', '),
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.guide-lead'] },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://workingholidaytax.com.au/ja' },
      { '@type': 'ListItem', position: 2, name: 'ブログ', item: 'https://workingholidaytax.com.au/ja/blog' },
      ...(categoryInfo
        ? [{ '@type': 'ListItem', position: 3, name: categoryInfo.category, item: `https://workingholidaytax.com.au/ja/blog/category/${categoryInfo.slug}` }]
        : []),
      { '@type': 'ListItem', position: categoryInfo ? 4 : 3, name: guide.title, item: `https://workingholidaytax.com.au/ja/blog/${guide.slug}` },
    ],
  }

  const faqLd = (faqs.length > 0 && isTranslated) ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'ja',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://workingholidaytax.com.au/ja/blog/${guide.slug}`,
    url: `https://workingholidaytax.com.au/ja/blog/${guide.slug}`,
    name: guide.title,
    description: guide.description,
    inLanguage: articleLang,
    isPartOf: { '@type': 'WebSite', name: 'Working Holiday Tax', url: 'https://workingholidaytax.com.au' },
    primaryImageOfPage: { '@type': 'ImageObject', url: 'https://workingholidaytax.com.au/og-image.png' },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.guide-lead'] },
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

        {categoryInfo && (
          <StickyBreadcrumbs
            category={categoryInfo.category}
            categorySlug={`/ja/blog/category/${categoryInfo.slug}`}
            title={guide.title}
          />
        )}

        <div style={{ background: categoryColors.bg }}>
          <div style={{ padding: '12px 0' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '6px', alignItems: 'center', fontSize: '12px', color: 'rgba(10,15,13,0.45)', flexWrap: 'wrap' }}>
              <Link href="/ja" style={{ color: '#587066', textDecoration: 'none' }}>ホーム</Link>
              <span>/</span>
              <Link href="/ja/blog" style={{ color: '#587066', textDecoration: 'none' }}>ブログ</Link>
              <span>/</span>
              {categoryInfo && (
                <>
                  <Link href={`/ja/blog/category/${categoryInfo.slug}`} style={{ color: '#587066', textDecoration: 'none' }}>
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
                        href={`/ja/blog/category/${categoryInfo.slug}`}
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
                  <span style={{ fontSize: '12px', color: 'rgba(10,15,13,0.55)' }}>{readTime}分で読めます</span>
                </div>

                <h1
                  className="font-serif font-black"
                  style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1rem', color: '#080F0D' }}
                >
                  {guide.title}
                </h1>

                <p className="guide-lead" style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', color: 'rgba(10,15,13,0.7)', lineHeight: 1.75, marginBottom: '0', fontWeight: 300 }}>
                  {guide.description}
                </p>
              </div>

              <div className="article-hero-image">
                <CategoryHero category={guide.category} title={guide.title} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>

          {/* Translation notice - shown only when post body is still in English */}
          {!isTranslated && (
            <div style={{
              marginTop: '2rem',
              padding: '14px 18px',
              background: '#FFF8E7',
              border: '1px solid #FCD980',
              borderRadius: '12px',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}>
                <circle cx="12" cy="12" r="9" stroke="#C47E10" strokeWidth="1.6"/>
                <path d="M12 7v6M12 16h.01" stroke="#C47E10" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <p style={{ fontSize: '13px', color: '#7A4A00', lineHeight: 1.75, margin: 0 }}>
                {blogUI.englishOnlyNotice}
              </p>
            </div>
          )}

          <article style={{ padding: '2rem 0 3rem 0' }} itemScope itemType="https://schema.org/Article">
            <meta itemProp="headline" content={guide.title} />
            <meta itemProp="datePublished" content={guide.date} />
            <meta itemProp="author" content="Working Holiday Tax" />
            <GuideArticle guide={guide} />
          </article>

          {relatedGuides.length > 0 && (
            <div style={{ borderTop: '1px solid #E2EFE9', paddingTop: '2.5rem', paddingBottom: '3rem', maxWidth: '780px' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#2FA880', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                関連記事
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {relatedGuides.map(g => {
                  const gColors = getCategoryColor(g.category)
                  return (
                    <Link key={g.slug} href={`/ja/blog/${g.slug}`} style={{ textDecoration: 'none' }} className="related-link">
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
                          <span style={{ fontSize: '11px', color: '#8AADA3' }}>{g.readTime}分で読めます</span>
                        </div>
                        <p style={{ fontSize: '14.5px', fontWeight: 600, color: '#0B5240', marginBottom: '6px', lineHeight: 1.4 }}>
                          {g.title}
                        </p>
                        <p style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.75, margin: 0, fontWeight: 300 }}>
                          {g.description}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {categoryInfo && (
                <div style={{ marginTop: '24px' }}>
                  <Link
                    href={`/ja/blog/category/${categoryInfo.slug}`}
                    style={{ fontSize: '13px', color: '#0B5240', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    {categoryInfo.category}の記事をすべて見る →
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
