import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { waUrl } from '@/lib/wa'
import { ContactView, type ContactCopy } from '@/components/wht/ContactBlocks'
import { Mark } from '@/components/wht/Type'
import { WA_NUMBER, EMAIL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: { absolute: 'Contact : écrivez-nous sur WhatsApp | Working Holiday Tax' },
  description: 'Écrivez-nous sur WhatsApp : une vraie personne répond, en général dans l’heure. Ni myGov, ni pièce d’identité australienne, ni fiches de paie requis.',
  alternates: {
    canonical: `${SITE_URL}/fr/contact`,
    languages: {
      'en-AU': `${SITE_URL}/contact`,
      'de': `${SITE_URL}/de/contact`,
      'ja': `${SITE_URL}/ja/contact`,
      ...newLocaleLanguages('/contact'),
      'x-default': `${SITE_URL}/contact`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax : déclaration d’impôts en Australie' }],
    title: 'Contacter Working Holiday Tax',
    description: 'WhatsApp est le moyen le plus rapide de nous joindre. Une vraie personne vous répond, en général dans l’heure pendant les horaires d’ouverture.',
    url: `${SITE_URL}/fr/contact`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'fr_FR',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Contacter Working Holiday Tax',
    description: 'Écrivez-nous sur WhatsApp. Une vraie personne vous répond, en général dans l’heure.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'contact', lang: 'fr' })

/**
 * Les quatre choses qui empêchent d’envoyer le message. Chaque réponse tient
 * dans les premiers mots, puis dans un paragraphe complet.
 */
const blockers: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: 'Pouvez-vous m’aider si j’ai déjà quitté l’Australie ?',
    a: 'Oui, et une grande partie de notre travail, c’est exactement ça. Une déclaration pour une année terminée peut être déposée de n’importe où, et la super ne peut être réclamée qu’une fois que vous êtes parti et que votre visa a expiré.\n\nUne chose à savoir tôt : l’ATO ne peut verser un remboursement d’impôts que sur un compte bancaire australien, alors que la super peut être versée à l’étranger. Dites-nous si vous avez déjà fermé le vôtre.',
  },
  {
    q: 'Ai-je besoin d’un compte myGov ?',
    a: 'Non. Vous n’aurez jamais à vous connecter à myGov, à lier une pièce d’identité australienne ou à deviner quel formulaire est lequel. Nous traitons directement avec l’ATO.\n\nSi vous avez déjà essayé et buté sur la vérification d’identité, cela ne change rien.',
  },
  {
    q: 'Ai-je besoin de mes fiches de paie ?',
    a: 'Non, et il n’y a rien à rassembler avant de nous écrire. Ce que vos employeurs ont prélevé et déclaré, nous le voyons via l’ATO : même si vous n’avez rien du tout, écrivez-nous quand même.',
    link: { href: '/fr/about', label: 'Pourquoi nous partons du dossier ATO' },
  },
  {
    q: 'Êtes-vous un service fiable ?',
    a: 'Votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO. Les conditions que vous accepteriez sont publiées en intégralité dans notre Client Agreement (en anglais), et les avis de notre fiche Google viennent de PVT avec qui nous avons travaillé.',
    link: { href: '/client-agreement', label: 'Lire le Client Agreement (en anglais)' },
  },
]

const FAQS = [
  {
    question: 'En combien de temps répondez-vous ?',
    answer: 'Pendant les horaires d’ouverture, du lundi au vendredi, de 9 h à 18 h, nous répondons en général dans l’heure. En dehors, nous revenons vers vous dès le premier matin ouvré suivant. Si votre question demande une vérification, nous vous le disons tout de suite.',
  },
  {
    question: 'Faut-il payer juste pour poser une question ?',
    answer: 'Poser une question est gratuit, et vous pouvez en poser autant que vous voulez avant de décider quoi que ce soit. Le service est au forfait, jamais un pourcentage de votre remboursement, et le tarif vous est confirmé sur WhatsApp avant le début du travail.',
  },
  {
    question: 'Dans quelle langue répondez-vous ?',
    answer: 'Dans celle que vous utilisez pour nous écrire, nous faisons de notre mieux pour répondre dans la même langue. Les documents officiels (formulaire de démarrage, contrat, politique de confidentialité) restent en anglais.',
  },
  {
    question: 'Dois-je envoyer des documents tout de suite ?',
    answer: 'Non. Envoyez d’abord la question, rien d’autre. Nous y répondons, et s’il y a du travail à faire, nous vous disons lequel et combien il coûte avant que quoi que ce soit commence.\n\nLes documents viennent plus tard, une fois que vous avez décidé de continuer, et nous vous disons lesquels et comment les envoyer en toute sécurité.',
  },
  {
    question: 'Et si je n’ai pas de remboursement ?',
    answer: 'Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique. Toutes les années de PVT ne donnent pas lieu à un remboursement, et quand la vôtre en a peu de chances, nous préférons vous le dire tôt plutôt que d’accepter le dossier en espérant.',
  },
  {
    question: 'Pouvez-vous m’aider depuis la France ?',
    answer: 'Oui. Une tax return australienne, une demande de super et tout ce qui reste ouvert auprès de l’ATO peuvent se traiter depuis un autre pays, entièrement en ligne.\n\nCela ne remplace pas votre déclaration d’impôts en France, qui est un autre sujet : pour celle-là, adressez-vous à l’administration fiscale française. Nous ne traitons que l’impôt australien.',
  },
]

const contactPageLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/fr/contact#webpage`,
  url: `${SITE_URL}/fr/contact`,
  name: 'Contacter Working Holiday Tax',
  description: 'Écrivez-nous sur WhatsApp : une vraie personne vous répond, en général dans l’heure pendant les horaires d’ouverture.',
  inLanguage: 'fr',
  isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.contact-lead'] },
  mainEntity: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#business`,
    name: 'Working Holiday Tax',
    url: SITE_URL,
    email: EMAIL,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: `+${WA_NUMBER}`,
        email: EMAIL,
        areaServed: 'AU',
        availableLanguage: ['en'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
    ],
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/fr` },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/fr/contact` },
  ],
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'fr',
  mainEntity: [...blockers.map(b => ({ question: b.q, answer: b.a })), ...FAQS.map(f => ({ question: f.question, answer: f.answer }))]
    .map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
}

const copy: ContactCopy = {
  lang: 'fr',
  wa: WA,
  email: EMAIL,
  mailtoHref: `mailto:${EMAIL}?subject=Question%20fiscale%20depuis%20le%20site`,
  homeHref: "/fr",
  homeLabel: "Accueil",
  crumbsLabel: "Fil d’Ariane",
  crumbLabel: "Contact",
  kicker: "Nous contacter",
  h1: <>Écrivez-nous sur <Mark>WhatsApp</Mark></>,
  lead: "Une vraie personne vous lit et vous répond, en général dans l’heure pendant les horaires d’ouverture.",
  ctaHero: "Ouvrir WhatsApp →",
  hours: "Du lundi au vendredi, de 9 h à 18 h",
  blockersEyebrow: "Avant de nous écrire",
  blockersTitle: "Les quatre choses que tout le monde vérifie d’abord",
  blockers,
  otherEyebrow: "Autres moyens",
  otherTitle: "Si WhatsApp ne vous convient pas",
  otherIntro: "L’e-mail fonctionne, et les réseaux sociaux aussi, mais c’est plus lent.",
  emailLabel: "E-mail",
  hoursTitle: "Horaires d’ouverture",
  faqEyebrow: "Questions fréquentes",
  faqTitle: "Les autres questions qu’on nous pose",
  faqs: FAQS,
  closingEyebrow: "Quand vous voulez",
  closingTitle: "Envoyez la question. Le premier pas se résume à ça.",
  closingText: "Où vous avez travaillé, à peu près quand, et si vous avez quitté l’Australie. Cela suffit pour vous dire ce qui vaut la peine d’être réclamé.",
  ctaFooter: "Écrivez-nous sur WhatsApp →",
}

export default function FrenchContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <ContactView t={copy} />
    </>
  )
}
