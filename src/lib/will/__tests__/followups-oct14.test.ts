/** 14 Oct, Jo, one by one: the new follow-up wordings and the promise the
 *  last form nudge makes ("I'll check back with you then"). */
import { APPROVED } from '@/lib/will/approved-messages';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('the approved wordings', () => {
  it('pre-payment', () => {
    expect(APPROVED.followups_pre_payment.h24).toBe('Hi {{1}}, are you still in Australia or have you already left? 😊');
    expect(APPROVED.followups_pre_payment.d3).toBe('Hi {{1}}, have you given up on your tax refund this year?');
    expect(APPROVED.followups_pre_payment.d7).toBe('Hi {{1}}, should I close your file for now?');
    expect(APPROVED.followups_pre_payment.priceSent).toBe('Hi {{1}}, did the transfer go through on your end?');
  });
  it('form', () => {
    expect(APPROVED.followups_form.h6).toBe('Hi {{1}}, did you get a chance to look at the form yet?');
    expect(APPROVED.followups_form.d3).toBe('Hi {{1}}, is anything in the form holding you up?');
    expect(APPROVED.followups_form.d7).toBe("Hi {{1}}, when do you think you'll have a moment for the form? I'll check back with you then 😊");
  });
  it('signature (never "refund": payable customers get these too)', () => {
    expect(APPROVED.followups_signature.h24).toBe('Hi {{1}}, did the email with your tax return reach you okay?');
    expect(APPROVED.followups_signature.d3).toBe("Hi {{1}}, is there anything in your return you'd like me to explain before you sign?");
    expect(APPROVED.followups_signature.d7).toMatch(/When do you think you'll have a moment to sign it\? I'll check back with you then/);
    for (const t of Object.values(APPROVED.followups_signature)) expect(t).not.toMatch(/refund/i);
  });
  it('none mentions doing it yourself or myGov, none has a dash', () => {
    const all = [...Object.values(APPROVED.followups_pre_payment), ...Object.values(APPROVED.followups_form), ...Object.values(APPROVED.followups_signature)];
    for (const t of all) { expect(t).not.toMatch(/yourself|on your own|myGov|[—–]/i); expect(t.startsWith('Hi {{1}}')).toBe(true); }
  });
});

describe('"I\'ll check back with you then" is kept (source-pinned)', () => {
  const scheduler = readFileSync(join(__dirname, '..', 'scheduler.ts'), 'utf8');
  it('after the last form nudge, a promised day arms one check-back on that day', () => {
    expect(scheduler).toMatch(/payload: \{ templateKey: FLOW_TEMPLATES\[flow\]\[0\], seq, flow, checkBack: true \}/);
    expect(scheduler).toMatch(/flow === 'form' \|\| flow === 'signature'/);
  });
  it('the playbook tells Will what to say to each answer', () => {
    const pb = readFileSync(join(__dirname, '..', 'playbook.ts'), 'utf8');
    for (const h of ['STILL IN AUSTRALIA OR ALREADY LEFT', 'HAVE YOU GIVEN UP ON YOUR TAX REFUND THIS YEAR', 'SHOULD I CLOSE YOUR FILE FOR NOW', 'DID THE TRANSFER GO THROUGH ON YOUR END', 'DID YOU GET A CHANCE TO LOOK AT THE FORM YET', 'IS ANYTHING IN THE FORM HOLDING YOU UP', "WHEN DO YOU THINK YOU'LL HAVE A MOMENT FOR THE FORM"]) {
      expect(pb).toContain(h);
    }
  });
});
