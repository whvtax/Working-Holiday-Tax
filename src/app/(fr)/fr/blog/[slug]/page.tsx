/**
 * French guide page (ADR 013). All template logic lives in LocaleGuidePage; this
 * file is the French half of the config. Only guides with a native body in
 * ./data chunks exist: any other slug is a 404 and is not in hreflang.
 */
import type { Metadata } from 'next'
import { catLabelFr } from '@/lib/category-labels'
import { formatGuideDateFr } from '@/lib/blog-dates'
import { getFrenchGuide, getFrenchGuideSlugs, frCategoryMeta } from '../data'
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
  locale: 'fr',
  basePath: '/fr',
  ogLocale: 'fr_FR',
  getGuide: getFrenchGuide,
  listedSlugs: getFrenchGuideSlugs,
  alternateLanguages: newLocaleGuideAlternates,
  categoryMeta: frCategoryMeta,
  catLabel: catLabelFr,
  formatDate: formatGuideDateFr,

  categoryKeywords: {
    "TFN": [
        "demander un TFN Australie",
        "TFN PVT Australie",
        "TFN visa 417",
        "TFN visa 462",
        "numéro TFN pour tax return"
    ],
    "ABN": [
        "ABN Australie PVT",
        "Australian Business Number backpacker",
        "travailler en indépendant Australie PVT",
        "ABN visa 417",
        "ABN visa 462"
    ],
    "Tax Return": [
        "tax return Australie PVT",
        "déclaration d'impôts Australie PVT",
        "remboursement d'impôts visa 417",
        "remboursement d'impôts visa 462",
        "tax return après avoir quitté l'Australie"
    ],
    "Super": [
        "récupérer sa super Australie",
        "DASP Australie PVT",
        "retrait de la super au départ d'Australie",
        "Departing Australia Superannuation Payment",
        "DASP visa 417"
    ],
    "Work Rights": [
        "droits au travail PVT Australie",
        "Fair Work Australie backpacker",
        "salaire minimum Australie PVT",
        "visa 417 droits du travailleur",
        "visa 462 conditions de travail"
    ],
    "Medicare & Other": [
        "exemption Medicare levy PVT",
        "Medicare PVT Australie",
        "Reciprocal Health Care Agreement Australie",
        "exemption Medicare levy visa 417",
        "assurance santé PVT Australie"
    ]
},
  coreKeywords: ["tax return Australie PVT", "remboursement d'impôts Australie", "impôts Australie visa vacances-travail", "visa 417 Australie", "visa 462 Australie", "PVT Australie impôts", "TFN Australie", "super Australie PVT"],
  ldKeywords: (category) => ["Working Holiday Tax", "Australie", "visa 417", "visa 462", category, "impôts PVT"],
  authorDescription: "Service fiscal australien spécialisé dans les working holiday makers (visas 417 et 462).",
  knowsAbout: ["Fiscalité australienne", "Visa vacances-travail (subclass 417, 462)", "Tax File Number (TFN)", "Australian Business Number (ABN)", "Superannuation et DASP", "Medicare levy", "Fair Work Australia"],
  audienceName: "Titulaires d'un visa vacances-travail en Australie (subclass 417 et 462)",
  aboutThingName: "Fiscalité australienne pour les titulaires d'un visa vacances-travail",
  serviceForCategory: {
    "TFN": {
      path: localePath('fr', "/tfn"),
      label: "Ce que nous prenons en charge pour le TFN et le formulaire de déclaration",
      blurb: "Le numéro est gratuit et se demande en quinze minutes. Ce qui compte, c'est le formulaire remis à l'employeur, et c'est ce que nous prenons en charge.",
    },
    "ABN": {
      path: localePath('fr', "/abn"),
      label: "Ce que nous faisons si vous avez facturé sous un ABN",
      blurb: "Le salaire et les revenus facturés ne sont pas imposés de la même façon et n'apparaissent pas au même endroit de la tax return. Bien faire cette répartition est le vrai travail.",
    },
    "Tax Return": {
      // 5 Nov 2026: points at the flagship page, which had one internal link.
      path: '/fr/tax-return-australie-pvt', // a locale-only route: localePath() would fall back to the English path
      label: "Tax return Australie en PVT : comment nous la faisons",
      blurb: "La résidence fiscale, les semaines retenues au mauvais taux, la question Medicare et les déductions qui correspondent à votre travail réel.",
    },
    "Super": {
      path: localePath('fr', "/superannuation"),
      label: "Ce que nous faisons pour votre super avant votre départ",
      blurb: "Le travail casual disperse la super sur plusieurs caisses. Nous retrouvons chaque compte grâce à votre TFN et déposons la demande une seule fois, dans le bon ordre.",
    },
    "Medicare & Other": {
      path: localePath('fr', "/medicare"),
      label: "Ce que nous faisons pour la Medicare levy",
      blurb: "La levy est retenue par défaut. L'exemption exige une attestation qu'il faut demander, et c'est le point le plus souvent oublié dans les tax returns de backpackers.",
    },
    "Work Rights": {
      path: localePath('fr', "/tax-return"),
      label: "Ce que nous passons en revue dans chaque tax return",
      blurb: "Si l'un de ces points a touché votre paie ou vos heures, il apparaît le plus souvent aussi dans votre tax return.",
    },
  },

  homeLabel: "Accueil",
  blogLabel: 'Blog',
  publishedLabel: "Publié le ",
  reviewedLabel: "Vérifié le ",
  readTimeLabel: (m) => `${m ?? ''} min de lecture`,
  whatsNextLabel: "Pour aller plus loin",
  whatWeDoLabel: "Ce que nous faisons",
  viewAllLabel: (label) => `Voir tous les articles ${label} →`,
  aside: {
    label: "À propos de ce guide",
    p1: "Rédigé par l'équipe de Working Holiday Tax, qui travaille exclusivement avec des titulaires de visas 417 et 462, et vérifié par rapport aux règles en vigueur de l'ATO et de la Fair Work. Il s'agit d'informations générales, pas d'un conseil personnalisé sur votre situation fiscale.",
    p2: "Working Holiday Tax opère sous la supervision d'un agent fiscal enregistré. Chaque tax return est vérifiée et validée par un agent fiscal enregistré avant d'être déposée auprès de l'ATO.",
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
  return localizedGuideStaticParams(getFrenchGuideSlugs())
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildGuideMetadata(cfg, (await params).slug)
}

export default async function FrenchGuidePage({ params }: Props) {
  return <LocalizedGuidePage cfg={cfg} slug={(await params).slug} />
}
