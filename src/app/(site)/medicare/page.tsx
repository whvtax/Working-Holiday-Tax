import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/(site)/HomeWa'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'

/*
 * The best performing service page on the site, so this is a tightening rather
 * than a rebuild. What it owns is the exemption certificate: the levy comes off
 * by default, an agreement country removes the entitlement to claim it back,
 * and the exemption itself needs a statement almost nobody applies for. That is
 * the determinant, and it now leads the page.
 */

const WA = waUrl({ topic: 'medicare', lang: 'en' })

export const metadata: Metadata = {
  title: { absolute: 'Medicare Levy Exemption for 417 and 462 Visa Holders' },
  description:
    'The 2% Medicare levy comes off by default, and most working holiday makers never owed it. Who is exempt, and the certificate the exemption needs.',
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

const RHCA = [
  'United Kingdom', 'Ireland', 'New Zealand', 'Italy',
  'Sweden', 'Netherlands', 'Belgium', 'Finland',
  'Norway', 'Malta', 'Slovenia',
]

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
    mygov: 'Nothing on the screen mentions that your passport country, not your visa, is what decides it.',
    us: 'Whether Australia has a reciprocal health care agreement with your country is the whole question, and the first one we ask.',
  },
  {
    mygov: 'Taking the levy off needs an exemption certificate, applied for separately and not through the return at all.',
    us: 'We help you apply for the certificate, wait for it, and ensure the exemption is claimed for the correct year.',
  },
  {
    mygov: 'The exemption box is there whether you hold the certificate or not.',
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
      'The levy is 2% of taxable income, so about $500 on $25,000 earned and about $1,000 on $50,000. It is settled when your return is assessed, not taken out of your wages week by week, so the exemption claimed in the return is what puts the money back.',
  },
  {
    question: 'Does every 417 or 462 visa holder get the exemption?',
    answer:
      'Most do, but not all. The deciding factor is your passport, not your visa: a national of one of the eleven reciprocal health care agreement countries, the United Kingdom, Ireland and Italy among them, is generally entitled to Medicare here, and entitlement removes the exemption.\n\nGermany and Japan hold no agreement, so the exemption is normally available to working holiday makers from either.',
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
      'Nothing is lost. The levy is calculated when your return is assessed, not when you are paid, so what came out of your wages was tax withheld generally, not the levy specifically. A valid exemption takes it out of the assessment.\n\nIf an earlier year was lodged without the exemption and you were entitled to it, that return can usually be amended.',
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

const H2: React.CSSProperties = {
  fontSize: 'clamp(21px,2.6vw,30px)',
  lineHeight: 1.16,
  letterSpacing: '-0.025em',
  // 12px under a 21 to 30px serif heading is tight. Every H2 on the page runs
  // through this object, so the air goes in once.
  marginBottom: '16px',
  scrollMarginTop: '84px',
}
const BODY: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: 1.7,
  color: '#2A3C34',
  marginBottom: '14px',
}

export default function MedicarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO. The determinant is the agreement country, not the task. ─── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '13px', color: '#4C6459' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Medicare</span>
          </nav>

          <div className="max-w-[680px] mx-auto">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240' }}>
                Medicare levy
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(28px,3.4vw,44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '12px' }}>
              A 2% levy you never owed
            </h1>

            <p className="hero-sub font-semibold text-ink"
              style={{ fontSize: 'clamp(16px,1.6vw,18px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
              Your passport decides it, not your visa. Removable with a certificate almost nobody applies for.
            </p>

            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop: '24px', marginBottom: '22px', maxWidth: '480px' }}>
              <WaLink href={WA} position="hero" topic="medicare" lang="en"
                className="btn-primary inline-flex justify-center"
                style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                Check where you stand
              </WaLink>
              <a href="#who-is-exempt"
                className="inline-flex btn-ghost-dark justify-center items-center"
                style={{ minHeight: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                Who is exempt
              </a>
            </div>

            <p style={{ fontSize: '13px', color: '#4C6459' }}>
              Replies in about an hour.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE OBJECTION, ANSWERED ABOUT THE LEVY ─────────────────────────── */}
      <section className="py-8 lg:py-11" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">

            <p className="font-medium uppercase"
              style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#16775C', marginBottom: '12px' }}>
              Doing it yourself
            </p>

            <h2 className="font-serif font-black text-ink" style={H2}>
              <span style={{ display: 'block', color: '#2A3C34', fontWeight: 400 }}>Nobody asks whether the levy was ever yours.{' '}</span>
              <span style={{ display: 'block' }}>myGov applies it and moves on.{' '}</span>
            </h2>

            <p style={{ ...BODY, color: '#4C6459', maxWidth: '56ch', marginBottom: '20px' }}>
              It is 2% of taxable income, about $500 on a $25,000 year. It never appears on a payslip.
            </p>

            {/* The two labels used to print on all eight cells, which on a phone
                is the same two words repeated eight times down the screen. They
                print once, on the first row, where they read as column headings
                on desktop and as the key on mobile. The alternating ground and
                the heavier weight carry the distinction from there. Copy is
                unchanged. */}
            <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
              {MYGOV.map((row, i) => (
                <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                  <div style={{ padding: '13px 16px', background: '#FFFFFF' }}>
                    {i === 0 && (
                      <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#4C6459', marginBottom: '5px' }}>
                        On myGov
                      </p>
                    )}
                    <p style={{ ...BODY, marginBottom: 0, overflowWrap: 'break-word' }}>{row.mygov}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                    style={{ padding: '13px 16px', background: '#F2FAF7' }}>
                    {i === 0 && (
                      <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240', marginBottom: '5px' }}>
                        With us
                      </p>
                    )}
                    <p style={{ ...BODY, color: '#080F0D', fontWeight: 500, marginBottom: 0, overflowWrap: 'break-word' }}>{row.us}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-serif" style={{ fontSize: '18px', lineHeight: 1.45, color: '#0B5240', marginTop: '22px', maxWidth: '46ch', fontWeight: 700 }}>
              You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT GOES WRONG ALONE ──────────────────────────────────────────── */}
      <section className="py-8 lg:py-11" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-serif font-black text-ink" style={H2}>
              Why is the levy on your assessment at all?
            </h2>
            {/* "The levy is applied when the ATO assesses your return" is the
                first row of the table directly above this. */}
            <p style={BODY}>
              Because it is the default. It comes off unless an exemption is claimed, and nothing asks
              whether you were entitled to Medicare, so the common outcome is 2% of a year's income paid
              towards a system you could never use.
            </p>
            <p style={BODY}>
              The quieter mistake is the opposite: the exemption ticked without the statement that backs
              it. That evidence is a Medicare Entitlement Statement from Services Australia, a separate
              agency to the ATO, and a claim made without it cannot be supported if it is queried.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE DETERMINANT ────────────────────────────────────────────────── */}
      <section id="who-is-exempt" className="py-8 lg:py-11" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-serif font-black text-ink" style={H2}>
              Who is exempt from the Medicare levy?
            </h2>
            {/* Five sentences was a wall on a 390px screen. Split on the turn in
                the argument: what decides it, then who each side of it is. */}
            <p style={BODY}>
              You are generally exempt if you were not entitled to Medicare, and on a working holiday visa
              that comes down to your passport. Australia has reciprocal health care agreements with eleven
              countries.
            </p>
            <p style={BODY}>
              A national of one of those is generally entitled to Medicare while here, which removes the
              exemption even if you never enrolled: the test is entitlement, not use. Everybody else,
              Germany and Japan included, is normally not entitled and can claim the exemption for the days
              that applies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[880px] mx-auto" style={{ marginTop: '20px' }}>
            <div className="rounded-2xl" style={{ padding: '20px', background: '#fff', border: '1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '8px' }}>
                From an agreement country
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#2A3C34', marginBottom: '12px' }}>
                Generally entitled to Medicare, so generally not exempt. We make sure the levy is applied
                correctly, and check whether any part of the year was different.
              </p>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#4C6459' }}>
                {RHCA.join(' · ')}
              </p>
            </div>
            <div className="rounded-2xl" style={{ padding: '20px', background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '8px' }}>
                From anywhere else
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#2A3C34', marginBottom: '12px' }}>
                Normally not entitled to Medicare, so normally exempt. Germany and Japan are both in this
                group.
              </p>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#4C6459' }}>
                The exemption is counted in days, not as a single yes or no for the year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ─────────────────────────────────────────────────────── */}
      <section className="py-8 lg:py-11" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-serif font-black text-ink" style={H2}>
              What do we do about it?
            </h2>
            <p style={BODY}>
              We work out whether you were entitled to Medicare and for which part of the year.
            </p>

            <div className="rounded-2xl" style={{ padding: '20px', background: '#F5F9F7', border: '1.5px solid #C8EAE0', margin: '20px 0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.5, marginBottom: '8px' }}>
                We start with a Tax Assessment that reviews your full situation and shows you your estimated outcome, so you know exactly where you stand before deciding whether to go ahead and lodge.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#4C6459' }}>
                Reviewed and signed off by a registered tax agent before it is lodged
                with the ATO.
              </p>
            </div>

            <WaLink href={WA} position="section" topic="medicare" lang="en"
              className="btn-primary flex justify-center"
              style={{ minHeight: '54px', width: '100%', maxWidth: '360px', fontSize: '15px', borderRadius: '100px' }}>
              Message us on WhatsApp
            </WaLink>
            <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '10px' }}>
              Replies in about an hour.
            </p>
          </div>
        </div>
      </section>

      {/* ── VIDEO. Kept, it earns its place on the best performing page. ──── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ ...H2, maxWidth: '22ch' }}>
              The exemption in two minutes
            </h2>
            <div className="rounded-2xl overflow-hidden mx-auto w-full" style={{ marginTop: '18px' }}>
              <div className="block sm:hidden" style={{ aspectRatio: '9/16', maxWidth: '360px', margin: '0 auto' }}>
                <iframe
                  src="https://www.youtube.com/embed/oj7ZSOHAxJk"
                  title="Medicare levy exemption explained"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              </div>
              <div className="hidden sm:block" style={{ aspectRatio: '16/9', maxWidth: '720px', margin: '0 auto' }}>
                <iframe
                  src="https://www.youtube.com/embed/oj7ZSOHAxJk"
                  title="Medicare levy exemption explained"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '18px' }}>
              Common questions about the levy and the exemption
            </h2>

            {/* Four of these six answers run past 55 words and every sentence in
                them carries a rate, a country or a rule, so none can be cut to
                one short paragraph. The blank lines in them are turned into
                paragraph breaks by the shared Accordion, which keeps this page,
                /superannuation and the German and Japanese versions on the same
                component. faqSchema above is built from the raw string, so the
                structured data is unchanged. */}
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES ─────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '16px' }}>
            Go deeper on Medicare and health cover
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {[
              { href: '/blog/medicare-levy-working-holiday-makers', label: 'The Medicare levy exemption for working holiday makers' },
              { href: '/blog/countries-with-medicare-agreement-australia', label: 'Which countries have a health care agreement with Australia' },
              { href: '/blog/what-is-medicare-working-holiday-makers', label: 'What Medicare is, and who is actually covered' },
              { href: '/blog/uk-medicare-reciprocal-agreement-australia', label: 'The UK agreement, and what it means for your return' },
              { href: '/blog/private-health-insurance-working-holiday-australia', label: 'Does private health cover change the levy?' },
              { href: '/uk-working-holiday-tax', label: 'UK passport holders: how the levy works for you' },
            ].map(g => (
              <Link key={g.href} href={g.href}
                className="block rounded-xl border border-ink/10 transition-colors hover:border-forest-500 hover:text-forest-500"
                style={{ padding: '16px', fontSize: '14px', lineHeight: 1.5, color: '#080F0D', minHeight: '44px' }}>
                {g.label}
              </Link>
            ))}
          </div>
        </div>
        </div>
      </section>

      <NextStep
        eyebrow="What is next"
        heading="The exemption is one line of a return, not the whole of it"
        body="Your residency position and your deductions are worth more. All three are worked out together."
        cta="How the return is prepared"
        href="/tax-return"
      />

      <MobileCta href={WA} lang="en" topic="medicare" />
    </>
  )
}
