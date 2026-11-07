import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { Compare, LinkRows, blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, PlainRows } from '@/components/wht/CoreBlocks'
import { Accordion } from '@/components/ui/Accordion'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'
import { AGENT_TPB } from '@/lib/agent'

// ─── METADATA ───────────────────────────────────────────────────────────
// Pagina principale per chi cerca in italiano "dichiarazione dei redditi
// Australia" o "tax return Australia". Scritta dai fatti del sito (pagina
// inglese tax-return, costanti, guide del blog), non tradotta riga per riga.
// Nessuna affermazione sul fisco italiano: la dichiarazione italiana e' una
// questione separata, da chiedere all'Agenzia delle Entrate.
export const metadata: Metadata = {
  // Il layout aggiunge " | Working Holiday Tax", quindi il titolo resta corto.
  title: { absolute: 'Dichiarazione dei redditi Australia: tax return 417 e 462' },
  description:
    'Tax return in Australia con il visto working holiday 417 o 462: chi deve farla, quanto costa e come funziona. Senza payslip e senza myGov.',
  keywords: [
    'dichiarazione dei redditi Australia',
    'tax return Australia',
    'tax return Australia italiani',
    'tax return working holiday',
    'tax return visto 417',
    'tax return visto 462',
    'tax return Australia dall’Italia',
    'tax return Australia senza payslip',
    'quanto costa la tax return Australia',
    'ATO tax return working holiday',
    'devo fare la tax return Australia',
    'tax return dopo il rientro in Italia',
    'tax return prima di lasciare l’Australia',
  ],
  // Solo canonical, nessun hreflang: /it/tax-return è la gemella italiana della
  // pagina inglese /tax-return e porta i tag hreflang. Questa pagina non ne ha.
  alternates: {
    canonical: `${SITE_URL}/it/dichiarazione-redditi-australia`,
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tax-return.png`, width: 1200, height: 630, alt: 'Tax return australiana per chi ha un visto working holiday 417 o 462' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/dichiarazione-redditi-australia`,
    siteName: 'Working Holiday Tax',
    title: 'Dichiarazione dei redditi in Australia (visto 417 e 462)',
    description:
      'Leggiamo i dati ATO e prepariamo la tax return, tu la firmi e, dopo la revisione e l’approvazione di un agente fiscale registrato, viene presentata all’ATO.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tax-return.png`],
    card: 'summary_large_image',
    title: 'Dichiarazione dei redditi in Australia (visto 417 e 462)',
    description: 'Passaporto, dati bancari, niente payslip. La firmi tu, poi viene presentata all’ATO.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** Perché esiste un rimborso. Ogni voce è un meccanismo già descritto sul sito inglese. */
const REFUND_SOURCES = [
  {
    label: 'Settimane tassate al 45% prima che arrivasse il TFN',
    body: 'Se il datore di lavoro non ha il tuo TFN, e nemmeno la dichiarazione che l’hai già richiesto, può trattenere molto più del dovuto. Ogni busta paga di quel periodo ha avuto una trattenuta troppo alta, e quella differenza si sistema solo con una tax return presentata. Per esempio, su 1.000 $ di paga settimanale si trattengono 450 $ al 45% invece di 150 $ al 15%: 300 $ in più ogni settimana.',
  },
  {
    label: 'Un secondo lavoro senza la sua dichiarazione',
    body: 'Ogni datore di lavoro vuole la propria Tax File Number Declaration. Un secondo lavoro partito senza questa dichiarazione trattiene il 45% finché nessuno se ne accorge, spesso per mesi.',
  },
  {
    label: 'Un datore di lavoro non registrato per i working holiday maker',
    body: 'L’aliquota del 15% richiede che il datore di lavoro sia registrato presso l’ATO come datore di lavoro di working holiday maker. Se non lo era, doveva trattenere con l’aliquota dei non residenti, che parte dal 30%. Lo verifichiamo caso per caso.',
  },
  {
    label: 'La Medicare levy, dopo i primi mesi',
    body: 'Con il passaporto italiano hai accesso a Medicare per i primi 6 mesi al massimo, grazie all’accordo sanitario tra Italia e Australia, e per quel periodo di solito la levy del 2% si paga. Per il resto dell’anno la situazione può cambiare: lo verifichiamo noi come parte della preparazione.',
  },
  {
    label: 'Spese di lavoro che nessuno ha dedotto',
    body: 'Scarpe, divise, attrezzi, licenze e spostamenti tra un posto di lavoro e l’altro possono ridurre il reddito imponibile, se legati al lavoro che hai fatto. All’aliquota del 15%, ogni 100 $ di deduzioni legittime riduce l’imposta di 15 $.',
  },
]

/** Le tre cose che servono da parte tua, e niente altro. */
const NEEDED = [
  {
    label: 'Passaporto e visto',
    body: 'Quale passaporto hai e con quale subclass eri in Australia (417 o 462).',
  },
  {
    label: 'Un conto bancario australiano',
    body: 'L’ATO accredita i rimborsi solo su un conto australiano. Se il tuo è già chiuso, dillo subito.',
  },
  {
    label: 'Più o meno dove e quando hai lavorato',
    body: 'Una città, il tipo di lavoro, i mesi approssimativi. Confrontiamo tutto con i dati dell’ATO e completiamo il resto noi.',
  },
]

/**
 * Le cifre chiave, con la data da cui valgono. Fonti: ATO (aliquote, 45% senza
 * TFN, super, DASP, scadenza) e Services Australia (Medicare per chi viene
 * dall'Italia: copertura fino a 6 mesi o alla scadenza del visto, se prima).
 * Questa pagina è la guida completa; i passaggi del servizio sono su /it/tax-return.
 */
const KEY_FIGURES = [
  {
    label: 'Dal 1° luglio al 30 giugno: l’anno fiscale',
    body: 'L’anno fiscale australiano non coincide con quello solare. La tax return 2025-26 copre il lavoro dal 1° luglio 2025 al 30 giugno 2026, e il periodo normale per presentarla va dal 1° luglio al 31 ottobre 2026 (ATO).',
  },
  {
    label: '45.001 $: la soglia dell’obbligo',
    body: 'Con il visto 417 o 462, se hai guadagnato solo stipendi e il reddito imponibile dell’anno è inferiore a 45.001 $, l’ATO non chiede né la tax return né il non-lodgment advice. Serve comunque per dedurre spese o per recuperare una trattenuta in eccesso (ATO).',
  },
  {
    label: '15%: l’aliquota dei working holiday maker',
    body: 'Con il visto 417 o 462 paghi il 15% sui primi 45.000 $ di reddito, il 30% da 45.001 a 135.000 $, il 37% da 135.001 a 190.000 $ e il 45% oltre, senza soglia esente. Aliquote del 2025-26, invariate per il 2026-27 (ATO).',
  },
  {
    label: '45%: la trattenuta senza TFN',
    body: 'Se il datore di lavoro non ha né il tuo TFN né la dichiarazione che l’hai richiesto, o se dopo 28 giorni il TFN non c’è ancora, trattiene il 45% invece del 15%. La differenza torna solo con una tax return presentata, e l’importo lo stabilisce l’ATO. Fonte: ATO.',
  },
  {
    label: '31 ottobre: la scadenza',
    body: 'Per l’anno fiscale dal 1° luglio 2025 al 30 giugno 2026 la scadenza per chi la presenta da solo era il 31 ottobre 2026, ed è passata. Si può ancora presentare in ritardo. La proroga dei tax agent vale solo per chi era già nel loro elenco prima del 31 ottobre. Fonte: ATO.',
  },
  {
    label: '2%: la Medicare levy, in base al passaporto',
    body: 'Con il passaporto italiano hai accesso a Medicare per i primi 6 mesi dall’ingresso al massimo, o fino alla scadenza del visto se arriva prima (Services Australia): per quel periodo di solito la levy si paga. Germania, Giappone, Francia e Spagna invece non hanno l’accordo sanitario con l’Australia, e chi viene da lì di solito può chiedere l’esenzione.',
  },
  {
    label: '12%: la super versata dal datore di lavoro',
    body: 'In vigore dal 1° luglio 2025 e invariata per il 2026-27, in aggiunta alla paga. Dal 1° luglio 2026 la maggior parte dei datori di lavoro deve versarla entro pochi giorni da ogni giorno di paga (ATO).',
  },
  {
    label: '65%: la trattenuta sul DASP',
    body: 'Quando richiedi la super dopo la partenza, per chi ha avuto un visto 417 o 462 l’ATO trattiene il 65% della componente imponibile del saldo (taxable component, sia taxed sia untaxed). La super non passa dalla tax return. Fonte: ATO.',
  },
]

const RULES = [
  {
    label: 'Il rimborso va solo su un conto australiano',
    body: 'La super (DASP) può essere pagata su un conto estero. Il rimborso delle tasse no. Se stai per chiudere il conto australiano, aspetta che il rimborso sia arrivato, oppure dillo a noi prima.',
  },
  {
    label: 'Gli anni passati si possono ancora presentare',
    body: 'Un anno fiscale per cui non hai mai presentato la tax return non scade in silenzio. Ogni anno è una dichiarazione a sé, con il suo eventuale rimborso, e le facciamo una dopo l’altra, partendo dalla più vecchia.',
  },
]

const NOT_COVERED = [
  {
    label: 'La dichiarazione dei redditi italiana',
    body: 'Ci occupiamo solo di tasse australiane. Se hai dubbi sulla tua dichiarazione in Italia, chiedi all’Agenzia delle Entrate.',
  },
  {
    label: 'La parte fiscale italiana in generale',
    body: 'Non diamo indicazioni su come i redditi australiani vengano trattati in Italia. È una questione a parte, e va chiarita con l’Agenzia delle Entrate.',
  },
  {
    label: 'Nessuna promessa sul rimborso',
    body: 'Se ci sia un rimborso e di quanto lo decide l’ATO, in base ai tuoi dati. Prima che la tax return venga presentata ti diciamo che cosa aspettarti.',
  },
]

// Le risposte lunghe hanno una riga vuota, e l’Accordion rende un <p> per
// paragrafo. faqLd usa il testo grezzo, quindi lo schema resta identico.
const FAQS = [
  {
    question: 'Che cos’è la tax return e perché dovrei farla?',
    answer:
      'La tax return è la dichiarazione dei redditi australiana. Durante l’anno il datore di lavoro trattiene l’imposta dalla tua paga: con il visto 417 o 462 il 15% sui primi 45.000 $ di reddito. A fine anno fiscale, la tax return confronta quello che è stato trattenuto con quello che dovevi davvero, e la differenza si chiama rimborso.\n\nL’anno fiscale australiano va dal 1°\u00a0luglio al 30 giugno, non da gennaio a dicembre. Ogni anno fiscale ha la sua dichiarazione, e se sia obbligatoria dipende dal tuo reddito: te lo spieghiamo nella domanda qui sotto.',
  },
  {
    question: 'Devo fare la tax return se ho lavorato pochi mesi o guadagnato poco?',
    answer:
      'Non sempre. Per l’ATO non sei obbligato se tutto il tuo reddito era stipendio da working holiday maker e il reddito imponibile dell’anno è inferiore a 45.001 $. Con un reddito da ABN l’esonero non vale.\n\nLa tax return serve comunque se vuoi dedurre delle spese, e vale la pena verificarla se una parte della paga è stata trattenuta al 45% senza TFN, perché solo una tax return presentata sistema la differenza.',
  },
  {
    question: 'Quanto posso recuperare con la tax return?',
    answer:
      'Nessuno può dirlo prima di aver letto il tuo record ATO. Il rimborso è la differenza tra l’imposta trattenuta e quella dovuta, quindi dipende da eventuali settimane al 45% senza TFN, dalla Medicare levy e da quello che il tuo lavoro ti permette di dedurre.\n\nIl calcolatore del sito dà una stima indicativa sui tuoi numeri, e l’importo finale lo stabilisce l’ATO.',
  },
  {
    question: 'Tax back e tax return sono la stessa cosa?',
    answer:
      'In pratica sì. Tax back è il nome che molti usano per il rimborso che arriva dopo aver presentato la tax return, cioè la dichiarazione dei redditi australiana. Il rimborso però è solo uno dei possibili esiti: a volte il saldo è zero, a volte c’è qualcosa da pagare.',
  },
  {
    question: 'Posso presentare la tax return prima di lasciare l’Australia?',
    answer:
      'Solo in un caso. Se lasci l’Australia per sempre prima del 30 giugno e da lì in poi non avrai altri redditi australiani, a parte interessi, dividendi o royalty, l’ATO accetta una dichiarazione anticipata.\n\nSi presenta su modulo cartaceo e l’ATO indica circa 50 giorni lavorativi per elaborarla. Negli altri casi la tax return si presenta dopo il 30 giugno, da dove sei. Se stai per partire, scrivicelo e ti diciamo in quale caso sei.',
  },
  {
    question: 'Quanto ci mette ad arrivare il rimborso?',
    answer:
      'Se c’è un rimborso, l’ATO di solito lo paga circa 14 giorni lavorativi dopo la presentazione, sul conto bancario australiano indicato nella dichiarazione. Se l’ATO chiede chiarimenti, i tempi si allungano.',
  },
  {
    question: 'Un agente fiscale registrato controlla la mia tax return?',
    answer:
      'Sì. Working Holiday Tax opera sotto la supervisione di un agente fiscale registrato, e ogni tax return viene rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.',
  },
  {
    question: 'La tax return australiana sostituisce la mia dichiarazione dei redditi italiana?',
    answer:
      'No. Sono due questioni separate. Noi ci occupiamo solo della tax return australiana, cioè delle tasse pagate in Australia.\n\nPer la tua dichiarazione in Italia e per come considerare i redditi australiani, chiedi all’Agenzia delle Entrate: non possiamo darti indicazioni sul fisco italiano.',
  },
  {
    question: 'Quanto costa?',
    answer:
      'La tariffa è di 220\u00a0$\u00a0AUD (GST inclusa) se lavori solo con il TFN, e di 385\u00a0$\u00a0AUD (GST inclusa) se hai anche un ABN. Lo concordiamo con te su WhatsApp prima di iniziare qualsiasi lavoro.\n\nSe il rimborso è inferiore alla tariffa, ti restituiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa. La garanzia vale solo per le dichiarazioni con reddito TFN.',
  },
  {
    question: 'Entro quando devo presentare la tax return?',
    answer:
      'Se la presenti da solo, entro il 31 ottobre dopo la fine dell’anno fiscale. Quella del 2025-26 aveva quindi scadenza il 31 ottobre 2026, che è passata. Un anno oltre la scadenza è in ritardo, non perso, e si può ancora presentare.\n\nLa proroga concessa ai tax agent vale solo se eri già nell’elenco di un agente prima del 31 ottobre: chi arriva adesso presenta una dichiarazione in ritardo, che resta possibile.',
  },
  {
    question: 'Servono le payslip (buste paga)?',
    answer:
      'No. Ogni datore di lavoro che ti ha pagato tramite payroll ha dichiarato un income statement all’ATO, ed è da quel record che si costruisce la tax return. Payslip perse e datori di lavoro che hanno chiuso sono un punto di partenza normale.\n\nL’unica cosa che vale la pena cercare sono le ricevute delle spese di lavoro. Se non le hai, descrivici il lavoro e ti diciamo che cosa si può dedurre anche senza.',
  },
  {
    question: 'Posso farla dopo il rientro in Italia?',
    answer:
      'Sì, e molte delle tax return che prepariamo sono di persone già rientrate. Questionario, firma e presentazione si fanno online.\n\nL’unica cosa che non viaggia è il rimborso: l’ATO può pagarlo solo su un conto bancario australiano, mentre la super (DASP) può essere pagata anche all’estero. Se il tuo conto australiano è già chiuso, scrivicelo nel primo messaggio.',
  },
  {
    question: 'Mi serve un account myGov?',
    answer:
      'No. Non dobbiamo entrare nel tuo myGov, quindi non ti chiediamo mai la password. Se qualcuno ti scrive chiedendo quei dati a nome nostro, non siamo noi.',
  },
  {
    question: 'Che differenza c’è tra tax return e super (DASP)?',
    answer:
      'Sono due pagamenti diversi. Il rimborso della tax return è l’imposta trattenuta in eccesso sulla tua paga, e lo paga l’ATO dopo la presentazione. La super è la contribuzione che il datore di lavoro ha versato in aggiunta alla paga, e la rilascia il tuo fondo quando richiedi il DASP.\n\nIl DASP si richiede dopo aver lasciato l’Australia, quando il visto working holiday è terminato. Non va indicato nella tax return, e viene tassato al 65% se hai avuto un visto 417 o 462.',
  },
  {
    question: 'Posso fare la tax return di anni passati, anche dopo 2 o 3 anni?',
    answer:
      'Si può ancora fare. Ogni anno fiscale è a sé, con la sua dichiarazione e il suo eventuale rimborso, e dal record ATO vediamo quali anni sono ancora aperti.\n\nSe alla fine ci sia un rimborso lo decide l’ATO. Prima che venga presentata ti diciamo che cosa aspettarti.',
  },
  {
    question: 'E se alla fine risulta che devo dei soldi all’ATO?',
    answer:
      'Capita, soprattutto quando un reddito è stato fatturato con un ABN e non è stato trattenuto niente.\n\nVedi l’importo prima che venga presentato qualsiasi documento, insieme alla spiegazione di come ci si è arrivati e alle modalità di pagamento previste dall’ATO. Senza la tua firma non parte niente.',
  },
]

const GUIDES = [
  {
    href: itGuideHref('how-to-lodge-tax-return-from-overseas'),
    title: 'Presentarla dopo aver lasciato l’Australia' + itGuideSuffix('how-to-lodge-tax-return-from-overseas'),
    desc: 'Che cosa funziona ancora da casa, e la regola del conto bancario che molti sottovalutano.',
  },
  {
    href: itGuideHref('tax-residency-working-holiday-makers'),
    title: 'Sei residente ai fini fiscali?' + itGuideSuffix('tax-residency-working-holiday-makers'),
    desc: 'Perché la residenza fiscale non si risolve con una checklist.',
  },
  {
    href: itGuideHref('tax-deductions-working-holiday-makers'),
    title: 'Che cosa puoi dedurre' + itGuideSuffix('tax-deductions-working-holiday-makers'),
    desc: 'Le deduzioni in base al tipo di lavoro, invece di un elenco generico.',
  },
  {
    href: itGuideHref('how-to-lodge-tax-return-working-holiday'),
    title: 'Farla da solo su myGov' + itGuideSuffix('how-to-lodge-tax-return-working-holiday'),
    desc: 'I passaggi su myGov, e che cosa controllare prima.',
  },
  {
    href: itGuideHref('do-you-need-to-lodge-tax-return-short-stay'),
    title: 'Hai lavorato pochi mesi?' + itGuideSuffix('do-you-need-to-lodge-tax-return-short-stay'),
    desc: 'Quando la tax return è obbligatoria e quando conviene comunque.',
  },
  {
    href: itGuideHref('late-tax-return-penalty-working-holiday'),
    title: 'Tax return di anni passati, anche dopo 2 o 3 anni' + itGuideSuffix('late-tax-return-penalty-working-holiday'),
    desc: 'Un anno mai presentato si può ancora presentare: penali, rimborsi e ordine degli anni.',
  },
  {
    href: itGuideHref('tax-return-deadline-31-october-working-holiday'),
    title: 'La scadenza del 31 ottobre' + itGuideSuffix('tax-return-deadline-31-october-working-holiday'),
    desc: 'Che cosa cambia quando un anno è in ritardo.',
  },
]

/** Fai da te su myGov o con un aiuto: confronto neutro, ripreso dalla pagina inglese. */
const TWO_WAYS = [
  { left: 'Gratis.', right: 'Una tariffa fissa concordata su WhatsApp prima di iniziare, mai una percentuale del rimborso.' },
  { left: 'Un account myGov collegato all’ATO, con una verifica dell’identità. Dall’estero serve un accesso a myGov che funzioni fuori dall’Australia.', right: 'Passaporto e visto, un conto bancario australiano e più o meno dove hai lavorato.' },
  { left: 'Gli income statement si precompilano quando ogni datore di lavoro li ha finalizzati.', right: 'Il tuo record ATO viene letto e confrontato con ogni lavoro che ricordi.' },
  { left: 'Rispondi da solo alle domande su residenza fiscale, reddito da working holiday maker e Medicare levy.', right: 'Ognuna viene verificata sui fatti del tuo anno prima che la dichiarazione venga presentata.' },
  { left: 'Inserisci le deduzioni che conosci.', right: 'Ti chiediamo che cosa comportava il tuo lavoro, poi deduciamo quello che gli spetta.' },
  { left: 'La presenti tu, entro il 31 ottobre dopo la fine dell’anno.', right: 'La leggi e la firmi. Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.' },
]

const WA_TR = waUrl({ topic: 'tax-return', lang: 'it' })
const PAGE_URL = `${SITE_URL}/it/dichiarazione-redditi-australia`

export default function DichiarazioneRedditiAustraliaPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: 'Dichiarazione dei redditi in Australia',
    description:
      'Guida alla tax return australiana per chi ha un visto working holiday 417 o 462: chi deve presentarla, aliquote, scadenza, Medicare levy, rimborso, super (DASP) e come farla da soli o con un aiuto.',
    inLanguage: 'it',
    dateModified: '2026-11-05',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede', '.what-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${PAGE_URL}#service`,
    name: 'Tax return per working holiday maker',
    serviceType: 'Preparazione della tax return',
    description:
      'Tax return australiane per chi ha un visto working holiday 417 o 462. Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO, anche dall’estero.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Working holiday maker (subclass 417 e 462)' },
    inLanguage: 'it',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'it',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/it` },
      { '@type': 'ListItem', position: 2, name: 'Dichiarazione dei redditi', item: PAGE_URL },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className={blocks.underHeader}>
        <Crumb home="Home" current="Dichiarazione dei redditi" label="Percorso di navigazione" href="/it" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>Tax return in Australia&nbsp;&middot; visto working holiday 417 e 462</span>
              La tua dichiarazione dei redditi in Australia con il working holiday. <Mark>Tu firmi, al resto pensiamo noi.</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>Niente payslip, niente account myGov, niente moduli da decifrare. Un questionario, una firma, e se c’è un rimborso l’ATO di solito lo paga circa 14 giorni lavorativi dopo la presentazione.</Lead>
          </div>
          <WaButton href={WA_TR} position="hero" topic="tax-return" lang="it">Scrivici su WhatsApp</WaButton>
          <p className={heroStyles.note}>Di solito rispondiamo entro un’ora.</p>
          <GoogleRating variant="pill" lang="it" />
        </Hero>
      </div>

      <Section eyebrow="In breve" title="Che cos’è la tax return in Australia e chi deve farla" titleId="what-title">
        <p className={`${blocks.text} what-lede`}>
          La tax return è la dichiarazione dei redditi australiana. Con il visto working holiday 417 o 462 copre un anno
          fiscale, dal 1°&nbsp;luglio al 30 giugno, e confronta l’imposta trattenuta dai datori di lavoro con quella dovuta:
          il 15% sui primi 45.000&nbsp;$. Se ti è stato trattenuto di più, la differenza è il rimborso, e l’importo lo
          stabilisce l’ATO.
        </p>
        <p className={blocks.text}>
          Se sei già tornato in Italia, la tax return australiana si fa online come da qui: questionario, firma
          elettronica e presentazione all’ATO. L’unico vincolo è il rimborso, che l’ATO paga solo su un conto bancario
          australiano.{' '}
          <Link href="/it/tax-return" className={blocks.textLink}>Come funziona la tax return dall’Italia, passo per passo</Link>.
        </p>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Un rimborso non è un bonus per aver viaggiato: è la distanza tra quello che ti hanno trattenuto e quello che
          dovevi. A volte il saldo è zero, a volte c’è qualcosa da pagare, soprattutto con un reddito da ABN.
        </p>
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>Chi deve presentarla</p>
          <p className={blocks.text}>
            Secondo l’ATO, con il visto 417 o 462 non sei obbligato a presentare la tax return se hai guadagnato solo
            stipendi da working holiday maker e il tuo reddito imponibile dell’anno è inferiore a 45.001 $. Se hai avuto
            anche reddito con ABN o superi quella soglia, l’esonero non vale. La tax return serve comunque se vuoi dedurre
            delle spese, ed è l’unico modo per recuperare un’imposta trattenuta in eccesso, per esempio le settimane al 45%
            prima che arrivasse il TFN. Il termine è il 31 ottobre dopo la fine dell’anno fiscale, ma un anno passato si
            può ancora presentare, anche dopo aver lasciato l’Australia.
          </p>
        </div>
      </Section>

      <PhotoFrame page="tax-return" locale="it" />

      <Section eyebrow="I numeri" title="Le cifre chiave, con le date" titleId="figures-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Le cifre che contano per una tax return con il working holiday, aggiornate al 2026-27, con la fonte ufficiale di
          ognuna. Ultimo aggiornamento: 5 novembre 2026. Quale si applichi a te dipende dai fatti del tuo anno.
        </p>
        <PlainRows items={KEY_FIGURES} />
        <p className={`${blocks.text} ${blocks.muted}`}>
          Approfondisci: <Link href="/it/tfn" className={blocks.textLink}>perché senza TFN si paga il 45%</Link>,{' '}
          <Link href="/it/medicare" className={blocks.textLink}>la Medicare levy con il passaporto italiano</Link> e{' '}
          <Link href="/it/superannuation" className={blocks.textLink}>come si richiede la super (DASP)</Link>.
        </p>
      </Section>

      <Section tone="pale" eyebrow="Da dove viene un rimborso" title="Da dove può nascere un rimborso per chi ha il working holiday" titleId="refund-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Un rimborso nasce nei punti qui sotto. Nessuno è automatico, e nessuno viene dato per scontato.</p>
        <div className={blocks.cards}>
          {REFUND_SOURCES.map((r) => (
            <div key={r.label} className={blocks.card}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Ogni punto viene controllato sul tuo record ATO prima che venga presentato qualsiasi documento.{' '}
          <Link href="/it/calculator" className={blocks.textLink}>Prova la stima indicativa nel calcolatore</Link>.
        </p>
      </Section>

      <Section id="two-ways" eyebrow="Decidere" title="Fai da te o con un aiuto: come presentare la tax return" titleId="two-ways-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Sono strade tutte legittime. Quale ti conviene dipende da quanto è stato semplice il tuo anno.</p>
        <Compare rows={TWO_WAYS} leftLabel="Da solo su myGov (myTax)" rightLabel="Con Working Holiday Tax" />
        <p className={blocks.text}>
          Il fai da te va bene per un anno semplice: un solo datore di lavoro registrato per i working holiday maker, il
          TFN comunicato dal primo turno, nessun reddito con ABN e nessuna domanda sulla Medicare levy. Un aiuto vale di
          più quando l’anno è stato irregolare: settimane al 45% prima del TFN, più datori di lavoro, reddito con ABN o
          una partenza a metà anno.
        </p>
        <p className={blocks.text}>
          C’è anche una terza strada, un qualsiasi tax agent registrato: prima di affidargli la dichiarazione, controlla
          che compaia nel registro del Tax Practitioners Board.
        </p>
        <p className={`${blocks.text} ${blocks.muted}`}>
          <Link href={itGuideHref('how-to-lodge-tax-return-working-holiday')} className={blocks.textLink}>
            Come farla da solo su myGov{itGuideSuffix('how-to-lodge-tax-return-working-holiday')}
          </Link>
          , oppure{' '}
          <Link href={itGuideHref('diy-tax-return-vs-tax-agent-working-holiday')} className={blocks.textLink}>
            il confronto completo{itGuideSuffix('diy-tax-return-vs-tax-agent-working-holiday')}
          </Link>
          .
        </p>
        <WaButton href={WA_TR} position="inline" topic="tax-return" lang="it">Non sai quale fa per te? Scrivici su WhatsApp</WaButton>
      </Section>

      <Section eyebrow="La tua parte" title="Che cosa ci serve da te" titleId="needed-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Tre cose, e l’elenco finisce qui.</p>
        <PlainRows items={NEEDED} />
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>Le payslip non servono.</p>
          <p className={blocks.text}>Ogni datore di lavoro che ti ha messo in payroll ha già dichiarato un income statement sul tuo TFN, ed è da lì che si costruisce la tax return. Le ricevute delle spese di lavoro sono l’unica cosa che vale la pena cercare, e se non ci sono, descrivici il lavoro che hai fatto.</p>
        </div>
      </Section>

      <Section id="how-it-works" tone="pale" eyebrow="Il percorso" title="Come funziona con noi, in breve" titleId="sequence-title">
        <p className={blocks.text}>Ci scrivi su WhatsApp e concordiamo la tariffa. Compili un questionario di circa dieci minuti, noi leggiamo il tuo record ATO e facciamo le valutazioni che cambiano la cifra: residenza fiscale, settimane senza TFN, Medicare levy e deduzioni. Poi leggi la tax return e la firmi.</p>
        <p className={blocks.text}>Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO. Se c’è un rimborso, di solito arriva circa 14 giorni lavorativi dopo la presentazione.</p>
        <LinkButton href="/it/tax-return">I sette passaggi del servizio, uno per uno →</LinkButton>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Se una parte dei tuoi redditi è stata fatturata invece che pagata tramite payroll:{' '}
          <Link href="/it/abn" className={blocks.textLink}>che cosa cambia con un ABN</Link>.
        </p>
      </Section>

      <Section title="Due regole che cambiano l’ordine delle cose" titleId="rules-title">
        <div className={blocks.cards}>
          {RULES.map((r) => (
            <div key={r.label} className={`${blocks.palePanel} ${blocks.stack}`}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="pale" eyebrow="La tariffa" title="Quanto costa" titleId="cost-title">
        <div className={blocks.cards}>
          <div className={`${blocks.card} ${blocks.stack}`}>
            <h3 className={blocks.cardTitle}>Solo con il TFN</h3>
            <p className={blocks.statement}>220&nbsp;$&nbsp;AUD</p>
            <p className={blocks.text}>GST inclusa.</p>
          </div>
          <div className={`${blocks.card} ${blocks.stack}`}>
            <h3 className={blocks.cardTitle}>Con un ABN</h3>
            <p className={blocks.statement}>385&nbsp;$&nbsp;AUD</p>
            <p className={blocks.text}>GST inclusa.</p>
          </div>
        </div>
        <p className={`${blocks.text} ${blocks.muted}`}>La tariffa la concordiamo con te su WhatsApp prima di iniziare.</p>
      </Section>

      <Section tone="amber" title="La nostra garanzia" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Se il tuo rimborso è inferiore alla nostra tariffa, ti restituiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa. La garanzia vale solo per le dichiarazioni con reddito TFN.
        </p>
        <p className={blocks.text}>Non promettiamo mai un rimborso: se ci sia e di quanto lo decide l’ATO.</p>
      </Section>

      <Section eyebrow="Chiarezza" title="Che cosa non copriamo" titleId="notcovered-title">
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>La tax return australiana non sostituisce la tua dichiarazione dei redditi italiana.</p>
          <p className={blocks.text}>Sono due questioni separate. Noi ci occupiamo solo di tasse australiane.</p>
        </div>
        <div className={blocks.cards}>
          {NOT_COVERED.map((r) => (
            <div key={r.label} className={blocks.card}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="pale" title="Ci occupiamo solo di tasse per il working holiday." titleId="trust-title">
        <p className={blocks.text}>Il questionario, i controlli e l’ordine qui sopra sono costruiti attorno a un solo anno di visto. Ogni tax return viene rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.</p>
        <p className={blocks.small}>
          Working Holiday Tax opera sotto la supervisione di un agente fiscale registrato, Tax Agent Number {AGENT_TPB}.{' '}
          <a href={`https://www.tpb.gov.au/registrations_search?number=${AGENT_TPB}`} className={blocks.textLink} target="_blank" rel="noopener noreferrer">Verificalo nel registro del Tax Practitioners Board</a>.
        </p>
        <GoogleReviewsServer lang="it" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Nessuno di serio ti chiederà la password di myGov.</strong>{' '}
          Noi non la chiediamo mai, perché il percorso qui sopra non ne ha bisogno. Se un messaggio ti chiede quei dati, non viene da noi.
        </p>
      </Section>

      <Section title="Le domande che ci fanno prima di scriverci" titleId="faq-title">
        {/* L’Accordion divide le risposte alla riga vuota; faqLd usa il testo grezzo. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Guide" title="La versione lunga dei passaggi più difficili" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="E dopo" title="Non lasciare lì la tua super" titleId="next-title">
        <p className={blocks.text}>Oltre alla paga, il datore di lavoro ha versato la superannuation per te. Quando lasci l’Australia per sempre puoi richiederla, separatamente dalla tax return.</p>
        <LinkButton href="/it/superannuation">Come funziona la richiesta della super →</LinkButton>
      </Section>

      <Section tone="forest" title="Inizia con un messaggio, non con un modulo" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Mandaci le città in cui hai lavorato, più o meno quali mesi, e se hai mai fatturato con un ABN. Da lì ti diciamo quali anni sono ancora aperti e com’è fatta la tua parte. Anche se sei tornato in Italia da un po’, scrivici.</p>
        <WaButton href={WA_TR} position="section" topic="tax-return" lang="it" tone="light">Scrivici su WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Di solito rispondiamo entro un’ora.</p>
        <p className={`${blocks.small} ${blocks.onForest}`}>
          Preferisci un modulo? <Link href="/start" className={blocks.textLink}>Il questionario è per ora solo in inglese.</Link>
        </p>
      </Section>

      <MobileCta href={WA_TR} lang="it" topic="tax-return" />
    </>
  )
}
