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
import { newLocaleLanguages } from '@/lib/locale-pages'
import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Category } from '@/app/(site)/blog/data'
import { Section } from '@/components/wht/Section'
import { LinkButton } from '@/components/wht/Button'
import { PagePhoto } from '@/components/wht/PagePhoto'
import { blocks } from '@/components/wht/Blocks'
import { blog, PageHead, ArticleCard, CtaBand, categoryPhotoKey } from '@/components/wht/BlogBlocks'
import { Accordion } from '@/components/ui/Accordion'
import { GuideCta } from '@/components/ui/GuideCta'
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
  locale: 'de' | 'ja' | 'fr' | 'it' | 'es'
  basePath: string
  ogLocale: string
  categoryMeta: ReadonlyArray<{ slug: string; category: Category }>
  getCategoryMeta: (slug: string) => LocalizedCategoryMeta | null | undefined
  getGuides: () => Array<{ slug: string; category: Category; title: string; description: string; readTime: number }>
  catLabel: (category: string) => string
  /** fr / it / es: replaces the default hreflang map for a category hub. */
  alternateLanguages?: (slug: string) => Record<string, string>
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
      languages: cfg.alternateLanguages ? cfg.alternateLanguages(meta.slug) : {
        // EN uses a different slug for the Medicare category (medicare-and-other)
        'en-AU': `${SITE_URL}/blog/category/${meta.slug === 'medicare' ? 'medicare-and-other' : meta.slug}`,
        'de': `${SITE_URL}/de/blog/category/${meta.slug}`,
        'ja': `${SITE_URL}/ja/blog/category/${meta.slug}`,
        ...newLocaleLanguages(`/blog/category/${meta.slug === 'medicare' ? 'medicare-and-other' : meta.slug}`),
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
  const photoKey = categoryPhotoKey(meta.slug)
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
      { '@type': 'ListItem', position: 3, name: cfg.catLabel(meta.category), item: `${SITE_URL}${cfg.basePath}/blog/category/${meta.slug}` },
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

      <div className={blocks.underHeader} style={{ background: '#fff', minHeight: '100vh' }}>

        <PageHead
          titleId="category-title"
          crumbsLabel={cfg.breadcrumbAriaLabel}
          crumbs={[
            { label: cfg.homeLabel, href: cfg.basePath },
            { label: cfg.blogLabel, href: `${cfg.basePath}/blog` },
            { label: cfg.catLabel(meta.category) },
          ]}
          top={<p className={blog.countRow}>{cfg.articleCount(articles.length)}</p>}
          title={meta.title}
          titleStyle={{ lineHeight: S.h1.lineHeight, letterSpacing: S.h1.letterSpacing }}
          lead={meta.intro}
          leadStyle={{ lineHeight: S.introP.lineHeight }}
        >
          {meta.relatedServicePath && (
            <LinkButton href={meta.relatedServicePath} size="md">{meta.relatedServiceLabel} →</LinkButton>
          )}
        </PageHead>

        {photoKey && (
          <div className={blog.photoWrap}><PagePhoto page={photoKey} locale={cfg.locale} /></div>
        )}

        {/* What this category covers, and who it is for */}
        {intro && (
          <Section title={cfg.coversHeading} titleId="covers-title">
            {intro.paragraphs.map((p, i) => (
              <p key={i} className={blocks.text} style={{ lineHeight: S.coversPLineHeight }}>{p}</p>
            ))}
            {intro.service && (
              <Link href={intro.service.path} className={blocks.textLink}>{intro.service.label}</Link>
            )}
          </Section>
        )}

        <Section tone="pale" width="wide" title={cfg.gridHeading(cfg.catLabel(meta.category), articles.length)} titleId="articles-title">
          <div className={blog.grid}>
            {articles.map(article => (
              <ArticleCard
                key={article.slug}
                href={`${cfg.basePath}/blog/${article.slug}`}
                meta={`${cfg.catLabel(article.category)} · ${cfg.readTimeLabel(article.readTime)}`}
                title={article.title}
                desc={article.description}
                cta={cfg.readMoreLabel}
              />
            ))}
          </div>
        </Section>

        {/* The FAQPage schema above uses the raw answers, so it is unchanged. */}
        <Section eyebrow={cfg.faqKickerLabel} title={cfg.faqHeading} titleId="faq-title">
          <Accordion items={meta.faq} />
        </Section>

        <Section tone="pale" title={cfg.otherCategoriesHeading} titleId="other-title">
          <div className={blog.pills}>
            {cfg.categoryMeta
              .filter(c => c.slug !== meta.slug)
              .map(c => (
                <Link key={c.slug} href={`${cfg.basePath}/blog/category/${c.slug}`} className={blog.pill}>
                  {cfg.catLabel(c.category)}
                </Link>
              ))}
            <Link href={`${cfg.basePath}/blog`} className={`${blog.pill} ${blog.pillOn}`}>
              {cfg.allArticlesLabel}
            </Link>
          </div>
        </Section>

        <CtaBand>
          <GuideCta category={meta.category} slug={`category-${meta.slug}`} lang={cfg.locale} title={meta.title} />
        </CtaBand>

        <div
          aria-hidden="true"
          className="md:hidden"
          style={{ height: 'calc(84px + env(safe-area-inset-bottom, 0px))' }}
        />

      </div>
      <MobileCta href={waUrl({ topic: 'guide', lang: cfg.locale })} lang={cfg.locale} topic="guide" />
    </>
  )
}
