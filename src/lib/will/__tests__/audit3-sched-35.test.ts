/**
 * audit3-sched-35: the automatic Medicare exemption message goes out in the
 * customer's language.
 *
 * MEDICARE_INFO used to read only the Library row `medicare` and send it as
 * template `medicare` to everyone, so 15 minutes after a German or Japanese
 * customer was thanked for their questionnaire in their own language they got
 * three English paragraphs asking them to go and apply. Same treatment as
 * req_abn: MEDICARE_MSG per language, medicareTemplateKey(lang) naming the
 * Library row and the Meta template, six seeded rows, the backfill version
 * bumped so a live install actually receives them. English is untouched:
 * still the `medicare` key, still APPROVED.medicare_exemption verbatim.
 */
import { readFileSync } from 'fs';
import { join } from 'path';
import { MEDICARE_MSG, medicareMessage, medicareTemplateKey, LANGS, Lang } from '@/lib/will/i18n';
import { APPROVED } from '@/lib/will/approved-messages';
import { seedTemplates, backfillMissingTemplates, TEMPLATE_BACKFILL_VERSION } from '@/lib/will/seed';
import { policyGuard } from '@/lib/will/policy-guard';
import { EXPECTED_META_TEMPLATES } from '@/lib/will/channel';
import type { TemplateRow } from '@/lib/will/store';

describe('the wording per language', () => {
  it('English is Jo\'s approved wording, verbatim, under the key he already knows', () => {
    expect(MEDICARE_MSG.en).toBe(APPROVED.medicare_exemption);
    expect(medicareTemplateKey('en')).toBe('medicare');
    expect(medicareTemplateKey(null)).toBe('medicare');
    expect(medicareTemplateKey(undefined)).toBe('medicare');
    expect(medicareTemplateKey('xx')).toBe('medicare');
    expect(medicareMessage(null)).toBe(APPROVED.medicare_exemption);
  });

  it.each(LANGS.filter((l) => l !== 'en'))('%s has its own key and its own text', (lang) => {
    expect(medicareTemplateKey(lang)).toBe(`medicare_${lang}`);
    expect(medicareMessage(lang)).toBe(MEDICARE_MSG[lang]);
    expect(MEDICARE_MSG[lang]).not.toBe(MEDICARE_MSG.en);
    // Same three paragraphs, same names: the thing to apply for and who decides.
    expect(MEDICARE_MSG[lang].split('\n\n')).toHaveLength(3);
    expect(MEDICARE_MSG[lang]).toContain('Medicare Levy Exemption');
    expect(MEDICARE_MSG[lang]).toContain('Services Australia');
  });

  it.each(LANGS)('%s has no dashes and passes the Policy Guard as the scheduler sends it', (lang) => {
    const body = MEDICARE_MSG[lang];
    expect(body).not.toMatch(/[—–―−]/);
    const verdict = policyGuard(body, {
      state: 'FORM_COMPLETE', paid: true, aiPaused: false, killSwitch: false,
      optedOut: false, isLegacy: false,
      lastCustomerMsgAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // a web form, days later
      isApprovedTemplate: true, estimateFromTeam: null,
    });
    expect(verdict.violations).toEqual([]);
    expect(verdict.allowed).toBe(true);
  });
});

describe('the Library', () => {
  const rows = seedTemplates();

  it.each(LANGS)('seeds the %s row with the code copy, byte for byte', (lang) => {
    const row = rows.find((t) => t.key === medicareTemplateKey(lang));
    expect(row).toBeDefined();
    expect(row!.body).toBe(MEDICARE_MSG[lang]);
    expect(row!.category).toBe('Post-payment & Service');
  });

  it('the backfill version was bumped so a live install receives the six new rows', () => {
    expect(TEMPLATE_BACKFILL_VERSION).not.toBe('2026-09-04-abn-and-holding-languages');
  });

  it('backfills medicare_<lang> into an install that already has `medicare`', async () => {
    const existing: TemplateRow[] = rows
      .filter((t) => !t.key.startsWith('medicare_'))
      .map((t, i) => ({ id: `t${i}`, key: t.key, category: t.category, title: t.title, body: t.body, updatedAt: '' } as unknown as TemplateRow));
    const settings = new Map<string, unknown>();
    const store = {
      listTemplates: jest.fn(async () => existing),
      addTemplate: jest.fn(async (t: { key: string; category: string; title: string; body: string }) => {
        existing.push({ id: `n${existing.length}`, ...t, updatedAt: '' } as unknown as TemplateRow);
        return existing[existing.length - 1];
      }),
      getSetting: jest.fn(async (k: string) => settings.get(k)),
      setSetting: jest.fn(async (k: string, v: unknown) => { settings.set(k, v); }),
    };
    const added = await backfillMissingTemplates(store as never);
    for (const lang of LANGS.filter((l) => l !== 'en') as Lang[]) expect(added).toContain(`medicare_${lang}`);
    expect(added).not.toContain('medicare');
    expect(settings.get('templates_backfill')).toBe(TEMPLATE_BACKFILL_VERSION);
  });
});

describe('the health panel knows the new template names', () => {
  it.each(LANGS)('lists %s as optional (text fallback inside the window)', (lang) => {
    const t = EXPECTED_META_TEMPLATES.find((x) => x.name === medicareTemplateKey(lang));
    expect(t).toEqual({ name: medicareTemplateKey(lang), params: 0, optional: true });
  });
});

describe('the scheduler handler', () => {
  const scheduler = readFileSync(join(process.cwd(), 'src/lib/will/scheduler.ts'), 'utf8');
  const start = scheduler.indexOf("if (job.kind === 'MEDICARE_INFO')");
  const end = scheduler.indexOf("if (job.kind === 'REVIEW_REQUEST')", start);
  const handler = scheduler.slice(start, end);

  it('looks the Library row up by the customer language and falls back to the same-language code copy', () => {
    expect(start).toBeGreaterThan(-1);
    expect(handler).toMatch(/const medicareKey = medicareTemplateKey\(customer\.lang\)/);
    expect(handler).toMatch(/x\.key === medicareKey/);
    expect(handler).toMatch(/medicareKey === 'medicare' \? APPROVED\.medicare_exemption : medicareMessage\(customer\.lang\)/);
    expect(handler).not.toMatch(/x\.key === 'medicare'/);
  });

  it('sends it as the template of that name, text fallback on', () => {
    expect(handler).toMatch(/name: medicareKey, params: \[\], lang: customer\.lang, fallbackToText: true/);
    expect(handler).not.toMatch(/name: 'medicare'/);
  });

  it('the two human tasks name the language key so Jo knows which row / Meta template to look at', () => {
    expect(handler).toMatch(/Check the Library entry "\$\{medicareKey\}" and send it by hand/);
    expect(handler).toMatch(/create "\$\{medicareKey\}" in WhatsApp Manager \(no variables\)/);
  });
});
