import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/(site)/HomeWa'
import { Accordion } from '@/components/ui/Accordion'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { ImageSlot } from '@/components/wht/ImageSlot'
import { Compare, Figures, LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { guideHref, guideText } from './_blog-links'

// --- METADATA -----------------------------------------------------------
// Sin precio en el título, la descripción ni el JSON-LD (igual que la página en inglés).
export const metadata: Metadata = {
  title: 'Impuestos Australia: visa 462 y 417',
  description:
    'Tax return para titulares de la visa working holiday 462 y 417. Residencia fiscal, Medicare y deducciones, revisados antes de presentarlo.',
  keywords: [
    'devolución de impuestos Australia',
    'devolución de impuestos Australia working holiday',
    'tax return Australia working holiday',
    'tax return Australia visa 462',
    'recuperar impuestos Australia',
    'cómo recuperar la superannuation',
    'recuperar la super Australia',
    'solicitar el TFN Australia',
    'TFN Australia',
    'ABN Australia working holiday',
    'DASP Australia',
    'Medicare levy working holiday',
    'impuestos visa 462',
    'impuestos visa 417',
    'tax return Australia desde España',
    'tax return Australia desde Argentina',
    'tax return Australia desde Chile',
  ],
  alternates: {
    canonical: `${SITE_URL}/es`,
    languages: {
      'en-AU': SITE_URL,
      'de': `${SITE_URL}/de`,
      'ja': `${SITE_URL}/ja`,
      ...newLocaleLanguages('/'),
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_LA',
    url: `${SITE_URL}/es`,
    siteName: 'Working Holiday Tax',
    title: 'Impuestos Australia: visa 462 y 417 | Working Holiday Tax',
    description:
      'Cualquiera puede enviar una declaración. El trabajo de verdad va antes: residencia fiscal, cada empleador, la exención de Medicare y las deducciones de tu trabajo.',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax: tax return en Australia para titulares de la visa working holiday' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devolución de impuestos en Australia | Working Holiday',
    description: 'Tu tax return en Australia con la visa working holiday. Residencia, Medicare, deducciones y cada empleador, revisados antes de presentarlo.',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true, follow: true,
    googleBot: {
      index: true, follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

// --- COPY ---------------------------------------------------------------

const FIGURES = [
  {
    figure: '45 %',
    body: 'Retenido a la tasa máxima en las semanas en que tu empleador todavía no tenía tu TFN. Qué pasa con ese dinero depende de tu año y se revisa en el tax return.',
  },
  {
    figure: '18.200 AUD',
    body: 'El umbral libre de impuestos de Australia. Que se aplique, y en qué medida, depende de los hechos de tu año y lo decide la ATO.',
  },
  {
    figure: '2 %',
    body: 'Un Medicare levy que quizá nunca debiste pagar. Según tu caso, se puede pedir un certificado de exención que casi nadie solicita.',
  },
]

/** El servicio: cinco pasos, en el orden en que ocurren. */
const ANALYSIS = [
  {
    n: '01',
    title: 'Tu residencia fiscal',
    body: 'Casi todos marcan una casilla y siguen. La residencia es una valoración que depende de cada persona y de los hechos de su año, y es lo que más pesa en el resultado. Nuestro equipo la revisa como parte de la preparación.',
  },
  {
    n: '02',
    title: 'Cada empleador, cada semana',
    body: 'Un año de working holiday se complica rápido: varios empleadores, pagos tardíos, un trabajo que ya no recuerdas. Lo reconstruimos con tu registro de la ATO, no con la memoria.',
  },
  {
    n: '03',
    title: 'Medicare, si te corresponde',
    body: 'El 2 % se aplica por defecto al evaluar la declaración, lo debieras o no. Saber cuándo nunca fue tuyo y conseguir que se quite es parte de nuestro trabajo.',
  },
  {
    n: '04',
    title: 'Deducciones por el trabajo que de verdad hiciste',
    body: 'Quien recoge fruta, quien trabaja de barista y quien reparte en bici no deducen lo mismo. Preguntamos qué implicaba tu trabajo y reclamamos lo que le corresponde.',
  },
  {
    n: '05',
    title: 'Y entonces se presenta',
    body: 'Revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO. Los cuatro pasos anteriores deciden la cifra.',
  },
]

const COMPARISON = [
  { mygov: 'La tasa de impuesto se da por supuesta', us: 'Revisamos qué corresponde en tu caso' },
  { mygov: 'Nada menciona la exención de Medicare',               us: 'Te ayudamos con la solicitud si cumples los requisitos' },
  { mygov: 'Las deducciones son un cuadro en blanco',             us: 'Sabemos qué puede deducir tu tipo de trabajo' },
  { mygov: 'Necesitas una cuenta y un número de teléfono activo', us: 'No necesitas nada. Nosotros tratamos con la ATO' },
]

const SERVICES = [
  { n: '01', href: '/es/tfn',            title: 'Solicitud del TFN',         desc: 'Consíguelo antes de tu primer payslip y evita la tasa máxima.' },
  { n: '02', href: '/es/abn',            title: 'Registro del ABN',          desc: 'Factura como autónomo, con el lado fiscal explicado antes.' },
  { n: '03', href: '/es/tax-return',     title: 'Tax return',                desc: 'El análisis de arriba y después la presentación ante la ATO.' },
  { n: '04', href: '/es/superannuation', title: 'Retiro de la super',        desc: 'Encontramos cada fondo y presentamos un único reclamo DASP al irte.' },
  { n: '05', href: '/es/medicare',       title: 'Medicare levy',             desc: 'El certificado de exención, si tu año cumple los requisitos.' },
]

const GUIDES = [
  { href: guideHref('diy-tax-return-vs-tax-agent-working-holiday'), title: guideText('diy-tax-return-vs-tax-agent-working-holiday', 'Hacerlo tú o con un agente'),        desc: 'Lo que cuesta de verdad cada opción.' },
  { href: guideHref('tax-residency-working-holiday-makers'),        title: guideText('tax-residency-working-holiday-makers', 'Residencia fiscal en una working holiday'),            desc: 'Una valoración que depende de cada caso.' },
  { href: guideHref('medicare-levy-working-holiday-makers'),        title: guideText('medicare-levy-working-holiday-makers', 'La exención del Medicare levy'),    desc: 'Quién debe el 2 %, quién no y cómo se quita.' },
  { href: guideHref('tax-deductions-working-holiday-makers'),       title: guideText('tax-deductions-working-holiday-makers', 'Qué puedes deducir'),                 desc: 'Deducciones según el tipo de trabajo, no una lista genérica.' },
]

const FAQS = [
  {
    question: '¿De qué depende cuánto recupero con el tax return de una working holiday?',
    answer: 'De cuatro cosas: tu residencia fiscal durante el año, si te retuvieron parte del sueldo al 45 % antes de que tu empleador tuviera tu tax file number, si se aplicó el 2 % del Medicare levy sin que te correspondiera, y las deducciones propias de tu trabajo.\n\nDos personas que ganaron lo mismo pueden terminar con devoluciones muy distintas por esas cuatro cosas.',
  },
  {
    question: '¿Puedo presentar mi propio tax return en myGov?',
    answer: 'Puedes. Presentarlo es la parte fácil. Lo que la pantalla no te dice es cómo se valora tu residencia fiscal, si un empleador retuvo a una tasa equivocada, si el Medicare levy debía descontarse siquiera o qué puede deducir tu tipo de trabajo. Esas cuatro valoraciones deciden la cifra.',
  },
  {
    question: '¿Cuánto cuesta el servicio?',
    answer: 'Nuestras tarifas son fijas y nunca un porcentaje de tu devolución.\n\nConfirmamos la tarifa por WhatsApp antes de empezar y se paga por adelantado. Después te enviamos el cuestionario completo y empezamos a trabajar. Nuestra garantía: si tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes dinero a la ATO, se aplica la tarifa completa. La garantía cubre solo las declaraciones con ingresos con TFN.',
  },
  {
    question: '¿Qué tasa de impuestos pagan en Australia los titulares de una working holiday?',
    answer: 'Qué escala de impuestos se aplica a tus ingresos depende de tu situación individual en ese año fiscal, y la decide la ATO. Nuestro equipo lo revisa como parte de la preparación de tu declaración.\n\nSi nunca le diste un tax file number a tu empleador, debe retener a la tasa máxima. Es una de las razones más habituales por las que el tax return de un mochilero necesita revisión.',
  },
  {
    question: '¿Pueden ayudarme a reclamar mi devolución si ya salí de Australia?',
    answer: 'Sí. Gente de distintos países presenta su tax return australiano y reclama su super (DASP) mucho después de volver a casa, todo por internet.\n\nUna regla antes de cerrar tu cuenta: la ATO solo puede pagar la devolución de impuestos en una cuenta bancaria australiana, mientras que la super (DASP) puede pagarse en el extranjero. Si ya cerraste la tuya, avísanos pronto, porque cambia el orden en que trabajamos.',
  },
  {
    question: '¿En cuánto tiempo responden?',
    answer: 'De lunes a viernes, de 9:00 a 18:00, respondemos en aproximadamente una hora. Fuera de ese horario, a la mañana siguiente. Puedes hacer primero una pregunta sin ningún compromiso.',
  },
  {
    question: '¿Solo hacen tax returns?',
    answer: 'No. También gestionamos solicitudes de TFN, registros de ABN, el retiro de la super (DASP) y los certificados de exención del Medicare levy, es decir, lo que normalmente necesita quien tiene una visa 462 o 417.',
  },
]

const WA_TAX_RETURN = waUrl({ topic: 'tax-return', lang: 'es' })

export default async function SpanishHomePage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/es#webpage`,
    url: `${SITE_URL}/es`,
    name: 'Devolución de impuestos en Australia | Working Holiday Tax',
    description: 'Tax return para titulares de la visa working holiday 462 y 417. Residencia fiscal, cada empleador, exención de Medicare y deducciones, revisados antes de presentarlo.',
    inLanguage: 'es',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    primaryImageOfPage: `${SITE_URL}/og-image.png`,
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'es',
    mainEntity: FAQS.map(f => ({
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
    ],
  }

  // La organización (@id /#business) se declara una sola vez en el grafo del
  // layout raíz; aquí solo se enlaza, igual que en la página en inglés.
  const professionalServiceLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#professionalservice`,
    name: 'Working Holiday Tax',
    url: `${SITE_URL}/es`,
    telephone: '+61424513998',
    image: `${SITE_URL}/og-image.png`,
    description: 'Tax returns preparados para titulares de una visa working holiday 462 y 417, y revisados y aprobados por un agente fiscal registrado antes de presentarse ante la ATO.',
    areaServed: { '@type': 'Country', name: 'Australia' },
    serviceType: ['Tax return', 'Solicitud de TFN', 'Registro de ABN', 'Retiro de la super (DASP)', 'Exención del Medicare levy'],
    provider: { '@id': `${SITE_URL}/#business` },
    audience: {
      '@type': 'Audience',
      audienceType: 'Working Holiday Maker (subclass 462 y 417)',
      geographicArea: { '@type': 'Country', name: 'Australia' },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* -- 1. HERO -------------------------------------------------------- */}
      <div className={blocks.underHeader}>
      <Hero
        title={
          <>
            <span className={blocks.kicker}>Tax return Australia&nbsp;&middot; visas 417 y 462</span>
            Cualquiera puede enviar una declaración. El trabajo de verdad va <Mark>antes.</Mark>
          </>
        }
        media={<ImageSlot id="IMG-W01" className={heroStyles.media} subject="Backpacker on a working holiday in Australia, at work on a farm or in a cafe" alt="Una mochilera trabajando en Australia con una visa working holiday" tone="a" priority />}
      >
        <Lead>Tu devolución se decide antes de presentar nada, y nada de eso es automático.</Lead>
        <WaButton href={WA_TAX_RETURN} position="hero" topic="tax-return" lang="es">Escríbenos por WhatsApp</WaButton>
        <p className={heroStyles.note}>Respondemos en aproximadamente una hora.</p>
        <GoogleRating variant="pill" lang="es" />
      </Hero>
      </div>

      {/* -- 2. COMPARACIÓN CON MYGOV --------------------------------------- */}
      <Section eyebrow="La pregunta de todos" title="myGov acepta una declaración equivocada igual que una correcta." titleId="mygov-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Nada en la pantalla comprueba cómo se valora tu residencia fiscal, si la levy era tuya o qué puede deducir tu tipo de trabajo.
        </p>
        <Compare rows={COMPARISON.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="En myGov" rightLabel="Con nosotros" />
        <p className={blocks.statement}>
          No tendrás que entrar a myGov, vincular una identificación ni averiguar qué formulario es cuál. Nosotros tratamos directamente con la ATO.
        </p>
        <div className={blocks.stack}>
          <WaButton href={WA_TAX_RETURN} position="section" topic="tax-return" lang="es" size="md">Escríbenos por WhatsApp</WaButton>
          <p className={blocks.small}>Respondemos en aproximadamente una hora.</p>
        </div>
      </Section>

      {/* -- 3. LAS TRES CIFRAS --------------------------------------------- */}
      <Section tone="pale" width="wide" title="¿De qué depende el tamaño de tu devolución de impuestos?" titleId="figures-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Casi siempre, de tres cosas.</p>
        <Figures items={FIGURES} />
      </Section>

      {/* -- 4. GARANTÍA ---------------------------------------------------- */}
      <Section tone="amber" title="Nuestra garantía" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Si tu devolución es menor que la tarifa, te devolvemos la diferencia después del Notice of Assessment. Si no hay devolución o debes dinero a la ATO, se aplica la tarifa completa. La garantía cubre solo las declaraciones con ingresos con TFN.
        </p>
        <p className={blocks.text}>La tarifa es fija y nunca un porcentaje de lo que te devuelvan.</p>
      </Section>

      {/* -- 5. LO QUE REVISAMOS -------------------------------------------- */}
      <Section id="how-it-works" eyebrow="El trabajo" title="Lo que revisamos en cada declaración" titleId="analysis-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Cuatro de los cinco pasos ocurren antes de anotar nada en la declaración.</p>
        <Steps items={ANALYSIS} />
      </Section>

      {/* -- 6. SOLO TFN O TFN Y ABN ---------------------------------------- */}
      <Section tone="pale" title="¿Cuál de estos dos fue tu año?" titleId="year-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Cambia lo que tiene que decir tu declaración. Elige el que se parezca al tuyo.</p>
        <div className={blocks.cards}>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>Solo TFN</h3>
            <p className={blocks.text}>Todos tus trabajos te pagaron como empleado con sueldo, con el impuesto descontado en cada payslip.</p>
            <WaButton href={waUrl({ topic: 'tax-return', lang: 'es', tier: 'tfn' })} position="inline" topic="tax-return" lang="es" tier="tfn" size="md" fill>Este fui yo</WaButton>
          </div>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>TFN y ABN</h3>
            <p className={blocks.text}>Una parte de tus ingresos la facturaste con un ABN y no te retuvieron nada.</p>
            <WaButton href={waUrl({ topic: 'abn', lang: 'es', tier: 'tfn-abn' })} position="inline" topic="abn" lang="es" tier="tfn-abn" size="md" fill>Este fui yo</WaButton>
          </div>
        </div>
        <p className={blocks.small}>
          ¿No sabes cuál fue el tuyo?{' '}
          <WaLink href={waUrl({ topic: 'general', lang: 'es', tier: 'unsure' })} position="inline" topic="general" lang="es" tier="unsure" className={blocks.textLink}>
            Cuéntanos cómo fue tu trabajo
          </WaLink>
        </p>
      </Section>

      {/* -- 7. EN QUÉ AYUDAMOS --------------------------------------------- */}
      <Section eyebrow="En qué te ayudamos" title="Desde tu primer payslip hasta la super que dejas al irte" titleId="services-title">
        <LinkRows items={SERVICES.map(s => ({ href: s.href, eyebrow: s.n, title: s.title, desc: s.desc, cta: 'Saber más →' }))} />
      </Section>

      <ImageSlot id="IMG-W02" subject="Backpackers on a working holiday, a wide Australian scene (farm, beach town or city street)" alt="Mochileros con una visa working holiday en Australia" tone="b" className={blocks.band} />

      {/* -- 8. CONFIANZA --------------------------------------------------- */}
      <Section tone="pale" title="Los impuestos de la working holiday son lo único que hacemos." titleId="trust-title">
        <p className={blocks.text}>
          Cada declaración que preparamos es para alguien con una visa 462 o 417, y la revisa y aprueba un agente fiscal registrado antes de presentarse ante la ATO.
        </p>
        <GoogleReviewsServer lang="es" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Un agente fiscal nunca te pedirá tus datos de acceso a myGov.</strong>{' '}
          Si alguien te los pide, no somos nosotros.
        </p>
      </Section>

      {/* -- 9. PREGUNTAS FRECUENTES ---------------------------------------- */}
      <Section title="Preguntas que nos hacen antes de escribirnos" titleId="faq-title">
        {/* Accordion divide las respuestas en las líneas en blanco; faqLd usa el texto original. */}
        <Accordion items={FAQS} />
        <p className={blocks.small}>
          ¿Falta tu pregunta?{' '}
          <Link href="/es/contact" className={blocks.textLink}>Escríbenos</Link>
        </p>
      </Section>

      {/* -- 10. GUÍAS ------------------------------------------------------ */}
      <Section tone="pale" eyebrow="Guías" title="Si prefieres leer la respuesta completa primero" titleId="guides-title">
        <p className={`${blocks.text} ${blocks.muted}`}>No nos guardamos nada para que tengas que escribirnos.</p>
        <LinkRows items={GUIDES} />
        <p>
          <Link href="/es/blog" className={blocks.textLink}>Todas las guías →</Link>
        </p>
      </Section>

      {/* -- CIERRE --------------------------------------------------------- */}
      <Section tone="forest" title="Cuéntanos tu año" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          Dónde trabajaste, más o menos cuándo y si alguna vez facturaste con un ABN. Con eso basta para decirte dónde estás.
        </p>
        <WaButton href={WA_TAX_RETURN} position="footer" topic="tax-return" lang="es" tone="light">Escríbenos por WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Respondemos en aproximadamente una hora.</p>
      </Section>

      <MobileCta href={WA_TAX_RETURN} lang="es" topic="tax-return" />
    </>
  )
}
