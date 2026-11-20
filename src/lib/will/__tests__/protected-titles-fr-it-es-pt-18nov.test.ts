/** Jo, 18 Nov: protected agent titles in French, Italian, Spanish and Portuguese
 *  are blocked; the approved supervision phrases are not. */
import { policyGuard } from '@/lib/will/policy-guard';

const g = { state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() } as unknown as Parameters<typeof policyGuard>[1];

describe('protected titles in fr, it, es, pt', () => {
  it.each([
    "Nous travaillons avec un expert-comptable pour vous.",
    'Siamo commercialisti registrati e la pratica è seguita da noi.',
    'Somos asesores fiscales autorizados para tu caso.',
    'Somos contadores registrados en Australia.',
  ])('blocks: %s', (t) => {
    expect(policyGuard(t, g).allowed).toBe(false);
  });

  it.each([
    "Il tuo rimborso è sotto la supervisione di un agente fiscale registrato.",
    'Ta déclaration est approuvée par un agent fiscal enregistré avant son envoi.',
    'Sua declaração é aprovada por um agente fiscal registrado antes do envio.',
  ])('allows the approved supervision phrase: %s', (t) => {
    expect(policyGuard(t, g).allowed).toBe(true);
  });
});
