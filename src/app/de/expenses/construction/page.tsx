import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep, RelatedServices } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Steuerabsetzung für Bauarbeiter in Australien: Werkzeug, Schutzausrüstung & White Card',
  description: 'Was Bauarbeiter mit einem Working-Holiday-Visum steuerlich absetzen können: Werkzeug und Ausrüstung unter und über $300, Schutzkleidung und Sicherheitsausrüstung, die Erneuerung deiner White Card im Vergleich zur ersten Karte, dein Fahrzeug und Weiterbildung - basierend auf der spezifischen ATO-Anleitung für Handwerker.',
  keywords: [
    'Bauarbeiter Steuerabsetzung',
    'Handwerker Steuerabsetzung Australien',
    'White Card steuerlich absetzbar',
    'Baustellenausweis Steuerabsetzung',
    'Werkzeug Steuerabsetzung ATO',
    'Schutzausrüstung Steuerabsetzung Bauarbeit',
    'Backpacker Bauarbeit Steuererklärung',
    '417 Visum Bauarbeit Steuerabsetzung',
    'Baustellenarbeiter Steuer Australien',
    'Handwerker Absetzungen ATO',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/expenses/construction`,
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
    locale: 'de_DE',
    url: `${SITE_URL}/de/expenses/construction`,
    siteName: 'Working Holiday Tax',
    title: 'Steuerabsetzung für Bauarbeiter in Australien: Werkzeug, Schutzausrüstung & White Card',
    description: 'Was Bauarbeiter mit einem Working-Holiday-Visum wirklich steuerlich absetzen können: Werkzeug, Schutzausrüstung, White-Card-Erneuerungen und Fahrzeugkosten.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Steuerabsetzung für Bauarbeiter in Australien: Werkzeug, Schutzausrüstung & White Card',
    description: 'Was Bauarbeiter mit einem Working-Holiday-Visum wirklich steuerlich absetzen können: Werkzeug, Schutzausrüstung, White-Card-Erneuerungen und Fahrzeugkosten.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const ATO_TRADIES_URL = 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/tradies-be-certain-about-what-you-can-claim'

const UNDER_300_ROWS = [
  ['Wie es abgesetzt wird', 'Vollständig, sofort'],
  ['Wann du es absetzt', 'Im Jahr des Kaufs'],
  ['Beispiel', 'Ein Akkubohrer für $180'],
]

const OVER_300_ROWS = [
  ['Wie es abgesetzt wird', 'Verteilt über die Nutzungsdauer'],
  ['Wann du es absetzt', 'Anteilig, für jedes Jahr, in dem du es besitzt'],
  ['Beispiel', 'Ein Betonmischer für $650'],
]

const FIRST_CARD_ROWS = [
  ['Was es ist', 'Deine allererste White Card'],
  ['Warum du sie gebraucht hast', 'Um überhaupt für Bauarbeit zugelassen zu werden'],
  ['Absetzbar?', 'Nein - eine private Ausgabe'],
]

const RENEWAL_CARD_ROWS = [
  ['Was es ist', 'Die Erneuerung einer White Card, die du bereits besitzt'],
  ['Warum du sie brauchst', 'Du arbeitest schon auf der Baustelle und musst sie gültig halten'],
  ['Absetzbar?', 'Ja'],
]

const CENTS_PER_KM_ROWS = [
  ['Aktueller Satz (2026-27, ab 1. Juli 2026)', '91 Cent / km'],
  ['Bisheriger Satz (2024-25 & 2025-26)', '88 Cent / km'],
  ['Maximal absetzbar', '5.000 km / Auto / Jahr'],
  ['Utes & Vans (ab 1 Tonne Tragfähigkeit)', 'Nicht zulässig - Fahrtenbuch verwenden'],
]

const LOGBOOK_ROWS = [
  ['Funktionsweise', 'Absetzung des arbeitsbezogenen Prozentsatzes aller tatsächlichen Kosten'],
  ['Fahrtenbuch-Zeitraum', '12 zusammenhängende Wochen, gültig für 5 Jahre'],
  ['Maximal absetzbar', 'Keine Grenze - basiert auf deinem tatsächlichen Arbeitsanteil'],
  ['Erforderlich für Utes & Vans?', 'Ja, wenn du Autokosten geltend machst'],
]

const VEHICLE_CONDITIONS = [
  'Die Werkzeuge sind für die Arbeit, die du an diesem Tag erledigst, unverzichtbar.',
  'Sie sind wirklich sperrig - ihre Größe oder ihr Gewicht ist der tatsächliche Grund, warum ein Fahrzeug nötig ist, um sie zu transportieren, nicht nur Bequemlichkeit.',
  'Es gibt keinen sicheren Ort, um sie auf der Baustelle zu lassen, also müssen sie mit dir nach Hause fahren.',
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
  title: 'Werkzeug & Ausrüstung',
  subtitle: 'Was du dir selbst für den Job kaufst',
  can: [
    'Hand- und Elektrowerkzeug, das du selbst kaufst: Bohrer, Winkelschleifer, Elektrosägen, Schleifmaschinen und Nagelpistolen',
    'Größere Ausrüstung, die du selbst mitbringst, etwa ein Betonmischer, eine Leiter oder ein Laubbläser',
    'Eine Werkzeugkiste und Arbeitsleuchten, die für den Job gekauft wurden',
  ],
  cannot: [
    'Jedes Werkzeug, das dein Arbeitgeber gestellt, dir geliehen oder für dich gekauft hat',
    'Ein Werkzeug, für das du eine Rückerstattung bekommen hast, nachdem du es selbst bezahlt hattest',
  ],
}

const PPE_CARD: CardData = {
  emoji: '\u{1F9BA}',
  title: 'Schutzkleidung & Sicherheitsausrüstung',
  subtitle: 'Ausrüstung mit einer echten Schutzfunktion',
  can: [
    'Warnwesten und -hemden, Stahlkappenschuhe, Schutzbrillen, Helme und Gehörschutz',
    'Sonnencreme, ein Sonnenhut und eine Sonnenbrille für Arbeit im Freien',
    'Handdesinfektionsmittel, Gesichtsmasken und Arbeitshandschuhe',
  ],
  cannot: [
    'Gewöhnliche Kleidung wie Jeans, T-Shirts oder Hoodies, selbst wenn sie durch die Arbeit auf der Baustelle beschädigt oder abgenutzt ist',
    'Alles, was für den Job praktisch ist, aber keine echte Schutzfunktion hat',
  ],
}

const faqs = [
  {
    question: 'Kann ich meine erste White Card absetzen?',
    answer: 'Nein. Die ATO behandelt deine allererste White Card (Construction Induction Card) genauso wie einen ersten Führerschein: Die Kosten für den Erwerb einer Qualifikation, die du nur gebraucht hast, um überhaupt für den Job zugelassen zu werden, sind eine private Ausgabe, keine Absetzung. Sobald du bereits auf der Baustelle arbeitest und deine Karte erneuert werden muss, damit du weiterarbeiten kannst, ist diese Erneuerung absetzbar. Dieselbe Logik gilt für einen ersten Gabelstaplerschein oder eine Berechtigung für Schwerfahrzeuge.',
  },
  {
    question: 'Welches Werkzeug kann ich als Bauarbeiter absetzen?',
    answer: 'Jedes Werkzeug oder Ausrüstungsstück, das du dir selbst für die Arbeit auf der Baustelle kaufst, ist absetzbar, solange dein Arbeitgeber es weder gestellt noch dir zurückerstattet hat. Gegenstände unter $300 pro Stück, wie ein Bohrer, ein Winkelschleifer, eine Schleifmaschine oder Handwerkzeug, werden vollständig im Jahr des Kaufs abgesetzt. Gegenstände ab $300, wie ein größeres Elektrowerkzeug oder ein Betonmischer, werden stattdessen schrittweise über ihre Nutzungsdauer abgesetzt statt auf einmal.',
  },
  {
    question: 'Kann ich meinen Ute für die Fahrten zu verschiedenen Baustellen absetzen?',
    answer: 'Normalerweise gilt die Fahrt von zuhause zu deinem festen Arbeitsplatz als privater Arbeitsweg und ist nicht absetzbar, auch wenn der Arbeitsplatz eine Baustelle ist. Es gibt eine eng gefasste Ausnahme: Wenn dein Werkzeug wirklich sperrig und für den Job unverzichtbar ist und es keinen sicheren Ort gibt, um es auf der Baustelle zu lagern, kann die Fahrt, bei der du es mitnimmst, abgesetzt werden. Da die meisten Utes und Kastenwagen eine Tonne oder mehr tragen, sind sie von der einfacheren Kilometerpauschale ausgeschlossen - du würdest also stattdessen ein Fahrtenbuch brauchen, wenn du Autokosten absetzen willst.',
  },
  {
    question: 'Sind Stahlkappenschuhe und Warnschutzkleidung steuerlich absetzbar?',
    answer: 'Ja. Schutzausrüstung wie Stahlkappenschuhe, Warnwesten, Schutzbrillen, Helme und Gehörschutz ist absetzbar, weil sie dich vor einem konkreten Verletzungsrisiko auf der Baustelle schützt - das ist der Test, den die ATO anwendet. Sonnenschutz - Sonnencreme, ein Sonnenhut und eine Sonnenbrille - ist ebenfalls absetzbar, wenn du im Freien arbeitest.',
  },
  {
    question: 'Kann ich meine Arbeitskleidung absetzen, wenn sie auf der Baustelle kaputtgeht oder schmutzig wird?',
    answer: 'Nein. Einfache Kleidung wie Jeans, T-Shirts oder ein Flanellhemd wird nicht dadurch absetzbar, dass sie auf einer Baustelle beschädigt, verschmutzt oder abgenutzt wird. Die ATO behandelt normalen Verschleiß an gewöhnlicher Kleidung als private Ausgabe - der Gegenstand muss eine echte Schutzfunktion haben, wie die Schutzausrüstung oben, oder eine verpflichtende Uniform mit Firmenlogo sein, um zu qualifizieren.',
  },
  {
    question: 'Kann ich einen Fachkurs oder eine Weiterbildung absetzen?',
    answer: 'Weiterbildung ist absetzbar, wenn sie direkt mit dem Gewerbe oder der Rolle zusammenhängt, in der du bereits arbeitest, zum Beispiel ein Kurs, der eine vorhandene Fähigkeit oder einen Schein erweitert. Ein Kurs, der dich in einen anderen Beruf bringen soll, ist nicht absetzbar, selbst wenn er baubezogen ist, weil er eine neue Qualifikation aufbaut, statt die zu erhalten, die du derzeit nutzt.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Ausgaben', item: `${SITE_URL}/de/expenses` },
    { '@type': 'ListItem', position: 3, name: 'Bauarbeit', item: `${SITE_URL}/de/expenses/construction` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Steuerabsetzung für Bauarbeiter in Australien: Werkzeug, Schutzausrüstung und White Card',
  description: 'Was Bauarbeiter mit einem Working-Holiday-Visum bei ihrer australischen Steuererklärung absetzen können: Werkzeug und Ausrüstung, Schutzkleidung und Sicherheitsausrüstung, White-Card-Erneuerungen, Fahrzeugkosten und Weiterbildung.',
  url: `${SITE_URL}/de/expenses/construction`,
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
        <p className="exp-card-label exp-card-label-yes">✓ In der Regel absetzbar</p>
        <ul className="exp-card-list">
          {d.can.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
      <div className="exp-card-section">
        <p className="exp-card-label exp-card-label-no">✕ Nicht absetzbar</p>
        <ul className="exp-card-list">
          {d.cannot.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default function ConstructionExpensesPageDE() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-5 lg:pt-9 lg:pb-7">

          <nav aria-label="Brotkrümelnavigation" className="mb-4 lg:mb-5">
            <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
              <li><Link href="/de" style={{ color: '#587066' }}>Home</Link></li>
              <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
              <li><Link href="/de/expenses" style={{ color: '#587066' }}>Ausgaben</Link></li>
              <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
              <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Bauarbeit</li>
            </ol>
          </nav>

          <div className="text-center">
            <h1 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '26ch' }}>
              Was können <span style={{ color: '#0B5240' }}>Bauarbeiter</span> wirklich steuerlich absetzen?
            </h1>
            <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '52ch' }}>
              Baustellen haben die detaillierteste ATO-Anleitung von allen Backpacker-Jobs - Werkzeug, Schutzausrüstung, deine White Card, und wann dein Ute wirklich zählt. Hier erfährst du genau, was qualifiziert.
            </p>
          </div>
        </div>
      </section>

      {/* ── TOOLS & EQUIPMENT (centerpiece pt.1) ─────────────────────────── */}
      <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-6">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              Werkzeug und Ausrüstung: die $300-Regel
            </h2>
            <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
              Wenn du dein eigenes Werkzeug für die Arbeit auf der Baustelle kaufst und dein Arbeitgeber es weder gestellt noch dir zurückerstattet hat, sind die Kosten absetzbar. Wie du sie absetzt, hängt vom Preis ab - laut der{' '}
              <a href={ATO_TRADIES_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                ATO-Anleitung für Handwerker
              </a>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <CompareTable label="Unter $300" rows={UNDER_300_ROWS} highlight />
            <CompareTable label="$300 oder mehr" rows={OVER_300_ROWS} />
          </div>

          <div className="info-block" style={{ marginTop: '22px', marginBottom: '22px' }}>
            <p>
              Beim Kauf eines Sets ändert sich das. Wenn mehrere Werkzeuge zusammen als Set gekauft werden und das Set insgesamt $300 oder mehr kostet, muss das gesamte Set über die Zeit abgeschrieben werden, selbst wenn jedes einzelne Teil für sich genommen unter $300 gekostet hätte.
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
              Schutzkleidung und Sicherheitsausrüstung
            </h2>
            <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
              Der Test, den die ATO anwendet, ist nicht, ob etwas auf der Baustelle nützlich ist. Sondern ob der Gegenstand Merkmale oder Funktionen hat, die dich vor einem konkreten Verletzungsrisiko schützen.
            </p>
          </div>

          <div className="max-w-[560px] mx-auto">
            <ClaimCard d={PPE_CARD} />
          </div>

          <div className="info-block" style={{ marginTop: '22px', maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto' }}>
            <p>
              Normaler Verschleiß an gewöhnlicher Kleidung ist eine private Ausgabe, egal wie sehr sie auf der Baustelle tatsächlich abgenutzt wird. Der Gegenstand muss dich wirklich schützen, vor Schnitten, Sonne, Lärm, Staub oder Stößen, nicht nur die Arbeit überstehen.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHITE CARD & OTHER LICENCES ──────────────────────────────────── */}
      <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-6">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              Deine White Card: erste Karte vs. Erneuerung
            </h2>
            <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
              Das ist die am häufigsten missverstandene Absetzung in der Bauarbeit, und es kommt auf eine einzige Unterscheidung an.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <CompareTable label="Deine erste White Card" rows={FIRST_CARD_ROWS} />
            <CompareTable label="Erneuerung deiner White Card" rows={RENEWAL_CARD_ROWS} highlight />
          </div>

          <p className="font-light mx-auto text-center" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.7, maxWidth: '62ch', marginTop: '20px' }}>
            Es ist dasselbe Prinzip, das die ATO auch bei einem Führerschein anwendet: Die Kosten, eine für den Beruf nötige Qualifikation oder Berechtigung überhaupt erst zu erwerben, sind privat, aber der Erhalt einer Berechtigung, die du bereits für die Arbeit nutzt, ist absetzbar. Dieselbe Logik gilt für einen Gabelstaplerschein oder eine Berechtigung für Schwerfahrzeuge - die erste ist privat, die Erneuerung, während du sie schon für die Arbeit nutzt, ist absetzbar.
          </p>
        </div>
      </section>

      {/* ── VEHICLE EXPENSES ─────────────────────────────────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-6">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              Dein Ute, Van oder Auto: wann es wirklich zählt
            </h2>
            <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '60ch' }}>
              Die Fahrt von zuhause zu einem festen Arbeitsplatz gilt normalerweise als privater Arbeitsweg, und daran ändert sich nichts, nur weil der Arbeitsplatz eine Baustelle ist. Es gibt eine einzige, eng gefasste Ausnahme, und alle drei Bedingungen unten müssen zutreffen.
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
              Wenn es auf deiner Baustelle einen abschließbaren Schuppen, Container oder Käfig für Werkzeug gibt, oder dein Werkzeug in eine normale Tasche passen würde, gilt die Fahrt weiterhin als gewöhnlicher Arbeitsweg und ist nicht absetzbar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <CompareTable label="Kilometerpauschale" rows={CENTS_PER_KM_ROWS} highlight />
            <CompareTable label="Fahrtenbuch-Methode" rows={LOGBOOK_ROWS} />
          </div>
          <p className="font-light mx-auto text-center" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, maxWidth: '64ch', marginTop: '18px' }}>
            Utes, Kastenwagen mit einer Tragfähigkeit von einer Tonne oder mehr, und Minivans, die für neun oder mehr Passagiere ausgelegt sind, können die Kilometerpauschale überhaupt nicht nutzen. Wenn das dein Fahrzeug ist und du Autokosten absetzen willst, ist die Fahrtenbuch-Methode die einzige Option.
          </p>
        </div>
      </section>

      {/* ── SELF-EDUCATION, PHONE & RECORDS ──────────────────────────────── */}
      <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-6">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              Weiterbildung, dein Handy und Nachweise aufbewahren
            </h2>
          </div>

          <div className="max-w-[680px] mx-auto">
            <p className="font-light" style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.8, marginBottom: '16px' }}>
              Ein Kurs, der deine Kenntnisse in dem Gewerbe aktuell hält, in dem du bereits arbeitest, etwa die Erweiterung eines Scheins oder das Erlernen einer Technik, die du in deiner aktuellen Rolle nutzt, ist absetzbar. Ein Kurs, der dich in einen anderen Beruf bringen soll, ist es nicht, selbst wenn er baubezogen ist, weil er eine neue Qualifikation aufbaut, statt die zu erhalten, die du gerade nutzt.
            </p>
            <p className="font-light" style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.8 }}>
              Wenn du dein eigenes Handy nutzt, um deinen Vorgesetzten anzurufen, Pläne zu prüfen oder dich wegen Schichten abzustimmen, ist der arbeitsbezogene Anteil deines Handy- und Internetvertrags absetzbar. Führe eine grobe, ehrliche Aufzeichnung deines Arbeitsanteils, statt die gesamte Rechnung abzusetzen.
            </p>
          </div>

          <div className="taxres-savings-box" style={{ marginTop: '28px', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div>
              <p className="taxres-savings-heading">Nachweise aufbewahren</p>
              <p className="taxres-savings-body">
                Bewahre für alles, was du absetzt, eine Quittung, Rechnung oder einen Kontoauszug auf, aus dem der Betrag, das Datum, der Anbieter und eine Beschreibung des Gekauften hervorgehen. Ein Foto auf deinem Handy reicht, und du musst es fünf Jahre lang vorlegen können.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="Bereit, wenn du es bist"
        heading="Finde heraus, was deine Ausgaben auf der Baustelle wert sind"
        body="Nutze den kostenlosen Rechner für eine schnelle Schätzung, oder schreib uns direkt - wir gehen dann gemeinsam mit dir dein Werkzeug, deine Schutzausrüstung und deine Arbeit auf der Baustelle durch."
        cta="Rechner ausprobieren →"
        href="/de/calculator"
      />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
            <div className="text-center">
              <span className="section-label center">FAQ</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                Fragen zu Absetzungen in der Bauarbeit
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                Hast du eine Frage zu deiner eigenen Situation? Schreib uns direkt.
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
        label="Ähnliche Leistungen"
        items={[
          { label: 'TFN-Antrag', desc: 'Sichere dir deine Steuernummer vor deiner ersten Schicht.', href: '/de/tfn' },
          { label: 'Steuererklärung', desc: 'Reiche deine Erklärung ein und setze deine Bauarbeit-Ausgaben ab.', href: '/de/tax-return' },
          { label: 'Superannuation (DASP)', desc: 'Hol dir deine Super zurück, sobald du Australien verlassen hast.', href: '/de/superannuation' },
          { label: 'Alle Berufe', desc: 'Absetzungen für jeden Backpacker-Job, nicht nur Bauarbeit.', href: '/de/expenses' },
        ]}
      />

      {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '48px' }}>
        <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
          <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
            Dies sind allgemeine Informationen, keine persönliche Steuerberatung. Jede Baustelle und jede Rolle ist ein bisschen anders. Wenn du deine Erklärung bei uns einreichst, wird sie von unserem Team erstellt, das nur mit Working Holiday Makern arbeitet und dein konkretes Werkzeug, deine Lizenzen und deine Arbeit auf der Baustelle durchgeht, damit du alles absetzt, worauf du Anspruch hast, und nichts, worauf nicht.
          </p>
          <Link href="/de/tax-form" className="inline-flex items-center justify-center font-semibold"
            style={{ minHeight: '52px', padding: '0 36px', background: '#0B5240', color: '#fff', borderRadius: '100px', fontSize: '15px', textDecoration: 'none' }}>
            Steuerrückerstattung beantragen →
          </Link>
        </div>
      </section>

      <MobileCta href="/de/tax-form" lang="de" />
    </>
  )
}
