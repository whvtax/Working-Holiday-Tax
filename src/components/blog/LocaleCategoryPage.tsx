/**
 * The shared category-hub template for the LOCALIZED blogs (/de and /ja).
 *
 * Same arrangement as LocaleGuidePage, for the same reason: the two locale
 * category pages were structure-identical and drifting. Template here; every
 * difference (strings, category intros, typography knobs for CJK) comes in
 * through CategoryLocaleConfig from the locale's own page file. Verified at
 * extraction time by byte-comparing the built HTML of every localized
 * category page against the pre-refactor output.
 */
import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryColor, type Category } from '@/app/(site)/blog/data'
import CategoryHero from '@/app/(site)/blog/[slug]/CategoryHero'
import { MobileCta } from '@/components/ui/MobileCta'
import { waUrl } from '@/lib/wa'

export interface CategoryIntro {
  paragraphs: string[]
  service: { path: string; label: string } | null
}

export interface LocalizedCategoryMeta {
  slug: string
  category: Category
  title: string
  description: string
  intro: string
  relatedServicePath?: string
  relatedServiceLabel?: string
  faq: Array<{ question: string; answer: string }>
}

export interface CategoryLocaleConfig {
  locale: 'de' | 'ja'
  basePath: string
  ogLocale: string
  categoryMeta: ReadonlyArray<{ slug: string; category: Category }>
  getCategoryMeta: (slug: string) => LocalizedCategoryMeta | null | undefined
  getGuides: () => Array<{ slug: string; category: Category; title: string; description: string; readTime: number }>
  catLabel: (category: string) => string
  /** Two paragraphs per category on what it covers and who it is for. */
  categoryIntro: Record<string, CategoryIntro>

  metaKeywords: (category: string) => string[]
  audienceName: string

  homeLabel: string
  blogLabel: string
  breadcrumbAriaLabel: string
  articleCount: (n: number) => string
  coversHeading: string
  gridHeading: (categoryLabel: string, n: number) => string
  readTimeLabel: (minutes: number | undefined) => string
  readMoreLabel: string
  faqKickerLabel: string
  faqHeading: string
  otherCategoriesHeading: string
  allArticlesLabel: string

  styles: {
    countBadge: (color: string) => React.CSSProperties
    h1: { lineHeight: number; letterSpacing: string; maxWidth: string }
    introP: { lineHeight: number; maxWidth: string }
    coversHeadingLineHeight: number
    coversPLineHeight: number
    cardTitleLineHeight: number
    cardDescLineHeight: number
    faqKicker: (color: string) => React.CSSProperties
    faqHeadingLetterSpacing: string
    faqAnswerLineHeight: number
  }
}

export function localizedCategoryStaticParams(cfg: Pick<CategoryLocaleConfig, 'categoryMeta'>) {
  return cfg.categoryMeta.map(c => ({ slug: c.slug }))
}

export function buildCategoryMetadata(cfg: CategoryLocaleConfig, slug: string): Metadata {
  const meta = cfg.getCategoryMeta(slug)
  if (!meta) return {}
  return {
    title: meta.title,
    description: meta.description,
    keywords: cfg.metaKeywords(meta.category),
    alternates: {
      canonical: `${SITE_URL}${cfg.basePath}/blog/category/${meta.slug}`,
      languages: {
        // EN uses a different slug for the Medicare category (medicare-and-other)
        'en-AU': `${SITE_URL}/blog/category/${meta.slug === 'medicare' ? 'medicare-and-other' : meta.slug}`,
        'de': `${SITE_URL}/de/blog/category/${meta.slug}`,
        'ja': `${SITE_URL}/ja/blog/category/${meta.slug}`,
        'x-default': `${SITE_URL}/blog/category/${meta.slug === 'medicare' ? 'medicare-and-other' : meta.slug}`,
      },
    },
    openGraph: {
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}${cfg.basePath}/blog/category/${meta.slug}`,
      siteName: 'Working Holiday Tax',
      locale: cfg.ogLocale,
      type: 'website',
    },
    twitter: {
      images: [`${SITE_URL}/og-image.png`],
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

export function LocalizedCategoryPage({ cfg, slug }: { cfg: CategoryLocaleConfig; slug: string }) {
  const meta = cfg.getCategoryMeta(slug)
  if (!meta) notFound()

  const allGuides = cfg.getGuides()
  const articles = allGuides.filter(g => g.category === meta.category)
  const colors = getCategoryColor(meta.category)
  const intro = cfg.categoryIntro[meta.slug]
  const S = cfg.styles

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}${cfg.basePath}/blog/category/${meta.slug}`,
    inLanguage: cfg.locale,
    isPartOf: { '@type': 'WebSite', name: 'Working Holiday Tax', url: `${SITE_URL}` },
    about: { '@type': 'Thing', name: meta.category },
    audience: { '@type': 'Audience', name: cfg.audienceName },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}${cfg.basePath}/blog/${g.slug}`,
        name: g.title,
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: cfg.homeLabel, item: `${SITE_URL}${cfg.basePath}` },
      { '@type': 'ListItem', position: 2, name: cfg.blogLabel, item: `${SITE_URL}${cfg.basePath}/blog` },
      { '@type': 'ListItem', position: 3, name: meta.category, item: `${SITE_URL}${cfg.basePath}/blog/category/${meta.slug}` },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: cfg.locale,
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

            <nav aria-label={cfg.breadcrumbAriaLabel} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#4C6459', marginBottom: '16px' }}>
              <Link href={cfg.basePath} style={{ color: 'inherit', textDecoration: 'none' }}>{cfg.homeLabel}</Link>
              <span aria-hidden="true">/</span>
              <Link href={`${cfg.basePath}/blog`} style={{ color: 'inherit', textDecoration: 'none' }}>{cfg.blogLabel}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" style={{ color: colors.text }}>{cfg.catLabel(meta.category)}</span>
            </nav>

            <div className="inline-flex items-center gap-2" style={{ marginBottom: '12px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.text, display: 'inline-block' }} aria-hidden="true" />
              <span style={S.countBadge(colors.text)}>
                {cfg.articleCount(articles.length)}
              </span>
            </div>

            <h1 className="font-serif font-black" style={{ fontSize: 'clamp(26px, 4vw, 42px)', lineHeight: S.h1.lineHeight, letterSpacing: S.h1.letterSpacing, color: '#080F0D', marginBottom: '12px', maxWidth: S.h1.maxWidth }}>
              {meta.title}
            </h1>

            <p style={{ fontSize: 'clamp(16px, 1.3vw, 17px)', lineHeight: S.introP.lineHeight, color: '#2A3C34', maxWidth: S.introP.maxWidth, fontWeight: 400, marginBottom: '24px' }}>
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

        {/* What this category covers, and who it is for */}
        {intro && (
          <section style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 20px 8px' }}>
            <h2 className="font-serif" style={{ fontSize: 'clamp(21px, 2.4vw, 26px)', fontWeight: 700, color: '#0B5240', letterSpacing: '-0.022em', lineHeight: S.coversHeadingLineHeight, marginBottom: '16px' }}>
              {cfg.coversHeading}
            </h2>
            {/* 68ch is measured against the width of '0', so in Japanese it is
                roughly 34 characters — the same value reads well in both. */}
            {intro.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: '15.5px', color: '#2A3C34', lineHeight: S.coversPLineHeight, fontWeight: 400, marginBottom: '1rem', maxWidth: '68ch' }}>
                {p}
              </p>
            ))}
            {intro.service && (
              <p style={{ fontSize: '15.5px', lineHeight: S.coversPLineHeight, fontWeight: 400, marginBottom: 0 }}>
                <Link
                  href={intro.service.path}
                  style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  {intro.service.label}
                </Link>
              </p>
            )}
          </section>
        )}

        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px 24px' }}>

          <h2 className="font-serif" style={{ fontSize: '20px', fontWeight: 700, color: '#080F0D', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            {cfg.gridHeading(cfg.catLabel(meta.category), articles.length)}
          </h2>

          <div className="category-grid">
            {articles.map(article => (
              <Link
                key={article.slug}
                href={`${cfg.basePath}/blog/${article.slug}`}
                className="category-card"
                style={{ display: 'flex', flexDirection: 'column', gap: '0', padding: '0', background: '#fff', textDecoration: 'none', borderRadius: '16px', border: '1px solid #E2EFE9' }}
              >
                <div className="blog-card-hero" style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: '15px 15px 0 0' }}>
                  <CategoryHero category={article.category} title={article.title} slug={article.slug} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px 22px 22px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '13px',
                      padding: '4px 11px',
                      borderRadius: '100px',
                      background: colors.bg,
                      color: colors.text,
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      border: `1px solid ${colors.border}`,
                    }}>
                      {cfg.catLabel(article.category)}
                    </span>
                    <span style={{ color: '#CDE3DB' }}>·</span>
                    <span style={{ fontSize: '13px', color: '#4C6459' }}>{cfg.readTimeLabel(article.readTime)}</span>
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', lineHeight: S.cardTitleLineHeight, letterSpacing: '-0.015em', margin: 0 }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#4C6459', lineHeight: S.cardDescLineHeight, margin: 0, fontWeight: 400, flex: 1 }}>
                    {article.description}
                  </p>
                  <span style={{ fontSize: '14px', color: '#0B5240', fontWeight: 600, marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {cfg.readMoreLabel} <span className="read-arrow">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 20px 60px', borderTop: '1px solid #E2EFE9', marginTop: '48px' }}>
          <div style={{ marginBottom: '24px' }}>
            <p style={{ ...S.faqKicker(colors.text), marginBottom: '8px' }}>
              {cfg.faqKickerLabel}
            </p>
            <h2 className="font-serif" style={{ fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 700, color: '#0B5240', marginBottom: '0', letterSpacing: S.faqHeadingLetterSpacing }}>
              {cfg.faqHeading}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {meta.faq.map((f, i) => (
              <details key={i} className="faq-item" style={{ borderBottom: '1px solid #E2EFE9', padding: '16px 0', cursor: 'pointer' }}>
                <summary className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', letterSpacing: '-0.015em', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span style={{ flexShrink: 0, color: colors.text, fontSize: '20px', fontWeight: 300, lineHeight: 1 }}>+</span>
                </summary>
                {/* One <p> per paragraph so a long answer is not a single slab
                    on a phone. faqLd above uses the original f.answer, so the
                    structured data is unchanged. */}
                {f.answer.split('\n\n').map((para, j) => (
                  <p key={j} style={{ fontSize: '15px', color: '#2A3C34', lineHeight: S.faqAnswerLineHeight, fontWeight: 400, marginTop: '12px', marginBottom: 0 }}>
                    {para}
                  </p>
                ))}
              </details>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: '780px', margin: '0 auto', padding: '0 20px 80px' }}>
          <h2 className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', marginBottom: '16px', letterSpacing: '-0.015em' }}>
            {cfg.otherCategoriesHeading}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {cfg.categoryMeta
              .filter(c => c.slug !== meta.slug)
              .map(c => {
                const cColors = getCategoryColor(c.category)
                return (
                  <Link
                    key={c.slug}
                    href={`${cfg.basePath}/blog/category/${c.slug}`}
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
                    {cfg.catLabel(c.category)}
                  </Link>
                )
              })}
            <Link
              href={`${cfg.basePath}/blog`}
              className="topic-pill"
              style={{ padding: '8px 16px', borderRadius: '100px', border: '1px solid #0B5240', background: '#0B5240', fontSize: '13px', color: '#fff', textDecoration: 'none', fontWeight: 600 }}
            >
              {cfg.allArticlesLabel}
            </Link>
          </div>
        </section>

      </main>
      <MobileCta href={waUrl({ topic: 'guide', lang: cfg.locale })} lang={cfg.locale} topic="guide" />
    </>
  )
}
