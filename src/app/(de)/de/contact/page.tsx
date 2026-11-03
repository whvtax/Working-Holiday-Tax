import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { waUrl } from '@/lib/wa'
import { ContactView, type ContactCopy } from '@/components/wht/ContactBlocks'
import { Mark } from '@/components/wht/Type'
import { WA_NUMBER, EMAIL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Kontakt: Schreib uns auf WhatsApp',
  description: 'Schreib uns auf WhatsApp. Wir antworten meist in etwa einer Stunde. Kein myGov, kein australischer Ausweis, keine Payslips nötig.',
  keywords: [
    'Kontakt Working Holiday Tax',
    'Backpacker Steuer Hilfe',
    'Working Holiday Steuer Hilfe Deutsch',
    'Working Holiday Visum Hilfe',
    'TFN Hilfe Deutsch',
    'Steuerrückerstattung Australien Hilfe',
    'Steuererklärung Australien Hilfe Deutsch',
    'WhatsApp Hilfe australische Steuer',
    'Steuerrückerstattung Australien aus Deutschland',
    'Super Auszahlung Australien Hilfe Deutsch',
    'Working Holiday Maker Hilfe Deutschland',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/contact`,
    languages: {
      'en-AU': `${SITE_URL}/contact`,
      'de': `${SITE_URL}/de/contact`,
      'ja': `${SITE_URL}/ja/contact`,
      ...newLocaleLanguages('/contact'),
      'x-default': `${SITE_URL}/contact`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax: Steuererklärung in Australien' }],
    title: 'Kontakt: Working Holiday Tax',
    description: 'WhatsApp ist der schnellste Weg zu uns. Wir antworten während der Geschäftszeiten meist in etwa einer Stunde.',
    url: `${SITE_URL}/de/contact`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'de_DE',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Kontakt: Working Holiday Tax',
    description: 'Schreib uns auf WhatsApp. Wir antworten meist in etwa einer Stunde.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'contact', lang: 'de' })

/** Die vier Dinge, die Leute davon abhalten, die Nachricht abzuschicken. */
const blockers: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: 'Könnt ihr mir helfen, wenn ich Australien schon verlassen habe?',
    a: 'Ja, und ein großer Teil unserer Arbeit ist genau das. Eine Erklärung für ein abgeschlossenes Jahr lässt sich von überall einreichen, und Superannuation kannst du erst beantragen, nachdem du ausgereist und dein Visum abgelaufen ist.\n\nEins vorweg: Das ATO kann eine Steuerrückerstattung nur auf ein australisches Bankkonto zahlen, deine Super dagegen auch ins Ausland. Sag uns also Bescheid, wenn dein australisches Konto schon zu ist.',
  },
  {
    q: 'Brauche ich ein myGov-Konto?',
    a: 'Nein. Du musst dich nie bei myGov einloggen, keinen australischen Ausweis verknüpfen und nicht herausfinden, welches Formular welches ist. Wir regeln das direkt mit dem ATO.\n\nWenn du es schon versucht hast und bei der Identitätsprüfung hängen geblieben bist, ändert das nichts.',
  },
  {
    q: 'Brauche ich meine Payslips?',
    a: 'Nein, und du musst vor der Nachricht nichts zusammensuchen. Was deine Arbeitgeber einbehalten und gemeldet haben, sehen wir über das ATO. Hast du also gar nichts mehr, schreib uns trotzdem.',
    link: { href: '/de/about', label: 'Warum wir bei den ATO-Daten anfangen' },
  },
  {
    q: 'Ist das hier seriös?',
    a: 'Deine Steuererklärung wird von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird. Die Bedingungen, denen du zustimmen würdest, stehen vollständig in unserer Mandantenvereinbarung, und die Bewertungen in unserem Google-Profil stammen von Working Holiday Makern, mit denen wir tatsächlich gearbeitet haben.',
    link: { href: '/de/client-agreement', label: 'Mandantenvereinbarung lesen' },
  },
]

const FAQS = [
  {
    question: 'Wie schnell antwortet ihr?',
    answer: 'Während der Geschäftszeiten, Montag bis Freitag von 9 bis 18 Uhr, antworten wir meist in etwa einer Stunde. Außerhalb dieser Zeiten melden wir uns am nächsten Geschäftstag. Muss deine Frage erst geprüft werden, sagen wir dir das sofort.',
  },
  {
    question: 'Kostet es etwas, eine Frage zu stellen?',
    answer: 'Fragen kostet nichts, und du kannst so viel fragen, wie du willst, bevor du dich entscheidest. Unsere Leistung kostet ein Pauschalhonorar, niemals einen Prozentsatz deiner Rückerstattung. Es wird per WhatsApp bestätigt, bevor die Arbeit beginnt.',
  },
  {
    question: 'In welcher Sprache bekomme ich eine Antwort?',
    answer: 'In der, in der du uns schreibst. Deutsch, Englisch oder die Sprache, in der du deine Situation am besten erklären kannst, und genau so kommt die Antwort zurück.',
  },
  {
    question: 'Muss ich sofort Unterlagen schicken?',
    answer: 'Nein. Schick erst mal nur die Frage und sonst nichts. Wir beantworten sie, und wenn sich ein Auftrag lohnt, sagen wir dir vorher, was dazugehört und was er kostet.\n\nUnterlagen kommen später, und dann sagen wir dir genau, welche und wie du sie sicher schickst.',
  },
  {
    question: 'Was ist, wenn ich keine Rückerstattung bekomme?',
    answer: 'Unsere Garantie: Ist deine Steuerrückerstattung geringer als unsere Gebühr, erstatten wir dir nach dem Notice of Assessment die Differenz. Gibt es keine Rückerstattung oder schuldest du dem ATO stattdessen Geld, gilt die volle Gebühr. Nicht jedes Working-Holiday-Jahr führt zu einer Rückerstattung, und wenn deines vermutlich keine bringt, sagen wir dir das früh, statt den Auftrag anzunehmen und zu hoffen.',
  },
  {
    question: 'Könnt ihr mir aus Deutschland, Österreich oder der Schweiz helfen?',
    answer: 'Ja, und von dort schreiben uns die meisten deutschsprachigen Kunden, sobald sie wieder zu Hause sind. Eine australische Steuererklärung, ein Superannuation-Antrag und alles, was beim ATO noch offen ist, lässt sich aus einem anderen Land erledigen, vollständig online.',
  },
]

const contactPageLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/de/contact#webpage`,
  url: `${SITE_URL}/de/contact`,
  name: 'Kontakt: Working Holiday Tax',
  description: 'Schreib uns auf WhatsApp. Wir antworten während der Geschäftszeiten meist in etwa einer Stunde.',
  inLanguage: 'de',
  isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.contact-lead'] },
  mainEntity: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#business`,
    name: 'Working Holiday Tax',
    url: SITE_URL,
    email: EMAIL,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: `+${WA_NUMBER}`,
        email: EMAIL,
        areaServed: 'AU',
        availableLanguage: ['de', 'en', 'ja'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
    ],
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
    { '@type': 'ListItem', position: 2, name: 'Kontakt', item: `${SITE_URL}/de/contact` },
  ],
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'de',
  mainEntity: [...blockers.map(b => ({ question: b.q, answer: b.a })), ...FAQS.map(f => ({ question: f.question, answer: f.answer }))]
    .map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
}

const copy: ContactCopy = {
  lang: 'de',
  wa: WA,
  email: EMAIL,
  mailtoHref: `mailto:${EMAIL}?subject=Steuerfrage%20von%20der%20Website`,
  homeHref: "/de",
  homeLabel: "Startseite",
  crumbsLabel: "Brotkrümelnavigation",
  crumbLabel: "Kontakt",
  kicker: "Kontakt",
  h1: <>Schreib uns auf <Mark>WhatsApp</Mark></>,
  lead: "Wir lesen deine Nachricht und antworten, während der Geschäftszeiten meist in etwa einer Stunde.",
  ctaHero: "WhatsApp öffnen →",
  hours: "Montag bis Freitag, 9 bis 18 Uhr",
  blockersEyebrow: "Bevor du fragst",
  blockersTitle: "Die vier Dinge, die alle zuerst prüfen",
  blockers,
  otherEyebrow: "Andere Wege",
  otherTitle: "Falls WhatsApp für dich nicht passt",
  otherIntro: "E-Mail geht auch, die Social-Media-Kanäle ebenfalls, beides ist nur langsamer.",
  emailLabel: "E-Mail",
  hoursTitle: "Geschäftszeiten",
  faqEyebrow: "Häufige Fragen",
  faqTitle: "Alles andere, was gefragt wird",
  faqs: FAQS,
  closingEyebrow: "Wann immer du so weit bist",
  closingTitle: "Schick einfach deine Frage. Mehr braucht der erste Schritt nicht.",
  closingText: "Wo du gearbeitet hast, ungefähr wann, und ob du Australien schon verlassen hast. Das reicht uns für eine erste Einschätzung.",
  ctaFooter: "Schreib uns auf WhatsApp →",
}

export default function GermanContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <ContactView t={copy} />
    </>
  )
}
