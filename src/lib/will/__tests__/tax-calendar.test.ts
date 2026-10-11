/**
 * Full audit, 11 Oct 2026, decision 7: the date and the lodgeable year are
 * computed and injected; the model never names a tax year from memory.
 * Jase (Aug 2026) was told FY25-26 "hasn't finished"; Anika (2026 work) was
 * told 2023-24; marie (1 Oct) "runs until 30 June 2026".
 */
import { taxCalendar, taxCalendarLine, whichYearAnswer } from '@/lib/will/tax-calendar';
import { buildSystemPrompt } from '@/lib/will/playbook';

it('after 1 July the year that just ended is lodgeable', () => {
  const c = taxCalendar(new Date('2026-08-26T03:00:00Z')); // Jase, 26 Aug 2026 Melbourne
  expect(c.today).toBe('26 August 2026');
  expect(c.lodgeableYear).toBe('2025-26');
  expect(c.lodgeableSpan).toBe('1 July 2025 to 30 June 2026');
  expect(c.currentYear).toBe('2026-27');
  expect(c.currentYearEnds).toBe('30 June 2027');
});

it('before 1 July the previous year is still the lodgeable one', () => {
  const c = taxCalendar(new Date('2027-03-10T03:00:00Z'));
  expect(c.lodgeableYear).toBe('2025-26');
  expect(c.currentYear).toBe('2026-27');
});

it('the Melbourne date is used, not UTC', () => {
  // 30 June 23:00 UTC is already 1 July in Melbourne: the year has ended.
  const c = taxCalendar(new Date('2027-06-30T23:00:00Z'));
  expect(c.today).toBe('1 July 2027');
  expect(c.lodgeableYear).toBe('2026-27');
});

it('the prompt line says the year has ended, and the which-year answer matches', () => {
  const line = taxCalendarLine(new Date('2026-10-01T00:00:00Z'));
  expect(line).toContain('Today is 1 October 2026');
  expect(line).toContain('2025-26 (1 July 2025 to 30 June 2026); it has ENDED');
  expect(line).toContain('Never say a year that has ended has not finished');
  expect(whichYearAnswer(new Date('2026-10-01T00:00:00Z'))).toContain('we can lodge your 2025-26 return');
  expect(whichYearAnswer(new Date('2026-10-01T00:00:00Z'))).not.toMatch(/[—–]/);
});

it('every prompt carries the computed TODAY block', () => {
  const { dynamic } = buildSystemPrompt({ name: 'X', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en' });
  expect(dynamic).toMatch(/^# TODAY \(computed by the system, not from memory\)\nToday is \d{1,2} \w+ \d{4} \(Melbourne\)/);
  expect(dynamic).toMatch(/which year their work falls in/);
});
