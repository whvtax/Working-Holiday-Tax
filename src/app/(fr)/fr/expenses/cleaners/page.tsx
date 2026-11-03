import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { type Section } from '@/components/expenses/JobExpensesPage'
import { JobExpensesWhtPage } from '@/components/wht/JobPageBlocks'

export const metadata: Metadata = {
  "title": { absolute: "Ménage en Australie : déductions matériel, lessive, trajets" },
  "description": "Ce que les cleaners peuvent déduire : matériel et produits, protections, lessive de la tenue au taux de l’ATO et trajets entre deux jobs.",
  "keywords": [
    "déductions fiscales ménage Australie",
    "cleaner PVT tax return",
    "matériel de nettoyage déduction ATO",
    "femme de ménage ABN Australie",
    "trajet entre deux jobs déduction",
    "lessive uniforme déduction ATO",
    "cleaner working holiday impôts",
    "Airtasker ménage impôts Australie"
  ],
  "alternates": {
    "canonical": "/fr/expenses/cleaners",
    "languages": {
      "en-AU": "/expenses/cleaners",
      "de": "/de/expenses/cleaners",
      "ja": "/ja/expenses/cleaners",
      ...newLocaleLanguages('/expenses/cleaners'),
      "x-default": "/expenses/cleaners"
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
    "url": `${SITE_URL}/fr/expenses/cleaners`,
    "siteName": "Working Holiday Tax",
    "title": "Ménage en Australie : déductions matériel, lessive, trajets",
    "description": "Le trajet entre deux maisons est souvent la plus grosse déduction d’un cleaner, et presque personne ne la fait."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Ménage en Australie : déductions matériel, lessive, trajets",
    "description": "Le trajet entre deux maisons est souvent la plus grosse déduction d’un cleaner, et presque personne ne la fait."
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

const WA = waUrl({ topic: 'expenses', lang: "fr", detail: "Travail de ménage" })

const UI = {
  "ctaLabel": "Écrivez-nous sur WhatsApp",
  "ctaSub": "Réponse en général dans l’heure.",
  "guaranteeHeading": "Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique.",
  "guaranteeBody": "Des déclarations de cleaners arrivent chaque semaine sur notre bureau, et toutes concernent des titulaires d’un visa 417 ou 462. Chaque déclaration est vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO.",
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
    "name": "Ménage",
    "item": "/fr/expenses/cleaners"
  }
]

const HERO = {
  "kicker": "Maisons, bureaux, fins de bail et jobs via appli",
  "h1lead": "Le trajet entre deux maisons, c’est la déduction.",
  "h1accent": "Presque personne ne la fait.",
  "lede": "Les produits, les gants et la lessive de la tenue au taux de l’ATO figurent aussi sur la liste."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Que peut déduire un cleaner dans sa tax return ?",
    "paras": [
      "Un cleaner peut déduire le matériel et les produits de nettoyage achetés de sa poche, les protections comme les gants, le tablier ou les chaussures de sécurité, la lessive d’une tenue obligatoire ou de vêtements de protection, et les trajets entre un job de ménage et le suivant dans la même journée. Tout ce que le client ou l’employeur fournit ou rembourse est exclu.",
      "Trois maisons dans la journée, cela fait deux trajets déductibles, et sur une année cela peut représenter une part importante de vos déductions."
    ]
  },
  {
    "kind": "items",
    "h2": "Les déductions propres à ce métier",
    "intro": "La plupart du matériel de ménage coûte moins de 300 $ AUD, donc il se déduit en totalité l’année de l’achat au lieu d’être amorti lentement.",
    "items": [
      {
        "t": "Les trajets entre deux jobs de ménage",
        "d": "Le trajet d’une maison ou d’un bureau au suivant, une fois la journée commencée, est un déplacement entre lieux de travail et non un trajet domicile-travail. Il est déductible. Utilisez la méthode cents per kilometre ou un logbook."
      },
      {
        "t": "Matériel et produits de nettoyage",
        "d": "Balais, seaux, grattoirs, chiffons, produits et consommables que vous achetez vous-même. Chaque article à 300 $ ou moins est déduit en totalité l’année de l’achat. Un kit de départ acheté d’un bloc pour 300 $ ou plus compte comme un seul bien, amorti sur sa durée de vie, même si chaque pièce seule serait passée sous le seuil."
      },
      {
        "t": "Gros matériel à 300 $ ou plus",
        "d": "Un aspirateur professionnel, une monobrosse, un nettoyeur haute pression. Toujours déductible, mais réparti sur la durée de vie de l’appareil."
      },
      {
        "t": "Équipements de protection",
        "d": "Gants, tablier, lunettes de sécurité ou visière pour les jobs avec des produits forts ou de la poussière, chaussures de sécurité pour les chantiers et le commercial. Ils sont éligibles parce qu’ils vous protègent d’un risque du travail."
      },
      {
        "t": "La lessive des vêtements de travail déductibles",
        "d": "Laver une tenue obligatoire ou de vrais vêtements de protection se déduit au taux de l’ATO : 1 $ par machine pour les vêtements de travail seuls, ou 0,50 $ par machine lavés avec le reste. Au-delà de 150 $ de lessive déduite sur l’année, tenez un carnet plutôt qu’une estimation."
      },
      {
        "t": "La part pro de votre téléphone",
        "d": "Elle est réelle pour qui prend des réservations, utilise une appli ou écrit aux clients au sujet des clés et des accès. Déduisez le pourcentage professionnel sur une base raisonnable, pas tout le forfait."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Que doit conserver un cleaner ?",
    "paras": [
      "Trois tests derrière chaque déduction : vous avez payé, personne ne vous a remboursé, et l’argent a servi à gagner le revenu que vous déclarez. Pour un cleaner, cela veut dire les reçus des produits et du matériel, et une trace des dates, des adresses et des kilomètres derrière les trajets.",
      "Un reçu, une facture, un relevé bancaire ou une photo sur le téléphone montrant le montant, la date, le fournisseur et l’article, à conserver cinq ans. Sous 300 $ de déductions professionnelles pour toute l’année, aucune preuve écrite n’est nécessaire. Ce n’est pas le même seuil de 300 $ que celui qui décide de la façon dont un seul aspirateur est amorti."
    ]
  },
  {
    "kind": "tables",
    "h2": "Comment calcule-t-on les frais de voiture ?",
    "intro": "Deux méthodes, une seule par voiture et par an. Pour un cleaner, seuls les trajets entre les jobs comptent, jamais le trajet de chez soi à la première maison.",
    "tables": [
      {
        "label": "Cents per kilometre (forfait au kilomètre)",
        "rows": [
          [
            "Taux 2024-25 et 2025-26",
            "0,88 $ par km"
          ],
          [
            "Taux à partir de 2026-27",
            "0,91 $ par km"
          ],
          [
            "Maximum",
            "5 000 km par voiture et par an"
          ],
          [
            "Justificatifs",
            "Pas obligatoires, mais vous devez montrer comment vous avez calculé les kilomètres"
          ]
        ]
      },
      {
        "label": "Logbook (carnet de bord)",
        "rows": [
          [
            "Principe",
            "Vous déduisez le pourcentage professionnel de chaque frais réel d’utilisation"
          ],
          [
            "Période du logbook",
            "12 semaines consécutives, valable cinq ans"
          ],
          [
            "Maximum",
            "Aucun plafond. Il suit votre part réelle d’usage professionnel"
          ],
          [
            "Justificatifs",
            "Obligatoires pour chaque dépense déduite"
          ]
        ]
      }
    ],
    "note": "Trois ou quatre adresses par jour dépassent 5 000 kilomètres plus vite que la plupart des cleaners ne le pensent, et au-delà le logbook l’emporte en général, parce qu’il couvre l’essence, l’assurance, l’immatriculation, l’entretien, l’amortissement et les intérêts du prêt."
  },
  {
    "kind": "traps",
    "h2": "Quelles erreurs font les cleaners ?",
    "intro": "Les déductions à tort tournent autour des vêtements et du premier trajet de la journée. Les oublis concernent presque tous les trajets.",
    "wrong": [
      {
        "t": "Le pantalon noir uni et le polo uni",
        "d": "Même si un client ou une agence impose une couleur, un vêtement courant reste privé. L’eau de Javel qui l’abîme ne le rend pas déductible."
      },
      {
        "t": "Le premier et le dernier trajet de la journée",
        "d": "De chez vous au premier job, et du dernier job jusqu’à chez vous, c’est le trajet domicile-travail ordinaire. Seuls les trajets entre les deux sont déductibles, sauf si vous remplissez l’exception du matériel encombrant."
      },
      {
        "t": "Les produits et le matériel fournis par le client",
        "d": "Si les produits sont rangés sous l’évier de la maison, ou si l’entreprise fournit le matériel, aucun coût ne reste à votre charge à déduire. Même chose pour tout ce qui vous a été remboursé."
      },
      {
        "t": "Croire qu’un ABN autorise à tout déduire",
        "d": "Avoir un ABN ne transforme pas une dépense privée en frais professionnels. Votre téléphone, votre voiture et vos vêtements restent répartis au prorata."
      },
      {
        "t": "Penser que les jobs payés en liquide n’ont pas à être déclarés",
        "d": "Un revenu de ménage est un revenu, qu’il arrive par virement, par versement d’une appli ou dans une enveloppe."
      }
    ],
    "missed": [
      {
        "t": "Les trajets entre deux jobs",
        "d": "Les cleaners font trois ou quatre adresses par jour et ne déduisent aucun trajet, parce que ça ne ressemble pas à un déplacement pro. Notez la date, les adresses et les kilomètres au fur et à mesure."
      },
      {
        "t": "Chaque flacon et chaque chiffon, un achat après l’autre",
        "d": "Les consommables s’achètent sans arrêt et on garde presque jamais le reçu. Une photo du reçu dans un album du téléphone suffit."
      },
      {
        "t": "La lessive, à un taux publié",
        "d": "Laver des vêtements de protection et une tenue obligatoire est déductible à 1 $ ou 0,50 $ par machine, et presque personne ne sait que ce taux existe."
      },
      {
        "t": "L’équipement acheté pour se lancer",
        "d": "Le matériel et les produits achetés à l’époque où vous avez enregistré un ABN et commencé à chercher des clients sont en général déductibles, même si la première facture est arrivée plus tard. Un long écart entre l’achat et le premier job fragilise cette déduction, alors gardez les dates."
      },
      {
        "t": "Les semaines retenues au mauvais taux par une entreprise de ménage",
        "d": "Si une entreprise n’a jamais reçu votre Tax File Number Declaration, ou n’est pas enregistrée auprès de l’ATO comme employeur de working holiday makers, bien plus que le taux habituel a pu être retenu. Cela se règle avec la déclaration, et pas avant."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Qu’est-ce qui change selon le client pour qui vous travaillez ?",
    "paras": [
      "Indépendant ou salarié, c’est la première bifurcation. Les maisons de particuliers, les fins de bail et les réservations via des applis comme Airtasker, c’est un revenu sous ABN : vous fixez le prix, vous facturez, rien n’est retenu, aucune super n’est versée.",
      "Être affecté à des sites et à des horaires par une entreprise de ménage, c’est un emploi sous TFN, avec l’impôt retenu et la super en plus.",
      "Une entreprise qui a fixé votre planning, supervisé votre travail et fourni les produits, puis vous a demandé d’obtenir un ABN, peut être un employeur qui porte une étiquette de prestataire.",
      "Pour un indépendant, la GST ne devient obligatoire que lorsque le chiffre d’affaires du ménage dépasse 75 000 $ dans l’année, ce que le ménage à temps partiel approche rarement.",
      "La résidence fiscale se trouve sous tout cela et peut peser lourd sur le résultat. Une décision de justice connue sous le nom d’Addy existe, et son effet varie d’une personne à l’autre : il ne faut pas le présumer. Cela dépend des faits de votre année, et cela fait partie de notre vérification."
    ]
  }
]

const FAQS = [
  {
    "question": "Puis-je déduire le trajet entre deux jobs de ménage ?",
    "answer": "Oui. Aller d’un job de ménage au suivant dans la même journée est un déplacement entre lieux de travail, pas un trajet domicile-travail, et il est déductible avec la méthode cents per kilometre ou un logbook.\n\nLe premier trajet depuis chez vous et le dernier jusqu’à chez vous ne le sont pas, sauf si vous transportez du matériel encombrant qui ne peut pas être rangé en sécurité sur les sites."
  },
  {
    "question": "Quel matériel et quels produits de ménage puis-je déduire ?",
    "answer": "Tout ce que vous avez acheté vous-même et qui ne vous a pas été remboursé : balais, seaux, grattoirs, chiffons, produits et consommables.\n\nLes articles à 300 $ ou moins chacun se déduisent en totalité l’année de l’achat. Un aspirateur professionnel ou une monobrosse à plus de 300 $ se déduit sur sa durée de vie."
  },
  {
    "question": "Puis-je déduire ma tenue et son lavage ?",
    "answer": "Vous pouvez déduire une tenue obligatoire que votre employeur ou votre client ne fournit pas, et des protections avec une vraie fonction de sécurité comme des gants, un tablier ou des chaussures de sécurité. Un pantalon noir uni et un polo uni, non.\n\nLe lavage de vêtements de travail déductibles se déduit à 1 $ par machine pour les vêtements de travail seuls, ou 0,50 $ par machine mélangés au linge de tous les jours, avec un carnet dès que les montants dépassent 150 $ sur l’année."
  },
  {
    "question": "Dois-je m’inscrire à la GST comme cleaner avec un ABN ?",
    "answer": "Seulement quand votre chiffre d’affaires de ménage dépasse 75 000 $ sur une année. C’est le seuil général des indépendants, pas une règle propre au ménage, et le ménage à temps partiel en est rarement proche. En dessous, vous facturez sans ligne de GST."
  },
  {
    "question": "Suis-je indépendant ou salarié ?",
    "answer": "Regardez qui contrôle le travail, pas le nom que donnent les papiers. Si vous fixez votre prix, choisissez les jobs que vous prenez et pourriez envoyer quelqu’un d’autre, c’est un travail d’indépendant sous ABN.\n\nSi une autre entreprise fixe votre planning, vous supervise et fournit les produits, c’est un emploi quelle que soit l’étiquette du contrat, avec l’impôt et la super à payer.\n\nBeaucoup de cleaners sont les deux dans la même année."
  }
]

const GUIDES = [
  {
    "href": "/fr/blog/abn-deductions-business-expenses",
    "label": "Les frais professionnels quand on travaille sous ABN",
    "desc": "Ce qu’un indépendant peut déduire, et où passe la limite."
  },
  {
    "href": "/fr/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "La déduction immédiate de 300 $ pour l’outillage",
    "desc": "Pourquoi chaque article est évalué séparément, et ce que change un lot."
  },
  {
    "href": "/fr/blog/tax-deductions-working-holiday-makers",
    "label": "Les déductions pour les working holiday makers : la liste complète",
    "desc": "Chaque catégorie, avec ce que l’ATO refuse et pourquoi."
  }
]

const SERVICES = [
  {
    "href": "/fr/abn",
    "label": "ABN"
  },
  {
    "href": "/fr/tfn",
    "label": "TFN"
  },
  {
    "href": "/fr/tax-return",
    "label": "Tax return"
  }
]

/* Tout ce qui suit le contenu est partagé : les schémas, les tokens et
   chaque rendu de section vivent une seule fois dans JobExpensesPage, pour les 21 pages métier. */
export default function Page() {
  return (
    <JobExpensesWhtPage
      content={{
        lang: 'fr',
        path: '/fr/expenses/cleaners',
        articleHeadline: "Ménage en Australie : déductions matériel, lessive, trajets",
        articleDescription: "Le trajet entre deux maisons est souvent la plus grosse déduction d’un cleaner, et presque personne ne la fait.",
        inLanguage: "fr",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
