import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep, RelatedServices } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Steuerabsetzung für Reinigungskräfte in Australien: ABN, Ausrüstung & Fahrten zwischen Jobs',
  description: 'Hausreinigungen, Endreinigungen und Airtasker-Jobs sind meist Einkommen als ABN Sole Trader. Gewerbe- und Büroreinigung, für die dich eine Reinigungsfirma einteilt, ist meist eine TFN-Anstellung unter dem Cleaning Services Award. Was beide Seiten bei Ausrüstung, Uniform, Wäsche und Fahrten zwischen Jobs absetzen können, und ab wann die GST-Registrierung greift.',
  keywords: [
    'Reinigungskraft Steuerabsetzung Australien',
    'Hausreinigung Steuer ABN',
    'Endreinigung Steuerabsetzung',
    'Gewerbereinigung Steuer Australien',
    'Büroreinigung Steuerabsetzung',
    'Airtasker Reinigung Steuer Working Holiday',
    'Cleaning Services Award Steuer',
    'ABN oder TFN Reinigungskraft',
    'Reinigungsausrüstung Steuerabsetzung ATO',
    'Working Holiday Reinigung Steuer',
    '417 462 Visum Reinigung Steuer',
    'Backpacker Reinigungsjob Steuererklärung',
    'Privathaushalt Reinigung Steuerabsetzung',
    'Reinigungsmittel steuerlich absetzbar',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/expenses/cleaners`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/cleaners`,
      'de': `${SITE_URL}/de/expenses/cleaners`,
      'ja': `${SITE_URL}/ja/expenses/cleaners`,
      'x-default': `${SITE_URL}/expenses/cleaners`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/expenses/cleaners`,
    siteName: 'Working Holiday Tax',
    title: 'Steuerabsetzung für Reinigungskräfte in Australien: ABN, Ausrüstung & Fahrten zwischen Jobs',
    description: 'Hausreinigungen und App-basierte Jobs sind meist Einkommen als ABN Sole Trader; Gewerbereinigung, für die dich eine Firma einteilt, ist meist eine TFN-Anstellung. Was beide Seiten steuerlich absetzen können.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Steuerabsetzung für Reinigungskräfte in Australien: ABN, Ausrüstung & Fahrten zwischen Jobs',
    description: 'Hausreinigungen und App-basierte Jobs sind meist Einkommen als ABN Sole Trader; Gewerbereinigung, für die dich eine Firma einteilt, ist meist eine TFN-Anstellung. Was beide Seiten steuerlich absetzen können.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const UNDER_300_ROWS = [
  ['Wie es abgesetzt wird', 'Vollständig, sofort'],
  ['Wann du es absetzt', 'Im Jahr des Kaufs'],
  ['Beispiel', 'Ein Mopp-, Eimer- und Wringer-Set für $70'],
]

const OVER_300_ROWS = [
  ['Wie es abgesetzt wird', 'Verteilt über die Nutzungsdauer'],
  ['Wann du es absetzt', 'Anteilig, für jedes Jahr, in dem du es besitzt'],
  ['Beispiel', 'Ein Staubsauger in Gewerbequalität für $450'],
]

const CAR_METHOD_ROWS = [
  ['Satz (2024-25 & 2025-26)', '88 Cent / km'],
  ['Satz (2026-27, ab 1. Juli 2026)', '91 Cent / km'],
  ['Maximal absetzbar', '5.000 km / Auto / Jahr'],
  ['Belege nötig?', 'Nein - aber du musst zeigen können, wie du deine Kilometer ermittelt hast'],
]

const LOGBOOK_ROWS = [
  ['Funktionsweise', 'Absetzung des arbeitsbezogenen Prozentsatzes aller tatsächlichen Kosten'],
  ['Fahrtenbuch-Zeitraum', '12 zusammenhängende Wochen, gültig für 5 Jahre'],
  ['Maximal absetzbar', 'Keine Grenze - basiert auf deinem tatsächlichen Arbeitsanteil'],
  ['Belege nötig?', 'Ja - für jede Ausgabe, die du absetzt'],
]

const TRAVEL_CONDITIONS = [
  'Die Ausrüstung ist für den Reinigungsjob, den du an diesem Tag erledigst, unverzichtbar.',
  'Sie ist wirklich sperrig - ihre Größe oder ihr Gewicht ist der tatsächliche Grund, warum ein Fahrzeug nötig ist, um sie zu transportieren, nicht nur Bequemlichkeit.',
  'Es gibt keinen sicheren Ort, um sie am Arbeitsplatz zu lassen, also muss sie mit dir nach Hause fahren.',
]

const INVOICE_CHECKLIST = [
  'Dein Name oder eingetragener Geschäftsname, genau so, wie er bei deiner ABN hinterlegt ist.',
  'Deine ABN, deutlich sichtbar auf jeder Rechnung, die du verschickst.',
  'Der Name des Kunden - die Person oder das Unternehmen, das die Reinigung gebucht hat.',
  'Das Rechnungsdatum, und das Datum der Reinigung, falls es davon abweicht.',
  'Eine Beschreibung der Arbeit - die Immobilie, die Art der Reinigung und ungefähr, wie lange sie gedauert hat.',
  'Der Gesamtbetrag, mit einer separaten GST-Zeile nur, wenn du für GST registriert bist.',
]

type CleanerType = {
  emoji: string
  kind: string
  title: string
  subtitle: string
  signals: string[]
  ctaLabel: string
  ctaHref: string
}

const FORK_CARDS: CleanerType[] = [
  {
    emoji: '🧽',
    kind: 'eine ABN',
    title: 'Private, direkte & App-basierte Reinigung',
    subtitle: 'Hausreinigungen, Endreinigungen, Airtasker',
    signals: [
      'Du findest deine Kunden selbst, per Mundpropaganda oder über eine App wie Airtasker',
      'Du wirst per Rechnung oder App-Auszahlung bezahlt, nicht per Gehaltsabrechnung',
      'Es wird keine Steuer einbehalten, bevor das Geld auf deinem Konto landet',
      'Du bestimmst selbst deinen Preis, deine Arbeitszeiten und welche Jobs du annimmst',
      'Es wird keine Superannuation zusätzlich zu deinem Verdienst gezahlt',
    ],
    ctaLabel: 'Hier starten: ABN registrieren →',
    ctaHref: '/de/abn',
  },
  {
    emoji: '🏢',
    kind: 'eine TFN',
    title: 'Von einer Reinigungsfirma eingeteilt',
    subtitle: 'Gewerbe- & Büroreinigung, Cleaning Services Award',
    signals: [
      'Eine Reinigungsfirma teilt dich für bestimmte Standorte und Schichten ein',
      'Du bekommst eine Gehaltsabrechnung, auf der schon Steuer einbehalten ist',
      'Die Firma legt deinen Stundenlohn, deine Arbeitszeiten und die Art der Ausführung fest',
      'Du bekommst Superannuation zusätzlich zu deinem Lohn gezahlt',
      'Du hast bei Arbeitsbeginn ein TFN Declaration Form ausgefüllt',
    ],
    ctaLabel: 'Hier starten: TFN beantragen →',
    ctaHref: '/de/tfn',
  },
]

const faqs = [
  {
    question: 'Bin ich als Reinigungskraft ABN Sole Trader oder TFN-Angestellter?',
    answer: "Es kommt darauf an, für wen du putzt und wie du an den Job gekommen bist, nicht darauf, wie der Job genannt wird. Putzt du für private Kunden, die du selbst gefunden hast, machst Endreinigungen für einen ausziehenden Mieter, oder nimmst Jobs über eine App wie Airtasker an, bist du fast immer ABN Sole Trader - du legst den Preis fest, stellst Rechnungen für den Job, und es wird keine Steuer einbehalten. Wirst du von einer Reinigungsfirma für bestimmte Standorte und Schichten eingeteilt, bist du fast immer TFN-angestellt, meist unter dem Cleaning Services Award 2020, mit Steuer, die von einer Gehaltsabrechnung einbehalten wird, und Super obendrauf. Rund 28 % der Beschäftigten in der australischen Reinigungsbranche arbeiten als Sole Trader, einer der höheren Anteile aller Branchen - es lohnt sich also wirklich, zu prüfen, was auf dich zutrifft, statt es einfach anzunehmen.",
  },
  {
    question: 'Welche Reinigungsausrüstung und -mittel kann ich absetzen?',
    answer: "Alles, was du selbst kaufst und wofür du keine Erstattung bekommst - Mopps, Eimer, Schaber, Klingen, Wringer sowie Reinigungschemikalien oder -mittel -, ist absetzbar. Gegenstände, die $300 oder weniger kosten, setzt du im Jahr des Kaufs vollständig ab. Alles ab $300, wie ein Staubsauger in Gewerbequalität oder eine Bodenpoliermaschine, wird stattdessen abgeschrieben und schrittweise über die Nutzungsdauer statt auf einmal abgesetzt.",
  },
  {
    question: 'Kann ich meine Uniform, Schutzausrüstung und deren Wäsche absetzen?',
    answer: "Ja, zu einer vorgeschriebenen Uniform, die dir dein Arbeitgeber oder Kunde nicht stellt, und zu Schutzausrüstung mit einer echten Sicherheitsfunktion - Stahlkappenschuhe, eine Schürze, Handschuhe, Schutzbrille oder Gesichtsschutz. Nein zu gewöhnlicher Kleidung wie einer schlichten schwarzen Hose oder einem einfachen T-Shirt, selbst wenn Putzen der einzige Grund ist, warum du sie besitzt; die ATO behandelt das als herkömmliche Kleidung, nicht als Uniform. Das Waschen absetzbarer Arbeitskleidung folgt den Standardsätzen der ATO: $1 pro Ladung, wenn nur Arbeitskleidung darin ist, oder 50 Cent pro Ladung, wenn sie mit Alltagskleidung zusammen gewaschen wird. Sobald deine Wäscheabsetzungen für das Jahr insgesamt mehr als $150 ergeben, führe ein einfaches Tagebuch, was du wann gewaschen hast.",
  },
  {
    question: 'Kann ich die Fahrt zwischen Reinigungsjobs absetzen?',
    answer: "Ja. Putzt du an einem Tag drei oder vier verschiedene Häuser oder Büros, ist die Fahrt zwischen ihnen absetzbar, berechnet mit der Kilometerpauschale oder einem Fahrtenbuch. Nicht absetzbar ist die allererste Fahrt des Tages, von zuhause zu deinem ersten Job - das ist gewöhnlicher Arbeitsweg, genau wie bei jedem anderen Beruf -, es sei denn, du transportierst wirklich sperrige Reinigungsausrüstung, die für den Job unverzichtbar ist, und es gibt an keinem einzigen Arbeitsplatz einen sicheren Ort, um sie zu lagern; in diesem Fall kann auch diese Fahrt zählen.",
  },
  {
    question: 'Muss ich mich als Reinigungskraft mit ABN für GST registrieren?',
    answer: "Erst, sobald dein Jahresumsatz aus der Reinigungsarbeit $75.000 übersteigt. Die meisten Working Holiday Maker, die Teilzeit, privat oder über eine App putzen, kommen dem bei Weitem nicht nahe - solange du also kein wirklich großes Reinigungsgeschäft betreibst, kannst du GST außer Acht lassen und einfach ohne GST-Zeile Rechnungen stellen.",
  },
  {
    question: 'Ich habe Reinigungsausrüstung oder Chemikalien gekauft, bevor ich überhaupt Kunden hatte - kann ich das trotzdem absetzen?',
    answer: "Grundsätzlich ja, vorausgesetzt der Kauf war wirklich Teil deiner Vorbereitung, um für Kunden zu putzen - zum Beispiel, wenn du deinen Mopp, Eimer und deine Chemikalien etwa zu der Zeit gekauft hast, als du deine ABN registriert und angefangen hast, dich auf einer App zu listen oder für Aufträge zu werben. Die ATO schaut darauf, ob du zu diesem Zeitpunkt wirklich schon wie ein Geschäft operiert hast, nicht nur, ob schon eine Rechnung eingegangen war - heb also die Belege auf sowie eine einfache Notiz, wann du deine ABN registriert und mit der Auftragssuche begonnen hast. Liegt zwischen dem Kauf der Ausrüstung und dem tatsächlichen Beginn deiner Reinigungsarbeit eine lange Lücke, lass dieses konkrete Timing prüfen, bevor du dich darauf verlässt.",
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Ausgaben', item: `${SITE_URL}/de/expenses` },
    { '@type': 'ListItem', position: 3, name: 'Reinigungskräfte', item: `${SITE_URL}/de/expenses/cleaners` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Steuerabsetzung für Reinigungskräfte in Australien: ABN Sole Trader vs. TFN-Angestellte',
  description: 'Was Reinigungskräfte in Australien steuerlich absetzen können, egal ob du als ABN Sole Trader privat oder über eine App putzt, oder als TFN-Angestellter von einer gewerblichen Reinigungsfirma eingeteilt wirst.',
  url: `${SITE_URL}/de/expenses/cleaners`,
  inLanguage: 'de-DE',
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
  '@id': `${SITE_URL}/de/expenses/cleaners#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/de/expenses/cleaners`,
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

function ForkCard({ f }: { f: CleanerType }) {
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
        Was du brauchst: {f.kind}
      </p>
      <div className="exp-card-section">
        <p className="exp-card-label" style={{ color: '#587066' }}>Anzeichen, dass das auf dich zutrifft</p>
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

export default function CleanersExpensesPageDE() {
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

            <nav aria-label="Brotkrümelnavigation" className="mb-4 lg:mb-5">
              <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
                <li><Link href="/de" style={{ color: '#587066' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li><Link href="/de/expenses" style={{ color: '#587066' }}>Ausgaben</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Reinigungskräfte</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '28ch' }}>
                Reinigungskraft-Steuer: <span style={{ color: '#0B5240' }}>ABN Sole Trader oder TFN-Angestellter?</span>
              </h1>
              <p className="font-semibold mx-auto hero-sub" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '58ch' }}>
                Putzt du private Haushalte, machst Endreinigungen oder App-basierte Jobs wie Airtasker, bist du fast immer ABN Sole Trader. Teilt dich eine gewerbliche Reinigungsfirma für Schichten ein, bist du fast immer TFN-Angestellter. Hier erfährst du, wie du erkennst, was auf dich zutrifft, und was du in beiden Fällen genau absetzen kannst.
              </p>
            </div>
          </div>
        </section>

        {/* ── THE ABN / TFN FORK (this page's unique hook) ────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '20px' }}>
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Für wen putzt du, und wie bist du an den Job gekommen?
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '62ch' }}>
                Rund 28 % der Beschäftigten in der australischen Reinigungsbranche arbeiten als Sole Trader - einer der höchsten Anteile aller Branchen. Kläre zuerst, auf welcher Seite dieser Aufteilung du wirklich stehst, denn beide werden völlig unterschiedlich besteuert.
              </p>
            </div>

            <div className="exp-grid">
              {FORK_CARDS.map((f, i) => <ForkCard key={i} f={f} />)}
            </div>

            <div className="max-w-[680px] mx-auto text-center" style={{ marginTop: '8px' }}>
              <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7, marginBottom: '10px' }}>
                Viele Reinigungskräfte machen im Laufe eines Jahres beides - ein paar eingeteilte Schichten bei einer gewerblichen Reinigungsfirma unter TFN, und nebenbei private Hausreinigungen über Airtasker unter einer ABN. Das ist völlig normal; du gibst einfach beide Einkommensarten in derselben Steuererklärung an, idealerweise mit getrennten Aufzeichnungen für jede.
              </p>
              <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7 }}>
                Eine Warnung: Wenn eine Reinigungsfirma von dir verlangt, eine ABN zu haben, obwohl sie deinen Dienstplan festlegt, deine Arbeit beaufsichtigt und dir Reinigungsmittel oder Ausrüstung stellt, könnte das verdeckte Anstellung sein und kein echtes Contracting. Das solltest du lieber prüfen lassen, bevor du dich registrierst, statt einfach davon auszugehen, dass die Bezeichnung ABN das schon klärt.
              </p>
            </div>

            <div className="max-w-[680px] mx-auto">
              <div className="taxres-savings-box">
                <div>
                  <p className="taxres-savings-heading">Wenn dich eine Reinigungsfirma unter einer TFN anstellt</p>
                  <p className="taxres-savings-body">
                    Die TFN Declaration, die du ausfüllst, fragt nach dem Steuerfreibetrag. Als Working Holiday Maker lautet die richtige Antwort immer Nein, bei jedem Reinigungsarbeitgeber, für den du arbeitest - mit einem 417- oder 462-Visum bekommst du überhaupt keinen Steuerfreibetrag, bei keinem Arbeitgeber, ganz gleich, wie viele eingeteilte Reinigungsjobs du gerade gleichzeitig jonglierst.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT CLEANERS CAN CLAIM ──────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Was Reinigungskräfte wirklich absetzen können
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                Derselbe Test gilt auf beiden Seiten der ABN/TFN-Aufteilung: Du hast es selbst bezahlt, es hängt direkt mit deiner Reinigungsarbeit zusammen, und du kannst einen Nachweis dafür vorlegen.
              </p>
            </div>

            {/* Equipment */}
            <h3 className="font-serif font-black text-ink text-center" style={{ fontSize: 'clamp(18px,1.9vw,22px)', letterSpacing: '-0.015em', marginBottom: '10px' }}>
              Reinigungsausrüstung und -mittel: die $300-Regel
            </h3>
            <p className="font-light mx-auto text-center" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', maxWidth: '680px', marginBottom: '20px' }}>
              Wenn du deine eigene Ausrüstung kaufst und keine Erstattung dafür bekommst, sind die Kosten absetzbar. Wie du sie absetzt, hängt vom Preis ab.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="Unter $300" rows={UNDER_300_ROWS} highlight />
              <CompareTable label="$300 oder mehr" rows={OVER_300_ROWS} />
            </div>

            <div className="max-w-[680px] mx-auto">
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginTop: '22px' }}>
                In der Praxis liegt fast alles in der Ausrüstung einer Reinigungskraft unter der $300-Grenze und wird sofort abgesetzt: Mopps, Eimer, Schaber, Klingen, Wringer sowie die Reinigungschemikalien und -mittel, die du von Job zu Job verbrauchst. Es sind die größeren, selteneren Anschaffungen - ein Staubsauger in Gewerbequalität, eine Bodenpoliermaschine, ein Hochdruckreiniger -, die die $300-Grenze überschreiten und stattdessen abgeschrieben werden.
              </p>
              <div className="info-block">
                <p>
                  Beim Kauf eines Sets ändert sich das. Wenn mehrere Gegenstände zusammen als Set gekauft werden und das Set insgesamt $300 oder mehr kostet - zum Beispiel ein Starter-Set aus Mopp, Eimer, Caddy und Chemikalien von einem Reinigungsgroßhändler -, wird das gesamte Set über die Zeit abgeschrieben, selbst wenn jedes einzelne Teil für sich genommen unter $300 gekostet hätte.
                </p>
              </div>
            </div>

            {/* Uniform, PPE, laundry */}
            <h3 className="font-serif font-black text-ink text-center" style={{ fontSize: 'clamp(18px,1.9vw,22px)', letterSpacing: '-0.015em', margin: '34px 0 10px' }}>
              Uniform, Schutzausrüstung und ihre Wäsche
            </h3>
            <div className="max-w-[680px] mx-auto">
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                Wenn ein Kunde oder Arbeitgeber eine bestimmte Uniform verlangt und sie dir nicht stellt, sind die Kosten dafür absetzbar. Dasselbe gilt für Schutzausrüstung mit einer echten Sicherheitsfunktion: Stahlkappenschuhe, eine Schürze, Handschuhe, Schutzbrille oder ein Gesichtsschutz für Jobs mit starken Chemikalien oder Staub. Diese Gegenstände qualifizieren sich, weil sie eine bestimmte Aufgabe erfüllen - dich zu schützen oder eine echte Uniformpflicht zu erfüllen -, nicht weil du sie zufällig nur beim Putzen trägst.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                Was nicht qualifiziert, ist gewöhnliche, herkömmliche Kleidung - eine schlichte schwarze Hose, ein einfarbiges Polo-Shirt, Jogginghosen -, selbst wenn Putzen der einzige Grund ist, warum du sie besitzt, und selbst wenn ein Kunde auf einer bestimmten Farbe besteht. Der Test der ATO fragt nicht, warum du etwas gekauft hast, sondern was der Gegenstand tatsächlich ist: Kleidung, die jeder überall tragen könnte, wird nicht dadurch zur Uniform, dass jemand sie vorschreibt.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                Das Waschen absetzbarer Arbeitskleidung - einer verpflichtenden Uniform oder echter Schutzausrüstung - folgt den Standard-Wäschesätzen der ATO: $1 pro Ladung, wenn die Ladung nur Arbeitskleidung enthält, oder 50 Cent pro Ladung, wenn sie zusammen mit deiner Alltagskleidung gewaschen wird. Sobald deine Wäscheabsetzungen für das Jahr insgesamt mehr als $150 ergeben, empfiehlt die ATO, ein einfaches Tagebuch zu führen, was du wann gewaschen hast, statt dich auf eine Schätzung zu verlassen.
              </p>
            </div>

            {/* Travel */}
            <h3 className="font-serif font-black text-ink text-center" style={{ fontSize: 'clamp(18px,1.9vw,22px)', letterSpacing: '-0.015em', margin: '34px 0 10px' }}>
              Fahrten zwischen Reinigungsjobs
            </h3>
            <div className="max-w-[680px] mx-auto">
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                Hier steckt für die meisten Reinigungskräfte das eigentliche Geld. Putzt du an einem Tag drei oder vier verschiedene Häuser oder Büros, ist die Fahrt von einem zum nächsten absetzbar - es ist eine Fahrt zwischen zwei Arbeitsplätzen, kein Arbeitsweg zu einem einzigen festen Standort. Ausgeschlossen sind nur die allererste Fahrt des Tages, von zuhause zu deinem ersten Job, und die letzte Fahrt nach Hause - genau wie bei jedem anderen Beruf.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '18px' }}>
                Die Fahrt von zuhause zu einem regelmäßigen Arbeitsplatz gilt normalerweise als privater Arbeitsweg, und daran ändert sich nichts, nur weil du beruflich putzt. Es gibt eine eng gefasste Ausnahme, und alle drei Bedingungen unten müssen zutreffen.
              </p>
            </div>

            <div className="max-w-[680px] mx-auto mb-6">
              <div className="flex flex-col gap-3">
                {TRAVEL_CONDITIONS.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">{c}</p>
                  </div>
                ))}
              </div>
              <p className="font-light mx-auto" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch', marginTop: '16px', textAlign: 'center' }}>
                Wenn es an einem deiner Arbeitsplätze einen sicheren Ort gibt, um deine Ausrüstung zu lassen, oder das, was du mitnimmst, in eine normale Tasche passen würde, gilt die Fahrt weiterhin als gewöhnlicher Arbeitsweg und ist nicht absetzbar.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="Kilometerpauschale" rows={CAR_METHOD_ROWS} highlight />
              <CompareTable label="Fahrtenbuch-Methode" rows={LOGBOOK_ROWS} />
            </div>
            <p className="font-light mx-auto text-center" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, maxWidth: '64ch', marginTop: '18px' }}>
              Kommst du zwischen deinen Kunden jede Woche auf viele Kilometer, deckt die Fahrtenbuch-Methode meist mehr deiner tatsächlichen Kosten ab - dafür musst du aber ein 12-wöchiges Fahrtenbuch führen und jede Tank- und Servicequittung aufheben.
            </p>

            {/* Can't claim */}
            <div className="max-w-[680px] mx-auto">
              <h3 className="font-serif font-black" style={{ fontSize: 'clamp(16px,1.7vw,19px)', color: '#B54708', letterSpacing: '-0.015em', margin: '34px 0 8px', lineHeight: 1.3 }}>
                Was du nicht absetzen kannst
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                Ein paar Dinge bringen Reinigungskräfte regelmäßig durcheinander, egal auf welcher Seite der ABN/TFN-Aufteilung du stehst. Gewöhnliche, herkömmliche Kleidung - eine schlichte schwarze Hose, ein einfaches Polo-Shirt, Jogginghosen - ist nicht absetzbar, selbst wenn Putzen der einzige Grund ist, warum du sie besitzt, oder sie bei der Arbeit fleckig wird; die ATO behandelt das als Alltagskleidung, nicht als Uniform. Die Fahrt von zuhause zu deinem ersten Job des Tages, und wieder nach Hause von deinem letzten, ist gewöhnlicher Arbeitsweg, genau wie bei jedem anderen Beruf, es sei denn, die oben beschriebene Ausnahme für sperrige Ausrüstung trifft wirklich zu. Und alles, was dir ein Kunde oder Arbeitgeber erstattet oder direkt zur Verfügung stellt - Chemikalien, Ausrüstung, eine Uniform -, kannst du nicht noch einmal in deiner eigenen Erklärung absetzen.
              </p>
            </div>
          </div>
        </section>

        {/* ── GST, INVOICING & RECORD-KEEPING ──────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                GST, Rechnungsstellung und Nachweise
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                Die Verwaltung sieht unterschiedlich aus, je nachdem, auf welcher Seite der Aufteilung du stehst.
              </p>
            </div>

            <div className="max-w-[680px] mx-auto">
              <div className="taxres-savings-box" style={{ marginTop: 0, marginBottom: '26px' }}>
                <div>
                  <p className="taxres-savings-heading">GST spielt erst bei höherem Umsatz eine Rolle</p>
                  <p className="taxres-savings-body">
                    Wenn du unter einer ABN putzt, wird die GST-Registrierung erst verpflichtend, sobald dein Umsatz aus der Reinigungsarbeit im Jahr $75.000 übersteigt - dieselbe Schwelle, die für jeden ABN Sole Trader gilt, keine reinigungsspezifische Regel. Die meisten Working Holiday Maker, die privat, für eine Handvoll Stammkunden oder über eine App wie Airtasker putzen, kommen dem bei Weitem nicht nahe - solange dein Reinigungsgeschäft also nicht wirklich groß ist, kannst du GST außer Acht lassen und ohne GST-Zeile Rechnungen stellen.
                  </p>
                </div>
              </div>

              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '10px', lineHeight: 1.3 }}>
                Eine korrekte Rechnung für private und App-basierte Reinigungskunden
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '16px' }}>
                Jede Rechnung, die du als ABN Sole Trader verschickst, sollte enthalten:
              </p>
            </div>

            <div className="max-w-[680px] mx-auto" style={{ marginBottom: '28px' }}>
              <div className="flex flex-col gap-3">
                {INVOICE_CHECKLIST.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">{c}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-[680px] mx-auto">
              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '10px', lineHeight: 1.3 }}>
                Nachweise aufbewahren - so oder so
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                Bewahre für alles, was du absetzen willst, eine Quittung, Rechnung oder einen Kontoauszug auf - ein Foto auf deinem Handy reicht, und du musst es fünf Jahre lang vorlegen können. Als ABN Sole Trader bedeutet das auch, eine Kopie jeder Rechnung aufzubewahren, die du ausstellst. Als TFN-Angestellter meldet deine Reinigungsfirma deinen Lohn direkt an die ATO, deine Aufgabe ist also einfacher: Hebe deine Gehaltsabrechnungen auf und gleiche sie mit dem Income Statement ab, das zur Steuerzeit erscheint.
              </p>
            </div>
          </div>
        </section>

        {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
        <NextStep
          eyebrow="Was kommt als Nächstes?"
          heading="Weißt du, welche Seite der Aufteilung auf dich zutrifft? Gut."
          body="Sobald deine ABN oder TFN geklärt ist und du deine Ausgaben für Ausrüstung, Uniform und Fahrten zusammenhast, ist der nächste Schritt eine Steuererklärung, die alles an einem Ort zusammenführt."
          cta="Weiter zu deiner Steuererklärung →"
          href="/de/tax-return"
        />

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">FAQ</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  Steuerfragen für Reinigungskräfte
                </h2>
                <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                  Noch eine Frage? Schreib uns direkt.
                </p>
              </div>
              <div className="max-w-[700px]">
                <Accordion items={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ─────────────────────────────────────────────── */}
        <RelatedServices label="Ähnliche Leistungen" items={[
          { label: 'ABN registrieren', desc: 'Richtig aufgestellt für private und App-basierte Reinigungsarbeit', href: '/de/abn' },
          { label: 'TFN beantragen', desc: 'Erledigt vor deiner ersten eingeteilten Reinigungsschicht', href: '/de/tfn' },
          { label: 'Steuererklärung einreichen', desc: 'Führe dein ABN- und TFN-Einkommen aus der Reinigung zusammen', href: '/de/tax-return' },
          { label: 'Alle Berufe', desc: 'Absetzungen für jeden Backpacker-Job, nicht nur Reinigung', href: '/de/expenses' },
        ]} />

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              Dies sind allgemeine Informationen, keine persönliche Steuerberatung. Ob du Contractor oder Angestellter bist, und was du im Einzelnen absetzen kannst, hängt von den konkreten Umständen ab, wie du arbeitest. Wenn du deine Erklärung bei uns einreichst, wird sie unter Aufsicht eines registrierten Steueragenten erstellt, der dein Reinigungseinkommen, deine ABN- oder TFN-Situation und deine Ausgaben für Ausrüstung und Fahrten durchgeht, damit du alles absetzt, worauf du Anspruch hast, und nichts, worauf nicht.
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
