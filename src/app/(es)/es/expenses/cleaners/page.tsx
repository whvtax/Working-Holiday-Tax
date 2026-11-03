import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { UI_BASE, HOME_CRUMB, HUB_CRUMB, esMetadata } from '../_shared'
import { guideHref, guideText } from '../../_blog-links'

export const metadata = esMetadata({
  route: '/expenses/cleaners',
  title: 'Deducciones de limpieza en Australia: equipo y traslados',
  description:
    'Qué puede deducir quien trabaja en limpieza: equipo y productos, protección, lavado del uniforme con la tarifa de la ATO y el viaje entre trabajos.',
  keywords: [
    'deducciones limpieza Australia',
    'cleaner tax return Australia',
    'limpieza de casas impuestos working holiday',
    'trabajo de limpieza ABN Australia',
    'lavado de uniforme deducción ATO',
    'traslado entre trabajos deducción',
    'GST limpieza sole trader',
    'visa 462 limpieza impuestos',
  ],
  ogTitle: 'Deducciones de limpieza: equipo, lavado y traslados',
  ogDescription: 'El viaje entre casas puede ser una deducción importante en una declaración de limpieza, y casi nadie la declara.',
})

const WA = waUrl({ topic: 'expenses', lang: 'es', detail: 'Trabajo de limpieza' })

const UI = {
  ...UI_BASE,
  guaranteeBody:
    'Las declaraciones de limpieza llegan a nuestra mesa cada semana, y todas son de personas con una visa 462 o 417. Revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO.',
}

const CRUMBS = [HOME_CRUMB, HUB_CRUMB, { name: 'Limpieza', item: '/es/expenses/cleaners' }]

const HERO = {
  kicker: 'Casas, oficinas, end of lease y trabajo por app',
  h1lead: 'El viaje entre casas es la deducción.',
  h1accent: 'Casi nadie la declara.',
  lede: 'Los productos, los guantes y el lavado del uniforme con la tarifa de la ATO también están en la lista.',
}

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: '¿Qué puede deducir quien trabaja en limpieza?',
    paras: [
      'Quien limpia puede deducir el equipo y los productos de limpieza que compró de su bolsillo, el equipo de protección como guantes, delantal o botas con puntera de acero, el lavado de un uniforme obligatorio o de ropa de protección, y el viaje de un trabajo de limpieza al siguiente el mismo día. Lo que un cliente o empleador entrega o reembolsa queda excluido.',
      'Tres casas en un día significan dos tramos de viaje deducibles, y en un año eso puede sumar una deducción importante.',
    ],
  },
  {
    kind: 'items',
    h2: 'Los gastos propios de este trabajo',
    intro: 'La mayor parte del equipo de limpieza cuesta menos de 300 AUD, así que se deduce completo en el año de compra en vez de repartirse en el tiempo.',
    items: [
      {
        t: 'Viajes entre trabajos de limpieza',
        d: 'El trayecto de una casa u oficina a la siguiente, una vez que ya empezó tu día, es viaje entre lugares de trabajo y no el trayecto habitual, y es deducible. Usa el método de cents per kilometre o un logbook.',
      },
      {
        t: 'Equipo y productos de limpieza',
        d: 'Mopas, cubos, rasquetas, paños, productos químicos y consumibles que compras tú. Cada artículo de 300 AUD o menos se deduce completo en el año de compra. Un kit inicial comprado junto por 300 AUD o más es un solo bien, que se deduce durante su vida útil, aunque cada pieza por separado hubiera quedado bajo el límite.',
      },
      {
        t: 'Equipo más grande, de 300 AUD o más',
        d: 'Una aspiradora industrial, una pulidora de pisos, una hidrolavadora. Siguen siendo deducibles, repartidos en la vida útil del artículo.',
      },
      {
        t: 'Equipo de protección',
        d: 'Guantes, delantal, gafas de seguridad o protector facial para trabajos con químicos fuertes o polvo, botas con puntera de acero para obras y trabajo comercial. Cuentan porque te protegen de un peligro del trabajo.',
      },
      {
        t: 'Lavar ropa de trabajo deducible',
        d: 'Lavar un uniforme obligatorio o ropa de protección real es deducible con la tarifa de la ATO: 1 AUD por lavado de solo ropa de trabajo, o 50 céntimos por lavado si va mezclada con el resto. Si superas 150 AUD de lavado en el año, lleva un registro en vez de una estimación.',
      },
      {
        t: 'La parte laboral del teléfono',
        d: 'Es real para quien recibe reservas, usa una app o escribe a clientes por llaves y accesos. Deduce el porcentaje laboral con un criterio razonable, no el plan completo.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: '¿Qué tiene que guardar quien limpia?',
    paras: [
      'Tres pruebas detrás de cada gasto: lo pagaste, nadie te lo devolvió y se hizo para ganar los ingresos que declaras. Para quien limpia eso significa los recibos de productos y equipo, y un registro de fechas, direcciones y kilómetros detrás de la conducción.',
      'Sirve un recibo, una factura, un extracto bancario o una foto en el teléfono con el importe, la fecha, el proveedor y el artículo, guardados cinco años. Con 300 AUD o menos de gastos laborales en todo el año, no hace falta comprobante escrito. Esos 300 AUD son distintos de los que deciden cómo se deduce una aspiradora concreta.',
    ],
  },
  {
    kind: 'tables',
    h2: '¿Cómo se calculan los gastos del vehículo?',
    intro: 'Dos métodos, uno por vehículo y por año. Para quien limpia solo cuentan los tramos entre trabajos, nunca el trayecto de casa a la primera casa.',
    tables: [
      {
        label: 'Cents per kilometre',
        rows: [
          ['Tarifa 2024-25 y 2025-26', '88 céntimos por km'],
          ['Tarifa desde 2026-27', '91 c por km'],
          ['Máximo', '5.000 km por vehículo y por año'],
          ['Recibos', 'No se exigen, pero debes mostrar cómo calculaste los kilómetros'],
        ],
      },
      {
        label: 'Logbook',
        rows: [
          ['Cómo funciona', 'Deduces el porcentaje laboral de cada gasto real de uso del vehículo'],
          ['Período del logbook', '12 semanas seguidas, válido por cinco años'],
          ['Máximo', 'Sin tope. Sigue tu porcentaje real de uso laboral'],
          ['Recibos', 'Obligatorios para cada gasto que deduzcas'],
        ],
      },
    ],
    note: 'Tres o cuatro direcciones al día superan los 5.000 kilómetros más rápido de lo que la mayoría espera, y a partir de ahí el logbook suele ganar, porque incluye combustible, seguro, registro, mantenimiento, depreciación e intereses del préstamo.',
  },
  {
    kind: 'traps',
    h2: '¿Qué errores cometen quienes limpian?',
    intro: 'Los gastos mal declarados se concentran en la ropa y el primer viaje del día. Los olvidados son casi todos de traslados.',
    wrong: [
      {
        t: 'Pantalón negro liso y polo liso',
        d: 'Aunque un cliente o una agencia insista en un color, la ropa convencional es privada. Que el cloro la arruine no la hace deducible.',
      },
      {
        t: 'El primer y el último viaje del día',
        d: 'De casa al primer trabajo, y del último trabajo a casa, es el trayecto habitual. Solo se deducen los tramos intermedios, salvo que cumplas la excepción del equipo voluminoso.',
      },
      {
        t: 'Productos y equipo que pone el cliente',
        d: 'Si la casa guarda los productos bajo el fregadero, o la empresa entrega el equipo, no hay ningún gasto tuyo que deducir. Lo mismo vale para lo que te reembolsaron.',
      },
      {
        t: 'Creer que un ABN te permite deducirlo todo',
        d: 'Tener un ABN no convierte un gasto privado en gasto de negocio. Tu teléfono, tu vehículo y tu ropa se siguen prorrateando.',
      },
      {
        t: 'Suponer que los trabajos en efectivo no hay que declararlos',
        d: 'Los ingresos de limpieza son ingresos, lleguen por transferencia, por pago de una app o en un sobre.',
      },
    ],
    missed: [
      {
        t: 'El viaje entre trabajos',
        d: 'Quien limpia trabaja en tres o cuatro direcciones al día y no declara nada de la conducción, porque no se siente como un viaje de trabajo. Anota la fecha, las direcciones y los kilómetros sobre la marcha.',
      },
      {
        t: 'Cada botella y cada paño, compra por compra',
        d: 'Los consumibles se compran todo el tiempo y casi nunca se guarda el recibo. Basta con ir sacando una foto del recibo en un álbum del teléfono.',
      },
      {
        t: 'El lavado, con una tarifa publicada',
        d: 'Lavar la ropa de protección y un uniforme obligatorio es deducible a 1 AUD o 50 céntimos por lavado, y casi nadie sabe que existe esa tarifa.',
      },
      {
        t: 'Equipo comprado mientras te organizabas',
        d: 'El equipo y los productos comprados cuando registraste un ABN y empezaste a buscar clientes generalmente son deducibles, aunque la primera factura haya llegado después. Un intervalo largo entre la compra y el primer trabajo lo debilita, así que guarda las fechas.',
      },
      {
        t: 'Semanas con retención equivocada de una empresa de limpieza',
        d: 'Si una empresa nunca recibió tu Tax File Number Declaration, o no está registrada correctamente ante la ATO, puede haber retenido mucho más de lo debido. Eso se revisa con la declaración.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: '¿Qué cambia según para quién limpias?',
    paras: [
      'Sole trader o empleado es la primera bifurcación. Las casas particulares, los end of lease y las reservas por app, por ejemplo Airtasker, son ingresos con ABN: tú pones el precio, tú facturas, no se retiene nada y no se paga super.',
      'Que una empresa de limpieza te asigne a sitios y turnos es empleo bajo un TFN, con impuesto retenido y super encima.',
      'Una empresa que fijó tu horario, supervisó tu trabajo y puso los productos, y luego te pidió sacar un ABN, puede ser un empleador con etiqueta de contratista.',
      'Para un sole trader el GST solo es obligatorio cuando los ingresos de limpieza pasan de 75.000 AUD en un año, algo a lo que la limpieza a tiempo parcial casi nunca se acerca.',
      'La residencia fiscal es otra cuestión, aparte de las deducciones. Una sentencia conocida como Addy puede influir en las tasas que se aplican, y su efecto varía de una persona a otra. No es algo que se pueda dar por supuesto: depende de los hechos de tu año y forma parte de nuestra revisión.',
    ],
  },
]

const FAQS = [
  {
    question: '¿Puedo deducir el viaje entre trabajos de limpieza?',
    answer:
      'Sí. Ir de un trabajo de limpieza al siguiente el mismo día es viaje entre lugares de trabajo y no el trayecto habitual, y es deducible con el método de cents per kilometre o con un logbook.\n\nEl primer viaje desde casa y el último de vuelta a casa no lo son, salvo que lleves equipo voluminoso que no se pueda guardar de forma segura en los sitios.',
  },
  {
    question: '¿Qué equipo y productos de limpieza puedo deducir?',
    answer:
      'Todo lo que compraste tú y no te reembolsaron: mopas, cubos, rasquetas, paños, productos químicos y consumibles.\n\nLos artículos de 300 AUD o menos se deducen completos en el año de compra. Una aspiradora industrial o una pulidora de pisos de más de 300 AUD se deduce durante su vida útil.',
  },
  {
    question: '¿Puedo deducir mi uniforme y el costo de lavarlo?',
    answer:
      'Puedes deducir un uniforme exigido que tu empleador o cliente no entrega, y el equipo de protección con una función real de seguridad, como guantes, delantal o botas con puntera de acero. El pantalón negro liso y el polo liso no.\n\nLavar la ropa de trabajo deducible se deduce a 1 AUD por lavado de solo ropa de trabajo, o 50 céntimos por lavado mezclada con ropa de diario, con un registro cuando pasas de 150 AUD en el año.',
  },
  {
    question: '¿Tengo que registrarme para el GST como persona de limpieza con ABN?',
    answer:
      'Solo cuando tus ingresos por trabajo de limpieza pasan de 75.000 AUD en un año. Es el umbral general de un sole trader, no una regla de limpieza, y la limpieza a tiempo parcial rara vez se le acerca. Por debajo, facturas sin línea de GST.',
  },
  {
    question: '¿Soy sole trader o empleado?',
    answer:
      'Mira quién controla el trabajo, no cómo lo llama el papeleo. Si tú fijas el precio, eliges qué trabajos aceptar y podrías mandar a otra persona, es trabajo de sole trader con un ABN.\n\nSi otra empresa fija tu horario, te supervisa y pone los productos, es empleo aunque el contrato diga otra cosa, con impuesto y super a pagar.\n\nMucha gente que limpia es las dos cosas en un mismo año.',
  },
]

const GUIDES = [
  {
    href: guideHref('abn-deductions-business-expenses'),
    label: guideText('abn-deductions-business-expenses', 'Gastos de negocio cuando trabajas con un ABN'),
    desc: 'Qué puede deducir un sole trader y dónde está la línea.',
  },
  {
    href: guideHref('tools-equipment-under-300-instant-deduction-whv'),
    label: guideText('tools-equipment-under-300-instant-deduction-whv', 'La deducción inmediata de 300 AUD para herramientas y equipo'),
    desc: 'Por qué cada artículo se evalúa por separado y qué cambia con un set.',
  },
  {
    href: guideHref('tax-deductions-working-holiday-makers'),
    label: guideText('tax-deductions-working-holiday-makers', 'Deducciones para working holiday makers: la lista completa'),
    desc: 'Todas las categorías, y lo que la ATO rechaza.',
  },
]

const SERVICES = [
  { href: '/es/abn', label: 'ABN' },
  { href: '/es/tfn', label: 'TFN' },
  { href: '/es/tax-return', label: 'Tax return' },
]

export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'es',
        path: '/es/expenses/cleaners',
        articleHeadline: 'Deducciones de limpieza: equipo, lavado y traslados',
        articleDescription: 'El viaje entre casas puede ser una deducción importante en una declaración de limpieza, y casi nadie la declara.',
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
