import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { WaButton } from '@/components/wht/WaButton'
import { LinkButton } from '@/components/wht/Button'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { Figures, LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { Crumbs, PhotoBand, tb } from '@/components/wht/TfnAbnBlocks'
import { guideHref, guideText } from '../_blog-links'

// Metadata en español. Esta página trata de las semanas entre el primer día de
// trabajo y el momento en que el TFN llega al empleador. Sin precio y sin
// mencionar supervisión de agentes en el título.
export const metadata: Metadata = {
  // El layout raíz añade " | Working Holiday Tax" al título.
  title: { absolute: 'TFN Australia: cómo obtenerlo gratis con visa 462' },
  description:
    'Pedir el TFN es gratis. Lo que cuesta es trabajar sin él: tu empleador retiene el 45 % en lugar del 15 %. Visa 462 y 417.',
  keywords: [
    'TFN Australia',
    'cómo sacar el TFN en Australia',
    'solicitar el TFN working holiday',
    'Tax File Number Australia',
    'TFN visa 462',
    'TFN visa 417',
    'TFN para mochileros',
    'trabajar sin TFN Australia',
    'sin TFN 45 % de impuesto',
    'cuánto tarda el TFN',
    'TFN Work and Holiday',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/tfn`,
    languages: {
      'en-AU': `${SITE_URL}/tfn`,
      de: `${SITE_URL}/de/tfn`,
      ja: `${SITE_URL}/ja/tfn`,
      ...newLocaleLanguages('/tfn'),
      'x-default': `${SITE_URL}/tfn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tfn.png`, width: 1200, height: 630, alt: 'Solicitud del TFN para titulares de una visa working holiday en Australia' }],
    type: 'website',
    locale: 'es_LA',
    url: `${SITE_URL}/es/tfn`,
    siteName: 'Working Holiday Tax',
    title: 'TFN en Australia: evita las semanas al 45 %',
    description:
      'El número es gratis. Las semanas sin él, no. Preparamos y presentamos tu solicitud del TFN para que salga bien a la primera, con visa 462 o 417.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tfn.png`],
    card: 'summary_large_image',
    title: 'TFN en Australia: evita las semanas al 45 %',
    description: 'El número es gratis. Las semanas antes de que tu empleador lo tenga, no.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// --- COPY ---------------------------------------------------------------

/** Los tres puntos donde falla de verdad una solicitud de TFN con visa working holiday. */
const FAILURE_POINTS = [
  {
    n: '01',
    title: 'El nombre del formulario no coincide con el que tiene inmigración',
    body: 'La ATO cruza tu solicitud con el registro de tu visa. Un segundo nombre que falta, un pasaporte renovado o los nombres en otro orden pueden hacer que la rechacen.',
  },
  {
    n: '02',
    title: 'En cuatro semanas ya no vivirás en esa dirección',
    body: 'El TFN llega por carta a una dirección en Australia, y la emisión puede tardar hasta 28 días. Si ya te mudaste, nadie te la reenvía.',
  },
  {
    n: '03',
    title: 'Se presentó antes de que la visa estuviera activa',
    body: 'Se solicita ya dentro de Australia, con la visa activada, no antes de volar. Las solicitudes demasiado tempranas no llegan a ninguna parte y te enteras semanas después, con el 45 % ya retenido.',
  },
]

/** Lo que hace el servicio con ese hueco. Nada de aquí es una promesa de plazos. */
const WHAT_WE_DO = [
  {
    title: 'Primero comprobamos que tu visa esté activa',
    body: 'Una pregunta de un minuto que evita el mes perdido más común.',
  },
  {
    title: 'Cruzamos tus datos con tu registro de inmigración',
    body: 'Pasaporte, orden de los nombres, fecha de nacimiento y concesión de la visa, revisados entre sí antes de presentar.',
  },
  {
    title: 'Resolvemos contigo el tema de la dirección',
    body: 'Dónde estarás dentro de cuatro semanas, y qué hacer si la respuesta es una granja o una van.',
  },
  {
    title: 'Insistimos si se atasca',
    body: 'La ATO tiene 28 días. Pasado ese plazo, alguien tiene que llamarlos, y no serás tú.',
  },
  {
    title: 'Le decimos a tu empleador qué hacer mientras tanto',
    body: 'El número de referencia de la solicitud del TFN, bien indicado, evita que los primeros payslips se graven con la tasa más alta.',
  },
  {
    title: 'Recuperamos la diferencia al final del año',
    body: 'Lo que ya se retuvo al 45 % solo vuelve a través de un tax return, y solo si el tax return lo refleja.',
  },
]

// Las respuestas de más de unas 55 palabras llevan una línea en blanco, y el FAQ
// de abajo pinta un <p> por párrafo. faqLd usa el texto crudo, así que el schema no cambia.
const FAQS = [
  {
    question: '¿Puedo pedir el TFN por mi cuenta?',
    answer:
      'Sí, y el formulario es corto y gratuito.\n\nLo que cobramos es el trabajo que lo rodea: cruzar tus datos con el registro de inmigración, elegir una dirección que siga recibiendo correo dentro de cuatro semanas y darle a tu empleador el número de referencia para que los primeros pagos no se retengan al 45 %.',
  },
  {
    question: 'Pedir el TFN es gratis en la web de la ATO. ¿Entonces por qué pago?',
    answer:
      'El número en sí es gratis. Lo que cuesta dinero es ese período: cada pago anterior al momento en que tu empleador tiene el número se retiene al 45 % en lugar del 15 %. Cobramos por cerrar ese hueco y por recuperar lo que ya se fue.',
  },
  {
    question: '¿Qué pasa si empiezo a trabajar sin TFN?',
    answer:
      'Tu empleador debe retener el 45 % en lugar del 15 % que corresponde a los titulares de una visa working holiday, hasta que le des un Tax File Number, y tienes 28 días desde que empiezas el trabajo. En un empleo de 25 AUD la hora, son unos 7,50 AUD por hora que van a la ATO en lugar de a ti.\n\nEl dinero no se pierde, pero solo vuelve a través de un tax return presentado correctamente después de que termine el año fiscal.',
  },
  {
    question: 'Llevo semanas trabajando sin TFN. ¿Ya es tarde?',
    answer:
      'No. Pídelo ahora para que la tasa más alta deje de aplicarse a tus próximos pagos. El exceso ya retenido vuelve cuando se presenta el tax return de ese año fiscal.\n\nNormalmente podemos tener la solicitud lista el mismo día que nos escribes. Dinos cuántas semanas ya se pagaron al 45 %, porque eso cambia lo que debe decir tu tax return.',
  },
  {
    question: '¿Cuánto tarda en llegar el TFN?',
    answer:
      'La ATO indica que procesa las solicitudes de TFN en un plazo de 28 días, y la mayoría de los titulares de visa working holiday lo reciben entre dos y cuatro semanas. Llega por carta a la dirección australiana de la solicitud. Mientras esperas, tu empleador necesita el número de referencia de la solicitud.',
  },
  {
    question: '¿Puedo pedir el TFN antes de llegar a Australia?',
    answer:
      'Con una visa working holiday, no. Se solicita cuando ya estás en Australia con tu visa 462 o 417 activada, porque la solicitud se cruza con tu registro de llegada y de visa. También necesitas una dirección postal en Australia para recibir la carta.',
  },
  {
    question: '¿Necesito un TFN nuevo para una visa de segundo año?',
    answer:
      'No. El Tax File Number se emite una sola vez y es tuyo para siempre: sirve en una segunda o tercera visa working holiday, si cambias de tipo de visa y aunque hayas salido de Australia un tiempo.\n\nSi lo que pasa es que lo perdiste, no que nunca lo tuviste, es otro problema, y más rápido de resolver. Cuéntanos cuál es tu caso.',
  },
]

// Las guías pasan por guideHref/guideText (_blog-links.ts): si la guía aún no existe en
// español, se enlaza la versión en inglés y se avisa en el texto.
const GUIDES = [
  {
    href: guideHref('what-happens-without-your-tfn'),
    title: guideText('what-happens-without-your-tfn', 'Qué pasa si trabajas sin TFN'),
    desc: 'La retención del 45 %, la ventana de 28 días y cómo vuelve el dinero.',
  },
  {
    href: guideHref('tfn-reference-number-before-tfn-arrives'),
    title: guideText('tfn-reference-number-before-tfn-arrives', 'El número de referencia de la solicitud'),
    desc: 'Qué darle a tu empleador mientras esperas la carta.',
  },
  {
    href: guideHref('how-long-does-it-take-to-get-a-tfn'),
    title: guideText('how-long-does-it-take-to-get-a-tfn', 'Cuánto tarda el TFN'),
    desc: 'Lo que promete la ATO, lo que suele pasar y cuándo conviene insistir.',
  },
]

const WA_TFN = waUrl({ topic: 'tfn', lang: 'es' })

export default function TFNPageES() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/es/tfn#webpage`,
    url: `${SITE_URL}/es/tfn`,
    name: 'TFN para una visa working holiday',
    description:
      'Lo que cuesta empezar a trabajar antes de que tu Tax File Number llegue a tu empleador, por qué fallan las solicitudes de TFN y cómo vuelve el exceso retenido.',
    inLanguage: 'es',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/es/tfn#service`,
    name: 'Solicitud del TFN para titulares de visa working holiday',
    serviceType: 'Solicitud de Tax File Number',
    description:
      'Solicitudes de Tax File Number preparadas y presentadas para titulares de visas working holiday 462 y 417, con el número de referencia para el empleador y seguimiento ante la ATO.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Titular de visa working holiday (subclass 462 y 417)' },
    inLanguage: 'es',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'es',
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
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/es` },
      { '@type': 'ListItem', position: 2, name: 'TFN', item: `${SITE_URL}/es/tfn` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* -- 1. HERO -------------------------------------------------------- */}
      {/* El kicker va dentro del H1 para que el encabezado lleve las palabras que la gente busca. */}
      <div className={blocks.underHeader}>
        <Crumbs homeHref="/es" home="Inicio" current="TFN" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>Solicitud del TFN&nbsp;&middot; visas working holiday 462 y 417</span>
            El número es gratis.<br />
            Las semanas <Mark>sin él</Mark>, no.
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              Hasta que tu empleador tenga el número, te retienen el 45 % de lo que ganas en lugar del 15 %.
            </Lead>
          </div>
          <WaButton href={WA_TFN} position="hero" topic="tfn" lang="es">Escríbenos por WhatsApp</WaButton>
          <p className={heroStyles.note}>Respondemos en cerca de una hora.</p>
          <GoogleRating variant="pill" lang="es" />
        </Hero>
        <PhotoBand page="tfn" locale="es" />
      </div>

      <Section width="wide" title="¿Cuánto cuesta empezar a trabajar antes de que llegue tu TFN?" titleId="gap-title">
        <p className={blocks.text}>
          Si tu empleador no tiene tu TFN en un plazo de 28 días, debe retener el 45 % en lugar del 15 % que
          corresponde a los titulares de una visa working holiday. El impuesto de más no se pierde y puede volver
          cuando presentes tu tax return después del 30 de junio.
        </p>
        <Figures
          items={[
            { figure: '45 %', body: 'Se retiene de cada dólar mientras no hay TFN registrado, en lugar del 15 %.' },
            { figure: '28 días', body: 'Para darle tu TFN a tu empleador, y para que la ATO lo emita.' },
            { figure: '1 tax return', body: 'La única vía para recuperar lo que ya se retuvo a una tasa equivocada.' },
          ]}
        />
      </Section>

      <Section tone="pale" eyebrow="Hacerlo por tu cuenta" title="¿Por qué fallan las solicitudes de TFN con visa working holiday?" titleId="fail-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          El formulario es corto. Cada una de estas tres formas de equivocarse puede costarte otro mes con el 45 %.
        </p>
        <Steps items={FAILURE_POINTS} />
      </Section>

      <Section eyebrow="El trabajo" title="Qué hacemos nosotros" titleId="work-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Tú nos mandas tus datos por WhatsApp. Todo lo de abajo pasa de nuestro lado.
        </p>
        <div className={tb.pairs}>
          {WHAT_WE_DO.map(c => (
            <div key={c.title} className={blocks.palePanel}>
              <h3 className={blocks.cardTitle}>{c.title}</h3>
              <p className={blocks.text}>{c.body}</p>
            </div>
          ))}
        </div>
        <p className={blocks.statement}>
          No tendrás que entrar a myGov, vincular una identidad ni averiguar qué formulario es cuál. Nos entendemos con la ATO directamente.
        </p>
        <p className={blocks.text}>
          ¿Ya tienes el número y quieres recuperar las semanas al 45 %?{' '}
          <Link href="/es/tax-return" className={tb.inlineLink}>Eso es el tax return</Link>.
        </p>
      </Section>

      {/* La única banda ámbar: la garantía. */}
      <Section tone="amber" title="Nuestra garantía" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Nuestra garantía: si tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes dinero a la ATO, se aplica la tarifa completa.
        </p>
        <p className={blocks.text}>La tarifa es fija y nunca un porcentaje de lo que te devuelven.</p>
      </Section>

      <Section tone="pale" title="Solo hacemos impuestos para titulares de visa working holiday." titleId="trust-title">
        <p className={blocks.text}>
          Cada solicitud de TFN que presentamos es de alguien con una visa 462 o 417. Cada tax return es revisado y
          aprobado por un agente fiscal registrado antes de presentarse ante la ATO.
        </p>
        <GoogleReviewsServer lang="es" />
      </Section>

      <Section title="Preguntas sobre el TFN antes de escribirnos" titleId="faq-title">
        {/* El Accordion divide las respuestas por línea en blanco; faqLd usa el texto crudo. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Guías" title="Más sobre el TFN y las semanas al 45 %" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="Lo siguiente" title="Las semanas al 45 % vuelven con un tax return" titleId="next-title">
        <p className={blocks.text}>Cuando el número ya está registrado, el tax return es lo que reclama el exceso.</p>
        <div className={blocks.stack}>
          <LinkButton href="/es/tax-return" size="md">Cómo funciona el tax return →</LinkButton>
        </div>
      </Section>

      {/* CTA de cierre, banda verde. */}
      <Section tone="forest" title="Cuéntanos en qué punto estás" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          Si ya llegaste, si ya empezaste a trabajar y si ya te pagaron algo con el 45 % retenido. Con esas tres
          respuestas te decimos qué hacer ahora.
        </p>
        <WaButton href={WA_TFN} position="section" topic="tfn" lang="es" tone="light">Escríbenos por WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Respondemos en cerca de una hora.</p>
      </Section>

      <MobileCta href={WA_TFN} lang="es" topic="tfn" />
    </>
  )
}
