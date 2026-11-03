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
import { Steps, LinkRows, blocks } from '@/components/wht/Blocks'
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
  title: { absolute: 'Devolución de impuestos Australia: tax return con visa 462' },
  description:
    'Tax return con la visa 462 o 417: quién debe presentarlo, cuánto cuesta y los pasos, sin payslips ni myGov.',
  keywords: [
    'devolución de impuestos Australia',
    'tax return Australia',
    'tax return Australia español',
    'tax return visa 462',
    'tax return working holiday Australia',
    'devolución de impuestos working holiday Australia',
    'cómo hacer el tax return en Australia',
    'recuperar impuestos Australia',
    'tax return Australia desde el extranjero',
    'tax return Australia sin payslips',
    'cuánto cuesta el tax return en Australia',
    'cuánto tarda la devolución de impuestos en Australia',
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
    title: 'Devolución de impuestos en Australia (visa 462 y 417)',
    description:
      'Tus datos y dónde quieres recibir la devolución. Preparamos el tax return, tú lo revisas y lo firmas, y se presenta ante la ATO.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tax-return.png`],
    card: 'summary_large_image',
    title: 'Devolución de impuestos en Australia (visa 462 y 417)',
    description: 'Pasaporte, datos del banco, sin payslips. Tú firmas, nosotros presentamos.',
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
 * Where a working holiday refund comes from. Same mechanisms as the English
 * page; no amount is promised.
 */
const REFUND_SOURCES = [
  {
    label: 'Semanas con 45 % antes de tener tu TFN',
    body: 'Si tu empleador no tiene tu TFN (tax file number) ni una declaración de que tu solicitud está en curso, debe retener 45 % en vez de 15 %. Todos los payslips de ese período tienen retención de más, y esa diferencia se revisa con un tax return presentado.',
  },
  {
    label: 'Un segundo trabajo sin su propia declaración',
    body: 'Cada empleador necesita su propia Tax File Number Declaration. Un segundo trabajo sin ella retiene 45 % mientras nadie lo note, a veces durante meses.',
  },
  {
    label: 'Un empleador no registrado para working holiday makers',
    body: 'La tasa que el empleador debe retener depende, entre otras cosas, de cómo esté registrado ante la ATO. Si no lo estaba, es posible que te hayan retenido a una tasa que no correspondía, y lo revisamos.',
  },
  {
    label: 'Un Medicare levy que quizá no te correspondía',
    body: 'El 2 % se aplica por defecto. Si en tu caso no correspondía, se puede pedir un certificado de exención. Depende de tu situación y lo decide la ATO.',
  },
  {
    label: 'Gastos de trabajo que nadie declaró',
    body: 'Zapatos, uniforme, herramientas, licencias y traslados entre lugares de trabajo pueden bajar tu ingreso imponible si se relacionan con el trabajo que hiciste. Cuánto bajan el impuesto depende de la escala que se aplique a tu año.',
  },
  {
    label: 'Tu residencia fiscal',
    body: 'Según cómo fue tu año, un fallo judicial de 2021 puede influir en las tasas que se aplican. No es algo que se deba dar por hecho: lo vemos en nuestra revisión y la decisión final es de la ATO.',
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

/** The sequence, in the order it happens. */
const SEQUENCE = [
  {
    n: '01',
    title: 'Nos escribes por WhatsApp',
    body: 'En español o en inglés. Nos cuentas cómo fue tu año, te decimos en qué punto estás y acordamos la tarifa antes de empezar cualquier trabajo.',
  },
  {
    n: '02',
    title: 'Un cuestionario de unos diez minutos',
    body: 'Datos del pasaporte y de la visa, datos del banco, los lugares y el tipo de trabajo. Es el único formulario que completas, y por ahora está en inglés. Lo que no aplique, déjalo en blanco y te preguntamos.',
  },
  {
    n: '03',
    title: 'Abrimos tu registro en la ATO',
    body: 'Cada empleador que informó sobre ti, cada income statement, cada dólar retenido y cualquier año anterior que siga abierto. Los trabajos olvidados y las semanas con la tasa más alta aparecen aquí, no en lo que recuerdas.',
  },
  {
    n: '04',
    title: 'Las decisiones que mueven el resultado',
    body: 'Tu residencia fiscal en ese año, las semanas retenidas antes de que llegara tu TFN, si el Medicare levy te correspondía alguna vez y qué puede deducir tu tipo de trabajo. Es la parte lenta, y es la parte por la que pagas.',
  },
  {
    n: '05',
    title: 'Lo lees y lo firmas',
    body: 'Te enviamos el tax return terminado con cada cifra explicada. No se envía nada a la ATO hasta que lo hayas leído y firmado la declaración. La firma es electrónica, así que se puede hacer desde el teléfono, estés donde estés.',
  },
  {
    n: '06',
    title: 'Se presenta',
    body: 'Revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO. La presentación en sí toma minutos.',
  },
  {
    n: '07',
    title: 'La ATO paga',
    body: 'Si hay devolución, suele llegar unos 14 días hábiles después de presentar, a la cuenta australiana que nos diste. Si la ATO consulta algo, lo respondemos y te contamos qué preguntaron.',
  },
]

/** Two rules that change the order of operations. */
const RULES = [
  {
    label: 'La devolución solo puede ir a una cuenta australiana',
    body: 'La superannuation (DASP) se puede pagar a una cuenta en el extranjero. La devolución del tax return no. Si vas a cerrar tu cuenta australiana, espera a que llegue la devolución o avísanos antes.',
  },
  {
    label: 'Los años anteriores todavía se pueden presentar',
    body: 'Un año fiscal que nunca presentaste no caduca en silencio. Cada año es su propia declaración y su propia devolución, y los trabajamos en orden, del más antiguo al más reciente.',
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
    question: '¿Tengo que hacer el tax return si trabajé pocos meses con la visa 462?',
    answer:
      'Casi seguro que sí. La obligación sigue al ingreso, no al tiempo que estuviste: dos semanas de trabajo crean la misma obligación que dos años. Los trabajos cortos a veces se retienen a una tasa más alta de lo debido, y solo un tax return presentado lo corrige. No podemos prometerte una devolución.\n\nLas excepciones son pocas, por ejemplo no haber tenido ningún ingreso en Australia. Si dudas, escríbenos con tu caso.',
  },
  {
    question: '¿Esto reemplaza la declaración de impuestos de mi país?',
    answer:
      'No. El tax return australiano y la declaración de tu país son trámites separados. Nosotros solo nos ocupamos de impuestos australianos. Para saber qué te corresponde hacer en tu país, consulta con la oficina de impuestos de tu país.',
  },
  {
    question: '¿Cuánto cuesta?',
    answer:
      'La tarifa es de 220 AUD (GST incluido) si tus ingresos fueron solo con TFN, y de 385 AUD (GST incluido) si también facturaste con un ABN. Acordamos la tarifa contigo por WhatsApp antes de empezar, y nunca se descuenta nada de lo que te envía la ATO.\n\nSi tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes dinero a la ATO, se aplica la tarifa completa.',
  },
  {
    question: '¿Cuánto tarda la devolución?',
    answer:
      'Desde el día en que recibimos tu cuestionario, un año sencillo toma unos pocos días para prepararse y revisarse. Después, la ATO suele pagar la devolución unos 14 días hábiles tras la presentación.\n\nCinco empleadores, ingresos facturados con ABN o una residencia fiscal que hay que valorar con cuidado toman más tiempo de nuestro lado. Te avisamos cuál es tu caso.',
  },
  {
    question: '¿Hasta cuándo se puede presentar?',
    answer:
      'Si lo presentas por tu cuenta, el plazo es el 31 de octubre posterior al fin del año fiscal, que termina el 30 de junio. Para 2025-26 fue el 31 de octubre de 2026, que ya pasó. Un año fuera de plazo está atrasado, no perdido, y todavía se puede presentar.',
  },
  {
    question: '¿Necesitan mis payslips?',
    answer:
      'No. Cada empleador que te pagó como empleado con sueldo informó un income statement a la ATO, y de ese registro sale el tax return. Haber perdido los payslips (recibos de sueldo o nóminas) o que el empleador ya no exista es un punto de partida normal.\n\nLo único que conviene buscar son los comprobantes de gastos de trabajo. Si no los tienes, cuéntanos en qué consistió el trabajo y te decimos qué se puede deducir igual.',
  },
  {
    question: '¿Qué tengo que hacer yo?',
    answer:
      'Tres cosas: completar el cuestionario una vez, leer el tax return que te enviamos y firmarlo. No necesitas crear una cuenta de myGov ni interpretar ningún formulario de la ATO, porque la presentación se hace a través de nosotros.',
  },
  {
    question: '¿Puedo hacerlo si ya salí de Australia?',
    answer:
      'Sí. Muchos de los tax returns que presentamos son de personas que ya volvieron a su país. El cuestionario, la firma y la presentación son por internet.\n\nLo único que no viaja es la devolución: la ATO solo la puede pagar a una cuenta bancaria australiana, mientras que la superannuation (DASP) sí se puede pagar en el extranjero. Si tu cuenta australiana ya está cerrada, cuéntanoslo en el primer mensaje.',
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
  {
    question: '¿Qué no cubren?',
    answer:
      'Solo impuestos australianos. No presentamos declaraciones de tu país ni opinamos sobre cómo se tratan tus ingresos australianos allí; para eso, consulta con la oficina de impuestos de tu país.',
  },
]

const GUIDES = [
  {
    href: guideHref('how-to-lodge-tax-return-from-overseas'),
    title: guideText('how-to-lodge-tax-return-from-overseas', 'Presentar el tax return después de irte'),
    desc: 'Qué sigue funcionando desde tu país y la regla de la cuenta bancaria que sorprende a mucha gente.',
  },
  {
    href: guideHref('tax-residency-working-holiday-makers'),
    title: guideText('tax-residency-working-holiday-makers', 'Residencia fiscal en una working holiday'),
    desc: 'Por qué el paso 04 no se resuelve con una lista de preguntas.',
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
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${PAGE_URL}#service`,
    name: 'Tax return para working holiday makers',
    serviceType: 'Preparación y presentación del tax return',
    description:
      'Tax returns australianos para titulares de la visa 462 (Work and Holiday) y 417 (Working Holiday). Revisados y aprobados por un agente fiscal registrado antes de presentarse ante la ATO, también desde el extranjero.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 462 y 417)' },
    inLanguage: 'es',
  }

  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${PAGE_URL}#howto`,
    name: 'Cómo se presenta un tax return de working holiday maker en Australia',
    description:
      'El orden en que se prepara y se presenta un tax return con la visa 462 o 417, desde el primer mensaje hasta la llegada de la devolución.',
    inLanguage: 'es',
    step: SEQUENCE.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
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
            <Lead>Un cuestionario, una firma, y, si hay devolución, suele llegar unos 14 días hábiles después de presentar. Sin cuenta de myGov y sin formularios de la ATO que descifrar.</Lead>
          </div>
          <WaButton href={WA_TR} position="hero" topic="tax-return" lang="es">Escríbenos por WhatsApp</WaButton>
          <p className={heroStyles.note}>Respondemos en aproximadamente una hora en horario laboral.</p>
          <GoogleRating variant="pill" lang="es" />
        </Hero>
      </div>

      <PhotoFrame page="tax-return" locale="es" />

      <Section eyebrow="Lo básico" title="Qué es un tax return para un working holiday maker" titleId="basics-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Si buscaste «devolución de impuestos Australia», esto es lo que significa en la práctica. Con la visa 462 (Work and Holiday) o la 417 (Working Holiday), el tax return es la declaración anual de lo que ganaste y de los impuestos que ya te retuvieron.</p>
        <PlainRows items={BASICS} />
      </Section>

      <Section tone="pale" eyebrow="De dónde sale una devolución" title="Qué puede cambiar el resultado de tu tax return" titleId="refund-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Una devolución no es un premio por viajar. Es la diferencia entre lo que tus empleadores te retuvieron y lo que realmente debías, y en un año de working holiday esa diferencia suele salir de los puntos de abajo.</p>
        <div className={blocks.cards}>
          {REFUND_SOURCES.map((r) => (
            <div key={r.label} className={blocks.card}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
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

      <Section id="how-it-works" eyebrow="El proceso" title="El orden en que ocurre" titleId="sequence-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Siete pasos. Tú participas en dos: al principio y al firmar.</p>
        <Steps items={SEQUENCE} />
      </Section>

      <Section tone="pale" title="Dos reglas que cambian el orden" titleId="rules-title">
        <div className={blocks.cards}>
          {RULES.map((r) => (
            <div key={r.label} className={`${blocks.palePanel} ${blocks.stack}`}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Precio" title="Cuánto cuesta" titleId="cost-title">
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>220 AUD (GST incluido) si solo tuviste TFN.</p>
          <p className={blocks.statement}>385 AUD (GST incluido) si también facturaste con un ABN.</p>
          <p className={blocks.text}>La tarifa se acuerda contigo por WhatsApp antes del paso 01. De lo que paga la ATO nunca se descuenta nada.</p>
        </div>
      </Section>

      <Section tone="amber" title="Nuestra garantía" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Si tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes impuestos, se aplica la tarifa completa.
        </p>
        <p className={blocks.text}>No te prometemos una devolución. Lo que sí hacemos es revisar tu caso con cuidado antes de presentar.</p>
      </Section>

      <Section title="Lo que no cubrimos" titleId="scope-title">
        <PlainRows items={NOT_COVERED} />
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>¿Esto reemplaza la declaración de mi país? No.</p>
          <p className={blocks.text}>Es un asunto aparte. Para saber qué te toca hacer allí, consulta con la oficina de impuestos de tu país.</p>
        </div>
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
