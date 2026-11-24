import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Mark } from '@/components/wht/Type'
import { blocks } from '@/components/wht/Blocks'
import { WaButton } from '@/components/wht/WaButton'
import { LIVE_FR_GUIDES } from '../_blog-links'
import {
  LeavingAustraliaPage, LinkList, SRC, StepList, StepTable, leavingLanguages, makeGuides,
} from '@/app/(site)/leaving-australia/LeavingAustraliaPage'

/*
 * Hub FR : quitter l’Australie (plan 3, tour 2, 24 nov. 2026). Mêmes faits que
 * /leaving-australia (r16, r13, r14, r20), vouvoiement. La tax return pointe vers
 * la page phare /fr/tax-return-australie-pvt ; un guide n’est lié en français que
 * s’il existe en français.
 */

const WA = waUrl({ topic: 'tax-return', lang: 'fr', detail: 'je quitte l’Australie' })
const G = makeGuides('/fr', s => LIVE_FR_GUIDES.has(s), ' (en anglais)')
const TAX_RETURN = '/fr/tax-return-australie-pvt'

export const metadata: Metadata = {
  title: { absolute: 'Quitter l’Australie après un PVT : impôts et super (2026)' },
  description:
    'Vous quittez l’Australie après un PVT ? Ce qu’il faut faire avant le départ et après : tax return, super (DASP), compte bancaire et myGov, dans le bon ordre.',
  keywords: [
    'quitter l’Australie PVT impôts',
    'départ Australie PVT démarches',
    'tax return après départ Australie',
    'tax return avant de quitter l’Australie',
    'récupérer sa super après le départ',
    'DASP après le départ',
    'fermer compte bancaire australien',
    'fin de PVT Australie checklist',
  ],
  alternates: {
    canonical: `${SITE_URL}/fr/leaving-australia`,
    languages: leavingLanguages(),
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-super.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'fr_FR',
    url: `${SITE_URL}/fr/leaving-australia`,
    siteName: 'Working Holiday Tax',
    title: 'Quitter l’Australie : tax return et super, dans l’ordre',
    description: 'Ce qu’il faut faire avant le départ, ce qui reste ouvert après, et dans quel ordre.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-super.png`],
    card: 'summary_large_image',
    title: 'Quitter l’Australie : impôts et super',
    description: 'Avant le départ, après le départ, et ce qui peut attendre.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const src = (href: string, text: string) => (
  <a href={href} target="_blank" rel="noopener" className={blocks.textLink}>{text}</a>
)

const faqs = [
  {
    question: 'Peut-on faire sa tax return avant de quitter l’Australie ?',
    answer:
      'Dans un seul cas. Si vous quittez l’Australie définitivement et n’aurez plus de revenu australien en dehors d’intérêts, de dividendes ou de redevances, l’ATO accepte la déclaration avant la fin de l’année fiscale, le 30 juin. Déposée par vous-même, elle se fait sur formulaire papier, et l’ATO annonce 50 jours ouvrables de traitement.\n\nTous les autres déposent à partir du 1er juillet, d’où qu’ils soient. Attendre ne fait rien perdre.',
  },
  {
    question: 'Peut-on faire sa tax return après avoir quitté l’Australie ?',
    answer:
      'Oui. Une tax return couvre la période du 1er juillet au 30 juin et se dépose à partir du 1er juillet, depuis n’importe quel pays. Si vous la déposez vous-même, l’échéance est le 31 octobre, et l’ATO indique que la plupart des déclarations en ligne sont traitées en 10 jours ouvrables. Le remboursement éventuel est versé sur un compte bancaire australien.',
  },
  {
    question: 'Faut-il fermer son compte australien avant de partir ?',
    answer:
      'Non, pas avant que le remboursement et la super soient arrivés. L’ATO ne verse les remboursements d’impôt que sur un compte bancaire australien, et la super qu’elle détient que sur un compte australien à votre nom ou par chèque.\n\nSi le compte est déjà fermé, le virement revient à l’ATO par la Reserve Bank, ce qui peut prendre jusqu’à 10 jours. Avec de nouvelles coordonnées australiennes, l’ATO paie à nouveau ; sans elles, elle réémet le remboursement par chèque, et elle retient certains chèques jusqu’à 90 jours le temps de demander des coordonnées bancaires.',
  },
  {
    question: 'Quand peut-on réclamer sa super après le départ ?',
    answer:
      'Quand trois conditions sont réunies en même temps : votre visa a pris fin, par expiration ou annulation, vous avez quitté l’Australie, et vous n’avez aucun autre visa australien actif. La demande de DASP en ligne de l’ATO peut être commencée avant le départ, mais envoyée seulement après. L’ATO indique qu’un DASP est en général versé dans les 28 jours suivant la réception d’une demande complète.',
  },
  {
    question: 'Que devient la super qu’on ne réclame pas ?',
    answer:
      'Elle n’est pas perdue. Six mois ou plus après votre départ, visa terminé, votre fund transfère le solde à l’ATO. Vous pouvez la réclamer à l’ATO à tout moment par DASP, mais l’ATO ne la verse que sur un compte australien à votre nom ou par chèque, pas par virement international.',
  },
  {
    question: 'A-t-on besoin de myGov après le départ ?',
    answer:
      'Pas avec nous. Nous traitons directement avec l’ATO, vous n’avez donc pas besoin de myGov pour que nous préparions votre tax return. La demande de DASP en ligne de l’ATO ne passe pas non plus par myGov. myGov ne sert que si vous déposez vous-même sur myTax, et ses codes SMS ne partent que vers un numéro australien.',
  },
  {
    question: 'La super et le remboursement d’impôt, est-ce la même chose ?',
    answer:
      'Non, ce sont deux paiements distincts. Le remboursement d’impôt est l’impôt retenu en trop sur votre salaire, versé par l’ATO après le dépôt de la tax return. Le DASP est la super que vos employeurs ont versée en plus de votre salaire, libérée par chaque fund une fois votre visa terminé. Beaucoup de PVT ont les deux à récupérer.',
  },
  {
    question: 'Le remboursement d’impôt peut-il arriver sur un compte français ?',
    answer:
      'Non. L’ATO ne verse les remboursements d’impôt que sur un compte bancaire australien. La super, c’est différent : un fund peut payer le DASP par virement international s’il le propose. La super déjà détenue par l’ATO, elle, ne part que sur un compte australien ou par chèque.',
  },
  {
    question: 'Je suis parti il y a des années sans déclarer. Est-il trop tard ?',
    answer:
      'Non. Une tax return en retard peut toujours être déposée, et la super restée en Australie se réclame toujours auprès de l’ATO. L’ATO peut appliquer une pénalité de retard, mais elle indique ne généralement pas le faire pour un retard isolé.',
  },
]

const MYGOV_GUIDES = G.list([
  { slug: 'mygov-problems-tax-return-super', label: 'myGov ne marche plus : impôts et super' },
  { slug: 'mygov-sms-code-not-received-overseas', label: 'Code SMS myGov introuvable à l’étranger' },
  { slug: 'mygov-account-locked-out', label: 'Compte myGov bloqué' },
  { slug: 'cant-link-ato-to-mygov', label: 'Impossible de lier l’ATO à myGov' },
  { slug: 'myid-foreign-passport-working-holiday', label: 'myID avec un passeport étranger' },
  { slug: 'tax-return-without-mygov', label: 'Faire sa tax return sans myGov' },
  { slug: 'claim-super-without-mygov', label: 'Réclamer sa super sans myGov' },
])

const GUIDES = G.list([
  { slug: 'tax-obligations-after-leaving-australia', label: 'Ce qui reste à faire après le départ' },
  { slug: 'early-tax-return-leaving-australia', label: 'Déposer sa tax return avant de partir' },
  { slug: 'how-to-lodge-tax-return-from-overseas', label: 'Déposer sa tax return depuis l’étranger' },
  { slug: 'how-to-update-address-with-ato', label: 'Changer son adresse auprès de l’ATO' },
  { slug: 'tax-refund-closed-australian-bank-account', label: 'Remboursement avec un compte australien fermé' },
  { slug: 'tax-and-super-timeline-working-holiday', label: 'Impôts et super : le calendrier 2026-27' },
  { slug: 'how-long-does-dasp-take', label: 'Combien de temps prend un DASP' },
  { slug: 'what-happens-to-unclaimed-super', label: 'Ce que devient la super non réclamée' },
])

export default function LeavingAustraliaFrPage() {
  return (
    <LeavingAustraliaPage
      lang="fr"
      inLanguage="fr-FR"
      path="/fr/leaving-australia"
      homeHref="/fr"
      crumb={{ home: 'Accueil', current: 'Quitter l’Australie', label: 'Fil d’Ariane' }}
      wa={WA}
      name="Quitter l’Australie : tax return et super, dans l’ordre"
      hero={{
        eyebrow: <>Départ &middot; Tax return &middot; Super</>,
        title: <>Quitter l’Australie : <Mark>tax return et super</Mark>, dans l’ordre</>,
        lead: <>Avant de quitter l’Australie, gardez votre compte bancaire australien, mettez à jour votre adresse auprès de l’ATO et commencez votre demande de super. Après le départ, déposez votre tax return une fois l’année fiscale terminée le 30 juin, et envoyez votre demande de super (DASP) une fois votre visa terminé. Avec nous, ni l’un ni l’autre ne demande myGov, et rien n’est perdu si vous êtes déjà parti.</>,
        sub: <>La tax return et la super sont deux demandes séparées, avec deux calendriers. Le remboursement d’impôt vient de l’ATO et n’est versé que sur un compte australien. La super vient de chaque fund, en général dans les 28 jours suivant une demande complète, et un fund qui propose le virement international peut la verser sur votre compte en France.</>,
        cta: 'Posez-nous la question avant de partir',
        hint: 'Voir l’ordre des étapes',
        hintHref: '#order',
        note: 'Réponse en général dans l’heure.',
      }}
      sections={[
        {
          id: 'before-you-fly',
          title: 'Que faire avant de quitter l’Australie ?',
          tone: 'pale',
          body: (
            <>
              <p className={blocks.text}>Six choses, la plupart en quelques minutes, et toutes plus simples tant que vous êtes encore en Australie.</p>
              <StepList items={[
                {
                  title: 'Gardez votre compte bancaire australien.',
                  body: <>L’ATO ne verse les remboursements d’impôt que sur un compte australien, et la super qu’elle détient que sur un compte australien à votre nom ou par chèque. Fermez-le quand tout est arrivé. Déjà fermé ? Voir {G.link('tax-refund-closed-australian-bank-account', 'remboursement avec un compte fermé')}.</>,
                },
                {
                  title: 'Gardez vos dernières fiches de paie et la liste de vos jobs.',
                  body: <>Chaque employeur qui vous a payé par la paie déclare vos revenus à l’ATO, donc des fiches de paie perdues ne sont pas un drame. Mais une liste de vos jobs, avec les dates approximatives, permet de repérer tout de suite un emploi manquant et de retrouver chaque fund de super.</>,
                },
                {
                  title: 'Mettez à jour votre adresse auprès de l’ATO.',
                  body: <>Les courriers, dont le Notice of Assessment et un éventuel chèque, partent à l’adresse que l’ATO a enregistrée. Comment faire : {G.link('how-to-update-address-with-ato', 'changer son adresse auprès de l’ATO')}. Si nous préparons votre tax return, nous mettons votre adresse à jour auprès de l’ATO.</>,
                },
                {
                  title: 'Vérifiez si une déclaration anticipée vous concerne.',
                  body: <>L’ATO n’accepte une déclaration avant le 30 juin que si vous partez définitivement et n’aurez plus de revenu australien en dehors d’intérêts, de dividendes ou de redevances. Déposée par vous-même, elle passe par le formulaire papier, et l’ATO annonce 50 jours ouvrables de traitement. Les autres déposent à partir du 1er juillet. Plus de détails : {G.link('early-tax-return-leaving-australia', 'déposer sa tax return avant de partir')}.</>,
                },
                {
                  title: 'Commencez votre demande de super.',
                  body: <>La demande de DASP en ligne de l’ATO peut être commencée et enregistrée avant le départ, puis envoyée une fois l’Australie quittée et le visa terminé. Si un fund détient 5 000 $ ou plus, il peut demander des copies certifiées de vos pièces d’identité, plus faciles à obtenir sur place que depuis la France.</>,
                },
                {
                  title: 'Prévoyez la connexion depuis l’étranger, si vous voulez utiliser myGov vous-même.',
                  body: <>myGov n’envoie ses codes SMS qu’à un numéro de mobile australien. À l’étranger ou sans numéro australien, l’ATO recommande myID, une passkey ou une application d’authentification. Avec nous, rien de tout cela n’est nécessaire.</>,
                },
              ]} />
              <p className={blocks.small}>
                Sources : ATO, {src(SRC.earlyLodge, 'déposer avant de quitter l’Australie')}, {src(SRC.fromOverseas, 'déposer depuis l’étranger')}, {src(SRC.dasp, 'DASP')} et {src(SRC.mygov, 'créer un compte myGov et le lier à l’ATO')}, vérifié en novembre 2026.
              </p>
            </>
          ),
        },
        {
          id: 'after-you-leave',
          title: 'Que reste-t-il à faire après le départ ?',
          body: (
            <>
              <p className={blocks.text}>Trois choses : la tax return de l’année de votre départ, votre super, et la super non réclamée au bout de six mois. Tout se fait depuis la France.</p>
              <h3 className={blocks.cardTitle}>La tax return, après le 30 juin</h3>
              <p className={blocks.text}>
                L’année fiscale australienne se termine le 30 juin. À partir du 1er juillet, vous pouvez déposer depuis n’importe quel pays, et si vous le faites vous-même, l’échéance est le 31 octobre. L’ATO indique que la plupart des déclarations en ligne sont traitées en 10 jours ouvrables, et le remboursement éventuel arrive sur votre compte australien. Une déclaration est obligatoire si vous avez eu d’autres revenus que des salaires en tant que working holiday maker, si votre revenu imposable a atteint 45 001 $ ou plus, ou si vous voulez déduire des frais. Comment ça se passe depuis l’étranger :{' '}
                <Link href={TAX_RETURN} className={blocks.textLink}>votre tax return de PVT</Link> et {G.link('how-to-lodge-tax-return-from-overseas', 'déposer depuis l’étranger')}.
              </p>
              <h3 className={blocks.cardTitle}>La super (DASP), une fois le visa terminé</h3>
              <p className={blocks.text}>
                Vous pouvez la réclamer une fois votre visa expiré ou annulé, l’Australie quittée, et sans autre visa australien actif. Chaque fund est une demande séparée, en général payée dans les 28 jours suivant une demande complète, et pour un PVT 65 % de la part imposable sont retenus. Pour les salaires versés à partir du 1er juillet 2026, l’employeur doit faire arriver la dernière cotisation au fund dans les 7 jours ouvrables suivant la paie, sauf exceptions : vérifiez qu’elle apparaît avant d’envoyer la demande. Étape par étape :{' '}
                <Link href="/fr/superannuation" className={blocks.textLink}>récupérer sa superannuation</Link>.
              </p>
              <h3 className={blocks.cardTitle}>La super passée à l’ATO, après 6 mois</h3>
              <p className={blocks.text}>
                Sans demande de votre part, six mois ou plus après votre départ et visa terminé, votre fund transfère le solde à l’ATO. Il se réclame toujours par DASP, à tout moment, mais l’ATO ne le verse que sur un compte australien à votre nom ou par chèque. Plus de détails : {G.link('what-happens-to-unclaimed-super', 'ce que devient la super non réclamée')}.
              </p>
              <p className={blocks.small}>
                Sources : ATO, {src(SRC.progress, 'suivre sa tax return')}, {src(SRC.dasp, 'DASP')}, {src(SRC.atoHeld, 'super détenue par l’ATO')} et {src(SRC.paydaySuper, 'Payday Super')}, vérifié en novembre 2026.
              </p>
            </>
          ),
        },
        {
          id: 'order',
          title: 'Dans quel ordre faire les choses ?',
          tone: 'pale',
          body: (
            <>
              <p className={blocks.text}>La super d’abord, parce qu’elle se prépare avant le départ ; la tax return quand l’année est terminée ; le compte bancaire en dernier.</p>
              <StepTable
                head={['Quand', 'Quoi faire']}
                rows={[
                  { when: 'Avant votre dernier jour de travail', what: 'Lister tous vos jobs et garder vos dernières fiches de paie.' },
                  { when: 'Avant le départ', what: 'Mettre à jour votre adresse auprès de l’ATO, garder votre compte australien, commencer et enregistrer la demande de DASP, faire certifier vos pièces si un fund détient 5 000 $ ou plus.' },
                  { when: 'Dans les 7 jours ouvrables après la dernière paie', what: 'La dernière cotisation de super doit arriver au fund (Payday Super, salaires à partir du 1er juillet 2026, sauf exceptions).' },
                  { when: 'Une fois parti, visa terminé', what: 'Envoyer la demande de DASP ; chaque fund paie sa part séparément. Versement en général dans les 28 jours suivant une demande complète.' },
                  { when: 'À partir du 1er juillet', what: 'Déposer la tax return de l’année du départ. Échéance le 31 octobre si vous la déposez vous-même.' },
                  { when: 'Après un dépôt en ligne', what: 'Selon l’ATO, la plupart des déclarations en ligne sont traitées en 10 jours ouvrables. Le remboursement arrive sur votre compte australien.' },
                  { when: '6 mois ou plus après le départ, visa terminé', what: 'La super non réclamée part à l’ATO. Toujours réclamable, versée seulement sur un compte australien ou par chèque.' },
                  { when: 'Quand tout est arrivé', what: 'Fermer votre compte bancaire australien.' },
                ]}
                caption={<>Départ définitif avant le 30 juin, sans autre revenu australien ? La déclaration peut aussi partir en avance sur papier (50 jours ouvrables selon l’ATO). Toutes les dates de l’année : {G.link('tax-and-super-timeline-working-holiday', 'le calendrier impôts et super')}.</>}
              />
            </>
          ),
        },
        {
          id: 'no-mygov',
          title: 'A-t-on besoin de myGov après le départ ?',
          body: (
            <>
              <p className={blocks.text}>
                Non. Pour votre tax return avec nous, myGov n’est pas nécessaire : nous traitons directement avec l’ATO. La demande de DASP en ligne de l’ATO ne passe pas non plus par myGov : elle demande vos données personnelles, votre passeport et une adresse e-mail, et votre TFN est facultatif.
              </p>
              <p className={blocks.text}>
                myGov ne compte que si vous voulez déposer vous-même sur myTax, et la plupart des blocages commencent par le code SMS, envoyé seulement à un numéro australien. Si vous êtes déjà bloqué, chaque cas a son guide :
              </p>
              <LinkList items={MYGOV_GUIDES} />
            </>
          ),
        },
        {
          id: 'with-us',
          title: 'Comment nous pouvons vous aider',
          tone: 'amber',
          body: (
            <>
              <p className={blocks.text}>
                Dites-nous où vous avez travaillé et quand vous partez. Nous préparons votre{' '}
                <Link href={TAX_RETURN} className={blocks.textLink}>tax return</Link> une fois l’année terminée, nous mettons votre adresse à jour auprès de l’ATO, et pour votre{' '}
                <Link href="/fr/superannuation" className={blocks.textLink}>super</Link>, nous retrouvons chaque fund lié à votre tax file number et vérifions la demande avec vous.
              </p>
              <p className={blocks.text}>
                Pas besoin de myGov. Nous traitons directement avec l’ATO. Votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d’être déposée auprès de l’ATO. Working Holiday Tax opère sous la supervision d’un agent fiscal enregistré.
              </p>
              <div className={blocks.stack}>
                <WaButton href={WA} position="section" topic="tax-return" lang="fr" size="md">Écrivez-nous sur WhatsApp</WaButton>
                <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Réponse en général dans l’heure.</p>
              </div>
            </>
          ),
        },
      ]}
      faqTitle="Les questions avant et après le départ"
      faqs={faqs}
      guidesTitle="Approfondir une étape"
      guides={GUIDES}
      cta={{
        title: 'Posez-nous la question avant de partir',
        text: 'Dites-nous où vous avez travaillé et la date de votre départ. Nous vous disons ce qui doit être fait maintenant et ce qui peut attendre votre retour.',
        button: 'Écrivez-nous sur WhatsApp',
        note: 'Réponse en général dans l’heure.',
      }}
    />
  )
}
