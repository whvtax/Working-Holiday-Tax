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
// Diese Seite beantwortet die transaktionale Suche: jemand hat sich bereits
// entschieden und will wissen, was als Nächstes passiert. Die Startseite
// gehört der informationalen Seite ("warum nicht selbst machen"), deshalb
// wiederholt hier nichts ihren Hero, ihre drei Zahlen oder den myGov-Vergleich.
// Kein Preis im Titel, in der Beschreibung oder im Schema, und keine
// Behauptung, selbst ein registrierter Steuerberater zu sein.
export const metadata: Metadata = {
  // Das Root-Layout hängt " | Working Holiday Tax" an, deshalb ist der Titel
  // hier kurz genug, dass das Ganze in ein mobiles Suchergebnis passt.
  title: 'Steuererklärung Australien ohne myGov',
  description:
    'Pass und australisches Bankkonto, keine Payslips. Wir holen deine ATO-Daten, bereiten die Erklärung vor und reichen ein. Rückerstattung meist nach etwa 14 Werktagen.',
  keywords: [
    'Steuererklärung Australien machen lassen',
    'Steuererklärung Australien einreichen',
    'Steuererklärung Australien aus Deutschland',
    'Steuererklärung 417 Visum',
    'Steuererklärung 462 Visum',
    'Steuer zurück Australien nach Rückkehr',
    'Steuererklärung Australien ohne Payslip',
    'Income Statement ATO Working Holiday',
    'Steuererklärung Australien Vorjahre',
    'wie lange dauert Steuerrückerstattung Australien',
    'Steuererklärung Australien Ablauf',
    'Work and Travel Steuererklärung einreichen',
    'Backpacker Steuererklärung Australien',
    'Steuererklärung Australien Hilfe deutsch',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/tax-return`,
    languages: {
      'en-AU': `${SITE_URL}/tax-return`,
      de: `${SITE_URL}/de/tax-return`,
      ja: `${SITE_URL}/ja/tax-return`,
      'x-default': `${SITE_URL}/tax-return`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Steuererklärung für Working Holiday Maker in Australien einreichen lassen' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/tax-return`,
    siteName: 'Working Holiday Tax',
    title: 'Steuererklärung Australien ohne myGov (417 & 462)',
    description:
      'Deine Daten und wohin die Erstattung gehen soll. Wir lesen die ATO-Daten, bereiten die Erklärung vor, du unterschreibst, wir reichen ein. Rückerstattung meist nach etwa 14 Werktagen.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Steuererklärung Australien ohne myGov (417 & 462)',
    description: 'Pass, Bankdaten, keine Payslips. Du unterschreibst, wir reichen ein, Rückerstattung meist nach etwa 14 Werktagen.',
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

/** Alles, was du beisteuern musst. Drei Dinge, mehr nicht. */
const NEEDED = [
  {
    label: 'Dein Pass und dein Visum',
    body: 'Welcher Pass und welcher Subclass. Davon hängt alles Weitere ab, deshalb fragen wir zuerst.',
  },
  {
    label: 'Ein australisches Bankkonto',
    body: 'Das ATO zahlt Erstattungen nur auf ein australisches Konto. Ist deins schon zu, sag es gleich am Anfang.',
  },
  {
    label: 'Ungefähr wo und wann du gearbeitet hast',
    body: 'Ein Ort, die Art der Arbeit, grobe Monate. Wir gleichen alles mit den ATO-Daten ab und ergänzen den Rest.',
  },
]

/** Der Ablauf, in der Reihenfolge, in der er passiert, samt Wartezeiten. */
const SEQUENCE = [
  {
    n: '01',
    title: 'Du schreibst uns',
    body: 'WhatsApp, auf Deutsch, Englisch oder Japanisch. Du erzählst grob, wie das Jahr aussah, wir sagen dir, wo du stehst, und das Honorar wird vereinbart, bevor irgendetwas beginnt.',
  },
  {
    n: '02',
    title: 'Ein Fragebogen, etwa zehn Minuten',
    body: 'Pass- und Visumsdaten, Bankdaten, die Orte und die Art der Arbeit. Es ist das einzige Formular, das du ausfüllst, und du füllst es genau einmal aus. Was auf dein Jahr nicht passt, lässt du offen, dann fragen wir nach.',
  },
  {
    n: '03',
    title: 'Wir öffnen deine ATO-Daten',
    body: 'Jeder Arbeitgeber, der dich gemeldet hat, jedes Income Statement, jeder einbehaltene Dollar und jedes frühere Jahr, das noch offen liegt. Vergessene Jobs und Wochen zum Höchstsatz tauchen fast immer hier auf und nicht in der Erinnerung.',
  },
  {
    n: '04',
    title: 'Die Beurteilungen, die den Betrag bewegen',
    body: 'Der steuerliche Wohnsitz für das Jahr, die Wochen vor dem Eingang deiner TFN, ob die Medicare Levy überhaupt deine war, und was deine Art von Arbeit absetzen darf. Das ist der langsame Teil, und genau dafür bezahlst du.',
  },
  {
    n: '05',
    title: 'Du liest und unterschreibst',
    body: 'Du bekommst die fertige Erklärung, jede Zahl in normaler Sprache erklärt, und nichts geht ans ATO, bevor du gelesen und die Erklärung unterschrieben hast. Unterschrieben wird elektronisch, das funktioniert auch vom Handy auf der anderen Erdhalbkugel.',
  },
  {
    n: '06',
    title: 'Es wird eingereicht',
    body: 'Geprüft und freigegeben von einem registrierten Steuerberater, bevor sie beim ATO eingereicht wird. Das Einreichen selbst dauert Minuten, und du musst dafür nicht wach sein.',
  },
  {
    n: '07',
    title: 'Das ATO zahlt aus',
    body: 'Rückerstattungen kommen meist etwa 14 Werktage nach der Einreichung an, direkt auf das australische Konto, das du uns genannt hast. Fragt das ATO vorher nach, beantworten wir das und sagen dir, worum es ging. Du hörst so oder so von uns.',
  },
]

/** Zwei Regeln, die die Reihenfolge ändern, deshalb stehen sie vor Schritt 01. */
const RULES = [
  {
    label: 'Die Rückerstattung geht nur auf ein australisches Konto',
    body: 'Die Super-Auszahlung (DASP) kann auf ein Konto im Ausland gehen. Eine Steuerrückerstattung nicht. Wenn du dein australisches Konto schließen willst, warte, bis die Rückerstattung da ist, oder sag uns vorher Bescheid.',
  },
  {
    label: 'Frühere Jahre kannst du dir noch holen',
    body: 'Ein Steuerjahr, für das du nie eingereicht hast, verschwindet nicht von allein. Jedes Jahr ist eine eigene Erklärung und eine eigene Rückerstattung, und wir arbeiten sie vom ältesten an ab, damit nichts halb fertig liegen bleibt.',
  },
]

const FAQS = [
  {
    question: 'Wie lange dauert eine Steuererklärung für Working Holiday Maker?',
    answer:
      'Ab dem Tag, an dem dein Fragebogen da ist, brauchen Vorbereitung und Prüfung bei einem unkomplizierten Jahr wenige Tage, und das ATO zahlt die Rückerstattung meist etwa 14 Werktage nach der Einreichung aus. Fünf Arbeitgeber, über eine ABN abgerechnetes Einkommen oder ein Wohnsitz, der begründet werden muss, dauern bei uns länger. Wir sagen dir, welcher Fall deiner ist, statt dich raten zu lassen.',
  },
  {
    question: 'Braucht ihr meine Payslips?',
    answer:
      'Nein. Jeder Arbeitgeber, der dich über eine Lohnabrechnung bezahlt hat, hat dem ATO ein Income Statement gemeldet, und daraus entsteht die Erklärung. Verlorene Abrechnungen und ein Arbeitgeber, den es nicht mehr gibt, sind normale Ausgangspunkte. Das Einzige, wonach sich Suchen lohnt, sind Belege für berufliche Ausgaben. Gibt es die nicht, beschreib uns die Arbeit, und wir sagen dir, was auch ohne Belege absetzbar ist.',
  },
  {
    question: 'Was muss ich selbst tun?',
    answer:
      'Drei Dinge. Den Fragebogen einmal ausfüllen, die fertige Erklärung lesen und sie unterschreiben. Du legst kein Behördenkonto an, bestehst keine australische Identitätsprüfung und musst kein ATO-Formular deuten, weil die Einreichung über uns läuft.',
  },
  {
    question: 'Geht das auch, wenn ich Australien schon verlassen habe?',
    answer:
      'Ja, und ein großer Teil der Erklärungen, die wir einreichen, gehört Leuten, die schon wieder in Deutschland, Österreich oder der Schweiz sind. Fragebogen, Unterschrift und Einreichung laufen komplett online. Das Einzige, was nicht mitreist, ist die Rückerstattung selbst: Das ATO kann sie nur auf ein australisches Bankkonto auszahlen, die Super-Rückerstattung (DASP) dagegen auch ins Ausland. Wenn dein australisches Konto schon geschlossen ist, schreib es uns in der ersten Nachricht.',
  },
  {
    question: 'Was ist, wenn ich für ein früheres Jahr nie eingereicht habe?',
    answer:
      'Das lässt sich jetzt noch nachholen. Jedes Steuerjahr steht für sich, mit eigener Erklärung und eigener Rückerstattung, und an den ATO-Daten sehen wir, welche Jahre noch offen sind. Eine späte Erklärung ist in der Regel unproblematisch, sobald sie eingereicht ist, und in den meisten Working-Holiday-Jahren steht am Ende Geld für dich und nicht gegen dich.',
  },
  {
    question: 'Was passiert, wenn am Ende eine Nachzahlung steht?',
    answer:
      'Das kommt vor, meistens dann, wenn Einkommen über eine ABN abgerechnet wurde und unterwegs nichts einbehalten worden ist. Du siehst diesen Betrag, bevor irgendetwas eingereicht wird, zusammen mit der Erklärung, wo er herkommt und welche Zahlungswege das ATO anbietet. Ohne deine Unterschrift geht nichts raus, du erfährst es also nicht erst hinterher.',
  },
]

const GUIDES = [
  {
    href: '/de/blog/how-to-lodge-tax-return-from-overseas',
    title: 'Einreichen nach der Rückkehr',
    desc: 'Was aus Deutschland weiter funktioniert, und die Kontoregel, die viele übersieht.',
  },
  {
    href: '/de/blog/tax-residency-working-holiday-makers',
    title: 'Bist du steuerlich ansässig',
    desc: 'Die Beurteilung hinter Schritt 04, ausführlich erklärt.',
  },
  {
    href: '/de/blog/tax-deductions-working-holiday-makers',
    title: 'Was du absetzen kannst',
    desc: 'Abzüge nach Art der Arbeit, statt einer allgemeinen Liste.',
  },
]

const WA_TR = waUrl({ topic: 'tax-return', lang: 'de' })

// ─── SHARED INLINE STYLES ───────────────────────────────────────────────
const KICKER: CSSProperties = { fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }
const BODY: CSSProperties = { fontSize: '15px', lineHeight: 1.58 }
const LEDE: CSSProperties = { fontSize: '16.5px', lineHeight: 1.62 }

export default function TaxReturnPageDE() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/de/tax-return#webpage`,
    url: `${SITE_URL}/de/tax-return`,
    name: 'Steuererklärung Australien machen lassen',
    description:
      'Wie eine australische Steuererklärung mit 417- oder 462-Visum eingereicht wird: was wir von dir brauchen, was wir prüfen, wie du unterschreibst und wann die Rückerstattung kommt.',
    inLanguage: 'de',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/de/tax-return#service`,
    name: 'Steuererklärung für Working Holiday Maker einreichen',
    serviceType: 'Steuererklärung Vorbereitung und Einreichung',
    description:
      'Australische Steuererklärungen für Inhaber von 417- und 462-Visa. Geprüft und freigegeben von einem registrierten Steuerberater, bevor sie beim ATO eingereicht wird, auch aus dem Ausland.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australien' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 und 462)' },
    availableLanguage: ['de', 'en', 'ja'],
    inLanguage: 'de',
  }

  // Die sieben Schritte, maschinenlesbar. Das ist der eigene Schematyp dieser
  // Seite: die Startseite beansprucht kein HowTo.
  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}/de/tax-return#howto`,
    name: 'Wie eine Steuererklärung für Working Holiday Maker eingereicht wird',
    description:
      'Die Reihenfolge, in der eine Steuererklärung mit 417- oder 462-Visum vorbereitet und eingereicht wird, von der ersten Nachricht bis zur Rückerstattung.',
    inLanguage: 'de',
    totalTime: 'P14D',
    step: SEQUENCE.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
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
      { '@type': 'ListItem', position: 2, name: 'Steuererklärung', item: `${SITE_URL}/de/tax-return` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F2FAF7 100%)' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 pt-8 pb-11 lg:pt-12 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2" style={{ fontSize: '13px', color: '#4C6459', marginBottom: '10px' }}>
            <Link href="/de" className="inline-flex items-center transition-colors hover:text-forest-500" style={{ minHeight: '44px' }}>Startseite</Link>
            <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>
            <span aria-current="page">Steuererklärung</span>
          </nav>

          <p className="hero-animate" style={{ ...KICKER, color: '#16775C', marginBottom: '14px' }}>
            Working Holiday Visum 417 &amp; 462
          </p>

          <h1 className="font-serif font-black text-ink hero-animate"
            style={{ fontSize: 'clamp(27px, 4.6vw, 41px)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            <span style={{ display: 'block' }}>Deine Daten und wohin die Erstattung gehen soll.{' '}</span>
            <span style={{ display: 'block', color: '#0B5240' }}>Den Rest übernehmen wir.{' '}</span>
          </h1>

          <p className="hero-lede hero-animate-delay" style={{ ...LEDE, color: '#4C6459', maxWidth: '52ch', marginBottom: '26px' }}>
            Keine Payslips, kein myGov-Konto, kein Formular zum Entziffern. Ein Fragebogen, eine Unterschrift,
            und die Rückerstattung kommt meist etwa 14 Werktage nach der Einreichung.
          </p>

          <div className="hero-animate-delay-2">
            <WaLink href={WA_TR} position="hero" topic="tax-return" lang="de"
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

      {/* ── 2. WAS WIR VON DIR BRAUCHEN ──────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Dein Teil</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '22ch', marginBottom: '12px' }}>
            Was wir von dir brauchen
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '30px' }}>
            Drei Dinge, und das ist die ganze Liste. Die meisten erwarten, erst einen Ordner zusammenstellen zu müssen.
            Der Ordner war nie das, was hier gefehlt hat.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {NEEDED.map((item) => (
              <div key={item.label} style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15.5px', lineHeight: 1.35, marginBottom: '8px' }}>{item.label}</h3>
                <p style={{ ...BODY, color: '#2A3C34' }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[14px]" style={{ marginTop: '26px', padding: '20px 22px', background: '#F2FAF7', border: '1px solid #CDE3DB' }}>
            <p className="font-serif" style={{ fontSize: '19px', lineHeight: 1.45, color: '#0B5240', fontWeight: 700, marginBottom: '10px', maxWidth: '32ch' }}>
              Payslips brauchst du keine.
            </p>
            <p style={{ ...BODY, color: '#2A3C34', maxWidth: '62ch' }}>
              Jeder Arbeitgeber, der dich auf eine Lohnabrechnung gesetzt hat, hat längst ein Income Statement zu deiner
              TFN gemeldet, und daraus entsteht die Erklärung. Über das ATO ist das für uns alles sichtbar. Ein
              Schuhkarton voller Papier, ein verlorenes Handy, ein Hosteljob, dessen Namen du nie richtig gelernt hast:
              nichts davon hält irgendetwas auf. Belege für berufliche Ausgaben sind das Einzige, wonach sich Suchen
              lohnt, und wenn es keine gibt, beschreib uns stattdessen die Arbeit.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. DER ABLAUF ────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Von Anfang bis Ende</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            In welcher Reihenfolge das läuft
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '30px' }}>
            Sieben Schritte. Du kommst in zweien davon vor, am Anfang und noch einmal zum Unterschreiben. Alles
            dazwischen ist unsere Sache, und du kannst in der Zwischenzeit wieder deinem Leben nachgehen.
          </p>

          <ol className="flex flex-col" style={{ gap: '22px' }}>
            {SEQUENCE.map((s) => (
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

          <p style={{ ...BODY, color: '#4C6459', marginTop: '24px', maxWidth: '60ch' }}>
            Mehr zu Schritt 04:{' '}
            <Link href="/de/abn" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>was eine ABN ändert</Link>, falls ein Teil deines Einkommens abgerechnet statt ausgezahlt wurde.
          </p>
        </div>
      </section>

      {/* ── 4. ZWEI REGELN VORAB ─────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '24ch', marginBottom: '14px' }}>
            Zwei Regeln ändern die Reihenfolge
          </h2>
          <p style={{ ...LEDE, color: '#4C6459', maxWidth: '54ch', marginBottom: '26px' }}>
            Beide sind am Anfang leichter zu lösen als auf halber Strecke.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {RULES.map((r) => (
              <div key={r.label} className="rounded-[14px]" style={{ padding: '20px 22px', border: '1px solid #E2EFE9', background: '#FFFFFF', boxShadow: '0 1px 2px rgba(7,58,45,.06)' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15.5px', lineHeight: 1.35, marginBottom: '8px' }}>{r.label}</h3>
                <p style={{ ...BODY, color: '#2A3C34' }}>{r.body}</p>
              </div>
            ))}
          </div>
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
            Von dem, was das ATO überweist, wird nie etwas abgezogen. Der Betrag wird vor Schritt 01 auf WhatsApp mit dir
            geklärt, sodass es beim Fragebogen nichts mehr zu verhandeln gibt.
          </p>
        </div>
      </section>

      {/* ── 6. CTA ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 reveal">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '14px' }}>
            Fang mit einer Nachricht an, nicht mit einem Formular
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '56ch', marginBottom: '24px' }}>
            Schick uns die Orte, in denen du gearbeitet hast, ungefähr welche Monate, und ob du je über eine ABN
            abgerechnet hast. Daraus sagen wir dir, welche Jahre noch offen sind und wie dein Teil der Arbeit aussieht.
            Ob du vor zwei Jahren heimgeflogen bist, spielt keine Rolle.
          </p>
          <WaLink href={WA_TR} position="section" topic="tax-return" lang="de"
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
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Working-Holiday-Steuer ist das Einzige, was wir machen.
          </h2>
          <p className="text-center mx-auto" style={{ ...BODY, color: '#2A3C34', maxWidth: '58ch', marginBottom: '28px' }}>
            Der Fragebogen, die Prüfungen und die Reihenfolge oben sind um ein einziges Visumsjahr herum gebaut. Deshalb
            wird dir so wenig abverlangt, und deshalb sind die unangenehmen Fälle für uns keine Überraschung. Vorbereitet
            von unserem Team, geprüft und freigegeben von einem registrierten Steuerberater, bevor sie beim ATO
            eingereicht wird.
          </p>

          <GoogleReviews lang="de" />

          <div className="rounded-[12px] flex gap-3" style={{ marginTop: '28px', padding: '16px 18px', background: '#FDF0D5', border: '1px solid #F9D88A' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '1px' }}>
              <path d="M12 2L2 22h20L12 2z" stroke="#B8770C" strokeWidth="1.8" strokeLinejoin="round" />
              <line x1="12" y1="10" x2="12" y2="15" stroke="#B8770C" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="12" y1="18" x2="12.01" y2="18" stroke="#B8770C" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p style={{ ...BODY, color: '#2A3C34' }}>
              <strong style={{ color: '#080F0D' }}>Niemand Seriöses fragt dich nach deinem myGov-Passwort.</strong>{' '}
              Wir fragen in keinem Schritt danach, weil der Weg oben es nicht braucht. Wenn dich eine Nachricht danach
              fragt, kommt sie nicht von uns.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Was gefragt wird, bevor jemand etwas schickt
          </h2>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="tax-return-faq-de" className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="contact-faq-answer" style={{ fontSize: '15px' }}>{f.answer}</p>
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
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Die lange Fassung der schwierigen Schritte
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '24px' }}>
            Wenn du die Begründung lieber siehst, bevor du etwas aus der Hand gibst, steht sie vollständig da.
          </p>

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
        heading="Lass deine Super nicht liegen"
        body="Dein Arbeitgeber hat zusätzlich zum Lohn Superannuation für dich eingezahlt. Wenn du Australien endgültig verlässt, kannst du sie beantragen, und das ist ein eigener Vorgang neben der Erklärung."
        cta="Wie der Super-Antrag läuft →"
        href="/de/superannuation"
      />

      <MobileCta href={WA_TR} lang="de" topic="tax-return" />
    </>
  )
}
