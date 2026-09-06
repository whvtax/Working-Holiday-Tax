/**
 * audit3 guard[36]: "whether you're a resident" is the service describing what
 * it works out, not a residency determination.
 *
 * The "you can claim" rule was narrowed on 27 Aug so a relative clause
 * (what / whether / if ... you can claim) describes the service instead of
 * determining anything. The residency rules never got the same treatment, in
 * English or in ES/FR/IT/PT, so the playbook's own prescribed line ("it is
 * exactly what the review works out") was refused: objection #7 before payment,
 * an URGENT task after it. Both directions are pinned here.
 */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';

const ctx = (over: Partial<GuardContext> = {}): GuardContext => ({
  state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false,
  optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
  isApprovedTemplate: false, estimateFromTeam: null, ...over,
});

const fires = (text: string, over: Partial<GuardContext> = {}) =>
  policyGuard(text, ctx(over)).violations.includes('TAX_DETERMINATION');

describe('describing what the review works out is allowed', () => {
  it.each([
    ['whether, contracted', "Part of the review is checking whether you're a resident for tax purposes, so nothing is guessed."],
    ['if, with "or not"', 'We work out if you are a resident or not, then Medicare, then deductions.'],
    ['whether, from your dates', 'The team works out whether you are a resident or not from your dates.'],
    ['whether, count as', 'Whether you count as a foreign resident is exactly what the review works out.'],
    ['whether, foreign resident', "We check whether you're a foreign resident or an Australian resident."],
    ['what, will be', 'The review shows what you will be treated as, resident or not.'],
    ['Spanish si', 'Parte de la revisión es comprobar si eres residente fiscal o no.'],
    ['French si', 'Nous vérifions si vous êtes résident fiscal ou non.'],
    ['Italian se', 'Parte del controllo è capire se sei residente fiscale o no.'],
    ['Portuguese se', 'Parte da revisão é ver se és residente fiscal ou não.'],
  ])('%s', (_name, text) => {
    expect(fires(text)).toBe(false);
    // After payment the same line must not become an URGENT task either.
    expect(fires(text, { paid: true, state: 'PAID' as GuardContext['state'] })).toBe(false);
  });
});

describe('a residency determination is still blocked', () => {
  it.each([
    ['positive', 'Based on this you are an Australian resident for tax purposes.'],
    ['temporary', "You're a temporary resident, so the Medicare levy does not apply."],
    ['negative', 'You are not a resident for tax purposes.'],
    ['negative, contracted', "You're not a resident, so the higher rate applies."],
    ['count as, main clause', 'You count as a foreign resident from day one.'],
    ['qualify as', 'You qualify as a non-resident for the whole year.'],
    ['after a comma, no wh-word', 'Looking at your dates, you are a resident.'],
    ['so-clause after whether', "We checked whether it matters, and you're a non-resident."],
    ['Spanish', 'Con esas fechas eres residente fiscal en Australia.'],
    ['French', 'Avec ces dates vous êtes résident fiscal.'],
    ['Italian', 'Lei è residente fiscale.'],
    ['Portuguese', 'És não residente para efeitos fiscais.'],
  ])('%s', (_name, text) => {
    expect(fires(text)).toBe(true);
  });
});
