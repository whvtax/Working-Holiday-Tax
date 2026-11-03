import {
  teamConfirmsPayment, teamOutcomeFromWords, customerPastedPayment, customerSaysSigned,
  customerWantsToCancel, shouldSendSignatureFollowUp, detectStaleStage,
} from '../stage-sync';
import { canTransition } from '../state-machine';
import { estimateSendCheck, pendingDocsForEstimate } from '../estimate-send';
import { resolveTasksForCustomer } from '../tasks';

const NOW = new Date('2026-11-03T00:00:00Z');
const iso = (h: number) => new Date(NOW.getTime() - h * 3_600_000).toISOString();

describe('state machine', () => {
  it('Signature Pending can reach Lodged and Signed', () => {
    expect(canTransition('SIGNATURE_PENDING', 'LODGED')).toBe(true);
    expect(canTransition('SIGNATURE_PENDING', 'SIGNED')).toBe(true);
    expect(canTransition('FORM_PENDING', 'LODGED')).toBe(false);
  });
});

describe('team payment wording', () => {
  it.each([
    'Payment received, thanks!', 'Got your $220, thanks', 'You are all paid up', 'Thanks for paying today',
  ])('confirms: %s', (t) => expect(teamConfirmsPayment(t)).toBe(true));
  it.each(['Please send your payment when ready.', 'We will confirm once the payment is received.'])
    ('does not confirm: %s', (t) => expect(teamConfirmsPayment(t)).toBe(false));
});

describe('outcome from team words', () => {
  it('ignores the generic fee sentence', () => {
    expect(teamOutcomeFromWords('Our fee is $220. If the refund is less, we refund the difference, or you owe tax instead, the full fee applies.')).toBeNull();
    expect(teamOutcomeFromWords('The fee is $220 and you will owe the ATO nothing from us')).toBeNull();
  });
  it('ignores unpaid leads when context is given', () => {
    expect(teamOutcomeFromWords('Estimated tax payable: $1,803.81', { paid: false })).toBeNull();
    expect(teamOutcomeFromWords('Estimated tax payable: $1,803.81', { paid: true, state: 'UNDER_REVIEW' })).toBe('PAYABLE');
  });
  it('still reads a real hand-written estimate', () => {
    expect(teamOutcomeFromWords('Estimated tax payable: $1,803.81')).toBe('PAYABLE');
    expect(teamOutcomeFromWords('Your refund of $2,100.00 is ready')).toBe('REFUND');
  });
});

describe('payment pasted as text', () => {
  it('reads a bank receipt', () => {
    expect(customerPastedPayment('Payment successful\nAmount $220.00\nReceipt 123456\nTo account 062000 12345678').looksPaid).toBe(true);
    expect(customerPastedPayment('I have paid $220 just now').amountCents).toBe(22000);
  });
  it('ignores questions and fee mentions', () => {
    expect(customerPastedPayment('Is the fee $220 or $385 for me?').looksPaid).toBe(false);
    expect(customerPastedPayment('ok').looksPaid).toBe(false);
  });
});

describe('signed and cancelled', () => {
  it('detects signed', () => {
    expect(customerSaysSigned("I've signed it")).toBe(true);
    expect(customerSaysSigned('I will sign tonight')).toBe(false);
    expect(customerSaysSigned('How do I sign?')).toBe(false);
  });
  it('detects cancel and stops signature follow-ups', () => {
    expect(customerWantsToCancel("Please cancel, I'm not going to sign")).toBe(true);
    expect(customerWantsToCancel('How do I sign?')).toBe(false);
    expect(shouldSendSignatureFollowUp({ state: 'SIGNATURE_PENDING' }, ['Please cancel my order'])).toBe(false);
    expect(shouldSendSignatureFollowUp({ state: 'SIGNATURE_PENDING', optedOut: true })).toBe(false);
    expect(shouldSendSignatureFollowUp({ state: 'LODGED' })).toBe(false);
    expect(shouldSendSignatureFollowUp({ state: 'SIGNATURE_PENDING' }, ['thanks'])).toBe(true);
  });
});

describe('detectStaleStage', () => {
  const base = { paid: false, optedOut: false };
  it('team payment message in a sales stage', () => {
    const r = detectStaleStage({ ...base, state: 'PRICE_SENT', stateChangedAt: iso(48) }, [{ direction: 'OUT', body: 'Payment received, thanks!', createdAt: iso(3) }], NOW);
    expect(r?.code).toBe('paid_in_sales_stage');
    expect(r?.suggestedState).toBe('PAID');
  });
  it('pasted payment on a new lead', () => {
    const r = detectStaleStage({ ...base, state: 'NEW_LEAD', stateChangedAt: iso(48) }, [{ direction: 'IN', body: 'Payment successful $220.00 receipt 99887', createdAt: iso(2) }], NOW);
    expect(r?.code).toBe('payment_pasted_unconfirmed');
  });
  it('lodged said by team', () => {
    const r = detectStaleStage({ paid: true, state: 'SIGNATURE_PENDING', stateChangedAt: iso(10) }, [{ direction: 'OUT', body: 'Your return has been lodged.', createdAt: iso(1) }], NOW);
    expect(r?.suggestedState).toBe('LODGED');
  });
  it('signature pending for 4 days', () => {
    const r = detectStaleStage({ paid: true, state: 'SIGNATURE_PENDING', stateChangedAt: iso(96) }, [], NOW);
    expect(r?.code).toBe('signature_stale');
  });
  it('quiet and closed customers give nothing', () => {
    expect(detectStaleStage({ paid: true, state: 'SIGNATURE_PENDING', stateChangedAt: iso(5) }, [], NOW)).toBeNull();
    expect(detectStaleStage({ paid: false, state: 'WENT_COLD', stateChangedAt: iso(500) }, [], NOW)).toBeNull();
  });
});

describe('estimate guard', () => {
  it('holds while documents are pending, allows override and corrections', () => {
    expect(estimateSendCheck({ state: 'UNDER_REVIEW', missingDocs: ['logbook'] })).toEqual({ ok: false, reason: 'documents_pending', pending: ['logbook'] });
    expect(estimateSendCheck({ state: 'UNDER_REVIEW', missingDocs: ['logbook'] }, { overridePendingDocs: true }).ok).toBe(true);
    expect(estimateSendCheck({ state: 'SIGNATURE_PENDING', missingDocs: ['logbook'] }).ok).toBe(true);
    expect(estimateSendCheck({ state: 'UNDER_REVIEW', missingDocs: [] }).ok).toBe(true);
    expect(estimateSendCheck({ state: 'PAID', missingDocs: [] })).toMatchObject({ ok: false, reason: 'wrong_state' });
    expect(pendingDocsForEstimate(['none', ' ', 'bank statement'])).toEqual(['bank statement']);
  });
});

describe('resolveTasksForCustomer', () => {
  it('resolves only that customer open cards', async () => {
    const resolved: string[] = [];
    const store = {
      listTasks: async () => [
        { id: 'a', status: 'OPEN', customerId: 'c1' }, { id: 'b', status: 'OPEN', customerId: 'c2' }, { id: 'c', status: 'DONE', customerId: 'c1' },
      ] as never,
      resolveTask: async (id: string) => { resolved.push(id); },
    };
    expect(await resolveTasksForCustomer(store, 'c1')).toBe(1);
    expect(resolved).toEqual(['a']);
  });
});
