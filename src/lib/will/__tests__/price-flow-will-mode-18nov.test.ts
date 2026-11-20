/** Jo, 18 Nov: the two-step price flow is the standard, also when Will decides (decision mode 'will'). */
import fs from 'fs';
import path from 'path';
import { renderApproved } from '@/lib/will/will-decides';
import { priceFlowSteps } from '@/lib/will/price-flow-variant';

const base = { state: 'QUALIFIED' as const, firstName: 'Mia', firstContact: false, lastWillText: '', foreign: false };

it('the price key renders the steps message in the customer\'s language', () => {
  for (const lang of ['en', 'de', 'ja', 'es', 'fr', 'it', 'pt', 'zh', 'vi']) {
    expect(renderApproved('price_tfn', { ...base, lang, priceFlowNew: true })).toBe(priceFlowSteps('TFN', false, lang));
    expect(renderApproved('price_tfn_abn', { ...base, lang, foreign: true, priceFlowNew: true })).toBe(priceFlowSteps('TFN_ABN', true, lang));
  }
});
it('without the flag the old one-message price is unchanged', () => {
  expect(renderApproved('price_tfn', { ...base, lang: 'en' })).not.toBe(priceFlowSteps('TFN', false, 'en'));
});
it('the service passes the setting to the engine on both runs, and the playbook no longer forbids the question', () => {
  const svc = fs.readFileSync(path.join(__dirname, '..', 'service.ts'), 'utf8');
  expect(svc.match(/partialAnswer: true, priceFlowNew/g)?.length).toBe(2);
  const pb = fs.readFileSync(path.join(__dirname, '..', 'playbook.ts'), 'utf8');
  expect(pb).not.toContain('NEVER write "Want me to send you the payment details?"');
});
