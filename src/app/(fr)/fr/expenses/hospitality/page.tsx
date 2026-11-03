import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'

export const metadata: Metadata = {
  "title": { absolute: "Restauration en Australie : RSA, chaussures, tenue" },
  "description": "Ce que le personnel de bar, café et cuisine peut déduire : renouvellement du RSA, chaussures antidérapantes, veste de cuisine et lessive de la tenue.",
  "keywords": [
    "déductions fiscales restauration Australie",
    "hospitality PVT tax return",
    "RSA Australie déduction impôts",
    "chaussures antidérapantes déduction ATO",
    "uniforme lessive déduction ATO",
    "pourboires impôts Australie",
    "barista serveur working holiday impôts",
    "cuisinier PVT Australie impôts"
  ],
  "alternates": {
    "canonical": "/fr/expenses/hospitality",
    "languages": {
      "en-AU": "/expenses/hospitality",
      "de": "/de/expenses/hospitality",
      "ja": "/ja/expenses/hospitality",
      ...newLocaleLanguages('/expenses/hospitality'),
      "x-default": "/expenses/hospitality"
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
    "url": `${SITE_URL}/fr/expenses/hospitality`,
    "siteName": "Working Holiday Tax",
    "title": "Restauration en Australie : RSA, chaussures, tenue",
    "description": "Les chaussures antidérapantes et la veste de cuisine sont déductibles. La tenue toute noire imposée par l’établissement, non."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Restauration en Australie : RSA, chaussures, tenue",
    "description": "Les chaussures antidérapantes et la veste de cuisine sont déductibles. La tenue toute noire imposée par l’établissement, non."
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

const WA = waUrl({ topic: 'expenses', lang: "fr", detail: "Restauration, bar et cuisine" })

const UI = {
  "ctaLabel": "Écrivez-nous sur WhatsApp",
  "ctaSub": "Réponse en général dans l’heure.",
  "guaranteeHeading": "Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique.",
  "guaranteeBody": "Quatre établissements, quatre income statements et une super répartie sur quatre fonds : c’est l’année habituelle en restauration chez nous, et tous nos clients sont en 417 ou 462. Chaque déclaration est vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO.",
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
    "name": "Restauration",
    "item": "/fr/expenses/hospitality"
  }
]

const HERO = {
  "kicker": "Bars, cafés, restaurants et cuisines",
  "h1lead": "Vos chaussures antidérapantes sont déductibles.",
  "h1accent": "La tenue toute noire, non.",
  "lede": "La liste est courte, donc le travail d’une déclaration en restauration se joue en général côté revenus : plusieurs établissements, plusieurs taux de retenue, une super répartie sur plusieurs fonds."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Que peut déduire un employé de bar, de café ou de cuisine dans sa tax return ?",
    "paras": [
      "Le personnel de restauration peut déduire les chaussures de protection antidérapantes, les vêtements propres à un métier comme la veste de cuisinier et le pantalon à carreaux, la lessive d’une tenue obligatoire portant le logo de l’employeur, le renouvellement d’un RSA (Responsible Service of Alcohol, le certificat pour servir de l’alcool) ou d’un certificat de Food Safety Supervisor, et les outils de cuisine achetés de sa poche. Tout le reste de la garde-robe est un vêtement ordinaire.",
      "La restauration vous donne peu de frais propres au métier. Vous travaillez à l’intérieur, l’employeur fournit le matériel, et les vêtements demandés par un établissement sont en général des vêtements que tout le monde pourrait porter n’importe où."
    ]
  },
  {
    "kind": "items",
    "h2": "Les déductions propres à ce métier",
    "intro": "Les vêtements ont un test supplémentaire en plus des tests généraux, et c’est là que se joue presque tout litige en restauration.",
    "items": [
      {
        "t": "Chaussures fermées de protection, antidérapantes",
        "d": "Déductibles là où vous en avez besoin : sol mouillé derrière un bar, renversements autour de la machine à café, plaques chaudes au passe d’une cuisine. Elles comptent comme chaussures de protection et non comme chaussures ordinaires parce qu’elles remplissent une fonction de sécurité précise, quelle que soit leur couleur."
      },
      {
        "t": "Veste de cuisinier et pantalon de cuisine à carreaux",
        "d": "Des vêtements propres à un métier : ils vous identifient comme membre d’un métier précis et auraient l’air absurdes ailleurs. C’est une catégorie reconnue, distincte de l’uniforme à logo, et c’est pour cela qu’un cuisinier obtient une déduction vestimentaire et un serveur en général non."
      },
      {
        "t": "La lessive d’une tenue obligatoire avec logo",
        "d": "Si votre employeur exige une tenue portant son logo ou un design vraiment distinctif, la laver est déductible à 1 $ par machine pour les vêtements de travail seuls, ou 0,50 $ par machine lavés avec le reste. Au-delà de 150 $ de lessive déduite sur l’année, il faut un carnet plutôt qu’une estimation."
      },
      {
        "t": "Renouveler un RSA ou un certificat de Food Safety Supervisor",
        "d": "Renouveler un certificat que vous avez déjà, en travaillant dans le poste qui l’exige, est déductible. Le premier ne l’est pas, selon la même distinction que l’ATO applique à un premier permis de conduire."
      },
      {
        "t": "Couteaux et outils de cuisine achetés par vous",
        "d": "Une trousse de couteaux, vos propres couteaux de chef, un thermomètre, une mandoline. Chaque article à 300 $ AUD ou moins est déduit en totalité l’année de l’achat. Un jeu acheté d’un bloc pour 300 $ ou plus compte comme un seul bien, amorti sur sa durée de vie, même si chaque pièce seule serait restée sous 300 $."
      },
      {
        "t": "Tabliers, gants et protections que vous avez payés",
        "d": "Gants résistants à la chaleur, gants anti-coupure, tablier de protection. Déductibles quand ils vous protègent d’un risque du job et que votre employeur ne les a ni fournis ni remboursés."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Que faut-il derrière une déduction en restauration ?",
    "paras": [
      "Les mêmes trois tests que partout : l’argent était le vôtre, personne ne vous l’a rendu, et il a servi à gagner le revenu que vous déclarez. Dans un établissement, cela donne le reçu des chaussures et de la trousse de couteaux, la politique écrite sur les tenues, et un carnet de lessive dès que les machines s’additionnent.",
      "Toute trace montrant le montant, la date, le fournisseur et l’article fait l’affaire, et elle doit tenir cinq ans. Une année de déductions totalisant 300 $ ou moins n’exige aucune preuve écrite. Ce n’est pas le même seuil de 300 $ que celui qui décide si un jeu de couteaux est amorti d’un coup ou sur sa durée de vie."
    ]
  },
  {
    "kind": "traps",
    "h2": "Quelles erreurs font les employés de la restauration ?",
    "intro": "La règle des vêtements piège tout le monde, parce qu’elle semble injuste. Les oublis sont plus discrets et concernent surtout la paie.",
    "wrong": [
      {
        "t": "La tenue toute noire exigée par l’établissement",
        "d": "Pantalon noir uni, chemise noire unie, chaussures noires sans logo. L’ATO regarde ce qu’est l’article, et un vêtement courant reste privé, quoi que dise le dress code."
      },
      {
        "t": "Votre premier RSA",
        "d": "Le certificat payé avant d’avoir le job vous a rendu éligible à l’embauche, ce qui est un coût privé. Une fois que vous travaillez et qu’il faut le renouveler, le renouvellement est déductible."
      },
      {
        "t": "Coiffeur, soins personnels et maquillage pour un standard de salle",
        "d": "L’apparence personnelle reste privée, même si un établissement a un standard écrit à ce sujet."
      },
      {
        "t": "Un repas pendant le service, ou un verre après la fermeture",
        "d": "Les repas du personnel et les verres de fin de service sont privés, que vous ayez payé, eu une réduction ou qu’on vous les ait offerts."
      },
      {
        "t": "Les pourboires en liquide oubliés dans la déclaration",
        "d": "Celle-ci va dans l’autre sens. Les pourboires remis directement sont un revenu imposable même si personne ne les suit. Les pourboires mis en commun et les frais de service versés par la paie sont déjà dans votre income statement, mais le liquide, c’est à vous de le déclarer."
      }
    ],
    "missed": [
      {
        "t": "La lessive d’une tenue à logo, toute l’année",
        "d": "Quelques dollars par semaine que presque personne ne déduit, parce que laver une chemise ne ressemble pas à une affaire fiscale. L’ATO publie le taux, donc il n’y a rien à estimer."
      },
      {
        "t": "Les chaussures antidérapantes, parce que « les vêtements ne sont pas déductibles »",
        "d": "On lit que les vêtements de restauration ne sont pas déductibles, à raison, puis on l’applique aux chaussures de protection, à tort. Les chaussures de protection forment une autre catégorie et sont déductibles."
      },
      {
        "t": "Un deuxième ou troisième employeur qui retient au mauvais taux",
        "d": "Si un établissement n’a jamais reçu votre Tax File Number Declaration, ou n’est pas enregistré auprès de l’ATO comme employeur de working holiday makers, il peut retenir bien plus que le taux habituel. Cela ne se règle que dans une déclaration qui réunit tous les employeurs."
      },
      {
        "t": "Une super répartie sur trois fonds différents",
        "d": "Chaque établissement verse 12 % de super en plus de votre salaire dès le premier dollar, sans minimum de revenu mensuel. Quatre jobs en casual peuvent laisser quatre comptes, chacun avec ses frais, et la plupart des gens n’en trouvent qu’un."
      },
      {
        "t": "Un établissement qui vous a fait payer l’uniforme de façon illégale",
        "d": "Ce n’est pas une déduction. Les retenues sur salaire pour l’uniforme, la lessive, la casse ou les erreurs de caisse sont presque toujours illégales selon le Fair Work Act : c’est de l’argent à récupérer, pas une déduction fiscale."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Qu’est-ce qui relève d’une appréciation et non d’une recherche ?",
    "paras": [
      "D’abord la question des vêtements. Savoir si un article est une tenue obligatoire dépend de son caractère distinctif et de l’exigence de l’employeur. Savoir si des chaussures sont de protection dépend du risque dans votre établissement. Une politique écrite sur les tenues et une photo suffisent en général.",
      "Le côté revenus est celui où un avis professionnel rapporte. Un établissement qui retient au mauvais taux peut laisser une facture derrière lui. Le taux qui convient dépend de votre situation de l’année, y compris d’une décision de justice connue sous le nom d’Addy dont l’effet varie d’une personne à l’autre. C’est examiné au cas par cas, et cela fait partie de notre vérification."
    ]
  }
]

const FAQS = [
  {
    "question": "Puis-je déduire mes chaussures et mon pantalon noirs de travail ?",
    "answer": "Les vêtements noirs unis sans logo ne sont pas déductibles, même si le dress code les exige, car l’ATO les traite comme des vêtements ordinaires et non comme un uniforme.\n\nLes chaussures fermées antidérapantes, c’est différent. Si vous en avez besoin pour un sol de bar mouillé ou un passe de cuisine chargé, ce sont des chaussures de protection et elles sont déductibles, quelle que soit leur couleur."
  },
  {
    "question": "Puis-je déduire mon certificat RSA ?",
    "answer": "Vous pouvez déduire le renouvellement d’un RSA que vous avez déjà, en travaillant dans un poste qui l’exige. Le premier ne l’est pas, car l’ATO traite l’obtention d’une qualification comme un coût privé, comme un premier permis de conduire.\n\nUn certificat de Food Safety Supervisor suit la même règle."
  },
  {
    "question": "Mes pourboires sont-ils imposables ?",
    "answer": "Oui, tous. Les pourboires et frais de service versés par la paie, y compris un système de pourboires mis en commun ou de tronc, font partie de votre salaire, déjà imposé et présent dans votre income statement.\n\nLe liquide remis directement est tout aussi imposable, mais personne ne le suit : tenez une note au fil de l’eau et déclarez le total."
  },
  {
    "question": "Je travaille dans trois établissements. Est-ce que ça change mon impôt ?",
    "answer": "Chaque établissement est un employeur distinct avec sa propre Tax File Number Declaration, sa retenue et son income statement, et chacun doit figurer dans la même déclaration.\n\nUn établissement qui retient au mauvais taux peut laisser une facture derrière lui, et le bon taux dépend de votre situation de l’année."
  },
  {
    "question": "Ai-je droit à la super sur un job de casual en restauration ?",
    "answer": "Oui. Votre employeur verse 12 % de super en plus de votre salaire pour un travail en casual dès le premier dollar, sans seuil minimal de revenu mensuel.\n\nChaque établissement verse de son côté, donc plusieurs jobs signifient en général plus d’un fonds, à retrouver avant de quitter l’Australie."
  }
]

const GUIDES = [
  {
    "href": "/fr/blog/hospitality-award-working-holiday-makers",
    "label": "L’Hospitality Award et ce que vous devriez gagner",
    "desc": "Majoration casual, taux de pénalité et là où les établissements se trompent."
  },
  {
    "href": "/fr/blog/uniform-laundry-deductions-illegal-australia",
    "label": "Uniforme et lessive retenus sur votre paie",
    "desc": "Quand une retenue sur salaire est illégale, et comment la récupérer."
  },
  {
    "href": "/fr/blog/tax-deductions-working-holiday-makers",
    "label": "Les déductions pour les working holiday makers : la liste complète",
    "desc": "Chaque catégorie, avec ce que l’ATO refuse et pourquoi."
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
    "href": "/fr/superannuation",
    "label": "Super"
  }
]

/* Tout ce qui suit le contenu est partagé : les schémas, les tokens et
   chaque rendu de section vivent une seule fois dans JobExpensesPage, pour les 21 pages métier. */
export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'fr',
        path: '/fr/expenses/hospitality',
        articleHeadline: "Restauration en Australie : RSA, chaussures, tenue",
        articleDescription: "Les chaussures antidérapantes et la veste de cuisine sont déductibles. La tenue toute noire imposée par l’établissement, non.",
        inLanguage: "fr",
        photoKey: 'expenses/hospitality',
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
