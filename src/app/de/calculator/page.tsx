import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { CalculatorClient } from './CalculatorClient'

export const metadata: Metadata = {
  title: 'Steuerrückerstattung Rechner Australien für Working Holiday Maker',
  description: 'Berechne deine Steuerrückerstattung in Australien als Working Holiday Maker (417/462). Kostenloser Rechner mit den aktuellen WHM-Steuersätzen 2025-26. Schätze, wie viel Steuer du zurückbekommst - keine Anmeldung.',
  keywords: [
    // Refund-focused
    'Steuerrückerstattung Rechner Australien',
    'Working Holiday Steuerrückerstattung Rechner',
    'WHV Rückerstattung Rechner',
    'Backpacker Steuerrückerstattung Rechner Australien',
    '417 Visum Steuerrückerstattung Rechner',
    '462 Visum Steuerrückerstattung Rechner',
    'wie viel Steuer bekomme ich zurück Australien',
    'Steuer zurück Rechner Australien Working Holiday',
    'Australische Steuerrückerstattung Schätzer',
    // Adjacent
    'Steuerrechner Australien',
    'Working Holiday Steuerrechner',
    'WHV Rückzahlung Rechner',
    'Backpacker Steuer Schätzer',
    '417 Visum Steuerrechner',
    '462 Visum Steuerrechner',
    'WHM Steuersatz Rechner',
  ],
  alternates: { canonical: '/de/calculator', languages: { 'en-AU': '/calculator', 'de': '/de/calculator', 'ja': '/ja/calculator', 'x-default': '/calculator' } },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/calculator`,
    siteName: 'Working Holiday Tax',
    title: 'Steuerrückerstattung Rechner Australien für Working Holiday Maker',
    description: 'Berechne deine Steuerrückerstattung in Australien als Working Holiday Maker. Kostenlos, sofort, keine Anmeldung.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steuerrückerstattung Rechner Australien für WHV',
    description: 'Berechne deine Steuerrückerstattung als Working Holiday Maker. Kostenlos und sofort.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'Wie genau ist dieser Steuerrechner?',
    answer: 'Der Rechner nutzt die Steuersätze für Working Holiday Maker und australische Steuerresidenten für 2025-26. Er gibt dir eine Schätzung basierend auf den Daten, die du eingibst. Deine tatsächliche Rückzahlung kann je nach absetzbaren Kosten, Steuergutschriften und anderen Faktoren abweichen. Für eine genaue Berechnung machen wir deine Steuererklärung.',
  },
  {
    question: 'Welche Steuersätze nutzt der Rechner?',
    answer: 'Für Working Holiday Maker: 15 % auf die ersten 45.000 $, 30 % von 45.001 bis 135.000 $, 37 % von 135.001 bis 190.000 $ und 45 % über 190.000 $. Für australische Steuerresidenten: Freibetrag bis 18.200 $, dann 16 % bis 45.000 $, 30 % bis 135.000 $, 37 % bis 190.000 $ und 45 % darüber.',
  },
  {
    question: 'Wo finde ich mein Einkommen und die einbehaltene Steuer?',
    answer: 'Beide Zahlen findest du auf deinem PAYG Payment Summary oder Income Statement, das dein Arbeitgeber am Ende des Steuerjahres bereitstellt. Du findest sie auch in deinem ATO-Konto, falls du eines hast.',
  },
  {
    question: 'Ich bekomme eine Rückzahlung, was jetzt?',
    answer: 'Schreib uns auf WhatsApp. Wir machen deine Steuererklärung für dich und sorgen dafür, dass du jede absetzbare Kostenposition geltend machst - das bedeutet oft eine höhere Rückzahlung als die Schätzung hier.',
  },
  {
    question: 'Mir wird Steuerschuld angezeigt, was soll ich tun?',
    answer: 'Melde dich schnell bei uns. Wir schauen uns deine Situation an, finden vergessene absetzbare Kosten und reichen deine Steuererklärung korrekt ein. Oft kann man Steuerschulden durch richtige Absetzungen reduzieren oder ganz vermeiden.',
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

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Working Holiday Steuerrechner',
  description: 'Kostenloser Steuerrechner für Working Holiday Visuminhaber in Australien.',
  url: `${SITE_URL}/de/calculator`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'AUD',
  },
}

export default function GermanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <CalculatorClient faqs={faqs} />
    </>
  )
}
