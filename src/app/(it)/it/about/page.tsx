import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { waUrl } from '@/lib/wa'
import { AboutView, type AboutCopy } from '@/components/wht/AboutBlocks'
import { Mark } from '@/components/wht/Type'
import { blocks } from '@/components/wht/Blocks'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Chi siamo: tax return per il 417 e 462',
  description: 'Ci occupiamo solo delle tasse del Working Holiday. Ogni cliente ha un visto 417 o 462. Ecco l’anno che vediamo, dalla prima busta paga al volo di ritorno.',
  keywords: [
    'specialisti tasse working holiday',
    'aiuto tasse backpacker Australia',
    'chi è Working Holiday Tax',
    'Working Holiday Tax è affidabile',
    'recensioni Working Holiday Tax',
    'tax return Australia italiani',
    'aiuto tax return working holiday',
    'tasse Australia visto 417',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/about`,
    languages: {
      'en-AU': `${SITE_URL}/about`,
      'de': `${SITE_URL}/de/about`,
      'ja': `${SITE_URL}/ja/about`,
      ...newLocaleLanguages('/about'),
      'x-default': `${SITE_URL}/about`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Chi siamo: Working Holiday Tax, tax return per chi ha un visto 417 o 462' }],
    title: 'Chi siamo: Working Holiday Tax',
    description: 'Un solo tipo di cliente: chi è in Australia con un visto 417 o 462. L’anno che vediamo, dalla prima busta paga al volo di ritorno.',
    url: `${SITE_URL}/it/about`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'it_IT',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Chi siamo: Working Holiday Tax',
    description: 'Ci occupiamo solo delle tasse del Working Holiday. Ogni cliente ha un visto 417 o 462.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WA = waUrl({ topic: 'general', lang: 'it' })

/**
 * The story is deliberately the reader's year, not a company history. Every
 * line has to be literally true, and the only year we can describe in detail
 * is the one the visitor lived.
 */
const chapters = [
  {
    stage: 'Prima settimana',
    title: 'Il tuo piano copriva circa quindici giorni',
    body: 'Un ostello, una SIM, un conto in banca e un lavoro il prima possibile. Il tax file number era da qualche parte in quella lista. Nessuno ti ha spiegato come funziona l’anno fiscale australiano.',
  },
  {
    stage: 'Le prime buste paga',
    title: 'Il primo lavoro è iniziato prima che arrivasse il numero',
    // Blank line splits the chapter into two paragraphs at the render below.
    body: 'Senza un tax file number in archivio, il datore di lavoro deve trattenere l’aliquota massima, molto più alta del dovuto, quindi a quelle prime settimane manca una bella fetta di paga.\n\nQuei soldi non tornano indietro da soli.',
  },
  {
    stage: 'Entro Natale',
    title: 'Quattro datori di lavoro, metà a chiamata, nessuno che spiega niente',
    body: 'Un lavoro in ostello, un bar, tre settimane in un magazzino, qualcosa che hai mollato senza l’ultima busta paga. L’anno fiscale australiano finisce a giugno, non a dicembre.\n\nNon importa se hai perso le buste paga: tutto quello che i tuoi datori di lavoro hanno dichiarato lo vediamo noi tramite l’ATO.',
  },
  {
    stage: 'I famosi 88 giorni',
    title: 'Se li hai fatti, hai guidato parecchio per farli',
    body: 'Da qualche parte a ovest, o a nord, o tre ore oltre un paese di cui non avevi mai sentito parlare.\n\nL’alloggio veniva tolto dalla paga prima che la vedessi, le buste paga erano diverse da quelle della città, ed è la parte dell’anno su cui le persone si sentono meno sicure.',
  },
  {
    stage: 'Il volo di ritorno',
    title: 'Il volo è partito, ma in Australia qualcosa è rimasto aperto',
    body: 'La superannuation si può chiedere solo dopo aver lasciato l’Australia, quando il visto è scaduto, quindi la tua può trovarsi ancora in un fondo che forse non ricordi di aver scelto. Anche la tax return dell’anno appena concluso resta da sistemare, e quanto c’è da recuperare dipende dal tuo caso.',
  },
]

const faqs = [
  {
    question: 'Con chi lavorate esattamente?',
    answer: 'Con i working holiday maker e nessun altro. Ogni nostro cliente è in Australia con un visto 417 o 462, oppure lo era ed è tornato a casa. Non seguiamo residenti australiani, studenti, lavoratori con sponsor o aziende.',
  },
  {
    question: 'Potete aiutarmi se ho già lasciato l’Australia?',
    answer: 'Sì, e buona parte del nostro lavoro è proprio questo. La superannuation si può chiedere solo dopo che hai lasciato il paese e il visto è scaduto, e la tax return di un anno già concluso si può presentare da qualsiasi posto, quindi gestiamo tutto a distanza.',
  },
  {
    question: 'Mi servono le buste paga?',
    answer: 'No. Quello che i tuoi datori di lavoro hanno trattenuto e dichiarato lo vediamo tramite l’ATO, quindi lavoriamo su quei dati e non sui documenti di un lavoro che hai lasciato otto mesi fa. Se quello che ci racconti non coincide con quanto dichiarato da un datore di lavoro, ci occupiamo noi della differenza.',
  },
  {
    question: 'Cosa succede se alla fine non c’è nessun rimborso?',
    answer: 'La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa. La garanzia vale solo per le dichiarazioni con reddito TFN. Non tutti gli anni di Working Holiday portano a un rimborso, e preferiamo dirtelo subito piuttosto che prendere il lavoro e sperare.',
  },
]

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/it/about#webpage`,
  url: `${SITE_URL}/it/about`,
  name: 'Chi siamo: Working Holiday Tax',
  description: 'Ci occupiamo solo delle tasse del Working Holiday. Ogni cliente ha un visto 417 o 462.',
  inLanguage: 'it',
  mainEntity: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.about-lead'] },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'it',
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/it` },
    { '@type': 'ListItem', position: 2, name: 'Chi siamo', item: `${SITE_URL}/it/about` },
  ],
}

const copy: AboutCopy = {
  lang: 'it',
  wa: WA,
  homeHref: '/it',
  homeLabel: 'Home',
  crumbsLabel: 'Percorso di navigazione',
  crumbLabel: 'Chi siamo',
  kicker: 'Chi siamo',
  h1: (
    <>
      Un piano ce l&rsquo;avevi.<br />Delle <Mark>tasse</Mark> non ti ha parlato nessuno.
    </>
  ),
  lead: 'Le tasse del Working Holiday sono l’unica cosa di cui ci occupiamo. Se ti riconosci nell’anno qui sotto, potrebbe valere la pena far controllare la tua posizione fiscale e della super.',
  ctaHero: 'Chiedici quello che vuoi →',
  contactHref: '/it/contact',
  contactLabel: 'Altri modi per contattarci →',
  replyNote: 'Ti risponde una persona, di solito entro circa un’ora negli orari di lavoro.',
  yearEyebrow: 'L’anno',
  yearTitle: 'Che aspetto ha per noi un anno di Working Holiday?',
  yearIntro: 'Cinque cose succedono quasi a tutti con un visto 417 o 462, e quattro di queste costano soldi che a volte si possono recuperare dopo.',
  chapters,
  whyEyebrow: 'Perché esistiamo',
  whyTitle: 'Perché lavoriamo solo con i working holiday maker?',
  whyParas: [
    'Ogni nostro cliente ha un visto 417 o 462, quindi le cose che decidono il tuo rimborso non sono casi insoliti da andare a studiare. Sono quello che facciamo tutto il giorno.',
    'Un commercialista generico incontra un backpacker poche volte all’anno, a luglio, in mezzo a duecento dichiarazioni ordinarie.',
    'Le aliquote per il 417 e il 462, la residenza fiscale che va verificata sul serio e non data per scontata, l’esenzione dalla Medicare levy che dipende dal caso individuale, una richiesta di super fatta dalla propria cameretta a Bari o a Torino undici mesi dopo la partenza: per noi è ordinaria amministrazione.',
    'Inviare è facile. Il lavoro vero viene prima: ripercorrere il tuo anno, capire cosa è vero invece di cosa è più rapido da spuntare, e solo dopo presentarla.',
  ],
  guarantee: 'La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa. La garanzia vale solo per le dichiarazioni con reddito TFN.',
  guaranteeNote: 'Non tutti gli anni di Working Holiday portano a un rimborso, e se il tuo sembra improbabile te lo diciamo.',
  talkEyebrow: 'Parlare con noi',
  talkTitle: 'Come ci contatti?',
  talkP1: 'Su WhatsApp. Niente numero di ticket, niente modulo che promette risposta in cinque-sette giorni lavorativi. Puoi fare anche una sola domanda e fermarti lì.',
  talkP2: (
    <>
      Per cominciare non servono un account myGov, un documento australiano o le buste paga, che tu sia ancora in Australia o a casa da due anni. Nella{' '}
      <Link href="/it/contact" className={blocks.textLink}>pagina contatti</Link>{' '}
      trovi gli orari e cosa succede dopo. Se prima vuoi capire{' '}
      <Link href="/it/dichiarazione-redditi-australia" className={blocks.textLink}>come prepariamo la tax return</Link>, parti da lì.
    </>
  ),
  ctaSection: 'Scrivici su WhatsApp →',
  reviewsEyebrow: 'Con le loro parole',
  reviewsTitle: 'Cosa dicono i working holiday maker',
  faqEyebrow: 'Domande frequenti',
  faqTitle: 'Le domande che arrivano prima del messaggio',
  faqIntro: 'Per tutto il resto, chiedi su WhatsApp. È più veloce che leggere.',
  faqs,
  closingEyebrow: 'Quando vuoi',
  closingTitle: 'Raccontaci il tuo anno',
  closingText: 'Dove hai lavorato, più o meno quando, e se hai già lasciato l\u2019Australia. Ci basta per dirti a che punto sei.',
  ctaFooter: 'Scrivici su WhatsApp →',
}

export default function ItalianAboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutView t={copy} />
    </>
  )
}
