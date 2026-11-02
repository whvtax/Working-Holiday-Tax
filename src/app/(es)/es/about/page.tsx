import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { waUrl } from '@/lib/wa'
import { AboutView, type AboutCopy } from '@/components/wht/AboutBlocks'
import { Mark } from '@/components/wht/Type'
import { blocks } from '@/components/wht/Blocks'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Quiénes somos: solo visas 462 y 417',
  description: 'Los impuestos de la working holiday son lo único que hacemos. Todos nuestros clientes tienen una visa 462 o 417. Tu año, del primer payslip al regreso.',
  keywords: [
    'especialistas en impuestos working holiday',
    'ayuda con impuestos para mochileros Australia',
    'quién es Working Holiday Tax',
    'Working Holiday Tax es confiable',
    'Working Holiday Tax opiniones',
    'tax return Australia visa 462',
    'ayuda con tax return Australia',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/about`,
    languages: {
      'en-AU': `${SITE_URL}/about`,
      'de': `${SITE_URL}/de/about`,
      'ja': `${SITE_URL}/ja/about`,
      ...newLocaleLanguages('/about'),
      'x-default': `${SITE_URL}/about`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax: tax return en Australia' }],
    title: 'Quiénes somos | Working Holiday Tax',
    description: 'Un solo tipo de cliente: titulares de una visa working holiday 462 o 417. El año que vemos, del primer payslip al vuelo de regreso.',
    url: `${SITE_URL}/es/about`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'es_LA',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Quiénes somos | Working Holiday Tax',
    description: 'Los impuestos de la working holiday son lo único que hacemos. Todos nuestros clientes tienen una visa 462 o 417.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WA = waUrl({ topic: 'general', lang: 'es' })

/**
 * Igual que en inglés: la historia es el año de quien lee, no una historia de
 * empresa inventada. Cada frase tiene que ser literalmente cierta.
 */
const chapters = [
  {
    stage: 'La primera semana',
    title: 'Llegaste con un plan que cubría unas dos semanas',
    body: 'Un hostal, una SIM, una cuenta bancaria y un trabajo cuanto antes. El tax file number estaba en algún lugar de la lista. Nadie te explicó el año fiscal australiano.',
  },
  {
    stage: 'Tus primeros payslips',
    title: 'El primer trabajo empezó antes de que llegara el número',
    body: 'Sin un tax file number registrado, el empleador debe retener a la tasa máxima y no al 15 % que normalmente paga un working holiday maker. De esas primeras semanas te retienen casi la mitad del sueldo.\n\nEse dinero no vuelve solo.',
  },
  {
    stage: 'Hasta Navidad',
    title: 'Cuatro empleadores, la mitad casual, y ninguno te explicó nada',
    body: 'Un trabajo en el hostal, un café, tres semanas en un almacén y algo que dejaste sin recibir el último payslip. El año fiscal australiano termina en junio, no en diciembre.\n\nPerder los payslips no importa: lo que tus empleadores declararon lo vemos nosotros a través de la ATO.',
  },
  {
    stage: 'Los 88 días',
    title: 'Si los hiciste, te fuiste muy lejos para hacerlos',
    body: 'Hacia el oeste, o hacia el norte, o tres horas más allá de un pueblo del que nunca habías oído hablar.\n\nEl alojamiento salió de tu sueldo antes de que lo vieras, los payslips no se parecían a los de la ciudad, y es la parte del año de la que casi todos están menos seguros.',
  },
  {
    stage: 'El vuelo de regreso',
    title: 'Te fuiste y el dinero se quedó',
    body: 'La super solo se puede reclamar cuando ya saliste de Australia y la visa venció, así que la tuya sigue en un fondo que quizá no recuerdas haber elegido. El impuesto retenido de más en esas primeras semanas se concilia cuando se evalúa una declaración, y el resultado depende de tu año.',
  },
]

const faqs = [
  {
    question: '¿Con quién trabajan exactamente?',
    answer: 'Con working holiday makers y con nadie más. Todos nuestros clientes están en Australia con una visa 462 o 417, o lo estuvieron y ya volvieron a casa. No trabajamos con residentes australianos, estudiantes, trabajadores patrocinados ni empresas.',
  },
  {
    question: '¿Pueden ayudarme si ya salí de Australia?',
    answer: 'Sí, y buena parte de nuestro trabajo es justo eso. La super solo se puede reclamar después de irte y de que la visa haya vencido, y un año ya terminado se puede presentar desde cualquier lugar, así que todo se hace a distancia.',
  },
  {
    question: '¿Necesito mis payslips?',
    answer: 'No. Lo que tus empleadores retuvieron y declararon lo vemos nosotros a través de la ATO, así que trabajamos con ese registro y no con papeles de un trabajo que dejaste hace ocho meses. Si algo de lo que nos cuentas no coincide con lo que declaró un empleador, nos encargamos de la diferencia.',
  },
  {
    question: '¿Qué pasa si al final no hay devolución?',
    answer: 'Nuestra garantía: si tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes dinero a la ATO, se aplica la tarifa completa. No todos los años de working holiday terminan con una devolución, y preferimos decírtelo antes que aceptar el trabajo y esperar a ver qué pasa.',
  },
]

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/es/about#webpage`,
  url: `${SITE_URL}/es/about`,
  name: 'Quiénes somos | Working Holiday Tax',
  description: 'Los impuestos de la working holiday son lo único que hacemos. Todos nuestros clientes tienen una visa 462 o 417.',
  inLanguage: 'es',
  mainEntity: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.about-lead'] },
}

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
    { '@type': 'ListItem', position: 2, name: 'Quiénes somos', item: `${SITE_URL}/es/about` },
  ],
}

const copy: AboutCopy = {
  lang: 'es',
  wa: WA,
  homeHref: "/es",
  homeLabel: "Inicio",
  crumbsLabel: "Ruta de navegación",
  crumbLabel: "Quiénes somos",
  kicker: "Quiénes somos",
  h1: (
    <>
      Llegaste con un plan.<br />Nadie te habló de <Mark>los impuestos.</Mark>
    </>
  ),
  lead: "Los impuestos de la working holiday son lo único que hacemos. Si reconoces el año que sigue, puede valer la pena que revisemos tu situación de impuestos y super.",
  ctaHero: "Pregúntanos lo que quieras →",
  contactHref: "/es/contact",
  contactLabel: "Otras formas de contactarnos →",
  replyNote: "Respondemos normalmente en aproximadamente una hora en horario laboral.",
  yearEyebrow: "El año",
  yearTitle: "¿Cómo vemos nosotros un año de working holiday?",
  yearIntro: "Casi a todos los que tienen una visa 462 o 417 les pasan cinco cosas, y cuatro de ellas cuestan dinero que normalmente se puede recuperar después.",
  chapters,
  whyEyebrow: "Por qué existimos",
  whyTitle: "¿Por qué solo trabajamos con working holiday makers?",
  whyParas: [
    "Todos nuestros clientes tienen una visa 462 o 417, así que lo que decide tu devolución no son casos raros que haya que ir a consultar. Es lo que hacemos todo el día.",
    "Un asesor fiscal generalista ve a un mochilero unas pocas veces al año, en julio, entre doscientas declaraciones normales.",
    "La escala de impuestos de la 462 y la 417, la residencia fiscal que hay que revisar bien en lugar de dar por supuesta, la exención del Medicare levy, que depende del pasaporte que tengas, una solicitud de super presentado desde una habitación en Madrid, Buenos Aires, Santiago o Montevideo once meses después de irte: para nosotros es un martes cualquiera.",
    "Cualquiera puede enviar una declaración. El trabajo de verdad va antes: repasar tu año, averiguar qué es cierto en él en lugar de marcar lo más rápido, y solo entonces presentarlo.",
  ],
  guarantee: "Nuestra garantía: si tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes dinero a la ATO, se aplica la tarifa completa.",
  guaranteeNote: "No todos los años de working holiday terminan con una devolución, y si el tuyo probablemente no la tenga, te lo diremos.",
  talkEyebrow: "Hablar con nosotros",
  talkTitle: "¿Cómo te pones en contacto?",
  talkP1: "Por WhatsApp. Sin números de ticket ni formularios que prometen respuesta en cinco a siete días hábiles. Puedes hacer una sola pregunta y dejarlo ahí.",
  talkP2: (
    <>
      Para empezar no necesitas una cuenta de myGov, ni una identificación australiana, ni payslips, y da igual que sigas en Australia o que lleves dos años en casa. La{' '}
      <Link href="/es/contact" className={blocks.textLink}>página de contacto</Link>{' '}
      explica en qué idioma te contestamos y qué pasa después.
    </>
  ),
  ctaSection: "Escríbenos por WhatsApp →",
  reviewsEyebrow: "En sus propias palabras",
  reviewsTitle: "Lo que dicen los working holiday makers",
  faqEyebrow: "Preguntas frecuentes",
  faqTitle: "Preguntas que nos hacen antes de escribirnos",
  faqIntro: "¿Algo más? Pregúntalo por WhatsApp, es más rápido que leer.",
  faqs,
  closingEyebrow: "Cuando quieras",
  closingTitle: "Cuéntanos tu año",
  closingText: "Dónde trabajaste, más o menos cuándo y si ya te fuiste. Con eso podemos decirte qué vale la pena reclamar.",
  ctaFooter: "Escríbenos por WhatsApp →",
}

export default function SpanishAboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutView t={copy} />
    </>
  )
}
