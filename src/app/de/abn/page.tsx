import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/HomeWa'

// ─── METADATA ───────────────────────────────────────────────────────────
// Der frühere Titelzusatz behauptete, das Unternehmen sei selbst ein
// registrierter Steuerberater. Das ist entfernt. Kein Preis, und keine
// Formulierung, die die Registrierung für uns beansprucht.
export const metadata: Metadata = {
  // Das Root-Layout hängt " | Working Holiday Tax" an, deshalb ist der Titel
  // hier kurz genug, dass das Ganze in ein mobiles Suchergebnis passt.
  title: 'ABN im Working Holiday: was sie ändert',
  description:
    'Eine ABN ändert, was deine Steuererklärung sagen muss. Rechnungen ohne Steuerabzug, Betriebsausgaben, GST und die Frage nach der Selbstständigkeit.',
  keywords: [
    'ABN Registrierung Australien',
    'ABN Working Holiday',
    'ABN beantragen Australien',
    'Australian Business Number Backpacker',
    'Selbstständig Australien Working Holiday',
    'ABN für Freelancer',
    'ABN 417 Visum',
    'ABN 462 Visum',
    'ABN für Steuererklärung Australien',
    'ABN vs TFN Working Holiday',
    'brauche ich eine ABN Working Holiday',
    'Angestellter oder Selbstständiger Australien',
    'ABN Betriebsausgaben Working Holiday',
    'GST Grenze 75000 ABN',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/abn`,
    languages: {
      'en-AU': `${SITE_URL}/abn`,
      de: `${SITE_URL}/de/abn`,
      ja: `${SITE_URL}/ja/abn`,
      'x-default': `${SITE_URL}/abn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'ABN für Working Holiday Maker in Australien' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/abn`,
    siteName: 'Working Holiday Tax',
    title: 'ABN im Working Holiday: was sich dadurch ändert',
    description:
      'Eine ABN ändert nicht deinen Job. Sie ändert deine Steuererklärung. Rechnungen ohne Abzug, Betriebsausgaben, GST und die Frage der Selbstständigkeit.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'ABN im Working Holiday: was sich dadurch ändert',
    description: 'Eine ABN ändert nicht deinen Job. Sie ändert deine Steuererklärung.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── ICONS ──────────────────────────────────────────────────────────────
const IconWhatsApp = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.3-.9-2.8-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2 .9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
  </svg>
)

// ─── COPY ───────────────────────────────────────────────────────────────

const THE_SPLIT = [
  {
    n: '01',
    title: 'Es wurde nichts einbehalten, die Steuer bleibt trotzdem offen',
    body: 'Lohn kommt bei dir an, nachdem die Steuer schon abgezogen wurde. Rechnungen nicht, und die Steuer darauf wird einmal am Jahresende fällig. In einem gemischten Jahr sieht die Lohnhälfte nach Rückerstattung aus, die Rechnungshälfte nicht.',
  },
  {
    n: '02',
    title: 'Aus Werbungskosten werden Betriebsausgaben, mit anderen Regeln',
    body: 'Als Angestellter setzt du beruflich veranlasste Kosten ab. Als Selbstständiger ziehst du die Kosten des Betriebs ab, eine breitere Kategorie mit strengeren Nachweisen.',
  },
  {
    n: '03',
    title: 'GST ist eine Entscheidung, keine Formalie',
    body: 'Die meisten Working Holiday Maker erreichen die 75.000-$-Umsatzgrenze nie, also sollten die meisten nicht registriert sein. Rideshare ist die Ausnahme. Eine falsche Position bedeutet BAS-Pflichten, die du nicht gebraucht hättest, oder welche, die fehlen.',
  },
  {
    n: '04',
    title: 'Ob du überhaupt selbstständig warst',
    body: 'Diese Frage entscheidet über die anderen drei. Ob du wirklich selbstständig warst, hängt an der Kontrolle, nicht am Papier. Eine ABN über Arbeit, die immer Anstellung war, ist der häufigste Grund, warum eine Backpacker-Erklärung neu gemacht werden muss.',
  },
]

const WHAT_WE_DO = [
  {
    title: 'Wir prüfen vorher, ob du überhaupt eine brauchst',
    body: 'Viele registrieren eine ABN für einen Job, der immer ein Angestelltenverhältnis war. Das ist ein Gespräch, kein Formular.',
  },
  {
    title: 'Wir registrieren sie passend zu deiner Tätigkeit',
    body: 'Die angegebene Tätigkeit begleitet dich durch GST, Abzüge und die Erklärung.',
  },
  {
    title: 'Wir sagen dir, was du zurücklegen solltest',
    body: 'Ungefähr, was dich das Rechnungseinkommen zur Steuerzeit kostet, damit die Rechnung im Oktober keine Überraschung ist.',
  },
  {
    title: 'Wir sagen dir, was du aufheben musst',
    body: 'Welche Nachweise für deine Art von Arbeit einen Abzug tragen, und welche Belege du nicht mehr sammeln musst.',
  },
  {
    title: 'Wir treffen die GST-Entscheidung bewusst',
    body: 'Registriert, weil die Regeln es verlangen, oder nicht registriert, weil sie es nicht tun. Nie aus Versehen.',
  },
  {
    title: 'Wir bringen beide Hälften in eine Erklärung',
    body: 'Lohneinkommen und Rechnungseinkommen gehören in eine Erklärung für dasselbe Jahr.',
  },
]

// Antworten über etwa 55 Wörtern tragen eine Leerzeile, und die FAQ unten
// rendert einen <p> pro Absatz. faqLd nutzt weiter den Rohtext, das Schema
// bleibt also unverändert.
const FAQS = [
  {
    question: 'Kann ich das einfach selbst machen?',
    answer:
      'Kannst du, und wenn dein ganzes Jahr über die Lohnabrechnung lief, ist es unkompliziert.\n\nGenau damit macht eine ABN Schluss: wo die Grenze zwischen Lohn und Rechnungseinkommen verläuft, ob du überhaupt selbstständig warst, welche Kosten vom Rechnungseinkommen abgehen, und ob du dich für GST registrieren musstest. Das sind Beurteilungen zu deinem Jahr, keine Felder zum Ausfüllen.',
  },
  {
    question: 'Wie verändert eine ABN meine Steuererklärung?',
    answer:
      'Lohn erreicht dich mit bereits einbehaltener Steuer und einem Income Statement, das dein Arbeitgeber ans ATO meldet, deshalb gleicht sich diese Hälfte weitgehend von selbst ab.\n\nEinkommen, das du über eine ABN in Rechnung stellst, kommt unversteuert an, wird als Betriebseinnahme erklärt und nur um Kosten gemindert, die du belegen kannst. Dazu kommen die GST-Frage und die Frage, ob das wirklich Selbstständigkeit war. Beide Hälften landen in einer Erklärung.',
  },
  {
    question: 'Mein Arbeitgeber verlangt eine ABN für einen normalen Schichtjob. Ist das korrekt?',
    answer:
      'Meistens nicht, und es lohnt sich, das vor der Registrierung anzusprechen. Wenn er deinen Dienstplan macht, dir sagt, wie die Arbeit abläuft, das Werkzeug stellt und dich früher nach Hause schicken kann, wirst du wie ein Angestellter behandelt, egal was auf dem Papier steht.\n\nEine ABN verschiebt die Kosten auf dich: kein Steuerabzug, keine Superannuation, kein Unfallversicherungsschutz, kein Mindestlohn und keine Zuschläge. Schick uns die Jobdetails, bevor du etwas zusagst.',
  },
  {
    question: 'Muss ich mich mit Working Holiday Visum für GST registrieren?',
    answer:
      'Nur wenn dein Umsatz 75.000 $ im Jahr erreicht, was die meisten Working Holiday Maker nicht annähernd tun, oder wenn du Rideshare fährst. Wer Taxi- oder Fahrdienstleistungen anbietet, Uber eingeschlossen, muss sich ab der ersten Fahrt für GST registrieren, egal wie wenig dabei verdient wird.\n\nFür Essenslieferungen und Kurierfahrten gilt diese Regel nicht, dort greift die Grenze von 75.000 $. Mit der Registrierung kommen vierteljährliche Business Activity Statements.',
  },
  {
    question: 'Kann ich sowohl eine TFN als auch eine ABN haben?',
    answer:
      'Ja, und die meisten Working Holiday Maker, die selbstständig arbeiten, haben am Ende beides. Die Steuernummer deckt dich als Angestellten ab, die ABN als Selbstständigen.\n\nEs sind aber nicht zwei Erklärungen: Eine Erklärung deckt das Steuerjahr ab und meldet beides. Die Steuernummer brauchst du zuerst, weil der ABN-Antrag damit abgeglichen wird.',
  },
  {
    question: 'Was kann ich mit einer ABN als Betriebsausgabe absetzen?',
    answer:
      'Die Kosten der Einkommenserzielung, ehrlich aufgeteilt, wenn etwas auch privat genutzt wird.\n\nBei einem Lieferfahrer sind das meist ordentlich erfasste Kilometer, die laufenden Kosten für Rad oder Auto, Handy und Daten, Versicherung, Ausrüstung und die Provision, die eine Plattform einbehalten hat. Bei einem Subunternehmer auf dem Bau sind es Werkzeug, Schutzausrüstung und Fahrten zwischen Einsatzorten.\n\nNie dazu gehören der Flug nach Australien, der normale Weg von zu Hause zu einem Arbeitsort und alles, wofür du keinen Nachweis hast.',
  },
  {
    question: 'Was passiert mit meiner ABN, wenn ich Australien verlasse?',
    answer:
      'Du meldest sie ab, sobald du nicht mehr tätig bist, denn eine aktive ABN sagt dem ATO, dass du weiter ein Gewerbe betreibst und möglicherweise weiter Pflichten hast.\n\nDie Abmeldung ändert nichts an der Erklärung für das Jahr, in dem du gearbeitet hast, die trotzdem eingereicht werden muss, und nichts an deinem Anspruch auf Superannuation aus Anstellungen im selben Zeitraum. Steht dein Abflug bald an, sag früh Bescheid, denn die Reihenfolge aus Abmelden, Einreichen und Super beantragen ist wichtig.',
  },
]

const GUIDES = [
  {
    href: '/de/blog/employee-vs-contractor-australia',
    title: 'Angestellter oder Selbstständiger',
    desc: 'Der Test, den das ATO wirklich anlegt, und was die falsche Seite kostet.',
  },
  {
    href: '/de/blog/abn-deductions-business-expenses',
    title: 'Betriebsausgaben mit ABN',
    desc: 'Was ein Selbstständiger absetzen kann, nach Art der Arbeit, samt Nachweisen.',
  },
  {
    href: '/de/blog/gst-and-abn-for-working-holiday-makers',
    title: 'GST und deine ABN',
    desc: 'Die 75.000-$-Grenze, die Rideshare-Ausnahme und was die Registrierung bedeutet.',
  },
]

// Die myGov-Vergleichstabelle, die hier stand, ist entfernt: Ihre vier Zeilen
// waren noch einmal die vier Punkte von THE_SPLIT und von WHAT_WE_DO, und die
// Zeile zur Selbstständigkeit hat einen eigenen Abschnitt. Das "Du wirst dich
// nie bei myGov einloggen"-Versprechen ist ans Ende von WHAT_WE_DO gerückt.

const WA_ABN = waUrl({ topic: 'abn', lang: 'de' })

// ─── SHARED INLINE STYLES ───────────────────────────────────────────────
const KICKER: CSSProperties = { fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }
const BODY: CSSProperties = { fontSize: '15px', lineHeight: 1.58 }
const LEDE: CSSProperties = { fontSize: '16.5px', lineHeight: 1.62 }

export default function ABNPageDE() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/de/abn#webpage`,
    url: `${SITE_URL}/de/abn`,
    name: 'ABN im Working Holiday',
    description:
      'Was eine ABN an der australischen Steuererklärung eines Working Holiday Makers ändert: unversteuertes Rechnungseinkommen, Betriebsausgaben, die GST-Frage und Angestellter oder Selbstständiger.',
    inLanguage: 'de',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/de/abn#service`,
    name: 'ABN-Registrierung für Working Holiday Maker',
    serviceType: 'Australian Business Number Registrierung',
    description:
      'ABN-Registrierung für Inhaber von 417- und 462-Visa mit echter selbstständiger Tätigkeit, inklusive GST-Entscheidung, Nachweisen und steuerlichen Folgen vor der Registrierung.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australien' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 und 462) als Selbstständige' },
    availableLanguage: ['de', 'en', 'ja'],
    inLanguage: 'de',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'de',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
      { '@type': 'ListItem', position: 2, name: 'ABN', item: `${SITE_URL}/de/abn` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F2FAF7 100%)' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 pt-8 pb-11 lg:pt-12 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2" style={{ fontSize: '13px', color: '#4C6459', marginBottom: '10px' }}>
            <Link href="/de" className="inline-flex items-center transition-colors hover:text-forest-500" style={{ minHeight: '44px' }}>Startseite</Link>
            <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>
            <span aria-current="page">ABN</span>
          </nav>

          <p className="hero-animate" style={{ ...KICKER, color: '#16775C', marginBottom: '14px' }}>
            Working Holiday Visum 417 &amp; 462
          </p>

          <h1 className="font-serif font-black text-ink hero-animate"
            style={{ fontSize: 'clamp(28px, 4.8vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            <span style={{ display: 'block' }}>Eine ABN ändert nicht deinen Job.{' '}</span>
            <span style={{ display: 'block', color: '#0B5240' }}>Sie ändert deine Steuererklärung.{' '}</span>
          </h1>

          <p className="hero-lede hero-animate-delay" style={{ ...LEDE, color: '#4C6459', maxWidth: '50ch', marginBottom: '26px' }}>
            Unversteuertes Einkommen, Betriebsausgaben, eine GST-Entscheidung, und unter allen dreien eine Frage: warst
            du überhaupt selbstständig.
          </p>

          <div className="hero-animate-delay-2">
            <WaLink href={WA_ABN} position="hero" topic="abn" lang="de"
              className="btn-primary inline-flex items-center justify-center gap-2"
              style={{ height: '54px', padding: '0 30px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '340px', width: '100%' }}>
              <IconWhatsApp />
              Schreib uns auf WhatsApp
            </WaLink>
            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
              Antwort in etwa einer Stunde.
            </p>
          </div>

          <div className="flex" style={{ marginTop: '20px' }}>
            <GoogleRating variant="pill" lang="de" />
          </div>
        </div>
      </section>

      {/* ── 2. DIE AUFTEILUNG ────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Die Aufteilung</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '24ch', marginBottom: '16px' }}>
            Was ändert sich mit einer ABN an deiner Erklärung?
          </h2>
          {/* "Eine Erklärung muss beide Hälften abgleichen" sagt die letzte
              Karte im Abschnitt darunter und noch einmal der NextStep am Fuß. */}
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '60ch', marginBottom: '30px' }}>
            Vier Dinge, und sie verstärken sich gegenseitig.
          </p>

          <ol className="flex flex-col" style={{ gap: '22px' }}>
            {THE_SPLIT.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="font-serif font-black flex-shrink-0"
                  style={{ fontSize: '15px', color: '#16775C', width: '28px', paddingTop: '2px' }}
                  aria-hidden="true">{s.n}</span>
                <div>
                  <h3 className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.35, marginBottom: '6px' }}>{s.title}</h3>
                  <p style={{ ...BODY, color: '#2A3C34' }}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 3. DIE WARNUNG ───────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '26ch', marginBottom: '16px' }}>
            Solltest du eine ABN anmelden, weil ein Arbeitgeber danach fragt?
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '60ch', marginBottom: '16px' }}>
            Nicht, bevor jemand den Job angesehen hat. Eine ABN über Arbeit, die in Wahrheit Anstellung ist, beendet
            deine Superannuation und den Steuerabzug, streicht den Unfallversicherungsschutz und stellt dich außerhalb
            von Mindestlohn und Zuschlägen. All das wird zu deinen Kosten. Häufig ist das in der Farmarbeit, der
            Gastronomie, der Reinigung und auf dem Bau.
          </p>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '60ch', marginBottom: '22px' }}>
            Entscheidend ist die Kontrolle, nicht das Papier. Wer bestimmt, wann du arbeitest, wer sagt, wie es gemacht
            wird, wer die Ausrüstung stellt, und wer das Risiko trägt, wenn es schiefgeht. Zeigen die Antworten auf ihn,
            ist eine ABN das falsche Mittel.
          </p>

          <div className="rounded-[12px] flex gap-3" style={{ padding: '16px 18px', background: '#FDF0D5', border: '1px solid #F9D88A' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '1px' }}>
              <path d="M12 2L2 22h20L12 2z" stroke="#B8770C" strokeWidth="1.8" strokeLinejoin="round" />
              <line x1="12" y1="10" x2="12" y2="15" stroke="#B8770C" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="12" y1="18" x2="12.01" y2="18" stroke="#B8770C" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p style={{ ...BODY, color: '#2A3C34' }}>
              <strong style={{ color: '#080F0D' }}>Schick uns den Job, bevor du dich registrierst.</strong>{' '}
              Was die Arbeit umfasst, wer was stellt, und wie du bezahlt werden sollst. Wir sagen dir, was davon es ist.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. WAS WIR MACHEN ────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Die Arbeit</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Was wir dabei machen
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '26px' }}>
            Die Registrierung selbst ist kostenlos und dauert Minuten. Alles, was darüber entscheidet, was sie dich
            kostet, passiert davor und danach.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {WHAT_WE_DO.map((c) => (
              <div key={c.title} className="rounded-[12px]" style={{ padding: '16px 18px', background: '#F5F9F7', border: '1px solid #E2EFE9' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.35, marginBottom: '6px' }}>{c.title}</h3>
                <p style={{ ...BODY, color: '#2A3C34' }}>{c.body}</p>
              </div>
            ))}
          </div>

          <p className="font-serif" style={{ fontSize: '18px', lineHeight: 1.45, color: '#0B5240', marginTop: '22px', maxWidth: '48ch', fontWeight: 700 }}>
            Du wirst dich nie bei myGov einloggen, keinen Ausweis verknüpfen und nicht herausfinden müssen, welches
            Formular welches ist. Wir regeln das direkt mit dem ATO.
          </p>

          <p style={{ ...BODY, color: '#4C6459', marginTop: '18px', maxWidth: '60ch' }}>
            Noch keine ABN und auch keine Steuernummer? Die{' '}
            <Link href="/de/tfn" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>TFN kommt zuerst</Link>, weil der
            ABN-Antrag damit abgeglichen wird.
          </p>
        </div>
      </section>

      {/* ── 5. GARANTIE ──────────────────────────────────────────────────── */}
      <section className="py-11 lg:py-14" style={{ background: '#0B5240' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 text-center reveal">
          <p style={{ ...KICKER, color: '#F9D88A', marginBottom: '14px' }}>Unsere Garantie</p>
          <p className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(22px, 3vw, 30px)', lineHeight: 1.26, letterSpacing: '-0.02em', maxWidth: '24ch' }}>
            Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz, du zahlst also nie drauf.
          </p>
          <p className="mx-auto" style={{ ...BODY, color: 'rgba(255,255,255,0.72)', maxWidth: '52ch', marginTop: '16px' }}>
            Das Honorar ist pauschal und niemals ein Prozentsatz von dem, was zurückkommt.
          </p>
        </div>
      </section>

      {/* ── 6. CTA ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 reveal">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Beschreib uns die Arbeit
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '56ch', marginBottom: '24px' }}>
            Wem du Rechnungen schreiben würdest, was du dabei machst, und wer die Ausrüstung stellt. Das reicht uns, um
            dir zu sagen, ob eine ABN hier überhaupt hingehört.
          </p>
          <WaLink href={waUrl({ topic: 'abn', lang: 'de', tier: 'tfn-abn' })} position="section" topic="abn" lang="de" tier="tfn-abn"
            className="btn-primary inline-flex items-center justify-center gap-2"
            style={{ height: '54px', padding: '0 30px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '340px', width: '100%' }}>
            <IconWhatsApp />
            Schreib uns auf WhatsApp
          </WaLink>
          <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
            Antwort in etwa einer Stunde.
          </p>
        </div>
      </section>

      {/* ── 7. VERTRAUEN ─────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">
          <h2 className="font-serif font-black text-ink text-center"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Working-Holiday-Steuer ist das Einzige, was wir machen.
          </h2>
          <p className="text-center mx-auto" style={{ ...BODY, color: '#2A3C34', maxWidth: '58ch', marginBottom: '28px' }}>
            Deshalb sehen wir dieselben ABN-Konstruktionen immer wieder: der Farmvertrag, die Lieferplattform, die
            Baustelle, die alle als Subunternehmer bezahlt.
          </p>
          <GoogleReviews lang="de" />
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Fragen zur ABN, bevor du schreibst
          </h2>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="abn-faq-de" className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                {/* An einer Leerzeile getrennt, damit eine lange Antwort als
                    zwei kurze Absätze ankommt. faqLd oben nutzt weiter den
                    Rohtext. */}
                {f.answer.split('\n\n').map((para, j) => (
                  <p key={j} className="contact-faq-answer" style={{ fontSize: '15px' }}>{para}</p>
                ))}
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. RATGEBER ──────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">
          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Ratgeber</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Mehr zu Selbstständigkeit, Betriebsausgaben und GST
          </h2>
          {/* Die Lede nannte die drei Karten darunter. Das machen die Karten. */}

          <div className="grid gap-3 sm:grid-cols-3">
            {GUIDES.map((g) => (
              <Link key={g.href} href={g.href}
                className="group bg-white rounded-[12px] transition-all hover:shadow-lg"
                style={{ padding: '16px 18px', border: '1px solid #E2EFE9', display: 'block' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '4px' }}>{g.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#4C6459' }}>{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NextStep
        eyebrow="Was kommt als Nächstes"
        heading="Beide Hälften landen in einer Erklärung"
        body="Lohneinkommen und Rechnungseinkommen gehören in dieselbe Steuererklärung für dasselbe Jahr."
        cta="Wie die Erklärung läuft →"
        href="/de/tax-return"
      />

      <MobileCta href={WA_ABN} lang="de" topic="abn" />
    </>
  )
}
