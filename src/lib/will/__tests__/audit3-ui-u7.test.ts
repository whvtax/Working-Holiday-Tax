/**
 * Library shows the WhatsApp Manager template name (audit, 5 Sep).
 *
 * Follow-ups leave as a Meta template named after the Library row's `key`.
 * That key was never printed anywhere in the CRM and the "META ✓" chip was a
 * seed flag, so a missing template at Meta gave Jo nothing on screen to act
 * on. The card and the edit modal now print the exact name with a copy
 * button, and the chip tooltip says what the flag actually means.
 */
import fs from 'fs';
import path from 'path';
import { metaTemplateLabel, META_TEMPLATE_CHIP_TIP } from '@/components/will/Dashboard';

describe('metaTemplateLabel', () => {
  it('prints the exact key for Meta-backed rows and nothing for the rest', () => {
    expect(metaTemplateLabel({ key: 'fu_pre_24h', requiresMeta: true })).toBe('WhatsApp Manager template: fu_pre_24h');
    expect(metaTemplateLabel({ key: 'custom_ab12', requiresMeta: false })).toBeNull();
    expect(metaTemplateLabel({ key: 'custom_ab12' })).toBeNull();
  });
  it('chip tooltip explains the name must exist and be approved at Meta', () => {
    expect(META_TEMPLATE_CHIP_TIP).toMatch(/WhatsApp Manager template of this exact name/);
    expect(META_TEMPLATE_CHIP_TIP).toMatch(/approved/);
    expect(META_TEMPLATE_CHIP_TIP).not.toContain('-');
  });
});

describe('Dashboard wiring', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');
  it('Library card and edit modal both render the template name with a copy button', () => {
    expect(src).toContain('<MetaTemplateName t={t} say={say} />');
    expect(src).toContain('<MetaTemplateName t={tpl} say={say} />');
    expect(src).toContain('navigator.clipboard.writeText(t.key)');
  });
  it('the META chip uses the explanatory tooltip, not the old static one', () => {
    expect(src).toContain('title={META_TEMPLATE_CHIP_TIP}');
    expect(src).not.toContain('title="Requires Meta template approval"');
  });
});
