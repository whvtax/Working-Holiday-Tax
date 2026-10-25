/** Jo, 25 Oct (+63 949): invoice, TPB, account owner, myGov before paying. */
import fs from 'fs';
import path from 'path';

it('the playbook answers every point of the careful buyer, invoice after payment', () => {
  const pb = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/playbook.ts'), 'utf8');
  expect(pb).toContain('# THE CAREFUL BUYER: INVOICE, AGENT, ACCOUNT, myGov');
  expect(pb).toContain("We'll send you a tax invoice once your payment comes through.");
  expect(pb).toContain('the account name is The Accounting Academy');
  expect(pb).toContain('Do not add "as your tax agent"');
  expect(pb).toContain('# MANY QUESTIONS IN ONE MESSAGE');
});
