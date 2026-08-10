import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep, RelatedServices } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Steuerabsetzung für FIFO-Arbeiter in Australien: Fahrten, Schutzausrüstung & der Zone-Offset-Mythos',
  description: 'Was FIFO-Arbeiter (Fly-in-Fly-out) mit einem Working-Holiday-Visum steuerlich absetzen können: Schutzausrüstung und Werkzeug, Erneuerung von Tickets und Lizenzen, Handy und Weiterbildung. Dazu, warum der Zone Tax Offset bei einem typischen FIFO-Roster meist nicht greift, und was vom Arbeitgeber gestellte Camp-Unterkunft und Verpflegung für deine Steuererklärung bedeuten.',
  keywords: [
    'FIFO Steuerabsetzung',
    'Fly-in Fly-out Steuer Australien',
    'FIFO Arbeiter Steuererklärung',
    'Zone Tax Offset FIFO',
    'Zone Tax Offset Working Holiday Visum',
    'FIFO Camp Unterkunft Steuer',
    'Mining Camp Verpflegung FBT-befreit',
    'Backpacker FIFO Job Steuer',
    '417 462 Visum FIFO Steuerabsetzung',
    'High Risk Work Licence Steuerabsetzung',
    'Working at Heights Ticket steuerlich absetzbar',
    'FIFO Roster Steuer Australien',
    'Arbeiter im Remote-Gebiet Steuerabsetzung',
    'FIFO Schutzausrüstung Steuerabsetzung',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/expenses/fifo`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/fifo`,
      'de': `${SITE_URL}/de/expenses/fifo`,
      'ja': `${SITE_URL}/ja/expenses/fifo`,
      'x-default': `${SITE_URL}/expenses/fifo`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/expenses/fifo`,
    siteName: 'Working Holiday Tax',
    title: 'Steuerabsetzung für FIFO-Arbeiter in Australien: Fahrten, Schutzausrüstung & der Zone-Offset-Mythos',
    description: 'Was FIFO-Arbeiter wirklich steuerlich absetzen können, und warum der Zone Tax Offset bei einem typischen Fly-in-Fly-out-Roster meist nicht greift.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Steuerabsetzung für FIFO-Arbeiter in Australien: Fahrten, Schutzausrüstung & der Zone-Offset-Mythos',
    description: 'Was FIFO-Arbeiter wirklich steuerlich absetzen können, und warum der Zone Tax Offset bei einem typischen Fly-in-Fly-out-Roster meist nicht greift.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const REALISTIC_ROLES = [
  {
    t: 'Camp-Services (der realistische Einstieg)',
    d: 'Küchenhilfe und Catering in der Camp-Kantine, Reinigung und Housekeeping, Wäscherei, Rezeptions- und Verwaltungsarbeiten im Camp oder Site-Büro, sowie Rollen im Camp-Shop oder Einzelhandel. Hier landen die meisten Working Holiday Maker, die FIFO-Arbeit machen, tatsächlich.',
  },
  {
    t: 'Handwerkliche und bergbautechnische Rollen',
    d: 'Es gibt auch Operator-, Handwerker- und technische Rollen direkt auf der Mine oder in der Anlage, aber die verlangen normalerweise eine spezifische Berufsqualifikation, ein bestimmtes Ticket oder mehrjährige Erfahrung, und viele Arbeitgeber bevorzugen für technische Positionen vor Ort australische Staatsbürger und Permanent Residents. Nicht unmöglich, aber für die meisten Working Holiday Maker ein weniger realistischer Einstiegspunkt.',
  },
]

const CAMP_PROVIDED_ROWS = [
  ['Unterkunft während deines Swings', 'Direkt von deinem Arbeitgeber gestellt'],
  ['Verpflegung während deines Swings', 'Direkt von deinem Arbeitgeber gestellt'],
  ['FBT-Behandlung', 'Für deinen Arbeitgeber meist steuerbefreit'],
  ['Absetzbar in deiner Erklärung?', 'Nein - du hast nicht selbst dafür bezahlt'],
]

const ON_YOUR_OWN_ROWS = [
  ['Schutzausrüstung', 'Overall, Stiefel, Handschuhe, Schutzbrille, Masken - wenn du sie kaufst'],
  ['Werkzeug und Ausrüstung', 'Unter $300: vollständig absetzbar; ab $300: abgeschrieben'],
  ['Erneuerung von Tickets und Lizenzen', 'Sobald du die Rolle bereits ausübst'],
  ['Handy und Internet', 'Nur der arbeitsbezogene Anteil'],
]

const BULKY_TOOLS_CONDITIONS = [
  'Die Werkzeuge sind für die Arbeit, die du an diesem Tag erledigst, unverzichtbar.',
  'Sie sind wirklich sperrig - ihre Größe oder ihr Gewicht ist der tatsächliche Grund, warum ein Fahrzeug nötig ist, um sie zu transportieren, nicht nur Bequemlichkeit.',
  'Es gibt keinen sicheren Ort, um sie am Arbeitsort zu lassen, also müssen sie mit dir nach Hause fahren.',
]

const UNDER_300_ROWS = [
  ['Wie es abgesetzt wird', 'Vollständig, sofort'],
  ['Wann du es absetzt', 'Im Jahr des Kaufs'],
  ['Beispiel', 'Ein Paar Stahlkappenschuhe für $190'],
]

const OVER_300_ROWS = [
  ['Wie es abgesetzt wird', 'Verteilt über die Nutzungsdauer'],
  ['Wann du es absetzt', 'Anteilig, für jedes Jahr, in dem du es besitzt'],
  ['Beispiel', 'Eine eigene Werkzeugkiste für die Arbeit vor Ort für $600'],
]

const FIRST_TICKET_ROWS = [
  ['Was es ist', 'Dein allererstes Ticket oder deine allererste Lizenz für die Rolle'],
  ['Warum du es gebraucht hast', 'Um überhaupt für den Job zugelassen zu werden'],
  ['Absetzbar?', 'Nein - eine private Ausgabe'],
]

const RENEWAL_TICKET_ROWS = [
  ['Was es ist', 'Die Erneuerung eines Tickets oder einer Lizenz, die du bereits besitzt'],
  ['Warum du es brauchst', 'Du arbeitest schon vor Ort und musst es gültig halten'],
  ['Absetzbar?', 'Ja'],
]

const faqs = [
  {
    question: 'Kann ich die Fahrt zum Flughafen vor meinem Swing absetzen?',
    answer: 'Nein, normalerweise nicht. Die Fahrt von zuhause zum Flughafen oder zu dem Abflugort, von dem aus du zu deinem Swing fliegst, wird genauso behandelt wie die Fahrt zur Arbeit bei jedem anderen Job - gewöhnlicher privater Arbeitsweg -, egal wie früh der Flug ist oder wie weit du vom Flughafen entfernt wohnst. Es gibt eine eng gefasste Ausnahme, wenn du wirklich sperriges, für die Arbeit unverzichtbares Werkzeug mitführen musst und es keine sichere Lagermöglichkeit am Arbeitsort gibt, aber bei den meisten FIFO-Rollen, besonders bei Camp-Services-Rollen, greift diese Ausnahme nicht.',
  },
  {
    question: 'Bekommen FIFO-Arbeiter den Zone Tax Offset?',
    answer: 'Normalerweise nicht, und das ist der größte Irrtum bei der FIFO-Besteuerung. Seit einer Gesetzesänderung 2015 hängt die Berechtigung davon ab, wo dein gewöhnlicher Wohnsitz liegt, nicht nur davon, wo du tatsächlich arbeitest. Dein gewöhnlicher Wohnsitz muss selbst für mehr als 183 Tage im Jahr in einer festgelegten Remote-Zone liegen. Für einen Roster in eine Zone einzufliegen, während dein gewöhnlicher Wohnsitz - deine Wohngemeinschaft oder Mietwohnung in Perth, Brisbane oder wo auch immer du zwischen deinen Swings wohnst - außerhalb der Zone liegt, erfüllt diesen Test nicht, selbst wenn du den Großteil des Jahres vor Ort verbringst. Für die meisten Working Holiday Maker, die FIFO-Arbeit machen, bedeutet das, dass der Offset schlicht nicht greift.',
  },
  {
    question: 'Kann ich meine Camp-Unterkunft oder Verpflegung absetzen?',
    answer: 'Nein. Deine Unterkunft und Verpflegung vor Ort werden direkt von deinem Arbeitgeber organisiert und bezahlt, und bei wirklich abgelegenen Standorten wird das für ihn meist als steuerbefreiter Fringe Benefit behandelt statt als zusätzliches Einkommen für dich. So oder so: Weil du das Zimmer oder die Mahlzeit nie selbst bezahlt hast, gibt es für dich keine Ausgabe, die du absetzen könntest - eine Absetzung kann immer nur Geld zurückgeben, das du tatsächlich selbst ausgegeben hast.',
  },
  {
    question: 'Was ist die $300-Regel für Werkzeug und Schutzausrüstung?',
    answer: 'Wenn du dir selbst Werkzeug, Ausrüstung oder Schutzkleidung für den Job kaufst und dein Arbeitgeber sie weder gestellt noch dir erstattet hat, werden Gegenstände unter $300 vollständig im Jahr des Kaufs abgesetzt. Gegenstände ab $300 werden stattdessen abgeschrieben, also schrittweise über ihre Nutzungsdauer abgesetzt statt auf einmal. Das ist derselbe Schwellenwert und dieselbe Regel, die für jeden Beruf auf dieser Seite gilt, nichts, was nur für FIFO-Arbeit gilt.',
  },
  {
    question: 'Kann ich meine High Risk Work Licence oder mein Working at Heights-Ticket absetzen?',
    answer: 'Das kommt darauf an, ob es dein erstes ist oder eine Erneuerung. Ein Ticket wie eine High Risk Work Licence, ein Working at Heights-Ticket oder einen Gabelstaplerschein zum allerersten Mal zu erwerben, wird als private Ausgabe behandelt, genau wie ein erster Führerschein, weil es dich überhaupt erst für die Rolle zulässt. Sobald du bereits arbeitest und dieses Ticket erneuert werden muss, um den Job weiter ausüben zu können, sind die Erneuerungskosten absetzbar - dasselbe Prinzip von erstem Erwerb gegenüber Erneuerung, das auch für die White Card auf dem Bau gilt.',
  },
  {
    question: 'Kann ich mein Handy und Internet während meines Rosters absetzen?',
    answer: 'Ja, den arbeitsbezogenen Anteil. Wenn du dein Handy oder dein Internet zuhause wirklich für den Job nutzt - um deinen Roster zu checken, Stundenzettel einzureichen oder verpflichtende Online-Einschulungen oder Schulungen zu absolvieren -, kannst du diesen Anteil der Rechnung absetzen. Du brauchst eine faire, ehrliche Schätzung des Prozentsatzes, der tatsächlich arbeitsbezogen ist; die gesamte Rechnung für ein Handy abzusetzen, das du auch privat nutzt, ist nicht vertretbar.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
    { '@type': 'ListItem', position: 2, name: 'Ausgaben', item: `${SITE_URL}/de/expenses` },
    { '@type': 'ListItem', position: 3, name: 'FIFO', item: `${SITE_URL}/de/expenses/fifo` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Steuerabsetzung für FIFO-Arbeiter in Australien: Fahrten, Schutzausrüstung und der Zone-Offset-Mythos',
  description: 'Was FIFO-Arbeiter mit einem Working-Holiday-Visum bei ihrer australischen Steuererklärung absetzen können: Schutzausrüstung und Werkzeug, Erneuerung von Tickets und Lizenzen, Handy und Weiterbildung, und warum der Zone Tax Offset bei einem typischen Fly-in-Fly-out-Roster meist nicht greift.',
  url: `${SITE_URL}/de/expenses/fifo`,
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
  '@id': `${SITE_URL}/de/expenses/fifo#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/de/expenses/fifo`,
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

export default function FifoExpensesPageDE() {
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
                <li><Link href="/de" style={{ color: '#587066' }}>Startseite</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li><Link href="/de/expenses" style={{ color: '#587066' }}>Ausgaben</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>FIFO</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '29ch' }}>
                FIFO-Steuerabsetzungen: dein Roster, dein Camp und der <span style={{ color: '#0B5240' }}>Zone-Offset-Mythos</span>
              </h1>
              <p className="font-semibold mx-auto hero-sub" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '58ch' }}>
                Zwei Wochen arbeiten, eine Woche frei - zum Standort fliegen, deinen Swing durchziehen, wieder nach Hause fliegen. Unterkunft und Verpflegung im Camp übernimmt normalerweise dein Arbeitgeber, nicht du. Hier erfährst du genau, was du bei einem FIFO-Roster absetzen kannst, und die Wahrheit über den Zone Tax Offset, den die meisten FIFO-Arbeiter fälschlich für sicher halten.
              </p>
            </div>
          </div>
        </section>

        {/* ── REALISTIC FIFO ROLES ─────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Welche FIFO-Jobs bekommen Working Holiday Maker tatsächlich?
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '62ch' }}>
                FIFO bedeutet, für einen festgelegten Arbeitsblock - einen Swing oder Roster, oft etwas wie zwei Wochen an und eine Woche frei - zu einer abgelegenen Mine oder einem Ressourcenprojekt zu fliegen und danach wieder nach Hause zu fliegen, bis der nächste Einsatz beginnt. Das ist echte Arbeit, und Working Holiday Maker bekommen tatsächlich FIFO-Jobs, aber realistisch betrachtet ist es meist ein bestimmter Ausschnitt der FIFO-Arbeit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 max-w-[840px] mx-auto">
              {REALISTIC_ROLES.map((c, i) => (
                <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#F7FBF9', border: '1.5px solid #E2EFE9' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '8px' }}>{c.t}</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CAMP LIFE: THE UNIQUE HOOK ───────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Camp-Leben: was dein Arbeitgeber übernimmt, und was an dir hängt
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '60ch' }}>
                FIFO-Roster bringen etwas mit, was nur wenige andere Backpacker-Jobs bieten - Unterkunft und Verpflegung, die dein Arbeitgeber direkt organisiert und bezahlt, während du vor Ort bist.
              </p>
            </div>

            <div className="max-w-[680px] mx-auto" style={{ marginBottom: '26px' }}>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                Während deines Swings werden dein Zimmer im Camp und deine Mahlzeiten in der Kantine vom Unternehmen gebucht und bezahlt, nicht von dir. Bei wirklich abgelegenen Standorten wird diese Art von Unterkunft und Verpflegung für deinen Arbeitgeber meist als steuerbefreiter Fringe Benefit nach den FBT-Regeln für abgelegene Gebiete behandelt, statt als zusätzliches steuerpflichtiges Einkommen bei dir zu landen. So oder so ist das Ergebnis für deine Steuererklärung einfach: Weil du das Zimmer oder die Mahlzeit nie selbst bezahlt hast, gibt es keine Kosten in deiner eigenen Tasche, für die du eine Absetzung geltend machen könntest. Eine Absetzung kann immer nur Geld zurückgeben, das du wirklich selbst ausgegeben hast.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="Was dein Arbeitgeber übernimmt" rows={CAMP_PROVIDED_ROWS} highlight />
              <CompareTable label="Was du selbst bezahlst" rows={ON_YOUR_OWN_ROWS} />
            </div>

            <div className="max-w-[680px] mx-auto" style={{ marginTop: '30px' }}>
              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '8px' }}>
                Anreise zum Standort
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                Der Flug zum Standort selbst wird normalerweise von deinem Arbeitgeber als Teil des Rosters organisiert und bezahlt. Nicht abgedeckt ist deine eigene Fahrt von zuhause zum Flughafen oder zu dem Abflugort, von dem du losfliegst - das ist gewöhnlicher privater Arbeitsweg, genau wie die Fahrt zur Arbeit bei jedem anderen Job, und das ist nicht absetzbar, egal wie früh der Flug ist oder wie weit du vom Flughafen entfernt wohnst.
              </p>

              <div className="flex flex-col gap-3" style={{ marginBottom: '14px' }}>
                {BULKY_TOOLS_CONDITIONS.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">{c}</p>
                  </div>
                ))}
              </div>
              <p className="font-light" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.6, marginBottom: '22px' }}>
                Alle drei Bedingungen müssen zutreffen, bevor diese Fahrt absetzbar wird. In der Praxis ist das eine eng gefasste Ausnahme, die eher für Handwerker relevant ist, die mit ihrer eigenen Werkzeugkiste einfliegen, als für die meisten Camp-Services-Rollen, wo es normalerweise nichts gibt, das sperrig genug ist, oder keinen Grund, warum es nicht sicher vor Ort gelagert werden könnte.
              </p>

              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '8px' }}>
                Umzug, um einen FIFO-Job anzutreten
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                Wenn du umziehst, sagen wir nach Perth, Brisbane oder einen anderen Hub, speziell um von dort aus FIFO-Arbeit zu machen, sind die Kosten für diesen Umzug selbst - Flüge, Frachtkosten, vorübergehende Unterkunft, während du dich einlebst - eine private Umzugsausgabe, keine arbeitsbezogene Absetzung. Das gilt selbst dann, wenn der Umzug klar mit der Aufnahme des Jobs zusammenhängt: Die ATO behandelt die Kosten für einen Umzug wegen einer neuen Rolle als Kosten dafür, dich überhaupt erst in die Lage zu versetzen, Einkommen zu erzielen, nicht als Kosten für die Erzielung dieses Einkommens, sobald du dort bist.
              </p>
            </div>
          </div>
        </section>

        {/* ── ZONE TAX OFFSET: PROMINENT MYTH-CORRECTION (unique hook) ────── */}
        <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[760px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <span className="section-label">Der größte FIFO-Steuermythos</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 18px' }}>
              Der Zone Tax Offset: in einer Zone zu arbeiten ist nicht dasselbe wie dort zu wohnen
            </h2>

            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Es ist eine verbreitete Annahme, dass du automatisch für den Zone Tax Offset qualifizierst, wenn du zu einer abgelegenen Mine oder einem Ressourcenprojekt ein- und ausfliegst, nur weil der Standort in einer der von der ATO festgelegten Remote-Zonen liegt. Bei einer typischen FIFO-Regelung ist diese Annahme meist falsch.
            </p>

            <div className="rounded-2xl" style={{ padding: '20px 22px', background: '#FDF0D5', border: '1.5px solid #F9D88A', borderLeft: '4px solid #E9A020', margin: '22px 0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                Es geht darum, wo du wohnst, nicht wohin du fliegst.
              </p>
              <p className="font-light" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.75 }}>
                Seit einer Gesetzesänderung 2015 geht es bei diesem Test nicht mehr nur darum, wie viele Tage du physisch innerhalb einer Zone arbeitest. Um zu qualifizieren, muss dein gewöhnlicher Wohnsitz - wo du tatsächlich wohnst, nicht nur, wo du einstempelst - selbst für mehr als 183 Tage im Einkommensjahr in einer festgelegten Zone liegen. Für einen Roster in eine Zone einzufliegen, während dein gewöhnlicher Wohnsitz außerhalb davon liegt, erfüllt diesen Test nicht, selbst wenn du über deine Swings hinweg im Jahr weit mehr als 183 Tage physisch vor Ort verbringst.
              </p>
            </div>

            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Für die meisten Working Holiday Maker, die FIFO-Arbeit machen, schließt das den Offset aus. Dein gewöhnlicher Wohnsitz während einer Working Holiday ist nicht das Camp auf der Mine - die Camp-Unterkunft ist vorübergehend, an deinen Roster gebunden, und nicht der Ort, an dem du in dieser Woche sonst wohnen würdest. Dein gewöhnlicher Wohnsitz ist dort, wo du zwischen deinen Swings tatsächlich lebst: eine Wohngemeinschaft oder Mietwohnung in Perth, Brisbane, Darwin, Karratha, oder wo auch immer du während deiner Working Holiday zuhause bist. Solange dieser Wohnsitz nicht selbst innerhalb einer festgelegten Zone liegt, bringt dir das Ein- und Ausfliegen zur Arbeit den Offset nicht, egal wie abgelegen der Standort ist oder wie viele Swings du pro Jahr arbeitest.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              Wenn deine eigene Situation wirklich anders ist - wenn zum Beispiel dein tatsächlicher Wohnsitz während deiner Working Holiday innerhalb einer festgelegten Zone liegt -, lohnt es sich, das bei der Erstellung deiner Steuererklärung anzusprechen, statt einfach in die eine oder andere Richtung anzunehmen.
            </p>
          </div>
        </section>

        {/* ── PPE, TOOLS & THE $300 RULE ───────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Schutzausrüstung, Werkzeug und die $300-Regel
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                Was auch immer du dir wirklich selbst für den Job kaufst und dafür nicht erstattet bekommst, ist absetzbar. Wie du es absetzt, hängt davon ab, was es ist und was es kostet.
              </p>
            </div>

            <div className="max-w-[680px] mx-auto" style={{ marginBottom: '24px' }}>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                Persönliche Schutzausrüstung, die du dir selbst kaufst - Overall oder Arbeitsanzug, Stahlkappenschuhe, Handschuhe, Schutzbrille, Masken - ist absetzbar, weil sie dich vor einem konkreten Risiko vor Ort schützt und nicht nur praktisch ist. Auch das Waschen dieser Ausrüstung auf eigene Kosten ist absetzbar. Das alles gilt nicht für irgendetwas, das dein Arbeitgeber dir aus dem Lager ausgibt, zur Verfügung stellt oder dir erstattet; du kannst nur absetzen, was wirklich aus deiner eigenen Tasche kam.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                Gewöhnliche Alltagskleidung - einfache Hosen, T-Shirts, ein Pullover für kalte Morgen vor Ort - ist nie absetzbar, egal wie abgenutzt oder schmutzig sie über einen Swing hinweg wird. Ein Gegenstand muss eine echte Schutzfunktion haben, wie die Schutzausrüstung oben, um zu qualifizieren; arbeitsangemessen zu sein reicht allein nicht aus.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="Unter $300" rows={UNDER_300_ROWS} highlight />
              <CompareTable label="$300 oder mehr" rows={OVER_300_ROWS} />
            </div>
            <p className="font-light mx-auto text-center" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, maxWidth: '62ch', marginTop: '18px' }}>
              Kaufst du mehrere Werkzeuge zusammen als Set, das insgesamt $300 oder mehr kostet, wird das gesamte Set über die Zeit abgeschrieben, selbst wenn jedes einzelne Teil für sich genommen unter $300 gekostet hätte.
            </p>
          </div>
        </section>

        {/* ── TICKETS & LICENCES: FIRST VS RENEWAL ─────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Tickets und Lizenzen: das erste Mal vs. die Erneuerung
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                Eine High Risk Work Licence, ein Working at Heights-Ticket, ein Gabelstaplerschein - dieselbe Unterscheidung entscheidet, ob eines davon absetzbar ist.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="Dein erstes Ticket oder deine erste Lizenz" rows={FIRST_TICKET_ROWS} />
              <CompareTable label="Erneuerung eines Tickets, das du besitzt" rows={RENEWAL_TICKET_ROWS} highlight />
            </div>

            <p className="font-light mx-auto text-center" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.7, maxWidth: '64ch', marginTop: '20px' }}>
              Es ist dasselbe Prinzip, das diese Seite auch bei einer White Card auf dem Bau anwendet, und dasselbe, das die ATO bei einem Führerschein anwendet: Die Kosten, eine für eine Rolle nötige Qualifikation oder Berechtigung überhaupt erst zu erwerben, sind privat, aber der Erhalt einer Berechtigung, die du bereits für die Arbeit nutzt, ist absetzbar. Deine erste High Risk Work Licence, dein erstes Working at Heights-Ticket oder dein erster Gabelstaplerschein ist privat; die Erneuerung, sobald du sie schon für den Job nutzt, ist absetzbar.
            </p>
          </div>
        </section>

        {/* ── PHONE, SELF-EDUCATION, TESTING & RECORDS ─────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Handy, Weiterbildung, Tests und Nachweise aufbewahren
              </h2>
            </div>

            <div className="max-w-[680px] mx-auto">
              <p className="font-light" style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.8, marginBottom: '16px' }}>
                Arbeitsbezogene Anrufe sind absetzbar, ebenso ein anteiliger Teil deines Handy- und Internetvertrags, wenn du ihn wirklich für den Job brauchst - um deinen Roster zu checken, Stundenzettel einzureichen oder verpflichtende Online-Einschulungen und Schulungsmodule zu absolvieren. Führe eine faire, ehrliche Schätzung des arbeitsbezogenen Prozentsatzes, statt die gesamte Rechnung abzusetzen.
              </p>
              <p className="font-light" style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.8, marginBottom: '16px' }}>
                Ein kurzer Kurs oder eine TAFE-Einheit, die direkt mit der Arbeit zusammenhängt, die du bereits machst, ist absetzbar - derselbe Weiterbildungstest, der für jeden Beruf auf dieser Seite gilt. Wenn dein Arbeitgeber verlangt, dass du zu einem Seminar oder einer Auffrischung reist und dafür von zuhause weg übernachten musst, sind auch diese Fahrt- und Unterkunftskosten absetzbar. Ein erster Einstiegskurs, der nur absolviert wird, um überhaupt für eine Rolle zugelassen zu werden, wie ein erstes Certificate II, wird genauso behandelt wie ein erstes Ticket: eine private Ausgabe, um für den Job qualifiziert zu sein, keine Ausgabe für die Ausübung eines Jobs, den du bereits hast.
              </p>
              <p className="font-light" style={{ fontSize: '14px', color: '#2A3C34', lineHeight: 1.8 }}>
                Viele FIFO-Arbeitgeber verlangen medizinische Untersuchungen sowie Drogen- und Alkoholtests als Voraussetzung, um vor Ort arbeiten zu können. Wenn dein Arbeitgeber das für eine Rolle verlangt, die du bereits ausübst, und du selbst dafür bezahlen musst, sind die Kosten absetzbar.
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
          heading="Finde heraus, was deine FIFO-Ausgaben wert sind"
          body="Nutze den kostenlosen Rechner für eine schnelle Schätzung, oder schreib uns direkt - wir gehen dann gemeinsam mit dir deinen Roster, deine Tickets und deine Camp-Regelungen durch."
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
                  Steuerfragen zur FIFO-Arbeit
                </h2>
                <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                  Hast du eine Frage zu deinem eigenen Roster oder Standort? Schreib uns direkt.
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
            { label: 'TFN-Antrag', desc: 'Sichere dir deine Steuernummer vor deinem ersten Swing.', href: '/de/tfn' },
            { label: 'Steuererklärung', desc: 'Reiche deine Erklärung ein und setze deine FIFO-Arbeitskosten ab.', href: '/de/tax-return' },
            { label: 'Superannuation (DASP)', desc: 'Hol dir deine Super zurück, sobald du Australien verlassen hast.', href: '/de/superannuation' },
            { label: 'Alle Berufe', desc: 'Absetzungen für jeden Backpacker-Job, nicht nur FIFO.', href: '/de/expenses' },
          ]}
        />

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              Das sind allgemeine Informationen, keine persönliche Steuerberatung. Jeder Roster, jeder Standort und jede Camp-Regelung ist ein bisschen anders, und besonders der Zone Tax Offset hängt von deinem eigenen gewöhnlichen Wohnsitz ab, nicht nur davon, wohin dich dein Roster bringt. Wenn du deine Erklärung bei uns einreichst, wird sie von unserem Team erstellt, das nur mit Working Holiday Makern arbeitet und deinen konkreten Roster, deine Tickets und deine Umstände durchgeht, damit du alles absetzt, worauf du Anspruch hast, und nichts, worauf nicht.
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
