/**
 * 18 Nov 2026, audit 3 (F1, F9): Chinese and Vietnamese had no guard rules, so
 * a tax determination, a refund promise or an agent claim went out unchecked.
 */
import { policyGuard } from '@/lib/will/policy-guard';

const ctx = { state: 'PRICE_SENT' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null };

describe('Chinese and Vietnamese free replies are checked', () => {
  it.each([
    '你不是澳洲税务居民，不需要缴纳医疗保险税。',
    'Bạn không phải là cư dân thuế Úc, nên không cần đóng thuế này.',
  ])('tax determination is blocked: %s', (t) => {
    expect(policyGuard(t, ctx).violations).toContain('TAX_DETERMINATION');
  });

  it.each([
    '我们会退还费用，保证不会亏。',
    'Chúng tôi sẽ hoàn lại toàn bộ tiền phí cho bạn.',
  ])('refund promise is blocked: %s', (t) => {
    expect(policyGuard(t, ctx).violations).toContain('REFUND_OR_CANCEL_PROMISE');
  });

  it.each([
    '我们是注册税务代理人，帮你报税。',
    'Chúng tôi là đại lý thuế đã đăng ký.',
  ])('agent claim is blocked: %s', (t) => {
    expect(policyGuard(t, ctx).violations).toContain('AGENT_CLAIM');
  });

  it('an ordinary Chinese greeting is not blocked', () => {
    expect(policyGuard('您好，请问有什么可以帮您？', ctx).allowed).toBe(true);
  });
});
