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
import { Figures, LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { Crumbs, PhotoBand, tb } from '@/components/wht/TfnAbnBlocks'
import { frGuide } from '../_blog-links'

// ─── METADATA ───────────────────────────────────────────────────────────
// Cette page porte sur les semaines entre le premier jour de travail et le
// moment où le TFN arrive chez l’employeur. Pas de prix, et aucune phrase qui
// laisse entendre que nous sommes nous-mêmes agent fiscal enregistré.
export const metadata: Metadata = {
  // Le layout racine ajoute " | Working Holiday Tax" : le titre reste court.
  title: { absolute: 'Demande de TFN en Australie (PVT) : évitez les 45 %' },
  description:
    'Le TFN est gratuit. Ce qui coûte cher, ce sont les fiches de paie avant que votre employeur l’ait : 45 % retenus au lieu de 15 %.',
  keywords: [
    'TFN Australie',
    'demander un TFN Australie',
    'TFN PVT Australie',
    'Tax File Number Australie',
    'TFN visa 417',
    'TFN visa 462',
    'TFN backpacker',
    'sans TFN 45 % Australie',
    'TFN délai 28 jours',
    'TFN Australie délai d’obtention',
    'TFN pour le remboursement d’impôts',
    'numéro d’identification fiscale Australie',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/tfn`,
    languages: {
      'en-AU': `${SITE_URL}/tfn`,
      de: `${SITE_URL}/de/tfn`,
      ja: `${SITE_URL}/ja/tfn`,
      ...newLocaleLanguages('/tfn'),
      'x-default': `${SITE_URL}/tfn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tfn.png`, width: 1200, height: 630, alt: 'Demande de TFN pour les titulaires d’un visa vacances-travail en Australie' }],
    type: 'website',
    locale: 'fr_FR',
    url: `${SITE_URL}/fr/tfn`,
    siteName: 'Working Holiday Tax',
    title: 'TFN en PVT : évitez les semaines à 45 %',
    description:
      'Le numéro est gratuit, les semaines sans lui ne le sont pas. Nous préparons et déposons la demande de TFN, pour un visa 417 ou 462.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tfn.png`],
    card: 'summary_large_image',
    title: 'TFN en PVT : évitez les semaines à 45 %',
    description: 'Le numéro est gratuit. Les semaines avant que votre employeur l’ait, non.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

const FAILURE_POINTS = [
  {
    n: '01',
    title: 'Le nom sur le formulaire n’est pas celui du dossier d’immigration',
    body: 'L’ATO compare votre demande avec votre dossier de visa. Un deuxième prénom oublié, un passeport renouvelé ou des noms dans un autre ordre peuvent la faire renvoyer.',
  },
  {
    n: '02',
    title: 'L’adresse ne recevra plus le courrier dans quatre semaines',
    body: 'Votre TFN arrive par courrier à une adresse australienne, et l’émission peut prendre jusqu’à 28 jours. Si vous avez déjà bougé, personne ne fait suivre la lettre.',
  },
  {
    n: '03',
    title: 'La demande a été faite avant que le visa soit activé',
    body: 'On fait la demande une fois en Australie, visa activé, pas avant le départ. Une demande trop tôt ne mène nulle part, et vous le découvrez des semaines plus tard, à 45 %.',
  },
]

const WHAT_WE_DO = [
  {
    title: 'Nous vérifions d’abord que votre visa est actif',
    body: 'Une question d’une minute qui évite le mois perdu le plus courant.',
  },
  {
    title: 'Nous recoupons vos données avec votre dossier d’immigration',
    body: 'Passeport, ordre des noms, date de naissance et date d’octroi du visa, vérifiés les uns par rapport aux autres avant le dépôt.',
  },
  {
    title: 'Nous réglons la question de l’adresse avec vous',
    body: 'Où vous serez dans quatre semaines, et que faire si la réponse est une ferme ou un van.',
  },
  {
    title: 'Nous relançons si ça traîne',
    body: 'L’ATO a 28 jours. Au-delà, quelqu’un doit les appeler, et ce ne sera pas vous.',
  },
  {
    title: 'Nous vous disons quoi dire à votre employeur en attendant',
    body: 'Le numéro de référence de la demande, bien communiqué, évite que les premières paies soient retenues au taux maximal.',
  },
  {
    title: 'Nous réclamons l’écart en fin d’année',
    body: 'Ce qui a déjà été retenu à 45 % ne revient que par une tax return, et seulement si elle le fait apparaître.',
  },
]

// Les réponses de plus de 55 mots portent une ligne vide : la FAQ rend un <p>
// par paragraphe. faqLd utilise toujours le texte brut.
const FAQS = [
  {
    question: 'Puis-je demander mon TFN moi-même ?',
    answer:
      'Oui. La demande est un court formulaire gratuit.\n\nCe pour quoi nous sommes payés, c’est le travail autour : faire correspondre vos données au dossier d’immigration, choisir une adresse qui recevra encore le courrier dans quatre semaines, et donner à votre employeur le numéro de référence pour que les premières paies ne soient pas retenues à 45 %.',
  },
  {
    question: 'La demande de TFN est gratuite sur le site de l’ATO. Pourquoi payer ?',
    answer:
      'Le numéro lui-même est gratuit. Ce qui coûte, c’est l’écart : chaque paie versée avant que votre employeur ait le numéro est retenue à 45 % au lieu de 15 %. Nous facturons le travail qui referme cet écart, et celui qui permet de récupérer ce qui est déjà parti.',
  },
  {
    question: 'Que se passe-t-il si je commence à travailler sans TFN ?',
    answer:
      'Votre employeur doit retenir 45 %, au lieu du taux qui s’applique normalement à votre situation, tant que vous ne lui avez pas communiqué de TFN. Vous avez 28 jours à partir du début du job. À chaque heure travaillée, une part nettement plus grande va à l’ATO au lieu d’aller dans votre poche.\n\nCet argent n’est pas perdu, mais il ne revient que par une tax return déposée correctement après la fin de l’année fiscale.',
  },
  {
    question: 'Je travaille depuis des semaines sans TFN. Est-ce trop tard ?',
    answer:
      'Non. Faites la demande maintenant pour que le taux maximal cesse de s’appliquer aux prochaines paies. L’excédent déjà retenu est réglé avec la tax return de cette année fiscale, et ce qui vous revient dépend de votre année : c’est l’ATO qui décide.\n\nNous pouvons en général préparer la demande le jour même de votre message. Dites-nous combien de semaines ont déjà été payées à 45 %, car cela change ce que votre tax return doit indiquer.',
  },
  {
    question: 'Combien de temps faut-il pour recevoir le TFN ?',
    answer:
      'L’ATO indique traiter les demandes de TFN sous 28 jours, et la plupart des titulaires d’un visa vacances-travail reçoivent le leur en deux à quatre semaines. Il arrive par courrier à l’adresse australienne indiquée dans la demande. Pendant l’attente, votre employeur a besoin du numéro de référence de la demande.',
  },
  {
    question: 'Peut-on demander le TFN avant d’arriver en Australie ?',
    answer:
      'Pas avec un visa vacances-travail. On fait la demande une fois en Australie, avec le visa 417 ou 462 activé, parce qu’elle est recoupée avec votre arrivée et votre dossier de visa. Il faut aussi une adresse postale australienne pour recevoir la lettre.',
  },
  {
    question: 'Faut-il un nouveau TFN pour un deuxième visa vacances-travail ?',
    answer:
      'Non. Un TFN est attribué une seule fois et vous suit toute la vie : deuxième ou troisième visa vacances-travail, changement de catégorie de visa, période passée hors d’Australie.\n\nSi vous avez perdu le numéro plutôt que de n’en avoir jamais eu, c’est un autre problème, plus rapide à régler. Dites-nous simplement de quel cas il s’agit.',
  },
]

const GUIDES = [
  {
    ...frGuide('what-happens-without-your-tfn', 'Travailler sans TFN'),
    desc: 'Les 45 %, la fenêtre de 28 jours et comment l’argent revient.',
  },
  {
    ...frGuide('tfn-reference-number-before-tfn-arrives', 'Le numéro de référence de la demande'),
    desc: 'Ce qu’il faut donner à l’employeur pendant que la lettre est en route.',
  },
  {
    ...frGuide('how-long-does-it-take-to-get-a-tfn', 'Combien de temps prend un TFN'),
    desc: 'Ce que l’ATO annonce, ce qui se passe en pratique, et quand relancer.',
  },
]

const WA_TFN = waUrl({ topic: 'tfn', lang: 'fr' })

export default function TFNPageFR() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/fr/tfn#webpage`,
    url: `${SITE_URL}/fr/tfn`,
    name: 'TFN pour un visa vacances-travail en Australie',
    description:
      'Ce que coûte le fait de travailler avant que le TFN arrive chez l’employeur, pourquoi les demandes de TFN des PVT échouent, et comment récupérer l’excédent retenu.',
    inLanguage: 'fr',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/fr/tfn#service`,
    name: 'Demande de TFN pour les titulaires d’un visa vacances-travail',
    serviceType: 'Demande de Tax File Number',
    description:
      'Demandes de TFN préparées et déposées pour les titulaires d’un visa vacances-travail 417 ou 462, avec le numéro de référence pour l’employeur et le suivi auprès de l’ATO.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australie' },
    audience: { '@type': 'Audience', audienceType: 'Titulaires d’un visa vacances-travail (subclass 417 et 462)' },
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
      { '@type': 'ListItem', position: 2, name: 'TFN', item: `${SITE_URL}/fr/tfn` },
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
        <Crumbs homeHref="/fr" home="Accueil" current="TFN" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>Demande de TFN&nbsp;&middot; visa vacances-travail 417 &amp; 462</span>
            Le numéro est gratuit.<br />
            Les semaines <Mark>sans lui</Mark>, non.
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              Tant que votre employeur n’a pas votre numéro, 45 % de votre paie est retenu au lieu de 15 %.
            </Lead>
          </div>
          <WaButton href={WA_TFN} position="hero" topic="tfn" lang="fr">Écrivez-nous sur WhatsApp</WaButton>
          <p className={heroStyles.note}>Réponse en général dans l’heure.</p>
          <GoogleRating variant="pill" lang="fr" />
        </Hero>
        <PhotoBand page="tfn" locale="fr" />
      </div>

      <Section width="wide" title="Que coûte un début de job avant l’arrivée du TFN ?" titleId="gap-title">
        <p className={blocks.text}>
          Si votre employeur n’a pas votre TFN au bout de 28 jours, il doit retenir 45 %, au lieu du taux qui s’applique normalement à votre situation. L’impôt en trop n’est pas perdu : il peut revenir avec votre
            tax return, déposée après le 30 juin.
        </p>
        <Figures
          items={[
            { figure: '45 %', body: 'Retenus sur chaque dollar tant qu’aucun TFN n’est enregistré, au lieu de quinze.' },
            { figure: '28 jours', body: 'Pour donner votre TFN à votre employeur, et pour que l’ATO l’émette.' },
            { figure: '1 tax return', body: 'Le seul chemin pour récupérer ce qui a déjà été retenu au mauvais taux.' },
          ]}
        />
      </Section>

      <Section tone="pale" eyebrow="Le faire soi-même" title="Pourquoi les demandes de TFN échouent-elles ?" titleId="fail-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Le formulaire est court. Chacun des trois pièges ci-dessous peut coûter un mois de plus à 45 %.
        </p>
        <Steps items={FAILURE_POINTS} />
      </Section>

      <Section eyebrow="Le travail" title="Ce que nous faisons" titleId="work-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Vous nous envoyez vos informations sur WhatsApp. Tout le reste se passe de notre côté.
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
          Vous avez déjà le numéro et voulez récupérer les semaines à 45 % ?{' '}
            <Link href="/fr/tax-return" className={tb.inlineLink}>C’est le rôle de la tax return</Link>.
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
          Chaque demande de TFN que nous déposons concerne quelqu’un qui a un visa 417 ou 462. Les tax returns sont
            vérifiées et validées par un agent fiscal enregistré avant d’être déposées auprès de l’ATO.
        </p>
        <GoogleReviewsServer lang="fr" />
      </Section>

      <Section title="Les questions sur le TFN avant de nous écrire" titleId="faq-title">
        {/* Accordion découpe les réponses sur une ligne vide ; faqLd ci-dessus utilise le texte brut. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Guides" title="Plus de détails sur le TFN et les semaines à 45 %" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="Et ensuite" title="Les semaines à 45 % reviennent par la tax return" titleId="next-title">
        <p className={blocks.text}>Une fois le numéro enregistré, c’est la tax return qui réclame l’excédent.</p>
        <div className={blocks.stack}>
          <LinkButton href="/fr/tax-return" size="md">Comment se passe la tax return →</LinkButton>
        </div>
      </Section>

      {/* CTA final, bande forêt. */}
      <Section tone="forest" title="Dites-nous où vous en êtes" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          Êtes-vous arrivé en Australie, avez-vous commencé un job, et des paies ont-elles déjà été versées à
            45 % ? Trois réponses, et nous vous disons quoi faire ensuite.
        </p>
        <WaButton href={WA_TFN} position="section" topic="tfn" lang="fr" tone="light">Écrivez-nous sur WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Réponse en général dans l’heure.</p>
      </Section>

      <MobileCta href={WA_TFN} lang="fr" topic="tfn" />
    </>
  )
}
