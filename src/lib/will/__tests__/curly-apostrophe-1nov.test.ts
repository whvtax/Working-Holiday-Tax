import { abnStance } from '../instant-choice'
import { hasAbnIncome } from '../abn-income'
import { normaliseQuotes } from '../quotes'

const MSG = 'Thank you for your reply\nI worked only as an employee using my TFN. I didn’t have an ABN or work as a contractor.\n\nWhat’s the next step?'

describe('1 Nov: an iPhone curly apostrophe must not turn a TFN only customer into $385', () => {
  it('normaliseQuotes turns curly quotes into straight ones', () => {
    expect(normaliseQuotes('didn’t ‘x’ ʼy')).toBe("didn't 'x' 'y")
  })
  it('the customer from the screenshot is TFN only after normalising', () => {
    const t = normaliseQuotes(MSG)
    expect(hasAbnIncome([t])).toBe(false)
    expect(abnStance([t])).toBe('no_abn')
  })
  it('the same message with a straight apostrophe gives the same answer', () => {
    const t = MSG.replace(/’/g, "'")
    expect(hasAbnIncome([t])).toBe(false)
    expect(abnStance([t])).toBe('no_abn')
  })
  it('without the fix the curly message read as ABN (the $385 bug)', () => {
    expect(abnStance([MSG])).toBe('abn')
  })
  it('real ABN income is still ABN income', () => {
    expect(hasAbnIncome([normaliseQuotes('I also drove for Uber Eats, it’s about $500')])).toBe(true)
  })
})
