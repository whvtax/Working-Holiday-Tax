import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { RelatedServices } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Steuerabsetzbare Ausgaben für Backpacker in Australien',
  description: 'Was Backpacker bei ihrer australischen Steuererklärung geltend machen können. Beispiele nach Beruf für Gastronomie, Farmarbeit, Bauarbeit, Küchenhilfen, Rideshare-Fahrer und Reinigungskräfte, sowie wie Autokosten berechnet werden.',
  keywords: [
    'Backpacker Steuerabsetzung',
    'Working Holiday Steuerabsetzung',
    'was können Backpacker absetzen',
    'ATO Absetzungen Working Holiday Maker',
    'Steuererklärung Absetzungen Backpacker',
    'Kilometerpauschale ATO',
    'WHV Steuerabsetzung',
    '417 Visum Steuerabsetzung',
  ],
  alternates: { canonical: '/de/expenses', languages: { 'en-AU': '/expenses', 'de': '/de/expenses', 'x-default': '/expenses' } },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/expenses`,
    siteName: 'Working Holiday Tax',
    title: 'Steuerabsetzbare Ausgaben für Backpacker in Australien',
    description: 'Was Backpacker wirklich bei ihrer australischen Steuererklärung absetzen können, nach Beruf sortiert.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Steuerabsetzbare Ausgaben für Backpacker in Australien',
    description: 'Was Backpacker wirklich absetzen können, nach Beruf sortiert.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const GOLDEN_RULES = [
  'Du musst das Geld selbst ausgegeben haben, ohne Erstattung durch deinen Arbeitgeber.',
  'Die Ausgabe muss direkt mit der Erzielung deines Einkommens zusammenhängen - keine private oder häusliche Ausgabe.',
  'Du brauchst einen Nachweis - eine Quittung, Rechnung oder einen Kontoauszug, der zeigt, was du gekauft hast und wann.',
]

const CAR_METHOD_ROWS = [
  ['Satz (2024-25 & 2025-26)', '88 Cent / km'],
  ['Satz (2026-27, ab 1. Juli 2026)', '91 Cent / km'],
  ['Maximal absetzbar', '5.000 km / Auto / Jahr'],
  ['Belege nötig?', 'Nein - aber du musst zeigen können, wie du die Kilometer ermittelt hast'],
]

const LOGBOOK_ROWS = [
  ['Funktionsweise', 'Absetzung des arbeitsbezogenen Prozentsatzes aller tatsächlichen Kosten'],
  ['Fahrtenbuch-Zeitraum', '12 zusammenhängende Wochen, gültig für 5 Jahre'],
  ['Maximal absetzbar', 'Keine Grenze - basiert auf deinem tatsächlichen Arbeitsanteil'],
  ['Belege nötig?', 'Ja - für jede Ausgabe, die du absetzt'],
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
    title: 'Gastronomie & Bar',
    subtitle: 'Bars, Cafés, Restaurants, Hotels',
    can: [
      'RSA-Zertifikat (Responsible Service of Alcohol) und dessen Erneuerung',
      'Rutschfeste, geschlossene Schutzschuhe',
      'Reinigung einer verpflichtenden Uniform mit dem Logo deines Arbeitgebers',
      'Ein Erste-Hilfe-Zertifikat, falls für deine Rolle erforderlich',
    ],
    cannot: [
      'Einfache schwarze Kleidung oder Schuhe ohne Logo - auch wenn dein Betrieb sie verlangt, gilt das für die ATO als gewöhnliche Kleidung, nicht als Uniform',
    ],
  },
  {
    emoji: '🌾',
    title: 'Farmarbeit & Obsternte',
    subtitle: 'Obstplantagen, Weingüter, ländliche Farmarbeit',
    can: [
      'Sonnenschutz: breitkrempiger Hut, Sonnencreme und Sonnenbrille für Arbeit im Freien',
      'Schutzhandschuhe und -stiefel',
      'Fahrtkosten zwischen verschiedenen Farmen oder Arbeitsorten während des Tages',
    ],
    cannot: [
      'Gewöhnliche Kleidung wie Jeans oder T-Shirts, auch wenn sie bei der Arbeit abgenutzt oder schmutzig wird',
      'Die tägliche Fahrt von zuhause zur ersten Farm - das gilt als gewöhnlicher Arbeitsweg',
    ],
  },
  {
    emoji: '🏗️',
    title: 'Bauarbeit',
    subtitle: 'Hilfsarbeiten, Gewerke, Baustellen',
    can: [
      'Erneuerung deiner White Card (Construction Induction Card)',
      'Stahlkappenschuhe und Warnschutzkleidung',
      'Werkzeug und Ausrüstung - Gegenstände unter $300 sind sofort absetzbar, über $300 werden sie über die Nutzungsdauer abgeschrieben',
      'Sonnenschutz für Arbeit im Freien auf der Baustelle',
    ],
    cannot: [
      'Gewöhnliche Kleidung, auch wenn sie auf der Baustelle beschädigt oder schmutzig wird',
      'Deine allererste White Card, wenn du sie nur gebraucht hast, um für den Job überhaupt zugelassen zu werden',
    ],
  },
  {
    emoji: '🔪',
    title: 'Koch & Küchenhilfe',
    subtitle: 'Gewerbeküchen, Restaurants',
    can: [
      'Kochmesser und andere Küchenwerkzeuge, die du selbst kaufst',
      'Kochjacke oder karierte Kochhose - diese zählen als berufsspezifische Kleidung',
      'Rutschfeste Küchenschuhe',
      'Ein Food-Safety-Supervisor-Zertifikat, falls für deine Rolle erforderlich',
    ],
    cannot: [
      'Alltagskleidung, die unter der Kochjacke getragen wird',
    ],
  },
  {
    emoji: '🚗',
    title: 'Rideshare & Lieferfahrten',
    subtitle: 'Uber, Uber Eats, DoorDash und Ähnliches',
    can: [
      'Autokosten für den arbeitsbezogenen Anteil deiner Fahrten - per Kilometerpauschale oder Fahrtenbuch (siehe unten)',
      'Der arbeitsbezogene Anteil deines Mobilfunkvertrags',
      'Autowäsche, um das Auto in einem für Fahrgäste angemessenen Zustand zu halten',
      'Parkgebühren, die während der Arbeit anfallen',
    ],
    cannot: [
      'Der private Anteil jeder Fahrt oder dein gewöhnlicher Arbeitsweg',
      'Park- oder Geschwindigkeitsstrafen - diese sind nie absetzbar, egal aus welchem Grund',
    ],
  },
  {
    emoji: '🧹',
    title: 'Reinigung',
    subtitle: 'Gewerbliche und private Reinigungsarbeit',
    can: [
      'Reinigungsmittel und -ausrüstung, die du selbst kaufst und nicht erstattet bekommst',
      'Schutzhandschuhe',
      'Fahrtkosten zwischen Kundenorten während des Tages',
    ],
    cannot: [
      'Die tägliche Fahrt von zuhause zum ersten Auftrag',
      'Gewöhnliche Kleidung, die beim Putzen getragen wird',
    ],
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Ausgaben', item: `${SITE_URL}/de/expenses` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Steuerabsetzbare Ausgaben für Backpacker in Australien',
  description: 'Was Backpacker bei ihrer australischen Steuererklärung absetzen können, nach Beruf sortiert.',
  url: `${SITE_URL}/de/expenses`,
  inLanguage: 'de-DE',
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
        <p className="exp-card-label exp-card-label-yes">✓ Kann eventuell abgesetzt werden</p>
        <ul className="exp-card-list">
          {o.can.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
      <div className="exp-card-section">
        <p className="exp-card-label exp-card-label-no">✕ Normalerweise nicht absetzbar</p>
        <ul className="exp-card-list">
          {o.cannot.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default function ExpensesPageDE() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main style={{ background: '#fff', minHeight: '100vh' }}>

        <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-5 lg:pt-9 lg:pb-7">

            <nav aria-label="Breadcrumb" className="mb-4 lg:mb-5">
              <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
                <li><Link href="/de" style={{ color: '#587066' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Ausgaben</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '24ch' }}>
                Was können Backpacker wirklich <span style={{ color: '#0B5240' }}>steuerlich absetzen</span>?
              </h1>
              <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '46ch' }}>
                Arbeitsbezogene Absetzungen können deiner Rückerstattung Hunderte Dollar hinzufügen - aber nur, wenn die Ausgabe wirklich qualifiziert. Hier ist genau, was zählt, nach Beruf.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <p className="font-bold mx-auto" style={{ fontSize: '14.5px', color: '#1A2822', lineHeight: 1.7, maxWidth: '54ch' }}>
                Vor allen berufsspezifischen Beispielen muss jede einzelne Absetzung diese drei ATO-Tests bestehen:
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

        <section style={{ background: '#F5F9F7', paddingTop: '32px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="taxres-savings-box" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div>
                <p className="taxres-savings-heading">Nachweise aufbewahren</p>
                <p className="taxres-savings-body">
                  Bewahre eine Quittung, Rechnung oder einen Kontoauszug für alles auf, was du absetzen möchtest - ein Foto auf deinem Handy reicht. Wenn deine gesamten arbeitsbezogenen Absetzungen im Jahr unter $300 liegen, verlangt die ATO keinen schriftlichen Nachweis, aber du musst trotzdem erklären können, wie du auf den Betrag gekommen bist.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Autokosten: zwei Methoden
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '54ch' }}>
                Nur arbeitsbezogenes Fahren zählt - niemals dein gewöhnlicher Arbeitsweg. Es gibt zwei Methoden; du kannst pro Auto und Jahr nur eine verwenden.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="Kilometerpauschale" rows={CAR_METHOD_ROWS} highlight />
              <CompareTable label="Fahrtenbuch-Methode" rows={LOGBOOK_ROWS} />
            </div>
            <p className="font-light mx-auto text-center" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, maxWidth: '60ch', marginTop: '18px' }}>
              Wenn du mehr als 5.000 arbeitsbezogene km im Jahr fährst, bringt die Fahrtenbuch-Methode meist eine höhere Rückerstattung - erfordert aber ein 12-wöchiges Fahrtenbuch und alle Belege.
            </p>
          </div>
        </section>

        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '20px' }}>
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Absetzungen nach Beruf
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '56ch' }}>
                Die häufigsten Jobs, in denen Backpacker in Australien arbeiten, und genau was in der Regel absetzbar ist - und was nicht.
              </p>
            </div>
            <div className="exp-grid">
              {OCCUPATIONS.map((o, i) => <OccupationCard key={i} o={o} />)}
            </div>
          </div>
        </section>

        <RelatedServices
          label="Ausführliche Guides nach Beruf"
          items={[
            { label: 'Essenslieferung', desc: 'Uber Eats, DoorDash & mehr',        href: '/de/expenses/delivery-drivers' },
            { label: 'Gastronomie',     desc: 'Bars, Cafés & Restaurants',         href: '/de/expenses/hospitality' },
            { label: 'Farmarbeit',      desc: 'Obsternte & Farmjobs',              href: '/de/expenses/farm-work' },
            { label: 'Bauarbeit',       desc: 'Werkzeug, PSA & White Card',        href: '/de/expenses/construction' },
            { label: 'Hilfsarbeiten',   desc: 'Lager & Zeitarbeit',                href: '/de/expenses/labouring' },
            { label: 'Reinigungskräfte',desc: 'ABN, GST & Fahrten zwischen Jobs',  href: '/de/expenses/cleaners' },
            { label: 'FIFO',            desc: 'Zone-Offset & Reisekosten',         href: '/de/expenses/fifo' },
          ]}
        />

        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              Dies sind allgemeine Informationen, keine persönliche Steuerberatung - jede Situation ist etwas anders. Wenn du deine Erklärung bei uns einreichst, gehen wir deinen spezifischen Beruf und deine Umstände durch, damit du alles absetzt, worauf du Anspruch hast, und nichts, worauf nicht.
            </p>
            <Link href="/de/tax-form" className="inline-flex items-center justify-center font-semibold"
              style={{ minHeight: '52px', padding: '0 36px', background: '#0B5240', color: '#fff', borderRadius: '100px', fontSize: '15px', textDecoration: 'none' }}>
              Steuerrückerstattung beantragen →
            </Link>
          </div>
        </section>

      </main>
      <MobileCta href="/de/tax-form" lang="de" />
    </>
  )
}
