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
// This page answers the transactional query: someone who has already decided
// they want help and wants to know what happens next. The homepage owns the
// informational side ("why not do this myself"), so nothing here repeats its
// hero, its three figures or the myGov comparison block. No price in the
// title, the description or the schema, and no claim to be a registered agent.
export const metadata: Metadata = {
  // The root layout appends " | Working Holiday Tax", so the base title is kept
  // short enough that the whole thing still fits a mobile SERP.
  title: 'Lodge Your Working Holiday Tax Return',
  description:
    'Passport and an Australian bank account, no payslips. We pull your ATO record, lodge the return, and the refund arrives in about 14 business days.',
  keywords: [
    'lodge tax return Australia backpacker',
    'working holiday tax return service',
    'lodge tax return from overseas',
    'tax return 417 visa',
    'tax return 462 visa',
    'how to lodge Australian tax return working holiday',
    'tax agent working holiday maker',
    'tax refund after leaving Australia',
    'previous year tax return Australia',
    'Australian tax return without payslips',
    'income statement ATO working holiday',
    'how long does an Australian tax refund take',
    'working holiday tax return UK',
    'working holiday tax return Germany',
    'working holiday tax return Japan',
  ],
  alternates: {
    canonical: '/tax-return',
    languages: {
      'en-AU': '/tax-return',
      de: '/de/tax-return',
      ja: '/ja/tax-return',
      'x-default': '/tax-return',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Lodging a working holiday tax return for 417 and 462 visa holders in Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/tax-return`,
    siteName: 'Working Holiday Tax',
    title: 'Lodge Your Working Holiday Tax Return (417 & 462)',
    description:
      'Your details and where to deposit your refund. We read the ATO record, prepare the return, you sign it, it is lodged, and the refund lands in about 14 business days.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Lodge Your Working Holiday Tax Return (417 & 462)',
    description: 'Passport, bank details, no payslips. Signed by you, lodged by us, refund in about 14 business days.',
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

/** Everything the visitor has to supply. Three items, and nothing else. */
const NEEDED = [
  {
    label: 'Your passport and visa',
    body: 'Which passport you hold and which subclass you were on. It shapes everything, so we ask first.',
  },
  {
    label: 'An Australian bank account',
    body: 'The ATO pays refunds into an Australian account only. If yours is already closed, say so at the start.',
  },
  {
    label: 'Roughly where and when you worked',
    body: 'A town, the kind of work, rough months. We match it against the ATO record and fill in the rest.',
  },
]

/** The sequence, in the order it happens, with the waiting written in. */
const SEQUENCE = [
  {
    n: '01',
    title: 'You message us',
    body: 'WhatsApp, in English, German or Japanese. You tell us roughly what the year looked like, we tell you where you stand, and the fee is agreed before any work begins. Most messages are answered inside an hour during business hours.',
  },
  {
    n: '02',
    title: 'One questionnaire, about ten minutes',
    body: 'Passport and visa details, bank details, the towns and the kind of work. It is the only form you fill in, and you fill it in once. If something in it does not apply to your year, leave it and we will ask.',
  },
  {
    n: '03',
    title: 'We open your ATO record',
    body: 'Every employer who reported you, every income statement, every dollar withheld, and any earlier year still sitting open. Forgotten jobs and weeks taxed at the top rate almost always surface here rather than in anything you remember.',
  },
  {
    n: '04',
    title: 'The judgements that move the number',
    body: 'Residency for the year, the weeks withheld before your tax file number arrived, whether the Medicare levy was ever yours to pay, and what your line of work is allowed to claim. This is the slow part, and it is the part you are paying for.',
  },
  {
    n: '05',
    title: 'You read it and sign',
    body: 'We send you the finished return with each figure explained in ordinary language, and nothing goes to the ATO until you have read it and signed the declaration. Signing is electronic, so it works from a phone in another hemisphere.',
  },
  {
    n: '06',
    title: 'It is lodged',
    body: 'Reviewed and signed off by a registered tax agent before it is lodged with the ATO. Lodgement itself takes minutes and you do not have to be awake for it.',
  },
  {
    n: '07',
    title: 'The ATO pays',
    body: 'Refunds usually land about 14 business days after lodgement, straight into the Australian account you gave us. If the ATO queries something first, we answer it and tell you what was asked. Either way you hear from us.',
  },
]

/** Two rules that change the order of operations, so they belong before step 01. */
const RULES = [
  {
    label: 'The refund can only go to an Australian account',
    body: 'Superannuation (DASP) can be paid to an overseas account. A tax refund cannot. If you are about to close your Australian bank account, wait until the refund has landed, or tell us before you do.',
  },
  {
    label: 'Earlier years are still claimable',
    body: 'A financial year you never lodged for does not expire quietly. Each year is its own return and its own refund, and we work through them oldest first so nothing is left half finished.',
  },
]

const FAQS = [
  {
    question: 'How long does a working holiday tax return take?',
    answer:
      'From the day your questionnaire is in, a straightforward year takes a few days to prepare and check. Once it is lodged, the ATO usually pays the refund in about 14 business days. A year with five employers, income invoiced under an ABN, or a residency position that has to be argued takes longer at our end, and we tell you which of those yours is rather than leaving you to guess.',
  },
  {
    question: 'Do you need my payslips?',
    answer:
      'No, and this is the thing people are most surprised by. Every employer who paid you through a payroll reported an income statement to the ATO, and that record is what a return is built from. Lost payslips, a job you cannot name and an employer who has since shut down are all normal starting points. The only paperwork worth digging out is receipts for work expenses, and if you do not have those either, describe the work and we will tell you what is claimable without them.',
  },
  {
    question: 'What do I actually have to do?',
    answer:
      'Three things. Answer the questionnaire once, read the return we send back, and sign it. That is your entire side of it. There is no government account to set up, no Australian identity check to pass and no ATO form for you to interpret, because the lodgement happens through us.',
  },
  {
    question: 'Can you lodge for me after I have already left Australia?',
    answer:
      'Yes, and a large share of the returns we lodge belong to people who are already home in the UK, Germany or Japan. The questionnaire, the signature and the lodgement are all online. The one thing that does not travel is the refund itself: the ATO can only pay it into an Australian bank account, while superannuation (DASP) can be paid overseas. If your Australian account is already closed, tell us in the first message.',
  },
  {
    question: 'What if I never lodged for an earlier year?',
    answer:
      'It can still be lodged now. Each financial year stands on its own, with its own return and its own refund, and we can see from the ATO record which years are still open. We work through them oldest first. A late return is not treated as a problem by the ATO as long as it arrives, and in most working holiday years the balance is owed to you rather than by you.',
  },
  {
    question: 'What happens if the return says I owe money instead?',
    answer:
      'Occasionally it does, most often where income was invoiced under an ABN and nothing was withheld from it along the way. You see that figure before anything is lodged, with an explanation of where it came from and what the ATO payment options are. Nothing is sent in without your signature, so there is no version of this where you find out afterwards.',
  },
]

const GUIDES = [
  {
    href: '/blog/how-to-lodge-tax-return-from-overseas',
    title: 'Lodging after you have left',
    desc: 'What still works from home, and the bank account rule that catches people out.',
  },
  {
    href: '/blog/tax-residency-working-holiday-makers',
    title: 'Are you a resident for tax purposes',
    desc: 'The judgement behind step 04, written out in full.',
  },
  {
    href: '/blog/tax-deductions-working-holiday-makers',
    title: 'What you can claim',
    desc: 'Deductions by the kind of work you did, rather than a generic list.',
  },
]

const WA_TR = waUrl({ topic: 'tax-return', lang: 'en' })

// ─── SHARED INLINE STYLES ───────────────────────────────────────────────
const KICKER: CSSProperties = { fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }
const BODY: CSSProperties = { fontSize: '15px', lineHeight: 1.58 }
const LEDE: CSSProperties = { fontSize: '16.5px', lineHeight: 1.62 }

export default function TaxReturnPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/tax-return#webpage`,
    url: `${SITE_URL}/tax-return`,
    name: 'Lodge Your Working Holiday Tax Return',
    description:
      'How an Australian tax return is lodged for a 417 or 462 working holiday visa holder: what we ask you for, what we check, how you sign it, and when the refund arrives.',
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/tax-return#service`,
    name: 'Working Holiday Tax Return Lodgement',
    serviceType: 'Tax return preparation and lodgement',
    description:
      'Australian tax returns for holders of 417 and 462 working holiday visas. Reviewed and signed off by a registered tax agent before lodgement with the ATO, including from overseas.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 and 462)' },
    availableLanguage: ['en', 'de', 'ja'],
    inLanguage: 'en-AU',
  }

  // The seven steps, published as a machine readable procedure. This is the
  // page's own schema type: the homepage does not claim a HowTo.
  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}/tax-return#howto`,
    name: 'How a working holiday tax return is lodged',
    description:
      'The order a 417 or 462 tax return is prepared and lodged in, from the first message to the refund arriving.',
    inLanguage: 'en-AU',
    totalTime: 'P14D',
    step: SEQUENCE.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
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
      { '@type': 'ListItem', position: 2, name: 'Tax Return', item: `${SITE_URL}/tax-return` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F2FAF7 100%)' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 pt-8 pb-11 lg:pt-12 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2" style={{ fontSize: '13px', color: '#4C6459', marginBottom: '10px' }}>
            <Link href="/" className="inline-flex items-center transition-colors hover:text-forest-500" style={{ minHeight: '44px' }}>Home</Link>
            <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>
            <span aria-current="page">Tax return</span>
          </nav>

          <p className="hero-animate" style={{ ...KICKER, color: '#16775C', marginBottom: '14px' }}>
            Working holiday visas 417 &amp; 462
          </p>

          <h1 className="font-serif font-black text-ink hero-animate"
            style={{ fontSize: 'clamp(30px, 5vw, 43px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: '16px' }}>
            <span style={{ display: 'block' }}>Your details and where to deposit your refund.{' '}</span>
            <span style={{ display: 'block', color: '#0B5240' }}>We take it from there.{' '}</span>
          </h1>

          <p className="hero-lede hero-animate-delay" style={{ ...LEDE, color: '#4C6459', maxWidth: '52ch', marginBottom: '26px' }}>
            No payslips, no myGov account, no form to decipher. One questionnaire, one signature, and the refund follows
            about 14 business days after lodgement.
          </p>

          <div className="hero-animate-delay-2">
            <WaLink href={WA_TR} position="hero" topic="tax-return" lang="en"
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

      {/* ── 2. WHAT WE NEED FROM YOU ─────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Your side of it</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '20ch', marginBottom: '12px' }}>
            What we need from you
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '30px' }}>
            Three things, and that is the list. People arrive expecting to assemble a folder, and the folder was never
            what was holding this up.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {NEEDED.map((item) => (
              <div key={item.label} style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15.5px', lineHeight: 1.35, marginBottom: '8px' }}>{item.label}</h3>
                <p style={{ ...BODY, color: '#2A3C34' }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[14px]" style={{ marginTop: '26px', padding: '20px 22px', background: '#F2FAF7', border: '1px solid #CDE3DB' }}>
            <p className="font-serif" style={{ fontSize: '19px', lineHeight: 1.45, color: '#0B5240', fontWeight: 700, marginBottom: '10px', maxWidth: '30ch' }}>
              You do not need payslips.
            </p>
            <p style={{ ...BODY, color: '#2A3C34', maxWidth: '62ch' }}>
              Every employer who put you on a payroll has already reported an income statement against your tax file
              number, and that is what a return is built from. It is all visible to us through the ATO. A shoebox of
              paper, a lost phone, a hostel job whose name you never quite learned: none of it stops anything. Receipts
              for work expenses are the one thing worth looking for, and if there are none, tell us what the work
              involved instead.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. THE SEQUENCE ──────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Start to finish</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            The order it happens in
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '30px' }}>
            Seven steps. You appear in two of them, at the start and again to sign. Everything between those two is
            ours, and you can go back to your life while it runs.
          </p>

          <ol className="flex flex-col" style={{ gap: '22px' }}>
            {SEQUENCE.map((s) => (
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

          <p style={{ ...BODY, color: '#4C6459', marginTop: '24px', maxWidth: '60ch' }}>
            More on step 04:{' '}
            <Link href="/abn" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>what an ABN changes</Link> if any of your income was invoiced rather than paid through a payroll.
          </p>
        </div>
      </section>

      {/* ── 4. TWO RULES BEFORE YOU START ────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '22ch', marginBottom: '14px' }}>
            Two rules change the order you do this in
          </h2>
          <p style={{ ...LEDE, color: '#4C6459', maxWidth: '54ch', marginBottom: '26px' }}>
            Both are easier to deal with at the beginning than halfway through.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {RULES.map((r) => (
              <div key={r.label} className="rounded-[14px]" style={{ padding: '20px 22px', border: '1px solid #E2EFE9', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(7,58,45,.06)' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15.5px', lineHeight: 1.35, marginBottom: '8px' }}>{r.label}</h3>
                <p style={{ ...BODY, color: '#2A3C34' }}>{r.body}</p>
              </div>
            ))}
          </div>
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
            Nothing is ever taken out of what the ATO sends you. The amount is settled with you on WhatsApp before step
            01, so by the time the questionnaire arrives there is nothing left to negotiate.
          </p>
        </div>
      </section>

      {/* ── 6. CTA ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 reveal">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '14px' }}>
            Start with a message, not a form
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '56ch', marginBottom: '24px' }}>
            Send the towns you worked in, roughly which months, and whether you ever invoiced under an ABN. That is
            enough for us to say which years are open and what your side of the work looks like. Two years since you flew
            home makes no difference to any of it.
          </p>
          <WaLink href={WA_TR} position="section" topic="tax-return" lang="en"
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
            The questionnaire, the checks and the order above were built around one visa year and nothing else, which is
            why so little is asked of you and why the awkward cases are not surprises. Reviewed and
            signed off by a registered tax agent before it is lodged with the ATO.
          </p>

          <GoogleReviews lang="en" />

          <div className="rounded-[12px] flex gap-3" style={{ marginTop: '28px', padding: '16px 18px', background: '#FDF0D5', border: '1px solid #F9D88A' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '1px' }}>
              <path d="M12 2L2 22h20L12 2z" stroke="#B8770C" strokeWidth="1.8" strokeLinejoin="round" />
              <line x1="12" y1="10" x2="12" y2="15" stroke="#B8770C" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="12" y1="18" x2="12.01" y2="18" stroke="#B8770C" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p style={{ ...BODY, color: '#2A3C34' }}>
              <strong style={{ color: '#080F0D' }}>Nobody legitimate will ask you for your myGov password.</strong>{' '}
              We never ask for it, at any step, because the lodgement route above does not use it. If a message asks you
              for those details, it did not come from us.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            What people ask before they send anything
          </h2>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="tax-return-faq" className="contact-faq-item">
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
            The longer version of the hard steps
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '24px' }}>
            If you would rather see the reasoning before you hand anything over, it is all written out.
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
        heading="Do not leave your super behind"
        body="Your employer paid superannuation on top of your wages while you worked here. When you leave Australia for good, it can be claimed, and it is a separate job from the return."
        cta="How the super claim works →"
        href="/superannuation"
      />

      <MobileCta href={WA_TR} lang="en" topic="tax-return" />
    </>
  )
}
