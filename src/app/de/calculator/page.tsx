import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { CalculatorClient } from './CalculatorClient'
import { MobileCta } from '@/components/ui/MobileCta'

export const metadata: Metadata = {
  title: 'Steuerrechner Australien (417 und 462)',
  description:
    'Schätze deine Steuerrückerstattung und dein Super-Guthaben nach der 65 % DASP-Steuer. Aktuelle Sätze für 417 und 462, ein grober Anhaltspunkt.',
  keywords: [
    'Steuerrückerstattung Rechner Australien',
    'Working Holiday Steuerrückerstattung Rechner',
    'Work and Travel Steuerrückerstattung Rechner',
    'Backpacker Steuerrückerstattung Rechner Australien',
    '417 Visum Steuerrechner',
    '462 Visum Steuerrechner',
    'wie viel Steuer bekomme ich zurück Australien',
    'Steuer zurück Rechner Australien Working Holiday',
    'WHM Steuersatz Rechner',
    'Superannuation Rechner DASP',
  ],
  alternates: { canonical: '/de/calculator', languages: { 'en-AU': '/calculator', 'de': '/de/calculator', 'ja': '/ja/calculator', 'x-default': '/calculator' } },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/calculator`,
    siteName: 'Working Holiday Tax',
    title: 'Steuerrechner Australien für Work and Travel (417 / 462)',
    description: 'Grobe Rückerstattung plus Super nach der 65 % DASP-Steuer, mit den aktuellen Sätzen.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Steuerrechner Australien für Work and Travel',
    description: 'Grobe Rückerstattung plus Super nach der 65 % DASP-Steuer.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'Ich habe die Zahl. Kann ich sie nicht einfach selbst einreichen?',
    answer:
      'Kannst du, und das Einreichen ist der einfache Teil. Eine Schätzung kann die Zahl nicht verändern, sie rechnet nur mit dem, was du schon weißt.\n\nBewegen lässt sich das Ergebnis über drei Beurteilungen, und keine davon ist ein Feld auf dieser Seite: welcher Residentenstatus für dich gilt, ob die Medicare Levy dir überhaupt hätte berechnet werden dürfen und was deine Art von Arbeit absetzen darf.',
  },
  {
    question: 'Wie genau ist dieser Steuerrechner?',
    answer:
      'Er rechnet genau mit den Zahlen, die du eingibst, und mehr nicht. Er wendet die Sätze für Working Holiday Maker und australische Steuerresidenten für 2025-26 auf dein Einkommen und die einbehaltene Steuer an. Nimm die Zahl als Ausgangspunkt, nicht als Endergebnis.',
  },
  {
    question: 'Welche Steuersätze nutzt der Rechner?',
    answer:
      'Für Working Holiday Maker mit 417 oder 462 Visum: 15 % auf die ersten 45.000 $, 30 % von 45.001 bis 135.000 $, 37 % von 135.001 bis 190.000 $ und 45 % darüber, ohne Freibetrag. Für australische Steuerresidenten: Freibetrag bis 18.200 $, dann 16 % bis 45.000 $, 30 % bis 135.000 $, 37 % bis 190.000 $ und 45 % darüber. Welcher der beiden für dich gilt, ist eine Beurteilung deiner Umstände und keine Einstellung.',
  },
  {
    question: 'Warum berücksichtigt der Rechner die Medicare Levy nicht?',
    answer:
      'Weil sie bei den meisten, die ihn benutzen, gar nicht anfallen dürfte. Die Medicare Levy ist separate 2 % des zu versteuernden Einkommens, und Working Holiday Maker aus Ländern ohne Sozialversicherungsabkommen, Deutschland eingeschlossen, können sie über eine Befreiung streichen lassen.\n\nSie standardmäßig einzurechnen würde die Rückerstattung für die Mehrheit zu niedrig zeigen, deshalb gehört sie in die Prüfung, wo dein Anspruch geklärt werden kann.',
  },
  {
    question: 'Der Rechner zeigt eine Nachzahlung. Ist das das Ende?',
    answer:
      'Normalerweise nicht. Eine angezeigte Steuerschuld bedeutet fast immer, dass Einkommen im Spiel ist, von dem wenig oder nichts einbehalten wurde, typischerweise ABN-Arbeit, oder dass keine absetzbaren Kosten drinstecken, weil es dafür kein Feld gibt.\n\nAbsetzbare Kosten senken das zu versteuernde Einkommen und können aus einer Nachzahlung eine Rückerstattung machen. Lass die Position prüfen.',
  },
  {
    question: 'Kannst du den Rechner auch nutzen, wenn du schon zurück in Deutschland bist?',
    answer:
      'Ja. Deine australische Steuerposition hängt vom Einkommen ab, das du in Australien verdient hast, und vom Visum, mit dem du es verdient hast, nicht davon, wo du jetzt wohnst.\n\nDer Rechner funktioniert aus Berlin genauso wie aus Sydney, und eine Steuererklärung lässt sich von überall einreichen. Neu ist nach der Abreise nur, dass auch deine Super über DASP beantragt werden kann.',
  },
  {
    question: 'Was macht der Rechner mit dem Superannuation Guthaben?',
    answer:
      'Er wendet den DASP-Steuersatz auf das eingegebene Guthaben an und zeigt, was auf deinem Konto ankäme. Für alle, die jemals ein 417 oder 462 Visum hatten, sind das 65 % auf den steuerpflichtigen Anteil, aus 10.000 $ werden also etwa 3.500 $.\n\nDie Super ist ein eigener Antrag, getrennt von der Steuererklärung, und kann erst ausgezahlt werden, wenn du Australien verlassen hast und dein Visum abgelaufen oder annulliert ist.',
  },
]

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
    { '@type': 'ListItem', position: 2, name: 'Steuerrechner', item: `${SITE_URL}/de/calculator` },
  ],
}

// Kein `offers` Block. Preise erscheinen nirgends auf der öffentlichen Seite,
// weder im Text noch im Schema, und der Rechner ist kein Gratisprodukt mehr.
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Steuerrechner für Work and Travel in Australien',
  description:
    'Grobe Schätzung der australischen Steuerrückerstattung und der DASP Superannuation für Inhaber von Working Holiday Visa, mit den Sätzen 2025-26.',
  url: `${SITE_URL}/de/calculator`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  inLanguage: 'de',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/de/calculator#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/de/calculator`,
}

export default function GermanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <CalculatorClient faqs={faqs} />
      <MobileCta href={waUrl({ topic: 'calculator', lang: 'de' })} lang="de" topic="calculator" />
    </>
  )
}
