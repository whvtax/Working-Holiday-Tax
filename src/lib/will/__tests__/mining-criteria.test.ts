/**
 * Jo, 24 Sep: 100 nightly proposals, 98 deleted. The mining prompt now says
 * exactly what belongs in the Library and that zero entries is the normal
 * night. Pinned so a future edit cannot quietly loosen it.
 */
import fs from 'fs';
const src = fs.readFileSync(require.resolve('@/lib/will/claude'), 'utf8');
const prompt = src.slice(src.indexOf('const MINE_SYSTEM'), src.indexOf('export async function mineKnowledge'));

it('says zero entries is the normal result', () => {
  expect(prompt).toMatch(/MOST NIGHTS THE RIGHT OUTPUT IS ZERO ENTRIES/);
  expect(prompt).toMatch(/An empty entries list is a correct and common result/);
});
it('excludes the approved scripts and the professional determinations', () => {
  expect(prompt).toMatch(/Never propose: the two-option price menu/);
  expect(prompt).toMatch(/Never propose an answer that decides or explains a customer's tax residency/);
  expect(prompt).toMatch(/ALREADY IN THE LIBRARY/);
});
it('carries the current business facts and no retired wording', () => {
  expect(prompt).toMatch(/The Accounting Academy, BSB 062692, Account Number 81049952/);
  expect(prompt).toMatch(/never "non-refundable"/);
  expect(prompt).toMatch(/never write "we are registered tax agents"/);
  expect(prompt).not.toMatch(/Simple Tax Services/);
  expect(prompt).not.toMatch(/refund the difference"?\s*[.:]/);
});
