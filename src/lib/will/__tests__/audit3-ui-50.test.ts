/**
 * audit3 ui-50 (5 Sep): the numbered Quick-fill chips load the customer's
 * language variant of the Library row (req_abn_de and so on) when it is seeded,
 * else the English row, and an unedited variant body still routes through
 * send_template outside the 24h window.
 */
import fs from 'fs';
import path from 'path';
import { quickTemplateFor, quickTemplateKeyFor } from '@/components/will/Dashboard';

const templates = [
  { key: 'req_abn', title: 'ABN questions', body: 'A few quick questions about your ABN income.' },
  { key: 'req_abn_de', title: 'ABN questions (German)', body: 'Ein paar kurze Fragen zu deinem ABN-Einkommen.' },
  { key: 'medicare', title: 'Medicare exemption guide', body: 'About Medicare.' },
];

describe('quickTemplateFor', () => {
  it('picks the language variant when the customer is not English and the row exists', () => {
    expect(quickTemplateFor('req_abn', 'de', templates)?.key).toBe('req_abn_de');
  });
  it('falls back to the English row when no variant is seeded, for English, or unknown language', () => {
    expect(quickTemplateFor('medicare', 'de', templates)?.key).toBe('medicare');
    expect(quickTemplateFor('req_abn', 'en', templates)?.key).toBe('req_abn');
    expect(quickTemplateFor('req_abn', null, templates)?.key).toBe('req_abn');
    expect(quickTemplateFor('req_abn', 'zz', templates)?.key).toBe('req_abn');
  });
  it('returns null when even the base row is missing', () => {
    expect(quickTemplateFor('req_doc', 'de', templates)).toBeNull();
  });
});

describe('quickTemplateKeyFor with language variants', () => {
  it('recognises an unedited variant body by its own key', () => {
    expect(quickTemplateKeyFor(templates[1].body, templates)).toBe('req_abn_de');
    expect(quickTemplateKeyFor(templates[0].body, templates)).toBe('req_abn');
  });
  it('does not match unrelated keys that merely share a prefix', () => {
    const t = [...templates, { key: 'req_abn_reminder', title: 'x', body: 'Reminder body.' }];
    expect(quickTemplateKeyFor('Reminder body.', t)).toBeNull();
  });
});

describe('Dashboard wiring', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');
  it('the Quick-fill chips resolve the row against the chat language and show the code in the tooltip', () => {
    const block = src.slice(src.indexOf('{QUICK_TEMPLATES.map((key, i) => {'), src.indexOf('className="chipbtn qsnum"'));
    expect(block).toContain('quickTemplateFor(key, chatSel.lang, data.templates)');
    expect(block).toContain("t.key !== key ? ` (${t.key.slice(key.length + 1)})` : ''");
  });
});
