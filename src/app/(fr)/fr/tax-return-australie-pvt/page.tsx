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
    'Tax return Australie PVT : qui doit déclarer, comment se faire rembourser, ce que ça coûte. Un questionnaire, une signature, pas de payslips.',
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
      'Qui doit déposer une tax return avec un PVT, comment ça se passe avec nous et ce que ça coûte. Vous signez, nous déposons.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tax-return.png`],
    card: 'summary_large_image',
    title: 'Tax return Australie PVT : démarches et étapes',
    description: 'Pas de payslips, pas de compte myGov. Un questionnaire, une signature, et nous déposons auprès de l’ATO.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** Where a refund can come from. Mechanisms only, never an amount. */
const REFUND_SOURCES = [
  {
    label: "Des semaines à 45 % avant l’arrivée de votre TFN",
    body: "Sans TFN (Tax File Number, votre numéro fiscal australien) enregistré chez l’employeur, et sans déclaration indiquant que votre demande est en cours, il doit retenir 45 % au lieu de 15 %. Chaque fiche de paie de cette période a été trop taxée, et cet argent ne revient que par une tax return déposée.",
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
    body: "La levy de 2 % est appliquée par défaut. Elle vise les personnes qui ont droit à Medicare. Selon votre passeport, vous pouvez en être exempté, avec le bon document.",
  },
  {
    label: "Des frais professionnels que personne n’a déclarés",
    body: "Chaussures de sécurité, tenue de travail, outils, licences, trajets entre deux sites : ces frais peuvent réduire votre revenu imposable quand ils sont liés au travail que vous avez fait. Chaque dollar de frais réellement déductible peut réduire l’impôt, selon votre situation.",
  },
]

/** The three things the reader supplies. */
const NEEDED = [
  {
    label: "Votre passeport et votre visa",
    body: "Le passeport que vous détenez et le visa sur lequel vous étiez, en général le subclass 417 pour un PVT.",
  },
  {
    label: "Un compte bancaire australien",
    body: "L’ATO ne verse les remboursements que sur un compte australien. Si le vôtre est déjà fermé, dites-le dès le premier message.",
  },
  {
    label: "À peu près où et quand vous avez travaillé",
    body: "Une ville, le type de travail, les mois approximatifs. Nous recoupons avec le dossier de l’ATO et nous complétons le reste.",
  },
]

/** The sequence in the order it happens, with the waiting written in. */
const SEQUENCE = [
  {
    n: '01',
    title: 'Vous nous écrivez sur WhatsApp',
    body: "Vous nous racontez à quoi ressemblait votre année, nous vous disons où vous en êtes, et les honoraires sont convenus avec vous avant le début du travail.",
  },
  {
    n: '02',
    title: 'Un questionnaire, environ dix minutes',
    body: "Passeport et visa, coordonnées bancaires, les villes et le type de travail. C’est le seul formulaire que vous remplissez. Laissez vide ce qui ne s’applique pas, nous vous poserons la question.",
  },
  {
    n: '03',
    title: 'Nous ouvrons votre dossier ATO',
    body: "Chaque employeur qui vous a déclaré, chaque income statement (le relevé de revenus transmis à l’ATO par l’employeur), chaque dollar retenu, et les années précédentes encore ouvertes. Les jobs oubliés et les semaines taxées au taux maximum apparaissent ici, pas dans vos souvenirs.",
  },
  {
    n: '04',
    title: 'Les points qui font bouger le montant',
    body: "Votre résidence fiscale pour l’année, les semaines avant l’arrivée de votre TFN, la Medicare levy (était-elle vraiment la vôtre ?) et ce que votre type de travail permet de déduire. C’est la partie lente, et c’est ce que vous payez.",
  },
  {
    n: '05',
    title: 'Vous relisez et vous signez',
    body: "Nous vous envoyons la déclaration terminée, chaque chiffre expliqué, et rien ne part à l’ATO avant que vous l’ayez lue et signée. La signature est électronique, donc faisable depuis un téléphone, où que vous soyez.",
  },
  {
    n: '06',
    title: 'Elle est déposée',
    body: "Vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO. Le dépôt lui-même prend quelques minutes.",
  },
  {
    n: '07',
    title: 'L’ATO verse le remboursement, s’il y en a un',
    body: "Quand il y a un remboursement, il arrive en général environ 14 jours ouvrés après le dépôt, sur le compte australien que vous nous avez indiqué. Si l’ATO pose une question, nous y répondons et nous vous disons de quoi il s’agissait.",
  },
]

const RULES = [
  {
    label: "Le remboursement ne va que sur un compte australien",
    body: "La super (DASP) peut être versée sur un compte à l’étranger. Un remboursement d’impôt, non. Si vous comptez fermer votre compte australien, attendez que le remboursement soit arrivé, ou prévenez-nous avant.",
  },
  {
    label: "Les années précédentes restent possibles",
    body: "Une année fiscale pour laquelle vous n’avez jamais rien déposé ne disparaît pas toute seule. Chaque année est une déclaration à part et un remboursement à part. Nous les traitons dans l’ordre, la plus ancienne d’abord, et le tarif est convenu avec vous avant de commencer.",
  },
]

// Answers past about 55 words carry a blank line, and the FAQ below renders one
// <p> per paragraph. faqLd still uses the raw string, so the schema matches the
// visible text.
const FAQS = [
  {
    question: "Est-ce que je dois faire une tax return avec un PVT en Australie ?",
    answer:
      "En général, oui. L’obligation de déposer suit les revenus, pas la durée du séjour : deux semaines de salaire créent la même obligation que deux ans. L’année fiscale australienne va du 1er juillet au 30 juin.\n\nLes exceptions sont étroites, par exemple si vous n’avez eu aucun revenu en Australie. Si vous avez travaillé, même peu de temps, écrivez-nous et nous regardons votre cas.",
  },
  {
    question: "Quelle est la date limite pour déposer sa tax return ?",
    answer:
      "Si vous la déposez vous-même, c’est le 31 octobre qui suit la fin de l’année fiscale. Une déclaration déposée après la date limite est en retard, pas perdue : elle peut toujours être déposée.\n\nAttendez aussi que vos employeurs aient finalisé leurs déclarations à l’ATO, ce qui se fait en général entre le 14 et le 31 juillet. Déposer le 1er juillet, c’est prendre le risque de déclarer des chiffres qui vont encore changer.",
  },
  {
    question: "Est-ce que la tax return australienne remplace ma déclaration d’impôts en France ?",
    answer:
      "Non. Ce sont deux sujets séparés. Nous ne nous occupons que de l’impôt australien : la tax return déposée auprès de l’ATO.\n\nPour votre situation en France et ce que vous devez y déclarer, adressez-vous à l’administration fiscale française. Nous ne donnons aucun avis sur le droit fiscal français.",
  },
  {
    question: "Puis-je faire ma tax return depuis la France, après mon retour ?",
    answer:
      "Oui, et beaucoup de déclarations que nous déposons sont celles de personnes déjà rentrées chez elles. Le questionnaire, la signature et le dépôt se font en ligne.\n\nSeul le remboursement ne voyage pas : l’ATO ne peut le verser que sur un compte bancaire australien, alors que la super (DASP) peut être versée à l’étranger. Si votre compte australien est déjà fermé, dites-le dans votre premier message.",
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
    question: "Je n’ai travaillé que quelques semaines, ça vaut le coup de la faire ?",
    answer:
      "Vous devez la faire de toute façon : l’obligation suit les revenus, pas la durée du séjour.\n\nCe n’est pas une promesse de remboursement : c’est l’ATO qui décide du résultat. Une année non déposée ne s’arrange pas en l’ignorant.",
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
      "Cela dépend de votre passeport, pas de votre visa. La France ne fait pas partie des onze pays ayant un accord de santé réciproque avec l’Australie, donc l’exemption est souvent possible, mais elle se demande et se prouve.\n\nElle n’est ni appliquée ni retirée automatiquement : il faut un Medicare Entitlement Statement, délivré par Services Australia, qui peut prendre jusqu’à six semaines. Nous vérifions votre cas avant de déposer.",
  },
  {
    question: "Est-ce que je récupère ma super avec la tax return ?",
    answer:
      "Non, ce sont deux paiements séparés. Le remboursement d’impôt, c’est l’impôt retenu en trop sur votre salaire, versé par l’ATO après le dépôt. La super, c’est ce que votre employeur a versé en plus de votre salaire, et elle se réclame avec un DASP (Departing Australia Superannuation Payment) une fois que vous avez quitté l’Australie et que votre visa a pris fin.\n\nSur la super, 65 % de la part imposable est retenu pour les titulaires d’un visa 417 ou 462. Contrairement au remboursement d’impôt, le DASP peut être versé sur un compte à l’étranger.",
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
    desc: 'Pourquoi l’étape 04 ne se règle pas avec une liste de cases à cocher.',
  },
  {
    href: '/fr/blog/medicare-levy-working-holiday-makers',
    title: 'La Medicare levy pour les PVT',
    desc: 'Qui en est exempté, et le document à commander à l’avance.',
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
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${PAGE_URL}#service`,
    name: 'Tax return australienne pour les titulaires d’un PVT',
    serviceType: 'Préparation et dépôt de tax return',
    description:
      'Tax returns australiennes pour les titulaires d’un visa working holiday (subclass 417 et 462). Vérifiées et validées par un agent fiscal enregistré avant d’être déposées auprès de l’ATO, y compris depuis l’étranger.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australie' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (subclass 417 et 462)' },
    availableLanguage: ['en'],
    inLanguage: 'fr',
  }

  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${PAGE_URL}#howto`,
    name: 'Comment une tax return PVT est déposée en Australie',
    description:
      'L’ordre dans lequel une tax return avec un visa 417 ou 462 est préparée et déposée, du premier message à l’arrivée d’un éventuel remboursement.',
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
      { '@type': 'ListItem', position: 2, name: 'Tax return Australie PVT', item: PAGE_URL },
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
            <Lead>Pas de payslips, pas de compte myGov, pas de formulaire à déchiffrer. Un questionnaire, une signature, et un éventuel remboursement arrive en général environ 14 jours ouvrés après le dépôt.</Lead>
          </div>
          <WaButton href={WA_TR} position="hero" topic="tax-return" lang="fr">Écrivez-nous sur WhatsApp</WaButton>
          <p className={heroStyles.note}>Réponse en général dans l’heure.</p>
          <GoogleRating variant="pill" lang="fr" />
        </Hero>
      </div>

      <PhotoFrame page="tax-return" locale="fr" />

      <Section eyebrow="Les bases" title="C’est quoi une tax return quand on est en PVT ?" titleId="what-title">
        <p className={blocks.text}>
          La tax return est la déclaration d’impôts australienne : un bilan de votre année fiscale (du 1er juillet au 30 juin) que vous envoyez à l’ATO, le fisc australien.
        </p>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Pendant que vous travaillez, votre employeur retient l’impôt directement sur votre paie : 15 % si votre TFN est enregistré chez lui, 45 % sinon. La tax return compare ce qui a été retenu avec ce que vous deviez vraiment. Si on a retenu trop, l’ATO vous rembourse la différence. Si on a retenu trop peu, vous devez le solde. C’est l’ATO qui tranche, jamais nous.
        </p>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Vous n’avez pas besoin de vos payslips (fiches de paie) pour la préparer : vos employeurs ont déjà transmis vos revenus à l’ATO, et la déclaration se construit à partir de là.
        </p>
      </Section>

      <Section tone="pale" eyebrow="Qui doit la déposer" title="Qui doit faire une tax return en Australie ?" titleId="who-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Le PVT Australie des Français correspond au Working Holiday visa subclass 417. Si vous avez perçu un revenu en Australie pendant une année fiscale, vous devez en principe déposer une tax return pour cette année-là.
        </p>
        <div className={blocks.cards}>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>Même pour quelques semaines</h3>
            <p className={blocks.text}>L’obligation suit les revenus, pas la durée du séjour. Une saison de récolte ou deux semaines de job comptent.</p>
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
          Les exceptions sont étroites, par exemple une année sans aucun revenu australien. En cas de doute, écrivez-nous.
        </p>
      </Section>

      <Section eyebrow="D’où vient un remboursement" title="Pourquoi un PVT peut être remboursé" titleId="refund-title">
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
      </Section>

      <Section tone="pale" eyebrow="Ce que ça coûte" title="Combien coûte une tax return avec nous" titleId="fees-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Un tarif fixe, selon le type de revenus que vous avez perçus. Il est convenu avec vous avant le début du travail et payable à l’avance. Il n’est jamais calculé en pourcentage de votre remboursement.
        </p>
        <div className={blocks.cards}>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>220 $ AUD (GST incluse)</h3>
            <p className={blocks.text}>Revenus avec TFN uniquement : le travail salarié payé par la paie. L’ensemble du travail est compris, de l’analyse de votre situation au dépôt.</p>
          </div>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>385 $ AUD (GST incluse)</h3>
            <p className={blocks.text}>Revenus avec TFN et ABN : vous avez aussi facturé des revenus avec un ABN, ce qui demande de rapprocher vos revenus et frais professionnels et d’examiner la GST.</p>
          </div>
        </div>
      </Section>

      <Section tone="amber" title="Notre garantie" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique.
        </p>
        <p className={blocks.text}>Nous ne promettons pas de remboursement : c’est l’ATO qui décide s’il y en a un et de quel montant. Vos droits au titre de l’Australian Consumer Law ne sont pas affectés.</p>
      </Section>

      <Section id="how-it-works" eyebrow="Du début à la fin" title="Comment ça se passe avec nous" titleId="sequence-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Sept étapes. Vous intervenez dans deux d’entre elles : au début, et pour signer.</p>
        <Steps items={SEQUENCE} />
        <p className={`${blocks.text} ${blocks.muted}`}>
          Pour l’étape 04, si une partie de vos revenus a été facturée plutôt que payée par une paie :{' '}
          <Link href="/fr/abn" className={blocks.textLink}>ce qu’un ABN change</Link>.
        </p>
      </Section>

      <Section tone="pale" eyebrow="Votre part" title="Ce qu’il nous faut de votre côté" titleId="needed-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Trois choses, et c’est toute la liste.</p>
        <PlainRows items={NEEDED} />
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>Vous n’avez pas besoin de vos payslips.</p>
          <p className={blocks.text}>Chaque employeur qui vous a mis en paie a déjà transmis un income statement à l’ATO sur votre TFN, et c’est à partir de là que la déclaration est construite. Les reçus de frais professionnels sont la seule chose qui vaut la peine d’être cherchée. S’il n’y en a pas, décrivez-nous plutôt le travail.</p>
        </div>
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
      </Section>

      <Section tone="pale" eyebrow="Le périmètre" title="Ce que nous faisons, et ce que nous ne faisons pas" titleId="scope-title">
        <p className={blocks.text}>
          Nous ne traitons que l’impôt australien. La tax return australienne ne remplace pas votre déclaration d’impôts en France : ce sont deux sujets séparés, et pour la France il faut vous adresser à l’administration fiscale française.{' '}
          <Link href="/fr/tax-return" className={blocks.textLink}>Voir la page tax return pour les visas 417 et 462</Link>.
        </p>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Working Holiday Tax ne fait que de l’impôt de working holiday maker. Le questionnaire, les vérifications et l’ordre ci-dessus sont construits autour d’une seule année de visa. Notre activité opère sous la supervision d’un agent fiscal enregistré, et votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO.
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
