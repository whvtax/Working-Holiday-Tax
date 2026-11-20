/**
 * VERIFY-18nov, open item 4 (closed 18 Nov): the Meta template health check lists the "_svt"
 * twins Mia sends (svtTemplateName in brand-voice.ts), so a missing Mia template shows on the
 * health panel. Synthetic Meta rows only; nothing is sent.
 */
import { EXPECTED_META_TEMPLATES, compareTemplates } from '@/lib/will/channel';
import { svtTemplateName } from '@/lib/will/brand-voice';
import { LANGS, paymentReceivedTemplateKey, residencyCheckTemplateKey } from '@/lib/will/i18n';

const names = EXPECTED_META_TEMPLATES.map((t) => t.name);
const row = (name: string, params: number) => ({
  name, status: 'APPROVED', language: 'en',
  components: [{ type: 'BODY', text: Array.from({ length: params }, (_, i) => `{{${i + 1}}}`).join(' ') || 'text' }],
});

describe('the health list carries every SVT twin the send paths can name', () => {
  it('every template that svtTemplateName renames has its twin on the list, with the same parameters', () => {
    const wht = EXPECTED_META_TEMPLATES.filter((t) => !t.name.endsWith('_svt'));
    for (const t of wht) {
      const twin = svtTemplateName(t.name, new Set());
      if (twin === t.name) continue;
      const listed = EXPECTED_META_TEMPLATES.find((x) => x.name === twin);
      expect([twin, listed?.params]).toEqual([twin, t.params]);
      expect(listed?.optional).toBe(true);
    }
  });
  it('payment_received and residency_check twins in all nine languages (18), nothing brand-neutral twinned', () => {
    for (const l of LANGS) {
      expect(names).toContain(`${paymentReceivedTemplateKey(l)}_svt`);
      expect(names).toContain(`${residencyCheckTemplateKey(l)}_svt`);
    }
    expect(names.filter((n) => n.endsWith('_svt'))).toHaveLength(18);
    for (const n of ['medicare_svt', 'signature_svt', 'fu_pre_24h_svt', 'refund_checkin_svt', 'estimate_invoice_svt']) expect(names).not.toContain(n);
    expect(new Set(names).size).toBe(names.length);
  });
  it('a missing Mia twin is reported on the health panel (as an optional note), present twins are not', () => {
    const rows = EXPECTED_META_TEMPLATES.filter((t) => t.name !== 'payment_received_de_svt').map((t) => row(t.name, t.params));
    const cmp = compareTemplates(rows as never);
    expect(cmp.missingOptional).toEqual(['payment_received_de_svt']);
    expect(cmp.ok).toBe(true);
    const residencyTwinWrongParams = rows.map((r) => (r.name === 'residency_check_svt' ? row(r.name, 0) : r));
    expect(compareTemplates(residencyTwinWrongParams as never).paramMismatch.join()).toMatch(/residency_check_svt/);
  });
});
