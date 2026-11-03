import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { PagePhoto } from '@/components/wht/PagePhoto'
import { CalculatorClient } from './CalculatorClient'
import { MobileCta } from '@/components/ui/MobileCta'

export const metadata: Metadata = {
  title: { absolute: 'Calculadora de devolución de impuestos Australia 2025-26' },
  description:
    'Calcula una devolución orientativa de impuestos en Australia y cuánto vale tu super tras el 65 % del DASP. Tasas actuales de la 462 y 417.',
  keywords: [
    'calculadora devolución de impuestos Australia',
    'calculadora tax return Australia',
    'calculadora impuestos Australia working holiday',
    'cuánto me devuelven de impuestos en Australia',
    'calculadora devolución impuestos visa 462',
    'calculadora devolución impuestos visa 417',
    'calculadora super DASP',
    'cuánto recupero de la super Australia',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/calculator`,
    languages: {
      'en-AU': `${SITE_URL}/calculator`,
      'de': `${SITE_URL}/de/calculator`,
      'ja': `${SITE_URL}/ja/calculator`,
      ...newLocaleLanguages('/calculator'),
      'x-default': `${SITE_URL}/calculator`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Calculadora de devolución de impuestos de Australia' }],
    type: 'website',
    locale: 'es_LA',
    url: `${SITE_URL}/es/calculator`,
    siteName: 'Working Holiday Tax',
    title: 'Calculadora de devolución de impuestos Australia 2025-26',
    description: 'Una devolución orientativa y tu super después del 65 % del DASP, con las tasas actuales de la 462 y 417.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Calculadora de devolución de impuestos Australia',
    description: 'Una devolución orientativa y tu super después del 65 % del DASP.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'Ya tengo la cifra. ¿Puedo presentarla por mi cuenta?',
    answer:
      'Puedes, y presentarla es de verdad la parte fácil. Lo que una estimación no puede hacer es cambiar la cifra, porque es aritmética sobre los números que ya tienes.\n\nTres valoraciones deciden el resultado real y ninguna es un campo de esta página: qué residencia fiscal es la cierta en tu caso, si el Medicare levy debió cobrarse alguna vez y qué puede deducir tu tipo de trabajo.',
  },
  {
    question: '¿Qué precisión tiene esta calculadora?',
    answer:
      'Es aritmética precisa sobre las cifras que escribes, y nada más. Aplica las tasas 2025-26 de working holiday makers y de residentes fiscales australianos a los ingresos y retenciones que escribes. Toma el número como punto de partida y no como respuesta final.',
  },
  {
    question: '¿Qué tasas usa la calculadora?',
    answer:
      'Usa las escalas 2025-26 que publica la ATO, según la situación que elijas. Cuál te corresponde en realidad es una valoración de tus circunstancias individuales, no una opción que se elige, y la decide la ATO. Nuestro equipo lo revisa como parte de la preparación.',
  },
  {
    question: '¿Por qué la calculadora no incluye el Medicare levy?',
    answer:
      'Porque si el levy se aplica a tu año depende de tu situación individual, y una calculadora no lo puede resolver.\n\nPor eso se trata en la revisión, donde nuestro equipo lo comprueba y la decisión final es de la ATO.',
  },
  {
    question: 'La calculadora dice que debo impuestos. ¿Es definitivo?',
    answer:
      'Normalmente no. Una cifra con impuestos a pagar casi siempre indica ingresos con poca o ninguna retención, como el trabajo con ABN, o deducciones que faltan, porque aquí no hay dónde ingresarlas.\n\nLas deducciones reducen el ingreso imponible y pueden convertir un monto a pagar en una devolución, así que conviene revisar tu situación en lugar de dar el número por definitivo.',
  },
  {
    question: '¿Puedo usar la calculadora si ya volví a mi país?',
    answer:
      'Sí. Tu situación fiscal en Australia depende de los hechos de tu año allí y la decide la ATO, no el lugar donde vives ahora.\n\nLa calculadora funciona igual desde Madrid, Buenos Aires, Santiago o Montevideo, y un tax return se puede presentar desde cualquier lugar. Lo que cambia al irte es que tu super también se puede reclamar mediante el DASP. Tu declaración de impuestos en tu país es un asunto aparte: consulta con la oficina tributaria de tu país.',
  },
  {
    question: '¿Qué hace la calculadora con la cifra de la super?',
    answer:
      'Aplica la tasa de retención del DASP al saldo que escribes y muestra lo que llegaría a tu cuenta. Para quien haya tenido alguna vez una visa 462 o 417 esa tasa es del 65 % sobre el componente imponible, de modo que un saldo de 10.000 AUD paga unos 3.500 AUD.\n\nLa super es un reclamo aparte de tu tax return y solo se paga cuando ya saliste de Australia y tu visa venció o fue cancelada.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'es',
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
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/es` },
    { '@type': 'ListItem', position: 2, name: 'Calculadora', item: `${SITE_URL}/es/calculator` },
  ],
}

// Sin bloque `offers`: el precio no aparece en la web pública, ni en el texto ni en el esquema.
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Calculadora de devolución de impuestos de Australia',
  description:
    'Estimación orientativa de la devolución de impuestos de Australia y de la super (DASP) para titulares de una visa working holiday, con las tasas 2025-26.',
  url: `${SITE_URL}/es/calculator`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  inLanguage: 'es',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/es/calculator#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/es/calculator`,
}

export default function SpanishCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <CalculatorClient faqs={faqs} photo={<PagePhoto page="calculator" locale="es" priority />} />
      <MobileCta href={waUrl({ topic: 'calculator', lang: 'es' })} lang="es" topic="calculator" />
    </>
  )
}
