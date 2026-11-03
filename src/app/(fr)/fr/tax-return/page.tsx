import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { Steps, LinkRows, blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, PlainRows } from '@/components/wht/CoreBlocks'
import { Accordion } from '@/components/ui/Accordion'
import { frGuide } from '../_blog-links'

// ─── METADATA ───────────────────────────────────────────────────────────
// Cette page répond à la requête transactionnelle : quelqu’un a déjà décidé
// de se faire aider et veut savoir ce qui se passe ensuite. Aucun prix dans
// le titre, la description ou le schéma, et aucune phrase qui laisse entendre
// que nous sommes nous-mêmes agent fiscal.
export const metadata: Metadata = {
  // Le layout racine ajoute " | Working Holiday Tax" : le titre reste court.
  title: { absolute: 'Faire sa tax return en Australie avec nous : PVT 417 et 462' },
  description:
    'Passeport et compte bancaire australien, sans payslip. Nous déposons la tax return ; s’il y a un remboursement, il arrive en général 14 jours ouvrés après.',
  keywords: [
    'tax return Australie PVT',
    'déclaration d’impôts Australie PVT',
    'déposer sa tax return Australie',
    'tax return visa 417',
    'tax return visa 462',
    'tax return Australie depuis la France',
    'remboursement d’impôts Australie PVT',
    'tax return sans payslip',
    'income statement ATO PVT',
    'délai remboursement tax return Australie',
    'tax return années précédentes Australie',
    'aide déclaration d’impôts PVT Australie',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/tax-return`,
    languages: {
      'en-AU': `${SITE_URL}/tax-return`,
      de: `${SITE_URL}/de/tax-return`,
      ja: `${SITE_URL}/ja/tax-return`,
      ...newLocaleLanguages('/tax-return'),
      'x-default': `${SITE_URL}/tax-return`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tax-return.png`, width: 1200, height: 630, alt: 'Dépôt de la tax return pour les titulaires d’un visa vacances-travail 417 et 462 en Australie' }],
    type: 'website',
    locale: 'fr_FR',
    url: `${SITE_URL}/fr/tax-return`,
    siteName: 'Working Holiday Tax',
    title: 'Tax return Australie PVT (visas 417 et 462)',
    description:
      'Vos informations et le compte où verser le remboursement. Nous lisons le dossier ATO, préparons la tax return, vous signez, elle est déposée, et l’éventuel remboursement arrive en général environ 14 jours ouvrés plus tard.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tax-return.png`],
    card: 'summary_large_image',
    title: 'Tax return Australie PVT (visas 417 et 462)',
    description: 'Passeport, coordonnées bancaires, sans fiche de paie. Signée par vous, déposée par nous. Remboursement éventuel en général sous 14 jours ouvrés.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** Tout ce que le visiteur doit fournir. Trois éléments, rien d’autre. */
const NEEDED = [
  {
    label: 'Votre passeport et votre visa',
    body: 'Quel passeport vous avez et quelle subclass (catégorie) de visa.',
  },
  {
    label: 'Un compte bancaire australien',
    body: 'L’ATO ne verse les remboursements que sur un compte australien. Si le vôtre est déjà fermé, dites-le dès le début.',
  },
  {
    label: 'À peu près où et quand vous avez travaillé',
    body: 'Une ville, le type de travail, les mois approximatifs. Nous recoupons avec le dossier ATO et complétons le reste.',
  },
]

/** La séquence, dans l’ordre où elle se déroule, avec les attentes incluses. */
const SEQUENCE = [
  {
    n: '01',
    title: 'Vous nous écrivez',
    body: 'Sur WhatsApp. Vous nous racontez votre année, nous vous disons où vous en êtes, et le montant des honoraires est convenu avant que le travail commence.',
  },
  {
    n: '02',
    title: 'Un questionnaire, environ dix minutes',
    body: 'Passeport et visa, coordonnées bancaires, les villes et le type de travail. C’est le seul formulaire que vous remplissez. Laissez vide ce qui ne s’applique pas, nous poserons la question.',
  },
  {
    n: '03',
    title: 'Nous ouvrons votre dossier ATO',
    body: 'Chaque employeur qui vous a déclaré, chaque income statement, chaque dollar retenu, et toute année précédente encore ouverte. Les jobs oubliés et les semaines taxées au taux maximal apparaissent ici, pas dans ce dont vous vous souvenez.',
  },
  {
    n: '04',
    title: 'Les décisions qui font bouger le chiffre',
    body: 'La résidence fiscale pour l’année, les semaines retenues avant l’arrivée de votre TFN, la question de savoir si la Medicare levy était vraiment à votre charge, et ce que votre métier permet de déduire. C’est la partie lente, et celle pour laquelle vous payez.',
  },
  {
    n: '05',
    title: 'Vous relisez et vous signez',
    body: 'Nous vous envoyons la tax return terminée avec chaque chiffre expliqué, et rien ne part à l’ATO avant que vous l’ayez lue et signée. La signature est électronique, donc possible depuis un téléphone à l’autre bout du monde.',
  },
  {
    n: '06',
    title: 'Elle est déposée',
    body: 'Vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO. Le dépôt lui-même prend quelques minutes.',
  },
  {
    n: '07',
    title: 'Le remboursement, s’il y en a un',
    body: 'Les remboursements arrivent en général environ 14 jours ouvrés après le dépôt, sur le compte australien que vous nous avez donné. Si l’ATO pose une question, nous y répondons et nous vous disons ce qui a été demandé.',
  },
]

/**
 * D’où vient un remboursement de PVT. Chaque élément est un mécanisme déjà
 * énoncé ailleurs sur le site ; aucun montant n’est promis. La phrase sur la
 * fourchette est la formulation validée par le propriétaire.
 */
const REFUND_SOURCES = [
  {
    label: 'Des semaines taxées à 45 % avant l’arrivée de votre TFN',
    body: 'Sans votre TFN enregistré, et sans déclaration indiquant que votre demande est en cours, votre employeur doit retenir 45 % au lieu du taux normal. Sur chaque fiche de paie de cette période, trop d’impôt a été retenu, et cela ne revient que par une tax return déposée.',
  },
  {
    label: 'Un deuxième job sans sa propre déclaration',
    body: 'Chaque employeur a besoin de sa propre Tax File Number Declaration. Un deuxième job sans déclaration est imposé à 45 % tant que personne ne le remarque, souvent pendant des mois.',
  },
  {
    label: 'Un employeur non enregistré pour les working holiday makers',
    body: 'Le taux retenu dépend notamment de la façon dont votre employeur est enregistré auprès de l’ATO. Si la retenue n’a pas été faite au bon taux, la déclaration permet de le faire revoir, selon votre situation.',
  },
  {
    label: 'Une Medicare levy qui n’a jamais été à votre charge',
    body: 'La levy de 2 % est appliquée par défaut. Selon votre situation, vous pouvez ne pas y être soumis, et avec le bon certificat la levy peut être retirée.',
  },
  {
    label: 'Des frais de travail que personne n’a déduits',
    body: 'Chaussures, uniformes, outils, licences et trajets entre chantiers peuvent réduire votre revenu imposable quand ils sont liés au travail effectué. Chaque dollar de déduction justifiée peut réduire l’impôt, selon votre situation.',
  },
]

const RULES = [
  {
    label: 'Le remboursement ne peut aller que sur un compte australien',
    body: 'La super (DASP) peut être versée sur un compte à l’étranger. Un remboursement d’impôt, non. Si vous êtes sur le point de fermer votre compte bancaire australien, attendez que le remboursement soit arrivé, ou prévenez-nous d’abord.',
  },
  {
    label: 'Les années précédentes sont encore possibles',
    body: 'Une année fiscale pour laquelle vous n’avez jamais déposé ne disparaît pas toute seule. Chaque année est sa propre tax return, avec son propre résultat, et nous les traitons de la plus ancienne à la plus récente.',
  },
]

// Les réponses de plus de 55 mots portent une ligne vide : la FAQ rend un <p>
// par paragraphe. faqLd utilise toujours le texte brut.
const FAQS = [
  {
    question: 'Combien de temps prend une tax return de PVT ?',
    answer:
      'À partir du jour où votre questionnaire est reçu, une année simple prend quelques jours à préparer et à vérifier, et l’ATO verse en général le remboursement environ 14 jours ouvrés après le dépôt.\n\nCinq employeurs, des revenus facturés avec un ABN ou une résidence fiscale à argumenter prennent plus de temps de notre côté, et nous vous disons dans quel cas vous êtes.',
  },
  {
    question: 'Quelle est la date limite pour déposer sa tax return de PVT ?',
    answer:
      'Si vous la déposez vous-même, c’est le 31 octobre qui suit la fin de l’année fiscale : la date limite de la tax return 2025-26 était donc le 31 octobre 2026. Une année dont la date limite est passée est en retard, pas perdue, et elle peut toujours être déposée.',
  },
  {
    question: 'Avez-vous besoin de mes fiches de paie (payslips) ?',
    answer:
      'Non. Chaque employeur qui vous a payé via une paie a transmis un income statement à l’ATO, et c’est ce dossier qui sert de base à la tax return. Des payslips perdus et un employeur qui a fermé sont des points de départ tout à fait normaux.\n\nLes seuls papiers à chercher sont les tickets des frais de travail. Si vous n’en avez pas, décrivez le travail et nous vous dirons ce qui est déductible sans eux.',
  },
  {
    question: 'Que dois-je fournir pour faire ma tax return ?',
    answer:
      'Trois choses. Répondre une fois au questionnaire, relire la tax return que nous vous renvoyons, et la signer. Il n’y a aucun compte administratif à créer ni formulaire de l’ATO à décoder, puisque le dépôt passe par nous.',
  },
  {
    question: 'Pouvez-vous déposer pour moi si j’ai déjà quitté l’Australie ?',
    answer:
      'Oui, et beaucoup des tax returns que nous déposons concernent des personnes déjà rentrées chez elles. Le questionnaire, la signature et le dépôt se font tous en ligne.\n\nLe remboursement, lui, ne voyage pas : l’ATO ne peut le verser que sur un compte bancaire australien, alors que la super (DASP) peut être versée à l’étranger. Si votre compte australien est déjà fermé, dites-le dans votre premier message.',
  },
  {
    question: 'Et si je n’ai jamais déposé pour une année précédente ?',
    answer:
      'Elle peut encore être déposée maintenant. Chaque année fiscale est indépendante, avec sa propre tax return et son propre résultat, et le dossier ATO montre quelles années sont encore ouvertes.\n\nChaque année dépend de vos revenus et de ce qui a été retenu : c’est l’ATO qui décide du résultat.',
  },
  {
    question: 'Que se passe-t-il si la tax return indique que je dois de l’argent ?',
    answer:
      'Cela arrive parfois, le plus souvent quand des revenus ont été facturés avec un ABN sans rien retenir.\n\nVous voyez ce montant avant tout dépôt, avec une explication de son origine et des options de paiement de l’ATO. Rien n’est envoyé sans votre signature.',
  },
  {
    question: 'Est-ce que cela remplace ma déclaration d’impôts en France ?',
    answer:
      'Non. La tax return australienne est une démarche distincte de votre déclaration en France. Pour celle-ci, adressez-vous à l’administration fiscale française. Nous ne nous occupons que de l’impôt australien.',
  },
]

const GUIDES = [
  {
    ...frGuide('how-to-lodge-tax-return-from-overseas', 'Déposer après avoir quitté l’Australie'),
    desc: 'Ce qui marche encore depuis chez vous, et la règle du compte bancaire qui piège les gens.',
  },
  {
    ...frGuide('tax-residency-working-holiday-makers', 'Êtes-vous résident fiscal ?'),
    desc: 'Pourquoi l’étape 04 ne se règle pas avec une liste à cocher.',
  },
  {
    ...frGuide('tax-deductions-working-holiday-makers', 'Ce que vous pouvez déduire'),
    desc: 'Les déductions selon le type de travail que vous avez fait, plutôt qu’une liste générique.',
  },
]

const WA_TR = waUrl({ topic: 'tax-return', lang: 'fr' })

export default function TaxReturnPageFR() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/fr/tax-return#webpage`,
    url: `${SITE_URL}/fr/tax-return`,
    name: 'Déposer sa tax return de PVT en Australie',
    description:
      'Comment la tax return australienne d’un titulaire de visa vacances-travail 417 ou 462 est déposée : ce que nous vous demandons, ce que nous vérifions, comment vous signez, et quand arrive le remboursement.',
    inLanguage: 'fr',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/fr/tax-return#service`,
    name: 'Dépôt de la tax return pour les titulaires d’un visa vacances-travail',
    serviceType: 'Préparation et dépôt de la tax return',
    description:
      'Tax returns australiennes pour les titulaires d’un visa vacances-travail 417 ou 462. Vérifiées et validées par un agent fiscal enregistré avant d’être déposées auprès de l’ATO, y compris depuis l’étranger.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australie' },
    audience: { '@type': 'Audience', audienceType: 'Titulaires d’un visa vacances-travail (subclass 417 et 462)' },
    availableLanguage: ['en'],
    inLanguage: 'fr',
  }

  // Les sept étapes, publiées comme procédure lisible par les machines.
  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}/fr/tax-return#howto`,
    name: 'Comment la tax return d’un PVT est déposée',
    description:
      'L’ordre dans lequel une tax return 417 ou 462 est préparée et déposée, du premier message à l’arrivée du remboursement.',
    inLanguage: 'fr',
    step: SEQUENCE.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
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
      { '@type': 'ListItem', position: 2, name: 'Tax return', item: `${SITE_URL}/fr/tax-return` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className={blocks.underHeader}>
        <Crumb home="Accueil" current="Tax return" label="Fil d’Ariane" href="/fr" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>Tax return de PVT&nbsp;&middot; visas 417 &amp; 462</span>
              Vos informations et le compte où verser le remboursement. <Mark>Nous nous occupons du reste.</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>Pas de fiches de paie, pas de compte myGov, pas de formulaire à décoder. Un questionnaire, une signature, et l’éventuel remboursement arrive en général environ 14 jours ouvrés après le dépôt.</Lead>
          </div>
          <WaButton href={WA_TR} position="hero" topic="tax-return" lang="fr">Écrivez-nous sur WhatsApp</WaButton>
          <p className={heroStyles.note}>Réponse en général dans l’heure.</p>
          <GoogleRating variant="pill" lang="fr" />
        </Hero>
      </div>

      <PhotoFrame page="tax-return" locale="fr" />

      <Section tone="pale" eyebrow="D’où vient un remboursement" title="Pourquoi un PVT peut être remboursé" titleId="refund-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Un remboursement n’est pas un bonus de backpacker. C’est l’écart entre ce que vos employeurs ont retenu et ce que vous deviez vraiment, et sur une année de PVT cet écart vient en général des cas ci-dessous. Les remboursements de nos clients vont de quelques centaines à plusieurs milliers de dollars, selon ceux qui se sont appliqués.</p>
        <div className={blocks.cards}>
          {REFUND_SOURCES.map((r) => (
            <div key={r.label} className={blocks.card}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Aucun de ces cas n’est automatique ni présumé d’avance. Chacun est vérifié sur votre dossier ATO avant tout dépôt.{' '}
          <Link href="/fr/calculator" className={blocks.textLink}>Voir une estimation indicative dans le calculateur</Link>.
        </p>
      </Section>

      <Section eyebrow="Votre part" title="Ce dont nous avons besoin de vous" titleId="needed-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Trois choses, et c’est toute la liste.</p>
        <PlainRows items={NEEDED} />
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>Vous n’avez pas besoin de payslips.</p>
          <p className={blocks.text}>Chaque employeur qui vous a mis en paie a déjà déclaré un income statement sur votre tax file number, et c’est de là que part la tax return. Les reçus de frais professionnels sont la seule chose à chercher, et s’il n’y en a pas, dites-nous plutôt en quoi consistait le travail.</p>
        </div>
      </Section>

      <Section id="how-it-works" tone="pale" eyebrow="Les étapes" title="Dans quel ordre ça se passe" titleId="sequence-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Sept étapes. Vous n’intervenez que dans deux d’entre elles, au début et pour signer.</p>
        <Steps items={SEQUENCE} />
        <p className={`${blocks.text} ${blocks.muted}`}>
          Plus de détails sur l’étape 04 :{' '}
          <Link href="/fr/abn" className={blocks.textLink}>ce que change un ABN</Link>, si une partie de vos revenus a été facturée plutôt que versée via une paie.
        </p>
      </Section>

      <Section title="Deux règles changent l’ordre dans lequel s’y prendre" titleId="rules-title">
        <div className={blocks.cards}>
          {RULES.map((r) => (
            <div key={r.label} className={`${blocks.palePanel} ${blocks.stack}`}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="amber" title="Notre garantie" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique.
        </p>
        <p className={blocks.text}>Le montant est convenu avec vous sur WhatsApp avant l’étape 01.</p>
      </Section>

      <Section tone="pale" title="L’impôt des PVT est la seule chose que nous faisons." titleId="trust-title">
        <p className={blocks.text}>Le questionnaire, les vérifications et l’ordre ci-dessus ont été construits autour d’une seule année de visa, et rien d’autre. Vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO.</p>
        <GoogleReviewsServer lang="fr" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Aucune personne sérieuse ne vous demandera votre mot de passe myGov.</strong>{' '}
          Nous ne le demandons jamais, car le circuit de dépôt décrit ci-dessus ne l’utilise pas. Si un message réclame ces identifiants, il ne vient pas de nous.
        </p>
      </Section>

      <Section title="Ce que l’on nous demande avant d’envoyer quoi que ce soit" titleId="faq-title">
        {/* Accordion découpe les réponses sur une ligne vide ; faqLd ci-dessus utilise le texte brut. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Guides" title="La version longue des étapes difficiles" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="Et ensuite" title="N’oubliez pas votre super en Australie" titleId="next-title">
        <p className={blocks.text}>Votre employeur a versé de la superannuation en plus de votre salaire pendant que vous travailliez ici. Quand vous quittez l’Australie définitivement, elle peut être réclamée, séparément de la tax return.</p>
        <LinkButton href="/fr/superannuation">Comment fonctionne la demande de super →</LinkButton>
      </Section>

      <Section tone="forest" title="Commencez par un message, pas par un formulaire" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Envoyez-nous les villes où vous avez travaillé, à peu près quels mois, et si vous avez déjà facturé avec un ABN. Cela suffit pour dire quelles années sont ouvertes et à quoi ressemble votre part. Être rentré depuis deux ans n’y change rien.</p>
        <WaButton href={WA_TR} position="section" topic="tax-return" lang="fr" tone="light">Écrivez-nous sur WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Réponse en général dans l’heure.</p>
      </Section>

      <MobileCta href={WA_TR} lang="fr" topic="tax-return" />
    </>
  )
}
