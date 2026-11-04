import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { waUrl } from '@/lib/wa'
import { ContactView, type ContactCopy } from '@/components/wht/ContactBlocks'
import { Mark } from '@/components/wht/Type'
import { WA_NUMBER, EMAIL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contatti: scrivici su WhatsApp',
  description: 'Scrivici su WhatsApp. Di solito rispondiamo entro circa un’ora. Non servono myGov, documenti australiani o buste paga.',
  keywords: [
    'contatti Working Holiday Tax',
    'aiuto tasse backpacker Australia',
    'aiuto tax return Australia',
    'aiuto TFN Australia',
    'aiuto working holiday visto 417',
    'rimborso tasse Australia aiuto',
    'tax return Australia dall’Italia',
    'recuperare la super Australia aiuto',
    'WhatsApp tasse Australia',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/contact`,
    languages: {
      'en-AU': `${SITE_URL}/contact`,
      'de': `${SITE_URL}/de/contact`,
      'ja': `${SITE_URL}/ja/contact`,
      ...newLocaleLanguages('/contact'),
      'x-default': `${SITE_URL}/contact`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Contatti Working Holiday Tax: scrivici su WhatsApp per la tua tax return australiana' }],
    title: 'Contatti: Working Holiday Tax',
    description: 'WhatsApp è il modo più rapido per raggiungerci. Negli orari di lavoro rispondiamo di solito entro circa un’ora.',
    url: `${SITE_URL}/it/contact`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'it_IT',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Contatti: Working Holiday Tax',
    description: 'Scrivici su WhatsApp. Di solito rispondiamo entro circa un’ora.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'contact', lang: 'it' })

/** The four things that stop somebody sending the message. */
const blockers: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: 'Potete aiutarmi se ho già lasciato l’Australia?',
    a: 'Sì, e buona parte del nostro lavoro è proprio questo. La tax return di un anno già concluso si può presentare da qualsiasi posto, e la superannuation si può chiedere solo dopo che hai lasciato il paese e il visto è scaduto.\n\nUna cosa da sapere subito: l’ATO può pagare il rimborso fiscale solo su un conto bancario australiano, mentre la super può essere pagata anche all’estero. Dicci se il tuo conto è già chiuso.',
  },
  {
    q: 'Mi serve un account myGov?',
    a: 'No. Non devi mai entrare in myGov, collegare un documento australiano o capire quale modulo è quale. Ce la vediamo direttamente noi con l’ATO.\n\nSe hai già provato e la verifica dell’identità ti ha fermato, non cambia niente.',
  },
  {
    q: 'Mi servono le buste paga?',
    a: 'No, e non devi raccogliere niente prima di scriverci. Quello che i tuoi datori di lavoro hanno trattenuto e dichiarato lo vediamo tramite l’ATO, quindi se non hai più nulla, scrivici lo stesso.',
    link: { href: '/it/about', label: 'Perché partiamo dai dati dell’ATO' },
  },
  {
    q: 'È una cosa seria?',
    a: 'La tua tax return viene rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO. Le condizioni che accetteresti sono pubblicate per intero nel nostro client agreement, e le recensioni sulla nostra scheda Google sono di working holiday maker con cui abbiamo lavorato davvero.',
    link: { href: '/client-agreement', label: 'Leggi il client agreement (in inglese)' },
  },
]

const FAQS = [
  {
    question: 'Quanto ci mettete a rispondere?',
    answer: 'Negli orari di lavoro, dal lunedì al venerdì dalle 9 alle 18, di solito rispondiamo entro circa un’ora. Fuori orario ti scriviamo la mattina del giorno lavorativo successivo. Se la tua domanda richiede un controllo, te lo diciamo subito.',
  },
  {
    question: 'Fare una domanda ha un costo?',
    answer: 'Chiedere è gratis, e puoi chiedere quanto vuoi prima di decidere qualsiasi cosa. Il servizio ha una tariffa fissa, mai una percentuale del tuo rimborso, e te la confermiamo su WhatsApp prima che inizi il lavoro.',
  },
  {
    question: 'In che lingua mi rispondete?',
    answer: 'In quella in cui ci scrivi. Italiano, inglese o la lingua in cui spieghi meglio la tua situazione: ti rispondiamo nella stessa.',
  },
  {
    question: 'Devo mandare subito dei documenti?',
    answer: 'No. Manda prima la domanda e nient’altro. Ti rispondiamo e, se c’è un lavoro da fare, ti diciamo di cosa si tratta e quanto costa prima che inizi qualsiasi cosa.\n\nI documenti arrivano dopo, quando hai deciso di andare avanti, e ti diciamo quali servono e come mandarli in modo sicuro.',
  },
  {
    question: 'E se non ho nessun rimborso?',
    answer: 'La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa. La garanzia vale solo per le dichiarazioni con reddito TFN. Non tutti gli anni di Working Holiday portano a un rimborso, e se il tuo sembra improbabile preferiamo dirtelo subito piuttosto che prendere il lavoro e sperare.',
  },
  {
    question: 'Potete aiutarmi dall’Italia?',
    answer: 'Sì. Una tax return australiana, una richiesta di superannuation e qualsiasi cosa ancora aperta con l’ATO si possono gestire da un altro paese, interamente online.',
  },
]

const contactPageLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/it/contact#webpage`,
  url: `${SITE_URL}/it/contact`,
  name: 'Contatti: Working Holiday Tax',
  description: 'Scrivici su WhatsApp. Negli orari di lavoro rispondiamo di solito entro circa un’ora.',
  inLanguage: 'it',
  isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.contact-lead'] },
  // ContactPoint only: the business itself (@id /#business) is declared once,
  // in the root layout's graph, and is not re-declared here.
  mainEntity: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    telephone: `+${WA_NUMBER}`,
    email: EMAIL,
    areaServed: 'AU',
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/it` },
    { '@type': 'ListItem', position: 2, name: 'Contatti', item: `${SITE_URL}/it/contact` },
  ],
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'it',
  mainEntity: [...blockers.map(b => ({ question: b.q, answer: b.a })), ...FAQS.map(f => ({ question: f.question, answer: f.answer }))]
    .map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
}

const copy: ContactCopy = {
  lang: 'it',
  wa: WA,
  email: EMAIL,
  mailtoHref: `mailto:${EMAIL}?subject=Domanda%20fiscale%20dal%20sito`,
  homeHref: '/it',
  homeLabel: 'Home',
  crumbsLabel: 'Percorso di navigazione',
  crumbLabel: 'Contatti',
  kicker: 'Contatti',
  h1: <>Scrivici su <Mark>WhatsApp</Mark></>,
  lead: 'Leggiamo il tuo messaggio e rispondiamo, di solito entro circa un’ora negli orari di lavoro.',
  ctaHero: 'Apri WhatsApp →',
  hours: 'Dal lunedì al venerdì, dalle 9 alle 18',
  blockersEyebrow: 'Prima di chiedere',
  blockersTitle: 'Le quattro cose che tutti controllano per prime',
  blockers,
  otherEyebrow: 'Altri modi',
  otherTitle: 'Se WhatsApp non fa per te',
  otherIntro: 'Va bene anche l’email, e anche i canali social, solo che sono più lenti.',
  emailLabel: 'Email',
  hoursTitle: 'Orari di lavoro',
  faqEyebrow: 'Domande frequenti',
  faqTitle: 'Tutto il resto che ci chiedono',
  faqs: FAQS,
  closingEyebrow: 'Quando vuoi',
  closingTitle: 'Manda la domanda. Il primo passo è tutto qui.',
  closingText: 'Dove hai lavorato, più o meno quando, e se hai già lasciato l’Australia. Ci basta per dirti a che punto sei.',
  ctaFooter: 'Scrivici su WhatsApp →',
}

export default function ItalianContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <ContactView t={copy} />
    </>
  )
}
