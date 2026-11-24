/**
 * Fechas y plazos (plan 3, round 2, r18 P2-1 y r15 P2-2), 24 de noviembre de 2026.
 *
 * Dos tablas HTML de verdad, usadas en /es/devolucion-impuestos-australia,
 * /es/tax-return y /es/superannuation. Cada fila cita su página de la ATO y la
 * fecha de actualización que muestra esa página, releída el 24 de noviembre de 2026.
 * Fuentes y citas exactas: S/plan3/build2-R5.md.
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
    step: 'Plazo si lo presentas tú',
    rule: 'El 31 de octubre después del cierre del año fiscal (del 1 de julio al 30 de junio), una declaración por año. Para 2025-26 fue el 31 de octubre de 2026; como caía en sábado, la ATO aceptó las declaraciones hasta el lunes 2 de noviembre a las 23:59.',
    source: 'presentar con un agente fiscal registrado',
    href: ATO_AGENT,
    updated: '24 de abril de 2026',
  },
  {
    step: 'Con un agente fiscal registrado',
    rule: 'La mayoría de los agentes puede presentar las declaraciones de sus clientes después del 31 de octubre. Si todavía no tenías agente, había que contactarlo antes del 31 de octubre para entrar en su programa.',
    source: 'presentar con un agente fiscal registrado',
    href: ATO_AGENT,
    updated: '24 de abril de 2026',
  },
  {
    step: 'Año nunca presentado',
    rule: 'Todavía se puede presentar: myTax acepta años anteriores desde 2016, cada uno como una declaración aparte.',
    source: 'años anteriores',
    href: ATO_PRIOR,
    updated: '24 de abril de 2026',
  },
  {
    step: 'Declaración por internet',
    rule: 'La mayoría se procesa en 10 días hábiles.',
    source: 'seguir tu declaración',
    href: ATO_TRACK,
    updated: '10 de noviembre de 2026',
  },
  {
    step: 'Revisión manual',
    rule: 'Hasta 30 días corridos.',
    source: 'seguir tu declaración',
    href: ATO_TRACK,
    updated: '10 de noviembre de 2026',
  },
  {
    step: 'Declaración en papel',
    rule: 'Hasta 90 días hábiles.',
    source: 'seguir tu declaración',
    href: ATO_TRACK,
    updated: '10 de noviembre de 2026',
  },
  {
    step: 'Te vas para siempre antes del 30 de junio',
    rule: 'Puedes presentarlo antes, solo en papel, si ese año no vas a tener más ingresos australianos aparte de intereses, dividendos o regalías. Procesamiento: 50 días hábiles.',
    source: 'presentar antes de irte',
    href: ATO_EARLY,
    updated: '15 de junio de 2026',
  },
  {
    step: 'Devolución',
    rule: 'Se paga en una cuenta bancaria australiana. Mantenla abierta hasta que llegue el pago.',
    source: 'presentar desde fuera de Australia',
    href: ATO_OUTSIDE,
    updated: '24 de abril de 2026',
  },
]

const SUPER_ROWS: Row[] = [
  {
    step: 'Cuánto paga tu empleador',
    rule: 'El 12 % de tus qualifying earnings en los sueldos pagados desde el 1 de julio de 2026: el sueldo ordinario (ordinary time earnings), las comisiones y el salary sacrifice, entre otros conceptos. Antes de esa fecha la base eran las ordinary time earnings.',
    source: 'About Payday Super',
    href: ATO_PAYDAY,
    updated: '10 de agosto de 2026',
  },
  {
    step: 'Cuándo llega a tu fondo',
    rule: 'Desde el 1 de julio de 2026 (Payday Super), dentro de los 7 días hábiles siguientes a cada día de pago, con algunas excepciones, por ejemplo para quien recién empieza a trabajar. Antes los aportes eran trimestrales.',
    source: 'About Payday Super',
    href: ATO_PAYDAY,
    updated: '10 de agosto de 2026',
  },
  {
    step: 'Antes de enviar el reclamo',
    rule: 'Confirma con tu empleador que pagó toda la super que te debía. Para el último sueldo, deja pasar esos 7 días hábiles.',
    source: 'DASP',
    href: ATO_DASP,
    updated: '21 de abril de 2026',
  },
  {
    step: 'Cuándo reclamar el DASP',
    rule: 'Después de salir de Australia, con la visa vencida o cancelada y sin otra visa australiana activa. La solicitud en línea se puede empezar y guardar antes de irte.',
    source: 'DASP',
    href: ATO_DASP,
    updated: '21 de abril de 2026',
  },
  {
    step: 'Plazo de pago',
    rule: 'Por lo general dentro de los 28 días desde que se recibe la solicitud completa.',
    source: 'DASP',
    href: ATO_DASP,
    updated: '21 de abril de 2026',
  },
  {
    step: 'Retención',
    rule: '65 % sobre el componente gravable para cualquiera que haya tenido una visa 417 o 462; 0 % sobre el componente libre de impuestos (tax-free component).',
    source: 'DASP',
    href: ATO_DASP,
    updated: '21 de abril de 2026',
  },
  {
    step: 'Super nunca reclamada',
    rule: 'Pasados 6 meses o más desde tu salida, con la visa terminada, el fondo la transfiere a la ATO. Desde ahí se reclama en cualquier momento, siempre con un DASP.',
    source: 'super que tiene la ATO',
    href: ATO_HELD,
    updated: '11 de mayo de 2026',
  },
  {
    step: 'Cómo se paga',
    rule: 'Transferencia a una cuenta australiana, cheque en dólares australianos, o transferencia internacional solo en una solicitud a un fondo que la ofrezca. La super que ya tiene la ATO se paga en una cuenta australiana o con cheque.',
    source: 'DASP',
    href: ATO_DASP,
    updated: '21 de abril de 2026',
  },
]

function DatesTable({ caption, rows, cols }: { caption: string; rows: Row[]; cols: [string, string, string] }) {
  return (
    <div style={{ overflowX: 'auto' }} tabIndex={0} role="region" aria-label="Tabla, se desplaza hacia el lado">
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
                {`, actualizada el ${r.updated}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Tabla de fechas y plazos del tax return de working holiday. */
export function TaxDatesTable() {
  return (
    <DatesTable
      caption="Fechas y plazos del tax return working holiday. Fuente: ATO, revisado el 24 de noviembre de 2026."
      cols={['Paso', 'Lo que dice la ATO', 'Fuente']}
      rows={TAX_ROWS}
    />
  )
}

/** Tabla del calendario de la super, del sueldo al DASP. */
export function SuperDatesTable() {
  return (
    <DatesTable
      caption="Del sueldo al DASP: el calendario de tu super. Fuente: ATO, revisado el 24 de noviembre de 2026."
      cols={['Paso', 'Lo que dice la ATO', 'Fuente']}
      rows={SUPER_ROWS}
    />
  )
}
