/** 14 Oct, Jo, one by one: the new follow-up wordings and the promise the
 *  last form nudge makes ("I'll check back with you then"). */
import { APPROVED } from '@/lib/will/approved-messages';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('the approved wordings', () => {
  it('pre-payment', () => {
    expect(APPROVED.followups_pre_payment.h24).toBe("Hey {{1}}😊\n\nJust checking in on your tax return. Anything I can explain before you get started?");
    expect(APPROVED.followups_pre_payment.d3).toBe("Hi {{1}}😊\nIf you need help with your tax return later on, just message me here.");
    expect(APPROVED.followups_pre_payment.priceSent).toBe("Hi {{1}}😊\nDid the transfer go through on your end?");
    // 18 Nov (decision 018): the German and Japanese versions moved to FOLLOWUP_MSG.fu_price_sent (i18n.ts).
    expect('priceSentDe' in APPROVED.followups_pre_payment).toBe(false);
  });
  it('form', () => {
    expect(APPROVED.followups_form.h6).toBe("Hi {{1}}😊\nDid you get a chance to fill out the form yet?");
  });
  it('signature (never "refund": payable customers get these too)', () => {
    expect(APPROVED.followups_signature.h24).toBe("Hi {{1}}😊\nDid you get a chance to review and sign your tax return?");
    for (const t of Object.values(APPROVED.followups_signature)) expect(t).not.toMatch(/refund/i);
  });
  it('none mentions doing it yourself or myGov, none has a dash', () => {
    const all = [...Object.values(APPROVED.followups_pre_payment), ...Object.values(APPROVED.followups_form), ...Object.values(APPROVED.followups_signature)];
    for (const t of all) { expect(t).not.toMatch(/yourself|on your own|myGov|[—–]/i); expect(t.startsWith('Hi {{1}}') || t.startsWith('Hey {{1}}') || t.startsWith('こんにちは、{{1}}さん')).toBe(true); }
  });
});

describe('"I\'ll check back with you then" is kept (source-pinned)', () => {
  const scheduler = readFileSync(join(__dirname, '..', 'scheduler.ts'), 'utf8');
  it('Jo, 18 Nov: no check-back after the one form or signature reminder', () => {
    expect(scheduler).not.toMatch(/checkBack: true \}/);
  });
  it('the playbook tells Will what to say to each answer', () => {
    const pb = readFileSync(join(__dirname, '..', 'playbook.ts'), 'utf8');
    for (const h of ['STILL IN AUSTRALIA OR ALREADY LEFT', 'HAVE YOU GIVEN UP ON YOUR TAX REFUND THIS YEAR', 'SHOULD I CLOSE YOUR FILE FOR NOW', 'DID THE TRANSFER GO THROUGH ON YOUR END', 'DID YOU GET A CHANCE TO LOOK AT THE FORM YET', 'IS ANYTHING IN THE FORM HOLDING YOU UP', "WHEN DO YOU THINK YOU'LL HAVE A MOMENT FOR THE FORM"]) {
      expect(pb).toContain(h);
    }
  });
});
