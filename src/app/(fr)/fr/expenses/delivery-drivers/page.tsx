import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'

export const metadata: Metadata = {
  "title": { absolute: "Livreur en Australie : déductions voiture, téléphone, GST" },
  "description": "Ce que les livreurs Uber Eats, DoorDash, Menulog et Amazon Flex peuvent déduire : frais de voiture ou de vélo, part pro du téléphone, sac et équipement.",
  "keywords": [
    "déductions fiscales livreur Australie",
    "Uber Eats impôts PVT",
    "DoorDash impôts Australie",
    "livreur Uber Eats tax return",
    "indemnité kilométrique livreur Australie",
    "ABN livreur PVT",
    "seuil GST Australie rideshare",
    "livreur à vélo déductions Australie"
  ],
  "alternates": {
    "canonical": "/fr/expenses/delivery-drivers",
    "languages": {
      "en-AU": "/expenses/delivery-drivers",
      "de": "/de/expenses/delivery-drivers",
      "ja": "/ja/expenses/delivery-drivers",
      ...newLocaleLanguages('/expenses/delivery-drivers'),
      "x-default": "/expenses/delivery-drivers"
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
    "url": `${SITE_URL}/fr/expenses/delivery-drivers`,
    "siteName": "Working Holiday Tax",
    "title": "Livreur en Australie : déductions voiture, téléphone, GST",
    "description": "Vos kilomètres et la part pro de votre téléphone font l’essentiel. Les amendes et le trajet privé n’ont jamais compté."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Livreur en Australie : déductions voiture, téléphone, GST",
    "description": "Vos kilomètres et la part pro de votre téléphone font l’essentiel. Les amendes et le trajet privé n’ont jamais compté."
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

const WA = waUrl({ topic: 'expenses', lang: "fr", detail: "Livraison et rideshare" })

const UI = {
  "ctaLabel": "Écrivez-nous sur WhatsApp",
  "ctaSub": "Réponse en général dans l’heure.",
  "guaranteeHeading": "Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique.",
  "guaranteeBody": "Les livreurs en visa 417 et 462 représentent une bonne part de notre activité. C’est pourquoi la question du logbook et la frontière de la GST sont réglées avant que la déclaration soit rédigée. Chaque déclaration est vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO.",
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
    "name": "Livraison",
    "item": "/fr/expenses/delivery-drivers"
  }
]

const HERO = {
  "kicker": "Uber Eats, DoorDash, Menulog, Amazon Flex",
  "h1lead": "Vos kilomètres sont la déduction.",
  "h1accent": "Presque tout le reste est secondaire.",
  "lede": "Cents per kilometre ou logbook, une seule méthode par voiture et par an. Se tromper de méthode est l’erreur la plus coûteuse du métier."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Que peut déduire un livreur ou un rider dans sa tax return ?",
    "paras": [
      "Un livreur peut déduire la part professionnelle des frais de sa voiture, de son vélo ou de son scooter, la part professionnelle de son téléphone et de son forfait data, le parking payé pendant le travail, le nettoyage qui garde le véhicule apte à transporter de la nourriture, et l’équipement acheté pour le job : sac isotherme, support de téléphone, casque, vêtements haute visibilité. La part privée de tout cela est exclue.",
      "Presque toute la valeur se trouve dans le véhicule. Un livreur qui roule régulièrement fait des kilomètres qu’aucun autre job de backpacker ne produit, et sur une année l’écart entre les deux méthodes peut dépasser toutes les autres déductions réunies."
    ]
  },
  {
    "kind": "items",
    "h2": "Les déductions propres à ce métier",
    "intro": "Tout ce qui suit se calcule au prorata. Vous déduisez la part professionnelle, et il vous faut une base raisonnable pour le chiffre retenu.",
    "items": [
      {
        "t": "Frais de voiture",
        "d": "Déduits par la méthode cents per kilometre ou par un logbook, comparés plus bas. Le logbook repose sur vos frais réels à un pourcentage d’usage professionnel, le cents per kilometre sur un taux forfaitaire."
      },
      {
        "t": "Frais de vélo, de vélo électrique et de scooter",
        "d": "Les frais d’utilisation, de réparation et d’entretien sont déductibles à hauteur de la part professionnelle, avec le casque, les vêtements haute visibilité et les lumières. Pour le fisc, un vélo ou un scooter n’est pas une voiture : la méthode cents per kilometre ne s’applique pas, et vous déduisez vos frais réels au prorata."
      },
      {
        "t": "La part pro de votre téléphone et de vos données",
        "d": "Tout le travail passe par une appli, donc le pourcentage professionnel de votre forfait est une vraie déduction. Calculez ce pourcentage honnêtement sur une période représentative."
      },
      {
        "t": "Le parking payé pendant le travail",
        "d": "Les cinq dollars dans un centre commercial le temps que la commande soit préparée sont déductibles. Les amendes ne le sont jamais."
      },
      {
        "t": "L’équipement acheté pour le job",
        "d": "Sac de livraison isotherme, support de téléphone, chargeur, antivol de vélo, vêtements de pluie, lampe frontale. Chaque article à 300 $ AUD ou moins est déduit en totalité l’année de l’achat."
      },
      {
        "t": "Le nettoyage du véhicule pour le travail",
        "d": "Garder une voiture en état de transporter de la nourriture, ou un vélo en état de rouler, est déductible à hauteur de la part professionnelle."
      }
    ]
  },
  {
    "kind": "tables",
    "h2": "Comment calcule-t-on les frais de voiture ?",
    "intro": "Seuls les trajets de travail comptent avec les deux méthodes, et pour un livreur, le trajet de chez lui jusqu’au restaurant ne compte jamais.",
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
    "note": "Un livreur régulier dépasse 5 000 kilomètres en quelques mois, et au-delà le logbook donne en général la déduction la plus élevée : essence, assurance, immatriculation, entretien, amortissement et intérêts du prêt, à votre pourcentage professionnel."
  },
  {
    "kind": "answer",
    "h2": "Que doit pouvoir produire un livreur ?",
    "paras": [
      "Chaque déduction repose sur trois choses : vous avez payé, personne ne vous a remboursé, et l’argent a servi à gagner le revenu que vous déclarez. Pour un livreur, cela donne un logbook ou un relevé des kilomètres, la facture de téléphone derrière votre pourcentage professionnel, et les reçus du sac, du support et de l’équipement.",
      "Un reçu, une facture, un relevé bancaire ou une photo sur le téléphone montrant le montant, la date, le fournisseur et l’article conviennent tous, à conserver cinq ans. Des déductions professionnelles qui totalisent 300 $ AUD ou moins sur l’année n’exigent aucune preuve écrite. Ce n’est pas le même seuil de 300 $ que celui qui décide si un article est amorti d’un coup ou sur sa durée de vie."
    ]
  },
  {
    "kind": "note",
    "label": "Celle qui surprend",
    "title": "Livraison de repas et transport de passagers, ce n’est pas la même chose pour la GST.",
    "body": "Si vous livrez uniquement de la nourriture et des colis, l’inscription à la GST devient obligatoire quand votre chiffre d’affaires dépasse 75 000 $ par an, ce que la plupart des livreurs n’approchent jamais. Dès que vous transportez un passager payant, ce seuil disparaît.\n\nLe ride sourcing exige l’inscription à la GST dès la première course, quel que soit votre revenu, avec les business activity statements qui vont avec. Quelqu’un qui fait Uber Eats en semaine et prend des passagers le vendredi soir a franchi cette ligne."
  },
  {
    "kind": "traps",
    "h2": "Quelles erreurs font les livreurs ?",
    "intro": "Les déductions exagérées sont ici plus grosses que dans n’importe quel autre métier, parce que les montants le sont. Les oublis aussi.",
    "wrong": [
      {
        "t": "Toute la facture de téléphone",
        "d": "Déduire 100 % d’un forfait que vous utilisez aussi pour tout le reste ne se défend pas, et l’ATO peut le comparer au reste de la déclaration."
      },
      {
        "t": "Les amendes",
        "d": "Un PV de stationnement reçu pendant que vous montiez une commande n’est toujours pas déductible. Un excès de vitesse non plus, même si la fenêtre de livraison était serrée."
      },
      {
        "t": "La nourriture achetée pendant le travail",
        "d": "Votre propre dîner entre deux livraisons est une dépense privée."
      },
      {
        "t": "Chaque kilomètre roulé avec l’appli ouverte",
        "d": "La partie privée d’un trajet ne devient pas un trajet de travail parce que l’appli tournait. Une course faite en chemin vers une livraison sort de la déduction, et pour un livreur salarié le trajet jusqu’au restaurant sort aussi."
      },
      {
        "t": "Ne pas déclarer du tout un petit revenu de plateforme",
        "d": "Uber, DoorDash et les autres déclarent les revenus des livreurs à l’ATO dans le cadre du régime de déclaration de la sharing economy. Vos gains sont déjà visibles : quelques centaines de dollars de week-end oubliés dans une déclaration sont un écart, pas une économie."
      }
    ],
    "missed": [
      {
        "t": "Le logbook, quand il était clairement meilleur",
        "d": "La méthode cents per kilometre plafonne à 5 000 kilomètres. Un livreur régulier les dépasse sans effort, et tout ce qui est au-delà est perdu. Douze semaines de logbook, tenues une fois, valent cinq ans."
      },
      {
        "t": "Intérêts, assurance, immatriculation et amortissement",
        "d": "Ils ne sont accessibles que par le logbook, et c’est généralement pour cela qu’il l’emporte. Beaucoup choisissent le cents per kilometre parce que c’est plus simple, et ne savent jamais ce que l’autre méthode aurait donné."
      },
      {
        "t": "Le sac isotherme et le support de téléphone",
        "d": "Petits, évidents, entièrement déductibles, et jetés avec le reçu. C’est pareil pour le casque, les lumières et les vêtements de pluie."
      },
      {
        "t": "Les frais engagés avant la première livraison",
        "d": "L’équipement acheté pendant la mise en route, à l’époque où vous avez enregistré l’ABN et vous êtes inscrit sur la plateforme, est en général déductible. L’écart entre l’achat et le début de l’activité compte, alors gardez les dates."
      },
      {
        "t": "Les livreurs sous ABN qui pensent devoir de l’argent au lieu de déduire",
        "d": "Rien n’est retenu sur les paiements des plateformes, l’argent arrive en entier et les gens s’attendent à une facture. Ce sont les déductions contre ce revenu qui le réduisent, et ce sont elles qu’on oublie le plus souvent."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Qu’est-ce qui dépend de votre façon de rouler, pas des règles ?",
    "paras": [
      "Uber Eats, DoorDash, Menulog et Amazon Flex engagent les livreurs comme prestataires : un ABN, rien de retenu, pas de super. Un planning dans une pizzeria qui vous remet une payslip, c’est un emploi sous TFN. Un restaurant qui fixe vos horaires, supervise votre travail et fournit le vélo, puis vous demande d’enregistrer un ABN, peut être un employeur déguisé.",
      "Le point de départ du trajet déductible en découle. Pour un salarié, le trajet jusqu’au restaurant est privé, et seul le trajet restaurant-client compte. Sous ABN, la conduite est le travail.",
      "La résidence fiscale peut changer la façon dont le bénéfice est imposé. Une décision de justice connue sous le nom d’Addy existe, et son effet varie d’une personne à l’autre : il ne faut pas le présumer. Cela dépend des faits de votre année, et cela fait partie de notre vérification."
    ]
  }
]

const FAQS = [
  {
    "question": "Ai-je besoin d’un ABN pour livrer avec Uber Eats ou DoorDash ?",
    "answer": "Oui. Ces plateformes engagent les livreurs et les chauffeurs comme prestataires et non comme salariés, donc un ABN est requis avant de pouvoir être payé.\n\nIl ne remplace pas un TFN. Rien n’est retenu sur vos paiements : le revenu arrive en entier et l’impôt se règle au dépôt de la déclaration."
  },
  {
    "question": "Quelle méthode de frais de voiture choisir ?",
    "answer": "Cela dépend de la distance parcourue et de ce que la voiture coûte à faire rouler. Le cents per kilometre n’exige aucun reçu mais plafonne à 5 000 km professionnels par an, et tout ce qui dépasse est perdu.\n\nLe logbook n’a pas de plafond et prend en compte les frais réels à votre pourcentage d’usage professionnel, avec douze semaines consécutives de relevés et un reçu pour chaque dépense."
  },
  {
    "question": "Puis-je déduire ma facture de téléphone ?",
    "answer": "Vous pouvez déduire le pourcentage professionnel de votre téléphone et de votre forfait data : la part utilisée pour l’appli de livraison, la navigation et les messages liés aux commandes.\n\nVous ne pouvez pas déduire toute la facture si vous utilisez aussi le téléphone pour la vie courante. Il faut donc une base raisonnable pour le pourcentage, et de quoi l’appuyer."
  },
  {
    "question": "Dois-je m’inscrire à la GST ?",
    "answer": "Pour la livraison de repas et de colis uniquement, l’inscription à la GST devient obligatoire quand le chiffre d’affaires dépasse 75 000 $ par an, et la plupart des livreurs à temps partiel n’en sont pas près.\n\nTransporter des passagers payants est différent : l’inscription à la GST est exigée dès le premier dollar, quel que soit le chiffre d’affaires."
  },
  {
    "question": "Je livre à vélo, pas en voiture. Puis-je déduire quelque chose ?",
    "answer": "Oui. Un vélo ou une trottinette électrique n’est pas une voiture pour le fisc, donc la méthode cents per kilometre ne s’applique pas, mais vous pouvez déduire la part professionnelle des frais d’utilisation, de réparation et d’entretien, ainsi que le casque, les lumières et les vêtements haute visibilité.\n\nRépartissez entre la livraison et l’usage personnel sur une base raisonnable."
  }
]

const GUIDES = [
  {
    "href": "/fr/blog/uber-doordash-rideshare-abn-working-holiday",
    "label": "Uber, DoorDash et votre ABN",
    "desc": "Pourquoi les plateformes en exigent un, et ce qui change dès que vous l’avez."
  },
  {
    "href": "/fr/blog/bicycle-motorcycle-vehicle-deductions-working-holiday",
    "label": "Déductions vélo, scooter et voiture",
    "desc": "Comment chaque véhicule est traité, et quelle méthode convient à quel véhicule."
  },
  {
    "href": "/fr/blog/uber-eats-delivery-rider-working-holiday-australia",
    "label": "Livrer en working holiday",
    "desc": "Ce que ce travail rapporte vraiment une fois les frais déduits."
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
    <JobExpensesPage
      content={{
        lang: 'fr',
        path: '/fr/expenses/delivery-drivers',
        articleHeadline: "Livreur en Australie : déductions voiture, téléphone, GST",
        articleDescription: "Vos kilomètres et la part pro de votre téléphone font l’essentiel. Les amendes et le trajet privé n’ont jamais compté.",
        inLanguage: "fr",
        photoKey: 'expenses/delivery-drivers',
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
