import {
  priceFlowVariantFor, normalisePriceFlowSetting, PRICE_FLOW_STEPS_TFN,
  PRICE_FLOW_STEPS_TFN_ABN, PRICE_FLOW_PAYMENT_DETAILS,
} from '../price-flow-variant';

describe('price flow variant', () => {
  it('unset or unknown means new: the two-message flow is the standard (Jo, 18 Nov)', () => {
    expect(normalisePriceFlowSetting(undefined)).toBe('new');
    expect(normalisePriceFlowSetting('banana')).toBe('new');
    expect(priceFlowVariantFor('c1', undefined)).toBe('new');
  });

  it('new and old settings apply to everyone', () => {
    for (const id of ['a', 'b', 'c', 'd']) {
      expect(priceFlowVariantFor(id, 'new')).toBe('new');
      expect(priceFlowVariantFor(id, 'old')).toBe('old');
    }
  });

  it('split is stable per customer and uses both versions', () => {
    const ids = Array.from({ length: 200 }, (_, i) => `cust-${i}`);
    const first = ids.map((id) => priceFlowVariantFor(id, 'split'));
    const second = ids.map((id) => priceFlowVariantFor(id, 'split'));
    expect(second).toEqual(first);
    const newCount = first.filter((v) => v === 'new').length;
    expect(newCount).toBeGreaterThan(60);
    expect(newCount).toBeLessThan(140);
  });

  it('message 1 ends with the yes question and does not show a price in its first line', () => {
    for (const m of [PRICE_FLOW_STEPS_TFN, PRICE_FLOW_STEPS_TFN_ABN]) {
      expect(m.trimEnd()).toMatch(/(?:Shall I|Want me to) send the payment details\?$/);
      expect(m.split('\n')[0]).not.toMatch(/\$/);
    }
  });

  it('bank details are only in message 2, never in message 1', () => {
    expect(PRICE_FLOW_STEPS_TFN).not.toMatch(/BSB|Account:/);
    expect(PRICE_FLOW_STEPS_TFN_ABN).not.toMatch(/BSB|Account:/);
    expect(PRICE_FLOW_PAYMENT_DETAILS).toMatch(/BSB: 062692/);
    expect(PRICE_FLOW_PAYMENT_DETAILS).toMatch(/Send a screenshot/);
    expect(PRICE_FLOW_PAYMENT_DETAILS).toMatch(/Amount: \$220/);
  });

  it('no dashes in any customer-facing text', () => {
    for (const m of [PRICE_FLOW_STEPS_TFN, PRICE_FLOW_STEPS_TFN_ABN, PRICE_FLOW_PAYMENT_DETAILS]) {
      expect(m).not.toMatch(/[-‐-―−]/);
    }
  });
});
