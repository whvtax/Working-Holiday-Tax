import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'

export const metadata: Metadata = {
  "title": { absolute: "FIFO en Australie : déductions EPI, tickets, Zone Offset" },
  "description": "Ce que les travailleurs FIFO peuvent déduire dans leur tax return : EPI et outils, renouvellement de tickets, visites médicales et part pro du téléphone.",
  "keywords": [
    "déductions fiscales FIFO Australie",
    "fly in fly out impôts Australie",
    "zone tax offset FIFO",
    "logement camp FIFO impôts",
    "high risk work licence déduction",
    "EPI FIFO déduction impôts",
    "FIFO PVT backpacker impôts",
    "travail sur site isolé déductions"
  ],
  "alternates": {
    "canonical": "/fr/expenses/fifo",
    "languages": {
      "en-AU": "/expenses/fifo",
      "de": "/de/expenses/fifo",
      "ja": "/ja/expenses/fifo",
      ...newLocaleLanguages('/expenses/fifo'),
      "x-default": "/expenses/fifo"
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
    "url": `${SITE_URL}/fr/expenses/fifo`,
    "siteName": "Working Holiday Tax",
    "title": "FIFO en Australie : déductions EPI, tickets, Zone Offset",
    "description": "Les repas du camp et le trajet jusqu’à l’aéroport ne sont pas déductibles. Le Zone Tax Offset n’est sans doute pas pour vous non plus. Voici ce qui l’est."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "FIFO en Australie : déductions EPI, tickets, Zone Offset",
    "description": "Les repas du camp et le trajet jusqu’à l’aéroport ne sont pas déductibles. Le Zone Tax Offset n’est sans doute pas pour vous non plus. Voici ce qui l’est."
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

const WA = waUrl({ topic: 'expenses', lang: "fr", detail: "FIFO et travail en camp" })

const UI = {
  "ctaLabel": "Écrivez-nous sur WhatsApp",
  "ctaSub": "Réponse en général dans l’heure.",
  "guaranteeHeading": "Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique.",
  "guaranteeBody": "Nous ne traitons que l’impôt des visas 417 et 462, donc la zone offset, la résidence fiscale et la super répartie sur trois fonds sont examinées ensemble. Chaque déclaration est vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO.",
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
    "name": "FIFO",
    "item": "/fr/expenses/fifo"
  }
]

const HERO = {
  "kicker": "Rotations, camps et sites isolés",
  "h1lead": "Le Zone Tax Offset n’est sans doute pas pour vous.",
  "h1accent": "Voici ce qui l’est.",
  "lede": "La chambre du camp, la cantine et le vol sont des frais de l’entreprise, pas les vôtres. Il vous reste les EPI, le renouvellement des tickets, les visites médicales et un téléphone."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Que peut déduire un travailleur FIFO dans sa tax return ?",
    "paras": [
      "Un travailleur FIFO peut déduire les EPI et les vêtements de protection achetés de sa poche et leur lessive, les outils et le matériel, le renouvellement d’un ticket ou d’une licence qu’il possède déjà, les visites médicales et tests de drogue et d’alcool exigés par l’employeur qu’il a payés lui-même, la part professionnelle du téléphone et d’internet, et les formations liées au job qu’il exerce déjà.",
      "Ce qui n’est pas sur cette liste, c’est tout ce qui donne au FIFO l’impression de coûter cher. Votre chambre au camp et vos repas à la cantine sont réservés et payés par l’entreprise, et le vol jusqu’au site l’est en général aussi. Une déduction ne rend que l’argent qui est sorti de votre poche."
    ]
  },
  {
    "kind": "items",
    "h2": "Les déductions propres à ce métier",
    "intro": "Tout ce qui suit a la même condition : vous l’avez payé, et le magasin ne vous l’a pas remis.",
    "items": [
      {
        "t": "Les EPI achetés par vous, et leur lavage",
        "d": "Combinaison, chaussures de sécurité, gants, lunettes de protection, protection auditive, masques. Déductibles parce qu’ils vous protègent d’un risque précis sur le site. Leur lavage est déductible au taux de l’ATO : 1 $ AUD par machine pour les vêtements de travail seuls, ou 0,50 $ mélangés au reste."
      },
      {
        "t": "Outils et matériel",
        "d": "Tout ce que vous avez acheté pour le job et que le magasin ne vous a pas remis. Chaque article à 300 $ ou moins est déduit en totalité l’année de l’achat, au-dessus sur la durée de vie de l’article. Une caisse à outils achetée en lot pour 300 $ ou plus compte comme un seul bien."
      },
      {
        "t": "Renouveler un ticket ou une licence que vous avez déjà",
        "d": "Une High Risk Work Licence, un ticket Working at Heights, un ticket de cariste. Les renouvellements sont déductibles une fois que vous travaillez dans le poste. Le premier ne l’est pas, sur la même base qu’une première White Card."
      },
      {
        "t": "Visites médicales et tests exigés par l’employeur",
        "d": "Beaucoup de sites exigent une visite médicale avant la prise de poste et des tests de drogue et d’alcool comme condition de travail. Quand votre employeur les exige pour un poste que vous occupez déjà et que vous avez payé vous-même, c’est déductible."
      },
      {
        "t": "La part pro de votre téléphone et d’internet",
        "d": "Consulter un planning, remplir des timesheets, suivre des inductions en ligne obligatoires. Déduisez le pourcentage professionnel sur une base raisonnable, pas toute la facture."
      },
      {
        "t": "Les formations liées au travail que vous faites déjà",
        "d": "Un cours court qui maintient en vie une compétence ou un ticket actuel est déductible, tout comme le voyage et l’hébergement quand votre employeur exige que vous suiviez la formation loin de votre base. Un premier certificat d’entrée de gamme passé pour devenir éligible à un poste ne l’est pas."
      }
    ]
  },
  {
    "kind": "note",
    "label": "Le plus gros mythe fiscal du FIFO",
    "title": "Travailler dans une zone, ce n’est pas y habiter.",
    "body": "Depuis un changement de loi en 2015, le Zone Tax Offset dépend de l’endroit où se trouve votre résidence habituelle, pas de l’endroit où votre rotation vous emmène. Cela s’apprécie au cas par cas.\n\nPrendre l’avion pour travailler dans une zone alors que vous habitez à Perth, Brisbane ou Darwin entre deux rotations ne remplit pas la condition. Le camp n’est pas votre résidence habituelle, car il est temporaire et lié à la rotation.\n\nDans bien des cas de rotation FIFO, l’offset ne s’applique pas, mais cela dépend de votre situation, et c’est l’ATO qui décide."
  },
  {
    "kind": "answer",
    "h2": "Que faut-il derrière une déduction FIFO ?",
    "paras": [
      "Une déduction survit à trois questions. L’avez-vous payée ? Vous a-t-on remboursé ? A-t-elle servi à gagner le revenu que vous déclarez ? En rotation, cela donne le reçu des chaussures que le magasin n’a pas remises, la facture de la visite médicale et la facture derrière votre pourcentage de téléphone.",
      "La preuve, c’est le montant, la date, le fournisseur et l’article, sur un reçu, une facture, un relevé bancaire ou une photo, conservés cinq ans. À 300 $ ou moins de déductions professionnelles sur l’année, aucune preuve écrite n’est exigée. Ce n’est pas le même seuil de 300 $ que celui qui décide si un outil est amorti d’un coup ou sur sa durée de vie."
    ]
  },
  {
    "kind": "traps",
    "h2": "Quelles erreurs font les travailleurs FIFO ?",
    "intro": "Ce métier compte plus de fausses informations répétées avec aplomb que n’importe quel autre sur ce site.",
    "wrong": [
      {
        "t": "Le Zone Tax Offset",
        "d": "Un avantage souvent réclamé à tort par les travailleurs FIFO. Il dépend de l’endroit où vous habitez normalement, pas de celui où vous volez, et le camp n’est en général pas pris en compte."
      },
      {
        "t": "Le logement et les repas du camp",
        "d": "Votre employeur réserve et paie la chambre et la cantine, et sur les sites vraiment isolés c’est généralement un avantage exonéré pour lui plutôt qu’un revenu pour vous. Dans tous les cas, vous n’avez rien payé."
      },
      {
        "t": "Le trajet jusqu’à l’aéroport avant une rotation",
        "d": "C’est un trajet domicile-travail ordinaire, quelle que soit l’heure du vol et la distance qui vous sépare du terminal. L’exception étroite du matériel encombrant s’applique rarement à un poste de services de camp, où il n’y a rien d’encombrant ou un endroit sûr où le laisser."
      },
      {
        "t": "Déménager à Perth ou à Brisbane pour le travail",
        "d": "Vols, fret et hébergement temporaire pour un déménagement fait afin d’accepter un travail FIFO sont des frais privés de déménagement. Se mettre en position de gagner un revenu, ce n’est pas le gagner."
      },
      {
        "t": "Une première High Risk Work Licence",
        "d": "Le ticket payé pour pouvoir être embauché est un coût privé. Le renouveler alors que vous travaillez déjà avec est déductible."
      }
    ],
    "missed": [
      {
        "t": "Les EPI achetés de sa poche, et leur lessive",
        "d": "Beaucoup de travailleurs achètent leurs propres chaussures ou gants plutôt que d’attendre le magasin, puis ne déduisent ni l’équipement ni le lavage au taux publié."
      },
      {
        "t": "Visites médicales et tests de drogue et d’alcool payés par vous",
        "d": "Déductibles quand l’employeur les exige pour un poste que vous occupez déjà, et presque jamais déduits, parce que ça ressemble à un obstacle plus qu’à un coût."
      },
      {
        "t": "La part pro du téléphone et d’internet pendant la rotation",
        "d": "Plannings, timesheets et inductions obligatoires passent tous par un appareil personnel."
      },
      {
        "t": "Les renouvellements de tickets sur une longue année de rotation",
        "d": "Un renouvellement de High Risk Work Licence ou de Working at Heights payé entre deux rotations se perd facilement de vue en fin d’année."
      },
      {
        "t": "Une super laissée dans plusieurs fonds",
        "d": "Le FIFO paie bien, donc le solde de super est plus élevé que dans la plupart des jobs de backpacker. Il reste là quand vous partez, et doit être réclamé sous forme de Departing Australia Superannuation Payment une fois votre visa expiré."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Qu’est-ce qui reste ouvert dans un dossier FIFO ?",
    "paras": [
      "Le Zone Tax Offset est en général erroné plutôt qu’impossible. Si votre base pendant le working holiday se trouvait dans une zone désignée, un logement loué dans une ville isolée plutôt que dans une capitale, la question est ouverte.",
      "L’exception du matériel encombrant compte davantage pour un artisan qui arrive en avion avec son propre kit que pour un poste de services de camp. Ce que vous transportiez et ce que le site offrait pour le rangement tranchent.",
      "La résidence fiscale est la plus grande question d’un dossier FIFO, parce que les montants sont plus élevés. Une décision de justice connue sous le nom d’Addy existe, et son effet varie d’une personne à l’autre : il ne faut pas le présumer. Cela dépend des faits de votre année, et cela fait partie de notre vérification."
    ]
  }
]

const FAQS = [
  {
    "question": "Les travailleurs FIFO ont-ils droit au Zone Tax Offset ?",
    "answer": "En général non, et c’est la plus grande idée reçue de l’impôt FIFO. Depuis un changement de loi en 2015, y avoir droit dépend de votre résidence habituelle, pas de l’endroit où vous travaillez, et cela s’apprécie au cas par cas.\n\nLe camp n’est pas en général votre résidence habituelle."
  },
  {
    "question": "Puis-je déduire mon logement ou mes repas au camp ?",
    "answer": "Non. Votre chambre et vos repas sur site sont organisés et payés par votre employeur, et sur les sites vraiment isolés c’est généralement traité comme un avantage exonéré pour lui.\n\nComme vous n’avez payé ni la chambre ni la nourriture, il n’y a aucune dépense de votre part à déduire."
  },
  {
    "question": "Puis-je déduire le trajet jusqu’à l’aéroport avant ma rotation ?",
    "answer": "Non, dans presque tous les cas. Le trajet de chez vous à l’aéroport d’où vous partez est un trajet domicile-travail privé ordinaire, quelle que soit l’heure du vol.\n\nL’exception étroite, où vous devez transporter des outils vraiment encombrants et essentiels sans endroit sûr pour les ranger au travail, s’applique rarement à un poste de services de camp."
  },
  {
    "question": "Puis-je déduire ma High Risk Work Licence ?",
    "answer": "Vous pouvez déduire le renouvellement d’une licence que vous avez déjà. Vous ne pouvez pas déduire son obtention initiale, parce que ce coût vous a rendu éligible au poste au lieu de servir un job que vous aviez déjà.\n\nC’est la même distinction entre première fois et renouvellement que l’ATO applique à la White Card du bâtiment."
  },
  {
    "question": "Que puis-je déduire du téléphone et d’internet pendant la rotation ?",
    "answer": "La part professionnelle. Si vous utilisez votre propre téléphone ou votre propre connexion pour consulter votre planning, remplir des timesheets ou suivre des inductions en ligne obligatoires, cette part de la facture est déductible.\n\nIl vous faut une estimation raisonnable du pourcentage : toute la facture sur un appareil que vous utilisez aussi pour tout le reste ne tiendra pas."
  }
]

const GUIDES = [
  {
    "href": "/fr/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "La déduction immédiate de 300 $ pour l’outillage",
    "desc": "Pourquoi chaque article est évalué séparément, et ce que change un lot."
  },
  {
    "href": "/fr/blog/1000-dollar-instant-deduction-rule-2026",
    "label": "La déduction forfaitaire de 1 000 $ au 1er juillet 2026",
    "desc": "Un forfait sans reçus, ou vos frais réels. Vous n’avez droit qu’à l’un des deux."
  },
  {
    "href": "/fr/superannuation",
    "label": "Récupérer sa super en quittant l’Australie",
    "desc": "Comment fonctionne le DASP, et ce qui en est retenu."
  }
]

const SERVICES = [
  {
    "href": "/fr/tax-return",
    "label": "Tax return"
  },
  {
    "href": "/fr/superannuation",
    "label": "Super"
  },
  {
    "href": "/fr/blog/tax-residency-working-holiday-makers",
    "label": "Résidence fiscale"
  }
]

/* Tout ce qui suit le contenu est partagé : les schémas, les tokens et
   chaque rendu de section vivent une seule fois dans JobExpensesPage, pour les 21 pages métier. */
export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'fr',
        path: '/fr/expenses/fifo',
        articleHeadline: "FIFO en Australie : déductions EPI, tickets, Zone Offset",
        articleDescription: "Les repas du camp et le trajet jusqu’à l’aéroport ne sont pas déductibles. Le Zone Tax Offset n’est sans doute pas pour vous non plus. Voici ce qui l’est.",
        inLanguage: "fr",
        photoKey: 'expenses/fifo',
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
