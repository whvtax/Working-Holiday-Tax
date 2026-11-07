import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { Compare, Figures, LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { Crumbs, PhotoBand, tb } from '@/components/wht/TfnAbnBlocks'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

// ─── METADATA ───────────────────────────────────────────────────────────
// Questa pagina riguarda le settimane tra il primo giorno di lavoro e il
// momento in cui il TFN arriva al datore di lavoro. Nessun prezzo e nessuna
// frase che ci presenti come agente fiscale registrato.
export const metadata: Metadata = {
  // Il layout radice aggiunge " | Working Holiday Tax": il titolo base resta
  // corto, così il tutto entra in un risultato di ricerca da telefono.
  title: 'Come richiedere il TFN in Australia',
  description:
    'Il TFN si richiede gratis all’ATO, solo dall’Australia con il visto 417 o 462 attivo, e arriva entro 28 giorni. Senza TFN né richiesta, ritenuta al 45%.',
  keywords: [
    'TFN Australia',
    'richiedere il TFN Australia',
    'TFN working holiday',
    'tax file number Australia',
    'TFN visto 417',
    'TFN visto 462',
    'come richiedere il TFN',
    'TFN italiani Australia',
    'lavorare senza TFN Australia',
    'senza TFN 45%',
    'TFN quanto tempo ci vuole',
    'TFN regola dei 28 giorni',
    'TFN respinto working holiday',
    'codice fiscale australiano',
    'come ottenere il TFN Australia',
    'TFN dall’Italia',
    'TFN non arrivato dopo 28 giorni',
    'documenti per il TFN',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/tfn`,
    languages: {
      'en-AU': `${SITE_URL}/tfn`,
      de: `${SITE_URL}/de/tfn`,
      ja: `${SITE_URL}/ja/tfn`,
      ...newLocaleLanguages('/tfn'),
      'x-default': `${SITE_URL}/tfn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tfn.png`, width: 1200, height: 630, alt: 'Richiesta del TFN per chi ha un visto working holiday in Australia' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/tfn`,
    siteName: 'Working Holiday Tax',
    title: 'TFN con il working holiday: evita le settimane al 45%',
    description:
      'Il numero è gratis, le settimane senza no. Prepariamo la richiesta del TFN per chi ha un visto 417 o 462.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tfn.png`],
    card: 'summary_large_image',
    title: 'TFN con il working holiday: evita le settimane al 45%',
    description: 'Il numero è gratis. Le settimane prima che il datore di lavoro lo abbia, no.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** I tre punti in cui una richiesta di TFN con il working holiday si inceppa davvero. */
const FAILURE_POINTS = [
  {
    n: '01',
    title: 'Il nome nel modulo non è quello che ha l’immigrazione',
    body: 'L’ATO confronta la richiesta con il record del tuo visto. Un secondo nome mancante, un passaporto rinnovato o i nomi in ordine diverso possono farla respingere.',
  },
  {
    n: '02',
    title: 'Tra quattro settimane quell’indirizzo non riceverà più la posta',
    body: 'Il TFN arriva con una lettera a un indirizzo australiano e l’emissione può richiedere fino a 28 giorni. Se nel frattempo ti sei spostato, nessuno inoltra la lettera.',
  },
  {
    n: '03',
    title: 'La richiesta è partita prima che il visto fosse attivo',
    body: 'Si fa la richiesta quando sei già in Australia con il visto attivato, non prima del volo. Le richieste inviate troppo presto non portano da nessuna parte, e lo scopri dopo settimane, con il 45% già trattenuto.',
  },
]

/** Cosa facciamo per coprire il periodo scoperto. Nessuna promessa sui tempi. */
const WHAT_WE_DO = [
  {
    title: 'Controlliamo prima che il visto sia attivo',
    body: 'Una domanda di un minuto che evita il mese buttato più comune.',
  },
  {
    title: 'Confrontiamo i tuoi dati con il record dell’immigrazione',
    body: 'Passaporto, ordine dei nomi, data di nascita e concessione del visto, verificati uno contro l’altro prima dell’invio.',
  },
  {
    title: 'Risolviamo con te il problema dell’indirizzo',
    body: 'Dove sarai tra quattro settimane, e cosa fare se la risposta è una farm o un van.',
  },
  {
    title: 'Insistiamo se la pratica si blocca',
    body: 'L’ATO ha 28 giorni. Oltre, qualcuno deve telefonare, e non sarai tu.',
  },
  {
    title: 'Ti diciamo cosa dire al datore di lavoro nel frattempo',
    body: 'Il numero di riferimento della richiesta, indicato nel modo giusto, tiene le prime buste paga lontane dall’aliquota più alta.',
  },
  {
    title: 'A fine anno si chiude con la tax return',
    body: 'Quello che è già stato trattenuto al 45% torna solo con una tax return, e solo se la dichiarazione lo riporta.',
  },
]

// Le risposte oltre le 55 parole hanno una riga vuota, e la FAQ qui sotto
// mostra un <p> per paragrafo. faqLd usa ancora il testo grezzo, quindi lo
// schema non cambia.
const FAQS = [
  {
    question: 'Cos’è il TFN e serve per lavorare in Australia?',
    answer:
      'Il TFN (Tax File Number) è il numero personale con cui l’ATO ti identifica per le tasse: per un italiano, l’equivalente del codice fiscale. Puoi cominciare a lavorare anche prima di averlo, ma se il datore di lavoro non ha né il TFN né la dichiarazione che l’hai richiesto, trattiene il 45% invece del 15%. Ti serve anche per la tax return.',
  },
  {
    question: 'Quali documenti servono per richiedere il TFN?',
    answer:
      'Solo il passaporto con cui hai ottenuto il visto 417 o 462. L’ATO non chiede di inviare documenti: verifica il visto collegato al passaporto. Servono poi un indirizzo postale australiano, dove arriva la lettera con il numero, e i tuoi recapiti. I nomi vanno scritti esattamente come nel passaporto.',
  },
  {
    question: 'Posso richiedere il TFN dall’Italia, prima di partire?',
    answer:
      'No, non con il visto working holiday. La richiesta online dell’ATO per chi ha un passaporto straniero vale solo per chi si trova già in Australia con un visto che permette di lavorare, come il 417 o il 462. Dall’Italia puoi solo prepararti: passaporto valido e un indirizzo australiano dove ricevere la lettera.',
  },
  {
    question: 'Quanto tempo ci mette ad arrivare il TFN?',
    answer:
      'L’ATO dichiara di elaborare le richieste di TFN entro 28 giorni, e la maggior parte dei working holiday maker riceve il numero in due-quattro settimane. Arriva con una lettera all’indirizzo australiano indicato nella richiesta. Mentre aspetti, al datore di lavoro basta sapere che hai fatto richiesta. Non presentare una seconda richiesta nei 28 giorni: secondo l’ATO rallenta l’elaborazione.',
  },
  {
    question: 'Il TFN non è arrivato dopo 28 giorni: cosa faccio?',
    answer:
      'Chiama l’ATO al 13 28 61 negli orari d’ufficio australiani, o al +61 2 6216 1111 dall’estero, con il numero di riferimento della richiesta e il passaporto. Ti dicono a che punto è la pratica e puoi aggiornare l’indirizzo. Non rifare la richiesta.\n\nAvvisa anche il datore di lavoro: passati i 28 giorni senza TFN deve trattenere il 45%.',
  },
  {
    question: 'Cosa succede se comincio a lavorare senza TFN?',
    answer:
      'Se nella Tax File Number Declaration indichi che hai già fatto richiesta, il datore di lavoro trattiene all’aliquota normale per 28 giorni. Se dopo 28 giorni non ha ancora il numero, o se non gli hai dato nemmeno la dichiarazione, deve trattenere il 45%, invece del 15% previsto per i working holiday maker.\n\nL’eccesso torna solo con una tax return presentata dopo la fine dell’anno fiscale, e la decisione spetta all’ATO.',
  },
  {
    question: 'Lavoro da settimane senza TFN. È troppo tardi?',
    answer:
      'Non necessariamente. Fai la richiesta adesso, così l’aliquota massima smette di applicarsi alle prossime buste paga. L’eccesso già trattenuto si sistema con la tax return di quell’anno fiscale: quanto torna dipende dal tuo caso e la decisione spetta all’ATO.\n\nDi solito riusciamo a preparare la richiesta lo stesso giorno in cui ci scrivi. Dicci quante settimane sono già state pagate al 45%, perché cambia quello che la dichiarazione deve riportare.',
  },
  {
    question: 'Mi serve un nuovo TFN per il secondo anno di visto?',
    answer:
      'No. Il tax file number viene assegnato una volta sola e resta tuo per sempre, anche con un secondo o un terzo visto working holiday, con un cambio di tipo di visto e dopo un periodo fuori dall’Australia.\n\nSe il numero lo hai solo perso, invece, è un problema diverso e più veloce: dicci quale dei due casi è il tuo.',
  },
  {
    question: 'Posso richiedere il TFN da solo, gratis?',
    answer:
      'Sì. La richiesta sul sito dell’ATO è gratuita e i passaggi sono qui sopra.\n\nQuello che paghi a noi è il lavoro intorno: far combaciare i tuoi dati con il record dell’immigrazione, scegliere un indirizzo che tra quattro settimane riceva ancora posta, dire al datore di lavoro cosa indicare perché le prime buste paga non finiscano al 45% e, se qualcosa è già stato trattenuto in più, sistemarlo con la tax return.',
  },
]

/** I passaggi della richiesta online all’ATO, per chi preferisce farla da solo. */
const HOW_TO = [
  { n: '01', title: 'Aspetta di essere in Australia con il visto attivo', body: 'La richiesta online dell’ATO per chi ha un passaporto straniero vale solo per chi si trova già in Australia con un visto che permette di lavorare. Il 417 e il 462 sono tra questi.' },
  { n: '02', title: 'Tieni pronti passaporto e indirizzo australiano', body: 'Non devi inviare documenti: l’ATO verifica il visto collegato al passaporto. Ti serve un indirizzo postale australiano che riceva ancora posta tra quattro settimane.' },
  { n: '03', title: 'Compila il modulo sul sito dell’ATO', body: 'Nomi, ordine dei nomi e data di nascita esattamente come nel passaporto e nel record del visto. È il punto in cui si inceppano più spesso.' },
  { n: '04', title: 'Salva il numero di riferimento e avvisa il datore di lavoro', body: 'Alla fine l’ATO ti dà un numero di ricevuta (receipt ID). Nella Tax File Number Declaration indichi che hai fatto richiesta: per 28 giorni il datore di lavoro trattiene all’aliquota normale.' },
  { n: '05', title: 'Aspetta la lettera, senza rifare la richiesta', body: 'Il TFN arriva per posta entro 28 giorni. L’ATO chiede di non presentare una seconda richiesta in quel periodo, perché rallenta l’elaborazione. Dopo 28 giorni contatti l’ATO con il numero di ricevuta.' },
]

const GUIDES = [
  {
    href: itGuideHref('how-to-apply-for-a-tfn'),
    title: 'Come chiedere il TFN e cosa può andare storto' + itGuideSuffix('how-to-apply-for-a-tfn'),
    desc: 'La guida completa alla richiesta, campo per campo.',
  },
  {
    href: itGuideHref('apply-for-tfn-before-arriving'),
    title: 'Si può chiedere il TFN prima di partire dall’Italia?' + itGuideSuffix('apply-for-tfn-before-arriving'),
    desc: 'Cosa preparare da casa, così la richiesta parte il primo giorno in Australia.',
  },
  {
    href: itGuideHref('tfn-application-delayed'),
    title: 'TFN in ritardo oltre 28 giorni' + itGuideSuffix('tfn-application-delayed'),
    desc: 'Le tre cose da controllare prima di chiamare l’ATO.',
  },
  {
    href: itGuideHref('tfn-australian-address-no-fixed-address'),
    title: 'Senza indirizzo fisso? Come avere il TFN lo stesso' + itGuideSuffix('tfn-australian-address-no-fixed-address'),
    desc: 'Ostello, amici o casella postale: cosa funziona per la lettera.',
  },
  {
    href: itGuideHref('what-happens-without-your-tfn'),
    title: 'Lavorare senza TFN' + itGuideSuffix('what-happens-without-your-tfn'),
    desc: 'Il 45%, la finestra di 28 giorni e come tornano i soldi.',
  },
  {
    href: itGuideHref('tfn-vs-abn-difference'),
    title: 'TFN o ABN? La differenza' + itGuideSuffix('tfn-vs-abn-difference'),
    desc: 'Quale ti serve, e quando servono tutti e due.',
  },
]

const WA_TFN = waUrl({ topic: 'tfn', lang: 'it' })

export default function TFNPageIT() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/it/tfn#webpage`,
    url: `${SITE_URL}/it/tfn`,
    name: 'Come richiedere il TFN in Australia con un visto working holiday',
    description:
      'Come si richiede il TFN con il visto 417 o 462, quali documenti servono, quanto ci mette, cosa succede se lavori senza e come si recupera l’eccesso trattenuto.',
    inLanguage: 'it',
    dateModified: '2026-11-05',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/it/tfn#service`,
    name: 'Richiesta del TFN per working holiday maker',
    serviceType: 'Richiesta del Tax File Number',
    description:
      'Richieste di TFN preparate per chi ha un visto working holiday 417 o 462, con il numero di riferimento per il datore di lavoro e i solleciti all’ATO.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (subclass 417 e 462)' },
    availableLanguage: ['it', 'en'],
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
      { '@type': 'ListItem', position: 2, name: 'TFN', item: `${SITE_URL}/it/tfn` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      {/* SEO: il kicker sta dentro l'H1, così il titolo contiene le parole che la gente cerca. */}
      <div className={blocks.underHeader}>
        <Crumbs homeHref="/it" home="Home" current="TFN" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>Come richiedere il TFN, il codice fiscale australiano&nbsp;&middot; visto working holiday 417 e 462</span>
            Il TFN è gratis.<br />
            Le settimane <Mark>senza TFN</Mark> costano.
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              Il TFN (Tax File Number) è il codice fiscale australiano, gratuito e tuo per tutta la vita. Con il visto 417 o
              462 lo richiedi online all’ATO quando sei in Australia, e arriva per lettera entro 28 giorni. Dall’Italia,
              prima di partire, non si può richiedere: puoi solo preparare passaporto e indirizzo australiano. Se il datore
              di lavoro non ha né il TFN né la dichiarazione che l’hai richiesto, trattiene il 45% invece del 15%.
            </Lead>
          </div>
          <WaButton href={WA_TFN} position="hero" topic="tfn" lang="it">Scrivici su WhatsApp</WaButton>
          <p className={heroStyles.note}>Risposta in circa un’ora. Ci servono solo i dati del passaporto e un indirizzo australiano.</p>
          <GoogleRating variant="pill" lang="it" />
        </Hero>
        <PhotoBand page="tfn" locale="it" />
      </div>

      <Section width="wide" title="Quanto costa cominciare a lavorare prima che arrivi il TFN?" titleId="gap-title">
        <p className={blocks.text}>
          Dal primo giorno di lavoro i casi sono due. Se nella Tax File Number Declaration indichi che hai già richiesto
            il TFN, per 28 giorni il datore di lavoro trattiene all’aliquota normale, il 15% per i working holiday maker.
            Se non l’hai richiesto, o se dopo 28 giorni il numero non c’è ancora, deve trattenere il 45%. L’eccesso si
            recupera solo con la tax return dopo il 30 giugno, e decide l’ATO.
        </p>
        <Figures
          items={[
            { figure: '45%', body: 'Ritenuta se il datore di lavoro non ha né il TFN né la dichiarazione che l’hai richiesto. Fonte: ATO.' },
            { figure: '28 giorni', body: 'Il tempo entro cui l’ATO invia il TFN per posta, e quello che hai per darlo al datore di lavoro dopo la richiesta. Fonte: ATO.' },
            { figure: '15%', body: 'L’aliquota dei working holiday maker fino a 45.000 $, dal primo dollaro, in vigore dal 1° luglio 2026. Fonte: ATO.' },
            { figure: 'Gratis', body: 'La richiesta del TFN sul sito dell’ATO. Il numero resta tuo per tutta la vita.' },
          ]}
        />
        <p className={`${blocks.small} ${blocks.muted}`}>Dati verificati sulle pagine dell’ATO il 5 novembre 2026.</p>
        <Compare
          leftLabel="Senza TFN e senza richiesta"
          rightLabel="Con la richiesta fatta e dichiarata"
          rows={[
            { left: 'Il datore di lavoro trattiene il 45% dal primo giorno.', right: 'Per 28 giorni trattiene all’aliquota normale, il 15% per i working holiday maker.' },
            { left: 'Il 45% continua finché non gli dai il TFN.', right: 'Se dopo 28 giorni il TFN non c’è ancora, passa anche lui al 45%.' },
            { left: 'Quello trattenuto in più torna solo con la tax return, se spetta.', right: 'Basta dargli il TFN appena arriva la lettera.' },
          ]}
        />
      </Section>

      <Section eyebrow="Passo per passo" title="Come si richiede il TFN in Australia" titleId="how-title">
        <p className={blocks.text}>La richiesta è gratuita e si fa online sul sito dell’ATO. Sono cinque passaggi.</p>
        <Steps items={HOW_TO} />
        <p className={blocks.text}>
          Preferisci non pensarci? <a href={WA_TFN} className={tb.inlineLink}>Mandaci i dati su WhatsApp</a> e la
            prepariamo noi.
        </p>
      </Section>

      <Section tone="pale" eyebrow="Dove si inceppa" title="Perché le richieste di TFN dei working holiday maker si inceppano?" titleId="fail-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Il modulo è breve. Ognuno dei tre problemi qui sotto può significare un altro mese tassato al 45%.
        </p>
        <Steps items={FAILURE_POINTS} />
      </Section>

      <Section eyebrow="Il lavoro" title="Cosa facciamo noi" titleId="work-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Ci mandi i tuoi dati su WhatsApp. Tutto il resto lo facciamo noi.
        </p>
        <div className={tb.pairs}>
          {WHAT_WE_DO.map(c => (
            <div key={c.title} className={blocks.palePanel}>
              <h3 className={blocks.cardTitle}>{c.title}</h3>
              <p className={blocks.text}>{c.body}</p>
            </div>
          ))}
        </div>
        <p className={blocks.statement}>
          Niente accessi a myGov, niente verifiche dell’identità, niente moduli da decifrare: della pratica ci
            occupiamo noi.
        </p>
        <p className={blocks.text}>
          Hai già il numero e vuoi indietro le settimane al 45%?{' '}
            <Link href="/it/tax-return" className={tb.inlineLink}>Quello è compito della tax return</Link>.
        </p>
      </Section>

      <Section tone="pale" title="Ci occupiamo solo di tasse per chi ha un visto working holiday." titleId="trust-title">
        <p className={blocks.text}>
          Ogni richiesta di TFN che prepariamo è di una persona con un visto 417 o 462. Working Holiday Tax opera sotto
            la supervisione di un agente fiscale registrato, e ogni tax return è rivista e approvata da un agente fiscale
            registrato prima di essere presentata all’ATO.
        </p>
        <GoogleReviewsServer lang="it" />
      </Section>

      <Section title="Domande frequenti sul TFN in Australia" titleId="faq-title">
        {/* L'Accordion divide le risposte alla riga vuota; faqLd sopra usa la stringa grezza. */}
        <Accordion items={FAQS} />
      </Section>

      {/* L'unica fascia ambra: la garanzia. */}
      <Section tone="amber" title="La nostra garanzia" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa. La garanzia vale solo per le dichiarazioni con reddito TFN.
        </p>
        <p className={blocks.text}>La tariffa è fissa e non è mai una percentuale di quello che ti torna.</p>
      </Section>

      <Section tone="pale" eyebrow="Guide" title="Altro sul TFN e sulle settimane al 45%" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="E poi" title="Dopo il TFN: ABN, super e tax return" titleId="next-title">
        <LinkRows
          items={[
            { href: '/it/abn', title: 'Ti chiedono un ABN?', desc: 'Se lavori come contractor ti serve un ABN oltre al TFN, e cambia cosa va nella tax return.' },
            { href: '/it/superannuation', title: 'La super che il datore di lavoro versa per te', desc: 'Il 12% in più sul fondo super, da recuperare con il DASP quando lasci l’Australia.' },
            { href: '/it/tax-return', title: 'Come funziona la tax return', desc: 'Dove si recupera quello che è stato trattenuto al 45%, se spetta.' },
            { href: '/it/dichiarazione-redditi-australia', title: 'Guida completa alla dichiarazione dei redditi in Australia', desc: 'Scadenze, aliquote, Medicare e rimborso, per chi ha un visto working holiday.' },
          ]}
        />
      </Section>

      {/* CTA finale, fascia verde. */}
      <Section tone="forest" title="Dicci a che punto sei" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          Dicci se sei già in Australia, se hai cominciato a lavorare e se qualche busta paga è già stata pagata al 45%.
            Con tre risposte ti diciamo cosa fare dopo, e se vuoi prepariamo noi la richiesta.
        </p>
        <WaButton href={WA_TFN} position="section" topic="tfn" lang="it" tone="light">Scrivici su WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Risposta in circa un’ora.</p>
      </Section>

      <MobileCta href={WA_TFN} lang="it" topic="tfn" />
    </>
  )
}
