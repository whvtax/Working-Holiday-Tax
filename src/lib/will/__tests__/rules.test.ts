/**
 * The rules Will is held to.
 *
 * Two things are pinned here, and the second one is the whole safety argument
 * for letting a dashboard add rules at all:
 *
 *  1. THE CATALOGUE MATCHES THE GUARD. Every violation code policy-guard.ts can
 *     report has an entry in rules.ts explaining it in plain English. If someone
 *     adds a rule to the guard and not to the catalogue, the Rules tab silently
 *     stops being the truth and nobody finds out — so this test fails instead.
 *
 *  2. A CUSTOM RULE CAN ONLY EVER ADD A REFUSAL. No custom rule — malformed,
 *     empty, enormous, contradictory, or actively hostile — can make the guard
 *     allow something it would otherwise refuse. Adding rules can only make Will
 *     more cautious. This is what makes the worst case "drafts pile up in
 *     Tasks" rather than "something wrong reached a customer".
 */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';
import {
  BUILT_IN_RULES, RULE_BY_ID, ruleIdOf, explainViolation,
  parseCustomRules, brokenRules, CustomRule,
  MIN_PHRASE_LENGTH,
} from '@/lib/will/rules';

const rule = (over: Partial<CustomRule> = {}): CustomRule => ({
  id: 'r1', label: 'Never mention crypto', phrases: ['crypto', 'bitcoin'],
  enabled: true, createdAt: '2026-08-27T00:00:00.000Z', ...over,
});

const ctx = (over: Partial<GuardContext> = {}): GuardContext => ({
  state: 'PRICE_SENT', paid: false, aiPaused: false, killSwitch: false,
  optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
  isApprovedTemplate: false, estimateFromTeam: null, ...over,
});

// ───────────────────────────────────────────────────────────────────────────
describe('the catalogue describes every rule the guard can report', () => {
  // Every code that appears in a `violations.push(...)` in policy-guard.ts.
  // Kept as an explicit list rather than parsed out of the source: this is the
  // contract, and it should have to be edited on purpose.
  const EVERY_GUARD_CODE = [
    'KILL_SWITCH_ACTIVE', 'AI_PAUSED_FOR_CUSTOMER', 'CUSTOMER_OPTED_OUT',
    'LEGACY_CHAT_AI_DISABLED', 'OUTSIDE_24H_WINDOW_NEEDS_TEMPLATE',
    'PLACEHOLDER_LEFTOVER', 'PROMPT_ECHO', 'SENSITIVE_CONTENT',
    'EM_DASH_FORBIDDEN', 'NON_DOLLAR_CURRENCY', 'AI_IDENTITY_ANSWER',
    'CUSTOM_RULE', 'MYGOV_TROUBLESHOOTING', 'REPLY_TOO_LONG',
    'FORBIDDEN_AMOUNT', 'PRICE_NEGOTIATION', 'TAX_DETERMINATION',
    'DIY_INSTRUCTIONS', 'SALES_CONTENT_AFTER_PAYMENT', 'REFUND_OR_CANCEL_PROMISE',
  ];

  it.each(EVERY_GUARD_CODE)('explains %s', (code) => {
    const entry = RULE_BY_ID.get(code);
    expect(entry).toBeDefined();
    expect(entry!.name.length).toBeGreaterThan(0);
    expect(entry!.what.length).toBeGreaterThan(0);
    expect(entry!.example.length).toBeGreaterThan(0);
  });

  it('has no entry for a rule the guard cannot actually report', () => {
    for (const r of BUILT_IN_RULES) expect(EVERY_GUARD_CODE).toContain(r.id);
  });

  it('reads the value off a violation that carries one', () => {
    expect(ruleIdOf('FORBIDDEN_AMOUNT:50.00')).toBe('FORBIDDEN_AMOUNT');
    expect(ruleIdOf('CUSTOM_RULE:Never mention crypto')).toBe('CUSTOM_RULE');
    expect(explainViolation('FORBIDDEN_AMOUNT:50.00')?.group).toBe('money');
    expect(explainViolation('nonsense')).toBeNull();
  });
});

// ───────────────────────────────────────────────────────────────────────────
describe('a custom rule can only ever ADD a refusal', () => {
  // A message that passes every built-in rule. If a custom rule could ever
  // subtract, this is where it would show.
  const CLEAN = 'Hi Marco, thanks for that! I will get back to you shortly.';

  it('allows a clean message with no rules', () => {
    expect(policyGuard(CLEAN, ctx()).allowed).toBe(true);
  });

  const HOSTILE: [string, unknown][] = [
    ['undefined', undefined],
    ['an empty list', []],
    ['a rule with no phrases', [{ id: 'x', label: 'empty', phrases: [], enabled: true }]],
    ['a disabled rule matching the text', [rule({ phrases: ['thanks'], enabled: false })]],
    ['a rule whose phrases are all too short', [rule({ phrases: ['a', 'I'] })]],
    ['junk instead of a list', { nope: true }],
    ['a list of junk', [null, 5, 'string', { }]],
  ];

  it.each(HOSTILE)('still allows a clean message with %s', (_name, raw) => {
    const customRules = parseCustomRules(raw);
    expect(policyGuard(CLEAN, ctx({ customRules })).allowed).toBe(true);
  });

  const ALREADY_BLOCKED: [string, string][] = [
    ['an invented price', 'Our special rate for you is only $50.'],
    ['a tax determination', 'You can claim your boots and your phone bill.'],
    ['a myGov walkthrough', 'Go to my.gov.au and click Link a service.'],
    ['a dash', 'Sure — I will check.'],
    ['an identity answer', 'Haha, real person here!'],
  ];

  it.each(ALREADY_BLOCKED)('cannot un-block %s, whatever the custom rules say', (_name, text) => {
    const before = policyGuard(text, ctx());
    expect(before.allowed).toBe(false);
    // Every shape of custom rule, including ones naming the very violation.
    for (const raw of [
      [],
      [rule()],
      [rule({ label: 'FORBIDDEN_AMOUNT', phrases: ['allow everything'] })],
      [rule({ phrases: ['zzz'], enabled: false })],
    ]) {
      const after = policyGuard(text, ctx({ customRules: parseCustomRules(raw) }));
      expect(after.allowed).toBe(false);
      // Not just still blocked — blocked for at least the same reasons.
      for (const v of before.violations) expect(after.violations).toContain(v);
    }
  });

  it('refuses a message that breaks one of Jo’s rules, and names the rule', () => {
    const v = policyGuard('We also accept crypto if that is easier!', ctx({ customRules: [rule()] }));
    expect(v.allowed).toBe(false);
    expect(v.violations).toContain('CUSTOM_RULE:Never mention crypto');
  });

  it('checks the whole message, not sentence by sentence', () => {
    // A rule that could be defeated by moving the word into another sentence is
    // a rule Jo thinks he has and does not.
    const v = policyGuard('Happy to help with that. Some people ask about bitcoin.', ctx({ customRules: [rule()] }));
    expect(v.allowed).toBe(false);
  });

  it('applies to approved templates too', () => {
    // No corpus exemption: these are his words about his own messages, and a
    // banned phrase sitting inside a Library entry is exactly what he needs to
    // find out about.
    const v = policyGuard('We also take bitcoin.', ctx({ isApprovedTemplate: true, customRules: [rule()] }));
    expect(v.violations).toContain('CUSTOM_RULE:Never mention crypto');
  });
});

// ───────────────────────────────────────────────────────────────────────────
describe('phrase matching', () => {
  it('matches whole words, not fragments inside other words', () => {
    // Banning "fee" must not block "coffee" and "feel" — the rule would look
    // broken rather than broad.
    const r = [rule({ label: 'no fees', phrases: ['fee'] })];
    expect(brokenRules('Grab a coffee while you feel it over.', r)).toEqual([]);
    expect(brokenRules('There is no fee for that.', r)).toEqual(['no fees']);
  });

  it('is case-insensitive', () => {
    expect(brokenRules('BITCOIN accepted', [rule()])).toEqual(['Never mention crypto']);
  });

  it('matches a multi-word phrase as written', () => {
    const r = [rule({ label: 'no promises', phrases: ['guaranteed refund'] })];
    expect(brokenRules('You get a guaranteed refund.', r)).toEqual(['no promises']);
    expect(brokenRules('The refund is guaranteed by nothing.', r)).toEqual([]);
  });

  it('treats a phrase with regex characters as literal text', () => {
    // A phrase is text, never a pattern. Unescaped, "a+b" would match "aaab";
    // as literal text it matches only the three characters themselves.
    const r = [rule({ label: 'literal', phrases: ['a+b'] })];
    expect(brokenRules('aaab', r)).toEqual([]);
    expect(brokenRules('the a+b option', r)).toEqual(['literal']);
  });

  it('ignores a phrase shorter than the minimum', () => {
    const r = [rule({ label: 'too short', phrases: ['a'.repeat(MIN_PHRASE_LENGTH - 1)] })];
    expect(brokenRules('a aa aaa', r)).toEqual([]);
  });
});

// ───────────────────────────────────────────────────────────────────────────
describe('parseCustomRules is paranoid, because it runs on the send path', () => {
  it('never throws, whatever it is handed', () => {
    for (const raw of [null, undefined, 0, 'string', {}, [undefined], [[]], [{ id: 1 }]]) {
      expect(() => parseCustomRules(raw)).not.toThrow();
    }
  });

  it('drops a rule with no name or no id rather than inventing one', () => {
    expect(parseCustomRules([{ id: 'a', phrases: ['crypto'] }])).toEqual([]);
    expect(parseCustomRules([{ label: 'a name', phrases: ['crypto'] }])).toEqual([]);
  });

  it('drops a rule with no usable phrase, so nothing on screen pretends to protect', () => {
    expect(parseCustomRules([{ id: 'a', label: 'empty', phrases: [] }])).toEqual([]);
    expect(parseCustomRules([{ id: 'a', label: 'tiny', phrases: ['x'] }])).toEqual([]);
  });

  it('treats a missing enabled flag as on', () => {
    expect(parseCustomRules([{ id: 'a', label: 'l', phrases: ['crypto'] }])[0].enabled).toBe(true);
    expect(parseCustomRules([{ id: 'a', label: 'l', phrases: ['crypto'], enabled: false }])[0].enabled).toBe(false);
  });

  it('keeps the good rules when one in the middle is broken', () => {
    const parsed = parseCustomRules([
      { id: 'a', label: 'first', phrases: ['crypto'] },
      'garbage',
      { id: 'c', label: 'third', phrases: ['bitcoin'] },
    ]);
    expect(parsed.map((r) => r.label)).toEqual(['first', 'third']);
  });
});
