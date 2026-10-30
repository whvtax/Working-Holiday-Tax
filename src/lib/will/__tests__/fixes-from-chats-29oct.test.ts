// Jo, 29 Oct: fixes from the customer chats of the day.
import { withMygovReassurance, MYGOV_TROUBLE_RE, priceMessageFor } from '../instant-choice';
import { LEAVING_RE, isClosingOnly, containsThanks, thanksReply } from '../text-normalize';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('myGov trouble next to a price answer', () => {
  const PRICE = priceMessageFor('TFN');
  it('puts the reassurance in front of the price message', () => {
    const out = withMygovReassurance(PRICE, ["Tfn only, I'm doing this so late because I didn't know how to conect it to myGov app."], 'en');
    expect(out.startsWith('No need to worry about myGov')).toBe(true);
    expect(out.endsWith(PRICE)).toBe(true);
  });
  it('leaves the price message alone when myGov is not mentioned', () => {
    expect(withMygovReassurance(PRICE, ['TFN only'], 'en')).toBe(PRICE);
  });
  it('is not added twice', () => {
    const once = withMygovReassurance(PRICE, ['cant log in to mygov'], 'en');
    expect(withMygovReassurance(once, ['cant log in to mygov'], 'en')).toBe(once);
  });
  it('speaks German and Japanese and stays silent for other languages', () => {
    expect(withMygovReassurance('X', ['myGov geht nicht'], 'de')).toMatch(/^Um myGov/);
    expect(withMygovReassurance('X', ['myGovにログインできません'], 'ja')).toMatch(/^myGovについて/);
    expect(withMygovReassurance('X', ['mygov'], 'fr')).toBe('X');
  });
  it('matches the usual ways of describing the problem', () => {
    for (const t of ["can't log in", 'locked out of my ATO account', 'how do I link it to my account', 'no digital ID']) {
      expect(MYGOV_TROUBLE_RE.test(t)).toBe(true);
    }
    expect(MYGOV_TROUBLE_RE.test('TFN only, worked in a cafe')).toBe(false);
  });
  it('has no dashes and no AI wording', () => {
    for (const l of ['en', 'de', 'ja']) {
      const out = withMygovReassurance('', ['mygov'], l);
      expect(out).not.toMatch(/[—–―-]/);
      expect(out).not.toMatch(/\b(?:AI|bot)\b/i);
    }
  });
});

describe('a lead who says not this time is a goodbye', () => {
  it.each(['わかりました、今回は見送らせてもらいます。', "I'll pass for now, thanks", 'Not this time', 'Diesmal nicht, danke'])('%s', (t) => {
    expect(LEAVING_RE.test(t)).toBe(true);
  });
  it('does not catch a normal question', () => {
    expect(LEAVING_RE.test('How long does it take?')).toBe(false);
  });
});

describe('Japanese thank-yous get the Japanese line', () => {
  it('了解です ありがとうございます is a closing with thanks', () => {
    const t = '了解です\nありがとうございます';
    expect(isClosingOnly(t)).toBe(true);
    expect(containsThanks(t)).toBe(true);
    expect(thanksReply('', 'ja')).toMatch(/どういたしまして|いつでもどうぞ/);
  });
});

describe('the playbook carries the gaps', () => {
  const src = readFileSync(join(__dirname, '..', 'playbook.ts'), 'utf8');
  const block = src.slice(src.indexOf('# SEVEN GAPS FROM THE 29 OCT CHATS'), src.indexOf('# "YES" TO THE ESTIMATE'));
  it.each([
    'WHAT IS THE TFN ABN OPTION', 'MIXES THE TRACK WITH myGov', 'HOW LIKELY AM I TO GET MONEY BACK', 'BUSINESS NAME, ABN AND TPB',
    'CORRECTS THE YEAR', 'CANNOT PAY BY BANK TRANSFER', 'MEDICARE EXEMPTION', 'SO WHAT SHOULD I DO', 'NOT THIS TIME',
  ])('has the rule %s', (k) => { expect(block).toContain(k); });
  it('has no dashes and no unapproved agent phrase', () => {
    expect(block).not.toMatch(/[\u2014\u2013\u2015]/);
    expect(block).not.toMatch(/we are a registered tax agent/i.source === '' ? /$^/ : /(?<!never ")we are a registered tax agent(?!")/i);
  });
});
