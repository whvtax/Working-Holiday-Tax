/**
 * 18 Nov 2026: the rule file for the customer's own language is added to the
 * prompt, and only that one. The generated module must match the docs.
 */
import { buildSystemPrompt } from '@/lib/will/playbook';
import { LANGUAGE_RULES } from '@/lib/will/language-rules.generated';
import * as fs from 'fs';
import * as path from 'path';

const base = { name: null, state: 'NEW_LEAD', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, decisionMode: 'will' } as const;
const LANGS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'ja', 'zh', 'vi'];

describe('language rules are loaded per customer', () => {
  it.each(LANGS)('%s: the prompt contains that language\'s rule file', (lang) => {
    const { stable } = buildSystemPrompt({ ...base, lang } as never);
    expect(stable).toContain(`# LANGUAGE RULES FOR THIS CUSTOMER`);
    expect(stable).toContain(LANGUAGE_RULES[lang].slice(0, 200));
  });

  it('a German customer does not get the Japanese rule file', () => {
    const { stable } = buildSystemPrompt({ ...base, lang: 'de' } as never);
    expect(stable).not.toContain(LANGUAGE_RULES.ja.slice(0, 200));
  });

  it('a customer with no language yet gets no language section', () => {
    const { stable } = buildSystemPrompt({ ...base, lang: null } as never);
    expect(stable).not.toContain('# LANGUAGE RULES FOR THIS CUSTOMER');
  });

  it('the generated module matches the rule files in docs', () => {
    const root = path.join(__dirname, '../../../..');
    for (const lang of LANGS) {
      const text = fs.readFileSync(path.join(root, 'docs/engineering/language-blocks', `${lang}.md`), 'utf8');
      expect(LANGUAGE_RULES[lang]).toBe(text);
    }
  });
});
