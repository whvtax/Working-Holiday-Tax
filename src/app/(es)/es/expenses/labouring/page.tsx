import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { UI_BASE, HOME_CRUMB, HUB_CRUMB, esMetadata } from '../_shared'
import { guideHref, guideText } from '../../_blog-links'

export const metadata = esMetadata({
  route: '/expenses/labouring',
  title: 'Deducciones de labour hire y almacenes en Australia',
  description:
    'Qué puede deducir quien trabaja por agencia: equipo de protección, renovación de tickets, herramientas y viajes entre sitios el mismo día.',
  keywords: [
    'deducciones labour hire Australia',
    'trabajo por agencia Australia impuestos',
    'trabajo en almacén tax return',
    'deducciones warehouse working holiday',
    'varias agencias income statement',
    'ticket de forklift deducible',
    'traslado entre sitios de trabajo deducción',
    'visa 462 labour hire impuestos',
  ],
  ogTitle: 'Deducciones de labour hire y almacenes en Australia',
  ogDescription: 'Dos agencias son dos income statements. Dos sitios en un día son una deducción que casi nadie declara.',
})

const WA = waUrl({ topic: 'expenses', lang: 'es', detail: 'Labour hire y trabajo en almacenes' })

const UI = {
  ...UI_BASE,
  guaranteeBody:
    'Reunir cuatro agencias y un turno suelto olvidado en una sola declaración es trabajo habitual aquí, y todos nuestros clientes tienen una visa 462 o 417. Revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO.',
}

const CRUMBS = [HOME_CRUMB, HUB_CRUMB, { name: 'Labour hire y almacenes', item: '/es/expenses/labouring' }]

const HERO = {
  kicker: 'Almacenes, mudanzas, jardinería y eventos',
  h1lead: 'Dos agencias son dos income statements.',
  h1accent: 'Dos sitios son una deducción.',
  lede: 'Una agencia olvidada cuesta más que cualquier recibo perdido, y una sola declaración tiene que llevarlas todas.',
}

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: '¿Qué puede deducir quien trabaja asignado por una agencia?',
    paras: [
      'Un trabajador de labour hire puede deducir el equipo de protección que exige el puesto en el sitio, la renovación de un ticket (licencia) de operación que ya tiene, las herramientas que compró de su bolsillo, el viaje entre dos lugares de trabajo el mismo día y la parte laboral del teléfono. Lo que se puede deducir depende del trabajo que hacías ese día, no del título del contrato con la agencia.',
      'Una semana en un almacén refrigerado, una semana en una cuadrilla de jardinería y un fin de semana desmontando un evento generan tres conjuntos de gastos distintos.',
    ],
  },
  {
    kind: 'items',
    h2: 'Los gastos propios de este trabajo',
    intro: 'Cada uno depende del puesto en el sitio. Pregunta qué exigía el lugar, no cómo te llamaba la agencia.',
    items: [
      {
        t: 'Viaje entre dos sitios el mismo día',
        d: 'Un almacén por la mañana y otro sitio por la tarde es viaje entre lugares de trabajo, y es deducible. El primer viaje desde casa sigue siendo el trayecto habitual.',
      },
      {
        t: 'Equipo de protección que exigía el sitio',
        d: 'Botas con puntera de acero, guantes, ropa de alta visibilidad, gafas de seguridad, protección auditiva, una manga anticorte. Es deducible cuando el artículo te protege de un riesgo identificable en ese trabajo y lo pagaste tú.',
      },
      {
        t: 'Renovar un ticket de forklift, EWP u otro de operación',
        d: 'Renovar un ticket que ya tienes y usas para el trabajo es deducible. El primero no, con el mismo principio que mantiene privada la primera White Card.',
      },
      {
        t: 'Herramientas y equipo que compraste tú',
        d: 'Todo lo que compraste y no te reembolsaron es deducible: 300 AUD o menos se deducen completos en el año de compra, y lo que pase de eso, durante la vida útil del artículo.',
      },
      {
        t: 'Ropa de protección para frío y clima',
        d: 'Una chaqueta térmica para el trabajo en almacenes refrigerados o congelados, ropa para la lluvia en jardinería al aire libre. Son ropa de protección y no ropa convencional porque existen para protegerte de una condición en la que te pone el trabajo.',
      },
      {
        t: 'La parte laboral del teléfono',
        d: 'Las agencias funcionan por mensajes: ofertas de turnos a las seis de la mañana, direcciones de los sitios, hojas de horas. El porcentaje laboral de tu plan es deducible cuando usas tu propio teléfono para eso.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: '¿Qué tienes que guardar entre una asignación y otra?',
    paras: [
      'Un gasto, tres pruebas: lo pagaste, nadie te lo reembolsó y se hizo para ganar los ingresos que declaras. Entre asignaciones eso son los recibos de las botas y los guantes que compraste, la renovación del ticket y una nota de fechas, sitios y distancias detrás del viaje.',
      'El comprobante puede ser un recibo, una factura, un extracto bancario o una foto en el teléfono con el importe, la fecha, el proveedor y el artículo, guardado cinco años. Con 300 AUD o menos de gastos laborales en todo el año, no hace falta comprobante escrito. Esos 300 AUD son distintos de los que deciden si un equipo se deduce de una vez o durante su vida útil.',
    ],
  },
  {
    kind: 'traps',
    h2: '¿Qué errores cometen en labour hire?',
    intro: 'Los gastos mal declarados son sobre todo ropa y trayectos. Los olvidados casi siempre tienen que ver con el número de empleadores, que es donde el labour hire hace perder dinero.',
    wrong: [
      {
        t: 'Pantalón y botas de trabajo sin función de protección',
        d: 'Un pantalón de trabajo liso, una camiseta, botas comunes que solo son resistentes. La ropa convencional es privada, por pesado que sea el trabajo y por rápido que se gaste.',
      },
      {
        t: 'El trayecto a un único sitio habitual',
        d: 'Si una agencia te asigna al mismo almacén durante dos meses, el viaje hasta allí es el trayecto habitual, no un viaje itinerante. Lo que hace deducible un viaje es moverte entre lugares de trabajo, no que te haya mandado una agencia.',
      },
      {
        t: 'Equipo que entregó la agencia',
        d: 'La mayoría de las agencias entregan ropa de alta visibilidad y a veces botas. Si te lo entregaron o te lo reembolsaron, no queda ningún gasto que deducir.',
      },
      {
        t: 'Un primer ticket, tratado como gasto del trabajo',
        d: 'La licencia de forklift que pagaste para que una agencia te propusiera es un gasto de habilitarte, no un gasto del trabajo. Las renovaciones, una vez asignado, sí son deducibles.',
      },
      {
        t: 'Dar por hecho que la agencia ya resolvió tus impuestos',
        d: 'Una agencia retiene impuesto e informa tus sueldos. No presenta tu declaración, no declara tus deducciones ni comprueba si las otras dos agencias tienen bien tus datos.',
      },
    ],
    missed: [
      {
        t: 'El income statement de una agencia olvidada',
        d: 'Tres semanas con una agencia en marzo, un turno en otro estado en junio, y la declaración sale sin ellos. Es peor que perder una deducción, porque obliga a enmendar después.',
      },
      {
        t: 'Viajes entre dos sitios en un día',
        d: 'Es común cuando la agencia mueve a una cuadrilla, y casi nunca se declara porque otra persona decidió el movimiento. Sigue siendo viaje deducible entre lugares de trabajo.',
      },
      {
        t: 'Botas y guantes que compraste tú entre asignaciones',
        d: 'El equipo comprado para poder aceptar el siguiente trabajo se paga con prisa y nunca se guarda el recibo. Cada artículo de menos de 300 AUD es una deducción completa en el año de compra.',
      },
      {
        t: 'La renovación de un ticket pagada en efectivo',
        d: 'Las renovaciones de forklift y EWP son tan baratas que se olvidan para julio, y son deducibles cuando ya trabajas con el ticket.',
      },
      {
        t: 'Semanas con retención a la tasa equivocada',
        d: 'Una agencia nueva que no procesó tu Tax File Number Declaration, o que no está registrada correctamente ante la ATO, puede retener bastante más de lo debido. Vuelve con la declaración que reúne a todas las agencias.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: '¿Qué partes dependen de cómo fue tu año?',
    paras: [
      'Cuánto se movió entre sitios decide cuánto viaje es deducible, y es una cuestión de hechos más que una regla. Cuántas veces cambió el sitio, si una base te seguía llamando de vuelta y si la agencia exigía el movimiento influyen todos. Dos personas de la misma agencia pueden terminar con deducciones de viaje muy distintas.',
      'Cada agencia es un empleador distinto, con su propia Tax File Number Declaration, su relación de retención y su income statement. Los working holiday makers no tienen mínimo exento con ninguna, así que el riesgo es una tasa mal aplicada o un empleador que falta en la declaración.',
      'La residencia fiscal está debajo de todo. Una sentencia conocida como Addy puede influir en las tasas que se aplican, y eso puede pesar más que todas las deducciones de esta página. Su efecto varía de una persona a otra, depende de los hechos de tu año y forma parte de nuestra revisión.',
    ],
  },
]

const FAQS = [
  {
    question: 'Estoy registrado en tres agencias. ¿Cambia eso mis impuestos?',
    answer:
      'Cada agencia es legalmente un empleador distinto, con su propia Tax File Number Declaration, su retención y su income statement. Todas van en una sola declaración.\n\nTus sueldos tributan con la tasa de working holiday maker y no contra un mínimo exento, así que el riesgo real es que se deje fuera una agencia.',
  },
  {
    question: '¿Puedo deducir el viaje entre distintos sitios de trabajo?',
    answer:
      'Normalmente sí. El viaje entre dos lugares de trabajo distintos, un almacén por la mañana y otro sitio por la tarde, es deducible de una forma en que no lo es el viaje de casa a un único lugar de trabajo habitual.\n\nCuánto califica depende de cuánto te hayas movido entre sitios, así que anota las fechas, los sitios y las distancias.',
  },
  {
    question: '¿En qué se diferencia el labouring de la construcción para los impuestos?',
    answer:
      'Las pruebas son idénticas, los artículos no. El trabajo en obras suele exigir una White Card y equipo de protección estándar. El labour hire general cubre almacenes, mudanzas, jardinería, líneas de producción y eventos, donde el equipo depende del puesto en el sitio y muchas veces no hace falta una White Card.\n\nSi tus asignaciones son en obras, la página de construcción profundiza más.',
  },
  {
    question: '¿Puedo deducir una licencia de forklift?',
    answer:
      'Puedes deducir la renovación de una que ya tienes y usas para el trabajo. Sacar el ticket por primera vez no es deducible, porque la ATO trata calificarte para el trabajo como un gasto privado.\n\nUn ticket de EWP, una White Card y una licencia de conducir caen del mismo lado.',
  },
  {
    question: 'Solo hice unos pocos turnos. ¿Vale la pena deducir algo?',
    answer:
      'Normalmente sí, siempre que hayas pagado las cosas tú y no te las hayan reembolsado. Incluso unos pocos turnos pueden implicar botas, guantes, la renovación de un ticket o viajes entre sitios, y cada dólar de deducción reduce los ingresos sobre los que se calcula el impuesto.\n\nLa prueba no cambia con el número de turnos.',
  },
]

const GUIDES = [
  {
    href: guideHref('labour-hire-agencies-working-holiday-australia'),
    label: guideText('labour-hire-agencies-working-holiday-australia', 'Las agencias de labour hire y cómo funcionan'),
    desc: 'Quién es realmente tu empleador cuando te asigna una agencia.',
  },
  {
    href: guideHref('white-card-australia-working-holiday'),
    label: guideText('white-card-australia-working-holiday', 'La White Card y lo que te cuesta'),
    desc: 'Cómo sacarla y por qué la primera no es una deducción.',
  },
  {
    href: guideHref('tools-equipment-under-300-instant-deduction-whv'),
    label: guideText('tools-equipment-under-300-instant-deduction-whv', 'La deducción inmediata de 300 AUD para herramientas y equipo'),
    desc: 'Por qué cada artículo se evalúa por separado y qué cambia con un set.',
  },
]

const SERVICES = [
  { href: '/es/tax-return', label: 'Tax return' },
  { href: '/es/tfn', label: 'TFN' },
  { href: '/es/superannuation', label: 'Superannuation' },
]

export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'es',
        path: '/es/expenses/labouring',
        articleHeadline: 'Deducciones de labour hire y almacenes en Australia',
        articleDescription: 'Dos agencias son dos income statements. Dos sitios en un día son una deducción que casi nadie declara.',
        inLanguage: 'es',
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
