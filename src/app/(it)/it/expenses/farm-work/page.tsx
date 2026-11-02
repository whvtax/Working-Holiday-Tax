import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

export const metadata: Metadata = {
  title: 'Deduzioni farm work e fruit picking',
  description: 'Cosa possono dedurre braccianti e raccoglitori di frutta nella tax return australiana: protezione dal sole, guanti, scarponi e spostamenti tra i campi.',
  keywords: [
    'farm work deduzioni fiscali Australia',
    'fruit picking tasse Australia',
    'raccolta frutta tax return',
    'deduzioni lavoro agricolo working holiday',
    'crema solare deducibile Australia',
    'visto 417 farm work tasse',
    'piece rate tasse Australia',
    'seconda working holiday farm work tasse',
  ],
  alternates: {
    canonical: '/it/expenses/farm-work',
    languages: {
      'en-AU': '/expenses/farm-work',
      de: '/de/expenses/farm-work',
      ja: '/ja/expenses/farm-work',
      ...newLocaleLanguages('/expenses/farm-work'),
      'x-default': '/expenses/farm-work',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Deduzioni per farm work e fruit picking con un visto working holiday' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/expenses/farm-work`,
    siteName: 'Working Holiday Tax',
    title: 'Deduzioni per il farm work in Australia',
    description: 'Protezione dal sole e spostamenti tra i campi sono deducibili. I tuoi jeans e l’affitto dell’ostello no. Cosa deduce davvero chi lavora in fattoria.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Deduzioni per il farm work in Australia',
    description: 'Protezione dal sole e spostamenti tra i campi sono deducibili. I tuoi jeans e l’affitto dell’ostello no. Cosa deduce davvero chi lavora in fattoria.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'expenses', lang: 'it', detail: 'Farm work e fruit picking' })

const UI = {
  ctaLabel: 'Scrivici su WhatsApp',
  ctaSub: 'Rispondiamo in circa un’ora.',
  guaranteeHeading: 'La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa.',
  guaranteeBody: 'Una stagione di lavori brevi, più contractor e una sola dichiarazione: è il lavoro che facciamo ogni settimana, per chi ha un visto 417 o 462 e nessun altro. Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.',
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
  { name: 'Farm work', item: '/it/expenses/farm-work' },
]

const HERO = {
  kicker: 'Deduzioni farm work e fruit picking',
  h1lead: 'La crema solare è una deduzione.',
  h1accent: 'I tuoi jeans non lo sono mai stati.',
  lede: 'Per raccolta, potatura e confezionamento le voci deducibili sono poche, circa sei. Pesano di più i lavori brevi della stagione, che devono finire tutti nella stessa dichiarazione.',
}

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: 'Cosa può dedurre chi raccoglie frutta o lavora in fattoria?',
    paras: [
      'Chi lavora in fattoria può dedurre la protezione dal sole usata per il lavoro all’aperto, guanti e scarponi protettivi, attrezzi e attrezzatura per la raccolta comprati di tasca propria e gli spostamenti tra due fattorie o due campi nella stessa giornata. Ogni voce deve essere stata pagata da te, non rimborsata e coperta da un documento.',
      'La crema solare per quasi tutti in Australia è una spesa privata. Per te è deducibile perché il lavoro ti espone al sole diretto per ore, e l’ATO lo considera un’esposizione legata al lavoro.',
    ],
  },
  {
    kind: 'items',
    h2: 'Le spese che appartengono a questo lavoro',
    intro: 'Ognuna ha una condizione, ed è la condizione a far reggere la deduzione.',
    items: [
      {
        t: 'Protezione dal sole: crema solare, cappello a tesa larga, occhiali da sole',
        d: 'Deducibili se il lavoro ti espone al sole, cioè raccolta, potatura, diradamento e confezionamento in un capannone aperto sui lati. Deduci solo la quota usata per il lavoro.',
      },
      {
        t: 'Guanti protettivi, stivali di gomma e scarponi antinfortunistici',
        d: 'Guanti da raccolta, stivali per la pioggia, scarpe con punta d’acciaio per il lavoro nel capannone. Valgono perché ti proteggono da un pericolo preciso del lavoro: spine, linfa, prodotti chimici, casse che cadono. Normali scarponi robusti no.',
      },
      {
        t: 'Attrezzi per la raccolta che hai comprato tu',
        d: 'Cesoie, forbici da potatura, una borsa o un’imbracatura per la raccolta, una torcia frontale, ginocchiere. Ogni oggetto fino a 300\u00a0$ si deduce per intero nell’anno d’acquisto. Sopra i 300\u00a0$ lo deduci comunque, lungo la vita utile dell’oggetto.',
      },
      {
        t: 'Spostamenti tra fattorie o campi nello stesso giorno',
        d: 'Passare da una proprietà, un campo o un capannone a un altro dopo che la giornata di lavoro è iniziata è un viaggio deducibile, calcolato con il metodo dei centesimi per chilometro o con un logbook. Il primo viaggio della giornata non rientra.',
      },
      {
        t: 'Abbigliamento protettivo con una funzione vera',
        d: 'Giacca antipioggia, tuta resistente ai prodotti chimici per i trattamenti, una mascherina antipolvere nel capannone. Il test è se l’indumento ti protegge da qualcosa che il lavoro ti fa. Una camicia di flanella che ti tiene caldo no.',
      },
      {
        t: 'La quota di lavoro del telefono',
        d: 'Piccola ma reale se usi il tuo telefono per il lavoro, per esempio per ricevere gli orari dal contractor. Deduci la percentuale di lavoro in modo ragionevole, non l’intera bolletta.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: 'Cosa devi conservare di una stagione?',
    paras: [
      'Niente è deducibile se non valgono tre cose: i soldi erano tuoi, nessuno te li ha ridati e sono stati spesi per guadagnare il reddito della dichiarazione. In una stagione significa lo scontrino della crema solare preso in una stazione di servizio, il documento dei guanti e una nota con date e chilometri ogni volta che un contractor ti ha spostato tra un campo e l’altro.',
      'Una ricevuta, una fattura, un estratto conto o una foto sul telefono con importo, data, fornitore e oggetto, conservati cinque anni. Se le spese di lavoro di tutto l’anno sommano 300\u00a0$ o meno, non servono prove scritte. Questi 300\u00a0$ sono una soglia diversa da quella che decide se un singolo oggetto si deduce subito o lungo la sua vita.',
    ],
  },
  {
    kind: 'traps',
    h2: 'Quali errori fa chi lavora in fattoria?',
    intro: 'Prima, le spese che i lavoratori stagionali dichiarano ogni anno senza poterle sostenere. Poi i soldi che nessuno ha detto che c’erano.',
    wrong: [
      {
        t: 'Vestiti normali rovinati dal lavoro',
        d: 'Jeans, magliette, una camicia di flanella, un maglione per iniziare alle cinque del mattino. L’ATO valuta l’indumento, non l’intenzione, e i vestiti normali sono privati per quanto in fretta li rovini le macchie di frutta.',
      },
      {
        t: 'Affitto dell’ostello e la cauzione dell’ostello',
        d: 'Dove hai dormito durante la stagione è una spesa di vita, non di lavoro, anche se l’ostello è l’unico alloggio nel raggio di cinquanta chilometri e l’ha organizzato la fattoria.',
      },
      {
        t: 'Cibo e bevande durante la giornata',
        d: 'Il pranzo in una fattoria è come il pranzo ovunque. I pasti diventano deducibili solo se un viaggio richiesto dal datore di lavoro ti tiene lontano da casa per la notte, cosa che la stagione di raccolta di solito non soddisfa.',
      },
      {
        t: 'Il tragitto dall’ostello alla fattoria',
        d: 'È un tragitto casa-lavoro, che tu faccia cinquanta chilometri di strada sterrata o vada a piedi. Si può dedurre solo lo spostamento tra siti di lavoro dopo che la giornata è iniziata.',
      },
      {
        t: 'Arrivare nella regione, prima di tutto',
        d: 'Il volo o il viaggio in auto fino a Bundaberg, Mildura o Tully per cercare lavoro ti porta dove c’è il lavoro, e questo non è un costo per guadagnare il reddito che ne viene.',
      },
    ],
    missed: [
      {
        t: 'La crema solare, il cappello e gli occhiali da sole',
        d: 'La spesa che si dimentica più spesso nel farm work. Quasi nessuno tiene lo scontrino di un flacone da 19\u00a0$ comprato in una stazione di servizio, e in una stagione non è una cifra piccola.',
      },
      {
        t: 'Ogni paio di guanti, uno alla volta',
        d: 'I guanti da raccolta sono un materiale di consumo. Comprarne sei paia in una stagione sono sei acquisti deducibili, non uno, e ognuno si valuta da solo rispetto ai 300\u00a0$.',
      },
      {
        t: 'Gli spostamenti tra campi nello stesso giorno',
        d: 'Comune nelle proprietà grandi e con i contractor che spostano una squadra, e quasi mai dedotto perché non sembra un viaggio. Annota data e chilometri mentre lavori.',
      },
      {
        t: 'Un lavoro in fattoria di tre settimane dimenticato del tutto',
        d: 'Un periodo breve, pagato in fretta da un contractor di labour hire, si lascia fuori facilmente da una dichiarazione, e lasciare fuori un reddito è peggio che perdere una deduzione.',
      },
      {
        t: 'Tasse trattenute in eccesso da un datore non registrato',
        d: 'Se il datore non era registrato correttamente presso l’ATO, la trattenuta può essere stata diversa dal dovuto. Lo verifichiamo caso per caso. La differenza torna quando presenti la dichiarazione, e solo allora.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: 'Cosa dipende da come era organizzata la tua stagione?',
    paras: [
      'Lavoro itinerante o tragitto casa-lavoro è una questione di fatto. Essere mandato tra tre proprietà da un contractor senza una base fissa è diverso dal guidare per undici settimane verso lo stesso frutteto. Decidono quante volte è cambiato il sito, se il lavoro richiedeva lo spostamento e se avevi un posto di lavoro fisso.',
      'La residenza ai fini fiscali dipende dai fatti individuali del tuo anno. Il caso Addy della High Court è lo sfondo, ma il suo effetto varia da persona a persona e non è qualcosa da dare per scontato. Lo valutiamo noi caso per caso e la decisione finale spetta all’ATO.',
      'Il farm work serve anche per un ulteriore visto, ma quella parte è immigrazione, non tasse. Quali settori, codici postali e date contano lo stabilisce il Department of Home Affairs e sono cambiati più di una volta, quindi controlla le indicazioni ufficiali aggiornate o un migration agent registrato prima di contare su un lavoro.',
    ],
  },
]

const FAQS = [
  {
    question: 'Posso davvero dedurre crema solare e cappello?',
    answer: 'Sì, se il lavoro ti mette al sole, e il farm work di solito lo fa. L’ATO accetta la protezione dal sole come spesa di lavoro per chi lavora all’aperto perché l’esposizione viene dal lavoro.\n\nConserva le ricevute e deduci solo la quota usata per lavorare.',
  },
  {
    question: 'Quest’anno ho lavorato in tre fattorie. Sono tre tax return?',
    answer: 'No. Una dichiarazione copre tutto l’anno fiscale dal 1°\u00a0luglio al 30 giugno, non importa quante fattorie, contractor o società di labour hire ti abbiano pagato. Ogni datore comunica all’ATO la tua paga e le tasse trattenute, e tutto finisce in un’unica dichiarazione.\n\nIl rischio di una stagione di lavori brevi è un lavoro dimenticato.',
  },
  {
    question: 'Essere pagati a bin cambia le mie tasse?',
    answer: 'No. La paga a cottimo (piece rate) è salario, che sia calcolata a bin, a secchio, a vassoio o al chilo. Il datore comunica il totale e trattiene le tasse come per una paga oraria.\n\nCambia la tenuta dei documenti, perché una paga che oscilla da un giorno all’altro è più difficile da confrontare dopo con l’income statement.',
  },
  {
    question: 'Posso dedurre la benzina per andare alla fattoria ogni mattina?',
    answer: 'No. Il primo viaggio della giornata, da dove vivi alla prima fattoria, è un normale tragitto casa-lavoro e non è deducibile, per quanto sia lungo.\n\nIl viaggio tra fattorie, campi o capannoni dopo che la giornata di lavoro è iniziata è deducibile, calcolato con il metodo dei centesimi per chilometro o con un logbook.',
  },
  {
    question: 'E se la fattoria non mi ha mai dato le buste paga?',
    answer: 'Di solito non è un problema. La maggior parte dei datori comunica la tua paga all’ATO con Single Touch Payroll, quindi compare come income statement anche se non hai ricevuto una busta paga.\n\nÈ comunque utile annotare quale fattoria, quali date e più o meno quanto ti hanno pagato.',
  },
]

const GUIDES = [
  {
    href: itGuideHref('piece-rates-farm-work-working-holiday'),
    label: 'La paga a cottimo nel farm work e il minimo che la sostiene' + itGuideSuffix('piece-rates-farm-work-working-holiday'),
    desc: 'Come funziona la paga a bin e a cosa deve comunque arrivare.',
  },
  {
    href: itGuideHref('fruit-picking-jobs-working-holiday-australia'),
    label: 'Lavorare nella raccolta della frutta in Australia' + itGuideSuffix('fruit-picking-jobs-working-holiday-australia'),
    desc: 'Regioni, stagioni e cosa controllare prima di accettare il lavoro.',
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
  { href: itGuideHref('tax-residency-working-holiday-makers'), label: 'Residenza fiscale' + itGuideSuffix('tax-residency-working-holiday-makers') },
]

export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'it',
        path: '/it/expenses/farm-work',
        articleHeadline: 'Deduzioni per il farm work in Australia',
        articleDescription: 'Protezione dal sole e spostamenti tra i campi sono deducibili. I tuoi jeans e l’affitto dell’ostello no. Cosa deduce davvero chi lavora in fattoria.',
        inLanguage: 'it',
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
