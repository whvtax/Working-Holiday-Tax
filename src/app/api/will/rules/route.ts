// The rules Will is held to: the built-in catalogue, and Jo's own.
//
// GET    → the whole catalogue plus his rules, so the tab renders in one call.
// POST   → add / edit / toggle / delete one of HIS rules. The built-ins are not
//          addressable here at all: there is no id, no field and no code path
//          through which this route can disable one. Turning off "never state a
//          price other than yours" is not a thing a dashboard should be able to
//          do, so it is not a thing this route can express.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import {
  BUILT_IN_RULES, CustomRule, brokenRules,
  MAX_CUSTOM_RULES, MAX_PHRASES_PER_RULE, MAX_PHRASE_LENGTH, MIN_PHRASE_LENGTH,
} from '@/lib/will/rules';
import { loadCustomRules, saveCustomRules } from '@/lib/will/rules-store';

export const dynamic = 'force-dynamic';

/** Which Library entries a rule would stop from sending.
 *
 *  Shown when a rule is added, because the alternative is finding out days
 *  later by noticing that follow-ups have quietly stopped going out. It is a
 *  warning and not a refusal: banning a phrase that is currently in a template
 *  is a perfectly reasonable thing to want — it just has to be a decision
 *  rather than a surprise. */
async function libraryConflicts(rule: CustomRule): Promise<string[]> {
  try {
    const templates = await getStore().listTemplates();
    return templates
      .filter((t) => t.body && brokenRules(t.body, [{ ...rule, enabled: true }]).length > 0)
      .map((t) => t.title);
  } catch {
    return [];
  }
}

export async function GET() {
  if (!sessionValid()) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  return NextResponse.json({
    ok: true,
    builtIn: BUILT_IN_RULES,
    custom: await loadCustomRules(),
    limits: { maxRules: MAX_CUSTOM_RULES, maxPhrases: MAX_PHRASES_PER_RULE, maxPhraseLength: MAX_PHRASE_LENGTH, minPhraseLength: MIN_PHRASE_LENGTH },
  });
}

const bad = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  if (!sessionValid()) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad('Malformed request.');
  }

  const action = typeof body.action === 'string' ? body.action : '';
  const store = getStore();
  const rules = await loadCustomRules();

  switch (action) {
    case 'add': {
      const label = typeof body.label === 'string' ? body.label.trim() : '';
      if (!label) return bad('Give the rule a name, so you know what it is when it fires.');
      if (rules.length >= MAX_CUSTOM_RULES) return bad(`You already have ${MAX_CUSTOM_RULES} rules, which is the limit.`);

      const phrases = parsePhrases(body.phrases);
      if (phrases.length === 0) {
        return bad(`Add at least one phrase of ${MIN_PHRASE_LENGTH} characters or more. Shorter than that matches inside ordinary words and would block almost everything.`);
      }

      const rule: CustomRule = {
        // Date.now + a random suffix: these are keys in a list of at most forty,
        // never anything's primary key, and they never leave this setting.
        id: `r${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
        label: label.slice(0, 80),
        phrases,
        enabled: true,
        createdAt: new Date().toISOString(),
      };

      const conflicts = await libraryConflicts(rule);
      await saveCustomRules([...rules, rule]);
      await store.audit('owner', 'rule_added', { id: rule.id, label: rule.label, phrases: rule.phrases.length, conflicts: conflicts.length })
        .catch(() => { /* the rule is saved; the audit is best-effort */ });

      // Saved either way — the conflicts ride along so the screen can say
      // "this also stops these three Library messages" straight away.
      return NextResponse.json({ ok: true, rule, conflicts });
    }

    case 'toggle': {
      const id = typeof body.id === 'string' ? body.id : '';
      const target = rules.find((r) => r.id === id);
      if (!target) return bad('That rule no longer exists.', 404);
      const next = rules.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r));
      await saveCustomRules(next);
      await store.audit('owner', target.enabled ? 'rule_disabled' : 'rule_enabled', { id, label: target.label }).catch(() => {});
      return NextResponse.json({ ok: true, rules: next });
    }

    case 'delete': {
      const id = typeof body.id === 'string' ? body.id : '';
      const target = rules.find((r) => r.id === id);
      if (!target) return bad('That rule no longer exists.', 404);
      const next = rules.filter((r) => r.id !== id);
      await saveCustomRules(next);
      await store.audit('owner', 'rule_deleted', { id, label: target.label, phrases: target.phrases }).catch(() => {});
      return NextResponse.json({ ok: true, rules: next });
    }

    default:
      return bad('Unknown action.');
  }
}

/** Accepts a list, or one line-separated string, and keeps only usable phrases. */
function parsePhrases(raw: unknown): string[] {
  const list = Array.isArray(raw)
    ? raw
    : typeof raw === 'string'
      ? raw.split('\n')
      : [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of list) {
    if (typeof item !== 'string') continue;
    const p = item.trim().slice(0, MAX_PHRASE_LENGTH);
    if (p.length < MIN_PHRASE_LENGTH) continue;
    const key = p.toLowerCase();
    if (seen.has(key)) continue; // the same phrase twice is one rule, not two
    seen.add(key);
    out.push(p);
    if (out.length >= MAX_PHRASES_PER_RULE) break;
  }
  return out;
}
