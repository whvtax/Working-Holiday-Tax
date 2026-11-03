import { KNOWLEDGE_SEED } from '../knowledge-seed'

const DASH = /[‒–—―⸺⸻]/
const BANNED: [string, RegExp][] = [
  ['AI or bot mention', /\bAI\b|\bbots?\b|chatbot|artificial intelligence|language model|\bLLM\b|人工知能|ボット/i],
  ['old payee name', /simple tax services/i],
  ['refund promise', /guarantee(?:d)? (?:you )?(?:a |your )?refund|you(?:'ll| will) (?:definitely )?get (?:a |your )?refund|will be refunded to you/i],
  ['residency conclusion', /you (?:are|count as|will be|'re) (?:a )?(?:tax )?(?:non-?)?resident\b/i],
  ['agent claim about ourselves', /we are (?:a )?registered tax agents?\b|we(?:'re| are) registered with the (?:tpb|tax practitioners)/i],
]

describe('Library seed after the 3 Nov merge', () => {
  it('is valid JSON-serialisable with the SeedKnowledge shape', () => {
    const round = JSON.parse(JSON.stringify(KNOWLEDGE_SEED))
    expect(round).toEqual(KNOWLEDGE_SEED)
    for (const e of KNOWLEDGE_SEED) {
      expect(typeof e.intent).toBe('string')
      expect(typeof e.question).toBe('string')
      expect(typeof e.answer).toBe('string')
      expect(e.answer.length).toBeGreaterThan(10)
      expect(Array.isArray(e.examples)).toBe(true)
      expect(Array.isArray(e.keywords)).toBe(true)
      expect(Array.isArray(e.tags)).toBe(true)
      expect(['en', 'de', 'ja']).toContain(e.lang)
    }
  })

  it('every entry has 3 or more examples, except the older short ones', () => {
    const short = KNOWLEDGE_SEED.filter((e) => e.examples.length < 3)
    // entries that predate this merge are allowed to be short; none of the new ones are
    expect(short.length).toBeLessThanOrEqual(5)
    const fresh = KNOWLEDGE_SEED.slice(0, 100)
    expect(fresh.filter((e) => e.examples.length < 3).map((e) => e.intent)).toEqual([])
  })

  it('has unique intents', () => {
    const seen = new Map<string, number>()
    for (const e of KNOWLEDGE_SEED) seen.set(e.intent.trim().toLowerCase(), (seen.get(e.intent.trim().toLowerCase()) ?? 0) + 1)
    expect([...seen.entries()].filter(([, n]) => n > 1).map(([k]) => k)).toEqual([])
  })

  it('has no dash characters anywhere (plain hyphen only)', () => {
    const bad = KNOWLEDGE_SEED.filter((e) => DASH.test(JSON.stringify(e))).map((e) => e.intent)
    expect(bad).toEqual([])
  })

  it('has no banned wording', () => {
    const hits: string[] = []
    for (const e of KNOWLEDGE_SEED) {
      // customers' own phrasings (examples, question) may say anything; what Will can say is the answer
      for (const [name, rx] of BANNED) {
        const text = name === 'refund promise' || name === 'agent claim about ourselves' ? e.answer : JSON.stringify(e)
        if (rx.test(text)) hits.push(`${e.intent}: ${name}`)
      }
    }
    expect(hits).toEqual([])
  })

  it('answers the phone number question one consistent way', () => {
    const phone = KNOWLEDGE_SEED.filter((e) => /phone number|number you use/i.test(e.answer) && e.lang === 'en')
    for (const e of phone) expect(e.answer).not.toMatch(/number you use now|isn.t needed|isn't needed/i)
    expect(KNOWLEDGE_SEED.some((e) => e.intent === 'no Australian phone number for the form')).toBe(false)
    const master = KNOWLEDGE_SEED.find((e) => e.intent === 'customer no longer has an Australian phone number')
    expect(master?.answer).toMatch(/even if it is not active/)
  })

  it('does not open the registered agent answer with a bare yes', () => {
    const e = KNOWLEDGE_SEED.find((x) => x.intent === 'registered agent details')
    expect(e?.answer.startsWith('Of course.')).toBe(true)
  })

  it('has German and Japanese entries', () => {
    expect(KNOWLEDGE_SEED.filter((e) => e.lang === 'de').length).toBeGreaterThan(10)
    expect(KNOWLEDGE_SEED.filter((e) => e.lang === 'ja').length).toBeGreaterThan(10)
  })
})
