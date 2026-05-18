import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'

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
  alternates: { canonical: '/tax-residency' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/tax-residency`,
    siteName: 'Working Holiday Tax',
    title: 'Tax Residency in Australia for WHV Holders',
    description: 'Understand tax residency categories and how your visa affects your rate.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax Residency in Australia for WHV Holders',
    description: 'Understand tax residency and how your visa affects your rate.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WHV_ROWS = [
  ['$0 - $45,000',        '15%'],
  ['$45,001 - $135,000',  '$6,750 + 30%'],
  ['$135,001 - $190,000', '$33,750 + 37%'],
  ['$190,001+',           '$54,100 + 45%'],
]

const RESIDENT_ROWS = [
  ['$0 - $18,200',        'Nil'],
  ['$18,201 - $45,000',   '16%'],
  ['$45,001 - $135,000',  '$4,288 + 30%'],
  ['$135,001 - $190,000', '$31,288 + 37%'],
  ['$190,001+',           '$51,638 + 45%'],
]

const NDA_COUNTRIES = ['Chile', 'Finland', 'Germany', 'Israel', 'Japan', 'Norway', 'Turkey', 'United Kingdom']

const CONDITIONS = [
  'You hold a passport from one of the NDA countries (listed below).',
  'Your ordinary place of residence is in Australia.',
  'You have an intention to live in Australia.',
  'You stay in Australia for a cumulative 183 days in the tax year.',
]

const FAQS = [
  {
    question: 'What is tax residency?',
    answer: 'Tax residency determines which tax rates apply to your income in Australia. There are three categories: non-resident, working holiday maker (417/462 visa), and Australian resident for tax purposes. Each category has different rates and thresholds.',
  },
  {
    question: 'Am I a resident or working holiday maker for tax?',
    answer: 'By default, holders of 417 or 462 visas are taxed as working holiday makers at 15% from the first dollar. However, if you are from an NDA country (Non-Discrimination Agreement) and meet specific conditions, you may qualify to be taxed as an Australian resident - which means a $18,200 tax-free threshold.',
  },
  {
    question: 'What are NDA countries?',
    answer: 'NDA stands for Non-Discrimination Agreement. Citizens from these countries may be entitled to be taxed at resident rates if they meet residency tests. The countries are: Chile, Finland, Germany, Israel, Japan, Norway, Turkey, and the United Kingdom.',
  },
  {
    question: 'How much can I save if I am classified as a resident?',
    answer: 'On an income of $45,000, the difference between WHM tax ($6,750) and resident tax ($4,288) is $2,462. That is money you could be refunded if you qualify for resident status. We assess your situation and apply the correct status when lodging your return.',
  },
  {
    question: 'What about student visa (500) holders?',
    answer: 'Student visa (500) holders are generally treated as Australian residents for tax purposes, meaning they benefit from the $18,200 tax-free threshold and lower marginal rates.',
  },
  {
    question: 'How do I know which classification applies to me?',
    answer: 'The rules are complex and depend on your nationality, visa, time in Australia, and intent. We assess your specific situation when preparing your tax return to ensure you are classified correctly - and you pay the lowest legal amount of tax.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

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
        <thead>
          <tr>
            <th>Taxable income</th>
            <th>Tax on this income</th>
          </tr>
        </thead>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-[68px] bg-white">
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-8 pb-6 lg:pt-14 lg:pb-10">

            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-5 lg:mb-6">
              <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
                <li>
                  <Link href="/" style={{ color: '#587066' }}>Home</Link>
                </li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Tax Residency</li>
              </ol>
            </nav>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-3 lg:mb-4 justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
                <span className="font-medium uppercase" style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>
                  Tax Residency Explained
                </span>
              </div>

              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '20ch' }}>
                Understand your tax status<br />
                <span style={{ color: '#0B5240' }}>in Australia</span>
              </h1>

              <p className="font-light mx-auto"
                style={{ fontSize: 'clamp(14.5px, 1.4vw, 17px)', lineHeight: 1.7, color: 'rgba(10,15,13,0.65)', maxWidth: '54ch' }}>
                Your visa and circumstances determine which tax rates apply to your Australian income. Knowing your status can save you thousands of dollars.
              </p>
            </div>
          </div>
        </section>

        {/* ── TAX TABLES COMPARISON ─────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <TaxTable label="Working Holiday Maker (417/462)" rows={WHV_ROWS} />
              <TaxTable label="Australian Resident for tax purposes" rows={RESIDENT_ROWS} highlight />
            </div>

            <div className="taxres-savings-box">
              <div className="taxres-savings-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="#0B5240" strokeWidth="1.6"/>
                  <path d="M12 7v5l3 2" stroke="#0B5240" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="taxres-savings-heading">Potential savings</p>
                <p className="taxres-savings-body">
                  If you qualify as an Australian resident for tax purposes, you could be entitled to up to <strong>$2,462 back</strong> in refund on an income of $45,000. We assess your eligibility when preparing your tax return.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── RESIDENCY CONDITIONS ──────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '50px', paddingBottom: '50px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12">

            <div className="text-center mb-8">
              <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
                Resident classification
              </p>
              <h2 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: '10px', maxWidth: '28ch' }}>
                Can you be taxed as a resident?
              </h2>
              <p className="font-light mx-auto" style={{ fontSize: '14.5px', color: '#587066', lineHeight: 1.7, maxWidth: '50ch' }}>
                Working Holiday visa holders may be classified as Australian residents for tax purposes if they meet all of the following conditions:
              </p>
            </div>

            <div className="max-w-[680px] mx-auto">
              <div className="flex flex-col gap-3 mb-6">
                {CONDITIONS.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">{c}</p>
                  </div>
                ))}
              </div>

              {/* NDA Countries */}
              <div className="taxres-nda-box">
                <p className="taxres-nda-label">NDA Countries (Non-Discrimination Agreement)</p>
                <div className="flex gap-1.5 flex-wrap">
                  {NDA_COUNTRIES.map((c) => (
                    <span key={c} className="taxres-nda-pill">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="taxres-notes">
                <p>📅 The Australian tax year runs from <strong>1 July to 30 June</strong>.</p>
                <p>🎓 Student visa (500) holders are generally treated as residents for tax purposes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA TO OUR SERVICE ────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '50px', paddingBottom: '20px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="taxres-cta-card">
              <div className="taxres-cta-text">
                <h3 className="taxres-cta-heading">Not sure which status applies to you?</h3>
                <p className="taxres-cta-sub">We assess your residency status as part of every tax return we prepare - ensuring you pay the lowest legal amount of tax and claim the maximum refund.</p>
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="taxres-cta-button">
                Check my status →
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
          <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="text-center mb-8">
              <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
                Frequently asked
              </p>
              <h2 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
                Tax residency questions
              </h2>
            </div>

            <div className="flex flex-col" style={{ gap: '4px' }}>
              {FAQS.map((f, i) => (
                <details key={i} name="taxres-faq" className="contact-faq-item">
                  <summary className="contact-faq-summary">
                    <span style={{ flex: 1 }}>{f.question}</span>
                    <span className="contact-faq-plus" aria-hidden="true">+</span>
                  </summary>
                  <p className="contact-faq-answer">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
        <section style={{ background: '#0B5240', paddingTop: '50px', paddingBottom: '60px' }}>
          <div className="max-w-[640px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-semibold uppercase mb-3" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
              Ready when you are
            </p>
            <h2 className="font-serif font-black text-white mx-auto"
              style={{ fontSize: 'clamp(24px, 2.8vw, 34px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '14px', maxWidth: '22ch' }}>
              Let us handle your tax return
            </h2>
            <p className="font-light mx-auto" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '24px', maxWidth: '44ch' }}>
              We classify your residency correctly and apply every offset and deduction you are entitled to.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold"
              style={{ minHeight: '54px', padding: '0 36px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '15px', maxWidth: '300px', width: '100%' }}>
              Start your tax return →
            </a>
          </div>
        </section>

      </main>
    </>
  )
}
