import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { waUrl } from '@/lib/wa'
import { AboutView, type AboutCopy } from '@/components/wht/AboutBlocks'
import { Mark } from '@/components/wht/Type'
import { blocks } from '@/components/wht/Blocks'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Über uns: 417 und 462, sonst nichts',
  description: 'Working-Holiday-Steuer ist das Einzige, was wir machen. Jeder Kunde hat ein 417- oder 462-Visum. Vom ersten Payslip bis zum Rückflug, immer dasselbe Jahr.',
  keywords: [
    'Working Holiday Tax Spezialisten',
    'Backpacker Steuerhilfe Australien',
    'wer ist Working Holiday Tax',
    'ist Working Holiday Tax seriös',
    'Working Holiday Tax Bewertungen',
    '417 462 Steuer Spezialisten',
    'Working Holiday Visum Steuerhilfe',
    'Steuerhilfe für Backpacker Australien',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/about`,
    languages: {
      'en-AU': `${SITE_URL}/about`,
      'de': `${SITE_URL}/de/about`,
      'ja': `${SITE_URL}/ja/about`,
      ...newLocaleLanguages('/about'),
      'x-default': `${SITE_URL}/about`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax: Steuererklärung in Australien' }],
    title: 'Über Working Holiday Tax',
    description: 'Nur eine Art von Kunden: Working Holiday Maker mit 417- oder 462-Visum. Das Jahr, das wir sehen, vom ersten Payslip bis zum Rückflug.',
    url: `${SITE_URL}/de/about`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'de_DE',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Über Working Holiday Tax',
    description: 'Working-Holiday-Steuer ist das Einzige, was wir machen. Jeder Kunde hat ein 417- oder 462-Visum.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WA = waUrl({ topic: 'general', lang: 'de' })

/**
 * Wie in der englischen Fassung: die Geschichte ist das Jahr der Leserin oder
 * des Lesers, keine erfundene Firmengeschichte. Jeder Satz muss wörtlich wahr
 * sein. Wo ein echtes Detail stärker wäre als die Erzählung, steht ein
 * JO-Marker statt einer Vermutung.
 */
const chapters = [
  {
    stage: 'Die erste Woche',
    title: 'Du bist mit einem Plan angekommen, der ungefähr zwei Wochen weit reichte',
    body: 'Hostel, SIM-Karte, Bankkonto und so schnell wie möglich ein Job. Die Tax File Number stand irgendwo auf der Liste. Das australische Steuerjahr hat dir niemand erklärt.',
  },
  {
    stage: 'Die ersten Payslips',
    title: 'Der erste Job fing an, bevor die Nummer da war',
    body: 'Ohne hinterlegte Tax File Number muss ein Arbeitgeber den höchsten Satz einbehalten statt des Satzes, der sonst gelten würde. In den ersten Wochen fehlt deshalb ein großer Teil des Lohns.\n\nDieses Geld kommt nicht von allein zurück.',
  },
  {
    stage: 'Bis Weihnachten',
    title: 'Vier Arbeitgeber, die Hälfte davon casual, keiner davon erklärt dir etwas',
    body: 'Ein Hosteljob, ein Café, drei Wochen Lager, und einer, den du ohne letzten Payslip verlassen hast. Das australische Steuerjahr endet im Juni und nicht im Dezember.\n\nDie verlorenen Payslips sind kein Problem: Was deine Arbeitgeber gemeldet haben, sehen wir über das ATO.',
  },
  {
    stage: 'Die 88 Tage',
    title: 'Wenn du sie gemacht hast, bist du weit dafür gefahren',
    body: 'Irgendwohin nach Westen, nach Norden, drei Stunden hinter einen Ort, von dem du nie gehört hattest.\n\nDie Unterkunft wurde direkt vom Lohn abgezogen, bevor du ihn überhaupt gesehen hast, die Payslips sahen anders aus als die aus der Stadt, und bei diesem Abschnitt sind sich die meisten am unsichersten.',
  },
  {
    stage: 'Der Rückflug',
    title: 'Du bist geflogen, die offenen Fragen sind geblieben',
    body: 'Superannuation kannst du erst zurückholen, wenn du Australien verlassen hast und das Visum abgelaufen ist. Deine liegt also meist noch bei einem Fonds, den du dir vermutlich nicht ausgesucht hast. Ob aus den ersten Wochen zu viel Steuer einbehalten wurde, lässt sich prüfen.',
  },
]

const faqs = [
  {
    question: 'Mit wem arbeitet ihr?',
    answer: 'Mit Working Holiday Makern und mit sonst niemandem. Jeder unserer Kunden ist mit einem 417- oder 462-Visum in Australien oder war es und ist inzwischen wieder zu Hause. Wir nehmen keine Studierenden, keine gesponserten Arbeitskräfte und keine Unternehmen an.',
  },
  {
    question: 'Könnt ihr mir helfen, wenn ich Australien schon verlassen habe?',
    answer: 'Ja, und ein großer Teil unserer Arbeit ist genau das. Superannuation kannst du überhaupt erst beantragen, nachdem du ausgereist bist und dein Visum abgelaufen ist, und eine Steuererklärung für ein bereits abgeschlossenes Jahr lässt sich von überall einreichen, alles läuft also aus der Ferne.',
  },
  {
    question: 'Brauche ich meine Payslips?',
    answer: 'Nein. Was deine Arbeitgeber einbehalten und gemeldet haben, sehen wir über das ATO. Wir arbeiten also mit diesen Daten, statt dich Papiere aus einem Job suchen zu lassen, den du vor acht Monaten verlassen hast. Wenn etwas, das du uns erzählst, nicht zu dem passt, was ein Arbeitgeber gemeldet hat, kümmern wir uns um die Differenz.',
  },
  {
    question: 'Was ist, wenn am Ende keine Rückerstattung herauskommt?',
    answer: 'Unsere Garantie: Ist deine Steuerrückerstattung geringer als unsere Gebühr, erstatten wir dir nach dem Notice of Assessment die Differenz. Gibt es keine Rückerstattung oder schuldest du dem ATO stattdessen Geld, gilt die volle Gebühr. Die Garantie gilt nur für Steuererklärungen mit TFN-Einkommen. Nicht jedes Working-Holiday-Jahr führt zu einer Rückerstattung, und wir sagen dir das lieber vorher, als den Auftrag anzunehmen und zu hoffen.',
  },
]

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/de/about#webpage`,
  url: `${SITE_URL}/de/about`,
  name: 'Über Working Holiday Tax',
  description: 'Working-Holiday-Steuer ist das Einzige, was wir machen. Jeder Kunde ist auf einem 417- oder 462-Visum.',
  inLanguage: 'de-DE',
  mainEntity: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.about-lead'] },
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
    { '@type': 'ListItem', position: 2, name: 'Über uns', item: `${SITE_URL}/de/about` },
  ],
}

const copy: AboutCopy = {
  lang: 'de',
  wa: WA,
  homeHref: "/de",
  homeLabel: "Startseite",
  crumbsLabel: "Brotkrümelnavigation",
  crumbLabel: "Über uns",
  kicker: "Über uns",
  h1: (
    <>
      Du kamst mit einem Plan an.<br />Von <Mark>Steuern</Mark> hat keiner geredet.
    </>
  ),
  lead: "Working-Holiday-Steuer ist das Einzige, was wir machen. Kommt dir das Jahr hier unten bekannt vor, lohnt sich ein Blick auf deine Steuer in Australien.",
  ctaHero: "Frag uns alles →",
  contactHref: "/de/contact",
  contactLabel: "Andere Wege zu uns →",
  replyNote: "Wir antworten während der Geschäftszeiten meist in etwa einer Stunde.",
  yearEyebrow: "Das Jahr",
  yearTitle: "Wie sieht ein Working-Holiday-Jahr für uns aus?",
  yearIntro: "Fünf Dinge passieren fast jedem mit einem 417- oder 462-Visum, und vier davon können dich Geld kosten, das sich manchmal über die Steuererklärung zurückholen lässt.",
  chapters,
  whyEyebrow: "Warum es uns gibt",
  whyTitle: "Warum arbeiten wir nur mit Working Holiday Makern?",
  whyParas: [
    "Jeder unserer Kunden hat ein 417- oder 462-Visum, also sind die Dinge, die über deine Rückerstattung entscheiden, für uns keine Sonderfälle zum Nachschlagen. Sie sind unser Tagesgeschäft.",
    "Eine allgemeine Steuerkanzlei sieht ein paar Mal im Jahr einen Backpacker, im Juli, zwischen zweihundert normalen Erklärungen.",
    "Der 417/462-Steuersatz, die Frage nach dem steuerlichen Wohnsitz, die ordentlich geprüft und nicht angenommen werden muss, die Medicare-Befreiung, die vom Einzelfall abhängt, ein Superannuation-Antrag aus einem Zimmer in Hamburg oder München, elf Monate nach der Ausreise: für uns ist das ein ganz normaler Dienstag.",
    "Auf Absenden drücken kann jeder. Die Arbeit passiert davor: dein Jahr durchgehen, herausfinden, was daran stimmt, statt anzukreuzen, was am schnellsten geht, und dann einreichen.",
  ],
  guarantee: "Unsere Garantie: Ist deine Steuerrückerstattung geringer als unsere Gebühr, erstatten wir dir nach dem Notice of Assessment die Differenz. Gibt es keine Rückerstattung oder schuldest du dem ATO stattdessen Geld, gilt die volle Gebühr. Die Garantie gilt nur für Steuererklärungen mit TFN-Einkommen.",
  guaranteeNote: "Nicht jedes Working-Holiday-Jahr führt zu einer Rückerstattung, und wenn deines vermutlich keine bringt, sagen wir dir das.",
  talkEyebrow: "Kontakt",
  talkTitle: "Wie erreichst du uns?",
  talkP1: "Über WhatsApp. Keine Ticketnummer, kein Formular, das dir fünf bis sieben Werktage verspricht. Du kannst eine einzige Frage stellen und es dabei belassen.",
  talkP2: (
    <>
      Für den Anfang brauchst du kein myGov-Konto, keinen australischen Ausweis und keine Payslips, und es macht keinen Unterschied, ob du noch in Australien bist oder seit zwei Jahren wieder zu Hause. Die{' '}
      <Link href="/de/contact" className={blocks.textLink}>Kontaktseite</Link>{' '}
      erklärt, in welcher Sprache die Antwort zurückkommt und wie es danach weitergeht.
    </>
  ),
  ctaSection: "Schreib uns auf WhatsApp →",
  reviewsEyebrow: "In ihren eigenen Worten",
  reviewsTitle: "Was Working Holiday Maker sagen",
  faqEyebrow: "FAQ",
  faqTitle: "Fragen, die vor der ersten Nachricht kommen",
  faqIntro: "Noch etwas offen? Frag es auf WhatsApp, das geht schneller als lesen.",
  faqs,
  closingEyebrow: "Wann immer du so weit bist",
  closingTitle: "Erzähl uns von deinem Jahr",
  closingText: "Wo du gearbeitet hast, ungefähr wann, und ob du schon ausgereist bist. Das reicht uns für eine erste Einschätzung.",
  ctaFooter: "Schreib uns auf WhatsApp →",
}

export default function GermanAboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutView t={copy} />
    </>
  )
}
