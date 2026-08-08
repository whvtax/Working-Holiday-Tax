import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep, RelatedServices } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'FIFO Tax Deductions Australia: Travel, PPE & the Zone Offset Myth',
  description: 'What FIFO (fly-in-fly-out) workers on a working holiday visa can claim on tax: PPE and tools, licence and ticket renewals, phone and self-education. Plus why the Zone Tax Offset usually does not apply to a typical FIFO roster, and what employer-provided camp accommodation and meals mean for your return.',
  keywords: [
    'FIFO tax deductions',
    'fly-in fly-out tax Australia',
    'FIFO worker tax return',
    'zone tax offset FIFO',
    'zone tax offset working holiday visa',
    'FIFO camp accommodation tax',
    'mining camp meals FBT exempt',
    'backpacker FIFO job tax',
    '417 462 visa FIFO tax deductions',
    'high risk work licence tax deduction',
    'working at heights ticket tax deductible',
    'FIFO roster tax Australia',
    'remote site worker tax deductions',
    'FIFO PPE tax deduction',
  ],
  alternates: {
    canonical: `${SITE_URL}/expenses/fifo`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/fifo`,
      'de': `${SITE_URL}/de/expenses/fifo`,
      'ja': `${SITE_URL}/ja/expenses/fifo`,
      'x-default': `${SITE_URL}/expenses/fifo`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/expenses/fifo`,
    siteName: 'Working Holiday Tax',
    title: 'FIFO Tax Deductions Australia: Travel, PPE & the Zone Offset Myth',
    description: 'What FIFO workers can actually claim on tax, and why the Zone Tax Offset usually does not apply to a typical fly-in-fly-out roster.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'FIFO Tax Deductions Australia: Travel, PPE & the Zone Offset Myth',
    description: 'What FIFO workers can actually claim on tax, and why the Zone Tax Offset usually does not apply to a typical fly-in-fly-out roster.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const REALISTIC_ROLES = [
  {
    t: 'Camp services (the realistic entry point)',
    d: 'Catering and kitchen hand work in the camp mess, cleaning and housekeeping, laundry, front-of-house and admin at the camp or site office, and site store or retail roles. This is where most working holiday makers doing FIFO work actually end up.',
  },
  {
    t: 'Trades & mining-technical roles',
    d: 'Operators, tradespeople and technical roles working directly on the mine or plant exist too, but they typically call for a specific trade qualification, ticket, or years of experience, and many employers prioritise Australian citizens and permanent residents for site-based technical positions. Not impossible, just a less realistic starting point for most working holiday makers.',
  },
]

const CAMP_PROVIDED_ROWS = [
  ['Accommodation on your swing', 'Provided directly by your employer'],
  ['Meals on your swing', 'Provided directly by your employer'],
  ['FBT treatment', 'Usually exempt for your employer'],
  ['Deductible on your return?', 'No - you did not pay for it yourself'],
]

const ON_YOUR_OWN_ROWS = [
  ['PPE and safety gear', 'Overalls, boots, gloves, goggles, masks - if you buy them'],
  ['Tools and equipment', 'Under $300: full deduction; $300+: depreciated'],
  ['Ticket and licence renewals', 'Once you are already working in the role'],
  ['Phone and internet', 'The work-related share only'],
]

const BULKY_TOOLS_CONDITIONS = [
  'The tools are essential for the work you are doing that day.',
  'They are genuinely bulky - their size or weight is the actual reason a vehicle is needed to move them, not just convenience.',
  'There is nowhere secure to leave them at the work site, so they have to travel home with you.',
]

const UNDER_300_ROWS = [
  ['How it is claimed', 'In full, straight away'],
  ['When you claim it', 'The year you buy it'],
  ['Example', 'A $190 pair of steel-capped safety boots'],
]

const OVER_300_ROWS = [
  ['How it is claimed', 'Spread over its effective life'],
  ['When you claim it', 'A portion each year you own it'],
  ['Example', 'A $600 personal tool kit for site work'],
]

const FIRST_TICKET_ROWS = [
  ['What it is', 'Your very first ticket or licence for the role'],
  ['Why you needed it', 'To become eligible for the job in the first place'],
  ['Deductible?', 'No - a private expense'],
]

const RENEWAL_TICKET_ROWS = [
  ['What it is', 'Renewing a ticket or licence you already hold'],
  ['Why you need it', 'You are already working on-site and need to keep it current'],
  ['Deductible?', 'Yes'],
]

const faqs = [
  {
    question: 'Can I claim the drive to the airport before my swing?',
    answer: 'No, not usually. The trip from home to the airport or departure point you fly out from for your swing is treated the same as anyone’s drive to work - ordinary private commuting - no matter how early the flight is or how far you live from the airport. There is a narrow exception if you have to carry genuinely bulky, essential tools with no secure storage option at work, but for most FIFO roles, especially camp services roles, that exception will not apply.',
  },
  {
    question: 'Do FIFO workers get the Zone Tax Offset?',
    answer: 'Usually not, and this is the biggest misconception in FIFO tax. Since a 2015 law change, qualifying depends on where your normal residence is, not just where you physically work. Your normal residence has to itself be located in a specified remote zone for more than 183 days a year. Flying in to work a roster inside a zone while your normal residence - your share house or rental in Perth, Brisbane or wherever you are based between swings - sits outside the zone does not meet that test, even if you spend the majority of the year on-site. For most working holiday makers doing FIFO work, that means the offset simply does not apply.',
  },
  {
    question: 'Can I claim my camp accommodation or meals?',
    answer: 'No. Your accommodation and meals on-site are arranged and paid for directly by your employer, and for genuinely remote sites this is usually treated as an exempt fringe benefit to them rather than extra income to you. Either way, because you never personally paid for the room or the meal, there is no expense for you to claim - a deduction can only give back money you have actually spent yourself.',
  },
  {
    question: 'What is the $300 rule for tools and PPE?',
    answer: 'If you buy your own tools, equipment or protective gear for the job and your employer has not supplied or reimbursed you, items costing under $300 are claimed in full in the year you buy them. Items costing $300 or more are depreciated instead, claimed gradually over their effective life rather than all at once. This is the same threshold and the same rule that applies to every occupation on this site, not something specific to FIFO work.',
  },
  {
    question: 'Can I claim my High Risk Work Licence or Working at Heights ticket?',
    answer: 'It depends on whether it is your first one or a renewal. Getting a ticket like a High Risk Work Licence, a Working at Heights ticket or a forklift licence for the very first time is treated as a private expense, the same way a first driver’s licence is, because it is what makes you eligible for the role in the first place. Once you are already working and that ticket needs renewing to keep doing the job, the renewal cost is deductible - the same first-versus-renewal principle that applies to a construction White Card.',
  },
  {
    question: 'Can I claim my phone and internet while I am on roster?',
    answer: 'Yes, the work-related portion. If you genuinely use your phone or home internet for the job - checking your roster, submitting timesheets, completing mandatory online inductions or training - you can claim that share of the bill. You need a fair, honest estimate of the percentage that is actually work-related; claiming the whole bill on a phone you also use for everyday life is not defensible.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Expenses', item: `${SITE_URL}/expenses` },
    { '@type': 'ListItem', position: 3, name: 'FIFO', item: `${SITE_URL}/expenses/fifo` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'FIFO Tax Deductions Australia: Travel, PPE and the Zone Offset Myth',
  description: 'What FIFO workers on a working holiday visa can claim on their Australian tax return: PPE and tools, licence and ticket renewals, phone and self-education, and why the Zone Tax Offset usually does not apply to a typical fly-in-fly-out roster.',
  url: `${SITE_URL}/expenses/fifo`,
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
  '@id': `${SITE_URL}/expenses/fifo#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/expenses/fifo`,
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

export default function FifoExpensesPage() {
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
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>FIFO</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '29ch' }}>
                FIFO tax deductions: your roster, your camp, and the <span style={{ color: '#0B5240' }}>Zone Offset myth</span>
              </h1>
              <p className="font-semibold mx-auto hero-sub" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '58ch' }}>
                Two weeks on, one week off - fly to site, work your swing, fly home again. Camp accommodation and meals are usually covered by your employer, not you. Here&apos;s exactly what you can claim on a FIFO roster, and the truth about the Zone Tax Offset most FIFO workers assume they&apos;re getting.
              </p>
            </div>
          </div>
        </section>

        {/* ── REALISTIC FIFO ROLES ─────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Which FIFO jobs do working holiday makers actually get?
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '62ch' }}>
                FIFO means flying to a remote mine or resources project for a set block of work - a swing or roster, commonly something like two weeks on and one week off - then flying home again until the next one starts. It is real work, and working holiday makers do land FIFO jobs, but realistically it is usually a particular slice of FIFO work.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 max-w-[840px] mx-auto">
              {REALISTIC_ROLES.map((c, i) => (
                <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#F7FBF9', border: '1.5px solid #E2EFE9' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '8px' }}>{c.t}</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CAMP LIFE: THE UNIQUE HOOK ───────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Camp life: what your employer covers, and what is on you
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '60ch' }}>
                FIFO rosters come with something few other backpacker jobs do - accommodation and meals arranged and paid for directly by your employer while you are on-site.
              </p>
            </div>

            <div className="max-w-[680px] mx-auto" style={{ marginBottom: '26px' }}>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                While you are on your swing, your room in camp and your meals in the mess are booked and paid for by the company, not you. For genuinely remote sites, this kind of accommodation and food is usually treated as an exempt fringe benefit to your employer under the FBT remote area rules, rather than extra taxable income landing on you. Either way, the result for your tax return is simple: because you never personally paid for the room or the meal, there is no cost sitting in your pocket to claim a deduction for. A deduction can only ever give back money you have genuinely spent yourself.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="What your employer covers" rows={CAMP_PROVIDED_ROWS} highlight />
              <CompareTable label="What you pay for yourself" rows={ON_YOUR_OWN_ROWS} />
            </div>

            <div className="max-w-[680px] mx-auto" style={{ marginTop: '30px' }}>
              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '8px' }}>
                Getting to site
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                The flight to site itself is usually arranged and paid for by your employer as part of the roster. What is not covered is your own trip from home to the airport or departure point you fly out of - that is ordinary private commuting, the same as anyone&apos;s drive to work, and it is not deductible no matter how early the flight is or how far you live from the airport.
              </p>

              <div className="flex flex-col gap-3" style={{ marginBottom: '14px' }}>
                {BULKY_TOOLS_CONDITIONS.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">{c}</p>
                  </div>
                ))}
              </div>
              <p className="font-light" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.6, marginBottom: '22px' }}>
                All three conditions have to apply before that trip becomes deductible. In practice this is a narrow exception that matters more for a tradesperson flying in with their own tool kit than for most camp services roles, where there is usually nothing bulky enough, or no reason it cannot be stored securely on-site.
              </p>

              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '8px' }}>
                Moving to take up a FIFO job
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                If you relocate, say to Perth, Brisbane or another hub, specifically to be based there for FIFO work, the cost of that move itself - flights, freight, temporary accommodation while you find your feet - is a private relocation expense, not a work-related deduction. That is true even though the move is clearly connected to taking up the job: the ATO treats the cost of relocating for a new role as a cost of putting yourself in a position to earn income, not a cost of earning it once you are there.
              </p>
            </div>
          </div>
        </section>

        {/* ── ZONE TAX OFFSET: PROMINENT MYTH-CORRECTION (unique hook) ────── */}
        <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[760px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <span className="section-label">The biggest FIFO tax myth</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 18px' }}>
              The Zone Tax Offset: working in a zone is not the same as living in one
            </h2>

            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              It is a common assumption that flying in and out of a remote mine or resources site automatically qualifies you for the Zone Tax Offset, simply because the site sits inside one of the ATO&apos;s specified remote zones. For a typical FIFO arrangement, that assumption is usually wrong.
            </p>

            <div className="rounded-2xl" style={{ padding: '20px 22px', background: '#FDF0D5', border: '1.5px solid #F9D88A', borderLeft: '4px solid #E9A020', margin: '22px 0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                It is about where you live, not where you fly to.
              </p>
              <p className="font-light" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.75 }}>
                Since a 2015 law change, the test is no longer just about how many days you spend physically working inside a zone. To qualify, your normal residence - where you actually live, not just where you clock on - has to itself be located in a specified zone for more than 183 days in the income year. Flying in to work a roster inside a zone, while your normal residence sits outside it, does not meet this test, even if you spend well over 183 days a year physically on-site across your swings.
              </p>
            </div>

            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              For most working holiday makers doing FIFO work, this rules the offset out. Your normal residence during a working holiday is not the mine camp - camp accommodation is temporary, tied to your roster, and is not where you would otherwise be living that week. Your normal residence is wherever you are actually based between swings: a share house or rental in Perth, Brisbane, Darwin, Karratha, or wherever else you call home during your working holiday. Unless that home base is itself inside a specified zone, flying in and out for work does not get you the offset, no matter how remote the site is or how many swings you work each year.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              If your own circumstances are genuinely different - for example, your actual home base during your working holiday sits inside a specified zone - it is worth raising when your return is prepared rather than assuming either way.
            </p>
          </div>
        </section>

        {/* ── PPE, TOOLS & THE $300 RULE ───────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                PPE, tools and the $300 rule
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                Whatever you genuinely buy yourself for the job, and are not reimbursed for, is deductible. How you claim it depends on what it is, and what it costs.
              </p>
            </div>

            <div className="max-w-[680px] mx-auto" style={{ marginBottom: '24px' }}>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                Personal protective equipment you buy yourself - overalls or coveralls, steel-capped boots, gloves, safety goggles, masks - is deductible, because it protects you from a specific risk on-site rather than just being practical to have. Laundering that gear yourself is deductible too. None of this applies to anything your employer issues from stores, supplies, or reimburses you for; you can only claim what genuinely came out of your own pocket.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                Ordinary, everyday clothing - plain trousers, t-shirts, a jumper for cold mornings on-site - is never deductible, no matter how worn out or dirty it gets across a swing. An item has to have a genuine protective feature, like the PPE above, to qualify; being work-appropriate is not enough on its own.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="Under $300" rows={UNDER_300_ROWS} highlight />
              <CompareTable label="$300 or more" rows={OVER_300_ROWS} />
            </div>
            <p className="font-light mx-auto text-center" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, maxWidth: '62ch', marginTop: '18px' }}>
              Buy several tools together as a set costing $300 or more in total, and the whole set is depreciated over time, even if every individual piece would have cost less than $300 on its own.
            </p>
          </div>
        </section>

        {/* ── TICKETS & LICENCES: FIRST VS RENEWAL ─────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Tickets and licences: your first one vs a renewal
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                A High Risk Work Licence, a Working at Heights ticket, a forklift ticket - the same distinction decides whether any of them is deductible.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="Your first ticket or licence" rows={FIRST_TICKET_ROWS} />
              <CompareTable label="Renewing a ticket you hold" rows={RENEWAL_TICKET_ROWS} highlight />
            </div>

            <p className="font-light mx-auto text-center" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.7, maxWidth: '64ch', marginTop: '20px' }}>
              It is the same principle this site applies to a construction White Card, and the same one the ATO applies to a driver&apos;s licence: the cost of first getting a qualification or permit required to enter a role is private, but maintaining one you already use for work is deductible. Your first High Risk Work Licence, Working at Heights ticket or forklift ticket is private; renewing it once you are already using it on the job is deductible.
            </p>
          </div>
        </section>

        {/* ── PHONE, SELF-EDUCATION, TESTING & RECORDS ─────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Phone, training, testing and keeping records
              </h2>
            </div>

            <div className="max-w-[680px] mx-auto">
              <p className="font-light" style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.8, marginBottom: '16px' }}>
                Work-related calls are deductible, and so is an apportioned share of your phone and internet plan if you genuinely need it for the job - checking your roster, submitting timesheets, or completing mandatory online inductions and training modules. Keep a fair, honest estimate of the work-related percentage rather than claiming the whole bill.
              </p>
              <p className="font-light" style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.8, marginBottom: '16px' }}>
                A short course or TAFE unit that directly relates to the work you are already doing is deductible, the same self-education test that applies to every occupation on this site. If your employer requires you to travel to a seminar or refresher and stay away from your normal base to get there, that travel and accommodation is deductible too. A first, entry-level course taken just to become eligible for a role in the first place, such as a first Certificate II, is treated the same way as a first ticket: a private cost of qualifying for the job, not a cost of doing a job you already have.
              </p>
              <p className="font-light" style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.8 }}>
                Many FIFO employers require medical checks, and drug and alcohol testing, as a condition of working on-site. Where your employer requires it for a role you already hold and you have to pay for it yourself, the cost is deductible.
              </p>
            </div>

            <div className="taxres-savings-box" style={{ marginTop: '28px', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div>
                <p className="taxres-savings-heading">Keeping records</p>
                <p className="taxres-savings-body">
                  For everything you claim, keep a receipt, invoice or bank statement showing the amount, the date, the supplier, and a description of what you bought. A photo on your phone is fine, and you need to be able to produce it for five years.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
        <NextStep
          eyebrow="Ready when you are"
          heading="See what your FIFO expenses are worth"
          body="Try the free calculator for a quick estimate, or message us directly and we will go through your specific roster, tickets and camp arrangements with you."
          cta="Try the calculator →"
          href="/calculator"
        />

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">FAQs</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  FIFO deduction questions
                </h2>
                <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                  Have a question about your own roster or site? Message us directly.
                </p>
              </div>
              <div className="max-w-[700px]">
                <Accordion items={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ─────────────────────────────────────────────── */}
        <RelatedServices
          items={[
            { label: 'TFN application', desc: 'Get your Tax File Number sorted before your first swing.', href: '/tfn' },
            { label: 'Tax return', desc: 'Lodge your return and claim your FIFO work expenses.', href: '/tax-return' },
            { label: 'Superannuation (DASP)', desc: 'Claim your super back once you have left Australia.', href: '/superannuation' },
            { label: 'All occupations', desc: 'See deductions for every backpacker job, not just FIFO.', href: '/expenses' },
          ]}
        />

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              This is general information, not personal tax advice. Every roster, every site, and every camp arrangement is a little different, and the Zone Tax Offset in particular depends on your own normal residence, not just where your roster takes you. When you lodge with us, your return is prepared under the supervision of a registered tax agent, who will go through your specific roster, tickets and circumstances to make sure you claim everything you&apos;re entitled to, and nothing you&apos;re not.
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
