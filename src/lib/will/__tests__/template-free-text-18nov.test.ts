/** Jo, 18 Nov: the Templates tab groups the free-text rows by family and language. */
import { freeTextFamilies, coverage } from '@/lib/will/template-free-text';
import type { TemplateRow } from '@/lib/will/store';

const row = (key: string, body: string, requiresMeta = false): TemplateRow => ({
  id: key, key, category: 'Post-payment & Service', title: `T ${key}`, body, requiresMeta, versions: 1, updatedAt: '',
});

describe('freeTextFamilies', () => {
  const rows = [
    row('payment_received', 'en pay'),
    row('payment_received_de', 'de pay'),
    row('payment_received_ja', 'ja pay'),
    row('req_abn', 'en abn'),
    row('fu_pre_24h', 'meta one', true),
  ];

  it('leaves out the Meta templates', () => {
    const fams = freeTextFamilies(rows);
    expect(fams.map((f) => f.family)).toEqual(['payment_received', 'req_abn']);
  });

  it('puts each language under its family', () => {
    const pay = freeTextFamilies(rows).find((f) => f.family === 'payment_received')!;
    expect(pay.byLang.en?.body).toBe('en pay');
    expect(pay.byLang.de?.body).toBe('de pay');
    expect(pay.byLang.ja?.body).toBe('ja pay');
    expect(pay.byLang.fr).toBeUndefined();
  });

  it('counts coverage per language', () => {
    const c = coverage(freeTextFamilies(rows));
    expect(c.en).toBe(2);
    expect(c.de).toBe(1);
    expect(c.vi).toBe(0);
  });
});
