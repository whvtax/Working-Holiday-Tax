/** Jo, 14 Nov: fixes from the attention report (11 to 14 Nov). */
import fs from 'fs';
import path from 'path';
import { policyGuard } from '@/lib/will/policy-guard';
import { saysRefundLanded } from '@/lib/will/review-asks';

const guard = (text: string, over: Record<string, unknown>) => policyGuard(text, {
  aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), ...over,
} as never).violations;

describe('the $165 ABN upgrade after paying for TFN only', () => {
  const ctx = { state: 'FORM_PENDING', paid: true, customerText: "I can't do international transfer without an address, could you send an online payment link?" };
  it('goes through when the reply is about the ABN', () => {
    expect(guard("No problem! I'll get a secure payment link for the $165 ABN upgrade sent to you here shortly.", ctx).filter((v) => v.startsWith('FORBIDDEN_AMOUNT'))).toEqual([]);
  });
  it('another figure after payment is still blocked', () => {
    expect(guard("I'll send a payment link for $150 for the ABN upgrade.", ctx)).toContain('FORBIDDEN_AMOUNT:150.00');
  });
});

it('a Japanese "the refund was deposited" is read as landed; a repeat gets no reply and no task', () => {
  expect(saysRefundLanded('お世話になっております。還付金が口座に振り込まれておりました。')).toBe(true);
  const s = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/service.ts'), 'utf8');
  expect(s).toContain("'refund_landed_noted'");
});

it('everything on WhatsApp: the ask never says "text message", SMS or email', async () => {
  const { TEXT_ONLY_ASK } = await import('@/lib/will/text-only-reply');
  for (const m of Object.values(TEXT_ONLY_ASK)) expect(m).not.toMatch(/text message|textnachricht|テキストメッセージ|mensaje de texto|message texte|messaggio di testo|mensagem de texto|sms|e-?mail|[–—―]/i);
  const pb = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/playbook.ts'), 'utf8');
  expect(pb).toContain('# EVERYTHING HAPPENS HERE ON WHATSAPP (Jo, 14 Nov');
});

it('Fua: "refund landed" never opens a "Will did not reply" task (the review ask answers it)', () => {
  const s = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/service.ts'), 'utf8');
  const i = s.indexOf('async function silenceNet(');
  expect(s.slice(i, i + 1500)).toContain("if (customer.brand !== 'svt' && saysRefundLanded(cleaned) && !hasQuestionOrRequest(cleaned)) return;");
  expect(saysRefundLanded('お世話になっております。\n還付金が口座に振り込まれておりました。')).toBe(true);
});
