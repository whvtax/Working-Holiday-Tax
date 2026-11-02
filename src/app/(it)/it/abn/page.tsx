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
import { LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { Crumbs, PhotoBand, tb } from '@/components/wht/TfnAbnBlocks'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

// ─── METADATA ───────────────────────────────────────────────────────────
// Questa pagina riguarda la distinzione: cosa cambia un ABN nella tax return.
// Nessun prezzo e nessun titolo o keyword che dica che siamo agenti fiscali.
export const metadata: Metadata = {
  // Il layout radice aggiunge " | Working Holiday Tax": il titolo base resta corto.
  title: 'ABN working holiday: cosa cambia',
  description:
    'Un ABN cambia ciò che la tua tax return deve dichiarare: redditi fatturati senza ritenute, spese di lavoro, GST e se eri davvero un contractor.',
  keywords: [
    'ABN Australia',
    'ABN working holiday',
    'come richiedere l’ABN',
    'Australian Business Number',
    'ABN sole trader visto 417',
    'ABN sole trader visto 462',
    'ABN o TFN',
    'serve l’ABN con il working holiday',
    'dipendente o contractor Australia',
    'ABN spese deducibili',
    'GST soglia ABN working holiday',
    'ABN tax return Australia',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/abn`,
    languages: {
      'en-AU': `${SITE_URL}/abn`,
      de: `${SITE_URL}/de/abn`,
      ja: `${SITE_URL}/ja/abn`,
      ...newLocaleLanguages('/abn'),
      'x-default': `${SITE_URL}/abn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-abn.png`, width: 1200, height: 630, alt: 'ABN per chi ha un visto working holiday in Australia' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/abn`,
    siteName: 'Working Holiday Tax',
    title: 'ABN con il working holiday: cosa cambia',
    description:
      'Un ABN non cambia il tuo lavoro, cambia la tua tax return. Redditi fatturati, spese, GST e la domanda dipendente o contractor.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-abn.png`],
    card: 'summary_large_image',
    title: 'ABN con il working holiday: cosa cambia',
    description: 'Un ABN non cambia il tuo lavoro. Cambia la tua tax return.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** Le quattro cose che un ABN cambia nella dichiarazione. Questa è la pagina. */
const THE_SPLIT = [
  {
    n: '01',
    title: 'Non è stato trattenuto niente, quindi l’imposta è ancora da pagare',
    body: 'Lo stipendio arriva con le tasse già tolte. Le fatture no, e l’imposta sul reddito fatturato si regola una volta sola a fine anno. In un anno misto, la parte di buste paga sembra un rimborso e quella delle fatture no.',
  },
  {
    n: '02',
    title: 'Le deduzioni diventano spese d’impresa, e le regole cambiano',
    body: 'Da dipendente deduci le spese legate al lavoro. Da sole trader deduci i costi per portare avanti l’attività: una categoria più ampia, con documenti più rigorosi a sostegno.',
  },
  {
    n: '03',
    title: 'Sulla GST devi decidere, non è una formalità',
    body: 'La maggior parte dei working holiday maker non si avvicina mai alla soglia di fatturato di 75.000\u00a0$\u00a0AUD, quindi per lo più non va registrata. Il rideshare è l’eccezione. Sbagliare significa obblighi BAS che non servivano, oppure obblighi che hai perso.',
  },
  {
    n: '04',
    title: 'Se eri davvero un contractor',
    body: 'È la domanda che decide le altre tre. Essere davvero contractor dipende dal controllo, non dalle carte. Un ABN sopra un lavoro che era sempre stato da dipendente è il motivo più comune per cui la tax return di un backpacker va rifatta.',
  },
]

const WHAT_WE_DO = [
  {
    title: 'Verifichiamo che ti serva, prima che tu lo prenda',
    body: 'Tanti aprono un ABN per un lavoro che era sempre stato da dipendente. È una conversazione, non un modulo.',
  },
  {
    title: 'Lo registriamo sul lavoro che fai davvero',
    body: 'L’attività che dichiari ti segue nella GST, nelle deduzioni e nella dichiarazione.',
  },
  {
    title: 'Ti diciamo cosa mettere da parte',
    body: 'Più o meno quanto ti costerà, al momento delle tasse, il reddito fatturato, così il conto non è una sorpresa.',
  },
  {
    title: 'Ti diciamo cosa conservare',
    body: 'Quali documenti sostengono una deduzione nel tuo tipo di lavoro, e quali scontrini puoi smettere di accumulare.',
  },
  {
    title: 'Decidiamo sulla GST con cognizione di causa',
    body: 'Registrato perché le regole lo richiedono, oppure non registrato perché non lo richiedono. Mai per caso.',
  },
  {
    title: 'Mettiamo le due metà in un’unica dichiarazione',
    body: 'Il reddito da buste paga e quello fatturato vanno nella stessa dichiarazione, riconciliati sullo stesso anno.',
  },
]

// Le risposte oltre le 55 parole hanno una riga vuota, e la FAQ qui sotto
// mostra un <p> per paragrafo. faqLd usa ancora il testo grezzo.
const FAQS = [
  {
    question: 'Posso fare tutto da solo?',
    answer:
      'Sì, e se il tuo anno è fatto solo di buste paga è semplice.\n\nÈ l’ABN a renderlo meno semplice: dove passa il confine tra stipendio e reddito fatturato, se eri davvero un contractor, quali costi si deducono dalla parte fatturata e se dovevi registrarti per la GST. Sono valutazioni sul tuo anno, non caselle da compilare.',
  },
  {
    question: 'Come cambia l’ABN la mia tax return con il working holiday?',
    answer:
      'Lo stipendio ti arriva con le tasse già trattenute e con un income statement che il datore di lavoro invia all’ATO, quindi quella parte si riconcilia in gran parte da sola.\n\nIl reddito fatturato con l’ABN arriva senza tasse, si dichiara come reddito d’impresa e si riduce solo con le spese che puoi documentare. Si aggiungono la scelta sulla GST e la domanda se il rapporto fosse davvero da contractor. Le due metà finiscono comunque in un’unica dichiarazione.',
  },
  {
    question: 'Il mio datore di lavoro dice che mi serve un ABN per un normale lavoro a turni. È vero?',
    answer:
      'Di solito no, e vale la pena opporsi prima di registrarti. Se è lui a stabilire i tuoi turni, a dirti come si fa il lavoro, a fornire gli attrezzi e a poterti mandare a casa prima, ti stanno trattando da dipendente, qualunque cosa dicano le carte.\n\nCon un ABN il costo passa a te: niente tasse trattenute, niente superannuation, niente assicurazione infortuni, niente paga minima né maggiorazioni. Mandaci i dettagli del lavoro prima di accettare qualsiasi cosa.',
  },
  {
    question: 'Devo registrarmi per la GST con un visto working holiday?',
    answer:
      'Solo se il fatturato raggiunge 75.000\u00a0$\u00a0AUD in un anno, cosa da cui la maggior parte dei working holiday maker è lontanissima, oppure se fai rideshare. Chi fa il taxi o il rideshare (Uber compreso) deve registrarsi per la GST dalla prima corsa, anche se guadagna pochissimo.\n\nI rider del food delivery e i corrieri non rientrano in questa regola e restano soggetti alla soglia dei 75.000\u00a0$\u00a0AUD. La registrazione comporta i business activity statement trimestrali.',
  },
  {
    question: 'Posso avere sia un TFN sia un ABN?',
    answer:
      'Sì, e la maggior parte dei working holiday maker che lavorano da contractor finisce per averli entrambi. Il tax file number ti copre come dipendente, l’ABN come sole trader.\n\nNon vanno in dichiarazioni separate: una sola dichiarazione copre l’anno fiscale e riporta entrambi. Il TFN serve per primo, perché la richiesta di ABN viene confrontata con quello.',
  },
  {
    question: 'Cosa posso dedurre come spese d’impresa con un ABN?',
    answer:
      'I costi sostenuti per guadagnare quel reddito, ripartiti onestamente se qualcosa lo usi anche in privato.\n\nPer un rider sono i chilometri registrati bene, i costi di bici o veicolo, telefono e dati, assicurazione, attrezzatura e la commissione trattenuta dalla piattaforma. Per un subappaltatore in cantiere sono attrezzi, protezioni e spostamenti tra un lavoro e l’altro.\n\nNon includono mai il viaggio per arrivare in Australia, il normale tragitto da casa a un solo posto di lavoro, né ciò di cui non hai una prova.',
  },
  {
    question: 'Che fine fa il mio ABN quando lascio l’Australia?',
    answer:
      'Lo cancelli quando hai smesso di lavorare, perché un ABN attivo dice all’ATO che porti ancora avanti un’attività e che potresti avere obblighi.\n\nCancellarlo non cambia la dichiarazione dell’anno in cui hai lavorato, che va comunque presentata, né la possibilità di richiedere la superannuation maturata con il lavoro da dipendente nello stesso periodo. Se parti presto, dicci in anticipo: l’ordine tra cancellazione, dichiarazione e richiesta della super conta.',
  },
]

const GUIDES = [
  {
    href: itGuideHref('employee-vs-contractor-australia'),
    title: 'Dipendente o contractor' + itGuideSuffix('employee-vs-contractor-australia'),
    desc: 'Il test che applica l’ATO e quanto costa trovarsi dalla parte sbagliata.',
  },
  {
    href: itGuideHref('abn-deductions-business-expenses'),
    title: 'Deduzioni e spese con l’ABN' + itGuideSuffix('abn-deductions-business-expenses'),
    desc: 'Cosa può dedurre un sole trader, per tipo di lavoro, e i documenti che servono per ciascuna voce.',
  },
  {
    href: itGuideHref('gst-and-abn-for-working-holiday-makers'),
    title: 'GST e ABN' + itGuideSuffix('gst-and-abn-for-working-holiday-makers'),
    desc: 'La soglia di 75.000\u00a0$\u00a0AUD, l’eccezione del rideshare e cosa comporta registrarsi.',
  },
]

const WA_ABN = waUrl({ topic: 'abn', lang: 'it' })

export default function ABNPageIT() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/it/abn#webpage`,
    url: `${SITE_URL}/it/abn`,
    name: 'ABN con un visto working holiday',
    description:
      'Cosa cambia un ABN nella tax return australiana di un working holiday maker: reddito fatturato senza ritenute, spese d’impresa, scelta sulla GST e la domanda dipendente o contractor.',
    inLanguage: 'it',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/it/abn#service`,
    name: 'Registrazione dell’ABN per working holiday maker',
    serviceType: 'Registrazione dell’Australian Business Number',
    description:
      'Registrazione dell’ABN per chi ha un visto working holiday 417 o 462 e svolge un vero lavoro da contractor, con la scelta sulla GST, conservazione dei documenti e conseguenze fiscali chiarite prima della registrazione.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (subclass 417 e 462) che lavora come sole trader' },
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
      { '@type': 'ListItem', position: 2, name: 'ABN', item: `${SITE_URL}/it/abn` },
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
        <Crumbs homeHref="/it" home="Home" current="ABN" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>ABN con il visto working holiday&nbsp;&middot; 417 e 462</span>
            Un ABN non cambia il tuo lavoro.<br />
            Cambia <Mark>la tua tax return.</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              Reddito senza ritenute, spese d’impresa, una scelta sulla GST e una domanda sotto tutte e tre: eri
            davvero un contractor?
            </Lead>
          </div>
          <WaButton href={WA_ABN} position="hero" topic="abn" lang="it">Scrivici su WhatsApp</WaButton>
          <p className={heroStyles.note}>Risposta in circa un’ora.</p>
          <GoogleRating variant="pill" lang="it" />
        </Hero>
        <PhotoBand page="abn" locale="it" />
      </div>

      <Section eyebrow="La differenza" title="Cosa cambia nella tua tax return quando hai un ABN?" titleId="split-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Quattro cose, e si sommano.
        </p>
        <Steps items={THE_SPLIT} />
      </Section>

      <Section tone="pale" title="Devi aprire un ABN perché un datore di lavoro te l’ha chiesto?" titleId="warn-title">
        <p className={blocks.text}>
          Non prima che qualcuno abbia guardato il lavoro. Un ABN sopra un lavoro che in realtà è da dipendente
            ferma la tua superannuation e le ritenute fiscali, toglie l’assicurazione infortuni e ti lascia fuori dalla
            paga minima e dalle maggiorazioni. Tutto diventa un costo tuo. Succede spesso nei lavori in farm, nella
            ristorazione, nelle pulizie e nei cantieri.
        </p>
        <p className={blocks.text}>
          Il test è il controllo, non le carte. Chi decide quando lavori, chi dirige come si fa il lavoro, chi fornisce
            l’attrezzatura e chi si prende il rischio se il lavoro va male. Se le risposte indicano loro, l’ABN è lo
            strumento sbagliato.
        </p>
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Mandaci il lavoro prima di registrarti.</strong>{' '}
          Cosa comporta, chi fornisce cosa e come verrai pagato. Ti diciamo di quale dei due casi si tratta.
        </p>
      </Section>

      <Section eyebrow="Il lavoro" title="Cosa facciamo noi" titleId="work-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          La registrazione in sé è gratuita e richiede pochi minuti. Quello che decide quanto ti costa succede prima e
            dopo.
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
          Non hai ancora né un ABN né un tax file number? Prima viene il{' '}
            <Link href="/it/tfn" className={tb.inlineLink}>TFN</Link>, perché la richiesta di ABN
            viene confrontata con quello.
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
          Per questo vediamo sempre gli stessi schemi con l’ABN: il contratto in farm, la piattaforma di delivery, il
            cantiere che paga tutti come subappaltatori.
        </p>
        <GoogleReviewsServer lang="it" />
      </Section>

      <Section title="Domande sull’ABN che ci fanno prima di scriverci" titleId="faq-title">
        {/* L'Accordion divide le risposte alla riga vuota; faqLd sopra usa la stringa grezza. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Guide" title="Altro su contractor, spese e GST" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="E poi" title="Le due metà finiscono in una sola dichiarazione" titleId="next-title">
        <p className={blocks.text}>Il reddito da buste paga e quello fatturato vanno nella stessa tax return dello stesso anno.</p>
        <div className={blocks.stack}>
          <LinkButton href="/it/tax-return" size="md">Come funziona la tax return →</LinkButton>
        </div>
      </Section>

      {/* CTA finale, fascia verde. */}
      <Section tone="forest" title="Raccontaci com’è il lavoro" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          A chi fatturerai, cosa farai e chi fornisce l’attrezzatura. Basta questo per dirti se un ABN c’entra
            qualcosa.
        </p>
        <WaButton href={waUrl({ topic: 'abn', lang: 'it', tier: 'tfn-abn' })} position="section" topic="abn" lang="it" tier="tfn-abn" tone="light">Scrivici su WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Risposta in circa un’ora.</p>
      </Section>

      <MobileCta href={WA_ABN} lang="it" topic="abn" />
    </>
  )
}
