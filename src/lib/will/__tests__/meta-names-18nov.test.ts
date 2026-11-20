/** Jo, 18 Nov: Meta language codes, shared templates for both numbers, estimate with one variable. */
import { normalizeTemplateLang, EXPECTED_META_TEMPLATES } from '@/lib/will/channel';
import { svtTemplateName } from '@/lib/will/brand-voice';

it('Chinese and Portuguese use the language codes Meta knows', () => {
  expect(normalizeTemplateLang('zh')).toBe('zh_CN');
  expect(normalizeTemplateLang('pt')).toBe('pt_BR');
  expect(normalizeTemplateLang('vi')).toBe('vi');
});
it('brand-neutral templates are shared by Mia; only brand-link ones get an _svt twin', () => {
  for (const n of ['fu_pre_24h_de', 'refund_checkin_ja', 'form_received_en', 'signature', 'estimate_payable_zh', 'medicare_vi']) expect(svtTemplateName(n, new Set())).toBe(n);
  expect(svtTemplateName('payment_received_de', new Set())).toBe('payment_received_de_svt');
  expect(svtTemplateName('residency_check', new Set())).toBe('residency_check_svt');
});
it('the estimate templates carry one variable', () => {
  for (const t of EXPECTED_META_TEMPLATES.filter((x) => /^estimate_/.test(x.name))) expect(t.params).toBe(1);
});
