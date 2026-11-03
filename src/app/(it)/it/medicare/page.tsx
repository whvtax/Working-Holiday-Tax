import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, TitleLinks, coreBlocks } from '@/components/wht/CoreBlocks'
import { itGuideHref, itGuideSuffix } from '@/app/(it)/it/_blog-links'

/*
 * Pagina semplice. L'Italia è tra i Paesi con un reciprocal health care
 * agreement con l'Australia (stessa lista della pagina inglese), quindi per
 * l'esito dipende dal caso individuale. Non lo anticipiamo sulla pagina.
 */

const WA = waUrl({ topic: 'medicare', lang: 'it' })

export const metadata: Metadata = {
  title: { absolute: 'Medicare levy per italiani: serve l’esenzione?' },
  description:
    'La Medicare levy del 2% e l’esenzione per chi ha un visto 417 o 462: se si applica dipende dal caso individuale. Lo verifichiamo noi.',
  keywords: [
    'Medicare levy working holiday',
    'Medicare levy esenzione',
    'Medicare levy italiani Australia',
    'Medicare Australia visto 417',
    'Medicare Australia visto 462',
    'Medicare Entitlement Statement',
    'reciprocal health care agreement Italia Australia',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/medicare`,
    languages: {
      'en-AU': `${SITE_URL}/medicare`,
      de: `${SITE_URL}/de/medicare`,
      ja: `${SITE_URL}/ja/medicare`,
      ...newLocaleLanguages('/medicare'),
      'x-default': `${SITE_URL}/medicare`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-medicare.png`, width: 1200, height: 630, alt: 'Medicare levy per chi ha un visto working holiday: chi è esente' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/medicare`,
    siteName: 'Working Holiday Tax',
    title: 'Medicare levy per italiani: serve l’esenzione?',
    description: 'La Medicare levy del 2% e l’esenzione: dipende dal caso individuale, lo verifichiamo noi.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-medicare.png`],
    card: 'summary_large_image',
    title: 'Medicare levy per italiani: serve l’esenzione?',
    description: 'La Medicare levy del 2% e l’esenzione: dipende dal caso individuale, lo verifichiamo noi.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// Le risposte oltre le 55 parole hanno una riga vuota, e la FAQ qui sotto
// mostra un <p> per paragrafo. faqSchema usa ancora il testo grezzo.
const faqs = [
  {
    question: 'Quanto vale davvero l’esenzione dalla Medicare levy?',
    answer:
      'La levy è il 2% del reddito imponibile, quindi circa 500\u00a0$ su 25.000\u00a0$ guadagnati e circa 1.000\u00a0$ su 50.000\u00a0$. Viene calcolata quando l’ATO elabora la tua tax return, non è tolta dalla paga settimana per settimana, quindi, se hai diritto all’esenzione, è la richiesta nella dichiarazione a evitare di pagarla.',
  },
  {
    question: 'Posso avere l’esenzione?',
    answer:
      'Dipende dalla tua situazione individuale e non è qualcosa da dare per scontato. L’ATO decide in base ai fatti del tuo anno.\n\nPer questo controlliamo noi che la levy sia applicata correttamente e se una parte dell’anno fosse diversa.',
  },
  {
    question: 'Tutti i titolari di un visto 417 o 462 hanno l’esenzione?',
    answer:
      'Dipende dal caso individuale, non solo dal visto. Il diritto a Medicare varia da persona a persona e l’ATO decide in base ai fatti del tuo anno.\n\nNon è qualcosa da dare per scontato: lo valutiamo noi come parte della preparazione della tax return.',
  },
  {
    question: 'Cos’è un Medicare Entitlement Statement, e mi serve?',
    answer:
      'Un Medicare Entitlement Statement è un documento di Services Australia che conferma che non avevi diritto a Medicare per un certo periodo. È la prova dietro l’esenzione e l’ATO può chiedere di vederlo, quindi ce ne occupiamo noi nell’ambito della tua tax return.',
  },
  {
    question: 'Si può richiedere l’esenzione solo per una parte dell’anno?',
    answer:
      'A volte sì: dipende dal caso individuale. Si valuta per il periodo che riguarda davvero la tua situazione.\n\nRichiedere un anno intero quando ne vale solo una parte è il tipo di errore che porta poi a rettificare la dichiarazione.',
  },
  {
    question: 'L’assicurazione di viaggio o sanitaria privata cambia qualcosa?',
    answer:
      'No. La levy riguarda il diritto al sistema pubblico, non il fatto che tu sia assicurato, quindi l’assicurazione di viaggio e la copertura ospedaliera privata non c’entrano.\n\nLa copertura privata conta per un altro addebito, la Medicare levy surcharge, che si applica ai redditi alti ed è raramente rilevante con il working holiday.',
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
    { '@type': 'ListItem', position: 2, name: 'Medicare', item: `${SITE_URL}/it/medicare` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/it/medicare#service`,
  name: 'Esenzione dalla Medicare levy per working holiday maker',
  serviceType: 'Richiesta di esenzione dalla Medicare levy',
  description:
    'Esenzione dalla Medicare levy gestita nell’ambito della tax return di un working holiday maker, compreso il Medicare Entitlement Statement, per chi ha un visto 417 o 462 e non ha diritto a Medicare.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (subclass 417 / 462) senza diritto a Medicare' },
  inLanguage: 'it',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/it/medicare#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/it/medicare`,
  inLanguage: 'it',
}

const GUIDES = [
  { href: itGuideHref('medicare-levy-working-holiday-makers'), label: 'L’esenzione dalla Medicare levy per i working holiday maker' + itGuideSuffix('medicare-levy-working-holiday-makers') },
  { href: itGuideHref('countries-with-medicare-agreement-australia'), label: 'Quali Paesi hanno un accordo sanitario con l’Australia' + itGuideSuffix('countries-with-medicare-agreement-australia') },
  { href: itGuideHref('what-is-medicare-working-holiday-makers'), label: 'Cos’è Medicare e chi è davvero coperto' + itGuideSuffix('what-is-medicare-working-holiday-makers') },
  { href: itGuideHref('private-health-insurance-working-holiday-australia'), label: 'La copertura sanitaria privata cambia la levy?' + itGuideSuffix('private-health-insurance-working-holiday-australia') },
]

export default function MedicarePageIT() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className={blocks.underHeader}>
        <Crumb home="Home" current="Medicare" label="Percorso di navigazione" href="/it" />
        <Hero
          eyebrow="Medicare levy"
          title={<>La Medicare levy del 2%: <Mark>dipende dal tuo caso</Mark></>}
        >
          <div className="hero-sub">
            <Lead>Se la levy del 2% si applica nel tuo caso dipende dai fatti individuali del tuo anno. Lo verifichiamo noi come parte della tax return.</Lead>
          </div>
          <div className={coreBlocks.actions}>
            <WaButton href={WA} position="hero" topic="medicare" lang="it">Controlla la tua situazione</WaButton>
            <a href="#who-is-exempt" className={coreBlocks.hint}>Chi è esente</a>
          </div>
          <p className={heroStyles.note}>Risposta in circa un’ora.</p>
        </Hero>
      </div>

      <PhotoFrame page="medicare" locale="it" />

      <Section tone="pale" title="Perché la levy compare nella tua tax return?" titleId="why-title">
        <p className={blocks.text}>
          Perché è l’impostazione di default. Si applica a meno che non venga richiesta un’esenzione, e nessuno ti
          chiede se avevi diritto a Medicare. È il 2% del reddito imponibile e
          non compare mai in busta paga.
        </p>
        <p className={blocks.text}>
          L’errore più sottile è l’opposto: l’esenzione spuntata senza il documento che la sostiene. La prova è un
          Medicare Entitlement Statement di Services Australia, un ente diverso dall’ATO, e una richiesta fatta
          senza non si può difendere se viene contestata.
        </p>
      </Section>

      <Section id="who-is-exempt" title="Chi è esente dalla Medicare levy?" titleId="exempt-title">
        <p className={blocks.text}>
          Se sei esente dipende dal tuo caso individuale e viene valutato anno per anno. L’Australia ha accordi
          sanitari con alcuni Paesi, ma il loro effetto varia da persona a persona e non è qualcosa da dare per
          scontato.
        </p>
      </Section>

      <Section tone="amber" title="Cosa facciamo noi?" titleId="do-title">
        <p className={blocks.text}>Verifichiamo se avevi diritto a Medicare e per quale parte dell’anno.</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          La nostra garanzia: se il tuo rimborso fiscale è inferiore alla nostra tariffa, ti rimborsiamo la differenza dopo il Notice of Assessment. Se non c’è rimborso o devi pagare imposte, si applica l’intera tariffa.
        </p>
        <p className={blocks.text}>Rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO.</p>
        <div className={blocks.stack}>
          <WaButton href={WA} position="section" topic="medicare" lang="it" size="md">Scrivici su WhatsApp</WaButton>
          <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Risposta in circa un’ora.</p>
        </div>
      </Section>

      <Section title="Domande frequenti sulla levy e sull’esenzione" titleId="faq-title">
        {/* L'Accordion divide le risposte alla riga vuota; faqSchema sopra usa la stringa grezza. */}
        <Accordion items={faqs} />
      </Section>

      <Section tone="pale" title="Approfondisci Medicare e la copertura sanitaria" titleId="guides-title">
        <TitleLinks items={GUIDES} />
      </Section>

      <Section eyebrow="E poi" title="L’esenzione è una riga della tax return, non tutta la tax return" titleId="next-title">
        <p className={blocks.text}>Medicare, residenza fiscale e deduzioni dipendono dal caso individuale e si valutano insieme.</p>
        <LinkButton href="/it/tax-return">Come si prepara la tax return</LinkButton>
      </Section>

      <Section tone="forest" title="Controlla la tua situazione" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Lo verifichiamo noi, caso per caso.</p>
        <WaButton href={WA} position="footer" topic="medicare" lang="it" tone="light">Scrivici su WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Risposta in circa un’ora.</p>
      </Section>

      <MobileCta href={WA} lang="it" topic="medicare" />
    </>
  )
}
