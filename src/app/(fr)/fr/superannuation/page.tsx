import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { Compare, blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, PlainRows, TitleLinks, coreBlocks } from '@/components/wht/CoreBlocks'
import { frGuide, frGuideLabel } from '../_blog-links'

/*
 * Page de réponse pour tout le cluster superannuation. Chaque H2 est une
 * question que les gens tapent vraiment, et chacune reçoit tout de suite une
 * réponse complète qui tient seule hors contexte. La couche commerciale vient
 * sous la réponse, pas à sa place.
 */

const WA = waUrl({ topic: 'super', lang: 'fr' })
const COMPARISON_GUIDE = frGuide('dasp-vs-leaving-super-in-australia-pros-cons', 'La comparaison complète est ici')
const EMPLOYER_SUPER_GUIDE = frGuide('how-much-super-should-employer-pay', 'combien de super votre employeur doit verser')
const LOST_SUPER_GUIDE = frGuide('how-to-find-lost-superannuation', 'Comment retrouver une super perdue')
const UNCLAIMED_GUIDE = frGuide('what-happens-to-unclaimed-super', 'Ce que devient la super non réclamée')
const TRANSFER_GUIDE = frGuide('transferring-money-overseas-australia-tax', 'Envoyer son argent chez soi depuis l’Australie')

export const metadata: Metadata = {
  title: { absolute: 'Récupérer sa superannuation en Australie (DASP) après un PVT' },
  description:
    'Parti d’Australie avec un visa 417 ou 462 ? Votre super se réclame via le DASP, en ligne et depuis la France. Conditions, retenue de 65 %, documents, délai de 28 jours.',
  keywords: [
    'récupérer sa super Australie',
    'récupérer sa super Australie PVT',
    'DASP Australie',
    'DASP visa 417',
    'DASP visa 462',
    'superannuation Australie PVT',
    'retirer sa super en quittant l’Australie',
    'Departing Australia Superannuation Payment',
    'super Australie taux 65 %',
    'super Australie délai',
    'plusieurs super funds Australie',
    'super non réclamée ATO',
    'combien récupère-t-on de super en Australie',
    'demande DASP en ligne',
    'tutoriel superannuation',
    'superannuation retour en France',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/superannuation`,
    languages: {
      'en-AU': `${SITE_URL}/superannuation`,
      de: `${SITE_URL}/de/superannuation`,
      ja: `${SITE_URL}/ja/superannuation`,
      ...newLocaleLanguages('/superannuation'),
      'x-default': `${SITE_URL}/superannuation`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-super.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'fr_FR',
    url: `${SITE_URL}/fr/superannuation`,
    siteName: 'Working Holiday Tax',
    title: 'Récupérer sa super en Australie après le départ (DASP)',
    description:
      'Qui peut réclamer un DASP, combien reste après la taxe de 65 %, quels documents fournir et combien de temps ça prend.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-super.png`],
    card: 'summary_large_image',
    title: 'Récupérer sa super en Australie (DASP)',
    description: 'Conditions, taux de 65 %, documents, délais et plusieurs super funds : les réponses.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

/**
 * L’objection que chaque lead apporte, traitée pour la super. Chaque ligne
 * concerne le DASP et reste fidèle à ce que l’ATO décrit : une demande par
 * compte, avec ses propres vérifications. Rien ne dit que le système de l’ATO
 * est mauvais. Il fait un autre travail.
 */
const MYGOV = [
  {
    mygov: 'Avec votre TFN, le système en ligne retrouve vos comptes. Sans lui, vous saisissez chaque fund vous-même, avec son ABN.',
    us: 'Nous retrouvons d’abord les comptes liés à votre tax file number, y compris ceux qu’un employeur a ouverts sans vous demander, et nous vous aidons à retrouver le TFN s’il est perdu.',
  },
  {
    mygov: 'Chaque compte devient une demande séparée, et chaque fund fixe ses propres exigences de documents.',
    us: 'Nous vérifions ce que chaque fund demande avant d’envoyer quoi que ce soit, et nous organisons les copies certifiées depuis la France. La super déjà passée à l’ATO fait partie de la même recherche.',
  },
  {
    mygov: 'La demande est vérifiée sur votre dossier de visa, et un visa qui n’a pas pris fin la bloque net.',
    us: 'Nous vérifions d’abord les trois conditions, pour que vous ne passiez pas quinze jours sur une demande qui ne peut pas encore être payée.',
  },
  {
    mygov: 'La super est une demande, la tax return en est une autre. Rien ne les relie pour vous.',
    us: 'Ce sont deux demandes distinctes, donc nous nous occupons des deux.',
  },
]

const faqs = [
  {
    question: 'Peut-on réclamer sa super avec un visa vacances-travail 417 ou 462 ?',
    answer:
      'Oui, une fois que vous avez quitté l’Australie et que votre visa vacances-travail a pris fin. Vous ne pouvez pas la réclamer tant que vous êtes encore ici avec ce visa. La demande s’appelle Departing Australia Superannuation Payment (DASP) : 65 % de la part imposable sont retenus. Pour la super détenue par un fund qui le propose, le solde peut être viré sur un compte à l’étranger, ce qu’un remboursement d’impôt ne permet pas.',
  },
  {
    question: 'Puis-je réclamer ma super moi-même ?',
    answer:
      'Oui, c’est gratuit. Avec un seul fund et des documents en règle, nous vous dirons que vous n’avez pas besoin de nous. Cela se complique avec une super répartie sur plusieurs funds, un fund qui demande des copies certifiées depuis l’étranger, ou un visa qui n’a pas pris fin.',
  },
  {
    question: 'A-t-on de la superannuation quand on a travaillé avec un ABN ?',
    answer:
      'En général non. Les cotisations de super obligatoires (super guarantee) se rattachent à l’emploi salarié PAYG, donc le travail de gig, de VTC ou de freelance facturé avec un ABN n’en génère en principe pas. L’exception est le contractor qui a en réalité travaillé comme un employé : de la super peut alors rester due.',
  },
  {
    question: 'Un DASP, est-ce la même chose qu’un remboursement d’impôt ?',
    answer:
      'Non, ce sont deux paiements distincts. Un remboursement d’impôt est l’impôt retenu en trop sur votre salaire, versé par l’ATO après le dépôt d’une tax return. Un DASP est la super que votre employeur a versée en plus de votre salaire, libérée par votre fund. Selon votre année, vous pouvez avoir droit aux deux.',
  },
  {
    question: 'Faut-il son tax file number pour réclamer sa super ?',
    answer:
      'Non, le TFN n’est pas obligatoire : un fund peut vous identifier avec votre nom, votre date de naissance et votre passeport. Mais si vous le saisissez dans la demande en ligne, le système de l’ATO cherche vos comptes et les affiche, ce qui évite de les chercher fund par fund. Un TFN perdu se retrouve.',
  },
  {
    question: 'Pourquoi le taux du DASP est-il de 65 % pour les PVT et de 35 % pour les autres ?',
    answer:
      'Le taux de 65 % s’applique quand votre DASP comprend des cotisations versées pendant un visa 417 ou 462, et il porte alors sur tout le paiement, même si vous êtes passé ensuite à un autre visa. Sans ces cotisations, les taux ordinaires s’appliquent : 35 % sur l’élément taxé et 45 % sur l’élément non taxé. La part exonérée n’est jamais retenue.',
  },
  {
    question: 'Et si un employeur n’a jamais versé ma super ?',
    answer:
      'Quand un employeur aurait dû verser de la super et ne l’a jamais fait, c’est un dossier de super guarantee impayée que l’ATO peut examiner et recouvrer pour vous. Signalez-le avant de faire votre demande, car de l’argent récupéré après la fermeture de vos comptes oblige à faire une nouvelle demande.',
  },
  {
    question: 'Réclamer sa super a-t-il un effet sur la tax return ou sur un futur visa australien ?',
    answer:
      'Un DASP ne figure pas sur votre tax return australienne, car la retenue de 65 % est définitive. Vos comptes de super sont clôturés une fois payés : si vous revenez travailler, vous repartez avec un nouveau fund. Les questions sur un futur visa relèvent du Department of Home Affairs.',
  },
  {
    question: 'Peut-on préparer sa demande de DASP avant de quitter l’Australie ?',
    answer:
      'Oui. Vous pouvez commencer la demande en ligne et l’enregistrer pendant que vous êtes encore en Australie, et l’ATO le recommande. Vous ne pourrez la déposer qu’une fois parti et votre visa terminé.',
  },
  {
    question: 'Quel formulaire utiliser pour une demande de DASP papier ?',
    answer:
      'Le formulaire NAT 7204, envoyé directement à chaque fund qui détient votre super. Pour la super déjà transférée à l’ATO, c’est le formulaire NAT 74880, envoyé à l’ATO. La demande en ligne remplace les deux et ne coûte rien.',
  },
  {
    question: 'Qu’est-ce qui change si ma super dépasse 5 000 $ ?',
    answer:
      'Le taux ne change pas. Ce qui peut changer, ce sont les papiers : sur une demande papier de 5 000 $ ou plus, il peut falloir une Certification of Immigration Status du Department of Home Affairs, qui est payante. Un fund peut aussi demander des copies certifiées de vos pièces d’identité, quel que soit le solde.',
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
    { '@type': 'ListItem', position: 2, name: 'Superannuation', item: `${SITE_URL}/fr/superannuation` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/fr/superannuation#service`,
  name: 'Demande de DASP (super) pour les titulaires d’un visa vacances-travail',
  serviceType: 'Demande de Departing Australia Superannuation Payment (DASP)',
  description:
    'Aide à la demande de Departing Australia Superannuation Payment pour les titulaires d’un visa vacances-travail 417 ou 462, de la recherche de tous les funds liés à un tax file number jusqu’au versement.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australie' },
  audience: { '@type': 'Audience', audienceType: 'Titulaires d’un visa vacances-travail (subclass 417 / 462) qui ont quitté l’Australie' },
  inLanguage: 'fr',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/fr/superannuation#webpage`,
  name: 'Récupérer sa superannuation en Australie (DASP) après un PVT',
  inLanguage: 'fr',
  dateModified: '2026-11-05',
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/fr/superannuation`,
}

/*
 * Les étapes visibles (#steps) et le HowTo viennent du même tableau, pour que
 * le balisage reste identique au texte affiché. Chaque étape suit la procédure
 * officielle de l’ATO.
 */
const STEPS = [
  { name: 'Vérifiez que vous pouvez déposer', text: 'Votre visa doit avoir expiré ou été annulé et vous devez avoir quitté l’Australie. Vous pouvez contrôler votre statut de visa sur VEVO, le service en ligne du Department of Home Affairs.' },
  { name: 'Retrouvez chaque compte', text: 'Dans la demande en ligne de l’ATO (DASP Online), votre TFN suffit pour que le système cherche vos comptes et les affiche. Sans TFN, vous saisissez chaque fund avec son ABN.' },
  { name: 'Remplissez une demande par compte', text: 'Le système crée une demande séparée pour chaque compte trouvé, super détenue par l’ATO comprise. Comptez environ 30 minutes.' },
  { name: 'Préparez les documents', text: 'Un fund peut demander des copies certifiées de vos pièces d’identité. Sur une demande papier de 5 000 $ ou plus, il peut aussi falloir une Certification of Immigration Status.' },
  { name: 'Choisissez le mode de paiement', text: 'Compte australien, chèque en dollars australiens ou, pour la super d’un fund qui le propose, virement international.' },
  { name: 'Attendez le versement', text: 'Le fund retient 65 % sur la part imposable, puis paie en général dans les 28 jours suivant une demande complète.' },
]

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  inLanguage: 'fr',
  name: 'Demande de DASP en ligne, étape par étape',
  description:
    'La demande de Departing Australia Superannuation Payment pour un titulaire de visa 417 ou 462, de la vérification du visa au versement.',
  step: STEPS.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
}

/** Les chiffres clés, datés et sourcés. */
const KEY_FIGURES = [
  { label: '65 %', body: 'Retenue sur la part imposable d’un DASP de PVT, élément taxé et élément non taxé. En vigueur depuis le 1er juillet 2017. Source : ATO.' },
  { label: '35 % et 45 %', body: 'Taux ordinaires des autres visas temporaires, sur l’élément taxé et sur l’élément non taxé. Source : ATO.' },
  { label: '0 %', body: 'Retenue sur la part exonérée (tax-free component). Source : ATO.' },
  { label: '28 jours', body: 'Délai de paiement habituel à compter d’une demande complète. Source : ATO.' },
  { label: '5 000 $', body: 'Sur une demande papier, solde à partir duquel une Certification of Immigration Status (formulaire 1194, payant) peut être demandée. Un fund peut demander des copies certifiées quel que soit le solde. Source : ATO.' },
  { label: '6 mois', body: 'Après votre départ et la fin de votre visa, la super non réclamée est transférée à l’ATO. Elle reste réclamable à tout moment, sans limite de temps. Source : ATO.' },
  { label: '12 %', body: 'Super guarantee versée par l’employeur en plus du salaire depuis le 1er juillet 2025, inchangée en 2026-27. Depuis le 1er juillet 2026, la plupart des employeurs la versent à chaque paie (Payday Super). Source : ATO.' },
  { label: '0 $', body: 'Coût de la demande en ligne. Source : ATO.' },
]

/* ── Coque de section : chaque réponse de la page est une Section ─────────── */
function Answer({
  id, heading, children, tone = 'white',
}: { id: string; heading: string; children: React.ReactNode; tone?: 'white' | 'pale' | 'amber' }) {
  return (
    <Section id={id} tone={tone} title={heading} titleId={`${id}-title`}>
      {children}
    </Section>
  )
}

const GUIDES = [
  { ...frGuideLabel('how-long-does-dasp-take', 'Combien de temps prend un DASP, étape par étape') },
  { ...frGuideLabel('how-to-find-lost-superannuation', 'Retrouver une super perdue avec votre TFN') },
  { ...frGuideLabel('dasp-documents-required', 'Les documents nécessaires pour un DASP') },
  { ...frGuideLabel('dasp-tax-rate-65-percent-explained', 'Pourquoi le DASP est taxé à 65 %, et ce qu’il reste') },
  { ...frGuideLabel('dasp-rejected-what-to-do', 'Que faire si votre demande de DASP est rejetée') },
  { ...frGuideLabel('super-multiple-funds-consolidation', 'Réclamer quand votre super est dans plusieurs funds') },
  { ...frGuideLabel('dasp-vs-leaving-super-in-australia-pros-cons', 'Réclamer maintenant ou la laisser investie : la comparaison') },
  { ...frGuideLabel('tax-on-super-withdrawal-backpacker', 'L’impôt sur la super quand on quitte l’Australie') },
]

export default function SuperannuationPageFR() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className={blocks.underHeader}>
        <Crumb home="Accueil" current="Superannuation" label="Fil d’Ariane" href="/fr" />
        <Hero
          eyebrow={<>Superannuation &middot; DASP</>}
          title={<>Comment récupérer sa <Mark>super</Mark> après avoir quitté l’Australie</>}
        >
          <div className="hero-sub">
            <Lead>Après un PVT, vous récupérez votre superannuation avec un Departing Australia Superannuation Payment (DASP), en ligne auprès de l’ATO ou par formulaire papier auprès de chaque fund, une fois que votre visa 417 ou 462 a expiré ou a été annulé et que vous avez quitté l’Australie. Pour un PVT, 65 % de la part imposable sont retenus, et la demande en ligne est gratuite.</Lead>
            <p className={blocks.text}>L’ATO indique un paiement en général dans les 28 jours suivant une demande complète. Ce qui bloque le plus souvent : un visa encore actif, un fund oublié, ou des pièces d’identité qu’un fund n’accepte pas.</p>
          </div>
          <div className={coreBlocks.actions}>
            <WaButton href={WA} position="hero" topic="super" lang="fr">Posez-nous la question sur votre super</WaButton>
            <a href="#who-can-claim" className={coreBlocks.hint}>Commencer par les conditions</a>
          </div>
          <p className={heroStyles.note}>Réponse en général dans l’heure.</p>
        </Hero>
      </div>

      <PhotoFrame page="superannuation" locale="fr" />

      <Section eyebrow="Le faire soi-même" title={<>Le formulaire n’a qu’une case pour un super fund. <Mark>Quatre jobs d’appoint peuvent en faire quatre.</Mark></>} titleId="objection-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Deux de ces comptes ont été ouverts sans que vous ayez rien choisi.</p>
        <Compare rows={MYGOV.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="Sur le portail de l’ATO" rightLabel="Avec nous" />
        <p className={blocks.statement}>La demande de DASP elle-même ne passe pas par myGov. Ce qui prend du temps, c’est tout ce qui l’entoure, et c’est la partie que nous prenons en charge. Nous traitons directement avec l’ATO.</p>
      </Section>

      <Answer id="who-can-claim" heading="Qui peut réclamer un DASP ?" tone="pale">
        <p className={blocks.text}>
          Un Departing Australia Superannuation Payment se réclame une fois que votre visa temporaire a expiré
          ou a été annulé, que vous avez quitté l’Australie et que vous n’avez plus aucun autre visa australien
          actif. Tout cela doit être vrai en même temps. Les citoyens et résidents permanents australiens ou
          néo-zélandais ne peuvent pas le réclamer.
        </p>
        <p className={blocks.text}>
          L’argent vient de vos employeurs : la super est versée en plus de votre salaire, à hauteur de 12 % de
          votre rémunération ordinaire depuis le 1er juillet 2025. Pour vérifier ce qui aurait dû être versé, lisez{' '}
          <Link href={EMPLOYER_SUPER_GUIDE.href} className={blocks.textLink}>{EMPLOYER_SUPER_GUIDE.title}</Link>.
        </p>
        <p className={blocks.text}>
          Avec la demande en ligne, votre statut de visa est vérifié sur les dossiers du Department of Home Affairs
          et l’ATO confirme l’éligibilité automatiquement, donc il n’y a rien de séparé à prouver. Vous pouvez
          d’abord contrôler votre visa sur VEVO. Un bridging visa, ou être encore sur le territoire avec n’importe
          quel visa valide, bloque la demande.
        </p>
      </Answer>
      <Answer id="steps" heading="Demande de DASP en ligne, étape par étape" tone="white">
        <p className={blocks.text}>
          Le tutoriel complet pour récupérer sa superannuation en ligne, dans l’ordre où l’ATO vous fait avancer. Une fois les conditions remplies, la demande elle-même prend environ 30 minutes.
        </p>
        <ol className={blocks.text}>
          {STEPS.map((st) => (
            <li key={st.name}><strong>{st.name}.</strong> {st.text}</li>
          ))}
        </ol>
        <p className={blocks.text}>
          Sans passer par internet, la demande papier se fait avec le formulaire NAT 7204, envoyé à chaque fund, et le formulaire NAT 74880 pour la super déjà détenue par l’ATO.
        </p>
      </Answer>
      <Answer id="how-much" heading="Combien de super récupère-t-on vraiment ?" tone="pale">
        <p className={blocks.text}>
          Les PVT paient une retenue de 65 % sur la part imposable d’un DASP, donc environ 35 cents par dollar vous parviennent. Ce taux s’applique dès que le paiement comprend des cotisations versées pendant un visa 417 ou 462, et alors sur la totalité du paiement, même si vous avez eu un autre visa ensuite. Aucun intermédiaire et aucune attente ne peut le réduire.{' '}
          <Link href="/fr/calculator" className={blocks.textLink}>Faire une estimation dans le calculateur</Link>.
        </p>
        <div className={coreBlocks.threeUp}>
          {[
            { bal: '3 000 $', net: '1 050 $', note: 'un petit solde' },
            { bal: '6 000 $', net: '2 100 $', note: 'un solde moyen' },
            { bal: '10 000 $', net: '3 500 $', note: 'un solde plus élevé' },
          ].map((r, i) => (
            <div key={i} className={coreBlocks.stat}>
              <p className={coreBlocks.statLabel}>Solde de super</p>
              <p className={blocks.cardTitle}>{r.bal}</p>
              <p className={coreBlocks.statNet}>{r.net}</p>
              <p className={blocks.small}>qui vous sont versés &middot; {r.note}</p>
            </div>
          ))}
        </div>
        <p className={blocks.small}>Les montants sont calculés après la retenue de 65 % du DASP, sur un solde composé uniquement de cotisations taxées. Pour un PVTiste, la part taxée et la part non taxée sont toutes deux retenues à 65 %, et la part exonérée (tax-free component) à 0 %. Prenez ces chiffres comme des illustrations, pas comme un devis.</p>
      </Answer>
      <Answer id="key-figures" heading="Les chiffres clés du DASP, avec leurs sources" tone="white">
        <p className={blocks.small}>Chiffres vérifiés le 5 novembre 2026 sur les pages de l’ATO consacrées au DASP.</p>
        <PlainRows items={KEY_FIGURES} />
      </Answer>
      <Answer id="documents" heading="Quels documents faut-il pour un DASP ?" tone="pale">
        <p className={blocks.text}>
          Il vous faut votre passeport, les détails de votre visa, le nom et l’ABN de chaque fund, idéalement
          votre numéro de membre, une adresse e-mail et des coordonnées bancaires. Le tax file number n’est pas
          obligatoire, mais c’est lui qui permet au système de l’ATO de retrouver vos comptes à votre place.
        </p>
        <p className={blocks.text}>
          L’étape qui bloque les demandes est l’identité. Un fund peut exiger des copies certifiées de vos pièces
          d’identité, quel que soit le solde, et les funds n’acceptent pas tous les mêmes certificateurs, ce qui
          prend plus de temps depuis l’étranger que les gens ne l’imaginent. Sur une demande papier de 5 000 $ ou
          plus, il peut aussi falloir une Certification of Immigration Status (formulaire 1194 du Department of
          Home Affairs, payant). La demande en ligne vérifie votre statut de visa toute seule.
        </p>
      </Answer>
      <Answer id="how-long" heading="Combien de temps prend un paiement de DASP ?" tone="white">
        <p className={blocks.text}>
          Le paiement arrive en général dans les 28 jours suivant la réception d’une demande complète : c’est la
          norme de service indiquée par l’ATO. Le compteur démarre quand le fund ou l’ATO a tout ce qu’il lui
          faut, pas au premier clic : une demande à laquelle il manque un document certifié peut donc rester des
          semaines avant que ces 28 jours commencent. Remplir la demande en ligne prend environ 30 minutes.
        </p>
        <p className={blocks.text}>
          Si votre argent est réparti sur plusieurs funds, la demande va à la vitesse du plus lent. Les soldes
          déjà transférés à l’ATO se réclament auprès de l’ATO, dont la norme de service est aussi de 28 jours
          à compter du dépôt.
        </p>
      </Answer>
      <Answer id="find-your-fund" heading="Et si vous ne savez pas dans quel super fund vous étiez ?" tone="pale">
        <p className={blocks.text}>
          C’est la situation normale. Chaque fund dans lequel un employeur a versé est lié à votre tax file
          number, donc les comptes peuvent être retrouvés à partir de lui sans que vous vous souveniez d’un
          seul nom de fund. Les soldes qu’un fund a déjà remis à l’ATO apparaissent dans la même recherche.
          Il existe deux recherches officielles : la demande en ligne de l’ATO cherche par TFN une fois que vous
          êtes éligible, et myGov relié à l’ATO liste chaque compte sous Super, puis Fund details, super détenue
          par l’ATO comprise.
        </p>
        <p className={blocks.text}>
          La demande n’est pas automatique : trouver un compte ne dépose rien, et chaque fund veut encore sa
          propre demande. Le compte que les gens oublient est presque toujours celui du premier job.{' '}
          <Link href={LOST_SUPER_GUIDE.href} className={blocks.textLink}>{LOST_SUPER_GUIDE.title}</Link>.
        </p>
      </Answer>
      <Answer id="from-overseas" heading="Superannuation et retour en France : réclamer et recevoir sa super depuis l’étranger" tone="white">
        <p className={blocks.text}>
          Oui, et il le faut. Un DASP ne peut être déposé qu’une fois que vous avez quitté l’Australie, donc
          chaque demande part de l’étranger. L’endroit où vous vivez maintenant n’a aucune incidence. L’ATO
          recommande en revanche de commencer la demande en ligne et de l’enregistrer avant votre départ, puis
          de la déposer une fois parti.
        </p>
        <p className={blocks.text}>
          Réglez une chose avant de fermer votre compte bancaire australien. Il y a trois modes de paiement :
          virement sur un compte australien à votre nom, chèque en dollars australiens, ou virement
          international. Le virement international n’existe que pour la super détenue par un fund, et tous les
          funds ne le proposent pas. La super déjà passée à l’ATO n’est versée que sur un compte australien ou
          par chèque. Savoir si la France taxe ce versement est une question à poser à l’administration fiscale
          française.
        </p>
        <p className={blocks.text}>
          Pour un virement sur un compte français, belge ou canadien, le fund vous demande les coordonnées
          bancaires de ce compte dans la demande. Le montant est calculé en dollars australiens : la conversion
          dans votre devise, et les frais éventuels, dépendent du fund et de votre banque. Le délai de 28 jours
          court à partir d’une demande complète, puis le virement international ajoute son propre délai
          bancaire. Choisissez le compte avant de déposer, car ses coordonnées font partie de la demande.{' '}
          <Link href={TRANSFER_GUIDE.href} className={blocks.textLink}>{TRANSFER_GUIDE.title}</Link>.
        </p>
      </Answer>
      <Answer id="dasp-vs-leaving" heading="Vaut-il mieux réclamer sa super ou la laisser en Australie ?" tone="pale">
        <p className={blocks.text}>
          Pour presque tous les PVT, réclamer est préférable. Un solde laissé sur place ne reçoit plus de
          cotisations mais continue de payer des frais de gestion et souvent des primes d’assurance dont vous
          ne pouvez pas vous servir depuis l’étranger. Ce qui reste finit par atterrir à l’ATO, sans être investi.
        </p>
        <p className={blocks.text}>
          L’argument pour la laisser ne tient que si vous comptez revenir vivre et travailler en Australie
          durablement. Attendre ne réduit pas les 65 %.{' '}
          <Link href={COMPARISON_GUIDE.href} className={blocks.textLink}>
            {COMPARISON_GUIDE.title}
          </Link>.
        </p>
      </Answer>
      <Answer id="while-in-australia" heading="Peut-on réclamer sa super tant qu’on est encore en Australie ?" tone="white">
        <p className={blocks.text}>
          Non. La super est bloquée tant que vous avez un visa valide et que vous êtes dans le pays, sans
          déblocage anticipé avec un visa vacances-travail, ni pour une fin de job ni pour des difficultés financières.
        </p>
        <p className={blocks.text}>
          Si vous rentrez bien avant la fin de votre visa, le Department of Home Affairs peut annuler le
          visa restant une fois que vous êtes parti, ce qui avance en général la demande. Tant que VEVO affiche
          un visa actif, même depuis la France, la demande ne peut pas être déposée.
        </p>
      </Answer>
      <Answer id="never-claimed" heading="Que devient votre super si vous ne la réclamez jamais ? Est-elle transférée à l’ATO ?" tone="pale">
        <p className={blocks.text}>
          Elle n’est pas perdue. Une fois passés au moins six mois depuis votre départ et la fin de votre visa,
          votre fund doit transférer le solde à l’ATO, à l’une de ses deux dates de déclaration de l’année. Il y
          reste à votre nom, à l’abri des frais du fund et des primes d’assurance, et se réclame comme un DASP à
          tout moment, sans limite de temps, au même taux de 65 %.
        </p>
        <p className={blocks.text}>
          Ce qui est perdu, ce sont les frais et les primes d’assurance prélevés sur le solde avant son
          transfert. Sur un petit solde, cela peut représenter une part non négligeable.{' '}
          <Link href={UNCLAIMED_GUIDE.href} className={blocks.textLink}>{UNCLAIMED_GUIDE.title}</Link>.
        </p>
      </Answer>
      <Answer id="with-us" heading="La faire vous-même, ou nous la confier" tone="amber">
        <p className={blocks.text}>Vous pouvez la faire vous-même. Ce que vous nous confieriez, c’est la recherche sur tous les comptes liés à votre tax file number, super détenue par l’ATO comprise, les copies certifiées organisées depuis l’étranger, une demande séparée pour chaque fund, et les relances quand l’un d’eux ne répond plus.</p>
        <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Si nous faisons aussi votre tax return :</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique. La garantie ne s’applique qu’aux déclarations avec revenus sous TFN.
        </p>
        <p className={blocks.text}>
          Votre demande de super est distincte de votre{' '}
          <Link href="/fr/tax-return" className={blocks.textLink}>tax return</Link>. Si vous avez aussi une déclaration à déposer, elle est vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO. Working Holiday Tax opère sous la supervision d’un agent fiscal enregistré.
        </p>
        <p className={blocks.text}>
          <strong>Pour votre premier message, trois choses suffisent :</strong> les employeurs pour qui vous avez travaillé, même approximativement, la date de fin de votre visa, et la date à laquelle vous avez quitté l’Australie (ou celle prévue). Pas besoin d’envoyer votre TFN ni votre passeport à ce stade.
        </p>
        <div className={blocks.stack}>
          <WaButton href={WA} position="section" topic="super" lang="fr" size="md">Écrivez-nous sur WhatsApp</WaButton>
          <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Réponse en général dans l’heure.</p>
        </div>
      </Answer>

      <Section title="Les autres questions sur le DASP" titleId="faq-title">
        <Accordion items={faqs} />
        <p className={blocks.text}>
          Pour le TFN, voir{' '}
          <Link href="/fr/tfn" className={blocks.textLink}>notre page TFN</Link>. Pour le travail facturé avec un ABN, voir{' '}
          <Link href="/fr/abn" className={blocks.textLink}>notre page ABN</Link>.
        </p>
      </Section>

      <Section tone="pale" title="Approfondir une partie de la demande" titleId="guides-title">
        <TitleLinks items={GUIDES} />
      </Section>

      <Section eyebrow="Et ensuite" title="Avant de fermer votre compte australien" titleId="next-title">
        <p className={blocks.text}>La tax return de votre dernière année se dépose aussi, et son remboursement éventuel ne peut aller que sur un compte australien.</p>
        <LinkButton href="/fr/tax-return-australie-pvt">Votre tax return de PVT →</LinkButton>
        <p className={blocks.text}>
          La Medicare levy de 2 % est l’autre montant que personne ne réclame : la France n’a pas d’accord de santé réciproque avec l’Australie, donc la plupart des PVT français peuvent demander l’exemption, selon leur situation.{' '}
          <Link href="/fr/medicare" className={blocks.textLink}>Lire sur l’exemption</Link>.
        </p>
      </Section>

      <Section tone="forest" title="Posez-nous la question sur votre super" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Votre employeur l’a versée en plus de votre salaire, jamais à sa place. Elle est toujours en Australie. Dites-nous où vous avez travaillé et quand votre visa a pris fin : nous vous disons ce qui se réclame et par où commencer.</p>
        <WaButton href={WA} position="footer" topic="super" lang="fr" tone="light">Écrivez-nous sur WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Réponse en général dans l’heure.</p>
      </Section>

      <MobileCta href={WA} lang="fr" topic="super" />
    </>
  )
}
