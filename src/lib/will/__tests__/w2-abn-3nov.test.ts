/** 3 Nov wave 2: income type and ABN flow (synthetic data only). */
import { hasAbnIncome, abnQuestionAnswered } from '@/lib/will/abn-income';
import { alreadyCheckedReason } from '@/lib/will/already-checked';
import { hasForeignIncome, foreignFeeLine } from '@/lib/will/foreign-income';
import { countTaxYears, feeFor, multiYearLine } from '@/lib/will/quotes';
import { mentionsForeignCurrency, missingIntakeFacts, abnRequestDelivered, ABN_NUMBER_AND_GST_QUESTION, ABN_CURRENCY_QUESTION, ABN_YEAR_QUESTION } from '@/lib/will/abn-intake';
import { APPROVED } from '@/lib/will/approved-messages';

describe('negated ABN answers', () => {
  it.each([
    'I am only an employee, no ABN',
    'I worked only as an employee using my TFN',
    'I was not self-employed',
    "I'm not a contractor",
    'Never worked under an ABN',
    'ABN: no',
    'TFN only',
    'Ich habe keinen ABN',
  ])('%s is not ABN income', (t) => { expect(hasAbnIncome([t])).toBe(false); });
  it.each([
    'I drive for Uber Eats',
    'I have an ABN',
    'Employee in a cafe, but I also did Uber Eats',
    'only an employee, no ABN. Later I started freelancing',
  ])('%s is ABN income', (t) => { expect(hasAbnIncome([t])).toBe(true); });
  it('a TFN-only answer counts as answered; a bare question does not', () => {
    expect(abnQuestionAnswered(['yes TFN only'])).toBe(true);
    expect(abnQuestionAnswered(['Only TFN 😊'])).toBe(true);
    expect(abnQuestionAnswered(['Do I need an ABN?'])).toBe(false);
  });
});

describe('already checked', () => {
  it.each([
    ['My eTax estimate is about $400', 'result'],
    ['The estimated refund is approximately AUD 0.40', 'result'],
    ['H&R Block quoted me a refund', 'elsewhere'],
  ])('%s -> %s', (t, r) => { expect(alreadyCheckedReason([t])).toBe(r); });
  it.each([
    'My friend told me about you',
    'My boss said I need a TFN',
    "I haven't had an accountant check it",
    "I can't see myGov",
    'Can I check it in myGov?',
    'I started eTax but have not entered anything',
  ])('%s -> nothing', (t) => { expect(alreadyCheckedReason([t])).toBeNull(); });
});

describe('foreign income', () => {
  it('negations', () => {
    expect(hasForeignIncome(["I didn't earn anything overseas"])).toBe(false);
    expect(hasForeignIncome(['no income from overseas'])).toBe(false);
    expect(hasForeignIncome(['I need to report foreign income'])).toBe(true);
  });
  it('the $495 option exists and is stated as fixed', () => {
    expect(foreignFeeLine('TFN_ABN')).toContain('$495');
    expect(foreignFeeLine('TFN')).toContain('$330');
    expect(APPROVED.price_tfn_abn_foreign).toContain('$495');
    expect(foreignFeeLine('TFN_ABN')).not.toMatch(/[–—―]|refund/);
  });
});

describe('years quoted up front', () => {
  it('counts years', () => {
    expect(countTaxYears(['I need 2023-24 and 2024/25'])).toBe(2);
    expect(countTaxYears(['for both years please'])).toBe(2);
    expect(countTaxYears(['just the last one'])).toBe(1);
  });
  it('the line', () => {
    expect(multiYearLine(2, 'TFN')).toContain('$440');
    expect(multiYearLine(2, 'TFN_ABN')).toContain('$770');
    expect(multiYearLine(1, 'TFN')).toBeNull();
    expect(feeFor('TFN_ABN', true)).toBe(495);
  });
});

describe('abn intake extras', () => {
  const t0 = '2026-11-01T00:00:00Z';
  const msg = (body: string) => ({ direction: 'IN', body, createdAt: '2026-11-02T00:00:00Z' });
  it('detects foreign currency without AUD', () => {
    expect(mentionsForeignCurrency(['two invoices, US$6,000 each'])).toBe(true);
    expect(mentionsForeignCurrency(['invoices in AUD', 'USD'])).toBe(false);
  });
  it('asks for number and GST until both are given', () => {
    expect(missingIntakeFacts([msg('uber eats')], t0)).toEqual(['abn_number_gst']);
    expect(missingIntakeFacts([msg('ABN 12 345 678 901, registered for GST')], t0)).toEqual([]);
    expect(missingIntakeFacts([msg('ABN 12 345 678 901, GST yes'), msg('invoice USD 500')], t0)).toEqual(['currency']);
  });
  it('a failed send is not delivered', () => {
    const req = APPROVED.request_abn_detail;
    expect(abnRequestDelivered([{ direction: 'OUT', body: req, status: 'FAILED' }], req)).toBe(false);
    expect(abnRequestDelivered([{ direction: 'OUT', body: req, status: 'SENT' }], req)).toBe(true);
  });
  it('questions have no forbidden dashes', () => {
    for (const q of [ABN_NUMBER_AND_GST_QUESTION, ABN_CURRENCY_QUESTION, ABN_YEAR_QUESTION]) expect(q).not.toMatch(/[–—―]/);
  });
});
