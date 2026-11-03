import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { UI_BASE, HOME_CRUMB, HUB_CRUMB, esMetadata } from '../_shared'
import { guideHref, guideText } from '../../_blog-links'

export const metadata = esMetadata({
  route: '/expenses/hospitality',
  title: 'Deducciones en hostelería en Australia: RSA y uniforme',
  description:
    'Qué pueden deducir camareros, baristas y cocineros: renovación del RSA, zapatos antideslizantes, ropa de chef y lavado del uniforme.',
  keywords: [
    'deducciones hostelería Australia',
    'bartender tax return Australia',
    'camarero impuestos Australia',
    'cocinero deducciones Australia',
    'RSA certificate deducible',
    'puedo deducir zapatos de trabajo Australia',
    'propinas impuestos Australia',
    'working holiday hostelería tax',
  ],
  ogTitle: 'Deducciones en hostelería en Australia: RSA y uniforme',
  ogDescription: 'Los zapatos antideslizantes y la ropa de chef se deducen. La ropa negra que exige tu local no. Qué puedes deducir en hostelería.',
})

const WA = waUrl({ topic: 'expenses', lang: 'es', detail: 'Hostelería, bar y cocina' })

const UI = {
  ...UI_BASE,
  guaranteeBody:
    'Cuatro locales, cuatro income statements y super en cuatro fondos es el año típico en hostelería aquí, y todos nuestros clientes tienen una visa 462 o 417. Revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO.',
}

const CRUMBS = [HOME_CRUMB, HUB_CRUMB, { name: 'Hostelería', item: '/es/expenses/hospitality' }]

const HERO = {
  kicker: 'Bares, cafeterías, restaurantes y cocinas',
  h1lead: 'Tus zapatos antideslizantes se deducen.',
  h1accent: 'La ropa toda negra no.',
  lede: 'La lista es corta, así que lo que más pesa en una declaración de hostelería suele estar del lado de los ingresos: varios locales, varias tasas de retención, super en varios fondos.',
}

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: '¿Qué puede deducir quien trabaja en un bar, una cafetería o una cocina?',
    paras: [
      'El personal de hostelería puede deducir el calzado de protección antideslizante, la ropa propia de la profesión como la chaqueta de chef y el pantalón de cuadros de cocina, el lavado de un uniforme obligatorio con logo del empleador, la renovación de un RSA o de un certificado de Food Safety Supervisor, y las herramientas de cocina que compró de su bolsillo. Todo lo demás del armario es ropa común.',
      'La hostelería da pocos gastos exclusivos del trabajo. Estás bajo techo, tu empleador pone el equipo, y la ropa que pide un local suele ser ropa que cualquiera podría usar en cualquier parte.',
    ],
  },
  {
    kind: 'items',
    h2: 'Los gastos propios de este trabajo',
    intro: 'La ropa tiene una prueba extra además de las generales, y ahí es donde surgen casi todas las discusiones en hostelería.',
    items: [
      {
        t: 'Calzado cerrado, antideslizante y de protección',
        d: 'Es deducible donde lo necesitas: un piso mojado detrás de una barra, derrames junto a la máquina de café, planchas calientes en el pase de la cocina. Cuenta como calzado de protección y no como zapatos comunes porque cumple una función de seguridad concreta, del color que sea.',
      },
      {
        t: 'Chaqueta de chef y pantalón de cuadros de cocina',
        d: 'Ropa propia de la profesión: te identifica como parte de un oficio concreto y se vería rara en cualquier otro lugar. Es una categoría reconocida, distinta del uniforme con marca, y por eso un cocinero tiene deducción de ropa y un camarero normalmente no.',
      },
      {
        t: 'Lavar un uniforme obligatorio con logo',
        d: 'Si tu empleador exige un uniforme con su logo o un diseño realmente distintivo, lavarlo es deducible a 1 AUD por lavado de solo ropa de trabajo, o 50 céntimos por lavado si va mezclada con el resto. Si superas 150 AUD de lavado en el año, necesitas un registro sencillo en lugar de una estimación.',
      },
      {
        t: 'Renovar un RSA o un certificado de Food Safety Supervisor',
        d: 'Renovar un certificado que ya tienes, mientras trabajas en el puesto que lo exige, es deducible. El primero no, con la misma distinción que aplica la ATO a una primera licencia de conducir.',
      },
      {
        t: 'Cuchillos y herramientas de cocina que compraste tú',
        d: 'Un estuche de cuchillos, tus propios cuchillos de chef, un termómetro, una mandolina. Cada artículo de 300 AUD o menos se deduce completo en el año de compra. Un set comprado junto por 300 AUD o más es un solo bien, que se deduce durante su vida útil, aunque cada pieza por separado habría costado menos de 300 AUD.',
      },
      {
        t: 'Delantales, guantes y equipo de protección que pagaste',
        d: 'Guantes resistentes al calor, guantes anticorte, un delantal de protección. Son deducibles cuando te protegen de un peligro del trabajo y tu empleador no te los dio ni te los reembolsó.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: '¿Qué tiene que haber detrás de un gasto de hostelería?',
    paras: [
      'Las mismas tres pruebas de siempre: el dinero era tuyo, nadie te lo devolvió y se gastó para ganar los ingresos que declaras. En un local eso es el recibo de los zapatos y del estuche de cuchillos, la política de uniforme por escrito y un registro de lavados cuando las cargas ya suman.',
      'Sirve cualquier comprobante con importe, fecha, proveedor y artículo, y tiene que durar cinco años. Si tus gastos del año suman 300 AUD o menos, no hace falta comprobante escrito. Esos 300 AUD son distintos de los que deciden si un set de cuchillos se deduce de una vez o durante su vida útil.',
    ],
  },
  {
    kind: 'traps',
    h2: '¿Qué errores cometen en hostelería?',
    intro: 'La regla de la ropa sorprende a todo el mundo, porque parece injusta. Los gastos olvidados son más discretos y suelen tener que ver con el pago.',
    wrong: [
      {
        t: 'La ropa toda negra que exige el local',
        d: 'Pantalón negro liso, camisa negra lisa, zapatos negros sin logo. La ATO mira qué es el artículo, y la ropa convencional es privada diga lo que diga el código de vestimenta.',
      },
      {
        t: 'Tu primer RSA',
        d: 'El certificado que pagaste antes de tener el trabajo te habilitó para que te contrataran, y eso es un gasto privado. Cuando ya trabajas y toca renovarlo, la renovación sí es deducible.',
      },
      {
        t: 'Peluquería, aseo personal y maquillaje para un estándar de atención al público',
        d: 'El aseo personal sigue siendo privado aunque el local tenga un estándar escrito.',
      },
      {
        t: 'Una comida durante el turno o una bebida después del cierre',
        d: 'Las comidas del personal y las bebidas al terminar son privadas, las hayas pagado, con descuento o regaladas.',
      },
      {
        t: 'Propinas en efectivo que no se declaran',
        d: 'Este va al revés. Las propinas que te dan directamente son ingreso gravable aunque nadie las registre. Las propinas compartidas y los cargos por servicio que pasan por payroll ya están en tu income statement, pero el efectivo lo declaras tú.',
      },
    ],
    missed: [
      {
        t: 'Lavar un uniforme con logo, todo el año',
        d: 'Unos pocos dólares a la semana que casi nadie declara, porque lavar una camisa no parece un tema de impuestos. La ATO publica la tarifa, así que no hay que estimar nada.',
      },
      {
        t: 'Los zapatos antideslizantes, porque «la ropa no se puede deducir»',
        d: 'Mucha gente lee que la ropa de hostelería no es deducible, con razón, y lo aplica al calzado de protección, sin razón. Los zapatos de protección son otra categoría y sí se deducen.',
      },
      {
        t: 'Un segundo o tercer empleador que retiene con la tasa equivocada',
        d: 'Si un local nunca recibió tu Tax File Number Declaration, o no está registrado correctamente ante la ATO, puede retener mucho más de lo debido. Eso se revisa en una declaración que reúna a todos los empleadores, y el resultado depende de tu año.',
      },
      {
        t: 'Super repartida en tres fondos distintos',
        d: 'Cada local paga un 12 % de super encima de tu sueldo desde el primer dólar, sin ingreso mensual mínimo. Cuatro trabajos casuales pueden dejar cuatro cuentas, cada una cobrando comisiones, y la mayoría solo encuentra una.',
      },
      {
        t: 'Un local que te cobró el uniforme de forma ilegal',
        d: 'No es una deducción. Los descuentos del sueldo por uniformes, lavado, roturas o faltantes de caja casi siempre son ilegales según la Fair Work Act, así que es dinero que se puede reclamar y no un gasto de impuestos.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: '¿Qué hay que evaluar en vez de buscar en una tabla?',
    paras: [
      'Primero, la ropa. Si un artículo es un uniforme obligatorio depende de lo distintivo que sea y de si el empleador lo exige. Si el calzado es de protección depende del peligro de tu local. Una política de uniforme por escrito y una foto suelen resolverlo.',
      'En el lado de los ingresos es donde una mirada profesional aporta más. Qué tasa corresponde en tu caso depende de los hechos de tu año, y un local que retiene con una tasa equivocada puede dejar una diferencia pendiente. Una sentencia conocida como Addy también puede influir, con un efecto que varía de una persona a otra y que forma parte de nuestra revisión.',
    ],
  },
]

const FAQS = [
  {
    question: '¿Puedo deducir mis zapatos y pantalones negros de trabajo?',
    answer:
      'La ropa negra lisa sin logo no es deducible, ni siquiera cuando el código de vestimenta la exige, porque la ATO la trata como ropa común y no como uniforme.\n\nLos zapatos cerrados antideslizantes son distintos. Si los necesitas por un piso mojado en la barra o por un pase de cocina con mucho movimiento, son calzado de protección y deducibles, del color que sean.',
  },
  {
    question: '¿Puedo deducir mi certificado RSA?',
    answer:
      'Puedes deducir la renovación de un RSA que ya tienes mientras trabajas en un puesto que lo exige. El primero no, porque la ATO trata el gasto de calificarte como privado, igual que una primera licencia de conducir.\n\nUn certificado de Food Safety Supervisor sigue la misma regla.',
  },
  {
    question: '¿Las propinas pagan impuestos?',
    answer:
      'Sí, todas. Las propinas y los cargos por servicio que se pagan por payroll, incluidos los pools o acuerdos tipo tronc, forman parte de tu sueldo, ya tributaron y aparecen en tu income statement.\n\nEl efectivo que te dan directamente tributa igual, pero nadie lo registra, así que lleva una nota y declara el total.',
  },
  {
    question: 'Trabajo en tres locales. ¿Cambia eso mis impuestos?',
    answer:
      'Cada local es un empleador distinto, con su propia Tax File Number Declaration, su retención y su income statement, y todos van en la misma declaración.\n\nCómo se aplica el mínimo exento a tu año depende de tu situación y lo decide la ATO, así que un local que retiene con una tasa equivocada puede dejar una diferencia pendiente.',
  },
  {
    question: '¿Recibo super en un trabajo casual de hostelería?',
    answer:
      'Sí. Tu empleador paga un 12 % de super encima de tu sueldo en el trabajo casual desde el primer dólar, sin umbral mensual mínimo de ingresos.\n\nCada local paga por separado, así que varios trabajos suelen significar más de un fondo, algo que conviene rastrear antes de irte de Australia.',
  },
]

const GUIDES = [
  {
    href: guideHref('hospitality-award-working-holiday-makers'),
    label: guideText('hospitality-award-working-holiday-makers', 'El Hospitality Award y lo que deberían pagarte'),
    desc: 'Recargo casual, penalty rates y dónde los locales se equivocan.',
  },
  {
    href: guideHref('uniform-laundry-deductions-illegal-australia'),
    label: guideText('uniform-laundry-deductions-illegal-australia', 'Uniforme y lavado descontados de tu sueldo'),
    desc: 'Cuándo un descuento del sueldo es ilegal y cómo recuperarlo.',
  },
  {
    href: guideHref('tax-deductions-working-holiday-makers'),
    label: guideText('tax-deductions-working-holiday-makers', 'Deducciones para working holiday makers: la lista completa'),
    desc: 'Todas las categorías, y lo que la ATO rechaza.',
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
        path: '/es/expenses/hospitality',
        articleHeadline: 'Deducciones en hostelería en Australia: RSA y uniforme',
        articleDescription: 'Los zapatos antideslizantes y la ropa de chef se deducen. La ropa negra que exige tu local no. Qué puedes deducir en hostelería.',
        inLanguage: 'es',
        photoKey: 'expenses/hospitality',
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
