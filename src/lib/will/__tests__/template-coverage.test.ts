/**
 * LIBRARY COVERAGE (Jo, 26 Aug — marked super important).
 *
 * "Any message body Will can put in front of a customer must be visible and
 * editable in the Library view."
 *
 * The Library is `will_templates`, seeded from seedTemplates(). Before this,
 * several sendable bodies existed only in code and so could never be seen or
 * edited there:
 *
 *   - the estimate + invoice message, typed inline in /api/will/actions
 *   - the lodged confirmation, likewise (with its Google review link)
 *   - the "questionnaire received" confirmation, in all seven languages
 *   - the replies proposed on a handoff task, which "Send Reply" transmits
 *     verbatim in one click
 *
 * This test is the audit, kept running: every approved body and every language
 * of the form confirmation must appear as a seeded template, byte for byte. If
 * someone adds a new sendable message and forgets the Library, this fails.
 */
import { seedTemplates, backfillMissingTemplates } from '@/lib/will/seed';
import { APPROVED } from '@/lib/will/approved-messages';
import { FORM_RECEIVED_MSG, formReceivedTemplateKey, REVIEW_REQUEST_MSG, reviewRequestTemplateKey, Lang } from '@/lib/will/i18n';
import { policyGuard } from '@/lib/will/policy-guard';
import type { TemplateRow } from '@/lib/will/store';

const templates = seedTemplates();
const bodies = new Set(templates.map((t) => t.body));
const keys = new Set(templates.map((t) => t.key));

/** Every string a customer could receive, flattened out of APPROVED. */
function approvedBodies(): [string, string][] {
  const out: [string, string][] = [];
  const walk = (prefix: string, node: unknown) => {
    if (typeof node === 'string') { out.push([prefix, node]); return; }
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) walk(prefix ? `${prefix}.${k}` : k, v);
    }
  };
  walk('', APPROVED);
  return out;
}

describe('every sendable message is in the Message Library', () => {
  it.each(approvedBodies())('APPROVED.%s is seeded verbatim', (_name, body) => {
    expect(bodies.has(body)).toBe(true);
  });

  it.each(Object.keys(FORM_RECEIVED_MSG) as Lang[])(
    'the questionnaire confirmation is seeded for %s',
    (lang) => {
      const key = formReceivedTemplateKey(lang);
      const row = templates.find((t) => t.key === key);
      expect(row).toBeDefined();
      expect(row!.body).toBe(FORM_RECEIVED_MSG[lang]);
    },
  );

  it.each(Object.keys(REVIEW_REQUEST_MSG) as Lang[])(
    'the Google review request is seeded for %s',
    (lang) => {
      const row = templates.find((t) => t.key === reviewRequestTemplateKey(lang));
      expect(row).toBeDefined();
      expect(row!.body).toBe(REVIEW_REQUEST_MSG[lang]);
      // The split (Jo, 31 Aug): no full stop before the praying-hands emoji.
      expect(row!.body).not.toMatch(/\.\s*🙏/);
    },
  );

  it('exposes the keys the send paths look messages up by', () => {
    // If one of these is renamed without renaming it in the send path, the code
    // silently falls back to the hardcoded constant and an edit made in the
    // Library stops taking effect — which is the failure this rule exists to
    // prevent, so the keys are pinned here.
    for (const key of [
      'estimate_invoice', 'lodged_confirmation',
      'handoff_holding', 'handoff_attachment', 'handoff_unreadable',
      'handoff_returning_customer', 'handoff_many_questions',
      'form_received_en',
    ]) {
      expect(keys.has(key)).toBe(true);
    }
  });

  it('keeps the placeholders of an interpolated message intact', () => {
    const estimate = templates.find((t) => t.key === 'estimate_invoice')!;
    expect(estimate.body).toContain('{{OUTCOME_AMOUNT}}');
    expect(estimate.body).toContain('{{LODGEMENT_FEE}}');
    // The follow-ups are personalised with the customer's first name as {{1}},
    // which is the parameter name Meta uses for an approved template.
    for (const key of ['fu_pre_24h', 'fu_form_6h', 'fu_sig_24h']) {
      expect(templates.find((t) => t.key === key)!.body).toContain('{{1}}');
    }
  });

  it('gives every entry a unique key', () => {
    expect(keys.size).toBe(templates.length);
  });

  // "Visible AND editable". Every Library entry has to survive the save-time
  // guard in /api/will/actions, or it is a message you can read and never
  // change. The four placeholder-bearing entries used to fail this, so an edit
  // to the estimate or the missing-document message was rejected on save.
  it('can be saved back from the Library after an edit', () => {
    const saveTimeCtx = {
      state: 'PRICE_SENT' as const, paid: false, aiPaused: false, killSwitch: false,
      optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
      isApprovedTemplate: false, estimateFromTeam: null,
    };
    const rejected = templates
      .map((t) => ({
        key: t.key,
        // Mirrors saveTimeViolations() in the actions route: the two checks that
        // only mean something once a message is addressed to a real customer.
        violations: policyGuard(t.body, saveTimeCtx).violations
          .filter((v) => !v.startsWith('OUTSIDE_24H') && v !== 'PLACEHOLDER_LEFTOVER'),
      }))
      .filter((x) => x.violations.length)
      .map((x) => `${x.key}: ${x.violations.join(',')}`);
    expect(rejected).toEqual([]);
  });

  it('still refuses an unfilled placeholder at SEND time', () => {
    // The relaxation above is save-time only. A raw {{AMOUNT}} reaching a
    // customer is still a violation, which is the rule that matters.
    const sendCtx = {
      state: 'UNDER_REVIEW' as const, paid: true, aiPaused: false, killSwitch: false,
      optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
      isApprovedTemplate: false, estimateFromTeam: 300000,
    };
    const estimate = templates.find((t) => t.key === 'estimate_invoice')!;
    expect(policyGuard(estimate.body, sendCtx).violations).toContain('PLACEHOLDER_LEFTOVER');
  });
});

// ------------------------------------------------------------------
// The backfill. The Library is only seeded when the table is EMPTY, so a
// message added to the seed after the first deploy would never reach a live
// install — the exact way "every sendable message is in the Library" would
// have quietly stayed false in production while passing the tests above.
// ------------------------------------------------------------------
function fakeStore(existing: Partial<TemplateRow>[]) {
  const rows = existing.map((t) => ({ key: 'k', category: 'c', title: 't', body: 'b', ...t } as TemplateRow));
  const settings = new Map<string, unknown>();
  return {
    rows,
    listTemplates: async () => rows,
    addTemplate: async (t: { category: string; title: string; body: string; key?: string }) => {
      const row = { id: t.key ?? 'id', key: t.key ?? 'custom', category: t.category, title: t.title, body: t.body, requiresMeta: false, versions: 1, updatedAt: '' } as TemplateRow;
      rows.push(row);
      return row;
    },
    getSetting: async (k: string) => settings.get(k),
    setSetting: async (k: string, v: unknown) => { settings.set(k, v); },
  };
}

describe('backfillMissingTemplates', () => {
  it('adds only the entries an older install is missing', async () => {
    // An install seeded before the new messages existed.
    const store = fakeStore(seedTemplates()
      .filter((t) => !t.key.startsWith('handoff_') && !t.key.startsWith('form_received_') && t.key !== 'estimate_invoice' && t.key !== 'lodged_confirmation')
      .map((t) => ({ ...t })));
    const before = store.rows.length;
    const added = await backfillMissingTemplates(store);

    expect(added).toContain('estimate_invoice');
    expect(added).toContain('handoff_holding');
    expect(added).toContain('form_received_ja');
    expect(store.rows.length).toBe(before + added.length);
    // Every seeded key is present afterwards.
    const now = new Set(store.rows.map((t) => t.key));
    for (const t of seedTemplates()) expect(now.has(t.key)).toBe(true);
  });

  it('is a no-op on a Library that already has everything', async () => {
    const store = fakeStore(seedTemplates().map((t) => ({ ...t })));
    expect(await backfillMissingTemplates(store)).toEqual([]);
  });

  it('does not resurrect a template the owner deleted', async () => {
    const store = fakeStore(seedTemplates().map((t) => ({ ...t })));
    await backfillMissingTemplates(store);          // records the version
    store.rows.splice(store.rows.findIndex((t) => t.key === 'medicare'), 1); // owner deletes one
    expect(await backfillMissingTemplates(store)).toEqual([]);
    expect(store.rows.some((t) => t.key === 'medicare')).toBe(false);
  });

  it('leaves a fresh, empty Library to the normal seed path', async () => {
    const store = fakeStore([]);
    expect(await backfillMissingTemplates(store)).toEqual([]);
    expect(store.rows.length).toBe(0);
  });
});
