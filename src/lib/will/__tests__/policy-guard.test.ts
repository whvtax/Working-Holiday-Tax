/**
 * Policy Guard — the deterministic safety layer that sits between Will's AI
 * output and anything a customer receives. These tests pin the boundaries the
 * business cannot afford to get wrong: myGov troubleshooting, currency, made-up
 * prices, negotiation, refund promises and post-payment sales talk.
 *
 * If any of these ever go red, an off-policy message could reach a real
 * customer, so they are meant to be strict.
 */
import { policyGuard, GuardContext, isConfidentlyEnglish, registerLibraryBodies } from '@/lib/will/policy-guard';
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

  // The owner-approved benign device hint (Jo, 31 Aug). Allowed, and proven
  // NOT to leak: it must exempt ONLY "try (again) on a computer/laptop", never a
  // real portal instruction sitting near a Services Australia term.
  it('ALLOWS the benign "try again on a computer" device hint next to a Services Australia term', () => {
    const r = policyGuard(
      'Your IHI and Medicare Entitlement Statement are handled directly by Services Australia, so unfortunately we can’t help with that part. Please try again on a computer, as that usually works.',
      ctx(),
    );
    expect(r.violations).not.toContain('MYGOV_TROUBLESHOOTING');
  });
  it('still allows other benign device phrasings', () => {
    expect(policyGuard('If the IHI page will not load, try on a laptop instead.', ctx()).violations).not.toContain('MYGOV_TROUBLESHOOTING');
    expect(policyGuard('For the Medicare Entitlement Statement, try again using a different device.', ctx()).violations).not.toContain('MYGOV_TROUBLESHOOTING');
  });
  it('NO LEAK: a real login/link instruction is still blocked even with "on a computer"', () => {
    expect(has('Log in to your myGov on a computer and click Link the ATO.', 'MYGOV_TROUBLESHOOTING')).toBe(true);
    expect(has('Go to my.gov.au on a computer and submit the Medicare Entitlement Statement.', 'MYGOV_TROUBLESHOOTING')).toBe(true);
    expect(has('Try logging in again on a computer to your ATO account.', 'MYGOV_TROUBLESHOOTING')).toBe(true);
    expect(has('Create a myGovID on a computer, then verify your identity.', 'MYGOV_TROUBLESHOOTING')).toBe(true);
    expect(has('Apply for an IHI on a computer through Services Australia.', 'MYGOV_TROUBLESHOOTING')).toBe(true);
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
  // The two over-promises that broke the Indigo conversation (a customer who
  // owed was told they would get the fee back). Both must be blocked now.
  it('blocks "refund the full $220" (the owing over-promise)', () => {
    expect(has('If you decide not to lodge, we refund the full $220.', 'REFUND_OR_CANCEL_PROMISE')).toBe(true);
    expect(has('We would refund the full amount if you owe.', 'REFUND_OR_CANCEL_PROMISE')).toBe(true);
  });
  it('blocks "never out of pocket" / "not out of pocket"', () => {
    expect(has("So you're never out of pocket.", 'REFUND_OR_CANCEL_PROMISE')).toBe(true);
    expect(has('That way you are not out of pocket for our service.', 'REFUND_OR_CANCEL_PROMISE')).toBe(true);
  });
  it('still allows the real guarantee "refund the difference"', () => {
    expect(has('If you get a refund and it is less than the fee, we refund you the difference.', 'REFUND_OR_CANCEL_PROMISE')).toBe(false);
  });
});

describe('tax determination is never made before payment', () => {
  it('blocks declaring residency', () => {
    expect(has('Based on this you are an Australian resident for tax purposes.', 'TAX_DETERMINATION')).toBe(true);
  });
  it('blocks stating a refund outcome', () => {
    expect(has('Your refund will be around a thousand dollars.', 'TAX_DETERMINATION')).toBe(true);
  });
  it('WILL-AI-01: blocks a foreign/temporary residency determination', () => {
    expect(has('Based on your dates you are a foreign resident for tax purposes.', 'TAX_DETERMINATION')).toBe(true);
    expect(has("You're a temporary resident, so different rates apply.", 'TAX_DETERMINATION')).toBe(true);
  });
  it('WILL-AI-01: blocks a bare-number refund estimate (no $ sign)', () => {
    expect(has('Your refund should come to about 1450 give or take.', 'TAX_DETERMINATION')).toBe(true);
    expect(has("You'll get back roughly 2300 this year.", 'TAX_DETERMINATION')).toBe(true);
  });
  it('WILL-AI-01: still allows the plain $220/$385 price (not a refund estimate)', () => {
    expect(has('Our fee is $220 for a TFN return, or $385 with ABN.', 'TAX_DETERMINATION')).toBe(false);
  });
  it('WILL-AI-01: allows a neutral MENTION of residency concept', () => {
    expect(has('There is a short explanation of who is considered an Australian resident for tax purposes.', 'TAX_DETERMINATION')).toBe(false);
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
  // Owner-approved Xero signing-link support (Jo, 31 Aug). Allowed, and proven
  // NOT to leak: it exempts ONLY the benign temp-password / reset-link phrasing,
  // and ONLY in the Xero context. Real credential leaks stay blocked.
  it('ALLOWS the Xero signing-link temp password support message', () => {
    const r = policyGuard(
      'It looks like you may have accidentally created a Xero account. If it asks for a password, try 123456789. If that doesn’t work, log in using the email address you gave us, select “Forgot password” and reset it. You should then be able to open and sign the documents.',
      ctx(),
    );
    expect(r.violations).not.toContain('SENSITIVE_CONTENT');
  });
  it('NO LEAK: a real credential is still blocked even with the word Xero present', () => {
    expect(has('Your Xero password is hunter2, use that to log in.', 'SENSITIVE_CONTENT')).toBe(true);
    expect(has('For the Xero portal, here is the API key: sk_live_abc123.', 'SENSITIVE_CONTENT')).toBe(true);
    expect(has('Xero admin access is via the admin panel password.', 'SENSITIVE_CONTENT')).toBe(true);
  });
  it('NO LEAK: the same password phrasing WITHOUT Xero context is still blocked', () => {
    expect(has('If it asks for a password, try 123456789.', 'SENSITIVE_CONTENT')).toBe(true);
    expect(has('Just reset your password and log back in.', 'SENSITIVE_CONTENT')).toBe(true);
  });
  it('blocks an em dash', () => {
    expect(has('Sure — I can help.', 'EM_DASH_FORBIDDEN')).toBe(true);
  });
});

// The ATO $300 substantiation threshold. A fixed public regulatory figure, safe
// to state only in a record-keeping context and never near a refund. Everything
// else about $300, and any other amount, stays blocked.
describe('$300 substantiation threshold — allowed only in a record-keeping context, and only after payment', () => {
  // AFTER payment (the only time a deduction/record-keeping answer is given).
  const amtPaid = (msg: string) =>
    policyGuard(msg, ctx({ paid: true, state: 'PAID' })).violations.some((v) => v.startsWith('FORBIDDEN_AMOUNT'));
  // BEFORE payment: no personalised tax advice at all, so even the threshold is held.
  const amtUnpaid = (msg: string) =>
    policyGuard(msg, ctx()).violations.some((v) => v.startsWith('FORBIDDEN_AMOUNT'));

  it('ALLOWS $300 after payment when it is about receipts / work-related expenses', () => {
    expect(
      amtPaid('If your total work-related expenses are $300 or less, receipts generally aren’t required, but you still need to show how you calculated the amount.'),
    ).toBe(false);
    expect(amtPaid('Keep your receipts once your work expenses go over $300.')).toBe(false);
  });

  it('BLOCKS the same $300 answer BEFORE payment (deduction advice is held pre-payment)', () => {
    expect(
      amtUnpaid('If your total work-related expenses are $300 or less, receipts generally aren’t required, but you still need to show how you calculated the amount.'),
    ).toBe(true);
  });

  it('NO LEAK: $300 stated as a refund or amount owed is still blocked, even after payment', () => {
    expect(amtPaid('Your refund is $300.')).toBe(true);
    expect(amtPaid('You’ll get back around $300.')).toBe(true);
    expect(amtPaid('We estimate $300 back to you.')).toBe(true);
    expect(amtPaid('You owe $300.')).toBe(true);
  });

  it('NO LEAK: a different amount in the same record-keeping context is still blocked', () => {
    expect(amtPaid('If your work-related expenses are $500 or less, receipts aren’t required.')).toBe(true);
    expect(amtPaid('Keep receipts for anything over $250.')).toBe(true);
  });

  it('NO LEAK: bare $300 with no record-keeping context is still blocked', () => {
    expect(amtPaid('It comes to $300.')).toBe(true);
    expect(amtPaid('That will be $300.')).toBe(true);
  });

  it('a distance in kilometres is not a price, even after the word "total"', () => {
    expect(amtUnpaid('Show how you calculated the total, up to 5,000 kilometres.')).toBe(false);
    expect(amtUnpaid('Keep a record of your work-related kilometres, up to 5000 km.')).toBe(false);
  });

  it('NO LEAK: a real dollar total is still caught next to the word total', () => {
    expect(amtUnpaid('The total cost is 5,000.')).toBe(true);
    expect(amtUnpaid('Your total is $5,000.')).toBe(true);
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
    'REFUND_OR_CANCEL_PROMISE', 'TAX_DETERMINATION',
    'DIY_INSTRUCTIONS', 'PLACEHOLDER_LEFTOVER', 'PROMPT_ECHO',
    'SENSITIVE_CONTENT', 'EM_DASH_FORBIDDEN',
  ];
  for (const entry of KNOWLEDGE_SEED) {
    it(`"${entry.intent}" answer is guard-clean`, () => {
      // Deduction / record-keeping answers (the ATO $300 substantiation
      // threshold) are POST-payment content — Will gives no personalised tax
      // advice before payment — so they are checked in the paid context they
      // are actually sent in. Everything else is checked in the neutral
      // pre-payment context.
      const isPostPaymentDeduction = /\$300\b/.test(entry.answer);
      const context = isPostPaymentDeduction ? ctx({ paid: true, state: 'PAID' }) : ctx();
      const v = policyGuard(entry.answer, context).violations;
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

  // Jo's queue, 3 Sep: a German new lead got the [opening] in German, the guard
  // recognised none of it (the corpus is English) and raised REPLY_TOO_LONG on
  // the owner's own script. The playbook tells the model to answer in the
  // customer's language, so this was every German and Japanese lead, not one.
  describe('a translated approved script is not an essay', () => {
    const germanOpening = 'Hey Lena! 😊 Natürlich, wir helfen dir gerne.\n\n'
      + 'Wir haben zwei Optionen, je nach deiner Situation:\n\n'
      + '*TFN: $220*\nUnser Team prüft deine Steuererklärung vollständig, einschließlich deiner '
      + 'steuerlichen Ansässigkeit, Medicare und aller absetzbaren Ausgaben, um deine Rückerstattung zu maximieren.\n\n'
      + '*TFN + ABN: $385*\nAlles aus der TFN-Option, plus eine vollständige Geschäftsaufstellung deiner '
      + 'ABN-Einnahmen und -Ausgaben, alles in einer Steuererklärung zusammengefasst.\n\n'
      + 'In beiden Fällen: Wenn deine Rückerstattung geringer ist als die Gebühr, erstatten wir dir die '
      + 'Differenz. Wenn du Steuern nachzahlen musst, deckt die Gebühr die Prüfung ab und ist nicht erstattungsfähig.\n\n'
      + 'Welche Option passt zu dir?';
    const japaneseOpening = 'こんにちは、ユキさん！😊 もちろん、喜んでお手伝いします。\n\n'
      + '状況に応じて、2つのオプションがあります：\n\n'
      + '*TFN: $220*\n税務上の居住区分、Medicare、対象となるすべての控除を含め、税務申告を完全に確認し、還付金を最大化します。\n\n'
      + '*TFN + ABN: $385*\nTFNオプションのすべてに加えて、ABNの収入と経費をカバーする完全な事業スケジュールを1つの申告にまとめます。\n\n'
      + 'どちらの場合も、還付金が料金より少ない場合は差額を返金します。納税が必要な場合、料金は確認作業の費用となり、返金はできません。\n\n'
      + 'どちらのオプションがよろしいですか？';

    it('lets the German opening through', () => {
      expect(germanOpening.length).toBeGreaterThan(450); // the case that was blocked
      expect(has(germanOpening, 'REPLY_TOO_LONG')).toBe(false);
    });

    it('lets the Japanese opening through', () => {
      expect(has(japaneseOpening, 'REPLY_TOO_LONG')).toBe(false);
    });

    it('lets the longest approved objection through in German', () => {
      // o3 is the longest objection script (~530 chars in English); its German
      // rendering is longer still and must not be an essay either.
      const o3de = 'Verstehe ich total! Viele denken, dass eine Steuererklärung kostenlos ist, weil man sie '
        + 'selbst über myGov einreichen kann. Das stimmt auch, aber dann bist du auf dich allein gestellt: '
        + 'Ansässigkeit, Medicare, absetzbare Ausgaben, alles musst du selbst richtig einschätzen, und ein '
        + 'Fehler dort kostet schnell mehr als unsere Gebühr. Bei uns prüft ein Team jede Position, damit '
        + 'du die maximale Rückerstattung bekommst, und wenn deine Rückerstattung geringer ist als die '
        + 'Gebühr, erstatten wir dir die Differenz. Du gehst also kein Risiko ein. Soll ich dir die '
        + 'Zahlungsdetails schicken, damit wir loslegen können?';
      expect(o3de.length).toBeGreaterThan(450);
      expect(has(o3de, 'REPLY_TOO_LONG')).toBe(false);
    });

    it('still stops a German essay that outgrows any script', () => {
      const para = 'Ich verstehe vollkommen, wo du herkommst, und ich möchte dir versichern, dass wir dir bei '
        + 'jedem Schritt zur Seite stehen. Viele Backpacker fühlen sich genauso, wenn sie sich zum ersten '
        + 'Mal bei uns melden, also sei dir sicher, dass deine Frage sehr häufig und sehr vernünftig ist. ';
      expect(has(para.repeat(5), 'REPLY_TOO_LONG')).toBe(true);
    });

    it('gives an English reply no extra room at all', () => {
      // The allowance exists only because the corpus cannot see translations.
      // English improvised prose is still capped exactly where it was.
      const essay = 'I completely understand where you are coming from and I want to reassure you that '
        + 'we are here to help you every step of the way. Many backpackers feel exactly the same way when '
        + 'they first get in touch with us, so please know that your question is very common and very '
        + 'reasonable. What we usually do is take a careful look at your situation, go through everything '
        + 'in detail, and then come back to you with a clear picture of where you stand. Please feel free '
        + 'to let me know if you have any other questions at all, I am always happy to help.';
      expect(essay.length).toBeLessThan(1000); // under the translated ceiling, over the English one
      expect(has(essay, 'REPLY_TOO_LONG')).toBe(true);
    });
  });

  // Same queue, same day: an English reply built from a Library message Jo had
  // edited in the CRM. The model sent what it was told to send; the guard only
  // knew the code copy, so the owner's own wording counted as improvised prose.
  describe('the live Library counts as approved wording', () => {
    const edited = 'Perfect! Here is how it works with us: our team goes through your whole return, '
      + 'checks your residency, Medicare and every deduction you can claim, and prepares it for lodgement. '
      + 'We send you an estimate first, then the return for your signature, and we lodge it the moment '
      + 'you sign. If your refund ends up lower than the fee we refund you the difference, so there is '
      + 'nothing to lose by letting us take a look. '
      + 'Once you have made the payment, just send us a screenshot and we will get started!';

    afterEach(() => registerLibraryBodies([]));

    it('is the model prose limit without registration', () => {
      expect(edited.length).toBeGreaterThan(450);
      expect(has(edited, 'REPLY_TOO_LONG')).toBe(true);
    });

    it('passes once the Library wording is registered', () => {
      registerLibraryBodies([edited]);
      expect(has(edited, 'REPLY_TOO_LONG')).toBe(false);
    });

    it('is replaced, not accumulated, on the next registration', () => {
      registerLibraryBodies([edited]);
      registerLibraryBodies(['Something else entirely.']);
      expect(has(edited, 'REPLY_TOO_LONG')).toBe(true);
    });

    it('ignores empty bodies', () => {
      registerLibraryBodies(['', '   ']);
      expect(has('', 'REPLY_TOO_LONG')).toBe(false);
    });
  });
});

// ── The guarantee in translation (audit, 3 Sep) ─────────────────────────────
//
// Two rules that only ever saw English wording refused the approved guarantee
// once it was rendered in another language: the money-back ban matched the
// Japanese "差額を返金します" (we refund THE DIFFERENCE), so every Japanese menu
// opening became a task; and objection #9's worked example ($100 refund, $220
// fee, $120 back) tripped FORBIDDEN_AMOUNT in German, Spanish, French and
// Japanese because only the English sentence is in the corpus.
describe('the guarantee survives translation', () => {
  it('lets the Japanese opening guarantee through', () => {
    expect(has('どちらの場合も、還付金が料金より少ない場合は差額を返金します。', 'REFUND_OR_CANCEL_PROMISE')).toBe(false);
  });

  it('lets the worked example through in German and Japanese', () => {
    const de = 'Wenn deine Rückerstattung also nur $100 wäre und unsere Gebühr $220, würden wir dir $120 erstatten.';
    const ja = '例えば還付金が$100で料金が$220なら、$120を返金します。';
    for (const t of [de, ja]) {
      const v = policyGuard(t, ctx({ state: 'PRICE_SENT' })).violations;
      expect([t, v.filter((x) => x.startsWith('FORBIDDEN_AMOUNT') || x === 'REFUND_OR_CANCEL_PROMISE')]).toEqual([t, []]);
    }
  });

  it('is only the exact arithmetic: a made-up pair is still a forbidden amount', () => {
    const v = policyGuard('Wenn deine Rückerstattung $150 wäre und unsere Gebühr $220, bekommst du $120 zurück.', ctx()).violations;
    expect(v).toContain('FORBIDDEN_AMOUNT:150.00');
  });

  it('a lone $100 refund figure is still forbidden', () => {
    expect(policyGuard('Your refund will be about $100.', ctx()).violations).toContain('FORBIDDEN_AMOUNT:100.00');
  });

  it('a FULL refund promise is still caught in every language', () => {
    for (const t of ['全額返金します。', '料金を返金します。', 'Du bekommst dein Geld zurück.', 'Te devolvemos el dinero de vuelta.', 'No worries, you get your money back.']) {
      expect([t, has(t, 'REFUND_OR_CANCEL_PROMISE')]).toEqual([t, true]);
    }
  });

  it('the example is not exempt after payment, where it is sales content anyway', () => {
    const v = policyGuard('If your refund was only $100 and our fee was $220, we would refund you $120.', ctx({ paid: true, state: 'FORM_PENDING' })).violations;
    expect(v.some((x) => x.startsWith('FORBIDDEN_AMOUNT') || x === 'SALES_CONTENT_AFTER_PAYMENT')).toBe(true);
  });
});
