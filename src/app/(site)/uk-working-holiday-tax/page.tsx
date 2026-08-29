import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/(site)/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  title: 'Australian Tax Refund: UK Backpackers',
  description:
    'Gone home to the UK with Australian tax years open. A British passport can carry the full tax free threshold under Addy, and none of it needs you here.',
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
      'A British passport can carry the full tax free threshold under Addy, and the Medicare levy works the other way round for Brits. You never have to log into myGov.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Australian Tax Refund: UK Backpackers',
    description:
      'A British passport can carry the full tax free threshold under Addy, and the Medicare levy works the other way round for Brits.',
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
    t: 'The Addy decision is yours',
    d: 'The case that struck down the backpacker tax was brought by a British working holiday maker, and the UK sits on the ATO list of countries it applies to. Where it applies it restores the full tax free threshold and resident rates for those years.',
  },
  {
    t: 'Medicare runs the other way round',
    d: 'Every guide tells working holiday makers they are exempt from the 2 per cent Medicare levy. For a British traveller that is often the opposite of the truth, because of the Reciprocal Health Care Agreement between the UK and Australia.',
  },
  {
    t: 'Two tax years that never line up',
    d: 'The UK year runs 6 April to 5 April and the Australian year runs 1 July to 30 June. Arriving in February or leaving in September leaves an Australian year open that most people never think about again.',
  },
]

const WHAT_WE_DO = [
  'Work out which Australian tax years you have open, including the ones you left behind when you flew home.',
  'Take a position on your residency for tax purposes for each of those years, and apply the Addy decision where it applies.',
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
 * return, the Addy residency position, is not mentioned anywhere on the screen.
 */
const MYGOV = [
  {
    mygov: 'From Britain you often cannot get in at all, because linking the ATO wants Australian identity documents you no longer have.',
    us: 'We deal with the ATO directly. Nothing on our side needs you to hold an Australian ID.',
  },
  {
    mygov: 'Nothing there mentions that a British passport can carry the full tax free threshold of $18,200 under the Addy decision.',
    us: 'That is a residency position, and on a British return it is usually worth more than everything else combined.',
  },
  {
    mygov: 'The Medicare levy is applied by default, and for Brits the health care agreement works the opposite way round.',
    us: 'We work out which side of it you fall on before the return goes in.',
  },
  {
    mygov: 'The years you left open do not appear as a prompt anywhere.',
    us: 'Leaving Australia does not close a year. We go back through the ones nobody lodged and claim what is still sitting there.',
  },
]

const FAQS = [
  {
    question: 'Do UK citizens pay the Medicare levy in Australia?',
    answer:
      'Often yes. The UK has a Reciprocal Health Care Agreement with Australia, so a UK passport holder can enrol in Medicare, and that entitlement is what removes the 2 per cent exemption other working holiday makers claim. The levy only applies to residents for tax purposes, so the answer depends on your residency position as well as your passport, and it is checked case by case.',
  },
  {
    question: 'I stayed three years. Do I need to lodge three tax returns?',
    answer:
      'Yes. The Australian tax year runs 1 July to 30 June, so a three year stay usually spans three or four separate tax years, each needing its own return. The most common pattern we see is somebody who lodged in their first year and then stopped, and those later years usually hold the most money because the earnings were highest.',
  },
  {
    question: 'How much superannuation will be waiting for me?',
    answer:
      'Your employer paid 12 per cent of your ordinary earnings into a superannuation fund on top of your wages, usually spread across more than one fund over a long stay. Once you have left and your visa has ceased it is claimed as a Departing Australia Superannuation Payment, with 65 per cent withheld, so roughly a third of the balance reaches you.',
  },
  {
    question: 'Is there a deadline, and am I already late?',
    answer:
      'A year past its deadline is late rather than lost. Late returns are still lodged and still refunded, and being late does not reduce what the year is worth.',
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
const INK = '#080F0D'
const BODY = '#2A3C34'
const MUTED = '#4C6459'
const FOREST = '#0B5240'
const HAIR = '#E2EFE9'
const SUNKEN = '#F5F9F7'

const wrap: React.CSSProperties = { maxWidth: '720px', margin: '0 auto', padding: '0 20px' }
const h2s: React.CSSProperties = {
  fontFamily: 'var(--font-serif), Georgia, serif',
  fontSize: 'clamp(23px, 5.6vw, 30px)',
  lineHeight: 1.22,
  letterSpacing: '-0.02em',
  fontWeight: 700,
  color: INK,
  // 16px, not 14. Under a 23 to 30px serif heading the old value read tight.
  margin: '0 0 16px',
}
const h3s: React.CSSProperties = { fontSize: '16px', lineHeight: 1.35, fontWeight: 700, color: INK, margin: '0 0 6px' }
const ps: React.CSSProperties = { fontSize: '15px', lineHeight: 1.62, color: BODY, margin: '0 0 14px' }
const secLight: React.CSSProperties = { background: '#fff', padding: '34px 0' }
const secSunk: React.CSSProperties = { background: SUNKEN, padding: '34px 0' }
const kickerS: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 600,
  color: FOREST,
  margin: '0 0 10px',
}
const linkS: React.CSSProperties = { color: FOREST, textDecoration: 'underline' }

function Cta({ position }: { position: 'hero' | 'inline' | 'section' }) {
  return (
    <div style={{ margin: '20px 0 0' }}>
      <WaLink
        href={WA}
        position={position}
        topic="uk"
        lang="en"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '52px',
          padding: '0 28px',
          background: FOREST,
          color: '#fff',
          borderRadius: '999px',
          fontSize: '16px',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Message us on WhatsApp
      </WaLink>
      <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: MUTED, margin: '10px 0 0', textAlign: 'center' }}>
        Replies in about an hour. Tell us the years you worked and we will tell you where you stand.
      </p>
    </div>
  )
}

export default function UKWorkingHolidayTaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <main style={{ background: '#fff' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(160deg,#fff 0%,#F2FAF7 100%)', paddingTop: '68px' }}>
          <div style={{ ...wrap, paddingTop: '18px', paddingBottom: '34px' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '18px' }}>
              <ol style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', listStyle: 'none', margin: 0, padding: 0, fontSize: '13px', color: MUTED }}>
                {CRUMBS.map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {i > 0 && <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>}
                    {i === CRUMBS.length - 1 ? (
                      <span aria-current="page" style={{ color: FOREST, fontWeight: 500 }}>{b.name}</span>
                    ) : (
                      <Link href={b.item} style={{ color: MUTED, minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>{b.name}</Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <p style={kickerS}>British passport holders</p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(30px, 8.2vw, 46px)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                fontWeight: 700,
                color: INK,
                margin: '0 0 14px',
              }}
            >
              You have gone home.{' '}
              <span style={{ color: FOREST, fontStyle: 'italic' }}>Your Australian tax has not.</span>
            </h1>
            <p className="hero-sub" style={{ fontSize: '16.5px', lineHeight: 1.6, color: BODY, margin: 0 }}>
              Years you left open, a residency position only a British passport can use, and super that becomes claimable the
              moment you leave.
            </p>
            <Cta position="hero" />
            <p style={{ fontSize: '13px', lineHeight: 1.5, color: MUTED, margin: '14px 0 0', textAlign: 'center' }}>
              <GoogleRating variant="pill" lang="en" />
            </p>
          </div>
        </section>

        {/* THE OBJECTION, ANSWERED FROM BRITAIN */}
        <section style={secSunk}>
          <div style={wrap}>
            <p style={kickerS}>Doing it yourself</p>
            <h2 style={h2s}>
              <span style={{ display: 'block', color: BODY, fontWeight: 400 }}>The residency position decides a British return.</span>
              <span style={{ display: 'block' }}>myGov has no field for it.</span>
            </h2>
            <p style={{ ...ps, color: MUTED, marginBottom: '20px' }}>
              Four things on a British file are settled somewhere other than the form.
            </p>

            {/* The two labels used to print on all eight cells. On a phone the
                rows stack, so that is the same two words marching down the
                screen eight times. They print on the first row only, where they
                read as column headings on desktop and as the key on mobile; the
                alternating ground and the heavier weight carry the distinction
                from there. Copy unchanged, padding tightened to 13px 16px. */}
            <div style={{ background: '#fff', border: '1px solid #CDE3DB', borderRadius: '14px', overflow: 'hidden' }}>
              {MYGOV.map((row, i) => (
                <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : `1px solid ${HAIR}` }}>
                  <div style={{ padding: '13px 16px' }}>
                    {i === 0 && (
                      <p style={{ fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, color: MUTED, margin: '0 0 5px' }}>
                        On myGov
                      </p>
                    )}
                    <p style={{ ...ps, margin: 0, overflowWrap: 'break-word' }}>{row.mygov}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l" style={{ padding: '13px 16px', background: '#F2FAF7', borderColor: HAIR }}>
                    {i === 0 && (
                      <p style={{ fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, color: FOREST, margin: '0 0 5px' }}>
                        With us
                      </p>
                    )}
                    <p style={{ ...ps, margin: 0, color: INK, fontWeight: 500, overflowWrap: 'break-word' }}>{row.us}</p>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '18px', lineHeight: 1.45, fontWeight: 700, color: FOREST, margin: '22px 0 0' }}>
              You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly.
            </p>
          </div>
        </section>

        {/* DIRECT ANSWER */}
        <section style={secLight}>
          <div style={wrap}>
            <h2 style={h2s}>Can you still claim Australian tax back from the UK?</h2>
            <p style={{ ...ps, marginBottom: 0 }}>
              Yes. An Australian tax return can be prepared and lodged from anywhere, and leaving does not close a year or reduce
              what you are owed. The superannuation half can only be claimed after you have left and your visa has ceased, so being
              home is a requirement rather than an obstacle.
            </p>
          </div>
        </section>

        {/* FOUR DIFFERENCES */}
        <section style={secSunk}>
          <div style={wrap}>
            <h2 style={h2s}>What is different about a British passport?</h2>
            {/* Move 2: "Most guides treat every working holiday maker as the
                same person" was setup the heading already carries. */}
            <p style={ps}>
              Four things about a UK passport change the answer.
            </p>
            {DIFFERENCES.map((c, i) => (
              <div key={i} style={{ borderTop: `1px solid ${HAIR}`, padding: '15px 0' }}>
                <p style={h3s}>{c.t}</p>
                <p style={{ ...ps, margin: 0 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ADDY */}

        {/* MEDICARE */}
        <section style={secLight}>
          <div style={wrap}>
            <h2 style={h2s}>Do UK citizens pay the Medicare levy in Australia?</h2>
            {/* Move 3: one four line block became two, split on the turn from
                what the agreement is to what it costs you. */}
            <p style={ps}>
              Often yes, and this is the one place where copying standard backpacker advice costs a British traveller rather than
              saves them. The UK has a Reciprocal Health Care Agreement with Australia, so a British visitor can enrol in Medicare
              and is treated in a public hospital.
            </p>
            <p style={ps}>
              Being entitled to Medicare is what removes the 2 per cent exemption other working holiday makers claim, and claiming an
              exemption you are not entitled to is not a small paperwork error.
            </p>
            <p style={{ ...ps, marginBottom: 0 }}>
              What decides it is residency, because the levy only applies to residents for tax purposes. More on how the levy works
              on our{' '}
              <Link href="/medicare" style={linkS}>Medicare page</Link>.
            </p>
          </div>
        </section>

        {/* RATES */}
        <section style={secSunk}>
          <div style={wrap}>
            <h2 style={h2s}>What tax rate applies to a working holiday maker?</h2>
            {/* The table below is captioned "Working holiday maker rates
                2025-26", so the lede said the year twice. */}
            <p style={ps}>
              Working holiday maker rates apply to your Australian wages whether or not you are a resident for tax purposes, unless
              the Addy position above changes that.
            </p>
            <div style={{ background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '14px', overflow: 'hidden' }}>
              <p style={{ fontSize: '15px', fontWeight: 700, color: FOREST, margin: 0, padding: '13px 16px', borderBottom: `1px solid ${HAIR}` }}>
                Working holiday maker rates 2025-26
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {RATE_ROWS.map((r, i) => (
                      <tr key={i} style={{ borderTop: i ? `1px solid ${HAIR}` : 'none' }}>
                        <th scope="row" style={{ textAlign: 'left', fontSize: '13.5px', fontWeight: 600, color: INK, padding: '11px 16px', width: '42%' }}>{r[0]}</th>
                        <td style={{ fontSize: '13.5px', color: BODY, padding: '11px 16px' }}>{r[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p style={{ ...ps, marginTop: '16px' }}>
              Your employer had to be registered with the ATO as an employer of working holiday makers for the 15 per cent rate to
              apply. If not, they had to withhold at the foreign resident rate, which starts at 30 cents in the dollar from your
              first dollar.
            </p>
            <p style={{ ...ps, marginBottom: 0 }}>
              That money is not gone, but it only comes back on a lodged return. Full breakdown on our{' '}
              <Link href="/tax-return" style={linkS}>tax return page</Link>.
            </p>
          </div>
        </section>

        {/* SUPER */}
        <section style={secLight}>
          <div style={wrap}>
            <h2 style={h2s}>What happens to your superannuation once you are home?</h2>
            <p style={ps}>
              It sits there. Your employer paid 12 per cent of your ordinary earnings into a superannuation fund on top of your wages,
              never out of them, from your first dollar and with no minimum monthly amount. Since 1 July 2026 it also has to be paid
              with every pay run and reach the fund within seven business days, so an employer skipping it shows up in weeks rather
              than after a quarter.
            </p>
            <p style={ps}>
              After a long stay and several jobs you will usually have more than one fund account, each charging fees against a
              balance you are not watching. Once you have left and your visa has ceased it is claimed as a Departing Australia
              Superannuation Payment, with 65 per cent withheld, so roughly a third of the balance reaches your account.
            </p>
            <p style={{ ...ps, marginBottom: 0 }}>
              There is no deadline on the claim, and the five year limit you may have read about does not exist. More on our{' '}
              <Link href="/superannuation" style={linkS}>superannuation page</Link>.
            </p>
          </div>
        </section>

        {/* DEADLINES (the two tax years now sit once, in the differences list) */}
        <section style={secSunk}>
          <div style={wrap}>
            <h2 style={h2s}>Are you late, and does it matter?</h2>
            <p style={{ ...ps, marginBottom: 0 }}>
              Australian returns can be lodged from 1 July. The deadline without an agent is 31 October, and going through a tax
              agent usually extends that to 15 May the following year. Past both, the year is late rather than lost, and late returns
              are still lodged and still refunded.
            </p>
          </div>
        </section>

        {/* WHAT WE ACTUALLY DO */}
        <section style={secLight}>
          <div style={wrap}>
            <h2 style={h2s}>What we do with a British file</h2>
            <p style={ps}>
              Anyone can press submit. The work happens before that, and on a British file it is the two questions nobody else asks:
              which years are open, and which residency position is true for each.
            </p>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {WHAT_WE_DO.map((t, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                    background: '#fff',
                    border: `1px solid ${HAIR}`,
                    borderRadius: '12px',
                    padding: '14px 16px',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: '0 0 26px',
                      width: '26px',
                      height: '26px',
                      borderRadius: '999px',
                      background: FOREST,
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: '15px', lineHeight: 1.55, color: BODY }}>{t}</span>
                </li>
              ))}
            </ol>
            <p style={{ ...ps, marginTop: '18px', marginBottom: 0 }}>
              None of that asks anything of you beyond the years you worked and what you can still lay hands on.
            </p>
          </div>
        </section>

        {/* GUARANTEE + CTA */}
        <section style={{ background: '#0B5240', padding: '38px 0' }}>
          <div style={wrap}>
            <h2 style={{ ...h2s, color: '#fff', marginBottom: '12px' }}>
              If your refund is less than our fee, we refund the difference, so you are never out of pocket.
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.62, color: 'rgba(255,255,255,0.78)', margin: 0 }}>
              Working holiday tax is the only thing we do. Your return is reviewed and signed off by a
              registered tax agent before it is lodged with the ATO.
            </p>
            <div style={{ marginTop: '18px' }}>
              <WaLink
                href={WA}
                position="section"
                topic="uk"
                lang="en"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '52px',
                  padding: '0 28px',
                  background: '#E9A020',
                  color: '#1A2822',
                  borderRadius: '999px',
                  fontSize: '16px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Message us on WhatsApp
              </WaLink>
              <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: 'rgba(255,255,255,0.6)', margin: '10px 0 0', textAlign: 'center' }}>
                Replies in about an hour.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={secLight}>
          <div style={wrap}>
            <h2 style={h2s}>Questions British travellers ask</h2>
            {FAQS.map((f, i) => (
              <div key={i} style={{ borderTop: `1px solid ${HAIR}`, padding: '16px 0' }}>
                <h3 style={{ ...h3s, marginBottom: '8px' }}>{f.question}</h3>
                <p style={{ ...ps, margin: 0 }}>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GUIDES */}
        <section style={secSunk}>
          <div style={wrap}>
            <h2 style={h2s}>Worth reading next</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {GUIDES.map((g, i) => (
                <Link
                  key={i}
                  href={g.href}
                  style={{
                    display: 'block',
                    background: '#fff',
                    border: `1px solid ${HAIR}`,
                    borderRadius: '12px',
                    padding: '15px 16px',
                    textDecoration: 'none',
                    minHeight: '44px',
                  }}
                >
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: FOREST, marginBottom: '3px' }}>{g.label}</span>
                  <span style={{ display: 'block', fontSize: '15px', lineHeight: 1.5, color: BODY }}>{g.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section style={{ ...secLight, paddingBottom: '52px' }}>
          <div style={wrap}>
            <p style={{ fontSize: '13.5px', lineHeight: 1.62, color: MUTED, margin: 0 }}>
              This is general information, not personal tax advice, and nothing here is advice on your UK tax position. Residency for
              Australian tax purposes depends on your own circumstances in each year, which is why British files are looked at
              individually.
            </p>
          </div>
        </section>

      </main>

      <MobileCta href={WA} lang="en" topic="uk" />
    </>
  )
}
