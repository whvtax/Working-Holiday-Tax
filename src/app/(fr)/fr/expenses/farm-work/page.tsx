import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { type Section } from '@/components/expenses/JobExpensesPage'
import { JobExpensesWhtPage } from '@/components/wht/JobPageBlocks'

export const metadata: Metadata = {
  "title": { absolute: "Travail en ferme en Australie : déductions fiscales PVT" },
  "description": "Ce que les ouvriers agricoles et fruit pickers peuvent déduire : protection solaire, matériel de cueillette, bottes et trajets entre parcelles.",
  "keywords": [
    "déductions fiscales travail en ferme Australie",
    "fruit picking impôts PVT",
    "farm work tax return Australie",
    "crème solaire déduction ATO",
    "trajet entre fermes déduction",
    "cueillette fruits working holiday impôts",
    "piece rate impôts Australie",
    "88 jours ferme impôts"
  ],
  "alternates": {
    "canonical": "/fr/expenses/farm-work",
    "languages": {
      "en-AU": "/expenses/farm-work",
      "de": "/de/expenses/farm-work",
      "ja": "/ja/expenses/farm-work",
      ...newLocaleLanguages('/expenses/farm-work'),
      "x-default": "/expenses/farm-work"
    }
  },
  "openGraph": {
    "images": [
      {
        "url": `${SITE_URL}/og-image.png`,
        "width": 1200,
        "height": 630,
        "alt": "Working Holiday Tax"
      }
    ],
    "type": "website",
    "locale": "fr_FR",
    "url": `${SITE_URL}/fr/expenses/farm-work`,
    "siteName": "Working Holiday Tax",
    "title": "Travail en ferme en Australie : déductions fiscales PVT",
    "description": "La protection solaire et les trajets entre parcelles sont déductibles. Votre jean et le loyer du hostel, non. Ce que le travail en ferme déduit vraiment."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Travail en ferme en Australie : déductions fiscales PVT",
    "description": "La protection solaire et les trajets entre parcelles sont déductibles. Votre jean et le loyer du hostel, non. Ce que le travail en ferme déduit vraiment."
  },
  "robots": {
    "index": true,
    "follow": true,
    "googleBot": {
      "index": true,
      "follow": true,
      "max-snippet": -1,
      "max-image-preview": "large"
    }
  }
}

const WA = waUrl({ topic: 'expenses', lang: "fr", detail: "Travail en ferme et fruit picking" })

const UI = {
  "ctaLabel": "Écrivez-nous sur WhatsApp",
  "ctaSub": "Réponse en général dans l’heure.",
  "guaranteeHeading": "Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique.",
  "guaranteeBody": "Une saison de petits jobs en ferme, plusieurs contractors et une seule déclaration : nous démêlons ça chaque semaine, pour des titulaires de visas 417 et 462 et personne d’autre. Chaque déclaration est vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO.",
  "faqHeading": "Les questions qu’on nous pose",
  "guidesHeading": "À lire ensuite",
  "otherJobs": "Un autre job ? Tous les métiers sont ici.",
  "servicesLabel": "Ailleurs sur le site",
  "wrongLabel": "Déduit à tort",
  "missedLabel": "Oublié alors que c’était déductible",
  "disclaimer": "Ce sont des informations générales, pas un conseil fiscal personnalisé. Ce que vous pouvez déduire dépend de vos employeurs, de vos justificatifs et de la façon dont vous avez réellement travaillé. Quand vous déposez avec nous, nous passons votre situation en revue point par point.",
  "hubHref": "/fr/expenses"
}

const CRUMBS = [
  {
    "name": "Accueil",
    "item": "/fr"
  },
  {
    "name": "Déductions",
    "item": "/fr/expenses"
  },
  {
    "name": "Travail en ferme",
    "item": "/fr/expenses/farm-work"
  }
]

const HERO = {
  "kicker": "Fermes, vergers et hangars de conditionnement",
  "h1lead": "La crème solaire est déductible.",
  "h1accent": "Votre jean ne l’a jamais été.",
  "lede": "La liste pour la cueillette, la taille et le conditionnement tient en six postes environ. Mettre tous les petits jobs de la saison dans une seule déclaration compte davantage."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Que peut déduire un fruit picker ou un ouvrier agricole dans sa tax return ?",
    "paras": [
      "Un ouvrier agricole peut déduire la protection solaire utilisée pour le travail en extérieur, les gants et les bottes de protection, les outils et le matériel de cueillette achetés de sa poche, et le trajet entre deux fermes ou deux parcelles dans la même journée de travail. Tout ce qui figure sur cette liste doit avoir été payé par vous, sans remboursement, et appuyé par un justificatif.",
      "La crème solaire est une dépense privée pour presque tout le monde en Australie. Elle est déductible pour vous parce que le job vous expose au soleil direct pendant des heures, ce que l’ATO traite comme une exposition liée au travail."
    ]
  },
  {
    "kind": "items",
    "h2": "Les déductions propres à ce métier",
    "intro": "Chacune a une condition, et c’est la condition qui fait tenir la déduction.",
    "items": [
      {
        "t": "Protection solaire : crème, chapeau à larges bords, lunettes de soleil",
        "d": "Déductible quand le travail vous expose au soleil, ce qui couvre la cueillette, la taille, l’éclaircissage et le conditionnement dans un hangar ouvert sur les côtés. Ne déduisez que la part utilisée pour le travail."
      },
      {
        "t": "Gants de protection, bottes en caoutchouc et chaussures de sécurité",
        "d": "Gants de cueillette, bottes de pluie, chaussures de sécurité pour le travail en hangar. Ils sont éligibles parce qu’ils vous protègent d’un risque précis créé par le job : épines, sève, produits chimiques, caisses qui tombent. Des chaussures solides ordinaires, non."
      },
      {
        "t": "Outils et matériel de cueillette achetés par vous",
        "d": "Sécateurs, cisailles, sac ou harnais de cueillette, lampe frontale, genouillères. Chaque article à 300 $ AUD ou moins est déduit en totalité l’année de l’achat. Au-dessus de 300 $, vous le déduisez quand même, sur la durée de vie de l’article."
      },
      {
        "t": "Trajets entre fermes ou parcelles dans la même journée",
        "d": "Passer d’une propriété, d’une parcelle ou d’un hangar à un autre une fois la journée de travail commencée est un trajet déductible, calculé avec la méthode cents per kilometre ou un logbook. Le premier trajet de la journée n’en fait pas partie."
      },
      {
        "t": "Vêtements de protection avec une vraie fonction",
        "d": "Vêtements de pluie, combinaison résistante aux produits chimiques pour les traitements, masque anti-poussière dans un hangar de conditionnement. Le test est de savoir si l’article vous protège de ce que le travail vous fait subir. Une chemise à carreaux qui tient chaud, non."
      },
      {
        "t": "La part pro de votre téléphone",
        "d": "Modeste, mais réelle si vous utilisez votre propre téléphone pour le job, par exemple pour recevoir les horaires d’un contractor. Vous déduisez le pourcentage professionnel sur une base raisonnable, pas toute la facture."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Que faut-il garder d’une saison ?",
    "paras": [
      "Rien n’est déductible sans trois conditions : l’argent était le vôtre, personne ne vous l’a rendu, et il a servi à gagner le revenu de la déclaration. Sur une saison, cela donne le ticket de caisse de la station-service pour la crème solaire, le reçu des gants, et une note des dates et des kilomètres chaque fois qu’un contractor vous a déplacé entre deux parcelles.",
      "Un reçu, une facture, un relevé bancaire ou une photo sur le téléphone indiquant le montant, la date, le fournisseur et l’article, à conserver cinq ans. Si vos déductions professionnelles pour toute l’année totalisent 300 $ ou moins, aucune preuve écrite n’est nécessaire. Ce n’est pas le même seuil de 300 $ que celui qui décide si un article est amorti d’un coup ou sur sa durée de vie."
    ]
  },
  {
    "kind": "traps",
    "h2": "Quelles erreurs font les ouvriers agricoles ?",
    "intro": "D’abord, les déductions que les saisonniers font chaque année sans pouvoir les justifier. Ensuite, les déductions dont personne ne leur a dit qu’elles existaient.",
    "wrong": [
      {
        "t": "Les vêtements ordinaires détruits par le job",
        "d": "Jean, t-shirt, chemise à carreaux, pull pour un départ à cinq heures du matin. L’ATO teste l’article et non l’intention, et un vêtement courant reste privé, même si les taches de fruits l’abîment vite."
      },
      {
        "t": "Le loyer du hostel et la caution du working hostel",
        "d": "L’endroit où vous avez dormi pendant la saison est une dépense de vie courante, pas une dépense de travail, même si le hostel est le seul logement à cinquante kilomètres à la ronde et que la ferme l’a organisé."
      },
      {
        "t": "Les repas et les boissons de la journée",
        "d": "Le déjeuner dans une ferme est le même que n’importe où ailleurs. Les repas ne deviennent déductibles que si un déplacement exigé par l’employeur vous tient éloigné de chez vous la nuit, ce que la saison de cueillette ne remplit généralement pas."
      },
      {
        "t": "Le trajet du hostel à la ferme",
        "d": "C’est un trajet domicile-travail, que vous fassiez cinquante kilomètres de piste ou que vous y alliez à pied. Seuls les déplacements entre sites de travail une fois la journée commencée sont déductibles."
      },
      {
        "t": "Se rendre dans la région au départ",
        "d": "Le vol ou la route jusqu’à Bundaberg, Mildura ou Tully pour chercher du travail vous place là où se trouve le job, ce qui n’est pas un coût pour en tirer un revenu."
      }
    ],
    "missed": [
      {
        "t": "La crème solaire, le chapeau et les lunettes",
        "d": "La déduction la plus souvent oubliée en ferme. Presque personne ne garde le reçu d’un flacon de crème solaire à 19 $ acheté à la station-service, et sur une saison ce n’est pas un petit chiffre."
      },
      {
        "t": "Chaque paire de gants, une par une",
        "d": "Les gants de cueillette sont un consommable. Acheter six paires dans la saison, ce sont six achats déductibles, pas un seul, et chacun est testé seul face aux 300 $."
      },
      {
        "t": "Les trajets entre parcelles le même jour",
        "d": "Fréquents sur les grandes propriétés et avec les contractors qui déplacent une équipe, et presque jamais déduits parce que ça ne ressemble pas à un trajet. Notez la date et les kilomètres au fur et à mesure."
      },
      {
        "t": "Un job de trois semaines complètement oublié",
        "d": "Un court passage, payé en vitesse par un contractor de labour hire, s’oublie facilement dans une déclaration, et omettre un revenu est pire que rater une déduction."
      },
      {
        "t": "L’impôt retenu au-dessus du taux habituel par un employeur non enregistré",
        "d": "Le taux retenu dépend notamment de la façon dont l’employeur est enregistré auprès de l’ATO. Si la retenue n’a pas été faite au bon taux, la différence peut être revue au dépôt de la déclaration, et pas avant."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Qu’est-ce qui dépend de l’organisation de votre saison ?",
    "paras": [
      "Travail itinérant ou trajet domicile-travail, c’est une question de faits. Être envoyé entre trois propriétés par un contractor sans base fixe n’est pas la même situation que de rouler jusqu’au même verger pendant onze semaines. La fréquence des changements de site, l’obligation du déplacement pour le job et l’existence d’un lieu de travail fixe tranchent.",
      "La résidence fiscale peut peser davantage. C’est une appréciation au cas par cas, pas une formule, et l’affaire Addy devant la High Court montre à quel point cela peut varier d’une personne à l’autre. Nous la passons en revue avec votre année, et c’est l’ATO qui décide en dernier ressort.",
      "Le travail en ferme peut aussi compter pour un visa suivant, et cette partie relève de l’immigration, pas de l’impôt. Les secteurs, les codes postaux et les dates qui comptent sont fixés par le Department of Home Affairs et ont changé plus d’une fois : consultez les consignes officielles à jour ou un agent en immigration enregistré avant de compter sur un job."
    ]
  }
]

const FAQS = [
  {
    "question": "Puis-je vraiment déduire la crème solaire et un chapeau ?",
    "answer": "Oui, quand le travail vous met au soleil, et le travail en ferme le fait presque toujours. L’ATO accepte la protection solaire comme dépense professionnelle pour les travailleurs en extérieur parce que l’exposition vient du job.\n\nGardez les reçus et ne déduisez que la part utilisée pour le travail."
  },
  {
    "question": "J’ai travaillé dans trois fermes cette année. Cela fait-il trois déclarations ?",
    "answer": "Non. Une seule déclaration couvre toute l’année fiscale, du 1er juillet au 30 juin, quel que soit le nombre de fermes, de contractors ou d’entreprises de labour hire qui vous ont payé. Chaque employeur déclare votre salaire et l’impôt retenu à l’ATO, et tout arrive dans une seule déclaration.\n\nLe risque d’une saison de petits jobs, c’est d’en oublier un."
  },
  {
    "question": "Être payé au bac change-t-il mon impôt ?",
    "answer": "Non. Le paiement à la pièce est un salaire, calculé au bac, au seau, à la barquette ou au kilo. Votre employeur déclare le total et retient l’impôt de la même façon qu’avec un taux horaire.\n\nCe que cela change, c’est la tenue de vos justificatifs, car une paie qui varie d’un jour à l’autre est plus difficile à comparer ensuite avec un income statement."
  },
  {
    "question": "Puis-je déduire l’essence pour aller à la ferme chaque matin ?",
    "answer": "Non. Le premier trajet de la journée, de là où vous habitez à la première ferme, est un trajet domicile-travail ordinaire et n’est pas déductible, quelle que soit la distance.\n\nLes trajets entre fermes, parcelles ou hangars une fois la journée de travail commencée sont déductibles, calculés avec la méthode cents per kilometre ou un logbook."
  },
  {
    "question": "Et si la ferme ne m’a jamais donné de payslips ?",
    "answer": "En général, ce n’est pas un problème. La plupart des employeurs déclarent votre paie à l’ATO via la Single Touch Payroll, donc elle apparaît dans un income statement que vous ayez reçu une payslip ou non.\n\nCela aide quand même de noter quelle ferme, quelles dates et à peu près combien vous avez été payé."
  }
]

const GUIDES = [
  {
    "href": "/fr/blog/piece-rates-farm-work-working-holiday",
    "label": "Le paiement à la pièce en ferme, et le plancher en dessous",
    "desc": "Comment fonctionne la paie au bac et à quoi elle doit quand même arriver."
  },
  {
    "href": "/fr/blog/fruit-picking-jobs-working-holiday-australia",
    "label": "Le fruit picking en Australie",
    "desc": "Régions, saisons et ce qu’il faut vérifier avant d’accepter le job."
  },
  {
    "href": "/fr/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "La déduction immédiate de 300 $ pour l’outillage",
    "desc": "Pourquoi chaque article est évalué séparément, et ce que change un lot."
  }
]

const SERVICES = [
  {
    "href": "/fr/tax-return",
    "label": "Tax return"
  },
  {
    "href": "/fr/tfn",
    "label": "TFN"
  },
  {
    "href": "/fr/blog/tax-residency-working-holiday-makers",
    "label": "Résidence fiscale"
  }
]

/* Tout ce qui suit le contenu est partagé : les schémas, les tokens et
   chaque rendu de section vivent une seule fois dans JobExpensesWhtPage, pour les 21 pages métier. */
export default function Page() {
  return (
    <JobExpensesWhtPage
      content={{
        lang: 'fr',
        path: '/fr/expenses/farm-work',
        articleHeadline: "Travail en ferme en Australie : déductions fiscales PVT",
        articleDescription: "La protection solaire et les trajets entre parcelles sont déductibles. Votre jean et le loyer du hostel, non. Ce que le travail en ferme déduit vraiment.",
        inLanguage: "fr",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
