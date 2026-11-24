/**
 * Date e tempi (plan 3, round 2, r18 P2-1 e r15 P2-2), 24 novembre 2026.
 *
 * Due tabelle HTML vere, usate su /it/dichiarazione-redditi-australia,
 * /it/tax-return e /it/superannuation. Ogni riga cita la sua pagina dell’ATO e
 * la data di aggiornamento indicata su quella pagina, riletta il 24 novembre 2026.
 * Fonti e citazioni esatte: S/plan3/build2-R5.md.
 */
import { blocks } from '@/components/wht/Blocks'

type Row = { step: string; rule: string; source: string; href: string; updated: string }

const cell = { padding: '10px 12px', borderTop: '1px solid var(--wht-line)', textAlign: 'left' as const, verticalAlign: 'top' as const }

const ATO = 'https://www.ato.gov.au'
const ATO_AGENT = `${ATO}/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-with-a-registered-tax-agent`
const ATO_PRIOR = `${ATO}/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-a-prior-year-tax-return`
const ATO_TRACK = `${ATO}/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return`
const ATO_EARLY = `${ATO}/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-before-leaving-australia`
const ATO_OUTSIDE = `${ATO}/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia`
const ATO_PAYDAY = `${ATO}/businesses-and-organisations/super-for-employers/about-payday-super`
const ATO_DASP = `${ATO}/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp`
const ATO_HELD = `${ATO}/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/keeping-track-of-your-super/ato-held-super`

const TAX_ROWS: Row[] = [
  {
    step: 'Scadenza se la presenti da solo',
    rule: 'Il 31 ottobre dopo la fine dell’anno fiscale (dal 1° luglio al 30 giugno), una dichiarazione per anno. Per il 2025-26 era il 31 ottobre 2026; essendo un sabato, l’ATO ha accettato le dichiarazioni fino a lunedì 2 novembre alle 23:59.',
    source: 'presentarla con un tax agent registrato',
    href: ATO_AGENT,
    updated: '24 aprile 2026',
  },
  {
    step: 'Con un agente fiscale registrato',
    rule: 'La maggior parte degli agenti può presentare le dichiarazioni dei clienti dopo il 31 ottobre. Se non avevi ancora un agente, dovevi contattarlo prima del 31 ottobre per entrare nel suo programma.',
    source: 'presentarla con un tax agent registrato',
    href: ATO_AGENT,
    updated: '24 aprile 2026',
  },
  {
    step: 'Anno mai presentato',
    rule: 'Si può ancora presentare: myTax accetta gli anni precedenti dal 2016, ognuno come dichiarazione a sé.',
    source: 'anni precedenti',
    href: ATO_PRIOR,
    updated: '24 aprile 2026',
  },
  {
    step: 'Dichiarazione online',
    rule: 'La maggior parte viene elaborata entro 10 giorni lavorativi.',
    source: 'seguire la dichiarazione',
    href: ATO_TRACK,
    updated: '10 novembre 2026',
  },
  {
    step: 'Controllo manuale',
    rule: 'Fino a 30 giorni di calendario.',
    source: 'seguire la dichiarazione',
    href: ATO_TRACK,
    updated: '10 novembre 2026',
  },
  {
    step: 'Dichiarazione cartacea',
    rule: 'Fino a 90 giorni lavorativi.',
    source: 'seguire la dichiarazione',
    href: ATO_TRACK,
    updated: '10 novembre 2026',
  },
  {
    step: 'Partenza definitiva prima del 30 giugno',
    rule: 'Si può presentare in anticipo, solo su carta, se in quell’anno non avrai altri redditi australiani oltre a interessi, dividendi o royalty. Elaborazione: 50 giorni lavorativi.',
    source: 'presentarla prima di partire',
    href: ATO_EARLY,
    updated: '15 giugno 2026',
  },
  {
    step: 'Rimborso',
    rule: 'Pagato su un conto bancario australiano. Tienilo aperto finché il pagamento non è arrivato.',
    source: 'presentarla dall’estero',
    href: ATO_OUTSIDE,
    updated: '24 aprile 2026',
  },
]

const SUPER_ROWS: Row[] = [
  {
    step: 'Quanto versa il datore di lavoro',
    rule: 'Il 12% delle tue qualifying earnings per le paghe versate dal 1° luglio 2026: retribuzione ordinaria (ordinary time earnings), commissioni e salary sacrifice, tra le altre voci. Prima di quella data la base erano le ordinary time earnings.',
    source: 'About Payday Super',
    href: ATO_PAYDAY,
    updated: '10 agosto 2026',
  },
  {
    step: 'Quando arriva al fondo',
    rule: 'Dal 1° luglio 2026 (Payday Super), entro 7 giorni lavorativi da ogni giorno di paga, con alcune eccezioni, per esempio per chi è appena stato assunto. Prima i versamenti erano trimestrali.',
    source: 'About Payday Super',
    href: ATO_PAYDAY,
    updated: '10 agosto 2026',
  },
  {
    step: 'Prima di inviare la domanda',
    rule: 'Verifica con il datore di lavoro che tutta la super dovuta sia stata versata. Per l’ultima paga, lascia passare quei 7 giorni lavorativi.',
    source: 'DASP',
    href: ATO_DASP,
    updated: '21 aprile 2026',
  },
  {
    step: 'Quando richiedere il DASP',
    rule: 'Dopo aver lasciato l’Australia, con il visto scaduto o annullato e senza un altro visto australiano attivo. La domanda online si può iniziare e salvare prima di partire.',
    source: 'DASP',
    href: ATO_DASP,
    updated: '21 aprile 2026',
  },
  {
    step: 'Tempi di pagamento',
    rule: 'In genere entro 28 giorni dal ricevimento della domanda completa.',
    source: 'DASP',
    href: ATO_DASP,
    updated: '21 aprile 2026',
  },
  {
    step: 'Ritenuta',
    rule: '65% sulla componente imponibile per chiunque abbia avuto un visto 417 o 462; 0% sulla componente esente (tax-free component).',
    source: 'DASP',
    href: ATO_DASP,
    updated: '21 aprile 2026',
  },
  {
    step: 'Super mai richiesta',
    rule: 'Dopo 6 mesi o più dalla partenza, con il visto cessato, il fondo la trasferisce all’ATO. Da lì si richiede in qualsiasi momento, sempre con un DASP.',
    source: 'super tenuta dall’ATO',
    href: ATO_HELD,
    updated: '11 maggio 2026',
  },
  {
    step: 'Come viene pagata',
    rule: 'Bonifico su un conto australiano, assegno in dollari australiani, oppure bonifico internazionale solo per una domanda fatta a un fondo che lo prevede. La super già tenuta dall’ATO si paga su un conto australiano o con assegno.',
    source: 'DASP',
    href: ATO_DASP,
    updated: '21 aprile 2026',
  },
]

function DatesTable({ caption, rows, cols }: { caption: string; rows: Row[]; cols: [string, string, string] }) {
  return (
    <div style={{ overflowX: 'auto' }} tabIndex={0} role="region" aria-label="Tabella, scorre di lato">
      <table className={blocks.text} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <caption className={blocks.small} style={{ textAlign: 'left', captionSide: 'top', paddingBottom: 10 }}>
          {caption}
        </caption>
        <thead>
          <tr>
            <th scope="col" style={cell}>{cols[0]}</th>
            <th scope="col" style={cell}>{cols[1]}</th>
            <th scope="col" style={cell}>{cols[2]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.step}>
              <th scope="row" style={cell}>{r.step}</th>
              <td style={cell}>{r.rule}</td>
              <td style={cell}>
                <a href={r.href} className={blocks.textLink} target="_blank" rel="noopener noreferrer">ATO, {r.source}</a>
                {`, aggiornata il ${r.updated}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Tabella di date e tempi della tax return working holiday. */
export function TaxDatesTable() {
  return (
    <DatesTable
      caption="Date e tempi della tax return working holiday. Fonte: ATO, verificato il 24 novembre 2026."
      cols={['Passaggio', 'Cosa dice l’ATO', 'Fonte']}
      rows={TAX_ROWS}
    />
  )
}

/** Tabella del calendario della super, dalla busta paga al DASP. */
export function SuperDatesTable() {
  return (
    <DatesTable
      caption="Dalla busta paga al DASP: il calendario della tua super. Fonte: ATO, verificato il 24 novembre 2026."
      cols={['Passaggio', 'Cosa dice l’ATO', 'Fonte']}
      rows={SUPER_ROWS}
    />
  )
}
