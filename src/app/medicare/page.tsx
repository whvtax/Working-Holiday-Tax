import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '../HomeWa'
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
      'en-AU': '/medicare',
      'de': '/de/medicare',
      'ja': '/ja/medicare',
      'x-default': '/medicare',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/medicare`,
    siteName: 'Working Holiday Tax',
    title: 'Medicare Levy Exemption for 417 and 462 Visa Holders',
    description: 'The 2% levy comes off by default. Who is exempt, and the certificate the exemption needs.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
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
    us: 'We settle that question before the return goes in, rather than after the assessment lands.',
  },
  {
    mygov: 'Nothing on the screen mentions that your passport country, not your visa, is what decides it.',
    us: 'Whether Australia has a reciprocal health care agreement with your country is the whole question, and it is the first one we ask.',
  },
  {
    mygov: 'Taking the levy off needs an exemption certificate, applied for separately and not through the return at all.',
    us: 'We apply for the certificate, wait on it, and lodge so the exemption is actually claimed for the right year.',
  },
  {
    mygov: 'The exemption box is there whether you hold the certificate or not.',
    us: 'We only claim it with the evidence behind it, which is what makes the claim stand up later.',
  },
]

const faqs = [
  {
    question: 'Can I not just do this myself on myGov?',
    answer:
      'You can lodge the return yourself, and lodging is the easy part. The difficulty with the Medicare levy is that nothing in the lodgement flow tells you the levy may not have been yours to pay. What decides whether you owed it is not your visa but whether your passport country has a reciprocal health care agreement with Australia, and removing it is not a tick box either: it needs a Medicare Entitlement Statement, which is applied for separately from Services Australia and takes time to come back. Claiming the exemption without that statement behind it is the version that gets queried. You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly.',
  },
  {
    question: 'How much is the Medicare levy exemption actually worth?',
    answer:
      'The levy is 2% of taxable income, so it is about $500 on $25,000 earned and about $1,000 on $50,000. It is settled when your return is assessed rather than taken out of your wages week by week, so the exemption claimed in the return is what puts the money back, and it is the same money whether you noticed losing it or not.',
  },
  {
    question: 'Does every 417 or 462 visa holder get the exemption?',
    answer:
      'Most do, but not all, and the deciding factor is your passport rather than your visa. Eleven countries hold a reciprocal health care agreement with Australia, the United Kingdom, Ireland and Italy among them, and a national of one of those is generally entitled to Medicare here. Entitlement is what removes the exemption, whether or not you ever enrolled or used it. Germany and Japan hold no agreement, so the exemption is normally available to working holiday makers from either.',
  },
  {
    question: 'What is a Medicare Entitlement Statement and do you need one?',
    answer:
      'A Medicare Entitlement Statement is a document from Services Australia confirming that you were not entitled to Medicare for a stated period. It is the evidence behind the exemption, and the ATO can ask to see it, so an exemption claimed without one is a claim you cannot support. Applying for it is a separate process from lodging your tax return and it takes time to come back, which is the main reason people skip the exemption entirely.',
  },
  {
    question: 'Can you claim the exemption for only part of the year?',
    answer:
      'Yes, and for a lot of working holiday makers that is the correct answer rather than a full year exemption. The exemption is worked out in days, so if you arrived in November, or if your circumstances changed partway through, only the days you were not entitled to Medicare are exempt. Claiming a full year when only part of it applies is the kind of error that gets a return amended later.',
  },
  {
    question: 'Does travel insurance or private health cover change any of this?',
    answer:
      'No. Travel insurance and private hospital cover are separate from Medicare and have no bearing on the levy or the exemption. The levy is a tax question about entitlement to the public system, not a question about whether you are insured. Private hospital cover matters for a different charge, the Medicare levy surcharge, which applies at high incomes and is rarely relevant on a working holiday.',
  },
  {
    question: 'What happens if the levy was already taken during the year?',
    answer:
      'Nothing is lost. The levy is calculated when your tax return is assessed, not when you are paid, so what came out of your wages during the year was tax withheld generally rather than the levy specifically. Claiming a valid exemption removes the levy from the assessment, which increases your refund or reduces what you owe. If a previous year was lodged without the exemption and you were entitled to it, that return can usually be amended.',
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
  marginBottom: '12px',
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

          <div className="max-w-[680px]">

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
          <div className="max-w-[680px]">

            <p className="font-medium uppercase"
              style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#16775C', marginBottom: '12px' }}>
              Doing it yourself
            </p>

            <h2 className="font-serif font-black text-ink" style={H2}>
              <span style={{ display: 'block', color: '#2A3C34', fontWeight: 400 }}>Nobody asks whether the levy was ever yours.{' '}</span>
              <span style={{ display: 'block' }}>myGov applies it and moves on.{' '}</span>
            </h2>

            <p style={{ ...BODY, color: '#4C6459', maxWidth: '56ch', marginBottom: '20px' }}>
              It is 2% of taxable income, about $500 on a $25,000 year. It never appears on a payslip, which is why
              almost nobody notices paying it.
            </p>

            <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
              {MYGOV.map((row, i) => (
                <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                  <div style={{ padding: '15px 18px', background: '#FFFFFF' }}>
                    <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#4C6459', marginBottom: '5px' }}>
                      On myGov
                    </p>
                    <p style={{ ...BODY, marginBottom: 0, overflowWrap: 'break-word' }}>{row.mygov}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                    style={{ padding: '15px 18px', background: '#F2FAF7' }}>
                    <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240', marginBottom: '5px' }}>
                      With us
                    </p>
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
          <div className="max-w-[680px]">
            <h2 className="font-serif font-black text-ink" style={H2}>
              Why is the levy on your assessment at all?
            </h2>
            <p style={BODY}>
              Because it is the default. The Medicare levy is applied to your taxable income when the ATO
              assesses your return, and it comes off unless an exemption is claimed. Nothing in the process
              asks whether you were entitled to Medicare, and nothing prompts you at the point where it
              matters, so the commonest outcome is that a working holiday maker pays 2% of a year's income
              towards a system they were never able to use.
            </p>
            <p style={BODY}>
              The second commonest outcome is worse in a quiet way: the exemption is ticked without the
              statement that backs it. The exemption is evidenced by a Medicare Entitlement Statement from
              Services Australia, which is a separate application to a separate agency, and it takes time
              to come back. Claiming without it leaves a return that cannot be supported if the ATO asks,
              which is the kind of thing that surfaces a year later when you are no longer in the country.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE DETERMINANT ────────────────────────────────────────────────── */}
      <section id="who-is-exempt" className="py-8 lg:py-11" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px]">
            <h2 className="font-serif font-black text-ink" style={H2}>
              Who is exempt from the Medicare levy?
            </h2>
            <p style={BODY}>
              You are generally exempt if you were not entitled to Medicare, and on a working holiday visa
              that comes down to your passport. Australia has reciprocal health care agreements with eleven
              countries. A national of one of those is generally entitled to Medicare while here, which
              removes the exemption even if you never enrolled and never used it, because the test is
              entitlement rather than use. Everybody else, Germany and Japan included, is normally not
              entitled and can claim the exemption for the days that applies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[880px]" style={{ marginTop: '20px' }}>
            <div className="rounded-2xl" style={{ padding: '20px', background: '#fff', border: '1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '8px' }}>
                From an agreement country
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#2A3C34', marginBottom: '12px' }}>
                Generally entitled to Medicare, so generally not exempt. We make sure the levy is applied
                correctly rather than twice, and check whether any part of the year was different.
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
                group, and together they are a large share of the people reading this page.
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
          <div className="max-w-[680px]">
            <h2 className="font-serif font-black text-ink" style={H2}>
              What do we do about it?
            </h2>
            <p style={BODY}>
              We work out whether you were entitled to Medicare and for which part of the year, which is a
              question about your nationality, your visa and your dates rather than a box to tick. Where
              you were not entitled, we apply for the Medicare Entitlement Statement on your behalf, and we
              claim the exemption in your return for the correct number of days, so the figure holds up if
              it is ever looked at.
            </p>
            <p style={BODY}>
              It is part of the return rather than a separate job, worked out alongside your residency
              position and what your line of work can deduct.
            </p>

            <div className="rounded-2xl" style={{ padding: '20px', background: '#F5F9F7', border: '1.5px solid #C8EAE0', margin: '20px 0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.5, marginBottom: '8px' }}>
                If your refund is less than our fee, we refund the difference, so you are never out of pocket.
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
          <div className="max-w-[760px]">
            <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '18px' }}>
              Common questions about the levy and the exemption
            </h2>
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES ─────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '16px' }}>
            Go deeper on Medicare and health cover
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px]">
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
