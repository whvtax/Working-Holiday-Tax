import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { WaButton } from '@/components/wht/WaButton'
import { LinkButton } from '@/components/wht/Button'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { Crumbs, PhotoBand, tb } from '@/components/wht/TfnAbnBlocks'

// ─── METADATA ───────────────────────────────────────────────────────────
// This page owns the split: what an ABN changes about the return itself.
// No price anywhere, and no title or keyword that asserts we are a tax agent.
export const metadata: Metadata = {
  // The root layout appends " | Working Holiday Tax", so the base title is kept
  // short enough that the whole thing still fits a mobile SERP.
  title: 'Working Holiday ABN: What It Changes',
  description:
    'An ABN changes what your tax return has to say. Invoiced income with nothing withheld, business expenses, GST, and whether you were a contractor at all.',
  keywords: [
    'ABN registration Australia',
    'ABN working holiday',
    'ABN application Australia',
    'Australian Business Number backpacker',
    'sole trader ABN 417',
    'sole trader ABN 462',
    'ABN for contractors WHV',
    'register ABN backpacker',
    'ABN for working holiday tax return',
    'ABN tax obligations backpacker',
    'do I need an ABN working holiday',
    'ABN vs TFN working holiday',
    'employee vs contractor Australia backpacker',
    'ABN business expenses working holiday',
    'GST threshold ABN working holiday',
    'sham contracting Australia working holiday',
  ],
  alternates: {
    canonical: '/abn',
    languages: {
      'en': '/abn', 'en-AU': '/abn',
      de: '/de/abn',
      ja: '/ja/abn',
      ...newLocaleLanguages('/abn'),
      'x-default': '/abn',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-abn.png`, width: 1200, height: 630, alt: 'ABN registration for working holiday makers in Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/abn`,
    siteName: 'Working Holiday Tax',
    title: 'ABN on a Working Holiday Visa: What It Changes',
    description:
      'An ABN does not change your job. It changes your tax return. Invoiced income, business expenses, GST, and the employee versus contractor question.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-abn.png`],
    card: 'summary_large_image',
    title: 'ABN on a Working Holiday Visa: What It Changes',
    description: 'An ABN does not change your job. It changes your tax return.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** The four things an ABN changes about the return. This is the page. */
const THE_SPLIT = [
  {
    n: '01',
    title: 'Nothing was withheld, so the tax is still owed',
    body: 'Wages arrive with tax already taken out. Invoices do not, and the tax on invoiced income is settled once at the end of the year. In a mixed year the payslip half looks like a refund and the invoice half does not.',
  },
  {
    n: '02',
    title: 'Deductions become business expenses, and the rules differ',
    body: 'As an employee you claim work related expenses. As a sole trader you deduct the costs of running the business, a wider category with tighter records behind it.',
  },
  {
    n: '03',
    title: 'GST is a position, not a formality',
    body: 'Most working holiday makers never approach the $75,000 turnover line, so most should not be registered. Rideshare is the exception. Getting the position wrong means BAS obligations you did not need, or ones you missed.',
  },
  {
    n: '04',
    title: 'Whether you were a contractor at all',
    body: 'This is the one that decides the other three. Whether you were really contracting turns on control, not paperwork. An ABN over work that was always employment is the most common reason a backpacker return has to be reworked.',
  },
]

const WHAT_WE_DO = [
  {
    title: 'We check you need one before you get one',
    body: 'Plenty of people register an ABN for a job that was always employment. That is a conversation, not a form.',
  },
  {
    title: 'We register it against the work you actually do',
    body: 'The business activity you declare follows you into GST, deductions and the return.',
  },
  {
    title: 'We tell you what to put aside',
    body: 'Roughly what the invoiced income will cost you at tax time, so the bill is not a surprise.',
  },
  {
    title: 'We tell you what to keep',
    body: 'Which records support a deduction for your line of work, and which receipts you can stop hoarding.',
  },
  {
    title: 'We take the GST position deliberately',
    body: 'Registered because the rules require it, or not registered because they do not. Never by accident.',
  },
  {
    title: 'We put both halves on one return',
    body: 'Payslip income and invoiced income belong on the same return, reconciled against the same year.',
  },
]

// Answers past about 55 words carry a blank line, and the FAQ below renders one
// <p> per paragraph. faqLd still uses the raw string, so the schema is unchanged.
const FAQS = [
  {
    question: 'Can I just do this myself?',
    answer:
      'You can, and if your whole year was payslips it is straightforward.\n\nAn ABN is what stops it being straightforward: where the line falls between wages and invoiced income, whether you were a contractor at all, which costs come off the invoiced side, and whether you had to register for GST. Those are judgements about your year, not fields to fill in.',
  },
  {
    question: 'How does an ABN change my working holiday tax return?',
    answer:
      'Wages reach you with tax already withheld and an income statement your employer files with the ATO, so that half largely reconciles itself.\n\nIncome invoiced under an ABN arrives untaxed, is declared as business income, and is reduced only by expenses you can evidence. Add the GST position and the question of whether the arrangement was really contracting. Both halves still land on one return.',
  },
  {
    question: 'My employer says I need an ABN for a normal shift job. Is that right?',
    answer:
      'Usually not, and it is worth pushing back before you register. If they set your roster, tell you how the work is done, provide the tools and can send you home early, you are being treated as an employee, whatever the paperwork says.\n\nAn ABN moves the cost onto you: no tax withheld, no superannuation, no workers compensation cover, no minimum wage or penalty rates. Send us the job details before you agree to anything.',
  },
  {
    question: 'Do I need to register for GST on a working holiday visa?',
    answer:
      'Only if your turnover reaches $75,000 in a year, which most working holiday makers do not come close to, or if you drive rideshare. Anyone providing taxi travel or ride sourcing, Uber included, must register for GST from the first fare however little they earn.\n\nFood delivery riders and couriers are not caught by that rule and fall back on the $75,000 threshold. Registration brings quarterly business activity statements with it.',
  },
  {
    question: 'Can I have both a TFN and an ABN?',
    answer:
      'Yes, and most working holiday makers who contract end up with both. The tax file number covers you as an employee, the ABN as a sole trader.\n\nThey do not go on separate returns: one return covers the financial year and reports both. You need the tax file number first, because an ABN application is matched against it.',
  },
  {
    question: 'What can I claim as business expenses under an ABN?',
    answer:
      'The costs of earning the income, apportioned honestly where something is used privately as well.\n\nFor a delivery rider that means kilometres recorded properly, bike or vehicle running costs, phone and data, insurance, equipment and the commission a platform took. For a subcontractor on a site it is tools, protective gear and travel between jobs.\n\nIt never includes the trip to Australia, ordinary commuting from home to one workplace, or anything you cannot show a record for.',
  },
  {
    question: 'What happens to my ABN when I leave Australia?',
    answer:
      'You cancel it once you have stopped trading, because an active ABN tells the ATO you are still running a business and may still have obligations.\n\nCancelling does not affect the return for the year you did work, which still has to be lodged, or your ability to claim superannuation from employment income in the same period. If you are leaving soon, tell us early, because the order of cancelling, lodging and claiming super matters.',
  },
]

const GUIDES = [
  {
    href: '/blog/employee-vs-contractor-australia',
    title: 'Employee or contractor',
    desc: 'The test the ATO applies, and what it costs to be on the wrong side of it.',
  },
  {
    href: '/blog/abn-deductions-business-expenses',
    title: 'ABN deductions and business expenses',
    desc: 'What a sole trader can deduct, by the kind of work, and the records behind each one.',
  },
  {
    href: '/blog/gst-and-abn-for-working-holiday-makers',
    title: 'GST and your ABN',
    desc: 'The $75,000 threshold, the rideshare exception, and what registering commits you to.',
  },
]

// The myGov comparison table that used to sit here was removed: its four rows
// were the four items of THE_SPLIT and of WHAT_WE_DO again, and the contractor
// row has a whole section of its own. The "you will never log into myGov"
// promise moved to the end of the WHAT_WE_DO section.

const WA_ABN = waUrl({ topic: 'abn', lang: 'en' })

export default function ABNPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/abn#webpage`,
    url: `${SITE_URL}/abn`,
    name: 'ABN on a Working Holiday Visa',
    description:
      'What an ABN changes about an Australian tax return for a working holiday maker: untaxed invoiced income, business expenses, the GST position and the employee versus contractor question.',
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/abn#service`,
    name: 'ABN Registration for Working Holiday Makers',
    serviceType: 'Australian Business Number registration',
    description:
      'ABN registration for holders of 417 and 462 working holiday visas doing genuine contract work, with the GST position, record keeping and tax consequences set out before registration.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 and 462) working as a sole trader' },
    availableLanguage: ['en', 'de', 'ja'],
    inLanguage: 'en-AU',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'en-AU',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'ABN Registration', item: `${SITE_URL}/abn` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      {/* SEO (Oct 2026): the kicker sits inside the H1 so the heading carries the query words people type. */}
      <div className={blocks.underHeader}>
        <Crumbs homeHref="/" home="Home" current="ABN" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>ABN on a working holiday visa&nbsp;&middot; 417 &amp; 462</span>
            An ABN does not change your job.<br />
            It changes <Mark>your tax return.</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              Untaxed income, business expenses, a GST position, and one question underneath all three: were you a
            contractor at all.
            </Lead>
          </div>
          <WaButton href={WA_ABN} position="hero" topic="abn" lang="en">Message us on WhatsApp</WaButton>
          <p className={heroStyles.note}>Replies in about an hour.</p>
          <GoogleRating variant="pill" lang="en" />
        </Hero>
        <PhotoBand page="abn" locale="en" />
      </div>

      <Section eyebrow="The split" title="What changes on your return once you have an ABN?" titleId="split-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Four things, and they compound.
        </p>
        <Steps items={THE_SPLIT} />
      </Section>

      <Section tone="pale" title="Should you register an ABN because an employer asked you to?" titleId="warn-title">
        <p className={blocks.text}>
          
            Not before somebody has looked at the job. An ABN over work that is really employment stops your
            superannuation and your tax withholding, drops workers compensation cover and puts you outside minimum wage
            and penalty rates. All of it becomes your cost. It is common in farm work, hospitality, cleaning and on
            building sites.
          
        </p>
        <p className={blocks.text}>
          
            The test is control, not paperwork. Who decides when you work, who directs how it is done, who supplies the
            equipment, and who carries the risk if the job goes badly. If the answers point at them, an ABN is the wrong
            instrument.
          
        </p>
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Send us the job before you register.</strong>{' '}
          What the work involves, who supplies what, and how you will be paid. We will tell you which of the two it
              is.
        </p>
      </Section>

      <Section eyebrow="The work" title="What we do about it" titleId="work-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Registration itself is free and takes minutes. Everything that decides what it costs you happens either side
            of it.
        </p>
        <div className={tb.pairs}>
          {WHAT_WE_DO.map(c => (
            <div key={c.title} className={blocks.palePanel}>
              <h3 className={blocks.cardTitle}>{c.title}</h3>
              <p className={blocks.text}>{c.body}</p>
            </div>
          ))}
        </div>
        <p className={blocks.statement}>
          You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly.
        </p>
        <p className={blocks.text}>
          No ABN yet and no tax file number either? The{' '}
            <Link href="/tfn" className={tb.inlineLink}>TFN comes first</Link>, because an
            ABN application is matched against it.
        </p>
      </Section>

      {/* The one amber band: the guarantee. */}
      <Section tone="amber" title="Our fee" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          The fee for a return with ABN income is a flat $385, including GST. Our refund guarantee applies to returns with TFN income only.
        </p>
        <p className={blocks.text}>The fee is flat and never a percentage of what comes back.</p>
      </Section>

      <Section tone="pale" title="Working holiday tax is the only thing we do." titleId="trust-title">
        <p className={blocks.text}>
          Which means we see the same ABN arrangements over and over: the farm contract, the delivery platform, the
            site that pays everyone as a subcontractor.
        </p>
        <GoogleReviewsServer lang="en" />
      </Section>

      <Section title="ABN questions people ask before they message us" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Guides" title="More on contracting, expenses and GST" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="What is next" title="Both halves land on one return" titleId="next-title">
        <p className={blocks.text}>Payslip income and invoiced income belong on the same tax return for the same year.</p>
        <div className={blocks.stack}>
          <LinkButton href="/tax-return" size="md">How the return works →</LinkButton>
        </div>
      </Section>

      {/* Closing CTA, forest band. */}
      <Section tone="forest" title="Tell us what the work looks like" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          Who you would be invoicing, what you would be doing, and who supplies the equipment. That is enough to tell
            you whether an ABN belongs in this at all.
        </p>
        <WaButton href={waUrl({ topic: 'abn', lang: 'en', tier: 'tfn-abn' })} position="section" topic="abn" lang="en" tier="tfn-abn" tone="light">Message us on WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Replies in about an hour.</p>
      </Section>

      <MobileCta href={WA_ABN} lang="en" topic="abn" />
    </>
  )
}
