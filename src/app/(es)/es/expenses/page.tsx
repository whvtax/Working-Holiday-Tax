import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { UI_BASE, HOME_CRUMB, HUB_CRUMB, esMetadata } from './_shared'
import { guideHref, guideText } from '../_blog-links'

export const metadata = esMetadata({
  route: '/expenses',
  title: 'Gastos deducibles en Australia según tu trabajo',
  description:
    'Lo que puedes deducir depende de tu trabajo. Listas para trabajo agrícola, hostelería, construcción, delivery, limpieza, labour hire y FIFO.',
  keywords: [
    'deducciones tax return Australia',
    'qué puedo deducir en Australia working holiday',
    'gastos deducibles Australia backpackers',
    'deducciones ATO working holiday maker',
    'gastos relacionados con el trabajo Australia',
    'cents per kilometre Australia',
    'visa 462 deducciones',
    'visa 417 deducciones',
  ],
  ogTitle: 'Qué puedes deducir en Australia, según tu trabajo',
  ogDescription: 'Quien recoge fruta y quien reparte comida no deducen lo mismo. Busca tu trabajo y mira qué aplica de verdad.',
})

const WA = waUrl({ topic: 'expenses', lang: 'es', detail: 'Deducciones para mi tipo de trabajo' })

const UI = {
  ...UI_BASE,
  guaranteeBody:
    'Los impuestos de la visa working holiday son lo único que hacemos. Tu declaración la revisa y la aprueba un agente fiscal registrado antes de presentarse ante la ATO.',
}

const CRUMBS = [HOME_CRUMB, HUB_CRUMB]

const HERO = {
  kicker: 'Visas 462 (Work and Holiday) y 417 (Working Holiday)',
  h1lead: 'Las deducciones no son una lista única.',
  h1accent: 'Son tu lista.',
  lede: 'Siete tipos de trabajo, cada uno con sus gastos, sus comprobantes y las cosas que la ATO rechaza.',
}

/* El mismo bloque de myGov que en inglés: cada fila habla de la casilla vacía. */
const MYGOV_UI = {
  kicker: 'Hacerlo por tu cuenta',
  h2lead: 'myGov tiene una casilla de deducciones',
  h2accent: 'y no sabe qué pone ahí tu trabajo.',
  lede: 'Qué va en esa casilla y qué comprobante respalda cada gasto se define antes de escribir nada.',
  colLeft: 'En myGov',
  colRight: 'Con nosotros',
  close: 'No tendrás que entrar a myGov, vincular una identificación ni averiguar qué formulario es cuál. Nos entendemos directamente con la ATO.',
}

const MYGOV = [
  {
    mygov: 'La casilla de deducciones está vacía. Nada te sugiere qué puede deducir tu trabajo.',
    us: 'Partimos del trabajo que hiciste y repasamos la lista que le corresponde.',
  },
  {
    mygov: 'Acepta cualquier cifra que escribas, incluso una que no podrías justificar.',
    us: 'Te decimos qué gastos necesitan recibo, cuáles se respaldan con un extracto bancario y cuáles no se sostienen.',
  },
  {
    mygov: 'Nadie te avisa de que quien recoge fruta, quien trabaja de barista y quien trabaja en obra no deducen lo mismo.',
    us: 'Siete tipos de trabajo, cada uno con su lista y su regla de comprobantes.',
  },
  {
    mygov: 'El alquiler, la comida y el trayecto al trabajo parecen deducibles y no lo son.',
    us: 'Nos quedamos con las deducciones que se sostienen, para que no haya que deshacer nada después.',
  },
]

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: '¿Qué puede deducir un working holiday maker en la declaración de impuestos de Australia?',
    paras: [
      'Puedes deducir lo que gastaste para ganar los ingresos que declaras, siempre que lo hayas pagado tú y no te lo hayan reembolsado. La visa (462 o 417) no cambia nada en esto.',
      'Lo que cambia la lista es el trabajo. La protección solar es deducible si recoges fruta en un huerto abierto, pero no si trabajas detrás de una barra.',
    ],
  },
  {
    kind: 'occupations',
    h2: '¿Qué trabajo hiciste realmente?',
    intro: 'Siete páginas, cada una con lo que se puede deducir en ese oficio y lo que se declara por error.',
    jobs: [
      {
        href: '/es/expenses/farm-work',
        title: 'Trabajo agrícola y fruit picking',
        line: 'Protección solar, equipo de recolección y traslados entre parcelas el mismo día.',
      },
      {
        href: '/es/expenses/hospitality',
        title: 'Hostelería y cocinas',
        line: 'Renovación del RSA, zapatos antideslizantes, ropa de chef y por qué la ropa negra no es uniforme.',
      },
      {
        href: '/es/expenses/construction',
        title: 'Construcción',
        line: 'La regla de las herramientas de 300 AUD, el equipo de protección y la White Card, que solo se deduce la segunda vez.',
      },
      {
        href: '/es/expenses/delivery-drivers',
        title: 'Delivery y reparto',
        line: 'Gastos de vehículo y bici, la parte laboral del teléfono y la regla del GST que cambia si llevas pasajeros.',
      },
      {
        href: '/es/expenses/cleaners',
        title: 'Limpieza',
        line: 'Equipo y productos, tarifa de lavado y el trayecto entre casas.',
      },
      {
        href: '/es/expenses/labouring',
        title: 'Labour hire y almacenes',
        line: 'Varias agencias, varios income statements y traslados entre lugares de trabajo en un mismo día.',
      },
      {
        href: '/es/expenses/fifo',
        title: 'FIFO y trabajo en campamento',
        line: 'Renovación de tickets (licencias de operador o de obra), equipo de protección y el Zone Tax Offset que casi nadie en un roster cumple.',
      },
    ],
  },
  {
    kind: 'numbered',
    h2: '¿Qué tiene que cumplirse para que algo sea deducible?',
    intro: 'Tres pruebas, aplicadas a cada gasto de todas estas páginas. Si falla una, el gasto no vale, por laboral que parezca.',
    steps: [
      'Lo pagaste tú, y ningún empleador ni cliente te lo reembolsó.',
      'El gasto se hizo para ganar tus ingresos, no para ponerte en condiciones de ganarlos, y no es un gasto privado o doméstico.',
      'Tienes un comprobante que muestra qué compraste, cuándo, a quién y por cuánto.',
    ],
    note: 'La segunda prueba es la que más gastos tumba. Por eso tu primera White Card no se deduce, pero su renovación sí.',
  },
  {
    kind: 'answer',
    h2: '¿Qué tienes que poder demostrar?',
    paras: [
      'Un recibo, una factura o un extracto bancario con el importe, la fecha, el proveedor y qué era. Una foto en el teléfono sirve, y tienes que poder mostrarla durante cinco años.',
      'Si el total de tus gastos laborales del año es de 300 AUD o menos, no necesitas comprobantes escritos. Es una concesión distinta de la regla de los 300 AUD por artículo, que trata de cómo se deduce un artículo concreto.',
    ],
  },
  {
    kind: 'note',
    label: 'Cambia desde el año de ingresos 2026-27',
    title: 'La deducción estándar de 1.000 AUD, o tus gastos reales.',
    body: 'Desde el año de ingresos 2026-27, la ATO tiene una deducción estándar de 1.000 AUD para gastos relacionados con el trabajo que no pide recibos, para las personas a las que se aplica. Los gastos que reclames la reducen, así que no se suman.\n\nSe aplica por primera vez a la declaración 2026-27, que se presenta desde julio de 2027. Las declaraciones 2025-26 siguen con las reglas anteriores.',
  },
  {
    kind: 'tables',
    h2: '¿Cómo se calculan los gastos del vehículo?',
    intro: 'Dos métodos, uno por vehículo y por año. En ambos solo cuenta la conducción relacionada con el trabajo, nunca el trayecto normal de tu casa a un lugar de trabajo fijo.',
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
    note: 'A partir de unos 5.000 km laborales al año, el logbook suele dar la deducción más grande, porque incluye combustible, seguro, registro, mantenimiento, depreciación y los intereses de un préstamo del vehículo.',
  },
  {
    kind: 'traps',
    h2: '¿Qué errores se repiten en cualquier trabajo?',
    intro: 'La primera lista convierte una devolución en una liquidación corregida. La segunda, el dinero que nadie reclama, es más común y cuesta más.',
    wrong: [
      {
        t: 'Ropa normal que exige un código de vestimenta',
        d: 'Pantalón negro, polo liso, botas comunes, jeans. La ropa convencional no pasa a ser uniforme porque un jefe lo exija.',
      },
      {
        t: 'La primera licencia, el primer ticket, el primer certificado',
        d: 'La primera White Card, el primer RSA, el primer ticket de forklift. Ese gasto te habilitó para el trabajo, que no es lo mismo que un gasto de hacerlo. Las renovaciones, una vez que trabajas, sí son deducibles.',
      },
      {
        t: 'El trayecto de tu casa al trabajo',
        d: 'El trayecto normal es privado, por lejos que sea y por temprano que empieces. El viaje entre dos lugares de trabajo en el mismo día suele ser deducible.',
      },
      {
        t: 'Todo lo que te devolvieron',
        d: 'Si un empleador, una agencia o una plataforma te reembolsó el dinero o te dio el artículo, no te quedó ningún gasto que deducir.',
      },
      {
        t: 'Multas',
        d: 'Las multas de estacionamiento y de velocidad nunca son deducibles, sin importar qué estuvieras haciendo.',
      },
    ],
    missed: [
      {
        t: 'Cada artículo de menos de 300 AUD, deducido completo',
        d: 'Botas, guantes, gorro, linterna frontal, soporte de teléfono. Cada artículo se evalúa por separado, así que un año de compras pequeñas suma. La mayoría tira los recibos.',
      },
      {
        t: 'Artículos de más de 300 AUD, que igual se deducen',
        d: 'Pasar de 300 AUD no elimina la deducción, solo cambia el momento: el gasto se reparte durante la vida útil del artículo. Mucha gente oye «más de 300» y lo deja ahí.',
      },
      {
        t: 'Lavar el uniforme obligatorio o la ropa de protección',
        d: 'La ATO permite 1 AUD por lavado si lavas solo ropa de trabajo, o 50 céntimos por lavado si va mezclada con otra ropa. Si superas 150 AUD de lavado en el año, necesitas un registro sencillo en lugar de una estimación.',
      },
      {
        t: 'Traslados entre dos trabajos el mismo día',
        d: 'Dos granjas, dos casas, dos almacenes, dos locales. Ese tramo es viaje de trabajo, no el trayecto habitual, y para quien trabaja en varios lugares suele ser la deducción más grande de la declaración.',
      },
      {
        t: 'Semanas con retención del 45 % antes de que llegara el TFN',
        d: 'No es una deducción, pero es el mismo dinero. Si un empleador retuvo la tasa máxima mientras tu Tax File Number Declaration estaba olvidada en un cajón, eso puede volver con la declaración. No vuelve solo.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: '¿Dónde depende de tu propia situación?',
    paras: [
      'Si tus traslados cuentan como trabajo itinerante y no como trayecto habitual depende de cómo fue tu semana: cuántas veces cambió el lugar de trabajo, si había una base fija y si tu empleador exigía ese movimiento.',
      'Tu residencia fiscal es la segunda pregunta, y suele pesar más que todas las deducciones de esta página juntas. Es una evaluación que varía de una persona a otra, y el caso Addy del High Court es solo un antecedente. Solo tomamos postura después de revisar tu año.',
    ],
  },
]

const FAQS = [
  {
    question: '¿Puedo declarar las deducciones por mi cuenta?',
    answer:
      'Puedes, y presentar la declaración es la parte fácil. La casilla de deducciones está vacía y acepta cualquier cifra que escribas.\n\nQué gastos vienen de ganar tus ingresos y qué respalda cada uno es una evaluación sobre tu año, no un campo que rellenar.',
  },
  {
    question: '¿Los working holiday makers tienen menos deducciones que los australianos?',
    answer:
      'No. Las reglas de deducción son las mismas para quien tiene una visa 462 o 417 que para cualquiera que gane ingresos en Australia.\n\nLa diferencia está en los ingresos: cómo tributan depende de tu situación individual en ese año, y lo decide la ATO.',
  },
  {
    question: 'Tuve cuatro trabajos distintos en un año. ¿Son cuatro listas?',
    answer:
      'Presentas una sola declaración por el año fiscal y ahí entra cada deducción de cada trabajo. Lo que importa es que cada gasto esté ligado a un trabajo que hacías en ese momento.\n\nLas botas que compraste para un almacén en septiembre y el protector solar de una granja en enero van en la misma declaración. Tener empleadores distintos no divide nada.',
  },
  {
    question: '¿Y si perdí los recibos?',
    answer:
      'Un extracto bancario o de tarjeta con el importe, la fecha y el proveedor suele aceptarse cuando el recibo ya no existe.\n\nSi todos tus gastos laborales del año suman 300 AUD o menos, no hace falta comprobante escrito, solo una base razonable para la cifra. Lo que no se puede es inventar un número y esperar que pase.',
  },
  {
    question: '¿Puedo deducir el alquiler, la comida o los viajes mientras estuve en Australia?',
    answer:
      'No. El alojamiento, el supermercado y lo que gastas en moverte son gastos de vida privada, aunque te hayas mudado a un pueblo del interior por un trabajo.\n\nLa excepción es estrecha: los viajes que exige tu empleador y te mantienen fuera de casa por la noche. Esos siguen otra regla y piden otros comprobantes.',
  },
  {
    question: '¿Vale la pena si solo trabajé unos meses?',
    answer:
      'Normalmente sí. Una temporada corta también tiene gastos reales, y cada dólar de deducción reduce los ingresos sobre los que se calcula el impuesto.\n\nEn un año corto, lo más importante muchas veces no son las deducciones, sino las semanas con retención del 45 % antes de que tu Tax File Number llegara al empleador, y cómo se valoró tu residencia fiscal.',
  },
]

const GUIDES = [
  {
    href: guideHref('tax-deductions-working-holiday-makers'),
    label: guideText('tax-deductions-working-holiday-makers', 'Deducciones para working holiday makers: la lista completa'),
    desc: 'Todas las categorías, y lo que la ATO rechaza.',
  },
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
        path: '/es/expenses',
        articleHeadline: 'Qué puedes deducir en Australia, según tu trabajo',
        articleDescription: 'Quien recoge fruta y quien reparte comida no deducen lo mismo. Busca tu trabajo y mira qué aplica de verdad.',
        inLanguage: 'es',
        WA,
        UI,
        crumbs: CRUMBS,
        hero: HERO,
        sections: SECTIONS,
        faqs: FAQS,
        guides: GUIDES,
        services: SERVICES,
        mygov: { ui: MYGOV_UI, rows: MYGOV },
        hubLink: false,
        heroSlot: {
          id: 'IMG-W30',
          subject: 'Seven working holiday jobs in one frame: fruit picking, kitchen, building site, delivery bike, cleaning, warehouse, camp',
          alt: 'Mochileros trabajando en Australia con una visa working holiday',
        },
      }}
    />
  )
}
