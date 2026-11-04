import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

export const metadata: Metadata = {
  title: 'Deduzioni per labour hire e magazzino',
  description: 'Cosa possono dedurre i lavoratori delle agenzie: DPI per ogni sito, rinnovo di licenze e patentini, attrezzi e spostamenti tra siti nello stesso giorno.',
  keywords: [
    'labour hire deduzioni fiscali Australia',
    'magazzino working holiday tasse',
    'agenzia di lavoro Australia tax return',
    'più datori di lavoro tax return Australia',
    'rinnovo patentino muletto deducibile',
    'spostamenti tra siti deduzione',
    'visto 417 labour hire tasse',
    'income statement più agenzie',
  ],
  alternates: {
    canonical: '/it/expenses/labouring',
    languages: {
      'en-AU': '/expenses/labouring',
      de: '/de/expenses/labouring',
      ja: '/ja/expenses/labouring',
      ...newLocaleLanguages('/expenses/labouring'),
      'x-default': '/expenses/labouring',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Deduzioni per labour hire e magazzino con un visto working holiday' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/expenses/labouring`,
    siteName: 'Working Holiday Tax',
    title: 'Deduzioni per labour hire e magazzino in Australia',
    description: 'Due agenzie sono due income statement. Due siti nello stesso giorno sono una deduzione che quasi nessuno richiede.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Deduzioni per labour hire e magazzino in Australia',
    description: 'Due agenzie sono due income statement. Due siti nello stesso giorno sono una deduzione che quasi nessuno richiede.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'expenses', lang: 'it', detail: 'Labour hire e magazzino' })

const UI = {
  ctaLabel: 'Scrivici su WhatsApp',
  ctaSub: 'Rispondiamo in circa un’ora.',
  guaranteeHeading: 'La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa. La garanzia vale solo per le dichiarazioni con reddito TFN.',
  guaranteeBody: 'Mettere insieme quattro agenzie e un turno singolo dimenticato in una sola dichiarazione è lavoro normale per noi, e ogni cliente ha un visto 417 o 462. Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.',
  faqHeading: 'Le domande più frequenti su questo tema',
  guidesHeading: 'Da leggere dopo',
  otherJobs: 'Fai un altro lavoro? Qui trovi tutti i mestieri.',
  servicesLabel: 'Altre pagine del sito',
  wrongLabel: 'Dedotto, ma non si poteva',
  missedLabel: 'Non dedotto, ma si poteva',
  disclaimer: 'Queste sono informazioni generali, non una consulenza fiscale personale. Cosa puoi dedurre dipende dai tuoi datori di lavoro, dai tuoi documenti e da come hai lavorato davvero. Quando presenti la dichiarazione con noi, esaminiamo la tua situazione voce per voce.',
  hubHref: '/it/expenses',
}

const CRUMBS = [
  { name: 'Home', item: '/it' },
  { name: 'Deduzioni', item: '/it/expenses' },
  { name: 'Labour hire', item: '/it/expenses/labouring' },
]

const HERO = {
  kicker: 'Deduzioni labour hire e magazzino',
  h1lead: 'Due agenzie sono due income statement.',
  h1accent: 'Due siti sono una deduzione.',
  lede: 'Un’agenzia dimenticata costa più di qualsiasi ricevuta mancante, e una sola dichiarazione deve portarle tutte.',
}

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: 'Cosa può dedurre chi lavora tramite un’agenzia?',
    paras: [
      'Chi lavora in labour hire può dedurre i DPI richiesti dal ruolo presso il cliente, il rinnovo di una licenza operativa che già ha, gli attrezzi comprati di tasca propria, gli spostamenti tra due siti nella stessa giornata e la quota di lavoro del telefono. Cosa si può dedurre segue il lavoro che facevi quel giorno, non il titolo sul contratto dell’agenzia.',
      'Una settimana in un magazzino frigorifero, una settimana in una squadra di giardinaggio e un weekend a smontare un evento creano tre insiemi diversi di costi.',
    ],
  },
  {
    kind: 'items',
    h2: 'Le spese che appartengono a questo lavoro',
    intro: 'Ognuna segue il ruolo presso il cliente. Chiediti cosa richiedeva il sito, non come ti ha chiamato l’agenzia.',
    items: [
      {
        t: 'Spostamenti tra due siti nello stesso giorno',
        d: 'Un magazzino la mattina e un altro sito il pomeriggio è un viaggio tra posti di lavoro, ed è deducibile. Il primo viaggio da casa resta un tragitto casa-lavoro.',
      },
      {
        t: 'DPI richiesti dal sito del cliente',
        d: 'Scarponi con punta d’acciaio, guanti, hi vis, occhiali di sicurezza, protezioni per l’udito, una manica antitaglio. Deducibili se l’oggetto ti protegge da un rischio identificabile di quel lavoro e l’hai pagato tu.',
      },
      {
        t: 'Rinnovo di un patentino del muletto, EWP o altra licenza operativa',
        d: 'Rinnovare una licenza che già hai e usi per il lavoro è deducibile. Il primo no, con lo stesso principio per cui una prima White Card resta privata.',
      },
      {
        t: 'Attrezzi e attrezzatura che hai comprato tu',
        d: 'Tutto ciò che hai comprato e non ti è stato rimborsato è deducibile: 300\u00a0$ o meno per intero nell’anno d’acquisto, più di così lungo la vita utile dell’oggetto.',
      },
      {
        t: 'Abbigliamento protettivo per il freddo e per il tempo',
        d: 'Una giacca da cella frigorifera per il lavoro in magazzini refrigerati o surgelati, abbigliamento antipioggia per il giardinaggio all’aperto. Sono abbigliamento protettivo e non convenzionale perché servono a proteggerti da una condizione in cui il lavoro ti mette.',
      },
      {
        t: 'La quota di lavoro del telefono',
        d: 'Le agenzie funzionano a messaggi: offerte di turno alle sei del mattino, indirizzi dei siti, timesheet. La percentuale di lavoro del piano è deducibile se per questo usi il tuo telefono.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: 'Cosa devi conservare tra una destinazione e l’altra?',
    paras: [
      'Una spesa, tre test: hai pagato tu, nessuno ti ha rimborsato ed è stata fatta per guadagnare il reddito che dichiari. Tra una destinazione e l’altra significa le ricevute di scarponi e guanti che hai comprato, il rinnovo della licenza e una nota di date, siti e distanze dietro gli spostamenti.',
      'Il documento può essere una ricevuta, una fattura, un estratto conto o una foto sul telefono con importo, data, fornitore e oggetto, conservato cinque anni. Spese di lavoro per 300\u00a0$ o meno in tutto l’anno non richiedono prove scritte. Questi 300\u00a0$ sono una soglia diversa da quella che decide se un attrezzo si deduce subito o lungo la sua vita.',
    ],
  },
  {
    kind: 'traps',
    h2: 'Quali errori fa chi lavora in labour hire?',
    intro: 'Le spese sbagliate sono per lo più abbigliamento e tragitto. Quelle dimenticate riguardano quasi tutte il numero di datori di lavoro, ed è lì che nel labour hire si sbaglia più spesso.',
    wrong: [
      {
        t: 'Pantaloni da lavoro e scarponi senza caratteristiche protettive',
        d: 'Pantaloni da lavoro semplici, una maglietta, scarponi normali che sono solo robusti. L’abbigliamento convenzionale è privato per quanto il lavoro sia pesante e per quanto in fretta si consumi.',
      },
      {
        t: 'Il tragitto verso un unico sito fisso',
        d: 'Se un’agenzia ti piazza nello stesso magazzino per due mesi, il tragitto è un normale spostamento casa-lavoro e non un viaggio itinerante. Ciò che rende deducibile un viaggio è spostarsi tra posti di lavoro, non il fatto che ti abbia mandato un’agenzia.',
      },
      {
        t: 'Attrezzatura data dall’agenzia',
        d: 'La maggior parte delle agenzie fornisce hi vis e a volte scarponi. Se ti è stato dato o rimborsato, non c’è nessun costo da dedurre.',
      },
      {
        t: 'Una prima licenza trattata come costo di lavoro',
        d: 'Il patentino del muletto che hai pagato perché un’agenzia ti prendesse in considerazione è il costo per diventare idoneo, non un costo del lavoro. I rinnovi, una volta piazzato, sono deducibili.',
      },
      {
        t: 'Dare per scontato che l’agenzia abbia sistemato le tue tasse',
        d: 'Un’agenzia trattiene le tasse e comunica la tua paga. Non presenta la tua dichiarazione, non richiede le tue deduzioni e non controlla se le altre due agenzie hanno i tuoi dati giusti.',
      },
    ],
    missed: [
      {
        t: 'Un income statement di un’agenzia dimenticata',
        d: 'Tre settimane con un’agenzia a marzo, un turno in un altro stato a giugno, e la dichiarazione parte senza. Peggio di una deduzione persa, perché poi vuol dire una rettifica.',
      },
      {
        t: 'Gli spostamenti tra due siti nello stesso giorno',
        d: 'Comuni quando un’agenzia sposta una squadra, e quasi mai dedotti perché il movimento l’ha deciso qualcun altro. Restano comunque viaggio deducibile tra posti di lavoro.',
      },
      {
        t: 'Scarponi e guanti che compri tu tra un incarico e l’altro',
        d: 'L’attrezzatura comprata per poter accettare il lavoro successivo si paga in fretta e non ha mai uno scontrino. Ogni oggetto sotto i 300\u00a0$ è una deduzione intera nell’anno in cui l’hai comprato.',
      },
      {
        t: 'Un rinnovo di licenze e patentini pagato in contanti',
        d: 'I rinnovi del muletto e dell’EWP costano così poco che a luglio è facile dimenticarli, e sono deducibili quando usi già la licenza al lavoro.',
      },
      {
        t: 'Settimane trattenute con l’aliquota sbagliata',
        d: 'Un’agenzia nuova che non ha ancora elaborato la tua Tax File Number Declaration, o che non è registrata correttamente presso l’ATO, può trattenere più del dovuto. Si sistema con la dichiarazione che mette insieme tutte le agenzie.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: 'Cosa dipende da come è andato il tuo anno?',
    paras: [
      'Quanto era itinerante il lavoro decide quanto viaggio è deducibile, ed è una questione di fatto, non una regola. Contano quante volte è cambiato il sito, se una base ti riportava sempre lì e se l’agenzia richiedeva lo spostamento. Due persone nella stessa agenzia possono finire con deduzioni di viaggio molto diverse.',
      'Ogni agenzia è un datore di lavoro separato, con la sua Tax File Number Declaration, il suo rapporto di trattenuta e il suo income statement. Il rischio è un’aliquota applicata male o un datore mancante nella dichiarazione.',
      'La residenza ai fini fiscali dipende dai fatti individuali del tuo anno. Il caso Addy della High Court è lo sfondo, ma il suo effetto varia da persona a persona e non è qualcosa da dare per scontato. Lo valutiamo noi caso per caso e la decisione finale spetta all’ATO.',
    ],
  },
]

const FAQS = [
  {
    question: 'Ho tre agenzie di lavoro. Cambia qualcosa per le tasse?',
    answer: 'Ogni agenzia è legalmente un datore di lavoro separato, con la sua Tax File Number Declaration, le sue trattenute e il suo income statement. Tutte vanno in un’unica dichiarazione.\n\nCome viene tassato il tuo salario dipende dai fatti individuali del tuo anno, quindi il rischio vero è lasciare fuori un’agenzia.',
  },
  {
    question: 'Posso dedurre i viaggi tra siti di lavoro diversi?',
    answer: 'Di solito sì. Il viaggio tra due luoghi di lavoro separati, un magazzino la mattina e un altro sito il pomeriggio, è deducibile in un modo in cui non lo è il tragitto da casa a un unico posto fisso.\n\nQuanto si può dedurre dipende da quanto è itinerante lo schema, quindi annota date, siti e distanze.',
  },
  {
    question: 'In cosa il labouring è diverso dal construction per le tasse?',
    answer: 'I test sono identici, gli oggetti no. Il lavoro in un cantiere edile di solito richiede una White Card e i DPI standard del cantiere. Il labour hire generico copre magazzini, traslochi, giardinaggio, linee di produzione ed eventi, dove l’attrezzatura segue il ruolo presso il cliente e spesso la White Card non serve.\n\nSe i tuoi incarichi sono nei cantieri edili, la pagina sul construction va più a fondo.',
  },
  {
    question: 'Posso dedurre il patentino del muletto?',
    answer: 'Puoi dedurre il rinnovo di uno che già hai e usi per il lavoro. Ottenere la licenza la prima volta non è deducibile, perché per l’ATO qualificarsi per il lavoro è un costo privato.\n\nUn patentino EWP, una White Card e una patente di guida seguono tutti la stessa regola.',
  },
  {
    question: 'Ho fatto solo una manciata di turni. Vale la pena dedurre qualcosa?',
    answer: 'Di solito sì, purché le cose le abbia pagate tu e non ti siano state rimborsate. Anche pochi turni possono comportare scarponi, guanti, un rinnovo di licenze e patentini o viaggi tra siti, e ogni dollaro di deduzione riduce il reddito su cui si calcolano le tasse.\n\nIl test non cambia con il numero di turni.',
  },
]

const GUIDES = [
  {
    href: itGuideHref('labour-hire-agencies-working-holiday-australia'),
    label: 'Le agenzie di labour hire e come funzionano' + itGuideSuffix('labour-hire-agencies-working-holiday-australia'),
    desc: 'Chi è davvero il tuo datore di lavoro quando ti piazza un’agenzia.',
  },
  {
    href: itGuideHref('white-card-australia-working-holiday'),
    label: 'La White Card e quanto ti costa' + itGuideSuffix('white-card-australia-working-holiday'),
    desc: 'Come ottenerla e perché la prima non è una deduzione.',
  },
  {
    href: itGuideHref('tools-equipment-under-300-instant-deduction-whv'),
    label: 'La deduzione immediata dei 300\u00a0$ per attrezzi e attrezzatura' + itGuideSuffix('tools-equipment-under-300-instant-deduction-whv'),
    desc: 'Perché ogni oggetto si valuta da solo e cosa cambia con un set.',
  },
]

const SERVICES = [
  { href: '/it/tax-return', label: 'Tax return' },
  { href: '/it/tfn', label: 'TFN' },
  { href: '/it/superannuation', label: 'Superannuation' },
]

export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'it',
        path: '/it/expenses/labouring',
        articleHeadline: 'Deduzioni per labour hire e magazzino in Australia',
        articleDescription: 'Due agenzie sono due income statement. Due siti nello stesso giorno sono una deduzione che quasi nessuno richiede.',
        inLanguage: 'it',
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
