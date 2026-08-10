import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep, RelatedServices } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Construction Worker Tax Deductions Australia: Tools, PPE & White Card',
  description: 'What construction workers on a working holiday visa can claim on tax: tools and equipment under and over $300, protective clothing and PPE, White Card renewals versus your first card, your ute, and self-education - based on the ATO’s tradie-specific guidance.',
  keywords: [
    'construction worker tax deductions',
    'tradie tax deductions Australia',
    'White Card tax deductible',
    'construction induction card tax deduction',
    'tools tax deduction ATO',
    'PPE tax deduction construction',
    'backpacker construction tax return',
    '417 visa construction tax deductions',
    'building site worker tax Australia',
    'tradesperson deductions ATO',
  ],
  alternates: {
    canonical: `${SITE_URL}/expenses/construction`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/construction`,
      'de': `${SITE_URL}/de/expenses/construction`,
      'ja': `${SITE_URL}/ja/expenses/construction`,
      'x-default': `${SITE_URL}/expenses/construction`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/expenses/construction`,
    siteName: 'Working Holiday Tax',
    title: 'Construction Worker Tax Deductions Australia: Tools, PPE & White Card',
    description: 'What construction workers on a working holiday visa can actually claim on tax: tools, PPE, White Card renewals and vehicle expenses.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Construction Worker Tax Deductions Australia: Tools, PPE & White Card',
    description: 'What construction workers on a working holiday visa can actually claim on tax: tools, PPE, White Card renewals and vehicle expenses.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const ATO_TRADIES_URL = 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/tradies-be-certain-about-what-you-can-claim'

const UNDER_300_ROWS = [
  ['How it is claimed', 'In full, straight away'],
  ['When you claim it', 'The year you buy it'],
  ['Example', 'A $180 cordless drill'],
]

const OVER_300_ROWS = [
  ['How it is claimed', 'Spread over its effective life'],
  ['When you claim it', 'A portion each year you own it'],
  ['Example', 'A $650 concrete mixer'],
]

const FIRST_CARD_ROWS = [
  ['What it is', 'Your very first White Card'],
  ['Why you needed it', 'To become eligible for construction work in the first place'],
  ['Deductible?', 'No - a private expense'],
]

const RENEWAL_CARD_ROWS = [
  ['What it is', 'Renewing a White Card you already hold'],
  ['Why you need it', 'You are already working on-site and need to keep it current'],
  ['Deductible?', 'Yes'],
]

const CENTS_PER_KM_ROWS = [
  ['Current rate (2026-27, from 1 Jul 2026)', '91c / km'],
  ['Previous rate (2024-25 & 2025-26)', '88c / km'],
  ['Maximum claimable', '5,000 km / car / year'],
  ['Utes & vans (1+ tonne capacity)', 'Not eligible - use logbook'],
]

const LOGBOOK_ROWS = [
  ['How it works', 'Claim the work-related % of all actual running costs'],
  ['Logbook period', '12 continuous weeks, valid for 5 years'],
  ['Maximum claimable', 'No cap - based on your actual work-use %'],
  ['Required for utes & vans?', 'Yes, if claiming car expenses'],
]

const VEHICLE_CONDITIONS = [
  'The tools are essential for the work you are doing that day.',
  'They are genuinely bulky - their size or weight is the actual reason a vehicle is needed to move them, not just convenience.',
  'There is nowhere secure to leave them at the work site, so they have to travel home with you.',
]

type CardData = {
  emoji: string
  title: string
  subtitle: string
  can: string[]
  cannot: string[]
}

const TOOLS_CARD: CardData = {
  emoji: '\u{1F6E0}️',
  title: 'Tools & equipment',
  subtitle: 'What you buy yourself for the job',
  can: [
    'Hand and power tools you buy yourself: drills, grinders, electric saws, sanders and nail guns',
    'Bigger site gear you provide, such as a concrete mixer, ladder or leaf blower',
    'A tool box and work lights bought for the job',
  ],
  cannot: [
    'Any tool your employer supplied, lent you, or bought on your behalf',
    'A tool you were reimbursed for after paying for it yourself',
  ],
}

const PPE_CARD: CardData = {
  emoji: '\u{1F9BA}',
  title: 'Protective clothing & PPE',
  subtitle: 'Gear with a genuine safety function',
  can: [
    'Hi-vis vests and shirts, steel-capped boots, safety glasses, helmets and earmuffs',
    'Sunscreen, a sun hat and sunglasses, for outdoor site work',
    'Hand sanitiser, face masks and work gloves',
  ],
  cannot: [
    'Ordinary clothing, such as jeans, t-shirts or hoodies, even once it is damaged or worn out from site work',
    'Anything practical for the job but without an actual protective feature',
  ],
}

const faqs = [
  {
    question: 'Can I claim my first White Card?',
    answer: 'No. The ATO treats your very first White Card (Construction Induction Card) the same way it treats a first driver’s licence: the cost of gaining a qualification you needed just to become eligible for the job in the first place is a private expense, not a deduction. Once you are already working on-site and your card needs renewing to keep working, that renewal cost is deductible. The same logic applies to a first forklift ticket or heavy-vehicle permit.',
  },
  {
    question: 'What tools can I claim as a construction worker?',
    answer: 'Any tool or piece of equipment you buy yourself for site work is deductible, as long as your employer did not supply it or pay you back for it. Items costing under $300 each, such as a drill, grinder, sander or hand tools, are claimed in full in the year you buy them. Items costing $300 or more, like a bigger power tool or a concrete mixer, are claimed gradually over their effective life instead of all at once.',
  },
  {
    question: 'Can I claim my ute for driving to different sites?',
    answer: 'Normally, driving from home to your regular workplace is treated as private commuting and is not deductible, even when the workplace is a construction site. There is a narrow exception: if your tools are genuinely bulky, essential for the job, and there is nowhere secure to store them on-site, the trip carrying them can be claimed. Because most utes and panel vans carry a tonne or more, they are excluded from the simpler cents-per-km method, so you would need a logbook instead if you want to claim car expenses.',
  },
  {
    question: 'Are steel-capped boots and hi-vis clothing tax deductible?',
    answer: 'Yes. Protective items like steel-capped boots, hi-vis vests, safety glasses, helmets and earmuffs are deductible because they protect you from a specific risk of injury on site, which is the test the ATO applies. Sun protection - sunscreen, a sun hat and sunglasses - is also claimable if you work outdoors.',
  },
  {
    question: 'Can I claim my work clothes if they get ripped or dirty on site?',
    answer: 'No. Plain clothing like jeans, t-shirts or a flannie does not become deductible just because it gets damaged, stained or worn out on a building site. The ATO treats normal wear and tear on ordinary clothing as a private expense - the item has to have a genuine protective function, like the PPE above, or be a compulsory branded uniform, to qualify.',
  },
  {
    question: 'Can I claim a trade course or training?',
    answer: 'Self-education is deductible if it directly relates to the trade or role you are already working in, for example a course that upgrades an existing skill or ticket. A course aimed at moving you into a different occupation is not deductible, even if it is construction-related, because it is building a new qualification rather than maintaining the one you currently use.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Expenses', item: `${SITE_URL}/expenses` },
    { '@type': 'ListItem', position: 3, name: 'Construction', item: `${SITE_URL}/expenses/construction` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Construction Worker Tax Deductions Australia: Tools, PPE and White Card',
  description: 'What construction workers on a working holiday visa can claim on their Australian tax return: tools and equipment, protective clothing and PPE, White Card renewals, vehicle expenses and self-education.',
  url: `${SITE_URL}/expenses/construction`,
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
  '@id': `${SITE_URL}/expenses/construction#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/expenses/construction`,
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

function ClaimCard({ d }: { d: CardData }) {
  return (
    <div className="exp-card">
      <div className="exp-card-head">
        <span className="exp-card-emoji" aria-hidden="true">{d.emoji}</span>
        <div>
          <h3 className="exp-card-title">{d.title}</h3>
          <p className="exp-card-subtitle">{d.subtitle}</p>
        </div>
      </div>
      <div className="exp-card-section">
        <p className="exp-card-label exp-card-label-yes">✓ You can typically claim</p>
        <ul className="exp-card-list">
          {d.can.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
      <div className="exp-card-section">
        <p className="exp-card-label exp-card-label-no">✕ Not deductible</p>
        <ul className="exp-card-list">
          {d.cannot.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default function ConstructionExpensesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-5 lg:pt-9 lg:pb-7">

          <nav aria-label="Breadcrumb" className="mb-4 lg:mb-5">
            <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
              <li><Link href="/" style={{ color: '#587066' }}>Home</Link></li>
              <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
              <li><Link href="/expenses" style={{ color: '#587066' }}>Expenses</Link></li>
              <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
              <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Construction</li>
            </ol>
          </nav>

          <div className="text-center">
            <h1 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '26ch' }}>
              What can <span style={{ color: '#0B5240' }}>construction workers</span> actually claim on tax?
            </h1>
            <p className="font-semibold mx-auto hero-sub" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '52ch' }}>
              Building sites carry the most detailed ATO guidance of any backpacker job - tools, protective gear, your White Card, and when your ute actually counts. Here&apos;s exactly what qualifies.
            </p>
          </div>
        </div>
      </section>

      {/* ── TOOLS & EQUIPMENT (centerpiece pt.1) ─────────────────────────── */}
      <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-6">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              Tools and equipment: the $300 rule
            </h2>
            <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
              If you buy your own tools for site work, and your employer has not supplied them or paid you back, the cost is deductible. How you claim it depends on the price, according to the{' '}
              <a href={ATO_TRADIES_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                ATO&apos;s guidance for tradies
              </a>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <CompareTable label="Under $300" rows={UNDER_300_ROWS} highlight />
            <CompareTable label="$300 or more" rows={OVER_300_ROWS} />
          </div>

          <div className="info-block" style={{ marginTop: '22px', marginBottom: '22px' }}>
            <p>
              Buying tools as a set changes this. If several tools are bought together as a set costing $300 or more in total, the whole set has to be depreciated over time, even if every individual piece would have cost less than $300 on its own.
            </p>
          </div>

          <div className="max-w-[560px] mx-auto">
            <ClaimCard d={TOOLS_CARD} />
          </div>
        </div>
      </section>

      {/* ── PPE & PROTECTIVE CLOTHING (centerpiece pt.2) ─────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-6">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              Protective clothing and PPE
            </h2>
            <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
              The test the ATO applies is not whether something is useful on site. It is whether the item has features or functions that protect you from a specific risk of injury.
            </p>
          </div>

          <div className="max-w-[560px] mx-auto">
            <ClaimCard d={PPE_CARD} />
          </div>

          <div className="info-block" style={{ marginTop: '22px', maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto' }}>
            <p>
              Normal wear and tear on ordinary clothing is a private expense, no matter how genuinely worn out it gets on site. The item has to actually protect you, from cuts, sun, noise, dust or impact, not just survive the work.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHITE CARD & OTHER LICENCES ──────────────────────────────────── */}
      <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-6">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              Your White Card: first card vs renewal
            </h2>
            <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
              This is the most commonly misunderstood construction deduction, and it comes down to one distinction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <CompareTable label="Your first White Card" rows={FIRST_CARD_ROWS} />
            <CompareTable label="Renewing your White Card" rows={RENEWAL_CARD_ROWS} highlight />
          </div>

          <p className="font-light mx-auto text-center" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.7, maxWidth: '62ch', marginTop: '20px' }}>
            It is the same principle the ATO applies to a driver&apos;s licence: the cost of first getting a qualification or permit required to enter an occupation is private, but maintaining one you already use for work is deductible. The same logic applies to a forklift ticket or a heavy-vehicle permit - the first one is private, renewing it while you are already using it for work is deductible.
          </p>
        </div>
      </section>

      {/* ── VEHICLE EXPENSES ─────────────────────────────────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-6">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              Your ute, van or car: when it actually counts
            </h2>
            <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '60ch' }}>
              Driving from home to a regular workplace is normally private commuting, and that does not change just because the workplace is a construction site. There is one narrow exception, and all three conditions below have to apply.
            </p>
          </div>

          <div className="max-w-[680px] mx-auto mb-6">
            <div className="flex flex-col gap-3">
              {VEHICLE_CONDITIONS.map((c, i) => (
                <div key={i} className="taxres-condition-item">
                  <span className="taxres-condition-num">{i + 1}</span>
                  <p className="taxres-condition-text">{c}</p>
                </div>
              ))}
            </div>
            <p className="font-light mx-auto" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch', marginTop: '16px', textAlign: 'center' }}>
              If your site has a lockable shed, container or cage for tools, or your tools would fit in a normal bag, the trip is still ordinary commuting and is not deductible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <CompareTable label="Cents per kilometre method" rows={CENTS_PER_KM_ROWS} highlight />
            <CompareTable label="Logbook method" rows={LOGBOOK_ROWS} />
          </div>
          <p className="font-light mx-auto text-center" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, maxWidth: '64ch', marginTop: '18px' }}>
            Utes, panel vans with a carrying capacity of one tonne or more, and minivans built to carry nine or more passengers cannot use the cents-per-km method at all. If that is your vehicle and you want to claim car expenses, the logbook method is the only option.
          </p>
        </div>
      </section>

      {/* ── SELF-EDUCATION, PHONE & RECORDS ──────────────────────────────── */}
      <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-6">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              Training, your phone, and keeping records
            </h2>
          </div>

          <div className="max-w-[680px] mx-auto">
            <p className="font-light" style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.8, marginBottom: '16px' }}>
              A course that keeps your skills current in the trade you are already working in, such as upgrading a ticket or learning a technique used in your current role, is deductible. A course aimed at moving you into a different occupation is not, even if it is construction-related, because it builds a new qualification rather than maintaining the one you use now.
            </p>
            <p className="font-light" style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.8 }}>
              If you use your own phone to call a supervisor, check plans, or message about shifts, the work-related portion of your phone and internet plan is deductible. Keep a rough, honest record of your work-use percentage rather than claiming the whole bill.
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
        heading="See what your site expenses are worth"
        body="Try the free calculator for a quick estimate, or message us directly and we will go through your specific tools, PPE and site work with you."
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
                Construction deduction questions
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                Have a question about your own situation? Message us directly.
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
          { label: 'TFN application', desc: 'Get your Tax File Number sorted before your first shift.', href: '/tfn' },
          { label: 'Tax return', desc: 'Lodge your return and claim your construction expenses.', href: '/tax-return' },
          { label: 'Superannuation (DASP)', desc: 'Claim your super back once you have left Australia.', href: '/superannuation' },
          { label: 'All occupations', desc: 'See deductions for every backpacker job, not just construction.', href: '/expenses' },
        ]}
      />

      {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '48px' }}>
        <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
          <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
            This is general information, not personal tax advice. Every site and every role is a little different. When you lodge with us, your return is prepared by a team that works only with working holiday makers, and we go through your specific tools, licences and site work to make sure you claim everything you&apos;re entitled to, and nothing you&apos;re not.
          </p>
          <Link href="/tax-form" className="inline-flex items-center justify-center font-semibold"
            style={{ minHeight: '52px', padding: '0 36px', background: '#0B5240', color: '#fff', borderRadius: '100px', fontSize: '15px', textDecoration: 'none' }}>
            Claim Your Tax Refund →
          </Link>
        </div>
      </section>

      <MobileCta href="/tax-form" lang="en" />
    </>
  )
}
