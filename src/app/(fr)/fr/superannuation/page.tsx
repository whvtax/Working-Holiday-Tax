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
import { Crumb, PhotoFrame, TitleLinks, coreBlocks } from '@/components/wht/CoreBlocks'
import { frGuide, frGuideLabel } from '../_blog-links'

/*
 * Page de réponse pour tout le cluster superannuation. Chaque H2 est une
 * question que les gens tapent vraiment, et chacune reçoit tout de suite une
 * réponse complète qui tient seule hors contexte. La couche commerciale vient
 * sous la réponse, pas à sa place.
 */

const WA = waUrl({ topic: 'super', lang: 'fr' })
const COMPARISON_GUIDE = frGuide('dasp-vs-leaving-super-in-australia-pros-cons', 'La comparaison complète est ici')

export const metadata: Metadata = {
  title: { absolute: 'Récupérer sa superannuation en Australie (DASP) après un PVT' },
  description:
    'Parti d’Australie avec un visa 417 ou 462 ? Votre super se réclame via le DASP. Conditions, taxe de 65 %, documents et délais.',
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
 * concerne le DASP : le portail prend un fund à la fois, et seulement ceux
 * que vous savez nommer. Rien ne dit que le système de l’ATO est mauvais.
 * Il fait un autre travail.
 */
const MYGOV = [
  {
    mygov: 'La demande traite un fund à la fois, et seulement ceux que vous connaissez déjà.',
    us: 'Nous cherchons tous les comptes liés à votre tax file number, y compris ceux qu’un employeur a ouverts sans vous demander.',
  },
  {
    mygov: 'Rien ne vous prévient qu’un solde a déjà quitté le fund pour l’ATO, au titre de la super non réclamée.',
    us: 'Environ six mois après l’expiration de votre visa, c’est là qu’il va, donc nous regardons là aussi.',
  },
  {
    mygov: 'La demande est vérifiée sur votre dossier de visa, et un visa qui n’a pas pris fin la bloque net.',
    us: 'Nous vérifions d’abord les trois conditions, pour que vous ne passiez pas quinze jours sur une demande qui ne peut pas encore être payée.',
  },
  {
    mygov: 'La super est une demande, la tax return en est une autre. Rien ne les relie pour vous.',
    us: 'Le montant le plus important se joue souvent du côté de la tax return, donc nous faisons les deux.',
  },
]

const faqs = [
  {
    question: 'Peut-on réclamer sa super avec un visa vacances-travail 417 ou 462 ?',
    answer:
      'Oui, une fois que vous avez quitté l’Australie et que votre visa vacances-travail a pris fin. Vous ne pouvez pas la réclamer tant que vous êtes encore ici avec ce visa. La demande s’appelle Departing Australia Superannuation Payment (DASP) : 65 % de la part imposable sont retenus et, contrairement à un remboursement d’impôt, le solde peut être versé sur un compte à l’étranger.',
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
      'Un fund peut en général vous identifier avec votre nom, votre date de naissance et votre passeport, donc un TFN perdu n’empêche pas la demande. Le TFN reste pourtant le seul moyen fiable de retrouver tous les comptes, et le retrouver est plus rapide que de chercher fund par fund.',
  },
  {
    question: 'Pourquoi le taux du DASP est-il de 65 % pour les PVT et de 35 % pour les autres ?',
    answer:
      'Le taux de 65 % est fixé par la loi pour toute personne qui a déjà eu un visa subclass 417 ou 462, même si elle est passée ensuite à un autre visa. Les résidents temporaires qui n’en ont jamais eu paient 35 % sur la part taxée.',
  },
  {
    question: 'Et si un employeur n’a jamais versé ma super ?',
    answer:
      'Quand un employeur aurait dû verser de la super et ne l’a jamais fait, c’est un dossier de super guarantee impayée que l’ATO peut examiner et recouvrer pour vous. Signalez-le avant de faire votre demande, car de l’argent récupéré après la fermeture de vos comptes oblige à faire une nouvelle demande.',
  },
  {
    question: 'Réclamer sa super a-t-il un effet sur la tax return ou sur un futur visa australien ?',
    answer:
      'Aucun des deux. La retenue d’impôt est définitive, donc un DASP ne figure pas sur votre tax return australienne, et aucune demande de visa ultérieure n’en dépend. La seule conséquence est que vos comptes sont clôturés : si vous revenez travailler, vous repartez avec un nouveau fund.',
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
    'Demandes de Departing Australia Superannuation Payment pour les titulaires d’un visa vacances-travail 417 ou 462, de la recherche de tous les funds liés à un tax file number jusqu’au versement sur un compte australien ou étranger.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australie' },
  audience: { '@type': 'Audience', audienceType: 'Titulaires d’un visa vacances-travail (subclass 417 / 462) qui ont quitté l’Australie' },
  inLanguage: 'fr',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/fr/superannuation#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/fr/superannuation`,
}

/*
 * Le HowTo décrit en quoi consiste une demande de DASP et dans quel ordre,
 * du point de vue du lecteur. Il ne se lit volontairement pas comme une liste
 * d’instructions à suivre : chaque étape décrit ce qui se passe.
 */
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  inLanguage: 'fr',
  name: 'Comment fonctionne une demande de Departing Australia Superannuation Payment (DASP)',
  description:
    'En quoi consiste une demande de Departing Australia Superannuation Payment pour un titulaire de visa subclass 417 ou 462, de l’éligibilité au versement.',
  step: [
    { name: 'L’éligibilité est confirmée', text: 'Votre visa doit avoir expiré ou été annulé et vous devez avoir quitté l’Australie. Les deux conditions doivent être vraies en même temps, et une demande faite avant est la demande inutile la plus courante.' },
    { name: 'Chaque fund est identifié', text: 'Une année de PVT avec plusieurs employeurs signifie en général plusieurs funds, y compris des soldes qu’un fund a déjà transférés à l’ATO au titre de la super non réclamée. Une demande n’atteint que l’argent vers lequel elle est dirigée.' },
    { name: 'Chaque demande est préparée et justifiée', text: 'Chaque fund qui détient un solde fait l’objet d’une demande séparée, selon son propre niveau d’identification et de certification. Les documents acceptés par un fund ne le sont pas toujours par le suivant.' },
    { name: 'La retenue est appliquée', text: 'Un DASP de PVT est taxé à 65 % sur la part imposable. Le fund la déduit et la verse à l’ATO avant de libérer le solde, quelle que soit la personne qui dépose la demande.' },
    { name: 'Le solde est libéré', text: 'Le solde restant est versé et, contrairement à un remboursement d’impôt, il peut l’être sur un compte bancaire à l’étranger.' },
  ].map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
}

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
  { ...frGuideLabel('dasp-documents-required', 'Les documents nécessaires pour un DASP') },
  { ...frGuideLabel('dasp-tax-rate-65-percent-explained', 'Pourquoi le DASP est taxé à 65 %, et ce qu’il reste') },
  { ...frGuideLabel('dasp-rejected-what-to-do', 'Que faire si votre demande de DASP est rejetée') },
  { ...frGuideLabel('super-multiple-funds-consolidation', 'Réclamer quand votre super est dans plusieurs funds') },
  { ...frGuideLabel('dasp-vs-leaving-super-in-australia-pros-cons', 'Réclamer maintenant ou la laisser investie : la comparaison') },
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
            <Lead>Votre employeur l’a versée en plus de votre salaire, jamais à sa place. Elle est toujours en Australie.</Lead>
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
        <p className={blocks.statement}>Vous n’aurez jamais à vous connecter à myGov ni à deviner quel formulaire est le bon. Nous traitons directement avec l’ATO.</p>
      </Section>

      <Answer id="who-can-claim" heading="Qui peut réclamer un DASP ?" tone="pale">
        <p className={blocks.text}>
          Un Departing Australia Superannuation Payment se réclame une fois que votre visa temporaire a expiré
          ou a été annulé et que vous avez définitivement quitté l’Australie. Les deux doivent être vrais en
          même temps. Les citoyens et résidents permanents australiens ou néo-zélandais ne peuvent pas le réclamer.
        </p>
        <p className={blocks.text}>
          Votre statut de visa est vérifié sur les dossiers du Department of Home Affairs, donc il n’y a rien
          de séparé à prouver. Un bridging visa, ou être encore sur le territoire avec n’importe quel visa
          valide, bloque la demande.
        </p>
      </Answer>
      <Answer id="how-much" heading="Combien de super récupère-t-on vraiment ?" tone="white">
        <p className={blocks.text}>Les PVT paient une retenue de 65 % sur la part imposable d’un DASP, donc environ 35 cents par dollar vous parviennent. Le taux est fixé par la loi pour toute personne qui a eu un visa 417 ou 462, et aucun agent ni aucune attente ne peut le réduire.</p>
        <div className={coreBlocks.threeUp}>
          {[
            { bal: '3 000 $', net: '1 050 $', note: 'quelques mois de travail occasionnel' },
            { bal: '6 000 $', net: '2 100 $', note: 'environ six mois à temps plein' },
            { bal: '10 000 $', net: '3 500 $', note: 'une année complète de PVT' },
          ].map((r, i) => (
            <div key={i} className={coreBlocks.stat}>
              <p className={coreBlocks.statLabel}>Solde de super</p>
              <p className={blocks.cardTitle}>{r.bal}</p>
              <p className={coreBlocks.statNet}>{r.net}</p>
              <p className={blocks.small}>versés à vous &middot; {r.note}</p>
            </div>
          ))}
        </div>
        <p className={blocks.small}>Les montants sont calculés après la retenue de 65 % du DASP, sur un solde composé uniquement de cotisations taxées. Une part non taxée, que certains funds détiennent, est retenue à un taux plus élevé : prenez donc ces chiffres comme des illustrations, pas comme un devis.</p>
      </Answer>
      <Answer id="documents" heading="Quels documents faut-il pour un DASP ?" tone="pale">
        <p className={blocks.text}>
          Il vous faut votre passeport, votre tax file number, les détails de votre visa, le nom de chaque
          fund et idéalement son numéro de membre, plus des coordonnées bancaires, australiennes ou
          étrangères. Un numéro de membre manquant est rarement fatal : un fund peut vous retrouver avec
          votre TFN et votre date de naissance.
        </p>
        <p className={blocks.text}>
          L’étape qui bloque les demandes est la certification. Quand un seul fund détient 5 000 $ ou plus,
          il demande en général des copies certifiées de votre passeport et de votre visa, ce qui prend plus
          de temps depuis l’étranger que les gens ne l’imaginent.
        </p>
      </Answer>
      <Answer id="how-long" heading="Combien de temps prend un paiement de DASP ?" tone="white">
        <p className={blocks.text}>
          Le paiement arrive en général dans les 28 jours suivant l’approbation. Le compteur démarre quand le
          fund ou l’ATO a tout ce qu’il lui faut, pas quand vous faites la demande : une demande à laquelle il
          manque un document certifié peut donc rester des semaines avant que ces 28 jours commencent.
        </p>
        <p className={blocks.text}>
          Si votre argent est réparti sur plusieurs funds, la demande va à la vitesse du plus lent. Les soldes
          déjà transférés à l’ATO se réclament auprès de l’ATO, selon le même niveau d’exigence.
        </p>
      </Answer>
      <Answer id="find-your-fund" heading="Et si vous ne savez pas dans quel super fund vous étiez ?" tone="pale">
        <p className={blocks.text}>
          C’est la situation normale. Chaque fund dans lequel un employeur a versé est lié à votre tax file
          number, donc les comptes peuvent être retrouvés à partir de lui sans que vous vous souveniez d’un
          seul nom de fund. Les soldes qu’un fund a déjà remis à l’ATO apparaissent dans la même recherche.
        </p>
        <p className={blocks.text}>
          La demande n’est pas automatique : trouver un compte ne dépose rien, et chaque fund veut encore sa
          propre demande. Le compte que les gens oublient est presque toujours celui du premier job.
        </p>
      </Answer>
      <Answer id="from-overseas" heading="Peut-on réclamer sa super depuis la France ou l’étranger ?" tone="white">
        <p className={blocks.text}>
          Oui, et il le faut. Un DASP ne peut être demandé qu’une fois que vous avez quitté l’Australie, donc
          chaque demande se fait depuis l’étranger. L’endroit où vous vivez maintenant n’a aucune incidence.
        </p>
        <p className={blocks.text}>
          Une chose à régler avant de fermer votre compte bancaire australien : tous les funds ne virent pas
          sur un compte à l’étranger, et certains émettent un chèque, long à encaisser. Savoir si votre pays
          de résidence taxe ce versement est une question à poser à l’administration fiscale de ce pays.
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
          visa restant une fois que vous êtes parti, ce qui avance en général la demande.
        </p>
      </Answer>
      <Answer id="never-claimed" heading="Que devient votre super si vous ne la réclamez jamais ?" tone="pale">
        <p className={blocks.text}>
          Elle n’est pas perdue. Environ six mois après l’expiration de votre visa et votre départ, un fund
          doit transférer un solde non réclamé à l’ATO, où il reste à votre nom, sans frais. Une demande
          faite des années plus tard reste une demande, au même taux de 65 %.
        </p>
        <p className={blocks.text}>
          Ce qui est perdu, ce sont les frais et les primes d’assurance prélevés sur le solde avant son
          transfert. Sur un petit solde, cela peut représenter une part non négligeable.
        </p>
      </Answer>
      <Answer id="with-us" heading="Nous nous occupons de la demande" tone="amber">
        <p className={blocks.text}>Ce que nous prenons en charge, c’est la recherche sur tous les comptes liés à votre tax file number, super détenue par l’ATO comprise, les copies certifiées organisées depuis l’étranger, une demande séparée pour chaque fund, et les relances quand l’un d’eux ne répond plus.</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique. La garantie ne s’applique qu’aux déclarations avec revenus sous TFN.
        </p>
        <p className={blocks.text}>Vérifié et validé par un agent fiscal enregistré avant d’être déposé auprès de l’ATO.</p>
        <div className={blocks.stack}>
          <WaButton href={WA} position="section" topic="super" lang="fr" size="md">Écrivez-nous sur WhatsApp</WaButton>
          <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Réponse en général dans l’heure.</p>
        </div>
      </Answer>

      <Section title="Les autres questions sur le DASP" titleId="faq-title">
        <Accordion items={faqs} />
      </Section>

      <Section tone="pale" title="Approfondir une partie de la demande" titleId="guides-title">
        <TitleLinks items={GUIDES} />
      </Section>

      <Section eyebrow="Et ensuite" title="La Medicare levy de 2 % est l’autre somme que personne ne réclame" titleId="next-title">
        <p className={blocks.text}>Selon votre situation, vous ne la deviez peut-être pas. Elle peut se retirer avec un certificat que presque personne ne demande.</p>
        <LinkButton href="/fr/medicare">Lire sur l’exemption</LinkButton>
      </Section>

      <Section tone="forest" title="Posez-nous la question sur votre super" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Votre employeur l’a versée en plus de votre salaire, jamais à sa place. Elle est toujours en Australie.</p>
        <WaButton href={WA} position="footer" topic="super" lang="fr" tone="light">Écrivez-nous sur WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Réponse en général dans l’heure.</p>
      </Section>

      <MobileCta href={WA} lang="fr" topic="super" />
    </>
  )
}
