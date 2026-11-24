import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Mark } from '@/components/wht/Type'
import { blocks } from '@/components/wht/Blocks'
import { WaButton } from '@/components/wht/WaButton'
import { isLiveEsGuide } from '../_blog-links'
import {
  LeavingAustraliaPage, LinkList, SRC, StepList, StepTable, leavingLanguages, makeGuides,
} from '@/app/(site)/leaving-australia/LeavingAustraliaPage'

/*
 * Hub ES: salir de Australia (plan 3, segunda ronda, 24 nov 2026). Mismos hechos que
 * /leaving-australia (r16, r13, r14, r20), tuteo. El tax return apunta a la página
 * principal /es/devolucion-impuestos-australia; una guía se enlaza en español solo
 * si existe en español.
 */

const WA = waUrl({ topic: 'tax-return', lang: 'es', detail: 'me voy de Australia' })
const G = makeGuides('/es', isLiveEsGuide, ' (en inglés)')
const TAX_RETURN = '/es/devolucion-impuestos-australia'

export const metadata: Metadata = {
  title: { absolute: 'Irte de Australia tras la working holiday: impuestos y super' },
  description:
    '¿Te vas de Australia después de la working holiday? Qué hacer antes de irte y después: tax return, super (DASP), cuenta bancaria y myGov, en el orden correcto.',
  keywords: [
    'salir de Australia impuestos',
    'irse de Australia working holiday qué hacer',
    'tax return después de salir de Australia',
    'tax return antes de irte de Australia',
    'reclamar la super después de irte',
    'DASP después de salir de Australia',
    'cerrar cuenta bancaria australiana',
    'fin working holiday Australia checklist',
  ],
  alternates: {
    canonical: `${SITE_URL}/es/leaving-australia`,
    languages: leavingLanguages(),
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-super.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'es_ES',
    url: `${SITE_URL}/es/leaving-australia`,
    siteName: 'Working Holiday Tax',
    title: 'Salir de Australia: tax return y super, en orden',
    description: 'Qué hacer antes de irte, qué queda pendiente después y en qué orden.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-super.png`],
    card: 'summary_large_image',
    title: 'Salir de Australia: impuestos y super',
    description: 'Antes de irte, después de irte y lo que puede esperar.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const src = (href: string, text: string) => (
  <a href={href} target="_blank" rel="noopener" className={blocks.textLink}>{text}</a>
)

const faqs = [
  {
    question: '¿Puedo hacer el tax return antes de irme de Australia?',
    answer:
      'Solo en un caso. Si te vas de Australia para siempre y no vas a tener más ingresos australianos aparte de intereses, dividendos o regalías, la ATO acepta la declaración antes de que termine el año fiscal, el 30 de junio. Si la presentas tú, tiene que ser en el formulario en papel, y según la ATO el procesamiento tarda 50 días hábiles.\n\nTodos los demás presentan desde el 1 de julio, estén donde estén. Esperar no te hace perder nada.',
  },
  {
    question: '¿Puedo hacer el tax return después de irme?',
    answer:
      'Sí. El tax return cubre del 1 de julio al 30 de junio y se presenta desde el 1 de julio, desde cualquier país. Si lo presentas tú, el plazo es el 31 de octubre, y según la ATO la mayoría de las declaraciones presentadas por internet se procesan en 10 días hábiles. La devolución, si la hay, se paga en una cuenta bancaria australiana.',
  },
  {
    question: '¿Cierro mi cuenta australiana antes de irme?',
    answer:
      'No, no hasta que te lleguen la devolución y la super. La ATO paga las devoluciones solo en una cuenta bancaria australiana, y la super que tiene ella solo en una cuenta australiana a tu nombre o con cheque.\n\nSi la cuenta ya está cerrada, el pago vuelve a la ATO a través del Reserve Bank, lo que puede tardar hasta 10 días. Con datos de una cuenta australiana nueva, la ATO paga otra vez; sin ellos, reemite la devolución con cheque, y retiene algunos cheques hasta 90 días mientras pide datos bancarios.',
  },
  {
    question: '¿Cuándo puedo reclamar mi super después de irme?',
    answer:
      'Cuando se cumplen tres cosas a la vez: tu visa terminó, por vencimiento o cancelación, saliste de Australia y no tienes otra visa australiana activa. La solicitud de DASP en línea de la ATO se puede empezar antes de irte, pero solo se envía después. Según la ATO, el DASP normalmente se paga dentro de los 28 días de recibir una solicitud completa.',
  },
  {
    question: '¿Qué pasa con mi super si no la reclamo?',
    answer:
      'No se pierde. Cuando pasan 6 meses o más desde que te fuiste y tu visa terminó, tu fondo transfiere el saldo a la ATO. Puedes reclamarlo a la ATO en cualquier momento como DASP, pero la ATO lo paga solo en una cuenta australiana a tu nombre o con cheque, no por transferencia internacional.',
  },
  {
    question: '¿Necesito myGov después de irme?',
    answer:
      'Con nosotros no. Nos entendemos directamente con la ATO, así que no necesitas myGov para que preparemos tu tax return. La solicitud de DASP en línea de la ATO tampoco usa el acceso a myGov. myGov solo te hace falta para presentar tú por myTax, y sus códigos SMS llegan solo a un número australiano.',
  },
  {
    question: '¿La super y la devolución de impuestos son lo mismo?',
    answer:
      'No, son dos pagos distintos. La devolución es el impuesto retenido de más de tu sueldo, que paga la ATO después del tax return. El DASP es la super que tus empleadores pagaron además de tu sueldo, y la libera cada fondo cuando tu visa terminó. Muchos tienen las dos cosas pendientes.',
  },
  {
    question: '¿La devolución puede llegar a una cuenta de mi país?',
    answer:
      'No. La ATO paga las devoluciones solo en una cuenta bancaria australiana. Con la super es distinto: un fondo puede pagar el DASP por transferencia internacional si la ofrece. La super que ya tiene la ATO, en cambio, va solo a una cuenta australiana o con cheque.',
  },
  {
    question: 'Me fui hace años sin declarar. ¿Ya es tarde?',
    answer:
      'No. Un tax return atrasado todavía se puede presentar, y la super que quedó en Australia todavía se puede reclamar a la ATO. La ATO puede aplicar una multa por presentar tarde, pero dice que en general no lo hace en casos aislados.',
  },
]

const MYGOV_GUIDES = G.list([
  { slug: 'mygov-problems-tax-return-super', label: 'myGov no funciona: impuestos y super' },
  { slug: 'mygov-sms-code-not-received-overseas', label: 'No te llega el código SMS de myGov en el extranjero' },
  { slug: 'mygov-account-locked-out', label: 'Cuenta de myGov bloqueada' },
  { slug: 'cant-link-ato-to-mygov', label: 'No puedes vincular la ATO a myGov' },
  { slug: 'myid-foreign-passport-working-holiday', label: 'myID con pasaporte extranjero' },
  { slug: 'tax-return-without-mygov', label: 'El tax return sin myGov' },
  { slug: 'claim-super-without-mygov', label: 'Reclamar la super sin myGov' },
])

const GUIDES = G.list([
  { slug: 'tax-obligations-after-leaving-australia', label: 'Lo que queda pendiente después de irte' },
  { slug: 'early-tax-return-leaving-australia', label: 'El tax return antes de irte' },
  { slug: 'how-to-lodge-tax-return-from-overseas', label: 'Presentar el tax return desde el extranjero' },
  { slug: 'how-to-update-address-with-ato', label: 'Cambiar tu dirección en la ATO' },
  { slug: 'tax-refund-closed-australian-bank-account', label: 'Devolución con la cuenta australiana cerrada' },
  { slug: 'tax-and-super-timeline-working-holiday', label: 'Impuestos y super: fechas 2026-27' },
  { slug: 'how-long-does-dasp-take', label: 'Cuánto tarda el DASP' },
  { slug: 'what-happens-to-unclaimed-super', label: 'Qué pasa con la super no reclamada' },
])

export default function LeavingAustraliaEsPage() {
  return (
    <LeavingAustraliaPage
      lang="es"
      inLanguage="es"
      path="/es/leaving-australia"
      homeHref="/es"
      crumb={{ home: 'Inicio', current: 'Salir de Australia', label: 'Ruta de navegación' }}
      wa={WA}
      name="Salir de Australia: tax return y super, en orden"
      hero={{
        eyebrow: <>Salida &middot; Tax return &middot; Super</>,
        title: <>Salir de Australia: <Mark>tax return y super</Mark>, en orden</>,
        lead: <>Antes de irte de Australia, deja abierta tu cuenta bancaria australiana, actualiza tu dirección en la ATO y empieza la solicitud de tu super. Después de irte, presentas el tax return cuando el año fiscal termina el 30 de junio, y envías la solicitud de super (DASP) cuando tu visa terminó. Con nosotros no necesitas myGov para ninguna de las dos, y si ya te fuiste no has perdido nada.</>,
        sub: <>El tax return y la super son dos reclamos separados, con dos calendarios. La devolución de impuestos la paga la ATO y solo en una cuenta australiana. La super la paga cada fondo, normalmente dentro de los 28 días de una solicitud completa, y un fondo que ofrece transferencia internacional puede pagarla en una cuenta de tu país.</>,
        cta: 'Pregúntanos antes de irte',
        hint: 'Ver el orden de los pasos',
        hintHref: '#order',
        note: 'Respondemos en cerca de una hora.',
      }}
      sections={[
        {
          id: 'before-you-fly',
          title: '¿Qué hacer antes de irte de Australia?',
          tone: 'pale',
          body: (
            <>
              <p className={blocks.text}>Seis cosas, casi todas de pocos minutos, y todas más fáciles mientras sigues en Australia.</p>
              <StepList items={[
                {
                  title: 'Deja abierta tu cuenta australiana.',
                  body: <>La ATO paga las devoluciones solo en una cuenta australiana, y la super que tiene ella solo en una cuenta australiana a tu nombre o con cheque. Ciérrala cuando haya llegado todo. ¿Ya la cerraste? Lee {G.link('tax-refund-closed-australian-bank-account', 'devolución con la cuenta cerrada')}.</>,
                },
                {
                  title: 'Guarda tus últimos payslips y una lista de tus trabajos.',
                  body: <>Cada empleador que te pagó por nómina informa tus ingresos a la ATO, así que perder los payslips no es grave. Pero una lista de dónde trabajaste y más o menos cuándo deja ver enseguida si falta un trabajo, y con ella se encuentra cada fondo de super.</>,
                },
                {
                  title: 'Actualiza tu dirección en la ATO.',
                  body: <>Las cartas, incluido el Notice of Assessment y un posible cheque, van a la dirección que tiene la ATO. Cómo hacerlo: {G.link('how-to-update-address-with-ato', 'cambiar tu dirección en la ATO')}. Si preparamos tu tax return, actualizamos nosotros tu dirección en la ATO.</>,
                },
                {
                  title: 'Revisa si puedes presentar antes.',
                  body: <>La ATO acepta una declaración antes del 30 de junio solo si te vas para siempre y no vas a tener más ingresos australianos aparte de intereses, dividendos o regalías. Si la presentas tú, va en papel, y según la ATO tarda 50 días hábiles. Todos los demás presentan desde el 1 de julio. Más: {G.link('early-tax-return-leaving-australia', 'el tax return antes de irte')}.</>,
                },
                {
                  title: 'Empieza la solicitud de tu super.',
                  body: <>La solicitud de DASP en línea de la ATO se puede empezar y guardar antes de irte, y enviar cuando ya saliste y tu visa terminó. Si un fondo tiene 5.000 $ o más, puede pedir copias certificadas de tus documentos, y es más fácil conseguirlas aquí que desde tu país.</>,
                },
                {
                  title: 'Arregla cómo entrar desde el extranjero, si quieres usar myGov tú.',
                  body: <>myGov manda los códigos SMS solo a un celular australiano. Si vas a estar fuera o sin número australiano, la ATO recomienda myID, una passkey o una app de autenticación. Con nosotros no necesitas nada de eso.</>,
                },
              ]} />
              <p className={blocks.small}>
                Fuentes: ATO, {src(SRC.earlyLodge, 'presentar antes de irte')}, {src(SRC.fromOverseas, 'presentar desde fuera de Australia')}, {src(SRC.dasp, 'DASP')} y {src(SRC.mygov, 'crear una cuenta de myGov y vincularla a la ATO')}, revisado en noviembre de 2026.
              </p>
            </>
          ),
        },
        {
          id: 'after-you-leave',
          title: '¿Qué queda pendiente después de irte?',
          body: (
            <>
              <p className={blocks.text}>Tres cosas: el tax return del año en que te fuiste, tu super y, a los seis meses, la super que todavía no reclamaste. Todo se hace desde tu país.</p>
              <h3 className={blocks.cardTitle}>El tax return, después del 30 de junio</h3>
              <p className={blocks.text}>
                El año fiscal australiano termina el 30 de junio. Desde el 1 de julio puedes presentar desde cualquier país, y si lo haces tú, el plazo es el 31 de octubre. Según la ATO, la mayoría de las declaraciones por internet se procesan en 10 días hábiles, y la devolución llega a tu cuenta australiana. Tienes que declarar si tuviste ingresos distintos del sueldo como working holiday maker, si tu ingreso imponible fue de 45.001 $ o más, o si quieres deducir gastos. Cómo funciona desde fuera:{' '}
                <Link href={TAX_RETURN} className={blocks.textLink}>devolución de impuestos en Australia</Link> y {G.link('how-to-lodge-tax-return-from-overseas', 'presentar desde el extranjero')}.
              </p>
              <h3 className={blocks.cardTitle}>Tu super (DASP), cuando tu visa terminó</h3>
              <p className={blocks.text}>
                Puedes reclamarla cuando tu visa venció o fue cancelada, saliste de Australia y no tienes otra visa australiana activa. Cada fondo es una solicitud aparte, normalmente pagada dentro de los 28 días de una solicitud completa, y en la working holiday se retiene el 65 % de la parte imponible. Para los sueldos desde el 1 de julio de 2026, tu empleador tiene que hacer llegar el último aporte al fondo dentro de los 7 días hábiles del día de pago, con algunas excepciones: revisa que aparezca antes de enviar la solicitud. Paso a paso:{' '}
                <Link href="/es/superannuation" className={blocks.textLink}>reclamar tu superannuation</Link>.
              </p>
              <h3 className={blocks.cardTitle}>La super que pasó a la ATO, a los 6 meses</h3>
              <p className={blocks.text}>
                Si no la reclamaste y pasaron 6 meses o más desde que te fuiste, con tu visa terminada, tu fondo transfiere el saldo a la ATO. Se puede seguir reclamando como DASP en cualquier momento, pero la ATO lo paga solo en una cuenta australiana a tu nombre o con cheque. Más: {G.link('what-happens-to-unclaimed-super', 'qué pasa con la super no reclamada')}.
              </p>
              <p className={blocks.small}>
                Fuentes: ATO, {src(SRC.progress, 'estado de tu tax return')}, {src(SRC.dasp, 'DASP')}, {src(SRC.atoHeld, 'super en manos de la ATO')} y {src(SRC.paydaySuper, 'Payday Super')}, revisado en noviembre de 2026.
              </p>
            </>
          ),
        },
        {
          id: 'order',
          title: '¿En qué orden?',
          tone: 'pale',
          body: (
            <>
              <p className={blocks.text}>Primero la super, porque la preparas antes de irte; el tax return cuando terminó el año; la cuenta bancaria al final.</p>
              <StepTable
                head={['Cuándo', 'Qué hacer']}
                rows={[
                  { when: 'Antes de tu último turno', what: 'Anotar todos tus trabajos y guardar tus últimos payslips.' },
                  { when: 'Antes de irte', what: 'Actualizar tu dirección en la ATO, dejar abierta la cuenta australiana, empezar y guardar la solicitud de DASP, certificar tus documentos si un fondo tiene 5.000 $ o más.' },
                  { when: 'Dentro de 7 días hábiles desde tu último sueldo', what: 'Tu último aporte de super debería llegar al fondo (Payday Super, sueldos desde el 1 de julio de 2026, con excepciones).' },
                  { when: 'Ya fuera, con la visa terminada', what: 'Enviar la solicitud de DASP; cada fondo paga su parte por separado. Normalmente pagada dentro de los 28 días de una solicitud completa.' },
                  { when: 'Desde el 1 de julio', what: 'Presentar el tax return del año en que te fuiste. Plazo el 31 de octubre si lo presentas tú.' },
                  { when: 'Después de presentar por internet', what: 'Según la ATO, la mayoría de las declaraciones por internet se procesan en 10 días hábiles. La devolución llega a tu cuenta australiana.' },
                  { when: '6 meses o más desde que te fuiste, visa terminada', what: 'La super no reclamada pasa a la ATO. Se puede reclamar igual, pagada solo en una cuenta australiana o con cheque.' },
                  { when: 'Cuando haya llegado todo', what: 'Cerrar tu cuenta bancaria australiana.' },
                ]}
                caption={<>¿Te vas para siempre antes del 30 de junio y sin más ingresos australianos? La declaración también puede ir antes, en papel (50 días hábiles según la ATO). Todas las fechas del año: {G.link('tax-and-super-timeline-working-holiday', 'impuestos y super, fechas 2026-27')}.</>}
              />
            </>
          ),
        },
        {
          id: 'no-mygov',
          title: '¿Necesitas myGov después de irte?',
          body: (
            <>
              <p className={blocks.text}>
                No. Para tu tax return con nosotros no necesitas myGov: nos entendemos directamente con la ATO. La solicitud de DASP en línea de la ATO tampoco usa el acceso a myGov: pide tus datos personales, tu pasaporte y un correo, y el TFN es opcional.
              </p>
              <p className={blocks.text}>
                myGov solo importa si quieres presentar tú por myTax, y casi todos los bloqueos empiezan con el código SMS, que llega solo a un número australiano. Si ya te quedaste fuera, cada caso tiene su guía:
              </p>
              <LinkList items={MYGOV_GUIDES} />
            </>
          ),
        },
        {
          id: 'with-us',
          title: 'Cómo te ayudamos',
          tone: 'amber',
          body: (
            <>
              <p className={blocks.text}>
                Escríbenos dónde trabajaste y cuándo te vas. Preparamos tu{' '}
                <Link href={TAX_RETURN} className={blocks.textLink}>tax return</Link> cuando termina el año, actualizamos tu dirección en la ATO y, para tu{' '}
                <Link href="/es/superannuation" className={blocks.textLink}>super</Link>, buscamos cada fondo vinculado a tu Tax File Number y revisamos la solicitud contigo.
              </p>
              <p className={blocks.text}>
                No necesitas myGov. Nos entendemos directamente con la ATO. Tu tax return va revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO, y Working Holiday Tax opera bajo la supervisión de un agente fiscal registrado.
              </p>
              <div className={blocks.stack}>
                <WaButton href={WA} position="section" topic="tax-return" lang="es" size="md">Escríbenos por WhatsApp</WaButton>
                <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Respondemos en cerca de una hora.</p>
              </div>
            </>
          ),
        },
      ]}
      faqTitle="Preguntas antes y después de irte"
      faqs={faqs}
      guidesTitle="Profundiza en un paso"
      guides={GUIDES}
      cta={{
        title: 'Pregúntanos antes de irte',
        text: 'Escríbenos dónde trabajaste y cuándo te vas. Te decimos qué conviene hacer ahora y qué puede esperar hasta que estés en casa.',
        button: 'Escríbenos por WhatsApp',
        note: 'Respondemos en cerca de una hora.',
      }}
    />
  )
}
