/**
 * Italian blog data (ADR 013).
 *
 * Guide bodies live in chunks/01.ts ... chunks/19.ts, one file per batch of
 * guides, each exporting `chunk` keyed by the ENGLISH guide slug. This loader
 * merges them. A guide with no entry in any chunk does not exist in Italian:
 * it is not listed anywhere and its URL is a 404 (no English fallback).
 * Format rules for writers: scratchpad blog-format.md.
 */
import type { BlogUIStrings } from '@/app/(site)/blog/BlogClient'
import type { Category } from '@/app/(site)/blog/data'
import { createLocaleBlog, mergeChunks } from '@/lib/locale-blog'
import { localePath } from '@/components/blog/newLocaleDefaults'
import { chunk as c01 } from './chunks/01'
import { chunk as c02 } from './chunks/02'
import { chunk as c03 } from './chunks/03'
import { chunk as c04 } from './chunks/04'
import { chunk as c05 } from './chunks/05'
import { chunk as c06 } from './chunks/06'
import { chunk as c07 } from './chunks/07'
import { chunk as c08 } from './chunks/08'
import { chunk as c09 } from './chunks/09'
import { chunk as c10 } from './chunks/10'
import { chunk as c11 } from './chunks/11'
import { chunk as c12 } from './chunks/12'
import { chunk as c13 } from './chunks/13'
import { chunk as c14 } from './chunks/14'
import { chunk as c15 } from './chunks/15'
import { chunk as c16 } from './chunks/16'
import { chunk as c17 } from './chunks/17'
import { chunk as c18 } from './chunks/18'
import { chunk as c19 } from './chunks/19'

export const itChunks = mergeChunks([
  c01, c02, c03, c04, c05, c06, c07, c08, c09, c10,
  c11, c12, c13, c14, c15, c16, c17, c18, c19,
])

const blog = createLocaleBlog('it', itChunks)

export const hasItalianGuide = blog.hasGuide
export const getItalianGuide = blog.getGuide
export const getItalianGuides = blog.getGuides
export const getItalianGuideSlugs = blog.getSlugs
/** Paths ('/blog/<slug>', '/blog/category/<slug>', '/blog') for IT_PAGES or the sitemap, once reviewed. */
export const getItalianSitemapPaths = blog.getSitemapPaths

// ─── UI STRINGS ────────────────────────────────────────────────────────────
export const blogUI: BlogUIStrings = {
  breadcrumbHome: 'Home',
  breadcrumbBlog: 'Blog',
  blogLabel: 'Blog',
  h1Line1: 'Tasse in Australia per il Working Holiday:',
  h1Line2: 'tax return, TFN, super e ABN',
  description: 'Tax return, superannuation (DASP), TFN e ABN: guide pratiche per chi ha un visto Working Holiday 417 o 462, spiegate in modo semplice.',
  statsArticles: 'Articoli',
  statsCategories: 'Categorie',
  searchPlaceholder: 'Cerca un articolo...',
  clearSearch: 'Cancella la ricerca',
  allArticles: 'Tutti gli articoli',
  noResults: 'Nessun articolo trovato per',
  showingResults: '',
  resultsMatching: 'articoli per',
  matching: 'per',
  tryDifferent: 'Prova con un altro termine o sfoglia tutti gli articoli.',
  noArticlesCategory: 'In questa categoria non ci sono ancora articoli.',
  minRead: 'min di lettura',
  readMore: 'Leggi tutto',
  showing: 'Visualizzati',
  of: 'di',
  article: 'articolo',
  articles: 'articoli',
}

// ─── CATEGORY METADATA ─────────────────────────────────────────────────────
export type ItCategoryMeta = {
  category: Category
  slug: string
  title: string
  description: string
  intro: string
  faq: Array<{ question: string; answer: string }>
  relatedServicePath?: string
  relatedServiceLabel?: string
}

// Category URL slugs stay the English slugs.
const ALL_CATEGORY_META: ItCategoryMeta[] = [
  {
    category: 'TFN',
    slug: 'tfn',
    title: 'TFN in Australia: tutte le guide',
    description: "Come ottenere il TFN gratis, ritardi oltre i 28 giorni, lavorare nell'attesa, numero smarrito e truffe: tutte le guide TFN in un posto solo.",
    intro: "Il Tax File Number (TFN) è il numero di 9 cifre che l'Australian Taxation Office (ATO), il fisco australiano, assegna a chiunque guadagni un reddito in Australia. Con il visto Working Holiday ti serve il TFN prima di iniziare a lavorare: senza, il datore di lavoro deve trattenere il 45% di imposte invece del 15% previsto per i working holiday maker. Queste guide coprono tutto, dalla prima richiesta ai ritardi, dai numeri smarriti al ritorno con un secondo visto.",
    faq: [
      { question: "Serve il TFN per lavorare in Australia con il Working Holiday?", answer: "Sì. Ogni working holiday maker che guadagna un reddito in Australia ha bisogno di un Tax File Number. Se il datore di lavoro non ha il tuo TFN, per legge deve trattenere l'imposta con l'aliquota massima del 45%, invece del 15% previsto per i working holiday maker." },
      { question: "Quanto ci vuole per avere il TFN?", answer: "L'ATO elabora le richieste di TFN entro 28 giorni. Il numero arriva per posta, in una lettera, al tuo indirizzo in Australia. Molti lo ricevono in circa due settimane." },
      { question: "La richiesta del TFN è gratuita?", answer: "Sì, non c'è nessuna tariffa governativa. Quello che costa è il periodo prima che il datore di lavoro abbia il numero: ogni busta paga viene tassata al 45% invece del 15%, e la differenza torna indietro solo con la tax return." },
      { question: "Si può iniziare a lavorare senza TFN?", answer: "Sì, ma il datore di lavoro deve trattenere il 45% finché non gli consegni il TFN. L'imposta in eccesso si può recuperare con la tax return annuale." },
    ],
    relatedServicePath: '/tfn',
    relatedServiceLabel: 'Richiedi il tuo TFN',
  },
  {
    category: 'ABN',
    slug: 'abn',
    title: 'ABN in Australia: le guide per il Working Holiday',
    description: 'Quando serve davvero un ABN, registrazione gratuita, fatture, detrazioni, soglia della GST e le trappole del falso lavoro autonomo.',
    intro: "L'Australian Business Number (ABN) è un numero di 11 cifre che serve quando lavori come sole trader (lavoratore autonomo) o contractor in Australia. Ti serve se un'azienda ti paga su fattura invece di assumerti in busta paga. Queste guide spiegano la registrazione, quando l'ABN è la scelta giusta e come lavorare con un ABN influisce su tasse, super e diritti.",
    faq: [
      { question: "Serve l'ABN ai working holiday maker?", answer: "Ti serve se lavori come contractor o sole trader, cioè se fatturi il tuo lavoro invece di essere in busta paga. La maggior parte dei working holiday maker con un normale contratto da dipendente non ne ha bisogno." },
      { question: "Quanto costa un ABN?", answer: "Registrare un ABN non costa nulla. Il costo è sul fronte fiscale: da una fattura non viene trattenuto niente, quindi tutto l'onere resta a te fino alla tax return, e un ABN aperto quando in realtà eri un dipendente ti fa perdere anche la super e i diritti previsti dall'award." },
      { question: "Che differenza c'è tra TFN e ABN?", answer: "Il TFN è il tuo identificativo fiscale personale, obbligatorio per chiunque lavori. L'ABN serve solo se operi come contractor o sole trader. Molti working holiday maker hanno entrambi." },
      { question: "Si possono avere TFN e ABN insieme?", answer: "Sì. Molti working holiday maker li hanno entrambi: il TFN per il reddito da dipendente, l'ABN per i lavori a fattura." },
    ],
    relatedServicePath: '/abn',
    relatedServiceLabel: 'Registra il tuo ABN',
  },
  {
    category: 'Tax Return',
    slug: 'tax-return',
    title: 'Tax return in Australia: guide per backpacker',
    description: "Come presentare la tax return con il Working Holiday: quanto può tornarti, esempi di rimborso, detrazioni, scadenze e invio dall'estero.",
    intro: "L'anno fiscale australiano va dal 1° luglio al 30 giugno, e ogni working holiday maker che ha guadagnato un reddito in quel periodo deve presentare una tax return. Di solito i backpacker ottengono un rimborso, perché il datore di lavoro ha trattenuto più imposte del dovuto. Queste guide trattano scadenze, detrazioni, cosa fare dopo aver lasciato l'Australia e come gestire i casi complicati.",
    faq: [
      { question: "Quando va presentata la tax return?", answer: "L'anno fiscale australiano finisce il 30 giugno. Devi presentare la tax return tra il 1° luglio e il 31 ottobre dello stesso anno. Se passi da un tax agent, la scadenza può essere prorogata." },
      { question: "I working holiday maker ricevono un rimborso?", answer: "Spesso sì, perché il datore di lavoro può aver trattenuto più imposte di quelle realmente dovute. Ma niente è garantito: dipende dal tuo anno. Se c'è un rimborso, viene pagato sul tuo conto bancario australiano, di solito entro due settimane dall'invio." },
      { question: "Si può presentare la tax return dopo aver lasciato l'Australia?", answer: "Sì. Puoi presentarla da qualsiasi parte del mondo. Noi possiamo gestire tutta la pratica a distanza. Tieni aperto il conto bancario australiano finché il rimborso non è stato pagato." },
      { question: "Cosa può detrarre un working holiday maker?", answer: "Tra le detrazioni più comuni: viaggi di lavoro, attrezzi, divise, scarpe antinfortunistiche, protezione solare per chi lavora all'aperto, uso del telefono per lavoro e compensi del tax agent. Ogni detrazione richiede una prova della spesa e del suo legame con il tuo lavoro." },
    ],
    relatedServicePath: '/tax-return',
    relatedServiceLabel: 'Presenta la tua tax return',
  },
  {
    category: 'Super',
    slug: 'super',
    title: 'Super e DASP in Australia: tutte le guide',
    description: 'Come funziona la super con il Working Holiday, controllare che il datore versi il 12%, ritrovare fondi persi e riavere i soldi con il DASP.',
    intro: "La superannuation (super) è il sistema pensionistico obbligatorio australiano. Il datore di lavoro versa il 12% del tuo stipendio a un fondo super, in aggiunta alla tua paga (aliquota in vigore dal 1° luglio 2026). Quando lasci l'Australia alla fine del Working Holiday, puoi ritirarla con il Departing Australia Superannuation Payment (DASP). Queste guide spiegano come funziona la super, come tenerla sotto controllo e come richiederla.",
    faq: [
      { question: "I working holiday maker hanno diritto alla super?", answer: "Sì. Ogni working holiday maker ha diritto ai contributi di super da parte del datore di lavoro. L'aliquota attuale è il 12% delle tue ordinary time earnings (dal 1° luglio 2026, secondo l'Annual Wage Review della Fair Work Commission), versato in aggiunta alla paga direttamente in un fondo super." },
      { question: "Come si richiede la super quando si lascia l'Australia?", answer: "Con la procedura DASP, disponibile quando il visto è scaduto o è stato annullato e hai lasciato il Paese. Per i working holiday maker il pagamento è tassato al 65%." },
      { question: "Quante tasse vengono trattenute sul prelievo della super?", answer: "L'aliquota DASP per i working holiday maker è il 65% della componente imponibile (taxable component) del saldo super. È più alta del 35% che valeva prima del 2017." },
      { question: "Come si trova una super persa o non reclamata?", answer: "Collegando il tuo TFN al conto tramite il nostro servizio, contattando l'ATO o rivolgendoti a un tax agent che può cercare in tutti i fondi." },
    ],
    relatedServicePath: '/superannuation',
    relatedServiceLabel: 'Richiedi la tua super',
  },
  {
    category: 'Work Rights',
    slug: 'work-rights',
    title: 'Diritti sul lavoro: guide per backpacker',
    description: "I tuoi diritti sono gli stessi dei lavoratori australiani: salario minimo di 26,44 $ AUD, maggiorazioni dell'award, buste paga e recupero gratuito.",
    intro: "In Australia i working holiday maker hanno gli stessi diritti sul lavoro dei cittadini australiani. La Fair Work Ombudsman fa rispettare i salari minimi, le condizioni di lavoro e le tutele previste dagli award di ogni settore. Queste guide spiegano a cosa hai diritto, come leggere la busta paga, come accorgerti di una paga insufficiente e cosa fare se il datore di lavoro non rispetta le regole.",
    faq: [
      { question: "Qual è il salario minimo in Australia?", answer: "Il salario minimo nazionale è di 26,44 $ AUD all'ora per i dipendenti full-time e part-time (dal 1° luglio 2026). I casual ricevono in più una maggiorazione del 25%, per un minimo di 33,05 $ AUD all'ora. La maggior parte dei lavoratori rientra in un award di settore che fissa tariffe più alte." },
      { question: "Spetta una paga maggiorata nei giorni festivi?", answer: "Sì. Se lavori in un giorno festivo hai diritto alle penalty rate, di solito il 225% della tua tariffa ordinaria (il doppio più un quarto). Se non lavori, puoi avere diritto alla tariffa base, a seconda del tipo di contratto." },
      { question: "Cosa fare se il datore di lavoro non paga il dovuto?", answer: "Prima di tutto affronta il tema con calma con il datore di lavoro, portando i tuoi registri. Se non si risolve, il nostro team può aiutarti a procedere nel modo giusto. I working holiday maker hanno le stesse tutele dei lavoratori australiani e il tuo visto è protetto quando presenti un reclamo legittimo." },
      { question: "I casual hanno diritto ai giorni di malattia pagati?", answer: "No. In Australia i casual non hanno diritto ai giorni di malattia pagati. La maggiorazione del 25% sulla tariffa oraria base serve a compensare l'assenza di questi permessi." },
    ],
  },
  {
    category: 'Medicare & Other',
    slug: 'medicare-and-other',
    title: 'Medicare e assicurazione sanitaria: le guide',
    description: 'Diritto a Medicare in base al Paese, esenzione dalla levy del 2%, assicurazione sanitaria e rimborso della GST in aeroporto.',
    intro: "I working holiday maker hanno anche altre domande fiscali e burocratiche, oltre a TFN, ABN, tax return e super. Queste guide trattano l'accesso a Medicare, la Medicare levy e la Medicare levy surcharge, il rimborso della GST sugli acquisti che porti a casa e altri temi utili a chi vive e lavora in Australia da backpacker.",
    faq: [
      { question: "I working holiday maker pagano la Medicare levy?", answer: "No. I working holiday maker non hanno diritto a Medicare e non sono tenuti a pagare la Medicare levy del 2%. Per far valere l'esenzione serve un Medicare Entitlement Statement di Services Australia, che di solito richiede fino a sei settimane." },
      { question: "Si può usare Medicare con il Working Holiday?", answer: "Solo i cittadini dei Paesi con un Reciprocal Health Care Agreement con l'Australia (tra cui Regno Unito, Irlanda, Italia, Belgio, Paesi Bassi, Svezia, Norvegia, Finlandia, Malta, Slovenia e Nuova Zelanda) possono iscriversi a Medicare per una copertura limitata. Tutti gli altri working holiday maker dovrebbero avere un'assicurazione sanitaria privata." },
      { question: "Si può farsi rimborsare la GST sugli acquisti portati a casa?", answer: "Sì. Il Tourist Refund Scheme permette di recuperare il 10% di GST sui beni di valore superiore a 300 $ AUD (per fornitore) acquistati nei 60 giorni prima della partenza e portati fuori dall'Australia. La richiesta si fa in aeroporto, prima del volo." },
      { question: "Serve un'assicurazione sanitaria privata in Australia?", answer: "Nella maggior parte dei casi sì. L'assicurazione sanitaria privata è una condizione di molti visti Working Holiday ed è essenziale per i backpacker non coperti da un Reciprocal Health Care Agreement." },
    ],
    relatedServicePath: '/medicare',
    relatedServiceLabel: 'Controlla il tuo stato Medicare',
  },
]

const listed = new Set<Category>(blog.getListedCategories())

/** Only categories that have at least one Italian guide. */
export const itCategoryMeta: ItCategoryMeta[] = ALL_CATEGORY_META.filter(c => listed.has(c.category)).map(c => ({
  ...c,
  relatedServicePath: c.relatedServicePath ? localePath('it', c.relatedServicePath) : undefined,
}))

export function getItalianCategoryMeta(slug: string): ItCategoryMeta | undefined {
  return itCategoryMeta.find(c => c.slug === slug)
}
