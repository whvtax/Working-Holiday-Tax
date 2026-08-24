import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/HomeWa'

// ─── METADATA ───────────────────────────────────────────────────────────
// This page owns the split: what an ABN changes about the return itself.
// No price anywhere, and no title or keyword that asserts we are a tax agent.
export const metadata: Metadata = {
  // The root layout appends " | Working Holiday Tax", so the base title is kept
  // short enough that the whole thing still fits a mobile SERP.
  title: 'Working Holiday ABN: What It Changes',
  description:
    'An ABN changes what your tax return has to say. Invoiced income with nothing withheld, business expenses, GST, and whether you were a contractor at all.',
  keywords: [
    'ABN registration Australia',
    'ABN working holiday',
    'ABN application Australia',
    'Australian Business Number backpacker',
    'sole trader ABN 417',
    'sole trader ABN 462',
    'ABN for contractors WHV',
    'register ABN backpacker',
    'ABN for working holiday tax return',
    'ABN tax obligations backpacker',
    'do I need an ABN working holiday',
    'ABN vs TFN working holiday',
    'employee vs contractor Australia backpacker',
    'ABN business expenses working holiday',
    'GST threshold ABN working holiday',
    'sham contracting Australia working holiday',
  ],
  alternates: {
    canonical: '/abn',
    languages: {
      'en-AU': '/abn',
      de: '/de/abn',
      ja: '/ja/abn',
      'x-default': '/abn',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'ABN registration for working holiday makers in Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/abn`,
    siteName: 'Working Holiday Tax',
    title: 'ABN on a Working Holiday Visa: What It Changes',
    description:
      'An ABN does not change your job. It changes your tax return. Invoiced income, business expenses, GST, and the employee versus contractor question.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'ABN on a Working Holiday Visa: What It Changes',
    description: 'An ABN does not change your job. It changes your tax return.',
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

/** The four things an ABN changes about the return. This is the page. */
const THE_SPLIT = [
  {
    n: '01',
    title: 'Nothing was withheld, so the tax is still owed',
    body: 'Wages arrive with tax already taken out. Invoices do not. Every dollar paid against your ABN reaches you whole, and the tax on it is settled once, at the end of the year. The payslip half of a mixed year looks like a refund, and the invoice half quietly is not.',
  },
  {
    n: '02',
    title: 'Deductions become business expenses, and the rules differ',
    body: 'As an employee you claim work related expenses. As a sole trader you deduct the costs of running the business, a wider category with tighter records behind it. The delivery rider who never logged a kilometre and the one who did will not end the year in the same place.',
  },
  {
    n: '03',
    title: 'GST is a position, not a formality',
    body: 'Most working holiday makers never approach the $75,000 turnover line, so most should not be registered. Rideshare is the exception that catches people, and getting the position wrong means BAS obligations you did not need, or worse, ones you missed.',
  },
  {
    n: '04',
    title: 'Whether you were a contractor at all',
    body: 'This is the one that decides the other three. Whether you were really contracting turns on control rather than on the paperwork, and an ABN over work that was always employment is the most common reason a backpacker return has to be reworked. There is more on it further down this page.',
  },
]

const WHAT_WE_DO = [
  {
    title: 'We check you need one before you get one',
    body: 'Plenty of people register an ABN for a job that was always employment. That is a conversation, not a form.',
  },
  {
    title: 'We register it against the work you actually do',
    body: 'The business activity you declare follows you into GST, deductions and the return. It is worth getting right once.',
  },
  {
    title: 'We tell you what to put aside',
    body: 'Roughly what the invoiced income will cost you at tax time, so the bill is not a surprise in October.',
  },
  {
    title: 'We tell you what to keep',
    body: 'Which records actually support a deduction for your line of work, and which receipts you can stop hoarding.',
  },
  {
    title: 'We take the GST position deliberately',
    body: 'Registered because the rules require it, or not registered because they do not. Never by accident.',
  },
  {
    title: 'We put both halves on one return',
    body: 'Payslip income and invoiced income belong on the same return, reconciled against the same year.',
  },
]

const FAQS = [
  {
    question: 'Can I just do this myself?',
    answer:
      'You can, and if your whole year was payslips it is straightforward. An ABN is what makes it stop being straightforward: where the line falls between wages and invoiced income, whether you were a contractor at all, which of your costs come off the invoiced side and what has to sit behind them, and whether you were required to register for GST. Those are judgements about your year rather than fields to fill in, and getting them wrong is the most common reason a backpacker return has to be done again.',
  },
  {
    question: 'How does an ABN change my working holiday tax return?',
    answer:
      'Wages reach you with tax already withheld and an income statement your employer files with the ATO, so that half of the year largely reconciles itself. Income invoiced under an ABN arrives untaxed, is declared as business income, and is reduced only by expenses you can evidence. Add the GST position and the question of whether the arrangement was really contracting, and both halves still have to land on one return.',
  },
  {
    question: 'My employer says I need an ABN for a normal shift job. Is that right?',
    answer:
      'Usually not, and it is worth pushing back before you register. If they set your roster, tell you how the work is done, provide the tools and can send you home early, you are being treated as an employee, whatever the paperwork says. Putting you on an ABN moves the cost onto you: no tax withheld, no superannuation contributions, no workers compensation cover, and no minimum wage or penalty rates. Send us the job details before you agree to anything.',
  },
  {
    question: 'Do I need to register for GST on a working holiday visa?',
    answer:
      'Only if your turnover reaches $75,000 in a year, which most working holiday makers do not come close to, or if you drive rideshare. Anyone providing taxi travel or ride sourcing, which includes Uber and its competitors, must register for GST from the very first fare regardless of how little they earn. Food delivery riders and couriers are not caught by that rule and fall back on the $75,000 threshold. Registration brings quarterly business activity statements with it, so it is not something to opt into casually.',
  },
  {
    question: 'Can I have both a TFN and an ABN?',
    answer:
      'Yes, and most working holiday makers who contract end up with both. The tax file number covers you as an employee and the ABN covers you as a sole trader, and there is nothing irregular about earning under each in the same year. They do not go on separate returns: one return covers the financial year and reports both. You need the tax file number first, because an ABN application is matched against it.',
  },
  {
    question: 'What can I claim as business expenses under an ABN?',
    answer:
      'The costs of earning the income, apportioned honestly where something is used privately as well. For a delivery rider that usually means kilometres recorded properly, bike or vehicle running costs, phone and data, insurance, equipment and the commission a platform took before paying you. For a subcontractor on a site it is tools, protective gear and travel between jobs. It never includes the trip to Australia, ordinary commuting from home to one workplace, or anything you cannot show a record for.',
  },
  {
    question: 'What happens to my ABN when I leave Australia?',
    answer:
      'You cancel it once you have stopped trading, because an active ABN suggests to the ATO that you are still running a business and may still have obligations. Cancelling does not affect the return for the year you did work, which still has to be lodged, and it does not affect your ability to claim superannuation from employment income in the same period. If you are leaving soon, tell us early, because the order of cancelling, lodging and claiming super matters.',
  },
]

const GUIDES = [
  {
    href: '/blog/employee-vs-contractor-australia',
    title: 'Employee or contractor',
    desc: 'The test the ATO actually applies, and what it costs you to be on the wrong side of it.',
  },
  {
    href: '/blog/abn-deductions-business-expenses',
    title: 'ABN deductions and business expenses',
    desc: 'What a sole trader can deduct, by the kind of work, and the records behind each one.',
  },
  {
    href: '/blog/gst-and-abn-for-working-holiday-makers',
    title: 'GST and your ABN',
    desc: 'The $75,000 threshold, the rideshare exception, and what registering commits you to.',
  },
]

// The myGov comparison table that used to sit here was removed: its four rows
// were the four items of THE_SPLIT and of WHAT_WE_DO again, and the contractor
// row has a whole section of its own. The "you will never log into myGov"
// promise moved to the end of the WHAT_WE_DO section.

const WA_ABN = waUrl({ topic: 'abn', lang: 'en' })

// ─── SHARED INLINE STYLES ───────────────────────────────────────────────
const KICKER: CSSProperties = { fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }
const BODY: CSSProperties = { fontSize: '15px', lineHeight: 1.58 }
const LEDE: CSSProperties = { fontSize: '16.5px', lineHeight: 1.62 }

export default function ABNPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/abn#webpage`,
    url: `${SITE_URL}/abn`,
    name: 'ABN on a Working Holiday Visa',
    description:
      'What an ABN changes about an Australian tax return for a working holiday maker: untaxed invoiced income, business expenses, the GST position and the employee versus contractor question.',
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/abn#service`,
    name: 'ABN Registration for Working Holiday Makers',
    serviceType: 'Australian Business Number registration',
    description:
      'ABN registration for holders of 417 and 462 working holiday visas doing genuine contract work, with the GST position, record keeping and tax consequences set out before registration.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 and 462) working as a sole trader' },
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
      { '@type': 'ListItem', position: 2, name: 'ABN Registration', item: `${SITE_URL}/abn` },
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
            <span aria-current="page">ABN</span>
          </nav>

          <p className="hero-animate" style={{ ...KICKER, color: '#16775C', marginBottom: '14px' }}>
            Working holiday visas 417 &amp; 462
          </p>

          <h1 className="font-serif font-black text-ink hero-animate"
            style={{ fontSize: 'clamp(31px, 5.2vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: '16px' }}>
            <span style={{ display: 'block' }}>An ABN does not change your job.{' '}</span>
            <span style={{ display: 'block', color: '#0B5240' }}>It changes your tax return.{' '}</span>
          </h1>

          <p className="hero-lede hero-animate-delay" style={{ ...LEDE, color: '#4C6459', maxWidth: '50ch', marginBottom: '26px' }}>
            Untaxed income, business expenses, a GST position, and one question underneath all three: were you a
            contractor at all, or an employee whose employer moved the cost onto you.
          </p>

          <div className="hero-animate-delay-2">
            <WaLink href={WA_ABN} position="hero" topic="abn" lang="en"
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

      {/* ── 2. THE SPLIT ─────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>The split</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '22ch', marginBottom: '14px' }}>
            What changes on your return once you have an ABN?
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '60ch', marginBottom: '30px' }}>
            Four things, and they compound. Half payslips and half invoices is not two simple halves. It is one return
            that has to reconcile both.
          </p>

          <ol className="flex flex-col" style={{ gap: '22px' }}>
            {THE_SPLIT.map((s) => (
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

      {/* ── 3. THE WARNING ───────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '24ch', marginBottom: '14px' }}>
            Should you register an ABN because an employer asked you to?
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '60ch', marginBottom: '16px' }}>
            Not before somebody has looked at the job. An ABN over work that is really employment stops your
            superannuation, stops your tax being withheld, drops workers compensation cover and puts you outside minimum
            wage and penalty rates, and all of it becomes your cost. It is common in farm work, hospitality, cleaning
            and on building sites, and it is presented as the way things are done here.
          </p>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '60ch', marginBottom: '22px' }}>
            The test is control, not paperwork. Who decides when you work, who directs how it is done, who supplies the
            equipment, whether you could send someone else in your place, and who carries the risk if the job goes badly.
            If the answers point at them rather than at you, an ABN is the wrong instrument, and it costs you real money
            over a season.
          </p>

          <div className="rounded-[12px] flex gap-3" style={{ padding: '16px 18px', background: '#FDF0D5', border: '1px solid #F9D88A' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '1px' }}>
              <path d="M12 2L2 22h20L12 2z" stroke="#B8770C" strokeWidth="1.8" strokeLinejoin="round" />
              <line x1="12" y1="10" x2="12" y2="15" stroke="#B8770C" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="12" y1="18" x2="12.01" y2="18" stroke="#B8770C" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p style={{ ...BODY, color: '#2A3C34' }}>
              <strong style={{ color: '#080F0D' }}>Send us the job before you register.</strong>{' '}
              What the work involves, who supplies what, and how you are told you will be paid. We will tell you which
              of the two it is, and we will say so even when the answer is that you do not need us.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT WE DO ────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>The work</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '14px' }}>
            What we do about it
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '26px' }}>
            Registration itself is free and takes minutes. Everything that decides what it costs you happens either side
            of it.
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
            No ABN yet and no tax file number either? The{' '}
            <Link href="/tfn" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>TFN comes first</Link>, because an
            ABN application is matched against it.
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
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '14px' }}>
            Tell us what the work looks like
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '56ch', marginBottom: '24px' }}>
            Who you would be invoicing, what you would be doing, and who supplies the equipment. That is enough for us to
            tell you whether an ABN belongs in this at all.
          </p>
          <WaLink href={waUrl({ topic: 'abn', lang: 'en', tier: 'tfn-abn' })} position="section" topic="abn" lang="en" tier="tfn-abn"
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
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Working holiday tax is the only thing we do.
          </h2>
          <p className="text-center mx-auto" style={{ ...BODY, color: '#2A3C34', maxWidth: '58ch', marginBottom: '28px' }}>
            Which means we see the same ABN arrangements over and over: the farm contract, the delivery platform, the
            site that pays everyone as a subcontractor.
          </p>
          <GoogleReviews lang="en" />
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            ABN questions people ask before they message us
          </h2>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="abn-faq" className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="contact-faq-answer" style={{ fontSize: '15px' }}>{f.answer}</p>
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
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            More on contracting, expenses and GST
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '24px' }}>
            The contractor test in full, what a sole trader can deduct, and where GST starts.
          </p>

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
        heading="Both halves land on one return"
        body="Payslip income and invoiced income belong on the same tax return for the same year. That is where the split is either handled properly or not."
        cta="How the return works →"
        href="/tax-return"
      />

      <MobileCta href={WA_ABN} lang="en" topic="abn" />
    </>
  )
}
