import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { WaButton } from '@/components/wht/WaButton'
import { LinkButton } from '@/components/wht/Button'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { Crumbs, PhotoBand, tb } from '@/components/wht/TfnAbnBlocks'
import { frGuide } from '../_blog-links'

// ─── METADATA ───────────────────────────────────────────────────────────
// Cette page porte sur ce qu’un ABN change dans la tax return elle-même.
// Aucun prix, et aucun titre ni mot-clé qui laisse entendre que nous sommes agent fiscal.
export const metadata: Metadata = {
  // Le layout racine ajoute " | Working Holiday Tax" : le titre reste court.
  title: { absolute: 'Demande d’ABN en PVT : ce que ça change à la tax return' },
  description:
    'Un ABN change le contenu de votre tax return : revenus facturés sans retenue, frais professionnels, GST, et la question employé ou contractor.',
  keywords: [
    'ABN Australie',
    'ABN PVT',
    'faire un ABN Australie',
    'Australian Business Number backpacker',
    'sole trader ABN visa 417',
    'sole trader ABN visa 462',
    'ABN ou TFN',
    'ABN et tax return PVT',
    'ai-je besoin d’un ABN PVT',
    'employé ou contractor Australie',
    'frais professionnels ABN PVT',
    'seuil GST ABN',
    'faux indépendant Australie PVT',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/abn`,
    languages: {
      'en-AU': `${SITE_URL}/abn`,
      de: `${SITE_URL}/de/abn`,
      ja: `${SITE_URL}/ja/abn`,
      ...newLocaleLanguages('/abn'),
      'x-default': `${SITE_URL}/abn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-abn.png`, width: 1200, height: 630, alt: 'ABN pour les titulaires d’un visa vacances-travail en Australie' }],
    type: 'website',
    locale: 'fr_FR',
    url: `${SITE_URL}/fr/abn`,
    siteName: 'Working Holiday Tax',
    title: 'ABN en PVT : ce qu’il change dans votre tax return',
    description:
      'Un ABN ne change pas votre job, il change votre tax return. Revenus facturés, frais professionnels, GST, et la question employé ou contractor.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-abn.png`],
    card: 'summary_large_image',
    title: 'ABN en PVT : ce qu’il change dans votre tax return',
    description: 'Un ABN ne change pas votre job. Il change votre tax return.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** Les quatre choses qu’un ABN change dans la tax return. C’est le cœur de la page. */
const THE_SPLIT = [
  {
    n: '01',
    title: 'Rien n’a été retenu, donc l’impôt reste dû',
    body: 'Un salaire arrive avec l’impôt déjà prélevé. Une facture, non : l’impôt sur les revenus facturés se règle une seule fois, en fin d’année. Dans une année mixte, la partie fiche de paie ressemble à un remboursement, pas la partie facturée.',
  },
  {
    n: '02',
    title: 'Les déductions deviennent des frais professionnels, avec d’autres règles',
    body: 'En tant qu’employé, vous déduisez des frais liés au travail. En tant que sole trader (indépendant), vous déduisez les coûts de fonctionnement de l’activité : une catégorie plus large, avec des justificatifs plus stricts derrière.',
  },
  {
    n: '03',
    title: 'La GST est une position à prendre, pas une formalité',
    body: 'La plupart des PVT n’approchent jamais le seuil de 75 000 $ de chiffre d’affaires, donc la plupart ne devraient pas être enregistrés. Le VTC (rideshare) est l’exception. Se tromper, c’est des obligations BAS dont vous n’aviez pas besoin, ou qui vous ont échappé.',
  },
  {
    n: '04',
    title: 'Avez-vous vraiment été contractor ?',
    body: 'C’est la question qui décide des trois autres. Être vraiment contractor dépend du contrôle exercé sur vous, pas des papiers. Un ABN posé sur un travail qui était un emploi est la raison la plus courante pour laquelle la tax return d’un backpacker doit être refaite.',
  },
]

const WHAT_WE_DO = [
  {
    title: 'Nous vérifions que vous en avez besoin avant d’en créer un',
    body: 'Beaucoup de gens créent un ABN pour un job qui était un emploi depuis le début. C’est une conversation, pas un formulaire.',
  },
  {
    title: 'Nous l’enregistrons selon le travail que vous faites vraiment',
    body: 'L’activité que vous déclarez vous suit dans la GST, les déductions et la tax return.',
  },
  {
    title: 'Nous vous disons quoi mettre de côté',
    body: 'À peu près ce que les revenus facturés vous coûteront au moment de l’impôt, pour que la facture ne soit pas une surprise.',
  },
  {
    title: 'Nous vous disons quoi garder',
    body: 'Quels justificatifs soutiennent une déduction dans votre métier, et quels tickets vous pouvez arrêter de garder.',
  },
  {
    title: 'Nous prenons la position GST en connaissance de cause',
    body: 'Enregistré parce que les règles l’exigent, ou non enregistré parce qu’elles ne l’exigent pas. Jamais par accident.',
  },
  {
    title: 'Nous mettons les deux moitiés dans une seule tax return',
    body: 'Les revenus de fiche de paie et les revenus facturés vont dans la même tax return, rapprochés sur la même année.',
  },
]

// Les réponses de plus de 55 mots portent une ligne vide : la FAQ rend un <p>
// par paragraphe. faqLd utilise toujours le texte brut.
const FAQS = [
  {
    question: 'Puis-je le faire moi-même ?',
    answer:
      'Oui, et si toute votre année est faite de fiches de paie, c’est simple.\n\nL’ABN est ce qui complique les choses : où passe la ligne entre salaire et revenus facturés, avez-vous vraiment été contractor, quels coûts passent côté facturé, fallait-il vous enregistrer à la GST. Ce sont des jugements sur votre année, pas des cases à remplir.',
  },
  {
    question: 'Comment un ABN change-t-il ma tax return de PVT ?',
    answer:
      'Les salaires arrivent avec l’impôt déjà retenu et un relevé de revenus (income statement) que votre employeur transmet à l’ATO : cette moitié se rapproche presque d’elle-même.\n\nLes revenus facturés avec un ABN arrivent sans impôt retenu, se déclarent comme revenus d’activité, et ne sont réduits que par des frais que vous pouvez justifier. Ajoutez la position GST et la question de savoir si l’arrangement était vraiment du contracting. Les deux moitiés finissent dans la même tax return.',
  },
  {
    question: 'Mon employeur dit que j’ai besoin d’un ABN pour un job normal. Est-ce vrai ?',
    answer:
      'En général non, et mieux vaut résister avant de vous enregistrer. S’il fixe votre planning, vous dit comment faire le travail, fournit les outils et peut vous renvoyer chez vous plus tôt, vous êtes traité comme un employé, quels que soient les papiers.\n\nUn ABN reporte le coût sur vous : pas d’impôt retenu, pas de superannuation, pas d’assurance accidents du travail (workers compensation), pas de salaire minimum ni de majorations. Envoyez-nous les détails du job avant d’accepter quoi que ce soit.',
  },
  {
    question: 'Faut-il s’enregistrer à la GST avec un visa vacances-travail ?',
    answer:
      'Seulement si votre chiffre d’affaires atteint 75 000 $ sur un an, ce dont la plupart des PVT sont loin, ou si vous faites du VTC (rideshare). Toute personne qui assure du transport de type taxi ou de la mise en relation de passagers, Uber compris, doit s’enregistrer à la GST dès la première course, quel que soit son revenu.\n\nLes livreurs de repas et les coursiers ne sont pas concernés par cette règle et retombent sur le seuil de 75 000 $. L’enregistrement entraîne des déclarations d’activité trimestrielles (BAS).',
  },
  {
    question: 'Peut-on avoir à la fois un TFN et un ABN ?',
    answer:
      'Oui, et la plupart des PVT qui travaillent comme contractors finissent avec les deux. Le TFN vous couvre en tant qu’employé, l’ABN en tant que sole trader.\n\nIls ne vont pas sur des déclarations séparées : une seule tax return couvre l’année fiscale et déclare les deux. Il vous faut d’abord le TFN, parce que la demande d’ABN est recoupée avec lui.',
  },
  {
    question: 'Que peut-on déduire en frais professionnels avec un ABN ?',
    answer:
      'Les coûts engagés pour gagner ces revenus, répartis honnêtement quand quelque chose sert aussi à titre privé.\n\nPour un livreur, cela veut dire des kilomètres bien relevés, les frais de vélo ou de véhicule, téléphone et data, assurance, équipement et la commission prélevée par la plateforme. Pour un sous-traitant sur un chantier, ce sont les outils, l’équipement de protection et les trajets entre chantiers.\n\nCela n’inclut jamais le voyage jusqu’en Australie, le trajet habituel entre le domicile et un seul lieu de travail, ni rien dont vous ne pouvez pas justifier.',
  },
  {
    question: 'Que devient mon ABN quand je quitte l’Australie ?',
    answer:
      'Vous l’annulez une fois votre activité terminée, car un ABN actif dit à l’ATO que vous gérez toujours une activité et que vous avez peut-être encore des obligations.\n\nL’annuler n’affecte ni la tax return de l’année travaillée, qui doit quand même être déposée, ni la possibilité de récupérer la super issue d’un revenu salarié sur la même période. Si vous partez bientôt, prévenez-nous tôt, car l’ordre entre annulation, dépôt et récupération de la super compte.',
  },
]

const GUIDES = [
  {
    ...frGuide('employee-vs-contractor-australia', 'Employé ou contractor'),
    desc: 'Le test que l’ATO applique, et ce que coûte le fait d’être du mauvais côté.',
  },
  {
    ...frGuide('abn-deductions-business-expenses', 'Déductions et frais professionnels avec un ABN'),
    desc: 'Ce qu’un sole trader peut déduire selon son métier, et les justificatifs derrière chaque ligne.',
  },
  {
    ...frGuide('gst-and-abn-for-working-holiday-makers', 'La GST et votre ABN'),
    desc: 'Le seuil de 75 000 $, l’exception du VTC, et ce à quoi l’enregistrement vous engage.',
  },
]

const WA_ABN = waUrl({ topic: 'abn', lang: 'fr' })

export default function ABNPageFR() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/fr/abn#webpage`,
    url: `${SITE_URL}/fr/abn`,
    name: 'ABN avec un visa vacances-travail',
    description:
      'Ce qu’un ABN change dans la tax return australienne d’un PVT : revenus facturés sans retenue, frais professionnels, position GST et question employé ou contractor.',
    inLanguage: 'fr',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/fr/abn#service`,
    name: 'Enregistrement d’un ABN pour les titulaires d’un visa vacances-travail',
    serviceType: 'Enregistrement d’un Australian Business Number',
    description:
      'Enregistrement d’un ABN pour les titulaires d’un visa vacances-travail 417 ou 462 qui font un vrai travail en contrat, avec la position GST, la tenue des justificatifs et les conséquences fiscales expliquées avant l’enregistrement.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australie' },
    audience: { '@type': 'Audience', audienceType: 'Titulaires d’un visa vacances-travail (subclass 417 et 462) qui travaillent comme sole trader' },
    availableLanguage: ['en'],
    inLanguage: 'fr',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'fr',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/fr` },
      { '@type': 'ListItem', position: 2, name: 'ABN', item: `${SITE_URL}/fr/abn` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      {/* SEO : le kicker est dans le H1 pour que le titre porte les mots que les gens tapent. */}
      <div className={blocks.underHeader}>
        <Crumbs homeHref="/fr" home="Accueil" current="ABN" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>ABN avec un visa vacances-travail&nbsp;&middot; 417 &amp; 462</span>
            Un ABN ne change pas votre job.<br />
            Il change <Mark>votre tax return.</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              Revenus sans retenue, frais professionnels, une position GST, et une question sous les trois : avez-vous
            vraiment été contractor ?
            </Lead>
          </div>
          <WaButton href={WA_ABN} position="hero" topic="abn" lang="fr">Écrivez-nous sur WhatsApp</WaButton>
          <p className={heroStyles.note}>Réponse en général dans l’heure.</p>
          <GoogleRating variant="pill" lang="fr" />
        </Hero>
        <PhotoBand page="abn" locale="fr" />
      </div>

      <Section eyebrow="Le partage" title="Qu’est-ce qui change dans votre tax return avec un ABN ?" titleId="split-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Quatre choses, et elles se cumulent.
        </p>
        <Steps items={THE_SPLIT} />
      </Section>

      <Section tone="pale" title="Faut-il créer un ABN parce qu’un employeur vous le demande ?" titleId="warn-title">
        <p className={blocks.text}>
          Pas avant que quelqu’un ait regardé le job. Un ABN posé sur un travail qui est en réalité un emploi supprime
            votre superannuation et la retenue d’impôt, retire la couverture d’assurance accidents du travail
            (workers compensation) et vous place hors du salaire minimum et des majorations. Tout cela devient à votre
            charge. C’est fréquent dans le travail agricole, la restauration, le ménage et sur les chantiers.
        </p>
        <p className={blocks.text}>
          Le test, c’est le contrôle, pas les papiers. Qui décide quand vous travaillez, qui dirige la façon de faire,
            qui fournit le matériel, et qui porte le risque si le job tourne mal. Si les réponses pointent vers eux, un
            ABN n’est pas le bon outil.
        </p>
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Envoyez-nous le job avant de vous enregistrer.</strong>{' '}
          En quoi consiste le travail, qui fournit quoi, et comment vous serez payé. Nous vous dirons de quel côté
              il se situe.
        </p>
      </Section>

      <Section eyebrow="Le travail" title="Ce que nous faisons" titleId="work-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          L’enregistrement lui-même est gratuit et prend quelques minutes. Tout ce qui décide de ce qu’il vous coûte
            se passe avant et après.
        </p>
        <div className={tb.pairs}>
          {WHAT_WE_DO.map(c => (
            <div key={c.title} className={blocks.palePanel}>
              <h3 className={blocks.cardTitle}>{c.title}</h3>
              <p className={blocks.text}>{c.body}</p>
            </div>
          ))}
        </div>
        <p className={blocks.statement}>
          Vous n’aurez jamais à vous connecter à myGov, à lier une pièce d’identité ou à deviner quel formulaire
            est le bon. Nous traitons directement avec l’ATO.
        </p>
        <p className={blocks.text}>
          Pas encore d’ABN, et pas de TFN non plus ? Le{' '}
            <Link href="/fr/tfn" className={tb.inlineLink}>TFN passe en premier</Link>, parce que la demande
            d’ABN est recoupée avec lui.
        </p>
      </Section>

      {/* La seule bande ambre : la garantie. */}
      <Section tone="amber" title="Notre garantie" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique.
        </p>
        <p className={blocks.text}>Nos honoraires sont forfaitaires, jamais un pourcentage de ce qui vous revient.</p>
      </Section>

      <Section tone="pale" title="L’impôt des PVT est la seule chose que nous faisons." titleId="trust-title">
        <p className={blocks.text}>
          Ce qui veut dire que nous voyons toujours les mêmes montages d’ABN : le contrat de ferme, la plateforme de
            livraison, le chantier qui paie tout le monde en sous-traitant.
        </p>
        <GoogleReviewsServer lang="fr" />
      </Section>

      <Section title="Les questions sur l’ABN avant de nous écrire" titleId="faq-title">
        {/* Accordion découpe les réponses sur une ligne vide ; faqLd ci-dessus utilise le texte brut. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Guides" title="Plus de détails sur le contracting, les frais et la GST" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="Et ensuite" title="Les deux moitiés finissent dans une seule tax return" titleId="next-title">
        <p className={blocks.text}>Les revenus de fiche de paie et les revenus facturés vont dans la même tax return, pour la même année.</p>
        <div className={blocks.stack}>
          <LinkButton href="/fr/tax-return" size="md">Comment se passe la tax return →</LinkButton>
        </div>
      </Section>

      {/* CTA final, bande forêt. */}
      <Section tone="forest" title="Dites-nous à quoi ressemble le travail" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          À qui vous factureriez, ce que vous feriez, et qui fournit le matériel. Cela suffit pour savoir si un ABN
            a sa place dans votre situation.
        </p>
        <WaButton href={waUrl({ topic: 'abn', lang: 'fr', tier: 'tfn-abn' })} position="section" topic="abn" lang="fr" tier="tfn-abn" tone="light">Écrivez-nous sur WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Réponse en général dans l’heure.</p>
      </Section>

      <MobileCta href={WA_ABN} lang="fr" topic="abn" />
    </>
  )
}
