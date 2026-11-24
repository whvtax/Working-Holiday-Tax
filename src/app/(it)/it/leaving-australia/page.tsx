import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Mark } from '@/components/wht/Type'
import { blocks } from '@/components/wht/Blocks'
import { WaButton } from '@/components/wht/WaButton'
import { LIVE_IT_GUIDES } from '@/app/(it)/it/_blog-links'
import {
  LeavingAustraliaPage, LinkList, SRC, StepList, StepTable, leavingLanguages, makeGuides,
} from '@/app/(site)/leaving-australia/LeavingAustraliaPage'

/*
 * Hub IT: lasciare l’Australia (piano 3, secondo giro, 24 nov 2026). Stessi fatti di
 * /leaving-australia (r16, r13, r14, r20), del tu. La tax return punta alla pagina
 * principale /it/dichiarazione-redditi-australia; una guida è collegata in italiano
 * solo se esiste in italiano.
 */

const WA = waUrl({ topic: 'tax-return', lang: 'it', detail: 'sto lasciando l’Australia' })
const LIVE = new Set(LIVE_IT_GUIDES)
const G = makeGuides('/it', s => LIVE.has(s), ' (in inglese)')
const TAX_RETURN = '/it/dichiarazione-redditi-australia'

export const metadata: Metadata = {
  title: { absolute: 'Lasciare l’Australia dopo il working holiday: tasse e super' },
  description:
    'Lasci l’Australia dopo il working holiday? Cosa fare prima di partire e cosa dopo: tax return, super (DASP), conto bancario e myGov, nell’ordine giusto.',
  keywords: [
    'lasciare l’Australia tasse',
    'partenza Australia working holiday cosa fare',
    'tax return dopo la partenza Australia',
    'tax return prima di lasciare l’Australia',
    'richiedere la super dopo la partenza',
    'DASP dopo la partenza',
    'chiudere conto australiano',
    'fine working holiday Australia checklist',
  ],
  alternates: {
    canonical: `${SITE_URL}/it/leaving-australia`,
    languages: leavingLanguages(),
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-super.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/it/leaving-australia`,
    siteName: 'Working Holiday Tax',
    title: 'Lasciare l’Australia: tax return e super, nell’ordine giusto',
    description: 'Cosa fare prima di partire, cosa resta aperto dopo e in che ordine.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-super.png`],
    card: 'summary_large_image',
    title: 'Lasciare l’Australia: tasse e super',
    description: 'Prima di partire, dopo la partenza e cosa può aspettare.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const src = (href: string, text: string) => (
  <a href={href} target="_blank" rel="noopener" className={blocks.textLink}>{text}</a>
)

const faqs = [
  {
    question: 'Posso fare la tax return prima di lasciare l’Australia?',
    answer:
      'Solo in un caso. Se lasci l’Australia per sempre e non avrai altri redditi australiani oltre a interessi, dividendi o royalties, l’ATO accetta la dichiarazione prima della fine dell’anno fiscale, il 30 giugno. Se la presenti da solo va fatta sul modulo cartaceo, e secondo l’ATO l’elaborazione richiede 50 giorni lavorativi.\n\nTutti gli altri la presentano dal 1° luglio, da dovunque si trovino. Aspettare non ti fa perdere nulla.',
  },
  {
    question: 'Posso fare la tax return dopo essere partito?',
    answer:
      'Sì. La tax return copre il periodo dal 1° luglio al 30 giugno e si presenta dal 1° luglio, da qualsiasi paese. Se la presenti da solo la scadenza è il 31 ottobre, e secondo l’ATO la maggior parte delle dichiarazioni presentate online viene elaborata entro 10 giorni lavorativi. L’eventuale rimborso arriva su un conto bancario australiano.',
  },
  {
    question: 'Devo chiudere il conto australiano prima di partire?',
    answer:
      'No, non prima che rimborso e super siano arrivati. L’ATO paga i rimborsi fiscali solo su un conto bancario australiano, e la super che tiene lei solo su un conto australiano a tuo nome o con assegno.\n\nSe il conto è già chiuso, il pagamento torna all’ATO tramite la Reserve Bank, e possono servire fino a 10 giorni. Con nuove coordinate australiane l’ATO paga di nuovo; senza, riemette il rimborso con assegno, e alcuni assegni li trattiene fino a 90 giorni mentre chiede le coordinate bancarie.',
  },
  {
    question: 'Quando posso chiedere la super dopo la partenza?',
    answer:
      'Quando valgono tre cose insieme: il visto è terminato, per scadenza o cancellazione, hai lasciato l’Australia e non hai un altro visto australiano attivo. La domanda online di DASP dell’ATO si può iniziare prima di partire, ma si invia solo dopo. Secondo l’ATO il DASP viene di solito pagato entro 28 giorni dalla ricezione di una domanda completa.',
  },
  {
    question: 'Cosa succede alla super se non la chiedo?',
    answer:
      'Non va persa. Dopo 6 mesi o più dalla partenza, con il visto terminato, il fondo trasferisce il saldo all’ATO. Puoi chiederlo all’ATO in qualsiasi momento come DASP, ma l’ATO lo paga solo su un conto australiano a tuo nome o con assegno, non con bonifico internazionale.',
  },
  {
    question: 'Mi serve myGov dopo la partenza?',
    answer:
      'Con noi no. Ce la vediamo direttamente noi con l’ATO, quindi non ti serve myGov perché prepariamo la tua tax return. Nemmeno la domanda online di DASP dell’ATO usa l’accesso a myGov. myGov ti serve solo per presentare da solo con myTax, e i suoi codici SMS arrivano solo a un numero australiano.',
  },
  {
    question: 'La super e il rimborso delle tasse sono la stessa cosa?',
    answer:
      'No, sono due pagamenti separati. Il rimborso è l’imposta trattenuta in più sullo stipendio, pagato dall’ATO dopo la tax return. Il DASP è la super che i datori di lavoro hanno versato oltre allo stipendio, pagata da ogni fondo quando il visto è terminato. Molti hanno da recuperare entrambi.',
  },
  {
    question: 'Il rimborso può arrivare su un conto italiano?',
    answer:
      'No. L’ATO paga i rimborsi fiscali solo su un conto bancario australiano. Con la super è diverso: un fondo può pagare il DASP con bonifico internazionale, se lo prevede. La super già passata all’ATO, invece, va solo su un conto australiano o con assegno.',
  },
  {
    question: 'Sono partito anni fa senza dichiarare. È troppo tardi?',
    answer:
      'No. Una tax return in ritardo si può ancora presentare, e la super rimasta in Australia si può ancora chiedere all’ATO. L’ATO può applicare una sanzione per il ritardo, ma dice che in genere non lo fa per un ritardo isolato.',
  },
]

const MYGOV_GUIDES = G.list([
  { slug: 'mygov-problems-tax-return-super', label: 'myGov non funziona: tasse e super' },
  { slug: 'mygov-sms-code-not-received-overseas', label: 'Il codice SMS di myGov non arriva all’estero' },
  { slug: 'mygov-account-locked-out', label: 'Account myGov bloccato' },
  { slug: 'cant-link-ato-to-mygov', label: 'Non riesci a collegare l’ATO a myGov' },
  { slug: 'myid-foreign-passport-working-holiday', label: 'myID con un passaporto straniero' },
  { slug: 'tax-return-without-mygov', label: 'La tax return senza myGov' },
  { slug: 'claim-super-without-mygov', label: 'Chiedere la super senza myGov' },
])

const GUIDES = G.list([
  { slug: 'tax-obligations-after-leaving-australia', label: 'Cosa resta da fare dopo la partenza' },
  { slug: 'early-tax-return-leaving-australia', label: 'La tax return prima di partire' },
  { slug: 'how-to-lodge-tax-return-from-overseas', label: 'Presentare la tax return dall’estero' },
  { slug: 'how-to-update-address-with-ato', label: 'Cambiare indirizzo con l’ATO' },
  { slug: 'tax-refund-closed-australian-bank-account', label: 'Rimborso con il conto australiano chiuso' },
  { slug: 'tax-and-super-timeline-working-holiday', label: 'Tasse e super: il calendario 2026-27' },
  { slug: 'how-long-does-dasp-take', label: 'Quanto ci mette il DASP' },
  { slug: 'what-happens-to-unclaimed-super', label: 'Cosa succede alla super non richiesta' },
])

export default function LeavingAustraliaItPage() {
  return (
    <LeavingAustraliaPage
      lang="it"
      inLanguage="it-IT"
      path="/it/leaving-australia"
      homeHref="/it"
      crumb={{ home: 'Home', current: 'Lasciare l’Australia', label: 'Percorso' }}
      wa={WA}
      name="Lasciare l’Australia: tax return e super, nell’ordine giusto"
      hero={{
        eyebrow: <>Partenza &middot; Tax return &middot; Super</>,
        title: <>Lasciare l’Australia: <Mark>tax return e super</Mark>, nell’ordine giusto</>,
        lead: <>Prima di lasciare l’Australia tieni aperto il conto australiano, aggiorna il tuo indirizzo con l’ATO e inizia la domanda per la super. Dopo la partenza presenti la tax return quando l’anno fiscale si è chiuso il 30 giugno, e invii la domanda di super (DASP) quando il visto è terminato. Con noi non ti serve myGov per nessuna delle due, e se sei già partito non hai perso nulla.</>,
        sub: <>Tax return e super sono due richieste separate, con due calendari. Il rimborso delle tasse arriva dall’ATO e solo su un conto australiano. La super arriva da ogni fondo, di solito entro 28 giorni da una domanda completa, e un fondo che prevede il bonifico internazionale può pagarla sul tuo conto in Italia.</>,
        cta: 'Chiedici prima di partire',
        hint: 'Vedi l’ordine dei passi',
        hintHref: '#order',
        note: 'Risposta in circa un’ora.',
      }}
      sections={[
        {
          id: 'before-you-fly',
          title: 'Cosa fare prima di lasciare l’Australia?',
          tone: 'pale',
          body: (
            <>
              <p className={blocks.text}>Sei cose, quasi tutte da pochi minuti, e tutte più semplici finché sei ancora in Australia.</p>
              <StepList items={[
                {
                  title: 'Tieni aperto il conto australiano.',
                  body: <>L’ATO paga i rimborsi fiscali solo su un conto australiano, e la super che tiene lei solo su un conto australiano a tuo nome o con assegno. Chiudilo quando è arrivato tutto. Già chiuso? Leggi {G.link('tax-refund-closed-australian-bank-account', 'rimborso con il conto chiuso')}.</>,
                },
                {
                  title: 'Conserva le ultime buste paga e l’elenco dei lavori.',
                  body: <>Ogni datore di lavoro che ti ha pagato in busta paga comunica il tuo reddito all’ATO, quindi perdere le buste paga non è un dramma. Un elenco di dove hai lavorato e più o meno quando, però, fa saltare subito all’occhio un lavoro mancante e serve a trovare ogni fondo di super.</>,
                },
                {
                  title: 'Aggiorna il tuo indirizzo con l’ATO.',
                  body: <>Le lettere, compreso il Notice of Assessment e un eventuale assegno, vanno all’indirizzo che l’ATO ha registrato. Come fare: {G.link('how-to-update-address-with-ato', 'cambiare indirizzo con l’ATO')}. Se prepariamo noi la tua tax return, aggiorniamo noi l’indirizzo con l’ATO.</>,
                },
                {
                  title: 'Controlla se puoi presentare in anticipo.',
                  body: <>L’ATO accetta una dichiarazione prima del 30 giugno solo se parti per sempre e non avrai altri redditi australiani oltre a interessi, dividendi o royalties. Se la presenti da solo va su carta, e secondo l’ATO servono 50 giorni lavorativi. Tutti gli altri presentano dal 1° luglio. Di più: {G.link('early-tax-return-leaving-australia', 'la tax return prima di partire')}.</>,
                },
                {
                  title: 'Inizia la domanda per la super.',
                  body: <>La domanda online di DASP dell’ATO si può iniziare e salvare prima di partire, e inviare quando hai lasciato l’Australia e il visto è terminato. Se un fondo tiene 5.000 $ o più può chiedere copie autenticate dei documenti, che è più facile procurarsi qui che dall’Italia.</>,
                },
                {
                  title: 'Sistema l’accesso dall’estero, se vuoi usare myGov da solo.',
                  body: <>myGov manda i codici SMS solo a un numero di cellulare australiano. Se sei all’estero o senza numero australiano, l’ATO consiglia myID, una passkey o un’app di autenticazione. Con noi non ti serve niente di tutto questo.</>,
                },
              ]} />
              <p className={blocks.small}>
                Fonti: ATO, {src(SRC.earlyLodge, 'presentare prima di lasciare l’Australia')}, {src(SRC.fromOverseas, 'presentare dall’estero')}, {src(SRC.dasp, 'DASP')} e {src(SRC.mygov, 'creare un account myGov e collegarlo all’ATO')}, verificato a novembre 2026.
              </p>
            </>
          ),
        },
        {
          id: 'after-you-leave',
          title: 'Cosa resta aperto dopo la partenza?',
          body: (
            <>
              <p className={blocks.text}>Tre cose: la tax return dell’anno in cui sei partito, la tua super e, dopo sei mesi, la super che non hai ancora chiesto. Tutto si fa dall’Italia.</p>
              <h3 className={blocks.cardTitle}>La tax return, dopo il 30 giugno</h3>
              <p className={blocks.text}>
                L’anno fiscale australiano finisce il 30 giugno. Dal 1° luglio puoi presentare da qualsiasi paese, e se lo fai da solo la scadenza è il 31 ottobre. Secondo l’ATO la maggior parte delle dichiarazioni online viene elaborata entro 10 giorni lavorativi, e l’eventuale rimborso arriva sul tuo conto australiano. La dichiarazione è obbligatoria se hai avuto redditi diversi dallo stipendio da working holiday maker, se il reddito imponibile è stato di 45.001 $ o più, o se vuoi detrarre delle spese. Come funziona dall’estero:{' '}
                <Link href={TAX_RETURN} className={blocks.textLink}>come funziona la tax return</Link> e {G.link('how-to-lodge-tax-return-from-overseas', 'presentare dall’estero')}.
              </p>
              <h3 className={blocks.cardTitle}>La super (DASP), quando il visto è terminato</h3>
              <p className={blocks.text}>
                Puoi chiederla quando il visto è scaduto o cancellato, hai lasciato l’Australia e non hai un altro visto australiano attivo. Ogni fondo è una domanda a parte, di solito pagata entro 28 giorni da una domanda completa, e per chi ha un working holiday viene trattenuto il 65% della parte imponibile. Per gli stipendi dal 1° luglio 2026 il datore di lavoro deve far arrivare l’ultimo contributo al fondo entro 7 giorni lavorativi dal giorno di paga, salvo eccezioni: controlla che risulti prima di inviare la domanda. Passo per passo:{' '}
                <Link href="/it/superannuation" className={blocks.textLink}>richiedere la superannuation</Link>.
              </p>
              <h3 className={blocks.cardTitle}>La super passata all’ATO, dopo 6 mesi</h3>
              <p className={blocks.text}>
                Se non l’hai chiesta e sono passati 6 mesi o più dalla partenza, con il visto terminato, il fondo trasferisce il saldo all’ATO. Si può ancora chiedere come DASP in qualsiasi momento, ma l’ATO lo paga solo su un conto australiano a tuo nome o con assegno. Di più: {G.link('what-happens-to-unclaimed-super', 'cosa succede alla super non richiesta')}.
              </p>
              <p className={blocks.small}>
                Fonti: ATO, {src(SRC.progress, 'stato della tax return')}, {src(SRC.dasp, 'DASP')}, {src(SRC.atoHeld, 'super tenuta dall’ATO')} e {src(SRC.paydaySuper, 'Payday Super')}, verificato a novembre 2026.
              </p>
            </>
          ),
        },
        {
          id: 'order',
          title: 'In che ordine?',
          tone: 'pale',
          body: (
            <>
              <p className={blocks.text}>Prima la super, perché la prepari prima di partire; la tax return quando l’anno è finito; il conto in banca per ultimo.</p>
              <StepTable
                head={['Quando', 'Cosa fare']}
                rows={[
                  { when: 'Prima dell’ultimo turno', what: 'Annotare tutti i lavori e conservare le ultime buste paga.' },
                  { when: 'Prima di partire', what: 'Aggiornare l’indirizzo con l’ATO, tenere aperto il conto australiano, iniziare e salvare la domanda di DASP, far autenticare i documenti se un fondo tiene 5.000 $ o più.' },
                  { when: 'Entro 7 giorni lavorativi dall’ultimo stipendio', what: 'L’ultimo contributo di super dovrebbe arrivare al fondo (Payday Super, stipendi dal 1° luglio 2026, salvo eccezioni).' },
                  { when: 'Dopo la partenza, visto terminato', what: 'Inviare la domanda di DASP; ogni fondo paga la sua parte separatamente. Di solito pagata entro 28 giorni da una domanda completa.' },
                  { when: 'Dal 1° luglio', what: 'Presentare la tax return dell’anno della partenza. Scadenza il 31 ottobre se la presenti da solo.' },
                  { when: 'Dopo la presentazione online', what: 'Secondo l’ATO la maggior parte delle dichiarazioni online viene elaborata entro 10 giorni lavorativi. Il rimborso arriva sul conto australiano.' },
                  { when: '6 mesi o più dalla partenza, visto terminato', what: 'La super non richiesta passa all’ATO. Si può ancora chiedere, pagata solo su un conto australiano o con assegno.' },
                  { when: 'Quando è arrivato tutto', what: 'Chiudere il conto australiano.' },
                ]}
                caption={<>Parti per sempre prima del 30 giugno, senza altri redditi australiani? La dichiarazione può partire anche in anticipo su carta (50 giorni lavorativi secondo l’ATO). Tutte le date dell’anno: {G.link('tax-and-super-timeline-working-holiday', 'il calendario di tasse e super')}.</>}
              />
            </>
          ),
        },
        {
          id: 'no-mygov',
          title: 'Ti serve myGov dopo la partenza?',
          body: (
            <>
              <p className={blocks.text}>
                No. Per la tax return con noi myGov non serve: ce la vediamo direttamente noi con l’ATO. Anche la domanda online di DASP dell’ATO non usa l’accesso a myGov: chiede i tuoi dati personali, il passaporto e un indirizzo email, e il TFN è facoltativo.
              </p>
              <p className={blocks.text}>
                myGov conta solo se vuoi presentare da solo con myTax, e quasi tutti i blocchi partono dal codice SMS, che arriva solo a un numero australiano. Se sei già rimasto fuori, ogni caso ha la sua guida:
              </p>
              <LinkList items={MYGOV_GUIDES} />
            </>
          ),
        },
        {
          id: 'with-us',
          title: 'Come possiamo aiutarti',
          tone: 'amber',
          body: (
            <>
              <p className={blocks.text}>
                Scrivici dove hai lavorato e quando parti. Prepariamo la tua{' '}
                <Link href={TAX_RETURN} className={blocks.textLink}>tax return</Link> quando l’anno è finito, aggiorniamo il tuo indirizzo con l’ATO e, per la{' '}
                <Link href="/it/superannuation" className={blocks.textLink}>super</Link>, troviamo ogni fondo collegato al tuo tax file number e controlliamo la domanda con te.
              </p>
              <p className={blocks.text}>
                Non ti serve myGov. Ce la vediamo direttamente noi con l’ATO. La tua tax return viene rivista e approvata da un agente fiscale registrato prima di essere presentata all’ATO, e Working Holiday Tax opera sotto la supervisione di un agente fiscale registrato.
              </p>
              <div className={blocks.stack}>
                <WaButton href={WA} position="section" topic="tax-return" lang="it" size="md">Scrivici su WhatsApp</WaButton>
                <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Risposta in circa un’ora.</p>
              </div>
            </>
          ),
        },
      ]}
      faqTitle="Domande prima e dopo la partenza"
      faqs={faqs}
      guidesTitle="Approfondisci un passo"
      guides={GUIDES}
      cta={{
        title: 'Chiedici prima di partire',
        text: 'Scrivici dove hai lavorato e quando parti. Ti diciamo cosa fare adesso e cosa può aspettare finché sei a casa.',
        button: 'Scrivici su WhatsApp',
        note: 'Risposta in circa un’ora.',
      }}
    />
  )
}
