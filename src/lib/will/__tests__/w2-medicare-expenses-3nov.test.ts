import { medicareGate, medicareDeferral, isMedicareInProgressNote } from '../medicare-gate';
import { expensesIntake } from '../expenses-intake';

describe('medicareGate', () => {
  it('never for a working holiday maker unless the team set it', () => {
    expect(medicareGate({ formAnswer: 'no', workingHolidayMaker: true }).send).toBe(false);
    expect(medicareGate({ formAnswer: 'no' }).reason).toBe('working_holiday_maker');
    expect(medicareGate({ formAnswer: 'no', workingHolidayMaker: true, teamSetExemption: true }).send).toBe(true);
  });
  it('once only, and not after a screenshot or decline', () => {
    expect(medicareGate({ formAnswer: 'no', workingHolidayMaker: false, scriptsSent: 1, teamSetExemption: true }).reason).toBe('already_sent');
    expect(medicareGate({ teamSetExemption: true, screenshotReceived: true }).send).toBe(false);
    expect(medicareGate({ teamSetExemption: true, declined: true }).send).toBe(false);
  });
  it('needs a No on the form otherwise', () => {
    expect(medicareGate({ formAnswer: 'yes', workingHolidayMaker: false }).reason).toBe('form_not_no');
    expect(medicareGate({ formAnswer: 'no', workingHolidayMaker: false }).send).toBe(true);
  });
  it('deferral backs off and stops', () => {
    expect(medicareDeferral(0)).toEqual({ action: 'defer', delayMinutes: 30 });
    expect(medicareDeferral(3)).toEqual({ action: 'give_up' });
  });
  it('detects in progress notes', () => {
    expect(isMedicareInProgressNote('Status: In progress')).toBe(true);
    expect(isMedicareInProgressNote('hello')).toBe(false);
  });
});

describe('expensesIntake', () => {
  const dash = /[—–―⸺]/;
  it('asks once, in en/de/ja, no dashes, no deductible promise, no fee', () => {
    for (const lang of ['en', 'de', 'ja']) {
      for (const f of [{}, { saidNoReceipts: true }, { formAnswer: 'none' as const, listedInChat: true }]) {
        const r = expensesIntake({ lang, ...f });
        expect(r.message).toBeTruthy();
        expect(r.message).not.toMatch(dash);
        expect(r.message).not.toMatch(/\$50|first 10|deductible|abzugsf|控除/i);
        expect(r.message).toMatch(/bank|Kontoauszug|銀行/i);
      }
    }
  });
  it('no second round and done states', () => {
    expect(expensesIntake({ promptsSent: 1 }).message).toBeNull();
    expect(expensesIntake({ confirmedNone: true }).step).toBe('done');
    expect(expensesIntake({ receivedCount: 2 }).step).toBe('done');
  });
});
