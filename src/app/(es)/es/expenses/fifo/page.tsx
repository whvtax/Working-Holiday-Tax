import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { UI_BASE, HOME_CRUMB, HUB_CRUMB, esMetadata } from '../_shared'
import { guideHref, guideText } from '../../_blog-links'

export const metadata = esMetadata({
  route: '/expenses/fifo',
  title: 'Deducciones FIFO en Australia: equipo y Zone Offset',
  description:
    'Qué puede deducir un trabajador FIFO: equipo de protección, herramientas, renovación de tickets, exámenes médicos y la parte laboral del teléfono.',
  keywords: [
    'deducciones FIFO Australia',
    'fly in fly out impuestos Australia',
    'Zone Tax Offset FIFO',
    'alojamiento en campamento FIFO impuestos',
    'High Risk Work Licence deducible',
    'FIFO equipo de protección deducción',
    'trabajo FIFO mochilero tax return',
    'trabajo en minas Australia deducciones',
  ],
  ogTitle: 'FIFO en Australia: equipo, tickets y Zone Offset',
  ogDescription: 'La comida del campamento y el viaje al aeropuerto no se deducen. El Zone Tax Offset probablemente tampoco es tuyo.',
})

const WA = waUrl({ topic: 'expenses', lang: 'es', detail: 'FIFO y trabajo en campamento' })

const UI = {
  ...UI_BASE,
  guaranteeBody:
    'Solo hacemos impuestos para las visas 462 y 417, así que el zone offset, la residencia fiscal y la super repartida en varios fondos se revisan juntos. Revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO.',
}

const CRUMBS = [HOME_CRUMB, HUB_CRUMB, { name: 'FIFO', item: '/es/expenses/fifo' }]

const HERO = {
  kicker: 'Rosters, campamentos y sitios remotos',
  h1lead: 'El Zone Tax Offset probablemente no es tuyo.',
  h1accent: 'Esto sí.',
  lede: 'La habitación del campamento, el comedor y el vuelo son gastos de la empresa, no tuyos. Lo que te queda es el equipo de protección, la renovación de tickets (licencias de operador o de obra), los exámenes médicos y el teléfono.',
}

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: '¿Qué puede deducir un trabajador FIFO?',
    paras: [
      'Un trabajador FIFO (fly in, fly out) puede deducir el equipo de protección y la ropa de protección que compró de su bolsillo, y su lavado; herramientas y equipo; la renovación de un ticket o licencia que ya tiene; los exámenes médicos y los controles de drogas y alcohol que exige el empleador y que pagó él mismo; la parte laboral del teléfono y del internet; y la formación ligada al trabajo que ya hace.',
      'Lo que no está en esa lista es todo lo que hace que el FIFO parezca caro. Tu habitación en el campamento y tus comidas en el comedor las reserva y las paga la empresa, y normalmente el vuelo al sitio también. Una deducción solo devuelve dinero que salió de tu propio bolsillo.',
    ],
  },
  {
    kind: 'items',
    h2: 'Los gastos propios de este trabajo',
    intro: 'Todo lo de aquí tiene la misma condición: lo pagaste tú y no te lo entregó el almacén de la empresa.',
    items: [
      {
        t: 'Equipo de protección que compraste tú, y su lavado',
        d: 'Monos de trabajo, botas con puntera de acero, guantes, gafas de seguridad, protección auditiva, mascarillas. Son deducibles porque te protegen de un riesgo concreto del sitio. Lavarlos se deduce con la tarifa de la ATO: 1 AUD por lavado solo de ropa de trabajo, o 50 céntimos si va mezclada con el resto.',
      },
      {
        t: 'Herramientas y equipo',
        d: 'Todo lo que compraste para el trabajo y no te entregó el almacén. Cada artículo de 300 AUD o menos se deduce completo en el año de compra; los de más, repartidos en su vida útil. Un set de herramientas comprado junto por 300 AUD o más cuenta como un solo bien.',
      },
      {
        t: 'Renovar un ticket o una licencia que ya tienes',
        d: 'High Risk Work Licence, licencia de trabajo en altura (ticket), ticket de forklift. Las renovaciones se deducen una vez que ya trabajas en ese puesto. La primera no, por el mismo motivo que la primera White Card.',
      },
      {
        t: 'Exámenes médicos y controles que exige el empleador',
        d: 'Muchos sitios piden un examen médico previo y controles de drogas y alcohol como condición para trabajar. Si tu empleador lo exige para un puesto que ya tienes y lo pagaste tú, es deducible.',
      },
      {
        t: 'La parte laboral del teléfono y del internet',
        d: 'Revisar el roster, enviar las hojas de horas, hacer las inducciones por internet obligatorias. Deduce el porcentaje laboral con un criterio razonable, no la factura completa.',
      },
      {
        t: 'Formación ligada al trabajo que ya haces',
        d: 'Un curso corto que mantiene vigente una habilidad o un ticket es deducible, y también el viaje y el alojamiento si tu empleador te obliga a asistir lejos de tu base. Un primer certificado de ingreso para poder optar a un puesto no lo es.',
      },
    ],
  },
  {
    kind: 'note',
    label: 'El mayor mito del FIFO',
    title: 'Trabajar en una zona no es lo mismo que vivir en ella.',
    body: 'Desde un cambio en la ley en 2015, el Zone Tax Offset depende de dónde está tu residencia habitual, no de adónde te lleva el roster. Esa residencia tiene que estar dentro de una zona remota especificada durante una parte suficiente del año de ingresos.\n\nViajar en avión a una zona para trabajar mientras vives en Perth, Brisbane o Darwin entre un swing y otro no cumple ese requisito. El campamento no es tu residencia habitual, porque es temporal y depende del roster.\n\nPara la mayoría de los working holiday makers en un roster FIFO, el offset no aplica.',
  },
  {
    kind: 'answer',
    h2: '¿Qué tiene que haber detrás de un gasto FIFO?',
    paras: [
      'Un gasto sobrevive a tres preguntas. ¿Lo pagaste tú? ¿Te lo devolvieron? ¿Se hizo para ganar los ingresos que declaras? En un roster eso significa el recibo de las botas que el almacén no entregó, la factura del examen médico y la factura que respalda tu porcentaje del teléfono.',
      'El comprobante incluye importe, fecha, proveedor y artículo, en un recibo, una factura, un extracto bancario o una foto, y se guarda cinco años. Si tus gastos laborales del año suman 300 AUD o menos, no hace falta comprobante escrito. Esos 300 AUD no son el mismo límite que decide si una herramienta se deduce de golpe o a lo largo de su vida útil.',
    ],
  },
  {
    kind: 'traps',
    h2: '¿Qué errores cometen los trabajadores FIFO?',
    intro: 'En ningún otro trabajo de este sitio se repite con tanta seguridad tanta información falsa.',
    wrong: [
      {
        t: 'El Zone Tax Offset',
        d: 'Es lo que más se declara y a lo que un trabajador FIFO normalmente no tiene derecho. Depende de dónde vives habitualmente, no de adónde viajas, y el campamento no cuenta.',
      },
      {
        t: 'Alojamiento y comidas del campamento',
        d: 'Tu empleador reserva y paga la habitación y el comedor, y en sitios realmente remotos eso suele ser un beneficio exento para él y no ingreso para ti. De cualquier forma, tú nunca pagaste.',
      },
      {
        t: 'El viaje al aeropuerto antes de un swing',
        d: 'Es el trayecto habitual al trabajo, por temprano que sea el vuelo y por lejos que quede el aeropuerto. Existe una excepción estrecha para herramientas voluminosas, pero rara vez aplica a un puesto de servicios de campamento, donde o no hay nada voluminoso o hay un lugar seguro donde dejarlo.',
      },
      {
        t: 'Mudarte a Perth o Brisbane por el trabajo',
        d: 'Vuelos, flete y alojamiento temporal de una mudanza para empezar a trabajar en FIFO son gastos privados de traslado. Ponerte en posición de ganar ingresos no es lo mismo que ganarlos.',
      },
      {
        t: 'Una primera High Risk Work Licence',
        d: 'El ticket que pagaste para que te contrataran es un gasto privado. Renovarlo mientras ya trabajas con él sí es deducible.',
      },
    ],
    missed: [
      {
        t: 'Equipo de protección comprado de tu bolsillo, y su lavado',
        d: 'Mucha gente compra sus propias botas o guantes en vez de esperar al almacén, y después no declara ni el equipo ni el lavado con la tarifa publicada.',
      },
      {
        t: 'Exámenes médicos y controles de drogas y alcohol que pagaste',
        d: 'Son deducibles cuando el empleador los exige para un puesto que ya tienes, y casi nunca se declaran porque se sienten como un trámite y no como un gasto.',
      },
      {
        t: 'La parte laboral del teléfono y del internet durante el swing',
        d: 'El roster, las hojas de horas y las inducciones obligatorias pasan por un dispositivo personal.',
      },
      {
        t: 'Renovaciones de tickets durante un año largo de roster',
        d: 'Renovar una High Risk Work Licence o una licencia de trabajo en altura (ticket) entre dos swings es fácil de perder de vista al terminar el año.',
      },
      {
        t: 'Superannuation que se queda en varios fondos',
        d: 'El FIFO paga bien, así que el saldo de super es mayor que en la mayoría de los trabajos de mochilero. Se queda ahí cuando te vas y hay que pedirlo como Departing Australia Superannuation Payment (DASP) una vez que tu visa terminó.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: '¿Qué queda abierto en un caso FIFO?',
    paras: [
      'El Zone Tax Offset suele estar mal pedido, no ser imposible. Si durante tu working holiday tu base estaba dentro de una zona especificada, por ejemplo un alquiler en un pueblo remoto y no en una capital, la pregunta sigue abierta.',
      'La excepción de las herramientas voluminosas pesa más para un tradesperson que viaja con su propio set de herramientas que para un puesto de servicios de campamento. Lo deciden lo que llevaste y lo que el sitio ofrecía para guardarlo.',
      'La residencia fiscal es la pregunta más grande en un caso FIFO, porque las cifras son mayores. Una sentencia conocida como Addy puede influir en las tasas que se aplican, y su efecto varía de una persona a otra. No es algo que se pueda dar por supuesto: depende de los hechos de tu año y forma parte de nuestra revisión.',
    ],
  },
]

const FAQS = [
  {
    question: '¿Los trabajadores FIFO reciben el Zone Tax Offset?',
    answer:
      'Normalmente no, y es el mayor error sobre impuestos y FIFO. Desde un cambio en la ley en 2015, tener derecho depende de que tu residencia habitual esté dentro de una zona remota especificada durante una parte suficiente del año, no de dónde trabajas físicamente.\n\nVivir en una capital entre swings normalmente no lo cumple, y el campamento no es tu residencia habitual.',
  },
  {
    question: '¿Puedo deducir el alojamiento o las comidas del campamento?',
    answer:
      'No. Tu empleador organiza y paga la habitación y las comidas en el sitio, y en lugares realmente remotos suele tratarse como un beneficio exento para él.\n\nComo tú nunca pagaste la habitación ni la comida, no hay ningún gasto tuyo que deducir.',
  },
  {
    question: '¿Puedo deducir el viaje al aeropuerto antes del swing?',
    answer:
      'En casi todos los casos, no. El viaje de tu casa al aeropuerto es el trayecto privado normal al trabajo, por temprano que sea el vuelo.\n\nHay una excepción estrecha para herramientas realmente voluminosas y necesarias que no se pueden guardar de forma segura en el sitio, pero rara vez aplica a un puesto de servicios de campamento.',
  },
  {
    question: '¿Puedo deducir mi High Risk Work Licence?',
    answer:
      'Puedes deducir la renovación de una que ya tienes. No puedes deducir sacarla por primera vez, porque ese gasto te habilitó para el puesto y no corresponde a un trabajo que ya tenías.\n\nEs la misma diferencia entre primera vez y renovación que aplica la ATO a la White Card de construcción.',
  },
  {
    question: '¿Qué puedo deducir del teléfono y del internet durante el roster?',
    answer:
      'La parte laboral. Si usas tu propio teléfono o internet para el trabajo, para revisar el roster, enviar hojas de horas o hacer inducciones obligatorias por internet, esa parte de la factura es deducible.\n\nNecesitas una estimación razonable del porcentaje: la factura completa de un dispositivo que usas también para todo lo demás no se sostiene.',
  },
]

const GUIDES = [
  {
    href: guideHref('tools-equipment-under-300-instant-deduction-whv'),
    label: guideText('tools-equipment-under-300-instant-deduction-whv', 'La deducción inmediata de 300 AUD para herramientas y equipo'),
    desc: 'Por qué cada artículo se evalúa por separado y qué cambia con un set.',
  },
  {
    href: guideHref('1000-dollar-instant-deduction-rule-2026'),
    label: guideText('1000-dollar-instant-deduction-rule-2026', 'La deducción estándar de 1.000 AUD desde 2026-27'),
    desc: 'Quién puede usarla, cuándo empieza y cuándo conviene más detallar tus gastos.',
  },
  {
    href: '/es/superannuation',
    label: 'Cómo recuperar tu super al irte de Australia',
    desc: 'Cómo funciona el DASP y qué se retiene.',
  },
]

const SERVICES = [
  { href: '/es/tax-return', label: 'Tax return' },
  { href: '/es/superannuation', label: 'Superannuation' },
  { href: guideHref('tax-residency-working-holiday-makers'), label: guideText('tax-residency-working-holiday-makers', 'Residencia fiscal') },
]

export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'es',
        path: '/es/expenses/fifo',
        articleHeadline: 'FIFO en Australia: equipo, tickets y Zone Offset',
        articleDescription: 'La comida del campamento y el viaje al aeropuerto no se deducen. El Zone Tax Offset probablemente tampoco es tuyo.',
        inLanguage: 'es',
        photoKey: 'expenses/fifo',
        WA,
        UI,
        crumbs: CRUMBS,
        hero: HERO,
        sections: SECTIONS,
        faqs: FAQS,
        guides: GUIDES,
        services: SERVICES,
      }}
    />
  )
}
