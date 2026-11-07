import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { UI_BASE, HOME_CRUMB, HUB_CRUMB, esMetadata } from '../_shared'
import { guideHref, guideText } from '../../_blog-links'

export const metadata = esMetadata({
  route: '/expenses/delivery-drivers',
  title: 'Deducciones de delivery en Australia: vehículo y GST',
  description:
    'Qué pueden deducir repartidores de Uber Eats, DoorDash, Menulog y Amazon Flex: gastos del vehículo o la bici, teléfono y equipo.',
  keywords: [
    'deducciones delivery Australia',
    'Uber Eats tax return',
    'DoorDash impuestos Australia',
    'repartidor deducciones ATO',
    'cents per kilometre o logbook',
    'ABN repartidor working holiday',
    'GST rideshare Australia',
    'deducir bici delivery Australia',
  ],
  ogTitle: 'Deducciones de delivery en Australia: vehículo y teléfono',
  ogDescription: 'Tus kilómetros y la parte laboral del teléfono son lo principal. Las multas y el tramo privado nunca se dedujeron.',
})

const WA = waUrl({ topic: 'expenses', lang: 'es', detail: 'Delivery y rideshare' })

const UI = {
  ...UI_BASE,
  guaranteeBody:
    'Los repartidores de plataformas con visas 462 y 417 son una parte grande de lo que hacemos, y por eso la pregunta del logbook y el límite del GST se resuelven antes de redactar la declaración. Revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO.',
}

const CRUMBS = [HOME_CRUMB, HUB_CRUMB, { name: 'Delivery y reparto', item: '/es/expenses/delivery-drivers' }]

const HERO = {
  kicker: 'Uber Eats, DoorDash, Menulog, Amazon Flex',
  h1lead: 'Tus kilómetros son la deducción.',
  h1accent: 'Casi todo lo demás es pequeño.',
  lede: 'Cents per kilometre o logbook, uno por vehículo y por año. Elegir el equivocado es el error más caro del oficio.',
}

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: '¿Qué puede deducir un repartidor?',
    paras: [
      'Un repartidor puede deducir la parte laboral de los gastos de su vehículo, bici o scooter, la parte laboral del teléfono y del plan de datos, el estacionamiento pagado mientras trabaja, la limpieza para mantener el vehículo en condiciones de transportar comida, y el equipo comprado para el trabajo, como una mochila térmica, un soporte de teléfono, un casco o ropa de alta visibilidad. La parte privada de todo queda excluida.',
      'Casi todo el valor está en el vehículo. Quien reparte con horarios constantes acumula kilómetros que ningún otro trabajo de mochilero produce, y en un año la diferencia entre los dos métodos puede pesar mucho.',
    ],
  },
  {
    kind: 'items',
    h2: 'Los gastos propios de este trabajo',
    intro: 'Todo aquí se prorratea. Deduces la parte laboral, y necesitas una base razonable para la cifra que usaste.',
    items: [
      {
        t: 'Gastos del vehículo',
        d: 'Se deducen con el método de cents per kilometre o con un logbook, que comparamos más abajo. El logbook trabaja con tus gastos reales y un porcentaje de uso laboral; el cents per kilometre, con una tarifa fija.',
      },
      {
        t: 'Gastos de bici, e-bike y scooter',
        d: 'Los gastos de uso, reparación y mantenimiento son deducibles en la parte laboral, junto con casco, ropa de alta visibilidad y luces. Las bicis y los scooters no son vehículos para efectos fiscales, así que el método de cents per kilometre no aplica y deduces los gastos reales prorrateados.',
      },
      {
        t: 'La parte laboral del teléfono y de los datos',
        d: 'Todo el trabajo pasa por una app, así que el porcentaje laboral de tu plan es una deducción real. Calcula ese porcentaje con honestidad sobre un período representativo.',
      },
      {
        t: 'Parking pagado mientras trabajas',
        d: 'Los cinco dólares en un centro comercial mientras preparan un pedido son deducibles. Las multas nunca lo son.',
      },
      {
        t: 'Equipo comprado para el trabajo',
        d: 'Una mochila térmica de reparto, un soporte de teléfono, un cargador, un candado para la bici, ropa para la lluvia, una linterna frontal. Cada artículo de 300 AUD o menos se deduce completo en el año de compra.',
      },
      {
        t: 'Limpiar el vehículo para el trabajo',
        d: 'Mantener un vehículo en condiciones de transportar comida, o una bici en buen estado, es deducible en la parte laboral.',
      },
    ],
  },
  {
    kind: 'tables',
    h2: '¿Cómo se calculan los gastos del vehículo?',
    intro: 'En ambos métodos solo cuenta la conducción de trabajo, y para un repartidor con turno fijo el trayecto de casa al local nunca cuenta.',
    tables: [
      {
        label: 'Cents per kilometre',
        rows: [
          ['Tarifa 2024-25 y 2025-26', '0,88 AUD por km'],
          ['Tarifa desde 2026-27', '0,91 AUD por km'],
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
    note: 'Quien reparte con constancia pasa los 5.000 kilómetros en unos pocos meses, y a partir de ahí el logbook normalmente da la deducción más grande: combustible, seguro, registro, mantenimiento, depreciación e intereses del préstamo, según tu porcentaje laboral.',
  },
  {
    kind: 'answer',
    h2: '¿Qué tiene que poder mostrar un repartidor?',
    paras: [
      'Cada gasto se apoya en tres cosas: lo pagaste, nadie te lo devolvió y el dinero se gastó para ganar los ingresos que declaras. Para un repartidor eso es un logbook o un registro de kilómetros, la factura del teléfono detrás de tu porcentaje laboral y los recibos de la mochila, el soporte y el equipo.',
      'Valen un recibo, una factura, un extracto bancario o una foto en el teléfono que muestre el importe, la fecha, el proveedor y el artículo, guardados cinco años. Si tus gastos laborales de todo el año suman 300 AUD o menos, no hace falta comprobante escrito. Esos 300 AUD son distintos de los que deciden si un artículo se deduce de una vez o durante su vida útil.',
    ],
  },
  {
    kind: 'note',
    label: 'Lo que más sorprende',
    title: 'Repartir comida y llevar pasajeros no es lo mismo para el GST.',
    body: 'Si solo repartes comida y paquetes, registrarte para el GST es obligatorio cuando tus ingresos pasan de 75.000 AUD al año, algo a lo que la mayoría de los repartidores nunca se acerca. En cuanto llevas a un pasajero que paga, ese umbral desaparece.\n\nEl ride sourcing exige registro de GST desde el primer viaje, ganes lo que ganes, y business activity statements con él. Quien reparte con Uber Eats entre semana y hace viajes con pasajeros un viernes por la noche ya cruzó esa línea.',
  },
  {
    kind: 'traps',
    h2: '¿Qué errores cometen los repartidores?',
    intro: 'Los gastos inflados aquí son mayores que en cualquier otra ocupación, porque las cifras también lo son. Los olvidados, igual.',
    wrong: [
      {
        t: 'La factura completa del teléfono',
        d: 'Deducir el cien por ciento de un plan que también usas para todo lo demás no se puede defender, y la ATO puede contrastarlo con el resto de la declaración.',
      },
      {
        t: 'Multas',
        d: 'Una multa de estacionamiento mientras subías un pedido sigue sin ser deducible. Tampoco una multa por velocidad, por justa que fuera la ventana de entrega.',
      },
      {
        t: 'Comida comprada mientras trabajas',
        d: 'Tu propia cena entre entregas es privada.',
      },
      {
        t: 'Cada kilómetro conducido con la app abierta',
        d: 'El tramo privado de un viaje no se vuelve viaje de trabajo porque la app estuviera funcionando. Una parada personal de camino a una entrega sale de la deducción, y para un repartidor empleado el trayecto hasta el local también sale.',
      },
      {
        t: 'Dejar fuera los ingresos pequeños de plataformas',
        d: 'Uber, DoorDash y las demás informan los ingresos de los conductores a la ATO bajo el régimen de informes de la economía colaborativa. Tus ingresos ya son visibles, así que unos cientos de dólares de fin de semana omitidos son una discrepancia, no un ahorro.',
      },
    ],
    missed: [
      {
        t: 'El logbook, cuando el logbook era claramente mejor',
        d: 'El método de cents per kilometre se detiene en 5.000 kilómetros. Quien reparte con constancia los supera con facilidad, y todo lo que pasa de ahí se pierde. Doce semanas de logbook, llevadas una vez, valen cinco años.',
      },
      {
        t: 'Intereses, seguro, registro y depreciación',
        d: 'Solo están disponibles con el método de logbook, y normalmente son la razón por la que gana. La gente elige cents per kilometre porque es más fácil y nunca descubre cuánto habría dado la alternativa.',
      },
      {
        t: 'La mochila térmica y el soporte de teléfono',
        d: 'Pequeños, obvios, totalmente deducibles, y se tiran junto con el recibo. Lo mismo vale para un casco, luces y ropa para la lluvia.',
      },
      {
        t: 'Gastos anteriores a la primera entrega',
        d: 'El equipo comprado mientras te preparabas, en torno al momento en que registraste el ABN y te inscribiste en la plataforma, generalmente es deducible. El intervalo entre la compra y el inicio importa, así que guarda las fechas.',
      },
      {
        t: 'Deducir contra ingresos que llegan completos',
        d: 'No se retiene impuesto de los pagos de las plataformas, así que el dinero llega completo y la gente se prepara para una deuda. Las deducciones contra esos ingresos son lo que la reduce, y es lo que más se deja fuera.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: '¿Qué depende de cómo trabajas, no de las reglas?',
    paras: [
      'Uber Eats, DoorDash, Menulog y Amazon Flex contratan a los repartidores como contratistas: un ABN, nada retenido, sin super. Un turno fijo en una pizzería que te entrega un payslip es empleo bajo un TFN. Un local que fija tus turnos, supervisa tu trabajo y pone la bici, y luego te pide registrar un ABN, puede ser un empleador disfrazado.',
      'De ahí depende dónde empieza la conducción deducible. El viaje de un empleado hasta el local es privado, y solo cuenta del local a la entrega. Con un ABN, conducir es el trabajo.',
      'La residencia fiscal influye en cómo tributa la ganancia. Una sentencia conocida como Addy puede influir en las tasas que se aplican, y su efecto varía de una persona a otra. No es algo que se pueda dar por supuesto: depende de los hechos de tu año y forma parte de nuestra revisión.',
    ],
  },
]

const FAQS = [
  {
    question: '¿Necesito un ABN para repartir con Uber Eats o DoorDash?',
    answer:
      'Sí. Esas plataformas contratan a repartidores y conductores como contratistas y no como empleados, así que hace falta un ABN antes de que te paguen.\n\nNo reemplaza al TFN. No se retiene nada de tus pagos, así que el ingreso llega completo y el impuesto se liquida al presentar la declaración.',
  },
  {
    question: '¿Qué método de gastos del vehículo debo usar?',
    answer:
      'Depende de cuánto conduzcas y de lo que cueste mantener el vehículo. Cents per kilometre no pide recibos pero tiene un tope de 5.000 km laborales por año, y todo lo que pase se pierde.\n\nEl logbook no tiene tope e incluye los gastos reales según tu porcentaje de uso laboral, a cambio de doce semanas seguidas de registros y un recibo por cada gasto.',
  },
  {
    question: '¿Puedo deducir mi factura del teléfono?',
    answer:
      'Puedes deducir el porcentaje laboral de tu plan de teléfono y datos: la parte usada para la app de reparto, la navegación y los mensajes del trabajo.\n\nNo puedes deducir la factura completa si también usas el teléfono para la vida diaria, así que necesitas una base razonable para el porcentaje y algo que la respalde.',
  },
  {
    question: '¿Tengo que registrarme para el GST?',
    answer:
      'Solo para reparto de comida y paquetes, el registro de GST es obligatorio cuando los ingresos pasan de 75.000 AUD al año, y la mayoría de los repartidores a tiempo parcial nunca se acerca.\n\nLlevar pasajeros que pagan es distinto: eso exige registrarse para el GST desde el primer dólar, sean cuales sean los ingresos.',
  },
  {
    question: 'Reparto en bici, no en vehículo. ¿Puedo deducir algo?',
    answer:
      'Sí. Una bicicleta o un scooter eléctrico no es un vehículo para efectos fiscales, así que el método de cents per kilometre no aplica, pero puedes deducir la parte laboral de los gastos de uso, reparación y mantenimiento, además de casco, luces y ropa de alta visibilidad.\n\nProrratea entre el reparto y el uso personal con un criterio razonable.',
  },
]

const GUIDES = [
  {
    href: guideHref('uber-doordash-rideshare-abn-working-holiday'),
    label: guideText('uber-doordash-rideshare-abn-working-holiday', 'Uber, DoorDash y tu ABN'),
    desc: 'Por qué las plataformas lo piden y qué cambia en cuanto lo tienes.',
  },
  {
    href: guideHref('bicycle-motorcycle-vehicle-deductions-working-holiday'),
    label: guideText('bicycle-motorcycle-vehicle-deductions-working-holiday', 'Deducciones de bici, scooter y vehículo'),
    desc: 'Cómo se trata cada vehículo y qué método le va a cada uno.',
  },
  {
    href: guideHref('uber-eats-delivery-rider-working-holiday-australia'),
    label: guideText('uber-eats-delivery-rider-working-holiday-australia', 'Repartir con una working holiday'),
    desc: 'Cuánto paga realmente el trabajo una vez que salen los gastos.',
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
        path: '/es/expenses/delivery-drivers',
        articleHeadline: 'Deducciones de delivery en Australia: vehículo y teléfono',
        articleDescription: 'Tus kilómetros y la parte laboral del teléfono son lo principal. Las multas y el tramo privado nunca se dedujeron.',
        inLanguage: 'es',
        photoKey: 'expenses/delivery-drivers',
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
