import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { type Section } from '@/components/expenses/JobExpensesPage'
import { JobExpensesWhtPage } from '@/components/wht/JobPageBlocks'

export const metadata: Metadata = {
  "title": { absolute: "Intérim et entrepôts en Australie : déductions fiscales PVT" },
  "description": "Ce que les manœuvres placés par une agence d’intérim peuvent déduire : protections, tickets, outils et trajets entre deux sites.",
  "keywords": [
    "déductions fiscales intérim Australie",
    "labour hire PVT tax return",
    "entrepôt working holiday impôts",
    "plusieurs agences d’intérim income statement",
    "ticket cariste renouvellement déduction",
    "trajet entre deux sites déduction ATO",
    "manœuvre PVT Australie impôts",
    "agence labour hire impôts Australie"
  ],
  "alternates": {
    "canonical": "/fr/expenses/labouring",
    "languages": {
      "en-AU": "/expenses/labouring",
      "de": "/de/expenses/labouring",
      "ja": "/ja/expenses/labouring",
      ...newLocaleLanguages('/expenses/labouring'),
      "x-default": "/expenses/labouring"
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
    "url": `${SITE_URL}/fr/expenses/labouring`,
    "siteName": "Working Holiday Tax",
    "title": "Intérim et entrepôts en Australie : déductions fiscales PVT",
    "description": "Deux agences, deux income statements. Deux sites dans la même journée, une déduction que presque personne ne fait."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Intérim et entrepôts en Australie : déductions fiscales PVT",
    "description": "Deux agences, deux income statements. Deux sites dans la même journée, une déduction que presque personne ne fait."
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

const WA = waUrl({ topic: 'expenses', lang: "fr", detail: "Intérim (labour hire) et entrepôts" })

const UI = {
  "ctaLabel": "Écrivez-nous sur WhatsApp",
  "ctaSub": "Réponse en général dans l’heure.",
  "guaranteeHeading": "Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique.",
  "guaranteeBody": "Réunir quatre agences et un shift oublié dans une seule déclaration, c’est notre travail ordinaire, et tous nos clients sont en 417 ou 462. Chaque déclaration est vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO.",
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
    "name": "Intérim",
    "item": "/fr/expenses/labouring"
  }
]

const HERO = {
  "kicker": "Entrepôts, déménagements, paysagisme, événementiel",
  "h1lead": "Deux agences, deux income statements.",
  "h1accent": "Deux sites, une déduction.",
  "lede": "Une agence oubliée coûte plus cher qu’un reçu manquant, et une seule déclaration doit les porter toutes."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Que peut déduire un manœuvre placé par une agence dans sa tax return ?",
    "paras": [
      "Un travailleur en labour hire peut déduire les protections exigées par le poste d’accueil, le renouvellement d’un ticket d’opérateur qu’il possède déjà, les outils achetés de sa poche, le trajet entre deux lieux de travail dans la même journée et la part professionnelle de son téléphone. Ce qui est déductible suit le travail que vous faisiez ce jour-là, pas l’intitulé du contrat avec l’agence.",
      "Une semaine dans un entrepôt frigorifique, une semaine dans une équipe de paysagistes et un week-end de démontage pour un événement créent trois ensembles de frais différents."
    ]
  },
  {
    "kind": "items",
    "h2": "Les déductions propres à ce métier",
    "intro": "Chacune suit le poste d’accueil. Demandez ce que le site exigeait, pas comment l’agence vous appelait.",
    "items": [
      {
        "t": "Trajet entre deux sites dans la même journée",
        "d": "Un entrepôt le matin et un autre site l’après-midi, c’est un trajet entre lieux de travail, et il est déductible. Le premier trajet depuis chez vous reste un trajet domicile-travail."
      },
      {
        "t": "Les protections exigées par le site d’accueil",
        "d": "Chaussures de sécurité, gants, tenue haute visibilité, lunettes de protection, protection auditive, manchon anti-coupure. Déductibles quand l’article vous protège d’un risque identifiable sur ce poste et que vous l’avez payé vous-même."
      },
      {
        "t": "Renouveler un ticket de cariste, d’EWP ou un autre ticket d’opérateur",
        "d": "Renouveler un ticket que vous avez déjà et utilisez pour le travail est déductible. Le premier ne l’est pas, selon le même principe qui garde une première White Card dans le privé."
      },
      {
        "t": "Outils et matériel achetés par vous",
        "d": "Tout ce que vous avez acheté sans remboursement est déductible : 300 $ AUD ou moins en totalité l’année de l’achat, au-delà sur la durée de vie de l’article."
      },
      {
        "t": "Vêtements de protection contre le froid et les intempéries",
        "d": "Une veste grand froid pour un entrepôt réfrigéré ou surgelé, des vêtements de pluie pour du paysagisme en extérieur. Ce sont des vêtements de protection et non des vêtements courants, parce qu’ils existent pour vous protéger d’une condition que le travail vous impose."
      },
      {
        "t": "La part pro de votre téléphone",
        "d": "Les agences fonctionnent par messages : propositions de shifts à six heures du matin, adresses de sites, timesheets. Le pourcentage professionnel de votre forfait est déductible quand vous utilisez votre propre téléphone pour cela."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Que faut-il garder d’un placement à l’autre ?",
    "paras": [
      "Une déduction, trois tests : vous avez payé, personne ne vous a remboursé, et l’argent a servi à gagner le revenu que vous déclarez. D’un placement à l’autre, cela donne les reçus des chaussures et des gants achetés, le renouvellement du ticket, et une note des dates, des sites et des distances derrière les trajets.",
      "La preuve peut être un reçu, une facture, un relevé bancaire ou une photo sur le téléphone indiquant le montant, la date, le fournisseur et l’article, à conserver cinq ans. Des déductions professionnelles de 300 $ ou moins pour toute l’année n’exigent aucune preuve écrite. Ce n’est pas le même seuil de 300 $ que celui qui décide si un équipement est amorti d’un coup ou sur sa durée de vie."
    ]
  },
  {
    "kind": "traps",
    "h2": "Quelles erreurs font les travailleurs en labour hire ?",
    "intro": "Les déductions à tort concernent surtout les vêtements et le trajet domicile-travail. Les oublis tiennent presque tous au nombre d’employeurs, ce qui est la façon dont le labour hire fait perdre de l’argent.",
    "wrong": [
      {
        "t": "Pantalon et chaussures de travail sans fonction de protection",
        "d": "Un pantalon de travail uni, un t-shirt, des chaussures ordinaires simplement solides. Un vêtement courant reste privé, quelle que soit la dureté du travail et la vitesse à laquelle il s’use."
      },
      {
        "t": "Le trajet jusqu’à un seul site régulier",
        "d": "Si une agence vous place dans le même entrepôt pendant deux mois, le trajet est un trajet domicile-travail ordinaire, pas un déplacement itinérant. Ce qui rend un trajet déductible, c’est de passer d’un lieu de travail à un autre, pas le fait qu’une agence vous ait envoyé."
      },
      {
        "t": "L’équipement remis par l’agence",
        "d": "La plupart des agences fournissent la tenue haute visibilité et parfois les chaussures. Si l’article vous a été remis ou remboursé, il ne reste aucun coût à déduire."
      },
      {
        "t": "Un premier ticket, traité comme un frais de travail",
        "d": "Le permis de cariste payé pour que l’agence vous propose est un coût pour devenir éligible, pas un coût du travail. Les renouvellements une fois placé sont déductibles."
      },
      {
        "t": "Croire que l’agence s’est occupée de votre impôt",
        "d": "Une agence retient l’impôt et déclare votre salaire. Elle ne dépose pas votre déclaration, ne déduit pas vos frais, et ne vérifie pas si les deux autres agences ont bien vos données."
      }
    ],
    "missed": [
      {
        "t": "L’income statement d’une agence oubliée",
        "d": "Trois semaines avec une agence en mars, un shift dans un autre État en juin, et la déclaration part sans eux. Pire qu’une déduction ratée, car cela signifie une rectification plus tard."
      },
      {
        "t": "Les trajets entre deux sites dans la même journée",
        "d": "Fréquents avec les agences qui déplacent une équipe, et presque jamais déduits parce que quelqu’un d’autre a décidé du déplacement. C’est quand même un trajet déductible entre lieux de travail."
      },
      {
        "t": "Chaussures et gants achetés entre deux placements",
        "d": "L’équipement acheté pour pouvoir prendre le job suivant se paie dans l’urgence et n’a jamais de reçu. Chaque article à moins de 300 $ est une déduction complète l’année de l’achat."
      },
      {
        "t": "Un renouvellement de ticket payé en liquide",
        "d": "Les renouvellements de cariste et d’EWP sont assez peu chers pour être oubliés en juillet, et sont déductibles quand vous travaillez déjà avec le ticket."
      },
      {
        "t": "Des semaines retenues au mauvais taux",
        "d": "Une nouvelle agence qui n’a pas traité votre Tax File Number Declaration, ou qui n’est pas enregistrée auprès de l’ATO comme employeur de working holiday makers, retient bien plus de 15 %. Cela revient avec la déclaration qui réunit toutes les agences."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Qu’est-ce qui dépend du déroulement de votre année ?",
    "paras": [
      "Le degré d’itinérance du travail décide de la part de trajet déductible, et c’est une question de faits, pas une règle. La fréquence des changements de site, l’existence d’une base qui vous ramenait toujours au même endroit et l’obligation du déplacement par l’agence entrent tous en compte. Deux personnes de la même agence peuvent obtenir des déductions de trajet très différentes.",
      "Chaque agence est un employeur distinct avec sa propre Tax File Number Declaration, sa relation de retenue et son income statement. Le risque est souvent un taux mal appliqué par l’une d’elles, ou un employeur absent de la déclaration.",
      "La résidence fiscale se trouve sous tout cela. Une décision de justice connue sous le nom d’Addy existe, et son effet varie d’une personne à l’autre : il ne faut pas le présumer. Cela dépend des faits de votre année, et cela fait partie de notre vérification."
    ]
  }
]

const FAQS = [
  {
    "question": "Je suis inscrit dans trois agences. Est-ce que ça change mon impôt ?",
    "answer": "Chaque agence est juridiquement un employeur distinct, avec sa propre Tax File Number Declaration, sa retenue et son income statement. Toutes vont dans une seule déclaration.\n\nLe taux appliqué à votre salaire dépend de votre situation de l’année : le vrai risque, c’est qu’une agence soit laissée de côté."
  },
  {
    "question": "Puis-je déduire les trajets entre différents sites de travail ?",
    "answer": "En général, oui. Le trajet entre deux lieux de travail distincts, un entrepôt le matin et un autre site l’après-midi, est déductible d’une façon que votre trajet de chez vous à un lieu de travail habituel ne l’est pas.\n\nLa part qui est éligible dépend du degré d’itinérance, donc notez les dates, les sites et les distances."
  },
  {
    "question": "En quoi l’intérim diffère-t-il du bâtiment pour l’impôt ?",
    "answer": "Les tests sont identiques, pas les articles. Le travail sur un chantier exige en général une White Card et les EPI standard de chantier. Le labour hire général couvre les entrepôts, les déménagements, le paysagisme, les chaînes de production et les événements, où l’équipement suit le poste d’accueil et où la White Card n’est souvent pas nécessaire.\n\nSi vos placements sont sur des chantiers, la page Bâtiment va plus loin."
  },
  {
    "question": "Puis-je déduire un permis de cariste ?",
    "answer": "Vous pouvez déduire le renouvellement d’un permis que vous avez déjà et utilisez pour le travail. Obtenir le ticket au départ n’est pas déductible, car l’ATO traite la qualification pour un travail comme un coût privé.\n\nUn ticket EWP, une White Card et un permis de conduire suivent la même règle."
  },
  {
    "question": "Je n’ai fait que quelques shifts. Est-ce que ça vaut la peine de déduire quelque chose ?",
    "answer": "En général, oui, à condition d’avoir payé vous-même et de ne pas avoir été remboursé. Même quelques shifts peuvent impliquer des chaussures, des gants, un renouvellement de ticket ou des trajets entre sites, et chaque dollar déduit réduit le revenu sur lequel l’impôt est calculé.\n\nLe test ne change pas avec le nombre de shifts."
  }
]

const GUIDES = [
  {
    "href": "/fr/blog/labour-hire-agencies-working-holiday-australia",
    "label": "Les agences de labour hire et leur fonctionnement",
    "desc": "Qui est réellement votre employeur quand une agence vous place."
  },
  {
    "href": "/fr/blog/white-card-australia-working-holiday",
    "label": "La White Card, et ce qu’elle vous coûte",
    "desc": "Comment l’obtenir, et pourquoi la première n’est pas déductible."
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
    "href": "/fr/superannuation",
    "label": "Super"
  }
]

/* Tout ce qui suit le contenu est partagé : les schémas, les tokens et
   chaque rendu de section vivent une seule fois dans JobExpensesWhtPage, pour les 21 pages métier. */
export default function Page() {
  return (
    <JobExpensesWhtPage
      content={{
        lang: 'fr',
        path: '/fr/expenses/labouring',
        articleHeadline: "Intérim et entrepôts en Australie : déductions fiscales PVT",
        articleDescription: "Deux agences, deux income statements. Deux sites dans la même journée, une déduction que presque personne ne fait.",
        inLanguage: "fr",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
