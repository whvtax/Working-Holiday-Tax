import type { ScriptDraft } from '../../script/types'

const style = 'STYLE: Photoreal phone footage, realistic light, shallow depth of field, vertical 9:16.'
const ella = (action: string) =>
  `${style}\nSUBJECT: Ella, look L1 (light shirt, hair tied back), seated at her wooden desk.\nACTION: ${action}\nSETTING: Bright home workspace, plant and closed laptop on the desk, late morning.\nCAMERA: Medium close-up, locked camera.\nLIGHT: Soft window light from the left.`
const kitchen = (subject: string, action: string, camera = 'Close-up, locked camera.') =>
  `${style}\nSUBJECT: ${subject}\nACTION: ${action}\nSETTING: Small apartment kitchen, evening.\nCAMERA: ${camera}\nLIGHT: Warm ceiling light.`

/** Bible section 19, as a complete script. */
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
    hookOptions: ['Paid on an A-B-N? Listen.', 'Delivery money on an A-B-N?', 'Your A-B-N pay is not all yours.'],
    ctaType: 'Send',
    ellaLook: 'L1',
    scenes: [
      { scene: 1, start: 0, end: 3, ellaInFrame: true, voice: 'Paid on an A-B-N? Listen.', emphasis: 'Listen', onScreen: 'Paid on an ABN?', visual: 'Ella at her desk looks into camera', action: 'Ella leans toward camera', syncWord: 'Listen', shotPrompt: ella('She leans slightly toward camera at about 2.5 seconds.'), continuity: 'Same look as scenes 7 and 8', claimRef: 'none' },
      { scene: 2, start: 3, end: 7, ellaInFrame: false, voice: 'Tax is usually not taken out.', emphasis: 'usually', onScreen: 'ABN: usually no tax taken', visual: 'A delivery bag set on a kitchen bench', action: 'A rider sets the bag down', syncWord: 'taken', shotPrompt: kitchen("A young rider's hands and a plain grey insulated delivery bag.", 'The bag is set down on a kitchen bench at about 2 seconds.', 'Medium shot at bench height, locked camera.'), continuity: 'Same kitchen as scenes 3, 5 and 6', claimRef: 'c1' },
      { scene: 3, start: 7, end: 10, ellaInFrame: false, voice: 'You usually get the full amount.', emphasis: 'full', onScreen: 'Paid in full', visual: 'A phone on the bench lights up', action: 'The phone screen glows', syncWord: 'get', shotPrompt: kitchen('A phone lying on the bench with a blank glowing screen.', 'The screen lights up at about 1 second.'), continuity: 'Same bench as scene 2', claimRef: 'c2' },
      { scene: 4, start: 10, end: 13.5, ellaInFrame: false, voice: 'Tax is worked out on your tax return.', emphasis: 'return', onScreen: 'Tax worked out later', visual: 'A blank form and a pen placed on a desk', action: 'A hand places the form', syncWord: 'return', shotPrompt: `${style}\nSUBJECT: A hand, a blank paper form and a pen.\nACTION: The hand places the form and pen on the desk at about 2.5 seconds.\nSETTING: Ella's wooden desk, late morning, Ella out of frame.\nCAMERA: Overhead close-up, locked camera.\nLIGHT: Soft window light from the left.`, continuity: "Ella's desk, without Ella", claimRef: 'c3' },
      { scene: 5, start: 13.5, end: 17.5, ellaInFrame: false, voice: 'So when a payment arrives, move part of it.', emphasis: 'move', onScreen: 'Move part of it', visual: 'Coins moved between two glass jars', action: 'A hand moves part of the coins', syncWord: 'move', shotPrompt: kitchen('A hand and two clear glass jars, the first with a small stack of coins.', 'The hand moves part of the coins into the second jar at about 3 seconds.', 'Close-up, slow push-in.'), continuity: 'Same kitchen and light as scene 2', claimRef: 'c4' },
      { scene: 6, start: 17.5, end: 21, ellaInFrame: false, voice: 'Keep it in a separate savings account.', emphasis: 'separate', onScreen: 'Separate savings', visual: 'The second jar slid to the back of a shelf', action: 'A hand slides the jar back', syncWord: 'separate', shotPrompt: kitchen('A hand and the second glass jar on a kitchen shelf.', 'The hand slides the jar to the back of the shelf at about 2 seconds.'), continuity: 'Same jar as scene 5', claimRef: 'c4' },
      { scene: 7, start: 21, end: 25, ellaInFrame: true, voice: 'So plan for your A-B-N tax.', emphasis: 'plan', onScreen: 'Plan for ABN tax', visual: 'Ella at her desk', action: 'Ella nods once', syncWord: 'plan', shotPrompt: ella('She nods once at about 1.5 seconds.'), continuity: 'Same look as scene 1', claimRef: 'none' },
      { scene: 8, start: 25, end: 28.5, ellaInFrame: true, voice: 'Send this to a friend who delivers.', emphasis: 'friend', onScreen: 'Send to a friend', visual: 'Ella smiles at camera', action: 'Ella tilts her head toward camera', syncWord: 'friend', shotPrompt: ella('She smiles and tilts her head toward camera at about 2 seconds.'), continuity: 'Same look as scene 1', claimRef: 'none' },
    ],
    claims: [
      { id: 'c1', text: 'ABN pay usually has no tax taken out', blogLine: 'With ABN work: nobody takes tax out', kind: 'fact', source: 'https://www.ato.gov.au/forms-and-instructions/statement-by-supplier-not-quoting-an-abn' },
      { id: 'c2', text: 'You usually get the full amount', blogLine: 'You receive the full amount', kind: 'fact', source: 'https://www.ato.gov.au/forms-and-instructions/statement-by-supplier-not-quoting-an-abn' },
      { id: 'c3', text: 'Tax is worked out on the tax return', blogLine: 'the tax is worked out on your tax return', kind: 'fact', source: 'https://www.ato.gov.au/forms-and-instructions/statement-by-supplier-not-quoting-an-abn' },
      { id: 'c4', text: 'Move part of each payment to separate savings', blogLine: 'move part of it into a separate savings account', kind: 'tip', source: 'Habit tip from the blog' },
    ],
    captions: {
      instagram: 'Paid on an ABN? Tax is usually not taken out of ABN pay. It is worked out later, on your tax return.\nA simple habit: when a payment arrives, move part of it into a separate savings account.\nSend this to a friend who delivers.\nGeneral information only, not tax advice.\n#internationalstudentsaustralia #australiantaxreturn #abnincome #studentvisa #studyinaustralia',
      tiktok: 'ABN pay: tax is usually not taken out. Plan for it.\nGeneral information only, not tax advice.\n#internationalstudentsaustralia #abnincome #studentvisa',
    },
    testChangeApplied: 'none',
  }
}
