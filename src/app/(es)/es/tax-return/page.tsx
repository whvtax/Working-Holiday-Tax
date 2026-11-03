import { newLocaleLanguages } from '@/lib/locale-pages'
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

// Metadata en español. Esta página responde a quien ya decidió que quiere ayuda
// y quiere saber qué pasa a continuación. Sin precio en título, descripción ni
// schema, y sin afirmar que somos agente registrado.
export const metadata: Metadata = {
  // El layout raíz añade " | Working Holiday Tax" al título.
  title: 'Tax return Australia: visa 462 y 417',
  description:
    'Con visa 462 o 417 solo necesitas pasaporte y cuenta bancaria australiana, sin payslips ni myGov.',
  keywords: [
    'tax return Australia working holiday',
    'devolución de impuestos Australia',
    'declaración de impuestos Australia mochilero',
    'tax return visa 462',
    'tax return visa 417',
    'cómo hacer el tax return en Australia',
    'tax return desde el extranjero Australia',
    'recuperar impuestos Australia al volver a casa',
    'tax return de años anteriores Australia',
    'tax return sin payslips',
    'income statement ATO',
    'cuánto tarda la devolución de impuestos en Australia',
    'tax return Australia desde España',
    'tax return Australia desde Argentina',
    'tax return Australia desde Chile',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/tax-return`,
    languages: {
      'en-AU': `${SITE_URL}/tax-return`,
      de: `${SITE_URL}/de/tax-return`,
      ja: `${SITE_URL}/ja/tax-return`,
      ...newLocaleLanguages('/tax-return'),
      'x-default': `${SITE_URL}/tax-return`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tax-return.png`, width: 1200, height: 630, alt: 'Tax return en Australia para titulares de visas working holiday 462 y 417' }],
    type: 'website',
    locale: 'es_LA',
    url: `${SITE_URL}/es/tax-return`,
    siteName: 'Working Holiday Tax',
    title: 'Tax return en Australia con visa working holiday (462 y 417)',
    description:
      'Tus datos y la cuenta donde quieres recibir la devolución. Leemos tu registro de la ATO, preparamos el tax return, tú lo firmas, lo presentamos y, si hay devolución, suele llegar unos 14 días hábiles después.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tax-return.png`],
    card: 'summary_large_image',
    title: 'Tax return en Australia con visa working holiday (462 y 417)',
    description: 'Pasaporte y datos bancarios, sin payslips. Lo firmas tú y lo presentamos nosotros. Si hay devolución, la ATO suele pagarla en unos 14 días hábiles.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// --- COPY ---------------------------------------------------------------

/** Todo lo que tienes que aportar tú. Tres cosas y nada más. */
const NEEDED = [
  {
    label: 'Tu pasaporte y tu visa',
    body: 'Qué pasaporte tienes y con qué subclass estabas.',
  },
  {
    label: 'Una cuenta bancaria australiana',
    body: 'La ATO solo paga las devoluciones en una cuenta de Australia. Si la tuya ya está cerrada, dínoslo desde el principio.',
  },
  {
    label: 'Más o menos dónde y cuándo trabajaste',
    body: 'Una ciudad, el tipo de trabajo, los meses aproximados. Lo cruzamos con el registro de la ATO y completamos el resto.',
  },
]

/** La secuencia, en el orden en que ocurre, con las esperas incluidas. */
const SEQUENCE = [
  {
    n: '01',
    title: 'Nos escribes',
    body: 'Por WhatsApp. Nos cuentas cómo fue tu año, te decimos en qué punto estás y acordamos la tarifa antes de empezar cualquier trabajo.',
  },
  {
    n: '02',
    title: 'Un cuestionario, unos diez minutos',
    body: 'Datos del pasaporte y de la visa, datos bancarios, las ciudades y el tipo de trabajo. Es el único formulario que rellenas. Si algo no aplica, déjalo en blanco y te preguntamos.',
  },
  {
    n: '03',
    title: 'Abrimos tu registro en la ATO',
    body: 'Cada empleador que te declaró, cada income statement, cada dólar retenido y cualquier año anterior que siga abierto. Los trabajos olvidados y las semanas gravadas con la tasa más alta salen aquí, no de lo que recuerdas.',
  },
  {
    n: '04',
    title: 'Las decisiones que mueven la cifra',
    body: 'La residencia fiscal del año, las semanas retenidas antes de que llegara tu Tax File Number, si el Medicare levy te correspondía pagarlo alguna vez y qué puede deducir tu tipo de trabajo. Es la parte lenta, y la parte por la que pagas.',
  },
  {
    n: '05',
    title: 'Lo lees y lo firmas',
    body: 'Te mandamos el tax return terminado con cada cifra explicada, y no se envía nada a la ATO hasta que lo hayas leído y firmado la declaración. La firma es electrónica, así que funciona desde un teléfono en otro hemisferio.',
  },
  {
    n: '06',
    title: 'Se presenta',
    body: 'Revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO. Presentarlo lleva minutos.',
  },
  {
    n: '07',
    title: 'La ATO paga',
    body: 'Si hay devolución, suele llegar unos 14 días hábiles después de presentar el tax return, a la cuenta australiana que nos diste. Si la ATO pregunta algo, lo respondemos y te contamos qué preguntó.',
  },
]

/**
 * De dónde sale una devolución de working holiday. Cada punto es un mecanismo
 * que ya aparece en otras páginas del sitio; no se promete ninguna cifra.
 */
const REFUND_SOURCES = [
  {
    label: 'Semanas al 45 % antes de que llegara tu TFN',
    body: 'Sin tu Tax File Number registrado, y sin una declaración que indique que tu solicitud está en trámite, tu empleador debe retener el 45 % en lugar del 15 %. Cada pago de ese período se retuvo de más, y esa diferencia se revisa con un tax return presentado.',
  },
  {
    label: 'Un segundo trabajo sin su propia declaración',
    body: 'Cada empleador necesita su propia Tax File Number Declaration. Un segundo trabajo sin ella retiene el 45 % mientras nadie lo note, a veces durante meses.',
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
    label: 'Gastos de trabajo que nadie reclamó',
    body: 'Calzado, uniformes, herramientas, licencias y traslados entre obras pueden reducir tu ingreso imponible cuando están relacionados con el trabajo que hiciste. Cuánto pesan en tu impuesto depende de tu situación individual.',
  },
  {
    label: 'Tu residencia fiscal',
    body: 'Según cómo fue tu año, un fallo judicial de 2021 puede influir en las tasas que te corresponden. No es algo que se deba dar por hecho: forma parte de nuestra revisión y la decisión final es de la ATO.',
  },
]

const RULES = [
  {
    label: 'La devolución solo puede ir a una cuenta australiana',
    body: 'La superannuation (DASP) se puede pagar en una cuenta del extranjero. La devolución de impuestos, no. Si vas a cerrar tu cuenta bancaria australiana, espera a que llegue la devolución o avísanos antes.',
  },
  {
    label: 'Los años anteriores se pueden reclamar',
    body: 'Un año fiscal en el que nunca presentaste no caduca en silencio. Cada año es su propio tax return y su propia devolución, y los trabajamos empezando por el más antiguo.',
  },
]

// Las respuestas de más de unas 55 palabras llevan una línea en blanco, y el FAQ
// de abajo pinta un <p> por párrafo. faqLd usa el texto crudo, así que el schema no cambia.
const FAQS = [
  {
    question: '¿Cuánto tarda un tax return de working holiday?',
    answer:
      'Desde el día en que recibimos tu cuestionario, un año sencillo tarda unos días en prepararse y revisarse, y la ATO suele pagar la devolución unos 14 días hábiles después de presentarlo.\n\nCinco empleadores, ingresos facturados con un ABN o una residencia fiscal que hay que valorar con cuidado llevan más tiempo de nuestro lado, y te decimos cuál es tu caso.',
  },
  {
    question: '¿Cuál es el plazo para presentar el tax return de working holiday?',
    answer:
      'Si lo presentas por tu cuenta, es el 31 de octubre posterior al fin del año fiscal. Por ejemplo, el del año fiscal 2025-26 vencía el 31 de octubre de 2026, que ya pasó. Un año fuera de plazo está atrasado, no perdido, y todavía se puede presentar.',
  },
  {
    question: '¿Necesitan mis payslips?',
    answer:
      'No. Cada empleador que te pagó como empleado con sueldo informó un income statement a la ATO, y ese registro es la base del tax return. Haber perdido los payslips o que el empleador haya cerrado es un punto de partida normal.\n\nLo único que vale la pena buscar son los recibos de gastos de trabajo. Si no los tienes, describe el trabajo y te decimos qué se puede reclamar sin ellos.',
  },
  {
    question: '¿Qué tengo que hacer yo exactamente?',
    answer:
      'Tres cosas. Responder el cuestionario una vez, leer el tax return que te enviamos y firmarlo. No hay que crear ninguna cuenta del gobierno ni interpretar ningún formulario de la ATO, porque la presentación se hace a través de nosotros.',
  },
  {
    question: '¿Pueden presentarlo por mí si ya salí de Australia?',
    answer:
      'Sí, y muchos de los tax returns que presentamos son de personas que ya están de vuelta en casa. El cuestionario, la firma y la presentación son por internet.\n\nLa devolución en sí no viaja: la ATO solo puede pagarla en una cuenta bancaria australiana, mientras que la superannuation (DASP) se puede pagar en el extranjero. Si tu cuenta australiana ya está cerrada, dínoslo en el primer mensaje.\n\nTu declaración de impuestos en tu país de origen es un asunto aparte: pregúntale a tu oficina de impuestos. Nosotros solo nos ocupamos de los impuestos de Australia.',
  },
  {
    question: '¿Y si nunca presenté el tax return de un año anterior?',
    answer:
      'Todavía se puede presentar. Cada año fiscal se evalúa por separado, con su propio tax return y su propia devolución, y el registro de la ATO muestra qué años siguen abiertos.\n\nSi hay devolución o no, y de cuánto, lo decide la ATO. No podemos prometerte un monto.',
  },
  {
    question: '¿Qué pasa si el tax return dice que debo dinero?',
    answer:
      'A veces ocurre, sobre todo cuando se facturó con un ABN y no se retuvo nada.\n\nVes esa cifra antes de que se presente nada, con una explicación de dónde sale y de las opciones de pago de la ATO. No se envía nada sin tu firma.',
  },
]

// Las guías pasan por guideHref/guideText (_blog-links.ts): si la guía aún no existe en
// español, se enlaza la versión en inglés y se avisa en el texto.
const GUIDES = [
  {
    href: guideHref('how-to-lodge-tax-return-from-overseas'),
    title: guideText('how-to-lodge-tax-return-from-overseas', 'Presentar el tax return después de irte'),
    desc: 'Qué sigue funcionando desde casa y la regla de la cuenta bancaria que sorprende a mucha gente.',
  },
  {
    href: guideHref('tax-residency-working-holiday-makers'),
    title: guideText('tax-residency-working-holiday-makers', 'Residencia fiscal en una working holiday'),
    desc: 'Por qué el paso 04 no se resuelve con una lista de comprobación.',
  },
  {
    href: guideHref('tax-deductions-working-holiday-makers'),
    title: guideText('tax-deductions-working-holiday-makers', 'Qué puedes deducir'),
    desc: 'Deducciones según el tipo de trabajo que hiciste, no una lista genérica.',
  },
]

const WA_TR = waUrl({ topic: 'tax-return', lang: 'es' })

export default function TaxReturnPageES() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/es/tax-return#webpage`,
    url: `${SITE_URL}/es/tax-return`,
    name: 'Tax return en Australia con visa working holiday',
    description:
      'Cómo se presenta un tax return australiano para un titular de visa working holiday 462 o 417: qué te pedimos, qué revisamos, cómo lo firmas y cuándo llega la devolución.',
    inLanguage: 'es',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/es/tax-return#service`,
    name: 'Presentación del tax return para visa working holiday',
    serviceType: 'Preparación y presentación del tax return',
    description:
      'Tax returns australianos para titulares de visas working holiday 462 y 417. Revisados y aprobados por un agente fiscal registrado antes de presentarse ante la ATO, también desde el extranjero.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Titular de visa working holiday (subclass 462 y 417)' },
    inLanguage: 'es',
  }

  // Los siete pasos, publicados como procedimiento legible por máquinas.
  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}/es/tax-return#howto`,
    name: 'Cómo se presenta un tax return de working holiday',
    description:
      'El orden en que se prepara y se presenta un tax return de visa 462 o 417, desde el primer mensaje hasta que llega la devolución.',
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
      { '@type': 'ListItem', position: 2, name: 'Tax return', item: `${SITE_URL}/es/tax-return` },
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
        <Crumb home="Inicio" current="Tax return" label="Ruta de navegación" href="/es" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>Tax return de working holiday&nbsp;&middot; visas 462 y 417</span>
              Tus datos y la cuenta donde quieres tu devolución. <Mark>De lo demás nos ocupamos nosotros.</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>Sin payslips, sin cuenta de myGov, sin formularios que descifrar. Un cuestionario, una firma, y, si hay devolución, suele llegar unos 14 días hábiles después de presentar el tax return.</Lead>
          </div>
          <WaButton href={WA_TR} position="hero" topic="tax-return" lang="es">Escríbenos por WhatsApp</WaButton>
          <p className={heroStyles.note}>Respondemos en cerca de una hora.</p>
          <GoogleRating variant="pill" lang="es" />
        </Hero>
      </div>

      <PhotoFrame page="tax-return" locale="es" />

      <Section tone="pale" eyebrow="De dónde sale una devolución" title="Qué puede cambiar el resultado del tax return de una working holiday" titleId="refund-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Una devolución no es un regalo por ser mochilero. Es la diferencia entre lo que tus empleadores retuvieron y lo que realmente debías, y en un año de working holiday esa diferencia suele venir de los puntos de abajo. Cuánto pesa cada uno depende de tu año.</p>
        <div className={blocks.cards}>
          {REFUND_SOURCES.map((r) => (
            <div key={r.label} className={blocks.card}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Ninguno es automático y ninguno se da por hecho. Cada uno se comprueba contra tu registro de la ATO antes de presentar nada.{' '}
          <Link href="/es/calculator" className={blocks.textLink}>Mira una estimación orientativa en la calculadora</Link>.
        </p>
      </Section>

      <Section eyebrow="Tu parte" title="Qué necesitamos de ti" titleId="needed-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Tres cosas, y esa es toda la lista.</p>
        <PlainRows items={NEEDED} />
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>No necesitas tus payslips.</p>
          <p className={blocks.text}>Cada empleador que te pagó con sueldo ya informó un income statement con tu Tax File Number, y de eso se construye el tax return. Lo único que vale la pena buscar son los recibos de gastos de trabajo; si no hay, cuéntanos en qué consistió el trabajo.</p>
        </div>
      </Section>

      <Section id="how-it-works" tone="pale" eyebrow="El proceso" title="El orden en que ocurre" titleId="sequence-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Siete pasos. Tú apareces en dos: al principio y otra vez para firmar.</p>
        <Steps items={SEQUENCE} />
        <p className={`${blocks.text} ${blocks.muted}`}>
          Más sobre el paso 04:{' '}
          <Link href="/es/abn" className={blocks.textLink}>qué cambia un ABN</Link>, si parte de tus ingresos se facturó en lugar de cobrarse como sueldo.
        </p>
      </Section>

      <Section title="Dos reglas que cambian el orden en que lo haces" titleId="rules-title">
        <div className={blocks.cards}>
          {RULES.map((r) => (
            <div key={r.label} className={`${blocks.palePanel} ${blocks.stack}`}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="amber" title="Nuestra garantía" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Si tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes dinero a la ATO, se aplica la tarifa completa.
        </p>
        <p className={blocks.text}>Nunca se descuenta nada de lo que te envía la ATO. El importe se acuerda contigo por WhatsApp antes del paso 01.</p>
      </Section>

      <Section tone="pale" title="Solo hacemos impuestos para titulares de visa working holiday." titleId="trust-title">
        <p className={blocks.text}>El cuestionario, las revisiones y el orden de arriba están pensados para un año de visa working holiday y nada más. Revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO.</p>
        <GoogleReviewsServer lang="es" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Nadie legítimo te pedirá la contraseña de myGov.</strong>{' '}
          Nosotros nunca la pedimos, porque la vía de presentación de arriba no la usa. Si un mensaje te pide esos datos, no viene de nosotros.
        </p>
      </Section>

      <Section title="Lo que se pregunta antes de mandarnos nada" titleId="faq-title">
        {/* El Accordion divide las respuestas por línea en blanco; faqLd usa el texto crudo. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Guías" title="La versión larga de los pasos difíciles" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="Lo siguiente" title="No dejes tu super atrás" titleId="next-title">
        <p className={blocks.text}>Tu empleador pagó la superannuation además de tu sueldo mientras trabajabas aquí. Cuando te vayas de Australia para siempre se puede reclamar, aparte del tax return.</p>
        <LinkButton href="/es/superannuation">Cómo funciona el reclamo de la super →</LinkButton>
      </Section>

      <Section tone="forest" title="Empieza con un mensaje, no con un formulario" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Mándanos las ciudades donde trabajaste, más o menos qué meses y si alguna vez facturaste con un ABN. Con eso te decimos qué años siguen abiertos y cómo queda tu parte. Que hayan pasado dos años desde que volviste a casa no impide empezar.</p>
        <WaButton href={WA_TR} position="section" topic="tax-return" lang="es" tone="light">Escríbenos por WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Respondemos en cerca de una hora.</p>
      </Section>

      <MobileCta href={WA_TR} lang="es" topic="tax-return" />
    </>
  )
}
