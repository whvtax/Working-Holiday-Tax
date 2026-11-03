import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { UI_BASE, HOME_CRUMB, HUB_CRUMB, esMetadata } from '../_shared'
import { guideHref, guideText } from '../../_blog-links'

export const metadata = esMetadata({
  route: '/expenses/farm-work',
  title: 'Deducciones del trabajo agrícola en Australia',
  description:
    'Qué pueden deducir quienes recogen fruta o trabajan en granjas: protección solar, equipo de recolección, botas y traslados entre parcelas.',
  keywords: [
    'deducciones trabajo agrícola Australia',
    'fruit picking tax return',
    'devolución de impuestos fruit picking',
    'impuestos trabajo en granjas Australia mochilero',
    'deducciones trabajador de temporada ATO',
    'traslado entre granjas deducción',
    'piece rate impuestos Australia',
    'farm work visa working holiday segundo año',
  ],
  ogTitle: 'Deducciones del trabajo agrícola en Australia',
  ogDescription: 'La protección solar y los traslados entre parcelas se deducen. Tus jeans y el alquiler del hostel no. Qué puedes deducir en el campo.',
})

const WA = waUrl({ topic: 'expenses', lang: 'es', detail: 'Trabajo agrícola y fruit picking' })

const UI = {
  ...UI_BASE,
  guaranteeBody:
    'Una temporada de trabajos cortos, varios contratistas y una sola declaración es algo que ordenamos cada semana, para titulares de visas 462 y 417 y nadie más. Revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO.',
}

const CRUMBS = [HOME_CRUMB, HUB_CRUMB, { name: 'Trabajo agrícola', item: '/es/expenses/farm-work' }]

const HERO = {
  kicker: 'Granjas, huertos y naves de empaque',
  h1lead: 'El protector solar se deduce.',
  h1accent: 'Tus jeans nunca.',
  lede: 'La lista de gastos para recolectar, podar y empacar tiene unos seis conceptos. Lo que más importa es juntar en una sola declaración todos los trabajos cortos de la temporada.',
}

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: '¿Qué puede deducir quien recoge fruta o trabaja en una granja?',
    paras: [
      'Un trabajador agrícola puede deducir la protección solar que usa para trabajar al aire libre, los guantes y las botas de protección, las herramientas y el equipo de recolección que compró de su bolsillo, y el traslado entre dos granjas o parcelas dentro del mismo día de trabajo. Todo lo de esa lista lo tienes que haber pagado tú, sin reembolso, y tener un comprobante.',
      'El protector solar es un gasto privado para casi todo el mundo en Australia. En tu caso es deducible porque el trabajo te deja bajo el sol directo durante horas, y la ATO lo trata como una exposición propia del trabajo.',
    ],
  },
  {
    kind: 'items',
    h2: 'Los gastos propios de este trabajo',
    intro: 'Cada uno viene con una condición, y esa condición es lo que hace que el gasto se sostenga.',
    items: [
      {
        t: 'Protección solar: protector, sombrero de ala ancha, gafas de sol',
        d: 'Es deducible cuando el trabajo te expone al sol, lo que incluye recolectar, podar, ralear y empacar en una nave de empaque abierto por los lados. Deduce solo la parte que usaste para trabajar.',
      },
      {
        t: 'Guantes de protección, botas de goma y botas de seguridad',
        d: 'Guantes de recolección, botas para la lluvia, botas con puntera de acero para la nave de empaque. Cuentan porque te protegen de un peligro concreto del trabajo: espinas, savia, químicos, cajones que caen. Unas botas resistentes normales no cuentan.',
      },
      {
        t: 'Herramientas y equipo de recolección que compraste tú',
        d: 'Tijeras de podar, cuchillas, bolsa o arnés para recolectar, linterna frontal, rodilleras. Cada artículo de 300 AUD o menos se deduce completo en el año de compra. Si pasa de 300 AUD, igual se deduce, repartido en su vida útil.',
      },
      {
        t: 'Traslados entre granjas o parcelas el mismo día',
        d: 'Ir de una propiedad, parcela o nave de empaque a otra una vez que ya empezó tu jornada es un traslado deducible, que se calcula con el método de cents per kilometre o con un logbook. El primer viaje del día no entra.',
      },
      {
        t: 'Ropa de protección con una función real',
        d: 'Ropa para la lluvia, mono de trabajo resistente a químicos para fumigar, mascarilla antipolvo en una nave de empaque. La prueba es si el artículo te protege de algo que el trabajo te hace. Una camisa de franela que te abriga no cuenta.',
      },
      {
        t: 'La parte laboral del teléfono',
        d: 'Es pequeña, pero real si usas tu propio teléfono para el trabajo, por ejemplo para recibir los horarios de un contratista. Deduces el porcentaje laboral con un criterio razonable, no la factura completa.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: '¿Qué tienes que guardar de una temporada?',
    paras: [
      'Nada es deducible si no se cumplen tres cosas: el dinero era tuyo, nadie te lo devolvió y se gastó para ganar los ingresos de la declaración. En una temporada eso es el recibo de la gasolinera por el protector solar, el comprobante de los guantes y una nota con fechas y kilómetros cada vez que un contratista te movió entre parcelas.',
      'Sirve un recibo, una factura, un extracto bancario o una foto en el teléfono con el importe, la fecha, el proveedor y el artículo, guardados cinco años. Si tus gastos laborales de todo el año suman 300 AUD o menos, no hace falta comprobante escrito. Esos 300 AUD son distintos de los que deciden si un artículo se deduce de una vez o durante su vida útil.',
    ],
  },
  {
    kind: 'traps',
    h2: '¿Qué errores cometen los trabajadores agrícolas?',
    intro: 'Primero, lo que los trabajadores de temporada declaran cada año sin poder respaldarlo. Después, lo que nadie les dijo que existía.',
    wrong: [
      {
        t: 'La ropa normal que el trabajo estropea',
        d: 'Jeans, camisetas, una franela, ropa de abrigo para empezar a las cinco de la mañana. La ATO evalúa el artículo, no la intención, y la ropa convencional es privada por rápido que la fruta la arruine.',
      },
      {
        t: 'El alquiler del hostel y el depósito del hostel de trabajo',
        d: 'Dónde dormiste durante la temporada es un gasto de vida y no un gasto de trabajo, aunque el hostel sea el único alojamiento en cincuenta kilómetros y lo haya organizado la granja.',
      },
      {
        t: 'Comida y bebida durante el día',
        d: 'El almuerzo en una granja es igual que el almuerzo en cualquier otro lugar. Las comidas solo son deducibles cuando un viaje que exige tu empleador te mantiene fuera de casa por la noche, algo que una temporada de recolección normalmente no cumple.',
      },
      {
        t: 'El trayecto del hostel a la granja',
        d: 'Eso es ir al trabajo, ya sean cincuenta kilómetros de camino de tierra o una caminata. Solo se deduce el movimiento entre lugares de trabajo una vez que ya empezó el día.',
      },
      {
        t: 'Llegar a la región en primer lugar',
        d: 'El vuelo o el viaje por carretera hasta Bundaberg, Mildura o Tully para buscar trabajo te pone donde está el empleo, y eso no es un gasto para ganar ingresos con él.',
      },
    ],
    missed: [
      {
        t: 'El protector solar, el sombrero y las gafas de sol',
        d: 'Es el gasto que más se olvida en el trabajo agrícola. Casi nadie guarda el recibo de un protector de 19 AUD comprado en una gasolinera de carretera, y en una temporada no es poco.',
      },
      {
        t: 'Cada par de guantes, uno por uno',
        d: 'Los guantes de recolección se gastan. Comprar seis pares en una temporada son seis compras deducibles, no una, y cada una se evalúa por separado frente a los 300 AUD.',
      },
      {
        t: 'Traslados entre parcelas el mismo día',
        d: 'Son comunes en propiedades grandes y con contratistas que mueven a una cuadrilla, y casi nunca se declaran porque no se sienten como un viaje. Anota la fecha y los kilómetros sobre la marcha.',
      },
      {
        t: 'Un trabajo de tres semanas que se olvidó por completo',
        d: 'Un trabajo corto, pagado deprisa por un contratista de labour hire, se deja fuera fácilmente de la declaración, y dejar ingresos fuera es peor que perder una deducción.',
      },
      {
        t: 'Impuesto retenido de más por un empleador no registrado',
        d: 'Si el empleador no está registrado correctamente ante la ATO, puede retener a una tasa más alta de la debida. La diferencia se revisa al presentar la declaración.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: '¿Qué depende de cómo fue tu temporada?',
    paras: [
      'Si fue trabajo itinerante o trayecto habitual es una cuestión de hechos. Que un contratista te mande entre tres propiedades sin una base fija es una situación distinta a conducir once semanas al mismo huerto. Lo deciden cuántas veces cambió el lugar, si el trabajo exigía el traslado y si tenías un lugar de trabajo fijo.',
      'La residencia fiscal es otra cuestión, aparte de las deducciones. Es una evaluación y no una fórmula, y el caso Addy en el High Court es un ejemplo de lo que puede cambiar, con un efecto que varía de una persona a otra. Solo tomamos postura después de revisar tu año.',
      'El trabajo agrícola también cuenta para otra visa, pero eso es migración y no impuestos. Qué industrias, códigos postales y fechas cuentan lo define el Department of Home Affairs y ha cambiado más de una vez, así que consulta la guía oficial vigente o a un agente de migración registrado antes de dar por hecho que un trabajo cuenta.',
    ],
  },
]

const FAQS = [
  {
    question: '¿De verdad puedo deducir el protector solar y un sombrero?',
    answer:
      'Sí, cuando el trabajo te pone al sol, y el trabajo agrícola normalmente lo hace. La ATO acepta la protección solar como gasto de trabajo para quienes trabajan al aire libre, porque la exposición viene del empleo.\n\nGuarda los recibos y deduce solo la parte que usaste para trabajar.',
  },
  {
    question: 'Trabajé en tres granjas este año. ¿Son tres declaraciones?',
    answer:
      'No. Una declaración cubre todo el año fiscal, del 1 de julio al 30 de junio, sin importar cuántas granjas, contratistas o empresas de labour hire te hayan pagado. Cada empleador informa a la ATO tus sueldos y el impuesto retenido, y todo llega a una sola declaración.\n\nEl riesgo de una temporada de trabajos cortos es que se olvide uno.',
  },
  {
    question: '¿Cobrar por bin cambia mis impuestos?',
    answer:
      'No. El pago por pieza (piece rate) es sueldo, ya se calcule por bin, por cubo, por bandeja o por kilo. Tu empleador informa el total y retiene el impuesto igual que con una tarifa por hora.\n\nLo que sí cambia es cómo llevas tus registros, porque un pago que varía de un día a otro es más difícil de cotejar después con el income statement.',
  },
  {
    question: '¿Puedo deducir la gasolina para ir a la granja cada mañana?',
    answer:
      'No. El primer viaje del día, de donde vives a la primera granja, es el trayecto habitual al trabajo y no se deduce, por lejos que sea.\n\nEl traslado entre granjas, parcelas o naves una vez que ya empezó tu jornada sí es deducible, calculado con el método de cents per kilometre o con un logbook.',
  },
  {
    question: '¿Y si la granja nunca me dio payslips?',
    answer:
      'Normalmente no es un problema. La mayoría de los empleadores informa tu pago a la ATO mediante Single Touch Payroll, así que aparece como income statement aunque no hayas recibido un payslip (recibo de sueldo).\n\nIgual ayuda anotar qué granja, qué fechas y más o menos cuánto te pagaron.',
  },
]

const GUIDES = [
  {
    href: guideHref('piece-rates-farm-work-working-holiday'),
    label: guideText('piece-rates-farm-work-working-holiday', 'Piece rates en el trabajo agrícola, y el mínimo que tienen debajo'),
    desc: 'Cómo funciona el pago por bin y a cuánto tiene que llegar de todos modos.',
  },
  {
    href: guideHref('fruit-picking-jobs-working-holiday-australia'),
    label: guideText('fruit-picking-jobs-working-holiday-australia', 'Trabajo de fruit picking en Australia'),
    desc: 'Regiones, temporadas y qué revisar antes de aceptar el trabajo.',
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
  { href: guideHref('tax-residency-working-holiday-makers'), label: guideText('tax-residency-working-holiday-makers', 'Residencia fiscal') },
]

export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'es',
        path: '/es/expenses/farm-work',
        articleHeadline: 'Deducciones del trabajo agrícola en Australia',
        articleDescription: 'La protección solar y los traslados entre parcelas se deducen. Tus jeans y el alquiler del hostel no. Qué puedes deducir en el campo.',
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
