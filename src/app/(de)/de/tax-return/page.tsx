import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { Steps, LinkRows, blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, PlainRows } from '@/components/wht/CoreBlocks'
import { Accordion } from '@/components/ui/Accordion'

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
    'Pass und australisches Bankkonto, keine Payslips. Wir holen deine ATO-Daten, bereiten die Erklärung vor und reichen ein. Erstattung meist etwa 14 Werktage danach.',
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
      ...newLocaleLanguages('/tax-return'),
      'x-default': `${SITE_URL}/tax-return`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tax-return.png`, width: 1200, height: 630, alt: 'Steuererklärung für Working Holiday Maker in Australien einreichen lassen' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/tax-return`,
    siteName: 'Working Holiday Tax',
    title: 'Steuererklärung Australien ohne myGov (417 & 462)',
    description:
      'Deine Daten und wohin die Erstattung gehen soll. Wir lesen die ATO-Daten, bereiten die Erklärung vor, du unterschreibst, wir reichen ein. Eine Erstattung zahlt das ATO meist etwa 14 Werktage danach aus.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tax-return.png`],
    card: 'summary_large_image',
    title: 'Steuererklärung Australien ohne myGov (417 & 462)',
    description: 'Pass, Bankdaten, keine Payslips. Du unterschreibst, wir reichen ein. Eine Erstattung zahlt das ATO meist nach etwa 14 Werktagen aus.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** Alles, was du beisteuern musst. Drei Dinge, mehr nicht. */
const NEEDED = [
  {
    label: 'Dein Pass und dein Visum',
    body: 'Welcher Pass und welcher Subclass.',
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
    body: 'WhatsApp, auf Deutsch, Englisch oder Japanisch. Du erzählst grob, wie das Jahr aussah, wir sagen dir, wo du stehst, und das Honorar wird vereinbart, bevor die Arbeit beginnt.',
  },
  {
    n: '02',
    title: 'Ein Fragebogen, etwa zehn Minuten',
    body: 'Pass- und Visumsdaten, Bankdaten, die Orte und die Art der Arbeit. Es ist das einzige Formular, das du ausfüllst. Was nicht passt, lässt du offen, dann fragen wir nach.',
  },
  {
    n: '03',
    title: 'Wir öffnen deine ATO-Daten',
    body: 'Jeder Arbeitgeber, der dich gemeldet hat, jedes Income Statement, jeder einbehaltene Dollar und jedes frühere Jahr, das noch offen liegt. Vergessene Jobs und Wochen zum Höchstsatz tauchen hier auf, nicht in der Erinnerung.',
  },
  {
    n: '04',
    title: 'Die Beurteilungen, die den Betrag bewegen',
    body: 'Der steuerliche Wohnsitz für das Jahr, die Wochen vor dem Eingang deiner TFN, ob die Medicare Levy überhaupt deine war, und was deine Art von Arbeit absetzen darf. Das ist der langsame Teil, und genau dafür bezahlst du.',
  },
  {
    n: '05',
    title: 'Du liest und unterschreibst',
    body: 'Du bekommst die fertige Erklärung, jede Zahl erklärt, und nichts geht ans ATO, bevor du gelesen und unterschrieben hast. Unterschrieben wird elektronisch, das geht auch vom Handy auf der anderen Erdhalbkugel.',
  },
  {
    n: '06',
    title: 'Es wird eingereicht',
    body: 'Die Erklärung wird von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird. Das Einreichen selbst dauert Minuten.',
  },
  {
    n: '07',
    title: 'Das ATO zahlt aus',
    body: 'Eine Erstattung zahlt das ATO meist etwa 14 Werktage nach der Einreichung aus, auf das australische Konto, das du uns genannt hast. Fragt das ATO nach, beantworten wir das und sagen dir, worum es ging.',
  },
]

/** Zwei Regeln, die die Reihenfolge ändern, deshalb stehen sie vor Schritt 01. */
/**
 * Where a working holiday refund comes from (Oct 2026). This page ranked around
 * 30 for "working holiday tax return" with nothing on it that explained why a
 * refund exists at all, which is the question the query carries. Every item is a
 * mechanism already stated elsewhere on the site; no amount is promised. The one
 * range sentence in the lede is the owner-approved wording.
 */
const REFUND_SOURCES = [
  {
    "label": "Wochen mit 45 %, bevor deine TFN da war",
    "body": "Liegt deinem Arbeitgeber weder deine TFN vor noch eine Erklärung, dass dein Antrag läuft, muss er 45 % statt 15 % einbehalten. Jede Lohnabrechnung in dieser Zeit war zu hoch besteuert, und das Geld kommt nur über eine eingereichte Erklärung zurück."
  },
  {
    "label": "Ein zweiter Job ohne eigene Erklärung",
    "body": "Jeder Arbeitgeber braucht seine eigene Tax File Number Declaration. Ein zweiter Job ohne sie behält 45 % ein, solange es niemand merkt, oft monatelang."
  },
  {
    "label": "Ein Arbeitgeber ohne Registrierung für Working Holiday Maker",
    "body": "Für Working Holiday Maker gelten besondere Sätze, wenn der Arbeitgeber beim ATO als Arbeitgeber von Working Holiday Makern registriert ist. War er es nicht, kann zu einem anderen Satz einbehalten worden sein. Ob das bei dir so war, sehen wir in deinen ATO-Daten."
  },
  {
    "label": "Eine Medicare Levy, die nie deine war",
    "body": "Die 2 % werden standardmäßig angesetzt. Ob sie bei dir überhaupt anfallen, hängt vom Einzelfall ab, und mit der richtigen Bescheinigung kann die Levy wegfallen."
  },
  {
    "label": "Arbeitskosten, die niemand angesetzt hat",
    "body": "Schuhe, Arbeitskleidung, Werkzeug, Lizenzen und Fahrten zwischen Einsatzorten können dein steuerpflichtiges Einkommen senken, wenn sie mit deiner Arbeit zusammenhängen. Wie viel das ausmacht, hängt vom Satz ab, der für dich gilt."
  },
  {
    "label": "Deine steuerliche Ansässigkeit",
    "body": "Je nach Verlauf deines Jahres kann ein Gerichtsurteil die geltenden Steuersätze verändern. Ob das bei dir der Fall ist, ist nichts, was du annehmen solltest, und das klären wir in unserer Prüfung."
  }
]

const RULES = [
  {
    label: 'Die Rückerstattung geht nur auf ein australisches Konto',
    body: 'Die Super-Auszahlung (DASP) kann auf ein Konto im Ausland gehen. Eine Steuerrückerstattung nicht. Willst du dein australisches Konto schließen, warte, bis die Rückerstattung da ist, oder sag uns vorher Bescheid.',
  },
  {
    label: 'Frühere Jahre kannst du noch nachreichen',
    body: 'Ein Steuerjahr, für das du nie eingereicht hast, verschwindet nicht von allein. Jedes Jahr ist eine eigene Erklärung und eine eigene Rückerstattung, und wir arbeiten sie der Reihe nach ab, das älteste zuerst.',
  },
]

// Antworten über etwa 55 Wörtern tragen eine Leerzeile, und die FAQ unten
// rendert einen <p> pro Absatz. faqLd nutzt weiter den Rohtext, das Schema
// bleibt also unverändert.
const FAQS = [
  {
    question: 'Wie lange dauert eine Steuererklärung für Working Holiday Maker?',
    answer:
      'Ab dem Tag, an dem dein Fragebogen da ist, brauchen Vorbereitung und Prüfung bei einem unkomplizierten Jahr wenige Tage, und eine Erstattung zahlt das ATO meist etwa 14 Werktage nach der Einreichung aus.\n\nFünf Arbeitgeber, über eine ABN abgerechnetes Einkommen oder ein Wohnsitz, der begründet werden muss, dauern bei uns länger. Wir sagen dir, welcher Fall deiner ist.',
  },
  {
    question: 'Bis wann muss die Steuererklärung eingereicht werden?',
    answer:
      'Wenn du selbst einreichst, bis zum 31. Oktober nach Ende des Steuerjahres. Eine Erklärung für 2025/26 war also am 31. Oktober 2026 fällig; die für 2026/27 ist am 31. Oktober 2027 fällig. Eine Erklärung nach Fristablauf ist verspätet, aber nicht verloren und kann weiterhin eingereicht werden.',
  },
  {
    question: 'Braucht ihr meine Payslips?',
    answer:
      'Nein. Jeder Arbeitgeber, der dich über eine Lohnabrechnung bezahlt hat, hat dem ATO ein Income Statement gemeldet, und daraus entsteht die Erklärung. Verlorene Abrechnungen und ein Arbeitgeber, den es nicht mehr gibt, sind normale Ausgangspunkte.\n\nSuchen lohnt sich nur nach Belegen für berufliche Ausgaben. Gibt es die nicht, beschreib uns die Arbeit, und wir sagen dir, was auch ohne Belege absetzbar ist.',
  },
  {
    question: 'Was muss ich selbst tun?',
    answer:
      'Drei Dinge. Den Fragebogen einmal ausfüllen, die fertige Erklärung lesen und sie unterschreiben. Du legst kein Behördenkonto an und musst kein ATO-Formular deuten, weil die Einreichung über uns läuft.',
  },
  {
    question: 'Geht das auch, wenn ich Australien schon verlassen habe?',
    answer:
      'Ja, und viele der Erklärungen, die wir einreichen, gehören Leuten, die schon wieder in Deutschland, Österreich oder der Schweiz sind. Fragebogen, Unterschrift und Einreichung laufen online.\n\nNur die Rückerstattung reist nicht mit: Das ATO kann sie nur auf ein australisches Bankkonto auszahlen, die Super-Rückerstattung (DASP) dagegen auch ins Ausland. Ist dein australisches Konto schon geschlossen, schreib es uns in der ersten Nachricht.',
  },
  {
    question: 'Was ist, wenn ich für ein früheres Jahr nie eingereicht habe?',
    answer:
      'Das lässt sich jetzt noch nachholen. Jedes Steuerjahr steht für sich, mit eigener Erklärung und eigener Rückerstattung, und an den ATO-Daten sehen wir, welche Jahre noch offen sind.\n\nOb am Ende eine Erstattung steht, entscheidet das ATO. Wir sagen dir vorher, womit du rechnen kannst.',
  },
  {
    question: 'Was passiert, wenn am Ende eine Nachzahlung steht?',
    answer:
      'Das kommt vor, meistens dann, wenn Einkommen über eine ABN abgerechnet wurde und unterwegs nichts einbehalten worden ist.\n\nDu siehst diesen Betrag, bevor irgendetwas eingereicht wird, zusammen mit der Erklärung, wo er herkommt und welche Zahlungswege das ATO anbietet. Ohne deine Unterschrift geht nichts raus.',
  },
]

const GUIDES = [
  {
    href: '/de/blog/how-to-lodge-tax-return-from-overseas',
    title: 'Einreichen nach der Rückkehr',
    desc: 'Was aus Deutschland weiter funktioniert, und die Kontoregel, die viele übersehen.',
  },
  {
    href: '/de/blog/tax-residency-working-holiday-makers',
    title: 'Bist du steuerlich ansässig',
    desc: 'Warum sich Schritt 04 nicht per Checkliste klären lässt.',
  },
  {
    href: '/de/blog/tax-deductions-working-holiday-makers',
    title: 'Was du absetzen kannst',
    desc: 'Abzüge nach Art der Arbeit, statt einer allgemeinen Liste.',
  },
]

const WA_TR = waUrl({ topic: 'tax-return', lang: 'de' })

export default function TaxReturnPageDE() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/de/tax-return#webpage`,
    url: `${SITE_URL}/de/tax-return`,
    name: 'Steuererklärung Australien machen lassen',
    description:
      'Wie eine australische Steuererklärung mit 417- oder 462-Visum eingereicht wird: was wir von dir brauchen, was wir prüfen, wie du unterschreibst und wann das ATO eine Erstattung auszahlt.',
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
      'Australische Steuererklärungen für Inhaber von 417- und 462-Visa. Von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird, auch aus dem Ausland.',
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
      'Die Reihenfolge, in der eine Steuererklärung mit 417- oder 462-Visum vorbereitet und eingereicht wird, von der ersten Nachricht bis zur Auszahlung einer Erstattung.',
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

      <div className={blocks.underHeader}>
        <Crumb home="Startseite" current="Steuererklärung" label="Breadcrumb" href="/de" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>Steuererklärung Australien&nbsp;&middot; Working Holiday Visum 417 &amp; 462</span>
              Deine Daten und wohin die Erstattung gehen soll. <Mark>Den Rest übernehmen wir.</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>Keine Payslips, kein myGov-Konto, kein Formular zum Entziffern. Ein Fragebogen, eine Unterschrift, und eine Erstattung zahlt das ATO meist etwa 14 Werktage nach der Einreichung aus.</Lead>
          </div>
          <WaButton href={WA_TR} position="hero" topic="tax-return" lang="de">Schreib uns auf WhatsApp</WaButton>
          <p className={heroStyles.note}>Antwort in etwa einer Stunde.</p>
          <GoogleRating variant="pill" lang="de" />
        </Hero>
      </div>

      <PhotoFrame page="tax-return" locale="de" />

      <Section tone="pale" eyebrow="Woher eine Erstattung kommt" title="Warum Working Holiday Maker oft eine Steuererstattung bekommen" titleId="refund-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Eine Erstattung ist keine Prämie fürs Backpacken. Sie ist die Lücke zwischen dem, was deine Arbeitgeber einbehalten haben, und dem, was du tatsächlich geschuldet hast, und in einem Working-Holiday-Jahr entsteht diese Lücke meist an den Stellen unten.</p>
        <div className={blocks.cards}>
          {REFUND_SOURCES.map((r) => (
            <div key={r.label} className={blocks.card}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Nichts davon passiert automatisch, und nichts wird einfach angenommen. Jeder Punkt wird vor der Einreichung mit deinem ATO-Datensatz abgeglichen.{' '}
          <Link href="/de/calculator" className={blocks.textLink}>Grobe Schätzung im Rechner ansehen</Link>.
        </p>
      </Section>

      <Section eyebrow="Dein Teil" title="Was wir von dir brauchen" titleId="needed-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Drei Dinge, und das ist die ganze Liste.</p>
        <PlainRows items={NEEDED} />
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>Payslips brauchst du keine.</p>
          <p className={blocks.text}>Jeder Arbeitgeber, der dich auf eine Lohnabrechnung gesetzt hat, hat längst ein Income Statement zu deiner TFN gemeldet, und daraus entsteht die Erklärung. Belege für berufliche Ausgaben sind das Einzige, wonach sich Suchen lohnt, und wenn es keine gibt, beschreib uns stattdessen die Arbeit.</p>
        </div>
      </Section>

      <Section id="how-it-works" tone="pale" eyebrow="Der Ablauf" title="In welcher Reihenfolge das läuft" titleId="sequence-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Sieben Schritte. Du kommst in zweien davon vor, am Anfang und noch einmal zum Unterschreiben.</p>
        <Steps items={SEQUENCE} />
        <p className={`${blocks.text} ${blocks.muted}`}>
          Mehr zu Schritt 04:{' '}
          <Link href="/de/abn" className={blocks.textLink}>was eine ABN ändert</Link>, falls ein Teil deines Einkommens abgerechnet statt ausgezahlt wurde.
        </p>
      </Section>

      <Section title="Zwei Regeln ändern die Reihenfolge" titleId="rules-title">
        <div className={blocks.cards}>
          {RULES.map((r) => (
            <div key={r.label} className={`${blocks.palePanel} ${blocks.stack}`}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="amber" title="Unsere Garantie" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Ist deine Steuerrückerstattung geringer als unsere Gebühr, erstatten wir dir nach dem Notice of Assessment die Differenz. Gibt es keine Rückerstattung oder schuldest du dem ATO stattdessen Geld, gilt die volle Gebühr. Die Garantie gilt nur für Steuererklärungen mit TFN-Einkommen.
        </p>
        <p className={blocks.text}>Von dem, was das ATO überweist, wird nie etwas abgezogen. Die Gebühr klären wir vor Beginn der Arbeit auf WhatsApp mit dir.</p>
      </Section>

      <Section tone="pale" title="Working-Holiday-Steuer ist das Einzige, was wir machen." titleId="trust-title">
        <p className={blocks.text}>Der Fragebogen, die Prüfungen und die Reihenfolge oben sind um ein einziges Visumsjahr herum gebaut. Jede Erklärung wird von unserem Team vorbereitet und von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird.</p>
        <GoogleReviewsServer lang="de" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Niemand Seriöses fragt dich nach deinem myGov-Passwort.</strong>{' '}
          Wir fragen nie danach, weil der Weg oben es nicht braucht. Fragt dich eine Nachricht danach, kommt sie nicht von uns.
        </p>
      </Section>

      <Section title="Was gefragt wird, bevor jemand etwas schickt" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Ratgeber" title="Die lange Fassung der schwierigen Schritte" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="Was kommt als Nächstes" title="Lass deine Super nicht liegen" titleId="next-title">
        <p className={blocks.text}>Dein Arbeitgeber hat zusätzlich zum Lohn Superannuation für dich eingezahlt. Wenn du Australien endgültig verlässt, kannst du sie beantragen, getrennt von der Erklärung.</p>
        <LinkButton href="/de/superannuation">Wie der Super-Antrag läuft →</LinkButton>
      </Section>

      <Section tone="forest" title="Fang mit einer Nachricht an, nicht mit einem Formular" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Schick uns die Orte, in denen du gearbeitet hast, ungefähr welche Monate, und ob du je über eine ABN abgerechnet hast. Daraus sagen wir dir, welche Jahre noch offen sind und wie dein Teil aussieht. Ob du vor zwei Jahren heimgeflogen bist, spielt keine Rolle.</p>
        <WaButton href={WA_TR} position="section" topic="tax-return" lang="de" tone="light">Schreib uns auf WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Antwort in etwa einer Stunde.</p>
      </Section>

      <MobileCta href={WA_TR} lang="de" topic="tax-return" />
    </>
  )
}
