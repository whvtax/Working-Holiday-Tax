/**
 * The rules Jo set from the Decision Log are in the live prompt.
 * 3 Sep: the registered agent / TPB question is answered from [legitimacy].
 * 4 Sep: a detailed tax story before payment gets the short three-line shape and
 * is never a task; a myGov login problem gets the reassurance, not a task.
 * 16 Sep: ABN income means TFN + ABN, no choice — this REVERSES the 4 Sep rule
 * that used to let the customer choose TFN only despite ABN income.
 */
import { buildSystemPrompt } from '@/lib/will/playbook';

const { stable } = buildSystemPrompt({
  name: 'Helena', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false,
  formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en',
});

it('answers the registered agent question from the Library, never a task', () => {
  expect(stable).toMatch(/THE REGISTERED AGENT QUESTION/);
  expect(stable).toMatch(/answer with \[legitimacy\]/);
});

it('gives every detailed tax story the same short shape and never hands it over', () => {
  expect(stable).toMatch(/THE DETAILED TAX STORY/);
  expect(stable).toMatch(/Three or four short lines in total, under 60 words/);
  expect(stable).toMatch(/Addy case/);
  expect(stable).toMatch(/never a human_task/);
});

it('declines TFN-only for a customer with ABN income — no choice, TFN + ABN applies', () => {
  expect(stable).toMatch(/ABN INCOME MEANS TFN \+ ABN, NO CHOICE/);
  expect(stable).toMatch(/decline the TFN-only package/);
  expect(stable).not.toMatch(/THE CUSTOMER CHOOSES THE TRACK, EVEN WITH ABN INCOME/);
});

it('reads the two kinds of customer and adapts, without answering either', () => {
  expect(stable).toMatch(/THE TWO KINDS OF CUSTOMER/);
  expect(stable).toMatch(/THE ONE WHO CAME NOT INTENDING TO PAY/);
  expect(stable).toMatch(/THE ONE WHO CAME TO PAY A PROFESSIONAL/);
  expect(stable).toMatch(/DO NOT SELL TO THIS PERSON/);
  expect(stable).toMatch(/Never the answer, always the reassurance/);
});

it('a myGov login problem gets the reassurance, not a task', () => {
  expect(stable).toMatch(/is NOT a human_task \(Jo, 4 Sep, Nick\)/);
});

it('the prompt forbids the retired guarantee paraphrase and no approved message carries it', () => {
  expect(stable).toMatch(/never write "if your refund is less than our fee we refund the difference", "our fee never costs you more than the refund you get back"/);
  expect(stable).toMatch(/THE OLD GUARANTEE IS GONE/);
  expect(stable).not.toContain("If your refund is less than our fee, we'll refund the difference.");
  expect(stable).not.toMatch(/Guarantee \(applies to ALL customers/);
  const { APPROVED } = jest.requireActual('@/lib/will/approved-messages');
  expect(JSON.stringify(APPROVED)).not.toMatch(/never costs you more than the refund/i);
});

// ── Misaki (+61 432, 4 Sep): "I only made $20 on Uber, does that put me on the
// $385 plan?" got four paragraphs that hedged the answer, re-quoted the
// guarantee, and speculated that she might not benefit. Jo: all Australian
// income is declared, full stop, and by the fifth message the answer is two
// lines.
describe('all Australian income is declared', () => {
  it('is stated as a plain fact, not hedged', () => {
    expect(stable).toMatch(/ALL AUSTRALIAN INCOME IS DECLARED IN AUSTRALIA/);
    expect(stable).toMatch(/whatever the amount/);
    expect(stable).toMatch(/NEVER answer this with "it depends on your circumstances"/);
  });

  it('never suggests the service may not be worth it', () => {
    expect(stable).toMatch(/NEVER suggest the service might not be worth it/);
  });

  it('replies get shorter as the conversation goes on', () => {
    expect(stable).toMatch(/THE DEEPER INTO A CONVERSATION, THE SHORTER THE REPLY/);
    expect(stable).toMatch(/By the fifth message TWO LINES is the normal answer/);
  });
});

// ── Nicky (+44 7794, 4 Sep) asked outright whether she was talking to an AI,
// after three exchanges in which nothing was wrong. Jo: the task was the right
// outcome and stays; what has to change is the shape that provoked the
// question — the metronome timing (config.ts), the form-shaped answers, and the
// same cheerful opener on every message.
describe('not sounding like a machine', () => {
  it('answers the main thing rather than every sub-question', () => {
    expect(stable).toMatch(/ANSWER THE MAIN THING, NOT EVERY THING/);
    expect(stable).toMatch(/is a form, not a message/);
    expect(stable).toMatch(/Never number or bullet your answers/);
  });

  it('bans the repeated enthusiasm opener', () => {
    expect(stable).toMatch(/DO NOT OPEN EVERY MESSAGE THE SAME WAY/);
    expect(stable).toMatch(/"Perfect!"/);
    expect(stable).toMatch(/ONCE in a conversation, at most/);
  });
});

// Jo, 17 Sep: "found it cheaper" / "prefers someone else" used to get the
// same "one objection response then stop" treatment as every other clear no.
// Now that specific case gets up to two extra, genuinely relevant re-engaging
// questions (residency status, then Medicare exemption eligibility) before
// Will lets them go — every OTHER kind of "no" (not interested, did it
// myself, angry, budget) keeps the original one-response-then-stop rule
// unchanged.
describe('comparing providers gets two extra tries before Will lets them go (12a)', () => {
  it('states the two-question sequence and the condition for trying the second one', () => {
    expect(stable).toMatch(/COMPARING PROVIDERS/);
    expect(stable).toMatch(/checked their tax residency status/);
    expect(stable).toMatch(/eligibility for the Medicare Levy Exemption/);
    expect(stable).toMatch(/only the next one if the previous one did not bring them back/);
  });

  it('still respects 11a: the Medicare question is never assumed or pushed as certain', () => {
    expect(stable).toMatch(/same as 11a: only if it plausibly applies to them, phrased as a genuine question, never assumed or pushed as certain/);
  });

  it('caps it at two and forbids repeating a question already asked', () => {
    expect(stable).toMatch(/Never use more than these two extra questions, and never repeat one already asked in this conversation/);
  });

  it('leaves the general one-response-then-stop rule in place for every other clear no', () => {
    expect(stable).toMatch(/one reasonable objection response maximum, then stop pushing, EXCEPT the comparing-providers case in 12a below/);
  });
});

// Jo, 17 Sep — Noel (+49 162 4252824): he mentioned ABN income in his second
// message, and Will skipped straight from that to the bank details, having
// never shown him [opening] at all. Too fast a sale. Now the very first reply
// is always [opening], whatever detail the customer's first message already
// contains; "stating facts is also choosing" only skips the repeat "which
// option?" question AFTER [opening] has actually been sent once.
describe('the very first reply is always [opening], even when income is already described (17 Sep, Noel)', () => {
  it('says the first reply is always [opening] and never skips straight to a price message', () => {
    expect(stable).toMatch(/The very first reply in a NEW_LEAD conversation is ALWAYS \[opening\]/);
    expect(stable).toMatch(/Never skip from a first message straight to a price message/);
  });

  it('only treats describing income as choosing once [opening] has already gone out', () => {
    expect(stable).toMatch(/Only AFTER \[opening\] has actually gone out once in this conversation does describing income also count as choosing/);
  });

  it('still avoids repeating "which option" once they have already answered it', () => {
    expect(stable).toMatch(/Do NOT ask "which option would you like to go with\?" again once \[opening\] has been sent/);
  });
});

describe('surprised to owe tax after the estimate (19 Sep, Khrystea)', () => {
  it('gets empathy and the team walk-through, never an explanation of the cause', () => {
    expect(stable).toMatch(/"WHY DO I OWE MONEY\?" AFTER THE ESTIMATE/);
    expect(stable).toMatch(/go through exactly what was entered with them before anything is lodged/);
    expect(stable).toMatch(/You NEVER explain WHY they owe/);
    expect(stable).toMatch(/do not raise a human_task by default/);
  });
});
