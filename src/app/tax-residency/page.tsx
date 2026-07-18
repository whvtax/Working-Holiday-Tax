import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import BackButton from './BackButton'

export const metadata: Metadata = {
  title: 'Tax Residency in Australia for WHV Holders',
  description: 'Understand Australian tax residency categories and how your visa status (417/462) affects your tax rate. Compare WHM rates vs resident rates.',
  keywords: [
    'tax residency Australia',
    'working holiday tax residency',
    '417 visa tax residency',
    '462 visa tax residency',
    'WHM resident for tax purposes',
    'NDA countries tax Australia',
    'Australian resident tax rates',
    'WHV non-resident tax',
  ],
  alternates: {
    canonical: '/tax-residency',
    languages: {
      'en-AU': '/tax-residency',
      'de': '/de/tax-residency',
      'x-default': '/tax-residency',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/tax-residency`,
    siteName: 'Working Holiday Tax',
    title: 'Tax Residency in Australia for WHV Holders',
    description: 'Understand tax residency categories and how your visa affects your rate.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Tax Residency in Australia for WHV Holders',
    description: 'Understand tax residency and how your visa affects your rate.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WHV_EXAMPLE_ROWS = [
  ['Income',       '$45,000'],
  ['Tax rate',     '15%'],
  ['Tax to pay',   '$6,750'],
]

const RESIDENT_EXAMPLE_ROWS = [
  ['Income',                 '$45,000'],
  ['$0 - $18,200',           'Free'],
  ['$18,201 - $45,000',      '16%'],
  ['Tax to pay',             '$4,288'],
]

const NDA_COUNTRIES = ['United Kingdom', 'Germany', 'Japan', 'Chile', 'Finland', 'Israel', 'Norway', 'Turkey']

const CONDITIONS = [
  'You hold a passport from one of the NDA countries:',
  'Your ordinary place of residence is in Australia.',
  'You have an intention to live in Australia.',
  'You have established ongoing ties to Australia, such as a home, ongoing employment, or personal connections.',
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Tax Residency', item: `${SITE_URL}/tax-residency` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Tax Residency in Australia for Working Holiday Visa Holders',
  description: 'Understanding Australian tax residency categories and how visa status affects tax rates.',
  url: `${SITE_URL}/tax-residency`,
  inLanguage: 'en-AU',
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

function TaxTable({ label, rows, highlight }: { label: string; rows: string[][]; highlight?: boolean }) {
  return (
    <div className="taxres-table-card" style={highlight ? { borderColor: '#0B5240', boxShadow: '0 8px 20px -8px rgba(11, 82, 64, 0.18)' } : {}}>
      <h3 className="taxres-table-title">
        {label}
      </h3>
      <table className="taxres-table">
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TaxResidencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-5 lg:pt-9 lg:pb-7">

            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-4 lg:mb-5">
              <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
                <li>
                  <Link href="/" style={{ color: '#587066' }}>Home</Link>
                </li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Tax Residency</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '22ch' }}>
                Are you an Australian resident for <span style={{ color: '#0B5240' }}>tax purposes</span>?
              </h1>
              <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '38ch' }}>
                Tax residency determines which tax rates apply to your income in Australia. It is different from your visa or immigration status.
              </p>
            </div>
          </div>
        </section>

        {/* ── TAX TABLES COMPARISON ─────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '32px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">

            <div className="taxres-savings-box" style={{ marginBottom: '18px', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div>
                <p className="taxres-savings-heading">Why it matters</p>
                <p className="taxres-savings-body">
                  If you qualify as an Australian resident for tax purposes, the first $18,200 of your taxable income is tax-free, meaning any 15% tax paid on that amount may be refunded. Income above $18,200 is taxed at 16%.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <TaxTable label="Working Holiday Maker (417/462)" rows={WHV_EXAMPLE_ROWS} />
              <TaxTable label="Australian Resident for Tax Purposes" rows={RESIDENT_EXAMPLE_ROWS} highlight />
            </div>
          </div>
        </section>

        {/* ── RESIDENCY CONDITIONS ──────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">

            <div className="text-center mb-6">
              <p className="font-bold mx-auto" style={{ fontSize: '14.5px', color: '#1A2822', lineHeight: 1.7, maxWidth: '50ch' }}>
                Working Holiday visa holders may qualify as Australian residents for tax purposes if they meet the following criteria:
              </p>
            </div>

            <div className="max-w-[680px] mx-auto">
              <div className="flex flex-col gap-3">
                {CONDITIONS.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">
                      {i === 0 ? `${c} ${NDA_COUNTRIES.join(', ')}.` : c}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-light mx-auto" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.6, maxWidth: '54ch', marginTop: '16px', textAlign: 'center' }}>
                If you don&apos;t hold a passport from an NDA country but still meet all the other requirements, you may still qualify as an Australian resident for tax purposes and be eligible for a tax refund of up to $700 if you&apos;re a low-income earner.
              </p>
            </div>
          </div>
        </section>

        {/* ── BACK TO FORM (above questions) ─────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
          <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <BackButton />
          </div>
        </section>

      </main>
    </>
  )
}
