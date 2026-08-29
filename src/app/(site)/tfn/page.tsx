import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/(site)/HomeWa'

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

// ─── ICONS ──────────────────────────────────────────────────────────────
const IconWhatsApp = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.3-.9-2.8-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2 .9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
  </svg>
)

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
    title: 'We claim the gap back at the end of the year',
    body: 'Anything already withheld at 45% only comes back through a tax return, and only if the return says so.',
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
      'Your employer must withhold at 45% instead of the 15% working holiday maker rate until you give them a tax file number, and you have 28 days from starting the job. On a $25 an hour job that is roughly $7.50 an hour going to the ATO instead of you.\n\nThe money is not lost, but it only comes back through a tax return lodged correctly after the financial year ends.',
  },
  {
    question: 'I have already been working for weeks without a TFN. Is it too late?',
    answer:
      'No. Apply now so the top rate stops applying to future pay. The excess already withheld comes back when your tax return is lodged for that financial year.\n\nWe can usually have an application ready the same day you message us. Tell us how many weeks have already been paid at 45%, because it changes what your return needs to say.',
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
    desc: 'The 45% withholding, the 28 day window, and how the money comes back.',
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

// ─── SHARED INLINE STYLES ───────────────────────────────────────────────
const KICKER: CSSProperties = { fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }
const BODY: CSSProperties = { fontSize: '15px', lineHeight: 1.58 }
const LEDE: CSSProperties = { fontSize: '16.5px', lineHeight: 1.62 }

export default function TFNPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/tfn#webpage`,
    url: `${SITE_URL}/tfn`,
    name: 'TFN for a Working Holiday Visa',
    description:
      'What it costs to work before your tax file number reaches your employer, why working holiday TFN applications fail, and how the excess withheld comes back.',
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
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F2FAF7 100%)' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 pt-8 pb-11 lg:pt-12 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2" style={{ fontSize: '13px', color: '#4C6459', marginBottom: '10px' }}>
            <Link href="/" className="inline-flex items-center transition-colors hover:text-forest-500" style={{ minHeight: '44px' }}>Home</Link>
            <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>
            <span aria-current="page">TFN</span>
          </nav>

          <p className="hero-animate" style={{ ...KICKER, color: '#16775C', marginBottom: '14px' }}>
            Working holiday visas 417 &amp; 462
          </p>

          <h1 className="font-serif font-black text-ink hero-animate"
            style={{ fontSize: 'clamp(31px, 5.2vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: '16px' }}>
            <span style={{ display: 'block' }}>The number is free.{' '}</span>
            <span style={{ display: 'block', color: '#0B5240' }}>The weeks without it are not.{' '}</span>
          </h1>

          <p className="hero-lede hero-animate-delay" style={{ ...LEDE, color: '#4C6459', maxWidth: '50ch', marginBottom: '26px' }}>
            Until your employer has the number, 45% of your pay is withheld instead of 15%.
          </p>

          <div className="hero-animate-delay-2">
            <WaLink href={WA_TFN} position="hero" topic="tfn" lang="en"
              className="btn-primary inline-flex items-center justify-center gap-2"
              style={{ height: '54px', padding: '0 32px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '330px', width: '100%' }}>
              <IconWhatsApp />
              Message us on WhatsApp
            </WaLink>
            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
              Replies in about an hour.
            </p>
          </div>

          <div className="flex" style={{ marginTop: '20px' }}>
            <GoogleRating variant="pill" lang="en" />
          </div>
        </div>
      </section>

      {/* ── 2. WHAT THE GAP COSTS ────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '22ch', marginBottom: '16px' }}>
            What does it cost to start work before your TFN arrives?
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '60ch', marginBottom: '28px' }}>
            If your employer does not have your TFN within 28 days, they must withhold 45% instead of the 15% Working
            Holiday Maker rate. The extra tax is not lost and may come back when you lodge your tax return after 30 June.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
              <p className="font-serif font-black text-forest-500" style={{ fontSize: '33px', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '10px' }}>45%</p>
              <p style={{ ...BODY, color: '#2A3C34' }}>Withheld from every dollar while no TFN is on file, instead of fifteen.</p>
            </div>
            <div style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
              <p className="font-serif font-black text-forest-500" style={{ fontSize: '33px', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '10px' }}>28 days</p>
              <p style={{ ...BODY, color: '#2A3C34' }}>To give your employer your TFN, and for the ATO to issue it.</p>
            </div>
            <div style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
              <p className="font-serif font-black text-forest-500" style={{ fontSize: '33px', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '10px' }}>1 return</p>
              <p style={{ ...BODY, color: '#2A3C34' }}>The only route back for anything already withheld at the wrong rate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHERE IT GOES WRONG ───────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Doing it yourself</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Why do working holiday TFN applications fail?
          </h2>
          {/* The lede said "one of three issues" and then the list said the same
              thing three times over. What it keeps is the cost of each failure. */}
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '60ch', marginBottom: '30px' }}>
            The form is short. Each of the three ways it goes wrong can mean another month taxed at 45%.
          </p>

          <ol className="flex flex-col" style={{ gap: '22px' }}>
            {FAILURE_POINTS.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="font-serif font-black flex-shrink-0"
                  style={{ fontSize: '15px', color: '#16775C', width: '28px', paddingTop: '2px', letterSpacing: '-0.01em' }}
                  aria-hidden="true">{s.n}</span>
                <div>
                  <h3 className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.35, marginBottom: '6px' }}>{s.title}</h3>
                  <p style={{ ...BODY, color: '#2A3C34' }}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 4. WHAT WE DO ────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>The work</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            What we do about it
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '26px' }}>
            You send us your details on WhatsApp. Everything below happens on our side.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {WHAT_WE_DO.map((c) => (
              <div key={c.title} className="rounded-[12px]" style={{ padding: '16px 18px', background: '#F5F9F7', border: '1px solid #E2EFE9' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.35, marginBottom: '6px' }}>{c.title}</h3>
                <p style={{ ...BODY, color: '#2A3C34' }}>{c.body}</p>
              </div>
            ))}
          </div>

          <p className="font-serif" style={{ fontSize: '18px', lineHeight: 1.45, color: '#0B5240', marginTop: '22px', maxWidth: '46ch', fontWeight: 700 }}>
            You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly.
          </p>

          <p style={{ ...BODY, color: '#4C6459', marginTop: '18px', maxWidth: '60ch' }}>
            Already have the number and want the weeks at 45% back?{' '}
            <Link href="/tax-return" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>That is the tax return</Link>.
          </p>
        </div>
      </section>

      {/* ── 5. GUARANTEE ─────────────────────────────────────────────────── */}
      <section className="py-11 lg:py-14" style={{ background: '#0B5240' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 text-center reveal">
          <p style={{ ...KICKER, color: '#F9D88A', marginBottom: '14px' }}>Our guarantee</p>
          <p className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(23px, 3vw, 31px)', lineHeight: 1.24, letterSpacing: '-0.02em', maxWidth: '22ch' }}>
            If your refund is less than our fee, we refund the difference, so you are never out of pocket.
          </p>
          <p className="mx-auto" style={{ ...BODY, color: 'rgba(255,255,255,0.72)', maxWidth: '52ch', marginTop: '16px' }}>
            The fee is flat and never a percentage of what comes back.
          </p>
        </div>
      </section>

      {/* ── 6. CTA ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 reveal">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '20ch', marginBottom: '16px' }}>
            Tell us where you are up to
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '56ch', marginBottom: '24px' }}>
            Whether you have landed, whether you have started a job, and whether anything has already been paid at
            45%. Three answers and we can tell you what to do next.
          </p>
          <WaLink href={WA_TFN} position="section" topic="tfn" lang="en"
            className="btn-primary inline-flex items-center justify-center gap-2"
            style={{ height: '54px', padding: '0 32px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '330px', width: '100%' }}>
            <IconWhatsApp />
            Message us on WhatsApp
          </WaLink>
          <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
            Replies in about an hour.
          </p>
        </div>
      </section>

      {/* ── 7. TRUST ─────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">
          <h2 className="font-serif font-black text-ink text-center"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Working holiday tax is the only thing we do.
          </h2>
          <p className="text-center mx-auto" style={{ ...BODY, color: '#2A3C34', maxWidth: '58ch', marginBottom: '28px' }}>
            Every TFN application we lodge belongs to somebody on a 417 or 462 visa. Returns are reviewed and signed
            off by a registered tax agent before they are lodged with the ATO.
          </p>
          <GoogleReviews lang="en" />
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            TFN questions people ask before they message us
          </h2>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="tfn-faq" className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                {/* Split on a blank line so a long answer reads as two short
                    paragraphs. faqLd above still uses the raw string. */}
                {f.answer.split('\n\n').map((para, j) => (
                  <p key={j} className="contact-faq-answer" style={{ fontSize: '15px' }}>{para}</p>
                ))}
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. GUIDES ────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">
          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Guides</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            More on the TFN and the 45% weeks
          </h2>
          {/* The lede listed the three cards that follow it. The cards do that. */}

          <div className="grid gap-3 sm:grid-cols-3">
            {GUIDES.map((g) => (
              <Link key={g.href} href={g.href}
                className="group bg-white rounded-[12px] transition-all hover:shadow-lg"
                style={{ padding: '16px 18px', border: '1px solid #E2EFE9', display: 'block' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '4px' }}>{g.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#4C6459' }}>{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NextStep
        eyebrow="What is next"
        heading="The weeks at 45% come back through a return"
        body="Once the number is on file, the tax return is what claims the excess back."
        cta="How the return works →"
        href="/tax-return"
      />

      <MobileCta href={WA_TFN} lang="en" topic="tfn" />
    </>
  )
}
