import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

export const metadata: Metadata = {
  title: 'Deduzioni per chi lavora in cantiere',
  description: 'Cosa possono dedurre i lavoratori edili con un working holiday: attrezzi sopra e sotto i 300\u00a0$, DPI, rinnovo della White Card e protezione dal sole.',
  keywords: [
    'construction deduzioni fiscali Australia',
    'lavoro edile working holiday tasse',
    'White Card deducibile',
    'attrezzi deducibili Australia 300 dollari',
    'DPI hi vis deduzione',
    'tax return muratore Australia',
    'ute deduzione Australia',
    'visto 417 cantiere tasse',
  ],
  alternates: {
    canonical: '/it/expenses/construction',
    languages: {
      'en-AU': '/expenses/construction',
      de: '/de/expenses/construction',
      ja: '/ja/expenses/construction',
      ...newLocaleLanguages('/expenses/construction'),
      'x-default': '/expenses/construction',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Deduzioni per chi lavora in cantiere con un visto working holiday' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/expenses/construction`,
    siteName: 'Working Holiday Tax',
    title: 'Deduzioni per il cantiere in Australia: attrezzi, DPI, auto',
    description: 'Attrezzi, DPI e rinnovo della White Card sono deducibili. La prima White Card e i jeans strappati no.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Deduzioni per il cantiere in Australia: attrezzi, DPI, auto',
    description: 'Attrezzi, DPI e rinnovo della White Card sono deducibili. La prima White Card e i jeans strappati no.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'expenses', lang: 'it', detail: 'Construction e lavoro in cantiere' })

const UI = {
  ctaLabel: 'Scrivici su WhatsApp',
  ctaSub: 'Rispondiamo in circa un’ora.',
  guaranteeHeading: 'La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa. La garanzia vale solo per le dichiarazioni con reddito TFN.',
  guaranteeBody: 'Dichiarazioni di cantiere, rinnovi di licenze e patentini e la discussione sull’ute sono lavoro settimanale per noi, e ogni cliente ha un visto 417 o 462. Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.',
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
  { name: 'Construction', item: '/it/expenses/construction' },
]

const HERO = {
  kicker: 'Deduzioni per cantieri e manovalanza',
  h1lead: 'I tuoi attrezzi sono deducibili.',
  h1accent: 'La tua prima White Card no.',
  lede: 'Il lavoro di cantiere ha la lista di deduzioni più lunga tra i lavori da backpacker. Il pick-up (in Australia lo chiamano ute) di solito non c’è.',
}

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: 'Cosa può dedurre chi lavora nell’edilizia?',
    paras: [
      'Chi lavora in cantiere può dedurre attrezzi e attrezzatura comprati di tasca propria, abbigliamento protettivo e DPI, protezione dal sole per il lavoro all’aperto, il rinnovo di una White Card o di una licenza operativa che già hai, la quota di lavoro del piano telefonico e la formazione legata al mestiere che già fai. Quello che ha fornito o rimborsato il datore di lavoro è fuori dalla lista.',
      'La lista è lunga perché il lavoro crea costi precisi. Le scarpe con la punta d’acciaio ti proteggono da un mattone che cade, la crema solare da sei ore su una soletta senza ombra. È il collegamento che il test per la deduzione cerca.',
    ],
  },
  {
    kind: 'items',
    h2: 'Le spese che appartengono a questo lavoro',
    intro: 'Le soglie in dollari qui sotto riguardano i tempi, non il diritto. Superare i 300\u00a0$ non toglie una deduzione, la distribuisce.',
    items: [
      {
        t: 'Attrezzi e attrezzatura sotto i 300\u00a0$ ciascuno',
        d: 'Un trapano, una smerigliatrice, una chiodatrice, una livella, una cintura portattrezzi. Ogni oggetto da 300\u00a0$ o meno si deduce per intero nell’anno in cui lo compri. Il test è per singolo oggetto, quindi un anno di piccoli acquisti diventa una deduzione vera da scontrini che quasi tutti buttano.',
      },
      {
        t: 'Attrezzi e attrezzatura da 300\u00a0$ o più',
        d: 'Restano deducibili, distribuiti lungo la vita utile dell’oggetto invece che tutti subito. Una betoniera o una troncatrice stanno qui. La trappola è comprare più attrezzi insieme come set da 300\u00a0$ o più, perché il set è un bene unico anche se ogni pezzo da solo costava meno della soglia.',
      },
      {
        t: 'DPI e abbigliamento protettivo',
        d: 'Camicie e gilet hi vis, scarponi con punta d’acciaio, occhiali di sicurezza, casco, cuffie, guanti da lavoro, mascherina antipolvere. Per l’ATO il test non è se l’oggetto è utile in cantiere, ma se ti protegge da uno specifico rischio di infortunio.',
      },
      {
        t: 'Protezione dal sole per il lavoro all’aperto',
        d: 'Crema solare, cappello a tesa larga e occhiali da sole sono deducibili se il lavoro di cantiere è all’aperto. Su una soletta d’estate è un costo ricorrente di cui quasi nessuno tiene lo scontrino.',
      },
      {
        t: 'Rinnovo di una White Card o di una licenza operativa',
        d: 'Rinnovare una tessera o un patentino che già hai è deducibile. La tua prima White Card no, perché quel costo ti ha reso idoneo a lavorare nell’edilizia. La stessa distinzione vale per un primo patentino del muletto, un patentino EWP o un permesso per veicoli pesanti.',
      },
      {
        t: 'La quota di lavoro di telefono e internet',
        d: 'Se usi il tuo telefono per chiamare un supervisor, controllare i progetti o ricevere i messaggi sui turni, la percentuale di lavoro del piano è deducibile. Dedurre l’intera bolletta di un telefono che usi anche per vivere non regge.',
      },
      {
        t: 'Formazione legata al mestiere che già fai',
        d: 'Un corso che migliora una competenza o un patentino che usi adesso è deducibile. Un corso rivolto a un altro mestiere no, anche se riguarda l’edilizia, perché costruisce una nuova qualifica invece di mantenere quella che ti fa guadagnare.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: 'Cosa deve esserci dietro una spesa per gli attrezzi?',
    paras: [
      'Ogni spesa deve superare tre test. L’hai pagata tu, nessuno te l’ha rimborsata ed è stata fatta per guadagnare il reddito che dichiari. In cantiere significa lo scontrino del trapano, degli scarponi e del rinnovo della licenza.',
      'Il documento può essere una ricevuta, una fattura, un estratto conto o una foto sul telefono con importo, data, fornitore e oggetto, conservato cinque anni. Se tutte le spese di lavoro dell’anno sommano 300\u00a0$ o meno, non servono prove scritte. Questi 300\u00a0$ sono una soglia diversa da quella che decide se una sega si deduce subito o lungo la sua vita.',
    ],
  },
  {
    kind: 'numbered',
    h2: 'Quando conta il tragitto fino al cantiere?',
    intro: 'Da casa a un posto di lavoro fisso è un viaggio privato, e un cantiere è un posto di lavoro. Esiste una sola eccezione stretta, per gli attrezzi ingombranti, e devono essere vere tutte e tre le condizioni.',
    steps: [
      'Gli attrezzi sono essenziali per il lavoro che fai quel giorno.',
      'Sono davvero ingombranti: la loro dimensione o il loro peso è il motivo per cui serve un veicolo, non la comodità.',
      'Non c’è un posto sicuro dove lasciarli in cantiere, quindi devono tornare a casa con te.',
    ],
    note: 'Se il cantiere ha un capanno, un container o una gabbia con il lucchetto, o quello che porti starebbe in una borsa normale, il viaggio resta un normale tragitto casa-lavoro. Se rientri nell’eccezione, ute e furgoni con una portata di una tonnellata o più non possono usare il metodo dei centesimi per chilometro, quindi per la maggior parte di chi li guida l’unica strada è il logbook.',
  },
  {
    kind: 'traps',
    h2: 'Quali errori fa chi lavora in cantiere?',
    intro: 'Le spese sbagliate in una dichiarazione di cantiere sono di solito abbigliamento e ute. Quelle dimenticate sono scontrini che nessuno ha tenuto per cose chiaramente deducibili.',
    wrong: [
      {
        t: 'Vestiti normali distrutti in cantiere',
        d: 'Jeans, una maglietta, una camicia di flanella, una felpa. La normale usura di abiti convenzionali è una spesa privata. L’indumento deve proteggerti, non solo sopravvivere alla giornata.',
      },
      {
        t: 'La tua prima White Card',
        d: 'La tessera che hai pagato prima che qualcuno ti assumesse è il costo per diventare idoneo, che l’ATO tratta come la prima patente. Rinnovarla quando già lavori è deducibile.',
      },
      {
        t: 'L’ute, come se fosse automatico',
        d: 'Avere un ute e guidarlo fino al cantiere non è una deduzione. Devono valere tutte e tre le condizioni sugli attrezzi ingombranti qui sopra, e nella maggior parte dei cantieri non valgono, perché c’è un posto dove chiudere le cose.',
      },
      {
        t: 'Attrezzi forniti o pagati dal datore di lavoro',
        d: 'Se è sceso dal camion, è uscito dal container del cantiere o ti è stato rimborsato, non c’è nessun costo tuo da dedurre.',
      },
      {
        t: 'Un corso per entrare in un altro mestiere',
        d: 'Lo studio che ti porterebbe in un nuovo mestiere non è deducibile, per quanto sia chiaramente legato all’edilizia.',
      },
    ],
    missed: [
      {
        t: 'I piccoli attrezzi, dedotti uno per uno',
        d: 'Si pensa che ci sia una soglia da raggiungere prima che valga la pena dedurre gli attrezzi. Non c’è. Dodici acquisti da 40\u00a0$ sono 480\u00a0$ di deduzione, e ognuno si valuta da solo rispetto ai 300\u00a0$.',
      },
      {
        t: 'Tutto ciò che supera i 300\u00a0$, scartato del tutto',
        d: 'Si sente «sopra 300\u00a0$» e si conclude che l’attrezzo non è deducibile. Lo è, lungo la vita utile dell’oggetto. Lasciarlo perde l’intera deduzione invece di ritardarne una parte.',
      },
      {
        t: 'Crema solare e cappello in un cantiere all’aperto',
        d: 'Riconosciuti per il lavoro all’aperto e quasi mai dedotti da chi fa un mestiere edile, che tende a pensare alla protezione dal sole come a una cosa da fattoria. Una soletta senza ombra a febbraio è la stessa esposizione.',
      },
      {
        t: 'Il lavaggio di hi vis e protezioni',
        d: 'Lavare l’abbigliamento protettivo deducibile è a sua volta deducibile alla tariffa dell’ATO, 1\u00a0$ a lavaggio per i soli capi da lavoro o 50 centesimi se li lavi insieme al resto. Oltre i 150\u00a0$ nell’anno tieni un semplice diario.',
      },
      {
        t: 'Rinnovi di licenze e patentini pagati di tasca tua',
        d: 'Una White Card, un patentino del muletto o un rinnovo EWP si dimentica facilmente entro luglio, soprattutto se l’hai pagato in contanti a un corso del sabato.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: 'Quali parti dipendono dai tuoi fatti?',
    paras: [
      'Prima di tutto l’eccezione degli attrezzi ingombranti. Decidono cosa porti, cosa offre il cantiere per custodirlo e se gli attrezzi erano essenziali quel giorno. Due operai nella stessa squadra possono arrivare a risultati diversi.',
      'La residenza ai fini fiscali dipende dai fatti individuali del tuo anno. Il caso Addy della High Court è lo sfondo, ma il suo effetto varia da persona a persona e non è qualcosa da dare per scontato. Lo valutiamo noi caso per caso e la decisione finale spetta all’ATO.',
    ],
  },
]

const FAQS = [
  {
    question: 'Posso dedurre la mia prima White Card?',
    answer: 'No. L’ATO tratta una prima White Card come una prima patente, cioè il costo per diventare idoneo al lavoro e non un costo per svolgerlo.\n\nQuando lavori e la tessera va rinnovata, il rinnovo è deducibile. Lo stesso vale per un primo patentino del muletto o un permesso per veicoli pesanti.',
  },
  {
    question: 'Quali attrezzi posso dedurre se lavoro in cantiere?',
    answer: 'Qualsiasi attrezzo o attrezzatura che hai comprato tu per il lavoro in cantiere, purché il datore di lavoro non l’abbia fornito né rimborsato.\n\nGli oggetti da 300\u00a0$ o meno ciascuno si deducono per intero nell’anno in cui li compri, quelli sopra lungo la vita utile dell’oggetto. Più attrezzi comprati insieme come set da 300\u00a0$ o più formano un bene unico.',
  },
  {
    question: 'Posso dedurre l’ute per andare in cantiere?',
    answer: 'Solo in un caso stretto. Guidare da casa a un posto di lavoro fisso è un viaggio privato, e un cantiere è un posto di lavoro.\n\nIl viaggio è deducibile solo se gli attrezzi che porti sono essenziali quel giorno, davvero ingombranti e non custodibili in modo sicuro in cantiere. Ute e furgoni con portata di una tonnellata o più sono esclusi dal metodo dei centesimi per chilometro, quindi l’unico modo per dedurli è il logbook.',
  },
  {
    question: 'Scarponi con punta d’acciaio e hi vis sono deducibili?',
    answer: 'Sì. Scarponi con punta d’acciaio, hi vis, occhiali di sicurezza, caschi, cuffie e guanti da lavoro sono deducibili perché ti proteggono da uno specifico rischio di infortunio, che è il test applicato dall’ATO.\n\nLa protezione dal sole per il lavoro di cantiere all’aperto si deduce allo stesso modo, e così il lavaggio dell’abbigliamento protettivo.',
  },
  {
    question: 'I miei vestiti si rovinano in cantiere. Perché non posso dedurli?',
    answer: 'Perché l’ATO valuta l’indumento, non cosa gli è successo. Jeans, una maglietta o una camicia di flanella sono abiti convenzionali, e l’usura è privata per quanto in fretta il lavoro li rovini.\n\nPer essere deducibile l’indumento deve avere una vera funzione protettiva, oppure essere una divisa obbligatoria con marchio.',
  },
]

const GUIDES = [
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
  {
    href: itGuideHref('construction-laborer-working-holiday-australia'),
    label: 'Lavorare in cantiere con un working holiday' + itGuideSuffix('construction-laborer-working-holiday-australia'),
    desc: 'Cosa paga il lavoro e cosa si aspetta un cantiere che tu porti.',
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
        path: '/it/expenses/construction',
        articleHeadline: 'Deduzioni per il cantiere in Australia: attrezzi, DPI, auto',
        articleDescription: 'Attrezzi, DPI e rinnovo della White Card sono deducibili. La prima White Card e i jeans strappati no.',
        inLanguage: 'it',
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
