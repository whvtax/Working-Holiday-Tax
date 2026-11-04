import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'

export const metadata: Metadata = {
  "title": { absolute: "Déductions fiscales PVT en Australie, métier par métier" },
  "description": "Ce que vous pouvez déduire dépend du travail effectué. Listes pour la ferme, la restauration, le chantier, la livraison, le ménage, l’intérim et le FIFO.",
  "keywords": [
    "déductions fiscales PVT Australie",
    "que peut-on déduire en Australie PVT",
    "tax return Australie frais déductibles",
    "ATO déductions working holiday maker",
    "frais professionnels Australie",
    "indemnité kilométrique Australie",
    "visa 417 déductions",
    "visa 462 déductions"
  ],
  "alternates": {
    "canonical": "/fr/expenses",
    "languages": {
      "en-AU": "/expenses",
      "de": "/de/expenses",
      "ja": "/ja/expenses",
      ...newLocaleLanguages('/expenses'),
      "x-default": "/expenses"
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
    "url": `${SITE_URL}/fr/expenses`,
    "siteName": "Working Holiday Tax",
    "title": "Déductions fiscales PVT en Australie, métier par métier",
    "description": "Un fruit picker et un livreur ne déduisent pas la même chose. Trouvez votre métier et voyez ce qui s’applique vraiment."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Déductions fiscales PVT en Australie, métier par métier",
    "description": "Un fruit picker et un livreur ne déduisent pas la même chose. Trouvez votre métier et voyez ce qui s’applique vraiment."
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

const WA = waUrl({ topic: 'expenses', lang: "fr", detail: "Déductions pour mon métier" })

const UI = {
  "ctaLabel": "Écrivez-nous sur WhatsApp",
  "ctaSub": "Réponse en général dans l’heure.",
  "guaranteeHeading": "Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique. La garantie ne s’applique qu’aux déclarations avec revenus sous TFN.",
  "guaranteeBody": "L’impôt des titulaires d’un visa vacances-travail, c’est la seule chose que nous faisons. Votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO.",
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
  }
]

const HERO = {
  "kicker": "Visas vacances-travail 417 et 462",
  "h1lead": "Les déductions ne forment pas une liste unique.",
  "h1accent": "C’est votre liste.",
  "lede": "Sept métiers, chacun avec ses déductions, ses justificatifs et ses frais que l’ATO refuse."
}

/**
 * L’objection avec laquelle chaque lead arrive, traitée côté déductions.
 *
 * La page d’accueil y répond en général. Ici, chaque ligne parle de la case
 * vide : elle accepte n’importe quel chiffre, ne suggère rien et ignore
 * quel métier vous avez fait. Aucune ligne ne dit que myGov est mauvais. Il
 * enregistre une déduction. Il ne décide pas de celles auxquelles vous aviez droit.
 */
const MYGOV_UI = {
  "kicker": "Le faire soi-même",
  "h2lead": "myGov a une case pour les déductions",
  "h2accent": "et aucune idée de ce que votre métier doit y mettre.",
  "lede": "Ce qui va dans cette case, et le justificatif derrière chaque ligne, se règle avant toute saisie.",
  "colLeft": "Sur myGov",
  "colRight": "Avec nous",
  "close": "Vous n’aurez jamais à vous connecter à myGov, à lier une pièce d’identité ou à chercher quel formulaire est lequel. Nous traitons directement avec l’ATO."
}

const MYGOV = [
  {
    "mygov": "La case des déductions est vide. Rien ne suggère ce que votre métier peut déduire.",
    "us": "Nous partons du travail que vous avez fait et nous parcourons la liste qui lui correspond."
  },
  {
    "mygov": "Elle accepte n’importe quel chiffre, même un montant que vous ne pourriez pas justifier.",
    "us": "Nous vous disons quelles dépenses demandent un reçu, lesquelles un relevé bancaire suffit à couvrir, et lesquelles ne tiendront pas."
  },
  {
    "mygov": "Rien n’indique qu’un fruit picker, un barista et un ouvrier du bâtiment ne déduisent pas la même chose.",
    "us": "Sept métiers, chacun avec sa liste et sa règle de justificatifs."
  },
  {
    "mygov": "Le loyer, les repas et le trajet jusqu’au travail ont l’air déductibles. Ils ne le sont pas.",
    "us": "Nous gardons les déductions qui tiennent, pour que rien n’ait à être annulé plus tard."
  }
]

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Que peut déduire un titulaire de visa vacances-travail dans sa tax return australienne ?",
    "paras": [
      "Vous pouvez déduire ce que vous avez dépensé pour gagner le revenu que vous déclarez, à condition de l’avoir payé vous-même et de ne pas avoir été remboursé. Le visa (417 ou 462) ne change rien à la liste.",
      "Ce qui change la liste, c’est le métier. La protection solaire est déductible pour quelqu’un qui cueille des fruits dans un verger à ciel ouvert, pas pour quelqu’un qui travaille derrière un bar."
    ]
  },
  {
    "kind": "occupations",
    "h2": "Quel job avez-vous vraiment fait ?",
    "intro": "Sept pages, chacune sur ce que ce métier peut déduire, et sur ce qu’il déduit à tort.",
    "jobs": [
      {
        "href": "/fr/expenses/farm-work",
        "title": "Travail en ferme et fruit picking",
        "line": "Protection solaire, matériel de cueillette et trajets entre parcelles le même jour."
      },
      {
        "href": "/fr/expenses/hospitality",
        "title": "Restauration et cuisine",
        "line": "Renouvellement du RSA (Responsible Service of Alcohol, le certificat pour servir de l’alcool), chaussures antidérapantes, veste de cuisine, et pourquoi la tenue toute noire n’est pas un uniforme."
      },
      {
        "href": "/fr/expenses/construction",
        "title": "Bâtiment",
        "line": "La règle des 300 $ pour l’outillage, les équipements de protection, et la White Card qui ne se déduit qu’à partir de la deuxième."
      },
      {
        "href": "/fr/expenses/delivery-drivers",
        "title": "Livraison",
        "line": "Frais de voiture et de vélo, part professionnelle du téléphone, et la règle de la GST qui change dès que vous transportez des passagers."
      },
      {
        "href": "/fr/expenses/cleaners",
        "title": "Ménage",
        "line": "Matériel et produits, forfaits de lessive, et le trajet entre deux maisons."
      },
      {
        "href": "/fr/expenses/labouring",
        "title": "Intérim et entrepôts",
        "line": "Plusieurs agences, plusieurs income statements, et les trajets entre deux sites dans la même journée."
      },
      {
        "href": "/fr/expenses/fifo",
        "title": "FIFO et camps",
        "line": "Renouvellement des tickets, équipements de protection, et le Zone Tax Offset auquel presque aucun travailleur en rotation n’a droit."
      }
    ]
  },
  {
    "kind": "numbered",
    "h2": "Que faut-il pour qu’une dépense soit déductible ?",
    "intro": "Trois tests, appliqués à chaque déduction de toutes les pages de ce site. Si l’un échoue, la déduction tombe, même si elle vous paraît liée au travail.",
    "steps": [
      "Vous l’avez payée vous-même, et aucun employeur ni client ne vous l’a remboursée.",
      "La dépense a servi à gagner votre revenu, pas à vous mettre en position de le gagner, et elle n’est ni privée ni domestique.",
      "Vous avez un justificatif qui montre ce que vous avez acheté, quand, à qui et pour combien."
    ],
    "note": "C’est le deuxième test qui fait le plus de dégâts. C’est pour cela que votre première White Card n’est pas déductible, mais son renouvellement l’est."
  },
  {
    "kind": "answer",
    "h2": "Que devez-vous pouvoir prouver ?",
    "paras": [
      "Un reçu, une facture ou un relevé bancaire avec le montant, la date, le fournisseur et ce que c’était. Une photo sur votre téléphone suffit, et vous devez pouvoir la produire pendant cinq ans.",
      "Si le total de vos déductions liées au travail pour l’année est de 300 $ AUD ou moins, vous n’avez pas besoin de preuve écrite. Cette tolérance n’a rien à voir avec la règle des 300 $ pour chaque bien, qui concerne la façon dont un seul objet est amorti."
    ]
  },
  {
    "kind": "note",
    "label": "Change au 1er juillet 2026",
    "title": "La déduction forfaitaire de 1 000 $, ou vos frais réels.",
    "body": "À partir de l’année de revenus 2026-27, l’ATO prévoit une déduction forfaitaire de 1 000 $ pour les frais liés au travail, sans reçu, pour les personnes concernées. Les frais que vous réclamez la réduisent : les deux ne s’additionnent donc pas.\n\nElle s’applique pour la première fois à la déclaration 2026-27, déposée à partir de juillet 2027. La déclaration 2025-26, que la plupart des gens déposent en ce moment, suit encore les anciennes règles."
  },
  {
    "kind": "tables",
    "h2": "Comment calcule-t-on les frais de voiture ?",
    "intro": "Deux méthodes, une seule par voiture et par an. Dans les deux cas, seuls les trajets liés au travail comptent, jamais le trajet ordinaire entre chez vous et un lieu de travail fixe.",
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
    "note": "Au-delà d’environ 5 000 km professionnels par an, le logbook donne en général la déduction la plus élevée, parce qu’il couvre l’essence, l’assurance, l’immatriculation, l’entretien, l’amortissement et les intérêts d’un prêt auto."
  },
  {
    "kind": "traps",
    "h2": "Quelles erreurs reviennent quel que soit le job ?",
    "intro": "La première liste transforme un remboursement en avis rectifié. La seconde, l’argent que personne ne réclame, est plus fréquente et coûte plus cher.",
    "wrong": [
      {
        "t": "Les vêtements ordinaires imposés par un dress code",
        "d": "Pantalon noir, polo uni, bottes classiques, jean. Un vêtement courant ne devient pas un uniforme parce qu’un manager y tient."
      },
      {
        "t": "La première licence, le premier ticket, le premier certificat",
        "d": "Première White Card, premier RSA, premier ticket de cariste. Cette dépense vous a rendu éligible au poste, ce qui n’est pas un coût du travail lui-même. Les renouvellements, une fois que vous travaillez, sont déductibles."
      },
      {
        "t": "Le trajet de chez vous au travail",
        "d": "Le trajet domicile-travail est privé, quelle que soit la distance et l’heure de départ. Le trajet entre deux lieux de travail le même jour est en général déductible."
      },
      {
        "t": "Tout ce qui vous a été remboursé",
        "d": "Si un employeur, une agence ou une plateforme vous a remboursé, ou a fourni l’article, il ne reste aucun coût à votre charge à déduire."
      },
      {
        "t": "Les amendes",
        "d": "Les amendes de stationnement et d’excès de vitesse ne sont jamais déductibles, quoi que vous fassiez à ce moment-là."
      }
    ],
    "missed": [
      {
        "t": "Chaque article à moins de 300 $, déduit en totalité",
        "d": "Bottes, gants, chapeau, lampe frontale, support de téléphone. Chaque article est évalué séparément, donc une année de petits achats finit par compter. La plupart des gens jettent les reçus."
      },
      {
        "t": "Les articles à plus de 300 $, qui restent déductibles",
        "d": "Passer 300 $ ne supprime pas la déduction, ça change le calendrier. Le coût est réparti sur la durée de vie de l’article au lieu d’être déduit d’un coup. Beaucoup entendent « plus de 300 » et s’arrêtent là."
      },
      {
        "t": "Le lavage d’une tenue obligatoire ou de vêtements de protection",
        "d": "L’ATO accepte 1 $ par machine pour les vêtements de travail seuls, ou 0,50 $ par machine quand ils sont lavés avec le reste. Au-delà de 150 $ de lessive déclarée sur l’année, il faut un petit carnet plutôt qu’une estimation."
      },
      {
        "t": "Les trajets entre deux jobs le même jour",
        "d": "Deux fermes, deux maisons, deux entrepôts, deux établissements. Ce trajet est un déplacement professionnel, pas un trajet domicile-travail, et pour qui travaille sur plusieurs sites c’est souvent la plus grosse déduction de la déclaration."
      },
      {
        "t": "Les semaines imposées à 45 % avant l’arrivée du TFN",
        "d": "Ce n’est pas une déduction, mais c’est le même sujet. Si un employeur a retenu au taux maximal pendant que votre Tax File Number Declaration dormait dans un tiroir, cela se règle avec la déclaration. Cela ne se règle pas tout seul."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Qu’est-ce qui dépend de votre situation personnelle ?",
    "paras": [
      "Savoir si vos trajets comptent comme du travail itinérant plutôt que comme un trajet domicile-travail dépend de la façon dont votre semaine était organisée : à quelle fréquence le site changeait, s’il y avait une base fixe, et si votre employeur exigeait ces déplacements.",
      "Votre résidence fiscale est l’autre question, et elle peut peser lourd sur le résultat. C’est une appréciation au cas par cas, la même question que la High Court a tranchée dans l’affaire Addy, et c’est l’ATO qui décide en dernier ressort. Nous la passons en revue avec votre année."
    ]
  }
]

const FAQS = [
  {
    "question": "Puis-je simplement saisir mes déductions moi-même ?",
    "answer": "Oui, et déposer est vraiment la partie facile. La case des déductions est vide et accepte n’importe quel chiffre.\n\nSavoir quels frais viennent de votre travail, et ce qu’il y a derrière chacun, est une appréciation sur l’année que vous avez vécue, pas un champ à remplir."
  },
  {
    "question": "Les titulaires d’un visa vacances-travail ont-ils moins de déductions que les Australiens ?",
    "answer": "Non. Les règles de déduction sont les mêmes pour un titulaire de visa 417 ou 462 que pour toute personne qui perçoit un revenu australien.\n\nLa différence est côté revenus : le taux appliqué à votre revenu dépend de votre situation de l’année, notamment de votre résidence fiscale, et c’est examiné au cas par cas."
  },
  {
    "question": "J’ai fait quatre jobs différents dans l’année. Cela fait-il quatre listes ?",
    "answer": "Vous déposez une seule déclaration pour l’année fiscale, et elle contient toutes les déductions de tous les jobs. L’important est que chaque dépense soit liée à un travail que vous faisiez à ce moment-là.\n\nDes bottes achetées pour un job en entrepôt en septembre et de la crème solaire achetée pour un job en ferme en janvier vont dans la même déclaration. Les employeurs différents ne séparent rien."
  },
  {
    "question": "Et si j’ai perdu mes reçus ?",
    "answer": "Un relevé bancaire qui montre le montant, la date et le fournisseur est en général accepté quand le reçu a disparu.\n\nSi l’ensemble de vos déductions de l’année ne dépasse pas 300 $, aucune preuve écrite n’est nécessaire, seulement une base sérieuse pour le chiffre. Ce qu’il ne faut pas faire : inventer un montant et espérer."
  },
  {
    "question": "Puis-je déduire le loyer, la nourriture ou les déplacements en Australie ?",
    "answer": "Non. Le logement, les courses et les frais pour se déplacer sont des dépenses de la vie privée, même si vous avez déménagé dans une ville de campagne pour un job.\n\nL’exception étroite, ce sont les déplacements exigés par l’employeur qui vous tiennent éloigné de chez vous la nuit. Ils suivent une autre règle et d’autres justificatifs."
  },
  {
    "question": "Est-ce que ça vaut le coup si je n’ai travaillé que quelques mois ?",
    "answer": "En général, oui. Un court séjour entraîne quand même de vrais frais, et chaque dollar déduit réduit le revenu sur lequel l’impôt est calculé.\n\nSur une année courte, le gros enjeu n’est souvent pas dans les déductions, mais dans les semaines imposées à 45 % avant que votre Tax File Number n’arrive chez l’employeur, et dans la question de savoir si votre résidence fiscale a été déclarée correctement."
  }
]

const GUIDES = [
  {
    "href": "/fr/blog/tax-deductions-working-holiday-makers",
    "label": "Les déductions pour les working holiday makers : la liste complète",
    "desc": "Chaque catégorie, avec ce que l’ATO refuse et pourquoi."
  },
  {
    "href": "/fr/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "La déduction immédiate de 300 $ pour l’outillage",
    "desc": "Pourquoi chaque article est évalué séparément, et ce que change un lot."
  },
  {
    "href": "/fr/blog/1000-dollar-instant-deduction-rule-2026",
    "label": "La déduction forfaitaire de 1 000 $ dès 2026-27",
    "desc": "Une déduction sans reçus pour les personnes concernées. Les frais réclamés la réduisent."
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

/* Le hub passe par le même gabarit partagé que les sept pages métier,
   avec en plus le bloc de comparaison myGov, et sans le lien « autres jobs »
   (c’est la page vers laquelle ce lien pointe). */
export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'fr',
        path: '/fr/expenses',
        articleHeadline: "Déductions fiscales PVT en Australie, métier par métier",
        articleDescription: "Un fruit picker et un livreur ne déduisent pas la même chose. Trouvez votre métier et voyez ce qui s’applique vraiment.",
        inLanguage: "fr",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
        mygov: { ui: MYGOV_UI, rows: MYGOV },
        hubLink: false,
        heroSlot: { id: 'IMG-W30', subject: 'Seven working holiday jobs in one frame: fruit picking, kitchen, building site, delivery bike, cleaning, warehouse, camp', alt: "Backpackers au travail en Australie avec un visa vacances-travail" },
      }}
    />
  )
}
