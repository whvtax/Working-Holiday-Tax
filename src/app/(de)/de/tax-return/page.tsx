import { jsonLdHtml } from '@/lib/json-ld-html'
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
import { Steps, LinkRows, Compare, blocks } from '@/components/wht/Blocks'
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
  // Absolut, ohne " | Working Holiday Tax": Der Suchbegriff "Steuererklärung
  // Australien Work and Travel" und der Hinweis ohne myGov passen sonst nicht
  // in die rund 60 Zeichen, die Google zeigt (CTR-Runde, 5. Nov. 2026).
  title: { absolute: 'Steuererklärung Australien für Work and Travel, ohne myGov' },
  description:
    'Steuererklärung nach Work and Travel, auch aus Deutschland: Pass und australisches Konto reichen, keine Payslips. Ablauf, Fristen und Auszahlung.',
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
      'Deine Daten und wohin die Erstattung gehen soll. Wir lesen die ATO-Daten und bereiten die Erklärung vor, du unterschreibst, und ein registrierter Tax Agent prüft und gibt frei, bevor sie beim ATO eingereicht wird. Eine Erstattung zahlt das ATO meist etwa 14 Werktage danach aus.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tax-return.png`],
    card: 'summary_large_image',
    title: 'Steuererklärung Australien ohne myGov (417 & 462)',
    description: 'Pass, Bankdaten, keine Payslips. Du unterschreibst, ein registrierter Tax Agent gibt frei, dann wird eingereicht. Eine Erstattung zahlt das ATO meist nach etwa 14 Werktagen aus.',
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
    body: 'WhatsApp, auf Deutsch, Englisch, Französisch, Italienisch, Spanisch oder Japanisch. Du erzählst grob, wie das Jahr aussah, wir sagen dir, wo du stehst, und das Honorar wird vereinbart, bevor die Arbeit beginnt.',
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

/** Zwei Regeln, die die Reihenfolge ändern. Sie stehen direkt nach dem Ablauf. */
/**
 * Where a working holiday refund comes from (Oct 2026). This page ranked around
 * 30 for "working holiday tax return" with nothing on it that explained why a
 * refund exists at all, which is the question the query carries. Every item is a
 * mechanism already stated elsewhere on the site; no amount is promised. The one
 * range sentence in the lede is the owner-approved wording.
 */
const REFUND_SOURCES: { label: string; body: string; href?: string; linkLabel?: string }[] = [
  {
    "label": "Wochen mit 45 %, bevor deine TFN da war",
    "body": "Liegt deinem Arbeitgeber weder deine TFN vor noch eine Erklärung, dass dein Antrag läuft, muss er 45 % statt 15 % einbehalten. Jede Lohnabrechnung in dieser Zeit war zu hoch besteuert, und das Geld kommt nur über eine eingereichte Erklärung zurück.",
    "href": "/de/tfn",
    "linkLabel": "Wie du die TFN beantragst"
  },
  {
    "label": "Ein zweiter Job ohne eigene Erklärung",
    "body": "Jeder Arbeitgeber braucht seine eigene Tax File Number Declaration. Ein zweiter Job ohne sie behält 45 % ein, solange es niemand merkt, oft monatelang."
  },
  {
    "label": "Ein Arbeitgeber ohne Registrierung für Working Holiday Maker",
    "body": "Für Working Holiday Maker gelten besondere Sätze, wenn der Arbeitgeber beim ATO als Arbeitgeber von Working Holiday Makern registriert ist. War er es nicht, musste er zum Satz für ausländische Steuerpflichtige einbehalten, der bei 30 Cent pro Dollar beginnt. Ob das bei dir so war, sehen wir in deinen ATO-Daten."
  },
  {
    "label": "Eine Medicare Levy, die nie deine war",
    "body": "Die 2 % werden standardmäßig angesetzt. Foreign Residents for tax purposes, und das sind die meisten Working Holiday Maker, zahlen sie nicht und beantragen die Befreiung in der Erklärung. Ein Medicare Entitlement Statement von Services Australia braucht, wer Resident ist und keinen Anspruch auf Medicare hat, denn Deutschland, Österreich und die Schweiz haben kein Gesundheitsabkommen mit Australien. Ob die Befreiung bei dir greift, hängt von deinem Anspruch ab.",
    "href": "/de/medicare",
    "linkLabel": "Wie die Befreiung läuft"
  },
  {
    "label": "Arbeitskosten, die niemand angesetzt hat",
    "body": "Schuhe, Arbeitskleidung, Werkzeug, Lizenzen und Fahrten zwischen Einsatzorten können dein steuerpflichtiges Einkommen senken, wenn sie mit deiner Arbeit zusammenhängen. Beim Satz von 15 % senken je 100 $ an echten Arbeitskosten die Steuer um 15 $."
  },
  {
    "label": "Deine steuerliche Ansässigkeit",
    "body": "Je nach Verlauf deines Jahres kann das Urteil Addy v Commissioner of Taxation [2021] HCA 34 des High Court of Australia die geltenden Steuersätze verändern. Ob es bei dir greift, hängt vom Einzelfall ab, und das klären wir in unserer Prüfung.",
    "href": "/de/blog/tax-residency-working-holiday-makers",
    "linkLabel": "Bist du steuerlich ansässig"
  }
]

/** Eckdaten mit Quelle, Stand November 2026. Nur Werte aus llms.txt Key facts oder ato.gov.au.
 * Runde 2 (24. Nov. 2026, r18): als echte Tabelle mit Quellenspalte gerendert, Texte unverändert bis auf die
 * Medicare-Zeile (r16 W3/D2, wie EN) und die Jahresangabe der Steuersätze (r16 A3). */
const KEY_FIGURES = [
  { what: 'Steuerjahr', figure: '1. Juli bis 30. Juni. Die Erklärung für 2025/26 umfasst den 1. Juli 2025 bis 30. Juni 2026.', source: 'ATO' },
  { what: 'Ab wann einreichen', figure: 'Arbeitgeber schließen ihre Income Statements bis 14. Juli ab, danach stehen sie auf „Tax ready“. Das ATO empfiehlt, ab Ende Juli einzureichen.', source: 'ATO' },
  { what: 'Frist bei eigener Abgabe', figure: '31. Oktober nach Ende des Steuerjahres: für 2025/26 der 31. Oktober 2026 (abgelaufen), für 2026/27 der 31. Oktober 2027. Eine verspätete Erklärung kann weiterhin eingereicht werden.', source: 'ATO' },
  { what: 'Steuersätze für Working Holiday Maker (2025/26, im Einbehalt ab 1. Juli 2026 unverändert)', figure: '15 % bis 45.000 $, 30 % bis 135.000 $, 37 % bis 190.000 $, 45 % darüber. Ab dem ersten Dollar, ohne steuerfreien Grundbetrag.', source: 'ATO' },
  { what: 'Ohne TFN beim Arbeitgeber', figure: '45 % Einbehalt statt 15 %.', source: 'ATO' },
  { what: 'Medicare Levy', figure: '2 % des steuerpflichtigen Einkommens für Residents for tax purposes. Foreign Residents, und das sind die meisten Working Holiday Maker, zahlen sie nicht und beantragen die Befreiung in der Erklärung. Wer Resident ist, aber keinen Anspruch auf Medicare hat, etwa aus Deutschland, Österreich oder der Schweiz ohne Gesundheitsabkommen, braucht für die Befreiung ein Medicare Entitlement Statement.', source: 'ATO, Services Australia' },
  { what: 'Bearbeitung', figure: 'Die meisten online eingereichten Erklärungen bearbeitet das ATO innerhalb von 10 Arbeitstagen.', source: 'ATO' },
  { what: 'Auszahlung', figure: 'Eine Erstattung geht nur auf ein australisches Bankkonto. Die Super-Auszahlung (DASP) ist ein eigener Antrag.', source: 'ATO' },
]

const cellStyle = { padding: '10px 12px', borderTop: '1px solid var(--wht-line)', textAlign: 'left' as const, verticalAlign: 'top' as const }

const TWO_WAYS = [
  { left: 'Kostenlos.', right: 'Ein Pauschalhonorar, das vor Beginn der Arbeit auf WhatsApp vereinbart wird, nie ein Prozentsatz der Erstattung.' },
  { left: 'Ein myGov-Konto, verknüpft mit dem ATO, mit Identitätsprüfung.', right: 'Deine Pass- und Visumdaten, ein australisches Bankkonto und ungefähr, wo du gearbeitet hast.' },
  { left: 'Die Income Statements werden vorausgefüllt, sobald jeder Arbeitgeber sie abgeschlossen hat.', right: 'Wir lesen denselben ATO-Datensatz und gleichen ihn mit jedem Job ab, an den du dich erinnerst.' },
  { left: 'Die Fragen zu Wohnsitz, Einkommen als Working Holiday Maker und Medicare Levy beantwortest du selbst.', right: 'Jede dieser Fragen wird vor der Einreichung anhand der Umstände deines Jahres geprüft.' },
  { left: 'Du trägst die Abzüge ein, die du kennst.', right: 'Wir fragen, was zu deiner Arbeit gehörte, und setzen an, was absetzbar ist.' },
  { left: 'Fällig am 31. Oktober nach Ende des Steuerjahres.', right: 'Von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird.' },
]

const RULES = [
  {
    label: 'Die Rückerstattung geht nur auf ein australisches Konto',
    body: 'Die Super-Auszahlung (DASP) kann ein Fonds ins Ausland überweisen, wenn er das anbietet. Eine Steuerrückerstattung nie. Willst du dein australisches Konto schließen, warte, bis die Rückerstattung da ist, oder sag uns vorher Bescheid.',
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
    question: 'Muss ich als Working Holiday Maker eine Steuererklärung machen?',
    answer:
      'In der Regel ja. Wurde im Steuerjahr Steuer von deinem Lohn einbehalten oder hattest du Einkommen über eine ABN, musst du für dieses Jahr eine Erklärung abgeben. Nur über sie wird ausgeglichen, was deine Arbeitgeber einbehalten haben und was du tatsächlich schuldest.\n\nDas gilt auch, wenn du Australien schon verlassen hast. Eine verspätete Erklärung kannst du weiterhin einreichen.',
  },
  {
    question: 'Ab wann kann ich die Steuererklärung einreichen?',
    answer:
      'Ab dem 1. Juli für das Steuerjahr, das am 30. Juni geendet hat. Sinnvoll ist es erst, wenn alle Income Statements auf „Tax ready“ stehen: Arbeitgeber schließen sie bis 14. Juli ab, und das ATO empfiehlt, ab Ende Juli einzureichen.\n\nWer früher einreicht, muss die Erklärung womöglich später korrigieren.',
  },
  {
    question: 'Wie lange dauert eine Steuererklärung für Working Holiday Maker?',
    answer:
      'Ab dem Tag, an dem dein Fragebogen da ist, brauchen Vorbereitung und Prüfung bei einem unkomplizierten Jahr wenige Tage, und eine Erstattung zahlt das ATO meist etwa 14 Werktage nach der Einreichung aus.\n\nFünf Arbeitgeber, über eine ABN abgerechnetes Einkommen oder ein Wohnsitz, der begründet werden muss, dauern bei uns länger. Wir sagen dir, welcher Fall deiner ist.',
  },
  {
    question: 'Kann ich die Steuererklärung schon vor der Abreise machen?',
    answer:
      'Nur in einem Sonderfall. Wer Australien vor dem 30. Juni endgültig verlässt und danach kein australisches Einkommen mehr hat, außer Zinsen, Dividenden oder Lizenzgebühren, darf vorzeitig einreichen. Das geht nur auf Papier, und das ATO nennt dafür 50 Arbeitstage Bearbeitungszeit.\n\nFür alle anderen gilt: nach dem 30. Juni einreichen, und das klappt auch von Deutschland aus.',
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
      'Drei Dinge. Den Fragebogen einmal ausfüllen, die fertige Erklärung lesen und sie unterschreiben. Du legst kein Behördenkonto an und musst kein ATO-Formular deuten: Wir bereiten die Erklärung vor, und sie wird von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird.',
  },
  {
    question: 'Geht das auch, wenn ich Australien schon verlassen habe?',
    answer:
      'Ja, und viele der Erklärungen, die wir vorbereiten, gehören Leuten, die schon wieder in Deutschland, Österreich oder der Schweiz sind. Fragebogen, Unterschrift und Einreichung laufen online.\n\nNur die Rückerstattung reist nicht mit: Das ATO kann sie nur auf ein australisches Bankkonto auszahlen. Die Super (DASP) kann ein Fonds dagegen auch ins Ausland überweisen, wenn er das anbietet. Ist dein australisches Konto schon geschlossen, schreib es uns in der ersten Nachricht.',
  },
  {
    question: 'Ich komme nicht mehr in mein myGov-Konto. Geht die Steuererklärung trotzdem?',
    answer:
      'Ja. Für die Erklärung mit uns brauchst du kein myGov-Konto, keinen SMS-Code und keine myID. Wir regeln das direkt mit dem ATO, und jede Erklärung wird von einem registrierten Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird.\n\nWillst du dein eigenes Konto zurück, nennt das ATO zwei Wege: die Wiederherstellung mit einer myID auf der Stufe Strong oder ein neues myGov-Konto, das du danach wieder mit dem ATO verknüpfst. Mit einem ausländischen Pass ist die Stufe Strong meist nicht erreichbar.',
  },
  {
    question: 'Was ist, wenn ich für ein früheres Jahr nie eingereicht habe?',
    answer:
      'Das lässt sich jetzt noch nachholen. Jedes Steuerjahr steht für sich, mit eigener Erklärung und eigener Rückerstattung, und an den ATO-Daten sehen wir, welche Jahre noch offen sind.\n\nOb am Ende eine Erstattung steht, entscheidet das ATO. Wir sagen dir vorher, womit du rechnen kannst.',
  },
  {
    question: 'Was passiert, wenn ich keine Steuererklärung mache?',
    answer:
      'Dann bleibt Steuer, die zu hoch einbehalten wurde, beim ATO, denn ausgeglichen wird nur über eine eingereichte Erklärung. Die Pflicht zur Abgabe endet nicht mit der Abreise.\n\nFührt eine verspätete Erklärung zu einer Erstattung oder zu null, verhängt das ATO in der Regel keine Strafe für die verspätete Abgabe. Steht am Ende eine Nachzahlung, kann eine solche Strafe anfallen.',
  },
  {
    question: 'Was passiert, wenn am Ende eine Nachzahlung steht?',
    answer:
      'Das kommt vor, meistens dann, wenn Einkommen über eine ABN abgerechnet wurde und unterwegs nichts einbehalten worden ist.\n\nDu siehst diesen Betrag, bevor irgendetwas eingereicht wird, zusammen mit der Erklärung, wo er herkommt und welche Zahlungswege das ATO anbietet. Ohne deine Unterschrift geht nichts raus.',
  },
  {
    question: 'Wie viel bekomme ich zurück?',
    answer:
      'Das hängt allein von deinem Jahr ab, und eine Erstattung ist nie sicher. Den Betrag bewegen vor allem Wochen mit 45 % ohne TFN, eine Medicare Levy, die wegfallen kann, ein Arbeitgeber ohne Registrierung für Working Holiday Maker und echte Arbeitskosten.\n\nEine grobe Schätzung gibt der Rechner. Belastbar wird die Zahl erst mit deinen ATO-Daten, und die siehst du, bevor du unterschreibst.',
  },
  {
    question: 'Was kostet die Steuererklärung in Australien?',
    answer:
      'Selbst beim ATO einzureichen kostet nichts. Bei uns ist es ein Pauschalhonorar, nie ein Prozentsatz der Erstattung, und wir nennen es dir auf WhatsApp, bevor irgendetwas beginnt.\n\nUnsere Garantie: Ist deine Steuerrückerstattung geringer als unsere Gebühr, erstatten wir dir nach dem Notice of Assessment die Differenz. Gibt es keine Rückerstattung oder schuldest du dem ATO stattdessen Geld, gilt die volle Gebühr. Die Garantie gilt nur für Steuererklärungen mit TFN-Einkommen.',
  },
  {
    question: 'Muss ich mein australisches Einkommen auch in Deutschland angeben?',
    answer:
      'Das ist eine Frage des deutschen Steuerrechts, nicht der australischen Erklärung. Kläre sie mit deinem Finanzamt oder einer deutschen Steuerberatung, für Österreich und die Schweiz gilt dasselbe mit den dortigen Stellen. Wir kümmern uns um die australische Seite.',
  },
]

const GUIDES = [
  // Plan 3 (24 Nov 2026): myGov problem hub first, then the closed account guide (r03 P1-2, r17 P1-3).
  {
    href: '/de/blog/mygov-problems-tax-return-super',
    title: 'Kein Zugriff auf myGov',
    desc: 'Code kommt nicht, Konto gesperrt, ATO nicht verknüpft: was hilft.',
  },
  {
    href: '/de/blog/tax-refund-closed-australian-bank-account',
    title: 'Australisches Konto schon geschlossen',
    desc: 'Was mit der Erstattung passiert und wie sie neu ausgezahlt wird.',
  },
  {
    href: '/de/blog/how-to-lodge-tax-return-from-overseas',
    title: 'Einreichen nach der Rückkehr',
    desc: 'Was aus Deutschland weiter funktioniert, und die Kontoregel, die viele übersehen.',
  },
  {
    href: '/de/blog/tax-return-deadline-31-october-working-holiday',
    title: 'Die Frist am 31. Oktober',
    desc: 'Was nach Fristablauf gilt und warum verspätet nicht verloren heißt.',
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
  {
    href: '/de/blog/multiple-jobs-tax-return-working-holiday',
    title: 'Mehrere Jobs in einem Jahr',
    desc: 'Warum der zweite Job oft zu 45 % lief und wie das zurückkommt.',
  },
  {
    href: '/de/blog/amending-tax-return-australia',
    title: 'Eine Erklärung korrigieren',
    desc: 'Wenn nach dem Einreichen noch ein Income Statement auftaucht.',
  },
  {
    href: '/de/blog/tax-back-australia-working-holiday',
    title: 'Steuern zurückholen, Schritt für Schritt',
    desc: 'Von der letzten Lohnabrechnung bis zur Erstattung auf dem Konto.',
  },
  {
    href: '/de/leaving-australia',
    title: 'Australien verlassen: Steuer und Super',
    desc: 'Was vor und nach der Abreise ansteht, in der richtigen Reihenfolge.',
  },
  {
    href: '/de/blog/tax-obligations-after-leaving-australia',
    title: 'Was nach der Abreise noch offen ist',
    desc: 'Die Erklärung, deine Super und das Bankkonto, der Reihe nach.',
  },
]

/** Der Weg zur Erstattung in fünf Schritten (Fakten: ATO, Stand November 2026). */
const REFUND_STEPS = [
  { n: '1', title: 'Warten, bis alles „Tax ready“ ist', body: 'Arbeitgeber schließen ihre Income Statements bis 14. Juli ab. Das ATO empfiehlt, ab Ende Juli einzureichen.' },
  { n: '2', title: 'Die Punkte prüfen, die den Betrag bewegen', body: 'Steuerlicher Wohnsitz, Wochen mit 45 % ohne TFN, die Medicare Levy und die Abzüge, die zu deiner Arbeit gehören.' },
  { n: '3', title: 'Die Erklärung einreichen', body: 'Selbst über myGov oder von uns vorbereitet. Bei uns wird sie von einem registrierten Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird.' },
  { n: '4', title: 'Das australische Konto offen halten', body: 'Das ATO zahlt eine Steuererstattung nur auf ein australisches Bankkonto aus.' },
  { n: '5', title: 'Die Super getrennt beantragen', body: 'Die Super ist keine Steuererstattung. Nach der Ausreise holst du sie mit einem eigenen DASP-Antrag zurück.' },
]

const WA_TR = waUrl({ topic: 'tax-return', lang: 'de' })

export default function TaxReturnPageDE() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/de/tax-return#webpage`,
    url: `${SITE_URL}/de/tax-return`,
    name: 'Steuererklärung Australien: Work and Travel',
    description:
      'Wie eine australische Steuererklärung mit 417- oder 462-Visum eingereicht wird: was wir von dir brauchen, was wir prüfen, wie du unterschreibst und wann das ATO eine Erstattung auszahlt.',
    inLanguage: 'de',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    dateModified: '2026-11-24',
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede', '.what-lede', '.key-figures'] },
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
    availableLanguage: ['de', 'en', 'ja', 'fr', 'it', 'es'],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(breadcrumbLd) }} />

      <div className={blocks.underHeader}>
        <Crumb home="Startseite" current="Steuererklärung" label="Breadcrumb" href="/de" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>Steuererklärung Australien für Work and Travel&nbsp;&middot; Visum 417 &amp; 462</span>
              Deine Daten und wohin die Erstattung gehen soll. <Mark>Den Rest übernehmen wir.</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>Die australische Steuererklärung für Work and Travel (Visum 417 oder 462) wird nach dem 30. Juni eingereicht, auch aus Deutschland, und zu viel einbehaltene Steuer kommt nur über sie zurück. Keine Payslips, kein myGov-Konto: ein Fragebogen, eine Unterschrift, und eine Erstattung zahlt das ATO meist etwa 14 Werktage nach der Einreichung aus.</Lead>
          </div>
          <WaButton href={WA_TR} position="hero" topic="tax-return" lang="de">Schreib uns auf WhatsApp</WaButton>
          <p className={heroStyles.note}>Antwort in etwa einer Stunde.</p>
          <GoogleRating variant="pill" lang="de" />
        </Hero>
      </div>

      <Section eyebrow="Kurz beantwortet" title="Was ist die Steuererklärung für Work and Travel in Australien?" titleId="what-title">
        <p className={`${blocks.text} what-lede`}>
          Die Steuererklärung in Australien für Work and Travel ist die australische Einkommensteuererklärung für alle mit einem 417- oder 462-Visum. Sie deckt das Steuerjahr vom 1. Juli bis 30. Juni ab, wird ab Ende Juli eingereicht und ist bei eigener Abgabe bis 31. Oktober fällig. Das geht auch von Deutschland aus, eine Erstattung zahlt das ATO aber nur auf ein australisches Konto.
        </p>
        <p className={blocks.text}>
          Wurde Steuer von deinem Lohn einbehalten, musst du in der Regel eine Erklärung abgeben, und nur über sie wird Steuer ausgeglichen, die zum falschen Satz einbehalten wurde. Die Erklärung für 2025/26 war bis 31. Oktober 2026 fällig, wenn du sie selbst einreichst. Eine verspätete Erklärung kannst du trotzdem noch einreichen, für frühere Jahre oft auch.
        </p>
        <p className={blocks.text}>
          Die Sätze für Working Holiday Maker heißen umgangssprachlich{' '}
          <Link href="/de/blog/backpacker-tax-rate-australia" className={blocks.textLink}>Backpacker Tax</Link>: 15 % auf die ersten 45.000 $, dann 30 % bis 135.000 $, 37 % bis 190.000 $ und 45 % darüber. Du kannst die Erklärung selbst über myGov machen oder für dich vorbereiten lassen. Beide Wege stehen{' '}
          <a href="#two-ways" className={blocks.textLink}>unten im Vergleich</a>.
        </p>
      </Section>

      <Section tone="pale" eyebrow="Stand: November 2026" title="Die Eckdaten auf einen Blick" titleId="figures-title">
        <div style={{ overflowX: 'auto' }} tabIndex={0} role="region" aria-label="Tabelle, seitlich scrollbar">
          <table className={`${blocks.text} key-figures`} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <caption className={blocks.small} style={{ textAlign: 'left', captionSide: 'top', paddingBottom: 10 }}>
              Die Zahlen, an denen eine Steuererklärung mit 417- oder 462-Visum hängt. Geprüft auf ato.gov.au und servicesaustralia.gov.au, November 2026.
            </caption>
            <thead>
              <tr>
                <th scope="col" style={cellStyle}>Was</th>
                <th scope="col" style={cellStyle}>Wert</th>
                <th scope="col" style={cellStyle}>Quelle</th>
              </tr>
            </thead>
            <tbody>
              {KEY_FIGURES.map((k) => (
                <tr key={k.what}>
                  <th scope="row" style={cellStyle}>{k.what}</th>
                  <td style={cellStyle}>{k.figure}</td>
                  <td style={cellStyle}>{k.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <PhotoFrame page="tax-return" locale="de" />

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
        <p className={blocks.text}>Schritt 01 ist eine Nachricht. Schreib uns, in welchen Orten du gearbeitet hast, ungefähr in welchen Monaten und ob es eine ABN gab. Wir sagen dir dann, welche Jahre offen sind.</p>
        <WaButton href={WA_TR} position="inline" topic="tax-return" lang="de">Schritt 01: schreib uns auf WhatsApp</WaButton>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Mehr zu Schritt 04:{' '}
          <Link href="/de/abn" className={blocks.textLink}>was eine ABN ändert</Link>, falls ein Teil deines Einkommens abgerechnet statt ausgezahlt wurde.
        </p>
      </Section>

      <Section eyebrow="Woher eine Erstattung kommt" title="Warum Working Holiday Maker oft eine Steuererstattung bekommen" titleId="refund-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Eine Erstattung ist keine Prämie fürs Backpacken. Sie ist die Lücke zwischen dem, was deine Arbeitgeber einbehalten haben, und dem, was du tatsächlich geschuldet hast, und in einem Working-Holiday-Jahr entsteht diese Lücke meist an den Stellen unten.</p>
        <div className={blocks.cards}>
          {REFUND_SOURCES.map((r) => (
            <div key={r.label} className={blocks.card}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
              {r.href && r.linkLabel ? (
                <Link href={r.href} className={blocks.textLink}>{r.linkLabel}</Link>
              ) : null}
            </div>
          ))}
        </div>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Nichts davon passiert automatisch, und nichts wird einfach angenommen. Jeder Punkt wird vor der Einreichung mit deinem ATO-Datensatz abgeglichen.{' '}
          <Link href="/de/calculator" className={blocks.textLink}>Grobe Schätzung im Rechner ansehen</Link>.
        </p>
      </Section>

      <Section id="two-ways" title="Zwei Wege zur Steuererklärung für Work and Travel" titleId="two-ways-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Beide sind legitim. Welcher zu dir passt, hängt davon ab, wie einfach dein Jahr war.</p>
        <Compare rows={TWO_WAYS} leftLabel="Selbst über myGov" rightLabel="Mit Working Holiday Tax" />
        <p className={blocks.text}>Selbst machen passt zu einem einfachen Jahr: ein Arbeitgeber, der für Working Holiday Maker registriert ist, deine TFN ab der ersten Schicht hinterlegt, kein ABN-Einkommen und keine Frage zur Medicare Levy.</p>
        <p className={blocks.text}>
          Hilfe lohnt sich eher, wenn dein Jahr verwickelter war: Wochen mit 45 %, bevor deine TFN da war, mehrere Arbeitgeber, ABN-Einkommen, eine Abreise mitten im Jahr oder eine Befreiung von der Medicare Levy.{' '}
          <Link href="/de/blog/diy-tax-return-vs-tax-agent-working-holiday" className={blocks.textLink}>Der ausführliche Vergleich</Link>.
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

      <Section id="nachtraeglich" title="Kann ich die Steuererklärung für Australien nachträglich machen?" titleId="late-title">
        <p className={blocks.text}>
          Ja. Hast du den 31. Oktober verpasst oder für ein früheres Jahr nie eingereicht, kannst du die Erklärung nachträglich einreichen, auch aus Deutschland. Jedes Steuerjahr ist eine eigene Erklärung mit eigener Erstattung. Führt sie zu einer Erstattung oder zu null, verhängt das ATO in der Regel keine Strafe für die verspätete Abgabe.
        </p>
        <p className={blocks.text}>
          Welche Jahre noch offen sind, sehen wir in deinen ATO-Daten, und wir arbeiten sie der Reihe nach ab, das älteste zuerst. Mehr dazu in unseren Guides zu{' '}
          <Link href="/de/blog/past-years-tax-returns-working-holiday" className={blocks.textLink}>Steuererklärungen für frühere Jahre</Link> und zur{' '}
          <Link href="/de/blog/late-tax-return-penalty-working-holiday" className={blocks.textLink}>Strafe bei verspäteter Abgabe</Link>.
        </p>
        <p className={blocks.small}>Quelle: <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-a-prior-year-tax-return" className={blocks.textLink} rel="noopener">ATO, Lodge a prior year tax return</a></p>
      </Section>

      <Section tone="pale" id="aus-deutschland" title="Wie mache ich die Steuererklärung für Australien von Deutschland aus?" titleId="from-germany-title">
        <p className={blocks.text}>
          Online, genau wie in Australien. Du brauchst deine Pass- und Visumdaten, ein australisches Bankkonto für die Erstattung und ungefähr die Orte und Monate deiner Jobs. Payslips sind nicht nötig, weil die Income Statements deiner Arbeitgeber beim ATO liegen. Unterschrieben wird elektronisch, und eingereicht wird nach dem 30. Juni.
        </p>
        <p className={blocks.text}>
          Ist dein australisches Konto schon geschlossen, schreib es uns gleich in der ersten Nachricht, denn das ATO zahlt eine Steuererstattung nur auf ein australisches Konto. Was aus dem Ausland sonst noch zählt:{' '}
          <Link href="/de/blog/tax-obligations-after-leaving-australia" className={blocks.textLink}>Steuerpflichten nach der Ausreise aus Australien</Link>. Steuererklärung und Super vor und nach der Abreise, der Reihe nach:{' '}
          <Link href="/de/leaving-australia" className={blocks.textLink}>Australien verlassen</Link>.
        </p>
        <p className={blocks.small}>Quelle: <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia" className={blocks.textLink} rel="noopener">ATO, Lodge your tax return from outside Australia</a></p>
      </Section>

      <Section id="steuer-zurueck" title="Wie bekomme ich meine Steuer aus Australien zurück?" titleId="refund-steps-title">
        <p className={blocks.text}>
          Über die australische Steuererklärung für das Steuerjahr, das am 30. Juni endet. Erst die Veranlagung durch das ATO gleicht aus, was deine Arbeitgeber zu viel einbehalten haben, und eine Erstattung zahlt das ATO dann auf ein australisches Konto. Die meisten online eingereichten Erklärungen bearbeitet das ATO innerhalb von 10 Arbeitstagen.
        </p>
        <Steps items={REFUND_STEPS} />
        <p className={blocks.text}>
          Die ausführliche Fassung mit allen Sonderfällen:{' '}
          <Link href="/de/blog/tax-back-australia-working-holiday" className={blocks.textLink}>Steuer zurück aus Australien nach Work and Travel</Link>.
        </p>
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
