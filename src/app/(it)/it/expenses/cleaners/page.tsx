import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/wht/ExpensesBlocks'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

export const metadata: Metadata = {
  title: 'Deduzioni per chi fa le pulizie',
  description: 'Cosa possono dedurre gli addetti alle pulizie nella tax return australiana: attrezzatura, prodotti, lavaggio della divisa e viaggi tra lavori.',
  keywords: [
    'pulizie deduzioni fiscali Australia',
    'cleaner tax return Australia',
    'lavaggio divisa deduzione ATO',
    'cleaner ABN working holiday',
    'spostamenti tra clienti deduzione',
    'GST cleaner sole trader',
    'visto 417 pulizie tasse',
    'end of lease cleaning tasse',
  ],
  alternates: {
    canonical: '/it/expenses/cleaners',
    languages: {
      'en-AU': '/expenses/cleaners',
      de: '/de/expenses/cleaners',
      ja: '/ja/expenses/cleaners',
      ...newLocaleLanguages('/expenses/cleaners'),
      'x-default': '/expenses/cleaners',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Deduzioni per chi fa le pulizie con un visto working holiday' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/expenses/cleaners`,
    siteName: 'Working Holiday Tax',
    title: 'Deduzioni per le pulizie in Australia: attrezzatura, viaggi',
    description: 'Il viaggio tra una casa e l’altra è di solito la deduzione più grossa della dichiarazione di chi fa le pulizie, e quella che quasi nessuno richiede.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Deduzioni per le pulizie in Australia: attrezzatura, viaggi',
    description: 'Il viaggio tra una casa e l’altra è di solito la deduzione più grossa della dichiarazione di chi fa le pulizie, e quella che quasi nessuno richiede.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'expenses', lang: 'it', detail: 'Lavoro nelle pulizie' })

const UI = {
  ctaLabel: 'Scrivici su WhatsApp',
  ctaSub: 'Rispondiamo in circa un’ora.',
  guaranteeHeading: 'La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa.',
  guaranteeBody: 'Le dichiarazioni di chi fa le pulizie arrivano sulla nostra scrivania ogni settimana, e ognuna appartiene a qualcuno con un visto 417 o 462. Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.',
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
  { name: 'Pulizie', item: '/it/expenses/cleaners' },
]

const HERO = {
  kicker: 'Deduzioni per le pulizie, case e uffici',
  h1lead: 'Il viaggio tra una casa e l’altra è la deduzione.',
  h1accent: 'Quasi nessuno la richiede.',
  lede: 'Prodotti chimici, guanti e lavaggio della divisa alla tariffa dell’ATO sono nella lista anche loro.',
}

const SECTIONS: Section[] = [
  {
    kind: 'answer',
    h2: 'Cosa può dedurre chi fa le pulizie?',
    paras: [
      'Chi fa le pulizie può dedurre l’attrezzatura e i prodotti comprati di tasca propria, le protezioni come guanti, grembiule o scarponi con punta d’acciaio, il lavaggio di una divisa obbligatoria o di abbigliamento protettivo e il viaggio da un lavoro di pulizie al successivo nella stessa giornata. Quello che fornisce o rimborsa un cliente o un datore di lavoro è escluso.',
      'Tre case in un giorno vogliono dire due tratti di viaggio deducibili, e in un anno di solito è la cifra più grande della dichiarazione.',
    ],
  },
  {
    kind: 'items',
    h2: 'Le spese che appartengono a questo lavoro',
    intro: 'La maggior parte dell’attrezzatura per le pulizie costa meno di 300\u00a0$, quindi si deduce per intero nell’anno d’acquisto invece di essere spalmata nel tempo.',
    items: [
      {
        t: 'Viaggi tra un lavoro di pulizie e l’altro',
        d: 'Il tragitto da una casa o un ufficio al successivo, una volta iniziata la giornata, è un viaggio tra posti di lavoro e non un tragitto casa-lavoro, ed è deducibile. Usa il metodo dei centesimi per chilometro o un logbook.',
      },
      {
        t: 'Attrezzatura e prodotti per le pulizie',
        d: 'Mocio, secchi, raschietti, panni, prodotti chimici e materiali di consumo che compri tu. Ogni oggetto da 300\u00a0$ o meno si deduce per intero nell’anno d’acquisto. Un kit di partenza comprato insieme per 300\u00a0$ o più è un bene unico, da dedurre lungo la sua vita, anche se ogni pezzo da solo costava meno della soglia.',
      },
      {
        t: 'Attrezzatura più grande, da 300\u00a0$ o più',
        d: 'Un aspirapolvere professionale, una lucidatrice per pavimenti, un’idropulitrice. Restano deducibili, distribuiti lungo la vita utile dell’oggetto.',
      },
      {
        t: 'Protezioni',
        d: 'Guanti, grembiule, occhiali di sicurezza o visiera per lavori con prodotti chimici forti o polvere, scarponi con punta d’acciaio per cantieri e lavoro commerciale. Valgono perché ti proteggono da un pericolo del lavoro.',
      },
      {
        t: 'Lavare l’abbigliamento da lavoro deducibile',
        d: 'Lavare una divisa obbligatoria o un vero abbigliamento protettivo si deduce alla tariffa dell’ATO: 1\u00a0$ a lavaggio per i soli capi da lavoro, o 50 centesimi a lavaggio se li lavi insieme al resto. Oltre 150\u00a0$ di lavaggi nell’anno tieni un diario invece di una stima.',
      },
      {
        t: 'La quota di lavoro del telefono',
        d: 'Reale per chi riceve prenotazioni, usa un’app o scrive ai clienti per chiavi e accessi. Deduci la percentuale di lavoro in modo ragionevole, non l’intero piano.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: 'Cosa deve conservare chi fa le pulizie?',
    paras: [
      'Tre test dietro ogni spesa: l’hai pagata tu, nessuno te l’ha rimborsata ed è stata fatta per guadagnare il reddito che dichiari. Per chi fa le pulizie significa le ricevute di prodotti e attrezzatura, e un registro di date, indirizzi e chilometri dietro i viaggi.',
      'Una ricevuta, una fattura, un estratto conto o una foto sul telefono con importo, data, fornitore e oggetto, conservati cinque anni. Sotto i 300\u00a0$ di spese di lavoro in tutto l’anno non servono prove scritte. Questi 300\u00a0$ sono una soglia diversa da quella che decide come si deduce un singolo aspirapolvere.',
    ],
  },
  {
    kind: 'tables',
    h2: 'Come si calcolano le spese per l’auto?',
    intro: 'Due metodi, uno per auto all’anno. Per chi fa le pulizie contano solo i tratti tra un lavoro e l’altro, mai il viaggio da casa alla prima casa.',
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
    note: 'Tre o quattro indirizzi al giorno superano i 5.000 chilometri più in fretta di quanto pensi la maggior parte di chi fa le pulizie, e oltre quel punto di solito vince il logbook, perché include carburante, assicurazione, tassa di immatricolazione (rego), tagliandi, ammortamento e interessi del prestito.',
  },
  {
    kind: 'traps',
    h2: 'Quali errori fa chi fa le pulizie?',
    intro: 'Le spese sbagliate si concentrano su abbigliamento e primo viaggio della giornata. Quelle dimenticate sono quasi tutte viaggi.',
    wrong: [
      {
        t: 'Pantaloni neri semplici e una polo semplice',
        d: 'Anche se un cliente o un’agenzia insiste su un colore, l’abbigliamento convenzionale è privato. Il fatto che la candeggina lo rovini non lo rende deducibile.',
      },
      {
        t: 'Il primo e l’ultimo viaggio della giornata',
        d: 'Da casa al primo lavoro, e dall’ultimo lavoro a casa, sono normali tragitti casa-lavoro. Si possono dedurre solo i tratti in mezzo, a meno che tu rientri nell’eccezione dell’attrezzatura ingombrante.',
      },
      {
        t: 'Prodotti e attrezzatura forniti dal cliente',
        d: 'Se in casa tengono i prodotti sotto il lavandino, o l’azienda ti dà l’attrezzatura, non c’è nessun costo tuo da dedurre. Vale lo stesso per tutto ciò che ti è stato rimborsato.',
      },
      {
        t: 'Considerare l’ABN un permesso per dedurre tutto',
        d: 'Avere un ABN non trasforma le spese private in spese d’impresa. Telefono, auto e vestiti si ripartiscono comunque.',
      },
      {
        t: 'Pensare che i lavori in contanti non vadano dichiarati',
        d: 'Il reddito da pulizie è reddito sia che arrivi con un bonifico, con il pagamento di un’app o in una busta.',
      },
    ],
    missed: [
      {
        t: 'I viaggi tra un lavoro e l’altro',
        d: 'Chi fa le pulizie lavora in tre o quattro indirizzi al giorno e non deduce niente della guida, perché non sembra un viaggio di lavoro. Annota data, indirizzi e chilometri mentre lavori.',
      },
      {
        t: 'Ogni flacone e ogni panno, un acquisto alla volta',
        d: 'I materiali di consumo si comprano di continuo e quasi mai si fa lo scontrino. Basta una foto di ogni scontrino in un album del telefono.',
      },
      {
        t: 'Il lavaggio, a una tariffa pubblicata',
        d: 'Lavare l’abbigliamento protettivo e una divisa obbligatoria è deducibile a 1\u00a0$ o 50 centesimi a lavaggio, e quasi nessuno sa che la tariffa esiste.',
      },
      {
        t: 'Attrezzatura comprata mentre ti organizzavi',
        d: 'Attrezzatura e prodotti comprati nel periodo in cui hai registrato un ABN e hai cominciato a cercare clienti in genere si possono dedurre, anche se la prima fattura è arrivata dopo. Un lungo intervallo tra l’acquisto e il primo lavoro indebolisce la cosa, quindi tieni le date.',
      },
      {
        t: 'Settimane trattenute con l’aliquota sbagliata da un’impresa di pulizie',
        d: 'Se un’azienda non ha mai ricevuto la tua Tax File Number Declaration, o non è registrata correttamente presso l’ATO, può essere stato trattenuto più del dovuto. Torna con la dichiarazione e non prima.',
      },
    ],
  },
  {
    kind: 'answer',
    h2: 'Cosa cambia a seconda di per chi pulisci?',
    paras: [
      'Lavoratore autonomo o dipendente è il primo bivio. Case private, lavori di end of lease e prenotazioni con app tipo Airtasker sono reddito con ABN: decidi tu il prezzo, fai la fattura, non viene trattenuto niente e non viene pagata la super.',
      'Se un’impresa di pulizie ti assegna siti e turni, è lavoro dipendente con un TFN, con le tasse trattenute e la super in più.',
      'Un’azienda che ha deciso il tuo roster, controllato il tuo lavoro e fornito i prodotti, poi ti ha chiesto di prendere un ABN, può essere un datore di lavoro con l’etichetta del contractor.',
      'Per un lavoratore autonomo la GST diventa obbligatoria solo quando il fatturato da pulizie supera 75.000\u00a0$ in un anno, soglia che le pulizie part time raramente sfiorano.',
      'La residenza ai fini fiscali dipende dai fatti individuali del tuo anno. Il caso Addy della High Court è lo sfondo, ma il suo effetto varia da persona a persona e non è qualcosa da dare per scontato. Lo valutiamo noi caso per caso e la decisione finale spetta all’ATO.',
    ],
  },
]

const FAQS = [
  {
    question: 'Posso dedurre il viaggio tra un lavoro di pulizie e l’altro?',
    answer: 'Sì. Spostarsi da un lavoro di pulizie al successivo nella stessa giornata è un viaggio tra posti di lavoro e non un tragitto casa-lavoro, ed è deducibile con il metodo dei centesimi per chilometro o con un logbook.\n\nIl primo viaggio da casa e l’ultimo verso casa no, a meno che tu porti attrezzatura ingombrante che non si può custodire in sicurezza nei siti.',
  },
  {
    question: 'Quali attrezzature e prodotti per le pulizie posso dedurre?',
    answer: 'Tutto ciò che hai comprato tu e non ti è stato rimborsato: mocio, secchi, raschietti, panni, prodotti chimici e materiali di consumo.\n\nGli oggetti da 300\u00a0$ o meno ciascuno si deducono per intero nell’anno in cui li compri. Un aspirapolvere professionale o una lucidatrice sopra i 300\u00a0$ si deducono lungo la vita utile.',
  },
  {
    question: 'Posso dedurre la divisa e il costo di lavarla?',
    answer: 'Puoi dedurre una divisa obbligatoria che il datore di lavoro o il cliente non ti fornisce, e le protezioni con una vera funzione di sicurezza come guanti, grembiule o scarponi con punta d’acciaio. Pantaloni neri semplici e una polo semplice no.\n\nLavare l’abbigliamento da lavoro deducibile si deduce a 1\u00a0$ a lavaggio per i soli capi da lavoro, o 50 centesimi a lavaggio insieme ai vestiti di tutti i giorni, con un diario quando le spese superano 150\u00a0$ nell’anno.',
  },
  {
    question: 'Devo registrarmi per la GST se faccio le pulizie con un ABN?',
    answer: 'Solo quando il fatturato del lavoro di pulizie supera 75.000\u00a0$ in un anno. È la soglia generale per i lavoratori autonomi, non una regola delle pulizie, e le pulizie part time raramente ci arrivano vicino. Sotto la soglia fatturi senza riga GST.',
  },
  {
    question: 'Sono un lavoratore autonomo o un dipendente?',
    answer: 'Guarda chi controlla il lavoro, non come ti chiamano le carte. Se decidi tu il prezzo, scegli tu quali lavori prendere e potresti mandare qualcun altro, è lavoro autonomo con un ABN.\n\nSe un’altra impresa decide il tuo roster, ti controlla e fornisce i prodotti, è lavoro dipendente comunque sia etichettato il contratto, con tasse e super dovute.\n\nMolte persone che fanno le pulizie sono entrambe le cose nello stesso anno.',
  },
]

const GUIDES = [
  {
    href: itGuideHref('abn-deductions-business-expenses'),
    label: 'Spese d’impresa quando lavori con un ABN' + itGuideSuffix('abn-deductions-business-expenses'),
    desc: 'Cosa può dedurre un lavoratore autonomo e dove sta il confine.',
  },
  {
    href: itGuideHref('tools-equipment-under-300-instant-deduction-whv'),
    label: 'La deduzione immediata dei 300\u00a0$ per attrezzi e attrezzatura' + itGuideSuffix('tools-equipment-under-300-instant-deduction-whv'),
    desc: 'Perché ogni oggetto si valuta da solo e cosa cambia con un set.',
  },
  {
    href: itGuideHref('tax-deductions-working-holiday-makers'),
    label: 'Le deduzioni per i working holiday maker: la lista completa' + itGuideSuffix('tax-deductions-working-holiday-makers'),
    desc: 'Ogni categoria, con ciò che l’ATO respinge e perché.',
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
        path: '/it/expenses/cleaners',
        articleHeadline: 'Deduzioni per le pulizie in Australia: attrezzatura, viaggi',
        articleDescription: 'Il viaggio tra una casa e l’altra è di solito la deduzione più grossa della dichiarazione di chi fa le pulizie, e quella che quasi nessuno richiede.',
        inLanguage: 'it',
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
