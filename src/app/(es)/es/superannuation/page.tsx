import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { Compare, blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, TitleLinks, coreBlocks } from '@/components/wht/CoreBlocks'
import { guideHref, guideText } from '../_blog-links'

/*
 * Página central del tema superannuation, en español.
 *
 * Cada H2 es una pregunta que la gente escribe de verdad, y cada una se
 * responde enseguida en un párrafo completo que se entiende fuera de contexto.
 * La parte comercial va debajo de la respuesta, no en su lugar.
 */

const WA = waUrl({ topic: 'super', lang: 'es' })

export const metadata: Metadata = {
  title: { absolute: 'Cómo recuperar tu superannuation al irte de Australia (DASP)' },
  description:
    '¿Te fuiste de Australia con visa 462 o 417? Reclama tu super con el DASP paso a paso: quién puede, el 65 %, documentos y el plazo de 28 días.',
  keywords: [
    'recuperar superannuation Australia',
    'cómo recuperar la super en Australia',
    'reclamar superannuation al salir de Australia',
    'superannuation working holiday',
    'superannuation mochilero',
    'DASP Australia',
    'DASP visa 462',
    'DASP visa 417',
    'Departing Australia Superannuation Payment',
    'retirar la super al volver a casa',
    'impuesto 65 % superannuation',
    'super perdida Australia working holiday',
    'super retenida por la ATO',
    'devolución superannuation Australia',
    'reclamar la super paso a paso',
    'DASP desde el extranjero',
    'cuánto tarda el DASP',
    'cómo solicitar la superannuation',
    'recuperar fondo de jubilación Australia',
    'fondo de pensiones Australia working holiday',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/superannuation`,
    languages: {
      'en-AU': `${SITE_URL}/superannuation`,
      de: `${SITE_URL}/de/superannuation`,
      ja: `${SITE_URL}/ja/superannuation`,
      ...newLocaleLanguages('/superannuation'),
      'x-default': `${SITE_URL}/superannuation`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-super.png`, width: 1200, height: 630, alt: 'Cómo recuperar la superannuation (DASP) al salir de Australia' }],
    type: 'website',
    locale: 'es_LA',
    url: `${SITE_URL}/es/superannuation`,
    siteName: 'Working Holiday Tax',
    title: 'Cómo recuperar tu superannuation al irte de Australia (DASP)',
    description:
      '¿Te fuiste de Australia con visa 462 o 417? Reclama tu super con el DASP paso a paso: quién puede, el 65 %, documentos y el plazo de 28 días.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-super.png`],
    card: 'summary_large_image',
    title: 'Cómo recuperar tu superannuation al irte de Australia (DASP)',
    description: 'Quién puede, la tasa del 65 %, documentos, plazos y varios fondos, explicado.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

/**
 * La objeción con la que llega todo el mundo, respondida sobre la super.
 * Cada fila trata del DASP: el portal toma un fondo a la vez, y solo los que
 * sabes nombrar. Nada de aquí dice que el sistema de la ATO sea malo. Hace otro trabajo.
 */
const MYGOV = [
  {
    mygov: 'La solicitud en línea puede buscar con tu TFN, pero cada cuenta que encuentra se vuelve una solicitud aparte, con sus propios controles de identidad.',
    us: 'Revisamos todas las cuentas vinculadas a tu Tax File Number, incluida la super que ya tiene la ATO, y mantenemos cada solicitud en marcha.',
  },
  {
    mygov: 'Cuando envías la solicitud, el sistema la muestra como enviada, no si el fondo ya la procesó. Para eso hay que contactar a cada fondo.',
    us: 'Hacemos el seguimiento con cada fondo hasta que paga.',
  },
  {
    mygov: 'El reclamo se comprueba contra el registro de tu visa, y una visa que no ha terminado lo frena en seco.',
    us: 'Revisamos primero que se cumplan las condiciones, para que no pases dos semanas con un reclamo que todavía no se puede pagar.',
  },
  {
    mygov: 'La super es un reclamo y tu tax return es otro. Nada los conecta por ti.',
    us: 'Son trámites distintos y cada uno tiene su peso, así que te ayudamos con los dos.',
  },
]

const faqs = [
  {
    question: '¿Puedo reclamar la super con una visa working holiday 462 o 417?',
    answer:
      'Sí, una vez que te hayas ido de Australia y tu visa working holiday haya terminado. No se puede reclamar mientras sigues aquí con esa visa. El reclamo es un Departing Australia Superannuation Payment (DASP), se retiene el 65 % del componente gravable y, a diferencia de una devolución de impuestos, se puede pagar en una cuenta del extranjero si tu fondo lo ofrece.',
  },
  {
    question: '¿Cuándo puedo reclamar la super después de salir de Australia?',
    answer:
      'En cuanto se cumplen las dos condiciones: tu visa venció o fue cancelada y ya saliste de Australia, sin otra visa australiana activa. Si te fuiste antes de que terminara tu visa, Home Affairs puede cancelar el resto una vez que estás fuera. Puedes empezar la solicitud en línea de la ATO antes de irte y enviarla después.',
  },
  {
    question: '¿Hay un formulario del DASP o todo es en línea?',
    answer:
      'Existen los dos. La solicitud en línea del DASP de la ATO es gratis, puede buscar tus cuentas si das tu TFN y crea una solicitud por cada cuenta, incluida la super que ya tiene la ATO. El formulario en papel, NAT 7204, se envía a cada fondo por separado.',
  },
  {
    question: '¿Qué cambia si mi saldo de super es de 5.000 AUD o más?',
    answer:
      'La tasa no cambia. Lo que puede cambiar es el papeleo: en una solicitud en papel por 5.000 AUD o más, puedes necesitar una Certification of Immigration Status del Department of Home Affairs, que tiene un costo. Cualquier fondo puede pedirte además copias certificadas de tus documentos de identidad, sea cual sea el saldo.',
  },
  {
    question: '¿Puedo cobrar el DASP en Revolut, Wise u otra cuenta del extranjero?',
    answer:
      'Depende del fondo. Algunos fondos pagan por transferencia internacional y otros no aceptan ciertas cuentas digitales, así que conviene revisarlo con tu fondo antes de enviar la solicitud. La super que ya pasó a la ATO solo se paga en una cuenta australiana a tu nombre o con cheque.',
  },
  {
    question: '¿Pueden reclamar el DASP los residentes permanentes o los ciudadanos de Nueva Zelanda?',
    answer:
      'No. El DASP es solo para quienes tuvieron una visa temporal. Los ciudadanos y residentes permanentes de Australia y de Nueva Zelanda no pueden reclamarlo. Los ciudadanos de Nueva Zelanda pueden, en algunos casos, pasar su super australiana a un fondo KiwiSaver con las reglas de transferencia trans-Tasman.',
  },
  {
    question: '¿Puedo reclamar mi super por mi cuenta?',
    answer:
      'Sí, es gratis. Si tienes un solo fondo y los documentos en orden, te lo decimos enseguida. Se complica cuando la super está repartida en varios fondos, cuando un fondo pide copias certificadas desde el extranjero o cuando la visa aún no ha terminado.',
  },
  {
    question: '¿Se genera superannuation si trabajé con un ABN?',
    answer:
      'Por lo general no. Las contribuciones de super obligatorias van ligadas al empleo con retención PAYG, así que el trabajo en plataformas, rideshare o freelance facturado con un ABN normalmente no genera super. La excepción es un contratista que en realidad trabajó como empleado, donde la super todavía puede deberse.',
  },
  {
    question: '¿El DASP es lo mismo que una devolución de impuestos?',
    answer:
      'No, son dos pagos distintos. La devolución de impuestos es el impuesto retenido de más de tu sueldo, que paga la ATO después de que presentas un tax return, y solo a una cuenta australiana. El DASP es la super que tu empleador pagó además de tu sueldo, y la libera tu fondo. Muchos working holiday makers tienen que ocuparse de los dos trámites.',
  },
  {
    question: '¿Necesito mi Tax File Number para reclamar la super?',
    answer:
      'Un fondo suele poder identificarte por tu nombre, fecha de nacimiento y pasaporte, así que perder el Tax File Number no impide el reclamo. Aun así, el TFN es la única forma fiable de encontrar todas las cuentas, y recuperarlo es más rápido que buscar fondo por fondo.',
  },
  {
    question: '¿Por qué el DASP tiene un impuesto tan alto para working holiday makers?',
    answer:
      'Porque la ley fija una tasa propia del 65 % para la super acumulada con una visa 417 o 462, vigente desde el 1 de julio de 2017. Si parte del pago viene de contribuciones hechas mientras tenías una de esas visas, el 65 % se aplica a todo el pago. Los demás residentes temporales pagan el 35 % sobre el elemento gravado y el 45 % sobre el no gravado.',
  },
  {
    question: '¿Y si un empleador nunca pagó mi super?',
    answer:
      'Cuando un empleador debía pagar la super y nunca lo hizo, es un caso de super guarantee impaga que la ATO puede investigar y recuperar por ti. Cuéntanoslo antes de reclamar: si el dinero se recupera cuando tus cuentas ya se cerraron, habría que reclamar otra vez.',
  },
  {
    question: '¿Reclamar la super afecta a mi tax return o a una futura visa australiana?',
    answer:
      'No va en tu tax return australiano, porque el 65 % retenido es definitivo. Y según la ATO, reclamar un DASP no afecta futuras solicitudes de visa. La única consecuencia práctica es que tus cuentas se cierran al pagarse, así que si vuelves a trabajar a Australia empiezas con un fondo nuevo.',
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
    { '@type': 'ListItem', position: 2, name: 'Superannuation', item: `${SITE_URL}/es/superannuation` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/es/superannuation#service`,
  name: 'Reclamo del DASP (superannuation) para titulares de visa working holiday',
  serviceType: 'Reclamo del Departing Australia Superannuation Payment (DASP)',
  description:
    'Reclamos del Departing Australia Superannuation Payment para titulares de visas working holiday 462 y 417: encontrar todos los fondos vinculados a un Tax File Number, preparar una solicitud por cuenta y darle seguimiento hasta el pago.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Titular de visa working holiday (subclass 462 / 417) que ya salió de Australia' },
  inLanguage: 'es',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/es/superannuation#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub', '#key-figures'] },
  url: `${SITE_URL}/es/superannuation`,
}

/**
 * Las cifras del DASP, con su fuente. Revisadas contra ato.gov.au el 5 de noviembre de 2026.
 * El 12 % no lleva enlace: el sitio aún no enlaza una página de la ATO para esa cifra.
 */
const KEY_FIGURES: { label: string; figure: string; date: string; sources: { name: string; url: string }[] }[] = [
  {
    label: 'Retención para visas 417 y 462',
    figure: '65 % del componente gravable, tanto en el elemento gravado como en el no gravado. Componente libre de impuestos: 0 %.',
    date: 'Desde el 1 de julio de 2017',
    sources: [{ name: 'ATO, tasas del DASP', url: 'https://www.ato.gov.au/tax-rates-and-codes/key-superannuation-rates-and-thresholds/payments-from-super?anchor=DepartingAustraliasuperannuationpaymentD' }],
  },
  {
    label: 'Otras visas temporales',
    figure: '35 % sobre el elemento gravado y 45 % sobre el no gravado.',
    date: 'Desde el 1 de julio de 2017',
    sources: [{ name: 'ATO, tasas del DASP', url: 'https://www.ato.gov.au/tax-rates-and-codes/key-superannuation-rates-and-thresholds/payments-from-super?anchor=DepartingAustraliasuperannuationpaymentD' }],
  },
  {
    label: 'Cuándo puedes reclamar',
    figure: 'Tu visa venció o fue cancelada, ya saliste de Australia y no tienes otra visa australiana activa. Los ciudadanos y residentes permanentes de Australia o Nueva Zelanda no pueden reclamar.',
    date: 'Regla vigente',
    sources: [{ name: 'ATO, requisitos del DASP', url: 'https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp' }],
  },
  {
    label: 'Costo de pedirlo tú',
    figure: 'Gratis con la solicitud en línea del DASP de la ATO.',
    date: 'Vigente',
    sources: [{ name: 'ATO, volver a tu país', url: 'https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/returning-to-your-home-country' }],
  },
  {
    label: 'Cuánto tarda',
    figure: 'Suele pagarse en un plazo de 28 días desde que se recibe la solicitud completa.',
    date: 'Según la ATO',
    sources: [{ name: 'ATO, cómo y cuándo se paga el DASP', url: 'https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp' }],
  },
  {
    label: 'Si nunca la reclamas',
    figure: 'Pasa a la ATO cuando han pasado al menos 6 meses desde que saliste de Australia y tu visa dejó de estar vigente. Se puede seguir reclamando como DASP en cualquier momento.',
    date: 'Regla vigente',
    sources: [{ name: 'ATO, super no reclamada', url: 'https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp' }],
  },
  {
    label: 'Saldos de 5.000 AUD o más',
    figure: 'Una solicitud en papel puede necesitar una Certification of Immigration Status de Home Affairs, que tiene un costo.',
    date: 'Regla vigente',
    sources: [{ name: 'ATO, solicitudes en papel', url: 'https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp' }],
  },
  {
    label: 'Adónde puede ir el dinero',
    figure: 'DASP de un fondo: cuenta australiana, o del extranjero si el fondo lo ofrece. Super que ya tiene la ATO: solo cuenta australiana a tu nombre o cheque. Devolución de impuestos: solo cuenta australiana.',
    date: 'Vigente',
    sources: [
      { name: 'ATO, DASP', url: 'https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp' },
      { name: 'ATO, datos bancarios', url: 'https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details' },
    ],
  },
  {
    label: 'Super que paga tu empleador',
    figure: '12 % de tu sueldo ordinario.',
    date: 'Desde el 1 de julio de 2025',
    sources: [],
  },
]

/* -- Envoltorio de sección: cada respuesta de la página es una Section ---- */
function Answer({
  id, heading, children, tone = 'white',
}: { id: string; heading: string; children: React.ReactNode; tone?: 'white' | 'pale' | 'amber' }) {
  return (
    <Section id={id} tone={tone} title={heading} titleId={`${id}-title`}>
      {children}
    </Section>
  )
}

// Las guías pasan por guideHref/guideText (_blog-links.ts): si la guía aún no existe en
// español, se enlaza la versión en inglés y se avisa en el texto.
const GUIDES = [
  { href: guideHref('how-long-does-dasp-take'), label: guideText('how-long-does-dasp-take', 'Cuánto tarda un DASP, etapa por etapa') },
  { href: guideHref('dasp-documents-required'), label: guideText('dasp-documents-required', 'Los documentos que necesita un reclamo de DASP') },
  { href: guideHref('dasp-tax-rate-65-percent-explained'), label: guideText('dasp-tax-rate-65-percent-explained', 'Por qué el DASP paga el 65 % de impuesto y qué queda') },
  { href: guideHref('dasp-rejected-what-to-do'), label: guideText('dasp-rejected-what-to-do', 'Qué hacer si rechazan tu reclamo de DASP') },
  { href: guideHref('how-to-find-lost-superannuation'), label: guideText('how-to-find-lost-superannuation', 'Cómo encontrar tu super perdida antes de irte') },
  { href: guideHref('what-happens-to-unclaimed-super'), label: guideText('what-happens-to-unclaimed-super', 'Qué pasa con la super que nadie reclama') },
  { href: guideHref('super-multiple-funds-consolidation'), label: guideText('super-multiple-funds-consolidation', 'Cómo reclamar cuando tu super está en varios fondos') },
  { href: guideHref('dasp-vs-leaving-super-in-australia-pros-cons'), label: guideText('dasp-vs-leaving-super-in-australia-pros-cons', 'Reclamar ahora o dejarla invertida: la comparación') },
]

export default function SuperannuationPageES() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className={blocks.underHeader}>
        <Crumb home="Inicio" current="Superannuation" label="Ruta de navegación" href="/es" />
        <Hero
          eyebrow={<>Superannuation &middot; DASP</>}
          title={<>Cómo solicitar y recuperar tu <Mark>superannuation</Mark> al salir de Australia</>}
        >
          <div className="hero-sub">
            <Lead>La superannuation (super) es el fondo de jubilación obligatorio de Australia, parecido a un fondo de pensiones o una AFP, y tu empleador aporta a ella además de tu sueldo. Puedes reclamar tu super con el DASP cuando ya saliste de Australia y tu visa venció o fue cancelada. Se pide gratis en línea con la ATO o con un formulario a cada fondo. Como titular de una visa 462 o 417 se retiene el 65 % del componente gravable, y el resto se puede pagar en una cuenta del extranjero si tu fondo lo ofrece.</Lead>
            <p className={blocks.text}>
              Según la ATO, el pago suele llegar en un plazo de 28 días desde que recibe la solicitud completa. Lo que más
              frena un reclamo es una visa que aún figura activa, un fondo que no sabías que tenías o documentos de
              identidad que el fondo no acepta.
            </p>
          </div>
          <div className={coreBlocks.actions}>
            <WaButton href={WA} position="hero" topic="super" lang="es">Pregúntanos por tu super</WaButton>
            <a href="#how-to-claim" className={coreBlocks.hint}>Mira los pasos del reclamo</a>
          </div>
          <p className={heroStyles.note}>Respondemos en cerca de una hora.</p>
        </Hero>
      </div>

      <PhotoFrame page="superannuation" locale="es" />

      <Section id="key-figures" tone="pale" title="Las cifras del DASP, con su fuente" titleId="key-figures-title">
        <p className={blocks.small}>Revisadas contra ato.gov.au el 5 de noviembre de 2026.</p>
        <dl className={blocks.stack}>
          {KEY_FIGURES.map((k) => (
            <div key={k.label} className={blocks.palePanel}>
              <dt className={blocks.cardTitle}>{k.label}</dt>
              <dd className={blocks.text} style={{ margin: 0 }}>{k.figure}</dd>
              <dd className={blocks.small} style={{ margin: 0 }}>
                {k.date}
                {k.sources.length > 0 ? ' · Fuente: ' : ' · Fuente: ATO'}
                {k.sources.map((src, i) => (
                  <span key={src.url + src.name}>
                    {i > 0 ? ', ' : ''}
                    <a href={src.url} className={blocks.textLink} target="_blank" rel="noopener noreferrer">{src.name}</a>
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Hacerlo por tu cuenta" title={<>El formulario del reclamo tiene una casilla para un fondo de super. <Mark>Cuatro trabajos casuales pueden ser cuatro fondos.</Mark></>} titleId="objection-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Dos de esas cuentas se abrieron sin que tú eligieras nada.</p>
        <Compare rows={MYGOV.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="En el portal de la ATO" rightLabel="Con nosotros" />
        <p className={blocks.statement}>La solicitud del DASP no necesita myGov. Lo que lleva tiempo es todo lo que la rodea, y de eso nos encargamos nosotros.</p>
      </Section>

      <Answer id="who-can-claim" heading="¿Quién puede reclamar la super con el DASP?" tone="pale">
        <p className={blocks.text}>
          El Departing Australia Superannuation Payment se puede reclamar cuando tu visa temporal venció o fue
          cancelada, ya saliste de Australia y no tienes otra visa australiana activa. Todo eso tiene que cumplirse a
          la vez. Los ciudadanos y residentes permanentes de Australia y de Nueva Zelanda no pueden reclamarlo.
        </p>
        <p className={blocks.text}>
          Cuando pides el DASP en línea, tu situación migratoria se comprueba con los registros del Department of Home
          Affairs y la ATO confirma el derecho a reclamar de forma automática, así que no hay nada aparte que demostrar.
          Antes puedes revisar tu visa en VEVO. Una bridging visa, o seguir en el país con cualquier visa válida,
          bloquea el reclamo. Si trabajaste con un{' '}
          <Link href="/es/abn" className={blocks.textLink}>ABN</Link>, ese trabajo normalmente no generó super: solo
          cuenta la que pagaron tus empleadores.
        </p>
      </Answer>
      <Answer id="how-to-claim" heading="¿Cómo se reclama la super después de salir de Australia?" tone="white">
        <ol className={blocks.text} style={{ paddingLeft: '1.25em' }}>
          <li>Comprueba que puedes reclamar: tu visa venció o fue cancelada, ya saliste de Australia y no tienes otra visa australiana activa. Puedes revisar tu visa en VEVO.</li>
          <li>Encuentra todas tus cuentas: la solicitud en línea del DASP de la ATO busca con tu TFN, y myGov vinculado a la ATO muestra cada fondo en Super, Fund details, incluida la super que ya pasó a la ATO.</li>
          <li>Presenta la solicitud: la solicitud en línea es gratis y crea una solicitud por cada cuenta. Puedes empezarla y guardarla antes de tu vuelo, y enviarla cuando ya hayas salido. La alternativa en papel es el formulario NAT 7204, uno para cada fondo.</li>
          <li>Demuestra tu identidad: un fondo puede pedir copias certificadas de tus documentos. En una solicitud en papel por 5.000 AUD o más, también puedes necesitar una Certification of Immigration Status de Home Affairs.</li>
          <li>Recibe el pago: se retiene el 65 % del componente gravable y, según la ATO, el resto suele pagarse en un plazo de 28 días desde la solicitud completa, en una cuenta australiana o, si tu fondo lo ofrece, del extranjero.</li>
        </ol>
        <p className={blocks.text}>
          Ese es todo el proceso. Lo que suele llevar tiempo son los pasos 2 y 4, y esas son las partes de las que nos
          encargamos si prefieres no hacerlo tú.{' '}
          <Link href={guideHref('dasp-documents-required')} className={blocks.textLink}>
            {guideText('dasp-documents-required', 'Documentos del DASP: lo que pide cada fondo')}
          </Link>
          .
        </p>
      </Answer>
      <Answer id="how-much" heading="¿Cuánto de tu super recuperas realmente?" tone="pale">
        <p className={blocks.text}>
          Los working holiday makers pagan una retención del 65 % sobre el componente gravable de un DASP, así que te
          llegan más o menos 35 centavos de cada dólar. La tasa está fijada por ley para cualquiera que haya tenido una
          visa 462 o 417, y esperar no la reduce. Puedes hacer una estimación en{' '}
          <Link href="/es/calculator" className={blocks.textLink}>nuestra calculadora</Link>.
        </p>
        <div className={coreBlocks.threeUp}>
          {[
            { bal: '3.000 AUD', net: '1.050 AUD', note: 'unos meses de trabajo casual' },
            { bal: '6.000 AUD', net: '2.100 AUD', note: 'unos seis meses a tiempo completo' },
            { bal: '10.000 AUD', net: '3.500 AUD', note: 'un año completo de working holiday' },
          ].map((r, i) => (
            <div key={i} className={coreBlocks.stat}>
              <p className={coreBlocks.statLabel}>Saldo de super</p>
              <p className={blocks.cardTitle}>{r.bal}</p>
              <p className={coreBlocks.statNet}>{r.net}</p>
              <p className={blocks.small}>te pagan &middot; {r.note}</p>
            </div>
          ))}
        </div>
        <p className={blocks.small}>
          Las cifras son después de la retención del 65 % del DASP sobre el componente gravable. Para los working
          holiday makers se aplica el mismo 65 % al elemento gravado y al no gravado, y solo un componente libre de
          impuestos, poco habitual, se paga sin retención. Tómalas como ilustraciones y no como un presupuesto.{' '}
          <Link href={guideHref('dasp-tax-rate-65-percent-explained')} className={blocks.textLink}>
            {guideText('dasp-tax-rate-65-percent-explained', 'Por qué la tasa es del 65 %')}
          </Link>
          .
        </p>
      </Answer>
      <Answer id="documents" heading="¿Qué documentos necesitas para un reclamo de DASP?" tone="white">
        <p className={blocks.text}>
          Necesitas los datos de tu pasaporte, tu Tax File Number si lo tienes, los datos de la visa, el nombre de cada
          fondo y, si es posible, su número de socio o su ABN, además de datos bancarios, australianos o del extranjero.
          Que falte el número de socio rara vez es grave: la solicitud en línea puede buscar con tu TFN, y un fondo
          puede identificarte con tu TFN y tu fecha de nacimiento. Si perdiste el número,{' '}
          <Link href="/es/tfn" className={blocks.textLink}>te ayudamos con el TFN</Link>.
        </p>
        <p className={blocks.text}>
          Lo que más frena los reclamos es la identidad. Un fondo puede pedir copias certificadas de tus documentos, y
          cada fondo acepta a distintas personas para certificarlas, algo más difícil de conseguir desde el extranjero
          de lo que la gente espera. En una solicitud en papel por un saldo de 5.000 AUD o más, también puedes
          necesitar una Certification of Immigration Status del Department of Home Affairs, que tiene un costo.
        </p>
      </Answer>
      <Answer id="how-long" heading="¿Cuánto tarda en llegar un pago de DASP?" tone="pale">
        <p className={blocks.text}>
          Según la ATO, un DASP suele pagarse en un plazo de 28 días desde que se recibe la solicitud completa. El reloj
          empieza con una solicitud completa, no el día en que la empiezas, así que un reclamo que espera un documento
          certificado o un registro de visa puede quedarse semanas parado antes de que empiecen esos 28 días.{' '}
          <Link href={guideHref('how-long-does-dasp-take')} className={blocks.textLink}>
            {guideText('how-long-does-dasp-take', 'Cuánto tarda cada etapa')}
          </Link>
          .
        </p>
        <p className={blocks.text}>
          Si tu dinero está repartido en varios fondos, el reclamo va tan rápido como el más lento de ellos. Los saldos
          que ya pasaron a la ATO se reclaman a la ATO, cuyo estándar de servicio también es de 28 días desde la
          presentación.
        </p>
      </Answer>
      <Answer id="find-your-fund" heading="¿Y si no sabes en qué fondo de super estabas?" tone="white">
        <p className={blocks.text}>
          Es lo normal. Cada fondo en el que un empleador pagó está vinculado a tu Tax File Number, así que las cuentas
          se pueden rastrear desde él sin que recuerdes el nombre de ningún fondo. Los saldos que un fondo ya entregó a
          la ATO aparecen en la misma búsqueda. Hay dos formas oficiales de hacer esa búsqueda: la solicitud en línea
          del DASP busca con tu TFN una vez que puedes reclamar, y myGov vinculado a la ATO muestra cada cuenta en
          Super, Fund details, incluida la super que ya tiene la ATO.{' '}
          <Link href={guideHref('how-to-find-lost-superannuation')} className={blocks.textLink}>
            {guideText('how-to-find-lost-superannuation', 'Cómo encontrar tu super perdida')}
          </Link>
          .
        </p>
        <p className={blocks.text}>
          El reclamo no es automático: encontrar una cuenta no presenta nada, y cada fondo sigue necesitando su propia
          solicitud. La cuenta que casi siempre se pasa por alto es la del primer trabajo.
        </p>
      </Answer>
      <Answer id="from-overseas" heading="¿Se puede reclamar la super desde España, Argentina, Chile o Uruguay?" tone="pale">
        <p className={blocks.text}>
          Sí, y de hecho tiene que ser así. Un DASP solo se puede pedir cuando ya te has ido de Australia, así que todo
          reclamo se hace desde el extranjero. Dónde vives ahora no influye.
        </p>
        <p className={blocks.text}>
          Hay algo que conviene aclarar antes de cerrar tu cuenta bancaria australiana: no todos los fondos transfieren
          a una cuenta del extranjero, y la super que ya pasó a la ATO solo se paga en una cuenta australiana a tu
          nombre o con cheque. Tu devolución de impuestos también va solo a una cuenta australiana. Si tu país de origen grava
          este pago, es un asunto aparte: consulta con la oficina de impuestos de tu país.
        </p>
      </Answer>
      <Answer id="dasp-vs-leaving" heading="¿Es mejor reclamar la super o dejarla en Australia?" tone="white">
        <p className={blocks.text}>
          Para casi todos los titulares de visa working holiday, es mejor reclamarla. Un saldo que se queda atrás no
          recibe contribuciones, pero sigue pagando comisiones de administración y, a menudo, primas de seguro que no
          puedes usar desde el extranjero. Lo que sobreviva acaba en la ATO, sin invertir.
        </p>
        <p className={blocks.text}>
          El argumento para dejarla solo se sostiene si piensas volver a Australia a vivir y trabajar de forma
          permanente. Esperar no reduce el 65 %.{' '}
          <Link href={guideHref('dasp-vs-leaving-super-in-australia-pros-cons')} className={blocks.textLink}>
            {guideText('dasp-vs-leaving-super-in-australia-pros-cons', 'La comparación completa está aquí')}
          </Link>.
        </p>
      </Answer>
      <Answer id="while-in-australia" heading="¿Se puede reclamar la super mientras sigues en Australia?" tone="pale">
        <p className={blocks.text}>
          No. La super queda protegida mientras tengas una visa válida y estés en el país, y con una visa working
          holiday no hay liberación anticipada por dejar un trabajo ni por dificultades económicas.
        </p>
        <p className={blocks.text}>
          Si vuelas a casa mucho antes de que termine tu visa, el Department of Home Affairs puede cancelar la visa
          restante una vez que te hayas ido, lo que normalmente adelanta el reclamo. Lo que sí puedes hacer antes de tu
          vuelo es empezar la solicitud en línea de la ATO y guardarla, para enviarla cuando ya hayas salido y tu visa
          haya terminado.
        </p>
      </Answer>
      <Answer id="never-claimed" heading="¿Qué pasa con tu super si nunca la reclamas? ¿Pasa a la ATO?" tone="white">
        <p className={blocks.text}>
          No se pierde. Cuando han pasado al menos seis meses desde que saliste de Australia y tu visa dejó de estar
          vigente, tu fondo debe transferir el saldo a la ATO, en una de sus dos fechas de reporte del año. Ahí queda a
          tu nombre y se puede reclamar como DASP en cualquier momento, con la misma tasa del 65 %.{' '}
          <Link href={guideHref('what-happens-to-unclaimed-super')} className={blocks.textLink}>
            {guideText('what-happens-to-unclaimed-super', 'Qué pasa con la super no reclamada')}
          </Link>
          .
        </p>
        <p className={blocks.text}>
          Lo que sí se pierde es lo que las comisiones y las primas de seguro se llevaron del saldo antes de la
          transferencia. En un saldo pequeño eso puede ser una parte importante.
        </p>
      </Answer>
      <Answer id="with-us" heading="Reclamarla tú o con nuestra ayuda" tone="amber">
        <p className={blocks.text}>Puedes hacerlo por tu cuenta. Lo que nos traspasarías es la búsqueda en todas las cuentas vinculadas a tu Tax File Number, incluida la super que tiene la ATO, las copias certificadas desde el extranjero, preparar una solicitud aparte para cada fondo y el seguimiento cuando uno deja de responder.</p>
        <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Si también hacemos tu tax return:</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Si tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes dinero a la ATO, se aplica la tarifa completa. La garantía cubre solo las declaraciones con ingresos con TFN.
        </p>
        <p className={blocks.text}>
          Tu reclamo de super es aparte de tu{' '}
          <Link href="/es/tax-return" className={blocks.textLink}>tax return</Link>. Si además tienes una declaración
          que presentar, la tuya también va revisada y aprobada por un agente fiscal registrado antes de presentarse ante
          la ATO.
        </p>
        <p className={blocks.text}>
          Para empezar, escríbenos por WhatsApp cuándo venció tu visa, cuándo saliste de Australia y en cuántos
          trabajos estuviste. Con eso te decimos qué fondos buscar y si ya puedes reclamar.
        </p>
        <div className={blocks.stack}>
          <WaButton href={WA} position="section" topic="super" lang="es" size="md">Escríbenos por WhatsApp</WaButton>
          <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Respondemos en cerca de una hora.</p>
        </div>
      </Answer>

      <Section title="Otras preguntas sobre el DASP" titleId="faq-title">
        <Accordion items={faqs} />
      </Section>

      <Section tone="pale" title="Profundiza en una parte del reclamo" titleId="guides-title">
        <TitleLinks items={GUIDES} />
      </Section>

      <Section eyebrow="Lo siguiente" title="Tu tax return es un reclamo aparte" titleId="next-title">
        <p className={blocks.text}>
          La super la libera tu fondo. El impuesto retenido de más de tu sueldo solo vuelve con un tax return, y la ATO
          lo paga solo en una cuenta australiana, así que no cierres la cuenta todavía. El plazo del 31 de octubre de
          2026 para presentarlo por tu cuenta ya pasó, pero una declaración 2025-26 atrasada todavía se puede
          presentar. Y revisa también el{' '}
          <Link href="/es/medicare" className={blocks.textLink}>Medicare levy del 2 %</Link>: según tu caso, puede que
          nunca lo debieras.
        </p>
        <LinkButton href="/es/devolucion-impuestos-australia">Devolución de impuestos en Australia</LinkButton>
      </Section>

      <Section tone="forest" title="Pregúntanos por tu super" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Tu empleador la pagó además de tu sueldo, nunca de él. Sigue en Australia. Escríbenos cuándo venció tu visa y en cuántos trabajos estuviste, y empezamos por ahí.</p>
        <WaButton href={WA} position="footer" topic="super" lang="es" tone="light">Escríbenos por WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Respondemos en cerca de una hora.</p>
      </Section>

      <MobileCta href={WA} lang="es" topic="super" />
    </>
  )
}
