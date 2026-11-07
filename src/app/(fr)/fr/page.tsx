import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/(site)/HomeWa'
import { Accordion } from '@/components/ui/Accordion'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { ImageSlot } from '@/components/wht/ImageSlot'
import { Compare, Figures, LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { frGuide } from './_blog-links'

// ─── METADATA ───────────────────────────────────────────────────────────
// Titre et description écrits pour la façon dont un PVT cherche en français.
// Aucun prix dans le titre, la description ou le schema.
export const metadata: Metadata = {
  title: { absolute: 'Working Holiday Tax : tax return, TFN et super pour PVT' },
  description:
    'Déclaration d’impôts australienne pour les PVT (visa 417 et 462) : résidence fiscale, Medicare levy et déductions vérifiés avant le dépôt.',
  alternates: {
    canonical: `${SITE_URL}/fr`,
    languages: {
      'en-AU': SITE_URL,
      'de': `${SITE_URL}/de`,
      'ja': `${SITE_URL}/ja`,
      ...newLocaleLanguages('/'),
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: `${SITE_URL}/fr`,
    siteName: 'Working Holiday Tax',
    title: 'Working Holiday Tax : tax return, TFN et super pour PVT',
    description:
      'N’importe qui peut cliquer sur « envoyer ». Le vrai travail se fait avant : résidence fiscale, employeurs, exemption Medicare, déductions.',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax : déclaration d’impôts en Australie pour les PVT' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Working Holiday Tax : tax return, TFN et super pour PVT',
    description: 'Déclaration d’impôts australienne pour les PVT 417 et 462. Résidence fiscale, Medicare et déductions vérifiés avant le dépôt.',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true, follow: true,
    googleBot: {
      index: true, follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

// ─── COPY ───────────────────────────────────────────────────────────────

const FIGURES = [
  {
    figure: '45 %',
    body: 'Prélevés au taux maximum pendant les semaines où votre employeur n’avait pas encore votre TFN. Cet argent ne revient que par une déclaration déposée.',
  },
  {
    figure: '18 200 $',
    body: 'Le seuil d’exonération des résidents fiscaux australiens. Un PVTiste imposé au barème working holiday maker n’y a en général pas droit et paie 15 % dès le premier dollar. Votre résidence fiscale dépend des faits de votre année, et c’est l’ATO qui décide.',
  },
  {
    figure: '2 %',
    body: 'Une Medicare levy que vous ne deviez peut-être pas. Si vous y avez droit, elle se retire avec un certificat d’exemption.',
  },
]

const ANALYSIS = [
  {
    n: '01',
    title: 'Votre résidence fiscale',
    body: 'La plupart des gens cochent une case et passent à autre chose. La résidence fiscale est une appréciation au cas par cas, et la High Court a dû trancher dans l’affaire Addy. C’est le point qui pèse le plus sur le montant.',
  },
  {
    n: '02',
    title: 'Chaque employeur, chaque semaine',
    body: 'Une année de PVT, c’est souvent le désordre : plusieurs employeurs, des paies en retard, un job oublié en mars. Nous reconstituons tout à partir de votre dossier ATO, pas de vos souvenirs.',
  },
  {
    n: '03',
    title: 'Medicare, si vous êtes concerné',
    body: 'La levy de 2 % est ajoutée par défaut au calcul de votre impôt, que vous la deviez ou non. Savoir quand elle n’a jamais été due, et la faire retirer, fait partie de notre travail.',
  },
  {
    n: '04',
    title: 'Les déductions du travail que vous avez vraiment fait',
    body: 'Un cueilleur de fruits, un barista et un livreur ne déduisent pas les mêmes choses. Nous vous demandons en quoi consistait votre travail, puis nous réclamons ce qui s’y rattache.',
  },
  {
    n: '05',
    title: 'Ensuite, seulement, le dépôt',
    body: 'Vérifié et validé par un agent fiscal enregistré avant d’être déposé auprès de l’ATO. Ce sont les quatre étapes précédentes qui décident du montant.',
  },
]

const COMPARISON = [
  { mygov: 'Un taux de 15 % appliqué sans que personne ne vérifie votre cas',                   us: 'Nous vérifions si c’est vraiment le cas pour vous' },
  { mygov: 'Rien ne mentionne l’exemption Medicare',               us: 'Nous vous aidons à faire la demande si vous y avez droit' },
  { mygov: 'Les déductions, c’est une case vide',                  us: 'Nous savons ce que votre type de travail permet de déduire' },
  { mygov: 'Il faut un compte et un numéro de téléphone actif',    us: 'Il ne vous faut rien. Nous nous occupons de l’ATO' },
]

const SERVICES = [
  { n: '01', href: '/fr/tfn',            title: 'Demande de TFN',          desc: 'À faire avant la première fiche de paie, pour éviter le taux maximum.' },
  { n: '02', href: '/fr/abn',            title: 'Inscription à l’ABN',     desc: 'Facturer comme indépendant, avec le côté fiscal expliqué d’abord.' },
  { n: '03', href: '/fr/tax-return',     title: 'Tax return',              desc: 'L’analyse complète ci-dessus, puis le dépôt auprès de l’ATO.' },
  { n: '04', href: '/fr/superannuation', title: 'Retrait de la super',     desc: 'Chaque fonds retrouvé, puis une seule demande DASP à votre départ.' },
  { n: '05', href: '/fr/medicare',       title: 'Medicare levy',           desc: 'Le certificat d’exemption, si votre année y donne droit.' },
]

const GUIDES = [
  // 5 Nov 2026: the language's flagship tax return page had one internal link and
  // competed with /tax-return for the same searches. Linked here so it ranks.
  { href: '/fr/tax-return-australie-pvt', title: 'Tax return Australie en PVT : le guide complet', desc: 'Qui doit déposer, jusqu’à quand, depuis la France, et ce qui change le montant.' },
  { ...frGuide('diy-tax-return-vs-tax-agent-working-holiday', 'Le faire soi-même ou passer par un agent'), desc: 'Ce que chaque option vous coûte vraiment.' },
  { ...frGuide('tax-residency-working-holiday-makers', 'Êtes-vous résident fiscal ?'),              desc: 'La question qui fait bouger le plus d’argent sur une déclaration.' },
  { ...frGuide('medicare-levy-working-holiday-makers', 'L’exemption de la Medicare levy'),          desc: 'Qui doit les deux pour cent, qui ne les doit pas, et comment nous les retirons.' },
  { ...frGuide('tax-deductions-working-holiday-makers', 'Ce que vous pouvez déduire'),               desc: 'Les déductions selon le type de travail, pas une liste générique.' },
]

const FAQS = [
  {
    question: 'Qu’est-ce qui décide du résultat de ma tax return en Australie ?',
    answer: 'Quatre choses : votre résidence fiscale pour l’année, le fait qu’une partie de votre paie ait été prélevée à 45 % avant que votre employeur ait votre TFN, le fait que la Medicare levy de 2 % ait été comptée alors que vous n’aviez pas droit à Medicare, et les déductions liées au travail que vous avez fait.\n\nDeux personnes qui ont gagné la même somme peuvent donc obtenir des résultats très différents.',
  },
  {
    question: 'Puis-je simplement déposer ma tax return moi-même sur myGov ?',
    answer: 'Oui. Déposer, c’est la partie facile. Ce que l’écran ne vous dit pas : votre résidence fiscale, si un employeur a prélevé au mauvais taux, si la Medicare levy aurait dû être comptée, et ce que votre type de travail permet de déduire. Ces quatre appréciations décident du montant.',
  },
  {
    question: 'Combien coûtent vos services ?',
    answer: 'Nos tarifs sont forfaitaires, jamais un pourcentage de votre remboursement.\n\nNous vous confirmons le tarif sur WhatsApp avant de commencer, et il se règle à l’avance. Ensuite nous vous envoyons le questionnaire complet et le travail démarre. Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique. La garantie ne s’applique qu’aux déclarations avec revenus sous TFN.',
  },
  {
    question: 'Quel taux d’impôt paient les PVT en Australie ?',
    answer: 'Quand le barème working holiday maker s’applique, l’impôt est de 15 % sur les 45 000 premiers dollars, puis 30 % jusqu’à 135 000 $, 37 % jusqu’à 190 000 $ et 45 % au-delà (années 2025-26 et 2026-27, source ATO). Sans TFN enregistré chez l’employeur, la retenue sur la paie est de 45 %.\n\nLe barème qui s’applique à vous dépend des faits de votre année, notamment de votre résidence fiscale : c’est examiné au cas par cas, et c’est l’ATO qui décide en dernier ressort.',
  },
  {
    question: 'Pouvez-vous m’aider si j’ai déjà quitté l’Australie ?',
    answer: 'Oui. Nous déposons votre tax return australienne et nous réclamons votre super (DASP) longtemps après votre retour, depuis la France ou n’importe où ailleurs, entièrement en ligne.\n\nUne règle à connaître avant de fermer votre compte : l’ATO ne peut verser un remboursement d’impôts que sur un compte bancaire australien, alors que la super (DASP) peut être versée à l’étranger. Si le vôtre est déjà fermé, dites-le-nous tôt, car cela change l’ordre dans lequel nous travaillons.',
  },
  {
    question: 'En combien de temps répondez-vous ?',
    answer: 'Du lundi au vendredi, de 9 h à 18 h (heure de l’est de l’Australie), nous répondons en général dans l’heure. En dehors de ces horaires, dès le matin du jour ouvré suivant. Vous pouvez d’abord poser une question sans vous engager, et nous répondons en général dans la langue de votre message.',
  },
  {
    question: 'Vous ne faites que les tax returns ?',
    answer: 'Non. Nous nous occupons aussi des demandes de TFN, des inscriptions à l’ABN, du retrait de la super (DASP) et des certificats d’exemption de la Medicare levy, soit ce dont un titulaire de visa 417 ou 462 a normalement besoin.\n\nCela ne remplace pas votre déclaration d’impôts en France, qui est un autre sujet : pour celle-là, adressez-vous à l’administration fiscale française. Nous ne traitons que l’impôt australien.',
  },
]

const WA_TAX_RETURN = waUrl({ topic: 'tax-return', lang: 'fr' })

export default async function FrenchHomePage() {

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/fr/#webpage`,
    url: `${SITE_URL}/fr`,
    name: 'Tax return Australie PVT | Working Holiday Tax',
    description: 'Déclaration d’impôts australienne pour les PVT (visa 417 et 462) : résidence fiscale, chaque employeur, exemption Medicare et déductions, vérifiés avant le dépôt.',
    inLanguage: 'fr',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    primaryImageOfPage: `${SITE_URL}/og-image.png`,
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'fr',
    mainEntity: FAQS.map(f => ({
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
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className={blocks.underHeader}>
      <Hero
        title={
          <>
            <span className={blocks.kicker}>Tax return Australie&nbsp;&middot; PVT 417 &amp; 462</span>
            N’importe qui peut cliquer sur « envoyer ». Le vrai travail se fait <Mark>avant.</Mark>
          </>
        }
        media={<ImageSlot id="IMG-W01" className={heroStyles.media} subject="Backpacker on a working holiday in Australia, at work on a farm or in a cafe" alt="Un backpacker en PVT au travail en Australie" tone="a" priority />}
      >
        <Lead>Le résultat de votre année se joue avant le dépôt, et rien n’y est automatique.</Lead>
        <WaButton href={WA_TAX_RETURN} position="hero" topic="tax-return" lang="fr">Écrivez-nous sur WhatsApp</WaButton>
        <p className={heroStyles.note}>Réponse en général dans l’heure.</p>
        <GoogleRating variant="pill" lang="fr" />
      </Hero>
      </div>

      <Section eyebrow="La question que tout le monde se pose" title="myGov ne vérifie pas pour vous la résidence fiscale, la levy ni les déductions." titleId="mygov-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Rien à l’écran ne vérifie si vous étiez résident fiscal, si la levy était due, ni ce que votre travail permet de déduire.
        </p>
        <Compare rows={COMPARISON.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="Sur myGov" rightLabel="Avec nous" />
        <p className={blocks.statement}>
          Vous n’aurez jamais à vous connecter à myGov, à lier une pièce d’identité ou à deviner quel formulaire remplir. Nous traitons directement avec l’ATO.
        </p>
        <div className={blocks.stack}>
          <WaButton href={WA_TAX_RETURN} position="section" topic="tax-return" lang="fr" size="md">Écrivez-nous sur WhatsApp</WaButton>
          <p className={blocks.small}>Réponse en général dans l’heure.</p>
        </div>
      </Section>

      <Section tone="pale" width="wide" title="Qu’est-ce qui décide du montant d’une tax return de PVT ?" titleId="figures-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Trois choses, la plupart du temps.</p>
        <Figures items={FIGURES} />
      </Section>

      <Section tone="amber" title="Notre garantie" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique. La garantie ne s’applique qu’aux déclarations avec revenus sous TFN.
        </p>
        <p className={blocks.text}>Les honoraires sont forfaitaires, jamais un pourcentage de ce qui vous revient.</p>
      </Section>

      <Section id="how-it-works" eyebrow="Le travail" title="Ce que nous passons en revue pour chaque déclaration" titleId="analysis-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Quatre des cinq étapes ont lieu avant la saisie de la déclaration.</p>
        <Steps items={ANALYSIS} />
      </Section>

      <Section tone="pale" title="Laquelle de ces deux situations est la vôtre ?" titleId="year-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Cela change ce que votre déclaration doit contenir. Choisissez celle qui vous correspond.</p>
        <div className={blocks.cards}>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>TFN seul</h3>
            <p className={blocks.text}>Chaque employeur vous versait un salaire, avec l’impôt retenu sur chaque fiche de paie (payslip).</p>
            <WaButton href={waUrl({ topic: 'tax-return', lang: 'fr', tier: 'tfn' })} position="inline" topic="tax-return" lang="fr" tier="tfn" size="md" fill>C’est mon cas</WaButton>
          </div>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>TFN et ABN</h3>
            <p className={blocks.text}>Une partie de vos revenus a été facturée avec un ABN, sans aucune retenue.</p>
            <WaButton href={waUrl({ topic: 'abn', lang: 'fr', tier: 'tfn-abn' })} position="inline" topic="abn" lang="fr" tier="tfn-abn" size="md" fill>C’est mon cas</WaButton>
          </div>
        </div>
        <p className={blocks.small}>
          Vous ne savez pas laquelle est la vôtre ?{' '}
          <WaLink href={waUrl({ topic: 'general', lang: 'fr', tier: 'unsure' })} position="inline" topic="general" lang="fr" tier="unsure" className={blocks.textLink}>
            Racontez-nous à quoi ressemblait votre travail
          </WaLink>
        </p>
      </Section>

      <Section eyebrow="Ce que nous faisons pour vous" title="De la première fiche de paie jusqu’à votre retour chez vous" titleId="services-title">
        <LinkRows items={SERVICES.map(s => ({ href: s.href, eyebrow: s.n, title: s.title, desc: s.desc, cta: 'En savoir plus →' }))} />
      </Section>

      <ImageSlot id="IMG-W02" subject="Backpackers on a working holiday, a wide Australian scene (farm, beach town or city street)" alt="Des backpackers en PVT en Australie" tone="b" className={blocks.band} />

      <Section tone="pale" title="L’impôt des PVT est la seule chose que nous faisons." titleId="trust-title">
        <p className={blocks.text}>
          Chaque déclaration que nous préparons concerne quelqu’un avec un visa 417 ou 462. Notre activité s’exerce sous la supervision d’un agent fiscal enregistré, et chaque déclaration est vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO.
        </p>
        <GoogleReviewsServer lang="fr" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Personne de sérieux ne vous demandera vos identifiants myGov.</strong>{' '}
          Nous ne les demandons jamais : si quelqu’un vous les réclame, ce n’est pas nous.
        </p>
      </Section>

      <Section title="Les questions qu’on nous pose avant le premier message" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
        <p className={blocks.small}>
          Votre question n’est pas là ?{' '}
          <Link href="/fr/contact" className={blocks.textLink}>Écrivez-nous</Link>
        </p>
      </Section>

      <Section tone="pale" eyebrow="Guides" title="Vous préférez d’abord lire toute la réponse ?" titleId="guides-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Lisez à votre rythme, sans engagement.</p>
        <LinkRows items={GUIDES} />
        <p>
          <Link href="/fr/blog" className={blocks.textLink}>Tous les guides →</Link>
        </p>
      </Section>

      <Section tone="forest" title="Racontez-nous votre année" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          Où vous avez travaillé, à peu près quand, et si vous avez déjà facturé avec un ABN. Cela suffit pour vous dire où vous en êtes.
        </p>
        <WaButton href={WA_TAX_RETURN} position="footer" topic="tax-return" lang="fr" tone="light">Écrivez-nous sur WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Réponse en général dans l’heure.</p>
      </Section>

      <MobileCta href={WA_TAX_RETURN} lang="fr" topic="tax-return" />
    </>
  )
}
