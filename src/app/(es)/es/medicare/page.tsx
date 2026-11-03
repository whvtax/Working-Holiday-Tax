import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, TitleLinks, coreBlocks } from '@/components/wht/CoreBlocks'
import { guideHref, guideText } from '../_blog-links'

/*
 * Medicare levy, versión sencilla en español. Si se aplica depende de la
 * situación individual y lo decide la ATO; lo revisamos caso por caso.
 */

const WA = waUrl({ topic: 'medicare', lang: 'es' })

export const metadata: Metadata = {
  title: { absolute: 'Medicare levy en Australia con visa 462 y 417' },
  description:
    'El Medicare levy se revisa al preparar tu tax return. Si se aplica a tu año depende de tu situación individual y lo decide la ATO.',
  keywords: [
    'Medicare levy Australia working holiday',
    'exención Medicare levy mochilero',
    'Medicare levy visa 462',
    'Medicare levy visa 417',
    'Medicare Entitlement Statement',
    'pagan Medicare los working holiday',
    'acuerdo de salud recíproco Australia',
    'Medicare exemption working holiday',
    'Medicare levy exemption certificate',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/medicare`,
    languages: {
      'en-AU': `${SITE_URL}/medicare`,
      de: `${SITE_URL}/de/medicare`,
      ja: `${SITE_URL}/ja/medicare`,
      ...newLocaleLanguages('/medicare'),
      'x-default': `${SITE_URL}/medicare`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-medicare.png`, width: 1200, height: 630, alt: 'Medicare levy para titulares de visa working holiday en Australia' }],
    type: 'website',
    locale: 'es_LA',
    url: `${SITE_URL}/es/medicare`,
    siteName: 'Working Holiday Tax',
    title: 'Medicare levy en Australia con visa 462 y 417',
    description: 'Si el levy se aplica a tu año depende de tu situación individual. Lo revisamos al preparar tu tax return.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-medicare.png`],
    card: 'summary_large_image',
    title: 'Medicare levy para titulares de visa working holiday',
    description: 'Si el levy se aplica a tu año depende de tu situación individual. Lo revisamos al preparar tu tax return.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// Las respuestas de más de unas 55 palabras llevan una línea en blanco, y el FAQ
// de abajo pinta un <p> por párrafo. faqSchema usa el texto crudo, así que los
// datos estructurados no cambian.
const faqs = [
  {
    question: '¿Cuánto representa el Medicare levy?',
    answer:
      'El levy es un porcentaje del ingreso imponible. Si se aplica a tu año, y en qué medida, depende de tu situación individual y lo decide la ATO. Se liquida cuando se evalúa tu tax return, no se descuenta de tu sueldo semana a semana.',
  },
  {
    question: '¿Todos los titulares de visa 462 o 417 están en la misma situación?',
    answer:
      'No necesariamente. Depende de tu situación individual, no solo de tu visa, y no es algo que convenga dar por supuesto. Nuestro equipo lo revisa caso por caso como parte de tu tax return, y la decisión final es de la ATO.',
  },
  {
    question: '¿Qué es un Medicare Entitlement Statement?',
    answer:
      'Es un documento de Services Australia que puede respaldar una exención cuando corresponde. Nos ocupamos de ese trámite como parte de tu tax return, y te decimos qué necesitamos de ti.',
  },
  {
    question: '¿La situación puede cambiar a lo largo del año?',
    answer:
      'Puede ser. Cada año se revisa por separado y los hechos del año pueden importar, por ejemplo cuándo llegaste. Por eso lo revisamos como parte de la preparación y no lo damos por supuesto.',
  },
  {
    question: '¿El seguro de viaje o el seguro de salud privado cambian algo?',
    answer:
      'No. El levy depende del derecho al sistema público, no de si tienes seguro, así que ni el seguro de viaje ni la cobertura hospitalaria privada influyen.\n\nEl seguro privado cuenta para otro cargo, el Medicare levy surcharge, que se aplica a ingresos altos y rara vez es relevante en un año de working holiday.',
  },
  {
    question: '¿Qué pasa si ya me descontaron el levy durante el año?',
    answer:
      'El levy se calcula cuando se evalúa tu tax return, no cuando te pagan, así que lo que salió de tu sueldo fue impuesto retenido en general, no el levy en concreto.\n\nSi un año anterior se presentó sin revisar este punto, a veces se puede corregir dentro del plazo de la ATO. Escríbenos y lo vemos.',
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
    { '@type': 'ListItem', position: 2, name: 'Medicare', item: `${SITE_URL}/es/medicare` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/es/medicare#service`,
  name: 'Revisión del Medicare levy para titulares de visa working holiday',
  serviceType: 'Revisión del Medicare levy',
  description:
    'Revisión del Medicare levy dentro del tax return de working holiday para titulares de visas 462 y 417.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Titular de visa working holiday (subclass 462 / 417)' },
  inLanguage: 'es',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/es/medicare#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/es/medicare`,
}

// Las guías pasan por guideHref/guideText (_blog-links.ts): si la guía aún no existe en
// español, se enlaza la versión en inglés y se avisa en el texto.
const GUIDES = [
  { href: guideHref('medicare-levy-working-holiday-makers'), label: guideText('medicare-levy-working-holiday-makers', 'El Medicare levy para working holiday makers') },
  { href: guideHref('countries-with-medicare-agreement-australia'), label: guideText('countries-with-medicare-agreement-australia', 'Qué países tienen un acuerdo de salud con Australia') },
  { href: guideHref('what-is-medicare-working-holiday-makers'), label: guideText('what-is-medicare-working-holiday-makers', 'Qué es Medicare y quién está cubierto de verdad') },
  { href: guideHref('private-health-insurance-working-holiday-australia'), label: guideText('private-health-insurance-working-holiday-australia', '¿Cambia el seguro de salud privado el levy?') },
]

export default function MedicarePageES() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className={blocks.underHeader}>
        <Crumb home="Inicio" current="Medicare" label="Ruta de navegación" href="/es" />
        <Hero
          eyebrow="Para la 462 y la 417"
          title={<>Medicare levy: <Mark>qué se aplica en tu caso</Mark></>}
        >
          <div className="hero-sub">
            <Lead>Depende de tu situación individual y lo decide la ATO. Nosotros lo revisamos al preparar tu tax return.</Lead>
          </div>
          <div className={coreBlocks.actions}>
            <WaButton href={WA} position="hero" topic="medicare" lang="es">Consulta tu caso</WaButton>
            <a href="#who-is-exempt" className={coreBlocks.hint}>Cómo lo revisamos</a>
          </div>
          <p className={heroStyles.note}>Respondemos en cerca de una hora.</p>
        </Hero>
      </div>

      <PhotoFrame page="medicare" locale="es" />

      <Section tone="pale" title="¿Por qué aparece el levy en tu evaluación?" titleId="why-title">
        <p className={blocks.text}>
          Porque es lo que se aplica por defecto cuando se evalúa la declaración. Si corresponde o no en tu caso
          depende de tu situación individual, y no es algo que convenga dar por supuesto.
        </p>
        <p className={blocks.text}>
          El error contrario también existe: presentar algo sin la documentación que lo respalde. Nos ocupamos de ese trámite
          como parte de tu tax return.
        </p>
        <p className={blocks.text}>
          El levy se calcula al final del año y nunca aparece en un payslip.
        </p>
      </Section>

      <Section id="who-is-exempt" title="¿Cómo revisamos tu caso?" titleId="exempt-title">
        <p className={blocks.text}>
          Si el levy se aplica a tu año depende de tu situación individual, y no de una sola regla. Australia tiene
          acuerdos de salud recíprocos con algunos países, y eso es solo un dato de contexto: lo que se aplica en tu
          caso se revisa caso por caso, y la decisión final es de la ATO.
        </p>
        <div className={blocks.cards}>
          <div className={`${blocks.palePanel} ${blocks.stack}`}>
            <h3 className={blocks.cardTitle}>Lo que revisamos</h3>
            <p className={blocks.text}>
              Los hechos de tu año, tus documentos y cómo estuvo cada período, para que el levy se aplique
              como corresponde.
            </p>
          </div>
          <div className={`${blocks.palePanel} ${blocks.stack}`}>
            <h3 className={blocks.cardTitle}>Lo que haces tú</h3>
            <p className={blocks.text}>
              Nos mandas tus datos por WhatsApp. El resto lo hacemos nosotros.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="amber" title="¿Qué hacemos nosotros?" titleId="do-title">
        <p className={blocks.text}>Revisamos tu situación con Medicare como parte de la preparación de tu tax return.</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Nuestra garantía: si tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes dinero a la ATO, se aplica la tarifa completa.
        </p>
        <p className={blocks.text}>Revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO.</p>
        <div className={blocks.stack}>
          <WaButton href={WA} position="section" topic="medicare" lang="es" size="md">Escríbenos por WhatsApp</WaButton>
          <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Respondemos en cerca de una hora.</p>
        </div>
      </Section>

      <Section title="Preguntas frecuentes sobre el levy y la exención" titleId="faq-title">
        {/* El Accordion divide las respuestas por línea en blanco; faqSchema usa el texto crudo. */}
        <Accordion items={faqs} />
      </Section>

      <Section tone="pale" title="Profundiza en Medicare y el seguro de salud" titleId="guides-title">
        <TitleLinks items={GUIDES} />
      </Section>

      <Section eyebrow="Lo siguiente" title="El Medicare levy es una parte del tax return, no todo" titleId="next-title">
        <p className={blocks.text}>Tu residencia fiscal y tus deducciones también cuentan. Todo se revisa junto.</p>
        <LinkButton href="/es/tax-return">Cómo se prepara el tax return</LinkButton>
      </Section>

      <Section tone="forest" title="Consulta tu caso" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Depende de tu situación individual.</p>
        <WaButton href={WA} position="footer" topic="medicare" lang="es" tone="light">Escríbenos por WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Respondemos en cerca de una hora.</p>
      </Section>

      <MobileCta href={WA} lang="es" topic="medicare" />
    </>
  )
}
