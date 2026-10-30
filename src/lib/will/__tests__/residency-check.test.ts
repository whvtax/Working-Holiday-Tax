/** Jo, 16 Oct: UK / Germany / Japan + "Working Holiday Maker" for tax get a
 *  residency double-check after the form, in their language. */
import { needsResidencyCheck } from '@/lib/will/form-link';
import { residencyCheckMessage, RESIDENCY_CHECK_MSG } from '@/lib/will/i18n';
import { EXPECTED_META_TEMPLATES } from '@/lib/will/channel';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('who gets it', () => {
  it.each(['United Kingdom', 'UK', 'England', 'Germany', 'Deutschland', 'Japan', '日本', 'ドイツ', 'scotland'])('%s + whm', (c) => {
    expect(needsResidencyCheck(c, 'whm')).toBe(true);
  });
  it.each(['Ireland', 'France', 'Finland', 'Chile', 'Ukraine', 'Canada'])('%s is not on Jo\'s list', (c) => {
    expect(needsResidencyCheck(c, 'whm')).toBe(false);
  });
  it('a resident answer never gets it', () => {
    expect(needsResidencyCheck('Germany', 'Australian resident for tax purposes')).toBe(false);
  });
});

describe('the message', () => {
  it('in the customer\'s language, with the right page and no dash', () => {
    expect(residencyCheckMessage('en', 'Sarah').startsWith('Hi Sarah,\n\n')).toBe(true);
    expect(residencyCheckMessage('en', 'Sarah')).toContain('for tax purposes.');
    expect(residencyCheckMessage('en', 'Sarah')).not.toContain('difference to your refund');
    expect(residencyCheckMessage('en', 'Sarah').endsWith('y8vwp4bf7\n\nIs your answer still correct?')).toBe(true);
    expect(residencyCheckMessage('de', 'Lena')).toContain('/de/y8vwp4bf7');
    expect(residencyCheckMessage('ja', 'Yui')).toMatch(/^こんにちは、Yuiさん。/);
    expect(residencyCheckMessage('es', 'Ana')).toContain('workingholidaytax.com.au/y8vwp4bf7');
    for (const t of Object.values(RESIDENCY_CHECK_MSG)) { expect(t).not.toMatch(/[—–]/); expect(t.trim().endsWith('{{1}}')).toBe(false); }
  });
  it('the Meta template is on the System card list', () => {
    expect(EXPECTED_META_TEMPLATES.find((t) => t.name === 'residency_check')).toMatchObject({ params: 1 });
  });
});

describe('wiring (source-pinned)', () => {
  it('queued after the form, sent by the scheduler, answered by the playbook', () => {
    const form = readFileSync(join(__dirname, '..', 'form-link.ts'), 'utf8');
    const sched = readFileSync(join(__dirname, '..', 'scheduler.ts'), 'utf8');
    const pb = readFileSync(join(__dirname, '..', 'playbook.ts'), 'utf8');
    const route = readFileSync(join(__dirname, '..', '..', '..', 'app', 'api', 'tax-form', 'route.ts'), 'utf8');
    expect(route).toMatch(/country: sanitiseShort\(formData\.get\('country'\)\)/);
    expect(form).toMatch(/kind: 'RESIDENCY_CHECK'/);
    expect(sched).toMatch(/job\.kind === 'RESIDENCY_CHECK'/);
    expect(pb).toContain('THE RESIDENCY DOUBLE-CHECK');
  });
});
