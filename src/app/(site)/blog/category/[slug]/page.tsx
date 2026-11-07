import { newLocaleLanguages } from '@/lib/locale-pages'
import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { guides, categoryMeta, getCategoryBySlug } from '../../data'
import { Section } from '@/components/wht/Section'
import { LinkButton } from '@/components/wht/Button'
import { PagePhoto } from '@/components/wht/PagePhoto'
import { blocks } from '@/components/wht/Blocks'
import { blog, PageHead, ArticleCard, CtaBand, categoryPhotoKey } from '@/components/wht/BlogBlocks'
import { Accordion } from '@/components/ui/Accordion'
import { GuideCta } from '@/components/ui/GuideCta'
import { MobileCta } from '@/components/ui/MobileCta'
import { waUrl } from '@/lib/wa'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categoryMeta.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = getCategoryBySlug((await params).slug)
  if (!meta) return {}
  return {
    title: meta.title,
    description: meta.description,
    keywords: [
      'working holiday tax Australia',
      meta.category,
      'working holiday visa',
      '417 visa',
      '462 visa',
      'WHM tax',
    ],
    alternates: {
      canonical: `${SITE_URL}/blog/category/${meta.slug}`,
      // German and Japanese already point here, and hreflang is only honoured
      // when it is reciprocal, so the English side has to point back or all
      // three annotations are discarded. German and Japanese call the Medicare
      // category 'medicare' where English calls it 'medicare-and-other'.
      languages: (() => {
        const other = meta.slug === 'medicare-and-other' ? 'medicare' : meta.slug
        return {
          'en-AU': `${SITE_URL}/blog/category/${meta.slug}`,
          'de': `${SITE_URL}/de/blog/category/${other}`,
          'ja': `${SITE_URL}/ja/blog/category/${other}`,
          ...newLocaleLanguages(`/blog/category/${meta.slug}`),
          'x-default': `${SITE_URL}/blog/category/${meta.slug}`,
        }
      })(),
    },
    openGraph: {
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/blog/category/${meta.slug}`,
      siteName: 'Working Holiday Tax',
      locale: 'en_AU',
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

/* ── The category introduction ────────────────────────────────────────────
   A category page is the natural hub for its cluster and these were a single
   sentence of throat clearing above a grid of cards. Somebody who lands here
   from a search has a question, and the page answered none of it.

   Two or three short paragraphs per category, written to stand on their own
   without the grid below them: what this category actually covers, and who it
   is for, ending on what decides the answer rather than on how to do it
   yourself. Then one link to the service page that owns the cluster, with
   anchor text that says what the page is.

   The paragraphs used to be two long ones. The search intent, the headings and
   the keywords are untouched; what came out is the filler around them, mostly
   closing lines of the "those two facts are what these guides keep returning
   to" kind, and what changed is where the paragraph breaks fall.

   The copy lives here rather than in data.ts because another rewrite owns that
   file. `intro` from the category meta still runs as the hero lede above.   */

interface CategoryIntro {
  paragraphs: string[]
  service: { path: string; label: string } | null
}

const CATEGORY_INTRO: Record<string, CategoryIntro> = {
  'tfn': {
    paragraphs: [
      'A Tax File Number is the number the Australian Taxation Office uses to identify you. There is no government fee for one. What it costs to be without one is the weeks of pay withheld at 45% instead of 15%. These guides cover the application itself, working while you wait for it, delays past the 28 day mark, lost numbers, identity documents and whether a second visa needs a new one.',
      'They are written for somebody who has just landed, or who has started a job and found 45 per cent coming off their pay instead of 15. The TFN itself is almost never where money is won or lost.',
      'What decides your pay is the Tax File Number Declaration your employer hands you in the first week, the 28 day window that starts on your first shift rather than on the day you applied, and whether that employer is registered with the ATO as a working holiday maker employer.',
    ],
    service: { path: '/tfn', label: 'What we do about the TFN and the declaration form' },
  },
  'abn': {
    paragraphs: [
      'An Australian Business Number is what you invoice under when a business pays you as a contractor rather than putting you on its payroll. These guides cover registering one and cancelling one, GST and the $75,000 turnover threshold, invoicing requirements, business deductions, vehicle logbooks, and how invoiced income sits alongside wages inside the same tax return.',
      'They are for anyone who has been asked to get an ABN by a farm, a delivery platform or a hospitality operator, and for anyone who already has one and is not sure what it changed. Two facts do most of the work.',
      'Nothing is withheld from an ABN payment and no super is paid on it, so the tax arrives in one piece at the end of the year rather than a little at a time. And the arrangement is classified on how the work actually runs, not on the word used for it, which is why being moved from payroll to invoicing for the same job, the same hours and the same supervision is worth reading about here.',
    ],
    service: { path: '/abn', label: 'What we do when you have invoiced under an ABN' },
  },
  'tax-return': {
    paragraphs: [
      'The Australian financial year runs from 1 July to 30 June, and anyone who earned income inside it lodges a return. These guides cover deadlines and penalties, deductions and what needs a receipt, tax residency, amendments to a year already lodged, lodging after you have flown home, and what actually decides the size of a refund.',
      // Residency is named as a factor and nothing more. The earlier wording
      // said it was not settled by "a visa or a day count", which points at
      // what the test does turn on. That belongs only in the residency
      // assessment, so the sentence now says what the brief allows: it depends
      // on the person, and it has to be reviewed properly.
      'This is the category for somebody deciding whether to lodge it themselves or hand it over. Your tax residency, which depends on your own circumstances and has to be properly reviewed. The weeks withheld at 45 per cent before a TFN reached payroll. The Medicare position. And the deductions that belong to the work you genuinely did. None of those can be looked up in a table.',
    ],
    service: { path: '/tax-return', label: 'What we go through on every tax return' },
  },
  'super': {
    paragraphs: [
      'Superannuation is money your employer pays into a retirement fund on top of your wages: 12 per cent of your ordinary time earnings since 1 July 2025, and from 1 July 2026 paid with each payday rather than quarterly. When you leave Australia for good it is paid out as a Departing Australia Superannuation Payment. These guides cover how super accrues, how to check a balance, how to find funds you have lost track of, the DASP process, the documents it needs, and how the payment is taxed.',
      'They are for anyone at the end of a working holiday, and in particular for anyone who worked casually across several employers and suspects the money went to more than one fund.',
      'Two things decide how much comes back and how long it takes. Whether every account sitting under your TFN was found before the claim went in, because a claim only empties the funds you name. And when the claim is lodged relative to your visa ceasing. The payment itself is taxed at 65 per cent for working holiday makers, which is set by law and cannot be planned around.',
    ],
    service: { path: '/superannuation', label: 'How to claim superannuation after leaving Australia' },
  },
  'work-rights': {
    paragraphs: [
      'Working holiday makers have the same rights at work as anybody else in Australia. Minimum pay, penalty rates, breaks, leave, shift cancellation and dismissal are set by the Fair Work Commission and by the award covering your industry. These guides cover what you are owed, how to read a payslip, what to do when the numbers do not add up, and the certificates some jobs ask for.',
      'They are written for somebody in the middle of a season rather than at the end of one, and most of what is here is not a tax question.',
      'It sits on this site because the same year shows up twice: an employer who underpaid you, paid you cash, or never paid super is also an employer whose income statement will not match what you were actually paid, and that reappears the moment a return is lodged.',
    ],
    service: { path: '/tax-return', label: 'What we go through on every tax return' },
  },
  'medicare-and-other': {
    paragraphs: [
      'The Medicare levy is a 2 per cent charge on taxable income and it comes off by default. Most 417 and 462 visa holders are not entitled to Medicare and were never meant to pay it. These guides cover who is entitled and who is not, the reciprocal health care agreement countries, how the exemption is claimed, health cover while you are here, and the administrative questions that do not fit anywhere else.',
      'On $50,000 of taxable income the levy is about $1,000, and it only applies to Australian residents for tax purposes. Claiming the exemption is not automatic and the ATO will not apply it for you.',
      'It has to be claimed on the return, and to claim it you need a Medicare Entitlement Statement from Services Australia, which must be applied for and commonly takes weeks to arrive. Your passport decides whether the exemption is available to you at all.',
    ],
    service: { path: '/medicare', label: 'What we do about the Medicare levy' },
  },
}

export default async function CategoryPage({ params }: Props) {
  const meta = getCategoryBySlug((await params).slug)
  if (!meta) notFound()

  const articles = guides.filter(g => g.category === meta.category)
  const intro = CATEGORY_INTRO[meta.slug]
  const photoKey = categoryPhotoKey(meta.slug)

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/blog/category/${meta.slug}`,
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: meta.category,
    },
    audience: {
      '@type': 'Audience',
      name: 'Working holiday visa holders in Australia (subclass 417 and 462)',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/blog/${g.slug}`,
        name: g.title,
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: meta.category, item: `${SITE_URL}/blog/category/${meta.slug}` },
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

      <div className={blocks.underHeader} style={{ background: '#fff', minHeight: '100vh' }}>

        <PageHead
          titleId="category-title"
          crumbsLabel="Breadcrumb"
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: meta.category },
          ]}
          top={<p className={blog.countRow}>{articles.length} {articles.length === 1 ? 'article' : 'articles'}</p>}
          title={meta.title}
          lead={meta.intro}
        >
          {meta.relatedServicePath && (
            <LinkButton href={meta.relatedServicePath} size="md">{meta.relatedServiceLabel} →</LinkButton>
          )}
        </PageHead>

        {photoKey && (
          <div className={blog.photoWrap}><PagePhoto page={photoKey} locale="en" /></div>
        )}

        {/* What this category covers, and who it is for */}
        {intro && (
          <Section title={`What ${meta.category} covers, and who it is for`} titleId="covers-title">
            {intro.paragraphs.map((p, i) => (
              <p key={i} className={blocks.text}>{p}</p>
            ))}
            {intro.service && (
              <Link href={intro.service.path} className={blocks.textLink}>{intro.service.label}</Link>
            )}
          </Section>
        )}

        {/* Articles */}
        <Section tone="pale" width="wide" title={`All ${meta.category} articles (${articles.length})`} titleId="articles-title">
          <div className={blog.grid}>
            {articles.map(article => (
              <ArticleCard
                key={article.slug}
                href={`/blog/${article.slug}`}
                meta={`${article.category} · ${article.readTime} min read`}
                title={article.title}
                desc={article.description}
                cta="Read more"
              />
            ))}
          </div>
        </Section>

        {/* FAQ. The FAQPage schema above uses the raw answers, so it is unchanged. */}
        <Section eyebrow="Common questions" title="Frequently asked questions" titleId="faq-title">
          <Accordion items={meta.faq} />
        </Section>

        {/* Other categories */}
        <Section tone="pale" title="Other categories" titleId="other-title">
          <div className={blog.pills}>
            {categoryMeta
              .filter(c => c.slug !== meta.slug)
              .map(c => (
                <Link key={c.slug} href={`/blog/category/${c.slug}`} className={blog.pill}>
                  {c.category}
                </Link>
              ))}
            <Link href="/blog" className={`${blog.pill} ${blog.pillOn}`}>
              All articles →
            </Link>
          </div>
        </Section>

        <CtaBand>
          <GuideCta category={meta.category} slug={`category-${meta.slug}`} lang="en" title={meta.title} />
        </CtaBand>

        <div
          aria-hidden="true"
          className="md:hidden"
          style={{ height: 'calc(84px + env(safe-area-inset-bottom, 0px))' }}
        />

      </div>
      <MobileCta href={waUrl({ topic: "guide", lang: "en" })} lang="en" topic="guide" />
    </>
  )
}
