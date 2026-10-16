/** 16 Oct: fixes from the Decision Log Jo sent. */
import { isIdentityQuestion } from '@/lib/will/identity-question';
import { phoneCandidates } from '@/lib/will/phone-candidates';
import { detectChoice } from '@/lib/will/instant-choice';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('"are you a registered tax person?" is not "are you a bot?" (siti)', () => {
  it.each(['are you a registered tax person? could you share your id', 'Are you a registered tax agent?', 'are you a qualified accountant?', "what's your TPB number"])('%s', (t) => {
    expect(isIdentityQuestion(t)).toBe(false);
  });
  it.each(['are you a bot?', 'am I talking to a real person?', 'bot or human?'])('%s is still caught', (t) => {
    expect(isIdentityQuestion(t)).toBe(true);
  });
});

describe('form numbers typed oddly (unmatched questionnaires)', () => {
  it('UK mobile without 0 or +44', () => { expect(phoneCandidates('7386284504')).toContain('447386284504'); });
  it('country code plus the trunk 0', () => { expect(phoneCandidates('610403289551')).toContain('61403289551'); });
});

describe('Japanese "TFNだけです！" picks the TFN track (Shun)', () => {
  it('detected', () => { expect(detectChoice('TFNだけです！', null)).toBe('TFN'); });
});

describe('playbook + engine (source-pinned)', () => {
  const pb = readFileSync(join(__dirname, '..', 'playbook.ts'), 'utf8');
  const engine = readFileSync(join(__dirname, '..', 'engine.ts'), 'utf8');
  it('a price the team quoted stands (Megan)', () => {
    expect(pb).toContain('# A PRICE THE TEAM QUOTED');
    expect(engine).toContain('!ctx.paid && !teamQuoted &&');
  });
  it('job applications get one warm line (Yuqi)', () => { expect(pb).toContain('# JOB APPLICATIONS'); });
});

describe('the bank name-mismatch warning has a Library answer (Eabha)', () => {
  it('present', () => {
    const seed = readFileSync(join(__dirname, '..', 'knowledge-seed.ts'), 'utf8');
    expect(seed).toContain('bank warns the payee details are incorrect');
  });
});
