/**
 * Policy Guard — the deterministic safety layer that sits between Will's AI
 * output and anything a customer receives. These tests pin the boundaries the
 * business cannot afford to get wrong: myGov troubleshooting, currency, made-up
 * prices, negotiation, refund promises and post-payment sales talk.
 *
 * If any of these ever go red, an off-policy message could reach a real
 * customer, so they are meant to be strict.
 */
import { policyGuard, GuardContext, isConfidentlyEnglish } from '@/lib/will/policy-guard';
import { APPROVED } from '@/lib/will/approved-messages';
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';

// A clean, sendable context: not paused, inside the 24h window, unpaid NEW_LEAD.
// Individual tests override just the field they exercise.
function ctx(over: Partial<GuardContext> = {}): GuardContext {
  return {
    state: 'NEW_LEAD',
    paid: false,
    aiPaused: false,
    killSwitch: false,
    optedOut: false,
    isLegacy: false,
    lastCustomerMsgAt: new Date(), // inside 24h window
    isApprovedTemplate: false,
    estimateFromTeam: null,
    ...over,
  };
}

const has = (text: string, code: string, over?: Partial<GuardContext>) =>
  policyGuard(text, ctx(over)).violations.includes(code);

describe('sanity: a clean on-policy message passes', () => {
  it('allows a plain friendly reply with no numbers', () => {
    const r = policyGuard('Hey! Happy to help you get your tax sorted. Just fill out the quick form and I will take a look.', ctx());
    expect(r.allowed).toBe(true);
    expect(r.violations).toEqual([]);
  });
});

describe('myGov / ATO access — the biggest problem', () => {
  it('blocks step-by-step myGov login help', () => {
    expect(has('Go to myGov, log in and click Link the ATO to your account.', 'MYGOV_TROUBLESHOOTING')).toBe(true);
  });

  it('blocks instructions to create a myGovID / Digital ID', () => {
    expect(has('You need to create a myGovID and verify your identity before you can link the ATO.', 'MYGOV_TROUBLESHOOTING')).toBe(true);
  });

  it('blocks IHI / Medicare Entitlement Statement application steps', () => {
    expect(has('Apply for an IHI first, then submit the Medicare Entitlement Statement in myGov.', 'MYGOV_TROUBLESHOOTING')).toBe(true);
  });

  it('blocks "reset your password / try logging in again" style help', () => {
    expect(has('Try logging in again, and if that fails reset your password on the ATO portal.', 'MYGOV_TROUBLESHOOTING')).toBe(true);
  });

  it('ALLOWS the approved reassurance that they do not need myGov', () => {
    // Phrased as it actually ships in the knowledge base: the "we access
    // everything" clause and the "your refund is deposited" clause are separate
    // sentences, so neither trips the refund-promise or determination guards.
    const r = policyGuard(
      "You don't need access to your myGov or ATO account at all. Once you are our client we access everything we need through the ATO and lodge your return for you. When it is approved, your refund is simply deposited straight into your bank account.",
      ctx(),
    );
    expect(r.violations).not.toContain('MYGOV_TROUBLESHOOTING');
    expect(r.allowed).toBe(true);
  });

  it('ALLOWS the post-lodge reassurance about myGov not updating yet', () => {
    const r = policyGuard(
      'We lodge through our own registered agent systems, not through your personal myGov, so it can take a couple of days to update on your side. If it has not updated after 48 hours, let me know and I will check it.',
      ctx({ paid: true, state: 'LODGED' }),
    );
    expect(r.violations).not.toContain('MYGOV_TROUBLESHOOTING');
  });

  it('ALLOWS "leave the myGov side to us"', () => {
    const r = policyGuard('You can leave all the myGov and ATO side of things to us.', ctx());
    expect(r.violations).not.toContain('MYGOV_TROUBLESHOOTING');
  });
});

describe('currency — prices are AUD with the $ sign only', () => {
  it('blocks a euro conversion even when the number is an allowed price', () => {
    expect(has('The fee is 220 euros.', 'NON_DOLLAR_CURRENCY')).toBe(true);
  });
  it('blocks a euro symbol amount', () => {
    expect(has('It costs €220.', 'NON_DOLLAR_CURRENCY')).toBe(true);
  });
  it('blocks pounds and yen', () => {
    expect(has('About £120 or ¥30000.', 'NON_DOLLAR_CURRENCY')).toBe(true);
  });
  it('allows the correct $ price', () => {
    expect(has('Our fee is $220 for a TFN return.', 'NON_DOLLAR_CURRENCY')).toBe(false);
  });
});

describe('prices — never invent or change a fee', () => {
  it('allows the two fixed prices', () => {
    const r = policyGuard('It is $220 for a TFN return, or $385 if you also have ABN income.', ctx());
    expect(r.allowed).toBe(true);
  });
  it('blocks a made-up amount before payment', () => {
    expect(policyGuard('The fee is $500.', ctx()).violations.some((v) => v.startsWith('FORBIDDEN_AMOUNT'))).toBe(true);
  });
  it('allows a team-provided estimate figure', () => {
    const r = policyGuard('Your estimated refund from our review is $1,460.', ctx({ estimateFromTeam: 146000 }));
    expect(r.violations.some((v) => v.startsWith('FORBIDDEN_AMOUNT'))).toBe(false);
  });
  it('blocks an estimate figure the team never provided', () => {
    expect(policyGuard('Your refund is $1,460.', ctx()).violations.some((v) => v.startsWith('FORBIDDEN_AMOUNT'))).toBe(true);
  });
});

describe('no negotiation, no invented promises', () => {
  it('blocks offering a discount', () => {
    expect(has('I can give you a special price just for you, $150.', 'PRICE_NEGOTIATION')).toBe(true);
  });
  it('blocks promising to refund a payment (not the approved "refund the difference")', () => {
    expect(has('No problem, we will refund your payment right away.', 'REFUND_OR_CANCEL_PROMISE')).toBe(true);
  });
});

describe('tax determination is never made before payment', () => {
  it('blocks declaring residency', () => {
    expect(has('Based on this you are an Australian resident for tax purposes.', 'TAX_DETERMINATION_BEFORE_PAYMENT')).toBe(true);
  });
  it('blocks stating a refund outcome', () => {
    expect(has('Your refund will be around a thousand dollars.', 'TAX_DETERMINATION_BEFORE_PAYMENT')).toBe(true);
  });
  it('WILL-AI-01: blocks a foreign/temporary residency determination', () => {
    expect(has('Based on your dates you are a foreign resident for tax purposes.', 'TAX_DETERMINATION_BEFORE_PAYMENT')).toBe(true);
    expect(has("You're a temporary resident, so different rates apply.", 'TAX_DETERMINATION_BEFORE_PAYMENT')).toBe(true);
  });
  it('WILL-AI-01: blocks a bare-number refund estimate (no $ sign)', () => {
    expect(has('Your refund should come to about 1450 give or take.', 'TAX_DETERMINATION_BEFORE_PAYMENT')).toBe(true);
    expect(has("You'll get back roughly 2300 this year.", 'TAX_DETERMINATION_BEFORE_PAYMENT')).toBe(true);
  });
  it('WILL-AI-01: still allows the plain $220/$385 price (not a refund estimate)', () => {
    expect(has('Our fee is $220 for a TFN return, or $385 with ABN.', 'TAX_DETERMINATION_BEFORE_PAYMENT')).toBe(false);
  });
  it('WILL-AI-01: allows a neutral MENTION of residency concept', () => {
    expect(has('There is a short explanation of who is considered an Australian resident for tax purposes.', 'TAX_DETERMINATION_BEFORE_PAYMENT')).toBe(false);
  });
});

describe('post-payment: sales talk is shut off', () => {
  it('blocks fee / guarantee talk once the customer has paid', () => {
    expect(has('Remember our fee is $220 and we refund the difference if your refund is lower.', 'SALES_CONTENT_AFTER_PAYMENT', { paid: true, state: 'PAID' })).toBe(true);
  });
});

describe('leaks, echoes and formatting', () => {
  it('blocks a leftover placeholder', () => {
    expect(has('Please transfer to {{BANK_DETAILS}}.', 'PLACEHOLDER_LEFTOVER')).toBe(true);
  });
  it('blocks echoing the system prompt', () => {
    expect(has('According to my master rule I must hand off.', 'PROMPT_ECHO')).toBe(true);
  });
  it('blocks leaking sensitive terms', () => {
    expect(has('Here is the admin panel password.', 'SENSITIVE_CONTENT')).toBe(true);
  });
  it('blocks an em dash', () => {
    expect(has('Sure — I can help.', 'EM_DASH_FORBIDDEN')).toBe(true);
  });
});

describe('multilingual safety — the guard does not only work in English', () => {
  it('blocks a non-dollar currency written in German', () => {
    expect(has('Die Gebühr beträgt 220 Euro.', 'NON_DOLLAR_CURRENCY')).toBe(true);
  });
  it('blocks a non-dollar currency written in Spanish', () => {
    expect(has('El precio es 385 euros.', 'NON_DOLLAR_CURRENCY')).toBe(true);
  });
  it('still allows the $ price inside a non-English sentence', () => {
    expect(has('Die Gebühr beträgt $220.', 'NON_DOLLAR_CURRENCY')).toBe(false);
  });
  it('flags a non-approved non-English reply for human review (Autopilot safety net)', () => {
    const r = policyGuard('Gerne helfe ich dir mit deiner Steuererklärung, kein Problem.', ctx());
    expect(r.unguardedLanguage).toBe(true);
  });
  it('does not flag a short emoji/ok reply as unguarded', () => {
    const r = policyGuard('ok 👍', ctx());
    expect(r.unguardedLanguage).toBeFalsy();
  });
  it('blocks an amount with a currency word in a non-English sentence', () => {
    expect(policyGuard('Ich schicke dir 500 dollars zurück.', ctx()).violations.some((v) => v.startsWith('FORBIDDEN_AMOUNT') || v === 'NON_DOLLAR_CURRENCY')).toBe(true);
  });
});

describe('AI-01: language net is fail-closed (not a European allow-list)', () => {
  it('accepts confidently English text', () => {
    expect(isConfidentlyEnglish('Hey! Happy to help with your tax refund, just fill out the form.')).toBe(true);
  });
  it('rejects an UNLISTED Latin-script language (Indonesian) — the old bypass', () => {
    // Indonesian was not in the old allow-list, so it used to slip through as "English".
    expect(isConfidentlyEnglish('Anda adalah penduduk pajak Australia untuk tujuan pajak.')).toBe(false);
  });
  it('rejects Dutch / Tagalog style unlisted languages', () => {
    expect(isConfidentlyEnglish('U bent fiscaal inwoner van Australië voor belastingdoeleinden.')).toBe(false);
  });
  it('treats very short / numeric / emoji replies as safe', () => {
    expect(isConfidentlyEnglish('ok 👍')).toBe(true);
    expect(isConfidentlyEnglish('$220')).toBe(true);
  });
  it('flags a non-English reply for human review via the guard (Autopilot safety net)', () => {
    const r = policyGuard('Anda penduduk pajak Australia, jadi Anda memenuhi syarat.', ctx());
    expect(r.unguardedLanguage).toBe(true);
  });
  it('does NOT flag a normal English reply as unguarded', () => {
    const r = policyGuard('Sure, I can help you with that. Just send me your bank statement.', ctx());
    expect(r.unguardedLanguage).toBeFalsy();
  });
});

describe('hard gates block sending entirely', () => {
  it('kill switch stops everything', () => {
    expect(policyGuard('hi', ctx({ killSwitch: true })).allowed).toBe(false);
  });
  it('legacy chats never get an AI reply', () => {
    expect(has('hi', 'LEGACY_CHAT_AI_DISABLED', { isLegacy: true })).toBe(true);
  });
  it('opted-out customers are not messaged', () => {
    expect(has('hi', 'CUSTOMER_OPTED_OUT', { optedOut: true })).toBe(true);
  });
});

describe('approved corpus stays sendable', () => {
  it('the approved legitimacy message passes cleanly', () => {
    const r = policyGuard(APPROVED.legitimacy, ctx());
    // Approved sentences are exempt from content-pattern checks; the only thing
    // that could fire is a hard gate, which is not set here.
    expect(r.allowed).toBe(true);
  });
});

describe('the mined knowledge pack is safe to send (content-level)', () => {
  // Every curated answer must pass the guard as free-form (non-approved) text
  // in a neutral pre-payment context. This proves Will can send these verbatim
  // without the guard blocking a good answer. Sales content is fine here because
  // the context is unpaid; we only assert on the CONTENT violations.
  const CONTENT_CODES = [
    'MYGOV_TROUBLESHOOTING', 'NON_DOLLAR_CURRENCY', 'PRICE_NEGOTIATION',
    'REFUND_OR_CANCEL_PROMISE', 'TAX_DETERMINATION_BEFORE_PAYMENT',
    'DIY_INSTRUCTIONS', 'PLACEHOLDER_LEFTOVER', 'PROMPT_ECHO',
    'SENSITIVE_CONTENT', 'EM_DASH_FORBIDDEN',
  ];
  for (const entry of KNOWLEDGE_SEED) {
    it(`"${entry.intent}" answer is guard-clean`, () => {
      const v = policyGuard(entry.answer, ctx()).violations;
      const bad = v.filter((x) => CONTENT_CODES.includes(x) || x.startsWith('FORBIDDEN_AMOUNT'));
      expect(bad).toEqual([]);
    });
  }
});

/**
 * REPLY_TOO_LONG — the owner's most frequent complaint is that Will writes
 * essays. On WhatsApp a real team member sends a couple of short lines, so the
 * guard caps how much of the model's OWN prose can go out in one message.
 *
 * The important half of this suite is that the approved messages still pass:
 * the price message legitimately carries the fee, the guarantee and the bank
 * details, and it must never be flagged just for being long.
 */
describe('REPLY_TOO_LONG: replies must read like a person texting', () => {
  it('allows a short, warm reply', () => {
    expect(has('Hey Sarah! Yes we can help with that. Want me to send the details?', 'REPLY_TOO_LONG')).toBe(false);
  });

  it('allows a normal multi-sentence answer', () => {
    const reply = 'Hi Tom! Good question. Most refunds land within two to three weeks once we lodge, '
      + 'and we handle everything with the ATO for you. Shall I send you the form?';
    expect(has(reply, 'REPLY_TOO_LONG')).toBe(false);
  });

  it('flags a rambling improvised essay', () => {
    const essay = 'I completely understand where you are coming from and I want to reassure you that '
      + 'we are here to help you every step of the way. Many backpackers feel exactly the same way when '
      + 'they first get in touch with us, so please know that your question is very common and very '
      + 'reasonable. What we usually do is take a careful look at your situation, go through everything '
      + 'in detail, and then come back to you with a clear picture of where you stand. Please feel free '
      + 'to let me know if you have any other questions at all, I am always happy to help.';
    expect(has(essay, 'REPLY_TOO_LONG')).toBe(true);
  });

  it('does NOT flag the approved price messages, which are long for a reason', () => {
    expect(has(APPROVED.price_tfn, 'REPLY_TOO_LONG')).toBe(false);
    expect(has(APPROVED.price_tfn_abn, 'REPLY_TOO_LONG')).toBe(false);
  });

  it('does NOT flag any approved objection response', () => {
    for (const [key, body] of Object.entries(APPROVED.objections)) {
      expect([key, has(body as string, 'REPLY_TOO_LONG')]).toEqual([key, false]);
    }
  });

  it('does not fire when the message is an explicitly approved template', () => {
    const essay = 'x'.repeat(2000);
    expect(has(essay, 'REPLY_TOO_LONG', { isApprovedTemplate: true })).toBe(false);
  });
});
