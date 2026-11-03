import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { Compare, blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, TitleLinks, coreBlocks } from '@/components/wht/CoreBlocks'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

/*
 * Il punto di riferimento per tutto il gruppo di pagine sulla superannuation.
 * Ogni H2 è una domanda che qualcuno scrive davvero in Google, e ognuna riceve
 * subito una risposta completa che regge anche fuori contesto. Il livello
 * commerciale sta sotto la risposta, non al suo posto.
 */

const WA = waUrl({ topic: 'super', lang: 'it' })

export const metadata: Metadata = {
  title: { absolute: 'Recuperare la super in Australia (DASP 2026)' },
  description:
    'Hai lasciato l’Australia con un visto 417 o 462? La super si richiede con il DASP: chi può farlo, tassa del 65%, documenti e tempi.',
  keywords: [
    'superannuation Australia',
    'recuperare la super Australia',
    'riavere la superannuation',
    'superannuation working holiday',
    'DASP Australia',
    'DASP visto 417',
    'DASP visto 462',
    'come richiedere la super lasciando l’Australia',
    'Departing Australia Superannuation Payment',
    'tassa 65% superannuation working holiday',
    'super in più fondi Australia',
    'super trattenuta dall’ATO',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/superannuation`,
    languages: {
      'en-AU': `${SITE_URL}/superannuation`,
      de: `${SITE_URL}/de/superannuation`,
      ja: `${SITE_URL}/ja/superannuation`,
      ...newLocaleLanguages('/superannuation'),
      'x-default': `${SITE_URL}/superannuation`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-super.png`, width: 1200, height: 630, alt: 'Rimborso della super (DASP) per chi lascia l’Australia con un visto working holiday' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/superannuation`,
    siteName: 'Working Holiday Tax',
    title: 'Recuperare la super in Australia (DASP 2026)',
    description:
      'Chi può richiedere il DASP, quanto resta dopo la tassa del 65%, quali documenti servono e quanto ci vuole.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-super.png`],
    card: 'summary_large_image',
    title: 'Recuperare la super in Australia (DASP)',
    description: 'Requisiti, aliquota del 65%, documenti, tempi e più fondi: le risposte.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

/**
 * L'obiezione con cui arriva ogni contatto, risposta riferendosi alla super.
 * Ogni riga riguarda il DASP: il portale prende un fondo alla volta, e solo
 * quelli che sai nominare. Nessuna riga dice che il sistema dell'ATO sia
 * sbagliato. Fa un altro lavoro.
 */
const MYGOV = [
  {
    mygov: 'La richiesta gestisce un fondo alla volta, e solo quelli che conosci già.',
    us: 'Cerchiamo in ogni conto collegato al tuo tax file number, anche quelli che un datore di lavoro ha aperto senza chiederti niente.',
  },
  {
    mygov: 'Niente ti avvisa che un saldo ha già lasciato il fondo ed è finito all’ATO come super non reclamata.',
    us: 'Se è successo, il saldo è all’ATO: lo cerchiamo lì (circa sei mesi dopo la scadenza del visto) e lo chiediamo insieme agli altri.',
  },
  {
    mygov: 'La richiesta viene confrontata con il record del visto, e un visto non ancora cessato la blocca del tutto.',
    us: 'Controlliamo prima le condizioni, così non perdi tempo su una richiesta che non può ancora essere pagata.',
  },
  {
    mygov: 'La super è una richiesta e la tax return è un’altra. Niente le collega al posto tuo.',
    us: 'Le due richieste si possono preparare insieme, quindi seguiamo entrambe.',
  },
]

const faqs = [
  {
    question: 'Si può richiedere la super con un visto working holiday 417 o 462?',
    answer:
      'Sì, una volta che hai lasciato l’Australia e il tuo visto working holiday è cessato. Non puoi richiederla finché sei ancora qui con quel visto. La richiesta è un Departing Australia Superannuation Payment (DASP), viene trattenuto il 65% dell’importo tassato e, a differenza di un rimborso fiscale, può essere pagato su un conto all’estero.',
  },
  {
    question: 'Serve aiuto per richiedere la super?',
    answer:
      'Dipende dal tuo caso. Se hai un solo fondo e i documenti in ordine è più semplice. Si complica con la super sparsa su più fondi, con un fondo che vuole copie autenticate dall’estero o con un visto non ancora cessato.',
  },
  {
    question: 'Si matura la super se ho lavorato con un ABN?',
    answer:
      'In genere no. I contributi della super guarantee sono legati al lavoro PAYG da dipendente, quindi i lavori gig, il rideshare e il freelance fatturati con un ABN di solito non generano super. L’eccezione è il contractor che ha lavorato in pratica come un dipendente, dove la super può comunque essere dovuta.',
  },
  {
    question: 'Il DASP è la stessa cosa di un rimborso fiscale?',
    answer:
      'No, sono due pagamenti separati. Un rimborso fiscale è l’imposta trattenuta in eccesso dallo stipendio, pagata dall’ATO dopo che hai presentato la tax return. Un DASP è la super che il datore di lavoro ha versato sopra lo stipendio, rilasciata dal tuo fondo. Molti working holiday maker possono richiedere entrambi, ma dipende dal tuo caso.',
  },
  {
    question: 'Mi serve il tax file number per richiedere la super?',
    answer:
      'Di solito un fondo riesce a identificarti da nome, data di nascita e passaporto, quindi un TFN perso non blocca la richiesta. Il TFN resta però l’unico modo affidabile per trovare tutti i conti, e recuperarlo è più veloce che cercare fondo per fondo.',
  },
  {
    question: 'Perché l’aliquota del DASP è il 65% per i working holiday maker e il 35% per gli altri?',
    answer:
      'L’aliquota del 65% è fissata per legge per chiunque abbia mai avuto un visto subclass 417 o 462, anche se poi sei passato a un altro visto. I residenti temporanei che non ne hanno mai avuto uno pagano il 35% sulla parte tassata.',
  },
  {
    question: 'E se un datore di lavoro non ha mai versato la mia super?',
    answer:
      'Se un datore di lavoro avrebbe dovuto versare la super e non l’ha mai fatto, è una questione di super guarantee non pagata che l’ATO può indagare e recuperare per te. Segnalalo prima di fare la richiesta, perché i soldi recuperati dopo la chiusura dei tuoi conti significano una nuova richiesta.',
  },
  {
    question: 'Richiedere la super influisce sulla tax return o su un futuro visto australiano?',
    answer:
      'Su nessuno dei due. L’imposta trattenuta è definitiva, quindi un DASP non va nella tua tax return australiana e non è qualcosa da cui dipenda una successiva domanda di visto. L’unica conseguenza è che i conti si chiudono, quindi se torni a lavorare ricominci con un nuovo fondo.',
  },
  {
    question: 'Devo dichiarare la super anche in Italia?',
    answer:
      'Noi ci occupiamo solo delle tasse australiane. Se e come il pagamento vada dichiarato in Italia è una questione separata: chiedilo all’Agenzia delle Entrate.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'it',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/it` },
    { '@type': 'ListItem', position: 2, name: 'Superannuation', item: `${SITE_URL}/it/superannuation` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/it/superannuation#service`,
  name: 'Richiesta del DASP (superannuation) per working holiday maker',
  serviceType: 'Richiesta del Departing Australia Superannuation Payment (DASP)',
  description:
    'Richieste di Departing Australia Superannuation Payment per chi ha avuto un visto working holiday 417 o 462: dalla ricerca di ogni fondo collegato al tax file number fino al pagamento su un conto australiano o estero.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (subclass 417 / 462) che ha lasciato l’Australia' },
  inLanguage: 'it',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/it/superannuation#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/it/superannuation`,
  inLanguage: 'it',
}

/* ── Contenitore: ogni risposta della pagina è una Section ───────────────── */
function Answer({
  id, heading, children, tone = 'white',
}: { id: string; heading: string; children: React.ReactNode; tone?: 'white' | 'pale' | 'amber' }) {
  return (
    <Section id={id} tone={tone} title={heading} titleId={`${id}-title`}>
      {children}
    </Section>
  )
}

const GUIDES = [
  { href: itGuideHref('how-long-does-dasp-take'), label: 'Quanto ci mette un DASP, fase per fase' + itGuideSuffix('how-long-does-dasp-take') },
  { href: itGuideHref('dasp-documents-required'), label: 'I documenti che servono per un DASP' + itGuideSuffix('dasp-documents-required') },
  { href: itGuideHref('dasp-tax-rate-65-percent-explained'), label: 'Perché il DASP è tassato al 65% e cosa resta' + itGuideSuffix('dasp-tax-rate-65-percent-explained') },
  { href: itGuideHref('dasp-rejected-what-to-do'), label: 'Cosa fare se la richiesta di DASP viene respinta' + itGuideSuffix('dasp-rejected-what-to-do') },
  { href: itGuideHref('super-multiple-funds-consolidation'), label: 'Richiederla quando la super è in più fondi' + itGuideSuffix('super-multiple-funds-consolidation') },
  { href: itGuideHref('dasp-vs-leaving-super-in-australia-pros-cons'), label: 'Richiederla subito o lasciarla investita: il confronto' + itGuideSuffix('dasp-vs-leaving-super-in-australia-pros-cons') },
]

export default function SuperannuationPageIT() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className={blocks.underHeader}>
        <Crumb home="Home" current="Superannuation" label="Percorso di navigazione" href="/it" />
        <Hero
          eyebrow={<>Superannuation &middot; DASP</>}
          title={<>Come riavere la tua <Mark>superannuation</Mark> dopo aver lasciato l’Australia</>}
        >
          <div className="hero-sub">
            <Lead>Il datore di lavoro l’ha versata sopra lo stipendio, mai al suo posto. Di solito si trova ancora in Australia, in uno o più fondi.</Lead>
          </div>
          <div className={coreBlocks.actions}>
            <WaButton href={WA} position="hero" topic="super" lang="it">Chiedici della tua super</WaButton>
            <a href="#who-can-claim" className={coreBlocks.hint}>Parti dai requisiti</a>
          </div>
          <p className={heroStyles.note}>Risposta in circa un’ora.</p>
        </Hero>
      </div>

      <PhotoFrame page="superannuation" locale="it" />

      <Section eyebrow="Fai da te" title={<>Il modulo ha una casella per un fondo. <Mark>Quattro lavori occasionali possono voler dire quattro.</Mark></>} titleId="objection-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Due di quei conti sono stati aperti senza che tu abbia scelto niente.</p>
        <Compare rows={MYGOV.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="Sul portale dell’ATO" rightLabel="Con noi" />
        <p className={blocks.statement}>Non dovrai mai entrare in myGov né capire quale modulo sia quale. Ce la vediamo direttamente con l’ATO.</p>
      </Section>

      <Answer id="who-can-claim" heading="Chi può richiedere il DASP?" tone="pale">
        <p className={blocks.text}>
          Il Departing Australia Superannuation Payment si può richiedere quando il tuo visto temporaneo è scaduto
          o è stato annullato e hai lasciato l’Australia in via definitiva. Le due cose devono essere vere insieme.
          I cittadini australiani e neozelandesi e i residenti permanenti non possono richiederlo.
        </p>
        <p className={blocks.text}>
          Il tuo stato del visto viene verificato sui registri del Department of Home Affairs, quindi non c’è
          niente da dimostrare a parte. Un bridging visa, o essere ancora in Australia con qualsiasi visto valido,
          blocca la richiesta.
        </p>
      </Answer>
      <Answer id="how-much" heading="Quanto resta della super dopo la ritenuta?" tone="white">
        <p className={blocks.text}>I working holiday maker pagano una ritenuta del 65% sulla componente imponibile di un DASP, quindi ti arrivano più o meno 35 centesimi per dollaro. L’aliquota è fissata per legge per chiunque abbia avuto un visto 417 o 462, e nessun agente né nessuna attesa può ridurla.</p>
        <div className={coreBlocks.threeUp}>
          {[
            { bal: '3.000\u00a0$', net: '1.050\u00a0$', note: 'qualche mese di lavoro occasionale' },
            { bal: '6.000\u00a0$', net: '2.100\u00a0$', note: 'circa sei mesi a tempo pieno' },
            { bal: '10.000\u00a0$', net: '3.500\u00a0$', note: 'un anno intero di working holiday' },
          ].map((r, i) => (
            <div key={i} className={coreBlocks.stat}>
              <p className={coreBlocks.statLabel}>Saldo della super</p>
              <p className={blocks.cardTitle}>{r.bal}</p>
              <p className={coreBlocks.statNet}>{r.net}</p>
              <p className={blocks.small}>che ti arrivano &middot; {r.note}</p>
            </div>
          ))}
        </div>
        <p className={blocks.small}>Le cifre sono in dollari australiani, al netto della ritenuta del 65% del DASP, su un saldo fatto interamente di contributi tassati. Una componente non tassata, che alcuni fondi detengono, viene trattenuta a un’aliquota più alta: considerale illustrazioni, non un preventivo.</p>
      </Answer>
      <Answer id="documents" heading="Quali documenti servono per un DASP?" tone="pale">
        <p className={blocks.text}>
          Servono passaporto, tax file number, dati del visto, il nome di ogni fondo e possibilmente il numero di
          socio, più i dati bancari, australiani o esteri. Un numero di socio mancante di rado è un problema: un
          fondo può identificarti dal TFN e dalla data di nascita.
        </p>
        <p className={blocks.text}>
          Il passaggio che blocca le richieste è l’autenticazione. Quando un singolo fondo detiene 5.000&nbsp;$ o più,
          di solito vuole copie autenticate di passaporto e visto, e dall’estero ci vuole più tempo di quanto la
          gente si aspetti.
        </p>
      </Answer>
      <Answer id="how-long" heading="Quanto ci mette a essere pagato un DASP?" tone="white">
        <p className={blocks.text}>
          Il pagamento di solito arriva entro 28 giorni dall’approvazione. Il conto alla rovescia parte quando il
          fondo o l’ATO ha tutto quello che serve, non quando fai la richiesta, quindi una richiesta a cui manca un
          documento autenticato può restare ferma per settimane prima che quei 28 giorni comincino.
        </p>
        <p className={blocks.text}>
          Se i soldi sono sparsi su più fondi, la richiesta è veloce quanto il più lento di loro. I saldi già
          trasferiti all’ATO si richiedono all’ATO, con lo stesso standard.
        </p>
      </Answer>
      <Answer id="find-your-fund" heading="E se non sai in quale fondo della super eri?" tone="pale">
        <p className={blocks.text}>
          È la situazione normale. Ogni fondo in cui un datore di lavoro ha versato è collegato al tuo tax file
          number, quindi i conti si possono rintracciare da lì senza che tu ricordi il nome di un solo fondo. I
          saldi che un fondo ha già passato all’ATO compaiono nella stessa ricerca.
        </p>
        <p className={blocks.text}>
          La richiesta non è automatica: trovare un conto non presenta niente, e ogni fondo vuole comunque la sua
          domanda. Il conto che la gente dimentica è quasi sempre quello del primo lavoro.
        </p>
      </Answer>
      <Answer id="from-overseas" heading="Si può richiedere la super dall’Italia o da un altro Paese?" tone="white">
        <p className={blocks.text}>
          Sì, anzi è l’unico modo. Un DASP si può richiedere solo dopo aver lasciato l’Australia, quindi ogni
          richiesta parte dall’estero. Dove vivi adesso non c’entra.
        </p>
        <p className={blocks.text}>
          Una cosa da sistemare prima di chiudere il conto bancario australiano: non tutti i fondi fanno bonifici
          all’estero, e alcuni emettono un assegno, lento da incassare. Se e come il tuo Paese tassi il pagamento è
          una questione per un consulente di lì; per l’Italia, chiedi all’Agenzia delle Entrate.
        </p>
      </Answer>
      <Answer id="dasp-vs-leaving" heading="Conviene richiedere la super o lasciarla in Australia?" tone="pale">
        <p className={blocks.text}>
          Per quasi tutti i working holiday maker conviene richiederla. Un saldo lasciato lì non riceve più
          contributi ma continua a pagare spese di gestione e spesso premi assicurativi che dall’estero non puoi
          usare. Quello che resta finisce comunque all’ATO, non investito.
        </p>
        <p className={blocks.text}>
          L’argomento per lasciarla regge solo se hai intenzione di tornare in Australia a vivere e lavorare in
          modo permanente. Aspettare non riduce il 65%.{' '}
          <Link href={itGuideHref('dasp-vs-leaving-super-in-australia-pros-cons')} className={blocks.textLink}>
            Il confronto completo è qui{itGuideSuffix('dasp-vs-leaving-super-in-australia-pros-cons')}
          </Link>.
        </p>
      </Answer>
      <Answer id="while-in-australia" heading="Si può richiedere la super mentre sei ancora in Australia?" tone="white">
        <p className={blocks.text}>
          No. La super resta bloccata finché hai un visto valido e sei nel Paese, e con un visto working holiday
          non c’è sblocco anticipato per aver lasciato un lavoro o per difficoltà economiche.
        </p>
        <p className={blocks.text}>
          Se torni a casa molto prima della scadenza del visto, il Department of Home Affairs può annullare il
          visto residuo una volta che sei partito, il che di solito anticipa la richiesta.
        </p>
      </Answer>
      <Answer id="never-claimed" heading="Cosa succede alla tua super se non la richiedi mai?" tone="pale">
        <p className={blocks.text}>
          Non è persa. Circa sei mesi dopo la scadenza del visto e la tua partenza, un fondo deve trasferire un
          saldo non reclamato all’ATO, dove resta a tuo nome, senza spese. Una richiesta fatta anni dopo è comunque
          una richiesta, con la stessa aliquota del 65%.
        </p>
        <p className={blocks.text}>
          Quello che si perde sono le spese e i premi assicurativi che hanno ridotto il saldo prima del
          trasferimento. Su un saldo piccolo può essere una quota non trascurabile.
        </p>
      </Answer>
      <Answer id="with-us" heading="Farla fare a noi" tone="amber">
        <p className={blocks.text}>Ce ne occupiamo noi. Quello che facciamo per te è la ricerca su ogni conto collegato al tuo tax file number, super tenuta dall’ATO compresa, le copie autenticate organizzate dall’estero, una domanda separata a ogni fondo e i solleciti quando uno tace.</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa.
        </p>
        <p className={blocks.text}>Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.</p>
        <div className={blocks.stack}>
          <WaButton href={WA} position="section" topic="super" lang="it" size="md">Scrivici su WhatsApp</WaButton>
          <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Risposta in circa un’ora.</p>
        </div>
      </Answer>

      <Section title="Altre domande sul DASP" titleId="faq-title">
        <Accordion items={faqs} />
      </Section>

      <Section tone="pale" title="Approfondisci una parte della richiesta" titleId="guides-title">
        <TitleLinks items={GUIDES} />
      </Section>

      <Section eyebrow="E poi" title="La Medicare levy del 2%: dipende dal tuo caso" titleId="next-title">
        <p className={blocks.text}>Se l’esenzione si applica o no dipende dal caso individuale. Lo verifichiamo noi.</p>
        <LinkButton href="/it/medicare">Leggi di più sull’esenzione</LinkButton>
      </Section>

      <Section tone="forest" title="Chiedici della tua super" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Il datore di lavoro l’ha versata sopra lo stipendio, mai al suo posto. Di solito si trova ancora in Australia, in uno o più fondi.</p>
        <WaButton href={WA} position="footer" topic="super" lang="it" tone="light">Scrivici su WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Risposta in circa un’ora.</p>
      </Section>

      <MobileCta href={WA} lang="it" topic="super" />
    </>
  )
}
