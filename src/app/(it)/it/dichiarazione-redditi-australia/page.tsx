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
import { Steps, LinkRows, blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, PlainRows } from '@/components/wht/CoreBlocks'
import { Accordion } from '@/components/ui/Accordion'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

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
    'rimborso tasse Australia',
    'tax return visto 417',
    'tax return visto 462',
    'tax return Australia dall’Italia',
    'tax return Australia senza payslip',
    'quanto costa la tax return Australia',
    'ATO tax return working holiday',
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
      'Tu ci dai i tuoi dati e il conto su cui accreditare il rimborso. Noi leggiamo i dati ATO, prepariamo la tax return, tu firmi e noi la presentiamo.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tax-return.png`],
    card: 'summary_large_image',
    title: 'Dichiarazione dei redditi in Australia (visto 417 e 462)',
    description: 'Passaporto, dati bancari, niente payslip. Firmi tu, presentiamo noi.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** Perché esiste un rimborso. Ogni voce è un meccanismo già descritto sul sito inglese. */
const REFUND_SOURCES = [
  {
    label: 'Settimane tassate al 45% prima che arrivasse il TFN',
    body: 'Se il datore di lavoro non ha il tuo TFN, né una dichiarazione che la tua richiesta è in corso, può trattenere molto più del dovuto. Ogni busta paga di quel periodo ha avuto una trattenuta troppo alta, e quella differenza si sistema solo con una tax return presentata.',
  },
  {
    label: 'Un secondo lavoro senza la sua dichiarazione',
    body: 'Ogni datore di lavoro vuole la propria Tax File Number Declaration. Un secondo lavoro partito senza questa dichiarazione trattiene il 45% finché nessuno se ne accorge, spesso per mesi.',
  },
  {
    label: 'Un datore di lavoro non registrato per i working holiday maker',
    body: 'La trattenuta dipende anche dalla posizione del datore di lavoro presso l’ATO. Se non era quella giusta, la trattenuta può essere stata diversa dal dovuto. Lo verifichiamo caso per caso.',
  },
  {
    label: 'Una Medicare levy che forse non dovevi pagare',
    body: 'Il 2% di Medicare levy viene applicato di default. Se si applica davvero dipende dalla tua situazione individuale e non è qualcosa da dare per scontato. Lo verifichiamo noi come parte della preparazione.',
  },
  {
    label: 'Spese di lavoro che nessuno ha dedotto',
    body: 'Scarpe, divise, attrezzi, licenze e spostamenti tra un posto di lavoro e l’altro possono ridurre il reddito imponibile, se legati al lavoro che hai fatto. L’effetto sull’imposta dipende dai fatti individuali del tuo anno.',
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

/** I passaggi, nell’ordine in cui accadono, con le attese. */
const SEQUENCE = [
  {
    n: '01',
    title: 'Ci scrivi su WhatsApp',
    body: 'Ci racconti com’è andato il tuo anno, noi ti diciamo a che punto sei, e la tariffa viene concordata prima che il lavoro inizi.',
  },
  {
    n: '02',
    title: 'Un questionario, circa dieci minuti',
    body: 'Dati del passaporto e del visto, dati bancari, le città e il tipo di lavoro. È l’unico modulo che compili. Se qualcosa non ti torna, lascialo in bianco e ti facciamo noi le domande.',
  },
  {
    n: '03',
    title: 'Apriamo il tuo record ATO',
    body: 'Ogni datore di lavoro che ti ha dichiarato, ogni income statement, ogni dollaro trattenuto e gli eventuali anni precedenti ancora aperti. I lavori dimenticati e le settimane tassate all’aliquota massima saltano fuori da qui, non dalla memoria.',
  },
  {
    n: '04',
    title: 'Le valutazioni che cambiano la cifra',
    body: 'La residenza fiscale per quell’anno, le settimane trattenute prima dell’arrivo del TFN, se la Medicare levy era davvero tua da pagare e che cosa puoi dedurre in base al lavoro che hai fatto. È la parte lenta, ed è quella per cui paghi.',
  },
  {
    n: '05',
    title: 'Leggi e firmi',
    body: 'Ti mandiamo la tax return finita, con ogni cifra spiegata. All’ATO non parte niente finché non l’hai letta e non hai firmato la dichiarazione. La firma è elettronica, quindi va bene anche dal telefono, da qualsiasi parte del mondo.',
  },
  {
    n: '06',
    title: 'La presentiamo',
    body: 'Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO. La presentazione in sé richiede pochi minuti.',
  },
  {
    n: '07',
    title: 'L’ATO paga',
    body: 'Se c’è un rimborso, di solito arriva circa 14 giorni lavorativi dopo la presentazione, sul conto australiano che ci hai dato. Se l’ATO chiede chiarimenti, rispondiamo noi e ti diciamo che cosa è stato chiesto.',
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
    body: 'Se ci sia un rimborso e di quanto lo decide l’ATO, in base ai tuoi dati. Prima di presentare ti diciamo che cosa aspettarti.',
  },
]

// Le risposte lunghe hanno una riga vuota, e l’Accordion rende un <p> per
// paragrafo. faqLd usa il testo grezzo, quindi lo schema resta identico.
const FAQS = [
  {
    question: 'Che cos’è la tax return e perché dovrei farla?',
    answer:
      'La tax return è la dichiarazione dei redditi australiana. Durante l’anno il datore di lavoro trattiene l’imposta dalla tua paga. A fine anno fiscale, la tax return confronta quello che è stato trattenuto con quello che dovevi davvero, e la differenza si chiama rimborso.\n\nL’anno fiscale australiano va dal 1°\u00a0luglio al 30 giugno, non da gennaio a dicembre. Una dichiarazione è dovuta per ogni anno in cui hai guadagnato reddito in Australia.',
  },
  {
    question: 'Devo farla anche se ho lavorato solo pochi mesi?',
    answer:
      'Sì, una dichiarazione è dovuta per ogni anno fiscale in cui hai guadagnato reddito australiano, anche se hai lavorato poco o per un solo datore di lavoro. Quanto hai lavorato conta meno di quanto è stato trattenuto rispetto a quanto dovevi. Se c’è qualcosa da recuperare lo decide l’ATO, in base ai tuoi dati.',
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
      'Se la presenti da solo, entro il 31 ottobre dopo la fine dell’anno fiscale. Quella del 2025-26 aveva quindi scadenza il 31 ottobre 2026. Un anno oltre la scadenza è in ritardo, non perso, e si può ancora presentare.',
  },
  {
    question: 'Servono le payslip (buste paga)?',
    answer:
      'No. Ogni datore di lavoro che ti ha pagato tramite payroll ha dichiarato un income statement all’ATO, ed è da quel record che si costruisce la tax return. Payslip perse e datori di lavoro che hanno chiuso sono un punto di partenza normale.\n\nL’unica cosa che vale la pena cercare sono le ricevute delle spese di lavoro. Se non le hai, descrivici il lavoro e ti diciamo che cosa si può dedurre anche senza.',
  },
  {
    question: 'Posso farla dopo il rientro in Italia?',
    answer:
      'Sì, e molte delle tax return che presentiamo sono di persone già rientrate. Questionario, firma e presentazione si fanno online.\n\nL’unica cosa che non viaggia è il rimborso: l’ATO può pagarlo solo su un conto bancario australiano, mentre la super (DASP) può essere pagata anche all’estero. Se il tuo conto australiano è già chiuso, scrivicelo nel primo messaggio.',
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
    question: 'E se non ho mai presentato la tax return per un anno passato?',
    answer:
      'Si può ancora fare. Ogni anno fiscale è a sé, con la sua dichiarazione e il suo eventuale rimborso, e dal record ATO vediamo quali anni sono ancora aperti.\n\nSe alla fine ci sia un rimborso lo decide l’ATO. Prima di presentare ti diciamo che cosa aspettarti.',
  },
  {
    question: 'E se alla fine risulta che devo dei soldi all’ATO?',
    answer:
      'Capita, soprattutto quando un reddito è stato fatturato con un ABN e non è stato trattenuto niente.\n\nVedi quella cifra prima che venga presentato qualsiasi cosa, con la spiegazione di come si è arrivati a quella cifra e delle modalità di pagamento previste dall’ATO. Senza la tua firma non parte niente.',
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
    desc: 'Perché il passaggio 04 non si risolve con una checklist.',
  },
  {
    href: itGuideHref('tax-deductions-working-holiday-makers'),
    title: 'Che cosa puoi dedurre' + itGuideSuffix('tax-deductions-working-holiday-makers'),
    desc: 'Le deduzioni in base al tipo di lavoro, invece di un elenco generico.',
  },
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
      'Come si presenta una tax return australiana con un visto working holiday 417 o 462: che cosa ti chiediamo, che cosa controlliamo, come firmi e quando arriva un eventuale rimborso.',
    inLanguage: 'it',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${PAGE_URL}#service`,
    name: 'Tax return per working holiday maker',
    serviceType: 'Preparazione e presentazione della tax return',
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

      <PhotoFrame page="tax-return" locale="it" />

      <Section eyebrow="Le basi" title="Che cos’è la tax return per chi ha il working holiday" titleId="what-title">
        <p className={`${blocks.text} ${blocks.muted}`}>La tax return è la dichiarazione dei redditi australiana. Durante l’anno il datore di lavoro trattiene l’imposta dalla tua paga. L’importo dipende dalla tua situazione individuale. A fine anno fiscale l’ATO (l’agenzia delle entrate australiana) confronta quanto è stato trattenuto con quanto dovevi davvero.</p>
        <p className={`${blocks.text} ${blocks.muted}`}>La differenza è il rimborso. Non è un bonus per aver viaggiato: è la distanza tra quello che ti hanno trattenuto e quello che dovevi. L’anno fiscale australiano va dal 1°&nbsp;luglio al 30 giugno.</p>
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>Chi deve presentarla</p>
          <p className={blocks.text}>Una tax return è dovuta per ogni anno fiscale in cui hai guadagnato reddito in Australia. Il termine standard è il 31 ottobre dopo la fine dell’anno fiscale, ma un anno passato non è perso: si può ancora presentare. Puoi farlo anche dopo aver lasciato l’Australia.</p>
        </div>
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
          Ogni punto viene controllato sul tuo record ATO prima di presentare qualsiasi cosa.{' '}
          <Link href="/it/calculator" className={blocks.textLink}>Prova la stima indicativa nel calcolatore</Link>.
        </p>
      </Section>

      <Section eyebrow="La tua parte" title="Che cosa ci serve da te" titleId="needed-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Tre cose, e l’elenco finisce qui.</p>
        <PlainRows items={NEEDED} />
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>Le payslip non servono.</p>
          <p className={blocks.text}>Ogni datore di lavoro che ti ha messo in payroll ha già dichiarato un income statement sul tuo TFN, ed è da lì che si costruisce la tax return. Le ricevute delle spese di lavoro sono l’unica cosa che vale la pena cercare, e se non ci sono, descrivici il lavoro che hai fatto.</p>
        </div>
      </Section>

      <Section id="how-it-works" tone="pale" eyebrow="Il percorso" title="Come funziona, passo per passo" titleId="sequence-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Sette passaggi. Tu entri in gioco solo due volte: all’inizio e per firmare.</p>
        <Steps items={SEQUENCE} />
        <p className={`${blocks.text} ${blocks.muted}`}>
          Sul passaggio 04:{' '}
          <Link href="/it/abn" className={blocks.textLink}>che cosa cambia con un ABN</Link>, se una parte dei tuoi redditi è stata fatturata invece che pagata tramite payroll.
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
        <p className={blocks.text}>Il questionario, i controlli e l’ordine qui sopra sono costruiti attorno a un solo anno di visto. Working Holiday Tax opera sotto la supervisione di un agente fiscale registrato. Ogni tax return viene rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.</p>
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
