/** Jo, 11 Nov: fixes from the attention report (4 to 11 Nov). */
import fs from 'fs';
import path from 'path';
import { policyGuard, customerSaysSignedNow } from '@/lib/will/policy-guard';

const guard = (text: string, over: Record<string, unknown>) => policyGuard(text, {
  aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), ...over,
} as never).violations;

it('"14営業日" after 金額 is a duration, not a $14 price', () => {
  const t = '還付額は、チームが確認作業を完了してからわかります。すべての書類を確認して、正確な金額を出します。リターンが提出された後、通常14営業日以内にオーストラリアの銀行口座に入金されます。';
  expect(guard(t, { state: 'FORM_PENDING', paid: true, customerText: 'いつ頃入金されるのか分かりますか？' }).filter((v) => v.startsWith('FORBIDDEN_AMOUNT'))).toEqual([]);
  // A real Japanese price is still caught.
  expect(guard('料金は150です。', { state: 'NEW_LEAD', paid: false, customerText: 'いくらですか？' })).toContain('FORBIDDEN_AMOUNT:150.00');
});

describe('"Signed Thankyou" and "Done ✅" with the screenshot: "we\'ll lodge it now" goes out', () => {
  it('recognised as signed', () => {
    expect(customerSaysSignedNow('Signed Thankyou', 'SIGNATURE_PENDING')).toBe(true);
    expect(customerSaysSignedNow('📷  [Photo]\nDone ✅', 'SIGNATURE_PENDING')).toBe(true);
    expect(customerSaysSignedNow('Done ✅', 'FORM_PENDING')).toBe(false);
    expect(customerSaysSignedNow('Is it done?', 'SIGNATURE_PENDING')).toBe(false);
  });
  it('the guard lets the future lodgement line through, never "we have lodged it"', () => {
    const ctx = { state: 'SIGNATURE_PENDING', paid: true };
    expect(guard("We'll lodge it with the ATO now and message you here once it's lodged.", { ...ctx, customerText: 'Signed Thankyou' })).not.toContain('LODGEMENT_BEFORE_SIGNATURE');
    expect(guard("We'll lodge it straight away and you'll get confirmation here once it's been lodged with the ATO", { ...ctx, customerText: '📷  [Photo]\nDone ✅' })).not.toContain('LODGEMENT_BEFORE_SIGNATURE');
    expect(guard('We have lodged your return.', { ...ctx, customerText: 'Done ✅' })).toContain('LODGEMENT_BEFORE_SIGNATURE');
  });
});

it('no second task for a lost hand-off acknowledgement; WhatsApp system events are not messages', () => {
  const sch = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/scheduler.ts'), 'utf8');
  expect(sch).toContain("if (hit.kind === 'handoff_ack') continue;");
  const wh = fs.readFileSync(path.join(process.cwd(), 'src/app/api/will/webhook/route.ts'), 'utf8');
  expect(wh).toContain("if (msg.type === 'system') continue;");
});

describe('customers who asked us to stop are out of Will completely (Jo, 11 Nov)', () => {
  it('no task is ever raised for them', async () => {
    const { raiseOrUpdateTask } = await import('@/lib/will/tasks');
    const store = { addTask: jest.fn(), updateTask: jest.fn(), findOpenTaskForCustomer: jest.fn().mockResolvedValue(null) };
    const r = await raiseOrUpdateTask(store as never, { id: 'c1', name: 'Tay', waId: '1', optedOut: true } as never, { reason: 'x', severity: 'REVIEW', newContext: null, suggestedReply: null });
    expect(r).toBeNull();
    expect(store.addTask).not.toHaveBeenCalled();
  });
  it('their open tasks close (paid too) and they are left out of the attention report', () => {
    const svc = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/service.ts'), 'utf8');
    expect(svc).toContain('// Jo, 11 Nov: out of Will completely, paid or not: no card left open.\n    await resolveTasksForCustomer(store, customer.id)');
    const rep = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/attention-report.ts'), 'utf8');
    expect(rep).toContain('if ((c as { optedOut?: boolean }).optedOut) continue;');
  });
});
