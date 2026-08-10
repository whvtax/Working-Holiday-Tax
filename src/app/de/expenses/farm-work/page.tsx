import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Steuerabsetzungen für Farmarbeit & Obsternte in Australien',
  description: 'Was Working Holiday Maker bei Farmarbeit und Obsternte absetzen können - Sonnenschutz, Schuhe, Fahrten zwischen Farmen - dazu wie Saisonarbeit, Akkordlohn und mehrere Arbeitgeber bei der Steuererklärung funktionieren, und wie Farmarbeit mit deinem Visum zusammenhängt.',
  keywords: [
    'Farmarbeit Steuerabsetzung',
    'Obsternte Steuererklärung',
    'Backpacker Farmarbeit Steuer',
    'Farmarbeit Steuerabsetzung Australien',
    'Saisonarbeit Farm Steuer Australien',
    'Akkordlohn Steuer Australien',
    'Obsternte Absetzungen ATO',
    'Mehrere Arbeitgeber Farm Steuer',
    'Working Holiday Maker Farmarbeitgeber',
    'Regionale Arbeit Visum Steuer',
    '417 Visum zweites Jahr Farmarbeit',
    'Harvest Trail Steuererklärung',
    'Fahrtkosten Wanderarbeiter',
    'Fahrtkosten zwischen Farmen absetzen',
    'Specified Work Steuer Australien',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/expenses/farm-work`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/farm-work`,
      'de': `${SITE_URL}/de/expenses/farm-work`,
      'ja': `${SITE_URL}/ja/expenses/farm-work`,
      'x-default': `${SITE_URL}/expenses/farm-work`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/expenses/farm-work`,
    siteName: 'Working Holiday Tax',
    title: 'Steuerabsetzungen für Farmarbeit & Obsternte in Australien',
    description: 'Sonnenschutz, Schuhe und Fahrten zwischen Arbeitsorten sind absetzbar; gewöhnliche Kleidung und die erste Fahrt des Tages nicht. Was Farmarbeit und Obsternte für deine Steuererklärung bedeuten - und für dein Visum.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Steuerabsetzungen für Farmarbeit & Obsternte in Australien',
    description: 'Was Backpacker bei Farmarbeit und Obsternte absetzen können, und wie das mit deinem Working Holiday Visum zusammenhängt.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WHY_DIFFERENT = [
  {
    t: 'Saisonal',
    d: 'Ernten dauern jeweils ein paar Wochen, nicht das ganze Jahr. Viele Pflücker ziehen von Region zu Region oder von einer Ernte zur nächsten, statt bei einem einzigen Job zu bleiben.',
  },
  {
    t: 'Wandernd',
    d: 'Es ist üblich, auf mehreren Parzellen, in Schuppen oder auf verschiedenen Grundstücken zu arbeiten - manchmal mehreren davon an einem einzigen Tag - ohne einen einzigen festen Arbeitsplatz.',
  },
  {
    t: 'Akkordlohn',
    d: 'Der Lohn wird oft pro Kiste, Eimer, Tablett oder Kilo berechnet statt zu einem festen Stundensatz - trotzdem ganz normaler Lohn, nur anders berechnet.',
  },
  {
    t: 'Mehrere Arbeitgeber',
    d: 'Eine Saison kann eine Handvoll verschiedener Farmen, Contractors oder Personalvermittlungen bedeuten - steuerlich zählt jede einzelne als eigener Arbeitgeber.',
  },
]

const faqs = [
  {
    question: 'Ich habe dieses Jahr auf drei verschiedenen Farmen gearbeitet - brauche ich getrennte Steuererklärungen?',
    answer: 'Nein. Eine Steuererklärung deckt das gesamte Finanzjahr ab, vom 1. Juli bis zum 30. Juni, egal wie viele Farmen oder Arbeitgeber du in dieser Zeit hattest. Jeder Arbeitgeber meldet deinen Lohn und die einbehaltene Steuer getrennt an die ATO, und am Ende wird alles in einer einzigen Erklärung zusammengeführt. Das größte Risiko bei mehreren kurzen Jobs ist, einen davon zu vergessen, besonders einen kurzen Einsatz von nur einer Woche - genau das wird geprüft, bevor eine Erklärung über unser Team eingereicht wird.',
  },
  {
    question: 'Kann ich Benzin- oder Autokosten für Fahrten zwischen Farmen absetzen?',
    answer: 'Ja, wenn du am selben Arbeitstag zwischen zwei verschiedenen Farmen oder Arbeitsorten unterwegs bist, denn Farmarbeit gilt steuerlich oft als Tätigkeit an wechselnden Orten, ohne einen einzigen festen Arbeitsplatz. Nicht absetzbar ist die allererste Fahrt des Tages, von zuhause zur ersten Farm, die wie bei jedem anderen Job als gewöhnlicher Arbeitsweg zählt. Die Absetzung selbst wird über die Kilometerpauschale oder ein Fahrtenbuch berechnet, beides erklärt auf unserer Ausgaben-Seite.',
  },
  {
    question: 'Wird Akkordlohn steuerlich anders behandelt?',
    answer: 'Nein. Egal wie dein Lohn berechnet wird - pro Kiste, pro Eimer, pro Tablett oder pro Stunde - sobald er auf deinem Konto landet, ist es einfach ganz normaler Lohn. Dein Arbeitgeber meldet den Gesamtbetrag ans ATO und behält davon Steuern nach den Working-Holiday-Maker-Sätzen ein, und bei deiner Steuererklärung wird er wie jeder andere Lohn zu deinem Gesamteinkommen addiert.',
  },
  {
    question: 'Zählt Farmarbeit für ein zweites (oder drittes) Working Holiday Visum?',
    answer: 'Für viele Working Holiday Maker ja - das Absolvieren von festgelegter, berechtigter Arbeit im regionalen Australien ist einer der Hauptwege, um für ein weiteres 417- oder 462-Visum berechtigt zu werden, und Farmarbeit ist einer der häufigsten Wege, das zu erfüllen. Welche Jobs, Regionen und Zeiträume genau zählen, legt das Department of Home Affairs fest, nicht wir, und die Regeln haben sich schon mehrfach geändert - prüfe daher die aktuelle offizielle Anleitung oder sprich mit einem registrierten Migration Agent, bevor du dich darauf verlässt, dass ein bestimmter Job zählt. Womit wir helfen können, ist sicherzustellen, dass das Einkommen aus dieser Arbeit korrekt versteuert und gemeldet wird.',
  },
  {
    question: 'Woher weiß ich, ob ein Farmarbeitgeber als Working-Holiday-Maker-Arbeitgeber registriert ist?',
    answer: 'Frag einfach gleich zu Beginn - das ist eine völlig normale Frage, und die meisten Farmen kennen sie schon. Ein registrierter Arbeitgeber behält ab dem ersten Dollar den korrekten Working-Holiday-Maker-Satz von 15 % ein, während ein nicht registrierter stattdessen den höheren Foreign-Resident-Satz anwenden muss, der bei über 30 % beginnt. So oder so kommt jede zu viel einbehaltene Steuer mit deiner Steuererklärung zurück, aber es beeinflusst, wie viel während der Saison jede Woche tatsächlich auf deinem Konto landet.',
  },
  {
    question: 'Ich habe nicht von jeder Farm, auf der ich gearbeitet habe, einen Payslip. Ist das ein Problem?',
    answer: 'Meistens nicht. Die meisten Arbeitgeber melden deinen Lohn über Single Touch Payroll ans ATO, sodass er als Income Statement erscheint, auch wenn du nie einen Payslip erhalten oder aufbewahrt hast. Trotzdem hilft es, laufend eine einfache Notiz zu führen - welche Farm, welche Daten, ungefähr was du verdient hast - besonders in einer Saison mit mehreren kurzen Jobs, damit du später etwas hast, um die Zahlen gegenzuprüfen.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
    { '@type': 'ListItem', position: 2, name: 'Ausgaben', item: `${SITE_URL}/de/expenses` },
    { '@type': 'ListItem', position: 3, name: 'Farmarbeit', item: `${SITE_URL}/de/expenses/farm-work` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Steuerabsetzungen für Farmarbeit & Obsternte in Australien',
  description: 'Was Working Holiday Maker bei Farmarbeit und Obsternte absetzen können, wie Saisonarbeit, Akkordlohn und mehrere Arbeitgeber bei der Steuererklärung funktionieren, und wie Farmarbeit mit einem weiteren Working Holiday Visum zusammenhängt.',
  url: `${SITE_URL}/de/expenses/farm-work`,
  inLanguage: 'de-DE',
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'de',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

export default function FarmWorkExpensesPageDE() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-5 lg:pt-9 lg:pb-7">

            <nav aria-label="Breadcrumb" className="mb-4 lg:mb-5">
              <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
                <li><Link href="/de" style={{ color: '#587066' }}>Startseite</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li><Link href="/de/expenses" style={{ color: '#587066' }}>Ausgaben</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Farmarbeit</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '26ch' }}>
                Steuerabsetzungen für Farmarbeit, und was für dein <span style={{ color: '#0B5240' }}>Visum</span> zählt
              </h1>
              <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '54ch' }}>
                Obsternte und Farmarbeit bringen Steuerfragen mit sich, die kaum ein anderer Backpacker-Job kennt - Saisonarbeit, Akkordlohn, mehrere Arbeitgeber in einem Jahr - und für viele Working Holiday Maker außerdem eine echte Verbindung zu ihrem Visum.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHY FARM WORK IS DIFFERENT ──────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '20px' }}>
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Warum Farmarbeit steuerlich ein wenig anders behandelt wird
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '56ch' }}>
                Vier Dinge bei Farmarbeit und Obsternte, die bei den meisten anderen Backpacker-Jobs kaum eine Rolle spielen.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {WHY_DIFFERENT.map((c, i) => (
                <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#F7FBF9', border: '1.5px solid #E2EFE9' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '8px' }}>{c.t}</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE VISA CONNECTION (unique hook for this page) ─────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[760px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <span className="section-label">Die Verbindung zum Visum</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 18px' }}>
              Farmarbeit und ein weiteres Working Holiday Visum
            </h2>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Farmarbeit ist mit etwas verbunden, das für keinen anderen Backpacker-Job wirklich gilt: dein Visum selbst. Das Absolvieren von festgelegter, berechtigter Arbeit im regionalen Australien ist einer der Hauptwege, wie Working Holiday Maker mit einem 417- oder 462-Visum die Berechtigung für ein weiteres Working Holiday Visum erlangen, und ein großer Teil dieser berechtigten Arbeit findet auf Farmen, in Obstplantagen und allgemein in der Landwirtschaft und im Gartenbau statt. Das ist ein wesentlicher Grund, warum so viele Working Holiday Maker während ihrer Zeit in Australien mindestens einen Farmjob machen.
            </p>

            <div className="rounded-2xl" style={{ padding: '20px 22px', background: '#FDF0D5', border: '1.5px solid #F9D88A', borderLeft: '4px solid #E9A020', margin: '22px 0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                Das ist eine Einwanderungsfrage, keine Steuerfrage.
              </p>
              <p className="font-light" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.75 }}>
                Welche Branchen, welche Postleitzahlen oder Regionen und welche Zeiträume genau als berechtigte Arbeit zählen, und wie viele Tage du brauchst, legt das Department of Home Affairs fest, nicht das Steuerrecht - und die Regeln haben sich über die Jahre schon mehrfach geändert. Das im Blick zu behalten, gehört nicht zu unserem steuerlichen Fachgebiet. Bevor du dich darauf verlässt, dass ein bestimmter Job für dein Visum zählt, prüfe die aktuelle offizielle Anleitung auf der{' '}
                <a href="https://immi.homeaffairs.gov.au/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#0B5240' }}>Website des Department of Home Affairs</a>
                {' '}oder sprich mit einem registrierten Migration Agent.
              </p>
            </div>

            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              Wo wir helfen können, ist die steuerliche Seite dieser Arbeit. Egal was am Ende für dein Visum zählt, das Einkommen daraus muss trotzdem korrekt gemeldet und versteuert werden, und eine einfache Aufzeichnung - welche Farm, welche Daten, was du verdient hast - ist so oder so nützlich für deine Steuererklärung, und dient oft gleichzeitig als praktischer Nachweis, falls du irgendwann zeigen musst, welche Arbeit du wann geleistet hast.
            </p>
          </div>
        </section>

        {/* ── SEASONAL, ITINERANT, PIECE-RATE: THE TAX DETAIL ─────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Saisonal, wandernd und bezahlt pro Kiste
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                Nichts davon ändert die Grundlagen der australischen Besteuerung, aber es beeinflusst, wie leicht es ist, sie richtig anzuwenden.
              </p>
            </div>

            <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '8px' }}>
              Ein neues TFN Declaration-Formular für jede Farm
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '24px' }}>
              Jede neue Farm, jeder neue Contractor oder jede neue Personalvermittlung, für die du arbeitest, ist ein eigener Arbeitgeber, und jeder neue Arbeitgeber braucht sein eigenes TFN Declaration-Formular - deine TFN überträgt sich nicht automatisch, nur weil du bei der letzten Stelle schon eines ausgefüllt hast. Auf jedem dieser Formulare sollte ein Working Holiday Maker bei der Residency-Frage &bdquo;Working Holiday Maker&ldquo; und bei der Frage zum Steuerfreibetrag &bdquo;Nein&ldquo; auswählen; diese Vergünstigung steht australischen Residents zu und gilt niemals für Einkommen, das nach den Working-Holiday-Maker-Sätzen besteuert wird, egal wie viele Arbeitgeber du im Laufe des Jahres hast. Eines dieser Formulare im Autopilot auszufüllen, bei der Freibetragsfrage aus Gewohnheit Ja anzukreuzen oder das falsche Residency-Kästchen anzukreuzen, ist eine wirklich häufige Ursache für eine unerwartete Steuernachzahlung, und dieser Fehler passiert leichter, wenn du den Vorgang in einer Saison bei mehreren Farmen wiederholst. Mehr dazu, wie du die Erklärung jedes Mal richtig ausfüllst, findest du auf unserer <Link href="/de/tfn" style={{ color: '#0B5240', textDecoration: 'underline' }}>TFN-Seite</Link>.
            </p>

            <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '8px' }}>
              Akkordlohn ist trotzdem ganz normaler Lohn
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '24px' }}>
              Ob du pro Kiste, pro Eimer, pro Tablett oder pro Kilo bezahlt wirst statt nach Stunden, ändert nichts daran, wie das Geld versteuert wird. Egal wie hoch die Summe am Ende ist, dein Arbeitgeber meldet sie ans ATO und behält davon Steuern ein, genau wie bei einem Stundenlohn, nach den Working-Holiday-Maker-Sätzen, und sie wird bei deiner Steuererklärung wie jeder andere Lohn zu deinem Einkommen addiert. Der eigentliche Unterschied bei Akkordlohn liegt bei der Buchführung: Da der Lohn von Tag zu Tag schwankt und du in einer Saison zwischen Farmen wechselst, lohnt es sich, eine einfache eigene Notiz zu führen - welche Farm, welche Daten und ungefähr was du verdient hast - damit du später etwas hast, um deine Income Statements gegenzuprüfen.
            </p>

            <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '8px' }}>
              Frag, ob die Farm ein registrierter WHM-Arbeitgeber ist
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '8px' }}>
              Ob ein Arbeitgeber beim ATO als Arbeitgeber von Working Holiday Makern registriert ist, verändert, wie viel Steuer während der Saison von deinem Lohn abgeht. Registrierte Arbeitgeber behalten ab dem ersten Dollar den korrekten Working-Holiday-Maker-Satz von 15 % ein; nicht registrierte müssen stattdessen den höheren Foreign-Resident-Satz anwenden, der bei über 30 % beginnt. So oder so bist du nicht dauerhaft im Nachteil, da jede zu viel einbehaltene Steuer mit deiner Steuererklärung zurückkommt - aber es macht einen echten Unterschied dafür, was jede Woche tatsächlich auf deinem Konto landet, also lohnt es sich, jeden neuen Farmarbeitgeber direkt danach zu fragen.
            </p>

            <div className="taxres-savings-box" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div>
                <p className="taxres-savings-heading">Führe von Anfang an eine einfache Aufzeichnung</p>
                <p className="taxres-savings-body">
                  Eine laufende Notiz mit dem Namen der Farm, den Tagen, an denen du gearbeitet hast, und ungefähr dem, was du dort verdient hast, dauert nur eine Minute zu aktualisieren und kann dir später viel Ärger ersparen - egal ob du prüfst, ob deine Income Statements stimmen, einem Payslip nachjagst, der nie angekommen ist, oder einfach versuchst, dich zur Steuerzeit noch daran zu erinnern, auf welchen Farmen du überhaupt gearbeitet hast.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU CAN / CANNOT CLAIM ──────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '20px' }}>
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Was du absetzen kannst (und was nicht)
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                Hier gelten dieselben zwei ATO-Tests wie für jeden anderen Beruf: Du musst es selbst bezahlt haben, ohne Erstattung, und es muss wirklich mit der Erzielung deines Einkommens zusammenhängen, statt etwas zu sein, das du sowieso gekauft hättest.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6" style={{ marginBottom: '20px', alignItems: 'stretch' }}>

              <div className="exp-card">
                <p className="exp-card-label exp-card-label-yes">✓ Kann eventuell abgesetzt werden</p>

                <div style={{ marginBottom: '18px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px', letterSpacing: '-0.01em' }}>Sonnenschutz</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#2A3C34', lineHeight: 1.7 }}>
                    Wenn du bei deinem Job den ganzen Tag oder einen Teil davon im Freien bist - beim Pflücken, Schneiden oder Verpacken in einem offenen Schuppen - sind ein breitkrempiger Hut, Sonnencreme und eine Sonnenbrille absetzbar. Die ATO akzeptiert das gerade wegen der direkten, andauernden UV-Belastung, die die Arbeit mit sich bringt - eine andere Situation, als wenn du dir Sonnencreme für ein freies Wochenende kaufst.
                  </p>
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px', letterSpacing: '-0.01em' }}>Schutzhandschuhe und -stiefel</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#2A3C34', lineHeight: 1.7 }}>
                    Pflückhandschuhe, Gummistiefel oder andere Schutzstiefel, die vor den konkreten Gefahren des Jobs schützen - Dornen, Chemikalien, Schlamm, der Umgang mit Erntegut, unebenes Gelände - sind als von der Arbeit geforderte Schutzausrüstung absetzbar.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px', letterSpacing: '-0.01em' }}>Fahrten zwischen Farmen oder Arbeitsorten</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#2A3C34', lineHeight: 1.7 }}>
                    Fahrten zwischen verschiedenen Parzellen, Schuppen oder Grundstücken am selben Arbeitstag sind absetzbar, weil Farmarbeit oft an wechselnden Orten stattfindet und es selten einen einzigen festen Arbeitsplatz gibt. Das wird über die Kilometerpauschale oder ein Fahrtenbuch berechnet; wie die beiden Methoden funktionieren, erklärt unser <Link href="/de/expenses" style={{ color: '#0B5240', textDecoration: 'underline' }}>Ausgaben-Guide</Link>.
                  </p>
                </div>
              </div>

              <div className="exp-card">
                <p className="exp-card-label exp-card-label-no">✕ Normalerweise nicht absetzbar</p>

                <div style={{ marginBottom: '18px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px', letterSpacing: '-0.01em' }}>Gewöhnliche Kleidung</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#2A3C34', lineHeight: 1.7 }}>
                    Gewöhnliche Kleidung - Jeans, T-Shirts, ein Pullover für kalte Morgen - ist nie absetzbar, auch wenn sie beim ganztägigen Obstpflücken oder beim Umgang mit Erntegut zerreißt, Flecken bekommt oder sich abnutzt. Die ATO behandelt normalen Verschleiß an Alltagskleidung als private Ausgabe, genau wie bei jedem anderen Job; es gibt keine Ausnahme für Farmarbeit, nur weil die Kleidung dabei schmutzig wird.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px', letterSpacing: '-0.01em' }}>Die erste Fahrt des Tages</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#2A3C34', lineHeight: 1.7 }}>
                    Die Fahrt von zuhause zur ersten Farm oder zum ersten Arbeitsort des Tages ist gewöhnlicher Arbeitsweg, egal wie weit sie ist oder wie früh du losfährst - das gilt für jeden Beruf, nicht nur für Farmarbeit. Absetzbar sind nur die Fahrten zwischen Arbeitsorten, wenn du schon bei der Arbeit bist, nie die Fahrt, die dich überhaupt erst dorthin bringt.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── WHAT'S NEXT (internal links) ─────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <span className="section-label center">Was kommt als Nächstes?</span>
            <h2 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
              Sobald du weißt, was du absetzen kannst
            </h2>
            <p className="font-light text-muted max-w-[640px] mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '20px' }}>
              Hier geht es für die meisten Farm- und Saisonarbeiter als Nächstes weiter.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[900px] mx-auto">
              <Link href="/de/expenses" className="block rounded-xl border border-ink/10 p-4 text-[13.5px] font-light text-ink leading-[1.5] transition-colors hover:border-forest-500 hover:text-forest-500">
                Absetzungen für jeden anderen Backpacker-Job ansehen
              </Link>
              <Link href="/de/tfn" className="block rounded-xl border border-ink/10 p-4 text-[13.5px] font-light text-ink leading-[1.5] transition-colors hover:border-forest-500 hover:text-forest-500">
                TFN für einen neuen Farmjob klären
              </Link>
              <Link href="/de/tax-return" className="block rounded-xl border border-ink/10 p-4 text-[13.5px] font-light text-ink leading-[1.5] transition-colors hover:border-forest-500 hover:text-forest-500">
                Eine Steuererklärung für die ganze Saison einreichen
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">FAQ</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  Fragen zur Steuer bei Farmarbeit
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

        {/* ── DISCLAIMER ───────────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '8px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7 }}>
              Dies sind allgemeine Informationen, keine persönliche Steuerberatung, und keine Einwanderungs- oder Migrationsberatung. Jede Farmsaison sieht ein wenig anders aus - welche Arbeitgeber, welche Regionen, wie die Visumsseite hineinspielt. Wenn du deine Erklärung bei uns einreichst, wird sie von unserem Team erstellt, das nur mit Working Holiday Makern arbeitet und deine konkreten Arbeitgeber und Umstände durchgeht, damit du alles absetzt, worauf du Anspruch hast, und nichts, worauf nicht.
            </p>
          </div>
        </section>

        {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
        <NextStep
          eyebrow="Bereit, wenn du es bist"
          heading="Jede Farm und jeden Lohnzettel in einer Erklärung zusammenführen"
          body="Ob es eine lange Ernte war oder fünf kurze Jobs in drei Bundesstaaten - wir führen die Income Statements aller Arbeitgeber zusammen und prüfen dabei auch deinen Steuerabzug."
          cta="Steuererklärung starten →"
          href="/de/tax-form"
        />

      </main>
      <MobileCta href="/de/tax-form" lang="de" />
    </>
  )
}
