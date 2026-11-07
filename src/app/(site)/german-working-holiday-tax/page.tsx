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
  title: 'Australian tax refund for Germans',
  description:
    'Back in Germany with Australian tax still open? A ruling known as Addy may change which rates apply to some passports, and super can be claimed from home.',
  keywords: [
    'german working holiday australia tax',
    'australian tax return from germany',
    'german backpacker tax refund australia',
    'do germans pay the medicare levy in australia',
    'medicare levy exemption germany',
    'addy decision germany working holiday',
    'claim super from germany',
    'dasp germany',
    'working holiday visa germany age 35',
    'australian tax year vs german tax year',
  ],
  alternates: {
    canonical: '/german-working-holiday-tax',
    languages: { 'en': '/german-working-holiday-tax', 'en-AU': '/german-working-holiday-tax', 'x-default': '/german-working-holiday-tax' },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Australian tax for German working holiday makers' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/german-working-holiday-tax`,
    siteName: 'Working Holiday Tax',
    title: 'Australian tax refund for Germans',
    description:
      'Whether you were entitled to Medicare, and whether a court ruling matters for your years here, depends on your own facts. All of it is handled from Germany.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Australian tax refund for Germans',
    description:
      'The Addy ruling, the Medicare levy, and super claimable from home: what may change on an Australian tax return for a German passport.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WA = waUrl({ topic: 'germany', lang: 'en', detail: 'I worked in Australia on a German passport' })

const CRUMBS = [
  { name: 'Home', item: '/' },
  { name: 'German working holiday tax', item: '/german-working-holiday-tax' },
]

const RATE_ROWS = [
  ['0 to $45,000', '15c for each $1'],
  ['$45,001 to $135,000', '$6,750 plus 30c for each $1 over $45,000'],
  ['$135,001 to $190,000', '$33,750 plus 37c for each $1 over $135,000'],
  ['$190,001 and over', '$54,100 plus 45c for each $1 over $190,000'],
]

const DIFFERENCES = [
  {
    t: 'The Medicare levy needs a closer look',
    d: 'Germany has no Reciprocal Health Care Agreement with Australia, so a German working holiday maker is generally not entitled to Medicare. That is the reverse of the British position, and it is what makes the 2 per cent levy exemption available. The exemption needs a Medicare Entitlement Statement; without one the levy stays on the return.',
  },
  {
    t: 'A court ruling may matter for German passports',
    d: 'A court ruling can change the rates that apply to some German passport holders, depending on how their years in Australia looked. Whether it applies to you is something we check in our review.',
  },
  {
    t: 'Two tax years that never line up',
    d: 'The German tax year is the calendar year and the Australian year runs 1 July to 30 June. Arriving in February or flying home in September leaves an Australian year open that most people never think about again.',
  },
  {
    t: 'Age 35 from 1 July 2026',
    d: 'Since 1 July 2026 German passport holders can apply for a working holiday visa up to and including age 35. A second or third visa still depends on specified regional work: 88 days for the second, six months for the third. More visa years usually means more Australian tax years.',
  },
]

const WHAT_WE_DO = [
  'Work out which Australian tax years you have open, including the ones you left behind when you flew home.',
  'Review each of those years, including the Addy ruling and what it may mean for your rates.',
  'Apply for the Medicare Entitlement Statement where the levy exemption is warranted, so the 2 per cent does not stay on by default.',
  'Chase down every employer income statement, including the ones you have forgotten, and check what each withheld.',
  'Find superannuation left in funds you no longer have the logins for, and claim it as a Departing Australia Superannuation Payment once your visa has ceased.',
]

const MYGOV = [
  {
    mygov: 'From Germany you often cannot get in at all, because linking the ATO wants Australian identity documents you no longer have.',
    us: 'We deal with the ATO directly. Nothing on our side needs you to hold an Australian ID.',
  },
  {
    mygov: 'The Medicare levy is applied by default, and nothing on the screen tells you whether it should come off in your case.',
    us: 'We check your entitlement and apply for the statement the exemption needs before the return goes in.',
  },
  {
    mygov: 'Nothing there mentions the Addy ruling, which may change which rates apply to some passports.',
    us: 'That is part of our review, and it is looked at properly before anything is lodged.',
  },
  {
    mygov: 'The years you left open do not appear as a prompt anywhere.',
    us: 'Leaving Australia does not close a year. We go back through the ones nobody lodged.',
  },
]

const FAQS = [
  {
    question: 'What is the Addy ruling and does it affect German working holiday makers?',
    answer:
      'Addy is a 2021 High Court decision about how working holiday makers can be taxed. A court ruling may change which rates apply to some passports. Whether it applies to you depends on the individual facts of your year and is assessed case by case, and that is part of our review.',
  },
  {
    question: 'Do Germans pay the Medicare levy in Australia?',
    answer:
      'Often not, if the exemption applies and is claimed. Germany has no Reciprocal Health Care Agreement with Australia, so German working holiday makers are generally not entitled to Medicare, and that is what makes the 2 per cent levy exemption available. It is not automatic: the exemption needs a Medicare Entitlement Statement from Services Australia, and it also depends on your residency position, which is assessed case by case.',
  },
  {
    question: 'Can my tax refund be paid into my German bank account?',
    answer:
      'No. The ATO pays a tax refund only into an Australian bank account, so keep yours open until the refund has landed or tell us at the start if it is already closed. Superannuation claimed through DASP is different and can be paid to an account overseas.',
  },
  {
    question: 'I stayed two years. Do I need to lodge two tax returns?',
    answer:
      'Usually two or three. The Australian tax year runs 1 July to 30 June, so each one you earned in needs its own return. A year you left unlodged is late rather than lost, and it can still be lodged today.',
  },
  {
    question: 'Do I have to declare my Australian income to the Finanzamt?',
    answer:
      'That depends on your German tax position for the years involved, which is a German question with its own rules. We deal with the Australian side and will say plainly where something belongs to a German Steuerberater.',
  },
  {
    question: 'Is there a deadline, and am I already late?',
    answer:
      'The date for a self lodged 2025-26 return was 31 October 2026 and has now passed. A late return can still be lodged: the year is late rather than lost.',
  },
]

const GUIDES = [
  {
    href: '/blog/german-european-health-insurance-australia-working-holiday',
    label: 'German health insurance and Medicare in Australia',
    desc: 'Why German statutory cover does not follow you, and what that means for the levy.',
  },
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
    href: '/blog/tax-return-deadline-31-october-working-holiday',
    label: 'Tax return deadline 2026',
    desc: 'The 31 October date, what this year looks like, and what happens if it has passed.',
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
  '@id': `${SITE_URL}/german-working-holiday-tax#service`,
  name: 'Australian Tax Service for German Working Holiday Makers',
  serviceType: 'Australian tax returns, superannuation claims and Medicare levy exemptions for German passport holders, handled from Germany',
  description:
    'Australian tax returns, DASP superannuation claims and Medicare levy exemptions for German working holiday makers, including years left unlodged after returning to Germany.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'German passport holders who worked in Australia on a working holiday visa' },
  inLanguage: 'en-AU',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/german-working-holiday-tax#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/german-working-holiday-tax`,
}

/* Tokens kept local so this page does not depend on shared CSS being finished. */

export default function GermanWorkingHolidayTaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <div className={blocks.underHeader}>
        <Crumbs items={CRUMBS} />
        <Hero title={<><span className={blocks.kicker}>Australian tax for German passport holders</span>You are back in Germany. <Mark>Your Australian tax is not.</Mark></>}>
          <div className="hero-sub"><Lead>Years you left open, a Medicare levy that may not have been owed, and super that becomes claimable the moment you leave.</Lead></div>
          <WaButton href={WA} position="hero" topic="germany" lang="en">Message us on WhatsApp</WaButton>
          <p className={heroStyles.note}>Replies in about an hour. Tell us the years you worked and we will tell you where you stand.</p>
          <GoogleRating variant="pill" lang="en" />
        </Hero>
      </div>

      <PagePhoto page="german-working-holiday-tax" locale="en" />

      <Section eyebrow="Doing it yourself" title={<>A German passport changes the return. <Mark>myGov does not know that.</Mark></>} titleId="mygov-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Four things on a German file are settled somewhere other than the form.</p>
        <Compare rows={MYGOV.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="On myGov" rightLabel="With us" />
        <p className={blocks.statement}>You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly.</p>
      </Section>

      <Section tone="pale" title="Can you still claim Australian tax back from Germany?" titleId="direct-answer-title">
        <p className={blocks.text}>
          Yes. An Australian tax return can be prepared and lodged from anywhere, and leaving does not close a year.
          The superannuation half can only be claimed after you have left and your visa has ceased, so being
          home is a requirement rather than an obstacle.
        </p>
      </Section>

      <Section title="What is different about a German passport?" titleId="differences-title">
        <p className={blocks.text}>Four things about a German passport change the answer.</p>
        <Differences items={DIFFERENCES} />
      </Section>

      <Section tone="pale" title="Do Germans pay the Medicare levy in Australia?" titleId="medicare-title">
        <p className={blocks.text}>
          Often not, if the exemption applies and is claimed. Germany has no Reciprocal Health Care Agreement with Australia, so a
          German working holiday maker is generally not entitled to Medicare and pays for treatment privately.
        </p>
        <p className={blocks.text}>
          Not being entitled is exactly what makes the 2 per cent levy exemption available. It is not applied for you: the
          return needs a Medicare Entitlement Statement from Services Australia, and without one the levy stays on by default.
        </p>
        <p className={blocks.text}>
          Your residency position is looked at first, case by case. More on how the levy works on our{' '}
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
          Unlike a tax refund, a DASP payment can be made to a German bank account. There is no deadline on the claim. More on our{' '}
          <Link href="/superannuation" className={countryStyles.inlineLink}>superannuation page</Link>.
        </p>
      </Section>

      <Section title="Are you late, and does it matter?" titleId="deadlines-title">
        <p className={blocks.text}>
          Australian returns can be lodged from 1 July. The date for a self lodged 2025-26 return was 31 October 2026 and has now passed. A late return can still be lodged: the year is late rather than lost. The{' '}
          <Link href="/blog/tax-return-deadline-31-october-working-holiday" className={countryStyles.inlineLink}>2026 deadline guide</Link> has the detail.
        </p>
      </Section>

      <Section tone="pale" title="What we do with a German file" titleId="what-we-do-title">
        <p className={blocks.text}>Anyone can press submit. The work happens before that, and on a German file it is the questions nobody else asks: which years are open, which residency position is true for each, and whether the levy was ever yours to pay.</p>
        <NumberList items={WHAT_WE_DO} />
        <p className={blocks.text}>None of that asks anything of you beyond the years you worked and what you can still lay hands on.</p>
      </Section>

      <Section title="Questions German travellers ask" titleId="faq-title">
        <Accordion items={FAQS.map(f => ({ question: f.question, answer: f.answer }))} />
      </Section>

      <Section tone="pale" title="Worth reading next" titleId="guides-title">
        <LinkRows items={GUIDES.map(g => ({ href: g.href, title: g.label, desc: g.desc }))} />
        <p className={blocks.small}>This is general information, not personal tax advice, and nothing here is advice on your German tax position. Residency for Australian tax purposes depends on your own circumstances in each year, which is why German files are looked at individually.</p>
      </Section>

      <Section tone="forest" title="Tell us about your year" titleId="cta-title">
        <p className={`${blocks.statement} ${blocks.onForest}`}>Our guarantee: if your tax refund is less than our fee, we refund the difference after your Notice of Assessment. If there is no refund, or you owe money to the ATO instead, the full fee applies. The guarantee covers returns with TFN income only.</p>
        <p className={`${blocks.text} ${blocks.onForest}`}>Working holiday tax is the only thing we do. Your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO.</p>
        <WaButton href={WA} position="section" topic="germany" lang="en" tone="light">Message us on WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Replies in about an hour.</p>
      </Section>

      <MobileCta href={WA} lang="en" topic="germany" />
    </>
  )
}
