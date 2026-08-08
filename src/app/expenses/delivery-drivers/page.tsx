import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Delivery Driver Tax Australia: Uber Eats, DoorDash & Employed Drivers',
  description: 'Uber Eats, DoorDash, Menulog and Amazon Flex drivers work as ABN sole traders, not employees. Some delivery jobs pay wages under a TFN instead. What working holiday makers can claim, the cents-per-km and logbook methods, and how to tell which setup applies to you.',
  keywords: [
    'delivery driver tax Australia',
    'Uber Eats tax working holiday',
    'DoorDash tax Australia',
    'DoorDash ABN working holiday',
    'Menulog delivery driver tax',
    'Amazon Flex tax Australia',
    'food delivery driver tax deductions',
    'ABN or TFN delivery driver',
    'delivery driver ABN working holiday',
    'gig economy tax Australia',
    'cents per kilometre delivery driver',
    'delivery driver car expenses',
    'sharing economy reporting ATO',
    'rideshare delivery tax deductions',
    '417 462 visa delivery driver tax',
  ],
  alternates: {
    canonical: `${SITE_URL}/expenses/delivery-drivers`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/delivery-drivers`,
      'de': `${SITE_URL}/de/expenses/delivery-drivers`,
      'ja': `${SITE_URL}/ja/expenses/delivery-drivers`,
      'x-default': `${SITE_URL}/expenses/delivery-drivers`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/expenses/delivery-drivers`,
    siteName: 'Working Holiday Tax',
    title: 'Delivery Driver Tax Australia: Uber Eats, DoorDash & Employed Drivers',
    description: 'Uber Eats, DoorDash and Amazon Flex are ABN contractor work, not TFN employment. Here is the difference, and what delivery drivers can claim on tax.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Delivery Driver Tax Australia: Uber Eats, DoorDash & Employed Drivers',
    description: 'Uber Eats, DoorDash and Amazon Flex are ABN contractor work, not TFN employment. Here is the difference, and what delivery drivers can claim on tax.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

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

type DriverType = {
  emoji: string
  kind: string
  title: string
  subtitle: string
  signals: string[]
  ctaLabel: string
  ctaHref: string
}

const FORK_CARDS: DriverType[] = [
  {
    emoji: '🛵',
    kind: 'an ABN',
    title: 'Platform & app-based delivery',
    subtitle: 'Uber Eats, DoorDash, Menulog, Amazon Flex',
    signals: [
      'You accept jobs through an app rather than working a roster',
      'You are paid via a weekly statement or invoice, not a payslip',
      'No tax is withheld before the money lands in your account',
      'You choose your own hours and can log on or off whenever you like',
      'There is no superannuation paid on top of what you earn',
    ],
    ctaLabel: 'Start here: register your ABN →',
    ctaHref: '/abn',
  },
  {
    emoji: '🍕',
    kind: 'a TFN',
    title: 'Employed by one restaurant or shop',
    subtitle: 'Paid wages directly, usually on a roster',
    signals: [
      'You work set or rostered shifts for one restaurant, takeaway shop or business',
      'You receive a payslip showing tax already withheld',
      'The business sets your pay rate, your hours and how the job is done',
      'You get superannuation paid on top of your wages',
      'You filled out a TFN declaration form when you started',
    ],
    ctaLabel: 'Start here: apply for your TFN →',
    ctaHref: '/tfn',
  },
]

const faqs = [
  {
    question: 'Do I need an ABN to drive for Uber Eats on a working holiday visa?',
    answer: "Yes. Uber Eats, DoorDash, Menulog and Amazon Flex all engage drivers as contractors rather than employees, so you need an ABN before you can sign up and get paid. You need a TFN first - an ABN does not replace it - and then you register an ABN for the delivery work itself.",
  },
  {
    question: 'Can I claim my phone bill as a delivery driver?',
    answer: 'You can claim the work-related percentage of your phone and data plan - the share you genuinely use for delivery apps, GPS navigation and accepting jobs. You cannot claim the whole bill if you also use the phone for personal calls and browsing, which almost everyone does, so you need a fair and honest basis for the percentage you claim.',
  },
  {
    question: 'What if I deliver for one restaurant as an employee, not a platform?',
    answer: 'If you are on a roster for one takeaway shop, restaurant or pizza place and receive a payslip with tax already withheld, you are an employee, not a contractor. You need a TFN rather than an ABN, and the ordinary trip from home to that workplace is treated as private commuting, not a deductible expense, the same as any other job.',
  },
  {
    question: 'Which car expense method should I use as a delivery driver?',
    answer: 'It depends on how much work-related driving you do. Under 5,000 work kilometres a year, cents-per-kilometre is usually simpler because it needs no receipts, just a reasonable record of how you worked out the kilometres. Above that cap, or if your actual running costs are high, the logbook method - a 12-week logbook valid for five years - often produces a larger deduction, but every expense needs a receipt.',
  },
  {
    question: 'Does Uber Eats or DoorDash report my income to the ATO?',
    answer: "Yes. Under the ATO's sharing economy reporting regime, platforms including Uber and DoorDash report driver income data directly to the ATO. Your delivery earnings are already visible to the ATO independently of what you declare, so they need to go on your tax return regardless of how small or irregular the amounts feel.",
  },
  {
    question: 'I ride a bike or e-scooter for deliveries instead of driving - can I still claim anything?',
    answer: 'Yes. The same work-use logic applies to bikes and e-scooters as it does to cars: you can claim the work-related portion of running and maintenance costs, plus safety gear such as a helmet and hi-vis clothing, apportioned between your delivery riding and personal use.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Expenses', item: `${SITE_URL}/expenses` },
    { '@type': 'ListItem', position: 3, name: 'Delivery Drivers', item: `${SITE_URL}/expenses/delivery-drivers` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Delivery Driver Tax Australia: Uber Eats, DoorDash & Employed Drivers',
  description: 'Whether delivery driving is ABN contractor work or TFN employment, and what working holiday makers can claim on tax either way.',
  url: `${SITE_URL}/expenses/delivery-drivers`,
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
  '@id': `${SITE_URL}/expenses/delivery-drivers#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/expenses/delivery-drivers`,
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

function ForkCard({ f }: { f: DriverType }) {
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

export default function DeliveryDriversExpensesPage() {
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
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Delivery Drivers</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '22ch' }}>
                Delivery driver tax: <span style={{ color: '#0B5240' }}>ABN, TFN, or both?</span>
              </h1>
              <p className="font-semibold mx-auto hero-sub" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '50ch' }}>
                Uber Eats, DoorDash and Amazon Flex are gig work under an ABN. Driving for one restaurant on a roster is usually a normal TFN job. Here&apos;s how to tell the difference, and exactly what you can claim either way.
              </p>
            </div>
          </div>
        </section>

        {/* ── THE ABN / TFN FORK (this page's unique hook) ────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '20px' }}>
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                ABN or TFN: work out which one you are first
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                Most delivery driving on a working holiday visa is gig work under an ABN. Some of it is an ordinary employee job under a TFN. The two are taxed completely differently, so this is the first thing to get right.
              </p>
            </div>

            <div className="exp-grid">
              {FORK_CARDS.map((f, i) => <ForkCard key={i} f={f} />)}
            </div>

            <div className="max-w-[680px] mx-auto text-center" style={{ marginTop: '8px' }}>
              <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7, marginBottom: '10px' }}>
                Plenty of people do both across a year - a rostered shift job under a TFN, and Uber Eats or DoorDash on the side under an ABN. That&apos;s completely normal; you just declare both income types on the same tax return, ideally with separate records for each.
              </p>
              <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7 }}>
                One caution: if a single restaurant or shop asks you to get an ABN even though they set your shifts, supervise your work and provide your delivery bag or bike, that arrangement may be disguised employment rather than genuine contracting. It&apos;s worth getting that checked before you register, rather than assuming the ABN label settles it.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU CAN / CAN'T CLAIM ───────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[760px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                What delivery drivers can actually claim
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '56ch' }}>
                The same principle runs through all of it: only the work-related portion of an expense counts, and you need a record for anything you claim.
              </p>
            </div>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '0 0 8px', lineHeight: 1.3 }}>
              Car and running costs
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              This is usually the biggest deduction for any driver, whatever you drive. You claim the work-related portion of your vehicle using either the cents-per-kilometre method or the logbook method (compared in detail below), and only for driving that is genuinely part of the job, never a private trip.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              For an employee delivery driver, the commute rule is the same as it is for any other job: the drive from home to the restaurant or shop where you clock on, and back again at the end of a shift, is private travel, not a deduction. Only the driving you do once you are rostered on, between the shop and drop-off points, counts as work-related.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              If you drive under an ABN, the position is a little different, because the driving is not just how you get to work, it is the work itself. Trips that are directly and demonstrably part of earning your delivery income are not automatically ruled out the way an employee&apos;s commute is. Exactly where that line falls - for instance, whether the trip from home to your first delivery of the day counts - depends on the specific facts of how you operate, so it&apos;s worth getting advice on your own situation rather than assuming every kilometre is deductible.
            </p>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              Phone and data
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Delivery work runs through an app, so the work-related percentage of your phone and data plan is deductible - the share you genuinely use for the Uber, DoorDash or Menulog driver app, GPS navigation, and messages about jobs. You need a fair, honest estimate of that percentage; claiming the whole bill on a phone you also use for everyday life is not defensible.
            </p>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              Parking and fines
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Parking fees you pay while working - waiting at a shopping centre for an order to be ready, for example - are deductible. Parking and speeding fines are a different story: they are never deductible, no matter the circumstances, even if you picked one up while making a delivery.
            </p>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              Bike and e-scooter riders
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Food delivery increasingly happens on two wheels rather than four. The same work-use logic applies: you can claim the work-related portion of your bike or e-scooter&apos;s running and repair costs, plus safety gear you need for the job, such as a helmet and hi-vis clothing, apportioned between delivery riding and personal use.
            </p>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              Keeping the vehicle presentable
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Cleaning your car so it is in a suitable state to carry food or parcels can be a deductible expense for the work-related portion, the same principle that applies to rideshare drivers carrying passengers.
            </p>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              What you can&apos;t claim
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              A few things catch drivers out every year. The private part of any trip - a personal errand on the way to a drop-off, for example - is not deductible, and neither is an employee&apos;s ordinary commute between home and a fixed workplace. Parking and speeding fines are never deductible, regardless of how they happened. And if a platform or employer has already reimbursed you for something, a fuel top-up, for instance, you can&apos;t claim it again on your tax return; that would mean claiming the same cost twice.
            </p>
          </div>
        </section>

        {/* ── GST & SHARING ECONOMY REPORTING ──────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '34px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', letterSpacing: '-0.02em' }}>
                Two things every platform driver should know
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="taxres-savings-box">
                <div>
                  <p className="taxres-savings-heading">GST only matters at higher turnover</p>
                  <p className="taxres-savings-body">
                    If you operate under an ABN and your turnover from delivery work passes $75,000 in a year, GST registration becomes compulsory. Most working holiday makers driving part-time for food delivery apps come nowhere near this, but it&apos;s worth knowing the threshold exists as your hours or earnings grow.
                  </p>
                </div>
              </div>
              <div className="taxres-savings-box">
                <div>
                  <p className="taxres-savings-heading">Platforms already report your income to the ATO</p>
                  <p className="taxres-savings-body">
                    Uber, DoorDash and similar platforms fall under the ATO&apos;s sharing economy reporting regime, meaning they report driver income data directly to the ATO. Your delivery earnings are visible to the ATO independently of what you declare, so there&apos;s no version of this where platform income quietly goes unnoticed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CAR EXPENSE METHODS ──────────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Two ways to claim your car expenses
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '54ch' }}>
                Whichever side of the ABN/TFN fork you&apos;re on, the same two methods apply to your car. You can only use one method per car per year.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="Cents per kilometre method" rows={CAR_METHOD_ROWS} highlight />
              <CompareTable label="Logbook method" rows={LOGBOOK_ROWS} />
            </div>
            <p className="font-light mx-auto text-center" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, maxWidth: '60ch', marginTop: '18px' }}>
              Rack up more than 5,000 work kilometres a year delivering, and the logbook method usually captures more of your real costs, though it means keeping a 12-week logbook and every fuel, service and rego receipt.
            </p>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">FAQs</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  Delivery driver tax questions
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

        {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
        <NextStep
          eyebrow="What's next?"
          heading="Know your ABN or TFN status? Good."
          body="Once your delivery income and expenses are sorted, the next step is lodging your working holiday tax return."
          cta="Continue to your tax return →"
          href="/tax-return"
        />

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              This is general information, not personal tax advice. Whether you&apos;re a contractor or an employee, and exactly what you can claim, depends on the specific facts of how you work. When you lodge with us, we&apos;ll go through your delivery income, your car, bike or scooter expenses, and your ABN or TFN situation, to make sure you claim everything you&apos;re entitled to, and nothing you&apos;re not.
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
