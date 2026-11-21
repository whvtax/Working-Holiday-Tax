import type { ScriptDraft } from '../../script/types'

const style = 'STYLE: Photoreal phone footage, realistic light, shallow depth of field, vertical 9:16.'
const ella = (action: string) =>
  `${style}\nSUBJECT: Ella, look L1 (light shirt, hair tied back), seated at her wooden desk.\nACTION: ${action}\nSETTING: Bright home workspace, plant and closed laptop on the desk, late morning.\nCAMERA: Medium close-up, locked camera.\nLIGHT: Soft window light from the left.`
const kitchen = (subject: string, action: string, camera = 'Close-up, locked camera.') =>
  `${style}\nSUBJECT: ${subject}\nACTION: ${action}\nSETTING: Small apartment kitchen, evening.\nCAMERA: ${camera}\nLIGHT: Warm ceiling light.`

/** Bible section 19 (v2, spoken punctuation), as a complete script. */
export function workedExample(): ScriptDraft {
  return {
    ideas: [
      { idea: 'ABN pay usually has no tax taken out, so put some aside', surprise: 4, stakes: 5, clarity: 5, safety: 5 },
      { idea: 'A rostered cafe job usually needs only your TFN, not an ABN', surprise: 4, stakes: 4, clarity: 4, safety: 4 },
      { idea: 'An invoice without an ABN may have 47% held back', surprise: 5, stakes: 4, clarity: 3, safety: 4 },
    ],
    coreMessage: 'ABN pay usually has no tax taken out, so put some aside.',
    keyTerm: 'A-B-N',
    audienceSlice: 'Students doing app delivery or freelance work',
    pillar: 'Work and income',
    hookType: 'If you',
    hookOptions: ['Getting paid on an A-B-N?', 'Paid on an A-B-N?', 'Delivering food on an A-B-N?'],
    ctaType: 'Send',
    ellaLook: 'L1',
    scenes: [
      { scene: 1, start: 0, end: 3, ellaInFrame: true, shot: 'ella', voice: 'Getting paid on an A-B-N?', emphasis: 'paid', onScreen: 'Paid on an ABN?', visual: 'Ella at her desk looks into camera', action: 'Ella leans toward camera', syncWord: 'paid', shotPrompt: ella('She leans slightly toward camera at about 1 second.'), continuity: 'Same look in every Ella scene', claimRef: 'none' },
      { scene: 2, start: 3, end: 6, ellaInFrame: false, shot: 'clip', voice: 'Tax is usually not taken out,', emphasis: 'usually', onScreen: 'ABN: usually no tax taken', visual: 'A delivery bag set on a kitchen bench', action: 'A rider sets the bag down', syncWord: 'taken', shotPrompt: kitchen("A plain grey insulated delivery bag.", 'The bag is set down on a kitchen bench at about 2 seconds.', 'Medium shot at bench height, locked camera.'), continuity: 'One kitchen for every clip', claimRef: 'c1' },
      { scene: 3, start: 6, end: 9, ellaInFrame: true, shot: 'ella', voice: 'so you usually get it all.', emphasis: 'all', onScreen: 'Usually paid in full', visual: 'Ella at her desk', action: 'Ella gives a small open-palm gesture', syncWord: 'get', shotPrompt: ella('A small open-palm gesture on "get".'), continuity: 'Same look in every Ella scene', claimRef: 'c2' },
      { scene: 4, start: 9, end: 13, ellaInFrame: false, shot: 'graphic', graphic: { type: 'definition', title: 'Tax worked out later', lines: ['On your tax return'] }, voice: 'The tax is worked out on your tax return.', emphasis: 'return', onScreen: 'Tax worked out later', visual: 'Definition card', action: 'Card appears', syncWord: 'return', shotPrompt: '', continuity: 'Brand card', claimRef: 'c3' },
      { scene: 5, start: 13, end: 16, ellaInFrame: true, shot: 'ella', voice: 'So each time a payment arrives,', emphasis: 'payment', onScreen: 'Payment arrives', visual: 'Ella at her desk', action: 'Ella nods', syncWord: 'arrives', shotPrompt: ella('A light nod on "arrives".'), continuity: 'Same look in every Ella scene', claimRef: 'c4' },
      { scene: 6, start: 16, end: 19.5, ellaInFrame: false, shot: 'graphic', graphic: { type: 'checklist', title: 'Each payment', lines: ['Move part into savings'] }, voice: 'move part of it into savings.', emphasis: 'savings', onScreen: 'Separate savings', visual: 'Checklist card', action: 'Tick appears', syncWord: 'move', shotPrompt: '', continuity: 'Brand card', claimRef: 'c4' },
      { scene: 7, start: 19.5, end: 23.5, ellaInFrame: true, shot: 'ella', voice: "That's how you plan for A-B-N tax.", emphasis: 'plan', onScreen: 'Plan for ABN tax', visual: 'Ella at her desk', action: 'Ella nods once', syncWord: 'plan', shotPrompt: ella('She nods once at about 1.5 seconds.'), continuity: 'Same look as scene 1', claimRef: 'none' },
      { scene: 8, start: 23.5, end: 27, ellaInFrame: true, shot: 'ella', voice: 'Send this to a friend who delivers.', emphasis: 'friend', onScreen: 'Send to a friend', visual: 'Ella smiles at camera', action: 'Ella tilts her head toward camera', syncWord: 'friend', shotPrompt: ella('She smiles and tilts her head toward camera at about 2 seconds.'), continuity: 'Same look as scene 1', claimRef: 'none' },
    ],
    claims: [
      { id: 'c1', text: 'ABN pay usually has no tax taken out', blogLine: 'With ABN work: nobody takes tax out', kind: 'fact', source: 'https://www.ato.gov.au/forms-and-instructions/statement-by-supplier-not-quoting-an-abn' },
      { id: 'c2', text: 'You usually get the full amount', blogLine: 'You receive the full amount', kind: 'fact', source: 'https://www.ato.gov.au/forms-and-instructions/statement-by-supplier-not-quoting-an-abn' },
      { id: 'c3', text: 'Tax is worked out on the tax return', blogLine: 'the tax is worked out on your tax return', kind: 'fact', source: 'https://www.ato.gov.au/forms-and-instructions/statement-by-supplier-not-quoting-an-abn' },
      { id: 'c4', text: 'Move part of each payment to separate savings', blogLine: 'move part of it into a separate savings account', kind: 'tip', source: 'Habit tip from the blog' },
    ],
    captions: {
      instagram: 'Paid on an ABN? Tax is usually not taken out of ABN pay. It is worked out later, on your tax return.\nA simple habit: when a payment arrives, move part of it into a separate savings account.\nSend this to a friend who delivers.\nGeneral information only, not tax advice.\n#internationalstudentsaustralia #australiantaxreturn #abnincome #studentvisa',
      tiktok: 'ABN pay: tax is usually not taken out. Plan for it.\nGeneral information only, not tax advice.\n#internationalstudentsaustralia #abnincome #studentvisa',
    },
    template: 'WHICH_ONE_ARE_YOU',
    series: 'YOUR JOB YOUR TAX',
    testChangeApplied: 'none',
  }
}
