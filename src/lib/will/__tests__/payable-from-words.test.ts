/** 16 Oct (Jo): an estimate the team writes by hand sets the outcome. */
import { teamOutcomeFromWords } from '@/lib/will/stage-sync';
import { readFileSync } from 'fs';
import { join } from 'path';

const HAND_WRITTEN = "Hi! I've reviewed your 2025-2026 tax information...\n\nTotal income: $162,213\nTax withheld: $41,830\n\n*Estimated tax payable: $1,803.81*\n\nPlease let me know how you would like to proceed.";

describe('the team\'s words decide the outcome', () => {
  it('the hand-written payable estimate → PAYABLE', () => { expect(teamOutcomeFromWords(HAND_WRITTEN)).toBe('PAYABLE'); });
  it('"Your estimated tax refund is $5,040.00" → REFUND', () => { expect(teamOutcomeFromWords('Your estimated tax refund is $5,040.00.')).toBe('REFUND'); });
  it('a remark without a figure changes nothing', () => { expect(teamOutcomeFromWords('If you owe tax we will let you know')).toBeNull(); });
  it('two years, one each: left to the toggle', () => { expect(teamOutcomeFromWords('2025: tax payable of $269.07, 2024: tax refund of $1,219.00')).toBeNull(); });
});

describe('wired from the CRM and from the phone (source-pinned)', () => {
  it('both paths', () => {
    const actions = readFileSync(join(__dirname, '..', '..', '..', 'app', 'api', 'will', 'actions', 'route.ts'), 'utf8');
    const webhook = readFileSync(join(__dirname, '..', '..', '..', 'app', 'api', 'will', 'webhook', 'route.ts'), 'utf8');
    expect(actions).toMatch(/const outcome = teamOutcomeFromWords\(body\)/);
    expect(webhook).toMatch(/teamOutcomeFromWords\(echo\.body\)/);
  });
  it('Will never sends a customer who owes to call the ATO', () => {
    const pb = readFileSync(join(__dirname, '..', 'playbook.ts'), 'utf8');
    expect(pb).toMatch(/NEVER tell a customer who owes to call the ATO/);
  });
});
