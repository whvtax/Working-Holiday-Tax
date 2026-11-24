/**
 * Dates et délais (plan 3, round 2, r18 P2-1 et r15 P2-2), 24 novembre 2026.
 *
 * Deux vrais tableaux HTML, réutilisés sur /fr/tax-return-australie-pvt,
 * /fr/tax-return et /fr/superannuation. Chaque ligne cite sa page de l’ATO et
 * la date de mise à jour affichée sur cette page, relue le 24 novembre 2026.
 * Sources et citations exactes : S/plan3/build2-R5.md.
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
    step: 'Date limite si vous déclarez vous-même',
    rule: 'Le 31 octobre qui suit la fin de l’exercice fiscal (du 1er juillet au 30 juin), une déclaration par année. Pour 2025-26, c’était le 31 octobre 2026 ; comme il tombait un samedi, l’ATO a accepté les déclarations jusqu’au lundi 2 novembre à 23 h 59.',
    source: 'Déposer avec un agent fiscal enregistré',
    href: ATO_AGENT,
    updated: '24 avril 2026',
  },
  {
    step: 'Avec un agent fiscal enregistré',
    rule: 'La plupart des agents peuvent déposer après le 31 octobre pour leurs clients. Si vous n’aviez pas encore d’agent, il fallait le contacter avant le 31 octobre pour entrer dans son programme.',
    source: 'Déposer avec un agent fiscal enregistré',
    href: ATO_AGENT,
    updated: '24 avril 2026',
  },
  {
    step: 'Année jamais déposée',
    rule: 'Elle peut encore l’être : myTax accepte les années précédentes depuis 2016, chacune comme une déclaration à part.',
    source: 'Déposer une année précédente',
    href: ATO_PRIOR,
    updated: '24 avril 2026',
  },
  {
    step: 'Déclaration déposée en ligne',
    rule: 'La plupart sont traitées en 10 jours ouvrés.',
    source: 'Suivre sa déclaration',
    href: ATO_TRACK,
    updated: '10 novembre 2026',
  },
  {
    step: 'Contrôle manuel',
    rule: 'Jusqu’à 30 jours calendaires.',
    source: 'Suivre sa déclaration',
    href: ATO_TRACK,
    updated: '10 novembre 2026',
  },
  {
    step: 'Déclaration papier',
    rule: 'Jusqu’à 90 jours ouvrés.',
    source: 'Suivre sa déclaration',
    href: ATO_TRACK,
    updated: '10 novembre 2026',
  },
  {
    step: 'Départ définitif avant le 30 juin',
    rule: 'Une déclaration anticipée est possible, uniquement sur papier, si vous n’aurez plus de revenus australiens cette année-là hors intérêts, dividendes ou royalties. Traitement : 50 jours ouvrés.',
    source: 'Déposer avant de quitter l’Australie',
    href: ATO_EARLY,
    updated: '15 juin 2026',
  },
  {
    step: 'Remboursement',
    rule: 'Versé sur un compte bancaire australien. Gardez-le ouvert jusqu’à l’arrivée du paiement.',
    source: 'Déposer depuis l’étranger',
    href: ATO_OUTSIDE,
    updated: '24 avril 2026',
  },
]

const SUPER_ROWS: Row[] = [
  {
    step: 'Ce que verse l’employeur',
    rule: '12 % de vos qualifying earnings pour les paies versées depuis le 1er juillet 2026 : le salaire ordinaire (ordinary time earnings), les commissions et le salary sacrifice, entre autres. Avant cette date, la base était les ordinary time earnings.',
    source: 'About Payday Super',
    href: ATO_PAYDAY,
    updated: '10 août 2026',
  },
  {
    step: 'Quand elle arrive sur votre fund',
    rule: 'Depuis le 1er juillet 2026 (Payday Super), dans les 7 jours ouvrés qui suivent chaque paie, avec quelques exceptions, par exemple pour un nouveau salarié. Avant, les versements étaient trimestriels.',
    source: 'About Payday Super',
    href: ATO_PAYDAY,
    updated: '10 août 2026',
  },
  {
    step: 'Avant de déposer la demande',
    rule: 'Vérifiez avec votre employeur que toute la super due a été versée. Pour la dernière paie, laissez passer ces 7 jours ouvrés.',
    source: 'DASP',
    href: ATO_DASP,
    updated: '21 avril 2026',
  },
  {
    step: 'Quand demander le DASP',
    rule: 'Après avoir quitté l’Australie, visa expiré ou annulé, sans autre visa australien actif. La demande en ligne peut être commencée et enregistrée avant le départ.',
    source: 'DASP',
    href: ATO_DASP,
    updated: '21 avril 2026',
  },
  {
    step: 'Délai de paiement',
    rule: 'En général dans les 28 jours après réception d’une demande complète.',
    source: 'DASP',
    href: ATO_DASP,
    updated: '21 avril 2026',
  },
  {
    step: 'Retenue',
    rule: '65 % sur la part imposable pour tout titulaire d’un visa 417 ou 462 ; 0 % sur la part exonérée (tax-free component).',
    source: 'DASP',
    href: ATO_DASP,
    updated: '21 avril 2026',
  },
  {
    step: 'Super jamais réclamée',
    rule: 'Six mois ou plus après votre départ, visa terminé, le fund la transfère à l’ATO. Elle se réclame ensuite à tout moment, toujours par un DASP.',
    source: 'Super détenue par l’ATO',
    href: ATO_HELD,
    updated: '11 mai 2026',
  },
  {
    step: 'Mode de paiement',
    rule: 'Virement sur un compte australien, chèque en dollars australiens, ou virement international seulement pour une demande faite à un fund qui le propose. La super déjà détenue par l’ATO est versée sur un compte australien ou par chèque.',
    source: 'DASP',
    href: ATO_DASP,
    updated: '21 avril 2026',
  },
]

function DatesTable({ caption, rows, cols }: { caption: string; rows: Row[]; cols: [string, string, string] }) {
  return (
    <div style={{ overflowX: 'auto' }} tabIndex={0} role="region" aria-label="Tableau, défile sur le côté">
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
                {`, mise à jour le ${r.updated}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Tableau des dates et délais d’une tax return de PVT. */
export function TaxDatesTable() {
  return (
    <DatesTable
      caption="Dates et délais d’une tax return PVT. Source : ATO, vérifié le 24 novembre 2026."
      cols={['Étape', 'Ce que dit l’ATO', 'Source']}
      rows={TAX_ROWS}
    />
  )
}

/** Tableau du calendrier de la super, de la paie au DASP. */
export function SuperDatesTable() {
  return (
    <DatesTable
      caption="De la paie au DASP : le calendrier de votre super. Source : ATO, vérifié le 24 novembre 2026."
      cols={['Étape', 'Ce que dit l’ATO', 'Source']}
      rows={SUPER_ROWS}
    />
  )
}
