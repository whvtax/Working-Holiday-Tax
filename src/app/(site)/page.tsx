import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL, EMAIL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { WaLink } from './HomeWa'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { ImageSlot } from '@/components/wht/ImageSlot'
import { Compare, Figures, LinkRows, Steps, blocks } from '@/components/wht/Blocks'

// ─── METADATA ───────────────────────────────────────────────────────────
// The head terms stay, because they rank. The description changes to match
// what the page now actually says. No price, in the title, the description or
// the schema.
export const metadata: Metadata = {
  title: 'Working Holiday Tax Refund Australia | WHV & Backpacker Tax',
  description:
    'Working holiday tax returns for 417 and 462 visa holders. Residency, the weeks withheld at the wrong rate, Medicare and deductions, settled before lodging.',
  keywords: [
    'working holiday tax refund',
    'working holiday tax refund Australia',
    'WHV tax refund Australia',
    'backpacker tax refund Australia',
    'Australian tax refund working holiday',
    'tax refund 417 visa',
    'tax refund 462 visa',
    'claim tax back Australia backpacker',
    'working holiday tax return',
    'WHV tax return',
    'working holiday visa tax Australia',
    'working holiday maker tax refund',
    'Australian tax return for backpackers',
    'tax refund after leaving Australia',
    'lodge tax return from overseas Australia',
    'tax residency working holiday maker',
    'Addy non discrimination article Australia',
    'TFN application working holiday',
    'DASP super refund Australia',
    'ABN registration backpacker',
    'Medicare levy exemption backpacker',
    'working holiday tax refund UK backpacker',
    'tax refund Australia German backpacker',
    'tax refund Australia Japanese working holiday',
  ],
  authors: [{ name: 'Working Holiday Tax' }],
  creator: 'Working Holiday Tax',
  publisher: 'Working Holiday Tax',
  category: 'Tax Services',
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-AU': SITE_URL,
      'de': `${SITE_URL}/de`,
      'ja': `${SITE_URL}/ja`,
      ...newLocaleLanguages('/'),
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: 'Working Holiday Tax',
    title: 'Working Holiday Tax Refund Australia | WHV & Backpacker Tax',
    description:
      'Anyone can press submit. The work happens before that. Residency, every employer, the Medicare exemption and the deductions for the work you actually did, on every 417 and 462 return.',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia - tax returns for backpackers on 417 and 462 visas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Working Holiday Tax Refund Australia | WHV Tax Return',
    description: 'Working holiday tax returns for 417 and 462 visa holders. Residency, Medicare, deductions and every employer, worked through before anything is lodged.',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true, follow: true,
    googleBot: {
      index: true, follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** Approved 22 Aug. Do not reword. */
const FIGURES = [
  {
    figure: '45%',
    body: 'Withheld at the top rate in the weeks before your employer had your TFN. It only comes back when claimed.',
  },
  {
    figure: '$18,200',
    body: 'Your residency position. It is assessed case by case on the facts of your year, and it can change the rates that apply.',
  },
  {
    figure: '2%',
    body: 'A Medicare levy you may not have owed. Removable with a certificate almost nobody applies for.',
  },
]

/** The product. Five steps, in the order they actually happen. */
const ANALYSIS = [
  {
    n: '01',
    title: 'Your residency position',
    body: 'Most people tick a box and move on. Residency is a judgement, the one the High Court ruled on in the Addy case, and its effect differs from person to person.',
  },
  {
    n: '02',
    title: 'Every employer, and every week',
    body: 'A working holiday year is messy: several employers, late pay, a job forgotten by March. We rebuild it against your ATO record, not memory.',
  },
  {
    n: '03',
    title: 'Medicare, if it applies to you',
    body: 'Two percent comes off by default, whether you owed it or not. Knowing when it was never yours, and getting it removed, is our job.',
  },
  {
    n: '04',
    title: 'Deductions for the work you actually did',
    body: 'A fruit picker, a barista and a delivery rider do not claim the same things. We ask what your work involved, then claim what belongs to it.',
  },
  {
    n: '05',
    title: 'Then it is lodged',
    // "before it reaches the ATO" was a near miss of the approved sentence.
    // Normalised onto the exact wording, which is the form used everywhere else.
    body: 'Reviewed and signed off by a registered tax agent before it is lodged with the ATO. The four steps above decide the number.',
  },
]

/** Approved 22 Aug. Verbatim, including the fourth row about access and effort. */
const COMPARISON = [
  { mygov: 'One rate is assumed from your first dollar',                     us: 'We review which rates apply to you, case by case' },
  { mygov: 'Nothing mentions the Medicare exemption',      us: 'We help with the application if you qualify' },
  { mygov: 'Deductions are a blank box',                   us: 'We know what your line of work can claim' },
  { mygov: 'You need an account, an active phone number',        us: 'You need nothing. We deal with the ATO' },
]

const SERVICES = [
  { n: '01', href: '/tfn',           title: 'TFN Application',  desc: 'Get one before your first payslip and skip the top rate.' },
  { n: '02', href: '/abn',           title: 'ABN Registration', desc: 'Invoice as a sole trader, with the tax side explained first.' },
  { n: '03', href: '/tax-return',    title: 'Tax Return',       desc: 'The full analysis above, then lodgement with the ATO.' },
  { n: '04', href: '/superannuation',title: 'Super Withdrawal', desc: 'Every fund found, then one DASP claim when you leave.' },
  { n: '05', href: '/medicare',      title: 'Medicare Levy',    desc: 'The exemption certificate, if your year qualifies for one.' },
]

const GUIDES = [
  { href: '/blog/diy-tax-return-vs-tax-agent-working-holiday', title: 'Doing it yourself or using an agent', desc: 'What each one actually costs you.' },
  { href: '/blog/tax-residency-working-holiday-makers',        title: 'Tax residency and working holiday makers',  desc: 'Why it is looked at case by case, and who decides.' },
  { href: '/blog/medicare-levy-working-holiday-makers',        title: 'The Medicare levy exemption',          desc: 'Who owes the two percent, who does not, and how it comes off.' },
  { href: '/blog/tax-deductions-working-holiday-makers',       title: 'What you can claim',                   desc: 'Deductions by the kind of work, not a generic list.' },
]

const FAQS = [
  {
    question: 'What decides how much I get back from an Australian working holiday tax return?',
    answer: 'Four things: your tax residency position for the year, whether any pay was withheld at 45% before your employer had your tax file number, whether the 2% Medicare levy came off when you were not entitled to it, and the deductions that belong to the work you did.\n\nTwo people who earned the same amount can end up with very different refunds because of those four.',
  },
  {
    question: 'Can I just lodge my own tax return on myGov?',
    answer: 'You can. Lodging is the easy part. What the screen will not tell you is your residency position, whether an employer withheld at the wrong rate, whether the Medicare levy should have come off at all, or what your line of work can claim. Those four judgements decide the number.',
  },
  {
    question: 'How much do your services cost?',
    answer: 'Our fees are flat and never a percentage of your refund.\n\nWe confirm the fee on WhatsApp before anything begins, and it is paid up front. Then we send the full questionnaire and start work. Our guarantee: if your tax refund is less than our fee, we refund the difference after your Notice of Assessment. If there is no refund, or you owe money to the ATO instead, the full fee applies.',
  },
  {
    question: 'What tax rate do working holiday makers pay in Australia?',
    answer: 'Where working holiday maker rates apply, they are 15% on the first $45,000, then 30% up to $135,000, 37% up to $190,000, and 45% above that.\n\nWhich rates apply to you depends on the facts of your year and is for the ATO to decide. If you never gave your employer a tax file number, they must withhold at the top rate instead, one of the most common reasons a backpacker ends up owed money.',
  },
  {
    question: 'Can you help me claim my tax refund after I have already left Australia?',
    answer: 'Yes. People from the UK, Germany, Japan and elsewhere lodge their Australian tax return and claim their super (DASP) long after flying home, all of it online.\n\nOne rule before you close your account: the ATO can only pay a tax refund into an Australian bank account, while a super refund (DASP) can be paid overseas. If yours is already closed, tell us early, because it changes the order we work in.',
  },
  {
    question: 'How quickly will you reply?',
    answer: 'Monday to Friday, 9am to 6pm, we usually reply within an hour. Outside those hours, the next morning. Ask a question first without committing to anything, and we reply in your own language.',
  },
  {
    question: 'Do you only handle tax returns?',
    answer: 'No. We also handle TFN applications, ABN registrations, super withdrawal (DASP) and Medicare levy exemption certificates, which covers what a 417 or 462 visa holder normally needs.',
  },
]

const WA_TAX_RETURN = waUrl({ topic: 'tax-return', lang: 'en' })

export default async function HomePage() {

  // ─── Schema.org ───
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: 'Working Holiday Tax Refund Australia | WHV Tax Return',
    description: 'Working holiday tax returns for 417 and 462 visa holders. Residency, every employer, the Medicare levy exemption and work related deductions, worked through before lodgement.',
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    primaryImageOfPage: `${SITE_URL}/og-image.png`,
  }

  // The business is one Organization (@id /#business), declared in the root
  // layout's graph. This block re-declared the same @id as a LocalBusiness,
  // which handed search engines two different types for one entity. It held
  // no data the graph lacks (its rating was removed on 28 Aug), so it is gone.
  const aggregateRatingLd = null as Record<string, unknown> | null

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'en-AU',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#business`,
    name: 'Working Holiday Tax',
    url: SITE_URL,
    email: EMAIL,
    description: 'Working holiday tax is the only thing we do. Tax returns, TFN applications, super refunds (DASP), ABN registrations and Medicare levy exemptions for working holiday makers on 417 and 462 visas in Australia.',
    areaServed: { '@type': 'Country', name: 'Australia' },
    knowsLanguage: ['en', 'de', 'ja'],
    knowsAbout: [
      'Working holiday maker taxation',
      'Tax residency for working holiday makers',
      'Non discrimination articles in Australian tax treaties',
      'Tax File Number (TFN)',
      'Australian Business Number (ABN)',
      'Departing Australia Superannuation Payment (DASP)',
      'Medicare levy exemption',
      'Work related deductions',
    ],
    sameAs: [
      'https://www.instagram.com/workingholidaytax',
      'https://www.tiktok.com/@workingholidaytax',
    ],
  }

  const professionalServiceLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#professionalservice`,
    name: 'Working Holiday Tax',
    url: SITE_URL,
    telephone: '+61424513998',
    image: `${SITE_URL}/og-image.png`,
    description: 'Tax returns prepared for working holiday makers on 417 and 462 visas, then reviewed and signed off by a registered tax agent before lodgement with the ATO.',
    areaServed: { '@type': 'Country', name: 'Australia' },
    serviceType: ['Tax return preparation', 'TFN application', 'ABN registration', 'Superannuation refund (DASP)', 'Medicare levy exemption'],
    provider: { '@id': `${SITE_URL}/#business` },
    audience: {
      '@type': 'Audience',
      audienceType: 'Working Holiday Maker (Subclass 417 and 462)',
      geographicArea: { '@type': 'Country', name: 'Australia' },
    },
    availableLanguage: ['en', 'de', 'ja'],
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    ],
  }

  const webSiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Working Holiday Tax',
    description: 'Working holiday tax returns for 417 and 462 visa holders in Australia.',
    inLanguage: ['en-AU', 'de', 'ja'],
    publisher: { '@id': `${SITE_URL}/#business` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      {aggregateRatingLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />


      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      {/* SEO (Oct 2026): the kicker sits inside the H1 so the heading carries the
          query words people type. */}
      <div className={blocks.underHeader}>
      <Hero
        title={
          <>
            <span className={blocks.kicker}>Working holiday tax returns&nbsp;&middot; 417 &amp; 462 visas</span>
            Anyone can press submit. The work happens <Mark>before that.</Mark>
          </>
        }
        media={<ImageSlot id="IMG-W01" className={heroStyles.media} subject="Backpacker on a working holiday in Australia, at work on a farm or in a cafe" alt="A backpacker on a working holiday at work in Australia" tone="a" priority />}
      >
        {/* This read "Five things decide your refund", which contradicted the
            section two screens below asking what decides the size of a refund
            and answering "three things". The count is not the point, and the
            three figures block is approved copy, so the count comes out here. */}
        <Lead>The outcome of your return is decided before anything is submitted, and none of it is automatic.</Lead>
        <WaButton href={WA_TAX_RETURN} position="hero" topic="tax-return" lang="en">Message us on WhatsApp</WaButton>
        <p className={heroStyles.note}>Replies in about an hour.</p>
        <GoogleRating variant="pill" lang="en" />
      </Hero>
      </div>

      {/* ── 2. THE MYGOV COMPARISON ──────────────────────────────────────── */}
      <Section eyebrow="The question everyone asks" title="myGov accepts a wrong return as readily as a right one." titleId="mygov-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Nothing on the screen checks your residency position, whether the levy was yours, or what your line of
          work can claim.
        </p>
        {/* The two labels print once, on the first row. The copy is unchanged. */}
        <Compare rows={COMPARISON.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="On myGov" rightLabel="With us" />
        <p className={blocks.statement}>
          You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly.
        </p>
        <div className={blocks.stack}>
          <WaButton href={WA_TAX_RETURN} position="section" topic="tax-return" lang="en" size="md">Message us on WhatsApp</WaButton>
          <p className={blocks.small}>Replies in about an hour.</p>
        </div>
      </Section>

      {/* ── 3. THE THREE FIGURES ─────────────────────────────────────────── */}
      <Section tone="pale" width="wide" title="What decides the size of a working holiday tax refund?" titleId="figures-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Three things, most of the time, plus the deductions that belong to your work.</p>
        <Figures items={FIGURES} />
      </Section>

      {/* ── 4. WHAT THE FEE COVERS (the one key promise, amber band) ─────── */}
      <Section tone="amber" title="Our guarantee" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Our guarantee: if your tax refund is less than our fee, we refund the difference after your Notice of Assessment. If there is no refund, or you owe money to the ATO instead, the full fee applies.
        </p>
        <p className={blocks.text}>The fee is flat and never a percentage of what comes back.</p>
      </Section>

      {/* ── 5. WHAT WE GO THROUGH ON EVERY RETURN ────────────────────────── */}
      <Section id="how-it-works" eyebrow="The work" title="What we go through on every return" titleId="analysis-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Four of the five happen before anything is entered into the return.</p>
        <Steps items={ANALYSIS} />
      </Section>

      {/* ── 6. TFN OR TFN AND ABN ────────────────────────────────────────── */}
      <Section tone="pale" title="Which of these two was your year?" titleId="year-title">
        <p className={`${blocks.text} ${blocks.muted}`}>It changes what your return has to say. Pick the one that matches.</p>
        <div className={blocks.cards}>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>TFN only</h3>
            <p className={blocks.text}>Every job paid you through a payroll, with tax off each payslip.</p>
            <WaButton href={waUrl({ topic: 'tax-return', lang: 'en', tier: 'tfn' })} position="inline" topic="tax-return" lang="en" tier="tfn" size="md" fill>This was me</WaButton>
          </div>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>TFN and ABN</h3>
            <p className={blocks.text}>Part of your income was invoiced against an ABN, with nothing withheld.</p>
            <WaButton href={waUrl({ topic: 'abn', lang: 'en', tier: 'tfn-abn' })} position="inline" topic="abn" lang="en" tier="tfn-abn" size="md" fill>This was me</WaButton>
          </div>
        </div>
        <p className={blocks.small}>
          Not sure which one you were?{' '}
          <WaLink href={waUrl({ topic: 'general', lang: 'en', tier: 'unsure' })} position="inline" topic="general" lang="en" tier="unsure" className={blocks.textLink}>
            Tell us what the work looked like
          </WaLink>
        </p>
      </Section>

      {/* ── 7. WHAT WE HELP WITH ─────────────────────────────────────────── */}
      <Section eyebrow="What we help with" title="From your first payslip to the money that follows you home" titleId="services-title">
        <LinkRows items={[
          ...SERVICES.map(s => ({ href: s.href, eyebrow: s.n, title: s.title, desc: s.desc, cta: 'Learn more →' })),
          {
            href: '/uk-working-holiday-tax',
            eyebrow: 'Where you are from can change the picture',
            title: 'UK passport holders',
            desc: 'Three years instead of one, Medicare access other backpackers do not get, and an Addy ruling whose effect varies from person to person.',
            cta: 'Read more →',
          },
        ]} />
      </Section>

      <ImageSlot id="IMG-W02" subject="Backpackers on a working holiday, a wide Australian scene (farm, beach town or city street)" alt="Backpackers on a working holiday in Australia" tone="b" className={blocks.band} />

      {/* ── 8. TRUST ─────────────────────────────────────────────────────── */}
      <Section tone="pale" title="Working holiday tax is the only thing we do." titleId="trust-title">
        <p className={blocks.text}>
          Every return we prepare is for someone on a 417 or 462 visa, reviewed and signed off by a registered tax
          agent before being lodged with the ATO.
        </p>
        <GoogleReviewsServer lang="en" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>A tax agent will never ask for your myGov login details.</strong>{' '}
          Anyone who asks for them is not us.
        </p>
      </Section>

      {/* ── 9. FAQ ───────────────────────────────────────────────────────── */}
      <Section title="Questions people ask before they message us" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
        <p className={blocks.small}>
          Something not answered here?{' '}
          <Link href="/contact" className={blocks.textLink}>Get in touch</Link>
        </p>
      </Section>

      {/* ── 10. GUIDES ───────────────────────────────────────────────────── */}
      <Section tone="pale" eyebrow="Guides" title="Read the whole answer first, if you would rather" titleId="guides-title">
        <p className={`${blocks.text} ${blocks.muted}`}>The background to each topic, before you decide anything.</p>
        <LinkRows items={GUIDES} />
        <p>
          <Link href="/blog" className={blocks.textLink}>All guides →</Link>
        </p>
      </Section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <Section tone="forest" title="Tell us about your year" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          Where you worked, roughly when, and whether you ever invoiced under an ABN. That is enough to tell you where
          you stand.
        </p>
        <WaButton href={WA_TAX_RETURN} position="footer" topic="tax-return" lang="en" tone="light">Message us on WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Replies in about an hour.</p>
      </Section>

      <MobileCta href={WA_TAX_RETURN} lang="en" topic="tax-return" />
    </>
  )
}
