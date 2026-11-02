/**
 * Spanish guide page (ADR 013). All template logic lives in LocaleGuidePage; this
 * file is the Spanish half of the config. Only guides with a native body in
 * ./data chunks exist: any other slug is a 404 and is not in hreflang.
 */
import type { Metadata } from 'next'
import { catLabelEs } from '@/lib/category-labels'
import { formatGuideDateEs } from '@/lib/blog-dates'
import { getSpanishGuide, getSpanishGuideSlugs, esCategoryMeta } from '../data'
import { newLocaleGuideAlternates } from '@/lib/guide-alternates'
import {
  LATIN_FAQ_RULES,
  LATIN_GUIDE_STYLES,
  ORG_ENTITIES,
  PLACE_ENTITIES,
  WHV_MENTION,
  localePath,
} from '@/components/blog/newLocaleDefaults'
import {
  LocalizedGuidePage,
  buildGuideMetadata,
  localizedGuideStaticParams,
  type GuideLocaleConfig,
} from '@/components/blog/LocaleGuidePage'

const cfg: GuideLocaleConfig = {
  locale: 'es',
  basePath: '/es',
  ogLocale: 'es_ES',
  getGuide: getSpanishGuide,
  listedSlugs: getSpanishGuideSlugs,
  alternateLanguages: newLocaleGuideAlternates,
  categoryMeta: esCategoryMeta,
  catLabel: catLabelEs,
  formatDate: formatGuideDateEs,

  categoryKeywords: {
    "TFN": [
        "cómo sacar el TFN Australia",
        "TFN working holiday Australia",
        "TFN visa 462",
        "TFN visa 417",
        "TFN para la tax return"
    ],
    "ABN": [
        "ABN Australia working holiday",
        "Australian Business Number backpacker",
        "trabajar como autónomo en Australia working holiday",
        "ABN visa 462",
        "ABN visa 417"
    ],
    "Tax Return": [
        "tax return Australia working holiday",
        "declaración de impuestos Australia",
        "devolución de impuestos visa 462",
        "devolución de impuestos visa 417",
        "tax return después de salir de Australia"
    ],
    "Super": [
        "cómo recuperar la superannuation",
        "DASP Australia working holiday",
        "retirar la super al salir de Australia",
        "Departing Australia Superannuation Payment",
        "DASP visa 462"
    ],
    "Work Rights": [
        "derechos laborales working holiday Australia",
        "Fair Work Australia backpacker",
        "salario mínimo Australia",
        "visa 462 derechos del trabajador",
        "visa 417 condiciones de trabajo"
    ],
    "Medicare & Other": [
        "exención Medicare levy working holiday",
        "Medicare working holiday Australia",
        "Reciprocal Health Care Agreement Australia",
        "exención Medicare levy visa 462",
        "seguro de salud working holiday Australia"
    ]
},
  coreKeywords: ["devolución de impuestos Australia", "tax return Australia", "impuestos Australia working holiday", "visa 462 Australia", "visa 417 Australia", "declaración de impuestos Australia", "TFN Australia", "super Australia"],
  ldKeywords: (category) => ["Working Holiday Tax", "Australia", "visa 462", "visa 417", category, "impuestos working holiday"],
  reviewedByDescription: "Agente fiscal australiano registrado que revisa y aprueba el trabajo preparado por Working Holiday Tax.",
  authorDescription: "Servicio de impuestos australiano especializado en working holiday makers (visas 462 y 417).",
  knowsAbout: ["Impuestos australianos", "Visa working holiday (subclass 462, 417)", "Tax File Number (TFN)", "Australian Business Number (ABN)", "Superannuation y DASP", "Medicare levy", "Fair Work Australia"],
  audienceName: "Titulares de visa working holiday en Australia (subclass 462 y 417)",
  aboutThingName: "Impuestos australianos para quienes tienen una visa working holiday",
  serviceForCategory: {
    "TFN": {
      path: localePath('es', "/tfn"),
      label: "Qué hacemos con el TFN y el formulario de declaración",
      blurb: "El número es gratuito y se pide en quince minutos. Lo que importa es el formulario que se entrega al empleador, y de eso nos encargamos.",
    },
    "ABN": {
      path: localePath('es', "/abn"),
      label: "Qué hacemos si facturaste con un ABN",
      blurb: "El sueldo y los ingresos facturados tributan distinto y aparecen en lugares distintos de la tax return. Repartirlos bien es el trabajo de verdad.",
    },
    "Tax Return": {
      path: localePath('es', "/tax-return"),
      label: "Qué revisamos en cada tax return",
      blurb: "La residencia fiscal, las semanas retenidas a la tasa equivocada, el tema de Medicare y las deducciones que corresponden a tu trabajo real.",
    },
    "Super": {
      path: localePath('es', "/superannuation"),
      label: "Qué hacemos con tu super antes de que te vayas",
      blurb: "El trabajo casual reparte la super entre varios fondos. Encontramos cada cuenta con tu TFN y presentamos el reclamo una sola vez, en el orden correcto.",
    },
    "Medicare & Other": {
      path: localePath('es', "/medicare"),
      label: "Qué hacemos con la Medicare levy",
      blurb: "La levy se retiene por defecto. La exención exige un certificado que hay que solicitar, y es lo que más se olvida en las tax return de los backpackers.",
    },
    "Work Rights": {
      path: localePath('es', "/tax-return"),
      label: "Qué revisamos en cada tax return",
      blurb: "Si alguno de estos puntos afectó tu pago o tus horas, normalmente también aparece en tu tax return.",
    },
  },

  homeLabel: "Inicio",
  blogLabel: 'Blog',
  publishedLabel: "Publicado el ",
  reviewedLabel: "Revisado el ",
  readTimeLabel: (m) => `${m ?? ''} min de lectura`,
  whatsNextLabel: "Para seguir leyendo",
  whatWeDoLabel: "Qué hacemos",
  viewAllLabel: (label) => `Ver todos los artículos de ${label} →`,
  aside: {
    label: "Acerca de esta guía",
    p1: "Escrita por el equipo de Working Holiday Tax, que trabaja exclusivamente con titulares de visas 462 y 417, y revisada con las normas vigentes de la ATO y de Fair Work. Es información general, no un asesoramiento personalizado sobre tu situación fiscal.",
    p2: "Working Holiday Tax opera bajo la supervisión de un agente fiscal registrado. Cada tax return es revisada y aprobada por un agente fiscal registrado antes de presentarse ante la ATO.",
  },

  styles: LATIN_GUIDE_STYLES,
  faq: LATIN_FAQ_RULES,
  howToNameMax: 60,
  orgEntities: ORG_ENTITIES,
  placeEntities: PLACE_ENTITIES,
  whvMention: WHV_MENTION,
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return localizedGuideStaticParams(getSpanishGuideSlugs())
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildGuideMetadata(cfg, (await params).slug)
}

export default async function SpanishGuidePage({ params }: Props) {
  return <LocalizedGuidePage cfg={cfg} slug={(await params).slug} />
}
