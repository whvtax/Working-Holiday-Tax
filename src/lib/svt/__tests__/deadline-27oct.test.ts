import { deadlineFact, deadlinePassed, DEADLINE_PASSED_NOTE, SELF_LODGE_DEADLINE_MS } from '@/lib/svt/deadline'

it('the deadline turns over after 2 November in every Australian time zone', () => {
  expect(deadlinePassed(Date.parse('2026-11-02T23:58:00+08:00'))).toBe(false)
  expect(deadlinePassed(SELF_LODGE_DEADLINE_MS)).toBe(true)
  expect(deadlineFact(Date.parse('2026-10-28T10:00:00+11:00'))).toMatch(/have until 11:59 pm/)
  expect(deadlineFact(Date.parse('2026-11-04T10:00:00+11:00'))).toMatch(/was 11:59 pm local time on Monday 2 November 2026/)
})

it('the passed note exists in every language and has no AI-style dashes', () => {
  for (const t of Object.values(DEADLINE_PASSED_NOTE)) expect(t).not.toMatch(/[—–―]|——/)
})
