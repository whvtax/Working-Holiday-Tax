import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { waUrl } from '@/lib/wa'
import { ContactView, type ContactCopy } from '@/components/wht/ContactBlocks'
import { Mark } from '@/components/wht/Type'
import { EMAIL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contacto: escríbenos por WhatsApp',
  description: 'Escríbenos por WhatsApp y te respondemos normalmente en aproximadamente una hora en horario laboral. Sin myGov, sin identificación australiana, sin payslips.',
  keywords: [
    'contacto Working Holiday Tax',
    'ayuda con impuestos Australia working holiday',
    'ayuda tax return Australia',
    'ayuda con el TFN Australia',
    'devolución de impuestos Australia ayuda',
    'recuperar la super Australia ayuda',
    'WhatsApp ayuda impuestos Australia',
    'tax return Australia desde España',
    'tax return Australia desde Argentina',
    'tax return Australia desde Chile',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/contact`,
    languages: {
      'en-AU': `${SITE_URL}/contact`,
      'de': `${SITE_URL}/de/contact`,
      'ja': `${SITE_URL}/ja/contact`,
      ...newLocaleLanguages('/contact'),
      'x-default': `${SITE_URL}/contact`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax: tax return en Australia' }],
    title: 'Contacto | Working Holiday Tax',
    description: 'WhatsApp es la forma más rápida de escribirnos. Respondemos normalmente en aproximadamente una hora en horario laboral.',
    url: `${SITE_URL}/es/contact`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'es_LA',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Contacto | Working Holiday Tax',
    description: 'Escríbenos por WhatsApp. Respondemos normalmente en aproximadamente una hora en horario laboral.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'contact', lang: 'es' })

/** Las cuatro cosas que frenan a alguien antes de mandar el mensaje. */
const blockers: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: '¿Pueden ayudarme si ya salí de Australia?',
    a: 'Sí, y mucho de nuestro trabajo es justo eso. Una declaración de un año ya terminado se puede presentar desde cualquier lugar, y la super solo se puede reclamar cuando ya te fuiste y la visa venció.\n\nUna cosa que conviene saber pronto: la ATO solo puede pagar la devolución de impuestos en una cuenta bancaria australiana, mientras que la super puede pagarse en el extranjero. Cuéntanos si ya cerraste la tuya.',
  },
  {
    q: '¿Necesito una cuenta de myGov?',
    a: 'No. No tendrás que entrar a myGov, vincular una identificación australiana ni averiguar qué formulario es cuál. Nosotros tratamos directamente con la ATO.\n\nSi ya lo intentaste y te quedaste atascado en la verificación de identidad, eso no cambia nada.',
  },
  {
    q: '¿Necesito mis payslips?',
    a: 'No, y no hay nada que juntar antes de escribirnos. Lo que tus empleadores retuvieron y declararon lo vemos nosotros a través de la ATO, así que si no tienes nada, escríbenos igual.',
    link: { href: '/es/about', label: 'Por qué partimos del registro de la ATO' },
  },
  {
    q: '¿Es de confianza?',
    a: 'Tu declaración la revisa y aprueba un agente fiscal registrado antes de presentarse ante la ATO. Las condiciones que aceptarías están publicadas completas en nuestro acuerdo con el cliente (en inglés), y las reseñas de nuestro perfil de Google son de working holiday makers con quienes hemos trabajado.',
    link: { href: '/client-agreement', label: 'Leer el acuerdo con el cliente (en inglés)' },
  },
]

const FAQS = [
  {
    question: '¿En cuánto tiempo responden?',
    answer: 'En horario laboral, de lunes a viernes de 9:00 a 18:00, solemos responder en aproximadamente una hora. Fuera de ese horario, te respondemos a primera hora del siguiente día hábil. Si tu pregunta necesita una comprobación previa, te lo decimos de inmediato.',
  },
  {
    question: '¿Cuesta algo hacer una pregunta?',
    answer: 'Preguntar es gratis, y puedes preguntar todo lo que quieras antes de decidir nada. El servicio tiene una tarifa fija, nunca un porcentaje de tu devolución, y te la confirmamos por WhatsApp antes de empezar a trabajar.',
  },
  {
    question: '¿En qué idioma me responden?',
    answer: 'En el que nos escribas. Español, inglés o el idioma en que prefieras explicar tu situación, y en ese mismo te contestamos.',
  },
  {
    question: '¿Tengo que enviar documentos de inmediato?',
    answer: 'No. Manda primero solo la pregunta y nada más. Te respondemos y, si hay trabajo que valga la pena, te decimos cuál es y cuánto cuesta antes de que empiece nada.\n\nLos documentos vienen después, cuando decidas seguir adelante, y te explicamos cuáles son y cómo enviarlos de forma segura.',
  },
  {
    question: '¿Y si no me devuelven nada?',
    answer: 'Nuestra garantía: si tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes dinero a la ATO, se aplica la tarifa completa. La garantía cubre solo las declaraciones con ingresos con TFN. No todos los años de working holiday terminan con una devolución, y si el tuyo parece no tenerla, preferimos decírtelo pronto antes que aceptar el trabajo y esperar a ver qué pasa.',
  },
  {
    question: '¿Pueden ayudarme desde España, Argentina, Chile o Uruguay?',
    answer: 'Sí. Un tax return australiano, una solicitud de super y cualquier cosa que siga abierta con la ATO se pueden gestionar desde otro país, completamente por internet.\n\nTu declaración de impuestos en tu país de origen es un asunto aparte: para eso, consulta con la oficina tributaria de tu país. Nosotros solo nos ocupamos de los impuestos de Australia.',
  },
]

const contactPageLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/es/contact#webpage`,
  url: `${SITE_URL}/es/contact`,
  name: 'Contacto | Working Holiday Tax',
  description: 'Escríbenos por WhatsApp y te respondemos normalmente en aproximadamente una hora en horario laboral.',
  inLanguage: 'es',
  isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.contact-lead'] },
  mainEntity: { '@id': `${SITE_URL}/#business` },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/es` },
    { '@type': 'ListItem', position: 2, name: 'Contacto', item: `${SITE_URL}/es/contact` },
  ],
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'es',
  mainEntity: [...blockers.map(b => ({ question: b.q, answer: b.a })), ...FAQS.map(f => ({ question: f.question, answer: f.answer }))]
    .map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
}

const copy: ContactCopy = {
  lang: 'es',
  wa: WA,
  email: EMAIL,
  mailtoHref: `mailto:${EMAIL}?subject=Consulta%20de%20impuestos%20desde%20la%20web`,
  homeHref: "/es",
  homeLabel: "Inicio",
  crumbsLabel: "Ruta de navegación",
  crumbLabel: "Contacto",
  kicker: "Contacto",
  h1: <>Escríbenos por <Mark>WhatsApp</Mark></>,
  lead: "Escríbenos por WhatsApp y te respondemos normalmente en aproximadamente una hora en horario laboral.",
  ctaHero: "Abrir WhatsApp →",
  hours: "De lunes a viernes, de 9:00 a 18:00",
  blockersEyebrow: "Antes de preguntar",
  blockersTitle: "Las cuatro cosas que todos revisan primero",
  blockers,
  otherEyebrow: "Otras formas",
  otherTitle: "Si WhatsApp no te va bien",
  otherIntro: "El correo funciona y las redes sociales también, solo que son más lentos.",
  emailLabel: "Correo electrónico",
  hoursTitle: "Horario laboral",
  faqEyebrow: "Preguntas frecuentes",
  faqTitle: "Todo lo demás que nos preguntan",
  faqs: FAQS,
  closingEyebrow: "Cuando quieras",
  closingTitle: "Manda la pregunta. Ese es todo el primer paso.",
  closingText: "Dónde trabajaste, más o menos cuándo y si ya saliste de Australia. Con eso podemos decirte qué vale la pena reclamar.",
  ctaFooter: "Escríbenos por WhatsApp →",
}

export default function SpanishContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <ContactView t={copy} />
    </>
  )
}
