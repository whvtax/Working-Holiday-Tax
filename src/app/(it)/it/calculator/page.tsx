import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { PagePhoto } from '@/components/wht/PagePhoto'
import { CalculatorClient } from './CalculatorClient'
import { MobileCta } from '@/components/ui/MobileCta'
import { Section } from '@/components/wht/Section'
import { LinkButton } from '@/components/wht/Button'
import { blocks } from '@/components/wht/Blocks'
import Link from 'next/link'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

export const metadata: Metadata = {
  title: 'Calcolatore rimborso tasse Australia',
  description:
    'Stima il rimborso fiscale e la tua super dopo la tassa DASP del 65%. Aliquote aggiornate per il visto 417 e 462, una cifra indicativa.',
  keywords: [
    'calcolatore rimborso tasse Australia',
    'calcolatore tax return Australia',
    'calcolatore tax refund working holiday',
    'rimborso tasse visto 417 calcolo',
    'rimborso tasse visto 462 calcolo',
    'aliquote working holiday maker',
    'calcolo superannuation DASP',
    'quanto posso recuperare di super Australia',
  ],
  alternates: {
    canonical: '/it/calculator',
    languages: { 'en': '/calculator', 'en-AU': '/calculator', 'de': '/de/calculator', 'ja': '/ja/calculator', ...newLocaleLanguages('/calculator'), 'x-default': '/calculator' },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Calcolatore della tax return australiana per chi ha un visto working holiday' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/calculator`,
    siteName: 'Working Holiday Tax',
    title: 'Calcolatore rimborso tasse Australia per il Working Holiday (417 / 462)',
    description: 'Un rimborso indicativo più la tua super dopo la tassa DASP del 65%, con le aliquote attuali.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Calcolatore rimborso tasse Australia per il Working Holiday',
    description: 'Un rimborso indicativo più la tua super dopo la tassa DASP del 65%.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'Ho la cifra. Posso inviarla per conto mio?',
    answer:
      'Una stima non è una dichiarazione. È solo aritmetica sui numeri che hai già e non può cambiare la cifra vera.\n\nTre valutazioni decidono il risultato vero, e nessuna è un campo di questa pagina: quale residenza fiscale è vera per te, se la Medicare levy andava applicata e cosa può dedurre il tuo tipo di lavoro.',
  },
  {
    question: 'Quanto è preciso questo calcolatore?',
    answer:
      'È aritmetica precisa sui numeri che scrivi, e niente di più. Applica aliquote indicative 2025-26 al reddito e alle tasse trattenute che inserisci. Considera la cifra un punto di partenza, non una risposta definitiva.',
  },
  {
    question: 'Quali aliquote usa il calcolatore?',
    answer:
      'Con il visto 417 o 462 l’aliquota è il 15% sui primi 45.000 $ di reddito, il 30% da 45.001 a 135.000 $, il 37% da 135.001 a 190.000 $ e il 45% oltre, senza soglia esente: sono le aliquote del 2025-26, invariate per il 2026-27, e sono quelle che il calcolatore applica.\n\nQuali aliquote valgono davvero per te dipende dai fatti individuali del tuo anno, è l’ATO a deciderlo e il nostro team lo verifica come parte della preparazione della tax return.',
  },
  {
    question: 'Perché il calcolatore non include la Medicare levy?',
    answer:
      'Perché se la levy si applica o no dipende dalla tua situazione individuale e non è qualcosa da dare per scontato. La cifra reale può quindi essere diversa da questa stima.\n\nLa gestiamo nella verifica, dove controlliamo il tuo caso.',
  },
  {
    question: 'Il calcolatore dice che devo delle tasse. È finita qui?',
    answer:
      'Non per forza. Una cifra con tasse da pagare spesso significa un reddito su cui è stato trattenuto poco o niente, come il lavoro con ABN, oppure deduzioni mancanti, perché qui non c’è dove inserirle.\n\nLe deduzioni riducono il reddito imponibile e possono ridurre una cifra da pagare, quindi vale la pena far controllare la situazione invece di dare il numero per definitivo.',
  },
  {
    question: 'Posso usare il calcolatore anche se sono già in Italia?',
    answer:
      'Sì. La tua posizione fiscale australiana dipende dai fatti del tuo anno in Australia, non da dove vivi adesso.\n\nIl calcolatore funziona uguale da Milano come da Sydney, e la tax return si può presentare da qualsiasi posto. Dopo la partenza cambia solo che anche la super diventa richiedibile con il DASP.',
  },
  {
    question: 'Cosa fa il calcolatore con la superannuation?',
    answer:
      'Applica l’aliquota DASP al saldo che inserisci e mostra quanto arriverebbe sul tuo conto. Per chiunque abbia mai avuto un visto 417 o 462 è il 65% sulla componente tassata del saldo (di solito quasi tutto), quindi da un saldo di 10.000\u00a0$ si ricevono circa 3.500\u00a0$.\n\nLa super è una richiesta separata dalla tax return, pagabile solo dopo che hai lasciato l’Australia e il visto è scaduto o è stato annullato.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'it',
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/it` },
    { '@type': 'ListItem', position: 2, name: 'Calcolatore', item: `${SITE_URL}/it/calculator` },
  ],
}

// No `offers` block. Prices appear nowhere on the public page, neither in the
// copy nor in the schema.
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Calcolatore rimborso tasse Australia per il Working Holiday',
  description:
    'Stima indicativa del rimborso fiscale australiano e della superannuation DASP per chi ha un visto Working Holiday, con le aliquote 2025-26.',
  url: `${SITE_URL}/it/calculator`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  inLanguage: 'it',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/it/calculator#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/it/calculator`,
}

export default function ItalianCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <CalculatorClient faqs={faqs} photo={<PagePhoto page="calculator" locale="it" priority />} />
      <Section eyebrow="E dopo la stima" title="La stima diventa una tax return" titleId="tax-return-next-title">
        <p className={blocks.text}>La cifra qui sopra è un punto di partenza. La tax return vera parte dal tuo record ATO e tiene conto di residenza fiscale, Medicare levy e deduzioni: se ci sia un rimborso, e di quanto, lo decide l’ATO.</p>
        <p className={blocks.text}>
          Ti chiedi quanto si recupera di solito? Perché una media non dice molto lo spiega la guida{' '}
          <Link href={itGuideHref('average-tax-refund-working-holiday')} className={blocks.textLink}>
            Quanto rimborso fiscale ottengono i backpacker?{itGuideSuffix('average-tax-refund-working-holiday')}
          </Link>
        </p>
        <LinkButton href="/it/dichiarazione-redditi-australia">Come funziona la tax return →</LinkButton>
      </Section>
      <MobileCta href={waUrl({ topic: 'calculator', lang: 'it' })} lang="it" topic="calculator" />
    </>
  )
}
