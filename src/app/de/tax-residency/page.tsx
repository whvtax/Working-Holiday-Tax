import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import BackButton from './BackButton'

export const metadata: Metadata = {
  title: 'Steuerresidenz in Australien für WHV-Inhaber',
  description: 'Verstehe die australischen Steuerresidenz-Kategorien und wie dein Visum-Status (417/462) deinen Steuersatz beeinflusst. Vergleich WHM-Sätze und Residenten-Sätze.',
  keywords: [
    'Steuerresidenz Australien',
    'Working Holiday Steuerresidenz',
    '417 Visum Steuerresidenz',
    '462 Visum Steuerresidenz',
    'WHM Steuerresident',
    'NDA-Länder Australien Steuer',
    'Australischer Steuerresident-Sätze',
    'WHV Nicht-Resident Steuer',
  ],
  alternates: { canonical: '/de/tax-residency', languages: { 'en-AU': '/tax-residency', 'de': '/de/tax-residency', 'x-default': '/tax-residency' } },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/tax-residency`,
    siteName: 'Working Holiday Tax',
    title: 'Steuerresidenz in Australien für WHV-Inhaber',
    description: 'Verstehe die Steuerresidenz-Kategorien und wie dein Visum deinen Steuersatz beeinflusst.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Steuerresidenz in Australien für WHV-Inhaber',
    description: 'Verstehe die Steuerresidenz und wie dein Visum deinen Steuersatz beeinflusst.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WHV_EXAMPLE_ROWS = [
  ['Einkommen',                  '$45.000'],
  ['Steuersatz',                 '15 %'],
  ['Zu zahlende Steuer',         '$6.750'],
]

const RESIDENT_EXAMPLE_ROWS = [
  ['Einkommen',                  '$45.000'],
  ['0 $ - 18.200 $',             'Steuerfrei'],
  ['18.201 $ - 45.000 $',        '16 %'],
  ['Gesamte zu zahlende Steuer', '$4.288'],
]

const NDA_COUNTRIES = ['Großbritannien', 'Deutschland', 'Japan', 'Chile', 'Finnland', 'Israel', 'Norwegen', 'Türkei']

const CONDITIONS = [
  'Du hast einen Reisepass aus einem der NDA-Länder:',
  'Dein gewöhnlicher Wohnsitz ist in Australien.',
  'Du hast die Absicht, in Australien zu leben.',
  'Du hast dauerhafte Bindungen zu Australien aufgebaut, wie ein Zuhause, regelmäßige Arbeit oder persönliche Beziehungen.',
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
    { '@type': 'ListItem', position: 2, name: 'Steuerresidenz', item: `${SITE_URL}/de/tax-residency` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Steuerresidenz in Australien für Working Holiday Visum-Inhaber',
  description: 'Verstehe die australischen Steuerresidenz-Kategorien und wie der Visum-Status die Steuersätze beeinflusst.',
  url: `${SITE_URL}/de/tax-residency`,
  inLanguage: 'de',
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

export default function GermanTaxResidencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-5 lg:pt-9 lg:pb-7">

            {/* Breadcrumbs */}
            <nav aria-label="Brotkrümelnavigation" className="mb-4 lg:mb-5">
              <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
                <li>
                  <Link href="/de" style={{ color: '#587066' }}>Startseite</Link>
                </li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Steuerresidenz</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '22ch' }}>
                Bist du ein australischer Steuerresident für <span style={{ color: '#0B5240' }}>steuerliche Zwecke</span>?
              </h1>
              <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '40ch' }}>
                Die Steuerresidenz bestimmt, welche Steuersätze auf dein Einkommen in Australien angewendet werden. Sie unterscheidet sich von deinem Visum- oder Aufenthaltsstatus.
              </p>
            </div>
          </div>
        </section>

        {/* ── TAX TABLES COMPARISON ─────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '32px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">

            <div className="taxres-savings-box" style={{ marginBottom: '18px', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div>
                <p className="taxres-savings-heading">Warum das wichtig ist</p>
                <p className="taxres-savings-body">
                  Wenn du als australischer Steuerresident giltst, sind die ersten $18.200 deines zu versteuernden Einkommens steuerfrei - das bedeutet, dass jede darauf gezahlte 15%-Steuer erstattet werden kann. Einkommen darüber wird mit 16% besteuert.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <TaxTable label="Working Holiday Maker (417/462)" rows={WHV_EXAMPLE_ROWS} />
              <TaxTable label="Australischer Steuerresident" rows={RESIDENT_EXAMPLE_ROWS} highlight />
            </div>
          </div>
        </section>

        {/* ── RESIDENCY CONDITIONS ──────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">

            <div className="text-center mb-6">
              <p className="font-bold mx-auto" style={{ fontSize: '14.5px', color: '#1A2822', lineHeight: 1.7, maxWidth: '50ch' }}>
                Working Holiday Visum-Inhaber können als australische Steuerresidenten gelten, wenn die folgenden Faktoren zutreffen:
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
            </div>
          </div>
        </section>

        {/* ── BACK TO FORM (above questions) ─────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
          <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <BackButton />
          </div>
        </section>

      </main>
    </>
  )
}
