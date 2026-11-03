import { parseYesNo, quizResult, quizIntro, assessQuiz, quizStep, type QuizLang } from '@/lib/will/residency-quiz';

const LANGS: QuizLang[] = ['en', 'de', 'ja'];
const DASHES = /[—–―⸺]/;

describe('neutral wording', () => {
  it.each(LANGS)('%s: never says resident, Working Holiday Maker or "stays as it is"', (l) => {
    for (const y of [0, 2, 3, 4, 6]) {
      const r = quizResult(l, y);
      expect(r).not.toMatch(/resident|Working Holiday|stays as it is|ansässig|Working Holiday Maker|居住者|ワーキングホリデー|そのままで/i);
      expect(r).not.toMatch(/https?:/);
      expect(r).not.toMatch(DASHES);
    }
    expect(quizResult(l, 0)).toBe(quizResult(l, 5));
    expect(quizIntro(l)).not.toMatch(DASHES);
  });
  it('en line says the team takes it into account', () => {
    expect(quizResult('en')).toContain('Our team will take them into account when reviewing your return');
  });
});

describe('assessQuiz signals', () => {
  const t = (n: number) => Array.from({ length: 6 }, (_, i) => i < n);
  it('4+ Yes against a WHM form answer is a mismatch task', () => {
    const a = assessQuiz(t(4));
    expect(a).toMatchObject({ yes: 4, signal: 'mismatch', needsTeamTask: true });
    expect(a.note).not.toMatch(DASHES);
  });
  it('2 or 3 Yes is borderline and needs a task', () => {
    expect(assessQuiz(t(2))).toMatchObject({ signal: 'borderline', needsTeamTask: true });
    expect(assessQuiz(t(3))).toMatchObject({ signal: 'borderline', needsTeamTask: true });
  });
  it('0 or 1 Yes agrees with the form, no task', () => {
    expect(assessQuiz(t(0))).toMatchObject({ signal: 'consistent', needsTeamTask: false });
    expect(assessQuiz(t(1))).toMatchObject({ signal: 'consistent', needsTeamTask: false });
  });
  it('form already says resident: high score agrees, low score is a mismatch', () => {
    expect(assessQuiz(t(5), false).needsTeamTask).toBe(false);
    expect(assessQuiz(t(0), false)).toMatchObject({ signal: 'mismatch', needsTeamTask: true });
  });
  it('quizStep returns the answers the assessment needs', () => {
    let st: Parameters<typeof quizStep>[0] | null = { step: 0, answers: [], startedAt: new Date().toISOString(), lang: 'en' };
    let done: { yes: number; answers: boolean[] } | undefined;
    for (const a of ['Yes', 'No', 'Yes', 'No', 'Yes', 'No']) {
      const r = quizStep(st!, a);
      if (r === 'not_an_answer') throw new Error('rejected');
      st = r.next; done = r.done;
    }
    expect(assessQuiz(done!.answers).signal).toBe('borderline');
  });
});

describe('answers in form style', () => {
  it.each([
    ['1/6: Ja', true], ['2/6: Nein', false], ['3/6: Yes', true], ['4/6: No', false], ['5/6：はい', true], ['6/6: いいえ', false],
    ['1 von 6: ja', true], ['Ja, das stimmt', true], ['Doch', true], ['Nee', false], ['Nö', false], ['Keine Ahnung', false],
    ['ありました', true], ['いえ、ありません', false], ['Yes!', true], ['no', false], ['1/6', null],
  ])('"%s" -> %s', (t, v) => {
    expect(parseYesNo(t as string)).toBe(v);
  });
});
