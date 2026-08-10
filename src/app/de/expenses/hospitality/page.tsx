import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Steuerabsetzung für Gastronomiemitarbeiter in Australien: RSA, Uniform & Trinkgeld',
  description: 'Was Gastronomiemitarbeiter mit einem Working-Holiday-Visum steuerlich absetzen können: RSA-Zertifikat, rutschfeste Schuhe, Uniformreinigung. Plus der Fehler beim Steuerfreibetrag, der Working Holiday Maker mit zwei oder drei Casual-Jobs gleichzeitig erwischt, und ob Trinkgeld als steuerpflichtiges Einkommen zählt.',
  keywords: [
    'Gastronomie Steuerabsetzung',
    'Kellner Steuerabsetzung Australien',
    'RSA Zertifikat steuerlich absetzbar',
    'Trinkgeld steuerpflichtig Australien',
    'Arbeitsschuhe Steuerabsetzung ATO',
    'Backpacker Gastronomie Steuererklärung',
    '417 Visum Gastronomie Steuerabsetzung',
    'Bar Job Steuer Australien',
    'Casual Job Steuerfreibetrag',
    'Gastronomie Absetzungen ATO',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/expenses/hospitality`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/hospitality`,
      'de': `${SITE_URL}/de/expenses/hospitality`,
      'ja': `${SITE_URL}/ja/expenses/hospitality`,
      'x-default': `${SITE_URL}/expenses/hospitality`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/expenses/hospitality`,
    siteName: 'Working Holiday Tax',
    title: 'Steuerabsetzung für Gastronomiemitarbeiter in Australien: RSA, Uniform & Trinkgeld',
    description: 'Was Gastronomiemitarbeiter mit einem Working-Holiday-Visum wirklich steuerlich absetzen können, und der Fehler beim Steuerfreibetrag, der Working Holiday Maker mit mehr als einem Casual-Job erwischt.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Steuerabsetzung für Gastronomiemitarbeiter in Australien: RSA, Uniform & Trinkgeld',
    description: 'Was Gastronomiemitarbeiter mit einem Working-Holiday-Visum wirklich steuerlich absetzen können, und der Fehler beim Steuerfreibetrag, der Working Holiday Maker mit mehr als einem Casual-Job erwischt.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const EMPLOYER_CHECKLIST = [
  'Deine TFN und eine ausgefüllte Tax File Number Declaration für genau diesen Arbeitgeber - sie überträgt sich nicht automatisch, nur weil ein anderer Arbeitgeber sie schon hinterlegt hat.',
  'Working Holiday Maker als Residenzstatus auf dem Formular ausgewählt - genau daran erkennt die Lohnbuchhaltung deines Arbeitgebers, dass für dich der Working-Holiday-Maker-Einbehaltungssatz gilt.',
  'Die Freibetragsfrage bei jedem Arbeitgeber, jedes Mal mit Nein beantwortet - auch bei dem, der dich am besten bezahlt.',
]

const faqs = [
  {
    question: 'Kann ich meine schwarzen Arbeitsschuhe und meine Arbeitshose absetzen?',
    answer: "Schlichte schwarze Kleidung oder Schuhe ohne Logo sind nicht absetzbar, selbst wenn der Dresscode deines Betriebs sie vorschreibt - die ATO behandelt das als gewöhnliche Kleidung, nicht als Uniform. Rutschfeste, geschlossene Schuhe sind etwas anderes: Wenn du sie wirklich für einen nassen Boden hinter der Bar oder eine belebte Küchenausgabe brauchst, zählen sie als Schutzschuhe und sind unabhängig von ihrer Farbe absetzbar.",
  },
  {
    question: 'Ich arbeite gleichzeitig in zwei Bars - was muss ich jedem Arbeitgeber mitteilen?',
    answer: "Gib jedem Arbeitgeber deine TFN und fülle für jeden Einzelnen eine eigene Tax File Number Declaration aus - deine TFN überträgt sich nicht automatisch. Wähle auf jedem Formular Working Holiday Maker als Residenzstatus und beantworte die Freibetragsfrage mit Nein, bei jedem Arbeitgeber, nicht nur bei deinem Hauptjob. Weil der Working-Holiday-Maker-Satz pauschal 15 % bis 45.000 $ beträgt, sollte bei keinem deiner Jobs jemals der Steuerfreibetrag von 18.200 $ für Residenten angewendet werden.",
  },
  {
    question: 'Ist mein Trinkgeld steuerpflichtig?',
    answer: "Ja. Trinkgeld und Servicegebühren, die über die Lohnabrechnung deines Arbeitgebers ausgezahlt werden, einschließlich gepooltem Trinkgeld oder Trinkgeld aus einem Tronc-System, sind Teil deines Lohns, bereits versteuert und in deinem Income Statement ausgewiesen. Bargeldtrinkgeld, das dir direkt gegeben wird, ist genauso steuerpflichtig, wird aber von niemandem für dich erfasst - du bist selbst dafür verantwortlich, eine einfache Aufzeichnung zu führen und die Summe anzugeben.",
  },
  {
    question: 'Bekomme ich Superannuation bei einem Casual-Job in der Gastronomie?',
    answer: "Ja. Dein Arbeitgeber muss für Casual-Arbeit genau wie bei jedem anderen Job 12 % Super zusätzlich zu deinem Lohn zahlen, ab deinem allerersten Dollar - eine monatliche Mindesteinkommensgrenze gibt es nicht mehr. Arbeitest du in mehreren Lokalen, zahlt jeder Arbeitgeber unabhängig Super, sodass sich deine Beiträge am Ende über mehrere Fonds verteilen können.",
  },
  {
    question: 'Einer meiner Arbeitgeber behält viel mehr Steuer ein als die anderen - warum?',
    answer: "Das bedeutet meistens, dass dieser Arbeitgeber noch keine Tax File Number Declaration von dir vorliegen hat, oder nicht dafür registriert ist, zu Working-Holiday-Maker-Sätzen einzubehalten - so oder so muss er so lange einen höheren Standardsatz einbehalten, bis das geklärt ist. Verloren ist das Geld nicht: Sobald das Einkommen all deiner Arbeitgeber in deiner Steuererklärung zusammengeführt ist, gilt der korrekte 15 %-Satz auf dein Gesamteinkommen, und die Differenz kommt zurück.",
  },
  {
    question: 'Kann ich mein RSA- oder Erste-Hilfe-Zertifikat absetzen?',
    answer: "Ja. Die Kosten für den Erwerb oder die Erneuerung eines RSA-Zertifikats (Responsible Service of Alcohol) sind absetzbar, wenn deine Rolle es voraussetzt, und dasselbe gilt für ein Erste-Hilfe-Zertifikat, wenn es Teil deines Jobs ist. Heb die Quittung des Kursanbieters als Nachweis auf.",
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
    { '@type': 'ListItem', position: 2, name: 'Ausgaben', item: `${SITE_URL}/de/expenses` },
    { '@type': 'ListItem', position: 3, name: 'Gastronomie', item: `${SITE_URL}/de/expenses/hospitality` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Steuerabsetzung für Gastronomiemitarbeiter in Australien: RSA, Uniform & Trinkgeld',
  description: 'Was Gastronomiemitarbeiter mit einem Working-Holiday-Visum wirklich steuerlich absetzen können, und der Fehler beim Steuerfreibetrag, der Working Holiday Maker mit mehr als einem Casual-Job erwischt.',
  url: `${SITE_URL}/de/expenses/hospitality`,
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

const linkStyle = { color: '#0B5240', textDecoration: 'underline' }

export default function HospitalityExpensesPageDE() {
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
                <li><Link href="/de" style={{ color: '#587066' }}>Startseite</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li><Link href="/de/expenses" style={{ color: '#587066' }}>Ausgaben</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Gastronomie</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '24ch' }}>
                Was können <span style={{ color: '#0B5240' }}>Gastronomiemitarbeiter</span> steuerlich absetzen?
              </h1>
              <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '50ch' }}>
                Die Bezahlung in Bar, Café und Restaurant ist meist unkompliziert. Die eigentliche Falle für Working Holiday Maker ist das Jonglieren mit zwei oder drei Casual-Jobs gleichzeitig - angefangen bei der Freibetragsfrage auf deiner TFN-Erklärung.
              </p>
            </div>
          </div>
        </section>

        {/* ── WORKING MORE THAN ONE JOB (this page's unique hook) ──────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Mehr als ein Job in der Gastronomie gleichzeitig
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                In der Gastronomie ist es üblich, zwei oder drei Casual-Jobs in derselben Woche zu stapeln - ein paar Mittagsschichten in einem Café, Abendservice in einem Restaurant, eine Wochenendschicht hinter der Bar. Das ist völlig normal und für sich genommen kein Problem. Es bedeutet nur, dass du bei jedem einzelnen Arbeitgeber ein Formular richtig ausfüllen musst, nicht nur bei deinem Hauptjob.
              </p>
            </div>

            <p className="font-semibold text-center" style={{ fontSize: '13px', color: '#0B5240', marginBottom: '16px' }}>
              Jeder neue Arbeitgeber braucht drei Dinge von dir:
            </p>
            <div className="max-w-[680px] mx-auto" style={{ marginBottom: '28px' }}>
              <div className="flex flex-col gap-3">
                {EMPLOYER_CHECKLIST.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">{c}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-[680px] mx-auto">
              <div className="taxres-savings-box">
                <div>
                  <p className="taxres-savings-heading">Nicht dieselbe Regel wie bei einem australischen Steuerresidenten</p>
                  <p className="taxres-savings-body">
                    Vielleicht hörst du von einem australischen Freund oder einer Kollegin, dass du den Steuerfreibetrag nur bei deinem bestbezahlten Job angeben solltest. Dieser Rat gilt für Steuerresidenten, die auf ihre ersten 18.200 $ Einkommen pro Jahr keine Steuer zahlen. Für dich mit einem 417- oder 462-Visum gilt das nicht - Working Holiday Maker bekommen überhaupt keinen Steuerfreibetrag, bei keinem Arbeitgeber, also lautet die richtige Antwort auf jeder Tax File Number Declaration, die du ausfüllst, Nein. Antwortest du irgendwo mit Ja, selbst bei deiner kleinsten Schicht, behält dieser Arbeitgeber zu wenig Steuer ein, und die Lücke wird zur Nachzahlung, sobald deine Steuererklärung eingereicht ist.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-[680px] mx-auto" style={{ marginTop: '22px' }}>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                Hier können zwei ganz unterschiedliche Dinge schiefgehen, die sich im Moment nicht gleich anfühlen. Beantwortest du die Freibetragsfrage irgendwo mit Ja, behält dieser Arbeitgeber so lange zu wenig Steuer ein, wie du dort arbeitest - die Lücke wird zur Nachzahlung, sobald deine <Link href="/de/tax-return" style={linkStyle}>Steuererklärung</Link> eingereicht ist. Reichst du dagegen bei einem neuen Arbeitgeber keine Erklärung ein, oder landest bei einem, der beim ATO nicht für die Working-Holiday-Maker-Sätze registriert ist, passiert das Gegenteil: Bei genau diesem Job wird zu viel Steuer abgezogen. Verloren geht dabei nichts - sobald die Income Statements aller Arbeitgeber in deiner Erklärung zusammengeführt sind, gilt der korrekte 15 %-Satz auf dein Gesamteinkommen, und die Differenz kommt als Teil deiner Rückerstattung zurück.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                Superannuation läuft davon unabhängig. Jeder Arbeitgeber muss für Casual-Arbeit in der Gastronomie genau wie bei jedem anderen Job <Link href="/de/superannuation" style={linkStyle}>12 % Super</Link> zusätzlich zu deinem Lohn zahlen, ab deinem allerersten Dollar - seit Juli 2022 gibt es keine monatliche Mindesteinkommensgrenze mehr. Arbeitest du in mehreren Lokalen, wundere dich nicht, wenn sich deine Super am Ende über mehrere Fonds verteilt; sie gehört trotzdem ganz dir, und wir helfen dir, sie vor deiner Abreise aus Australien aufzuspüren.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                Bist du dir nicht sicher, ob deine Tax File Number Declaration bei jedem Job richtig ausgefüllt ist: Unsere <Link href="/de/tfn" style={linkStyle}>TFN-Seite</Link> geht genau durch, was jeder Arbeitgeber braucht und warum.
              </p>
            </div>
          </div>
        </section>

        {/* ── TIPS, PENALTY RATES & CASUAL LOADING ─────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[760px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Sind Trinkgeld, Zuschläge (Penalty Rates) und Casual Loading steuerpflichtig?
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '54ch' }}>
                Kurz gesagt: ja, alles davon. Hier siehst du, wie jede Art von Gastronomie-Lohn tatsächlich behandelt wird.
              </p>
            </div>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Casual Loading und Zuschläge für Abend-, Wochenend- und Feiertagsarbeit sind keine gesonderte oder informelle Zahlung - sie sind ganz normaler Lohn, genauso versteuert wie der Rest deiner Bezahlung, und bereits im Bruttobetrag auf deinem Lohnzettel und Income Statement enthalten.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Bei Trinkgeld und Servicegebühren läuft es genauso. Sammelt dein Betrieb Trinkgeld in einem gemeinsamen Topf oder schlägt eine Servicegebühr auf die Rechnung, die dann über die Lohnabrechnung ausgezahlt wird - manchmal ein sogenanntes Tronc-System -, ist dieser Betrag Teil deines Lohns: Er wird zusammen mit dem Rest versteuert und erscheint bereits in deinem Income Statement. Wenn deine <Link href="/de/tax-return" style={linkStyle}>Steuererklärung</Link> vorbereitet wird, musst du damit nichts weiter tun.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              Bargeld, das dir ein Gast direkt in die Hand drückt, ist genauso steuerpflichtig - es wird nur von niemand anderem erfasst. Du bist selbst dafür verantwortlich, eine einfache Aufzeichnung zu führen - eine laufende Notiz mit Datum und ungefährem Betrag reicht völlig - und die Summe zur Steuerzeit als Einkommen anzugeben.
            </p>
          </div>
        </section>

        {/* ── WHAT YOU CAN / CAN'T CLAIM ───────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[760px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Was du absetzen kannst - und was nicht
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '56ch' }}>
                Eine kurze, ehrliche Liste arbeitsbezogener Ausgaben - und warum schlichte schwarze Arbeitskleidung nicht dazugehört, selbst wenn dein Betrieb sie vorschreibt.
              </p>
            </div>

            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Neben deinem Lohn gibt es eine kurze, ehrliche Liste arbeitsbezogener Ausgaben, die Gastronomiemitarbeiter absetzen können. Der Test ist derselbe, der für jeden Beruf gilt: Du hast es selbst bezahlt, es hängt direkt mit der Erzielung deines Einkommens zusammen, und du kannst eine Quittung vorlegen. Bei Kleidung kommt ein zusätzlicher Test dazu, und genau dort tappen die meisten Gastronomiemitarbeiter in die Falle.
            </p>

            <h3 className="font-serif font-black" style={{ fontSize: 'clamp(16px,1.7vw,19px)', color: '#0B5240', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              RSA- und Erste-Hilfe-Zertifikate
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Wenn deine Rolle ein gültiges RSA-Zertifikat (Responsible Service of Alcohol) voraussetzt, sind die Kosten für Erwerb und Erneuerung absetzbar. Dasselbe gilt für ein Erste-Hilfe-Zertifikat, wenn es für deinen Job vorgeschrieben ist. Beides sind direkte Kosten dafür, für die Arbeit qualifiziert zu sein, für die du bezahlt wirst - genau das prüft der Absetzungstest, und nicht eine allgemeine Fähigkeit, die du sowieso erworben hättest.
            </p>

            <h3 className="font-serif font-black" style={{ fontSize: 'clamp(16px,1.7vw,19px)', color: '#0B5240', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              Rutschfeste Schutzschuhe
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Rutschfeste, geschlossene Schuhe sind absetzbar, wenn du sie wirklich für den Job brauchst - ein nasser Boden hinter der Bar, Spritzer rund um die Kaffeemaschine, heiße Teller durch die Küchenausgabe tragen. Solche Schuhe zählen als Schutzschuhe, eine andere Kategorie als gewöhnliche Schuhe, weil sie eine konkrete Sicherheitsfunktion erfüllen und nicht nur einen Dresscode.
            </p>

            <h3 className="font-serif font-black" style={{ fontSize: 'clamp(16px,1.7vw,19px)', color: '#0B5240', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              Reinigung einer verpflichtenden Uniform
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Verlangt dein Arbeitgeber eine Uniform mit seinem Logo, ist die Reinigung dieser Uniform absetzbar. Das Logo macht sie steuerlich zur Uniform statt zu gewöhnlicher Kleidung - es ist ein verpflichtendes, unverwechselbares Kleidungsstück, das du außerhalb der Arbeit nicht freiwillig tragen würdest.
            </p>

            <h3 className="font-serif font-black" style={{ fontSize: 'clamp(16px,1.7vw,19px)', color: '#B54708', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              Was du nicht absetzen kannst
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Eine schlichte schwarze Hose, ein schlichtes schwarzes Hemd oder schlichte schwarze Schuhe ohne Logo sind nicht absetzbar, selbst wenn der Dresscode deines Betriebs sie vorschreibt. Das ist der Punkt, an dem die meisten scheitern, weil er sich ungerecht anfühlt - du hast das Outfit nur für die Arbeit gekauft und hättest dich sonst wahrscheinlich nicht für komplett Schwarz entschieden. Aber die ATO schaut nicht darauf, warum du etwas gekauft hast, sondern darauf, was der Gegenstand tatsächlich ist. Schlichte schwarze Kleidung ist gewöhnliche Alltagskleidung, die jeder überall tragen könnte - ganz gleich, was der Dresscode deines Arbeitgebers dazu sagt.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Damit ein Kleidungsstück als absetzbare Uniform zählt, muss es entweder berufsspezifisch oder Schutzkleidung sein, wie die rutschfesten Schuhe oben, oder eine verpflichtende Uniform mit einem echten Unterscheidungsmerkmal wie einem Logo. Dass dein Arbeitgeber streng auf den Dresscode achtet, ändert daran nichts - ein schlichtes schwarzes Hemd bleibt ein schlichtes schwarzes Hemd, das überall und von jedem getragen werden kann, ganz gleich, ob eine Vorgesetzte darauf besteht oder nicht.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              Arbeitest du nebenbei noch in einem anderen Job, oder willst du wissen, wie andere Berufe abschneiden? Den vollständigen Überblick findest du in unserem Ratgeber <Link href="/de/expenses" style={linkStyle}>Absetzungen nach Beruf</Link>.
            </p>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }} className="lg:py-14">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">FAQ</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  Steuerfragen aus der Gastronomie
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

        {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
        <NextStep
          eyebrow="Was kommt als Nächstes?"
          heading="Mehr als ein Job gleichzeitig? Gut so."
          body="Sobald deine Tax File Number Declarations bei jedem Arbeitgeber korrekt sind, ist der nächste Schritt eine Steuererklärung, die dein gesamtes Gastronomie-Einkommen zusammenführt."
          cta="Weiter zu deiner Steuererklärung →"
          href="/de/tax-return"
        />

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              Dies sind allgemeine Informationen, keine persönliche Steuerberatung. Jede Situation ist etwas anders, besonders sobald mehr als ein Arbeitgeber ins Spiel kommt. Wenn du deine Erklärung bei uns einreichst, wird sie von unserem Team erstellt, das nur mit Working Holiday Makern arbeitet und deine Lohnzettel und Income Statements im Detail durchgeht, damit deine Antworten zur Freibetragsfrage, deine Absetzungen und dein Trinkgeld korrekt berücksichtigt werden.
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
