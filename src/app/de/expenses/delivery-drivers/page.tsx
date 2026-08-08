import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Lieferfahrer-Steuer in Australien: Uber Eats, DoorDash & Angestellte Fahrer',
  description: 'Fahrer für Uber Eats, DoorDash, Menulog und Amazon Flex arbeiten als Sole Trader unter einer ABN, nicht als Angestellte. Manche Lieferjobs zahlen stattdessen Lohn unter einer TFN. Was Working Holiday Maker absetzen können, die Kilometerpauschale und die Fahrtenbuch-Methode, und wie du erkennst, welches Setup für dich gilt.',
  keywords: [
    'Lieferfahrer Steuer Australien',
    'Uber Eats Steuer Working Holiday',
    'DoorDash Steuer Australien',
    'DoorDash ABN Working Holiday',
    'Menulog Lieferfahrer Steuer',
    'Amazon Flex Steuer Australien',
    'Essenslieferung Steuerabsetzungen',
    'ABN oder TFN Lieferfahrer',
    'Lieferfahrer ABN Working Holiday',
    'Gig Economy Steuer Australien',
    'Kilometerpauschale Lieferfahrer',
    'Autokosten Lieferfahrer',
    'Sharing Economy Meldung ATO',
    'Rideshare Lieferung Steuerabsetzungen',
    '417 462 Visum Lieferfahrer Steuer',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/expenses/delivery-drivers`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/delivery-drivers`,
      'de': `${SITE_URL}/de/expenses/delivery-drivers`,
      'ja': `${SITE_URL}/ja/expenses/delivery-drivers`,
      'x-default': `${SITE_URL}/expenses/delivery-drivers`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/expenses/delivery-drivers`,
    siteName: 'Working Holiday Tax',
    title: 'Lieferfahrer-Steuer in Australien: Uber Eats, DoorDash & Angestellte Fahrer',
    description: 'Uber Eats, DoorDash und Amazon Flex sind Contractor-Arbeit unter einer ABN, keine TFN-Anstellung. Hier erfährst du den Unterschied - und was Lieferfahrer steuerlich absetzen können.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Lieferfahrer-Steuer in Australien: Uber Eats, DoorDash & Angestellte Fahrer',
    description: 'Uber Eats, DoorDash und Amazon Flex sind Contractor-Arbeit unter einer ABN, keine TFN-Anstellung. Hier erfährst du den Unterschied - und was Lieferfahrer steuerlich absetzen können.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

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

type DriverType = {
  emoji: string
  kind: string
  title: string
  subtitle: string
  signals: string[]
  ctaLabel: string
  ctaHref: string
}

const FORK_CARDS: DriverType[] = [
  {
    emoji: '🛵',
    kind: 'eine ABN',
    title: 'Liefern über Plattform & App',
    subtitle: 'Uber Eats, DoorDash, Menulog, Amazon Flex',
    signals: [
      'Du nimmst Aufträge über eine App an, statt einen festen Dienstplan zu haben',
      'Du wirst per wöchentlicher Abrechnung oder Rechnung bezahlt, nicht per Gehaltsabrechnung',
      'Es wird keine Steuer einbehalten, bevor das Geld auf deinem Konto landet',
      'Du bestimmst deine eigenen Zeiten und kannst dich an- und abmelden, wann du willst',
      'Es wird keine Super zusätzlich zu deinem Verdienst gezahlt',
    ],
    ctaLabel: 'Hier starten: ABN registrieren →',
    ctaHref: '/de/abn',
  },
  {
    emoji: '🍕',
    kind: 'eine TFN',
    title: 'Angestellt bei einem Restaurant oder Shop',
    subtitle: 'Erhält direkt Lohn, meist nach Dienstplan',
    signals: [
      'Du arbeitest feste oder geplante Schichten für ein Restaurant, einen Take-away-Shop oder ein Unternehmen',
      'Du bekommst eine Gehaltsabrechnung, auf der schon Steuer einbehalten ist',
      'Der Betrieb legt deinen Stundenlohn, deine Arbeitszeiten und die Art der Ausführung fest',
      'Du bekommst Super zusätzlich zu deinem Lohn gezahlt',
      'Du hast bei Arbeitsbeginn ein TFN Declaration Form ausgefüllt',
    ],
    ctaLabel: 'Hier starten: TFN beantragen →',
    ctaHref: '/de/tfn',
  },
]

const faqs = [
  {
    question: 'Brauche ich eine ABN, um mit Working Holiday Visum für Uber Eats zu fahren?',
    answer: 'Ja. Uber Eats, DoorDash, Menulog und Amazon Flex engagieren ihre Fahrer alle als Contractor statt als Angestellte - du brauchst also eine ABN, bevor du dich anmelden und bezahlt werden kannst. Zuerst brauchst du eine TFN - eine ABN ersetzt sie nicht -, und dann registrierst du eine ABN für die Lieferarbeit selbst.',
  },
  {
    question: 'Kann ich meine Handyrechnung als Lieferfahrer absetzen?',
    answer: 'Du kannst den arbeitsbezogenen Prozentsatz deines Handy- und Datentarifs absetzen - den Anteil, den du wirklich für Lieferapps, GPS-Navigation und die Annahme von Aufträgen nutzt. Die gesamte Rechnung kannst du nicht absetzen, wenn du das Handy auch privat zum Telefonieren und Surfen nutzt, was fast alle tun - du brauchst also eine faire und ehrliche Grundlage für den Prozentsatz, den du ansetzt.',
  },
  {
    question: 'Was, wenn ich für ein Restaurant als Angestellter liefere, nicht über eine Plattform?',
    answer: 'Wenn du für einen Take-away-Shop, ein Restaurant oder eine Pizzeria nach Dienstplan arbeitest und eine Gehaltsabrechnung mit bereits einbehaltener Steuer bekommst, bist du Angestellter, kein Contractor. Du brauchst eine TFN statt einer ABN, und die gewöhnliche Fahrt von zuhause zu diesem Arbeitsplatz gilt als privates Pendeln, nicht als absetzbare Ausgabe - genau wie bei jedem anderen Job.',
  },
  {
    question: 'Welche Methode für Autokosten sollte ich als Lieferfahrer nutzen?',
    answer: 'Das hängt davon ab, wie viel du arbeitsbezogen fährst. Unter 5.000 arbeitsbezogenen Kilometern im Jahr ist die Kilometerpauschale meist einfacher, weil sie keine Belege braucht, nur eine nachvollziehbare Aufzeichnung, wie du auf die Kilometer gekommen bist. Darüber, oder wenn deine tatsächlichen laufenden Kosten hoch sind, bringt die Fahrtenbuch-Methode - ein 12-wöchiges Fahrtenbuch, gültig für fünf Jahre - oft eine höhere Absetzung, aber dafür brauchst du für jede Ausgabe einen Beleg.',
  },
  {
    question: 'Melden Uber Eats oder DoorDash mein Einkommen an das ATO?',
    answer: 'Ja. Unter dem Sharing Economy Reporting Regime des ATO melden Plattformen wie Uber und DoorDash die Einkommensdaten der Fahrer direkt an das ATO. Deine Liefereinnahmen sind für das ATO bereits sichtbar, unabhängig davon, was du angibst - deshalb gehören sie in deine Steuererklärung, egal wie klein oder unregelmäßig sich die Beträge anfühlen.',
  },
  {
    question: 'Ich fahre für Lieferungen mit dem Fahrrad oder E-Scooter statt mit dem Auto - kann ich trotzdem etwas absetzen?',
    answer: 'Ja. Für Fahrräder und E-Scooter gilt dieselbe Logik wie für Autos: Du kannst den arbeitsbezogenen Anteil der laufenden Kosten und Wartung absetzen, dazu Sicherheitsausrüstung wie Helm und Warnschutzkleidung - aufgeteilt zwischen deinen Lieferfahrten und der privaten Nutzung.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Ausgaben', item: `${SITE_URL}/de/expenses` },
    { '@type': 'ListItem', position: 3, name: 'Lieferfahrer', item: `${SITE_URL}/de/expenses/delivery-drivers` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Lieferfahrer-Steuer in Australien: Uber Eats, DoorDash & Angestellte Fahrer',
  description: 'Ob Lieferfahren ABN-Contractor-Arbeit oder TFN-Anstellung ist, und was Working Holiday Maker in beiden Fällen steuerlich absetzen können.',
  url: `${SITE_URL}/de/expenses/delivery-drivers`,
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

function ForkCard({ f }: { f: DriverType }) {
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

export default function DeliveryDriversExpensesPageDE() {
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
                <li><Link href="/de" style={{ color: '#587066' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li><Link href="/de/expenses" style={{ color: '#587066' }}>Ausgaben</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Lieferfahrer</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '22ch' }}>
                Lieferfahrer-Steuer: <span style={{ color: '#0B5240' }}>ABN, TFN oder beides?</span>
              </h1>
              <p className="font-semibold mx-auto" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '50ch' }}>
                Uber Eats, DoorDash und Amazon Flex sind Gig-Arbeit unter einer ABN. Fährst du für ein einzelnes Restaurant nach Dienstplan, ist das meist ein normaler TFN-Job. Hier erfährst du, wie du den Unterschied erkennst - und was du in beiden Fällen absetzen kannst.
              </p>
            </div>
          </div>
        </section>

        {/* ── THE ABN / TFN FORK (this page's unique hook) ────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '20px' }}>
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                ABN oder TFN: Finde zuerst heraus, was auf dich zutrifft
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                Die meisten Lieferfahrten auf einem Working Holiday Visum sind Gig-Arbeit unter einer ABN. Ein Teil davon ist ein ganz normaler Angestelltenjob unter einer TFN. Beide werden völlig unterschiedlich besteuert - deshalb solltest du das als Erstes klären.
              </p>
            </div>

            <div className="exp-grid">
              {FORK_CARDS.map((f, i) => <ForkCard key={i} f={f} />)}
            </div>

            <div className="max-w-[680px] mx-auto text-center" style={{ marginTop: '8px' }}>
              <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7, marginBottom: '10px' }}>
                Viele machen im Laufe eines Jahres beides - einen festen Schichtjob unter TFN und nebenbei Uber Eats oder DoorDash unter einer ABN. Das ist völlig normal; du gibst einfach beide Einkommensarten in derselben Steuererklärung an, idealerweise mit getrennten Aufzeichnungen für jede.
              </p>
              <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7 }}>
                Eine Warnung: Wenn ein einzelnes Restaurant oder ein Shop von dir verlangt, eine ABN zu haben, obwohl er deine Schichten festlegt, deine Arbeit beaufsichtigt und dir die Liefertasche oder das Fahrrad stellt, könnte das eine Scheinselbstständigkeit sein und kein echtes Contracting. Das solltest du lieber prüfen lassen, bevor du dich registrierst, statt einfach davon auszugehen, dass die Bezeichnung ABN das schon klärt.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU CAN / CAN'T CLAIM ───────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[760px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Was Lieferfahrer wirklich absetzen können
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '56ch' }}>
                Dabei gilt überall dasselbe Prinzip: Nur der arbeitsbezogene Anteil einer Ausgabe zählt, und du brauchst für alles, was du absetzt, einen Nachweis.
              </p>
            </div>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '0 0 8px', lineHeight: 1.3 }}>
              Auto und laufende Kosten
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Das ist für die meisten Fahrer die größte Absetzung, egal was du fährst. Du setzt den arbeitsbezogenen Anteil deines Fahrzeugs entweder mit der Kilometerpauschale oder der Fahrtenbuch-Methode ab (weiter unten im Detail verglichen) - und zwar nur für Fahrten, die wirklich Teil des Jobs sind, nie für private Fahrten.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Für einen angestellten Lieferfahrer gilt dieselbe Pendel-Regel wie bei jedem anderen Job: Die Fahrt von zuhause zum Restaurant oder Shop, wo du einstempelst, und am Ende der Schicht wieder zurück, ist private Fahrt und keine Absetzung. Nur das Fahren, sobald du im Dienst bist - zwischen Shop und Lieferadressen - zählt als arbeitsbezogen.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Fährst du unter einer ABN, sieht die Lage etwas anders aus, weil das Fahren nicht nur der Weg zur Arbeit ist, sondern die Arbeit selbst. Fahrten, die direkt und nachweisbar Teil deiner Einkommenserzielung durch die Lieferungen sind, sind nicht automatisch ausgeschlossen wie beim Pendelweg eines Angestellten. Wo genau die Grenze verläuft - zum Beispiel, ob die Fahrt von zuhause zu deiner ersten Lieferung des Tages zählt - hängt von den konkreten Umständen ab, wie du arbeitest. Es lohnt sich daher, deine eigene Situation prüfen zu lassen, statt anzunehmen, dass jeder Kilometer absetzbar ist.
            </p>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              Handy und Datentarif
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Lieferarbeit läuft über eine App, deshalb ist der arbeitsbezogene Prozentsatz deiner Handyrechnung und deines Datentarifs absetzbar - der Anteil, den du wirklich für die Fahrer-App von Uber, DoorDash oder Menulog, GPS-Navigation und Nachrichten zu Aufträgen nutzt. Du brauchst eine faire, ehrliche Schätzung dieses Anteils; die gesamte Rechnung für ein Handy abzusetzen, das du auch privat nutzt, lässt sich nicht rechtfertigen.
            </p>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              Parkgebühren und Strafzettel
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Parkgebühren, die während der Arbeit anfallen - zum Beispiel, während du in einem Einkaufszentrum auf eine fertige Bestellung wartest - sind absetzbar. Bei Park- oder Geschwindigkeitsstrafen sieht es anders aus: Sie sind nie absetzbar, ganz gleich unter welchen Umständen, selbst wenn du sie während einer Lieferung bekommen hast.
            </p>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              Fahrrad- und E-Scooter-Fahrer
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Essenslieferung läuft immer öfter auf zwei statt auf vier Rädern. Es gilt dieselbe Logik wie beim Auto: Du kannst den arbeitsbezogenen Anteil der laufenden Kosten und Reparaturen deines Fahrrads oder E-Scooters absetzen, dazu Sicherheitsausrüstung, die du für den Job brauchst, wie Helm und Warnschutzkleidung - aufgeteilt zwischen Lieferfahrten und privater Nutzung.
            </p>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              Das Fahrzeug in einem ordentlichen Zustand halten
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Die Reinigung deines Autos, damit es in einem für den Transport von Essen oder Paketen angemessenen Zustand ist, kann für den arbeitsbezogenen Anteil absetzbar sein - dasselbe Prinzip, das für Rideshare-Fahrer mit Fahrgästen gilt.
            </p>

            <h3 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(16px,1.7vw,19px)', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              Was du nicht absetzen kannst
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              Ein paar Dinge bringen Fahrer jedes Jahr in Schwierigkeiten. Der private Teil einer Fahrt - zum Beispiel eine private Besorgung auf dem Weg zu einer Lieferung - ist nicht absetzbar, genauso wenig wie der gewöhnliche Arbeitsweg eines Angestellten zwischen zuhause und einem festen Arbeitsplatz. Park- und Geschwindigkeitsstrafen sind nie absetzbar, egal wie es dazu kam. Und wenn eine Plattform oder ein Arbeitgeber dir etwas bereits erstattet hat - zum Beispiel eine Tankfüllung - kannst du es nicht noch einmal in deiner Steuererklärung absetzen; das würde bedeuten, dieselbe Ausgabe zweimal geltend zu machen.
            </p>
          </div>
        </section>

        {/* ── GST & SHARING ECONOMY REPORTING ──────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '34px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(20px, 2.6vw, 26px)', letterSpacing: '-0.02em' }}>
                Zwei Dinge, die jeder Plattform-Fahrer wissen sollte
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="taxres-savings-box">
                <div>
                  <p className="taxres-savings-heading">GST spielt erst bei höherem Umsatz eine Rolle</p>
                  <p className="taxres-savings-body">
                    Wenn du unter einer ABN arbeitest und dein Umsatz aus der Lieferarbeit im Jahr 75.000 $ übersteigt, wird die GST-Registrierung verpflichtend. Die meisten Working Holiday Maker, die Teilzeit für Essenslieferungs-Apps fahren, kommen an diese Schwelle bei weitem nicht heran - trotzdem lohnt es sich, sie im Hinterkopf zu behalten, falls deine Stunden oder Einnahmen wachsen.
                  </p>
                </div>
              </div>
              <div className="taxres-savings-box">
                <div>
                  <p className="taxres-savings-heading">Plattformen melden dein Einkommen bereits an das ATO</p>
                  <p className="taxres-savings-body">
                    Uber, DoorDash und ähnliche Plattformen fallen unter das Sharing Economy Reporting Regime des ATO, das heißt, sie melden die Einkommensdaten der Fahrer direkt an das ATO. Deine Liefereinnahmen sind für das ATO sichtbar, unabhängig davon, was du angibst - es gibt also keine Version, bei der Plattformeinkommen einfach unbemerkt bleibt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CAR EXPENSE METHODS ──────────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Zwei Wege, deine Autokosten abzusetzen
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '54ch' }}>
                Egal, ob ABN oder TFN auf dich zutrifft: Für dein Auto gelten in beiden Fällen dieselben zwei Methoden. Du kannst pro Auto und Jahr nur eine Methode verwenden.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <CompareTable label="Kilometerpauschale" rows={CAR_METHOD_ROWS} highlight />
              <CompareTable label="Fahrtenbuch-Methode" rows={LOGBOOK_ROWS} />
            </div>
            <p className="font-light mx-auto text-center" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.6, maxWidth: '60ch', marginTop: '18px' }}>
              Kommst du beim Liefern auf mehr als 5.000 arbeitsbezogene Kilometer im Jahr, deckt die Fahrtenbuch-Methode meist mehr deiner tatsächlichen Kosten ab - dafür musst du aber ein 12-wöchiges Fahrtenbuch führen und jede Tank-, Service- und Zulassungsquittung aufheben.
            </p>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">FAQ</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  Steuerfragen für Lieferfahrer
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
          heading="Weißt du, ob ABN oder TFN für dich gilt? Gut."
          body="Sobald dein Liefereinkommen und deine Ausgaben geklärt sind, ist der nächste Schritt deine Working Holiday Steuererklärung."
          cta="Weiter zur Steuererklärung →"
          href="/de/tax-return"
        />

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              Dies sind allgemeine Informationen, keine persönliche Steuerberatung. Ob du Contractor oder Angestellter bist und was du im Einzelnen absetzen kannst, hängt von den konkreten Umständen ab, wie du arbeitest. Wenn du deine Erklärung bei uns einreichst, gehen wir dein Liefereinkommen, deine Auto-, Fahrrad- oder Scooter-Kosten und deine ABN- oder TFN-Situation durch, damit du alles absetzt, worauf du Anspruch hast, und nichts, worauf nicht.
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
