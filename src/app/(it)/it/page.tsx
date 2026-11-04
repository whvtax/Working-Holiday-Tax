import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/(site)/HomeWa'
import { Accordion } from '@/components/ui/Accordion'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { ImageSlot } from '@/components/wht/ImageSlot'
import { Compare, Figures, LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

// ─── METADATA ───────────────────────────────────────────────────────────
// Italian home. The head terms are the ones Italians type ("rimborso tasse
// Australia", "tax return"). No price anywhere, and no keyword that claims we
// are a registered tax agent ourselves.
export const metadata: Metadata = {
  title: { absolute: 'Rimborso tasse Australia: tax return working holiday' },
  description:
    'Tax return in Australia per chi ha un visto Working Holiday 417 o 462. Residenza fiscale, Medicare e deduzioni, verificati prima dell’invio.',
  keywords: [
    'rimborso tasse Australia',
    'rimborso tasse Australia working holiday',
    'tax return Australia',
    'tax return Australia italiani',
    'dichiarazione dei redditi Australia',
    'dichiarazione dei redditi Australia working holiday',
    'working holiday Australia tasse',
    'tasse Australia working holiday',
    'come recuperare le tasse in Australia',
    'recuperare tasse Australia backpacker',
    'rimborso tasse visto 417',
    'rimborso tasse visto 462',
    'TFN Australia',
    'come ottenere il TFN',
    'superannuation come recuperarla',
    'recuperare la super Australia',
    'DASP Australia',
    'Medicare levy esenzione',
    'residenza fiscale working holiday Australia',
    'tax return dopo il rientro in Italia',
    'Notice of Assessment',
  ],
  alternates: {
    canonical: `${SITE_URL}/it`,
    languages: {
      'en-AU': SITE_URL,
      'de': `${SITE_URL}/de`,
      'ja': `${SITE_URL}/ja`,
      ...newLocaleLanguages('/'),
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it`,
    siteName: 'Working Holiday Tax',
    title: 'Rimborso tasse Australia: tax return Working Holiday',
    description:
      'Inviare è facile. Il lavoro vero viene prima: residenza fiscale, ogni datore di lavoro, l’esenzione Medicare e le deduzioni legate al lavoro che hai fatto.',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax: tax return in Australia per chi è con il Working Holiday' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rimborso tasse Australia | Working Holiday',
    description: 'Tax return in Australia per il Working Holiday. Residenza, Medicare, deduzioni e ogni datore di lavoro, verificati prima dell’invio.',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true, follow: true,
    googleBot: {
      index: true, follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

// ─── COPY ───────────────────────────────────────────────────────────────

const FIGURES = [
  {
    figure: '45%',
    body: 'Trattenuto all’aliquota massima nelle settimane in cui il datore di lavoro non aveva ancora il tuo TFN. La differenza si sistema solo con una tax return presentata.',
  },
  {
    figure: 'Caso per caso',
    body: 'La tua residenza fiscale. Dipende dai fatti individuali del tuo anno, la valutiamo noi e la decisione finale spetta all’ATO.',
  },
  {
    figure: '2%',
    body: 'Una Medicare levy che forse non dovevi. Dipende dalla tua situazione individuale.',
  },
]

const ANALYSIS = [
  {
    n: '01',
    title: 'La tua residenza fiscale',
    body: 'Quasi tutti spuntano una casella e non ci pensano più. La residenza fiscale è una valutazione, non una casella: se n’è occupata la High Court nel caso Addy, e il suo effetto varia da persona a persona. Lo valutiamo noi, e la decisione finale spetta all’ATO.',
  },
  {
    n: '02',
    title: 'Ogni datore di lavoro, ogni settimana',
    body: 'Un anno di Working Holiday è un po’ caotico: più datori di lavoro, paghe in ritardo, un lavoro dimenticato a marzo. Ricostruiamo tutto partendo dai dati dell’ATO, non dalla memoria.',
  },
  {
    n: '03',
    title: 'Medicare, se ti riguarda',
    body: 'Il 2% viene applicato di default, che tu lo debba o no. Dipende dalla tua situazione individuale. Verifichiamo se nel tuo caso lo era davvero.',
  },
  {
    n: '04',
    title: 'Deduzioni per il lavoro che hai fatto davvero',
    body: 'Chi raccoglie frutta, chi fa il barista e chi consegna cibo non deduce le stesse cose. Ti chiediamo come era fatto il tuo lavoro e poi dichiariamo quello che spetta.',
  },
  {
    n: '05',
    title: 'Poi viene inviata',
    body: 'Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO. I quattro passaggi precedenti sono quelli che decidono la cifra.',
  },
]

const COMPARISON = [
  { mygov: 'L’aliquota sembra uguale per tutti',            us: 'Verifichiamo cosa vale per te' },
  { mygov: 'Dell’esenzione Medicare nessuno ti parla',   us: 'Ti aiutiamo con la richiesta, se ne hai diritto' },
  { mygov: 'Le deduzioni sono una casella vuota',               us: 'Sappiamo cosa può dedurre il tuo tipo di lavoro' },
  { mygov: 'Servono un account e un numero di telefono attivo', us: 'Non ti serve niente. Ce la vediamo noi con l’ATO' },
]

const SERVICES = [
  { n: '01', href: '/it/tfn',            title: 'Richiesta del TFN',    desc: 'Prima della prima busta paga, così eviti le settimane all’aliquota massima.' },
  { n: '02', href: '/it/abn',            title: 'Registrazione ABN',    desc: 'Fatturare come lavoratore autonomo, con gli aspetti fiscali chiariti prima.' },
  { n: '03', href: '/it/tax-return',     title: 'Tax return',           desc: 'L’analisi completa qui sopra, poi l’invio all’ATO.' },
  { n: '04', href: '/it/superannuation', title: 'Rimborso della super', desc: 'Troviamo tutti i fondi, poi un’unica richiesta DASP quando parti.' },
  { n: '05', href: '/it/medicare',       title: 'Medicare levy',        desc: 'Il certificato di esenzione, se il tuo anno ne ha i requisiti.' },
]

const GUIDES = [
  { href: itGuideHref('diy-tax-return-vs-tax-agent-working-holiday'), title: 'Fai da te o con un tax agent' + itGuideSuffix('diy-tax-return-vs-tax-agent-working-holiday'),      desc: 'Quanto ti costa davvero ciascuna strada.' },
  { href: itGuideHref('tax-residency-working-holiday-makers'),        title: 'Sei residente ai fini fiscali?' + itGuideSuffix('tax-residency-working-holiday-makers'),     desc: 'Una valutazione che dipende dal caso individuale.' },
  { href: itGuideHref('medicare-levy-working-holiday-makers'),        title: 'L’esenzione dalla Medicare levy' + itGuideSuffix('medicare-levy-working-holiday-makers'), desc: 'Una valutazione che dipende dalla situazione individuale.' },
  { href: itGuideHref('tax-deductions-working-holiday-makers'),       title: 'Cosa puoi dedurre' + itGuideSuffix('tax-deductions-working-holiday-makers'),                  desc: 'Deduzioni in base al tipo di lavoro, non una lista generica.' },
]

const FAQS = [
  {
    question: 'Da cosa dipende quanto recupero con la tax return del Working Holiday?',
    answer: 'Da quattro cose: la tua residenza fiscale per quell’anno, se una parte della paga è stata trattenuta al 45% prima che il datore di lavoro avesse il tuo TFN, se è stata tolta la Medicare levy del 2% senza che ne avessi diritto (dipende dalla situazione individuale), e le deduzioni legate al lavoro che hai fatto.\n\nDue persone con lo stesso guadagno possono ottenere rimborsi molto diversi proprio per questi quattro motivi.',
  },
  {
    question: 'Posso fare la tax return per conto mio su myGov?',
    answer: 'Dipende dal tuo caso. Quello che non è semplice da vedere da soli è la tua residenza fiscale, se un datore di lavoro ha trattenuto con l’aliquota sbagliata, se la Medicare levy andava tolta oppure no, e cosa può dedurre il tuo tipo di lavoro. Sono queste quattro valutazioni a decidere la cifra.',
  },
  {
    question: 'Quanto costano i vostri servizi?',
    answer: 'Le nostre tariffe sono fisse e non sono mai una percentuale del tuo rimborso.\n\nTi confermiamo la tariffa su WhatsApp prima di iniziare e si paga in anticipo. Poi ti mandiamo il questionario completo e partiamo con il lavoro. La nostra garanzia: se il rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa. La garanzia vale solo per le dichiarazioni con reddito TFN.',
  },
  {
    question: 'Che aliquota pagano i working holiday maker in Australia?',
    answer: 'L’aliquota che ti riguarda dipende dai fatti individuali del tuo anno ed è l’ATO a deciderla. Il nostro team la verifica come parte della preparazione della tax return, e un agente fiscale registrato la approva prima della presentazione.\n\nSe non hai dato il TFN al datore di lavoro, può trattenere molto più del dovuto. È uno dei motivi più comuni per cui la ritenuta di un backpacker risulta più alta del dovuto.',
  },
  {
    question: 'Potete aiutarmi anche se ho già lasciato l’Australia?',
    answer: 'Sì. Chi viene dall’Italia, dalla Germania, dal Regno Unito, dal Giappone e da altri paesi presenta la tax return australiana e chiede la super (DASP) anche molto tempo dopo il volo di ritorno, tutto online.\n\nUna regola da sapere prima: l’ATO può pagare il rimborso fiscale solo su un conto bancario australiano, mentre il rimborso della super (DASP) può essere pagato anche all’estero. Se il tuo conto australiano è già chiuso, dillo subito, perché cambia l’ordine in cui lavoriamo.',
  },
  {
    question: 'Quanto ci mettete a rispondere?',
    answer: 'Dal lunedì al venerdì, dalle 9 alle 18, di solito rispondiamo entro un’ora. Fuori da quegli orari, la mattina dopo. Puoi anche fare solo una domanda, senza impegno.',
  },
  {
    question: 'Vi occupate solo di tax return?',
    answer: 'No. Ci occupiamo anche di richieste del TFN, registrazioni ABN, rimborso della super (DASP) ed esenzioni dalla Medicare levy, cioè quello che di solito serve a chi ha un visto 417 o 462.',
  },
]

const WA_TAX_RETURN = waUrl({ topic: 'tax-return', lang: 'it' })

export default async function ItalianHomePage() {

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/it/#webpage`,
    url: `${SITE_URL}/it`,
    name: 'Rimborso tasse Australia: tax return Working Holiday',
    description: 'Tax return in Australia per chi ha un visto Working Holiday 417 o 462. Residenza fiscale, ogni datore di lavoro, esenzione Medicare e deduzioni, verificati prima dell’invio.',
    inLanguage: 'it',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
  }

  // The business is one Organization (@id /#business), declared in the root
  // layout's graph, so nothing here re-declares it with a different type.
  const serviceLd = null as Record<string, unknown> | null

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'it',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    inLanguage: 'it',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/it` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      {serviceLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className={blocks.underHeader}>
      <Hero
        title={
          <>
            <span className={blocks.kicker}>Tax return Australia&nbsp;&middot; 417 &amp; 462</span>
            Inviare è facile. Il lavoro vero viene <Mark>prima.</Mark>
          </>
        }
        media={<ImageSlot id="IMG-W01" className={heroStyles.media} subject="Backpacker on a working holiday in Australia, at work on a farm or in a cafe" alt="Un backpacker al lavoro in Australia con il Working Holiday" tone="a" priority />}
      >
        <Lead>La cifra si decide prima che venga inviato qualsiasi cosa, e niente di tutto questo succede in automatico.</Lead>
        <WaButton href={WA_TAX_RETURN} position="hero" topic="tax-return" lang="it">Scrivici su WhatsApp</WaButton>
        <p className={heroStyles.note}>Risposta in circa un&rsquo;ora.</p>
        <GoogleRating variant="pill" lang="it" />
      </Hero>
      </div>

      <Section eyebrow="La domanda che fanno tutti" title="myGov accetta una tax return sbagliata come una giusta." titleId="mygov-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Niente, sullo schermo, controlla la tua residenza, la levy o quello che il tuo lavoro può dedurre.
        </p>
        <Compare rows={COMPARISON.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="Su myGov" rightLabel="Con noi" />
        <p className={blocks.statement}>
          Non devi mai entrare in myGov, collegare un documento australiano o capire quale modulo è quale. Ce la vediamo direttamente noi con l&rsquo;ATO.
        </p>
        <div className={blocks.stack}>
          <WaButton href={WA_TAX_RETURN} position="section" topic="tax-return" lang="it" size="md">Scrivici su WhatsApp</WaButton>
          <p className={blocks.small}>Risposta in circa un&rsquo;ora.</p>
        </div>
      </Section>

      <Section tone="pale" width="wide" title={'Da cosa dipende l\u2019importo del tuo rimborso?'} titleId="figures-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Di solito da quattro cose, e le prime tre sono qui sotto.</p>
        <Figures items={FIGURES} />
      </Section>

      <Section tone="amber" title="La nostra garanzia" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l&rsquo;intera tariffa. La garanzia vale solo per le dichiarazioni con reddito TFN.
        </p>
        <p className={blocks.text}>La tariffa è fissa e non è mai una percentuale di quello che ti torna indietro.</p>
      </Section>

      <Section id="how-it-works" eyebrow="Il lavoro" title="Cosa controlliamo in ogni tax return" titleId="analysis-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Quattro dei cinque passaggi avvengono prima ancora che venga scritto qualcosa nella tua dichiarazione.</p>
        <Steps items={ANALYSIS} />
      </Section>

      <Section tone="pale" title="Quale dei due è stato il tuo anno?" titleId="year-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Finiscono nella stessa dichiarazione, ma non nelle stesse righe. Scegli quello che ti somiglia.</p>
        <div className={blocks.cards}>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>Solo TFN</h3>
            <p className={blocks.text}>Ogni lavoro passava dalla busta paga e a ogni payslip veniva trattenuta la tassa.</p>
            <WaButton href={waUrl({ topic: 'tax-return', lang: 'it', tier: 'tfn' })} position="inline" topic="tax-return" lang="it" tier="tfn" size="md" fill>Sono io</WaButton>
          </div>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>TFN e ABN</h3>
            <p className={blocks.text}>Una parte del tuo reddito è passata da un ABN e su quella non è stato trattenuto niente.</p>
            <WaButton href={waUrl({ topic: 'abn', lang: 'it', tier: 'tfn-abn' })} position="inline" topic="abn" lang="it" tier="tfn-abn" size="md" fill>Sono io</WaButton>
          </div>
        </div>
        <p className={blocks.small}>
          Non sai quale ti riguarda?{' '}
          <WaLink href={waUrl({ topic: 'general', lang: 'it', tier: 'unsure' })} position="inline" topic="general" lang="it" tier="unsure" className={blocks.textLink}>
            Raccontaci com&rsquo;era il tuo lavoro
          </WaLink>
        </p>
      </Section>

      <Section eyebrow="Come ti aiutiamo" title="Dalla prima busta paga al rimborso della super" titleId="services-title">
        <LinkRows items={SERVICES.map(s => ({ href: s.href, eyebrow: s.n, title: s.title, desc: s.desc, cta: 'Scopri di più →' }))} />
      </Section>

      <ImageSlot id="IMG-W02" subject="Backpackers on a working holiday, a wide Australian scene (farm, beach town or city street)" alt="Backpacker con il Working Holiday in Australia" tone="b" className={blocks.band} />

      <Section tone="pale" title={'Le tasse del Working Holiday sono l\u2019unica cosa di cui ci occupiamo.'} titleId="trust-title">
        <p className={blocks.text}>
          Ogni tax return che prepariamo è per qualcuno con un visto 417 o 462 e viene rivista e approvata da un agente fiscale registrato prima di essere presentata all&rsquo;ATO.
        </p>
        <GoogleReviewsServer lang="it" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Un agente fiscale registrato non ti chiede mai le credenziali di myGov.</strong>{' '}
          Se qualcuno te le chiede, non è dei nostri.
        </p>
      </Section>

      <Section title="Le domande che arrivano prima del primo messaggio" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
        <p className={blocks.small}>
          Non trovi la tua domanda?{' '}
          <Link href="/it/contact" className={blocks.textLink}>Scrivici</Link>
        </p>
      </Section>

      <Section tone="pale" eyebrow="Guide" title="Preferisci leggere prima la risposta completa?" titleId="guides-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Non teniamo niente nascosto per costringerti a scriverci.</p>
        <LinkRows items={GUIDES} />
        <p>
          <Link href="/it/blog" className={blocks.textLink}>Tutte le guide →</Link>
        </p>
      </Section>

      <Section tone="forest" title="Raccontaci il tuo anno" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          Dove hai lavorato, più o meno quando, e se hai mai fatturato con un ABN. Ci basta per dirti a che punto sei.
        </p>
        <WaButton href={WA_TAX_RETURN} position="footer" topic="tax-return" lang="it" tone="light">Scrivici su WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Risposta in circa un&rsquo;ora.</p>
      </Section>

      <MobileCta href={WA_TAX_RETURN} lang="it" topic="tax-return" />
    </>
  )
}
