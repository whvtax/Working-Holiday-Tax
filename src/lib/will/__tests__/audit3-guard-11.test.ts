/**
 * audit3 guard[11] (5 Sep): a tax year next to "return" / "refund" is a year,
 * not a refund figure. BARE_PRICE_RE always skipped years (LOOKS_LIKE_YEAR) but
 * the bare-number determination patterns, English and the six-language set,
 * did not, so "we can do your tax return for 2024 as well" was refused as a
 * TAX_DETERMINATION. Real figures with a hedge, a $ sign or a promise word must
 * still fire.
 */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';

function ctx(over: Partial<GuardContext> = {}): GuardContext {
  return {
    state: 'PRICE_SENT',
    paid: false,
    aiPaused: false,
    killSwitch: false,
    optedOut: false,
    isLegacy: false,
    lastCustomerMsgAt: new Date(),
    isApprovedTemplate: false,
    estimateFromTeam: null,
    ...over,
  };
}

const det = (text: string) =>
  policyGuard(text, ctx()).violations.includes('TAX_DETERMINATION');

describe('audit3 guard[11]: a tax year is not a refund figure', () => {
  it('lets ordinary second-year and lodged lines through, in every language', () => {
    for (const t of [
      'Yes, we can do your tax return for 2024 as well.',
      'Your tax return for 2024 has been lodged.',
      'Is this about your 2024 return or the one before?',
      'Your refund for 2023 was lodged last week.',
      "You'll get the 2024 return sorted at the same time.",
      'We can look at around 2024 as well if you have the payslips for that return.',
      'Deine Rückerstattung für das Steuerjahr 2024 wurde eingereicht.',
      'Tu devolución de 2024 ya está presentada.',
      'Ton remboursement pour 2024 est déposé.',
      'Il tuo rimborso per il 2024 è stato presentato.',
      'O teu reembolso de 2024 já foi entregue.',
      '2024年の還付は申請済みです。',
      'ungefähr 2024 haben wir die Rückerstattung eingereicht.',
    ]) {
      expect([t, det(t)]).toEqual([t, false]);
    }
  });

  it('still blocks a real bare figure next to refund/return', () => {
    for (const t of [
      'Your refund will be around 1800.',
      'Your tax return should come to about 1450 back.',
      'You should get around 3,800 back.',
      'You will get 2300 back once it is lodged.',
      'Deine Rückerstattung beträgt 1.800.',
      'Tu reembolso es de 1.800.',
      'Ton remboursement est de 1.800.',
      'Il tuo rimborso è di 1.800.',
      'O teu reembolso é de 1.800.',
      '還付は約150,000円です。',
      'Ungefähr 1.800 bekommst du zurück.',
    ]) {
      expect([t, det(t)]).toEqual([t, true]);
    }
  });

  it('a refund that happens to be a four-digit year-shaped number is still caught with a $ or a hedge', () => {
    expect(policyGuard('Your refund will be around $2024.', ctx()).violations.length).toBeGreaterThan(0);
    expect(det('You should get around $2,024 back.')).toBe(true);
  });

  it('the exclusion cannot be defeated by restarting inside the number', () => {
    // "024" is not read out of "2024" by the six-language bare-figure rules.
    expect(det('Deine Rückerstattung 2024.')).toBe(false);
    expect(det('Tu reembolso 2024.')).toBe(false);
  });
});
