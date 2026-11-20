/** Jo, 18 Nov: anyone who asks for our address gets it, from the Library. */
import fs from 'fs';
import path from 'path';
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';
import { policyGuard } from '@/lib/will/policy-guard';

const ADDRESS = '98 George Street, Sydney NSW 2000, Australia';

it('the Library has the answer, word for word', () => {
  const e = KNOWLEDGE_SEED.find((k) => k.intent === 'our business address for a payment');
  expect(e?.answer).toBe(`Our address is ${ADDRESS}.`);
});

it('the playbook gives it instead of handing the question to the team', () => {
  const pb = fs.readFileSync(path.join(__dirname, '..', 'playbook.ts'), 'utf8');
  expect(pb).toContain(ADDRESS);
  expect(pb).not.toMatch(/business address for an international transfer is still the team's/);
});

it('the policy guard lets it through before and after payment', () => {
  for (const paid of [false, true]) {
    const v = policyGuard(`Our address is ${ADDRESS}.`, {
      state: paid ? 'FORM_PENDING' : 'PRICE_SENT', paid, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
      lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null,
    });
    expect(v.violations).toEqual([]);
  }
});
