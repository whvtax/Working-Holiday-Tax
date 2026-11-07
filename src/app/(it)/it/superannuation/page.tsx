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
import { Compare, Steps, blocks } from '@/components/wht/Blocks'
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
  title: { absolute: 'Rimborso superannuation Australia: come richiedere il DASP' },
  description:
    'Hai lasciato l’Australia con un visto 417 o 462? Recuperi la superannuation con il DASP: requisiti, passaggi, tassa del 65%, documenti e 28 giorni.',
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
    'riscattare la superannuation',
    'contributo pensionistico partenza dall’Australia',
    'super in più fondi Australia',
    'super trattenuta dall’ATO',
    'rimborso superannuation Australia',
    'recuperare superannuation dall’Italia',
    'domanda DASP online',
    'modulo DASP NAT 7204',
    'quando posso richiedere la super',
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
    title: 'Rimborso superannuation Australia: come richiedere il DASP',
    description:
      'Chi può richiedere il DASP, quanto resta dopo la tassa del 65%, quali documenti servono e quanto ci vuole.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-super.png`],
    card: 'summary_large_image',
    title: 'Rimborso della superannuation (DASP): come richiederlo',
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
    mygov: 'La domanda online può cercare i conti tramite il TFN, ma ogni conto trovato diventa una domanda a sé, con i suoi controlli d’identità.',
    us: 'Lavoriamo su ogni conto collegato al tuo tax file number, super tenuta dall’ATO compresa, e facciamo avanzare ogni domanda.',
  },
  {
    mygov: 'Dopo l’invio il sistema mostra la domanda come inviata, non se il fondo l’ha già lavorata. Per saperlo devi contattare ogni fondo.',
    us: 'I solleciti a ogni fondo li facciamo noi, finché non paga.',
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
      'Sì, una volta che hai lasciato l’Australia e il tuo visto working holiday è cessato. Non puoi richiederla finché sei ancora qui con quel visto. La richiesta è un Departing Australia Superannuation Payment (DASP), viene trattenuto il 65% della componente imponibile e, a differenza di un rimborso fiscale, può essere pagato su un conto all’estero se il fondo lo prevede.',
  },
  {
    question: 'Quando posso richiedere la super dopo aver lasciato l’Australia?',
    answer:
      'Appena valgono entrambe le condizioni: il visto è scaduto o annullato e hai lasciato l’Australia, senza un altro visto australiano attivo. Se sei partito prima della scadenza, il Department of Home Affairs può annullare il visto residuo quando sei all’estero. La domanda online dell’ATO puoi iniziarla prima di partire e inviarla dopo.',
  },
  {
    question: 'Il DASP si chiede online o c’è un modulo?',
    answer:
      'Ci sono entrambi. La domanda online del DASP dell’ATO è gratuita, se inserisci il TFN cerca i tuoi conti e crea una domanda per ogni conto, super tenuta dall’ATO compresa. Il modulo cartaceo è il NAT 7204, da mandare a ogni fondo separatamente.',
  },
  {
    question: 'Posso richiedere la super da solo?',
    answer:
      'Sì, ed è gratuito: la domanda online del DASP dell’ATO non costa niente. Con un solo fondo e i documenti in ordine te lo diciamo anche noi di farla da te. Si complica con la super sparsa su più fondi, con un fondo che vuole copie autenticate dall’estero o con un visto che risulta ancora attivo.',
  },
  {
    question: 'Si matura la super se ho lavorato con un ABN?',
    answer:
      'In genere no. I contributi della super guarantee sono legati al lavoro PAYG da dipendente, quindi i lavori gig, il rideshare e il freelance fatturati con un ABN di solito non generano super. L’eccezione è il contractor che ha lavorato in pratica come un dipendente, dove la super può comunque essere dovuta.',
  },
  {
    question: 'Il DASP è la stessa cosa di un rimborso fiscale?',
    answer:
      'No, sono due pagamenti separati. Un rimborso fiscale è l’imposta trattenuta in eccesso dallo stipendio, pagata dall’ATO dopo che hai presentato la tax return. Un DASP è la super che il datore di lavoro ha versato sopra lo stipendio, rilasciata dal tuo fondo. Molti working holiday maker hanno entrambe le pratiche da sistemare.',
  },
  {
    question: 'Mi serve il tax file number per richiedere la super?',
    answer:
      'No, nella domanda online il TFN è facoltativo, e un fondo di solito riesce a identificarti da nome, data di nascita e passaporto. Il TFN però permette al sistema dell’ATO di cercare tutti i tuoi conti, e recuperarlo è più veloce che cercare fondo per fondo.',
  },
  {
    question: 'Cosa cambia se la mia super è di 5.000 $ o più?',
    answer:
      'L’aliquota no. Può cambiare la parte burocratica: su una domanda cartacea per un saldo da 5.000 $ in su può servire il Certification of Immigration Status del Department of Home Affairs, che è a pagamento. Copie autenticate dei documenti d’identità invece un fondo può chiederle con qualsiasi saldo.',
  },
  {
    question: 'Perché la tassa sul DASP è così alta per i working holiday maker?',
    answer:
      'Perché la legge fissa un’aliquota separata del 65% per la super maturata con un visto 417 o 462, in vigore dal 1° luglio 2017. Se anche una parte del pagamento viene da contributi versati mentre avevi uno di quei visti, il 65% si applica all’intero pagamento. Gli altri residenti temporanei pagano il 35% sulla parte tassata e il 45% su quella non tassata.',
  },
  {
    question: 'E se un datore di lavoro non ha mai versato la mia super?',
    answer:
      'Se un datore di lavoro avrebbe dovuto versare la super e non l’ha mai fatto, è una questione di super guarantee non pagata che l’ATO può indagare e recuperare per te. Segnalalo prima di fare la richiesta, perché i soldi recuperati dopo la chiusura dei tuoi conti significano una nuova richiesta.',
  },
  {
    question: 'Richiedere la super influisce sulla tax return o su un futuro visto australiano?',
    answer:
      'No. L’ATO lo dice chiaramente: richiedere il DASP non influisce sulle future domande di visto. E non va nella tua tax return australiana, perché non fa parte del reddito imponibile e la ritenuta è definitiva. L’unica conseguenza è che i conti si chiudono, quindi se torni a lavorare in Australia ricominci con un nuovo fondo.',
  },
  {
    question: 'I residenti permanenti o i cittadini neozelandesi possono richiedere il DASP?',
    answer:
      'No. Il DASP è solo per chi ha avuto un visto temporaneo. I cittadini australiani e neozelandesi e i residenti permanenti non possono richiederlo. I cittadini neozelandesi in alcuni casi possono trasferire la super australiana in un fondo KiwiSaver, con le regole del trasferimento trans-tasmaniano.',
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
    'Aiuto con il Departing Australia Superannuation Payment per chi ha avuto un visto working holiday 417 o 462: ricerca di ogni conto collegato al tax file number, super tenuta dall’ATO compresa, documenti d’identità e solleciti ai fondi fino al pagamento su un conto australiano o estero.',
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
  { href: itGuideHref('how-to-find-lost-superannuation'), label: 'Come trovare la super persa o dimenticata' + itGuideSuffix('how-to-find-lost-superannuation') },
  { href: itGuideHref('what-happens-to-unclaimed-super'), label: 'Cosa succede alla super non reclamata' + itGuideSuffix('what-happens-to-unclaimed-super') },
]

const ATO_DASP = 'https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp'
const ATO_DASP_RATES = 'https://www.ato.gov.au/tax-rates-and-codes/key-superannuation-rates-and-thresholds/payments-from-super?anchor=DepartingAustraliasuperannuationpaymentD'
const ATO_BANK = 'https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details'

/** Le cifre del DASP, ognuna con la sua fonte ufficiale. Verificate il 5 novembre 2026. */
const KEY_FIGURES: { label: string; body: string; source: string; href?: string }[] = [
  { label: 'Ritenuta per chi ha un visto 417 o 462', body: '65% della componente imponibile, sia sulla parte tassata sia su quella non tassata. Componente esente: nessuna ritenuta. Dal 1° luglio 2017.', source: 'ATO, aliquote del DASP', href: ATO_DASP_RATES },
  { label: 'Altri visti temporanei', body: '35% sulla parte tassata, 45% sulla parte non tassata. Dal 1° luglio 2017.', source: 'ATO, aliquote del DASP', href: ATO_DASP_RATES },
  { label: 'Quando puoi richiederla', body: 'Il visto è scaduto o annullato, hai lasciato l’Australia e non hai un altro visto australiano attivo. Cittadini e residenti permanenti australiani o neozelandesi non possono richiederla.', source: 'ATO, requisiti del DASP', href: ATO_DASP },
  { label: 'Quanto costa farla da te', body: 'Niente: la domanda online del DASP dell’ATO è gratuita.', source: 'ATO', href: ATO_DASP },
  { label: 'Quanto ci vuole', body: 'In genere il pagamento arriva entro 28 giorni dal ricevimento della domanda completa.', source: 'ATO, come e quando viene pagato', href: ATO_DASP },
  { label: 'La super che non richiedi', body: 'Passa all’ATO quando sono trascorsi almeno 6 mesi dalla partenza e il visto è cessato. Resta richiedibile come DASP in qualsiasi momento.', source: 'ATO', href: ATO_DASP },
  { label: 'Saldi da 5.000 $ in su', body: 'Una domanda cartacea può richiedere il Certification of Immigration Status del Department of Home Affairs, che è a pagamento.', source: 'ATO, domande cartacee', href: ATO_DASP },
  { label: 'Dove arrivano i soldi', body: 'DASP: su un conto australiano, o estero se il fondo lo prevede. Rimborso fiscale: solo su un conto australiano.', source: 'ATO', href: ATO_BANK },
  { label: 'Contributo del datore di lavoro', body: '12% della retribuzione ordinaria (ordinary time earnings), dal 1° luglio 2025.', source: 'ATO' },
]

const HOW_TO_CLAIM = [
  { n: '01', title: 'Controlla di poterla richiedere', body: 'Il visto deve essere scaduto o annullato, devi aver lasciato l’Australia e non devi avere un altro visto australiano attivo.' },
  { n: '02', title: 'Trova tutti i conti', body: 'La domanda online del DASP dell’ATO cerca i conti tramite il tuo TFN, e myGov collegato all’ATO elenca ogni fondo in Super, poi Fund details, compresa la super già passata all’ATO.' },
  { n: '03', title: 'Fai domanda', body: 'La domanda online è gratuita e crea una domanda per ogni conto trovato. Puoi iniziarla e salvarla prima di partire e inviarla quando hai lasciato l’Australia. In alternativa c’è il modulo cartaceo NAT 7204, da mandare a ogni fondo.' },
  { n: '04', title: 'Dimostra la tua identità', body: 'Un fondo può chiedere copie autenticate dei documenti d’identità. Su una domanda cartacea per un saldo da 5.000 $ in su può servire anche il Certification of Immigration Status del Department of Home Affairs.' },
  { n: '05', title: 'Ricevi il pagamento', body: 'Viene trattenuto il 65% della componente imponibile. Secondo l’ATO il resto arriva in genere entro 28 giorni dalla domanda completa, su un conto australiano o, se il fondo lo prevede, su uno estero.' },
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
            <Lead>
              Recuperi la superannuation con il Departing Australia Superannuation Payment (DASP), quando il tuo visto 417
              o 462 è scaduto o annullato e hai lasciato l’Australia. La domanda online all’ATO è gratuita. Ai working
              holiday maker viene trattenuto il 65% della componente imponibile, e il resto può arrivare anche su un conto
              all’estero, se il tuo fondo lo prevede.
            </Lead>
            <p className={blocks.text}>
              Riscattare la superannuation, o chiederne il rimborso, significa proprio presentare questa domanda: nelle
              sue pagine in italiano l’ATO chiama il DASP «pagamento del contributo pensionistico per partenza
              dall’Australia».
            </p>
            <p className={blocks.text}>
              Secondo l’ATO il pagamento arriva in genere entro 28 giorni dal ricevimento della domanda completa. A
              bloccare una richiesta di solito sono un visto che risulta ancora attivo, un fondo di cui non sapevi niente o
              documenti d’identità che il fondo non accetta.
            </p>
          </div>
          <div className={coreBlocks.actions}>
            <WaButton href={WA} position="hero" topic="super" lang="it">Chiedici della tua super</WaButton>
            <a href="#who-can-claim" className={coreBlocks.hint}>Parti dai requisiti</a>
          </div>
          <p className={heroStyles.note}>Risposta in circa un’ora.</p>
        </Hero>
      </div>

      <PhotoFrame page="superannuation" locale="it" />

      <Section tone="pale" id="key-figures" title="I numeri del DASP, con la fonte" titleId="key-figures-title">
        <p className={blocks.small}>Dati verificati su ato.gov.au il 5 novembre 2026.</p>
        <ul className={coreBlocks.plain}>
          {KEY_FIGURES.map((f) => (
            <li key={f.label} className={coreBlocks.plainItem}>
              <h3 className={blocks.rowTitle}>{f.label}</h3>
              <p className={blocks.rowBody}>
                {f.body}{' '}
                {f.href ? (
                  <a href={f.href} className={blocks.textLink} target="_blank" rel="noopener noreferrer">
                    Fonte: {f.source}
                  </a>
                ) : (
                  <>Fonte: {f.source}.</>
                )}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Answer id="who-can-claim" heading="Chi può richiedere il DASP?" tone="white">
        <p className={blocks.text}>
          Il Departing Australia Superannuation Payment si può richiedere quando il tuo visto temporaneo è scaduto
          o è stato annullato, hai lasciato l’Australia e non hai un altro visto australiano attivo. Devono essere vere
          tutte e tre le cose insieme. I cittadini australiani e neozelandesi e i residenti permanenti non possono
          richiederlo.
        </p>
        <p className={blocks.text}>
          Quando fai domanda online, lo stato del tuo visto viene confrontato con i registri del Department of Home
          Affairs e l’ATO conferma i requisiti in automatico, quindi non c’è niente da dimostrare a parte. Un bridging
          visa, o essere ancora in Australia con qualsiasi visto valido, blocca la richiesta.
        </p>
        <p className={blocks.text}>
          Mentre lavori, il datore di lavoro deve versarti la super guarantee: il 12% della retribuzione ordinaria dal
          1° luglio 2025. Vale per il lavoro da dipendente; se hai fatturato con un{' '}
          <Link href="/it/abn" className={blocks.textLink}>ABN</Link>, di solito la super non matura.
        </p>
      </Answer>
      <Answer id="how-to-claim" heading="Come si richiede la super dopo aver lasciato l’Australia?" tone="pale">
        <Steps items={HOW_TO_CLAIM} />
        <p className={blocks.text}>
          Tutto qui. A far perdere tempo di solito sono i passaggi 2 e 4, ed è proprio la parte che prendiamo in carico
          noi se preferisci non occupartene.
        </p>
        <WaButton href={WA} position="section" topic="super" lang="it" size="md">Mandaci la tua situazione su WhatsApp</WaButton>
      </Answer>

      <Section eyebrow="Fai da te" title={<>Il modulo ha una casella per un fondo. <Mark>Quattro lavori occasionali possono voler dire quattro.</Mark></>} titleId="objection-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Due di quei conti sono stati aperti senza che tu abbia scelto niente.</p>
        <Compare rows={MYGOV.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="Sul portale dell’ATO" rightLabel="Con noi" />
        <p className={blocks.statement}>La domanda di DASP in sé non richiede myGov. Quello che porta via tempo è tutto il resto, ed è la parte di cui ci occupiamo noi.</p>
      </Section>

      <Answer id="how-much" heading="Quanto resta della super dopo la ritenuta?" tone="pale">
        <p className={blocks.text}>I working holiday maker pagano una ritenuta del 65% sulla componente imponibile di un DASP, quindi ti arrivano più o meno 35 centesimi per dollaro. L’aliquota è fissata per legge per la super maturata con un visto 417 o 462, e nessuna attesa può ridurla. Puoi fare una stima con il nostro <Link href="/it/calculator" className={blocks.textLink}>calcolatore</Link>.</p>
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
        <p className={blocks.small}>
          Le cifre sono in dollari australiani, al netto della ritenuta del 65% del DASP sulla componente imponibile. Per
          i working holiday maker lo stesso 65% vale sia per la parte tassata sia per quella non tassata; solo una
          componente esente, rara, viene pagata senza ritenuta. Considerale illustrazioni, non un preventivo.{' '}
          <Link href={itGuideHref('dasp-tax-rate-65-percent-explained')} className={blocks.textLink}>
            Perché l’aliquota è del 65%{itGuideSuffix('dasp-tax-rate-65-percent-explained')}
          </Link>
          .
        </p>
      </Answer>
      <Answer id="documents" heading="Quali documenti servono per un DASP?" tone="white">
        <p className={blocks.text}>
          Servono i dati del passaporto, il tax file number se ce l’hai, i dati del visto, il nome di ogni fondo e
          possibilmente il numero di socio o l’ABN del fondo, più i dati bancari, australiani o esteri. Un numero di
          socio mancante di rado è un problema: la domanda online cerca i conti tramite il TFN, e un fondo può
          identificarti dal TFN e dalla data di nascita. Se il TFN l’hai perso,{' '}
          <Link href="/it/tfn" className={blocks.textLink}>si recupera</Link>.
        </p>
        <p className={blocks.text}>
          Il passaggio che blocca le richieste è l’identità. Un fondo può chiedere copie autenticate dei documenti
          d’identità, e i fondi non accettano tutti gli stessi certificatori: dall’Italia ci vuole più tempo di quanto
          si pensi. Su una domanda cartacea per un saldo da 5.000&nbsp;$ in su può servire anche il Certification of
          Immigration Status del Department of Home Affairs, che è a pagamento.{' '}
          <Link href={itGuideHref('dasp-documents-required')} className={blocks.textLink}>
            L’elenco completo dei documenti{itGuideSuffix('dasp-documents-required')}
          </Link>
          .
        </p>
      </Answer>
      <Answer id="how-long" heading="Quanto ci mette a essere pagato un DASP?" tone="pale">
        <p className={blocks.text}>
          Secondo l’ATO un DASP viene pagato in genere entro 28 giorni dal ricevimento della domanda completa. Il conto
          alla rovescia parte da una domanda completa, non dal giorno in cui la inizi, quindi una richiesta a cui manca
          un documento autenticato o un dato del visto può restare ferma per settimane prima che quei 28 giorni
          comincino.{' '}
          <Link href={itGuideHref('how-long-does-dasp-take')} className={blocks.textLink}>
            Quanto dura ogni fase{itGuideSuffix('how-long-does-dasp-take')}
          </Link>
          .
        </p>
        <p className={blocks.text}>
          Se i soldi sono sparsi su più fondi, la richiesta è veloce quanto il più lento di loro. I saldi già
          trasferiti all’ATO si richiedono all’ATO, dove lo standard di servizio è sempre di 28 giorni dalla domanda.
        </p>
      </Answer>
      <Answer id="find-your-fund" heading="E se non sai in quale fondo della super eri?" tone="white">
        <p className={blocks.text}>
          È la situazione normale. Ogni fondo in cui un datore di lavoro ha versato è collegato al tuo tax file
          number, quindi i conti si possono rintracciare da lì senza che tu ricordi il nome di un solo fondo. I
          saldi che un fondo ha già passato all’ATO compaiono nella stessa ricerca. Le strade ufficiali per farla sono
          due: la domanda online del DASP dell’ATO, che cerca tramite TFN quando hai i requisiti, e myGov collegato
          all’ATO, che elenca ogni conto in Super, poi Fund details, compresa la super tenuta dall’ATO.{' '}
          <Link href={itGuideHref('how-to-find-lost-superannuation')} className={blocks.textLink}>
            Come trovare la super persa{itGuideSuffix('how-to-find-lost-superannuation')}
          </Link>
          .
        </p>
        <p className={blocks.text}>
          La richiesta non è automatica: trovare un conto non presenta niente, e ogni fondo vuole comunque la sua
          domanda. Il conto che la gente dimentica è quasi sempre quello del primo lavoro.
        </p>
      </Answer>
      <Answer id="from-overseas" heading="Si può richiedere la super dall’Italia o da un altro Paese?" tone="pale">
        <p className={blocks.text}>
          Sì, anzi è l’unico modo. Dall’Italia recuperi la superannuation con la domanda DASP online all’ATO o al tuo
          fondo, e ai working holiday maker viene trattenuto il 65% della componente imponibile: su 10.000 $ ne
          arrivano circa 3.500. Un DASP si può richiedere solo dopo aver lasciato l’Australia, quindi ogni richiesta
          parte dall’estero. Il perché dell’aliquota è nella guida sul{' '}
          <Link href={itGuideHref('dasp-tax-rate-65-percent-explained')} className={blocks.textLink}>
            DASP tassato al 65%{itGuideSuffix('dasp-tax-rate-65-percent-explained')}
          </Link>
          .
        </p>
        <p className={blocks.text}>
          Una cosa da sapere prima di chiudere il conto bancario australiano: il DASP può arrivare su un conto italiano
          solo se il tuo fondo prevede i pagamenti all’estero, e non tutti accettano conti come Wise o Revolut. Il
          rimborso fiscale invece l’ATO lo paga solo su un conto australiano, quindi la{' '}
          <Link href="/it/dichiarazione-redditi-australia" className={blocks.textLink}>tax return</Link> conviene
          chiuderla prima. Se e come l’Italia tassi il pagamento è una questione separata: chiedi all’Agenzia delle
          Entrate.
        </p>
      </Answer>
      <Answer id="while-in-australia" heading="Si può richiedere la super mentre sei ancora in Australia?" tone="white">
        <p className={blocks.text}>
          No. La super resta bloccata finché hai un visto valido e sei nel Paese, e con un visto working holiday
          non c’è sblocco anticipato per aver lasciato un lavoro o per difficoltà economiche.
        </p>
        <p className={blocks.text}>
          Se torni a casa molto prima della scadenza del visto, il Department of Home Affairs può annullare il
          visto residuo una volta che sei partito, il che di solito anticipa la richiesta. Quello che puoi fare prima
          del volo è iniziare la domanda online dell’ATO e salvarla, per poi inviarla quando sei partito e il visto è
          cessato.
        </p>
      </Answer>
      <Answer id="never-claimed" heading="Cosa succede alla super che non richiedi? Passa all’ATO?" tone="pale">
        <p className={blocks.text}>
          Non è persa. Quando sono trascorsi almeno sei mesi da quando hai lasciato l’Australia e il visto è cessato,
          il fondo deve trasferire il saldo all’ATO, in una delle due date di comunicazione dell’anno. Lì resta a tuo
          nome, al riparo dalle spese del fondo e dai premi assicurativi, e si può richiedere come DASP in qualsiasi
          momento, con la stessa aliquota del 65%.{' '}
          <Link href={itGuideHref('what-happens-to-unclaimed-super')} className={blocks.textLink}>
            Cosa succede alla super non reclamata{itGuideSuffix('what-happens-to-unclaimed-super')}
          </Link>
          .
        </p>
        <p className={blocks.text}>
          Quello che si perde sono le spese e i premi assicurativi che hanno ridotto il saldo prima del
          trasferimento. Su un saldo piccolo può essere una quota non trascurabile.
        </p>
      </Answer>
      <Answer id="dasp-vs-leaving" heading="Conviene richiedere la super o lasciarla in Australia?" tone="white">
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
      <Answer id="with-us" heading="Farla fare a noi" tone="amber">
        <p className={blocks.text}>Puoi farla da te, gratis. Quello che ci affidi è la ricerca su ogni conto collegato al tuo tax file number, super tenuta dall’ATO compresa, le copie autenticate organizzate dall’estero, una domanda per ogni conto e i solleciti quando un fondo tace.</p>
        <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Se ci affidi anche la tax return:</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa. La garanzia vale solo per le dichiarazioni con reddito TFN.
        </p>
        <p className={blocks.text}>
          La richiesta della super è separata dalla <Link href="/it/tax-return" className={blocks.textLink}>tax return</Link>. Se
          hai anche una tax return da presentare, viene rivista e approvata da un agente fiscale registrato prima di
          essere presentata all’ATO.
        </p>
        <div className={blocks.stack}>
          <WaButton href={WA} position="section" topic="super" lang="it" size="md">Scrivici su WhatsApp</WaButton>
          <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>
            Risposta in circa un’ora. Scrivici il visto, la data di partenza e i lavori che hai fatto: basta questo per
            partire.
          </p>
        </div>
      </Answer>

      <Section title="Altre domande sul DASP" titleId="faq-title">
        <Accordion items={faqs} />
      </Section>

      <Section tone="pale" title="Approfondisci una parte della richiesta" titleId="guides-title">
        <TitleLinks items={GUIDES} />
      </Section>

      <Section eyebrow="E poi" title="Prima della super, chiudi la tax return" titleId="next-title">
        <p className={blocks.text}>
          La super la richiedi dopo la partenza, ma se hai una tax return da presentare, un eventuale rimborso arriva
          solo su un conto australiano: conviene farla prima di chiudere il conto. La scadenza del 31 ottobre 2026 per
          chi la presenta da sé è passata, ma una tax return 2025-26 in ritardo si può ancora presentare.
        </p>
        <LinkButton href="/it/dichiarazione-redditi-australia">Come funziona la tax return →</LinkButton>
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
