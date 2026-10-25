/** Jo, 25 Oct: fixes from the 72-hour export (107 conversations). */
import fs from 'fs';
import path from 'path';
import { isIdentityQuestion } from '@/lib/will/identity-question';
import { parseYesNo } from '@/lib/will/residency-quiz';
import { isChoiceOrPriceAsk } from '@/lib/will/engine';

const src = (f: string) => fs.readFileSync(path.join(process.cwd(), 'src/lib/will', f), 'utf8');

it('a price question with "per person" is not "are you a bot?" (Inès waited 49 hours)', () => {
  expect(isIdentityQuestion('Is it $220 per person per year or for everything ?')).toBe(false);
  expect(isIdentityQuestion('Is it the same price for each person?')).toBe(false);
  // the real question still is
  expect(isIdentityQuestion('Is this an ai chat?')).toBe(true);
  expect(isIdentityQuestion('are you a real person?')).toBe(true);
  expect(isIdentityQuestion('Am I talking to a bot?')).toBe(true);
  expect(isIdentityQuestion('schreibe ich hier gerade mit einer KI? oder einem Menschen?')).toBe(true);
});

it('a long residency answer that opens with yes or no still counts (Fua)', () => {
  expect(parseYesNo('はい、2025年2月14日から2026年2月11日までオーストラリアに滞在しておりましたので、6か月以上滞在しておりました。')).toBe(true);
  expect(parseYesNo("Yes, I was in Australia from 14 Feb 2025 to 11 Feb 2026, so more than six months in that year.")).toBe(true);
  expect(parseYesNo("No, I moved back to the UK in March and I'm not planning to return to Australia at all")).toBe(false);
  expect(parseYesNo('I was there from February until the next February and worked in Darwin most of the time')).toBeNull();
});

it('"haven\'t seen a transfer request" is about paying: the bank details are the answer (Michael)', () => {
  expect(isChoiceOrPriceAsk("Haven't seen a transfer request? Should it be in my email?")).toBe(true);
  expect(isChoiceOrPriceAsk('Und wie ist die IBAN?')).toBe(true);
  expect(isChoiceOrPriceAsk('How do I pay?')).toBe(true);
  expect(isChoiceOrPriceAsk('Do you check Medicare?')).toBe(false);
});

it('the second check lets the good answers through', () => {
  const r = src('reviewer.ts');
  expect(r).toContain('THESE ARE A PASS, NEVER A HOLD');
  expect(r).toContain('A friendly goodbye to someone who declines');
  expect(r).toContain('counting the points the customer says apply to them');
});

it('no sales nudge once the team has sent an invoice or estimate (Rachel)', () => {
  const s = src('scheduler.ts');
  expect(s).toContain("const TEAM_PAST_SALES = /in\\.xero\\.com|");
  expect(s).toContain("m.author === 'HUMAN' && m.status === 'SENT' && TEAM_PAST_SALES.test(m.body ?? '')");
});

it('the playbook covers residency counting, amendments and the transfer request', () => {
  const p = src('playbook.ts');
  expect(p).toContain("RESIDENCY IS THE TEAM'S BIGGEST TIME SINK");
  expect(p).toContain('"1-4" or "①〜④" is 4');
  expect(p).toContain('Never count days yourself and never hand over for it');
  expect(p).not.toContain("is the team's: hand over only that point");
  expect(p).toContain('AFTER LODGEMENT, "CAN I AMEND MY RETURN?"');
  expect(p).toContain("I HAVEN'T SEEN A TRANSFER REQUEST");
  expect(src('will-decides.ts')).toContain('a paid customer asks anywhere whether they count as a resident');
});
