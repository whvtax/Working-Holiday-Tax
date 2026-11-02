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
import { LinkButton } from '@/components/wht/Button'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { Figures, LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { Crumbs, PhotoBand, tb } from '@/components/wht/TfnAbnBlocks'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

// ─── METADATA ───────────────────────────────────────────────────────────
// Questa pagina riguarda le settimane tra il primo giorno di lavoro e il
// momento in cui il TFN arriva al datore di lavoro. Nessun prezzo e nessuna
// frase che ci presenti come agente fiscale registrato.
export const metadata: Metadata = {
  // Il layout radice aggiunge " | Working Holiday Tax": il titolo base resta
  // corto, così il tutto entra in un risultato di ricerca da telefono.
  title: 'TFN Australia: evita la tassa al 45%',
  description:
    'Il TFN è gratis. Costano le settimane prima: senza numero, il datore di lavoro trattiene il 45% invece dell’aliquota prevista.',
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
      'Il numero è gratis, le settimane senza no. Prepariamo e inviamo la richiesta del TFN per chi ha un visto 417 o 462.',
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
    title: 'A fine anno recuperiamo la differenza',
    body: 'Quello che è già stato trattenuto al 45% torna solo con una tax return, e solo se la dichiarazione lo riporta.',
  },
]

// Le risposte oltre le 55 parole hanno una riga vuota, e la FAQ qui sotto
// mostra un <p> per paragrafo. faqLd usa ancora il testo grezzo, quindi lo
// schema non cambia.
const FAQS = [
  {
    question: 'Posso richiedere il TFN da solo?',
    answer:
      'Il numero in sé è gratuito.\n\nQuello che si paga è il lavoro intorno: far combaciare i tuoi dati con il record dell’immigrazione, scegliere un indirizzo che tra quattro settimane riceva ancora posta e dare al datore di lavoro il numero di riferimento, perché le prime buste paga non vengano trattenute al 45%.',
  },
  {
    question: 'La richiesta del TFN è gratuita sul sito dell’ATO. Allora cosa pago?',
    answer:
      'Il numero in sé è gratis. A costare sono le settimane scoperte: ogni busta paga prima che il datore di lavoro abbia il numero viene trattenuta al 45%. Paghi il lavoro per chiudere quel periodo scoperto e per riavere quanto è già stato trattenuto.',
  },
  {
    question: 'Cosa succede se comincio a lavorare senza TFN?',
    answer:
      'Il datore di lavoro deve trattenere il 45% finché non gli comunichi un TFN, e hai 28 giorni dall’inizio del lavoro. È una trattenuta più alta di quella dovuta.\n\nI soldi non sono persi, ma tornano solo con una tax return presentata correttamente dopo la fine dell’anno fiscale.',
  },
  {
    question: 'Lavoro da settimane senza TFN. È troppo tardi?',
    answer:
      'No. Fai la richiesta adesso, così l’aliquota massima smette di applicarsi alle prossime buste paga. L’eccesso già trattenuto torna quando viene presentata la tax return di quell’anno fiscale.\n\nDi solito riusciamo a preparare la richiesta lo stesso giorno in cui ci scrivi. Dicci quante settimane sono già state pagate al 45%, perché cambia quello che la dichiarazione deve riportare.',
  },
  {
    question: 'Quanto tempo ci mette ad arrivare il TFN?',
    answer:
      'L’ATO dichiara di elaborare le richieste di TFN entro 28 giorni, e la maggior parte dei working holiday maker riceve il numero in due-quattro settimane. Arriva con una lettera all’indirizzo australiano indicato nella richiesta. Mentre aspetti, al datore di lavoro serve il numero di riferimento della richiesta.',
  },
  {
    question: 'Posso richiedere il TFN prima di arrivare in Australia?',
    answer:
      'Non con un visto working holiday. La richiesta si fa quando sei in Australia con il visto 417 o 462 attivato, perché viene confrontata con i dati del tuo ingresso e del visto. Serve anche un indirizzo postale australiano per la lettera.',
  },
  {
    question: 'Mi serve un nuovo TFN per il secondo anno di visto?',
    answer:
      'No. Il tax file number viene assegnato una volta sola e resta tuo per sempre, anche con un secondo o un terzo visto working holiday, con un cambio di tipo di visto e dopo un periodo fuori dall’Australia.\n\nSe il numero lo hai solo perso, invece, è un problema diverso e più veloce: dicci quale dei due casi è il tuo.',
  },
]

const GUIDES = [
  {
    href: itGuideHref('what-happens-without-your-tfn'),
    title: 'Lavorare senza TFN' + itGuideSuffix('what-happens-without-your-tfn'),
    desc: 'Il 45%, la finestra di 28 giorni e come tornano i soldi.',
  },
  {
    href: itGuideHref('tfn-reference-number-before-tfn-arrives'),
    title: 'Il numero di riferimento della richiesta' + itGuideSuffix('tfn-reference-number-before-tfn-arrives'),
    desc: 'Cosa dare al datore di lavoro mentre aspetti la lettera.',
  },
  {
    href: itGuideHref('how-long-does-it-take-to-get-a-tfn'),
    title: 'Quanto ci mette il TFN' + itGuideSuffix('how-long-does-it-take-to-get-a-tfn'),
    desc: 'Cosa promette l’ATO, cosa succede di solito e quando conviene sollecitare.',
  },
]

const WA_TFN = waUrl({ topic: 'tfn', lang: 'it' })

export default function TFNPageIT() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/it/tfn#webpage`,
    url: `${SITE_URL}/it/tfn`,
    name: 'TFN Australia con un visto working holiday',
    description:
      'Quanto costa lavorare prima che il TFN arrivi al datore di lavoro, perché le richieste di TFN dei working holiday maker si inceppano e come si recupera l’eccesso trattenuto.',
    inLanguage: 'it',
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
      'Richieste di TFN preparate e inviate per chi ha un visto working holiday 417 o 462, con il numero di riferimento per il datore di lavoro e i solleciti all’ATO.',
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
              <span className={blocks.kicker}>TFN Australia&nbsp;&middot; visto working holiday 417 e 462</span>
            Il TFN è gratis.<br />
            Le settimane <Mark>senza TFN</Mark> costano.
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              Finché il datore di lavoro non ha il tuo numero, ti trattiene il 45% della paga.
            </Lead>
          </div>
          <WaButton href={WA_TFN} position="hero" topic="tfn" lang="it">Scrivici su WhatsApp</WaButton>
          <p className={heroStyles.note}>Risposta in circa un’ora.</p>
          <GoogleRating variant="pill" lang="it" />
        </Hero>
        <PhotoBand page="tfn" locale="it" />
      </div>

      <Section width="wide" title="Quanto costa cominciare a lavorare prima che arrivi il TFN?" titleId="gap-title">
        <p className={blocks.text}>
          Se il datore di lavoro non ha il tuo TFN entro 28 giorni, deve trattenere il 45%.
            L’imposta in più non va persa e può tornare con la tax return che presenti dopo il
            30 giugno.
        </p>
        <Figures
          items={[
            { figure: '45%', body: 'Trattenuto da ogni dollaro finché non c’è un TFN.' },
            { figure: '28 giorni', body: 'Per dare il TFN al datore di lavoro e perché l’ATO lo emetta.' },
            { figure: '1 dichiarazione', body: 'L’unica strada per riavere quello che è già stato trattenuto in eccesso.' },
          ]}
        />
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
          Non dovrai mai entrare in myGov, collegare un documento o capire quale modulo sia quale. Ce la vediamo
            direttamente con l’ATO.
        </p>
        <p className={blocks.text}>
          Hai già il numero e vuoi indietro le settimane al 45%?{' '}
            <Link href="/it/tax-return" className={tb.inlineLink}>Quello è compito della tax return</Link>.
        </p>
      </Section>

      {/* L'unica fascia ambra: la garanzia. */}
      <Section tone="amber" title="La nostra garanzia" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa.
        </p>
        <p className={blocks.text}>La tariffa è fissa e non è mai una percentuale di quello che ti torna.</p>
      </Section>

      <Section tone="pale" title="Ci occupiamo solo di tasse per chi ha un visto working holiday." titleId="trust-title">
        <p className={blocks.text}>
          Ogni richiesta di TFN che inviamo è di una persona con un visto 417 o 462. Le dichiarazioni vengono
            riviste e approvate da un agente fiscale registrato prima di essere presentate all’ATO.
        </p>
        <GoogleReviewsServer lang="it" />
      </Section>

      <Section title="Domande sul TFN che ci fanno prima di scriverci" titleId="faq-title">
        {/* L'Accordion divide le risposte alla riga vuota; faqLd sopra usa la stringa grezza. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Guide" title="Altro sul TFN e sulle settimane al 45%" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="E poi" title="Le settimane al 45% tornano con la tax return" titleId="next-title">
        <p className={blocks.text}>Quando il numero è registrato, è la tax return a recuperare l’eccesso.</p>
        <div className={blocks.stack}>
          <LinkButton href="/it/tax-return" size="md">Come funziona la tax return →</LinkButton>
        </div>
      </Section>

      {/* CTA finale, fascia verde. */}
      <Section tone="forest" title="Dicci a che punto sei" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          Se sei già atterrato, se hai cominciato un lavoro e se qualcosa è già stato pagato al 45%. Tre risposte e
            ti diciamo cosa fare dopo.
        </p>
        <WaButton href={WA_TFN} position="section" topic="tfn" lang="it" tone="light">Scrivici su WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Risposta in circa un’ora.</p>
      </Section>

      <MobileCta href={WA_TFN} lang="it" topic="tfn" />
    </>
  )
}
