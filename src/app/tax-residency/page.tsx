// src/app/tax-residency/page.tsx
import type { Metadata } from 'next'
import BackButton from './BackButton'

export const metadata: Metadata = {
  title: 'Tax Residency in Australia | Working Holiday Tax',
  description: 'Understand the tax residency categories in Australia and how your visa status affects your tax rate.',
  alternates: { canonical: '/tax-residency' },
}

const WHV_ROWS = [
  ['$0 – $45,000',        '15%'],
  ['$45,001 – $135,000',  '$6,750 + 30%'],
  ['$135,001 – $190,000', '$33,750 + 37%'],
  ['$190,001+',           '$54,100 + 45%'],
]

const RESIDENT_ROWS = [
  ['$0 – $18,200',        'Nil'],
  ['$18,201 – $45,000',   '16%'],
  ['$45,001 – $135,000',  '$4,288 + 30%'],
  ['$135,001 – $190,000', '$31,288 + 37%'],
  ['$190,001+',           '$51,638 + 45%'],
]

const NDA_COUNTRIES = ['Chile','Finland','Germany','Israel','Japan','Norway','Turkey','United Kingdom']

const CONDITIONS = [
  'Visa obtained on a passport from one of the NDA Countries',
  'The ordinary place of residence is in Australia.',
  'There is an intention to live in Australia.',
  'Stay in Australia for a cumulative 183 days in the tax year.',
]

const SOURCES = [
  { label: 'NDA Countries',                href: 'https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/taxation-of-australian-resident-whms-from-nda-countries' },
  { label: 'WHV Tax Residency',            href: 'https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/australian-residency-if-you-re-on-a-working-holiday-or-visit' },
  { label: 'Working Holiday Makers',       href: 'https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/working-holiday-makers' },
  { label: 'Tax Rates',                    href: 'https://www.ato.gov.au/tax-rates-and-codes/tax-rates-working-holiday-makers' },
  { label: 'Your Tax Residency',           href: 'https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/your-tax-residency' },
  { label: 'High Court Ruling (Addy)',     href: 'https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/taxation-of-australian-resident-whms-from-nda-countries' },
  { label: 'Residency Test Ruling',        href: 'https://www.ato.gov.au/law/view/document?DocID=TXR/TR20231/NAT/ATO/00001&PiT=99991231235958' },
  { label: 'Student',                      href: 'https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/studying-in-australia' },
]

function TaxTable({ label, rows }: { label: string; rows: string[][] }) {
  return (
    <div className="min-w-0 flex flex-col">
      <h3 className="font-semibold text-ink mb-3 text-center" style={{ fontSize: '13px', letterSpacing: '-0.01em' }}>
        {label}
      </h3>
      <div className="rounded-xl overflow-hidden flex-1" style={{ border: '1px solid #C8EAE0' }}>
        <table className="w-full" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ background: '#EAF6F1' }}>
              <th className="text-left font-semibold text-ink" style={{ fontSize: '11px', padding: '8px 12px', letterSpacing: '0.02em', width: '55%' }}>Taxable income</th>
              <th className="text-left font-semibold text-ink" style={{ fontSize: '11px', padding: '8px 12px', letterSpacing: '0.02em', width: '45%' }}>Tax rate</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([income, rate], i) => (
              <tr key={i} style={{ borderTop: '1px solid #E2EFE9', background: i % 2 === 0 ? '#ffffff' : '#F7FCF9' }}>
                <td className="font-light text-body" style={{ fontSize: '11.5px', padding: '8px 12px' }}>{income}</td>
                <td className="font-medium text-ink" style={{ fontSize: '11.5px', padding: '8px 12px' }}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function TaxResidencyPage() {
  return (
    <main className="min-h-screen bg-canvas">

      {/* ── HERO + TAX TABLES ── */}
      <section className="py-10 lg:py-14 bg-white" style={{ paddingTop: '80px' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8">

          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '28px' }}>
            <span className="section-label center">Tax Residency Explained</span>
            <h1 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginTop: '10px', marginBottom: '12px' }}>
              Understanding your tax status in Australia
            </h1>
            <p className="font-light mx-auto" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', lineHeight: 1.75, color: 'rgba(10,15,13,0.58)', maxWidth: '58ch' }}>
              The population in Australia is divided into three groups of taxpayers: non-residents, working holiday maker (417/462), and Australian residents. Below are the differences in the tax rates between the two relevant groups.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7 items-stretch">
            <TaxTable label="Australian residents for tax purposes" rows={RESIDENT_ROWS} />
            <TaxTable label="Working Holiday visa for tax purposes" rows={WHV_ROWS} />
          </div>

          <div className="mt-6 rounded-xl flex gap-3 items-start" style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '14px 18px', justifyContent: 'center', textAlign: 'center' }}>
            <p className="font-light" style={{ fontSize: '13.5px', lineHeight: 1.65, color: '#991B1B' }}>
              If you are classified as an Australian resident for tax purposes, you may be entitled to receive the difference of <strong style={{ fontWeight: 600 }}>$2,462</strong> back as a tax refund on an income of $45,000.
            </p>
          </div>

        </div>
      </section>

      {/* ── RESIDENCY CONDITIONS ── */}
      <section className="py-10 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8">
          <div className="max-w-2xl mx-auto">

            <span className="section-label mb-3 block" style={{ textAlign: "center", display: "block" }}>Can you be taxed as a resident?</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '18px', textAlign: 'center' }}>
              Working Holiday visa holders (417/462) may be considered<br />Australian residents for tax purposes<br />if they meet all of the following conditions:
            </h2>

            <div className="space-y-3">
              {CONDITIONS.map((c, i) => (
                <div key={i} className="flex gap-2 bg-white rounded-xl items-center" style={{ padding: '10px 14px', border: '1px solid #C8EAE0' }}>
                  <span className="font-bold flex-shrink-0" style={{ fontSize: '13px', color: '#0B5240' }}>✓</span>
                  <p className="font-light text-body" style={{ fontSize: '12.5px', lineHeight: 1.5 }}>{c}</p>
                </div>
              ))}
            </div>

            {/* NDA Countries */}
            <div className="mt-4 bg-white rounded-xl" style={{ padding: '16px', border: '1px solid #C8EAE0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '12.5px', marginBottom: '10px' }}>NDA Countries:</p>
              <div className="flex gap-1" style={{ flexWrap: 'wrap' }}>
                {NDA_COUNTRIES.map((c) => (
                  <span key={c} className="font-medium" style={{ fontSize: '9.5px', background: '#EAF6F1', color: '#065F46', padding: '2px 7px', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-2 text-center">
              <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.6 }}>
                The tax year runs from the 1st of July to the 30th of June.
              </p>
              <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.6 }}>
                Student visas (500) are treated as residents for tax purposes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BACK BUTTON ── */}
      <section className="py-8 bg-white" style={{ borderTop: '1px solid #EAF6F1' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 text-center">
<BackButton />
        </div>
      </section>

      {/* ── ATO SOURCES ── */}
      <section className="py-8 bg-white">
        <div className="max-w-[900px] mx-auto px-5 md:px-8 text-center">
          <p className="text-subtle mb-4" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>
            Official ATO sources
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {SOURCES.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest-500 transition-colors hover:text-forest-400"
                style={{ fontSize: '12.5px', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
