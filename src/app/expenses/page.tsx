import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'

export const metadata: Metadata = {
  title: 'Backpacker Tax Deductions Australia: The Complete Guide',
  description: 'What backpackers can claim on their Australian tax return. Occupation-by-occupation deduction examples for hospitality, farm work, construction, kitchen hands, rideshare drivers and cleaners, plus how car expense claims are calculated.',
  keywords: [
    'backpacker tax deductions',
    'working holiday tax deductions',
    'what can backpackers claim on tax',
    'ATO deductions working holiday maker',
    'backpacker tax return deductions',
    'car expense deduction ATO',
    'cents per kilometre method',
    'WHV tax deductions',
    '417 visa tax deductions',
  ],
  alternates: {
    canonical: '/expenses',
    languages: {
      'en-AU': '/expenses',
      'de': '/de/expenses',
      'x-default': '/expenses',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/expenses`,
    siteName: 'Working Holiday Tax',
    title: 'Backpacker Tax Deductions Australia: The Complete Guide',
    description: 'What backpackers can actually claim on their Australian tax return, occupation by occupation.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Backpacker Tax Deductions Australia: The Complete Guide',
    description: 'What backpackers can actually claim on their Australian tax return, occupation by occupation.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const GOLDEN_RULES = [
  'You must have spent the money yourself, and not been reimbursed for it by your employer.',
  'The expense must be directly related to earning your income, not a private or domestic expense.',
  'You need a record to prove it: a receipt, invoice, or bank statement showing what you bought and when.',
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

type Occupation = {
  emoji: string
  title: string
  subtitle: string
  can: string[]
  cannot: string[]
}

const OCCUPATIONS: Occupation[] = [
  {
    emoji: '🍸',
    title: 'Hospitality & Bartending',
    subtitle: 'Bars, cafés, restaurants, hotels',
    can: [
      'RSA (Responsible Service of Alcohol) certificate and renewal costs',
      'Non-slip, enclosed protective shoes',
      'Laundering a compulsory uniform that carries your employer\u2019s logo',
      'A First Aid certificate, if your role requires you to hold one',
    ],
    cannot: [
      'Plain black clothing or shoes with no logo. Even if your venue requires it, the ATO treats this as ordinary clothing, not a uniform',
    ],
  },
  {
    emoji: '🌾',
    title: 'Farm Work & Fruit Picking',
    subtitle: 'Orchards, vineyards, regional farm work',
    can: [
      'Sun protection: a wide-brim hat, sunscreen, and sunglasses, for outdoor work',
      'Protective gloves and boots',
      'Car expenses travelling between different farm or work sites during the day',
    ],
    cannot: [
      'General clothing like jeans or t-shirts, even if they get worn out or dirty on the job',
      'The trip from home to your first farm each day, which is treated as ordinary commuting',
    ],
  },
  {
    emoji: '🏗️',
    title: 'Construction',
    subtitle: 'Labouring, trades, building sites',
    can: [
      'Renewing your White Card (Construction Induction Card)',
      'Steel-cap boots and hi-vis clothing',
      'Tools and equipment. Items under $300 are an immediate deduction; items over $300 are claimed over their effective life',
      'Sun protection for outdoor site work',
    ],
    cannot: [
      'Ordinary clothes, even if they get damaged or dirty on site',
      'Your very first White Card, if you needed it just to become eligible for the job in the first place',
    ],
  },
  {
    emoji: '🔪',
    title: 'Chef & Kitchen Hand',
    subtitle: 'Commercial kitchens, restaurants',
    can: [
      'Chef\u2019s knives and other kitchen tools you buy yourself',
      'Chef whites or checked chef pants, which count as occupation-specific clothing',
      'Non-slip kitchen shoes',
      'A Food Safety Supervisor certificate, if your role requires one',
    ],
    cannot: [
      'Everyday clothing worn under your chef whites',
    ],
  },
  {
    emoji: '🚗',
    title: 'Rideshare & Delivery Driving',
    subtitle: 'Uber, Uber Eats, DoorDash and similar',
    can: [
      'Car running costs for the work-related portion of your driving, via the cents-per-km or logbook method (see below)',
      'The work-use percentage of your mobile phone plan',
      'Car cleaning, to keep the car in a suitable state for passengers',
      'Parking fees incurred while working',
    ],
    cannot: [
      'The private portion of any trip, or your everyday commute',
      'Parking or speeding fines, which are never deductible, no matter the reason',
    ],
  },
  {
    emoji: '🧹',
    title: 'Cleaning',
    subtitle: 'Commercial and residential cleaning work',
    can: [
      'Cleaning products and equipment you buy yourself and aren\u2019t reimbursed for',
      'Protective gloves',
      'Car expenses travelling between client sites during the day',
    ],
    cannot: [
      'The trip from home to your first job each day',
      'Ordinary clothing worn while cleaning',
    ],
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Expenses', item: `${SITE_URL}/expenses` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Backpacker Tax Deductions Australia: The Complete Guide',
  description: 'What backpackers can claim on their Australian tax return, occupation by occupation.',
  url: `${SITE_URL}/expenses`,
  inLanguage: 'en-AU',
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
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

function OccupationCard({ o }: { o: Occupation }) {
  return (
    <div className="exp-card">
      <div className="exp-card-head">
        <span className="exp-card-emoji" aria-hidden="true">{o.emoji}</span>
        <div>
          <h3 className="exp-card-title">{o.title}</h3>
          <p className="exp-card-subtitle">{o.subtitle}</p>
        </div>
      </div>
      <div className="exp-card-section">
        <p className="exp-card-label exp-card-label-yes">✓ You may be able to claim</p>
        <ul className="exp-card-list">
          {o.can.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
      <div className="exp-card-section">
        <p className="exp-card-label exp-card-label-no">✕ Usually not deductible</p>
        <ul className="exp-card-list">
          {o.cannot.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default function ExpensesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-5 lg:pt-9 lg:pb-7">

            <nav aria-label="Breadcrumb" className="mb-4 lg:mb-5">
              <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
                <li><Link href="/" style={{ color: '#587066' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Expenses</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '24ch' }}>
                What can backpackers actually <span style={{ color: '#0B5240' }}>claim on tax</span>?
              </h1>
              <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '46ch' }}>
                Work-related deductions can add hundreds of dollars to your refund, but only if the expense genuinely qualifies. Here&apos;s exactly what does, by occupation.
              </p>
            </div>
          </div>
        </section>

        {/* ── THE 3 GOLDEN RULES ──────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <p className="font-bold mx-auto" style={{ fontSize: '14.5px', color: '#1A2822', lineHeight: 1.7, maxWidth: '54ch' }}>
                Before any occupation-specific examples, every single deduction has to pass these three ATO tests:
              </p>
            </div>
            <div className="max-w-[680px] mx-auto">
              <div className="flex flex-col gap-3">
                {GOLDEN_RULES.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SUBSTANTIATION ───────────────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '32px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="taxres-savings-box" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div>
                <p className="taxres-savings-heading">Keeping records</p>
                <p className="taxres-savings-body">
                  Keep a receipt, invoice, or bank statement for anything you plan to claim. A photo on your phone is fine. If your total work-related claims for the year are under $300, the ATO doesn&apos;t require written evidence, but you still need to be able to explain how you arrived at the amount.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CAR EXPENSES ─────────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Car expenses: two ways to claim
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '54ch' }}>
                Only work-related driving counts, never your regular commute from home. There are two methods; you can only use one per car per year.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="Cents per kilometre method" rows={CAR_METHOD_ROWS} highlight />
              <CompareTable label="Logbook method" rows={LOGBOOK_ROWS} />
            </div>
            <p className="font-light mx-auto text-center" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, maxWidth: '60ch', marginTop: '18px' }}>
              If you drive more than 5,000 work km a year, the logbook method usually gets you a bigger refund, but it does require keeping a 12-week logbook and all your receipts.
            </p>
          </div>
        </section>

        {/* ── OCCUPATION GUIDE ─────────────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '20px' }}>
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Deductions by occupation
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '56ch' }}>
                The most common jobs backpackers work in Australia, and exactly what tends to qualify, and what doesn&apos;t.
              </p>
            </div>
            <div className="exp-grid">
              {OCCUPATIONS.map((o, i) => <OccupationCard key={i} o={o} />)}
            </div>
          </div>
        </section>

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              This is general information, not personal tax advice. Everyone&apos;s situation is a little different. When you lodge with us, we&apos;ll go through your specific occupation and circumstances to make sure you claim everything you&apos;re entitled to, and nothing you&apos;re not.
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
