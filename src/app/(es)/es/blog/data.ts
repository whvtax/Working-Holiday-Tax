/**
 * Spanish blog data (ADR 013). One neutral Spanish (tuteo, no vos, no vosotros).
 *
 * Guide bodies live in chunks/01.ts ... chunks/19.ts, one file per batch of
 * guides, each exporting `chunk` keyed by the ENGLISH guide slug. This loader
 * merges them. A guide with no entry in any chunk does not exist in Spanish:
 * it is not listed anywhere and its URL is a 404 (no English fallback).
 * Format rules for writers: scratchpad blog-format.md.
 */
import type { BlogUIStrings } from '@/app/(site)/blog/BlogClient'
import type { Category } from '@/app/(site)/blog/data'
import { createLocaleBlog, mergeChunks } from '@/lib/locale-blog'
import { localePath } from '@/components/blog/newLocaleDefaults'
import { chunk as c01 } from './chunks/01'
import { chunk as c02 } from './chunks/02'
import { chunk as c03 } from './chunks/03'
import { chunk as c04 } from './chunks/04'
import { chunk as c05 } from './chunks/05'
import { chunk as c06 } from './chunks/06'
import { chunk as c07 } from './chunks/07'
import { chunk as c08 } from './chunks/08'
import { chunk as c09 } from './chunks/09'
import { chunk as c10 } from './chunks/10'
import { chunk as c11 } from './chunks/11'
import { chunk as c12 } from './chunks/12'
import { chunk as c13 } from './chunks/13'
import { chunk as c14 } from './chunks/14'
import { chunk as c15 } from './chunks/15'
import { chunk as c16 } from './chunks/16'
import { chunk as c17 } from './chunks/17'
import { chunk as c18 } from './chunks/18'
import { chunk as c19 } from './chunks/19'

export const esChunks = mergeChunks([
  c01, c02, c03, c04, c05, c06, c07, c08, c09, c10,
  c11, c12, c13, c14, c15, c16, c17, c18, c19,
])

const blog = createLocaleBlog('es', esChunks)

export const hasSpanishGuide = blog.hasGuide
export const getSpanishGuide = blog.getGuide
export const getSpanishGuides = blog.getGuides
export const getSpanishGuideSlugs = blog.getSlugs
/** Paths ('/blog/<slug>', '/blog/category/<slug>', '/blog') for ES_PAGES or the sitemap, once reviewed. */
export const getSpanishSitemapPaths = blog.getSitemapPaths

// ─── UI STRINGS ────────────────────────────────────────────────────────────
export const blogUI: BlogUIStrings = {
  breadcrumbHome: 'Inicio',
  breadcrumbBlog: 'Blog',
  blogLabel: 'Blog',
  h1Line1: 'Impuestos en Australia para working holiday:',
  h1Line2: 'tax return, TFN, super y ABN',
  description: 'Tax return, superannuation (DASP), TFN y ABN: guías prácticas para quienes tienen una visa working holiday 462 o 417, explicadas con claridad.',
  statsArticles: 'Artículos',
  statsCategories: 'Categorías',
  searchPlaceholder: 'Buscar un artículo...',
  clearSearch: 'Borrar búsqueda',
  allArticles: 'Todos los artículos',
  noResults: 'No se encontraron artículos para',
  showingResults: '',
  resultsMatching: 'artículos para',
  matching: 'para',
  tryDifferent: 'Prueba con otro término o explora todos los artículos.',
  noArticlesCategory: 'Todavía no hay artículos en esta categoría.',
  minRead: 'min de lectura',
  readMore: 'Leer más',
  showing: 'Mostrando',
  of: 'de',
  article: 'artículo',
  articles: 'artículos',
}

// ─── CATEGORY METADATA ─────────────────────────────────────────────────────
export type EsCategoryMeta = {
  category: Category
  slug: string
  title: string
  description: string
  intro: string
  faq: Array<{ question: string; answer: string }>
  relatedServicePath?: string
  relatedServiceLabel?: string
}

// Category URL slugs stay the English slugs.
const ALL_CATEGORY_META: EsCategoryMeta[] = [
  {
    category: 'TFN',
    slug: 'tfn',
    title: 'TFN en Australia: todas las guías',
    description: 'Cómo sacar el TFN gratis, retrasos de más de 28 días, trabajar mientras esperas, número perdido y estafas: todas las guías de TFN en un solo lugar.',
    intro: 'El Tax File Number (TFN) es el número de 9 dígitos que la Australian Taxation Office (ATO), la agencia tributaria australiana, asigna a toda persona que obtiene ingresos en Australia. Con una visa working holiday necesitas el TFN antes de empezar a trabajar: sin él, tu empleador debe retener un 45 % de impuestos en lugar del 15 % que corresponde a los working holiday makers. Estas guías cubren todo, desde la primera solicitud hasta los retrasos, los números perdidos y el regreso con una segunda visa.',
    faq: [
      { question: '¿Los working holiday makers necesitan un TFN en Australia?', answer: 'Sí. Todo working holiday maker que obtiene ingresos en Australia necesita un Tax File Number. Si tu empleador no tiene tu TFN, está obligado por ley a retener el impuesto a la tasa máxima del 45 %, en lugar del 15 % que se aplica a los working holiday makers.' },
      { question: '¿Cuánto tarda en llegar el TFN?', answer: 'La ATO procesa las solicitudes de TFN en un máximo de 28 días. El número llega por carta a tu dirección postal en Australia. Muchas personas lo reciben en unas dos semanas.' },
      { question: '¿Solicitar el TFN es gratis?', answer: 'Sí, no hay ninguna tarifa estatal. Lo que cuesta dinero es el tiempo hasta que tu empleador tiene el número: cada pago se retiene al 45 % en lugar del 15 %, y ese excedente solo vuelve a través de la tax return.' },
      { question: '¿Se puede empezar a trabajar sin TFN?', answer: 'Sí, pero tu empleador debe retener un 45 % de impuestos hasta que le entregues tu TFN. El excedente se puede reclamar al presentar la tax return anual.' },
    ],
    relatedServicePath: '/tfn',
    relatedServiceLabel: 'Solicitar tu TFN',
  },
  {
    category: 'ABN',
    slug: 'abn',
    title: 'ABN en Australia: guías para working holiday',
    description: 'Cuándo necesitas de verdad un ABN, registro gratuito, facturas, deducciones, el umbral de GST y las trampas del falso trabajo autónomo.',
    intro: 'El Australian Business Number (ABN) es un número de 11 dígitos que se usa cuando trabajas como sole trader (autónomo) o contractor en Australia. Lo necesitas si una empresa te paga contra factura en lugar de contratarte como empleado. Estas guías explican el registro, cuándo conviene un ABN y cómo afecta trabajar con uno a tus impuestos, tu super y tus derechos.',
    faq: [
      { question: '¿Los working holiday makers necesitan un ABN?', answer: 'Lo necesitas si trabajas como contractor o sole trader, es decir, si facturas tu trabajo en lugar de ser empleado. La mayoría de los working holiday makers con un empleo normal no necesitan un ABN.' },
      { question: '¿Cuánto cuesta un ABN?', answer: 'Registrar un ABN no tiene ninguna tarifa estatal. Lo caro está en el lado fiscal: de una factura no se retiene nada, así que toda la carga queda contigo hasta que presentes la tax return, y un ABN sacado cuando en realidad eras empleado te hace perder también la super y los derechos del award.' },
      { question: '¿Cuál es la diferencia entre TFN y ABN?', answer: 'El TFN es tu identificador fiscal personal y lo necesita todo el que trabaja. El ABN solo hace falta si operas como contractor o sole trader. Muchos working holiday makers tienen los dos.' },
      { question: '¿Se puede tener un TFN y un ABN a la vez?', answer: 'Sí. Muchos working holiday makers tienen ambos: el TFN para los ingresos como empleado y el ABN para los trabajos facturados.' },
    ],
    relatedServicePath: '/abn',
    relatedServiceLabel: 'Registrar tu ABN',
  },
  {
    category: 'Tax Return',
    slug: 'tax-return',
    title: 'Tax return en Australia: guías para backpackers',
    description: 'Cómo presentar la tax return con una visa working holiday: cuánto puede volver a ti, ejemplos, deducciones, plazos y presentación desde el extranjero.',
    intro: 'El año fiscal australiano va del 1 de julio al 30 de junio, y todo working holiday maker que obtuvo ingresos en ese periodo debe presentar una tax return. Por lo general, los backpackers reciben una devolución, porque su empleador retuvo más impuestos de los necesarios. Estas guías tratan los plazos, las deducciones, qué hacer cuando ya has salido de Australia y cómo manejar los casos complicados.',
    faq: [
      { question: '¿Cuándo hay que presentar la tax return?', answer: 'El año fiscal australiano termina el 30 de junio. Debes presentar la tax return entre el 1 de julio y el 31 de octubre de ese mismo año. Si lo haces a través de un tax agent, el plazo puede ampliarse.' },
      { question: '¿Los working holiday makers reciben una devolución de impuestos?', answer: 'A menudo sí, porque el empleador puede haber retenido más impuestos de los que realmente se debían. Pero nada está garantizado: depende de tu año. Si hay devolución, se paga en tu cuenta bancaria australiana, normalmente en unas dos semanas tras presentar la tax return.' },
      { question: '¿Se puede presentar la tax return después de salir de Australia?', answer: 'Sí. Puedes presentarla desde cualquier parte del mundo. Nosotros podemos encargarnos de todo el proceso a distancia. Mantén abierta tu cuenta bancaria australiana hasta que se pague la devolución.' },
      { question: '¿Qué se puede deducir como working holiday maker?', answer: 'Entre las deducciones habituales: viajes de trabajo, herramientas, uniformes, botas de trabajo, protección solar para quien trabaja al aire libre, uso del teléfono para el trabajo y los honorarios de un tax agent. Cada deducción exige un comprobante del gasto y de su relación con tu trabajo.' },
    ],
    relatedServicePath: '/tax-return',
    relatedServiceLabel: 'Presentar tu tax return',
  },
  {
    category: 'Super',
    slug: 'super',
    title: 'Super y DASP en Australia: todas las guías',
    description: 'Cómo funciona la super con una visa working holiday, comprobar que te pagan el 12 %, encontrar fondos perdidos y recuperar tu dinero con el DASP.',
    intro: 'La superannuation (super) es el sistema de ahorro para la jubilación obligatorio de Australia. Tu empleador paga el 12 % de tu sueldo a un fondo de super, además de tu salario (tasa vigente desde el 1 de julio de 2026). Cuando sales de Australia al terminar tu working holiday, puedes retirarla mediante el Departing Australia Superannuation Payment (DASP). Estas guías explican cómo funciona la super, cómo seguirla y cómo reclamarla.',
    faq: [
      { question: '¿Los working holiday makers tienen super en Australia?', answer: 'Sí. Todo working holiday maker tiene derecho a los aportes de super de su empleador. La tasa actual es del 12 % de tus ordinary time earnings (desde el 1 de julio de 2026, según el Annual Wage Review de la Fair Work Commission), que se paga además de tu salario directamente a un fondo de super.' },
      { question: '¿Cómo se reclama la super al salir de Australia?', answer: 'Mediante el proceso DASP, disponible cuando tu visa ya venció o fue cancelada y has salido del país. Para los working holiday makers, el pago tributa al 65 %.' },
      { question: '¿Cuánto impuesto se descuenta al retirar la super?', answer: 'La tasa DASP para los working holiday makers es del 65 % del componente imponible (taxable component) de tu saldo de super. Es más alta que el 35 % que se aplicaba antes de 2017.' },
      { question: '¿Cómo se encuentra la super perdida o no reclamada?', answer: 'Vinculando tu TFN a tu cuenta con nuestro servicio, contactando a la ATO o recurriendo a un tax agent que pueda buscar en todos los fondos.' },
    ],
    relatedServicePath: '/superannuation',
    relatedServiceLabel: 'Reclamar tu super',
  },
  {
    category: 'Work Rights',
    slug: 'work-rights',
    title: 'Derechos laborales: guías para backpackers',
    description: 'Tus derechos son los mismos que los de los trabajadores australianos: salario mínimo de 26,44 AUD, recargos del award, payslips y vías gratuitas de reclamo.',
    intro: 'En Australia, los working holiday makers tienen los mismos derechos laborales que los ciudadanos australianos. La Fair Work Ombudsman hace cumplir los salarios mínimos, las condiciones de trabajo y las protecciones de los awards de cada sector. Estas guías explican a qué tienes derecho, cómo leer tu payslip, cómo detectar un pago insuficiente y qué hacer si tu empleador incumple las reglas.',
    faq: [
      { question: '¿Cuál es el salario mínimo en Australia?', answer: 'El salario mínimo nacional es de 26,44 AUD por hora para empleados a tiempo completo y parcial (desde el 1 de julio de 2026). Los empleados casual reciben además un recargo del 25 %, lo que deja el mínimo casual en 33,05 AUD por hora. La mayoría de los trabajadores están cubiertos por un award sectorial con tarifas más altas.' },
      { question: '¿Se paga más por trabajar en un día festivo?', answer: 'Sí. Si trabajas en un día festivo (public holiday), tienes derecho a penalty rates, normalmente el 225 % de tu tarifa ordinaria (el doble más un cuarto). Si no trabajas, puedes tener derecho a tu tarifa base, según tu tipo de contrato.' },
      { question: '¿Qué hacer si el empleador no paga lo que corresponde?', answer: 'Primero, plantea el tema con calma a tu empleador y muestra tus registros. Si no se resuelve, nuestro equipo puede ayudarte a escalarlo por los canales correctos. Los working holiday makers tienen las mismas protecciones que los trabajadores australianos y tu visa está protegida cuando presentas un reclamo legítimo.' },
      { question: '¿Los empleados casual tienen días de enfermedad pagados?', answer: 'No. En Australia, los empleados casual no tienen derecho a días de enfermedad pagados. El recargo del 25 % sobre la tarifa base busca compensar la falta de esos beneficios.' },
    ],
  },
  {
    category: 'Medicare & Other',
    slug: 'medicare-and-other',
    title: 'Medicare y seguro de salud: guías',
    description: 'Quién puede usar Medicare según el país, el Medicare levy, opciones de seguro de salud y cómo recuperar la GST en el aeropuerto.',
    intro: 'Los working holiday makers tienen otras dudas fiscales y administrativas además de TFN, ABN, tax return y super. Estas guías cubren el acceso a Medicare, la Medicare levy y la Medicare levy surcharge, la devolución de la GST por lo que te llevas a casa y otros temas útiles para backpackers que viven y trabajan en Australia.',
    faq: [
      { question: '¿Los working holiday makers pagan la Medicare levy?', answer: 'Depende de tu situación individual y lo decide la ATO. No es algo que convenga dar por supuesto. Nuestro equipo lo revisa como parte de la preparación de tu tax return.' },
      { question: '¿Se puede usar Medicare con una visa working holiday?', answer: 'Solo los ciudadanos de países con un Reciprocal Health Care Agreement con Australia (entre ellos Reino Unido, Irlanda, Italia, Bélgica, Países Bajos, Suecia, Noruega, Finlandia, Malta, Eslovenia y Nueva Zelanda) pueden inscribirse en Medicare con cobertura limitada. Todos los demás working holiday makers deberían tener un seguro de salud privado.' },
      { question: '¿Se puede recuperar la GST de lo que te llevas a casa?', answer: 'Sí. El Tourist Refund Scheme permite recuperar el 10 % de GST de los bienes de más de 300 AUD (por proveedor) comprados dentro de los 60 días previos a la salida y que llevas contigo fuera de Australia. El reclamo se hace en el aeropuerto antes del vuelo.' },
      { question: '¿Hace falta un seguro de salud privado en Australia?', answer: 'En la mayoría de los casos, sí. El seguro de salud privado es condición de visa para muchas visas working holiday y es esencial para los backpackers no cubiertos por un Reciprocal Health Care Agreement.' },
    ],
    relatedServicePath: '/medicare',
    relatedServiceLabel: 'Revisar tu estado de Medicare',
  },
]

const listed = new Set<Category>(blog.getListedCategories())

/** Only categories that have at least one Spanish guide. */
export const esCategoryMeta: EsCategoryMeta[] = ALL_CATEGORY_META.filter(c => listed.has(c.category)).map(c => ({
  ...c,
  relatedServicePath: c.relatedServicePath ? localePath('es', c.relatedServicePath) : undefined,
}))

export function getSpanishCategoryMeta(slug: string): EsCategoryMeta | undefined {
  return esCategoryMeta.find(c => c.slug === slug)
}
