import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

export const metadata: Metadata = {
  title: 'Deduzioni per rider e delivery',
  description: 'Cosa possono dedurre i rider di Uber Eats, DoorDash, Menulog e Amazon Flex: costi di auto e bici, quota di lavoro del telefono e attrezzatura.',
  keywords: [
    'delivery driver deduzioni fiscali Australia',
    'Uber Eats tasse Australia',
    'DoorDash rider tax return',
    'ABN rider working holiday',
    'cents per kilometre logbook',
    'GST delivery Australia',
    'bici e scooter deduzioni Australia',
    'visto 417 Uber Eats tasse',
  ],
  alternates: {
    canonical: '/it/expenses/delivery-drivers',
    languages: {
      'en-AU': '/expenses/delivery-drivers',
      de: '/de/expenses/delivery-drivers',
      ja: '/ja/expenses/delivery-drivers',
      ...newLocaleLanguages('/expenses/delivery-drivers'),
      'x-default': '/expenses/delivery-drivers',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Deduzioni per rider e consegne con un visto working holiday' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/expenses/delivery-drivers`,
    siteName: 'Working Holiday Tax',
    title: 'Deduzioni per rider in Australia: auto, telefono, GST',
    description: 'I tuoi chilometri e la quota di lavoro del telefono sono ciò che conta davvero. Multe e tratti privati non lo sono mai stati.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Deduzioni per rider in Australia: auto, telefono, GST',
    description: 'I tuoi chilometri e la quota di lavoro del telefono sono ciò che conta davvero. Multe e tratti privati non lo sono mai stati.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'expenses', lang: 'it', detail: 'Delivery e rideshare' })

const UI = {
  ctaLabel: 'Scrivici su WhatsApp',
  ctaSub: 'Rispondiamo in circa un’ora.',
  guaranteeHeading: 'La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa. La garanzia vale solo per le dichiarazioni con reddito TFN.',
  guaranteeBody: 'I rider delle piattaforme con visto 417 e 462 sono una buona parte del nostro lavoro, ed è per questo che la scelta del logbook e la questione GST si chiariscono prima di scrivere la dichiarazione. Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.',
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
  { name: 'Delivery', item: '/it/expenses/delivery-drivers' },
]

const HERO = {
  kicker: 'Deduzioni per rider: Uber Eats, DoorDash, Menulog',
  h1lead: 'I tuoi chilometri sono la deduzione.',
  h1accent: 'Quasi tutto il resto è poco.',
  lede: 'Centesimi per chilometro o logbook, uno per auto all’anno. Scegliere quello sbagliato è l’errore più costoso del mestiere.',
}

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: 'Cosa può dedurre chi fa il rider o il corriere?',
    paras: [
      'Un rider può dedurre la parte di lavoro dei costi di auto, bici o scooter, la quota di lavoro di telefono e piano dati, il parcheggio pagato mentre lavora, la pulizia per tenere il veicolo adatto a trasportare cibo e l’attrezzatura comprata per il lavoro come una borsa termica, un supporto per il telefono, un casco o un gilet hi vis. La parte privata di tutto è esclusa.',
      'Quasi tutto il valore sta nel veicolo. Chi fa ore costanti accumula chilometri che nessun altro lavoro da backpacker produce, e in un anno la differenza tra i due metodi spesso è più grande di tutte le altre deduzioni messe insieme.',
    ],
  },
  {
    kind: 'items',
    h2: 'Le spese che appartengono a questo lavoro',
    intro: 'Qui tutto si ripartisce. Deduci la quota di lavoro e ti serve una base ragionevole per il numero che hai usato.',
    items: [
      {
        t: 'Costi di gestione dell’auto',
        d: 'Si deducono con il metodo dei centesimi per chilometro o con un logbook, confrontati qui sotto. Il logbook lavora sui tuoi costi reali con una percentuale di uso per lavoro, i centesimi per chilometro su una tariffa fissa.',
      },
      {
        t: 'Costi di bici, e-bike e scooter',
        d: 'Gestione, riparazioni e manutenzione si deducono per la quota di lavoro, insieme a casco, hi vis e luci. Bici e scooter per il fisco non sono auto, quindi il metodo dei centesimi per chilometro non si applica e deduci i costi reali ripartiti.',
      },
      {
        t: 'La quota di lavoro di telefono e dati',
        d: 'Tutto il lavoro passa da un’app, quindi la percentuale di lavoro del tuo piano è una deduzione vera. Calcola quella percentuale con onestà su un periodo rappresentativo.',
      },
      {
        t: 'Parcheggio pagato mentre lavori',
        d: 'I cinque dollari in un centro commerciale mentre preparano l’ordine sono deducibili. Le multe mai.',
      },
      {
        t: 'Attrezzatura comprata per il lavoro',
        d: 'Una borsa termica, un supporto per il telefono, un caricatore, un lucchetto per la bici, abbigliamento antipioggia, una torcia frontale. Ogni oggetto da 300\u00a0$ o meno si deduce per intero nell’anno d’acquisto.',
      },
      {
        t: 'Pulire il veicolo per il lavoro',
        d: 'Tenere l’auto in condizioni adatte a trasportare cibo, o la bici funzionante, si deduce per la quota di lavoro.',
      },
    ],
  },
  {
    kind: 'tables',
    h2: 'Come si calcolano le spese per l’auto?',
    intro: 'Con entrambi i metodi conta solo la guida di lavoro, e per chi ha un turno fisso il tratto da casa al negozio non conta mai.',
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
    note: 'Un rider costante supera i 5.000 chilometri in pochi mesi, e oltre quel punto il logbook di solito dà la deduzione più alta: carburante, assicurazione, tassa di immatricolazione (rego), tagliandi, ammortamento e interessi del prestito alla tua percentuale di lavoro.',
  },
  {
    kind: 'answer',
    h2: 'Cosa deve saper mostrare un rider?',
    paras: [
      'Ogni spesa poggia su tre cose: hai pagato tu, nessuno ti ha rimborsato e i soldi sono andati a guadagnare il reddito che dichiari. Per un rider significa un logbook o un registro dei chilometri, la bolletta del telefono dietro la tua percentuale di lavoro e le ricevute di borsa, supporto e attrezzatura.',
      'Vanno bene una ricevuta, una fattura, un estratto conto o una foto sul telefono con importo, data, fornitore e oggetto, conservati cinque anni. Spese di lavoro per 300\u00a0$ o meno in tutto l’anno non richiedono prove scritte. Questi 300\u00a0$ sono una soglia diversa da quella che decide se un oggetto si deduce subito o lungo la sua vita.',
    ],
  },
  {
    kind: 'note',
    label: 'Quella che sorprende',
    title: 'Consegnare cibo e trasportare passeggeri non sono la stessa cosa per la GST.',
    body: 'Se consegni solo cibo e pacchi, la registrazione GST diventa obbligatoria quando il fatturato supera 75.000\u00a0$ all’anno, soglia che la maggior parte dei rider non sfiora mai. Nel momento in cui trasporti un passeggero pagante, quella soglia sparisce.\n\nIl rideshare richiede la registrazione GST dalla prima corsa, qualunque sia il guadagno, con le business activity statement. Chi guida per Uber Eats in settimana e fa corse con passeggeri il venerdì sera ha già passato quella linea.',
  },
  {
    kind: 'traps',
    h2: 'Quali errori fa chi fa il rider?',
    intro: 'Qui le spese gonfiate sono più grandi che in qualsiasi altro mestiere, perché sono grandi i numeri. E lo sono anche quelle dimenticate.',
    wrong: [
      {
        t: 'L’intera bolletta del telefono',
        d: 'Dedurre il 100% di un piano che usi anche per tutto il resto non è difendibile, e l’ATO può metterlo a confronto con il resto della dichiarazione.',
      },
      {
        t: 'Le multe',
        d: 'Una multa per sosta presa mentre portavi un ordine al piano di sopra non è comunque deducibile. Nemmeno una per eccesso di velocità, per quanto fosse stretto il tempo di consegna.',
      },
      {
        t: 'Cibo comprato mentre lavori',
        d: 'La tua cena tra una consegna e l’altra è privata.',
      },
      {
        t: 'Ogni chilometro guidato con l’app aperta',
        d: 'Il tratto privato di un viaggio non diventa viaggio di lavoro perché l’app era accesa. Una commissione lungo la strada verso una consegna esce dalla deduzione, e per un rider dipendente esce anche il tragitto fino al negozio.',
      },
      {
        t: 'Lasciare fuori del tutto i piccoli redditi da piattaforma',
        d: 'Uber, DoorDash e le altre comunicano all’ATO il reddito dei driver con il sharing economy reporting regime. I tuoi guadagni sono già visibili, quindi qualche centinaio di dollari di lavoro nel weekend lasciato fuori da una dichiarazione è una discordanza, non un risparmio.',
      },
    ],
    missed: [
      {
        t: 'Il logbook, quando il logbook era chiaramente meglio',
        d: 'Il metodo dei centesimi per chilometro si ferma a 5.000 chilometri. Un rider costante li supera facilmente, e tutto quello che viene dopo si perde. Dodici settimane di logbook, tenute una volta, valgono cinque anni.',
      },
      {
        t: 'Interessi, assicurazione, rego e ammortamento',
        d: 'Si possono dedurre solo con il logbook, e di solito sono il motivo per cui vince. Si sceglie il metodo dei centesimi per chilometro perché è più facile e non si scopre mai quanto avrebbe pagato l’altro.',
      },
      {
        t: 'La borsa termica e il supporto per il telefono',
        d: 'Piccoli, ovvi, del tutto deducibili, e buttati insieme allo scontrino. Lo stesso vale per un casco, le luci e l’abbigliamento antipioggia.',
      },
      {
        t: 'Costi sostenuti prima della prima consegna',
        d: 'L’attrezzatura comprata mentre ti organizzavi, nel periodo in cui hai registrato l’ABN e hai aperto l’account sulla piattaforma, in genere si può dedurre. Conta il tempo tra l’acquisto e l’inizio, quindi tieni le date.',
      },
      {
        t: 'L’intera dichiarazione, per i rider con ABN che danno per scontato di dover pagare invece di dedurre',
        d: 'Dai pagamenti delle piattaforme non viene trattenuta nessuna tassa, quindi i soldi arrivano interi e ci si prepara a un conto. Le deduzioni su quel reddito sono ciò che lo riduce, e sono le più spesso dimenticate.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: 'Cosa dipende da come lavori, non dalle regole?',
    paras: [
      'Uber Eats, DoorDash, Menulog e Amazon Flex ingaggiano i rider come contractor: un ABN, niente trattenute, niente super. Un turno fisso in una pizzeria che ti dà una busta paga è lavoro dipendente con un TFN. Un negozio che stabilisce i tuoi turni, controlla il tuo lavoro e ti dà la bici, poi ti chiede di registrare un ABN, può essere un datore di lavoro travestito.',
      'Da lì dipende da dove comincia la guida deducibile. Per un dipendente il tragitto verso il negozio è privato, e conta solo dal negozio alla consegna. Con un ABN la guida è il lavoro.',
      'Come viene tassato il profitto dipende dai fatti individuali del tuo anno. Il caso Addy della High Court è lo sfondo, ma il suo effetto varia da persona a persona e non è qualcosa da dare per scontato. Lo valutiamo noi caso per caso e la decisione finale spetta all’ATO.',
    ],
  },
]

const FAQS = [
  {
    question: 'Mi serve un ABN per consegnare per Uber Eats o DoorDash?',
    answer: 'Sì. Quelle piattaforme ingaggiano rider e driver come contractor e non come dipendenti, quindi serve un ABN prima di poter essere pagati.\n\nNon sostituisce il TFN. Dai pagamenti non viene trattenuto niente, quindi il reddito arriva intero e le tasse si sistemano quando presenti la dichiarazione.',
  },
  {
    question: 'Quale metodo per le spese dell’auto devo usare?',
    answer: 'Dipende da quanto guidi e da quanto costa gestire l’auto. I centesimi per chilometro non vogliono ricevute ma si fermano a 5.000 km di lavoro all’anno, e tutto quello che c’è oltre si perde.\n\nUn logbook non ha tetto e include i costi reali di gestione alla tua percentuale di uso per lavoro, con dodici settimane consecutive di registrazioni e una ricevuta per ogni spesa.',
  },
  {
    question: 'Posso dedurre la bolletta del telefono?',
    answer: 'Puoi dedurre la percentuale di lavoro del telefono e del piano dati: la parte usata per l’app da driver, la navigazione e i messaggi di lavoro.\n\nNon puoi dedurre l’intera bolletta se usi il telefono anche per la vita di tutti i giorni, quindi ti serve una base ragionevole per la percentuale e qualcosa che la sostenga.',
  },
  {
    question: 'Devo registrarmi per la GST?',
    answer: 'Solo per consegne di cibo e pacchi, la registrazione GST diventa obbligatoria quando il fatturato supera 75.000\u00a0$ all’anno, e la maggior parte dei rider part time non ci arriva vicino.\n\nTrasportare passeggeri paganti è diverso: richiede la registrazione GST dal primo dollaro, qualunque sia il fatturato.',
  },
  {
    question: 'Vado in bici, non in auto. Posso dedurre qualcosa?',
    answer: 'Sì. Una bicicletta o un monopattino elettrico per il fisco non è un’auto, quindi il metodo dei centesimi per chilometro non si applica, ma puoi dedurre la quota di lavoro di gestione, riparazioni e manutenzione, più casco, luci e hi vis.\n\nRipartisci in modo ragionevole tra le consegne e l’uso personale.',
  },
]

const GUIDES = [
  {
    href: itGuideHref('uber-doordash-rideshare-abn-working-holiday'),
    label: 'Uber, DoorDash e il tuo ABN' + itGuideSuffix('uber-doordash-rideshare-abn-working-holiday'),
    desc: 'Perché le piattaforme lo richiedono e cosa cambia dal momento in cui lo hai.',
  },
  {
    href: itGuideHref('bicycle-motorcycle-vehicle-deductions-working-holiday'),
    label: 'Deduzioni per bici, scooter e auto' + itGuideSuffix('bicycle-motorcycle-vehicle-deductions-working-holiday'),
    desc: 'Come viene trattato ogni veicolo e quale metodo si adatta a quale.',
  },
  {
    href: itGuideHref('uber-eats-delivery-rider-working-holiday-australia'),
    label: 'Fare il rider con un working holiday' + itGuideSuffix('uber-eats-delivery-rider-working-holiday-australia'),
    desc: 'Cosa paga davvero il lavoro, una volta tolti i costi.',
  },
]

const SERVICES = [
  { href: '/it/abn', label: 'ABN' },
  { href: '/it/tfn', label: 'TFN' },
  { href: '/it/tax-return', label: 'Tax return' },
]

export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'it',
        path: '/it/expenses/delivery-drivers',
        articleHeadline: 'Deduzioni per rider in Australia: auto, telefono, GST',
        articleDescription: 'I tuoi chilometri e la quota di lavoro del telefono sono ciò che conta davvero. Multe e tratti privati non lo sono mai stati.',
        inLanguage: 'it',
        photoKey: 'expenses/delivery-drivers',
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
