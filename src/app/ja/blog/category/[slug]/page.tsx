import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryColor } from '@/app/blog/data'
import CategoryHero from '@/app/blog/[slug]/CategoryHero'
import { getJapaneseGuides, jaCategoryMeta, getJapaneseCategoryMeta } from '../../data'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return jaCategoryMeta.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = getJapaneseCategoryMeta(params.slug)
  if (!meta) return {}
  return {
    title: `${meta.title} | Working Holiday Tax`,
    description: meta.description,
    keywords: [
      'オーストラリア ワーホリ 税金',
      meta.category,
      'ワーキングホリデービザ',
      '417ビザ',
      '462ビザ',
      'WHM 税金',
    ],
    alternates: {
      canonical: `${SITE_URL}/ja/blog/category/${meta.slug}`,
      languages: {
        'en-AU': `${SITE_URL}/blog/category/${meta.slug}`,
        'de': `${SITE_URL}/de/blog/category/${meta.slug}`,
        'ja': `${SITE_URL}/ja/blog/category/${meta.slug}`,
        'x-default': `${SITE_URL}/blog/category/${meta.slug}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/ja/blog/category/${meta.slug}`,
      siteName: 'Working Holiday Tax',
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
      },
    },
  }
}

export default function JapaneseCategoryPage({ params }: Props) {
  const meta = getJapaneseCategoryMeta(params.slug)
  if (!meta) notFound()

  const allGuides = getJapaneseGuides()
  const articles = allGuides.filter(g => g.category === meta.category)
  const colors = getCategoryColor(meta.category)

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/ja/blog/category/${meta.slug}`,
    inLanguage: 'ja',
    isPartOf: { '@type': 'WebSite', name: 'Working Holiday Tax', url: `${SITE_URL}` },
    about: { '@type': 'Thing', name: meta.category },
    audience: { '@type': 'Audience', name: 'オーストラリアのワーキングホリデービザ保持者（サブクラス417・462）' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/ja/blog/${g.slug}`,
        name: g.title,
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_URL}/ja` },
      { '@type': 'ListItem', position: 2, name: 'ブログ', item: `${SITE_URL}/ja/blog` },
      { '@type': 'ListItem', position: 3, name: meta.category, item: `${SITE_URL}/ja/blog/category/${meta.slug}` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'ja',
    mainEntity: meta.faq.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '68px' }}>

        <section style={{ background: colors.bg }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px 48px' }}>

            <nav aria-label="パンくずリスト" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(10,15,13,0.45)', marginBottom: '16px' }}>
              <Link href="/ja" style={{ color: 'inherit', textDecoration: 'none' }}>ホーム</Link>
              <span aria-hidden="true">/</span>
              <Link href="/ja/blog" style={{ color: 'inherit', textDecoration: 'none' }}>ブログ</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" style={{ color: colors.text }}>{meta.category}</span>
            </nav>

            <div className="inline-flex items-center gap-2" style={{ marginBottom: '12px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.text, display: 'inline-block' }} aria-hidden="true" />
              <span style={{ fontSize: '10px', letterSpacing: '0.16em', color: colors.text, textTransform: 'uppercase', fontWeight: 600 }}>
                {articles.length}件の記事
              </span>
            </div>

            <h1 className="font-serif font-black" style={{ fontSize: 'clamp(26px, 4vw, 42px)', lineHeight: 1.2, letterSpacing: '-0.02em', color: '#080F0D', marginBottom: '12px', maxWidth: '760px' }}>
              {meta.title}
            </h1>

            <p style={{ fontSize: 'clamp(14px, 1.3vw, 16px)', lineHeight: 1.75, color: 'rgba(10,15,13,0.7)', maxWidth: '680px', fontWeight: 300, marginBottom: '24px' }}>
              {meta.intro}
            </p>

            {meta.relatedServicePath && (
              <Link
                href={meta.relatedServicePath}
                className="topic-pill"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '100px', background: '#0B5240', color: '#fff', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}
              >
                {meta.relatedServiceLabel} →
              </Link>
            )}

          </div>
        </section>

        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 20px 24px' }}>

          <h2 className="font-serif" style={{ fontSize: '20px', fontWeight: 700, color: '#080F0D', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            {meta.category}の記事をすべて見る（{articles.length}件）
          </h2>

          <div className="category-grid">
            {articles.map(article => (
              <Link
                key={article.slug}
                href={`/ja/blog/${article.slug}`}
                className="category-card"
                style={{ display: 'flex', flexDirection: 'column', gap: '0', padding: '0', background: '#fff', textDecoration: 'none', borderRadius: '16px', border: '1px solid #E2EFE9' }}
              >
                <div className="blog-card-hero" style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: '15px 15px 0 0' }}>
                  <CategoryHero category={article.category} title={article.title} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px 22px 22px', flex: 1 }}>
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
                    <span style={{ fontSize: '11.5px', color: '#8AADA3' }}>{article.readTime}分で読めます</span>
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', lineHeight: 1.4, letterSpacing: '-0.015em', margin: 0 }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#587066', lineHeight: 1.75, margin: 0, fontWeight: 300, flex: 1 }}>
                    {article.description}
                  </p>
                  <span style={{ fontSize: '12.5px', color: '#0B5240', fontWeight: 600, marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    続きを読む <span className="read-arrow">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 20px 60px', borderTop: '1px solid #E2EFE9', marginTop: '48px' }}>
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: colors.text, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
              よくあるご質問
            </p>
            <h2 className="font-serif" style={{ fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 700, color: '#0B5240', marginBottom: '0', letterSpacing: '-0.02em' }}>
              よくあるご質問
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {meta.faq.map((f, i) => (
              <details key={i} className="faq-item" style={{ borderBottom: '1px solid #E2EFE9', padding: '16px 0', cursor: 'pointer' }}>
                <summary className="font-serif" style={{ fontSize: '15px', fontWeight: 700, color: '#080F0D', letterSpacing: '-0.015em', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span style={{ flexShrink: 0, color: colors.text, fontSize: '20px', fontWeight: 300, lineHeight: 1 }}>+</span>
                </summary>
                <p style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.85, fontWeight: 300, marginTop: '12px', marginBottom: 0 }}>
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: '780px', margin: '0 auto', padding: '0 20px 80px' }}>
          <h2 className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', marginBottom: '16px', letterSpacing: '-0.015em' }}>
            他のカテゴリー
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {jaCategoryMeta
              .filter(c => c.slug !== meta.slug)
              .map(c => {
                const cColors = getCategoryColor(c.category)
                return (
                  <Link
                    key={c.slug}
                    href={`/ja/blog/category/${c.slug}`}
                    className="topic-pill"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '100px',
                      border: `1px solid ${cColors.border}`,
                      background: cColors.bg,
                      fontSize: '13px',
                      color: cColors.text,
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    {c.category}
                  </Link>
                )
              })}
            <Link
              href="/ja/blog"
              className="topic-pill"
              style={{ padding: '8px 16px', borderRadius: '100px', border: '1px solid #0B5240', background: '#0B5240', fontSize: '13px', color: '#fff', textDecoration: 'none', fontWeight: 600 }}
            >
              すべての記事 →
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}
