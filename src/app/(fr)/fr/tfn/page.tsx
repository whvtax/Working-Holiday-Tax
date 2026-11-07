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
    'Le TFN est gratuit et se demande en ligne une fois en Australie, visa 417 ou 462 activé. Il arrive sous 28 jours. Sans lui, votre employeur retient 45 %.',
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
    'numéro TFN Australie PVT',
    'comment obtenir son TFN',
    'TFN non reçu après 28 jours',
    'TFN declaration',
    'formulaire TFN en ligne ATO',
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
      'Le numéro est gratuit, les semaines sans lui ne le sont pas. Nous préparons la demande de TFN avec vous, pour un visa 417 ou 462.',
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
    body: 'Passeport, ordre des noms, date de naissance et date d’octroi du visa, vérifiés les uns par rapport aux autres avant l’envoi de la demande.',
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
    body: 'Ce qui a déjà été retenu à 45 % se règle par une tax return, et le résultat dépend de votre année.',
  },
]

// Les réponses de plus de 55 mots portent une ligne vide : la FAQ rend un <p>
// par paragraphe. faqLd utilise toujours le texte brut.
const APPLY_STEPS = [
  {
    n: '01',
    title: 'Attendez d’être en Australie, visa activé',
    body: 'Le formulaire en ligne de l’ATO s’adresse aux personnes qui se trouvent en Australie avec un visa qui autorise le travail, comme le 417 ou le 462. Avant le départ, la demande ne passe pas.',
  },
  {
    n: '02',
    title: 'Préparez quatre informations',
    body: 'Le passeport lié à votre visa, vos noms dans le même ordre que sur ce passeport, une adresse postale australienne où vous serez encore dans quatre semaines, et un téléphone ou une adresse e-mail. Aucun document à envoyer.',
  },
  {
    n: '03',
    title: 'Remplissez le formulaire en ligne de l’ATO',
    body: 'Il s’appelle Individual Auto-Registration (IAR) et il est gratuit. Relisez chaque champ avant d’envoyer : une erreur de nom ou d’adresse coûte des semaines.',
  },
  {
    n: '04',
    title: 'Gardez le reçu et prévenez votre employeur',
    body: 'À la fin, l’ATO vous donne un reçu (ATO receipt ID). Sur la TFN declaration remise à votre employeur, indiquez que votre demande est en cours : il a alors 28 jours avant de devoir retenir 45 %.',
  },
  {
    n: '05',
    title: 'Attendez la lettre sans refaire de demande',
    body: 'Le TFN arrive par courrier sous 28 jours. L’ATO demande de ne pas déposer une deuxième demande pendant ce délai. Au-delà, appelez l’ATO avec votre reçu.',
  },
]

const FAQS = [
  {
    question: 'Combien de temps faut-il pour recevoir le TFN ?',
    answer:
      'L’ATO indique traiter les demandes de TFN sous 28 jours, et la plupart des titulaires d’un visa vacances-travail reçoivent le leur en deux à quatre semaines. Il arrive par courrier à l’adresse australienne indiquée dans la demande. Pendant l’attente, votre employeur a besoin du reçu de votre demande (l’ATO l’appelle ATO receipt ID), et vous ne devez pas déposer de deuxième demande.',
  },
  {
    question: 'Mon TFN n’est pas arrivé après 28 jours : que faire ?',
    answer:
      'Appelez l’ATO au 13 28 61 depuis l’Australie (de 8 h à 18 h, du lundi au vendredi) ou au +61 2 6216 1111 depuis l’étranger, avec votre reçu de demande (ATO receipt ID) et votre passeport. Ne refaites pas de demande : cela peut retarder la première.\n\nSi votre adresse a changé, elle peut être mise à jour pendant le même appel. Prévenez aussi votre employeur : une demande en cours ne vous évite la retenue à 45 % que pendant 28 jours. Les trois causes de retard à vérifier sont détaillées dans notre guide sur le TFN en retard après 28 jours.',
  },
  {
    question: 'Peut-on demander le TFN avant d’arriver en Australie ?',
    answer:
      'Non, pas avec un visa vacances-travail. Le formulaire en ligne de l’ATO s’utilise une fois en Australie, avec le visa 417 ou 462 activé, car la demande est recoupée avec votre arrivée et votre dossier de visa. Il faut aussi une adresse postale australienne pour recevoir la lettre.',
  },
  {
    question: 'Quels documents faut-il pour demander un TFN en PVT ?',
    answer:
      'Aucun document à envoyer, l’ATO le précise. Il vous faut votre passeport, celui de votre visa 417 ou 462, un visa déjà activé, une adresse postale australienne et un moyen de contact. Ce qui fait échouer les demandes, c’est surtout un nom écrit autrement que dans votre dossier de visa, ou une adresse que vous aurez quittée.',
  },
  {
    question: 'Quelle adresse indiquer si je n’ai pas encore de logement fixe ?',
    answer:
      'Une adresse australienne où quelqu’un recevra encore votre courrier dans quatre semaines : une auberge qui accepte de le garder, un ami ou un proche installé en Australie. Le TFN arrive uniquement par la poste, à l’adresse indiquée dans la demande. Si vous partez avant, l’adresse peut être mise à jour auprès de l’ATO.',
  },
  {
    question: 'Que se passe-t-il si je commence à travailler sans TFN ?',
    answer:
      'Votre employeur doit retenir 45 %, au lieu du taux qui s’applique normalement à votre situation, tant que vous ne lui avez pas communiqué de TFN. Si vous lui indiquez que votre demande est en cours, il a 28 jours avant de devoir appliquer ce taux. À chaque heure travaillée, une part nettement plus grande va à l’ATO au lieu d’aller dans votre poche.\n\nCet argent se règle avec la tax return déposée après la fin de l’année fiscale, et ce qui revient dépend de votre année : c’est l’ATO qui décide.',
  },
  {
    question: 'Quel taux d’impôt s’applique une fois le TFN donné à l’employeur ?',
    answer:
      '15 % de 0 à 45 000 $ si votre employeur est enregistré auprès de l’ATO comme employeur de PVT, puis 30 % jusqu’à 135 000 $. Un employeur non enregistré doit retenir 30 % dès le premier dollar. Les PVT n’ont pas droit au seuil non imposable. Ces taux s’appliquent depuis le 1er juillet 2026, inchangés par rapport à 2025-26.',
  },
  {
    question: 'Je travaille depuis des semaines sans TFN. Est-ce trop tard ?',
    answer:
      'Non. Faites la demande maintenant pour que le taux maximal cesse de s’appliquer aux prochaines paies. L’excédent déjà retenu est réglé avec la tax return de cette année fiscale, et ce qui vous revient dépend de votre année : c’est l’ATO qui décide.\n\nNous pouvons en général préparer la demande le jour même de votre message. Dites-nous combien de semaines ont déjà été payées à 45 %, car cela change ce que votre tax return doit indiquer.',
  },
  {
    question: 'Faut-il un nouveau TFN pour un deuxième visa vacances-travail ?',
    answer:
      'Non. Un TFN est attribué une seule fois et vous le gardez même si vous changez de job ou de nom, de région ou de pays : deuxième ou troisième visa vacances-travail, changement de catégorie de visa, période passée hors d’Australie.\n\nSi vous avez perdu le numéro plutôt que de n’en avoir jamais eu, c’est un autre problème, plus rapide à régler. Dites-nous simplement de quel cas il s’agit.',
  },
  {
    question: 'Puis-je demander mon TFN moi-même ?',
    answer:
      'Oui. La demande se fait sur un court formulaire en ligne de l’ATO, et elle est gratuite.\n\nCe pour quoi nous sommes payés, c’est le travail autour : faire correspondre vos données au dossier d’immigration, choisir une adresse qui recevra encore le courrier dans quatre semaines, donner à votre employeur le reçu de la demande pour que les premières paies ne soient pas retenues à 45 %, puis régler avec la tax return ce qui a déjà été retenu au mauvais taux.',
  },
]

const GUIDES = [
  {
    ...frGuide('how-to-apply-for-a-tfn', 'Comment demander un TFN, et ce qui peut mal tourner'),
    desc: 'Le formulaire, l’adresse, le passeport et les 28 jours, en détail.',
  },
  {
    ...frGuide('tfn-reference-number-before-tfn-arrives', 'Le numéro de référence de la demande'),
    desc: 'Ce qu’il faut donner à l’employeur pendant que la lettre est en route.',
  },
  {
    ...frGuide('tfn-application-delayed', 'TFN en retard après 28 jours'),
    desc: 'Trois points à vérifier avant d’appeler l’ATO.',
  },
  {
    ...frGuide('what-happens-without-your-tfn', 'Travailler sans TFN'),
    desc: 'Les 45 %, la fenêtre de 28 jours et comment l’écart se règle.',
  },
  {
    ...frGuide('how-to-find-lost-tfn', 'TFN perdu'),
    desc: 'Où retrouver un numéro que vous avez déjà.',
  },
  {
    ...frGuide('can-you-have-tfn-and-abn', 'TFN et ABN en même temps'),
    desc: 'Quand il faut les deux, et ce que cela change à la tax return.',
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
      'Comment demander un TFN en PVT (visa 417 ou 462) : étapes, délai de 28 jours, documents, taux de 45 % sans TFN et taux de 15 % chez un employeur enregistré.',
    inLanguage: 'fr',
    dateModified: '2026-11-05',
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
      'Demandes de TFN préparées avec les titulaires d’un visa vacances-travail 417 ou 462, avec le reçu de la demande pour l’employeur et le suivi auprès de l’ATO.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australie' },
    audience: { '@type': 'Audience', audienceType: 'Titulaires d’un visa vacances-travail (subclass 417 et 462)' },
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
              <span className={blocks.kicker}>Demande de TFN en Australie (Tax File Number)&nbsp;&middot; PVT 417 &amp; 462</span>
            Le numéro est gratuit.<br />
            Les semaines <Mark>sans lui</Mark>, non.
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              Le TFN (Tax File Number) est votre numéro fiscal australien, un numéro unique en général à 9 chiffres. Il est gratuit et se demande en ligne auprès de l’ATO, une fois en Australie avec votre visa 417 ou 462 activé, et arrive par courrier sous 28 jours. Sans TFN ni demande en cours déclarée, votre employeur retient 45 % de votre paie.
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
          Si vous avez indiqué à votre employeur que votre demande est en cours, il a 28 jours. Sans TFN au bout de ce délai, ou sans cette indication dès le départ, il doit retenir 45 %, au lieu de 15 % chez un employeur enregistré pour les PVT. L’impôt retenu en trop se règle avec votre
            tax return, déposée après le 30 juin, et le résultat dépend de votre année.
        </p>
        <Figures
          items={[
            { figure: 'Gratuit', body: 'La demande de TFN ne coûte rien. Source : ATO.' },
            { figure: '28 jours', body: 'Délai annoncé par l’ATO pour recevoir le TFN par courrier. C’est aussi le délai pour le donner à l’employeur une fois la demande en cours déclarée. Source : ATO.' },
            { figure: '45 %', body: 'Retenus sur chaque dollar quand ni TFN ni demande en cours ne sont déclarés à l’employeur. Source : ATO.' },
            { figure: '15 %', body: 'Taux des PVT de 0 à 45 000 $ chez un employeur enregistré auprès de l’ATO, 30 % chez un employeur non enregistré. Taux 2026-27, inchangés depuis 2025-26. Source : ATO.' },
          ]}
        />
        <p className={blocks.small}>
          Sources : ato.gov.au, pages sur la demande de TFN des titulaires de passeport étranger (mise à jour le 22 juin 2026), les employeurs de PVT et le barème des PVT. Chiffres vérifiés le 5 novembre 2026.
        </p>
      </Section>

      <Section eyebrow="La démarche" title="Comment demander votre TFN en PVT, étape par étape" titleId="apply-title">
        <Steps items={APPLY_STEPS} />
        <p className={blocks.statement}>
          Ce parcours, nous le faisons avec vous. Envoyez-nous sur WhatsApp votre date d’arrivée, si votre visa est activé et l’adresse où vous serez dans quatre semaines.
        </p>
        <WaButton href={WA_TFN} position="section" topic="tfn" lang="fr">Envoyer ces trois infos sur WhatsApp</WaButton>
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
          Vous n’aurez jamais à vous connecter à myGov, à lier une pièce d’identité ou à deviner quel formulaire remplir. Nous traitons directement avec l’ATO.
        </p>
        <p className={blocks.text}>
          Vous avez déjà le numéro et voulez récupérer les semaines à 45 % ?{' '}
            <Link href="/fr/tax-return" className={tb.inlineLink}>C’est le rôle de la tax return</Link>.
        </p>
        <p className={blocks.text}>
          Vous allez aussi facturer comme livreur ou freelance au lieu d’être salarié ? Il vous faudra un ABN en plus du TFN, et nous vérifions d’abord que vous en avez besoin :{' '}
          <Link href="/fr/abn" className={tb.inlineLink}>ce que l’ABN change pour un PVT</Link>. Et dès votre premier job, votre employeur verse aussi 12 % de super sur un fonds à votre nom :{' '}
          <Link href="/fr/superannuation" className={tb.inlineLink}>ce qu’elle devient quand vous quittez l’Australie</Link>.
        </p>
      </Section>

      {/* La seule bande ambre : la garantie. */}
      <Section tone="amber" title="Notre garantie" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Si votre remboursement d’impôt est inférieur à nos honoraires, nous vous remboursons la différence, après réception du Notice of Assessment. S’il n’y a aucun remboursement, ou si vous avez de l’impôt à payer, la totalité des honoraires s’applique. La garantie ne s’applique qu’aux déclarations avec revenus sous TFN.
        </p>
        <p className={blocks.text}>Nos honoraires sont forfaitaires, jamais un pourcentage de ce qui vous revient.</p>
      </Section>

      <Section tone="pale" title="L’impôt des PVT est la seule chose que nous faisons." titleId="trust-title">
        <p className={blocks.text}>
          Chaque demande de TFN que nous préparons concerne quelqu’un qui a un visa 417 ou 462. Les tax returns sont
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

      <Section eyebrow="Et ensuite" title="Les semaines à 45 % se règlent avec la tax return" titleId="next-title">
        <p className={blocks.text}>Une fois le numéro enregistré, c’est la tax return qui réclame l’excédent.</p>
        <div className={blocks.stack}>
          <LinkButton href="/fr/tax-return-australie-pvt" size="md">Comment se passe la tax return →</LinkButton>
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
