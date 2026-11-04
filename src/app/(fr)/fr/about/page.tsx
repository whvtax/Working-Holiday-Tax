import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { waUrl } from '@/lib/wa'
import { AboutView, type AboutCopy } from '@/components/wht/AboutBlocks'
import { Mark } from '@/components/wht/Type'
import { blocks } from '@/components/wht/Blocks'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: { absolute: 'À propos de Working Holiday Tax : PVT 417 et 462 uniquement' },
  description: 'L’impôt des PVT est la seule chose que nous faisons. Tous nos clients ont un visa 417 ou 462, de la première fiche de paie au vol retour.',
  alternates: {
    canonical: `${SITE_URL}/fr/about`,
    languages: {
      'en-AU': `${SITE_URL}/about`,
      'de': `${SITE_URL}/de/about`,
      'ja': `${SITE_URL}/ja/about`,
      ...newLocaleLanguages('/about'),
      'x-default': `${SITE_URL}/about`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax : déclaration d’impôts en Australie' }],
    title: 'À propos de Working Holiday Tax',
    description: 'Un seul type de client : les PVT avec un visa 417 ou 462. L’année que nous voyons, de la première fiche de paie au vol retour.',
    url: `${SITE_URL}/fr/about`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'fr_FR',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'À propos de Working Holiday Tax',
    description: 'L’impôt des PVT est la seule chose que nous faisons. Tous nos clients ont un visa 417 ou 462.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WA = waUrl({ topic: 'general', lang: 'fr' })

/**
 * L’histoire est celle de l’année du lecteur, pas une histoire d’entreprise.
 * Chaque phrase de cette page doit être littéralement vraie : on ne peut
 * décrire en détail que l’année que le visiteur a vécue.
 */
const chapters = [
  {
    stage: 'Première semaine',
    title: 'Vous avez débarqué avec un plan qui tenait environ quinze jours',
    body: 'Une auberge de jeunesse, une carte SIM, un compte en banque et un job au plus vite. Un tax file number (TFN) figurait quelque part sur la liste. Personne ne vous avait expliqué l’année fiscale australienne.',
  },
  {
    stage: 'Vos premières fiches de paie',
    title: 'Le premier job a commencé avant que le numéro n’arrive',
    body: 'Sans tax file number au dossier, un employeur doit prélever au taux maximum, et non le taux auquel un titulaire de working holiday visa est normalement imposé. Ces premières semaines, il manque donc près de la moitié.\n\nCet argent ne revient pas tout seul.',
  },
  {
    stage: 'À Noël',
    title: 'Quatre employeurs, dont la moitié en casual, et personne pour vous expliquer quoi que ce soit',
    body: 'Un job en auberge, un café, trois semaines dans un entrepôt, un autre quitté sans dernière fiche de paie. L’année fiscale australienne se termine en juin, pas en décembre.\n\nPerdre vos fiches de paie n’est pas un problème : tout ce que vos employeurs ont déclaré, nous le voyons via l’ATO.',
  },
  {
    stage: 'Les 88 jours',
    title: 'Si vous les avez faits, vous avez roulé longtemps pour ça',
    body: 'Quelque part vers l’ouest, ou le nord, ou trois heures après une ville dont vous n’aviez jamais entendu parler.\n\nLe logement était déduit de votre salaire avant même que vous le voyiez, les fiches de paie ne ressemblaient pas à celles de la ville, et c’est la partie de l’année dont les gens sont le moins sûrs.',
  },
  {
    stage: 'Le vol retour',
    title: 'Vous avez pris l’avion, votre super est restée',
    body: 'La super (superannuation) ne peut être réclamée qu’une fois que vous avez quitté l’Australie et que le visa a expiré : la vôtre est donc peut-être encore chez un fonds que vous ne vous rappelez pas avoir choisi. L’impôt prélevé à un taux plus élevé pendant ces premières semaines est réglé quand la déclaration est évaluée, et le résultat dépend de votre année.',
  },
]

const faqs = [
  {
    question: 'Avec qui travaillez-vous exactement ?',
    answer: 'Avec les titulaires d’un working holiday visa, et personne d’autre. Tous nos clients sont en Australie avec un visa 417 ou 462, ou l’étaient et sont rentrés depuis. Nous ne prenons pas de résidents australiens, d’étudiants, de travailleurs sponsorisés ni d’entreprises.',
  },
  {
    question: 'Pouvez-vous m’aider si j’ai déjà quitté l’Australie ?',
    answer: 'Oui, et une grande partie de notre travail, c’est exactement ça. La super ne peut être réclamée qu’après votre départ et l’expiration de votre visa, et une année terminée peut être déclarée de n’importe où : tout se fait donc à distance.',
  },
  {
    question: 'Ai-je besoin de mes fiches de paie ?',
    answer: 'Non. Ce que vos employeurs ont prélevé et déclaré, nous le voyons via l’ATO : nous travaillons donc à partir de ce dossier, plutôt que de papiers d’un job quitté il y a huit mois. Si ce que vous nous dites ne correspond pas à ce qu’un employeur a déclaré, nous nous occupons de l’écart.',
  },
  {
    question: 'Et s’il n’y a aucun remboursement à la fin ?',
    answer: 'Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique. La garantie ne s’applique qu’aux déclarations avec revenus sous TFN. Toutes les années de PVT ne donnent pas lieu à un remboursement, et nous préférons vous le dire tôt plutôt que d’accepter le dossier en espérant.',
  },
]

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/fr/about#webpage`,
  url: `${SITE_URL}/fr/about`,
  name: 'À propos de Working Holiday Tax',
  description: 'L’impôt des PVT est la seule chose que nous faisons. Tous nos clients ont un visa 417 ou 462.',
  inLanguage: 'fr',
  mainEntity: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.about-lead'] },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'fr',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/fr` },
    { '@type': 'ListItem', position: 2, name: 'À propos', item: `${SITE_URL}/fr/about` },
  ],
}

const copy: AboutCopy = {
  lang: 'fr',
  wa: WA,
  homeHref: "/fr",
  homeLabel: "Accueil",
  crumbsLabel: "Fil d’Ariane",
  crumbLabel: "À propos",
  kicker: "À propos",
  h1: (
    <>
      Vous avez débarqué avec un plan.<br />Personne n’a parlé <Mark>d’impôts.</Mark>
    </>
  ),
  lead: "L’impôt des PVT est la seule chose que nous faisons. Si vous reconnaissez l’année décrite ci-dessous, il vaut la peine de vérifier votre dossier ATO.",
  ctaHero: "Posez-nous vos questions →",
  contactHref: "/fr/contact",
  contactLabel: "Autres façons de nous joindre →",
  replyNote: "Nous vous répondons, en général dans l’heure pendant les horaires d’ouverture.",
  yearEyebrow: "L’année",
  yearTitle: "À quoi ressemble une année de PVT vue de chez nous ?",
  yearIntro: "Cinq choses arrivent à presque tout le monde avec un visa 417 ou 462, et quatre d’entre elles peuvent avoir coûté de l’argent.",
  chapters,
  whyEyebrow: "Pourquoi nous existons",
  whyTitle: "Pourquoi ne travaillons-nous qu’avec des PVT ?",
  whyParas: [
    "Tous nos clients ont un visa 417 ou 462 : ce qui décide de votre remboursement n’est donc pas un cas particulier que nous allons chercher dans les textes. C’est ce que nous faisons toute la journée.",
    "Un comptable généraliste croise un backpacker quelques fois par an, en juillet, au milieu de deux cents déclarations ordinaires.",
    "Le barème des visas 417 et 462, la résidence fiscale qu’il faut examiner sérieusement au lieu de la supposer, l’exemption Medicare qui dépend de votre situation, une demande de super déposée depuis une chambre, à l’autre bout du monde, onze mois après votre départ : pour nous, c’est un mardi comme un autre.",
    "N’importe qui peut cliquer sur « envoyer ». Le vrai travail se fait avant : parcourir votre année, établir ce qui est vrai plutôt que ce qui est le plus rapide à cocher, puis déposer.",
  ],
  guarantee: "Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique. La garantie ne s’applique qu’aux déclarations avec revenus sous TFN.",
  guaranteeNote: "Toutes les années de PVT ne donnent pas lieu à un remboursement, et si la vôtre a peu de chances d’en donner un, nous vous le dirons.",
  talkEyebrow: "Nous parler",
  talkTitle: "Comment nous joindre ?",
  talkP1: "Par WhatsApp. Pas de numéro de ticket, pas de formulaire qui promet une réponse sous cinq à sept jours ouvrés. Vous pouvez poser une seule question et en rester là.",
  talkP2: (
    <>
      Pour commencer, il ne vous faut ni compte myGov, ni pièce d’identité australienne, ni fiches de paie, que vous soyez encore en Australie ou de retour depuis deux ans. La{' '}
      <Link href="/fr/contact" className={blocks.textLink}>page contact</Link>{' '}
      explique dans quelle langue nous répondons et ce qui se passe ensuite.
    </>
  ),
  ctaSection: "Écrivez-nous sur WhatsApp →",
  reviewsEyebrow: "Avec leurs mots",
  reviewsTitle: "Ce que disent les PVT",
  faqEyebrow: "FAQ",
  faqTitle: "Les questions qu’on nous pose avant le premier message",
  faqIntro: "Pour tout le reste, posez la question sur WhatsApp. C’est plus rapide que de lire.",
  faqs,
  closingEyebrow: "Quand vous voulez",
  closingTitle: "Racontez-nous votre année",
  closingText: "Où vous avez travaillé, à peu près quand, et si vous avez déjà quitté le pays. Cela suffit pour vous dire ce qui vaut la peine d’être réclamé.",
  ctaFooter: "Écrivez-nous sur WhatsApp →",
}

export default function FrenchAboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutView t={copy} />
    </>
  )
}
