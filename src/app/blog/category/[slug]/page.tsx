import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { guides, categoryMeta, getCategoryBySlug } from '../../data'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return categoryMeta.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = getCategoryBySlug(params.slug)
  if (!meta) return {}
  return {
    title: `${meta.title} | Working Holiday Tax`,
    description: meta.description,
    alternates: {
      canonical: `https://workingholidaytax.com.au/blog/category/${meta.slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://workingholidaytax.com.au/blog/category/${meta.slug}`,
    },
  }
}

export default function CategoryPage({ params }: Props) {
  const meta = getCategoryBySlug(params.slug)
  if (!meta) notFound()

  const articles = guides.filter(g => g.category === meta.category)

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.title,
    description: meta.description,
    url: `https://workingholidaytax.com.au/blog/category/${meta.slug}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Working Holiday Tax',
      url: 'https://workingholidaytax.com.au',
    },
    about: {
      '@type': 'Thing',
      name: meta.category,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://workingholidaytax.com.au/blog/${g.slug}`,
        name: g.title,
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://workingholidaytax.com.au' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://workingholidaytax.com.au/blog' },
      { '@type': 'ListItem', position: 3, name: meta.category, item: `https://workingholidaytax.com.au/blog/category/${meta.slug}` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: meta.faq.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: '#F7F9F8' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px 40px' }}>

            <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(10,15,13,0.45)', marginBottom: '16px' }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" style={{ color: '#587066' }}>{meta.category}</span>
            </nav>

            <div className="inline-flex items-center gap-2" style={{ marginBottom: '12px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0B5240', display: 'inline-block' }} aria-hidden="true" />
              <span style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)', textTransform: 'uppercase', fontWeight: 600 }}>
                Topic
              </span>
            </div>

            <h1 className="font-serif font-black" style={{ fontSize: 'clamp(26px, 4vw, 40px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#080F0D', marginBottom: '12px', maxWidth: '720px' }}>
              {meta.title}
            </h1>

            <p style={{ fontSize: 'clamp(14px, 1.3vw, 16px)', lineHeight: 1.7, color: 'rgba(10,15,13,0.65)', maxWidth: '640px', fontWeight: 300, marginBottom: '20px' }}>
              {meta.intro}
            </p>

            {meta.relatedServicePath && (
              <Link
                href={meta.relatedServicePath}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '100px', background: '#0B5240', color: '#fff', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}
              >
                {meta.relatedServiceLabel} →
              </Link>
            )}

          </div>
        </section>

        {/* Articles */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px 24px' }}>

          <h2 className="font-serif" style={{ fontSize: '18px', fontWeight: 700, color: '#080F0D', marginBottom: '20px', letterSpacing: '-0.02em' }}>
            All {meta.category} guides ({articles.length})
          </h2>

          <div className="guides-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {articles.map(g => (
              <Link
                key={g.slug}
                href={`/blog/${g.slug}`}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px', background: '#fff', textDecoration: 'none', borderRadius: '16px', border: '1px solid #E2EFE9' }}
                className="guide-card"
              >
                <span style={{ fontSize: '11.5px', color: '#8AADA3' }}>{g.readTime} min read</span>
                <h3 className="font-serif" style={{ fontSize: '15.5px', fontWeight: 700, color: '#080F0D', lineHeight: 1.35, letterSpacing: '-0.015em', margin: 0 }}>
                  {g.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#587066', lineHeight: 1.65, margin: 0, fontWeight: 300 }}>
                  {g.description}
                </p>
                <span style={{ fontSize: '12.5px', color: '#0B5240', fontWeight: 600, marginTop: '4px' }}>
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 20px 60px', borderTop: '1px solid #E2EFE9', marginTop: '40px' }}>
          <h2 className="font-serif" style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 700, color: '#0B5240', marginBottom: '24px', letterSpacing: '-0.025em' }}>
            Frequently asked questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {meta.faq.map((f, i) => (
              <div key={i} style={{ borderBottom: '1px solid #E2EFE9', paddingBottom: '20px' }}>
                <h3 className="font-serif" style={{ fontSize: '15px', fontWeight: 700, color: '#080F0D', marginBottom: '8px', letterSpacing: '-0.015em' }}>
                  {f.question}
                </h3>
                <p style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Other topics */}
        <section style={{ maxWidth: '780px', margin: '0 auto', padding: '0 20px 80px' }}>
          <h2 className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', marginBottom: '16px', letterSpacing: '-0.015em' }}>
            Browse other topics
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categoryMeta
              .filter(c => c.slug !== meta.slug)
              .map(c => (
                <Link
                  key={c.slug}
                  href={`/blog/category/${c.slug}`}
                  style={{ padding: '6px 14px', borderRadius: '100px', border: '1px solid #E2EFE9', fontSize: '13px', color: '#587066', textDecoration: 'none', fontWeight: 500 }}
                >
                  {c.category}
                </Link>
              ))}
            <Link
              href="/blog"
              style={{ padding: '6px 14px', borderRadius: '100px', border: '1px solid #0B5240', background: '#0B5240', fontSize: '13px', color: '#fff', textDecoration: 'none', fontWeight: 600 }}
            >
              All guides →
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}
