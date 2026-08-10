import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep, RelatedServices } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Cleaner Tax Deductions Australia: ABN, Equipment & Between-Job Travel',
  description: 'House cleans, end-of-lease jobs and Airtasker work are usually ABN sole trader income. Commercial and office cleaning rostered by a cleaning company is usually TFN employment under the Cleaning Services Award. What each side can claim on equipment, uniforms, laundry and travel between jobs, and when GST registration kicks in.',
  keywords: [
    'cleaner tax deductions Australia',
    'house cleaner tax ABN',
    'end of lease cleaner tax deductions',
    'commercial cleaner tax Australia',
    'office cleaner tax deductions',
    'Airtasker cleaner tax working holiday',
    'Cleaning Services Award tax',
    'ABN or TFN cleaner',
    'cleaning equipment tax deduction ATO',
    'working holiday cleaner tax',
    '417 462 visa cleaner tax',
    'backpacker cleaning job tax return',
    'residential cleaner tax deductions',
    'cleaning products tax deductible',
  ],
  alternates: {
    canonical: `${SITE_URL}/expenses/cleaners`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/cleaners`,
      'de': `${SITE_URL}/de/expenses/cleaners`,
      'ja': `${SITE_URL}/ja/expenses/cleaners`,
      'x-default': `${SITE_URL}/expenses/cleaners`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/expenses/cleaners`,
    siteName: 'Working Holiday Tax',
    title: 'Cleaner Tax Deductions Australia: ABN, Equipment & Between-Job Travel',
    description: 'House cleans and app-based work are usually ABN sole trader income; commercial cleaning rostered by a company is usually TFN employment. What each side of that split can claim on tax.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Cleaner Tax Deductions Australia: ABN, Equipment & Between-Job Travel',
    description: 'House cleans and app-based work are usually ABN sole trader income; commercial cleaning rostered by a company is usually TFN employment. What each side of that split can claim on tax.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const UNDER_300_ROWS = [
  ['How it is claimed', 'In full, straight away'],
  ['When you claim it', 'The year you buy it'],
  ['Example', 'A $70 mop, bucket and wringer set'],
]

const OVER_300_ROWS = [
  ['How it is claimed', 'Spread over its effective life'],
  ['When you claim it', 'A portion each year you own it'],
  ['Example', 'A $450 commercial-grade vacuum cleaner'],
]

const CAR_METHOD_ROWS = [
  ['Rate (2024-25 & 2025-26)', '88c / km'],
  ['Rate (2026-27, from 1 Jul 2026)', '91c / km'],
  ['Maximum claimable', '5,000 km / car / year'],
  ['Receipts required?', 'No, but you need to show how you worked out your kilometres'],
]

const LOGBOOK_ROWS = [
  ['How it works', 'Claim the work-related % of all actual running costs'],
  ['Logbook period', '12 continuous weeks, valid for 5 years'],
  ['Maximum claimable', 'No cap, based on your actual work-use percentage'],
  ['Receipts required?', 'Yes, for every expense you claim'],
]

const TRAVEL_CONDITIONS = [
  'The equipment is essential for the cleaning job you are doing that day.',
  'It is genuinely bulky - its size or weight is the actual reason a vehicle is needed to move it, not just convenience.',
  'There is nowhere secure to leave it at the workplace, so it has to travel home with you.',
]

const INVOICE_CHECKLIST = [
  'Your name or registered business name, exactly as it appears on your ABN.',
  'Your ABN, clearly shown on every invoice you send.',
  'The client’s name - the person or business who booked the clean.',
  'The date of the invoice, and the date the clean was done if different.',
  'A description of the work - the property, the type of clean, and roughly how long it took.',
  'The total amount charged, with a separate GST line only if you are registered for GST.',
]

type CleanerType = {
  emoji: string
  kind: string
  title: string
  subtitle: string
  signals: string[]
  ctaLabel: string
  ctaHref: string
}

const FORK_CARDS: CleanerType[] = [
  {
    emoji: '🧽',
    kind: 'an ABN',
    title: 'Private, direct & app-based cleaning',
    subtitle: 'House cleans, end-of-lease jobs, Airtasker',
    signals: [
      'You find your own clients directly, by word of mouth, or through an app like Airtasker',
      'You are paid by invoice or app payout, not a payslip',
      'No tax is withheld before the money lands in your account',
      'You set your own price, hours and which jobs you take on',
      'There is no superannuation paid on top of what you earn',
    ],
    ctaLabel: 'Start here: register your ABN →',
    ctaHref: '/abn',
  },
  {
    emoji: '🏢',
    kind: 'a TFN',
    title: 'Rostered by a cleaning company',
    subtitle: 'Commercial & office cleaning, Cleaning Services Award',
    signals: [
      'A cleaning company rosters you onto specific sites and shifts',
      'You receive a payslip showing tax already withheld',
      'The company sets your pay rate, your hours and how the job is done',
      'You get superannuation paid on top of your wages',
      'You filled out a TFN declaration form when you started',
    ],
    ctaLabel: 'Start here: apply for your TFN →',
    ctaHref: '/tfn',
  },
]

const faqs = [
  {
    question: 'Am I an ABN sole trader or a TFN employee as a cleaner?',
    answer: "It comes down to who you clean for and how you got the work, not what the job is called. Clean for private clients you found yourself, end-of-lease jobs for a departing tenant, or work booked through an app like Airtasker, and you're almost always an ABN sole trader - you set the price, invoice for the job, and no tax is withheld. Get rostered onto specific sites and shifts by a cleaning company, and you're almost always a TFN employee, usually covered by the Cleaning Services Award 2020, with tax withheld from a payslip and super paid on top. Around 28% of Australia's cleaning services workforce operates as sole traders, one of the higher shares of any industry, so it's genuinely worth checking which one applies to you rather than assuming.",
  },
  {
    question: 'What cleaning equipment and products can I claim?',
    answer: "Anything you buy yourself and aren't reimbursed for - mops, buckets, scrapers, blades, wringers, and cleaning chemicals or products - is deductible. Items costing $300 or less are claimed in full in the year you buy them. Anything $300 or more, like a commercial-grade vacuum or a floor buffer, is depreciated and claimed gradually over its effective life instead of all at once.",
  },
  {
    question: 'Can I claim my uniform, protective gear and laundering it?',
    answer: "Yes to a required uniform your employer or client doesn't supply, and to protective gear with a genuine safety function - steel-capped boots, an apron, gloves, safety glasses or a face shield. No to ordinary clothing like plain black pants or a plain t-shirt, even if cleaning is the only reason you own them; the ATO treats that as conventional clothing, not a uniform. Laundering deductible work clothing follows the ATO's standard rates: $1 per load if it's only work items, or 50 cents per load if washed with everyday clothing. Once your laundry claims for the year add up to more than $150, keep a simple diary of what you washed and when.",
  },
  {
    question: 'Can I claim the drive between cleaning jobs?',
    answer: "Yes. If you clean three or four different houses or offices in a day, the travel between each one is deductible, worked out using the cents-per-kilometre method or a logbook. What isn't deductible is the very first trip of the day, from home to your first job, which is ordinary commuting the same as any other occupation - unless you're carrying genuinely bulky cleaning equipment that's essential for the job and there's nowhere secure to store it at any single workplace, in which case that trip can count too.",
  },
  {
    question: 'Do I need to register for GST as a cleaner with an ABN?',
    answer: "Only once your annual turnover from cleaning work passes $75,000. Most working holiday makers cleaning part-time, privately, or through an app come nowhere near this, so unless you're running a genuinely large cleaning operation, you can leave GST alone and simply invoice without a GST line.",
  },
  {
    question: 'I bought cleaning equipment or chemicals before I had any clients lined up - can I still claim it?',
    answer: "Generally yes, provided the purchase was genuinely part of setting yourself up to start cleaning for clients - for example, buying your mop, bucket and chemicals around the same time you registered your ABN and started listing yourself on an app or advertising for work. The ATO looks at whether you'd genuinely started operating as a business by that point, not just whether an invoice had come in yet, so keep the receipts and a simple note of when you registered your ABN and began looking for work. If there's a long gap between buying the gear and actually starting to clean for anyone, get that specific timing checked before you rely on it.",
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Expenses', item: `${SITE_URL}/expenses` },
    { '@type': 'ListItem', position: 3, name: 'Cleaners', item: `${SITE_URL}/expenses/cleaners` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Cleaner Tax Deductions Australia: ABN Sole Trader vs TFN Employee',
  description: 'What Australian cleaners can claim on tax, whether you are an ABN sole trader cleaning privately or through an app, or a TFN employee rostered by a commercial cleaning company.',
  url: `${SITE_URL}/expenses/cleaners`,
  inLanguage: 'en-AU',
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/expenses/cleaners#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/expenses/cleaners`,
}

function CompareTable({ label, rows, highlight }: { label: string; rows: string[][]; highlight?: boolean }) {
  return (
    <div className="taxres-table-card" style={highlight ? { borderColor: '#0B5240', boxShadow: '0 8px 20px -8px rgba(11, 82, 64, 0.18)' } : {}}>
      <h3 className="taxres-table-title">{label}</h3>
      <table className="taxres-table">
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}><td>{row[0]}</td><td>{row[1]}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ForkCard({ f }: { f: CleanerType }) {
  return (
    <div className="exp-card">
      <div className="exp-card-head">
        <span className="exp-card-emoji" aria-hidden="true">{f.emoji}</span>
        <div>
          <h3 className="exp-card-title">{f.title}</h3>
          <p className="exp-card-subtitle">{f.subtitle}</p>
        </div>
      </div>
      <p className="font-semibold" style={{ fontSize: '11.5px', color: '#0B5240', margin: '14px 0 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        What you need: {f.kind}
      </p>
      <div className="exp-card-section">
        <p className="exp-card-label" style={{ color: '#587066' }}>Signs this is you</p>
        <ul className="exp-card-list">
          {f.signals.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
      <Link href={f.ctaHref} className="inline-flex items-center justify-center font-semibold"
        style={{ marginTop: '18px', height: '42px', padding: '0 20px', background: '#0B5240', color: '#fff', borderRadius: '100px', fontSize: '13px', textDecoration: 'none', width: '100%' }}>
        {f.ctaLabel}
      </Link>
    </div>
  )
}

export default function CleanersExpensesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-5 lg:pt-9 lg:pb-7">

            <nav aria-label="Breadcrumb" className="mb-4 lg:mb-5">
              <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
                <li><Link href="/" style={{ color: '#587066' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li><Link href="/expenses" style={{ color: '#587066' }}>Expenses</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Cleaners</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '25ch' }}>
                Cleaner tax: <span style={{ color: '#0B5240' }}>ABN sole trader, or TFN employee?</span>
              </h1>
              <p className="font-semibold mx-auto hero-sub" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '56ch' }}>
                Clean private houses, end-of-lease jobs or app-based work like Airtasker, and you&apos;re almost always an ABN sole trader. Get rostered onto shifts by a commercial cleaning company, and you&apos;re almost always a TFN employee. Here&apos;s how to tell which one you are, and exactly what you can claim either way.
              </p>
            </div>
          </div>
        </section>

        {/* ── THE ABN / TFN FORK (this page's unique hook) ────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '20px' }}>
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Who do you clean for, and how did you get the work?
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '62ch' }}>
                About 28% of Australia&apos;s cleaning services workforce operates as sole traders, one of the highest shares of any industry. Work out which side of that split you&apos;re actually on first, because the two are taxed completely differently.
              </p>
            </div>

            <div className="exp-grid">
              {FORK_CARDS.map((f, i) => <ForkCard key={i} f={f} />)}
            </div>

            <div className="max-w-[680px] mx-auto text-center" style={{ marginTop: '8px' }}>
              <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7, marginBottom: '10px' }}>
                Plenty of cleaners do both across a year - a few rostered shifts with a commercial cleaning company under a TFN, and private house cleans booked through Airtasker under an ABN on the side. That&apos;s completely normal; you just declare both income types on the same tax return, ideally with separate records for each.
              </p>
              <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7 }}>
                One caution: if a cleaning company asks you to get an ABN even though they set your roster, supervise your work and provide your cleaning products or equipment, that arrangement may be disguised employment rather than genuine contracting. It&apos;s worth getting that checked before you register, rather than assuming the ABN label settles it.
              </p>
            </div>

            <div className="max-w-[680px] mx-auto">
              <div className="taxres-savings-box">
                <div>
                  <p className="taxres-savings-heading">If a cleaning company employs you under a TFN</p>
                  <p className="taxres-savings-body">
                    The TFN declaration you fill out asks about the tax-free threshold. As a working holiday maker, the correct answer is always No, at every cleaning employer you work for - on a 417 or 462 visa you don&apos;t get a tax-free threshold at all, from any employer, no matter how many rostered cleaning jobs you&apos;re juggling at once.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT CLEANERS CAN CLAIM ──────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                What cleaners can actually claim
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                The same test applies whichever side of the ABN/TFN fork you&apos;re on: you paid for it yourself, it&apos;s directly related to your cleaning work, and you can show a record of it.
              </p>
            </div>

            {/* Equipment */}
            <h3 className="font-serif font-black text-ink text-center" style={{ fontSize: 'clamp(18px,1.9vw,22px)', letterSpacing: '-0.015em', marginBottom: '10px' }}>
              Cleaning equipment and products: the $300 rule
            </h3>
            <p className="font-light mx-auto text-center" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', maxWidth: '680px', marginBottom: '20px' }}>
              If you buy your own gear and aren&apos;t reimbursed for it, the cost is deductible. How you claim it depends on the price.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="Under $300" rows={UNDER_300_ROWS} highlight />
              <CompareTable label="$300 or more" rows={OVER_300_ROWS} />
            </div>

            <div className="max-w-[680px] mx-auto">
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginTop: '22px' }}>
                In practice, almost everything in a cleaner&apos;s kit sits under the $300 mark and is claimed straight away: mops, buckets, scrapers, blades, wringers, and the cleaning chemicals and products you go through job to job. It&apos;s the bigger, less frequent purchases - a commercial-grade vacuum, a floor buffer, a pressure washer - that cross the $300 line and get depreciated instead.
              </p>
              <div className="info-block">
                <p>
                  Buying gear as a set changes this. If several items are bought together as a set costing $300 or more in total - a starter kit of mop, bucket, caddy and chemicals from a cleaning supply wholesaler, for example - the whole set is depreciated over time, even if each individual piece would have cost less than $300 bought on its own.
                </p>
              </div>
            </div>

            {/* Uniform, PPE, laundry */}
            <h3 className="font-serif font-black text-ink text-center" style={{ fontSize: 'clamp(18px,1.9vw,22px)', letterSpacing: '-0.015em', margin: '34px 0 10px' }}>
              Uniform, protective gear, and laundering it
            </h3>
            <div className="max-w-[680px] mx-auto">
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                If a client or employer requires a specific uniform and doesn&apos;t supply it, the cost is deductible. The same goes for protective gear with a genuine safety function: steel-capped boots, an apron, gloves, safety glasses, or a face shield for jobs involving strong chemicals or dust. These qualify because they do a specific job - protecting you, or meeting a genuine uniform requirement - not because you only happen to wear them while cleaning.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                What doesn&apos;t qualify is ordinary, conventional clothing - plain black pants, a plain-coloured polo, joggers - even if cleaning is the only reason you own them, and even if a client insists on a certain colour. The ATO&apos;s test isn&apos;t why you bought something, it&apos;s what the item actually is: clothing anyone could wear anywhere doesn&apos;t become a uniform just because someone requires it.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                Washing deductible work clothing - a compulsory uniform or genuine protective gear - follows the ATO&apos;s standard laundry rates: $1 per load if the load is only work items, or 50 cents per load if it&apos;s washed together with your everyday clothing. Once your laundry claims for the year add up to more than $150, ATO guidance is to keep a simple diary of what you washed and when, rather than relying on an estimate.
              </p>
            </div>

            {/* Travel */}
            <h3 className="font-serif font-black text-ink text-center" style={{ fontSize: 'clamp(18px,1.9vw,22px)', letterSpacing: '-0.015em', margin: '34px 0 10px' }}>
              Travel between cleaning jobs
            </h3>
            <div className="max-w-[680px] mx-auto">
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                This is where the real money is for most cleaners. Clean three or four different houses or offices in a day, and the drive from one to the next is deductible - it&apos;s travel between two workplaces, not a commute to a single fixed one. Only the very first trip of the day, from home to your first job, and the last trip home, are excluded, the same as for any occupation.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '18px' }}>
                Driving from home to a regular workplace is normally private commuting, and that doesn&apos;t change just because you clean for a living. There is a narrow exception, and all three conditions below have to apply.
              </p>
            </div>

            <div className="max-w-[680px] mx-auto mb-6">
              <div className="flex flex-col gap-3">
                {TRAVEL_CONDITIONS.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">{c}</p>
                  </div>
                ))}
              </div>
              <p className="font-light mx-auto" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch', marginTop: '16px', textAlign: 'center' }}>
                If any of your workplaces has somewhere secure to leave your gear, or what you carry would fit in a normal bag, the trip is still ordinary commuting and isn&apos;t deductible.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="Cents per kilometre method" rows={CAR_METHOD_ROWS} highlight />
              <CompareTable label="Logbook method" rows={LOGBOOK_ROWS} />
            </div>
            <p className="font-light mx-auto text-center" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, maxWidth: '64ch', marginTop: '18px' }}>
              If you rack up a lot of kilometres between clients each week, the logbook method usually captures more of your real costs, though it means keeping a 12-week logbook and every fuel and service receipt.
            </p>

            {/* Can't claim */}
            <div className="max-w-[680px] mx-auto">
              <h3 className="font-serif font-black" style={{ fontSize: 'clamp(16px,1.7vw,19px)', color: '#B54708', letterSpacing: '-0.015em', margin: '34px 0 8px', lineHeight: 1.3 }}>
                What you can&apos;t claim
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                A few things catch cleaners out regardless of which side of the ABN/TFN fork you&apos;re on. Ordinary, conventional clothing - plain black pants, a plain polo, joggers - isn&apos;t deductible even if cleaning is the only reason you own it or it gets stained on the job; the ATO treats it as everyday clothing, not a uniform. The drive from home to your first job of the day, and home again from your last one, is ordinary commuting, the same as it is for any occupation, unless the bulky-equipment exception above genuinely applies. And anything a client or employer reimburses you for, or supplies to you outright - chemicals, equipment, a uniform - can&apos;t be claimed again on your own return.
              </p>
            </div>
          </div>
        </section>

        {/* ── GST, INVOICING & RECORD-KEEPING ──────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                GST, invoicing and keeping records
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                The admin side looks different depending on which side of the fork you&apos;re on.
              </p>
            </div>

            <div className="max-w-[680px] mx-auto">
              <div className="taxres-savings-box" style={{ marginTop: 0, marginBottom: '26px' }}>
                <div>
                  <p className="taxres-savings-heading">GST only matters at higher turnover</p>
                  <p className="taxres-savings-body">
                    If you&apos;re cleaning under an ABN, GST registration only becomes compulsory once your turnover from cleaning work passes $75,000 in a year - the same threshold that applies to any ABN sole trader, not a cleaning-specific rule. Most working holiday makers cleaning privately, for a handful of regular clients, or through an app like Airtasker come nowhere near this, so unless your cleaning business is genuinely large, you can leave GST alone and invoice without a GST line.
                  </p>
                </div>
              </div>

              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '10px', lineHeight: 1.3 }}>
                A compliant invoice for private and app-based cleaning clients
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '16px' }}>
                Every invoice you send as an ABN sole trader should include:
              </p>
            </div>

            <div className="max-w-[680px] mx-auto" style={{ marginBottom: '28px' }}>
              <div className="flex flex-col gap-3">
                {INVOICE_CHECKLIST.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">{c}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-[680px] mx-auto">
              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '10px', lineHeight: 1.3 }}>
                Keeping records either way
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                Keep a receipt, invoice or bank statement for anything you plan to claim - a photo on your phone is fine, and you need to be able to produce it for five years. As an ABN sole trader, that also means keeping a copy of every invoice you issue. As a TFN employee, your cleaning company reports your wages to the ATO directly, so your job is simpler: hang on to your payslips and check them against the income statement that shows up at tax time.
              </p>
            </div>
          </div>
        </section>

        {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
        <NextStep
          eyebrow="What's next?"
          heading="Know which side of the fork you're on? Good."
          body="Once your ABN or TFN is sorted and your equipment, uniform and travel expenses are together, the next step is lodging a tax return that brings all of it into one place."
          cta="Continue to your tax return →"
          href="/tax-return"
        />

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">FAQs</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  Cleaner tax questions
                </h2>
                <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                  Anything else? Message us directly.
                </p>
              </div>
              <div className="max-w-[700px]">
                <Accordion items={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ─────────────────────────────────────────────── */}
        <RelatedServices items={[
          { label: 'Register your ABN', desc: 'Set up correctly for private and app-based cleaning work', href: '/abn' },
          { label: 'Apply for your TFN', desc: 'Sorted before your first rostered cleaning shift', href: '/tfn' },
          { label: 'Lodge your tax return', desc: 'Bring your ABN and TFN cleaning income together', href: '/tax-return' },
          { label: 'All occupations', desc: 'See deductions for every backpacker job, not just cleaning', href: '/expenses' },
        ]} />

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              This is general information, not personal tax advice. Whether you&apos;re a contractor or an employee, and exactly what you can claim, depends on the specific facts of how you work. When you lodge with us, your return is prepared by a team that works only with working holiday makers, and we go through your cleaning income, your ABN or TFN situation, and your equipment and travel expenses, to make sure you claim everything you&apos;re entitled to, and nothing you&apos;re not.
            </p>
            <Link href="/tax-form" className="inline-flex items-center justify-center font-semibold"
              style={{ minHeight: '52px', padding: '0 36px', background: '#0B5240', color: '#fff', borderRadius: '100px', fontSize: '15px', textDecoration: 'none' }}>
              Claim Your Tax Refund →
            </Link>
          </div>
        </section>

      </main>
      <MobileCta href="/tax-form" lang="en" />
    </>
  )
}
