import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
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
import { frGuideLabel } from '../_blog-links'

/*
 * Cette page porte sur le certificat d’exemption : la levy est retirée par
 * défaut seulement si une exemption est réclamée, un pays avec accord
 * réciproque supprime le droit à l’exemption, et l’exemption elle-même
 * demande une attestation que presque personne ne demande.
 */

const WA = waUrl({ topic: 'medicare', lang: 'fr' })

export const metadata: Metadata = {
  title: { absolute: 'Medicare levy : exemption pour les visas 417 et 462' },
  description:
    'La Medicare levy de 2 % est appliquée par défaut. Qui peut en être exempté, et le certificat que l’exemption demande.',
  keywords: [
    'Medicare levy PVT',
    'Medicare levy exemption Australie',
    'Medicare levy exemption visa 417',
    'Medicare levy exemption visa 462',
    'Medicare Entitlement Statement',
    'les PVT paient-ils la Medicare levy',
    'accord de réciprocité santé Australie',
    'Medicare Australie PVT',
    'Medicare levy 2 % tax return',
    'certificat d’exemption Medicare levy',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/medicare`,
    languages: {
      'en-AU': `${SITE_URL}/medicare`,
      de: `${SITE_URL}/de/medicare`,
      ja: `${SITE_URL}/ja/medicare`,
      ...newLocaleLanguages('/medicare'),
      'x-default': `${SITE_URL}/medicare`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-medicare.png`, width: 1200, height: 630, alt: 'Medicare levy pour les PVT en Australie' }],
    type: 'website',
    locale: 'fr_FR',
    url: `${SITE_URL}/fr/medicare`,
    siteName: 'Working Holiday Tax',
    title: 'Medicare levy : exemption pour les visas 417 et 462',
    description: 'La levy de 2 % est appliquée par défaut. Qui est exempté, et le certificat que l’exemption demande.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-medicare.png`],
    card: 'summary_large_image',
    title: 'Medicare levy : exemption pour les PVT',
    description: 'La levy de 2 % est appliquée par défaut. Qui est exempté, et ce que l’exemption demande.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

/**
 * L’objection que chaque lead apporte, traitée pour la levy. Chaque ligne
 * concerne ces 2 % : appliquée par défaut, décidée par le passeport plutôt que
 * par le visa, et la retirer demande un certificat à demander ailleurs. Aucune
 * ligne ne critique myGov. Le dépôt n’est pas la partie qui se passe mal.
 */
const MYGOV = [
  {
    mygov: 'La levy est ajoutée quand la tax return est évaluée, donc le premier signe est un remboursement plus petit que prévu.',
    us: 'Nous réglons cette question avant le dépôt de la tax return, pas après l’avis d’évaluation.',
  },
  {
    mygov: 'Rien à l’écran n’explique ce qui décide si elle s’applique à vous.',
    us: 'Savoir si vous aviez droit à Medicare est toute la question, et la première que nous examinons.',
  },
  {
    mygov: 'Retirer la levy demande un certificat d’exemption, à demander séparément et pas du tout via la tax return.',
    us: 'Nous vous aidons à demander le certificat, à l’attendre, et à faire réclamer l’exemption pour la bonne année.',
  },
  {
    mygov: 'La case d’exemption est là, que vous ayez le certificat ou non.',
    us: 'Nous ne la réclamons qu’avec les preuves derrière, ce sur quoi repose la demande si elle est contestée.',
  },
]

// Les réponses de plus de 55 mots portent une ligne vide : la FAQ rend un <p>
// par paragraphe. faqSchema utilise toujours le texte brut.
const faqs = [
  {
    question: 'Combien vaut vraiment l’exemption de Medicare levy ?',
    answer:
      'La levy est de 2 % du revenu imposable, soit environ 500 $ sur 25 000 $ gagnés et environ 1 000 $ sur 50 000 $. Elle est réglée quand votre tax return est évaluée, elle n’est pas prélevée semaine après semaine sur votre salaire : toute exemption se traite donc dans la tax return.',
  },
  {
    question: 'Tous les titulaires d’un visa 417 ou 462 ont-ils droit à l’exemption ?',
    answer:
      'Pas toujours. Le critère décisif est le droit à Medicare, pas votre visa. Certains pays ont un accord de réciprocité de soins de santé avec l’Australie, et le droit à Medicare supprime l’exemption.\n\nSavoir si cela s’applique à vous dépend de votre situation personnelle, et c’est l’ATO qui décide. Notre équipe l’examine dans le cadre de la préparation de votre déclaration.',
  },
  {
    question: 'Qu’est-ce qu’un Medicare Entitlement Statement, et en faut-il un ?',
    answer:
      'Un Medicare Entitlement Statement est un document de Services Australia qui confirme que vous n’aviez pas droit à Medicare pendant une période donnée. C’est la preuve derrière l’exemption, et l’ATO peut demander à la voir : nous nous en occupons dans le cadre de votre tax return.',
  },
  {
    question: 'Peut-on réclamer l’exemption pour une partie seulement de l’année ?',
    answer:
      'Oui, et pour beaucoup de PVT c’est la bonne réponse. Elle se calcule en jours : si vous êtes arrivé en novembre, seuls les jours où vous n’aviez pas droit à Medicare sont exemptés.\n\nRéclamer une année entière alors que seule une partie s’applique est le genre d’erreur qui conduit à faire modifier une tax return plus tard.',
  },
  {
    question: 'Une assurance voyage ou une assurance santé privée change-t-elle quelque chose ?',
    answer:
      'Non. La levy dépend du droit au système public, pas du fait d’être assuré : l’assurance voyage et la couverture hospitalière privée n’y changent rien.\n\nLa couverture privée compte pour une autre charge, la Medicare levy surcharge, qui s’applique aux hauts revenus et concerne rarement un PVT.',
  },
  {
    question: 'Que se passe-t-il si la levy a déjà été prélevée pendant l’année ?',
    answer:
      'La levy est calculée quand votre tax return est évaluée, pas au moment de la paie : ce qui est sorti de votre salaire était de l’impôt retenu en général, pas la levy en particulier. Une exemption valide la retire de l’évaluation.\n\nSi une année précédente a été déposée sans l’exemption alors que vous y aviez droit, cette tax return peut en général être modifiée.',
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
    { '@type': 'ListItem', position: 2, name: 'Medicare', item: `${SITE_URL}/fr/medicare` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/fr/medicare#service`,
  name: 'Exemption de Medicare levy pour les titulaires d’un visa vacances-travail',
  serviceType: 'Demande d’exemption de Medicare levy',
  description:
    'Exemption de Medicare levy traitée dans le cadre d’une tax return de PVT, Medicare Entitlement Statement compris, pour les titulaires d’un visa 417 ou 462 qui n’ont pas droit à Medicare.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australie' },
  audience: { '@type': 'Audience', audienceType: 'Titulaires d’un visa vacances-travail (subclass 417 / 462) sans droit à Medicare' },
  inLanguage: 'fr',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/fr/medicare#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/fr/medicare`,
}

const GUIDES = [
  { ...frGuideLabel('medicare-levy-working-holiday-makers', 'L’exemption de Medicare levy pour les PVT') },
  { ...frGuideLabel('countries-with-medicare-agreement-australia', 'Quels pays ont un accord de soins de santé avec l’Australie') },
  { ...frGuideLabel('what-is-medicare-working-holiday-makers', 'Ce qu’est Medicare, et qui est vraiment couvert') },
  { ...frGuideLabel('private-health-insurance-working-holiday-australia', 'Une assurance santé privée change-t-elle la levy ?') },
]

export default function MedicarePageFR() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO. Le critère décisif est le pays d’accord, pas la tâche. ─── */}
      <div className={blocks.underHeader}>
        <Crumb home="Accueil" current="Medicare" label="Fil d’Ariane" href="/fr" />
        <Hero
          eyebrow="Medicare levy"
          title={<>Une levy de 2 % que vous <Mark>ne deviez peut-être pas</Mark></>}
        >
          <div className="hero-sub">
            <Lead>Le droit à Medicare décide, pas votre visa. Elle peut se retirer avec un certificat que presque personne ne demande.</Lead>
          </div>
          <div className={coreBlocks.actions}>
            <WaButton href={WA} position="hero" topic="medicare" lang="fr">Vérifier votre situation</WaButton>
            <a href="#who-is-exempt" className={coreBlocks.hint}>Qui est exempté</a>
          </div>
          <p className={heroStyles.note}>Réponse en général dans l’heure.</p>
        </Hero>
      </div>

      <PhotoFrame page="medicare" locale="fr" />

      {/* ── L’OBJECTION, TRAITÉE POUR LA LEVY ──────────────────────────────── */}
      <Section
        eyebrow="Le faire soi-même"
        title={<>Personne ne demande si la levy était vraiment due. myGov l’applique et <Mark>passe à la suite.</Mark></>}
        titleId="objection-title"
      >
        <p className={`${blocks.text} ${blocks.muted}`}>
          C’est 2 % du revenu imposable, environ 500 $ sur une année à 25 000 $. Elle n’apparaît jamais sur une fiche de paie.
        </p>
        <Compare rows={MYGOV.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="Sur myGov" rightLabel="Avec nous" />
        <p className={blocks.statement}>
          Vous n’aurez jamais à vous connecter à myGov, à lier une pièce d’identité ou à deviner quel formulaire
          est le bon. Nous traitons directement avec l’ATO.
        </p>
      </Section>

      {/* ── CE QUI SE PASSE MAL TOUT SEUL ──────────────────────────────────── */}
      <Section tone="pale" title="Pourquoi la levy figure-t-elle sur votre évaluation ?" titleId="why-title">
        <p className={blocks.text}>
          Parce que c’est le réglage par défaut. Elle est prélevée sauf si une exemption est réclamée, et rien
          ne demande si vous aviez droit à Medicare : il peut donc arriver que 2 % du revenu d’une année
          soient versés à un système dont vous ne pouviez pas vous servir.
        </p>
        <p className={blocks.text}>
          L’erreur plus discrète est l’inverse : l’exemption cochée sans l’attestation qui la soutient. Cette
          preuve est un Medicare Entitlement Statement de Services Australia, un organisme distinct de l’ATO, et
          une demande faite sans lui ne peut pas être défendue si elle est contestée.
        </p>
      </Section>

      {/* ── LE CRITÈRE DÉCISIF ─────────────────────────────────────────────── */}
      <Section id="who-is-exempt" title="Qui est exempté de la Medicare levy ?" titleId="exempt-title">
        <p className={blocks.text}>
          Vous êtes en général exempté si vous n’aviez pas droit à Medicare, et avec un visa vacances-travail
          cela dépend de la situation de chacun. L’Australie a des accords de réciprocité de soins de santé avec certains
          pays.
        </p>
        <p className={blocks.text}>
          Quand un tel accord s’applique, le droit à Medicare peut exister pendant le séjour, ce qui supprime
          l’exemption même sans inscription : le critère est le droit, pas l’usage.
          Savoir si c’est votre cas dépend des faits de votre année, et c’est l’ATO qui décide. Notre équipe l’examine pour les
          jours concernés.
        </p>
        <div className={blocks.cards}>
          <div className={`${blocks.palePanel} ${blocks.stack}`}>
            <h3 className={blocks.cardTitle}>Droit à Medicare</h3>
            <p className={blocks.text}>
              La levy peut s’appliquer. Nous vérifions qu’elle est appliquée correctement, et si une partie
              de l’année était différente.
            </p>
          </div>
          <div className={`${blocks.palePanel} ${blocks.stack}`}>
            <h3 className={blocks.cardTitle}>Pas de droit à Medicare</h3>
            <p className={blocks.text}>
              L’exemption peut être possible. Elle doit s’appuyer sur les bonnes preuves, et nous nous en
              occupons dans le cadre de votre tax return.
            </p>
            <p className={blocks.small}>L’exemption se compte en jours, pas en un simple oui ou non pour l’année.</p>
          </div>
        </div>
      </Section>

      {/* ── CE QUE NOUS FAISONS (la promesse clé, bande ambre) ─────────────── */}
      <Section tone="amber" title="Que faisons-nous ?" titleId="do-title">
        <p className={blocks.text}>Nous déterminons si vous aviez droit à Medicare et pour quelle partie de l’année.</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Notre garantie : si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique. La garantie ne s’applique qu’aux déclarations avec revenus sous TFN.
        </p>
        <p className={blocks.text}>Vérifié et validé par un agent fiscal enregistré avant d’être déposé auprès de l’ATO.</p>
        <div className={blocks.stack}>
          <WaButton href={WA} position="section" topic="medicare" lang="fr" size="md">Écrivez-nous sur WhatsApp</WaButton>
          <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Réponse en général dans l’heure.</p>
        </div>
      </Section>

      {/* ── VIDÉO. Conservée, elle gagne sa place sur la page la plus performante. ── */}
      <Section tone="pale" title="L’exemption en deux minutes" titleId="video-title">
        <div className={coreBlocks.video}>
          <div className="block sm:hidden" style={{ aspectRatio: '9/16', maxWidth: '360px', margin: '0 auto' }}>
            <iframe loading="lazy"
              src="https://www.youtube-nocookie.com/embed/oj7ZSOHAxJk"
              title="L’exemption de Medicare levy expliquée"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
          <div className="hidden sm:block" style={{ aspectRatio: '16/9', maxWidth: '720px', margin: '0 auto' }}>
            <iframe loading="lazy"
              src="https://www.youtube-nocookie.com/embed/oj7ZSOHAxJk"
              title="L’exemption de Medicare levy expliquée"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
        </div>
      </Section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <Section title="Questions fréquentes sur la levy et l’exemption" titleId="faq-title">
        {/* Accordion découpe les réponses sur une ligne vide ; faqSchema ci-dessus utilise le texte brut. */}
        <Accordion items={faqs} />
      </Section>

      {/* ── GUIDES LIÉS ────────────────────────────────────────────────────── */}
      <Section tone="pale" title="Approfondir Medicare et la couverture santé" titleId="guides-title">
        <TitleLinks items={GUIDES} />
      </Section>

      <Section eyebrow="Et ensuite" title="L’exemption est une ligne de la tax return, pas toute la tax return" titleId="next-title">
        <p className={blocks.text}>Votre résidence fiscale et vos déductions pèsent davantage. Les trois se calculent ensemble.</p>
        <LinkButton href="/fr/tax-return">Comment la tax return est préparée</LinkButton>
      </Section>

      {/* ── CTA FINAL ──────────────────────────────────────────────────────── */}
      <Section tone="forest" title="Vérifiez votre situation" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Le droit à Medicare décide, pas votre visa.</p>
        <WaButton href={WA} position="footer" topic="medicare" lang="fr" tone="light">Écrivez-nous sur WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Réponse en général dans l’heure.</p>
      </Section>

      <MobileCta href={WA} lang="fr" topic="medicare" />
    </>
  )
}
