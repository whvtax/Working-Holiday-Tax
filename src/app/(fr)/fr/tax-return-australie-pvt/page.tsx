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
import { Compare, LinkRows, blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, PlainRows } from '@/components/wht/CoreBlocks'
import { Accordion } from '@/components/ui/Accordion'
import { AGENT_TPB } from '@/lib/agent'
import { frGuide } from '../_blog-links'

// Flagship page for the French market (ADR 013). It answers the search a French
// PVT holder actually types ("tax return Australie PVT") and is written from
// the site facts only: the English tax-return page, legal-text.ts (fees and
// guarantee) and the English guides on TFN, ABN, super, residency and Medicare.
// No claim about French tax law is made anywhere: a French return is a separate
// matter and the reader is sent to the French tax office for it.
// No price in the title, the description or the schema (same decision as the
// English page). The fees are stated in the visible page only.
const PAGE_URL = `${SITE_URL}/fr/tax-return-australie-pvt`

export const metadata: Metadata = {
  title: { absolute: 'Tax return Australie PVT : déclaration et remboursement' },
  description:
    'Tax return Australie PVT : qui doit déclarer, comment ça se passe, ce que ça coûte. Un questionnaire, une signature, pas de payslips.',
  keywords: [
    'tax return Australie PVT',
    'déclaration d’impôts Australie PVT',
    'tax return Australie',
    'impôts Australie PVT',
    'remboursement impôts Australie PVT',
    'tax return visa 417',
    'faire sa tax return Australie',
    'tax return Australie depuis la France',
    'tax return Australie sans payslip',
    'TFN Australie PVT',
    'récupérer sa super Australie',
    'Medicare levy PVT',
    'tax back Australie',
    'tax back Australie PVT',
    'date limite tax return Australie 2026',
    'dois-je faire une tax return Australie',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tax-return.png`, width: 1200, height: 630, alt: 'Tax return en Australie pour les titulaires d’un PVT (visa 417)' }],
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['en_AU'],
    url: PAGE_URL,
    siteName: 'Working Holiday Tax',
    title: 'Tax return Australie PVT : démarches et étapes',
    description:
      'Qui doit déposer une tax return avec un PVT, comment ça se passe avec nous et ce que ça coûte. Préparée avec vous, signée par vous.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tax-return.png`],
    card: 'summary_large_image',
    title: 'Tax return Australie PVT : démarches et étapes',
    description: 'Pas de payslips, pas de compte myGov. Un questionnaire, une signature, et une déclaration préparée avec vous.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** Where a refund can come from. Mechanisms only, never an amount. */
const REFUND_SOURCES = [
  {
    label: "Des semaines à 45 % avant l’arrivée de votre TFN",
    body: "Sans TFN (Tax File Number, votre numéro fiscal australien) enregistré chez l’employeur, et sans déclaration indiquant que votre demande est en cours, il doit retenir 45 % au lieu du taux normal. Chaque fiche de paie de cette période a été trop taxée, et cet argent ne revient que par une tax return déposée.",
  },
  {
    label: "Un deuxième job sans sa propre déclaration",
    body: "Chaque employeur a besoin de sa propre Tax File Number Declaration. Un deuxième job qui tourne sans elle retient 45 % tant que personne ne s’en aperçoit, parfois pendant des mois.",
  },
  {
    label: "Un employeur non enregistré pour les working holiday makers",
    body: "Le taux retenu dépend notamment de la façon dont votre employeur est enregistré auprès de l’ATO. Si la retenue n’a pas été faite au bon taux, la déclaration permet de le faire revoir, selon votre situation.",
  },
  {
    label: "Une Medicare levy qui n’aurait pas dû vous concerner",
    body: "La levy de 2 % est appliquée par défaut. Elle vise les personnes qui ont droit à Medicare. Selon votre situation, vous pouvez en être exempté, avec le bon document.",
  },
  {
    label: "Des frais professionnels que personne n’a déclarés",
    body: "Chaussures de sécurité, tenue de travail, outils, licences, trajets entre deux sites : ces frais peuvent réduire votre revenu imposable quand ils sont liés au travail que vous avez fait. Chaque dollar de frais réellement déductible peut réduire l’impôt, selon votre situation.",
  },
]

/**
 * Key figures, each with its date and source (public/llms.txt "Key facts").
 * The step by step process lives on /fr/tax-return; this page is the guide.
 */
const KEY_FIGURES = [
  {
    label: '15 % jusqu’à 45 000 $ de revenus',
    body: 'Le barème working holiday maker pour 2025-26, inchangé en 2026-27 : 15 % sur les 45 000 premiers dollars, 30 % jusqu’à 135 000 $, 37 % jusqu’à 190 000 $ et 45 % au-delà. Il s’applique dès le premier dollar, sans seuil d’exonération. Source : ATO.',
  },
  {
    label: '45 001 $ : le seuil d’obligation',
    body: 'Si tous vos revenus de l’année sont des salaires de working holiday maker et que votre revenu imposable est inférieur à 45 001 $, l’ATO ne vous oblige à déposer ni tax return ni non-lodgment advice. À partir de 45 001 $, la tax return est obligatoire. Elle reste le seul moyen de déduire des frais ou de récupérer un impôt retenu en trop. Source : ATO, page Working holiday makers (mise à jour le 3 juin 2026).',
  },
  {
    label: '45 % sans TFN',
    body: 'La retenue sur la paie quand votre employeur n’a pas votre TFN, ni d’indication que votre demande est en cours. L’excédent ne revient que par une tax return déposée. Source : ATO.',
  },
  {
    label: '31 octobre 2026',
    body: 'La date limite pour déposer vous-même la tax return 2025-26 (du 1er juillet 2025 au 30 juin 2026). Elle est passée : une déclaration déposée maintenant est en retard, pas perdue. Le délai prolongé des tax agents ne vaut que pour les personnes inscrites sur la liste d’un agent avant le 31 octobre. L’année 2026-27 a commencé le 1er juillet 2026.',
  },
  {
    label: '2 % de Medicare levy',
    body: 'Calculée sur le revenu imposable au moment de l’évaluation, au-delà d’un seuil de faible revenu (28 011 $ pour une personne seule en 2025-26). Une exemption est possible pour les jours où vous n’aviez pas droit à Medicare : voir plus bas selon votre passeport. Source : ATO.',
  },
  {
    label: '12 % de super',
    body: 'Ce que votre employeur verse en plus de votre salaire, depuis le 1er juillet 2025 (inchangé en 2026-27). Depuis le 1er juillet 2026, la plupart des employeurs doivent la verser dans les jours qui suivent chaque paie (Payday Super). Source : ATO.',
  },
  {
    label: '65 % sur le DASP',
    body: 'La retenue sur la part imposable de votre super quand vous la réclamez après votre départ, pour toute personne ayant détenu un visa 417 ou 462, depuis le 1er juillet 2017. Source : ATO.',
  },
  {
    label: 'Environ 14 jours ouvrés',
    body: 'Le délai habituel entre le dépôt et le versement d’un éventuel remboursement, uniquement sur un compte bancaire australien. C’est l’ATO qui décide s’il y a un remboursement et de quel montant.',
  },
]

const RULES = [
  {
    label: "Le remboursement ne va que sur un compte australien",
    body: "La super (DASP) peut, si votre fund le propose, être versée sur un compte à l’étranger. Un remboursement d’impôt, non. Si vous comptez fermer votre compte australien, attendez que le remboursement soit arrivé, ou prévenez-nous avant.",
  },
  {
    label: "Les années précédentes restent possibles",
    body: "Une année fiscale pour laquelle vous n’avez jamais rien déposé ne disparaît pas toute seule. Chaque année est une déclaration à part, avec son propre résultat. Nous les traitons dans l’ordre, la plus ancienne d’abord, et le tarif est convenu avec vous avant de commencer.",
  },
]

// Answers past about 55 words carry a blank line, and the FAQ below renders one
// <p> per paragraph. faqLd still uses the raw string, so the schema matches the
// visible text.
const FAQS = [
  {
    question: "Est-ce que je dois faire une tax return avec un PVT en Australie ?",
    answer:
      "Pas toujours. Selon l’ATO, si tous vos revenus de l’année fiscale (du 1er juillet au 30 juin) sont des salaires perçus en tant que working holiday maker et que votre revenu imposable est inférieur à 45 001 $, vous n’avez à déposer ni tax return ni non-lodgment advice. À partir de 45 001 $, la tax return est obligatoire.\n\nAvec d’autres revenus, par exemple facturés avec un ABN, cette dispense ne s’applique pas : vérifiez avec l’outil « Do I need to lodge a tax return? » de l’ATO, ou écrivez-nous. Même sans obligation, la tax return reste le seul moyen de déduire vos frais professionnels et de faire rembourser un impôt retenu en trop.",
  },
  {
    question: "Quel est le taux d’impôt d’un PVT en Australie ?",
    answer:
      "Quand le barème working holiday maker s’applique, l’impôt est de 15 % sur les 45 000 premiers dollars, puis 30 % jusqu’à 135 000 $, 37 % jusqu’à 190 000 $ et 45 % au-delà (années 2025-26 et 2026-27, source ATO). Sans TFN enregistré chez l’employeur, la retenue sur la paie est de 45 %.\n\nLe barème qui s’applique à vous dépend des faits de votre année, notamment de votre résidence fiscale, et c’est l’ATO qui décide.",
  },
  {
    question: "Quelle est la date limite pour déposer sa tax return ?",
    answer:
      "Si vous la déposez vous-même, c’est le 31 octobre qui suit la fin de l’année fiscale. Pour l’année 2025-26 (1er juillet 2025 au 30 juin 2026), cette date était le 31 octobre 2026. Une déclaration déposée après la date limite est en retard, pas perdue : elle peut toujours être déposée. Le délai prolongé des tax agents ne vaut que si vous étiez inscrit sur la liste d’un agent avant le 31 octobre.\n\nAttendez aussi que vos employeurs aient finalisé leurs déclarations : l’ATO indique pouvoir préremplir la plupart des informations des employeurs d’ici fin juillet. Déposer le 1er juillet, c’est prendre le risque de déclarer des chiffres qui vont encore changer.",
  },
  {
    question: "Est-ce que la tax return australienne remplace ma déclaration d’impôts en France ?",
    answer:
      "Non. Ce sont deux sujets séparés. Nous ne nous occupons que de l’impôt australien : la tax return déposée auprès de l’ATO.\n\nPour votre situation en France et ce que vous devez y déclarer, adressez-vous à l’administration fiscale française. Nous ne donnons aucun avis sur le droit fiscal français.",
  },
  {
    question: "Puis-je faire ma tax return depuis la France, après mon retour ?",
    answer:
      "Oui, et beaucoup de déclarations que nous préparons sont celles de personnes déjà rentrées chez elles. Le questionnaire, la signature et le dépôt se font en ligne.\n\nSeul le remboursement ne voyage pas : l’ATO ne peut le verser que sur un compte bancaire australien, alors que la super (DASP) peut l’être à l’étranger si votre fund le propose. Si votre compte australien est déjà fermé, dites-le dans votre premier message.",
  },
  {
    question: "Puis-je faire ma tax return avant de quitter l’Australie ?",
    answer:
      "Oui, dans un cas précis. Si vous quittez l’Australie définitivement avant le 30 juin et que vous n’aurez plus de revenus australiens cette année-là, hors intérêts, dividendes ou royalties, l’ATO accepte une tax return anticipée. Elle se fait sur formulaire papier, et l’ATO annonce 50 jours ouvrés de traitement.\n\nSinon, la tax return se dépose après le 30 juin, depuis la France ou ailleurs. Un éventuel remboursement est versé sur un compte bancaire australien.",
  },
  {
    question: "J’ai perdu mes payslips, est-ce un problème ?",
    answer:
      "Non. Chaque employeur qui vous a payé par la paie a transmis un income statement à l’ATO, et c’est sur ce dossier que la déclaration est construite. Des payslips perdus, ou un employeur qui n’existe plus, sont des cas de départ normaux.\n\nLe seul papier qui vaut la peine d’être cherché, ce sont les reçus de frais professionnels. Sans reçus, décrivez-nous le travail et nous vous disons ce qui est déductible malgré tout.",
  },
  {
    question: "Quand est-ce que je reçois mon remboursement après la tax return ?",
    answer:
      "En général environ 14 jours ouvrés après le dépôt, sur votre compte bancaire australien. C’est l’ATO qui décide s’il y a un remboursement et de quel montant, pas nous.\n\nSi l’ATO pose une question, nous y répondons et nous vous disons de quoi il s’agissait.",
  },
  {
    question: "C’est quoi le tax back en Australie ?",
    answer:
      "« Tax back » est le nom que les backpackers donnent au remboursement obtenu grâce à la tax return. Ce n’est pas une démarche à part : c’est la même déclaration, déposée auprès de l’ATO, qui compare l’impôt retenu sur votre paie avec l’impôt réellement dû. S’il a été trop retenu, l’ATO rembourse la différence, sur un compte bancaire australien. Rien n’est automatique.",
  },
  {
    question: "Combien vais-je récupérer avec ma tax return ?",
    answer:
      "Personne ne peut le dire avant d’avoir lu votre dossier ATO, et nous ne citons aucune moyenne. Un remboursement est l’écart entre l’impôt retenu et l’impôt dû : il dépend des semaines taxées à 45 %, de la Medicare levy et de vos frais professionnels. Le calculateur du site donne une estimation indicative sur vos propres chiffres.",
  },
  {
    question: "Je n’ai travaillé que quelques semaines, ça vaut le coup de la faire ?",
    answer:
      "Cela dépend de ce qui a été retenu, pas de la durée. Avec seulement des salaires de working holiday maker et moins de 45 001 $ de revenu imposable, l’ATO ne vous oblige pas à déposer. Mais seule une tax return permet de faire rembourser un impôt retenu en trop, par exemple des semaines à 45 % avant l’arrivée de votre TFN, ou de déduire des frais.\n\nCe n’est pas une promesse de remboursement : c’est l’ATO qui décide du résultat.",
  },
  {
    question: "J’ai été payé en cash, qu’est-ce que je fais ?",
    answer:
      "Un revenu est imposable qu’il ait été déclaré ou non, donc le travail payé en cash entre aussi dans la tax return. Ne cherchez pas à l’oublier : décrivez-nous la période (où, combien de semaines, à peu près quelles sommes) et nous voyons comment la reconstituer proprement.",
  },
  {
    question: "Quelle différence entre un TFN et un ABN, et est-ce que ça change ma tax return ?",
    answer:
      "Le TFN est votre numéro fiscal personnel, utilisé quand un employeur vous paie un salaire et retient l’impôt pour vous. L’ABN identifie une activité indépendante : vous facturez, et rien n’est retenu. La plupart des PVT n’ont besoin que d’un TFN.\n\nSi vous avez aussi des revenus facturés avec un ABN, la déclaration contient deux types de revenus, et c’est plus souvent là qu’il peut y avoir un montant à payer plutôt qu’à récupérer. C’est aussi ce qui explique que le tarif soit différent quand il y a un ABN.",
  },
  {
    question: "Dois-je payer la Medicare levy avec un PVT français ?",
    answer:
      "La France n’a pas d’accord de réciprocité de soins de santé avec l’Australie. Un titulaire de PVT français n’a donc en général pas droit à Medicare, et l’exemption de la levy de 2 % est en général possible pour les jours concernés, avec un Medicare Entitlement Statement de Services Australia. Le reste dépend de votre situation, et c’est examiné au cas par cas.\n\nElle n’est pas retirée automatiquement : il faut un document officiel, dont l’obtention peut prendre plusieurs semaines. Nous vérifions votre cas avant tout dépôt.",
  },
  {
    question: "Est-ce que je récupère ma super avec la tax return ?",
    answer:
      "Non, ce sont deux paiements séparés. Le remboursement d’impôt, c’est l’impôt retenu en trop sur votre salaire, versé par l’ATO après le dépôt. La super, c’est ce que votre employeur a versé en plus de votre salaire, et elle se réclame avec un DASP (Departing Australia Superannuation Payment) une fois que vous avez quitté l’Australie et que votre visa a pris fin.\n\nSur la super, 65 % de la part imposable est retenu pour les titulaires d’un visa 417 ou 462. Contrairement au remboursement d’impôt, le DASP peut être versé sur un compte à l’étranger si votre fund le propose.",
  },
  {
    question: "Que se passe-t-il si je dois de l’argent à l’ATO ?",
    answer:
      "Ça arrive, surtout quand des revenus ont été facturés avec un ABN et que rien n’a été retenu en route.\n\nVous voyez ce montant avant tout dépôt, avec l’explication de son origine et les modes de paiement proposés par l’ATO. Rien ne part sans votre signature.",
  },
  {
    question: "Que ne faites-vous pas ?",
    answer:
      "Nous ne traitons que l’impôt australien. Pas votre déclaration en France, pas les questions de fiscalité française. Pour cela, c’est l’administration fiscale française.\n\nNous ne promettons pas de remboursement non plus : c’est l’ATO qui décide s’il y en a un et de quel montant. Et nous ne vous demandons jamais votre mot de passe myGov.",
  },
]

const GUIDES = [
  {
    href: '/fr/blog/how-to-lodge-tax-return-from-overseas',
    title: 'Déposer depuis l’étranger',
    desc: 'Ce qui marche encore depuis la France, et la règle du compte bancaire qui piège beaucoup de monde.',
  },
  {
    href: '/fr/blog/tax-residency-working-holiday-makers',
    title: 'Êtes-vous résident fiscal australien ?',
    desc: 'Pourquoi la résidence fiscale ne se règle pas avec une liste de cases à cocher.',
  },
  {
    href: '/fr/blog/medicare-levy-working-holiday-makers',
    title: 'La Medicare levy pour les PVT',
    desc: 'Ce que c’est, et comment nous traitons l’exemption.',
  },
  {
    ...frGuide('do-you-need-to-lodge-tax-return-short-stay', 'Quelques mois de travail : devez-vous déposer ?'),
    desc: 'Le seuil de l’ATO, et pourquoi un séjour court mérite quand même une vérification.',
  },
  {
    ...frGuide('tax-return-deadline-31-october-working-holiday', 'La date limite du 31 octobre'),
    desc: 'Ce que change le 31 octobre 2026, et pourquoi une déclaration en retard reste possible.',
  },
  {
    ...frGuide('late-tax-return-penalty-working-holiday', 'Tax return en retard'),
    desc: 'Les règles de l’ATO sur les pénalités, année par année.',
  },
  {
    ...frGuide('multiple-jobs-tax-return-working-holiday', 'Plusieurs jobs, une seule tax return'),
    desc: 'Pourquoi un deuxième employeur sans TFN declaration coûte cher.',
  },
]

const WA_TR = waUrl({ topic: 'tax-return', lang: 'fr' })

export default function TaxReturnAustraliePvtPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: 'Tax return Australie PVT : démarches, coût et étapes',
    description:
      'Comment une tax return australienne est déposée pour un titulaire de PVT (visa 417) : qui doit la déposer, ce que nous demandons, comment vous signez et quand un éventuel remboursement arrive.',
    inLanguage: 'fr',
    dateModified: '2026-11-05',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede', '.what-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${PAGE_URL}#service`,
    name: 'Tax return australienne pour les titulaires d’un PVT',
    serviceType: 'Préparation de tax return',
    description:
      'Tax returns australiennes pour les titulaires d’un visa working holiday (subclass 417 et 462). Vérifiées et validées par un agent fiscal enregistré avant d’être déposées auprès de l’ATO, y compris depuis l’étranger.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australie' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (subclass 417 et 462)' },
    availableLanguage: ['en', 'de', 'ja', 'fr', 'it', 'es'],
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
      { '@type': 'ListItem', position: 2, name: 'Tax return Australie PVT', item: PAGE_URL },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className={blocks.underHeader}>
        <Crumb home="Accueil" current="Tax return Australie PVT" label="Fil d’Ariane" href="/fr" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>Tax return Australie&nbsp;&middot; PVT, visa 417</span>
              Votre tax return en Australie avec un PVT : vous donnez l’essentiel, <Mark>nous nous occupons du reste.</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>Avec un PVT, la tax return est obligatoire à partir de 45 001 $ de revenu imposable ou dès que vous avez d’autres revenus que des salaires de working holiday maker. En dessous, elle reste le seul moyen de récupérer un impôt retenu en trop : 15 % sont dus jusqu’à 45 000 $, mais 45 % sont retenus sans TFN. Combien vous récupérez dépend de votre année, personne ne peut le chiffrer sans votre dossier ATO, et c’est l’ATO qui décide.</Lead>
            <p className={heroStyles.note}>Pas de payslips, pas de compte myGov, pas de formulaire à déchiffrer. Un questionnaire, une signature, et un éventuel remboursement arrive en général environ 14 jours ouvrés après le dépôt.</p>
          </div>
          <WaButton href={WA_TR} position="hero" topic="tax-return" lang="fr">Écrivez-nous sur WhatsApp</WaButton>
          <p className={heroStyles.note}>Réponse en général dans l’heure.</p>
          <GoogleRating variant="pill" lang="fr" />
        </Hero>
      </div>

      <PhotoFrame page="tax-return" locale="fr" />

      <Section eyebrow="Les bases" title="C’est quoi une tax return quand on est en PVT ?" titleId="what-title">
        <p className={`${blocks.text} what-lede`}>
          La tax return est la déclaration d’impôts australienne de l’année fiscale, du 1er juillet au 30 juin. Avec un PVT (visa 417), elle sert à faire rembourser l’impôt retenu en trop sur votre paie, s’il y en a (le remboursement d’impôts que les backpackers appellent « tax back »), et à déduire vos frais professionnels. Pour 2025-26, la date limite pour la déposer soi-même était le 31 octobre 2026.
        </p>
        <p className={blocks.text}>
          Elle n’est pas toujours obligatoire : si vous n’avez perçu que des salaires de working holiday maker et moins de 45 001 $ de revenu imposable sur l’année, l’ATO ne vous demande ni tax return ni non-lodgment advice. Au-delà, elle l’est. Dans les deux cas, c’est la seule façon de récupérer un impôt retenu en trop.
        </p>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Pendant que vous travaillez, votre employeur retient l’impôt directement sur votre paie : 45 % si votre TFN n’est pas enregistré chez lui, sinon en général 15 % jusqu’à 45 000 $ de revenus (barème working holiday maker 2025-26, inchangé en 2026-27). La tax return compare ce qui a été retenu avec ce que vous deviez vraiment. Si l’on a trop retenu, l’ATO vous rembourse la différence. Si l’on n’a pas assez retenu, vous devez le solde. C’est l’ATO qui tranche, jamais nous.
        </p>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Vous n’avez pas besoin de vos payslips (fiches de paie) pour la préparer : vos employeurs ont déjà transmis vos revenus à l’ATO, et la déclaration se construit à partir de là.
        </p>
      </Section>

      <Section tone="pale" eyebrow="Qui doit la déposer" title="Qui doit faire une tax return en Australie ?" titleId="who-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Le PVT Australie des Français correspond au Working Holiday visa subclass 417. Ce qui décide si vous devez déposer, c’est le montant et le type de vos revenus, pas la durée du séjour : en dessous de 45 001 $ de revenu imposable, avec uniquement des salaires de working holiday maker, l’ATO ne l’exige pas. Au-delà, ou avec d’autres revenus, il faut en principe déposer.
        </p>
        <div className={blocks.cards}>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>Utile même pour quelques semaines</h3>
            <p className={blocks.text}>Des semaines taxées à 45 % avant l’arrivée de votre TFN, ou une Medicare levy retenue à tort, ne se régularisent que par une tax return. Une saison de récolte suffit pour que la question se pose.</p>
          </div>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>Même si vous êtes déjà rentré</h3>
            <p className={blocks.text}>Le dépôt se fait en ligne depuis n’importe quel pays. La seule contrainte pratique est le compte bancaire australien.</p>
          </div>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>Même pour le travail payé en cash</h3>
            <p className={blocks.text}>Un revenu est imposable qu’il ait été déclaré ou non. Nous voyons ensemble comment le reconstituer proprement.</p>
          </div>
        </div>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Une année sans aucun revenu australien n’a rien à déposer. Pour le reste, l’outil « Do I need to lodge a tax return? » de l’ATO répond au cas par cas, et nous regardons votre année si vous nous écrivez.
        </p>
      </Section>

      <Section eyebrow="Les chiffres" title="Les chiffres clés, avec leurs dates" titleId="figures-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Les montants et les taux qui comptent pour une tax return de PVT, avec l’année à laquelle ils s’appliquent.
        </p>
        <Compare
          rows={[
            { left: 'De 0 à 45 000 $', right: '15 %, dès le premier dollar' },
            { left: 'De 45 001 à 135 000 $', right: '30 %' },
            { left: 'De 135 001 à 190 000 $', right: '37 %' },
            { left: 'Au-delà de 190 000 $', right: '45 %' },
          ]}
          leftLabel="Revenu imposable (2025-26 et 2026-27)"
          rightLabel="Taux working holiday maker"
        />
        <p className={blocks.small}>Mis à jour le 5 novembre 2026. Sources : ATO, Services Australia.</p>
        <PlainRows items={KEY_FIGURES} />
      </Section>

      <Section tone="pale" eyebrow="D’où vient un remboursement" title="Pourquoi un PVT peut être remboursé" titleId="refund-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Un remboursement n’est pas un bonus de backpacker. C’est l’écart entre ce que vos employeurs ont retenu et ce que vous deviez réellement, et sur une année de PVT cet écart vient le plus souvent d’un des points ci-dessous.
        </p>
        <div className={blocks.cards}>
          {REFUND_SOURCES.map((r) => (
            <div key={r.label} className={blocks.card}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Rien de cela n’est automatique, et rien n’est présumé d’avance. Chaque point est vérifié avec votre dossier ATO avant le dépôt.{' '}
          <Link href="/fr/calculator" className={blocks.textLink}>Voir une estimation indicative dans le calculateur</Link>.
        </p>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Pas encore de TFN ?{' '}
          <Link href="/fr/tfn" className={blocks.textLink}>La demande de TFN</Link> limite le risque de semaines retenues à 45 %.
        </p>
        <WaButton href={WA_TR} position="inline" topic="tax-return" lang="fr">Faire vérifier mon année sur WhatsApp</WaButton>
      </Section>

      <Section eyebrow="Medicare levy" title="La Medicare levy selon votre passeport" titleId="medicare-title">
        <p className={blocks.text}>
          La levy de 2 % suit le droit à Medicare, pas le visa. Ce droit dépend des accords de réciprocité de soins de santé (Reciprocal Health Care Agreements) entre l’Australie et votre pays.
        </p>
        <div className={blocks.cards}>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>Passeport français : en général, pas de droit à Medicare</h3>
            <p className={blocks.text}>La France n’a pas d’accord de réciprocité avec l’Australie. Un titulaire de PVT français n’a donc en général pas droit à Medicare, et l’exemption de la levy est en général possible pour les jours concernés. C’est aussi le cas, entre autres, de l’Allemagne, de l’Espagne, de la Suisse, de l’Autriche, du Canada, du Japon et des pays d’Amérique latine.</p>
          </div>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>Pays avec un accord : en général, pas d’exemption</h3>
            <p className={blocks.text}>Royaume-Uni, Irlande, Italie, Malte, Pays-Bas, Belgique, Finlande, Norvège, Suède, Slovénie et Nouvelle-Zélande. Leurs ressortissants ont en général accès à Medicare, donc en général pas d’exemption. Pour l’Italie et Malte, la couverture est limitée (jusqu’à six mois pour l’Italie), ce qui se vérifie au cas par cas.</p>
          </div>
        </div>
        <p className={`${blocks.text} ${blocks.muted}`}>
          L’exemption se prouve avec un Medicare Entitlement Statement de Services Australia, et elle se compte en jours. Si vous étiez non-résident fiscal pendant toute l’année, la levy ne s’applique pas. C’est l’ATO qui décide, et nous vérifions votre cas avant tout dépôt.{' '}
          <Link href="/fr/medicare" className={blocks.textLink}>Tout sur l’exemption de la Medicare levy</Link>.
        </p>
      </Section>

      <Section tone="pale" eyebrow="Ce que ça coûte" title="Combien coûte une tax return avec nous" titleId="fees-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Un tarif fixe, selon le type de revenus que vous avez perçus. Il est convenu avec vous avant le début du travail et payable à l’avance. Il n’est jamais calculé en pourcentage de votre remboursement.
        </p>
        <div className={blocks.cards}>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>220 $ AUD (GST incluse)</h3>
            <p className={blocks.text}>Revenus avec TFN uniquement : le travail salarié payé par la paie. L’ensemble du travail est compris, de l’analyse de votre situation à la déclaration prête à signer.</p>
          </div>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>385 $ AUD (GST incluse)</h3>
            <p className={blocks.text}>Revenus avec TFN et ABN : vous avez aussi facturé des revenus avec un ABN, ce qui demande de rapprocher vos revenus et frais professionnels et d’examiner la GST.</p>
          </div>
        </div>
      </Section>

      <Section tone="amber" title="Notre garantie" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique. La garantie ne s’applique qu’aux déclarations avec revenus sous TFN.
        </p>
        <p className={blocks.text}>Nous ne promettons pas de remboursement : c’est l’ATO qui décide s’il y en a un et de quel montant. Vos droits au titre de l’Australian Consumer Law ne sont pas affectés.</p>
      </Section>

      <Section id="how-it-works" tone="pale" eyebrow="Avec nous" title="Comment ça se passe avec nous" titleId="sequence-title">
        <p className={blocks.text}>
          Vous nous écrivez sur WhatsApp, vous remplissez un questionnaire d’environ dix minutes, nous partons de votre dossier ATO, puis vous relisez et vous signez. La déclaration est vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO.
        </p>
        <p className={`${blocks.text} ${blocks.muted}`}>
          De votre côté, trois choses suffisent : votre passeport et votre visa, un compte bancaire australien, et à peu près où et quand vous avez travaillé. Pas besoin de payslips. Si une partie de vos revenus a été facturée plutôt que versée en salaire :{' '}
          <Link href="/fr/abn" className={blocks.textLink}>ce qu’un ABN change</Link>.
        </p>
        <LinkButton href="/fr/tax-return">Les sept étapes du dépôt en détail →</LinkButton>
      </Section>

      <Section title="Deux règles qui changent l’ordre des choses" titleId="rules-title">
        <div className={blocks.cards}>
          {RULES.map((r) => (
            <div key={r.label} className={`${blocks.palePanel} ${blocks.stack}`}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
        <p className={blocks.text}>
          Vous quittez l’Australie pour de bon ? Votre super est une demande à part et, contrairement au remboursement, elle peut être versée sur un compte à l’étranger si votre fund le propose :{' '}
          <Link href="/fr/superannuation" className={blocks.textLink}>comment fonctionne le DASP</Link>.
        </p>
      </Section>

      <Section tone="pale" eyebrow="De retour chez vous" title="Et en France, en Belgique, au Québec ?" titleId="home-title">
        <p className={blocks.text}>
          La tax return australienne ne règle que l’impôt australien. Elle ne remplace pas la déclaration de revenus de votre pays, et rien n’est déposé pour vous en France, en Belgique ou au Canada.
        </p>
        <p className={blocks.text}>
          Côté australien, deux documents décrivent votre année : l’income statement de chaque employeur, qui indique ce que vous avez gagné et l’impôt retenu, et le Notice of Assessment que l’ATO émet après le dépôt, qui fixe l’impôt australien de l’année. L’année fiscale australienne va du 1er juillet au 30 juin, elle ne suit donc pas l’année civile. Gardez ces documents : ce sont eux que l’on vous demandera si votre administration fiscale pose des questions sur vos revenus australiens.
        </p>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Pour savoir si et comment ces revenus se déclarent chez vous, adressez-vous à l’administration fiscale française (impots.gouv.fr), au SPF Finances en Belgique, ou à l’Agence du revenu du Canada et à Revenu Québec. Nous ne donnons aucun avis sur ces fiscalités. La super réclamée avec un DASP est un paiement à part :{' '}
          <Link href="/fr/blog/tax-on-super-withdrawal-backpacker" className={blocks.textLink}>ce qui reste à régler après les 65 %</Link>.
        </p>
      </Section>

      <Section eyebrow="Le périmètre" title="Ce que nous faisons, et ce que nous ne faisons pas" titleId="scope-title">
        <p className={blocks.text}>
          Nous ne traitons que l’impôt australien. La tax return australienne ne remplace pas votre déclaration d’impôts en France : ce sont deux sujets séparés, et pour la France il faut vous adresser à l’administration fiscale française.{' '}
          <Link href="/fr/tax-return" className={blocks.textLink}>Voir le dépôt avec nous, étape par étape</Link>.
        </p>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Working Holiday Tax ne fait que de l’impôt de working holiday maker. Le questionnaire, les vérifications et l’ordre ci-dessus sont construits autour d’une seule année de visa. Notre activité s’exerce sous la supervision d’un agent fiscal enregistré, et votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO.
        </p>
        <p className={blocks.small}>
          Working Holiday Tax opère sous la supervision d’un agent fiscal enregistré (Tax Agent Number {AGENT_TPB}).{' '}
          <a href={`https://www.tpb.gov.au/registrations_search?number=${AGENT_TPB}`} className={blocks.textLink} target="_blank" rel="noopener noreferrer">Le vérifier sur le registre du Tax Practitioners Board</a>.
        </p>
        <GoogleReviewsServer lang="fr" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Aucun interlocuteur sérieux ne vous demandera votre mot de passe myGov.</strong>{' '}
          Nous ne le demandons jamais, parce que la méthode ci-dessus n’en a pas besoin. Si un message vous le réclame, il ne vient pas de nous.
        </p>
      </Section>

      <Section title="Les questions que se posent les PVT" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Guides" title="La version longue des étapes difficiles" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="Et ensuite" title="N’oubliez pas votre super" titleId="next-title">
        <p className={blocks.text}>Votre employeur a versé de la superannuation en plus de votre salaire. Quand vous quittez l’Australie, elle peut être réclamée avec un DASP, séparément de la tax return.</p>
        <LinkButton href="/fr/superannuation">Comment réclamer sa super (DASP) →</LinkButton>
      </Section>

      <Section tone="forest" title="Commencez par un message, pas par un formulaire" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Envoyez-nous les villes où vous avez travaillé, à peu près quels mois, et si vous avez déjà facturé avec un ABN. Cela suffit pour vous dire quelles années sont ouvertes et ce qu’il nous faut de votre côté. Que vous soyez rentré il y a deux ans n’y change rien.</p>
        <WaButton href={WA_TR} position="section" topic="tax-return" lang="fr" tone="light">Écrivez-nous sur WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Réponse en général dans l’heure.</p>
        <p className={`${blocks.small} ${blocks.onForest}`}>
          Vous préférez un formulaire ? <Link href="/start" className={blocks.textLink}>Formulaire de démarrage (en anglais)</Link>
        </p>
      </Section>

      <MobileCta href={WA_TR} lang="fr" topic="tax-return" />
    </>
  )
}
