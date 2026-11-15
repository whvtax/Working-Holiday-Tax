/** Jo, 11 Nov: anything that went wrong with the Medicare exemption gets one
 *  fixed message: Services Australia, not us or the ATO; we go ahead without it. */
import fs from 'fs';
import path from 'path';
import { medicareCantHelpMessage, MEDICARE_CANT_HELP_MSG } from '@/lib/will/i18n';
import { renderApproved, APPROVED_KEYS, WILL_DECIDES_PROMPT } from '@/lib/will/will-decides';
import { MEDICARE_ERROR_RE } from '@/lib/will/service';
import { policyGuard } from '@/lib/will/policy-guard';

it('the wording, en/de/ja, no dashes, no "try again"', () => {
  expect(medicareCantHelpMessage('en')).toContain('handled by Services Australia, not by us or the ATO');
  expect(medicareCantHelpMessage('en')).toContain('the Medicare levy stays on your return');
  for (const m of Object.values(MEDICARE_CANT_HELP_MSG)) {
    expect(m).not.toMatch(/[–—―]|try again|nochmal versuchen|もう一度/i);
  }
  expect(medicareCantHelpMessage('fr')).toBeNull();
});

it('Will has it as a key and is told when to use it', () => {
  expect(APPROVED_KEYS).toContain('medicare_cant_help');
  expect(renderApproved('medicare_cant_help' as never, { lang: 'de' } as never)).toBe(MEDICARE_CANT_HELP_MSG.de);
  expect(WILL_DECIDES_PROMPT).toContain('- medicare_cant_help (Jo, 11 Nov)');
});

it('the guard passes it for a paid customer', () => {
  const v = policyGuard(MEDICARE_CANT_HELP_MSG.en, { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), state: 'FORM_COMPLETE', paid: true, customerText: 'I cannot get the IHI, it says error' } as never);
  expect(v.violations).toEqual([]);
});

it('an error screenshot about Medicare / IHI is answered with it, no task', () => {
  for (const t of ['an error message stating the Individual Healthcare Identifiers could not be found', 'Services Australia error page', 'Medicare levy exemption application failed']) expect(MEDICARE_ERROR_RE.test(t)).toBe(true);
  expect(MEDICARE_ERROR_RE.test('a bank transfer error')).toBe(false);
  const s = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/service.ts'), 'utf8');
  const i = s.indexOf('const medicareLine = shownError && MEDICARE_ERROR_RE.test');
  expect(i).toBeGreaterThan(0);
  expect(i).toBeLessThan(s.indexOf('if (shownError) {', i));
});
