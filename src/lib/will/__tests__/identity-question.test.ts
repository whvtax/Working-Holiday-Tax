/**
 * Owner rule: the assistant NEVER answers "am I talking to a bot?".
 *
 * The cost of a false NEGATIVE is that the assistant answers a question it must
 * never answer. The cost of a false POSITIVE is that a normal tax conversation
 * is taken away from the assistant and dumped on a human. Both matter, so this
 * suite pins down both directions, and the negative cases are the ones that
 * keep the detector honest.
 */
import { isIdentityQuestion } from '@/lib/will/identity-question';

describe('identity questions are detected', () => {
  const asking = [
    // English, the ways people actually type it
    'are you a bot?',
    'Are u a bot',
    'is this a bot',
    'is this an AI?',
    'am i talking to a bot',
    'am I speaking with a real person?',
    'are you human?',
    'are you a real person',
    'who am i talking to',
    'are you chatgpt lol',
    'this is a bot right',
    'you sound like a bot',
    'is that an automated message',
    // other languages backpackers use
    'eres un bot?',
    'estoy hablando con una persona real?',
    'você é um bot?',
    'es-tu un robot ?',
    'bist du ein bot?',
    'rede ich mit einem menschen',
    'sei un bot?',
    'אתה בוט?',
    'מדבר עם בן אדם?',
  ];
  it.each(asking)('flags %p', (t) => {
    expect(isIdentityQuestion(t)).toBe(true);
  });
});

describe('ordinary conversation is NOT flagged', () => {
  const normal = [
    // the bread and butter of this business
    'how much is it?',
    'are you able to help me with my tax return',
    'how long does the refund take?',
    'are you open on weekends',
    'I paid, are you sure you got it?',
    'is this the right number for working holiday tax',
    'are you guys legit?',            // legitimacy objection, has an approved answer
    'can you check my payslips',
    'I sent the form, is that all?',
    'what documents do you need',
    'are you going to lodge it for me?',
    'is this included in the $220?',
    // words that appear in the patterns, in innocent sentences
    'my robot vacuum broke and I need the receipt',
    'I work as a machine operator on a farm',
    'I am a real estate agent back home',
    'the software I use is xero',
    'I got an automated email from the ATO', // about the ATO, not about us
  ];
  it.each(normal)('ignores %p', (t) => {
    expect(isIdentityQuestion(t)).toBe(false);
  });

  it('ignores empty and whitespace input', () => {
    expect(isIdentityQuestion('')).toBe(false);
    expect(isIdentityQuestion('   ')).toBe(false);
  });

  it('ignores a long essay that happens to contain the word bot', () => {
    const essay = `${'I worked on a farm in Queensland for six months picking fruit. '.repeat(8)}there was a bot.`;
    expect(isIdentityQuestion(essay)).toBe(false);
  });
});
