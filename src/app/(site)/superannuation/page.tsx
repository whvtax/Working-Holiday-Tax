import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
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
 * The answer hub for the whole superannuation cluster.
 *
 * This page took 4,255 impressions and zero clicks at position 41. It was not
 * thin and it was not missing schema. It failed on intent: the H1 was a sales
 * line with no query language in it, and no H2 contained DASP, claim,
 * eligibility or timing. Twenty two narrow Super guides were competing with it
 * for the same words and outranking it.
 *
 * So the structure below is the fix. Every H2 is a question somebody actually
 * types, and every one is answered immediately in a complete paragraph that
 * stands on its own out of context. The sales layer sits underneath the answer
 * rather than in place of it.
 */

const WA = waUrl({ topic: 'super', lang: 'en' })

export const metadata: Metadata = {
  title: { absolute: 'Claim superannuation on a working holiday visa (DASP 2026)' },
  description:
    'Left Australia on a 417 or 462 visa? Claim your super as a DASP once your visa has ceased: who can claim, the 65% tax, documents, 28 day timing and each step.',
  keywords: [
    'claim superannuation',
    'claim superannuation australia',
    'claim super after leaving Australia',
    'superannuation working holiday visa',
    'superannuation working holiday',
    'superannuation backpacker',
    'withdraw super leaving australia',
    'departing australia superannuation payment',
    'DASP claim',
    'DASP 417 visa',
    'DASP 462 visa',
    'super refund working holiday maker',
    'how to claim super when leaving Australia',
    'super tax working holiday maker',
    'claim super back',
    'lost super Australia working holiday',
    'ATO held super working holiday',
    'DASP online application',
    'when can I claim my super',
    'DASP processing time',
  ],
  alternates: {
    canonical: '/superannuation',
    languages: {
      'en': '/superannuation', 'en-AU': '/superannuation',
      'de': '/de/superannuation',
      'ja': '/ja/superannuation',
      ...newLocaleLanguages('/superannuation'),
      'x-default': '/superannuation',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-super.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/superannuation`,
    siteName: 'Working Holiday Tax',
    title: 'Claim Your Super After Leaving Australia (DASP 2026)',
    description:
      'Who can claim a DASP, how much survives the 65% tax, what documents you need and how long it takes.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-super.png`],
    card: 'summary_large_image',
    title: 'Claim Your Super After Leaving Australia (DASP)',
    description: 'Eligibility, the 65% rate, documents, timing and multiple funds, answered.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

/* ── The jump nav. Every entry is an H2 below. ───────────────────────────── */

/**
 * The objection every lead arrives holding, answered about super specifically.
 *
 * This is now the page's only version of the argument: the two column list that
 * repeated it in section 10 has been removed, and the FAQ no longer restates it
 * either. Every row is about DASP: the portal takes one fund at a time, and only
 * the ones you can name. Nothing here says the ATO's system is bad. It does a
 * different job.
 */
const MYGOV = [
  {
    mygov: 'Every super account is its own application, and each fund pays on its own timetable.',
    us: 'We prepare each application and chase the fund that goes quiet.',
  },
  {
    mygov: 'Super already passed to the ATO is paid only to an Australian bank account or by cheque.',
    us: 'We tell you before you close your Australian account, so that money has somewhere to land.',
  },
  {
    mygov: 'A fund holding $5,000 or more may want certified ID, which is harder to arrange once you have flown home.',
    us: 'We check what each fund needs before you leave, while certifying is still easy.',
  },
  {
    mygov: 'Super is one claim and your tax return is a separate one. Nothing connects them for you.',
    us: 'The return is a separate piece of work, so we do both.',
  },
]

const faqs = [
  {
    // Added Oct 2026: the WHV-specific super queries ("417 visa super claim",
    // "superannuation working holiday visa") sit at positions 25 to 29 with no
    // question on the page phrased the way they are typed.
    question: 'Can you claim super on a 417 or 462 working holiday visa?',
    answer:
      'Yes, once you have left Australia and your working holiday visa has ceased. You cannot claim it while you are still here on that visa. The claim is a Departing Australia Superannuation Payment (DASP), 65% of the taxable component is withheld, and a fund that offers international transfers can pay it to an account overseas.',
  },
  {
    question: 'Can you start a DASP claim before you leave Australia?',
    answer:
      'Yes. You can start and save the ATO\'s online DASP application while you are still in Australia, but it can only be submitted once you have left and your visa has ceased. Starting early also lets you arrange certified copies of your ID here, which is harder from overseas.',
  },
  {
    question: 'Can I just claim my super myself?',
    answer:
      'You can, it is free, and with one fund and clean documents we will say so. It gets harder with super spread across several funds, a fund that wants certified copies from overseas, or a visa that has not ceased.',
  },
  {
    question: 'Do you get superannuation if you worked under an ABN?',
    answer:
      'Generally no. Super guarantee contributions attach to PAYG employment, so gig, rideshare and freelance work invoiced under an ABN usually does not generate super. The exception is a contractor who really worked like an employee, where super may still be owed.',
  },
  {
    question: 'Is a DASP the same thing as a tax refund?',
    answer:
      'No, they are two separate payments. A tax refund is tax over-withheld from your wages, paid by the ATO after you lodge a return. A DASP is the super your employer paid on top of your wages, released by your fund. Many working holiday makers have both to deal with, and the tax return side is explained on our tax return page.',
  },
  {
    question: 'Is there a deadline to claim your super after leaving Australia?',
    answer:
      'No. If you have not claimed six months after leaving, with your visa ceased, your fund moves the balance to the ATO as unclaimed super. You can still claim it from the ATO through the same DASP application, at the same 65% rate, though the ATO pays only to an Australian account or by cheque.',
  },
  {
    question: 'Do you need your tax file number to claim your super?',
    answer:
      'A fund can usually identify you from your name, date of birth and passport, so a lost tax file number does not stop a claim. The TFN is still the only reliable way to find every account, and recovering it is faster than searching fund by fund.',
  },
  {
    question: 'Why is the DASP rate 65% for working holiday makers and 35% for others?',
    answer:
      'The 65% rate is set in law for anyone who has ever held a subclass 417 or 462 visa, even if you later moved to a different visa. Temporary residents who never held one, such as students, pay 35% on the taxed element.',
  },
  {
    question: 'What if an employer never paid your super at all?',
    answer:
      'Where an employer should have paid super and never did, that is an unpaid super guarantee matter the ATO can investigate and recover for you. Raise it before you claim, because money recovered after your accounts close means claiming again.',
  },
  {
    question: 'Does claiming your super affect your tax return or a future Australian visa?',
    answer:
      'Neither. The withholding tax is final, so a DASP does not go on your Australian tax return, and it is not something a later visa application turns on. The one consequence is that your accounts close, so if you come back to work you start with a new fund.',
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
    { '@type': 'ListItem', position: 2, name: 'Superannuation', item: `${SITE_URL}/superannuation` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/superannuation#service`,
  name: 'DASP superannuation claim service for working holiday makers',
  serviceType: 'Departing Australia Superannuation Payment (DASP) claim',
  description:
    'Departing Australia Superannuation Payment claims for 417 and 462 working holiday visa holders, from finding every fund linked to a tax file number through to payment into an Australian or overseas account.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (subclass 417 / 462) who has left Australia' },
  inLanguage: 'en-AU',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/superannuation#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub', '#key-figures'] },
  url: `${SITE_URL}/superannuation`,
  inLanguage: 'en-AU',
  dateModified: '2026-11-05',
}

// tech-001 (Nov 2026): the HowTo JSON-LD was removed. Its five steps did not
// appear in the visible page, and structured data must match visible content.

/* ── Section shell: every answer on the page is one Section ──────────────── */
function Answer({
  id, heading, children, tone = 'white',
}: { id: string; heading: string; children: React.ReactNode; tone?: 'white' | 'pale' | 'amber' }) {
  return (
    <Section id={id} tone={tone} title={heading} titleId={`${id}-title`}>
      {children}
    </Section>
  )
}

const GUIDES = [
  { href: '/blog/how-long-does-dasp-take', label: 'How long a DASP takes, stage by stage' },
  { href: '/blog/dasp-documents-required', label: 'The documents a DASP claim needs' },
  { href: '/blog/dasp-tax-rate-65-percent-explained', label: 'Why DASP is taxed at 65%, and what is left' },
  { href: '/blog/dasp-rejected-what-to-do', label: 'What to do if your DASP claim is rejected' },
  { href: '/blog/super-multiple-funds-consolidation', label: 'Claiming when your super sits in several funds' },
  { href: '/blog/dasp-vs-leaving-super-in-australia-pros-cons', label: 'Claim now or leave it invested: the comparison' },
  { href: '/blog/how-to-find-lost-superannuation', label: 'How to find every super account in your name' },
  { href: '/blog/what-happens-to-unclaimed-super', label: 'What happens to super you never claim' },
]

const ATO_DASP =
  'https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp'

/** Dated key figures, each from the ATO. */
const KEY_FIGURES = [
  { label: 'DASP tax for 417 and 462 visa holders', value: '65% of the taxable component, taxed or untaxed element. In place since 1 July 2017.' },
  { label: 'Super your employer pays', value: '12% of ordinary time earnings since 1 July 2025. From 1 July 2026 most employers pay it each payday (Payday Super).' },
  { label: "Cost of the ATO's online DASP application", value: 'Free.' },
  { label: 'Processing', value: '28 days from lodging a completed application.' },
  { label: 'Certified ID', value: 'A fund may ask for it where it holds $5,000 or more.' },
  { label: 'Unclaimed super', value: 'Moves to the ATO once six months have passed since you left and your visa has ceased.' },
]

/** DASP withholding by component and visa (ATO). */
const DASP_RATES = [
  { part: 'Tax-free component', whm: '0%', other: '0%' },
  { part: 'Taxable component, taxed element', whm: '65%', other: '35%' },
  { part: 'Taxable component, untaxed element', whm: '65%', other: '45%' },
]

const cellStyle = { padding: '10px 12px', borderTop: '1px solid var(--wht-line)', textAlign: 'left' as const, verticalAlign: 'top' as const }

export default function SuperannuationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className={blocks.underHeader}>
        <Crumb home="Home" current="Superannuation" label="Breadcrumb" href="/" />
        <Hero
          eyebrow={<>Superannuation &middot; DASP</>}
          title={<>How to claim your <Mark>superannuation</Mark> after leaving Australia</>}
        >
          <div className="hero-sub">
            <Lead>To claim superannuation after a working holiday, you apply for a Departing Australia Superannuation Payment (DASP), free through the ATO&apos;s online DASP application or on paper with each fund, once your 417 or 462 visa has ceased and you have left Australia. For working holiday makers 65% of the taxable component is withheld, so about 35 cents in every dollar reaches you, and a fund that offers international transfers can pay it overseas.</Lead>
            <p className={blocks.text}>The ATO says payment generally arrives within 28 days of a complete application. What usually holds a claim up is a visa that still shows as active, a fund you did not know about, or identity documents a fund will not accept.</p>
          </div>
          <div className={coreBlocks.actions}>
            <WaButton href={WA} position="hero" topic="super" lang="en">Ask us about your super</WaButton>
            <a href="#who-can-claim" className={coreBlocks.hint}>Start with eligibility</a>
          </div>
          <p className={heroStyles.note}>Replies in about an hour.</p>
        </Hero>
      </div>

      <PhotoFrame page="superannuation" locale="en" />

      <Answer id="how-to-claim" heading="How to claim superannuation after a working holiday, step by step" tone="white">
        <p className={blocks.text}>Claiming your super, withdrawing it when you leave Australia and a superannuation refund are all the same thing: a DASP. These are the steps, in order.</p>
        <ol className={blocks.text} style={{ paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <li>
            <strong>Check your employers paid all of it.</strong> Look at your payslips and your fund statements
            before you leave, because{' '}
            <Link href="/blog/super-employer-not-paying-what-to-do" className={blocks.textLink}>unpaid super</Link>{' '}
            is easier to chase while your accounts are open.
          </li>
          <li>
            <strong>Find every account.</strong> Each employer may have paid into a different fund. The ATO&apos;s
            online system searches for them, and your{' '}
            <Link href="/tfn" className={blocks.textLink}>tax file number</Link> is the most reliable way to match them.
          </li>
          <li>
            <strong>Start the application before you fly.</strong> You can start and save the ATO&apos;s online DASP
            application while you are still in Australia, but you can only submit it once you have left and your
            visa has ceased.
          </li>
          <li>
            <strong>Arrange certified ID if a fund holds $5,000 or more.</strong> Certifying documents is easier in
            Australia than from overseas.
          </li>
          <li>
            <strong>Submit one application for each account.</strong> Each fund, and the ATO for any super it
            already holds, pays separately, generally within 28 days of a completed application.
          </li>
          <li>
            <strong>Choose how to be paid.</strong> A fund can pay an Australian account, send an Australian dollar
            cheque or, if it offers one, an international transfer. Super the ATO holds goes to an Australian account
            or by cheque only, so keep your Australian account open until everything has landed.
          </li>
        </ol>
        <p className={blocks.text}>If you would rather we handle steps 2 to 6, message us on WhatsApp with where you worked.</p>
        <WaButton href={WA} position="inline" topic="super" lang="en" size="md">Message us on WhatsApp</WaButton>
      </Answer>

      <Section id="key-figures" tone="pale" title="Super for working holiday makers: the key figures" titleId="key-figures-title">
        <dl style={{ margin: 0 }}>
          {KEY_FIGURES.map((k) => (
            <div key={k.label} style={{ padding: '12px 0', borderTop: '1px solid var(--wht-line)' }}>
              <dt className={blocks.cardTitle}>{k.label}</dt>
              <dd className={blocks.text} style={{ margin: 0 }}>{k.value} Source: ATO.</dd>
            </div>
          ))}
        </dl>
        <p className={blocks.small}>
          Checked against the{' '}
          <a href={ATO_DASP} target="_blank" rel="noopener" className={blocks.textLink}>ATO&apos;s DASP guidance</a>, November 2026.
        </p>
      </Section>

      <Section eyebrow="Doing it yourself" title={<>The claim form has one box for a super fund. <Mark>Four casual jobs can mean four.</Mark></>} titleId="objection-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Two of those accounts were opened without you choosing anything.</p>
        <Compare rows={MYGOV.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="On your own" rightLabel="With us" />
        <p className={blocks.statement}>You will not have to work out which form goes where or which fund to chase first. We deal with the ATO directly.</p>
      </Section>

      <Answer id="who-can-claim" heading="Who can claim a DASP super refund?" tone="pale">
        <p className={blocks.text}>
          You can claim a Departing Australia Superannuation Payment once your temporary visa has expired
          or been cancelled, you have left Australia, and you hold no other active Australian visa. All
          three have to be true at once. Australian and New Zealand citizens and permanent residents cannot
          claim, and nor can holders of subclass 405 or 410 visas.
        </p>
        <p className={blocks.text}>
          The money comes from your employers: super is paid on top of your wages, at 12% of your
          ordinary time earnings since 1 July 2025.
        </p>
        <p className={blocks.text}>
          Work you invoiced under an ABN usually earns no super, because super guarantee attaches to
          employment. If you are unsure which kind of worker you were, our{' '}
          <Link href="/abn" className={blocks.textLink}>ABN page</Link> explains the difference.
        </p>
        <p className={blocks.text}>
          Your visa status is checked against Department of Home Affairs records, so there is nothing
          separate to prove. A bridging visa, or still being onshore on any valid visa, blocks the claim.
        </p>
      </Answer>
      <Answer id="how-much" heading="Super tax for working holiday makers: how much you get back" tone="white">
        <p className={blocks.text}>Working holiday makers pay 65% withholding tax on the taxable component of a DASP, so roughly 35 cents in the dollar reaches you. The rate is fixed in law for anyone who has held a 417 or 462 visa, and no agent or waiting can reduce it.</p>
        <div style={{ overflowX: 'auto' }}>
          <table className={blocks.text} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <caption className={blocks.small} style={{ textAlign: 'left', captionSide: 'bottom', paddingTop: 10 }}>
              DASP withholding rates. Source:{' '}
              <a href={ATO_DASP} target="_blank" rel="noopener" className={blocks.textLink}>ATO, Departing Australia superannuation payment (DASP)</a>.
            </caption>
            <thead>
              <tr>
                <th scope="col" style={cellStyle}>Part of your super</th>
                <th scope="col" style={cellStyle}>417 or 462 visa holders</th>
                <th scope="col" style={cellStyle}>Other temporary residents</th>
              </tr>
            </thead>
            <tbody>
              {DASP_RATES.map((r) => (
                <tr key={r.part}>
                  <th scope="row" style={cellStyle}>{r.part}</th>
                  <td style={cellStyle}>{r.whm}</td>
                  <td style={cellStyle}>{r.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={coreBlocks.threeUp}>
          {[
            { bal: '$3,000', net: '$1,050', note: 'a smaller balance' },
            { bal: '$6,000', net: '$2,100', note: 'a mid-sized balance' },
            { bal: '$10,000', net: '$3,500', note: 'a larger balance' },
          ].map((r, i) => (
            <div key={i} className={coreBlocks.stat}>
              <p className={coreBlocks.statLabel}>Super balance</p>
              <p className={blocks.cardTitle}>{r.bal}</p>
              <p className={coreBlocks.statNet}>{r.net}</p>
              <p className={blocks.small}>paid to you &middot; {r.note}</p>
            </div>
          ))}
        </div>
        <p className={blocks.small}>Figures are after the 65% DASP withholding on the taxable component. For working holiday makers the same 65% applies to a taxed or an untaxed element, and only a tax-free component, which is rare, is paid without withholding. Treat these as illustrations rather than a quote.</p>
      </Answer>
      <Answer id="documents" heading="What documents do you need for a DASP claim?" tone="pale">
        <p className={blocks.text}>
          You need your passport, tax file number, visa details, each fund's name and ideally its member
          number, plus bank details, Australian or overseas. A missing member number is rarely fatal: a
          fund can match you from your TFN and date of birth.
        </p>
        <p className={blocks.text}>
          The step that stalls claims is certification. Where a single fund holds $5,000 or more it may
          ask for certified copies of your identity documents, which takes longer from overseas than
          people expect. On a paper application for that amount you may also need a Certification of
          Immigration Status from the Department of Home Affairs.
        </p>
      </Answer>
      <Answer id="how-long" heading="How long does a DASP payment take?" tone="white">
        <p className={blocks.text}>
          The ATO&apos;s service standard is 28 days from when a completed application is lodged. A claim
          missing a certified document is not complete, so it can sit for weeks before those 28 days begin,
          and super the ATO already holds can take longer than super still in a fund.
        </p>
        <p className={blocks.text}>
          If your money is spread across several funds, the claim is only as fast as the slowest of them.
          Balances already transferred to the ATO are claimed from the ATO through the same application.
        </p>
      </Answer>
      <Answer id="find-your-fund" heading="What if you do not know which super fund you were in?" tone="pale">
        <p className={blocks.text}>
          This is the normal situation. Every fund an employer paid into is linked to your tax file
          number, so the accounts can be traced from it without you remembering a single fund name.
          Balances a fund has already handed to the ATO appear in the same search.
        </p>
        <p className={blocks.text}>
          The claim is not automatic: finding an account lodges nothing, and each fund still needs its own
          application. The account people miss is almost always the first job. If your tax file number
          is lost, <Link href="/tfn" className={blocks.textLink}>recover it first</Link>; the full search is
          set out in{' '}
          <Link href="/blog/how-to-find-lost-superannuation" className={blocks.textLink}>how to find lost super</Link>.
        </p>
      </Answer>
      <Answer id="from-overseas" heading="Can you claim your super from the UK, Germany or Japan?" tone="white">
        <p className={blocks.text}>
          Yes, and you have to. A DASP can only be made once you have left Australia, so every claim is
          made from overseas. Where you are living now has no bearing on it.
        </p>
        <p className={blocks.text}>
          One thing to settle before you close your Australian bank account: a fund can pay by Australian
          transfer, Australian dollar cheque or, if it offers one, an international money transfer, but super
          the ATO already holds is paid only to an Australian account in your name or by cheque. Whether your
          own country taxes the payment is a question for an adviser there.
        </p>
      </Answer>
      <Answer id="dasp-vs-leaving" heading="Is it better to claim your super or leave it in Australia?" tone="pale">
        <p className={blocks.text}>
          For almost every working holiday maker, claiming is better. A balance left behind receives no
          contributions but keeps paying admin fees and often insurance premiums you cannot use from
          overseas. Whatever survives eventually lands with the ATO, uninvested.
        </p>
        <p className={blocks.text}>
          The argument for leaving it only holds if you intend to return to Australia to live and work
          permanently. Waiting does not reduce the 65%.{' '}
          <Link href="/blog/dasp-vs-leaving-super-in-australia-pros-cons" className={blocks.textLink}>
            The full comparison is here
          </Link>.
        </p>
      </Answer>
      <Answer id="while-in-australia" heading="Can you claim your super while you are still in Australia?" tone="white">
        <p className={blocks.text}>
          No. Super is preserved while you hold a valid visa and are in the country, with no early release
          on a working holiday visa for leaving a job or for hardship.
        </p>
        <p className={blocks.text}>
          If you are flying home well before your visa runs out, the Department of Home Affairs can cancel
          the remaining visa once you have left, which usually brings the claim forward.
        </p>
        <p className={blocks.text}>
          What you can do before you leave is start. The ATO&apos;s online DASP application can be started and
          saved in Australia, then submitted once you have left and your visa has ceased, and certified copies
          are easier to arrange while you are still here.
        </p>
      </Answer>
      <Answer id="never-claimed" heading="What happens to your super if you never claim it?" tone="pale">
        <p className={blocks.text}>
          It is not lost, and there is no deadline to claim it. Once six months have passed since you left
          Australia and your visa has ceased, your fund transfers the balance to the ATO as unclaimed super,
          where it stays in your name. A claim years later is still a claim, at the same 65% rate.
        </p>
        <p className={blocks.text}>
          What is lost is whatever fees and insurance premiums took out of the balance before it
          transferred. On a small balance that can be a meaningful share.
        </p>
      </Answer>
      <Answer id="with-us" heading="Claim it yourself, or have us do it" tone="amber">
        <p className={blocks.text}>You can do it yourself. What you would be handing over is the search across every account linked to your tax file number, ATO held super included, certified copies arranged from overseas, a separate application to each fund, and the chasing when one goes quiet.</p>
        <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>If we also do your tax return:</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Our guarantee: if your tax refund is less than our fee, we refund the difference after your Notice of Assessment. If there is no refund, or you owe money to the ATO instead, the full fee applies. The guarantee covers returns with TFN income only.
        </p>
        <p className={blocks.text}>
          Your super claim is separate from your{' '}
          <Link href="/tax-return" className={blocks.textLink}>tax return</Link>. If you also have a return to lodge, it is reviewed and signed off by a registered tax agent before it is lodged with the ATO.
        </p>
        <p className={blocks.text}>Send us the names of the places you worked and roughly when, and we will tell you which funds to expect and what each one will ask for before you apply.</p>
        <div className={blocks.stack}>
          <WaButton href={WA} position="section" topic="super" lang="en" size="md">Message us on WhatsApp</WaButton>
          <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Replies in about an hour.</p>
        </div>
      </Answer>

      <Section title="Other questions people ask about DASP" titleId="faq-title">
        <Accordion items={faqs} />
      </Section>

      <Section tone="pale" title="Go deeper on one part of the claim" titleId="guides-title">
        <TitleLinks items={GUIDES} />
      </Section>

      <Section eyebrow="What is next" title="Your tax return is a separate claim" titleId="next-title">
        <p className={blocks.text}>Super is released by your fund. Tax over-withheld from your wages only comes back through a tax return, and the ATO pays it to an Australian account only.</p>
        <LinkButton href="/tax-return">How the tax return works</LinkButton>
        <p className={blocks.text}>
          The 2% Medicare levy is the other one nobody claims. Whether you owed it depends on your entitlement to Medicare.{' '}
          <Link href="/medicare" className={blocks.textLink}>Read about the exemption</Link>.
        </p>
        <p className={blocks.text}>
          Leaving for good before the end of the financial year? Your tax obligations after you go are set out in{' '}
          <Link href="/blog/tax-obligations-after-leaving-australia" className={blocks.textLink}>what you still owe the ATO after leaving</Link>.
        </p>
      </Section>

      <Section tone="forest" title="Ask us about your super" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Your employer paid it on top of your wages, never out of them. Tell us where you worked and we take it from there.</p>
        <WaButton href={WA} position="footer" topic="super" lang="en" tone="light">Message us on WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Replies in about an hour.</p>
      </Section>

      <MobileCta href={WA} lang="en" topic="super" />
    </>
  )
}
