import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

export const metadata: Metadata = {
  title: 'Deduzioni per bar e ristoranti',
  description: 'Cosa possono dedurre camerieri, baristi e cuochi nella tax return australiana: rinnovo RSA, scarpe antiscivolo, divisa da chef e lavaggio.',
  keywords: [
    'hospitality deduzioni fiscali Australia',
    'barista cameriere tax return Australia',
    'RSA deducibile Australia',
    'scarpe antiscivolo deduzione',
    'divisa da chef deducibile',
    'mance tasse Australia',
    'lavorare in un bar working holiday tasse',
    'super casual hospitality',
  ],
  alternates: {
    canonical: '/it/expenses/hospitality',
    languages: {
      'en-AU': '/expenses/hospitality',
      de: '/de/expenses/hospitality',
      ja: '/ja/expenses/hospitality',
      ...newLocaleLanguages('/expenses/hospitality'),
      'x-default': '/expenses/hospitality',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Deduzioni per bar e ristoranti con un visto working holiday' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/expenses/hospitality`,
    siteName: 'Working Holiday Tax',
    title: 'Deduzioni per bar e ristoranti: RSA, scarpe, divisa',
    description: 'Scarpe antiscivolo e divisa da chef sono deducibili. Il completo nero che il locale pretende no. Cosa deduce davvero chi lavora in hospitality.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Deduzioni per bar e ristoranti: RSA, scarpe, divisa',
    description: 'Scarpe antiscivolo e divisa da chef sono deducibili. Il completo nero che il locale pretende no. Cosa deduce davvero chi lavora in hospitality.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'expenses', lang: 'it', detail: 'Hospitality, bar e cucina' })

const UI = {
  ctaLabel: 'Scrivici su WhatsApp',
  ctaSub: 'Rispondiamo in circa un’ora.',
  guaranteeHeading: 'La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa.',
  guaranteeBody: 'Quattro locali, quattro income statement e la super in quattro fondi sono un anno di hospitality normale, e ogni cliente ha un visto 417 o 462. Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.',
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
  { name: 'Hospitality', item: '/it/expenses/hospitality' },
]

const HERO = {
  kicker: 'Deduzioni per bar, caffetterie e cucine',
  h1lead: 'Le tue scarpe antiscivolo sono deducibili.',
  h1accent: 'Il completo nero no.',
  lede: 'La lista è corta, quindi in una dichiarazione hospitality il peso sta di solito dal lato del reddito: più locali, più aliquote trattenute, la super in più fondi.',
}

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: 'Cosa può dedurre chi lavora in un bar, un caffè o una cucina?',
    paras: [
      'Chi lavora in hospitality può dedurre le calzature protettive antiscivolo, l’abbigliamento specifico del mestiere come la divisa da chef e i pantaloni a quadretti, il lavaggio di una divisa obbligatoria con il logo del datore di lavoro, il rinnovo di un RSA (Responsible Service of Alcohol) o di un certificato di Food Safety Supervisor e gli attrezzi da cucina comprati di tasca propria. Tutto il resto dell’armadio è abbigliamento normale.',
      'L’hospitality ti dà poco di esclusivo del mestiere. Stai al chiuso, l’attrezzatura la fornisce il datore di lavoro e i vestiti che chiede un locale di solito li può portare chiunque, ovunque.',
    ],
  },
  {
    kind: 'items',
    h2: 'Le spese che appartengono a questo lavoro',
    intro: 'Per l’abbigliamento c’è un test in più oltre a quelli generali, ed è lì che nascono quasi tutte le contestazioni in hospitality.',
    items: [
      {
        t: 'Scarpe chiuse, protettive e antiscivolo',
        d: 'Deducibili dove ti servono: un pavimento bagnato dietro il bancone, versamenti attorno alla macchina del caffè, piastre calde lungo il passe della cucina. Contano come calzature protettive e non come scarpe normali perché hanno una funzione di sicurezza precisa, di qualsiasi colore siano.',
      },
      {
        t: 'Divisa da chef e pantaloni a quadretti',
        d: 'Abbigliamento specifico del mestiere: ti identifica come appartenente a un mestiere preciso e altrove sembrerebbe assurdo. È una categoria riconosciuta, separata dalla divisa con marchio, e per questo uno chef ha una deduzione per l’abbigliamento e di solito un cameriere no.',
      },
      {
        t: 'Lavare una divisa obbligatoria con il logo',
        d: 'Se il datore di lavoro richiede una divisa con il suo logo o con un disegno davvero distintivo, lavarla è deducibile a 1\u00a0$ a lavaggio per i soli capi da lavoro, o 50 centesimi a lavaggio se la lavi insieme al resto. Oltre 150\u00a0$ di lavaggi nell’anno serve un diario, non una stima.',
      },
      {
        t: 'Rinnovo di un RSA o di un certificato di Food Safety Supervisor',
        d: 'Rinnovare un certificato che già hai, mentre lavori nel ruolo che lo richiede, è deducibile. Il primo no, con la stessa distinzione che l’ATO applica alla prima patente.',
      },
      {
        t: 'Coltelli e attrezzi da cucina che hai comprato tu',
        d: 'Una borsa dei coltelli, i tuoi coltelli da chef, un termometro, una mandolina. Ogni oggetto fino a 300\u00a0$ si deduce per intero nell’anno d’acquisto. Un set comprato insieme per 300\u00a0$ o più è un bene unico, da dedurre lungo la vita utile, anche se ogni pezzo da solo costava meno di 300\u00a0$.',
      },
      {
        t: 'Grembiuli, guanti e protezioni che hai pagato',
        d: 'Guanti resistenti al calore, guanti antitaglio, un grembiule protettivo. Deducibili se ti proteggono da un pericolo del lavoro e il datore non li ha forniti né rimborsati.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: 'Cosa deve esserci dietro una spesa in hospitality?',
    paras: [
      'Gli stessi tre test di sempre: i soldi erano tuoi, nessuno te li ha ridati e sono andati a guadagnare il reddito che dichiari. In un locale significa lo scontrino delle scarpe e della borsa dei coltelli, la policy scritta sulla divisa e un diario dei lavaggi quando i lavaggi si accumulano.',
      'Va bene qualunque documento con importo, data, fornitore e oggetto, e deve durare cinque anni. Un anno di spese per 300\u00a0$ o meno in tutto non richiede prove scritte. Questi 300\u00a0$ sono una soglia diversa da quella che decide se un set di coltelli si deduce subito o lungo la sua vita.',
    ],
  },
  {
    kind: 'traps',
    h2: 'Quali errori fa chi lavora in hospitality?',
    intro: 'La regola sull’abbigliamento fa cadere tutti, perché sembra ingiusta. Le spese dimenticate sono più silenziose e di solito riguardano la paga.',
    wrong: [
      {
        t: 'Il completo nero che il locale richiede',
        d: 'Pantaloni neri semplici, camicia nera semplice, scarpe nere senza logo. L’ATO guarda cos’è l’indumento, e un abito convenzionale è privato qualunque cosa dica il dress code.',
      },
      {
        t: 'Il tuo primo RSA',
        d: 'Il certificato che hai pagato prima di avere il lavoro ti ha reso assumibile, ed è un costo privato. Quando lavori e va rinnovato, il rinnovo è deducibile.',
      },
      {
        t: 'Parrucchiere, cura personale e trucco per lo standard del front of house',
        d: 'La cura personale resta privata anche se il locale ha uno standard scritto.',
      },
      {
        t: 'Un pasto durante il turno o una bevuta dopo la chiusura',
        d: 'I pasti del personale e le bevute di fine turno sono privati, che tu abbia pagato, avuto uno sconto o ricevuto in regalo.',
      },
      {
        t: 'Mance in contanti lasciate fuori dalla dichiarazione',
        d: 'Questo va nella direzione opposta. Le mance che ti danno direttamente sono reddito imponibile anche se nessuno le registra. Le mance in pool e i service charge pagati in busta paga sono già nel tuo income statement, ma il contante lo devi dichiarare tu.',
      },
    ],
    missed: [
      {
        t: 'Il lavaggio di una divisa con il logo, tutto l’anno',
        d: 'Pochi dollari a settimana che quasi nessuno deduce, perché lavare una camicia non sembra una questione fiscale. L’ATO pubblica la tariffa, quindi non c’è niente da stimare.',
      },
      {
        t: 'Le scarpe antiscivolo, perché «i vestiti non si deducono»',
        d: 'Si legge che l’abbigliamento da hospitality non è deducibile, ed è giusto, poi lo si applica alle calzature protettive, ed è sbagliato. Le scarpe protettive sono un’altra categoria e si deducono.',
      },
      {
        t: 'Un secondo o terzo datore che trattiene con l’aliquota sbagliata',
        d: 'Se un locale non ha mai ricevuto la tua Tax File Number Declaration, o non è registrato correttamente presso l’ATO, può trattenere più del dovuto. La differenza si sistema solo con una dichiarazione che mette insieme tutti i datori.',
      },
      {
        t: 'Super in tre fondi diversi',
        d: 'Ogni locale paga il 12% di super in più sulla tua paga dal primo dollaro, senza una soglia minima mensile. Quattro lavori casual possono lasciare quattro conti, ognuno con le sue commissioni, e la maggior parte delle persone ne trova uno solo.',
      },
      {
        t: 'Un locale che ti ha fatto pagare la divisa in modo illegale',
        d: 'Non è una deduzione. Le trattenute sulla paga per divise, lavanderia, rotture o ammanchi di cassa sono quasi sempre illegali secondo il Fair Work Act, quindi sono soldi da riavere, non una spesa da dedurre.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: 'Cosa va valutato e non solo cercato?',
    paras: [
      'Prima di tutto l’abbigliamento. Se un indumento è una divisa obbligatoria dipende da quanto è distintivo e dal fatto che il datore lo richieda. Se una calzatura è protettiva dipende dal pericolo presente nel tuo locale. Di solito una policy scritta sulla divisa e una fotografia risolvono.',
      'Il lato del reddito è dove un parere professionale serve di più. Quanto viene trattenuto e quanto è dovuto dipende dai fatti individuali del tuo anno. Il caso Addy della High Court è lo sfondo, ma il suo effetto varia da persona a persona e non è qualcosa da dare per scontato. Lo valutiamo noi caso per caso e la decisione finale spetta all’ATO.',
    ],
  },
]

const FAQS = [
  {
    question: 'Posso dedurre le mie scarpe e i miei pantaloni neri da lavoro?',
    answer: 'L’abbigliamento nero semplice senza logo non è deducibile, anche se il dress code lo richiede, perché per l’ATO è abbigliamento normale e non una divisa.\n\nLe scarpe chiuse antiscivolo sono diverse. Se ti servono per il pavimento bagnato di un bar o per il passe affollato di una cucina sono calzature protettive e deducibili, di qualsiasi colore siano.',
  },
  {
    question: 'Posso dedurre il mio certificato RSA (Responsible Service of Alcohol)?',
    answer: 'Puoi dedurre il rinnovo di un RSA che già hai mentre lavori in un ruolo che lo richiede. Il primo no, perché per l’ATO qualificarsi è un costo privato, come la prima patente.\n\nUn certificato di Food Safety Supervisor segue la stessa regola.',
  },
  {
    question: 'Le mance sono tassate?',
    answer: 'Sì, tutte. Le mance e i service charge pagati in busta paga, compresi quelli in pool o con sistema tronc, fanno parte del tuo salario, sono già tassati e compaiono nel tuo income statement.\n\nIl contante che ti danno direttamente è tassabile allo stesso modo ma nessuno lo registra, quindi tieni una nota e dichiara il totale.',
  },
  {
    question: 'Lavoro in tre locali. Cambia qualcosa per le tasse?',
    answer: 'Ogni locale è un datore di lavoro separato, con la sua Tax File Number Declaration, le sue trattenute e il suo income statement, e tutti vanno nella stessa dichiarazione.\n\nQuanto ogni locale deve trattenere dipende dai fatti individuali del tuo anno, ed è una cosa che verifichiamo noi.',
  },
  {
    question: 'Ho diritto alla super con un lavoro casual in hospitality?',
    answer: 'Sì. Il datore paga il 12% di super in più sulla tua paga anche per il lavoro casual, dal primo dollaro, senza una soglia minima di guadagno mensile.\n\nOgni locale paga per conto suo, quindi più lavori di solito vogliono dire più di un fondo, da rintracciare prima di lasciare l’Australia.',
  },
]

const GUIDES = [
  {
    href: itGuideHref('hospitality-award-working-holiday-makers'),
    label: 'L’Hospitality Award e quanto dovresti ricevere di paga' + itGuideSuffix('hospitality-award-working-holiday-makers'),
    desc: 'Casual loading, penalty rates e dove i locali sbagliano.',
  },
  {
    href: itGuideHref('uniform-laundry-deductions-illegal-australia'),
    label: 'Costi di divisa e lavanderia tolti dalla paga' + itGuideSuffix('uniform-laundry-deductions-illegal-australia'),
    desc: 'Quando una trattenuta sulla paga è illegale e come riavere i soldi.',
  },
  {
    href: itGuideHref('tax-deductions-working-holiday-makers'),
    label: 'Le deduzioni per i working holiday maker: la lista completa' + itGuideSuffix('tax-deductions-working-holiday-makers'),
    desc: 'Ogni categoria, con ciò che l’ATO respinge e perché.',
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
        path: '/it/expenses/hospitality',
        articleHeadline: 'Deduzioni per bar e ristoranti: RSA, scarpe, divisa',
        articleDescription: 'Scarpe antiscivolo e divisa da chef sono deducibili. Il completo nero che il locale pretende no. Cosa deduce davvero chi lavora in hospitality.',
        inLanguage: 'it',
        photoKey: 'expenses/hospitality',
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
