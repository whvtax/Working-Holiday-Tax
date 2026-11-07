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
  title: { absolute: 'Cómo sacar u obtener el TFN en Australia con visa 462 o 417' },
  description:
    'El TFN, tu número fiscal australiano, es gratis y se pide online en la ATO ya en Australia. Llega en hasta 28 días. Sin él te retienen el 45 %.',
  keywords: [
    'TFN Australia',
    'cómo sacar el TFN en Australia',
    'cómo obtener el TFN',
    'tramitar el TFN',
    'número fiscal Australia',
    'solicitar el TFN working holiday',
    'Tax File Number Australia',
    'TFN visa 462',
    'TFN visa 417',
    'TFN para mochileros',
    'trabajar sin TFN Australia',
    'sin TFN 45 % de impuesto',
    'cuánto tarda el TFN',
    'TFN Work and Holiday',
    'Tax File Number Australia en español',
    'requisitos TFN Australia',
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
    title: 'Cómo sacar el TFN en Australia: gratis, pero no tenerlo cuesta',
    description:
      'El número es gratis. Las semanas sin él, no. Preparamos contigo tu solicitud del TFN para que salga bien a la primera, con visa 462 o 417.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tfn.png`],
    card: 'summary_large_image',
    title: 'Cómo sacar el TFN en Australia: gratis, pero no tenerlo cuesta',
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
    title: 'Se pidió antes de llegar a Australia',
    body: 'La solicitud online es para quienes están en Australia con una visa con permiso de trabajo vinculada a su pasaporte. Si la mandas antes de volar no sale adelante, y te enteras semanas después, con el 45 % ya retenido.',
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
    body: 'Pasaporte, orden de los nombres, fecha de nacimiento y concesión de la visa, revisados entre sí antes de enviar la solicitud.',
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
    body: 'Que tu TFN declaration diga que ya lo pediste mantiene tus primeros payslips en la tasa normal durante 28 días, en lugar del 45 %.',
  },
  {
    title: 'Lo conciliamos al final del año',
    body: 'Lo que ya se retuvo al 45 % se concilia a través de un tax return. Lo que pase con ese dinero depende de tu año y lo decide la ATO.',
  },
]

/** Cómo pedirlo por tu cuenta en la web de la ATO. */
const HOW_STEPS = [
  {
    n: '01',
    title: 'Estar en Australia con la visa vinculada a tu pasaporte',
    body: 'La solicitud online es para quienes tienen una visa con permiso de trabajo y están en Australia. Las visas 417 y 462 sirven. No envías ningún documento.',
  },
  {
    n: '02',
    title: 'Completar la solicitud online de la ATO',
    body: 'Escribe tus datos exactamente como figuran en tu pasaporte y en tu visa, y una dirección postal australiana donde sigas recibiendo correo dentro de cuatro semanas.',
  },
  {
    n: '03',
    title: 'Guardar el receipt ID y avisar a tu empleador',
    body: 'Marca en tu TFN declaration que ya lo pediste. Así tu empleador retiene la tasa normal durante 28 días en lugar del 45 %.',
  },
  {
    n: '04',
    title: 'Esperar la carta sin pedirlo dos veces',
    body: 'La ATO indica que llega en un plazo de 28 días. Una segunda solicitud en ese tiempo puede retrasarlo. Si pasan los 28 días, contacta a la ATO con tu receipt ID.',
  },
]

/** Quién puede pedirlo online, según la ATO. */
const WHO_CAN_APPLY = [
  { title: 'Con visa 417 o 462 y ya en Australia', body: 'Sí, online y gratis.' },
  { title: 'Visa concedida, pero todavía fuera de Australia', body: 'Todavía no. Pídelo cuando llegues.' },
  { title: 'Ciudadano de Nueva Zelanda', body: 'Sí, una vez en Australia. Al llegar recibes automáticamente una visa con permiso de trabajo.' },
  { title: 'Visa con condición de no trabajar (8101, 8103 u 8116)', body: 'No online. Se usa el formulario en papel de la ATO.' },
]

// Respuestas cortas, de un solo párrafo. faqLd se genera desde FAQS, así que el schema
// coincide con el acordeón visible.
const FAQS = [
  {
    question: '¿Cómo saco el TFN con una visa working holiday?',
    answer:
      'Cuando ya estás en Australia con tu visa 417 o 462, lo pides online en la web de la ATO. Es gratis y no envías documentos. Escribe tus datos tal como figuran en el pasaporte y una dirección australiana donde sigas recibiendo correo. La ATO indica que llega en un plazo de 28 días.',
  },
  {
    question: '¿Puedo pedir el TFN por mi cuenta? ¿Es gratis?',
    answer:
      'Sí a las dos cosas. La solicitud de la ATO es gratuita. Lo que hacemos nosotros es el trabajo alrededor: comprobar que tus datos coinciden con el registro de tu visa, elegir una dirección que reciba la carta y asegurar que tu empleador no te retenga el 45 % mientras esperas.',
  },
  {
    question: '¿Puedo pedir el TFN antes de llegar a Australia?',
    answer:
      'Con una visa working holiday, no. La solicitud online de la ATO es para quienes tienen una visa con permiso de trabajo y están en Australia. Ten listo el pasaporte y una dirección postal australiana, y pídelo cuando llegues.',
  },
  {
    question: '¿Cuánto tarda en llegar el TFN?',
    answer:
      'La ATO indica que deberías recibirlo en un plazo de 28 días desde que recibe tu solicitud completa. Llega por carta a la dirección australiana que pusiste. Si vuelves a pedirlo dentro de esos 28 días, puedes retrasarlo.',
  },
  {
    question: '¿Puedo empezar a trabajar antes de que llegue el TFN?',
    answer:
      'Sí. Indica en tu TFN declaration que ya lo pediste y tu empleador retiene la tasa normal durante 28 días. Pasado ese plazo, si sigue sin tu TFN, debe retener el 45 % en lugar del 15 %. En un trabajo de 30 AUD la hora son unos 9 AUD por hora.',
  },
  {
    question: '¿Qué hago si pasaron 28 días y no llegó?',
    answer:
      'No lo pidas otra vez. Contacta a la ATO con el receipt ID de tu solicitud: pueden decirte en qué estado está y corregir una dirección equivocada. Avisa también a tu empleador de que viene con retraso. Si prefieres, escríbenos y hacemos ese seguimiento nosotros.',
  },
  {
    question: '¿Qué documentos necesito para el TFN?',
    answer:
      'Para la solicitud online no envías ninguno. La ATO comprueba tus datos contra tu visa, que tiene que estar vinculada a tu pasaporte. Lo importante es que tu nombre, tu fecha de nacimiento y tu número de pasaporte coincidan exactamente con el registro de la visa.',
  },
  {
    question: '¿Sin TFN me retienen el 45 % o el 47 %?',
    answer:
      'Con una visa 417 o 462, la retención sin TFN es del 45 %, según la ATO. El 47 % que aparece en otras guías corresponde a otra situación: es lo que se retiene cuando trabajas como contratista y no das un ABN.',
  },
  {
    question: 'Llevo semanas trabajando sin TFN. ¿Ya es tarde?',
    answer:
      'No. Pídelo ahora para que el 45 % deje de aplicarse a tus próximos pagos. Lo que ya se retuvo de más se revisa en el tax return de ese año fiscal, y el resultado depende de tu año. Dinos cuántas semanas se pagaron al 45 %.',
  },
  {
    question: '¿Necesito un TFN nuevo para una segunda visa?',
    answer:
      'No. El TFN se emite una sola vez y es tuyo para siempre: sirve en una segunda o tercera visa working holiday, si cambias de visa y aunque hayas salido de Australia un tiempo. Si lo perdiste, se puede recuperar; cuéntanos tu caso.',
  },
]

// Las guías pasan por guideHref/guideText (_blog-links.ts): si la guía aún no existe en
// español, se enlaza la versión en inglés y se avisa en el texto.
const GUIDES = [
  {
    href: guideHref('what-happens-without-your-tfn'),
    title: guideText('what-happens-without-your-tfn', 'Qué pasa si trabajas sin TFN'),
    desc: 'La retención del 45 %, la ventana de 28 días y cómo se revisa lo retenido.',
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
  {
    href: guideHref('tfn-application-delayed'),
    title: guideText('tfn-application-delayed', '¿TFN retrasado más de 28 días?'),
    desc: 'Las tres cosas que revisar antes de llamar a la ATO, y por qué pedirlo otra vez lo empeora.',
  },
  {
    href: guideHref('tfn-australian-address-no-fixed-address'),
    title: guideText('tfn-australian-address-no-fixed-address', 'Sin dirección fija'),
    desc: 'Qué direcciones sirven para la carta si estás en un hostel, en una granja o en una van.',
  },
  {
    href: guideHref('apply-for-tfn-before-arriving'),
    title: guideText('apply-for-tfn-before-arriving', 'Pedirlo antes de llegar'),
    desc: 'Por qué hay que esperar a aterrizar y qué tener listo para pedirlo el primer día.',
  },
  {
    href: guideHref('tfn-vs-abn-difference'),
    title: guideText('tfn-vs-abn-difference', '¿TFN o ABN?'),
    desc: 'Cuándo te pagan con uno y cuándo con el otro, y qué cambia en lo que te retienen.',
  },
]

/** Lo que viene después del TFN: los otros tres servicios. */
const AFTER_TFN = [
  {
    href: '/es/tax-return',
    title: 'Tu tax return',
    desc: 'Lo retenido al 45 % antes de que tu empleador tuviera el número solo se concilia con un tax return después del 30 de junio.',
  },
  {
    href: '/es/abn',
    title: 'Un ABN, si también trabajas como contratista',
    desc: 'Reparto, limpieza y algunos trabajos de construcción se pagan con ABN, no con TFN. Puedes tener los dos.',
  },
  {
    href: '/es/superannuation',
    title: 'Tu super cuando te vayas',
    desc: 'Tu empleador aporta el 12 % de super además de tu sueldo. Cuando sales de Australia se reclama como DASP.',
  },
]

const WA_TFN = waUrl({ topic: 'tfn', lang: 'es' })

export default function TFNPageES() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/es/tfn#webpage`,
    url: `${SITE_URL}/es/tfn`,
    name: 'Cómo sacar el TFN en Australia con una visa working holiday',
    description:
      'Cómo pedir el Tax File Number con una visa 417 o 462, quién puede pedirlo online, cuánto tarda y qué se retiene hasta que tu empleador lo tiene.',
    inLanguage: 'es',
    dateModified: '2026-11-05',
    citation: [
      {
        '@type': 'WebPage',
        url: 'https://www.ato.gov.au/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application',
        name: 'Tax file number application for foreign passport holders, permanent migrants and temporary visitors',
      },
      {
        '@type': 'WebPage',
        url: 'https://www.ato.gov.au/forms-and-instructions/tfn-declaration/payer-information-and-obligations',
        name: 'TFN declaration: payer information and obligations',
      },
    ],
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
      'Ayuda con la solicitud del Tax File Number para titulares de visas working holiday 462 y 417: revisión de los datos contra el registro de la visa, elección de la dirección para la carta, la TFN declaration para el empleador y seguimiento con la ATO si pasan 28 días.',
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
              <span className={blocks.kicker}>Tax File Number (TFN) en Australia&nbsp;&middot; visa working holiday 462 y 417</span>
            El número es gratis.<br />
            Las semanas <Mark>sin él</Mark>, no.
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              El Tax File Number (TFN) es tu número fiscal australiano y es gratis. Con visa 462 o 417 lo obtienes
              pidiéndolo online en la web de la ATO ya dentro de Australia. La ATO indica que llega por carta en un plazo de 28 días. Hasta que tu empleador lo tenga, o
              sepa que ya lo pediste, te retiene el 45 % en lugar del 15 %.
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
          Estas son las cifras que deciden tus primeros pagos con una visa working holiday, revisadas con la
          información de la ATO el 5 de noviembre de 2026.
        </p>
        <Figures
          items={[
            { figure: 'Gratis', body: 'Pedir el TFN no cuesta nada en la web de la ATO. Fuente: ATO.' },
            { figure: '28 días', body: 'La ATO indica que el TFN debería llegar en un plazo de 28 días desde que recibe tu solicitud completa. Fuente: ATO.' },
            { figure: 'Día 29', body: 'Si le dijiste a tu empleador que ya lo pediste, retiene la tasa normal durante 28 días. Desde ahí, sin tu TFN, debe retener la tasa máxima. Fuente: ATO.' },
            { figure: '45 %', body: 'Lo que se retiene a un working holiday maker o residente extranjero sin TFN registrado, en lugar del 15 %. Fuente: ATO.' },
            { figure: '15 %', body: 'La tasa de working holiday maker sobre los primeros 45.000 AUD, desde el primer dólar, vigente desde el 1 de julio de 2026. Fuente: ATO.' },
          ]}
        />
        <p className={blocks.small}>
          Lo retenido de más al 45 % solo se concilia con un{' '}
          <Link href="/es/tax-return" className={tb.inlineLink}>tax return</Link> después del 30 de junio, y el
          resultado depende de tu año.
        </p>
      </Section>

      <Section eyebrow="Por tu cuenta" title="Cómo sacar u obtener el TFN en Australia, paso a paso" titleId="how-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Puedes hacerlo tú, gratis, en la web de la ATO. Son cuatro pasos.</p>
        <Steps items={HOW_STEPS} />
        <p className={blocks.small}>
          Solicitud oficial:{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application" rel="noopener" className={tb.inlineLink}>
            ATO, Tax file number application for foreign passport holders, permanent migrants and temporary visitors
          </a>{' '}
          (en inglés).
        </p>
        <h3 className={blocks.cardTitle}>Quién puede pedirlo online</h3>
        <div className={tb.pairs}>
          {WHO_CAN_APPLY.map(c => (
            <div key={c.title} className={blocks.palePanel}>
              <h4 className={blocks.cardTitle}>{c.title}</h4>
              <p className={blocks.text}>{c.body}</p>
            </div>
          ))}
        </div>
        <p className={blocks.text}>
          Lo que suele salir mal, con más detalle:{' '}
          <Link href={guideHref('how-to-apply-for-a-tfn')} className={tb.inlineLink}>
            {guideText('how-to-apply-for-a-tfn', 'Cómo solicitar el TFN y qué suele salir mal')}
          </Link>
          .
        </p>
        <p className={blocks.text}>¿Prefieres que lo hagamos contigo? Escríbenos si ya llegaste y si ya empezaste a trabajar.</p>
        <WaButton href={WA_TFN} position="inline" topic="tfn" lang="es" size="md">Escríbenos por WhatsApp</WaButton>
      </Section>

      <Section tone="pale" eyebrow="Dónde sale mal" title="¿Por qué fallan las solicitudes de TFN con visa working holiday?" titleId="fail-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          El formulario es corto. Cada una de estas tres formas de equivocarse puede costarte más semanas al 45 %.
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
          ¿Ya tienes el número y quieres revisar las semanas al 45 %?{' '}
          <Link href="/es/tax-return" className={tb.inlineLink}>Eso es el tax return</Link>.
        </p>
      </Section>

      <Section title="Cuando ya tienes el TFN" titleId="after-title">
        <LinkRows items={AFTER_TFN} />
        <p className={blocks.small}>Guarda la carta. Tu TFN es el mismo de por vida, en cualquier visa.</p>
      </Section>

      <Section tone="pale" title="Solo hacemos impuestos para titulares de visa working holiday." titleId="trust-title">
        <p className={blocks.text}>
          Cada solicitud de TFN en la que ayudamos es de alguien con una visa 462 o 417. Cada tax return es revisado y
          aprobado por un agente fiscal registrado antes de presentarse ante la ATO.
        </p>
        <GoogleReviewsServer lang="es" />
      </Section>

      <Section title="Preguntas frecuentes sobre el TFN en Australia" titleId="faq-title">
        {/* faqLd se genera desde FAQS: el schema coincide con este acordeón. */}
        <Accordion items={FAQS} />
        <p className={blocks.small}>
          Fuentes:{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/tax-file-number/apply-for-a-tfn/foreign-passport-holders-permanent-migrants-and-temporary-visitors-tfn-application" rel="noopener" className={tb.inlineLink}>
            ATO, Tax file number application for foreign passport holders, permanent migrants and temporary visitors
          </a>{' '}
          (actualizada el 22 de junio de 2026);{' '}
          <a href="https://www.ato.gov.au/forms-and-instructions/tfn-declaration/payer-information-and-obligations" rel="noopener" className={tb.inlineLink}>
            ATO, TFN declaration: payer information and obligations
          </a>
          . Revisado el 5 de noviembre de 2026.
        </p>
      </Section>

      <Section tone="pale" eyebrow="Guías" title="Más guías sobre el TFN" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="Lo siguiente" title="Las semanas al 45 % se revisan en el tax return" titleId="next-title">
        <p className={blocks.text}>
          Cuando el número ya está registrado, el tax return es donde se revisa el exceso. Si quieres ver el año
          completo, de las tasas al Medicare levy, lee la{' '}
          <Link href="/es/devolucion-impuestos-australia" className={tb.inlineLink}>
            guía de la devolución de impuestos en Australia
          </Link>
          .
        </p>
        <div className={blocks.stack}>
          <LinkButton href="/es/tax-return" size="md">Cómo funciona el tax return →</LinkButton>
        </div>
      </Section>

      {/* La única banda ámbar: la garantía. */}
      <Section tone="amber" title="Nuestra garantía" titleId="guarantee-title">
        <p className={blocks.text}>Si también nos encargas tu tax return, se aplica esto.</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Si tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes dinero a la ATO, se aplica la tarifa completa. La garantía cubre solo las declaraciones con ingresos con TFN.
        </p>
        <p className={blocks.text}>La tarifa es fija y nunca un porcentaje de lo que te devuelven.</p>
      </Section>

      {/* CTA de cierre, banda verde. */}
      <Section tone="forest" title="Cuéntanos en qué punto estás" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          Mándanos tres respuestas por WhatsApp: si ya llegaste, si ya empezaste a trabajar y si ya te pagaron
          algo con el 45 % retenido. Te decimos qué hacer ahora.
        </p>
        <WaButton href={WA_TFN} position="section" topic="tfn" lang="es" tone="light">Escríbenos por WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Respondemos en cerca de una hora.</p>
      </Section>

      <MobileCta href={WA_TFN} lang="es" topic="tfn" />
    </>
  )
}
