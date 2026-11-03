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
import { Figures, LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { Crumbs, PhotoBand, tb } from '@/components/wht/TfnAbnBlocks'

// ─── METADATA ───────────────────────────────────────────────────────────
// The head terms stay, because they rank. What changes is what the page
// claims: this page owns the cost of the gap between starting work and the
// TFN reaching the employer. No price in the title, the description or the
// schema, and no first person claim to being a registered tax agent.
export const metadata: Metadata = {
  // The root layout appends " | Working Holiday Tax", so the base title is kept
  // short enough that the whole thing still fits a mobile SERP.
  title: 'Working Holiday TFN: Avoid 45% Tax',
  description:
    'The TFN itself is free. What costs money is every payslip that lands before your employer has it, withheld at 45% instead of 15%.',
  keywords: [
    'TFN application Australia',
    'TFN application working holiday',
    'working holiday TFN',
    'Tax File Number Australia working holiday',
    'Tax File Number 417 visa',
    'Tax File Number 462 visa',
    'apply for TFN backpacker',
    'get TFN Australia',
    'how to apply for TFN Australia',
    'TFN for WHV',
    'TFN for working holiday tax refund',
    'TFN Australia processing time',
    'no TFN 45 percent tax Australia',
    'TFN 28 day rule Australia',
    'TFN application rejected working holiday',
    'register for TFN Australia backpacker',
  ],
  alternates: {
    canonical: '/tfn',
    languages: {
      'en': '/tfn', 'en-AU': '/tfn',
      de: '/de/tfn',
      ja: '/ja/tfn',
      ...newLocaleLanguages('/tfn'),
      'x-default': '/tfn',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tfn.png`, width: 1200, height: 630, alt: 'TFN application for working holiday makers in Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/tfn`,
    siteName: 'Working Holiday Tax',
    title: 'TFN for a Working Holiday Visa: Avoid the 45% Weeks',
    description:
      'The number is free. The weeks without it are not. We prepare and lodge the TFN application so it goes through first time, on a 417 or 462 visa.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tfn.png`],
    card: 'summary_large_image',
    title: 'TFN for a Working Holiday Visa: Avoid the 45% Weeks',
    description: 'The number is free. The weeks before your employer has it are not.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** The three places a working holiday TFN application actually fails. */
const FAILURE_POINTS = [
  {
    n: '01',
    title: 'The name on the form is not the name immigration holds',
    body: 'The ATO matches your application against your visa record. A missing middle name, a renewed passport or names in a different order can send it back.',
  },
  {
    n: '02',
    title: 'The address will not be holding your post in four weeks',
    body: 'Your TFN arrives as a letter to an Australian address, and issuing can take up to 28 days. If you have moved on, nobody forwards it.',
  },
  {
    n: '03',
    title: 'It was lodged before the visa was active',
    body: 'You apply once you are in Australia on an activated visa, not before you fly. Applications lodged too early go nowhere, and you find out weeks later at 45%.',
  },
]

/** What the service does about the gap. Nothing here is a promise about timing. */
const WHAT_WE_DO = [
  {
    title: 'We check your visa is active first',
    body: 'A one minute question that stops the most common wasted month.',
  },
  {
    title: 'We match your details to your immigration record',
    body: 'Passport, name order, date of birth and visa grant, checked against each other before lodging.',
  },
  {
    title: 'We work out the address problem with you',
    body: 'Where you will be in four weeks, and what to do if the answer is a farm or a van.',
  },
  {
    title: 'We chase it if it stalls',
    body: 'The ATO has 28 days. Past that, someone has to ring them, and it will not be you.',
  },
  {
    title: 'We tell your employer what to do in the meantime',
    body: 'A TFN application reference number, quoted correctly, keeps the first pay runs off the top rate.',
  },
  {
    title: 'We cover the gap in your tax return',
    body: 'Anything already withheld at 45% is settled through a tax return, and only if the return says so.',
  },
]

// Answers past about 55 words carry a blank line, and the FAQ below renders one
// <p> per paragraph. faqLd still uses the raw string, so the schema is unchanged.
const FAQS = [
  {
    question: 'Can I just apply for a TFN myself?',
    answer:
      'You can, and the application is a short free form.\n\nWhat we charge for is the work around it: matching your details to the record immigration holds, picking an address still receiving post in four weeks, and giving your employer the reference number so the first pay runs are not withheld at 45%.',
  },
  {
    question: 'The TFN application is free on the ATO website. What am I paying for?',
    answer:
      'The number itself is free. What costs money is the gap: every pay run before your employer has the number is withheld at 45% instead of 15%. We charge for closing that gap, and for getting back what has already gone.',
  },
  {
    question: 'What actually happens if I start work without a TFN?',
    answer:
      'Your employer must withhold at 45% instead of the 15% working holiday maker rate until you give them a tax file number, and you have 28 days from starting the job. On a $25 an hour job that is roughly $7.50 an hour going to the ATO instead of you.\n\nThat money is not simply gone, but it can only be settled through a tax return lodged correctly after the financial year ends. What comes back depends on your year, and the ATO decides.',
  },
  {
    question: 'I have already been working for weeks without a TFN. Is it too late?',
    answer:
      'No. Apply now so the top rate stops applying to future pay. The excess already withheld is dealt with when your tax return is assessed for that financial year.\n\nWe can usually have an application ready the same day you message us. Tell us how many weeks have already been paid at 45%, because it changes what your return needs to say.',
  },
  {
    question: 'How long does a TFN take to arrive?',
    answer:
      'The ATO states it processes TFN applications within 28 days, and most working holiday makers have theirs inside two to four weeks. It arrives as a letter to the Australian address on the application. While you wait, your employer needs the application reference number.',
  },
  {
    question: 'Can I apply for a TFN before I arrive in Australia?',
    answer:
      'Not on a working holiday visa. You apply once you are in Australia with your 417 or 462 visa activated, because the application is matched against your arrival and visa record. You also need an Australian postal address for the letter.',
  },
  {
    question: 'Do I need a new TFN for a second year visa?',
    answer:
      'No. A tax file number is issued once and stays with you for life, across a second or third working holiday visa, a change of visa class, and any gap where you left Australia.\n\nIf you have lost the number rather than never had one, that is a different and faster problem, so tell us which it is.',
  },
]

const GUIDES = [
  {
    href: '/blog/what-happens-without-your-tfn',
    title: 'What happens if you work without a TFN',
    desc: 'The 45% withholding, the 28 day window, and how it is settled afterwards.',
  },
  {
    href: '/blog/tfn-reference-number-before-tfn-arrives',
    title: 'The application reference number',
    desc: 'What to give your employer while you wait on the letter.',
  },
  {
    href: '/blog/how-long-does-it-take-to-get-a-tfn',
    title: 'How long a TFN takes',
    desc: 'What the ATO commits to, what usually happens, and when to chase it.',
  },
]

// The myGov comparison table that used to sit here was removed: every row of it
// was already made by the WHAT_WE_DO cards below. The one line worth keeping,
// the "you will never log into myGov" promise, moved to the end of that section.

const WA_TFN = waUrl({ topic: 'tfn', lang: 'en' })

export default function TFNPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/tfn#webpage`,
    url: `${SITE_URL}/tfn`,
    name: 'TFN for a Working Holiday Visa',
    description:
      'What it costs to work before your tax file number reaches your employer, why working holiday TFN applications fail, and how the excess withheld is settled.',
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/tfn#service`,
    name: 'TFN Application for Working Holiday Makers',
    serviceType: 'Tax File Number application',
    description:
      'Tax file number applications prepared and lodged for holders of 417 and 462 working holiday visas, including the reference number for the employer and follow up with the ATO.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 and 462)' },
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
      { '@type': 'ListItem', position: 2, name: 'TFN Application', item: `${SITE_URL}/tfn` },
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
        <Crumbs homeHref="/" home="Home" current="TFN" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>TFN application&nbsp;&middot; working holiday visas 417 &amp; 462</span>
            The number is free.<br />
            The weeks <Mark>without it</Mark> are not.
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              Until your employer has the number, 45% of your pay is withheld instead of 15%.
            </Lead>
          </div>
          <WaButton href={WA_TFN} position="hero" topic="tfn" lang="en">Message us on WhatsApp</WaButton>
          <p className={heroStyles.note}>Replies in about an hour.</p>
          <GoogleRating variant="pill" lang="en" />
        </Hero>
        <PhotoBand page="tfn" locale="en" />
      </div>

      <Section width="wide" title="What does it cost to start work before your TFN arrives?" titleId="gap-title">
        <p className={blocks.text}>
          If your employer does not have your TFN within 28 days, they must withhold 45% instead of the 15% Working
            Holiday Maker rate. The extra tax is settled when your tax return is assessed after 30 June, and the outcome depends on your year.
        </p>
        <Figures
          items={[
            { figure: '45%', body: 'Withheld from every dollar while no TFN is on file, instead of fifteen.' },
            { figure: '28 days', body: 'To give your employer your TFN, and for the ATO to issue it.' },
            { figure: '1 return', body: 'The only route back for anything already withheld at the wrong rate.' },
          ]}
        />
      </Section>

      <Section tone="pale" eyebrow="Doing it yourself" title="Why do working holiday TFN applications fail?" titleId="fail-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          The form is short. Each of the three ways it goes wrong can mean another month taxed at 45%.
        </p>
        <Steps items={FAILURE_POINTS} />
      </Section>

      <Section eyebrow="The work" title="What we do about it" titleId="work-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          You send us your details on WhatsApp. Everything below happens on our side.
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
          Already have the number and want the weeks at 45% looked at?{' '}
            <Link href="/tax-return" className={tb.inlineLink}>That is the tax return</Link>.
        </p>
      </Section>

      {/* The one amber band: the guarantee. */}
      <Section tone="amber" title="Our guarantee" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Our guarantee: if your tax refund is less than our fee, we refund the difference after your Notice of Assessment. If there is no refund, or you owe money to the ATO instead, the full fee applies.
        </p>
        <p className={blocks.text}>The fee is flat and never a percentage of what comes back.</p>
      </Section>

      <Section tone="pale" title="Working holiday tax is the only thing we do." titleId="trust-title">
        <p className={blocks.text}>
          Every TFN application we lodge belongs to somebody on a 417 or 462 visa. Returns are reviewed and signed
            off by a registered tax agent before they are lodged with the ATO.
        </p>
        <GoogleReviewsServer lang="en" />
      </Section>

      <Section title="TFN questions people ask before they message us" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Guides" title="More on the TFN and the 45% weeks" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="What is next" title="The weeks at 45% are settled through a return" titleId="next-title">
        <p className={blocks.text}>Once the number is on file, the tax return is where the excess is dealt with.</p>
        <div className={blocks.stack}>
          <LinkButton href="/tax-return" size="md">How the return works →</LinkButton>
        </div>
      </Section>

      {/* Closing CTA, forest band. */}
      <Section tone="forest" title="Tell us where you are up to" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          Whether you have landed, whether you have started a job, and whether anything has already been paid at
            45%. Three answers and we can tell you what to do next.
        </p>
        <WaButton href={WA_TFN} position="section" topic="tfn" lang="en" tone="light">Message us on WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Replies in about an hour.</p>
      </Section>

      <MobileCta href={WA_TFN} lang="en" topic="tfn" />
    </>
  )
}
