import { SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { guides, categoryMeta, getCategoryBySlug, getCategoryColor } from '../../data'
import CategoryHero from '../../[slug]/CategoryHero'
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
      'Superannuation is money your employer pays into a retirement fund on top of your wages, at 12 per cent from 1 July 2026. When you leave Australia for good you can claim it back through the Departing Australia Superannuation Payment. These guides cover how super accrues, how to check a balance, how to find funds you have lost track of, the DASP process, the documents it needs, and how the payment is taxed.',
      'They are for anyone at the end of a working holiday, and in particular for anyone who worked casually across several employers and suspects the money went to more than one fund.',
      'Two things decide how much comes back and how long it takes. Whether every account sitting under your TFN was found before the claim went in, because a claim only empties the funds you name. And when the claim is lodged relative to your visa ceasing. The payment itself is taxed at 65 per cent for working holiday makers, which is set by law and cannot be planned around.',
    ],
    service: { path: '/superannuation', label: 'What we do about your super before you leave' },
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
      'On $25,000 of earnings the levy is $500. Claiming the exemption is not automatic and the ATO will not apply it for you.',
      'It has to be claimed on the return, and to claim it you need a Medicare Entitlement Statement from Services Australia, which must be applied for and commonly takes weeks to arrive. Your passport decides whether the exemption is available to you at all.',
    ],
    service: { path: '/medicare', label: 'What we do about the Medicare levy' },
  },
}

export default async function CategoryPage({ params }: Props) {
  const meta = getCategoryBySlug((await params).slug)
  if (!meta) notFound()

  const articles = guides.filter(g => g.category === meta.category)
  const colors = getCategoryColor(meta.category)
  const intro = CATEGORY_INTRO[meta.slug]

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/blog/category/${meta.slug}`,
    inLanguage: 'en-AU',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Working Holiday Tax',
      url: `${SITE_URL}`,
    },
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

      {/* All blog styles are in globals.css, except these two, which have no
          rule there at all. `list-style: none` on a <summary> is ignored by
          Safari and iOS, so every question on this page carried a native
          disclosure triangle next to the "+" that is meant to be the only
          indicator. And the "+" never became a "−": once a question was open
          the control still read as "expand". Same rotate the contact page FAQ
          already uses. */}
      <style dangerouslySetInnerHTML={{ __html: `.faq-item > summary::-webkit-details-marker{display:none}.faq-item > summary::marker{content:""}.faq-plus{transition:transform .25s ease}.faq-item[open] .faq-plus{transform:rotate(45deg)}@media (prefers-reduced-motion: reduce){.faq-plus{transition:none}}` }} />

      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: '68px' }}>

        {/* Hero - now uses the category's color for the accent */}
        <section style={{ background: colors.bg }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px 48px' }}>

            <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#4C6459', marginBottom: '16px', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none', padding: '8px 0' }}>Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none', padding: '8px 0' }}>Blog</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" style={{ color: colors.text }}>{meta.category}</span>
            </nav>

            <div className="inline-flex items-center gap-2" style={{ marginBottom: '12px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.text, display: 'inline-block' }} aria-hidden="true" />
              <span style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: colors.text, textTransform: 'uppercase', fontWeight: 600 }}>
                {articles.length} {articles.length === 1 ? 'article' : 'articles'}
              </span>
            </div>

            <h1 className="font-serif font-black" style={{ fontSize: 'clamp(26px, 4vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#080F0D', marginBottom: '12px', maxWidth: '720px' }}>
              {meta.title}
            </h1>

            <p style={{ fontSize: 'clamp(16px, 1.3vw, 17px)', lineHeight: 1.65, color: '#2A3C34', maxWidth: '640px', fontWeight: 400, marginBottom: '24px' }}>
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
            <h2 className="font-serif" style={{ fontSize: 'clamp(21px, 2.4vw, 26px)', fontWeight: 700, color: '#0B5240', letterSpacing: '-0.022em', lineHeight: 1.25, marginBottom: '16px' }}>
              What {meta.category} covers, and who it is for
            </h2>
            {/* 68ch keeps these two long paragraphs inside a readable measure.
                At the section's full 740px they ran to about 95 characters a
                line, which is where the eye starts losing the return sweep. */}
            {intro.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: '15.5px', color: '#2A3C34', lineHeight: 1.8, fontWeight: 400, marginBottom: '1rem', maxWidth: '68ch' }}>
                {p}
              </p>
            ))}
            {intro.service && (
              <p style={{ fontSize: '15.5px', lineHeight: 1.8, fontWeight: 400, marginBottom: 0 }}>
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

        {/* Articles */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px 24px' }}>

          <h2 className="font-serif" style={{ fontSize: '20px', fontWeight: 700, color: '#080F0D', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            All {meta.category} articles ({articles.length})
          </h2>

          <div className="category-grid">
            {articles.map(article => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="category-card"
                style={{ display: 'flex', flexDirection: 'column', gap: '0', padding: '0', background: '#fff', textDecoration: 'none', borderRadius: '16px', border: '1px solid #E2EFE9' }}
              >
                {/* Decorative category illustration */}
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
                      {article.category}
                    </span>
                    <span aria-hidden="true" style={{ color: '#CDE3DB' }}>·</span>
                    <span style={{ fontSize: '13px', color: '#4C6459' }}>{article.readTime} min read</span>
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', lineHeight: 1.35, letterSpacing: '-0.015em', margin: 0 }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#4C6459', lineHeight: 1.65, margin: 0, fontWeight: 400, flex: 1 }}>
                    {article.description}
                  </p>
                  <span style={{ fontSize: '14px', color: '#0B5240', fontWeight: 600, marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Read more <span className="read-arrow">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 20px 60px', borderTop: '1px solid #E2EFE9', marginTop: '48px' }}>
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '10.5px', fontWeight: 700, color: colors.text, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Common questions
            </p>
            <h2 className="font-serif" style={{ fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 700, color: '#0B5240', marginBottom: '0', letterSpacing: '-0.025em' }}>
              Frequently asked questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {meta.faq.map((f, i) => (
              <details key={i} className="faq-item" style={{ borderBottom: '1px solid #E2EFE9', padding: '16px 0' }}>
                <summary className="font-serif" style={{ fontSize: '16px', fontWeight: 700, color: '#080F0D', letterSpacing: '-0.015em', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', cursor: 'pointer', minHeight: '28px' }}>
                  <span style={{ flex: 1, minWidth: 0 }}>{f.question}</span>
                  <span className="faq-plus" aria-hidden="true" style={{ flexShrink: 0, color: colors.text, fontSize: '20px', fontWeight: 300, lineHeight: 1 }}>+</span>
                </summary>
                {/* One <p> per paragraph, so a long answer is not one block on
                    a phone. faqLd above still uses the raw f.answer string, so
                    the structured data is unchanged. The answers themselves live
                    in data.ts, which another rewrite owns. */}
                {f.answer.split('\n\n').map((para, j) => (
                  <p key={j} style={{ fontSize: '15px', color: '#2A3C34', lineHeight: 1.75, fontWeight: 400, marginTop: '12px', marginBottom: 0 }}>
                    {para}
                  </p>
                ))}
              </details>
            ))}
          </div>
        </section>

        {/* Other categories */}
        <section style={{ maxWidth: '780px', margin: '0 auto', padding: '0 20px 80px' }}>
          {/* 20px, matching "All X articles". At 16px this section heading was
              the same size as the article card titles below it, which flattened
              the hierarchy on the one page that has four H2s. */}
          <h2 className="font-serif" style={{ fontSize: '20px', fontWeight: 700, color: '#080F0D', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Other categories
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categoryMeta
              .filter(c => c.slug !== meta.slug)
              .map(c => {
                const cColors = getCategoryColor(c.category)
                return (
                  <Link
                    key={c.slug}
                    href={`/blog/category/${c.slug}`}
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
              href="/blog"
              className="topic-pill"
              style={{ padding: '8px 16px', borderRadius: '100px', border: '1px solid #0B5240', background: '#0B5240', fontSize: '13px', color: '#fff', textDecoration: 'none', fontWeight: 600 }}
            >
              All articles →
            </Link>
          </div>
        </section>

      </main>
      <MobileCta href={waUrl({ topic: "guide", lang: "en" })} lang="en" topic="guide" />
    </>
  )
}
