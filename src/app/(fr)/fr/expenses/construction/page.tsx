import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { type Section } from '@/components/expenses/JobExpensesPage'
import { JobExpensesWhtPage } from '@/components/wht/JobPageBlocks'

export const metadata: Metadata = {
  "title": { absolute: "Chantier en Australie : outils, EPI, véhicule et déductions" },
  "description": "Ce que les ouvriers du bâtiment en visa vacances-travail peuvent déduire : outils, EPI, tenue haute visibilité, White Card et protection solaire.",
  "keywords": [
    "déductions fiscales chantier Australie",
    "construction PVT tax return",
    "outils déduction ATO 300 dollars",
    "White Card Australie déduction",
    "EPI chantier déduction impôts",
    "ute trajet chantier ATO",
    "ouvrier bâtiment working holiday impôts",
    "laborer Australie impôts PVT"
  ],
  "alternates": {
    "canonical": "/fr/expenses/construction",
    "languages": {
      "en-AU": "/expenses/construction",
      "de": "/de/expenses/construction",
      "ja": "/ja/expenses/construction",
      ...newLocaleLanguages('/expenses/construction'),
      "x-default": "/expenses/construction"
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
    "url": `${SITE_URL}/fr/expenses/construction`,
    "siteName": "Working Holiday Tax",
    "title": "Chantier en Australie : outils, EPI, véhicule et déductions",
    "description": "Vos outils, vos EPI et le renouvellement de la White Card sont déductibles. Votre première White Card et votre jean déchiré, non."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Chantier en Australie : outils, EPI, véhicule et déductions",
    "description": "Vos outils, vos EPI et le renouvellement de la White Card sont déductibles. Votre première White Card et votre jean déchiré, non."
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

const WA = waUrl({ topic: 'expenses', lang: "fr", detail: "Bâtiment et chantiers" })

const UI = {
  "ctaLabel": "Écrivez-nous sur WhatsApp",
  "ctaSub": "Réponse en général dans l’heure.",
  "guaranteeHeading": "Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique. La garantie ne s’applique qu’aux déclarations avec revenus sous TFN.",
  "guaranteeBody": "Les déclarations de chantier, les renouvellements de tickets et le débat sur le ute (le pick-up) reviennent chaque semaine chez nous, et tous nos clients sont en 417 ou 462. Chaque déclaration est vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO.",
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
    "name": "Bâtiment",
    "item": "/fr/expenses/construction"
  }
]

const HERO = {
  "kicker": "Chantiers, manœuvres et corps de métier",
  "h1lead": "Vos outils sont déductibles.",
  "h1accent": "Votre première White Card, non.",
  "lede": "Le chantier a la liste de déductions la plus longue de tous les jobs de backpacker. Le ute n’y figure généralement pas."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Que peut déduire un ouvrier du bâtiment dans sa tax return ?",
    "paras": [
      "Un ouvrier du bâtiment peut déduire les outils et le matériel achetés de sa poche, les vêtements de protection et les EPI, la protection solaire pour le travail en extérieur, les renouvellements d’une White Card ou d’un ticket d’opérateur qu’il possède déjà, la part professionnelle de son forfait de téléphone et les formations liées au métier qu’il exerce déjà. Tout ce que l’employeur a fourni ou remboursé sort de la liste.",
      "La liste est longue parce que le job crée des frais précis. Les chaussures de sécurité vous protègent d’une brique qui tombe, la crème solaire de six heures sur une dalle sans ombre. C’est ce lien que le test de déduction cherche."
    ]
  },
  {
    "kind": "items",
    "h2": "Les déductions propres à ce métier",
    "intro": "Les seuils en dollars ci-dessous concernent le calendrier, pas l’éligibilité. Passer 300 $ AUD ne supprime pas une déduction, ça l’étale.",
    "items": [
      {
        "t": "Outils et matériel à moins de 300 $ chacun",
        "d": "Une perceuse, une meuleuse, un cloueur, un niveau, une ceinture à outils. Chaque article à 300 $ ou moins est déduit en totalité l’année de l’achat. Le test se fait article par article, donc une année de petits achats forme une vraie déduction à partir de reçus que la plupart des gens jettent."
      },
      {
        "t": "Outils et matériel à 300 $ ou plus",
        "d": "Toujours déductibles, mais répartis sur la durée de vie de l’article au lieu d’être déduits d’un coup. Une bétonnière ou une scie à onglets entre ici. Le piège, c’est d’acheter plusieurs outils ensemble en lot à 300 $ ou plus : le lot compte comme un seul bien, même si chaque pièce seule serait passée sous le seuil."
      },
      {
        "t": "EPI et vêtements de protection",
        "d": "Chemises et gilets haute visibilité, chaussures de sécurité, lunettes de protection, casque, casque antibruit, gants de travail, masque anti-poussière. Le test de l’ATO n’est pas de savoir si l’article est utile sur le chantier, mais s’il vous protège d’un risque précis de blessure."
      },
      {
        "t": "Protection solaire pour le travail en extérieur",
        "d": "Crème solaire, chapeau à larges bords et lunettes de soleil sont déductibles quand le travail sur chantier se fait dehors. Sur une dalle en plein été, c’est un frais récurrent dont presque personne ne garde le reçu."
      },
      {
        "t": "Renouveler une White Card ou un ticket d’opérateur",
        "d": "Renouveler une carte ou un ticket que vous avez déjà est déductible. Votre première White Card ne l’est pas, parce que ce coût vous a rendu éligible au travail de construction. La même distinction s’applique à un premier ticket de cariste, à un ticket EWP ou à un permis poids lourd."
      },
      {
        "t": "La part pro de votre téléphone et d’internet",
        "d": "Si vous utilisez votre propre téléphone pour appeler un chef d’équipe, consulter des plans ou recevoir des messages de planning, le pourcentage professionnel du forfait est déductible. Déduire toute la facture d’un téléphone sur lequel vous vivez aussi ne tiendra pas."
      },
      {
        "t": "Les formations liées au métier que vous exercez déjà",
        "d": "Un cours qui améliore une compétence ou un ticket que vous utilisez maintenant est déductible. Un cours qui vise un autre métier ne l’est pas, même lié à la construction, parce qu’il construit une nouvelle qualification au lieu d’entretenir celle qui produit votre revenu."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Que faut-il derrière une déduction d’outil ?",
    "paras": [
      "Chaque déduction doit passer trois tests. Vous avez payé, personne ne vous a remboursé, et l’argent a servi à gagner le revenu que vous déclarez. Sur un chantier, cela donne le reçu de la perceuse, des chaussures et du renouvellement du ticket.",
      "La preuve peut être un reçu, une facture, un relevé bancaire ou une photo sur le téléphone indiquant le montant, la date, le fournisseur et l’article, à conserver cinq ans. Quand toutes vos déductions professionnelles de l’année totalisent 300 $ ou moins, aucune preuve écrite n’est exigée. Ce n’est pas le même seuil de 300 $ que celui qui décide si une scie est amortie d’un coup ou sur sa durée de vie."
    ]
  },
  {
    "kind": "numbered",
    "h2": "Quand le trajet jusqu’au chantier compte-t-il ?",
    "intro": "De chez vous à un lieu de travail habituel, c’est un trajet privé, et un chantier est un lieu de travail. Une exception étroite existe pour le matériel encombrant, et ces trois conditions doivent toutes être remplies.",
    "steps": [
      "Les outils sont indispensables au travail que vous faites ce jour-là.",
      "Ils sont vraiment encombrants : leur taille ou leur poids explique qu’il faille un véhicule, pas la simple commodité.",
      "Il n’y a aucun endroit sûr où les laisser sur le chantier, donc ils doivent rentrer avec vous."
    ],
    "note": "Si le chantier a un abri, un conteneur ou une cage qui ferme à clé, ou si ce que vous transportez tient dans un sac normal, le trajet reste un trajet domicile-travail ordinaire. Si vous remplissez les conditions, les utes et les fourgons d’une capacité de charge d’une tonne ou plus ne peuvent pas utiliser la méthode cents per kilometre : le logbook est alors la seule voie pour la plupart de ceux qui en conduisent un."
  },
  {
    "kind": "traps",
    "h2": "Quelles erreurs font les ouvriers du bâtiment ?",
    "intro": "Les déductions à tort sur une déclaration de chantier concernent surtout les vêtements et le ute. Les oublis, ce sont les reçus que personne n’a gardés pour des frais manifestement déductibles.",
    "wrong": [
      {
        "t": "Les vêtements ordinaires abîmés sur le chantier",
        "d": "Jean, t-shirt, chemise à carreaux, sweat à capuche. L’usure normale d’un vêtement courant est une dépense privée. L’article doit vous protéger, pas seulement survivre à la journée."
      },
      {
        "t": "Votre première White Card",
        "d": "La carte payée avant que quiconque vous embauche est le coût pour devenir éligible, que l’ATO traite comme un premier permis de conduire. La renouveler une fois que vous travaillez est déductible."
      },
      {
        "t": "Le ute, comme une évidence",
        "d": "Avoir un ute et rouler jusqu’au chantier n’est pas une déduction. Les trois conditions de l’outillage encombrant ci-dessus doivent toutes être réunies, et sur la plupart des chantiers elles ne le sont pas, car il y a un endroit où tout fermer à clé."
      },
      {
        "t": "Les outils fournis ou payés par l’employeur",
        "d": "Si l’outil est sorti du camion, du conteneur du chantier, ou si vous avez été remboursé, il ne reste aucun coût à votre charge à déduire."
      },
      {
        "t": "Un cours pour passer à un autre métier",
        "d": "Une formation qui vous ferait changer de métier n’est pas déductible, même si elle est clairement liée à la construction."
      }
    ],
    "missed": [
      {
        "t": "Les petits outils, déduits un par un",
        "d": "On croit qu’il faut atteindre un seuil avant que les outils valent la peine d’être déduits. Ce n’est pas le cas. Douze achats de 40 $, c’est 480 $ de déduction, et chacun est testé seul face aux 300 $."
      },
      {
        "t": "Tout ce qui dépasse 300 $, rayé en bloc",
        "d": "On entend « plus de 300 $ » et on conclut que l’outil n’est pas déductible. Il l’est, sur la durée de vie de l’article. L’abandonner fait perdre toute la déduction, pas seulement une partie décalée."
      },
      {
        "t": "Crème solaire et chapeau sur un chantier en extérieur",
        "d": "Reconnus pour le travail en extérieur et presque jamais déduits par les ouvriers, qui pensent que la protection solaire est un truc de ferme. Une dalle sans ombre en février, c’est la même exposition."
      },
      {
        "t": "Le lavage de la tenue haute visibilité et des protections",
        "d": "Laver des vêtements de protection déductibles est lui-même déductible au taux de l’ATO : 1 $ par machine pour les vêtements de travail seuls, ou 0,50 $ mélangés au reste. Au-delà de 150 $ sur l’année, tenez un simple carnet."
      },
      {
        "t": "Les renouvellements de tickets payés de sa poche",
        "d": "Une White Card, un ticket de cariste ou un renouvellement EWP s’oublie facilement en juillet, surtout quand il a été payé en liquide lors d’une formation un samedi."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Qu’est-ce qui relève de vos propres faits ?",
    "paras": [
      "D’abord l’exception du matériel encombrant. Ce que vous transportez, ce que le chantier offre pour le rangement, et si les outils étaient indispensables ce jour-là, tout cela tranche. Deux manœuvres de la même équipe peuvent aboutir à des résultats différents.",
      "La résidence fiscale peut peser lourd sur le résultat. Une décision de justice connue sous le nom d’Addy existe, et son effet varie d’une personne à l’autre : il ne faut pas le présumer. Cela dépend des faits de votre année, et cela fait partie de notre vérification."
    ]
  }
]

const FAQS = [
  {
    "question": "Puis-je déduire ma première White Card ?",
    "answer": "Non. L’ATO traite une première White Card comme un premier permis de conduire : le coût pour devenir éligible au travail, pas un coût du travail lui-même.\n\nUne fois que vous travaillez et que la carte doit être renouvelée, le renouvellement est déductible. Il en va de même pour un premier ticket de cariste ou un permis poids lourd."
  },
  {
    "question": "Quels outils puis-je déduire comme ouvrier du bâtiment ?",
    "answer": "Tout outil ou matériel que vous avez acheté vous-même pour le chantier, tant que votre employeur ne l’a pas fourni ni remboursé.\n\nLes articles à 300 $ ou moins chacun se déduisent en totalité l’année de l’achat, ceux au-dessus sur la durée de vie de l’article. Plusieurs outils achetés ensemble en lot à 300 $ ou plus forment un seul bien."
  },
  {
    "question": "Puis-je déduire mon ute pour aller au chantier ?",
    "answer": "Seulement dans un cas étroit. Aller de chez soi à un lieu de travail habituel est un trajet privé, et un chantier est un lieu de travail.\n\nLe trajet n’est déductible que si les outils que vous transportez sont indispensables ce jour-là, vraiment encombrants, et impossibles à ranger en sécurité sur place. Les utes et fourgons d’une tonne ou plus sont exclus de la méthode cents per kilometre, donc le logbook est la seule façon de les déduire."
  },
  {
    "question": "Les chaussures de sécurité et la tenue haute visibilité sont-elles déductibles ?",
    "answer": "Oui. Chaussures de sécurité, tenue haute visibilité, lunettes de protection, casques, casques antibruit et gants de travail sont déductibles parce qu’ils vous protègent d’un risque précis de blessure, ce qui est le test de l’ATO.\n\nLa protection solaire pour le travail en extérieur est déductible sur la même base, tout comme le lavage de l’équipement de protection."
  },
  {
    "question": "Mes vêtements sont détruits sur le chantier. Pourquoi ne puis-je pas les déduire ?",
    "answer": "Parce que l’ATO teste l’article et non ce qui lui est arrivé. Un jean, un t-shirt ou une chemise à carreaux sont des vêtements courants, et leur usure reste privée, même si le job les abîme vite.\n\nPour être déductible, l’article doit avoir une vraie fonction de protection, ou être une tenue obligatoire à l’effigie de l’entreprise."
  }
]

const GUIDES = [
  {
    "href": "/fr/blog/white-card-australia-working-holiday",
    "label": "La White Card, et ce qu’elle vous coûte",
    "desc": "Comment l’obtenir, et pourquoi la première n’est pas déductible."
  },
  {
    "href": "/fr/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "La déduction immédiate de 300 $ pour l’outillage",
    "desc": "Pourquoi chaque article est évalué séparément, et ce que change un lot."
  },
  {
    "href": "/fr/blog/construction-laborer-working-holiday-australia",
    "label": "Manœuvre sur chantier en working holiday",
    "desc": "Ce que rapporte ce travail et ce qu’un chantier attend que vous ayez en arrivant."
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
        path: '/fr/expenses/construction',
        articleHeadline: "Chantier en Australie : outils, EPI, véhicule et déductions",
        articleDescription: "Vos outils, vos EPI et le renouvellement de la White Card sont déductibles. Votre première White Card et votre jean déchiré, non.",
        inLanguage: "fr",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
