/**
 * Italian guide page (ADR 013). All template logic lives in LocaleGuidePage; this
 * file is the Italian half of the config. Only guides with a native body in
 * ./data chunks exist: any other slug is a 404 and is not in hreflang.
 */
import type { Metadata } from 'next'
import { catLabelIt } from '@/lib/category-labels'
import { formatGuideDateIt } from '@/lib/blog-dates'
import { getItalianGuide, getItalianGuideSlugs, itCategoryMeta } from '../data'
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
  locale: 'it',
  basePath: '/it',
  ogLocale: 'it_IT',
  getGuide: getItalianGuide,
  listedSlugs: getItalianGuideSlugs,
  alternateLanguages: newLocaleGuideAlternates,
  categoryMeta: itCategoryMeta,
  catLabel: catLabelIt,
  formatDate: formatGuideDateIt,

  categoryKeywords: {
    "TFN": [
        "come ottenere il TFN Australia",
        "TFN Working Holiday Australia",
        "TFN visto 417",
        "TFN visto 462",
        "TFN per la tax return"
    ],
    "ABN": [
        "ABN Australia Working Holiday",
        "Australian Business Number backpacker",
        "lavorare in proprio Australia Working Holiday",
        "ABN visto 417",
        "ABN visto 462"
    ],
    "Tax Return": [
        "tax return Australia Working Holiday",
        "dichiarazione dei redditi Australia",
        "rimborso tasse visto 417",
        "rimborso tasse visto 462",
        "tax return dopo aver lasciato l'Australia"
    ],
    "Super": [
        "come recuperare la superannuation",
        "DASP Australia Working Holiday",
        "prelievo super quando lasci l'Australia",
        "Departing Australia Superannuation Payment",
        "DASP visto 417"
    ],
    "Work Rights": [
        "diritti sul lavoro Working Holiday Australia",
        "Fair Work Australia backpacker",
        "salario minimo Australia",
        "visto 417 diritti del lavoratore",
        "visto 462 condizioni di lavoro"
    ],
    "Medicare & Other": [
        "esenzione Medicare levy Working Holiday",
        "Medicare Working Holiday Australia",
        "Reciprocal Health Care Agreement Italia Australia",
        "esenzione Medicare levy visto 417",
        "assicurazione sanitaria Working Holiday Australia"
    ]
},
  coreKeywords: ["tax return Australia", "rimborso tasse Australia", "tasse Australia Working Holiday", "visto 417 Australia", "visto 462 Australia", "dichiarazione dei redditi Australia", "TFN Australia", "super Australia"],
  ldKeywords: (category) => ["Working Holiday Tax", "Australia", "visto 417", "visto 462", category, "tasse Working Holiday"],
  authorDescription: "Servizio fiscale australiano specializzato in working holiday maker (visti 417 e 462).",
  knowsAbout: ["Fisco australiano", "Visto Working Holiday (subclass 417, 462)", "Tax File Number (TFN)", "Australian Business Number (ABN)", "Superannuation e DASP", "Medicare levy", "Fair Work Australia"],
  audienceName: "Titolari di visto Working Holiday in Australia (subclass 417 e 462)",
  aboutThingName: "Tasse australiane per chi ha un visto Working Holiday",
  serviceForCategory: {
    "TFN": {
      path: localePath('it', "/tfn"),
      label: "Cosa facciamo per il TFN e il modulo di dichiarazione",
      blurb: "Il numero è gratuito. Quello che conta è il modulo consegnato al datore di lavoro, ed è quello di cui ci occupiamo.",
    },
    "ABN": {
      path: localePath('it', "/abn"),
      label: "Cosa facciamo se hai fatturato con un ABN",
      blurb: "Stipendio e redditi fatturati sono tassati in modo diverso e compaiono in punti diversi della tax return. Dividerli bene è il vero lavoro.",
    },
    "Tax Return": {
      // 5 Nov 2026: points at the flagship page, which had one internal link.
      path: '/it/dichiarazione-redditi-australia', // a locale-only route: localePath() would fall back to the English path
      label: "Dichiarazione dei redditi in Australia: come la facciamo",
      blurb: "Residenza fiscale, settimane trattenute con l'aliquota sbagliata, la questione Medicare e le deduzioni che corrispondono al tuo lavoro reale.",
    },
    "Super": {
      path: localePath('it', "/superannuation"),
      label: "Cosa facciamo per la tua super prima che tu parta",
      blurb: "Il lavoro casual sparge la super su più fondi. Troviamo ogni conto con il tuo TFN e presentiamo la richiesta una sola volta, nell'ordine giusto.",
    },
    "Medicare & Other": {
      path: localePath('it', "/medicare"),
      label: "Cosa facciamo per la Medicare levy",
      blurb: "La levy viene applicata di default. Se l'esenzione si applica dipende dal tuo caso individuale, e lo verifichiamo noi come parte della tax return.",
    },
    "Work Rights": {
      path: localePath('it', "/tax-return"),
      label: "Cosa controlliamo in ogni tax return",
      blurb: "Se uno di questi punti ha toccato la tua paga o le tue ore, di solito compare anche nella tua tax return.",
    },
  },

  homeLabel: "Home",
  blogLabel: 'Blog',
  publishedLabel: "Pubblicato il ",
  reviewedLabel: "Verificato il ",
  readTimeLabel: (m) => `${m ?? ''} min di lettura`,
  whatsNextLabel: "Per continuare",
  whatWeDoLabel: "Cosa facciamo",
  viewAllLabel: (label) => `Vedi tutti gli articoli su ${label} →`,
  aside: {
    label: "Informazioni su questa guida",
    p1: "Scritta dal team di Working Holiday Tax, che lavora solo con titolari di visti 417 e 462, e verificata rispetto alle regole attuali di ATO e Fair Work. Sono informazioni generali, non una consulenza personalizzata sulla tua situazione fiscale.",
    p2: "Working Holiday Tax opera sotto la supervisione di un agente fiscale registrato. Ogni tax return viene rivista e approvata da un agente fiscale registrato prima di essere presentata all'ATO.",
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
  return localizedGuideStaticParams(getItalianGuideSlugs())
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildGuideMetadata(cfg, (await params).slug)
}

export default async function ItalianGuidePage({ params }: Props) {
  return <LocalizedGuidePage cfg={cfg} slug={(await params).slug} />
}
