import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { PagePhoto } from '@/components/wht/PagePhoto'
import { CalculatorClient } from './CalculatorClient'
import { MobileCta } from '@/components/ui/MobileCta'

export const metadata: Metadata = {
  title: { absolute: 'Calculateur tax return Australie PVT (taux 2025-26)' },
  description:
    'Estimez votre remboursement d’impôts australien et votre super après la taxe DASP de 65 %. Taux actuels des visas 417 et 462, à titre indicatif.',
  alternates: {
    canonical: `${SITE_URL}/fr/calculator`,
    languages: {
      'en-AU': `${SITE_URL}/calculator`,
      'de': `${SITE_URL}/de/calculator`,
      'ja': `${SITE_URL}/ja/calculator`,
      ...newLocaleLanguages('/calculator'),
      'x-default': `${SITE_URL}/calculator`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Calculateur de tax return pour les PVT' }],
    type: 'website',
    locale: 'fr_FR',
    url: `${SITE_URL}/fr/calculator`,
    siteName: 'Working Holiday Tax',
    title: 'Calculateur tax return Australie PVT (taux 2025-26)',
    description: 'Un remboursement indicatif et votre super après la taxe DASP de 65 %, avec les taux actuels des visas 417 et 462.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Calculateur tax return Australie PVT',
    description: 'Un remboursement indicatif et votre super après la taxe DASP de 65 %.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'J’ai le chiffre. Puis-je simplement déposer ma déclaration moi-même ?',
    answer:
      'Oui, et déposer est vraiment la partie facile. Ce qu’une estimation ne peut pas faire, c’est changer le chiffre : ce n’est que de l’arithmétique sur les nombres que vous avez déjà.\n\nTrois appréciations décident du vrai résultat, et aucune n’est un champ de cette page : quelle résidence fiscale est la vôtre, si la Medicare levy aurait dû être prélevée, et ce que votre type de travail permet de déduire.',
  },
  {
    question: 'Ce calculateur est-il précis ?',
    answer:
      'Il fait une arithmétique exacte sur les chiffres que vous saisissez, et rien de plus. Il applique les taux 2025-26 des titulaires d’un working holiday visa et des résidents fiscaux australiens aux revenus et aux retenues que vous indiquez. Prenez le résultat comme un point de départ, pas comme une réponse finale.',
  },
  {
    question: 'Quels taux d’impôt le calculateur utilise-t-il ?',
    answer:
      'Il utilise les barèmes publiés par l’ATO pour l’année 2025-26. Lequel s’applique à votre situation est une appréciation au cas par cas, pas un réglage, et c’est l’ATO qui décide en dernier ressort. Notre équipe l’examine dans le cadre de la préparation de votre déclaration.',
  },
  {
    question: 'Pourquoi le calculateur n’inclut-il pas la Medicare levy ?',
    answer:
      'Parce que la levy dépend de votre droit à Medicare, qu’un calculateur ne peut pas vérifier. La Medicare levy est un prélèvement distinct de 2 % du revenu imposable, et lorsqu’elle n’était pas due, elle peut être retirée avec un certificat d’exemption.\n\nL’inclure par défaut pourrait fausser l’estimation : elle est donc traitée lors de la vérification, où votre droit est contrôlé.',
  },
  {
    question: 'Le calculateur indique que je dois de l’impôt. C’est définitif ?',
    answer:
      'En général, non. Un résultat qui montre de l’impôt à payer correspond presque toujours à des revenus sur lesquels peu ou pas d’impôt a été retenu, comme le travail sous ABN, ou à des déductions manquantes, puisqu’il n’y a nulle part où les saisir.\n\nLes déductions réduisent le revenu imposable et peuvent transformer une somme due en remboursement : mieux vaut faire vérifier votre situation que de croire que le chiffre est final.',
  },
  {
    question: 'Puis-je utiliser ce calculateur une fois rentré en France ?',
    answer:
      'Oui. Votre situation fiscale australienne dépend des revenus que vous avez gagnés en Australie et du visa que vous déteniez à ce moment-là, pas de l’endroit où vous vivez maintenant.\n\nLe calculateur fonctionne de la même façon depuis Paris, Montréal ou Sydney, et une déclaration peut être déposée de n’importe où. Ce qui change une fois que vous êtes parti, c’est que votre super devient aussi réclamable via le DASP.\n\nCela ne remplace pas votre déclaration d’impôts en France, qui est un autre sujet : pour celle-là, adressez-vous à l’administration fiscale française.',
  },
  {
    question: 'Que fait le calculateur du montant de la super ?',
    answer:
      'Il applique le taux de retenue DASP au solde que vous saisissez et affiche ce qui arriverait sur votre compte. Pour toute personne ayant déjà détenu un visa 417 ou 462, ce taux est de 65 % sur la composante imposable : un solde de 10 000 $ donne donc environ 3 500 $.\n\nLa super fait l’objet d’une demande distincte de votre tax return, payable seulement une fois que vous avez quitté l’Australie et que votre visa a expiré ou été annulé.',
  },
]

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
    { '@type': 'ListItem', position: 2, name: 'Calculateur', item: `${SITE_URL}/fr/calculator` },
  ],
}

// Pas de bloc `offers` : aucun prix n’apparaît sur le site public, ni dans le
// texte ni dans le schema.
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Calculateur de tax return pour PVT en Australie',
  description:
    'Estimation indicative du remboursement d’impôts australien et de la super (DASP) pour les titulaires d’un working holiday visa, avec les taux 2025-26.',
  url: `${SITE_URL}/fr/calculator`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  inLanguage: 'fr',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/fr/calculator#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1'] },
  url: `${SITE_URL}/fr/calculator`,
}

export default function FrenchCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <CalculatorClient faqs={faqs} photo={<PagePhoto page="calculator" locale="fr" priority />} />
      <MobileCta href={waUrl({ topic: 'calculator', lang: 'fr' })} lang="fr" topic="calculator" />
    </>
  )
}
