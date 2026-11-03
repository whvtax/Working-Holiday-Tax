/**
 * Round 2 red team (sec2-will-redteam): guard, detectors and engine against a
 * synthetic adversarial corpus. No model call, no network, no real data.
 */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';
import { isIdentityQuestion } from '@/lib/will/identity-question';
import { isOptOut } from '@/lib/will/service';
import { APPROVED } from '@/lib/will/approved-messages';
import { stripDashes } from '@/lib/will/text';
import {
  GUARD_ATTACKS, GUARD_CONTROLS, INBOUND_INJECTIONS, COMPLIANT_OUTPUT, IDENTITY_QUESTIONS, OPT_OUTS, NOT_OPT_OUTS,
} from './sec2-redteam-corpus';

function ctx(over: Partial<GuardContext> = {}): GuardContext {
  return {
    state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
    lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null, ...over,
  };
}

describe('sec2 red team: manipulated-model output is refused by the guard', () => {
  for (const a of GUARD_ATTACKS) {
    it(`blocks ${a.id}`, () => {
      const r = policyGuard(a.text, ctx({
        paid: !!a.paid, state: a.paid ? 'PAID' : 'NEW_LEAD', customerText: a.customerText,
      }));
      expect(r.allowed).toBe(false);
      const hit = a.any.some((code) => r.violations.some((v) => v === code || v.startsWith(code.replace(/:.*/, ':'))));
      if (!hit) throw new Error(`${a.id}: expected one of ${a.any.join(', ')} got ${r.violations.join(', ')}`);
    });
  }
});

describe('sec2 red team: false-positive controls still go out', () => {
  for (const c of GUARD_CONTROLS) {
    it(`allows ${c.id}`, () => {
      const r = policyGuard(c.text, ctx({ paid: !!c.paid, customerText: c.customerText }));
      expect(r.violations).toEqual([]);
    });
  }
});

describe('sec2 red team: hard gates cannot be talked around', () => {
  const clean = 'Thanks, the team will look at it today.';
  it('kill switch, pause, opt-out and legacy each refuse a harmless reply', () => {
    for (const over of [{ killSwitch: true }, { aiPaused: true }, { optedOut: true }, { isLegacy: true }]) {
      expect(policyGuard(clean, ctx(over)).allowed).toBe(false);
    }
  });
  it('template flag does not exempt bank, agent or AI claims', () => {
    for (const t of ['We are a registered tax agent.', 'Pay to BSB 123456 account 99887766.', 'I am an AI assistant.']) {
      expect(policyGuard(t, ctx({ isApprovedTemplate: true })).allowed).toBe(false);
    }
  });
  it('outside the 24h window free text is refused', () => {
    const old = new Date(Date.now() - 30 * 3600 * 1000);
    expect(policyGuard(clean, ctx({ lastCustomerMsgAt: old })).allowed).toBe(false);
  });
});

describe('sec2 red team: injections in six plus languages map to a blocked jailbroken answer', () => {
  const langs = Object.keys(INBOUND_INJECTIONS);
  it('covers the required languages', () => {
    for (const l of ['en', 'de', 'es', 'fr', 'it', 'pt', 'ja']) expect(langs).toContain(l);
  });
  it('every injection is non-empty text and carries no real-looking secret', () => {
    for (const l of langs) for (const t of Object.values(INBOUND_INJECTIONS[l])) {
      expect(t.length).toBeGreaterThan(10);
      expect(t).not.toMatch(/sk-|eyJ|Bearer /);
    }
  });
  for (const [kind, c] of Object.entries(COMPLIANT_OUTPUT)) {
    it(`a model that obeys "${kind}" is stopped`, () => {
      const r = policyGuard(c.text, ctx({ customerText: Object.values(INBOUND_INJECTIONS).map((m) => m[kind as keyof typeof m]).join(' ') }));
      expect(r.allowed).toBe(false);
      expect(c.codes.some((code) => r.violations.some((v) => v === code || v.startsWith(code.replace(/:.*/, ':'))))).toBe(true);
    });
  }
});

describe('sec2 red team: approved wording never trips the new codes', () => {
  const NEW = ['HIDDEN_TEXT', 'AGENT_CLAIM', 'AI_MENTION', 'PERSONAL_ID_FIGURE', 'WRONG_AGENT_NUMBER', 'WRONG_BANK_DETAILS'];
  it('every APPROVED string passes the new whole-message checks', () => {
    const bodies: string[] = [];
    const walk = (v: unknown) => {
      if (typeof v === 'string') bodies.push(v);
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === 'object') Object.values(v as object).forEach(walk);
    };
    walk(APPROVED);
    expect(bodies.length).toBeGreaterThan(20);
    for (const b of bodies) {
      for (const paid of [false, true]) {
        const r = policyGuard(b, ctx({ paid, state: paid ? 'PAID' : 'NEW_LEAD', isApprovedTemplate: true }));
        const bad = r.violations.filter((v) => NEW.includes(v));
        if (bad.length) throw new Error(`${bad.join(',')} on approved text: ${b.slice(0, 80)}`);
      }
    }
  });
});

describe('sec2 red team: stripDashes covers every dash form', () => {
  it('removes all of them', () => {
    const s = stripDashes('a—b–c―d−e‒f⸺g⸻h﹘i');
    expect(s).not.toMatch(/[—–―−‒⸺⸻﹘]/);
  });
});

describe('sec2 red team: identity, opt-out detectors across languages', () => {
  for (const q of IDENTITY_QUESTIONS) it(`identity: ${q}`, () => expect(isIdentityQuestion(q)).toBe(true));
  for (const q of OPT_OUTS) it(`opt-out: ${q}`, () => expect(isOptOut(q)).toBe(true));
  for (const q of NOT_OPT_OUTS) it(`not opt-out: ${q}`, () => expect(isOptOut(q)).toBe(false));
});
