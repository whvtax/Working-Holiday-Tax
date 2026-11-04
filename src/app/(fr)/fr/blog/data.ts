/**
 * French blog data (ADR 013).
 *
 * Guide bodies live in chunks/01.ts ... chunks/19.ts, one file per batch of
 * guides, each exporting `chunk` keyed by the ENGLISH guide slug. This loader
 * merges them. A guide with no entry in any chunk does not exist in French:
 * it is not listed anywhere and its URL is a 404 (no English fallback).
 * Format rules for writers: scratchpad blog-format.md.
 */
import type { BlogUIStrings } from '@/app/(site)/blog/BlogClient'
import type { Category } from '@/app/(site)/blog/data'
import { createLocaleBlog, mergeChunks } from '@/lib/locale-blog'
import { localePath } from '@/components/blog/newLocaleDefaults'
import { chunk as c01 } from './chunks/01'
import { chunk as c02 } from './chunks/02'
import { chunk as c03 } from './chunks/03'
import { chunk as c04 } from './chunks/04'
import { chunk as c05 } from './chunks/05'
import { chunk as c06 } from './chunks/06'
import { chunk as c07 } from './chunks/07'
import { chunk as c08 } from './chunks/08'
import { chunk as c09 } from './chunks/09'
import { chunk as c10 } from './chunks/10'
import { chunk as c11 } from './chunks/11'
import { chunk as c12 } from './chunks/12'
import { chunk as c13 } from './chunks/13'
import { chunk as c14 } from './chunks/14'
import { chunk as c15 } from './chunks/15'
import { chunk as c16 } from './chunks/16'
import { chunk as c17 } from './chunks/17'
import { chunk as c18 } from './chunks/18'
import { chunk as c19 } from './chunks/19'

export const frChunks = mergeChunks([
  c01, c02, c03, c04, c05, c06, c07, c08, c09, c10,
  c11, c12, c13, c14, c15, c16, c17, c18, c19,
])

const blog = createLocaleBlog('fr', frChunks)

export const hasFrenchGuide = blog.hasGuide
export const getFrenchGuide = blog.getGuide
export const getFrenchGuides = blog.getGuides
export const getFrenchGuideSlugs = blog.getSlugs
/** Paths ('/blog/<slug>', '/blog/category/<slug>', '/blog') for FR_PAGES or the sitemap, once reviewed. */
export const getFrenchSitemapPaths = blog.getSitemapPaths

// ─── UI STRINGS ────────────────────────────────────────────────────────────
export const blogUI: BlogUIStrings = {
  breadcrumbHome: 'Accueil',
  breadcrumbBlog: 'Blog',
  blogLabel: 'Blog',
  h1Line1: 'Impôts en Australie pour les PVT :',
  h1Line2: 'tax return, TFN, super et ABN',
  description: "Tax return, super (DASP), TFN et ABN : des guides pratiques pour les titulaires d'un visa vacances-travail 417 ou 462, expliqués simplement.",
  statsArticles: 'Articles',
  statsCategories: 'Catégories',
  searchPlaceholder: 'Rechercher un article...',
  clearSearch: 'Effacer la recherche',
  allArticles: 'Tous les articles',
  noResults: 'Aucun article trouvé pour',
  showingResults: '',
  resultsMatching: 'articles pour',
  matching: 'pour',
  tryDifferent: 'Essayez un autre mot-clé ou parcourez tous les articles.',
  noArticlesCategory: "Il n'y a pas encore d'article dans cette catégorie.",
  minRead: 'min de lecture',
  readMore: 'Lire la suite',
  showing: 'Affichage de',
  of: 'sur',
  article: 'article',
  articles: 'articles',
}

// ─── CATEGORY METADATA ─────────────────────────────────────────────────────
export type FrCategoryMeta = {
  category: Category
  slug: string
  title: string
  description: string
  intro: string
  faq: Array<{ question: string; answer: string }>
  relatedServicePath?: string
  relatedServiceLabel?: string
}

// Category URL slugs stay the English slugs.
const ALL_CATEGORY_META: FrCategoryMeta[] = [
  {
    category: 'TFN',
    slug: 'tfn',
    title: 'TFN en Australie : tous les guides',
    description: "Demander son TFN gratuitement, délais au-delà de 28 jours, travailler en attendant, numéro perdu, arnaques : tous nos guides TFN au même endroit.",
    intro: "Le Tax File Number (TFN) est le numéro à 9 chiffres que l'administration fiscale australienne (l'ATO) attribue à toute personne qui perçoit un revenu en Australie. Avec un visa vacances-travail, il vous faut un TFN avant de commencer à travailler : sans lui, votre employeur doit retenir 45 % d'impôt au lieu des 15 % prévus pour les working holiday makers. Ces guides couvrent tous les cas, de la première demande aux retards, aux numéros perdus et au retour avec un second visa.",
    faq: [
      { question: "Faut-il un TFN pour travailler en Australie avec un PVT ?", answer: "Oui. Tout working holiday maker qui perçoit un revenu en Australie a besoin d'un Tax File Number. Si votre employeur n'a pas votre TFN, il est légalement tenu de retenir l'impôt au taux maximal de 45 %." },
      { question: "Combien de temps faut-il pour obtenir son TFN ?", answer: "L'ATO traite les demandes de TFN en 28 jours au maximum. Le numéro arrive par courrier à votre adresse postale en Australie. Beaucoup de demandeurs le reçoivent en deux semaines environ." },
      { question: "La demande de TFN est-elle gratuite ?", answer: "Oui, l'administration ne facture rien pour un TFN. Ce qui coûte de l'argent, c'est le temps qui passe avant que votre employeur ait le numéro : chaque paie est alors taxée à 45 % au lieu de 15 %, et cet excédent ne revient que par la tax return." },
      { question: "Peut-on commencer à travailler sans TFN ?", answer: "Oui, mais votre employeur doit retenir 45 % d'impôt tant que vous ne lui avez pas fourni votre TFN. L'excédent peut être récupéré lors de la tax return annuelle." },
    ],
    relatedServicePath: '/tfn',
    relatedServiceLabel: 'Demander votre TFN',
  },
  {
    category: 'ABN',
    slug: 'abn',
    title: 'ABN en Australie : les guides pour PVT',
    description: "Quand un ABN est vraiment nécessaire, inscription gratuite, factures, déductions, seuil de GST et pièges du faux travail indépendant.",
    intro: "L'Australian Business Number (ABN) est un numéro à 11 chiffres dont vous avez besoin pour travailler comme sole trader (indépendant) ou contractor en Australie. C'est le cas lorsqu'une entreprise vous paie sur facture au lieu de vous mettre sur sa feuille de paie. Ces guides expliquent l'inscription, les cas où l'ABN est le bon choix, et son effet sur vos impôts, votre super et vos droits.",
    faq: [
      { question: "Faut-il un ABN avec un PVT en Australie ?", answer: "Il vous en faut un si vous travaillez comme contractor ou sole trader, c'est-à-dire si vous facturez votre travail au lieu d'être salarié. La plupart des titulaires d'un visa vacances-travail en emploi classique n'en ont pas besoin." },
      { question: "Combien coûte un ABN ?", answer: "L'inscription ne coûte rien. Le coût se trouve côté impôts : rien n'est retenu sur une facture, donc toute la charge fiscale reste pour vous jusqu'au dépôt de la tax return. Et un ABN pris alors que vous étiez en réalité salarié vous fait aussi perdre la super et les droits prévus par l'award." },
      { question: "Quelle différence entre TFN et ABN ?", answer: "Le TFN est votre identifiant fiscal personnel, indispensable à tous les travailleurs. L'ABN n'est nécessaire que si vous exercez comme contractor ou sole trader. Beaucoup de working holiday makers ont les deux." },
      { question: "Peut-on avoir un TFN et un ABN en même temps ?", answer: "Oui. Beaucoup de working holiday makers ont les deux : le TFN pour les revenus de salarié, l'ABN pour les missions facturées." },
    ],
    relatedServicePath: '/abn',
    relatedServiceLabel: 'Enregistrer votre ABN',
  },
  {
    category: 'Tax Return',
    slug: 'tax-return',
    title: 'Tax return en Australie : guides pour PVT',
    description: "Déposer sa tax return avec un PVT : ce qui peut vous revenir, exemples chiffrés, déductions, délais et dépôt depuis l'étranger.",
    intro: "L'année fiscale australienne va du 1er juillet au 30 juin, et une tax return vaut en général la peine pour tout working holiday maker qui a perçu un revenu sur cette période. En général, les backpackers obtiennent un remboursement, car leur employeur a retenu plus d'impôt que nécessaire. Ces guides traitent des délais, des déductions, de ce qu'il faut faire une fois parti d'Australie et des situations compliquées.",
    faq: [
      { question: "Quand déposer sa tax return avec un PVT ?", answer: "L'année fiscale se termine le 30 juin. Vous déposez votre tax return entre le 1er juillet et le 31 octobre de la même année. Si vous passez par un tax agent, le délai peut être prolongé." },
      { question: "Un working holiday maker obtient-il un remboursement ?", answer: "Souvent, car l'employeur peut avoir retenu plus d'impôt que le montant réellement dû. Rien n'est garanti : cela dépend de votre année. Le remboursement, s'il y en a un, est versé sur votre compte bancaire australien, le plus souvent dans les deux semaines suivant le dépôt." },
      { question: "Peut-on déposer sa tax return après avoir quitté l'Australie ?", answer: "Oui. Vous pouvez la déposer depuis n'importe où dans le monde. Nous pouvons gérer toute la démarche à distance. Gardez votre compte bancaire australien ouvert jusqu'au versement du remboursement." },
      { question: "Que peut-on déduire en tant que working holiday maker ?", answer: "Parmi les déductions courantes : les déplacements professionnels, les outils, les uniformes, les chaussures de sécurité, la protection solaire pour le travail en extérieur, l'usage du téléphone pour le travail et les honoraires d'un tax agent. Chaque déduction demande un justificatif de la dépense et de son lien avec votre travail." },
    ],
    relatedServicePath: '/tax-return',
    relatedServiceLabel: 'Déposer votre tax return',
  },
  {
    category: 'Super',
    slug: 'super',
    title: 'Super et DASP en Australie : tous les guides',
    description: "Comment fonctionne la super avec un PVT, vérifier que l'employeur verse les 12 %, retrouver une caisse perdue et récupérer son argent via le DASP.",
    intro: "La superannuation (super) est le système de retraite obligatoire de l'Australie. Votre employeur verse 12 % de votre salaire à une caisse de super, en plus de votre paie (taux en vigueur depuis le 1er juillet 2026). Quand vous quittez l'Australie à la fin de votre PVT, vous pouvez la retirer via le Departing Australia Superannuation Payment (DASP). Ces guides expliquent le fonctionnement de la super, comment la suivre et comment la réclamer.",
    faq: [
      { question: "Un PVT donne-t-il droit à la super en Australie ?", answer: "Oui. Tout working holiday maker a droit aux cotisations de super de son employeur. Le taux actuel est de 12 % de vos ordinary time earnings (depuis le 1er juillet 2026, selon l'Annual Wage Review de la Fair Work Commission), versés en plus de votre salaire directement à une caisse de super." },
      { question: "Comment récupérer sa super en quittant l'Australie ?", answer: "Grâce à la procédure DASP, ouverte une fois votre visa expiré ou annulé et après votre départ du pays. Pour un working holiday maker, le paiement est imposé à 65 %." },
      { question: "Quel impôt est prélevé sur un retrait de super ?", answer: "Le taux DASP pour les working holiday makers est de 65 % de la partie imposable (taxable component) de votre solde de super. C'est plus que le taux de 35 % qui s'appliquait avant 2017." },
      { question: "Comment retrouver une super perdue ou non réclamée ?", answer: "En liant votre TFN à votre compte grâce à notre service, en contactant l'ATO, ou en passant par un tax agent qui peut chercher dans toutes les caisses." },
    ],
    relatedServicePath: '/superannuation',
    relatedServiceLabel: 'Récupérer votre super',
  },
  {
    category: 'Work Rights',
    slug: 'work-rights',
    title: 'Droits au travail : guides pour PVT',
    description: "Vos droits sont les mêmes que ceux des travailleurs australiens : salaire minimum de 26,44 $ AUD, majorations de l'award, fiches de paie, recours gratuits.",
    intro: "Les working holiday makers ont en Australie les mêmes droits au travail que les citoyens australiens. La Fair Work Ombudsman fait respecter les salaires minimums, les conditions de travail et les protections prévues par les awards de chaque secteur. Ces guides expliquent à quoi vous avez droit, comment lire votre fiche de paie, repérer un sous-paiement et réagir si votre employeur ne respecte pas les règles.",
    faq: [
      { question: "Quel est le salaire minimum pour un PVT en Australie ?", answer: "Le salaire minimum national est de 26,44 $ AUD de l'heure pour les salariés à temps plein et à temps partiel (depuis le 1er juillet 2026). Les casuals touchent en plus une majoration de 25 %, soit 33,05 $ AUD de l'heure au minimum. La plupart des travailleurs relèvent d'un award sectoriel qui fixe des taux plus élevés." },
      { question: "A-t-on droit à la majoration des jours fériés ?", answer: "Oui. Si vous travaillez un jour férié, vous avez droit à des penalty rates, en général 225 % de votre taux ordinaire (le double plus un quart). Si vous ne travaillez pas, vous pouvez avoir droit à votre taux de base, selon votre type de contrat." },
      { question: "Que faire si son employeur ne paie pas correctement ?", answer: "D'abord, en parler calmement avec votre employeur, relevés à l'appui. Si le problème n'est pas réglé, notre équipe peut vous aider à passer par les bons canaux. Les working holiday makers ont les mêmes protections que les travailleurs australiens et votre visa est protégé quand vous faites une réclamation légitime." },
      { question: "Les casuals ont-ils des jours de maladie payés ?", answer: "Non. En Australie, les casuals n'ont pas droit aux jours de maladie payés. La majoration de 25 % sur le taux horaire de base est censée compenser l'absence de ces congés." },
    ],
  },
  {
    category: 'Medicare & Other',
    slug: 'medicare-and-other',
    title: 'Medicare et assurance santé : les guides',
    description: "Droit à Medicare selon le pays, exemption de la levy de 2 %, assurance santé et remboursement de la GST à l'aéroport.",
    intro: "Les working holiday makers se posent aussi des questions fiscales et administratives en dehors du TFN, de l'ABN, de la tax return et de la super. Ces guides couvrent l'accès à Medicare, la Medicare levy et la Medicare levy surcharge, le remboursement de la GST sur les achats rapportés chez soi, et d'autres sujets utiles aux backpackers qui vivent et travaillent en Australie.",
    faq: [
      { question: "Un PVT paie-t-il la Medicare levy ?", answer: "Cela dépend de votre situation. La Medicare levy de 2 % s'applique aux personnes qui ont droit à Medicare, et l'exemption se vérifie au cas par cas. Un justificatif de Services Australia est nécessaire, et nous nous en occupons avec vous dans le cadre de votre déclaration." },
      { question: "Un PVT peut-il utiliser Medicare ?", answer: "Seuls les ressortissants de pays ayant un Reciprocal Health Care Agreement avec l'Australie (dont le Royaume-Uni, l'Irlande, l'Italie, la Belgique, les Pays-Bas, la Suède, la Norvège, la Finlande, Malte, la Slovénie et la Nouvelle-Zélande) peuvent s'inscrire à Medicare pour une couverture limitée. Tous les autres working holiday makers devraient avoir une assurance santé privée." },
      { question: "Peut-on se faire rembourser la GST sur ce qu'on rapporte chez soi ?", answer: "Oui. Le Tourist Refund Scheme permet de récupérer les 10 % de GST sur les biens de plus de 300 $ AUD (par fournisseur) achetés dans les 60 jours précédant le départ et que vous emportez hors d'Australie. La demande se fait à l'aéroport, avant le vol." },
      { question: "Faut-il une assurance santé privée en Australie ?", answer: "Dans la plupart des cas, oui. L'assurance santé privée est une condition de visa pour de nombreux visas vacances-travail et elle est indispensable pour les backpackers non couverts par un Reciprocal Health Care Agreement." },
    ],
    relatedServicePath: '/medicare',
    relatedServiceLabel: 'Vérifier votre statut Medicare',
  },
]

const listed = new Set<Category>(blog.getListedCategories())

/** Only categories that have at least one French guide. */
export const frCategoryMeta: FrCategoryMeta[] = ALL_CATEGORY_META.filter(c => listed.has(c.category)).map(c => ({
  ...c,
  relatedServicePath: c.relatedServicePath ? localePath('fr', c.relatedServicePath) : undefined,
}))

export function getFrenchCategoryMeta(slug: string): FrCategoryMeta | undefined {
  return frCategoryMeta.find(c => c.slug === slug)
}
