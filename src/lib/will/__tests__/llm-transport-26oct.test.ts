import { brandBody, anthropicMessages, ANTHROPIC_MESSAGES_URL } from '@/lib/will/llm-transport'
import { withBrand } from '@/lib/will/brand-context'

const cached = { type: 'text', text: 'You are a team member at Working Holiday Tax, for Working Holiday Makers (backpackers).', cache_control: { type: 'ephemeral' } }
const dynamic = { type: 'text', text: 'Form: https://workingholidaytax.com.au/start' }
const body = JSON.stringify({ model: 'm', system: [cached, dynamic], messages: [{ role: 'user', content: 'hi Working Holiday Tax' }] })

it('outside any brand context (and for WHT) the body is the same string', async () => {
  expect(brandBody(body)).toBe(body)
  await withBrand('wht', async () => { expect(brandBody(body)).toBe(body) })
})

it('for SVT every system block is rebranded and the student rules appear once, at the end', async () => {
  await withBrand('svt', async () => {
    const out = JSON.parse(brandBody(body) as string)
    expect(out.system).toHaveLength(2)
    expect(out.system[0].cache_control).toEqual({ type: 'ephemeral' })
    expect(out.system[0].text).toContain('Student Visa Tax')
    expect(out.system[0].text).not.toContain('STUDENT VISA TAX (')
    expect(out.system[1].text).toContain('https://studentvisatax.com.au/jhd7hp9xd')
    expect(out.system[1].text.match(/STUDENT VISA TAX \(/g)).toHaveLength(1)
    expect(JSON.stringify(out.system)).not.toMatch(/workingholidaytax|Working Holiday Tax/)
    // The conversation itself is never rewritten.
    expect(out.messages[0].content).toBe('hi Working Holiday Tax')
  })
})

it('a string system prompt is rebranded too', async () => {
  await withBrand('svt', async () => {
    const out = JSON.parse(brandBody(JSON.stringify({ system: 'You are Will, on the team at Working Holiday Tax' })) as string)
    expect(out.system).toMatch(/^You are Mia, on the team at Student Visa Tax/)
    expect(out.system).toContain('STUDENT VISA TAX (')
  })
})

it('anthropicMessages posts to the Messages API with the branded body', async () => {
  const calls: Array<[string, RequestInit]> = []
  const orig = global.fetch
  global.fetch = (async (url: string, init: RequestInit) => { calls.push([url, init]); return new Response('{}') }) as unknown as typeof fetch
  try {
    const init = { method: 'POST', body }
    await anthropicMessages(init)
    expect(calls[0][0]).toBe(ANTHROPIC_MESSAGES_URL)
    expect(calls[0][1]).toBe(init) // WHT: the very same init object
    await withBrand('svt', () => anthropicMessages(init))
    expect(calls[1][1].body).not.toBe(body)
  } finally { global.fetch = orig }
})
