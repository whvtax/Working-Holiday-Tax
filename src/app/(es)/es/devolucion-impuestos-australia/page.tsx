import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { LinkRows, blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, PlainRows } from '@/components/wht/CoreBlocks'
import { Accordion } from '@/components/ui/Accordion'
import { guideHref, guideText } from '../_blog-links'

// --- METADATA -----------------------------------------------------------
// Flagship page for the Spanish-speaking market (Spain, Argentina, Chile,
// Uruguay). Most readers hold the 462 (Work and Holiday) visa, so 462 leads
// wherever the English page says "417 and 462". The facts come from the English
// tax-return page and guides; the copy is written natively, not translated.
// Search phrasing people use: "devolución de impuestos Australia" and the
// English term "tax return", which is also what the ATO site shows.
// No claim about Spanish, Argentine or Chilean tax law: the home-country return
// is a separate matter and the page says so. No claim to be a registered agent.
export const metadata: Metadata = {
  // The root layout appends " | Working Holiday Tax", so the base title stays short.
  title: { absolute: 'Devolución de impuestos Australia 2026: tax return visa 462' },
  description:
    'Devolución de impuestos y declaración de renta en Australia con visa 462 o 417: tasas 2025-26, plazo, fuera de plazo, desde tu país y Medicare levy.',
  keywords: [
    'devolución de impuestos Australia',
    'tax return Australia',
    'tax return visa 462',
    'tax return working holiday Australia',
    'devolución de impuestos working holiday Australia',
    'cómo hacer el tax return en Australia',
    'tax return Australia desde el extranjero',
    'tax return Australia sin payslips',
    'cuánto tarda la devolución de impuestos en Australia',
    'tax return Australia fuera de plazo',
    'tax return Australia antes de irme',
    'tax return chilenos Australia',
    'tasas working holiday maker 2026',
    'declaración de renta Australia',
    'cuánto me devuelven de impuestos en Australia',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/devolucion-impuestos-australia`,
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tax-return.png`, width: 1200, height: 630, alt: 'Tax return en Australia para titulares de la visa 462 y 417' }],
    type: 'website',
    locale: 'es_LA',
    url: `${SITE_URL}/es/devolucion-impuestos-australia`,
    siteName: 'Working Holiday Tax',
    title: 'Devolución de impuestos en Australia 2026 (visa 462 y 417)',
    description:
      'Tus datos y dónde quieres recibir la devolución. Preparamos el tax return, tú lo revisas y lo firmas, y se presenta ante la ATO.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tax-return.png`],
    card: 'summary_large_image',
    title: 'Devolución de impuestos en Australia 2026 (visa 462 y 417)',
    description: 'Pasaporte, datos del banco, sin payslips. Tú firmas, y un agente fiscal registrado lo revisa y aprueba antes de presentarse.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// --- COPY ---------------------------------------------------------------

/** What a tax return is, in four short facts. */
const BASICS = [
  {
    label: 'Te retienen impuestos en cada pago',
    body: 'En Australia tu empleador descuenta impuestos de cada sueldo y se los envía a la ATO (la oficina de impuestos australiana). Eso se llama PAYG withholding. Tú ves el sueldo ya con el descuento.',
  },
  {
    label: 'El tax return es el ajuste del año',
    body: 'El año fiscal va del 1 de julio al 30 de junio. Con el tax return la ATO compara lo que te retuvieron durante el año con lo que realmente debías. Si te retuvieron de más, la diferencia se devuelve. Si te retuvieron de menos, se paga.',
  },
  {
    label: 'La ATO ya tiene tus datos',
    body: 'Cada empleador que te pagó como empleado con sueldo informa a la ATO un income statement con tu sueldo y los impuestos retenidos. El tax return se arma a partir de ese registro. Es lo que antes se llamaba PAYG payment summary.',
  },
  {
    label: 'Es un trámite por año',
    body: 'Cada año fiscal es una declaración distinta, con su propia devolución. Un año que nunca presentaste sigue ahí y se puede presentar.',
  },
]

/**
 * The figures people search for, with the year they apply to. Source: ATO, as in
 * public/llms.txt "Key facts". The 2026-27 rates are unchanged from 2025-26.
 * Each body ends with its source name; the links sit in the footnote below the rows.
 */
const WHM_RATES = [
  { band: 'Hasta 45.000 AUD', rate: '15 %' },
  { band: 'De 45.001 a 135.000 AUD', rate: '30 %' },
  { band: 'De 135.001 a 190.000 AUD', rate: '37 %' },
  { band: 'Más de 190.000 AUD', rate: '45 %' },
]

const cellStyle = { padding: '10px 12px', borderTop: '1px solid var(--wht-line)', textAlign: 'left' as const, verticalAlign: 'top' as const }

const KEY_FIGURES = [
  {
    label: 'El año que se presenta ahora: 2025-26',
    body: 'Del 1 de julio de 2025 al 30 de junio de 2026. El año 2026-27 empezó el 1 de julio de 2026 y se presenta a partir del 1 de julio de 2027. Fuente: ATO.',
  },
  {
    label: 'Sin TFN, el 45 %',
    body: 'Si tu empleador no tiene tu TFN (tax file number), debe retener el 45 % de cada pago en lugar del 15 %. Esa diferencia solo se revisa con un tax return presentado. Fuente: ATO.',
  },
  {
    label: 'Medicare levy: 2 % del ingreso imponible',
    body: 'Se calcula al evaluar el tax return. España y los países de América Latina no tienen un acuerdo de salud recíproco con Australia, así que con esos pasaportes puedes tener derecho a pedir la exención con un Medicare Entitlement Statement, según tu situación. Fuentes: ATO y Services Australia.',
  },
  {
    label: 'Plazo por tu cuenta: 31 de octubre',
    body: 'Para 2025-26 fue el 31 de octubre de 2026 y ya pasó. Un año fuera de plazo todavía se puede presentar. Fuente: ATO.',
  },
  {
    label: 'Procesamiento: 10 días hábiles',
    body: 'La ATO indica que la mayoría de los tax returns presentados por internet se procesan en 10 días hábiles. Si hay devolución, suele llegar unos 14 días hábiles después de presentar. Fuente: ATO.',
  },
  {
    label: 'La devolución va a una cuenta australiana',
    body: 'La ATO paga las devoluciones solo a una cuenta bancaria en Australia. Fuente: ATO.',
  },
  {
    label: 'Presentarlo antes de irte: 50 días hábiles',
    body: 'Solo si te vas de Australia para siempre antes del 30 de junio, en papel, y la ATO tarda 50 días hábiles en procesarlo. Fuente: ATO.',
  },
]

/** Who has to lodge. */
const WHO_MUST = [
  {
    label: 'Si trabajaste en Australia, lo normal es presentar',
    body: 'La obligación depende de haber tenido ingresos, no de cuánto tiempo estuviste. Dos semanas de trabajo generan la misma obligación que dos años. La visa y el monto no cambian eso.',
  },
  {
    label: 'También si fue trabajo en efectivo',
    body: 'El ingreso es imponible aunque nadie lo haya declarado. Si no tienes payslips, cuéntanos cómo fue y vemos qué se puede declarar.',
  },
  {
    label: 'También si facturaste con un ABN',
    body: 'Los ingresos con ABN llegan sin retención y sin datos precargados, así que hay que declararlos con tus propios registros. Es el caso en que más a menudo hay impuesto a pagar en lugar de devolución.',
  },
  {
    label: 'Las excepciones son pocas',
    body: 'Si no tuviste ningún ingreso en Australia, no hay nada que presentar. Fuera de eso, la lista es corta. Si tienes dudas, escríbenos y lo vemos con tu caso.',
  },
]

/** What the person has to supply. */
const NEEDED = [
  {
    label: 'Tu pasaporte y tu visa',
    body: 'Qué pasaporte tienes y qué subclass: 462 (Work and Holiday) o 417 (Working Holiday).',
  },
  {
    label: 'Una cuenta bancaria australiana',
    body: 'La ATO paga las devoluciones solo a una cuenta australiana. Si la tuya ya está cerrada, dínoslo desde el primer mensaje.',
  },
  {
    label: 'Más o menos dónde y cuándo trabajaste',
    body: 'Un lugar, el tipo de trabajo y los meses aproximados. Lo cruzamos con el registro de la ATO y completamos el resto.',
  },
]

/** What it is not. */
const NOT_COVERED = [
  {
    label: 'No presentamos declaraciones de tu país',
    body: 'Solo nos ocupamos de impuestos australianos. Lo que tengas que hacer en tu país de origen, si algo, es un asunto aparte.',
  },
  {
    label: 'No opinamos sobre impuestos fuera de Australia',
    body: 'No podemos decirte cómo se trata lo que ganaste en Australia en tu país ni cómo declararlo allí. Eso se consulta en la oficina de impuestos de tu país.',
  },
]

// Answers longer than about 55 words carry a blank line, and the FAQ renders one
// <p> per paragraph. faqLd uses the raw text, so the schema matches what is visible.
const FAQS = [
  {
    question: 'Se me pasó el 31 de octubre. ¿Todavía puedo presentar?',
    answer:
      'Sí. Si lo presentas por tu cuenta, el plazo es el 31 de octubre posterior al fin del año fiscal, que termina el 30 de junio. Para 2025-26 fue el 31 de octubre de 2026, que ya pasó. Un año fuera de plazo está atrasado, no perdido, y todavía se puede presentar.\n\nSi debes impuestos, la ATO puede cobrar intereses y una multa por presentación tardía, así que conviene no esperar más.',
  },
  {
    question: '¿Puedo presentar el tax return antes de irme de Australia?',
    answer:
      'Solo si te vas para siempre antes del 30 de junio y no vas a tener más ingresos australianos, salvo intereses, dividendos o regalías. Se presenta en papel y la ATO tarda 50 días hábiles en procesarlo.\n\nSi no cumples esas condiciones, lo presentas desde tu país en el período normal, del 1 de julio al 31 de octubre. La devolución solo se paga a una cuenta australiana.',
  },
  {
    question: 'Soy chileno. ¿Pago las tasas de working holiday maker?',
    answer:
      'Depende de tu residencia fiscal. Para 2025-26, la ATO indica que quien fue residente de Australia a efectos fiscales y tiene nacionalidad chilena paga las tasas de residente, no las de working holiday maker. Si no fuiste residente fiscal, se aplican las de working holiday maker. Se valora caso por caso y lo decide la ATO.',
  },
  {
    question: '¿El tax return es lo mismo que la declaración de renta?',
    answer:
      'Sí. Tax return es el nombre en inglés de la declaración de renta australiana, la que se presenta ante la ATO por cada año fiscal, del 1 de julio al 30 de junio. Con la visa 462 o 417 se presenta igual que cualquier otra persona que trabajó en Australia, y de ella sale la devolución de impuestos si te retuvieron de más.',
  },
  {
    question: '¿Tengo tax-free threshold con la visa 462 o 417?',
    answer:
      'No. Los working holiday makers no pueden aplicar el tax-free threshold: el 15 % se aplica desde el primer dólar hasta 45.000 AUD.',
  },
  {
    question: '¿Cuánto tarda la devolución?',
    answer:
      'Si hay devolución, la ATO suele pagarla unos 14 días hábiles después de presentar el tax return. Los plazos completos están en la guía de cuánto tarda la devolución de impuestos en Australia, enlazada más abajo.',
  },
  {
    question: '¿Cuánto impuesto paga un working holiday maker en Australia?',
    answer:
      'Cuando se aplican las tasas de working holiday maker, son el 15 % sobre los primeros 45.000 AUD, el 30 % hasta 135.000 AUD, el 37 % hasta 190.000 AUD y el 45 % por encima (2025-26, sin cambios en 2026-27). Sin TFN, el empleador retiene el 45 %. Además puede aplicarse el Medicare levy, del 2 % del ingreso imponible.\n\nQue esas tasas se apliquen a tu año depende de tu situación y lo decide la ATO.',
  },
  {
    question: '¿Tengo que hacer el tax return si trabajé pocos meses con la visa 462?',
    answer:
      'Casi seguro que sí. La obligación sigue al ingreso, no al tiempo que estuviste: dos semanas de trabajo crean la misma obligación que dos años. Los trabajos cortos a veces se retienen a una tasa más alta de lo debido, y solo un tax return presentado lo corrige. No podemos prometerte una devolución.\n\nLas excepciones son pocas, por ejemplo no haber tenido ningún ingreso en Australia. Si dudas, escríbenos con tu caso.',
  },
  {
    question: '¿Esto reemplaza la declaración de impuestos de mi país?',
    answer:
      'No. El tax return australiano y la declaración de tu país (Hacienda en España, el SII en Chile, la SUNAT en Perú, el SAT en México) son trámites separados. Nosotros solo nos ocupamos de impuestos australianos. Para saber qué te corresponde hacer en tu país, consulta con la oficina de impuestos de tu país; en la guía de impuestos al salir de Australia, enlazada más abajo, verás si tu país tiene convenio con Australia y qué conviene guardar.',
  },
  {
    question: '¿Cuánto cuesta?',
    answer:
      'La tarifa es de 220 AUD (GST incluido) si tus ingresos fueron solo con TFN, y de 385 AUD (GST incluido) si también facturaste con un ABN. Acordamos la tarifa contigo por WhatsApp antes de empezar, y nunca se descuenta nada de lo que te envía la ATO.\n\nSi tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes dinero a la ATO, se aplica la tarifa completa. La garantía cubre solo las declaraciones con ingresos con TFN.',
  },
  {
    question: '¿Pago el Medicare levy con pasaporte español o latinoamericano?',
    answer:
      'El Medicare levy es el 2 % del ingreso imponible. España y los países de América Latina no tienen un Reciprocal Health Care Agreement con Australia, así que con esos pasaportes puedes tener derecho a pedir la exención con un Medicare Entitlement Statement de Services Australia. Depende de tu situación y la decisión es de la ATO.',
  },
  {
    question: '¿Necesitan mis payslips?',
    answer:
      'No. Cada empleador que te pagó como empleado con sueldo informó un income statement a la ATO, y de ese registro sale el tax return. Haber perdido los payslips (recibos de sueldo o nóminas) o que el empleador ya no exista es un punto de partida normal.\n\nLo único que conviene buscar son los comprobantes de gastos de trabajo. Si no los tienes, cuéntanos en qué consistió el trabajo y te decimos qué se puede deducir igual.',
  },
  {
    question: '¿Puedo presentar el tax return yo mismo en myGov?',
    answer:
      'Sí, es gratis y, si tu año fue sencillo y tienes acceso a myGov, puede bastar. Conviene tener ayuda cuando hubo semanas sin TFN, varios empleadores, ingresos con ABN, una posible exención del Medicare levy o ya no puedes entrar a myGov desde el extranjero.',
  },
  {
    question: '¿Puedo hacerlo si ya salí de Australia?',
    answer:
      'Sí. Muchos de los tax returns que preparamos son de personas que ya volvieron a su país. El cuestionario, la firma y la presentación son por internet.\n\nLo único que no viaja es la devolución: la ATO solo la puede pagar a una cuenta bancaria australiana, mientras que la superannuation (DASP) sí se puede pagar en el extranjero. Si tu cuenta australiana ya está cerrada, cuéntanoslo en el primer mensaje.',
  },
  {
    question: '¿Puedo recibir la devolución en la cuenta de mi país?',
    answer:
      'No. La ATO solo paga las devoluciones de impuestos a una cuenta bancaria australiana. Por eso conviene no cerrar esa cuenta hasta que la devolución haya llegado. Si ya la cerraste, avísanos desde el principio.',
  },
  {
    question: 'Nunca presenté un año anterior. ¿Todavía puedo?',
    answer:
      'Sí. Cada año fiscal es independiente, con su propia declaración y su propia devolución, y en el registro de la ATO vemos qué años siguen abiertos.\n\nSi hay devolución o no, y de cuánto, lo decide la ATO. No podemos prometerte un monto.',
  },
  {
    question: '¿Y si en vez de devolución resulta que debo dinero?',
    answer:
      'A veces pasa, sobre todo cuando parte del ingreso se facturó con un ABN y no se retuvo nada.\n\nVes esa cifra antes de que se presente cualquier cosa, con la explicación de dónde sale y las formas de pago que ofrece la ATO. Sin tu firma no se envía nada.',
  },
  {
    question: '¿Quién presenta mi declaración?',
    answer:
      'Nuestro equipo la prepara y opera bajo la supervisión de un agente fiscal registrado. Cada tax return es revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO.',
  },
  {
    question: '¿Me van a pedir mi contraseña de myGov?',
    answer:
      'No. Nunca la pedimos, porque el camino que usamos no la necesita. Si un mensaje te la pide, no viene de nosotros.',
  },
]

const GUIDES = [
  {
    href: guideHref('tax-back-australia-working-holiday'),
    title: guideText('tax-back-australia-working-holiday', 'Recuperar impuestos en Australia (tax back)'),
    desc: 'Qué significa recuperar impuestos con la working holiday y de dónde sale ese dinero.',
  },
  {
    href: guideHref('tax-obligations-after-leaving-australia'),
    title: guideText('tax-obligations-after-leaving-australia', 'Impuestos al salir de Australia: qué queda pendiente'),
    desc: 'Qué queda pendiente en Australia, qué países tienen convenio y qué guardar para la declaración de tu país.',
  },
  {
    href: guideHref('tax-return-deadline-31-october-working-holiday'),
    title: guideText('tax-return-deadline-31-october-working-holiday', 'Plazo de la tax return 2026 para working holiday'),
    desc: 'Qué fechas aplican a 2025-26 y qué cambia si presentas fuera de plazo.',
  },
  {
    href: guideHref('late-tax-return-penalty-working-holiday'),
    title: guideText('late-tax-return-penalty-working-holiday', 'Tax return tardía en Australia: multas de la ATO'),
    desc: 'Cuándo la ATO cobra intereses o una multa, y cuándo no.',
  },
  {
    href: guideHref('how-long-does-tax-refund-take-australia'),
    title: guideText('how-long-does-tax-refund-take-australia', 'Devolución de impuestos en Australia: cuánto tarda'),
    desc: 'Los plazos de la ATO desde que se presenta hasta que llega el pago.',
  },
  {
    href: guideHref('how-to-lodge-tax-return-from-overseas'),
    title: guideText('how-to-lodge-tax-return-from-overseas', 'Presentar el tax return después de irte'),
    desc: 'Qué sigue funcionando desde tu país y la regla de la cuenta bancaria.',
  },
  {
    href: guideHref('tax-deductions-working-holiday-makers'),
    title: guideText('tax-deductions-working-holiday-makers', 'Qué puedes deducir'),
    desc: 'Deducciones según el tipo de trabajo, en vez de una lista genérica.',
  },
]

const WA_TR = waUrl({ topic: 'tax-return', lang: 'es' })
const PAGE_URL = `${SITE_URL}/es/devolucion-impuestos-australia`

export default function DevolucionImpuestosAustraliaPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: 'Devolución de impuestos en Australia con la visa 462 o 417',
    description:
      'Qué es el tax return para un working holiday maker, quién debe presentarlo, cuánto cuesta y los pasos para hacerlo con la visa 462 o 417.',
    inLanguage: 'es',
    dateModified: '2026-11-05',
    citation: [
      'https://www.ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/2026/adjustments/working-holiday-maker',
      'https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia',
      'https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-before-leaving-australia',
      'https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return',
    ],
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${PAGE_URL}#service`,
    name: 'Tax return para working holiday makers',
    serviceType: 'Preparación del tax return',
    description:
      'Tax returns australianos para titulares de la visa 462 (Work and Holiday) y 417 (Working Holiday). Revisados y aprobados por un agente fiscal registrado antes de presentarse ante la ATO, también desde el extranjero.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 462 y 417)' },
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
      { '@type': 'ListItem', position: 2, name: 'Devolución de impuestos', item: PAGE_URL },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className={blocks.underHeader}>
        <Crumb home="Inicio" current="Devolución de impuestos" label="Ruta de navegación" href="/es" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>Devolución de impuestos en Australia&nbsp;&middot; visa 462 y 417</span>
              Tu devolución de impuestos en Australia (tax return), <Mark>sin myGov y sin payslips.</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>El tax return es la declaración de renta australiana: la declaración anual a la ATO que compara lo que te retuvieron con lo que debías, y si te retuvieron de más, la diferencia se devuelve. Con la visa 462 o 417 ahora se presenta el año 2025-26. El plazo para hacerlo por tu cuenta fue el 31 de octubre de 2026, pero todavía se puede presentar, también desde tu país.</Lead>
            <p className={heroStyles.note}>Actualizado el 5 de noviembre de 2026. Fuentes: ATO y Services Australia.</p>
          </div>
          <WaButton href={WA_TR} position="hero" topic="tax-return" lang="es">Escríbenos por WhatsApp</WaButton>
          <p className={heroStyles.note}>Respondemos en aproximadamente una hora en horario laboral.</p>
          <GoogleRating variant="pill" lang="es" />
        </Hero>
      </div>

      <PhotoFrame page="tax-return" locale="es" />

      <Section eyebrow="Lo básico" title="Qué es un tax return para un working holiday maker" titleId="basics-title">
        <p className={`${blocks.text} ${blocks.muted}`}>El tax return es la declaración anual a la ATO que compara lo que te retuvieron con lo que debías; si te retuvieron de más, la diferencia se devuelve. Si buscaste «devolución de impuestos Australia», esto es lo que significa en la práctica con la visa 462 (Work and Holiday) o la 417 (Working Holiday).</p>
        <PlainRows items={BASICS} />
        <p className={blocks.text}>
          ¿Cuánto te devuelven de impuestos en Australia con la visa 462? No hay un monto fijo ni un promedio que se
          pueda aplicar a tu caso: la devolución es lo que te retuvieron de más, y la cifra final la decide la ATO al
          evaluar tu tax return.{' '}
          <Link href={guideHref('average-tax-refund-working-holiday')} className={blocks.textLink}>
            {guideText('average-tax-refund-working-holiday', 'De qué depende cuánto te devuelven')}
          </Link>
          .
        </p>
      </Section>

      <Section tone="pale" eyebrow="Las cifras clave" title="Cifras clave del tax return 2025-26" titleId="figures-title">
        <div style={{ overflowX: 'auto' }}>
          <table className={blocks.text} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <caption className={blocks.small} style={{ textAlign: 'left', captionSide: 'top', paddingBottom: 10 }}>
              Tasas de working holiday maker, años 2025-26 y 2026-27
            </caption>
            <thead>
              <tr>
                <th scope="col" style={cellStyle}>Ingreso imponible</th>
                <th scope="col" style={cellStyle}>Tasa</th>
              </tr>
            </thead>
            <tbody>
              {WHM_RATES.map((r) => (
                <tr key={r.band}>
                  <th scope="row" style={cellStyle}>{r.band}</th>
                  <td style={cellStyle}>{r.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={blocks.small}>
          Sin tax-free threshold: con la visa 462 o 417 el 15 % se aplica desde el primer dólar.{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/2026/adjustments/working-holiday-maker" className={blocks.textLink} target="_blank" rel="noopener noreferrer">Fuente: ATO</a>.
        </p>
        <PlainRows items={KEY_FIGURES} />
        <p className={`${blocks.small} ${blocks.muted}`}>
          Que las tasas de working holiday maker se apliquen a tu año depende de tu situación y lo decide la ATO. Fuentes:
          ato.gov.au y servicesaustralia.gov.au, consultadas el 5 de noviembre de 2026:{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return" className={blocks.textLink} target="_blank" rel="noopener noreferrer">procesamiento</a>,{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia" className={blocks.textLink} target="_blank" rel="noopener noreferrer">cuenta australiana</a>,{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-before-leaving-australia" className={blocks.textLink} target="_blank" rel="noopener noreferrer">presentar antes de irte</a>.
        </p>
      </Section>

      <Section eyebrow="Nacionalidad" title="Con nacionalidad chilena, quizá otras tasas" titleId="chile-title">
        <p className={blocks.text}>
          Para el año 2025-26, la ATO indica que si fuiste residente de Australia a efectos fiscales y tienes la
          nacionalidad de Chile, Finlandia, Alemania, Israel, Japón, Noruega, Turquía o el Reino Unido, pagas las tasas
          de residente en lugar de las de working holiday maker, aunque también tengas otra nacionalidad. España,
          Argentina, Uruguay, México, Perú y Colombia no están en esa lista.
        </p>
        <p className={blocks.text}>
          La clave es la residencia fiscal, y no depende solo de la visa: depende de cómo fue tu año. Se valora caso por
          caso (está relacionado con el fallo Addy v Commissioner of Taxation [2021] HCA 34), forma parte de nuestra
          revisión y la decisión final es de la ATO.{' '}
          <Link href={guideHref('tax-residency-working-holiday-makers')} className={blocks.textLink}>
            {guideText('tax-residency-working-holiday-makers', '¿Eres residente fiscal de Australia?')}
          </Link>
        </p>
        <p className={blocks.small}>
          Fuente:{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/2026/adjustments/working-holiday-maker" className={blocks.textLink} target="_blank" rel="noopener noreferrer">ATO, instrucciones de myTax 2026 para working holiday makers</a>.
        </p>
        <p className={blocks.text}>
          ¿No sabes cuál de estas cifras se aplica a tu año? Escríbenos tu nacionalidad, los meses en que trabajaste y
          si ya saliste de Australia, y te decimos cómo queda tu caso.
        </p>
        <WaButton href={WA_TR} position="section" topic="tax-return" lang="es">Escríbenos por WhatsApp</WaButton>
      </Section>

      <Section tone="pale" eyebrow="De dónde sale una devolución" title="Qué puede cambiar el resultado de tu tax return" titleId="refund-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Una devolución no es un premio por viajar. Es la diferencia entre lo que tus empleadores te retuvieron y lo que realmente debías, y en un año de working holiday esa diferencia suele salir de los puntos de abajo.</p>
        <p className={blocks.text}>
          Los más comunes: semanas retenidas al 45 % antes de que tu empleador tuviera tu TFN, un segundo trabajo sin su propia
          Tax File Number Declaration, un empleador no registrado para working holiday makers, un Medicare levy que quizá no te
          correspondía (<Link href="/es/medicare" className={blocks.textLink}>cómo funciona la exención</Link>), gastos de
          trabajo que nadie declaró (<Link href="/es/expenses" className={blocks.textLink}>qué se puede deducir según tu
          trabajo</Link>) y tu residencia fiscal en ese año.{' '}
          <Link href="/es/tax-return" className={blocks.textLink}>Qué revisamos en cada punto</Link>.
        </p>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Ninguno de estos puntos es automático y ninguno se da por supuesto. Cada uno se revisa contra tu registro de la ATO antes de presentar nada. No podemos prometerte una devolución ni un monto.{' '}
          <Link href="/es/calculator" className={blocks.textLink}>Mira una estimación orientativa en la calculadora</Link>.
        </p>
      </Section>

      <Section eyebrow="Quién debe presentarlo" title="Quién tiene que hacer el tax return" titleId="who-title">
        <PlainRows items={WHO_MUST} />
        <p className={`${blocks.text} ${blocks.muted}`}>
          Si aún no tienes TFN, empieza por ahí:{' '}
          <Link href="/es/tfn" className={blocks.textLink}>cómo conseguir el TFN</Link>. Y si facturaste con un ABN, mira{' '}
          <Link href="/es/abn" className={blocks.textLink}>qué cambia con un ABN</Link>.
        </p>
      </Section>

      <Section tone="pale" eyebrow="Tu parte" title="Qué necesitamos de ti" titleId="needed-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Tres cosas, y esa es toda la lista.</p>
        <PlainRows items={NEEDED} />
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>No necesitas los payslips.</p>
          <p className={blocks.text}>Cada empleador que te pagó como empleado con sueldo ya informó un income statement con tu TFN, y de ahí sale el tax return. Lo único que vale la pena buscar son los comprobantes de gastos de trabajo, y si no hay, cuéntanos en qué consistió el trabajo.</p>
        </div>
      </Section>

      <Section id="how-it-works" eyebrow="El proceso" title="Cómo se hace con nosotros" titleId="sequence-title">
        <p className={blocks.text}>Nos escribes por WhatsApp, completas un cuestionario de unos diez minutos, revisamos tu registro de la ATO y te enviamos el tax return terminado para que lo leas y lo firmes. Después se presenta, revisado y aprobado por un agente fiscal registrado.</p>
        <LinkButton href="/es/tax-return">Cómo trabajamos tu tax return, paso a paso →</LinkButton>
      </Section>

      <Section tone="pale" eyebrow="Medicare" title="El Medicare levy según tu pasaporte" titleId="medicare-title">
        <p className={blocks.text}>El Medicare levy es el 2 % del ingreso imponible y se calcula al evaluar el tax return. España, Argentina, Chile, Uruguay, México, Perú y Colombia no tienen un Reciprocal Health Care Agreement con Australia, así que con esos pasaportes no tienes acceso a Medicare.</p>
        <p className={blocks.text}>
          Si el levy se aplicó a tu año, la exención se pide con un Medicare Entitlement Statement de Services Australia. La decisión es de la ATO.{' '}
          <Link href="/es/medicare" className={blocks.textLink}>Cómo funciona la exención del Medicare levy</Link>.
        </p>
      </Section>

      <Section eyebrow="Plazos" title="Si se te pasó el 31 de octubre" titleId="deadline-title">
        <p className={blocks.text}>Si presentas por tu cuenta, el plazo es el 31 de octubre posterior al fin del año fiscal. Para 2025-26 fue el 31 de octubre de 2026, que ya pasó. Un año fuera de plazo está atrasado, no perdido: todavía se puede presentar, y cuanto antes, mejor.</p>
        <p className={blocks.text}>
          Si debes impuestos, la ATO puede cobrar intereses sobre lo que debas y aplicar una{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/paying-the-ato/interest-and-penalties/penalties/failure-to-lodge-on-time-penalty" className={blocks.textLink} target="_blank" rel="noopener noreferrer">multa por presentación tardía</a>.
          El año 2026-27 empezó el 1 de julio de 2026 y se presenta a partir del 1 de julio de 2027.
        </p>
      </Section>

      <Section tone="pale" eyebrow="Antes de irte o desde tu país" title="Presentar el tax return si te vas o ya te fuiste" titleId="abroad-title">
        <p className={blocks.text}>
          Desde tu país se puede presentar sin problema. La ATO dice que la forma más fácil es por internet con myTax,
          con una cuenta de myGov vinculada a la ATO y con el acceso configurado para entrar desde el extranjero
          (recomienda una identidad digital como myID). La devolución, eso sí, solo se paga a una cuenta bancaria
          australiana.
        </p>
        <p className={blocks.text}>
          Presentarlo antes de irte solo es posible si te vas de Australia para siempre antes del 30 de junio y no vas a
          tener más ingresos australianos, salvo intereses, dividendos o regalías. Se hace en papel y la ATO tarda 50
          días hábiles en procesarlo. Si no cumples esas condiciones, se presenta en el período normal, del 1 de julio al
          31 de octubre, desde donde estés.
        </p>
        <p className={blocks.text}>La devolución solo puede ir a una cuenta bancaria australiana, mientras que la superannuation (DASP) sí se puede pagar en el extranjero. Si vas a cerrar tu cuenta, espera a que llegue la devolución o avísanos antes.</p>
        <p className={blocks.small}>
          Fuentes:{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia" className={blocks.textLink} target="_blank" rel="noopener noreferrer">ATO, presentar desde fuera de Australia</a> y{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-before-leaving-australia" className={blocks.textLink} target="_blank" rel="noopener noreferrer">ATO, presentar antes de irte</a>.{' '}
          <Link href={guideHref('how-to-lodge-tax-return-from-overseas')} className={blocks.textLink}>
            {guideText('how-to-lodge-tax-return-from-overseas', 'Cómo presentar la tax return australiana desde el extranjero')}
          </Link>
          .
        </p>
      </Section>

      <Section tone="pale" eyebrow="Por tu cuenta o con ayuda" title="¿Puedo hacerlo yo en myGov?" titleId="diy-title">
        <p className={blocks.text}>Sí. Presentar tú mismo el tax return en myGov es gratis y, si tu año fue sencillo y sigues teniendo acceso, puede bastar. myGov parte del registro de la ATO, y el Medicare levy queda aplicado salvo que tú pidas la exención con el documento que corresponde.</p>
        <p className={blocks.text}>Si lo haces tú en myTax, estos son los pasos:</p>
        <ol className={blocks.text} style={{ paddingLeft: '1.25em' }}>
          <li>Crea tu cuenta de myGov y vincúlala con la ATO. Si estás fuera de Australia, configura antes el acceso desde el extranjero.</li>
          <li>Revisa que cada empleador aparezca con su income statement. Si falta uno, no presentes todavía.</li>
          <li>En la sección de working holiday maker, elige tu país e indica qué ingresos y deducciones corresponden a la visa 462 o 417.</li>
          <li>Si tu pasaporte no tiene acuerdo de salud con Australia, puedes pedir la exención del Medicare levy con el Medicare Entitlement Statement. Si no la pides, el 2 % queda aplicado.</li>
          <li>Indica una cuenta bancaria australiana para la devolución y presenta.</li>
        </ol>
        <p className={blocks.small}>
          Fuentes:{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/2026/adjustments/working-holiday-maker" className={blocks.textLink} target="_blank" rel="noopener noreferrer">ATO, sección working holiday maker</a> y{' '}
          <a href="https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia" className={blocks.textLink} target="_blank" rel="noopener noreferrer">ATO, presentar desde fuera de Australia</a>.{' '}
          <Link href={guideHref('diy-tax-return-vs-tax-agent-working-holiday')} className={blocks.textLink}>
            {guideText('diy-tax-return-vs-tax-agent-working-holiday', 'Declaración por tu cuenta o con agente')}
          </Link>
          .
        </p>
        <p className={blocks.text}>Conviene tener ayuda cuando hubo semanas retenidas al 45 % sin TFN, varios empleadores, ingresos facturados con un ABN, un pasaporte que da derecho a pedir la exención del Medicare levy o cuando ya saliste de Australia y no puedes entrar a myGov.</p>
      </Section>

      <Section eyebrow="Precio" title="Cuánto cuesta" titleId="cost-title">
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>220 AUD (GST incluido) si solo tuviste TFN.</p>
          <p className={blocks.statement}>385 AUD (GST incluido) si también facturaste con un ABN.</p>
          <p className={blocks.text}>La tarifa se acuerda contigo por WhatsApp antes de empezar. De lo que paga la ATO nunca se descuenta nada.</p>
          <p className={blocks.text}>Depende de si solo tuviste ingresos con TFN o también facturaste con un ABN. De lo que paga la ATO nunca se descuenta nada.</p>
        </div>
      </Section>

      <Section tone="amber" title="Nuestra garantía" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Si tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes impuestos, se aplica la tarifa completa. La garantía cubre solo las declaraciones con ingresos con TFN.
        </p>
        <p className={blocks.text}>No te prometemos una devolución. Lo que sí hacemos es revisar tu caso con cuidado antes de presentar.</p>
      </Section>

      <Section title="Lo que no cubrimos" titleId="scope-title">
        <PlainRows items={NOT_COVERED} />
      </Section>

      <Section tone="pale" title="Solo hacemos impuestos de working holiday." titleId="trust-title">
        <p className={blocks.text}>El cuestionario, las revisiones y el orden de arriba están pensados para un solo año de visa. Lo prepara nuestro equipo, que opera bajo la supervisión de un agente fiscal registrado. Revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO.</p>
        <GoogleReviewsServer lang="es" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Nadie serio te va a pedir tu contraseña de myGov.</strong>{' '}
          Nosotros nunca la pedimos, porque el camino de arriba no la necesita. Si un mensaje te la pide, no viene de nosotros.
        </p>
      </Section>

      <Section title="Lo que se pregunta antes de escribirnos" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Guías" title="La versión larga de los pasos difíciles" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="Lo que sigue" title="No dejes tu super olvidada" titleId="next-title">
        <p className={blocks.text}>Tu empleador pagó superannuation además de tu sueldo mientras trabajaste. Cuando te vas de Australia para siempre se puede reclamar, aparte del tax return.</p>
        <LinkButton href="/es/superannuation">Cómo funciona el reclamo de la super →</LinkButton>
      </Section>

      <Section tone="forest" title="Empieza con un mensaje, no con un formulario" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Cuéntanos en qué lugares trabajaste, más o menos qué meses, y si alguna vez facturaste con un ABN. Con eso te decimos qué años siguen abiertos y cómo es tu parte. Que hayan pasado dos años desde que volviste no impide empezar.</p>
        <WaButton href={WA_TR} position="section" topic="tax-return" lang="es" tone="light">Escríbenos por WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Respondemos en aproximadamente una hora en horario laboral.</p>
        <p className={`${blocks.small} ${blocks.onForest}`}>
          ¿Prefieres el formulario?{' '}
          <Link href="/start" className={blocks.textLink}>Ir al formulario (en inglés)</Link>
        </p>
      </Section>

      <MobileCta href={WA_TR} lang="es" topic="tax-return" />
    </>
  )
}
