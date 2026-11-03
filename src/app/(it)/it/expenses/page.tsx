import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

export const metadata: Metadata = {
  title: 'Deduzioni fiscali per tipo di lavoro',
  description: 'Cosa puoi dedurre dipende dal lavoro che hai fatto. Elenchi per farm work, ristorazione, cantieri, delivery, pulizie, labour hire e FIFO.',
  keywords: [
    'deduzioni fiscali Australia working holiday',
    'spese deducibili Australia',
    'tax return Australia cosa si può dedurre',
    'ATO deductions working holiday maker',
    'spese di lavoro Australia',
    'cents per kilometre Australia',
    'visto 417 tasse deduzioni',
    'visto 462 tasse deduzioni',
  ],
  alternates: {
    canonical: '/it/expenses',
    languages: {
      'en-AU': '/expenses',
      de: '/de/expenses',
      ja: '/ja/expenses',
      ...newLocaleLanguages('/expenses'),
      'x-default': '/expenses',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Deduzioni fiscali in Australia per tipo di lavoro, con un visto working holiday' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/expenses`,
    siteName: 'Working Holiday Tax',
    title: 'Deduzioni fiscali in Australia, lavoro per lavoro',
    description: 'Chi raccoglie frutta e chi fa il rider non deduce le stesse cose. Trova il tuo lavoro e vedi cosa vale davvero.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Deduzioni fiscali in Australia, lavoro per lavoro',
    description: 'Chi raccoglie frutta e chi fa il rider non deduce le stesse cose. Trova il tuo lavoro e vedi cosa vale davvero.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'expenses', lang: 'it', detail: 'Deduzioni per il mio lavoro' })

const UI = {
  ctaLabel: 'Scrivici su WhatsApp',
  ctaSub: 'Rispondiamo in circa un’ora.',
  guaranteeHeading: 'La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa.',
  guaranteeBody: 'Ci occupiamo solo di tasse per chi ha un working holiday. Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.',
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
]

const HERO = {
  kicker: 'Visti working holiday 417 e 462',
  h1lead: 'Le deduzioni non sono una lista unica.',
  h1accent: 'Sono la tua lista.',
  lede: 'Sette mestieri, ognuno con le sue spese, i suoi documenti e le sue richieste che l’ATO respinge.',
}

/* The hub answers "why not do it myself on myGov" for deductions: the box is blank,
   it takes any figure and it does not know what trade you worked in. */
const MYGOV_UI = {
  kicker: 'Fai da te',
  h2lead: 'Su myGov c’è una sola casella per le deduzioni',
  h2accent: 'e non sa niente del tuo mestiere.',
  lede: 'Cosa ci va dentro, e cosa serve per ogni voce, va deciso prima di scrivere qualsiasi cifra.',
  colLeft: 'Su myGov',
  colRight: 'Con noi',
  close: 'Non dovrai mai entrare in myGov, collegare un ID o capire quale modulo è quale. Parliamo noi direttamente con l’ATO.',
}

const MYGOV = [
  {
    mygov: 'La casella delle deduzioni è vuota. Niente ti dice cosa può dedurre il tuo mestiere.',
    us: 'Partiamo dal lavoro che hai fatto e scorriamo la lista che gli appartiene.',
  },
  {
    mygov: 'Accetta qualsiasi cifra, anche una che non potresti documentare.',
    us: 'Ti diciamo quali spese vogliono una ricevuta, quali le copre un estratto conto e quali non reggono.',
  },
  {
    mygov: 'Nessuno ti dice che chi raccoglie frutta, un barista e un muratore non deducono le stesse cose.',
    us: 'Sette mestieri, ognuno con la sua lista e le sue regole sui documenti.',
  },
  {
    mygov: 'Affitto, cibo e spostamenti per andare al lavoro sembrano deducibili, ma non lo sono.',
    us: 'Teniamo le spese che reggono, così non c’è niente da correggere dopo.',
  },
]

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: 'Cosa può dedurre chi ha un working holiday in una tax return australiana?',
    paras: [
      'Puoi dedurre quello che hai speso per guadagnare il reddito che dichiari, purché l’abbia pagato tu e nessuno te l’abbia rimborsato. Il visto 417 o 462 non restringe la lista.',
      'Quello che cambia la lista è il lavoro. La protezione dal sole è deducibile per chi raccoglie frutta in un frutteto aperto, non per chi sta dietro un bancone.',
    ],
  },
  {
    kind: 'occupations',
    h2: 'Che lavoro hai fatto davvero?',
    intro: 'Sette pagine, ognuna su cosa deduce quel mestiere e cosa deduce per sbaglio.',
    jobs: [
      {
        href: '/it/expenses/farm-work',
        title: 'Lavoro in fattoria e raccolta della frutta',
        line: 'Protezione dal sole, attrezzatura per la raccolta e gli spostamenti tra un campo e l’altro nello stesso giorno.',
      },
      {
        href: '/it/expenses/hospitality',
        title: 'Bar, ristoranti e cucine',
        line: 'Rinnovo dell’RSA (Responsible Service of Alcohol), scarpe antiscivolo, divisa da chef e perché il completo nero non è una divisa.',
      },
      {
        href: '/it/expenses/construction',
        title: 'Edilizia e cantieri',
        line: 'La regola dei 300\u00a0$ per gli attrezzi, i DPI e la White Card, deducibile solo la seconda volta.',
      },
      {
        href: '/it/expenses/delivery-drivers',
        title: 'Consegne e rider',
        line: 'Costi di auto e bici, la quota di lavoro del telefono e la regola sulla GST che cambia se trasporti passeggeri.',
      },
      {
        href: '/it/expenses/cleaners',
        title: 'Pulizie',
        line: 'Attrezzatura e prodotti, tariffa per il lavaggio della divisa e il tragitto tra una casa e l’altra.',
      },
      {
        href: '/it/expenses/labouring',
        title: 'Labour hire e magazzini',
        line: 'Più agenzie, più income statement e gli spostamenti tra un sito e l’altro nello stesso giorno.',
      },
      {
        href: '/it/expenses/fifo',
        title: 'FIFO e lavoro nei camp',
        line: 'Rinnovo di licenze e patentini, DPI e lo Zone Tax Offset che quasi nessuno con un roster ottiene.',
      },
    ],
  },
  {
    kind: 'numbered',
    h2: 'Cosa deve essere vero perché una spesa sia deducibile?',
    intro: 'Tre test, applicati a ogni voce di ogni pagina. Se ne fallisci uno, la spesa non passa, anche se ti sembra legata al lavoro.',
    steps: [
      'L’hai pagata tu e nessun datore di lavoro o cliente te l’ha rimborsata.',
      'La spesa serve a guadagnare il tuo reddito, non a metterti nella condizione di poterlo guadagnare, e non è privata o domestica.',
      'Hai un documento che mostra cosa hai comprato, quando, da chi e per quanto.',
    ],
    note: 'Il secondo test è quello che fa più danni. Per questo la tua prima White Card non è deducibile, ma il rinnovo sì.',
  },
  {
    kind: 'answer',
    h2: 'Cosa devi poter mostrare?',
    paras: [
      'Una ricevuta, una fattura o un estratto conto con importo, data, fornitore e cosa hai comprato. Va bene anche una foto sul telefono, e devi poterla esibire per cinque anni.',
      'Se le spese di lavoro dell’anno non superano 300\u00a0$ in totale, non servono documenti scritti. Questa agevolazione è un’altra cosa rispetto alla regola dei 300\u00a0$ per i singoli beni, che riguarda come si deduce un oggetto.',
    ],
  },
  {
    kind: 'note',
    label: 'Cambia dal 2026-27',
    title: '1.000 $ fissi, oppure i costi reali. Non entrambi.',
    body: 'Dall’anno fiscale 2026-27 l’ATO prevede una deduzione standard di 1.000\u00a0$ per le spese di lavoro, senza ricevute, per chi rientra nella misura. Le spese che richiedi la riducono, quindi i due importi non si sommano.\n\nVale per la prima volta nella tax return 2026-27, presentata da luglio 2027. La tax return 2025-26, quella che la maggior parte delle persone presenta adesso, segue ancora le vecchie regole.',
  },
  {
    kind: 'tables',
    h2: 'Come si calcolano le spese per l’auto?',
    intro: 'Due metodi, uno per auto all’anno. In entrambi conta solo la guida per lavoro, mai il normale tragitto da casa a un unico posto di lavoro fisso.',
    tables: [
      {
        label: 'Centesimi per chilometro (cents per kilometre)',
        rows: [
          ['Tariffa 2024-25 e 2025-26', '88 centesimi al km'],
          ['Tariffa dal 2026-27', '91 centesimi al km'],
          ['Massimo', '5.000 km per auto all’anno'],
          ['Ricevute', 'Non servono, ma devi mostrare come hai calcolato i chilometri'],
        ],
      },
      {
        label: 'Registro dei viaggi (logbook)',
        rows: [
          ['Come funziona', 'Deduci la percentuale di lavoro di ogni costo reale di gestione'],
          ['Periodo del logbook', '12 settimane consecutive, valido cinque anni'],
          ['Massimo', 'Nessun tetto. Segue la tua percentuale reale di uso per lavoro'],
          ['Ricevute', 'Servono per ogni spesa dedotta'],
        ],
      },
    ],
    note: 'Oltre i 5.000 km di lavoro all’anno il logbook di solito dà la deduzione più alta, perché include carburante, assicurazione, tassa di immatricolazione (rego), tagliandi, ammortamento e interessi del prestito.',
  },
  {
    kind: 'traps',
    h2: 'Quali sono gli errori più comuni, qualunque lavoro tu abbia fatto?',
    intro: 'La prima lista trasforma un rimborso in una rettifica dell’ATO. La seconda, i soldi che nessuno chiede, è più frequente e costa di più.',
    wrong: [
      {
        t: 'Abiti semplici che il dress code richiede',
        d: 'Pantaloni neri, una polo senza logo, scarpe normali, jeans. Un abito convenzionale non diventa una divisa solo perché lo impone il capo.',
      },
      {
        t: 'La prima licenza, il primo patentino o certificato',
        d: 'Una prima White Card, un primo RSA, un primo patentino per il muletto. Quel costo ti ha reso idoneo al lavoro, non fa parte del lavoro. I rinnovi, quando lavori già, sono deducibili.',
      },
      {
        t: 'Il tragitto da casa al lavoro',
        d: 'Il normale tragitto è un viaggio privato, per quanto sia lungo e per quanto presto cominci il turno. Il viaggio tra due posti di lavoro nello stesso giorno di solito si può dedurre.',
      },
      {
        t: 'Tutto ciò che ti è stato rimborsato',
        d: 'Se un datore di lavoro, un’agenzia o una piattaforma ti ha rimborsato o ti ha dato l’oggetto, non c’è nessun costo tuo da dedurre.',
      },
      {
        t: 'Le multe',
        d: 'Le multe per sosta o velocità non sono mai deducibili, qualunque cosa stessi facendo quando le hai prese.',
      },
    ],
    missed: [
      {
        t: 'Ogni oggetto sotto i 300\u00a0$, dedotto per intero',
        d: 'Scarponi, guanti, un cappello, una torcia frontale, un supporto per il telefono. Ogni oggetto si valuta da solo, quindi un anno di piccoli acquisti fa somma. Quasi tutti buttano gli scontrini.',
      },
      {
        t: 'Oggetti sopra i 300\u00a0$, che restano deducibili',
        d: 'Superare i 300\u00a0$ non toglie la deduzione, ne cambia i tempi. Il costo si deduce lungo la vita utile dell’oggetto invece che tutto subito. Molti sentono «sopra 300\u00a0$» e smettono di leggere.',
      },
      {
        t: 'Lavare gli indumenti da lavoro obbligatori o protettivi',
        d: 'L’ATO ammette 1\u00a0$ a lavaggio per i soli indumenti da lavoro, o 50 centesimi a lavaggio se li lavi insieme al resto. Oltre 150\u00a0$ di lavaggi nell’anno serve un diario, non una stima.',
      },
      {
        t: 'Gli spostamenti tra due lavori nello stesso giorno',
        d: 'Due fattorie, due case, due magazzini, due locali. Quel tratto è viaggio di lavoro, non tragitto casa-lavoro, e per chi lavora su più siti è spesso la deduzione più grossa della dichiarazione.',
      },
      {
        t: 'Le settimane tassate al 45% prima che arrivasse il TFN',
        d: 'Non è una deduzione, ma incide sullo stesso risultato. Se un datore ha trattenuto l’aliquota più alta mentre la tua Tax File Number Declaration era in un cassetto, la differenza si sistema con la tax return, non da sola.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: 'Dove dipende dalla tua situazione?',
    paras: [
      'Se i tuoi spostamenti contano come lavoro itinerante o come tragitto casa-lavoro dipende da come era organizzata la tua settimana: quante volte è cambiato il sito, se avevi una base sola e se il datore di lavoro richiedeva lo spostamento.',
      'L’altra questione è la residenza ai fini fiscali. Dipende dai fatti individuali del tuo anno e la decisione finale spetta all’ATO. Il caso Addy della High Court ne è lo sfondo, ma il suo effetto varia da persona a persona e non è qualcosa da dare per scontato. Lo valutiamo noi dopo aver esaminato il tuo anno.',
    ],
  },
]

const FAQS = [
  {
    question: 'Posso inserire le deduzioni senza aiuto?',
    answer: 'Dipende dal tuo anno. Presentare la dichiarazione è davvero la parte facile, ma la casella delle deduzioni è vuota e accetta qualsiasi cifra scrivi.\n\nStabilire quali costi servivano a guadagnare il tuo reddito, e cosa c’è dietro ognuno, è una valutazione sull’anno che hai avuto, non un campo da compilare.',
  },
  {
    question: 'Chi ha un working holiday ha meno deduzioni degli australiani?',
    answer: 'No. Le regole sulle deduzioni sono le stesse per chi ha un visto 417 o 462 e per chiunque altro guadagni un reddito australiano.\n\nLa differenza sta sul lato del reddito: come viene tassato dipende dai fatti individuali del tuo anno ed è l’ATO a deciderlo.',
  },
  {
    question: 'Ho fatto quattro lavori diversi in un anno. Devo fare quattro liste?',
    answer: 'Presenti una sola dichiarazione per l’anno fiscale e porta tutte le deduzioni di tutti i lavori. Conta che ogni spesa sia legata al lavoro che facevi in quel momento.\n\nGli scarponi comprati per un magazzino a settembre e la crema solare comprata per una fattoria a gennaio stanno nella stessa dichiarazione. Datori di lavoro diversi non dividono niente.',
  },
  {
    question: 'E se ho perso le ricevute?',
    answer: 'Un estratto conto della banca o della carta con importo, data e fornitore di solito basta quando la ricevuta non c’è più.\n\nSotto i 300\u00a0$ di spese in tutto l’anno non serve nessun documento scritto, solo una base solida per la cifra. Quello che non puoi fare è inventare un numero e sperare.',
  },
  {
    question: 'Posso dedurre affitto, cibo o spostamenti mentre ero in Australia?',
    answer: 'No. Alloggio, spesa e costi per muoverti sono spese private di vita, anche se hai cambiato zona per un lavoro in una cittadina di campagna.\n\nL’eccezione stretta è il viaggio che il datore di lavoro richiede e che ti tiene lontano da casa per la notte, che segue un’altra regola e altri documenti.',
  },
  {
    question: 'Vale la pena dedurre le spese se ho lavorato solo pochi mesi?',
    answer: 'Di solito sì. Anche un periodo breve ha costi reali, e ogni dollaro di deduzione riduce il reddito su cui si calcolano le tasse.\n\nIl guadagno più grosso in un anno corto spesso non sono le deduzioni, ma le settimane tassate al 45% prima che il tuo tax file number arrivasse al datore di lavoro, e il fatto che la tua situazione fiscale sia stata valutata correttamente.',
  },
]

const GUIDES = [
  {
    href: itGuideHref('tax-deductions-working-holiday-makers'),
    label: 'Le deduzioni per i working holiday maker: la lista completa' + itGuideSuffix('tax-deductions-working-holiday-makers'),
    desc: 'Ogni categoria, con ciò che l’ATO respinge e perché.',
  },
  {
    href: itGuideHref('tools-equipment-under-300-instant-deduction-whv'),
    label: 'La deduzione immediata dei 300\u00a0$ per attrezzi e attrezzatura' + itGuideSuffix('tools-equipment-under-300-instant-deduction-whv'),
    desc: 'Perché ogni oggetto si valuta da solo e cosa cambia con un set.',
  },
  {
    href: itGuideHref('1000-dollar-instant-deduction-rule-2026'),
    label: 'La deduzione standard da 1.000\u00a0$ dal 2026-27' + itGuideSuffix('1000-dollar-instant-deduction-rule-2026'),
    desc: 'Una cifra fissa senza ricevute, oppure i costi reali. Una sola delle due.',
  },
]

const SERVICES = [
  { href: '/it/tax-return', label: 'Tax return' },
  { href: '/it/tfn', label: 'TFN' },
  { href: itGuideHref('tax-residency-working-holiday-makers'), label: 'Residenza fiscale' + itGuideSuffix('tax-residency-working-holiday-makers') },
]

export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'it',
        path: '/it/expenses',
        articleHeadline: 'Deduzioni fiscali in Australia, lavoro per lavoro',
        articleDescription: 'Chi raccoglie frutta e chi fa il rider non deduce le stesse cose. Trova il tuo lavoro e vedi cosa vale davvero.',
        inLanguage: 'it',
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
        mygov: { ui: MYGOV_UI, rows: MYGOV },
        hubLink: false,
        heroSlot: { id: 'IMG-W30', subject: 'Seven working holiday jobs in one frame: fruit picking, kitchen, building site, delivery bike, cleaning, warehouse, camp', alt: 'Backpacker con un working holiday al lavoro in Australia' },
      }}
    />
  )
}
