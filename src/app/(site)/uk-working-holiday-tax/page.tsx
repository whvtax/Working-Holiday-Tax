import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { MobileCta } from '@/components/ui/MobileCta'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { PagePhoto } from '@/components/wht/PagePhoto'
import { Compare, LinkRows, blocks } from '@/components/wht/Blocks'
import { Crumbs, Differences, NumberList, RateTable, countryStyles } from '@/components/wht/CountryBlocks'

export const metadata: Metadata = {
  title: 'Australian Tax Refund: UK Backpackers',
  description:
    'Gone home to the UK with Australian tax years open. A court ruling known as Addy may change which rates apply to some passports, and none of it needs you here.',
  keywords: [
    'australian tax back for brits',
    'claim australian tax from the uk',
    'uk working holiday visa australia tax',
    'british backpacker tax refund australia',
    'addy v commissioner of taxation',
    'do uk citizens pay the medicare levy in australia',
    'reciprocal health care agreement australia uk',
    'lodge australian tax return from overseas',
    'superannuation refund uk working holiday',
    'australian tax year vs uk tax year',
    'working holiday visa age 35 uk',
    'late australian tax return from uk',
  ],
  alternates: {
    canonical: '/uk-working-holiday-tax',
    languages: { 'en': '/uk-working-holiday-tax', 'en-AU': '/uk-working-holiday-tax', 'x-default': '/uk-working-holiday-tax' },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Australian tax for UK working holiday makers' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/uk-working-holiday-tax`,
    siteName: 'Working Holiday Tax',
    title: 'Australian Tax Refund: UK Backpackers',
    description:
      'The Addy ruling may change which rates apply to some passports, and the Medicare levy can work the other way round for Brits. You never have to log into myGov.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Australian Tax Refund: UK Backpackers',
    description:
      'The Addy ruling may change which rates apply to some passports, and the Medicare levy can work the other way round for Brits.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WA = waUrl({ topic: 'uk', lang: 'en', detail: 'I am back in the UK' })

const CRUMBS = [
  { name: 'Home', item: '/' },
  { name: 'UK working holiday tax', item: '/uk-working-holiday-tax' },
]

const RATE_ROWS = [
  ['0 to $45,000', '15c for each $1'],
  ['$45,001 to $135,000', '$6,750 plus 30c for each $1 over $45,000'],
  ['$135,001 to $190,000', '$33,750 plus 37c for each $1 over $135,000'],
  ['$190,001 and over', '$54,100 plus 45c for each $1 over $190,000'],
]

const DIFFERENCES = [
  {
    t: 'Three years, not one',
    d: 'For applications lodged on or after 1 July 2024, UK passport holders can apply up to and including age 35, and can be granted up to three working holiday visas without completing any specified regional work. Three years usually means three or four Australian tax years.',
  },
  {
    t: 'The Addy ruling may matter',
    d: 'The Addy case was brought by a British working holiday maker, and the ruling may change which rates apply to some passports. Whether it applies to you depends on the individual facts of your year and is assessed case by case, and that is part of our review.',
  },
  {
    t: 'Medicare runs the other way round',
    d: 'Many guides tell working holiday makers they are exempt from the 2 per cent Medicare levy. For a British traveller the answer can be different, because of the Reciprocal Health Care Agreement between the UK and Australia.',
  },
  {
    t: 'Two tax years that never line up',
    d: 'The UK year runs 6 April to 5 April and the Australian year runs 1 July to 30 June. Arriving in February or leaving in September leaves an Australian year open that most people never think about again.',
  },
]

const WHAT_WE_DO = [
  'Work out which Australian tax years you have open, including the ones you left behind when you flew home.',
  'Review each of those years, including the Addy ruling and what it may mean for your rates.',
  'Check the Medicare levy against your real position rather than copying the exemption other backpackers claim.',
  'Chase down every employer income statement, including the ones you have forgotten, and check what each withheld.',
  'Find superannuation left in funds you no longer have the logins for, and claim it as a Departing Australia Superannuation Payment once your visa has ceased.',
]

/**
 * The objection every lead arrives holding, answered for a British reader.
 *
 * It is a different objection here. From Manchester the problem is not that
 * lodging is hard, it is that the door is shut: linking the ATO wants Australian
 * identity documents nobody keeps. And the thing worth the most on a British
 * return, the Addy question, is not mentioned anywhere on the screen.
 */
const MYGOV = [
  {
    mygov: 'From Britain you often cannot get in at all, because linking the ATO wants Australian identity documents you no longer have.',
    us: 'We deal with the ATO directly. Nothing on our side needs you to hold an Australian ID.',
  },
  {
    mygov: 'Nothing there mentions the Addy ruling, which may change which rates apply to some passports.',
    us: 'That is part of our review, and it is looked at properly before anything is lodged.',
  },
  {
    mygov: 'The Medicare levy is applied by default, and for Brits the health care agreement works the opposite way round.',
    us: 'We review where you stand on it before the return goes in.',
  },
  {
    mygov: 'The years you left open do not appear as a prompt anywhere.',
    us: 'Leaving Australia does not close a year. We go back through the ones nobody lodged and look at what is still open.',
  },
]

const FAQS = [
  {
    question: 'What is the Addy ruling and does it affect UK working holiday makers?',
    answer:
      'Addy is a 2021 High Court decision about how working holiday makers can be taxed. A court ruling may change which rates apply to some passports. Whether it applies to you depends on the individual facts of your year and is assessed case by case, and that is part of our review.',
  },
  {
    question: 'Do UK citizens pay the Medicare levy in Australia?',
    answer:
      'Often yes. The UK has a Reciprocal Health Care Agreement with Australia, so a UK passport holder can enrol in Medicare, and that entitlement is what removes the 2 per cent exemption other working holiday makers claim. The answer also depends on your residency position, so it is checked case by case.',
  },
  {
    question: 'I stayed three years. Do I need to lodge three tax returns?',
    answer:
      'Yes. The Australian tax year runs 1 July to 30 June, so a three year stay usually spans three or four separate tax years, each needing its own return. The most common pattern we see is somebody who lodged in their first year and then stopped, and those later years are often the ones with the most income to report.',
  },
  {
    question: 'How much superannuation is there to claim?',
    answer:
      'Your employer paid 12 per cent of your ordinary earnings into a superannuation fund on top of your wages, usually spread across more than one fund over a long stay. Once you have left and your visa has ceased it is claimed as a Departing Australia Superannuation Payment, with 65 per cent withheld, so roughly a third of the balance reaches you.',
  },
  {
    question: 'Is there a deadline, and am I already late?',
    answer:
      'A year past its deadline is late rather than lost. Late returns can still be lodged, and being late does not by itself reduce what the year is worth.',
  },
  {
    question: 'Do I have to tell HMRC about my Australian income?',
    answer:
      'It depends on your UK residence position for the years involved, which is a separate question with its own rules. We deal with the Australian side and will say plainly where something belongs to a UK adviser.',
  },
]

const GUIDES = [
  {
    href: '/blog/how-to-lodge-tax-return-from-overseas',
    label: 'Lodging an Australian tax return from overseas',
    desc: 'What changes once you have left, and what does not.',
  },
  {
    href: '/blog/tax-residency-working-holiday-makers',
    label: 'Tax residency for working holiday makers',
    desc: 'Why it is a judgement, and why it is worth having checked.',
  },
  {
    href: '/blog/uk-medicare-reciprocal-agreement-australia',
    label: 'The UK Medicare agreement with Australia',
    desc: 'Why British travellers are treated differently on the levy.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: CRUMBS.map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: b.name,
    item: `${SITE_URL}${b.item === '/' ? '' : b.item}`,
  })),
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/uk-working-holiday-tax#service`,
  name: 'Australian Tax Service for UK Working Holiday Makers',
  serviceType: 'Australian tax returns, superannuation claims and Medicare levy treatment for UK passport holders, handled from the UK',
  description:
    'Australian tax returns, DASP superannuation claims and Medicare levy treatment for British working holiday makers, including multi year stays and years left unlodged after returning to the UK.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'UK passport holders who worked in Australia on a working holiday visa' },
  inLanguage: 'en-AU',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/uk-working-holiday-tax#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/uk-working-holiday-tax`,
}

/* Tokens kept local so this page does not depend on shared CSS being finished. */

export default function UKWorkingHolidayTaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <div className={blocks.underHeader}>
        <Crumbs items={CRUMBS} />
        <Hero eyebrow="British passport holders" title={<>You have gone home. <Mark>Your Australian tax has not.</Mark></>}>
          <div className="hero-sub"><Lead>Years you left open, a residency position that has to be reviewed, and super that becomes claimable the moment you leave.</Lead></div>
          <WaButton href={WA} position="hero" topic="uk" lang="en">Message us on WhatsApp</WaButton>
          <p className={heroStyles.note}>Replies in about an hour. Tell us the years you worked and we will tell you where you stand.</p>
          <GoogleRating variant="pill" lang="en" />
        </Hero>
      </div>

      <PagePhoto page="uk-working-holiday-tax" locale="en" />

      <Section eyebrow="Doing it yourself" title={<>The residency position decides a British return. <Mark>myGov has no field for it.</Mark></>} titleId="mygov-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Four things on a British file are settled somewhere other than the form.</p>
        <Compare rows={MYGOV.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="On myGov" rightLabel="With us" />
        <p className={blocks.statement}>You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly.</p>
      </Section>

      <Section tone="pale" title="Can you still claim Australian tax back from the UK?" titleId="direct-answer-title">
        <p className={blocks.text}>
          Yes. An Australian tax return can be prepared and lodged from anywhere, and leaving does not close a year.
          The superannuation half can only be claimed after you have left and your visa has ceased, so being
          home is a requirement rather than an obstacle.
        </p>
      </Section>

      <Section title="What is different about a British passport?" titleId="differences-title">
        <p className={blocks.text}>Four things about a UK passport change the answer.</p>
        <Differences items={DIFFERENCES} />
      </Section>

      <Section tone="pale" title="Do UK citizens pay the Medicare levy in Australia?" titleId="medicare-title">
        <p className={blocks.text}>
          Often yes, and this is the one place where copying standard backpacker advice costs a British traveller rather than
          saves them. The UK has a Reciprocal Health Care Agreement with Australia, so a British visitor can enrol in Medicare
          and is treated in a public hospital.
        </p>
        <p className={blocks.text}>
          Being entitled to Medicare is what removes the 2 per cent exemption other working holiday makers claim, and claiming an
          exemption you are not entitled to is not a small paperwork error.
        </p>
        <p className={blocks.text}>
          Your residency position is part of what decides it, and it is assessed case by case. More on how the levy works
          on our{' '}
          <Link href="/medicare" className={countryStyles.inlineLink}>Medicare page</Link>.
        </p>
      </Section>

      <Section title="What tax rate applies to a working holiday maker?" titleId="rates-title">
        <p className={blocks.text}>Which rates apply to your Australian wages depends on the facts of your year, and a court ruling known as Addy may matter for some people. The ATO makes the final decision, and it is part of our review.</p>
        <RateTable caption="Working holiday maker rates 2025-26" rows={RATE_ROWS} />
        <p className={blocks.text}>
          Your employer had to be registered with the ATO as an employer of working holiday makers for the 15 per cent rate to
          apply. If not, they had to withhold at the foreign resident rate, which starts at 30 cents in the dollar from your
          first dollar.
        </p>
        <p className={blocks.text}>
          That is only settled on a lodged return, and any refund is paid only into an Australian bank account. Full breakdown on our{' '}
          <Link href="/tax-return" className={countryStyles.inlineLink}>tax return page</Link>.
        </p>
      </Section>

      <Section tone="pale" title="What happens to your superannuation once you are home?" titleId="super-title">
        <p className={blocks.text}>
          It stays with the fund. Your employer paid 12 per cent of your ordinary earnings into a superannuation fund on top of your wages,
          never out of them, from your first dollar and with no minimum monthly amount. Since 1 July 2026 it also has to be paid
          with every pay run and reach the fund within seven business days, so an employer skipping it shows up in weeks rather
          than after a quarter.
        </p>
        <p className={blocks.text}>
          After a long stay and several jobs you will usually have more than one fund account, each charging fees against a
          balance you are not watching. Once you have left and your visa has ceased it is claimed as a Departing Australia
          Superannuation Payment, with 65 per cent withheld, so roughly a third of the balance reaches your account.
        </p>
        <p className={blocks.text}>
          There is no deadline on the claim, and the five year limit you may have read about does not exist. More on our{' '}
          <Link href="/superannuation" className={countryStyles.inlineLink}>superannuation page</Link>.
        </p>
      </Section>

      <Section title="Are you late, and does it matter?" titleId="deadlines-title">
        <p className={blocks.text}>
          Australian returns can be lodged from 1 July. The date for a self lodged 2025-26 return was 31 October 2026 and has
          now passed. A late return can still be lodged: the year is late rather than lost.
        </p>
      </Section>

      <Section tone="pale" title="What we do with a British file" titleId="what-we-do-title">
        <p className={blocks.text}>Anyone can press submit. The work happens before that, and on a British file it is the two questions nobody else asks: which years are open, and which residency position is true for each.</p>
        <NumberList items={WHAT_WE_DO} />
        <p className={blocks.text}>None of that asks anything of you beyond the years you worked and what you can still lay hands on.</p>
      </Section>

      <Section title="Questions British travellers ask" titleId="faq-title">
        <Accordion items={FAQS.map(f => ({ question: f.question, answer: f.answer }))} />
      </Section>

      <Section tone="pale" title="Worth reading next" titleId="guides-title">
        <LinkRows items={GUIDES.map(g => ({ href: g.href, title: g.label, desc: g.desc }))} />
        <p className={blocks.small}>This is general information, not personal tax advice, and nothing here is advice on your UK tax position. Residency for Australian tax purposes depends on your own circumstances in each year, which is why British files are looked at individually.</p>
      </Section>

      <Section tone="forest" title="Tell us about your year" titleId="cta-title">
        <p className={`${blocks.statement} ${blocks.onForest}`}>Our guarantee: if your tax refund is less than our fee, we refund the difference after your Notice of Assessment. If there is no refund, or you owe money to the ATO instead, the full fee applies. The guarantee covers returns with TFN income only.</p>
        <p className={`${blocks.text} ${blocks.onForest}`}>Working holiday tax is the only thing we do. Your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO.</p>
        <WaButton href={WA} position="section" topic="uk" lang="en" tone="light">Message us on WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Replies in about an hour.</p>
      </Section>

      <MobileCta href={WA} lang="en" topic="uk" />
    </>
  )
}
