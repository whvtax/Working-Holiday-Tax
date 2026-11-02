import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

export const metadata: Metadata = {
  title: 'Deduzioni FIFO in Australia',
  description: 'DPI, attrezzi, rinnovo di licenze e patentini, medicals e quota di lavoro del telefono. E perché lo Zone Tax Offset nel FIFO quasi mai si applica.',
  keywords: [
    'FIFO deduzioni fiscali Australia',
    'fly in fly out tasse Australia',
    'Zone Tax Offset FIFO',
    'alloggio camp FIFO tasse',
    'High Risk Work Licence deducibile',
    'DPI FIFO deduzione',
    'lavoro FIFO working holiday tasse',
    'lavoro in miniera Australia tasse',
  ],
  alternates: {
    canonical: '/it/expenses/fifo',
    languages: {
      'en-AU': '/expenses/fifo',
      de: '/de/expenses/fifo',
      ja: '/ja/expenses/fifo',
      ...newLocaleLanguages('/expenses/fifo'),
      'x-default': '/expenses/fifo',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Deduzioni FIFO con un visto working holiday' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/expenses/fifo`,
    siteName: 'Working Holiday Tax',
    title: 'Deduzioni FIFO in Australia: DPI, licenze, Zone Offset',
    description: 'Il cibo del camp e il viaggio fino all’aeroporto non sono deducibili. Lo Zone Tax Offset probabilmente non è tuo. Ecco cosa lo è.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Deduzioni FIFO in Australia: DPI, licenze, Zone Offset',
    description: 'Il cibo del camp e il viaggio fino all’aeroporto non sono deducibili. Lo Zone Tax Offset probabilmente non è tuo. Ecco cosa lo è.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'expenses', lang: 'it', detail: 'FIFO e lavoro nei camp' })

const UI = {
  ctaLabel: 'Scrivici su WhatsApp',
  ctaSub: 'Rispondiamo in circa un’ora.',
  guaranteeHeading: 'La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa.',
  guaranteeBody: 'Lavoriamo solo con i visti 417 e 462, quindi zone offset, residenza fiscale e super sparsa in più fondi vengono guardati insieme. Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.',
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
  { name: 'FIFO', item: '/it/expenses/fifo' },
]

const HERO = {
  kicker: 'Deduzioni FIFO, roster e camp',
  h1lead: 'Lo Zone Tax Offset probabilmente non è tuo.',
  h1accent: 'Ecco cosa lo è.',
  lede: 'La stanza nel camp, la mensa e il volo sono costi dell’azienda, non tuoi. A te restano DPI, rinnovo di licenze e patentini, medicals e un telefono.',
}

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: 'Cosa può dedurre chi lavora in FIFO?',
    paras: [
      'Chi lavora in FIFO può dedurre i DPI e l’abbigliamento protettivo comprati di tasca propria e il loro lavaggio, attrezzi e attrezzatura, il rinnovo di una licenza o di un patentino che già hai, le visite mediche e i test antidroga e alcol richiesti dal datore di lavoro che hai pagato tu, la quota di lavoro di telefono e internet e la formazione legata al lavoro che già fai.',
      'Non c’è in questa lista tutto ciò che fa sembrare caro il FIFO. La stanza nel camp e i pasti alla mensa li prenota e li paga l’azienda, e di solito anche il volo verso il sito. Una deduzione restituisce solo i soldi che sono usciti dalle tue tasche.',
    ],
  },
  {
    kind: 'items',
    h2: 'Le spese che appartengono a questo lavoro',
    intro: 'Tutte hanno la stessa condizione: le hai pagate tu e non te le ha date il magazzino dell’azienda.',
    items: [
      {
        t: 'DPI comprati da te, e il loro lavaggio',
        d: 'Tute, scarponi con punta d’acciaio, guanti, occhiali di protezione, protezioni per l’udito, mascherine. Sono deducibili perché ti proteggono da un rischio preciso del sito. Il lavaggio si deduce alla tariffa dell’ATO: 1\u00a0$ a lavaggio per i soli capi da lavoro, 50 centesimi se li lavi insieme al resto.',
      },
      {
        t: 'Attrezzi e attrezzatura',
        d: 'Tutto ciò che hai comprato per il lavoro e che il magazzino non ti ha dato. Ogni oggetto fino a 300\u00a0$ si deduce per intero nell’anno d’acquisto, quello sopra si deduce lungo la vita utile dell’oggetto. Una cassetta di attrezzi comprata come set da 300\u00a0$ o più è un bene unico.',
      },
      {
        t: 'Rinnovo di una licenza o di un patentino che hai già',
        d: 'High Risk Work Licence, Working at Heights, patentino del muletto. I rinnovi sono deducibili quando lavori già in quel ruolo. Il primo no, con lo stesso principio della prima White Card.',
      },
      {
        t: 'Visite mediche e test richiesti dal datore di lavoro',
        d: 'In molti siti per lavorare servono una visita medica prima dell’inizio e i test antidroga e alcol. Se il datore li richiede per un ruolo che già hai e li hai pagati tu, sono deducibili.',
      },
      {
        t: 'La quota di lavoro di telefono e internet',
        d: 'Per controllare il roster, inviare i timesheet, fare le induction online obbligatorie. Deduci la percentuale di lavoro in modo ragionevole, non l’intera bolletta.',
      },
      {
        t: 'Formazione legata al lavoro che già fai',
        d: 'Un breve corso che mantiene valida una competenza o una licenza è deducibile, e lo sono anche viaggio e alloggio se il datore ti chiede di frequentarlo lontano dalla tua base. Un primo certificato di base preso per diventare idoneo a un ruolo no.',
      },
    ],
  },
  {
    kind: 'note',
    label: 'Il più grande mito fiscale del FIFO',
    title: 'Lavorare in una zona non vuol dire viverci.',
    body: 'Da una modifica di legge del 2015, lo Zone Tax Offset dipende da dove si trova la tua residenza abituale, non da dove ti porta il roster. Se si applica dipende dai fatti individuali del tuo anno e la decisione finale spetta all’ATO.\n\nLo valutiamo noi caso per caso, come parte della preparazione della tax return.',
  },
  {
    kind: 'answer',
    h2: 'Cosa deve esserci dietro una spesa FIFO?',
    paras: [
      'Una spesa regge a tre domande. L’hai pagata tu? Ti è stata rimborsata? È stata fatta per guadagnare il reddito che dichiari? Con un roster significa lo scontrino degli scarponi che il magazzino non ti ha dato, la fattura della visita medica e la bolletta dietro la percentuale del telefono.',
      'Il documento deve mostrare importo, data, fornitore e oggetto, su ricevuta, fattura, estratto conto o foto, conservato cinque anni. Con 300\u00a0$ o meno di spese di lavoro nell’anno non servono prove scritte. Questi 300\u00a0$ sono una soglia diversa da quella che decide se un attrezzo si deduce subito o lungo la sua vita.',
    ],
  },
  {
    kind: 'traps',
    h2: 'Quali errori fa chi lavora in FIFO?',
    intro: 'Su questo mestiere circolano più informazioni sbagliate e sicure di sé che su qualunque altro del sito.',
    wrong: [
      {
        t: 'Lo Zone Tax Offset',
        d: 'La voce più richiesta a cui chi lavora in FIFO non ha diritto. Dipende da dove vivi di solito, non da dove voli, e il camp non conta.',
      },
      {
        t: 'Alloggio e pasti nel camp',
        d: 'Stanza e mensa le prenota e le paga il datore di lavoro e, nei siti davvero remoti, per lui di solito sono un fringe benefit esente, non un reddito per te. In ogni caso tu non hai pagato.',
      },
      {
        t: 'Il tragitto verso l’aeroporto prima dello swing',
        d: 'È un normale tragitto casa-lavoro, per quanto presto sia il volo e per quanto lontano tu viva dal terminal. L’eccezione stretta degli attrezzi ingombranti raramente vale per un ruolo nei servizi del camp, dove o non c’è niente di ingombrante o c’è un posto sicuro dove lasciarlo.',
      },
      {
        t: 'Trasferirti a Perth o Brisbane per il lavoro',
        d: 'Voli, trasporto dei bagagli e alloggio temporaneo per un trasloco fatto per iniziare un lavoro FIFO sono costi privati di trasferimento. Mettersi nella posizione di guadagnare un reddito non è guadagnarlo.',
      },
      {
        t: 'La prima High Risk Work Licence',
        d: 'La licenza che hai pagato per essere assunto è un costo privato. Rinnovarla mentre la stai già usando al lavoro è deducibile.',
      },
    ],
    missed: [
      {
        t: 'DPI comprati di tasca propria, e il loro lavaggio',
        d: 'Molti comprano da soli scarponi o guanti invece di aspettare il magazzino, poi non deducono né l’attrezzatura né il lavaggio alla tariffa pubblicata.',
      },
      {
        t: 'Visite mediche e test antidroga e alcol pagati da te',
        d: 'Sono deducibili se il datore li richiede per un ruolo che già hai, e quasi nessuno li deduce perché sembrano un ostacolo e non un costo.',
      },
      {
        t: 'La quota di lavoro di telefono e internet durante lo swing',
        d: 'Roster, timesheet e induction obbligatorie passano tutti da un dispositivo personale.',
      },
      {
        t: 'Rinnovi di licenze e patentini durante un anno di roster lungo',
        d: 'Il rinnovo di una High Risk Work Licence o di un Working at Heights pagato tra uno swing e l’altro è facile da perdere di vista a fine anno.',
      },
      {
        t: 'Super lasciata in più fondi',
        d: 'Il FIFO paga bene, quindi il saldo della super è più alto che nella maggior parte dei lavori da backpacker. Resta lì quando te ne vai e va richiesta come Departing Australia Superannuation Payment (DASP) quando il visto è terminato.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: 'Cosa resta aperto in un fascicolo FIFO?',
    paras: [
      'Lo Zone Tax Offset di solito è sbagliato più che impossibile. Se la tua base durante il working holiday era dentro una zona specificata, per esempio un affitto in una cittadina remota invece che in una capitale, la questione è aperta.',
      'L’eccezione degli attrezzi ingombranti conta più per un artigiano che arriva in aereo con la sua attrezzatura personale che per un ruolo nei servizi del camp. Decidono cosa hai portato e cosa offriva il sito per custodirlo.',
      'La residenza ai fini fiscali dipende dai fatti individuali del tuo anno. Il caso Addy della High Court è lo sfondo, ma il suo effetto varia da persona a persona e non è qualcosa da dare per scontato. Lo valutiamo noi caso per caso e la decisione finale spetta all’ATO.',
    ],
  },
]

const FAQS = [
  {
    question: 'Chi lavora in FIFO ha diritto allo Zone Tax Offset?',
    answer: 'Di solito no, ed è il più grande equivoco sulle tasse del FIFO. Da una modifica di legge del 2015, conta dove vivi di solito e non dove lavori, e dipende dai fatti individuali del tuo anno.\n\nÈ una valutazione che facciamo noi caso per caso, e la decisione finale spetta all’ATO.',
  },
  {
    question: 'Posso dedurre alloggio o pasti nel camp?',
    answer: 'No. Stanza e pasti nel sito li organizza e li paga il datore di lavoro e, nei siti davvero remoti, per lui di solito sono un fringe benefit esente.\n\nVisto che non hai pagato tu la stanza né il cibo, non c’è nessuna spesa tua da dedurre.',
  },
  {
    question: 'Posso dedurre il tragitto verso l’aeroporto prima dello swing?',
    answer: 'No, in quasi tutti i casi. Il tragitto da casa all’aeroporto da cui parti è un normale spostamento privato, per quanto presto sia il volo.\n\nL’eccezione stretta, cioè dover portare attrezzi davvero ingombranti ed essenziali senza un posto sicuro dove lasciarli al lavoro, raramente vale per un ruolo nei servizi del camp.',
  },
  {
    question: 'Posso dedurre la High Risk Work Licence?',
    answer: 'Puoi dedurre il rinnovo di una che già hai. Non puoi dedurre il primo ottenimento, perché quel costo ti ha reso idoneo al ruolo e non fa parte di un lavoro che già facevi.\n\nÈ la stessa distinzione tra prima volta e rinnovo che l’ATO applica alla White Card dell’edilizia.',
  },
  {
    question: 'Cosa posso dedurre di telefono e internet mentre sono in roster?',
    answer: 'La parte legata al lavoro. Se usi il tuo telefono o internet per controllare il roster, inviare i timesheet o fare le induction online obbligatorie, quella quota della bolletta è deducibile.\n\nServe una stima ragionevole della percentuale: l’intera bolletta di un dispositivo che usi anche per tutto il resto non regge.',
  },
]

const GUIDES = [
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
  {
    href: '/it/superannuation',
    label: 'Riavere la super quando lasci l’Australia',
    desc: 'Come funziona il DASP e cosa viene trattenuto.',
  },
]

const SERVICES = [
  { href: '/it/tax-return', label: 'Tax return' },
  { href: '/it/superannuation', label: 'Superannuation' },
  { href: itGuideHref('tax-residency-working-holiday-makers'), label: 'Residenza fiscale' + itGuideSuffix('tax-residency-working-holiday-makers') },
]

export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'it',
        path: '/it/expenses/fifo',
        articleHeadline: 'Deduzioni FIFO in Australia: DPI, licenze, Zone Offset',
        articleDescription: 'Il cibo del camp e il viaggio fino all’aeroporto non sono deducibili. Lo Zone Tax Offset probabilmente non è tuo. Ecco cosa lo è.',
        inLanguage: 'it',
        photoKey: 'expenses/fifo',
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
