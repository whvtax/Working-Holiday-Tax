import { newLocaleLanguages } from '@/lib/locale-pages'
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
// Questa pagina risponde alla ricerca transazionale: chi ha già deciso di
// farsi aiutare e vuole sapere cosa succede dopo. Nessun prezzo nel titolo,
// nella descrizione o nello schema, e nessuna frase da agente registrato.
export const metadata: Metadata = {
  // Il layout radice aggiunge " | Working Holiday Tax": il titolo base resta corto.
  title: 'Tax return Australia: come funziona',
  description:
    'Servono passaporto e un conto bancario australiano, niente buste paga. Leggiamo il tuo record ATO e presentiamo la tax return per te.',
  keywords: [
    'tax return Australia',
    'dichiarazione dei redditi Australia',
    'dichiarazione dei redditi Australia italiani',
    'tax return working holiday',
    'tax return visto 417',
    'tax return visto 462',
    'rimborso tasse Australia',
    'tax return Australia dall’Italia',
    'presentare la tax return dopo aver lasciato l’Australia',
    'tax return Australia senza buste paga',
    'income statement ATO',
    'quanto tempo ci mette il rimborso ATO',
    'tax return anni precedenti Australia',
    'tax return Australia scadenza',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/tax-return`,
    languages: {
      'en-AU': `${SITE_URL}/tax-return`,
      de: `${SITE_URL}/de/tax-return`,
      ja: `${SITE_URL}/ja/tax-return`,
      ...newLocaleLanguages('/tax-return'),
      'x-default': `${SITE_URL}/tax-return`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tax-return.png`, width: 1200, height: 630, alt: 'Tax return australiana per chi ha un visto working holiday 417 o 462' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/tax-return`,
    siteName: 'Working Holiday Tax',
    title: 'Tax return Australia con il working holiday (417 e 462)',
    description:
      'I tuoi dati e il conto dove versare il rimborso. Leggiamo il record ATO, prepariamo la tax return, la firmi tu, la presentiamo noi. Il rimborso arriva di solito dopo circa 14 giorni lavorativi.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tax-return.png`],
    card: 'summary_large_image',
    title: 'Tax return Australia con il working holiday (417 e 462)',
    description: 'Passaporto, dati bancari, niente buste paga. La firmi tu, la presentiamo noi, il rimborso arriva di solito dopo circa 14 giorni lavorativi.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** Tutto quello che il visitatore deve fornire. Tre cose, nient'altro. */
const NEEDED = [
  {
    label: 'Passaporto e visto',
    body: 'Quale passaporto hai e con quale subclass eri in Australia.',
  },
  {
    label: 'Un conto bancario australiano',
    body: 'L’ATO paga i rimborsi solo su un conto australiano. Se il tuo è già chiuso, diccelo subito.',
  },
  {
    label: 'Più o meno dove e quando hai lavorato',
    body: 'Una città, il tipo di lavoro, i mesi a grandi linee. Lo confrontiamo con il record ATO e completiamo il resto.',
  },
]

/** La sequenza, nell'ordine in cui avviene, con le attese incluse. */
const SEQUENCE = [
  {
    n: '01',
    title: 'Ci scrivi',
    body: 'Su WhatsApp. Ci racconti com’è andato l’anno, ti diciamo a che punto sei e la tariffa viene concordata prima che il lavoro cominci.',
  },
  {
    n: '02',
    title: 'Un questionario, circa dieci minuti',
    body: 'Dati di passaporto e visto, dati bancari, le città e il tipo di lavoro. È l’unico modulo che compili. Lascia in bianco quello che non ti riguarda e te lo chiederemo noi.',
  },
  {
    n: '03',
    title: 'Apriamo il tuo record ATO',
    body: 'Ogni datore di lavoro che ti ha dichiarato, ogni income statement, ogni dollaro trattenuto e gli anni precedenti ancora aperti. I lavori dimenticati e le settimane tassate all’aliquota massima emergono qui, non da quello che ricordi.',
  },
  {
    n: '04',
    title: 'Le valutazioni che spostano la cifra',
    body: 'La residenza fiscale dell’anno, le settimane trattenute prima che arrivasse il tuo TFN, se la Medicare levy era davvero a tuo carico e cosa può dedurre il tuo tipo di lavoro. È la parte lenta, ed è quella che stai pagando.',
  },
  {
    n: '05',
    title: 'La leggi e la firmi',
    body: 'Ti mandiamo la dichiarazione finita con ogni cifra spiegata, e niente va all’ATO finché non l’hai letta e non hai firmato la dichiarazione. La firma è elettronica, quindi funziona anche da un telefono dall’altra parte del mondo.',
  },
  {
    n: '06',
    title: 'Viene presentata',
    body: 'Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO. La presentazione in sé richiede pochi minuti.',
  },
  {
    n: '07',
    title: 'L’ATO paga',
    body: 'I rimborsi arrivano di solito circa 14 giorni lavorativi dopo la presentazione, sul conto australiano che ci hai dato. Se l’ATO chiede chiarimenti, rispondiamo noi e ti diciamo cosa è stato chiesto.',
  },
]

/**
 * Da dove arriva un rimborso con il working holiday. Ogni voce è un meccanismo
 * già descritto altrove sul sito; nessuna cifra è promessa. L'unica frase con
 * un intervallo è la formulazione approvata dal titolare.
 */
const REFUND_SOURCES = [
  {
    label: 'Settimane tassate al 45% prima dell’arrivo del TFN',
    body: 'Senza il tuo tax file number registrato e senza una dichiarazione che indichi che la richiesta è in corso, il datore di lavoro può trattenere molto di più del dovuto. Ogni busta paga di quel periodo scoperto è stata trattenuta in eccesso, e torna indietro solo con una tax return presentata.',
  },
  {
    label: 'Un secondo lavoro senza la sua dichiarazione',
    body: 'Ogni datore di lavoro ha bisogno della propria Tax File Number Declaration. Un secondo lavoro partito senza questa dichiarazione trattiene il 45% finché nessuno se ne accorge, spesso per mesi.',
  },
  {
    label: 'Un datore di lavoro non registrato per i working holiday maker',
    body: 'La trattenuta dipende anche dalla posizione del datore di lavoro presso l’ATO. Se non era quella giusta, la trattenuta può essere stata diversa dal dovuto. Lo verifichiamo caso per caso.',
  },
  {
    label: 'Una Medicare levy che forse non era tua',
    body: 'La levy del 2% viene applicata di default. Se si applica davvero dipende dalla tua situazione individuale, e non è qualcosa da dare per scontato. Lo verifichiamo noi come parte della preparazione.',
  },
  {
    label: 'Spese di lavoro che nessuno ha dedotto',
    body: 'Scarpe, uniformi, attrezzi, licenze e spostamenti tra un cantiere e l’altro possono ridurre il tuo reddito imponibile se legati al lavoro che hai svolto. L’effetto sull’imposta dipende dai fatti individuali del tuo anno.',
  },
  {
    label: 'Il tuo passaporto e la tua residenza fiscale',
    body: 'A seconda della tua situazione e di com’è andato l’anno, una sentenza di tribunale può avere un effetto sulla tua dichiarazione, che varia da persona a persona. Lo valutiamo caso per caso e la decisione finale spetta all’ATO.',
  },
]

const RULES = [
  {
    label: 'Il rimborso può andare solo su un conto australiano',
    body: 'La superannuation (DASP) può essere pagata su un conto estero. Un rimborso fiscale no. Se stai per chiudere il conto bancario australiano, aspetta che il rimborso sia arrivato, oppure diccelo prima.',
  },
  {
    label: 'Gli anni precedenti si possono ancora richiedere',
    body: 'Un anno fiscale per cui non hai mai presentato la dichiarazione non scade in silenzio. Ogni anno è una tax return a sé, con il suo rimborso, e li facciamo partendo dal più vecchio.',
  },
]

// Le risposte oltre le 55 parole hanno una riga vuota, e la FAQ qui sotto
// mostra un <p> per paragrafo. faqLd usa ancora il testo grezzo.
const FAQS = [
  {
    question: 'Quanto ci mette una tax return con il working holiday?',
    answer:
      'Dal giorno in cui abbiamo il tuo questionario, un anno semplice richiede qualche giorno per preparazione e controlli, e l’ATO di solito paga il rimborso circa 14 giorni lavorativi dopo la presentazione.\n\nCinque datori di lavoro, reddito fatturato con un ABN o una residenza fiscale da sostenere richiedono più tempo da parte nostra, e ti diciamo di quale caso si tratta.',
  },
  {
    question: 'Entro quando va presentata la tax return con il working holiday?',
    answer:
      'Se la presenti da solo, entro il 31 ottobre dopo la fine dell’anno fiscale, quindi la dichiarazione 2025-26 aveva scadenza il 31 ottobre 2026. Un anno oltre la scadenza è in ritardo, non perso, e si può ancora presentare.',
  },
  {
    question: 'Servono le mie buste paga?',
    answer:
      'No. Ogni datore di lavoro che ti ha pagato tramite payroll ha inviato un income statement all’ATO, e la dichiarazione si costruisce su quel record. Buste paga perse e datori di lavoro che hanno chiuso sono un punto di partenza normale.\n\nL’unica carta che vale la pena cercare sono gli scontrini delle spese di lavoro. Se non li hai, descrivi il lavoro e ti diciamo cosa si può dedurre anche senza.',
  },
  {
    question: 'Cosa devo fare io, in pratica?',
    answer:
      'Tre cose. Rispondere una volta al questionario, leggere la dichiarazione che ti rimandiamo e firmarla. Non c’è nessun account del governo da creare e nessun modulo dell’ATO da interpretare, perché la presentazione passa da noi.',
  },
  {
    question: 'Potete presentarla anche se ho già lasciato l’Australia?',
    answer:
      'Sì. Questionario, firma e presentazione si fanno online, anche da casa.\n\nIl rimborso, però, non viaggia: l’ATO può pagarlo solo su un conto bancario australiano, mentre la superannuation (DASP) può essere pagata all’estero. Se il tuo conto australiano è già chiuso, scrivicelo nel primo messaggio.',
  },
  {
    question: 'E se non ho mai presentato la dichiarazione di un anno precedente?',
    answer:
      'Si può ancora presentare adesso. Ogni anno fiscale sta in piedi da solo, con la sua dichiarazione e il suo rimborso, e il record ATO mostra quali anni sono ancora aperti.\n\nIl saldo dipende dai tuoi dati: lo vediamo sul record ATO prima di presentare.',
  },
  {
    question: 'La tax return australiana sostituisce la dichiarazione dei redditi italiana?',
    answer:
      'No. Sono due cose separate, e noi ci occupiamo solo delle tasse australiane. Per la tua dichiarazione dei redditi in Italia rivolgiti all’Agenzia delle Entrate.',
  },
  {
    question: 'Cosa succede se dalla dichiarazione risulta che devo dei soldi?',
    answer:
      'Capita ogni tanto, più spesso quando c’è reddito fatturato con un ABN e non è stato trattenuto niente.\n\nVedi quella cifra prima che venga presentato qualsiasi cosa, con la spiegazione di come si è arrivati a quella cifra e delle modalità di pagamento previste dall’ATO. Niente parte senza la tua firma.',
  },
]

const GUIDES = [
  {
    href: itGuideHref('how-to-lodge-tax-return-from-overseas'),
    title: 'Presentarla dopo che sei partito' + itGuideSuffix('how-to-lodge-tax-return-from-overseas'),
    desc: 'Cosa funziona ancora da casa, e la regola del conto bancario che coglie di sorpresa.',
  },
  {
    href: itGuideHref('tax-residency-working-holiday-makers'),
    title: 'Sei residente fiscale?' + itGuideSuffix('tax-residency-working-holiday-makers'),
    desc: 'Perché il passaggio 04 non si risolve con una lista di controllo.',
  },
  {
    href: itGuideHref('tax-deductions-working-holiday-makers'),
    title: 'Cosa puoi dedurre' + itGuideSuffix('tax-deductions-working-holiday-makers'),
    desc: 'Le deduzioni per tipo di lavoro che hai fatto, non un elenco generico.',
  },
]

const WA_TR = waUrl({ topic: 'tax-return', lang: 'it' })

export default function TaxReturnPageIT() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/it/tax-return#webpage`,
    url: `${SITE_URL}/it/tax-return`,
    name: 'Tax return Australia con un visto working holiday',
    description:
      'Come si presenta una tax return australiana per chi ha un visto working holiday 417 o 462: cosa ti chiediamo, cosa controlliamo, come la firmi e quando arriva il rimborso.',
    inLanguage: 'it',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/it/tax-return#service`,
    name: 'Presentazione della tax return per working holiday maker',
    serviceType: 'Preparazione e presentazione della tax return',
    description:
      'Tax return australiane per chi ha un visto working holiday 417 o 462. Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO, anche dall’estero.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (subclass 417 e 462)' },
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
      { '@type': 'ListItem', position: 2, name: 'Tax return', item: `${SITE_URL}/it/tax-return` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className={blocks.underHeader}>
        <Crumb home="Home" current="Tax return" label="Percorso di navigazione" href="/it" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>Tax return con il working holiday&nbsp;&middot; visti 417 e 462</span>
              I tuoi dati e il conto dove versare il rimborso. <Mark>Al resto pensiamo noi.</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>Niente buste paga, niente account myGov, nessun modulo da decifrare. Un questionario, una firma, e il rimborso arriva di solito circa 14 giorni lavorativi dopo la presentazione.</Lead>
          </div>
          <WaButton href={WA_TR} position="hero" topic="tax-return" lang="it">Scrivici su WhatsApp</WaButton>
          <p className={heroStyles.note}>Risposta in circa un’ora.</p>
          <GoogleRating variant="pill" lang="it" />
        </Hero>
      </div>

      <PhotoFrame page="tax-return" locale="it" />

      <Section tone="pale" eyebrow="Da dove arriva un rimborso" title="Da dove può nascere un rimborso per chi ha il working holiday" titleId="refund-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Un rimborso non è un premio per essere un backpacker. È la differenza tra quello che i datori di lavoro hanno trattenuto e quello che dovevi davvero, e in un anno di working holiday quella differenza di solito nasce dai punti qui sotto. I rimborsi dei nostri clienti vanno da qualche centinaio di dollari a diverse migliaia, a seconda di quali si applicano.</p>
        <div className={blocks.cards}>
          {REFUND_SOURCES.map((r) => (
            <div key={r.label} className={blocks.card}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
        <p className={`${blocks.text} ${blocks.muted}`}>
          Nessuno di questi casi è automatico e nessuno viene dato per scontato. Ognuno viene controllato sul tuo record ATO prima che venga presentato qualsiasi cosa.{' '}
          <Link href="/it/calculator" className={blocks.textLink}>Vedi una stima indicativa nel calcolatore</Link>.
        </p>
      </Section>

      <Section eyebrow="Da parte tua" title="Cosa ci serve da te" titleId="needed-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Tre cose, e l’elenco finisce qui.</p>
        <PlainRows items={NEEDED} />
        <div className={`${blocks.palePanel} ${blocks.stack}`}>
          <p className={blocks.statement}>Le buste paga non ti servono.</p>
          <p className={blocks.text}>Ogni datore di lavoro che ti ha messo in payroll ha già dichiarato un income statement sul tuo tax file number, ed è su quello che si costruisce la dichiarazione. Gli scontrini delle spese di lavoro sono l’unica cosa che vale la pena cercare, e se non ce ne sono, raccontaci cosa comportava il lavoro.</p>
        </div>
      </Section>

      <Section id="how-it-works" tone="pale" eyebrow="Dall’inizio alla fine" title="L’ordine in cui succede" titleId="sequence-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Sette passaggi. Tu entri in gioco solo due volte: all’inizio e per firmare.</p>
        <Steps items={SEQUENCE} />
        <p className={`${blocks.text} ${blocks.muted}`}>
          Altro sul passaggio 04:{' '}
          <Link href="/it/abn" className={blocks.textLink}>cosa cambia un ABN</Link>, se una parte del tuo reddito è stata fatturata invece che pagata tramite payroll.
        </p>
      </Section>

      <Section title="Due regole cambiano l’ordine in cui fare le cose" titleId="rules-title">
        <div className={blocks.cards}>
          {RULES.map((r) => (
            <div key={r.label} className={`${blocks.palePanel} ${blocks.stack}`}>
              <h3 className={blocks.cardTitle}>{r.label}</h3>
              <p className={blocks.text}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="amber" title="La nostra garanzia" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa.
        </p>
        <p className={blocks.text}>L’importo lo concordiamo con te su WhatsApp prima del passaggio 01.</p>
      </Section>

      <Section tone="pale" title="Ci occupiamo solo di tasse per chi ha un visto working holiday." titleId="trust-title">
        <p className={blocks.text}>Il questionario, i controlli e l’ordine qui sopra sono stati costruiti attorno a un solo anno di visto e a nient’altro. Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.</p>
        <GoogleReviewsServer lang="it" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Nessuno di serio ti chiederà la password di myGov.</strong>{' '}
          Noi non la chiediamo mai, perché il percorso di presentazione qui sopra non la usa. Se un messaggio ti chiede quei dati, non viene da noi.
        </p>
      </Section>

      <Section title="Le domande che ci fanno prima di scriverci" titleId="faq-title">
        {/* L'Accordion divide le risposte alla riga vuota; faqLd sopra usa la stringa grezza. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Guide" title="La versione lunga dei passi più difficili" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="E poi" title="Non lasciare lì la tua super" titleId="next-title">
        <p className={blocks.text}>Il tuo datore di lavoro ha versato la superannuation sopra lo stipendio mentre lavoravi qui. Quando lasci l’Australia per sempre si può richiedere, separatamente dalla tax return.</p>
        <LinkButton href="/it/superannuation">Come funziona la richiesta della super →</LinkButton>
      </Section>

      <Section tone="forest" title="Comincia con un messaggio, non con un modulo" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Mandaci le città in cui hai lavorato, più o meno quali mesi, e se hai mai fatturato con un ABN. Basta per dirti quali anni sono aperti e com’è la tua parte. Due anni da quando sei tornato a casa non fanno differenza.</p>
        <WaButton href={WA_TR} position="section" topic="tax-return" lang="it" tone="light">Scrivici su WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Risposta in circa un’ora.</p>
      </Section>

      <MobileCta href={WA_TR} lang="it" topic="tax-return" />
    </>
  )
}
