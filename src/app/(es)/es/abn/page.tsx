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
import { LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { Crumbs, PhotoBand, tb } from '@/components/wht/TfnAbnBlocks'
import { guideHref, guideText } from '../_blog-links'

// Metadata en español. Esta página explica qué cambia un ABN en el tax return.
// Sin precio y sin mencionar supervisión de agentes en el título.
export const metadata: Metadata = {
  // El layout raíz añade " | Working Holiday Tax" al título.
  title: 'ABN en Australia con visa 462 o 417',
  description:
    'Un ABN cambia lo que tu tax return tiene que decir: ingresos facturados sin retención, gastos del negocio, GST y si eras contratista o no.',
  keywords: [
    'ABN Australia',
    'ABN working holiday',
    'cómo sacar el ABN en Australia',
    'Australian Business Number mochilero',
    'ABN visa 462',
    'ABN visa 417',
    'sole trader Australia working holiday',
    'ABN o TFN',
    'necesito un ABN working holiday',
    'empleado o contratista Australia',
    'GST ABN working holiday',
    'ABN gastos deducibles',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/abn`,
    languages: {
      'en-AU': `${SITE_URL}/abn`,
      de: `${SITE_URL}/de/abn`,
      ja: `${SITE_URL}/ja/abn`,
      ...newLocaleLanguages('/abn'),
      'x-default': `${SITE_URL}/abn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-abn.png`, width: 1200, height: 630, alt: 'ABN para titulares de visa working holiday en Australia' }],
    type: 'website',
    locale: 'es_LA',
    url: `${SITE_URL}/es/abn`,
    siteName: 'Working Holiday Tax',
    title: 'ABN con visa working holiday: qué cambia',
    description:
      'Un ABN no cambia tu trabajo. Cambia tu tax return: ingresos facturados, gastos del negocio, GST y la diferencia entre empleado y contratista.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-abn.png`],
    card: 'summary_large_image',
    title: 'ABN con visa working holiday: qué cambia',
    description: 'Un ABN no cambia tu trabajo. Cambia tu tax return.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// --- COPY ---------------------------------------------------------------

/** Las cuatro cosas que un ABN cambia en el tax return. Esta es la página. */
const THE_SPLIT = [
  {
    n: '01',
    title: 'No te retuvieron nada, así que el impuesto sigue pendiente',
    body: 'El sueldo llega con el impuesto ya descontado. Las facturas no, y el impuesto de lo facturado se liquida una sola vez, al final del año. En un año mixto, la parte del sueldo parece una devolución y la parte facturada no.',
  },
  {
    n: '02',
    title: 'Las deducciones pasan a ser gastos del negocio, y las reglas cambian',
    body: 'Como empleado deduces gastos relacionados con el trabajo. Como sole trader deduces los gastos de llevar el negocio, una categoría más amplia pero con registros más exigentes detrás.',
  },
  {
    n: '03',
    title: 'El GST es una decisión, no un trámite',
    body: 'La mayoría de los titulares de visa working holiday nunca se acerca al límite de facturación de 75.000 AUD, así que la mayoría no debería registrarse. Rideshare es la excepción. Equivocarte significa obligaciones de BAS que no necesitabas, o que se te pasaron.',
  },
  {
    n: '04',
    title: 'Si realmente eras contratista',
    body: 'Esta es la que decide las otras tres. Que seas contratista de verdad depende del control, no del papeleo. Un ABN sobre un trabajo que siempre fue una relación laboral es el motivo más común por el que hay que rehacer el tax return de un mochilero.',
  },
]

const WHAT_WE_DO = [
  {
    title: 'Comprobamos si lo necesitas antes de que lo saques',
    body: 'Mucha gente registra un ABN para un trabajo que siempre fue una relación laboral. Eso es una conversación, no un formulario.',
  },
  {
    title: 'Lo registramos según el trabajo que haces de verdad',
    body: 'La actividad que declaras te acompaña en el GST, en las deducciones y en el tax return.',
  },
  {
    title: 'Te decimos cuánto apartar',
    body: 'Más o menos cuánto te costará en impuestos lo facturado, para que la cuenta no sea una sorpresa.',
  },
  {
    title: 'Te decimos qué guardar',
    body: 'Qué registros respaldan una deducción en tu tipo de trabajo, y qué recibos puedes dejar de acumular.',
  },
  {
    title: 'Decidimos el tema del GST con criterio',
    body: 'Registrado porque las reglas lo exigen, o sin registrar porque no lo exigen. Nunca por accidente.',
  },
  {
    title: 'Ponemos las dos mitades en un solo tax return',
    body: 'Lo cobrado como empleado con sueldo y lo facturado van en el mismo tax return, conciliados contra el mismo año.',
  },
]

// Las respuestas de más de unas 55 palabras llevan una línea en blanco, y el FAQ
// de abajo pinta un <p> por párrafo. faqLd usa el texto crudo, así que el schema no cambia.
const FAQS = [
  {
    question: '¿Puedo hacerlo por mi cuenta?',
    answer:
      'Sí, y si todo tu año fueron sueldos con payslip es sencillo.\n\nUn ABN es lo que deja de hacerlo sencillo: dónde está la línea entre sueldo e ingresos facturados, si eras contratista o no, qué gastos se restan del lado facturado y si tenías que registrarte para el GST. Son decisiones sobre tu año, no campos que rellenar.',
  },
  {
    question: '¿Cómo cambia un ABN mi tax return de working holiday?',
    answer:
      'El sueldo te llega con el impuesto retenido y con un income statement que tu empleador informa a la ATO, así que esa mitad casi se concilia sola.\n\nLo que facturas con un ABN llega sin impuesto, se declara como ingreso del negocio y solo se reduce con gastos que puedas respaldar. A eso se suma el GST y la pregunta de si el arreglo era de verdad un contrato. Las dos mitades terminan en un solo tax return.',
  },
  {
    question: 'Mi empleador dice que necesito un ABN para un trabajo normal por turnos. ¿Es cierto?',
    answer:
      'Normalmente no, y conviene frenar y revisar antes de registrarte. Si te fijan el horario, te dicen cómo se hace el trabajo, ponen las herramientas y pueden mandarte a casa antes, te están tratando como empleado, diga lo que diga el papel.\n\nUn ABN traslada el gasto a ti: sin retención de impuestos, sin superannuation, sin seguro de accidentes laborales, sin salario mínimo ni recargos. Mándanos los datos del trabajo antes de aceptar nada.',
  },
  {
    question: '¿Tengo que registrarme para el GST con una visa working holiday?',
    answer:
      'Solo si tu facturación llega a 75.000 AUD en un año, algo a lo que la mayoría de los titulares de visa working holiday ni se acerca, o si conduces para una plataforma de rideshare. Quien ofrece transporte tipo taxi o ride sourcing, Uber incluido, debe registrarse para el GST desde el primer viaje, gane lo que gane.\n\nLos repartidores de comida y los mensajeros no están bajo esa regla y vuelven al umbral de 75.000 AUD. Registrarse trae consigo declaraciones trimestrales de actividad empresarial (BAS).',
  },
  {
    question: '¿Puedo tener un TFN y un ABN a la vez?',
    answer:
      'Sí, y la mayoría de los titulares de visa working holiday que trabajan como contratistas acaban con los dos. El Tax File Number te cubre como empleado, el ABN como sole trader.\n\nNo van en tax returns separados: un solo tax return cubre el año fiscal y declara ambos. Necesitas primero el Tax File Number, porque la solicitud del ABN se cruza con él.',
  },
  {
    question: '¿Qué puedo deducir como gastos del negocio con un ABN?',
    answer:
      'Los gastos de generar el ingreso, repartidos con honestidad cuando algo se usa también en lo personal.\n\nPara un repartidor son los kilómetros bien registrados, los gastos de la bici o del vehículo, el teléfono y los datos, el seguro, el equipo y la comisión que se llevó la plataforma. Para un subcontratista en una obra son las herramientas, la ropa de protección y los traslados entre trabajos.\n\nNunca incluye el viaje a Australia, el trayecto normal de casa a un único lugar de trabajo ni nada de lo que no puedas mostrar un registro.',
  },
  {
    question: '¿Qué pasa con mi ABN cuando me voy de Australia?',
    answer:
      'Lo cancelas cuando dejes de trabajar con él, porque un ABN activo le dice a la ATO que sigues con un negocio y que aún puedes tener obligaciones.\n\nCancelarlo no afecta al tax return del año en que trabajaste, que igualmente hay que presentar, ni a tu posibilidad de reclamar la superannuation de los ingresos como empleado en ese mismo período. Si te vas pronto, avísanos con tiempo, porque el orden entre cancelar, presentar y reclamar la super importa.',
  },
]

// Las guías pasan por guideHref/guideText (_blog-links.ts): si la guía aún no existe en
// español, se enlaza la versión en inglés y se avisa en el texto.
const GUIDES = [
  {
    href: guideHref('employee-vs-contractor-australia'),
    title: guideText('employee-vs-contractor-australia', 'Empleado o contratista'),
    desc: 'La prueba que aplica la ATO y lo que cuesta quedar del lado equivocado.',
  },
  {
    href: guideHref('abn-deductions-business-expenses'),
    title: guideText('abn-deductions-business-expenses', 'Deducciones y gastos del negocio con un ABN'),
    desc: 'Qué puede deducir un sole trader según el tipo de trabajo, y los registros que respaldan cada gasto.',
  },
  {
    href: guideHref('gst-and-abn-for-working-holiday-makers'),
    title: guideText('gst-and-abn-for-working-holiday-makers', 'El GST y tu ABN'),
    desc: 'El umbral de 75.000 AUD, la excepción de rideshare y a qué te obliga registrarte.',
  },
]

const WA_ABN = waUrl({ topic: 'abn', lang: 'es' })

export default function ABNPageES() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/es/abn#webpage`,
    url: `${SITE_URL}/es/abn`,
    name: 'ABN con una visa working holiday',
    description:
      'Qué cambia un ABN en el tax return de un titular de visa working holiday: ingresos facturados sin retención, gastos del negocio, el GST y la diferencia entre empleado y contratista.',
    inLanguage: 'es',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/es/abn#service`,
    name: 'Registro de ABN para titulares de visa working holiday',
    serviceType: 'Registro de Australian Business Number',
    description:
      'Registro de ABN para titulares de visas working holiday 462 y 417 que hacen trabajo por contrato de verdad, con el GST, los registros y las consecuencias fiscales explicados antes de registrarse.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Titular de visa working holiday (subclass 462 y 417) que trabaja como sole trader' },
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
      { '@type': 'ListItem', position: 2, name: 'ABN', item: `${SITE_URL}/es/abn` },
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
        <Crumbs homeHref="/es" home="Inicio" current="ABN" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>ABN con visa working holiday&nbsp;&middot; 462 y 417</span>
            Un ABN no cambia tu trabajo.<br />
            Cambia <Mark>tu tax return.</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              Ingresos sin retención, gastos del negocio, una decisión sobre el GST y una pregunta debajo de las tres:
              si eras contratista de verdad.
            </Lead>
          </div>
          <WaButton href={WA_ABN} position="hero" topic="abn" lang="es">Escríbenos por WhatsApp</WaButton>
          <p className={heroStyles.note}>Respondemos en cerca de una hora.</p>
          <GoogleRating variant="pill" lang="es" />
        </Hero>
        <PhotoBand page="abn" locale="es" />
      </div>

      <Section eyebrow="Lo que cambia" title="¿Qué cambia en tu tax return cuando tienes un ABN?" titleId="split-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Cuatro cosas, y se suman entre sí.
        </p>
        <Steps items={THE_SPLIT} />
      </Section>

      <Section tone="pale" title="¿Debes registrar un ABN porque te lo pidió un empleador?" titleId="warn-title">
        <p className={blocks.text}>
          No antes de que alguien revise el trabajo. Un ABN sobre un trabajo que en realidad es una relación laboral
          te quita la superannuation y la retención de impuestos, elimina la cobertura de accidentes laborales y te
          deja fuera del salario mínimo y de los recargos. Todo pasa a ser un costo tuyo. Es habitual en trabajo
          en granjas, restaurantes, limpieza y obras.
        </p>
        <p className={blocks.text}>
          La prueba es el control, no el papeleo. Quién decide cuándo trabajas, quién dirige cómo se hace, quién
          pone el equipo y quién asume el riesgo si el trabajo sale mal. Si las respuestas apuntan a ellos, un ABN
          es la herramienta equivocada.
        </p>
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Mándanos el trabajo antes de registrarte.</strong>{' '}
          En qué consiste, quién pone qué y cómo te van a pagar. Te decimos de cuál de las dos cosas se trata.
        </p>
      </Section>

      <Section eyebrow="El trabajo" title="Qué hacemos nosotros" titleId="work-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Registrar el ABN es gratis y lleva minutos. Lo que decide cuánto te cuesta pasa antes y después.
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
          ¿Aún no tienes ABN ni Tax File Number? Primero va el{' '}
          <Link href="/es/tfn" className={tb.inlineLink}>TFN</Link>, porque la solicitud
          del ABN se cruza con él.
        </p>
      </Section>

      {/* La única banda ámbar: la garantía. */}
      <Section tone="amber" title="Nuestra tarifa" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          La tarifa de una declaración con ingresos de ABN es de 385 AUD fijos, con GST incluido. Nuestra garantía de devolución se aplica solo a las declaraciones con ingresos con TFN.
        </p>
        <p className={blocks.text}>La tarifa es fija y nunca un porcentaje de lo que te devuelven.</p>
      </Section>

      <Section tone="pale" title="Solo hacemos impuestos para titulares de visa working holiday." titleId="trust-title">
        <p className={blocks.text}>
          Por eso vemos una y otra vez los mismos arreglos con ABN: el contrato de la granja, la plataforma de
          reparto, la obra que paga a todos como subcontratistas.
        </p>
        <GoogleReviewsServer lang="es" />
      </Section>

      <Section title="Preguntas sobre el ABN antes de escribirnos" titleId="faq-title">
        {/* El Accordion divide las respuestas por línea en blanco; faqLd usa el texto crudo. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Guías" title="Más sobre contratos, gastos y GST" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="Lo siguiente" title="Las dos mitades van en un solo tax return" titleId="next-title">
        <p className={blocks.text}>Lo cobrado como empleado con sueldo y lo facturado van en el mismo tax return del mismo año.</p>
        <div className={blocks.stack}>
          <LinkButton href="/es/tax-return" size="md">Cómo funciona el tax return →</LinkButton>
        </div>
      </Section>

      {/* CTA de cierre, banda verde. */}
      <Section tone="forest" title="Cuéntanos cómo es el trabajo" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          A quién le facturarías, qué harías y quién pone el equipo. Con eso te decimos si un ABN tiene sentido o no.
        </p>
        <WaButton href={waUrl({ topic: 'abn', lang: 'es', tier: 'tfn-abn' })} position="section" topic="abn" lang="es" tier="tfn-abn" tone="light">Escríbenos por WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Respondemos en cerca de una hora.</p>
      </Section>

      <MobileCta href={WA_ABN} lang="es" topic="abn" />
    </>
  )
}
