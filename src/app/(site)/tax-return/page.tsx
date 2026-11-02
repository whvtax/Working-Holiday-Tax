import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { Steps, LinkRows, blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, PlainRows } from '@/components/wht/CoreBlocks'
import { Accordion } from '@/components/ui/Accordion'

// ─── METADATA ───────────────────────────────────────────────────────────
// This page answers the transactional query: someone who has already decided
// they want help and wants to know what happens next. The homepage owns the
// informational side ("why not do this myself"), so nothing here repeats its
// hero, its three figures or the myGov comparison block. No price in the
// title, the description or the schema, and no claim to be a registered agent.
export const metadata: Metadata = {
  // The root layout appends " | Working Holiday Tax", so the base title is kept
  // short enough that the whole thing still fits a mobile SERP.
  title: 'Lodge Your Working Holiday Tax Return',
  description:
    'Passport and an Australian bank account, no payslips. We pull your ATO record, lodge the return, and the refund usually arrives about 14 business days later.',
  keywords: [
    'lodge tax return Australia backpacker',
    'working holiday tax return service',
    'lodge tax return from overseas',
    'tax return 417 visa',
    'tax return 462 visa',
    'how to lodge Australian tax return working holiday',
    'tax agent working holiday maker',
    'tax refund after leaving Australia',
    'previous year tax return Australia',
    'Australian tax return without payslips',
    'income statement ATO working holiday',
    'how long does an Australian tax refund take',
    'working holiday tax return UK',
    'working holiday tax return Germany',
    'working holiday tax return Japan',
  ],
  alternates: {
    canonical: '/tax-return',
    languages: {
      'en': '/tax-return', 'en-AU': '/tax-return',
      de: '/de/tax-return',
      ja: '/ja/tax-return',
      ...newLocaleLanguages('/tax-return'),
      'x-default': '/tax-return',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tax-return.png`, width: 1200, height: 630, alt: 'Lodging a working holiday tax return for 417 and 462 visa holders in Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/tax-return`,
    siteName: 'Working Holiday Tax',
    title: 'Lodge Your Working Holiday Tax Return (417 & 462)',
    description:
      'Your details and where to deposit your refund. We read the ATO record, prepare the return, you sign it, it is lodged, and the refund usually lands about 14 business days later.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tax-return.png`],
    card: 'summary_large_image',
    title: 'Lodge Your Working Holiday Tax Return (417 & 462)',
    description: 'Passport, bank details, no payslips. Signed by you, lodged by us, refund usually about 14 business days later.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** Everything the visitor has to supply. Three items, and nothing else. */
const NEEDED = [
  {
    label: 'Your passport and visa',
    body: 'Which passport you hold and which subclass you were on.',
  },
  {
    label: 'An Australian bank account',
    body: 'The ATO pays refunds into an Australian account only. If yours is already closed, say so at the start.',
  },
  {
    label: 'Roughly where and when you worked',
    body: 'A town, the kind of work, rough months. We match it against the ATO record and fill in the rest.',
  },
]

/** The sequence, in the order it happens, with the waiting written in. */
const SEQUENCE = [
  {
    n: '01',
    title: 'You message us',
    body: 'WhatsApp, in English, German or Japanese. You tell us what the year looked like, we tell you where you stand, and the fee is agreed before any work begins.',
  },
  {
    n: '02',
    title: 'One questionnaire, about ten minutes',
    body: 'Passport and visa details, bank details, the towns and the kind of work. It is the only form you fill in. Leave anything that does not apply and we will ask.',
  },
  {
    n: '03',
    title: 'We open your ATO record',
    body: 'Every employer who reported you, every income statement, every dollar withheld, and any earlier year still open. Forgotten jobs and weeks taxed at the top rate surface here, not in what you remember.',
  },
  {
    n: '04',
    title: 'The judgements that move the number',
    body: 'Residency for the year, the weeks withheld before your tax file number arrived, whether the Medicare levy was ever yours to pay, and what your line of work can claim. This is the slow part, and the part you are paying for.',
  },
  {
    n: '05',
    title: 'You read it and sign',
    body: 'We send you the finished return with each figure explained, and nothing goes to the ATO until you have read it and signed the declaration. Signing is electronic, so it works from a phone in another hemisphere.',
  },
  {
    n: '06',
    title: 'It is lodged',
    body: 'Reviewed and signed off by a registered tax agent before it is lodged with the ATO. Lodgement itself takes minutes.',
  },
  {
    n: '07',
    title: 'The ATO pays',
    body: 'Refunds usually land about 14 business days after lodgement, into the Australian account you gave us. If the ATO queries something, we answer it and tell you what was asked.',
  },
]

/** Two rules that change the order of operations, so they belong before step 01. */
/**
 * Where a working holiday refund comes from (Oct 2026). This page ranked around
 * 30 for "working holiday tax return" with nothing on it that explained why a
 * refund exists at all, which is the question the query carries. Every item is a
 * mechanism already stated elsewhere on the site; no amount is promised. The one
 * range sentence in the lede is the owner-approved wording.
 */
const REFUND_SOURCES = [
  {
    "label": "Weeks taxed at 45% before your TFN arrived",
    "body": "Without your tax file number on file, and without a declaration recording that your application is in progress, your employer must withhold 45% instead of 15%. Every payslip in that gap was over-withheld, and it only comes back on a lodged return."
  },
  {
    "label": "A second job without its own declaration",
    "body": "Every employer needs its own Tax File Number Declaration. A second job running without one withholds at 45% for as long as nobody notices, often for months."
  },
  {
    "label": "An employer not registered for working holiday makers",
    "body": "The 15% rate needs the employer to be registered with the ATO as an employer of working holiday makers. If they were not, they had to withhold at the foreign resident rate, which starts at 30 cents in the dollar."
  },
  {
    "label": "A Medicare levy that was never yours",
    "body": "The 2% levy is applied by default. Many passports are not entitled to Medicare, and with the right certificate the levy comes off."
  },
  {
    "label": "Work expenses nobody claimed",
    "body": "Shoes, uniforms, tools, licences and travel between sites can reduce your taxable income where they relate to the work you did. At the 15% rate, every $100 of genuine deductions takes $15 off the tax."
  },
  {
    "label": "Your passport and your residency",
    "body": "Depending on your passport and how your year looked, a court ruling may change the rates that apply to you. Whether it does is part of our review."
  }
]

const RULES = [
  {
    label: 'The refund can only go to an Australian account',
    body: 'Superannuation (DASP) can be paid to an overseas account. A tax refund cannot. If you are about to close your Australian bank account, wait until the refund has landed, or tell us first.',
  },
  {
    label: 'Earlier years are still claimable',
    body: 'A financial year you never lodged for does not expire quietly. Each year is its own return and its own refund, and we work through them oldest first.',
  },
]

// Answers past about 55 words carry a blank line, and the FAQ below renders one
// <p> per paragraph. faqLd still uses the raw string, so the schema is unchanged.
const FAQS = [
  {
    question: 'How long does a working holiday tax return take?',
    answer:
      'From the day your questionnaire is in, a straightforward year takes a few days to prepare and check, and the ATO usually pays the refund about 14 business days after lodgement.\n\nFive employers, income invoiced under an ABN, or a residency position that has to be argued takes longer at our end, and we tell you which yours is.',
  },
  {
    question: 'When is a working holiday tax return due?',
    answer:
      'If you lodge it yourself, 31 October after the financial year ends, so a 2025-26 return was due 31 October 2026, which has now passed. A year past its deadline is late rather than lost, and it can still be lodged.',
  },
  {
    question: 'Do you need my payslips?',
    answer:
      'No. Every employer who paid you through a payroll reported an income statement to the ATO, and that record is what a return is built from. Lost payslips and an employer who has shut down are normal starting points.\n\nThe only paperwork worth digging out is receipts for work expenses. If you do not have those, describe the work and we will tell you what is claimable without them.',
  },
  {
    question: 'What do I actually have to do?',
    answer:
      'Three things. Answer the questionnaire once, read the return we send back, and sign it. There is no government account to set up and no ATO form to interpret, because the lodgement happens through us.',
  },
  {
    question: 'Can you lodge for me after I have already left Australia?',
    answer:
      'Yes, and many of the returns we lodge belong to people already home in the UK, Germany or Japan. The questionnaire, the signature and the lodgement are all online.\n\nThe refund itself does not travel: the ATO can only pay it into an Australian bank account, while superannuation (DASP) can be paid overseas. If your Australian account is already closed, tell us in the first message.',
  },
  {
    question: 'What if I never lodged for an earlier year?',
    answer:
      'It can still be lodged now. Each financial year stands on its own, with its own return and its own refund, and the ATO record shows which years are still open.\n\nIn most working holiday years the balance is owed to you rather than by you.',
  },
  {
    question: 'What happens if the return says I owe money instead?',
    answer:
      'Occasionally it does, most often where income was invoiced under an ABN and nothing was withheld.\n\nYou see that figure before anything is lodged, with an explanation of where it came from and what the ATO payment options are. Nothing is sent without your signature.',
  },
]

const GUIDES = [
  {
    href: '/blog/how-to-lodge-tax-return-from-overseas',
    title: 'Lodging after you have left',
    desc: 'What still works from home, and the bank account rule that catches people out.',
  },
  {
    href: '/blog/tax-residency-working-holiday-makers',
    title: 'Are you a resident for tax purposes',
    desc: 'Why step 04 cannot be settled from a checklist.',
  },
  {
    href: '/blog/tax-deductions-working-holiday-makers',
    title: 'What you can claim',
    desc: 'Deductions by the kind of work you did, rather than a generic list.',
  },
]

const WA_TR = waUrl({ topic: 'tax-return', lang: 'en' })

export default function TaxReturnPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/tax-return#webpage`,
    url: `${SITE_URL}/tax-return`,
    name: 'Lodge Your Working Holiday Tax Return',
    description:
      'How an Australian tax return is lodged for a 417 or 462 working holiday visa holder: what we ask you for, what we check, how you sign it, and when the refund arrives.',
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/tax-return#service`,
    name: 'Working Holiday Tax Return Lodgement',
    serviceType: 'Tax return preparation and lodgement',
    description:
      'Australian tax returns for holders of 417 and 462 working holiday visas. Reviewed and signed off by a registered tax agent before lodgement with the ATO, including from overseas.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 and 462)' },
    availableLanguage: ['en', 'de', 'ja'],
    inLanguage: 'en-AU',
  }

  // The seven steps, published as a machine readable procedure. This is the
  // page's own schema type: the homepage does not claim a HowTo.
  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}/tax-return#howto`,
    name: 'How a working holiday tax return is lodged',
    description:
      'The order a 417 or 462 tax return is prepared and lodged in, from the first message to the refund arriving.',
    inLanguage: 'en-AU',
    totalTime: 'P14D',
    step: SEQUENCE.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
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
      { '@type': 'ListItem', position: 2, name: 'Tax Return', item: `${SITE_URL}/tax-return` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className={blocks.underHeader}>
        <Crumb home="Home" current="Tax return" label="Breadcrumb" href="/" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>Working holiday tax return&nbsp;&middot; 417 &amp; 462 visas</span>
              Your details and where to deposit your refund. <Mark>We take it from there.</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>No payslips, no myGov account, no form to decipher. One questionnaire, one signature, and the refund usually follows about 14 business days after lodgement.</Lead>
          </div>
          <WaButton href={WA_TR} position="hero" topic="tax-return" lang="en">Message us on WhatsApp</WaButton>
          <p className={heroStyles.note}>Replies in about an hour.</p>
          <GoogleRating variant="pill" lang="en" />
        </Hero>
      </div>

      <PhotoFrame page="tax-return" locale="en" />

      <Section tone="pale" eyebrow="Where a refund comes from" title="Why working holiday makers are often owed a tax refund" titleId="refund-title">
        <p className={`${blocks.text} ${blocks.muted}`}>A refund is not a bonus for being a backpacker. It is the gap between what your employers withheld and what you actually owed, and on a working holiday year that gap usually comes from the places below. Refunds for our clients range from a few hundred dollars to several thousand, depending on which of them applied.</p>
        <div className={blocks.cards}>
          {REFUND_SOURCES.map((r) => (
            <div key={r.label} className={blocks.card}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
        <p className={`${blocks.text} ${blocks.muted}`}>
          None of these is automatic and none is assumed. Each one is checked against your ATO record before anything is lodged.{' '}
          <Link href="/calculator" className={blocks.textLink}>See an indicative estimate in the calculator</Link>.
        </p>
      </Section>

      <Section eyebrow="Your side of it" title="What we need from you" titleId="needed-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Three things, and that is the list.</p>
        <PlainRows items={NEEDED} />
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>You do not need payslips.</p>
          <p className={blocks.text}>Every employer who put you on a payroll has already reported an income statement against your tax file number, and that is what a return is built from. Receipts for work expenses are the one thing worth looking for, and if there are none, tell us what the work involved instead.</p>
        </div>
      </Section>

      <Section id="how-it-works" tone="pale" eyebrow="Start to finish" title="The order it happens in" titleId="sequence-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Seven steps. You appear in two of them, at the start and again to sign.</p>
        <Steps items={SEQUENCE} />
        <p className={`${blocks.text} ${blocks.muted}`}>
          More on step 04:{' '}
          <Link href="/abn" className={blocks.textLink}>what an ABN changes</Link>if any of your income was invoiced rather than paid through a payroll.
        </p>
      </Section>

      <Section title="Two rules change the order you do this in" titleId="rules-title">
        <div className={blocks.cards}>
          {RULES.map((r) => (
            <div key={r.label} className={`${blocks.palePanel} ${blocks.stack}`}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="amber" title="Our guarantee" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Our guarantee: if your tax refund is less than our fee, we refund the difference after your Notice of Assessment. If there is no refund, or you owe money to the ATO instead, the full fee applies.
        </p>
        <p className={blocks.text}>Nothing is ever taken out of what the ATO sends you. The amount is settled with you on WhatsApp before step 01.</p>
      </Section>

      <Section tone="pale" title="Working holiday tax is the only thing we do." titleId="trust-title">
        <p className={blocks.text}>The questionnaire, the checks and the order above were built around one visa year and nothing else. Reviewed and signed off by a registered tax agent before it is lodged with the ATO.</p>
        <GoogleReviewsServer lang="en" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Nobody legitimate will ask you for your myGov password.</strong>{' '}
          We never ask for it, because the lodgement route above does not use it. If a message asks for those details, it did not come from us.
        </p>
      </Section>

      <Section title="What people ask before they send anything" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Guides" title="The longer version of the hard steps" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="What is next" title="Do not leave your super behind" titleId="next-title">
        <p className={blocks.text}>Your employer paid superannuation on top of your wages while you worked here. When you leave Australia for good it can be claimed, separately from the return.</p>
        <LinkButton href="/superannuation">How the super claim works →</LinkButton>
      </Section>

      <Section tone="forest" title="Start with a message, not a form" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Send the towns you worked in, roughly which months, and whether you ever invoiced under an ABN. That is enough to say which years are open and what your side looks like. Two years since you flew home makes no difference.</p>
        <WaButton href={WA_TR} position="section" topic="tax-return" lang="en" tone="light">Message us on WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Replies in about an hour.</p>
      </Section>

      <MobileCta href={WA_TR} lang="en" topic="tax-return" />
    </>
  )
}
