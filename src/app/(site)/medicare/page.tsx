import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { Compare, blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, TitleLinks, coreBlocks } from '@/components/wht/CoreBlocks'

/*
 * The best performing service page on the site, so this is a tightening rather
 * than a rebuild. What it owns is the exemption certificate: the levy comes off
 * by default, an agreement country removes the entitlement to claim it back,
 * and the exemption itself needs a statement almost nobody applies for. That is
 * the determinant, and it now leads the page.
 */

const WA = waUrl({ topic: 'medicare', lang: 'en' })

export const metadata: Metadata = {
  title: { absolute: 'Medicare levy exemption on a working holiday visa (417, 462)' },
  description:
    'Most 417 and 462 holders are not entitled to Medicare, so the 2% levy may not be owed, yet it applies by default. Who is exempt, and the statement needed.',
  keywords: [
    'Medicare levy exemption working holiday',
    'Medicare levy exemption backpacker',
    'Medicare levy exemption 417 visa',
    'Medicare levy exemption 462 visa',
    'Medicare levy exemption certificate',
    'Medicare Entitlement Statement working holiday',
    'do working holiday makers pay Medicare levy',
    'RHCA Australia',
    'Reciprocal Health Care Agreement working holiday',
    'Medicare 417 visa',
    'Medicare 462 visa',
    'Medicare exemption German backpacker',
    'Medicare exemption Japanese working holiday',
    'Medicare exemption UK backpacker',
  ],
  alternates: {
    canonical: '/medicare',
    languages: {
      'en': '/medicare', 'en-AU': '/medicare',
      'de': '/de/medicare',
      'ja': '/ja/medicare',
      ...newLocaleLanguages('/medicare'),
      'x-default': '/medicare',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-medicare.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/medicare`,
    siteName: 'Working Holiday Tax',
    title: 'Medicare Levy Exemption for 417 and 462 Visa Holders',
    description: 'The 2% levy comes off by default. Who is exempt, and the certificate the exemption needs.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-medicare.png`],
    card: 'summary_large_image',
    title: 'Medicare Levy Exemption for Working Holiday Visa Holders',
    description: 'The 2% levy comes off by default. Who is exempt, and what the exemption needs.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

/**
 * The objection every lead arrives holding, answered about the levy.
 *
 * Not a copy of the homepage table. Every row is about this 2%: it is applied
 * by default, what decides it is the passport rather than the visa, and taking
 * it off needs a certificate applied for somewhere else entirely. No row here
 * criticises myGov. Lodging is not the part that goes wrong.
 */
const MYGOV = [
  {
    mygov: 'The levy is added when the return is assessed, so the first sign of it is a refund that came back smaller.',
    us: 'We settle that question before the return goes in, not after the assessment lands.',
  },
  {
    mygov: 'Nothing on the screen explains what decides whether it applies to you.',
    us: 'Whether you were entitled to Medicare is the question, and the first one we look at.',
  },
  {
    mygov: 'Taking the levy off needs a Medicare Entitlement Statement from Services Australia, applied for separately and not through the return.',
    us: 'We help you apply for the statement, wait for it, and ensure the exemption is claimed for the correct year.',
  },
  {
    mygov: 'The exemption box is there whether you hold the statement or not.',
    us: 'We only claim it with the evidence behind it, which is what the claim rests on if it is queried.',
  },
]

// Answers past about 55 words carry a blank line, and the FAQ below renders one
// <p> per paragraph. faqSchema still uses the raw string, so the structured data
// is unchanged.
const faqs = [
  {
    question: 'How much is the Medicare levy exemption actually worth?',
    answer:
      'The levy is 2% of taxable income, so about $1,000 on $50,000. It is charged only if you are an Australian resident for tax purposes, and not at all below the low-income threshold. It is settled when your return is assessed, not taken out of your wages week by week, so any exemption is dealt with in the return.',
  },
  {
    question: 'Does every 417 or 462 visa holder get the exemption?',
    answer:
      'Not always. The deciding factor is whether you were entitled to Medicare, not your visa. Some countries have a reciprocal health care agreement with Australia, and entitlement to Medicare removes the exemption.\n\nWhether it applies to you depends on your individual circumstances and is for the ATO to decide. Our team reviews it as part of preparing your return.',
  },
  {
    question: 'What is a Medicare Entitlement Statement and do you need one?',
    answer:
      'A Medicare Entitlement Statement is a document from Services Australia confirming you were not entitled to Medicare for a stated period. It is the evidence behind the exemption and the ATO can ask to see it, so we deal with it as part of your return.',
  },
  {
    question: 'Can you claim the exemption for only part of the year?',
    answer:
      'Yes, and for a lot of working holiday makers that is the right answer. It is worked out in days, so if you arrived in November, only the days you were not entitled to Medicare are exempt.\n\nClaiming a full year when part of it applies is the kind of error that gets a return amended later.',
  },
  {
    question: 'Does travel insurance or private health cover change any of this?',
    answer:
      'No. The levy is a question about entitlement to the public system, not about whether you are insured, so travel insurance and private hospital cover have no bearing on it.\n\nPrivate cover matters for a different charge, the Medicare levy surcharge, which applies at high incomes and is rarely relevant on a working holiday.',
  },
  {
    question: 'What happens if the levy was already taken during the year?',
    answer:
      'The levy is calculated when your return is assessed, not when you are paid, so what came out of your wages was tax withheld generally, not the levy specifically. A valid exemption takes it out of the assessment.\n\nIf an earlier year was lodged without the exemption and you were entitled to it, that return can usually be amended.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'en-AU',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}` },
    { '@type': 'ListItem', position: 2, name: 'Medicare', item: `${SITE_URL}/medicare` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/medicare#service`,
  name: 'Medicare levy exemption service for working holiday makers',
  serviceType: 'Medicare levy exemption claim',
  description:
    'Medicare levy exemption handled as part of a working holiday tax return, including the Medicare Entitlement Statement, for 417 and 462 visa holders not entitled to Medicare.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (subclass 417 / 462) not entitled to Medicare' },
  inLanguage: 'en-AU',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/medicare#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/medicare`,
}

const GUIDES = [
  { href: '/blog/medicare-levy-working-holiday-makers', label: 'The Medicare levy exemption for working holiday makers' },
  { href: '/blog/countries-with-medicare-agreement-australia', label: 'Which countries have a health care agreement with Australia' },
  { href: '/blog/what-is-medicare-working-holiday-makers', label: 'What Medicare is, and who is actually covered' },
  { href: '/blog/uk-medicare-reciprocal-agreement-australia', label: 'The UK agreement, and what it means for your return' },
  { href: '/blog/private-health-insurance-working-holiday-australia', label: 'Does private health cover change the levy?' },
  { href: '/uk-working-holiday-tax', label: 'UK passport holders: how the levy works for you' },
]

export default function MedicarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO. The determinant is the agreement country, not the task. ─── */}
      <div className={blocks.underHeader}>
        <Crumb home="Home" current="Medicare" />
        <Hero
          eyebrow="Medicare levy"
          title={<>A 2% levy you <Mark>may not have owed</Mark></>}
        >
          <div className="hero-sub">
            <Lead>Entitlement to Medicare decides it, not your visa. Removable with a certificate almost nobody applies for.</Lead>
          </div>
          <div className={coreBlocks.actions}>
            <WaButton href={WA} position="hero" topic="medicare" lang="en">Check where you stand</WaButton>
            <a href="#who-is-exempt" className={coreBlocks.hint}>Who is exempt</a>
          </div>
          <p className={heroStyles.note}>Replies in about an hour.</p>
        </Hero>
      </div>

      <PhotoFrame page="medicare" locale="en" />

      {/* ── THE OBJECTION, ANSWERED ABOUT THE LEVY ─────────────────────────── */}
      <Section
        eyebrow="Doing it yourself"
        title={<>Nobody asks whether the levy was ever yours. myGov applies it and <Mark>moves on.</Mark></>}
        titleId="objection-title"
      >
        <p className={`${blocks.text} ${blocks.muted}`}>
          It is 2% of taxable income, about $1,000 on a $50,000 year. It never appears on a payslip.
        </p>
        <Compare rows={MYGOV.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="On myGov" rightLabel="With us" />
        <p className={blocks.statement}>
          You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly.
        </p>
      </Section>

      {/* ── WHAT GOES WRONG ALONE ──────────────────────────────────────────── */}
      <Section tone="pale" title="Why is the levy on your assessment at all?" titleId="why-title">
        <p className={blocks.text}>
          Because it is the default. It comes off unless an exemption is claimed, and nothing asks
          whether you were entitled to Medicare, so the common outcome is 2% of a year's income paid
          towards a system you could never use.
        </p>
        <p className={blocks.text}>
          The quieter mistake is the opposite: the exemption ticked without the statement that backs
          it. That evidence is a Medicare Entitlement Statement from Services Australia, a separate
          agency to the ATO, and a claim made without it cannot be supported if it is queried.
        </p>
      </Section>

      {/* ── THE DETERMINANT ────────────────────────────────────────────────── */}
      <Section id="who-is-exempt" title="Who is exempt from the Medicare levy?" titleId="exempt-title">
        <p className={blocks.text}>
          Whether the levy applies depends on whether you were entitled to Medicare, and for how much
          of the year. That depends on your individual circumstances and is for the ATO to decide.
        </p>
        <p className={blocks.text}>
          Holders of a passport from a country with a Reciprocal Health Care Agreement with Australia
          (the United Kingdom, Ireland, the Netherlands, Belgium, Finland, Norway, Sweden, Slovenia and
          New Zealand, and with more limited cover Italy and Malta) are generally entitled to Medicare,
          so the exemption is generally not available to them, or only for part of the year. Germany,
          Japan, France, Spain, Canada, Austria and most other working holiday countries have no such
          agreement, so their passport holders are generally not entitled to Medicare, and the
          exemption may be available with a Medicare Entitlement Statement. The levy only arises at
          all if you are an Australian resident for tax purposes.
        </p>
        <p className={blocks.text}>
          The test is entitlement, not use, so it can matter even if you never enrolled. Our team
          reviews it as part of preparing your return, and a registered tax agent signs off.
        </p>
        <div className={blocks.cards}>
          <div className={`${blocks.palePanel} ${blocks.stack}`}>
            <h3 className={blocks.cardTitle}>Entitled to Medicare</h3>
            <p className={blocks.text}>
              The levy may apply. We make sure it is applied correctly, and check whether any part of
              the year was different.
            </p>
          </div>
          <div className={`${blocks.palePanel} ${blocks.stack}`}>
            <h3 className={blocks.cardTitle}>Not entitled to Medicare</h3>
            <p className={blocks.text}>
              The exemption may be available. It has to be supported by the right evidence, and we
              handle that as part of your return.
            </p>
            <p className={blocks.small}>The exemption is counted in days, not as a single yes or no for the year.</p>
          </div>
        </div>
      </Section>

      {/* ── WHAT WE DO (the one key promise, amber band) ───────────────────── */}
      <Section tone="amber" title="What do we do about it?" titleId="do-title">
        <p className={blocks.text}>We work out whether you were entitled to Medicare and for which part of the year.</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Our guarantee: if your tax refund is less than our fee, we refund the difference after your Notice of Assessment. If there is no refund, or you owe money to the ATO instead, the full fee applies. The guarantee covers returns with TFN income only.
        </p>
        <p className={blocks.text}>Reviewed and signed off by a registered tax agent before it is lodged with the ATO.</p>
        <div className={blocks.stack}>
          <WaButton href={WA} position="section" topic="medicare" lang="en" size="md">Message us on WhatsApp</WaButton>
          <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Replies in about an hour.</p>
        </div>
      </Section>

      {/* ── VIDEO. Kept, it earns its place on the best performing page. ──── */}
      <Section tone="pale" title="The exemption in two minutes" titleId="video-title">
        <div className={coreBlocks.video}>
          <div className="block sm:hidden" style={{ aspectRatio: '9/16', maxWidth: '360px', margin: '0 auto' }}>
            <iframe loading="lazy"
              src="https://www.youtube-nocookie.com/embed/oj7ZSOHAxJk"
              title="Medicare levy exemption explained"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
          <div className="hidden sm:block" style={{ aspectRatio: '16/9', maxWidth: '720px', margin: '0 auto' }}>
            <iframe loading="lazy"
              src="https://www.youtube-nocookie.com/embed/oj7ZSOHAxJk"
              title="Medicare levy exemption explained"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
        </div>
      </Section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <Section title="Common questions about the levy and the exemption" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqSchema above uses the raw string. */}
        <Accordion items={faqs} />
      </Section>

      {/* ── RELATED GUIDES ─────────────────────────────────────────────────── */}
      <Section tone="pale" title="Go deeper on Medicare and health cover" titleId="guides-title">
        <TitleLinks items={GUIDES} />
      </Section>

      <Section eyebrow="What is next" title="The exemption is one line of a return, not the whole of it" titleId="next-title">
        <p className={blocks.text}>Your residency position and your deductions matter too. All three are worked out together.</p>
        <LinkButton href="/tax-return">How the return is prepared</LinkButton>
      </Section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <Section tone="forest" title="Check where you stand" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Entitlement to Medicare decides it, not your visa.</p>
        <WaButton href={WA} position="footer" topic="medicare" lang="en" tone="light">Message us on WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Replies in about an hour.</p>
      </Section>

      <MobileCta href={WA} lang="en" topic="medicare" />
    </>
  )
}
