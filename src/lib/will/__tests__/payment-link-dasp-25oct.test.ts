/** Jo, 25 Oct: paying from overseas gets a card payment link (the team sends
 *  it by hand), and there is no super (DASP) service for now. */
import fs from 'fs';
import path from 'path';
import { renderApproved, APPROVED_KEYS } from '@/lib/will/will-decides';
import { explainHandoffReason } from '@/lib/will/handoff-reasons';
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';
import { formStrings } from '@/lib/formStrings';

const base = { state: 'PRICE_SENT' as const, firstName: null, firstContact: false, lastWillText: '', foreign: false };
const src = (f: string) => fs.readFileSync(path.join(process.cwd(), f), 'utf8');

it('the payment link flow: offer, full name, then a task for the team', () => {
  expect(APPROVED_KEYS).toEqual(expect.arrayContaining(['payment_link_offer', 'payment_link_name', 'payment_link_ready', 'no_dasp']));
  expect(renderApproved('payment_link_offer', { ...base, lang: 'de' })).toContain('Zahlungslink');
  expect(renderApproved('payment_link_name', { ...base, lang: 'en' })).toContain('full name');
  expect(renderApproved('payment_link_ready', { ...base, lang: 'ja' })).toContain('支払いリンク');
  const svc = src('src/lib/will/service.ts');
  expect(svc).toContain("outcome.decision?.approved_key === 'payment_link_ready'");
  expect(svc).toContain('PAYMENT LINK: send a card payment link to');
  expect(explainHandoffReason('PAYMENT LINK: send a card payment link to Jakob').label).toBe('Send a payment link');
  expect(src('src/lib/will/playbook.ts')).toContain('Never give an IBAN or SWIFT, never convert the price');
});

it('no super (DASP) service: the wording, the Library and the playbook agree', () => {
  expect(renderApproved('no_dasp', { ...base, lang: 'en' })).toContain("we don't offer a superannuation (DASP) service");
  const dasp = KNOWLEDGE_SEED.filter((k) => /dasp|superannuation/i.test(k.question));
  expect(dasp.length).toBeGreaterThan(0);
  for (const k of dasp) expect(k.answer).toContain("we don't offer a superannuation (DASP) service");
  expect(src('src/lib/will/seed.ts')).toContain("marker: 'fix-25oct'");
  expect(src('src/lib/will/playbook.ts')).not.toContain('we are happy to help with that too once your tax return is done');
});

it('the form asks for the WhatsApp number they messaged us from', () => {
  expect((formStrings as unknown as Record<string, { en: string }>).whatsapp.en).toBe('The WhatsApp number you messaged us from');
  expect(src('src/app/(site)/tax-form/FormClient.tsx')).toContain('Use the same number you are chatting with us on');
});
