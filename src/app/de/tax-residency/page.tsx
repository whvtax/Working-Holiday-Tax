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
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/tax-residency`,
    siteName: 'Working Holiday Tax',
    title: 'Steuerresidenz in Australien für WHV-Inhaber',
    description: 'Verstehe die Steuerresidenz-Kategorien und wie dein Visum deinen Steuersatz beeinflusst.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steuerresidenz in Australien für WHV-Inhaber',
    description: 'Verstehe die Steuerresidenz und wie dein Visum deinen Steuersatz beeinflusst.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WHV_ROWS = [
  ['0 $ - 45.000 $',        '15 %'],
  ['45.001 $ - 135.000 $',  '6.750 $ + 30 %'],
  ['135.001 $ - 190.000 $', '33.750 $ + 37 %'],
  ['190.001 $+',           '54.100 $ + 45 %'],
]

const RESIDENT_ROWS = [
  ['0 $ - 18.200 $',        '0 %'],
  ['18.201 $ - 45.000 $',   '16 %'],
  ['45.001 $ - 135.000 $',  '4.288 $ + 30 %'],
  ['135.001 $ - 190.000 $', '31.288 $ + 37 %'],
  ['190.001 $+',           '51.638 $ + 45 %'],
]

const NDA_COUNTRIES = ['Chile', 'Finnland', 'Deutschland', 'Israel', 'Japan', 'Norwegen', 'Türkei', 'Großbritannien']

const CONDITIONS = [
  'Du hast einen Reisepass aus einem der NDA-Länder (siehe unten).',
  'Dein gewöhnlicher Wohnsitz ist in Australien.',
  'Du hast die Absicht, in Australien zu leben.',
  'Du hältst dich insgesamt 183 Tage im Steuerjahr in Australien auf.',
]

const FAQS = [
  {
    question: 'Was ist Steuerresidenz?',
    answer: 'Die Steuerresidenz bestimmt, welche Steuersätze auf dein Einkommen in Australien angewendet werden. Es gibt drei Kategorien: Nicht-Resident, Working Holiday Maker (417/462 Visum) und australischer Steuerresident. Jede Kategorie hat andere Steuersätze und Freibeträge.',
  },
  {
    question: 'Bin ich Resident oder Working Holiday Maker für die Steuer?',
    answer: 'Standardmäßig werden Inhaber eines 417 oder 462 Visums als Working Holiday Maker besteuert - 15 % ab dem ersten Dollar. Wenn du aber aus einem NDA-Land (Nichtdiskriminierungsabkommen) kommst und bestimmte Bedingungen erfüllst, kannst du als australischer Steuerresident besteuert werden - das heißt: Freibetrag von 18.200 $.',
  },
  {
    question: 'Was sind NDA-Länder?',
    answer: 'NDA steht für Non-Discrimination Agreement (Nichtdiskriminierungsabkommen). Bürger dieser Länder können zu Residenten-Sätzen besteuert werden, wenn sie die Residenz-Bedingungen erfüllen. Die Länder sind: Chile, Finnland, Deutschland, Israel, Japan, Norwegen, Türkei und Großbritannien.',
  },
  {
    question: 'Wie viel spare ich, wenn ich als Resident eingestuft werde?',
    answer: 'Bei einem Einkommen von 45.000 $ ist der Unterschied zwischen WHM-Steuer (6.750 $) und Residenten-Steuer (4.288 $) genau 2.462 $. Das ist Geld, das du zurückbekommen kannst, wenn du als Resident eingestuft wirst. Wir prüfen deine Situation und wenden den richtigen Status bei deiner Steuererklärung an.',
  },
  {
    question: 'Was ist mit Inhabern eines Studentenvisums (500)?',
    answer: 'Inhaber eines Studentenvisums (500) werden in der Regel als australische Steuerresidenten behandelt. Das heißt, sie profitieren vom Freibetrag von 18.200 $ und niedrigeren Grenzsteuersätzen.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'de',
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
        <thead>
          <tr>
            <th>Zu versteuerndes Einkommen</th>
            <th>Steuer auf dieses Einkommen</th>
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

export default function GermanTaxResidencyPage() {
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
            <nav aria-label="Brotkrümelnavigation" className="mb-5 lg:mb-6">
              <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
                <li>
                  <Link href="/de" style={{ color: '#587066' }}>Startseite</Link>
                </li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Steuerresidenz</li>
              </ol>
            </nav>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-3 lg:mb-4 justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
                <span className="font-medium uppercase" style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>
                  Steuerresidenz erklärt
                </span>
              </div>

              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '20ch' }}>
                Verstehe deinen Steuerstatus<br />
                <span style={{ color: '#0B5240' }}>in Australien</span>
              </h1>

              <p className="font-light mx-auto"
                style={{ fontSize: 'clamp(14.5px, 1.4vw, 17px)', lineHeight: 1.7, color: 'rgba(10,15,13,0.65)', maxWidth: '54ch' }}>
                Dein Visum und deine Umstände bestimmen, welche Steuersätze auf dein australisches Einkommen angewendet werden. Wenn du deinen Status kennst, kannst du Tausende Dollar sparen.
              </p>
            </div>
          </div>
        </section>

        {/* ── TAX TABLES COMPARISON ─────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '50px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <TaxTable label="Working Holiday Maker (417/462)" rows={WHV_ROWS} />
              <TaxTable label="Australischer Steuerresident" rows={RESIDENT_ROWS} highlight />
            </div>

            <div className="taxres-savings-box">
              <div className="taxres-savings-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="#0B5240" strokeWidth="1.6"/>
                  <path d="M12 7v5l3 2" stroke="#0B5240" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="taxres-savings-heading">Mögliche Ersparnis</p>
                <p className="taxres-savings-body">
                  Wenn du als australischer Steuerresident eingestuft wirst, kannst du bei einem Einkommen von 45.000 $ bis zu <strong>2.462 $ zurück</strong> bekommen. Wir prüfen deine Berechtigung, wenn wir deine Steuererklärung machen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── RESIDENCY CONDITIONS ──────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">

            <div className="text-center mb-8">
              <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
                Residenten-Klassifizierung
              </p>
              <h2 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: '10px', maxWidth: '28ch' }}>
                Kannst du als Resident besteuert werden?
              </h2>
              <p className="font-light mx-auto" style={{ fontSize: '14.5px', color: '#587066', lineHeight: 1.7, maxWidth: '50ch' }}>
                Working Holiday Visum-Inhaber können als australische Steuerresidenten eingestuft werden, wenn sie ALLE folgenden Bedingungen erfüllen:
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
                <p className="taxres-nda-label">NDA-Länder (Nichtdiskriminierungsabkommen)</p>
                <div className="flex gap-1.5 flex-wrap">
                  {NDA_COUNTRIES.map((c) => (
                    <span key={c} className="taxres-nda-pill">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="taxres-notes">
                <p>📅 Das australische Steuerjahr läuft vom <strong>1. Juli bis 30. Juni</strong>.</p>
                <p>🎓 Inhaber eines Studentenvisums (500) werden in der Regel als Steuerresidenten behandelt.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
          <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
                Häufige Fragen
              </p>
              <h2 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
                Fragen zur Steuerresidenz
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

        {/* ── BACK TO FORM ─────────────────────────────────────────────────── */}
        <section style={{ background: '#0B5240', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[640px] mx-auto px-5 md:px-8 lg:px-12 text-center reveal">
            <p className="font-light mx-auto" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '20px', maxWidth: '40ch' }}>
              Jetzt, wo du deine Residenz verstehst, fülle deine Steuererklärung weiter aus.
            </p>
            <BackButton />
          </div>
        </section>

      </main>
    </>
  )
}
