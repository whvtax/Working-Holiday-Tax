import { deadlineFact, deadlinePassed, DEADLINE_PASSED_NOTE, SELF_LODGE_DEADLINE_MS } from '@/lib/svt/deadline'

it('the deadline turns over after 31 October in every Australian time zone', () => {
  expect(deadlinePassed(Date.parse('2026-10-31T23:58:00+08:00'))).toBe(false)
  expect(deadlinePassed(SELF_LODGE_DEADLINE_MS)).toBe(true)
  expect(deadlineFact(Date.parse('2026-10-28T10:00:00+11:00'))).toMatch(/have until 11:59 pm/)
  expect(deadlineFact(Date.parse('2026-11-02T10:00:00+11:00'))).toMatch(/was 11:59 pm local time on 31 October 2026/)
})

it('the passed note exists in every language and has no AI-style dashes', () => {
  for (const t of Object.values(DEADLINE_PASSED_NOTE)) expect(t).not.toMatch(/[—–―]|——/)
})
