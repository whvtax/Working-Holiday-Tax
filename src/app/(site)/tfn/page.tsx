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
  title: { absolute: 'How to apply for a TFN on a working holiday visa' },
  description:
    'A TFN is free from the ATO, and on a 417 or 462 visa you apply once you are in Australia. Until your employer has it, 45% is withheld instead of 15%.',
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
      'The number is free. The weeks without it are not. We prepare the TFN application with you so it goes through first time, on a 417 or 462 visa.',
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
    title: 'It was sent before you were in Australia',
    body: 'The online application is for people located in Australia with a work rights visa linked to their passport. Apply before you fly and it does not go through, and you find out weeks later at 45%.',
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
    body: 'Passport, name order, date of birth and visa grant, checked against each other before anything goes to the ATO.',
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

// Every answer is a single paragraph under 50 words. faqLd maps FAQS, so the
// FAQPage schema is always identical to the visible accordion.
const FAQS = [
  {
    question: 'How do I apply for a TFN on a working holiday visa?',
    answer:
      'Once you are in Australia on a 417 or 462 visa, apply online on the ATO website. It is free and you do not send documents. Use your passport details exactly and an Australian address that will still get your post. The ATO says it should arrive within 28 days.',
  },
  {
    question: 'Can I apply for a TFN myself, and is it free?',
    answer:
      'Yes to both. The ATO application is free. What we do is the work around it: checking your details match your visa record, choosing an address that will still receive the letter, and making sure your employer keeps you off the 45% rate while you wait.',
  },
  {
    question: 'Can I apply for a TFN before I arrive in Australia?',
    answer:
      'Not on a working holiday visa. The ATO online application is for work rights visa holders who are located in Australia. Have your passport and an Australian postal address ready, and apply after you land.',
  },
  {
    question: 'How long does a TFN take to arrive?',
    answer:
      'The ATO says you should receive your TFN within 28 days of it receiving a complete application. It comes as a letter to the Australian postal address on your application. Applying a second time during those 28 days can delay it.',
  },
  {
    question: 'Can I start work before my TFN arrives?',
    answer:
      'Yes. Tell your employer on your TFN declaration that you have applied, and they withhold at the normal rate for 28 days. After that, without your TFN, they must withhold 45% instead of 15%. On $25 an hour that is about $7.50 an hour more.',
  },
  {
    question: 'What if my TFN has not arrived after 28 days?',
    answer:
      'Do not apply again. Call the ATO on 13 28 61, or +61 2 6216 1111 from overseas, with your receipt ID and passport. They can tell you where it stands and update a wrong address. Tell your employer it is running late.',
  },
  {
    question: 'What documents do I need for a TFN?',
    answer:
      'For the online application, none to send. The ATO checks your details against your visa, which must be linked to your passport. What matters is that your name, date of birth and passport number match your visa record exactly.',
  },
  {
    question: 'I have already been working for weeks without a TFN. Is it too late?',
    answer:
      'No. Apply now so the 45% rate stops on future pay. Anything already withheld at 45% is dealt with in your tax return for that financial year, and what comes back depends on your year. Tell us how many weeks were paid at 45%.',
  },
  {
    question: 'Do I need a new TFN for a second or third working holiday visa?',
    answer:
      'No. A tax file number is issued once and stays with you for life, across a second or third working holiday visa, a change of visa and any time spent outside Australia. If you have lost it, that is a lookup, not a new application.',
  },
  {
    question: 'Do I need an ABN as well as a TFN?',
    answer:
      'Only if you also work as a contractor or sole trader. A TFN covers employment, where your employer withholds tax for you. An ABN covers contract work, where nothing is withheld for you. You can hold both at the same time.',
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
  {
    href: '/blog/tfn-application-delayed',
    title: 'TFN delayed past 28 days',
    desc: 'The three things to check before you call the ATO, and why a second application makes it worse.',
  },
  {
    href: '/blog/tfn-australian-address-no-fixed-address',
    title: 'No fixed address',
    desc: 'Which addresses work for the letter when you are in a hostel, on a farm or in a van.',
  },
  {
    href: '/blog/apply-for-tfn-before-arriving',
    title: 'Applying before you land',
    desc: 'Why it has to wait until you arrive, and what to have ready so it goes in on day one.',
  },
]

/** Where the reader goes once the letter has arrived. */
const AFTER_TFN = [
  {
    href: '/tax-return',
    title: 'Your tax return',
    desc: 'Anything withheld at 45% before your employer had the number is only settled through a return after 30 June.',
  },
  {
    href: '/abn',
    title: 'An ABN, if you also contract',
    desc: 'Delivery, cleaning and some construction work is paid on an ABN, not a TFN. You can hold both.',
  },
  {
    href: '/superannuation',
    title: 'Your super when you leave',
    desc: 'Your employer pays super on top of your wages. After you leave Australia it is claimed back as a DASP.',
  },
]

const ATO_TFN_APPLY =
  'https://www.ato.gov.au/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application'
const ATO_TFN_PAYER = 'https://www.ato.gov.au/forms-and-instructions/tfn-declaration/payer-information-and-obligations'
const ATO_CONTACT = 'https://www.ato.gov.au/contact'

/** The four steps of the free ATO application, in the ATO's own conditions. */
const HOW_TO_APPLY = [
  {
    n: '01',
    title: 'Be in Australia with your visa linked to your passport',
    body: 'The online application is for people with a work rights visa who are located in Australia. Subclass 417 and 462 visas both qualify. You do not send any documents.',
  },
  {
    n: '02',
    title: 'Fill in the ATO online application',
    body: 'Enter your details exactly as they appear on your passport and visa record, and an Australian postal address that will still receive your post in four weeks.',
  },
  {
    n: '03',
    title: 'Keep your receipt ID and tell your employer you have applied',
    body: 'Tick the box on your TFN declaration saying you have applied. Your employer can then withhold at the normal rate for 28 days instead of 45%.',
  },
  {
    n: '04',
    title: 'Wait for the letter, and do not apply twice',
    body: 'The ATO says your TFN should arrive within 28 days. A second application in that time can delay it. If 28 days pass, contact the ATO with your receipt ID.',
  },
]

/** Who can use the online application. */
const WHO_CAN_APPLY = [
  { who: 'On a 417 or 462 visa and in Australia', answer: 'Yes, online and free.' },
  { who: 'Visa granted but not yet in Australia', answer: 'Not yet. Apply once you have arrived.' },
  { who: 'New Zealand citizen', answer: 'Yes, once in Australia. New Zealanders are granted a work rights visa on arrival.' },
  { who: 'Visa with a no work condition (8101, 8103 or 8116)', answer: 'Not online. The ATO paper form applies.' },
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
    name: 'How to apply for a TFN on a working holiday visa',
    description:
      'How to apply for a Tax File Number on a 417 or 462 working holiday visa, who can apply online, how long it takes, and what is withheld until your employer has it.',
    inLanguage: 'en-AU',
    dateModified: '2026-11-05',
    citation: [
      {
        '@type': 'WebPage',
        url: ATO_TFN_APPLY,
        name: 'Tax file number application for foreign passport holders, permanent migrants and temporary visitors',
      },
      { '@type': 'WebPage', url: ATO_TFN_PAYER, name: 'TFN declaration: payer information and obligations' },
    ],
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
      'Help with tax file number applications for holders of 417 and 462 working holiday visas: checking details against the visa record, choosing an address for the letter, the TFN declaration for the employer, and follow up with the ATO if it runs past 28 days.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 and 462)' },
    availableLanguage: ['en', 'de', 'ja', 'fr', 'it', 'es'],
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
              <span className={blocks.kicker}>Tax File Number (TFN) application&nbsp;&middot; working holiday visa 417 and 462</span>
            The number is free.<br />
            The weeks <Mark>without it</Mark> are not.
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              A Tax File Number (TFN) is free. On a 417 or 462 working holiday visa you apply online through the ATO once you are in Australia. The ATO says it should arrive by post within 28 days. Until your employer has your TFN, or your declaration that you have applied, 45% of your pay is withheld instead of 15%.
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
          These are the figures that decide your first pay runs on a working holiday visa, checked against ATO guidance on 5 November 2026.
        </p>
        <Figures
          items={[
            { figure: 'Free', body: 'Applying for a TFN costs nothing on the ATO website. Source: ATO.' },
            { figure: '28 days', body: 'The ATO says your TFN should arrive within 28 days of it receiving a complete application. Source: ATO.' },
            { figure: 'Day 29', body: 'Once you have declared to your employer that you have applied, they withhold at the normal rate for 28 days. From then on, without your TFN, they must withhold the top rate. Source: ATO.' },
            { figure: '45%', body: 'Withheld from a working holiday maker or foreign resident with no TFN on file, instead of 15%. Source: ATO.' },
            { figure: '15%', body: 'The working holiday maker rate on the first $45,000, from the first dollar, from 1 July 2026. Source: ATO.' },
          ]}
        />
        <p className={blocks.small}>
          The excess withheld at 45% is only settled through a{' '}
          <Link href="/tax-return" className={tb.inlineLink}>tax return</Link> after 30 June, and the outcome depends on your year.
        </p>
      </Section>

      <Section eyebrow="Doing it yourself" title="How to apply for a TFN on a working holiday visa" titleId="how-title">
        <p className={blocks.text}>
          You can do this yourself, for free, on the ATO website. It takes four steps.
        </p>
        <Steps items={HOW_TO_APPLY} />
        <p className={blocks.text}>
          Official application:{' '}
          <a href={ATO_TFN_APPLY} rel="noopener" className={tb.inlineLink}>
            ATO, Tax file number application for foreign passport holders, permanent migrants and temporary visitors
          </a>.
        </p>
        <h3 className={blocks.cardTitle}>Who can apply online</h3>
        <div className={tb.pairs}>
          {WHO_CAN_APPLY.map(r => (
            <div key={r.who} className={blocks.palePanel}>
              <p className={blocks.cardTitle}>{r.who}</p>
              <p className={blocks.text}>{r.answer}</p>
            </div>
          ))}
        </div>
        <p className={blocks.text}>
          Would you rather we handled it? Tell us whether you have landed and whether you have started work.
        </p>
        <WaButton href={WA_TFN} position="inline" topic="tfn" lang="en" size="md">Message us on WhatsApp</WaButton>
      </Section>

      <Section tone="pale" eyebrow="Where it goes wrong" title="Why do working holiday TFN applications fail?" titleId="fail-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          The form is short. Each of the three ways it goes wrong can mean more weeks taxed at 45%.
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

      <Section title="After your TFN arrives" titleId="after-title">
        <LinkRows items={AFTER_TFN} />
        <p className={blocks.small}>Keep the letter. Your TFN stays the same for life, across every visa.</p>
      </Section>

      <Section tone="pale" title="Working holiday tax is the only thing we do." titleId="trust-title">
        <p className={blocks.text}>
          Every TFN application we prepare belongs to somebody on a 417 or 462 visa. Returns are reviewed and signed
            off by a registered tax agent before they are lodged with the ATO.
        </p>
        <GoogleReviewsServer lang="en" />
      </Section>

      <Section title="TFN questions people ask before they message us" titleId="faq-title">
        {/* faqLd above is built from the same FAQS array. */}
        <Accordion items={FAQS} />
        <p className={blocks.small}>
          Sources:{' '}
          <a href={ATO_TFN_APPLY} rel="noopener" className={tb.inlineLink}>
            ATO, Tax file number application for foreign passport holders, permanent migrants and temporary visitors
          </a>{' '}
          (updated 22 June 2026);{' '}
          <a href={ATO_TFN_PAYER} rel="noopener" className={tb.inlineLink}>ATO, TFN declaration payer information</a>;{' '}
          <a href={ATO_CONTACT} rel="noopener" className={tb.inlineLink}>ATO, Contact us</a>. Checked 5 November 2026.
        </p>
      </Section>

      <Section tone="pale" eyebrow="Guides" title="More on the TFN" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="What is next" title="The weeks at 45% are settled through a return" titleId="next-title">
        <p className={blocks.text}>Once the number is on file, the tax return is where the excess is dealt with.</p>
        <div className={blocks.stack}>
          <LinkButton href="/tax-return" size="md">How the return works →</LinkButton>
        </div>
      </Section>

      {/* The one amber band: the guarantee. */}
      <Section tone="amber" title="Our guarantee" titleId="guarantee-title">
        <p className={blocks.text}>If we also handle your tax return, this applies.</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Our guarantee: if your tax refund is less than our fee, we refund the difference after your Notice of Assessment. If there is no refund, or you owe money to the ATO instead, the full fee applies. The guarantee covers returns with TFN income only.
        </p>
        <p className={blocks.text}>The fee is flat and never a percentage of what comes back.</p>
      </Section>

      {/* Closing CTA, forest band. */}
      <Section tone="forest" title="Tell us where you are up to" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          Send us three answers on WhatsApp: have you landed, have you started a job, and has anything already been
            paid at 45%? We will tell you what to do next.
        </p>
        <WaButton href={WA_TFN} position="section" topic="tfn" lang="en" tone="light">Message us on WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Replies in about an hour.</p>
      </Section>

      <MobileCta href={WA_TFN} lang="en" topic="tfn" />
    </>
  )
}
