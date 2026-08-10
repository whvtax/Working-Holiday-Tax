import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { RelatedServices } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Steuerabsetzung für Zeitarbeits- und Lagerarbeiter in Australien',
  description: 'Was Backpacker, die über Zeitarbeits- und Personalvermittlungsagenturen arbeiten, steuerlich absetzen können - Lagerhäuser, Umzugsfirmen, Landschaftsbau, Fabrikarbeit und Events - und was sich ändert, sobald du bei mehr als einer Agentur gleichzeitig registriert bist.',
  keywords: [
    'Zeitarbeit Steuerabsetzung',
    'Lagerarbeit Steuerabsetzung Australien',
    'Personalvermittler Steuer Working Holiday',
    'Steuerabsetzung Leiharbeit Australien',
    'Backpacker Lagerjob Steuer',
    'mehrere Arbeitgeber Steuerfreibetrag Australien',
    'Fahrtkosten Steuerabsetzung Zeitarbeit',
    'WHV Zeitarbeit Steuererklärung',
    'Umzugsfirma Steuerabsetzung Backpacker',
    '417 Visum Zeitarbeit Steuer',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/expenses/labouring`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/labouring`,
      'de': `${SITE_URL}/de/expenses/labouring`,
      'ja': `${SITE_URL}/ja/expenses/labouring`,
      'x-default': `${SITE_URL}/expenses/labouring`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/expenses/labouring`,
    siteName: 'Working Holiday Tax',
    title: 'Steuerabsetzung für Zeitarbeits- und Lagerarbeiter in Australien',
    description: 'Was Backpacker, die über Zeitarbeits- und Personalvermittlungsagenturen arbeiten, steuerlich absetzen können, und was sich ändert, sobald mehr als eine Agentur im Spiel ist.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Steuerabsetzung für Zeitarbeits- und Lagerarbeiter in Australien',
    description: 'Was Backpacker über Zeitarbeitsagenturen wirklich absetzen können, und was sich mit mehreren Agenturen ändert.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const CAN_CLAIM = [
  {
    title: 'Schutzkleidung und Sicherheitsausrüstung',
    body: "Stahlkappenschuhe, Handschuhe, Warnschutzkleidung und Schutzbrillen sind absetzbar, wenn die jeweilige Einsatzrolle sie vorschreibt. Der Test, den die ATO anwendet, ist nicht, wie körperlich anstrengend sich die Arbeit allgemein anfühlt, sondern ob der Gegenstand dich vor einem konkret erkennbaren Verletzungsrisiko bei genau diesem Job schützt. Was du absetzen kannst, richtet sich also nach der tatsächlichen Rolle, die du an diesem Tag ausgeübt hast - egal ob im Lager, im Landschaftsbau-Team oder beim Aufbau einer Veranstaltung.",
  },
  {
    title: 'Lizenzen und Scheine, die du erneuerst - nicht erstmals erwirbst',
    body: "Wenn eine Rolle einen Gabelstaplerschein, ein EWP-Ticket (Elevated Work Platform, also eine Hebebühnen-Berechtigung) oder eine ähnliche Betriebsberechtigung verlangt, und du sie bereits besitzt und für den Job nutzt, ist die Erneuerung dieser Berechtigung absetzbar. Den Schein zum allerersten Mal zu erwerben, ist es nicht, weil diese Kosten dich überhaupt erst zur Bewerbung auf die Rolle berechtigen, statt Kosten für einen Job zu sein, den du bereits hast. Es gilt dasselbe Prinzip wie beim ersten Führerschein, oder der ersten White Card für jemanden, der gerade erst im Baugewerbe anfängt.",
  },
  {
    title: 'Werkzeug und Ausrüstung, die du selbst kaufst',
    body: "Manche Zeitarbeitsrollen erwarten, dass du grundlegendes eigenes Werkzeug mitbringst. Alles, was du kaufst und nicht erstattet bekommst, ist absetzbar: Gegenstände, die $300 oder weniger kosten, kannst du im Jahr des Kaufs vollständig absetzen, während alles über $300 abgeschrieben wird - schrittweise über die Nutzungsdauer statt auf einmal.",
  },
]

const CANNOT_CLAIM_TEXT = "Ein paar Dinge bringen Leute regelmäßig durcheinander, egal über welche Agentur oder an welchem Einsatzort du in einer bestimmten Woche arbeitest. Gewöhnliche Kleidung - einfache Arbeitshosen, ein T-Shirt oder unspezialisierte Schuhe - ist nicht absetzbar, selbst wenn sie bei der Arbeit schmutzig, zerrissen oder abgenutzt wird; die ATO behandelt das als normale Kleidungskosten, die jeder hat, nicht als arbeitsspezifische Kosten. Deine Fahrt von zuhause zu einem einzigen, regelmäßigen Arbeitsplatz gilt als gewöhnlicher Arbeitsweg, nicht als die oben beschriebenen Fahrten ohne festen Standort, selbst wenn es eine lange Fahrt ist. Und alles, was deine Agentur dir erstattet oder dir direkt zur Verfügung stellt - eine Uniform, Schutzausrüstung, Werkzeug - kannst du nicht noch einmal in deiner Steuererklärung absetzen. Du kannst nur absetzen, was wirklich aus deiner eigenen Tasche kam."

const faqs = [
  {
    question: "Ich bin gleichzeitig bei zwei oder drei Zeitarbeitsagenturen registriert - was muss ich steuerlich wissen?",
    answer: "Jede Agentur gilt rechtlich als eigenständiger Arbeitgeber, deshalb hast du bei jeder ein eigenes TFN Declaration-Formular und zum Steuerzeitpunkt ein eigenes Income Statement - selbst wenn sie dich an überlappende Einsatzorte schicken. Dein Lohn als Working Holiday Maker wird normalerweise nach dem Working-Holiday-Maker-Satz besteuert statt nach dem Steuerfreibetrag für Steuerresidenten, weshalb die klassische Falle 'Freibetrag nur bei einem Zahler beanspruchen' für deinen tatsächlichen Steuerabzug weniger relevant ist. Was bei mehreren gleichzeitig laufenden Agenturen wirklich zählt, ist einfacher: Notiere dir, bei welcher Agentur, an welchen Einsatzorten und an welchen Tagen du gearbeitet hast, damit bei der Erstellung deiner Steuererklärung nichts übersehen wird.",
  },
  {
    question: 'Kann ich Fahrten zwischen verschiedenen Einsatzorten absetzen?',
    answer: "Ja, in den meisten Fällen. Fahrten zwischen zwei oder mehr getrennten Arbeitsorten - zum Beispiel wenn dich eine Agentur morgens in ein Lagerhaus und nachmittags an einen anderen Einsatzort schickt - sind absetzbar, anders als deine gewöhnliche Fahrt von zuhause zu einem einzigen, regelmäßigen Arbeitsplatz. Je echter dein Arbeitsmuster ohne festen Standort ist (kein fester Stützpunkt, regelmäßig wechselnde Einsatzorte während der Woche), desto stärker ist der Fall dafür, mehr von dieser Fahrt abzusetzen - es hängt aber von den konkreten Umständen deines Dienstplans ab.",
  },
  {
    question: "Was ist steuerlich der Unterschied zwischen Zeitarbeit und Bauarbeit?",
    answer: "Die grundlegenden Absetzungstests sind dieselben, aber die konkreten Posten unterscheiden sich. Arbeit auf Baustellen erfordert normalerweise eine White Card und Standard-Schutzausrüstung wie Stahlkappenschuhe und Warnschutzkleidung, während allgemeine Zeitarbeit ein viel breiteres Spektrum an Einsatzorten abdeckt - Lagerhäuser, Umzüge, Landschaftsbau, Veranstaltungen, Fertigungslinien -, wo die benötigte Ausrüstung von der tatsächlichen Einsatzrolle abhängt und eine White Card normalerweise nicht nötig ist, außer die Arbeit findet wirklich auf einer Baustelle statt. Wenn deine Einsätze speziell auf Baustellen stattfinden, geht unsere Bauarbeit-Seite genauer darauf ein.",
  },
  {
    question: 'Brauche ich einen Gabelstaplerschein für Lagerarbeit, und kann ich ihn absetzen?',
    answer: "Nicht jede Rolle im Lager erfordert einen, aber viele schon. Wenn du bereits einen Gabelstaplerschein oder eine ähnliche Betriebsberechtigung besitzt und sie für den Job nutzt, ist die Erneuerung absetzbar. Den Schein zum ersten Mal zu erwerben, ist es im Allgemeinen nicht, weil diese Kosten dich überhaupt erst für die Rolle berechtigen, statt Kosten für einen Job zu sein, den du bereits hast.",
  },
  {
    question: 'Welche Schutzausrüstung kann ich über verschiedene Zeitarbeitsjobs hinweg absetzen?',
    answer: "Stahlkappenschuhe, Handschuhe, Warnschutzkleidung und Schutzbrillen sind im Allgemeinen absetzbar, wenn die jeweilige Einsatzrolle sie erfordert, weil der Test ist, ob der Gegenstand dich vor einem erkennbaren Verletzungsrisiko bei diesem Job schützt. Gewöhnliche Kleidung - einfache Arbeitshosen oder ein T-Shirt, das schmutzig oder abgenutzt wird - ist nach den ATO-Regeln nicht absetzbar, egal wie körperlich anstrengend die Arbeit ist. Und wenn deine Agentur dich dafür entschädigt oder die Ausrüstung selbst stellt, kannst du sie nicht noch einmal in deiner eigenen Steuererklärung absetzen.",
  },
  {
    question: 'Ich habe nur ein paar Casual-Schichten über eine Agentur gearbeitet - lohnt es sich trotzdem, Absetzungen geltend zu machen?',
    answer: "Normalerweise ja, solange du das Geld wirklich selbst ausgegeben und keine Erstattung dafür bekommen hast. Selbst ein paar Schichten können echte Kosten mit sich bringen - Schuhe, Handschuhe, eine Lizenzerneuerung, Fahrten zwischen Einsatzorten - und jede davon senkt die Steuer, die für dich berechnet wird. Die Voraussetzung bleibt gleich, egal wie viele Schichten du gearbeitet hast: arbeitsbezogen, nicht erstattet, und mit einem Nachweis belegbar.",
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Ausgaben', item: `${SITE_URL}/de/expenses` },
    { '@type': 'ListItem', position: 3, name: 'Zeitarbeit', item: `${SITE_URL}/de/expenses/labouring` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Steuerabsetzung für Zeitarbeit und Lagerarbeit in Australien',
  description: 'Was Backpacker, die über Zeitarbeits- und Personalvermittlungsagenturen arbeiten, steuerlich absetzen können, und was sich ändert, sobald mehr als eine Agentur im Spiel ist.',
  url: `${SITE_URL}/de/expenses/labouring`,
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

export default function LabouringExpensesPageDE() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Zeitarbeit</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '27ch' }}>
                Was können Zeitarbeits- und Lagerarbeiter <span style={{ color: '#0B5240' }}>steuerlich absetzen</span>?
              </h1>
              <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '58ch' }}>
                Lagerhäuser, Umzüge, Landschaftsbau, Fabrikarbeit, Auf- und Abbau von Veranstaltungen - die vielfältige körperliche Arbeit, in die Zeitarbeits- und Personalvermittlungsagenturen Backpacker vermitteln. Hier erfährst du, was du absetzen kannst, und wie die Steuer funktioniert, sobald mehr als eine Agentur im Spiel ist.
              </p>
            </div>
          </div>
        </section>

        {/* ── MULTIPLE AGENCIES, MULTIPLE WORKSITES (unique hook) ─────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Mehrere Agenturen, mehrere Einsatzorte
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                Was Zeitarbeit wirklich von einem normalen Einzeljob unterscheidet, und was das konkret für deine Steuer bedeutet.
              </p>
            </div>

            <div className="max-w-[680px] mx-auto">
              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '18px', letterSpacing: '-0.01em', marginBottom: '10px', lineHeight: 1.3 }}>
                Jede Agentur ist ein eigenständiger Arbeitgeber, auch wenn die Arbeit gleich aussieht
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                Wenn du dich bei einer Zeitarbeits- oder Personalvermittlungsagentur anmeldest, füllst du ein TFN Declaration-Formular speziell für diese eine Agentur aus - nicht für die Unternehmen, bei denen sie dich einsetzt. Rechtlich ist die Agentur dein Arbeitgeber, und der Einsatzbetrieb - das Lagerhaus, die Umzugsfirma, der Veranstaltungsort - ist einfach der Ort, an den dich die Agentur an diesem Tag zum Arbeiten geschickt hat. Meldest du dich bei einer zweiten oder dritten Agentur an, um deinen Dienstplan zu füllen, hat jede davon ihr eigenes TFN Declaration-Formular und ihre eigene PAYG-Einbehaltung - auch wenn es sich für dich wie eine durchgehende Casual-Beschäftigung anfühlen kann.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '22px' }}>
                Jedes TFN Declaration-Formular fragt, ob du den Steuerfreibetrag beanspruchen möchtest, und die Standardregel lautet, dass du das immer nur bei einem Zahler gleichzeitig tun kannst. Für die meisten Working Holiday Maker ist das weniger relevant, als es für einen australischen Steuerresidenten mit zwei Jobs wäre, weil dein Lohn als Inhaber eines 417- oder 462-Visums normalerweise nach dem Working-Holiday-Maker-Satz besteuert wird - einem Pauschalsatz von 15 % bis 45.000 $ - statt nach dem Steuerfreibetrag für Steuerresidenten. Diese Antwort sollte also in der Regel nicht verändern, wie viel eine einzelne Agentur einbehält. Was mit zwei oder drei gleichzeitig laufenden Agenturen wirklich zählt, ist grundlegender: sicherzustellen, dass jede korrekt auf deinen Income Statements erscheint, dass jede zum richtigen Satz für einen Working Holiday Maker einbehält, und dass bei der Erstellung deiner Steuererklärung nichts übersehen wird. Unsere <Link href="/de/tfn" style={{ color: '#0B5240', textDecoration: 'underline' }}>TFN-Seite</Link> erklärt, wie das TFN Declaration-Formular und der Einbehaltungssatz tatsächlich funktionieren.
              </p>

              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '18px', letterSpacing: '-0.01em', marginBottom: '10px', lineHeight: 1.3 }}>
                Fahrten zwischen Einsätzen können absetzbar sein - dein gewöhnlicher Arbeitsweg nicht
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                Die allgemeine Regel der ATO lautet: Die Fahrt von zuhause zu einem einzigen, regelmäßigen Arbeitsplatz ist gewöhnlicher Arbeitsweg und niemals absetzbar, egal wie weit du vom Job entfernt wohnst. Zeitarbeit passt oft nicht in dieses Muster. Wenn dich eine Agentur morgens an einen Einsatzort und nachmittags an einen anderen schickt, oder deine Einsätze im Laufe der Woche wirklich von Lager zu Lager, von Veranstaltung zu Veranstaltung oder von Kunde zu Kunde wechseln, ohne festen Standort, dann ist die Fahrt zwischen diesen Arbeitsorten - nicht deine allererste Fahrt von zuhause - normalerweise absetzbar.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                Je echter dein Arbeitsmuster ohne festen Standort ist, desto stärker ist der Fall dafür, mehr von dieser Fahrt abzusetzen: Wie oft der Einsatzort wechselt, ob du einen festen Stützpunkt hast, zu dem du zurückkehrst, und wie die Arbeit tatsächlich organisiert ist, beeinflusst das alles die Antwort - es hängt also von den konkreten Umständen deines Dienstplans ab und ist nicht automatisch. Es lohnt sich, dir Datum, Einsatzort und gefahrene Strecke einfach zu notieren. Die Autokosten selbst werden nach der Kilometerpauschale oder der Fahrtenbuch-Methode berechnet - unsere <Link href="/de/expenses" style={{ color: '#0B5240', textDecoration: 'underline' }}>Ausgaben-Seite</Link> zeigt, wie das berechnet wird.
              </p>
            </div>

            <div className="taxres-savings-box" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto' }}>
              <div>
                <p className="taxres-savings-heading">Eine Gewohnheit, die sich bei mehr als einer Agentur auszahlt</p>
                <p className="taxres-savings-body">
                  Notiere dir einfach, bei welcher Agentur, an welchem Einsatzort und an welchen Tagen du gearbeitet hast, dazu Belege für jede Ausrüstung, Lizenzerneuerung oder Fahrt, die du selbst bezahlt hast. Bei nur einer Agentur spielt das kaum eine Rolle. Bei zwei oder drei, die im selben Finanzjahr gleichzeitig laufen, verhindert genau das, dass ein Income Statement übersehen wird oder deine Steuererklärung später korrigiert werden muss.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU CAN / CAN'T CLAIM ───────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Was du absetzen kannst - und was nicht
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                Dieselben Regeln, die für jeden körperlichen Job auf dieser Seite gelten, angewendet speziell auf Lagerhäuser, Umzüge, Landschaftsbau, Fertigungslinien und Veranstaltungen.
              </p>
            </div>

            <div className="max-w-[680px] mx-auto">
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '24px' }}>
                Für jede Absetzung auf dieser Seite gelten dieselben drei Tests: Du hast es selbst bezahlt und keine Erstattung bekommen, es hängt direkt mit der Arbeit zusammen, die du tatsächlich ausgeübt hast, und du kannst einen Nachweis dafür vorlegen. (Unsere <Link href="/de/expenses" style={{ color: '#0B5240', textDecoration: 'underline' }}>Ausgaben-Seite</Link> geht genauer auf diese Tests ein - sie gelten für jeden Beruf, nicht nur für Zeitarbeit.) Speziell angewendet auf Lagerarbeit, Umzüge, Landschaftsbau, Fabrikarbeit und Veranstaltungen: Hier ist, was sich in der Regel bewährt - und was nicht.
              </p>

              <p className="exp-card-label exp-card-label-yes" style={{ marginBottom: '12px' }}>✓ Normalerweise absetzbar</p>
              {CAN_CLAIM.map((item, i) => (
                <div key={i} style={{ marginBottom: '18px' }}>
                  <h3 className="font-serif font-bold text-ink" style={{ fontSize: '16.5px', letterSpacing: '-0.01em', marginBottom: '6px', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                    {item.body}
                  </p>
                </div>
              ))}

              <p className="exp-card-label exp-card-label-no" style={{ marginTop: '8px', marginBottom: '12px' }}>✕ Normalerweise nicht absetzbar</p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '22px' }}>
                {CANNOT_CLAIM_TEXT}
              </p>

              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                Wenn deine Einsätze speziell auf Baustellen stattfinden statt bei allgemeiner Zeitarbeit, geht unsere <Link href="/de/expenses/construction" style={{ color: '#0B5240', textDecoration: 'underline' }}>Bauarbeit-Seite</Link> genauer auf White-Card-Kosten und baustellenspezifische Schutzausrüstung ein.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">FAQ</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  Steuerfragen zur Zeitarbeit
                </h2>
                <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                  Noch unsicher, wie sich deine Agenturen auf deine Steuererklärung auswirken? Schreib uns direkt.
                </p>
              </div>
              <div className="max-w-[700px]">
                <Accordion items={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED PAGES ────────────────────────────────────────────────── */}
        <RelatedServices label="Ähnliche Leistungen" items={[
          { label: 'Alle Berufe', desc: 'Der komplette Guide, was Backpacker je nach Jobart absetzen können', href: '/de/expenses' },
          { label: 'TFN erledigen', desc: 'Wie dein TFN Declaration-Formular und dein Einbehaltungssatz wirklich funktionieren', href: '/de/tfn' },
          { label: 'Steuererklärung einreichen', desc: 'Lass deine Erklärung vorbereiten und einreichen, auch aus dem Ausland', href: '/de/tax-return' },
          { label: 'Stattdessen auf der Baustelle?', desc: 'White-Card-Kosten und baustellenspezifische Ausrüstung', href: '/de/expenses/construction' },
        ]} />

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              Das sind allgemeine Informationen, keine persönliche Steuerberatung. Bei welchen Agenturen du registriert bist, wie deine Einsätze strukturiert sind, und wie wechselnd dein Arbeitsmuster wirklich ist, beeinflusst alles, was du absetzen kannst - behandle die Beispiele auf dieser Seite deshalb als Ausgangspunkt und nicht als endgültige Antwort. Wenn du deine Erklärung bei uns einreichst, wird sie von unserem Team vorbereitet, das nur mit Working Holiday Makern arbeitet und deine tatsächlichen Agenturen, Einsatzorte und Belege durchgeht, damit du alles absetzt, worauf du Anspruch hast, und nichts, worauf nicht.
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
