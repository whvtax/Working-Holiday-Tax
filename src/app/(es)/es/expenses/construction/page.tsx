import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { UI_BASE, HOME_CRUMB, HUB_CRUMB, esMetadata } from '../_shared'
import { guideHref, guideText } from '../../_blog-links'

export const metadata = esMetadata({
  route: '/expenses/construction',
  title: 'Deducciones en construcción en Australia: herramientas',
  description:
    'Qué pueden deducir quienes trabajan en construcción con visa working holiday: herramientas, equipo de protección, White Card y protección solar.',
  keywords: [
    'deducciones construcción Australia',
    'construction tax return working holiday',
    'herramientas deducibles Australia',
    'White Card deducible',
    'impuestos obra Australia mochilero',
    'deducción herramientas 300 dólares Australia',
    'ute deducción impuestos Australia',
    'visa 462 construcción impuestos',
  ],
  ogTitle: 'Deducciones en construcción: herramientas y equipo',
  ogDescription: 'Tus herramientas, tu equipo de protección y la renovación de la White Card se deducen. La primera White Card y tus jeans rotos no.',
})

const WA = waUrl({ topic: 'expenses', lang: 'es', detail: 'Construcción y trabajo en obra' })

const UI = {
  ...UI_BASE,
  guaranteeBody:
    'Las declaraciones de obra, la renovación de tickets y la discusión sobre la ute son trabajo de cada semana aquí, y todos nuestros clientes tienen una visa 462 o 417. Revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO.',
}

const CRUMBS = [HOME_CRUMB, HUB_CRUMB, { name: 'Construcción', item: '/es/expenses/construction' }]

const HERO = {
  kicker: 'Obras, labouring y oficios',
  h1lead: 'Tus herramientas se deducen.',
  h1accent: 'Tu primera White Card no.',
  lede: 'El trabajo en obra tiene la lista de deducciones más larga de todos los trabajos de mochilero. La ute (pick-up) normalmente no está en ella.',
}

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: '¿Qué puede deducir quien trabaja en construcción?',
    paras: [
      'Un trabajador de la construcción puede deducir las herramientas y el equipo que compró de su bolsillo, la ropa y el equipo de protección, la protección solar para trabajar al aire libre, la renovación de una White Card o de un ticket (licencia) de operación que ya tiene, la parte laboral del plan del teléfono y la formación relacionada con el oficio en el que ya trabaja. Lo que el empleador entregó o reembolsó queda fuera.',
      'La lista es larga porque el trabajo genera gastos concretos. Las botas con puntera de acero te protegen de un ladrillo que cae, y el protector solar de seis horas sobre una losa sin sombra. Esa es la conexión que busca la prueba de deducción.',
    ],
  },
  {
    kind: 'items',
    h2: 'Los gastos propios de este trabajo',
    intro: 'Los límites en dólares de abajo tratan del momento de la deducción, no de si tienes derecho. Pasar de 300 AUD no elimina una deducción, la reparte.',
    items: [
      {
        t: 'Herramientas y equipo de menos de 300 AUD cada uno',
        d: 'Un taladro, una amoladora, una clavadora, un nivel, un cinturón de herramientas. Cada artículo de 300 AUD o menos se deduce completo en el año en que lo compras. La prueba es por artículo, así que un año de compras pequeñas arma un gasto real con recibos que la mayoría tira.',
      },
      {
        t: 'Herramientas y equipo de 300 AUD o más',
        d: 'Siguen siendo deducibles, repartidos en la vida útil del artículo en vez de deducirlos de una vez. Una hormigonera o una sierra ingletadora entran aquí. La trampa es comprar varias herramientas juntas como set por 300 AUD o más, porque el set es un solo bien aunque cada pieza por separado hubiera quedado bajo el límite.',
      },
      {
        t: 'Equipo de protección y ropa de protección',
        d: 'Camisas y chalecos de alta visibilidad, botas con puntera de acero, gafas de seguridad, casco, protectores auditivos, guantes de trabajo, mascarilla antipolvo. La prueba de la ATO no es si el artículo es útil en la obra, sino si te protege de un riesgo concreto de lesión.',
      },
      {
        t: 'Protección solar para el trabajo al aire libre',
        d: 'El protector solar, el sombrero de ala ancha y las gafas de sol son deducibles cuando el trabajo en obra es al aire libre. Sobre una losa en verano es un gasto recurrente del que casi nadie guarda recibo.',
      },
      {
        t: 'Renovar una White Card o un ticket de operación',
        d: 'Renovar una tarjeta o un ticket que ya tienes es deducible. Tu primera White Card no, porque ese gasto te habilitó para trabajar en construcción. La misma división vale para un primer ticket de forklift, de EWP o un permiso de vehículo pesado.',
      },
      {
        t: 'La parte laboral del teléfono y del internet',
        d: 'Si usas tu teléfono para llamar a un supervisor, mirar planos o recibir mensajes de turnos, el porcentaje laboral del plan es deducible. Deducir la factura completa de un teléfono que también usas para vivir no se sostiene.',
      },
      {
        t: 'Formación ligada al oficio en el que ya trabajas',
        d: 'Un curso que mejora una habilidad o un ticket que usas ahora es deducible. Uno orientado a otra ocupación no, aunque tenga que ver con la construcción, porque crea una calificación nueva en vez de mantener la que te da los ingresos.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: '¿Qué tiene que haber detrás de un gasto de herramientas?',
    paras: [
      'Cada gasto tiene que pasar tres pruebas. Lo pagaste tú, nadie te lo reembolsó y se hizo para ganar los ingresos que declaras. En una obra eso es el recibo del taladro, de las botas y de la renovación del ticket.',
      'El comprobante puede ser un recibo, una factura, un extracto bancario o una foto en el teléfono con el importe, la fecha, el proveedor y el artículo, guardado cinco años. Si todos tus gastos laborales del año suman 300 AUD o menos, no hace falta comprobante escrito. Esos 300 AUD son distintos de los que deciden si una sierra se deduce de una vez o durante su vida útil.',
    ],
  },
  {
    kind: 'numbered',
    h2: '¿Cuándo cuenta el viaje a la obra?',
    intro: 'De tu casa a un lugar de trabajo habitual es un viaje privado, y una obra es un lugar de trabajo. Existe una excepción estrecha, para herramientas voluminosas, y las tres condiciones tienen que cumplirse.',
    steps: [
      'Las herramientas son esenciales para el trabajo que haces ese día.',
      'Son realmente voluminosas: su tamaño o peso es la razón por la que se necesita un vehículo, no la comodidad.',
      'No hay un lugar seguro donde dejarlas en la obra, así que tienen que volver a casa contigo.',
    ],
    note: 'Si la obra tiene un cobertizo, un contenedor o una jaula con llave, o lo que llevas cabría en una mochila normal, el viaje sigue siendo un trayecto habitual. Si cumples las condiciones, las ute y furgonetas con capacidad de carga de una tonelada o más no pueden usar el método de cents per kilometre, así que el logbook es la única vía para la mayoría de quienes conducen una.',
  },
  {
    kind: 'traps',
    h2: '¿Qué errores cometen en construcción?',
    intro: 'Los gastos que se declaran mal en una declaración de obra suelen ser la ropa y la ute. Los olvidados son recibos que nadie guardó de cosas claramente deducibles.',
    wrong: [
      {
        t: 'Ropa normal que se arruina en la obra',
        d: 'Jeans, una camiseta, una franela, una sudadera. El desgaste normal de la ropa convencional es un gasto privado. El artículo tiene que protegerte y no solo sobrevivir el día.',
      },
      {
        t: 'Tu primera White Card',
        d: 'La tarjeta que pagaste antes de que alguien te contratara es el gasto de habilitarte, y la ATO lo trata como una primera licencia de conducir. Renovarla una vez que ya trabajas sí es deducible.',
      },
      {
        t: 'La ute, como algo automático',
        d: 'Tener una ute y conducirla a la obra no es una deducción. Se tienen que cumplir las tres condiciones de las herramientas voluminosas de arriba, y en la mayoría de las obras no se cumplen, porque hay donde guardar bajo llave.',
      },
      {
        t: 'Herramientas que entregó o pagó el empleador',
        d: 'Si salió del camión, del contenedor de la obra o te lo reembolsaron, no te queda ningún gasto que deducir.',
      },
      {
        t: 'Un curso para pasar a otro oficio',
        d: 'El estudio que te llevaría a una ocupación nueva no es deducible, por clara que sea su relación con la construcción.',
      },
    ],
    missed: [
      {
        t: 'Las herramientas pequeñas, una por una',
        d: 'La gente supone que hay un mínimo que alcanzar antes de que valga la pena deducir herramientas. No lo hay. Doce compras de 40 AUD son 480 AUD de deducción, y cada una se evalúa por separado frente a los 300 AUD.',
      },
      {
        t: 'Todo lo que pasa de 300 AUD, descartado por completo',
        d: 'La gente oye «más de 300» y concluye que la herramienta no se deduce. Sí se deduce, durante la vida útil del artículo. Descartarla pierde toda la deducción en vez de retrasar una parte.',
      },
      {
        t: 'Protector solar y sombrero en una obra al aire libre',
        d: 'Está reconocido para el trabajo al aire libre y casi nunca lo declaran los obreros, que suelen pensar que la protección solar es cosa del campo. Una losa sin sombra en febrero es la misma exposición.',
      },
      {
        t: 'Lavar la ropa de alta visibilidad y el equipo de protección',
        d: 'El lavado de la ropa de protección deducible también se deduce con la tarifa de la ATO: 1 AUD por lavado de solo ropa de trabajo, o 0,50 AUD si va mezclada con el resto. Si pasas de 150 AUD en el año, lleva un registro sencillo.',
      },
      {
        t: 'Renovaciones de tickets pagadas de tu bolsillo',
        d: 'Una renovación de White Card, de ticket de forklift o de EWP es fácil de olvidar para julio, sobre todo si se pagó en efectivo en un curso de sábado.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: '¿Qué partes dependen de tus propios hechos?',
    paras: [
      'Primero, la excepción de las herramientas voluminosas. Lo deciden lo que llevas, lo que la obra ofrece para guardar y si las herramientas eran esenciales ese día. Dos obreros de la misma cuadrilla pueden terminar distinto.',
      'La residencia fiscal es otra cuestión, aparte de las herramientas. Una sentencia conocida como Addy puede influir en las tasas que se aplican, y su efecto varía de una persona a otra. No es algo que se pueda dar por supuesto: depende de los hechos de tu año y forma parte de nuestra revisión.',
    ],
  },
]

const FAQS = [
  {
    question: '¿Puedo deducir mi primera White Card?',
    answer:
      'No. La ATO trata la primera White Card como una primera licencia de conducir, como el gasto de habilitarte para el trabajo y no un gasto de hacerlo.\n\nUna vez que trabajas y la tarjeta se renueva, la renovación sí es deducible. Lo mismo vale para un primer ticket de forklift o un permiso de vehículo pesado.',
  },
  {
    question: '¿Qué herramientas puedo deducir en construcción?',
    answer:
      'Cualquier herramienta o equipo que compraste tú para el trabajo en obra, siempre que tu empleador no lo haya entregado ni te lo haya reembolsado.\n\nLos artículos de 300 AUD o menos se deducen completos en el año de compra; los de más, durante su vida útil. Varias herramientas compradas juntas como set por 300 AUD o más forman un solo bien.',
  },
  {
    question: '¿Puedo deducir mi ute para ir a la obra?',
    answer:
      'Solo en un caso estrecho. Ir de tu casa a un lugar de trabajo habitual es un viaje privado, y una obra es un lugar de trabajo.\n\nEl viaje solo es deducible si las herramientas que llevas son esenciales ese día, realmente voluminosas y no se pueden guardar de forma segura en la obra. Las ute y furgonetas de una tonelada o más quedan fuera del método de cents per kilometre, así que el logbook es la única forma de deducirlas.',
  },
  {
    question: '¿Las botas con puntera de acero y la ropa de alta visibilidad se deducen?',
    answer:
      'Sí. Las botas con puntera de acero, la ropa de alta visibilidad, las gafas de seguridad, los cascos, los protectores auditivos y los guantes de trabajo son deducibles porque te protegen de un riesgo concreto de lesión, que es la prueba que aplica la ATO.\n\nLa protección solar para trabajar al aire libre se deduce con el mismo criterio, y también el lavado del equipo de protección.',
  },
  {
    question: 'Mi ropa se destruye en la obra. ¿Por qué no puedo deducirla?',
    answer:
      'Porque la ATO evalúa el artículo y no lo que le pasó. Unos jeans, una camiseta o una franela son ropa convencional, y su desgaste es privado por rápido que el trabajo la arruine.\n\nPara ser deducible, el artículo tiene que tener una función de protección real o ser un uniforme obligatorio con marca.',
  },
]

const GUIDES = [
  {
    href: guideHref('white-card-australia-working-holiday'),
    label: guideText('white-card-australia-working-holiday', 'La White Card y lo que te cuesta'),
    desc: 'Qué es, qué cuesta y por qué la primera no es una deducción.',
  },
  {
    href: guideHref('tools-equipment-under-300-instant-deduction-whv'),
    label: guideText('tools-equipment-under-300-instant-deduction-whv', 'La deducción inmediata de 300 AUD para herramientas y equipo'),
    desc: 'Por qué cada artículo se evalúa por separado y qué cambia con un set.',
  },
  {
    href: guideHref('construction-laborer-working-holiday-australia'),
    label: guideText('construction-laborer-working-holiday-australia', 'Labouring en construcción con una working holiday'),
    desc: 'Cuánto paga el trabajo y qué espera una obra que lleves.',
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
        path: '/es/expenses/construction',
        articleHeadline: 'Deducciones en construcción: herramientas y equipo',
        articleDescription: 'Tus herramientas, tu equipo de protección y la renovación de la White Card se deducen. La primera White Card y tus jeans rotos no.',
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
