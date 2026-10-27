/**
 * Decision 004: Will serves two brands through ONE engine. Everything a
 * customer receives and every prompt the model sees passes through
 * rebrandText / rebrandPrompt. For WHT both are the identity function, which
 * is what guarantees WHT behaviour is byte for byte unchanged.
 */
import { rebrandText, rebrandPrompt, brandLeaks, VOICES, svtTemplateName, sharedTemplatesFromEnv, svtTemplateReadiness } from '@/lib/will/brand-voice'
import { APPROVED } from '@/lib/will/approved-messages'

/** Every string inside a value, at any depth. */
function strings(v: unknown): string[] {
  if (typeof v === 'string') return [v]
  if (v && typeof v === 'object') return Object.values(v as Record<string, unknown>).flatMap(strings)
  return []
}
const ALL_APPROVED = strings(APPROVED)

const WHT_SAMPLES = [
  'Hi Anna, it\'s the team at Working Holiday Tax 😊',
  'Here is the form: https://workingholidaytax.com.au/tax-form',
  'Details: https://www.workingholidaytax.com.au/client-agreement',
  'Call 0424 513 998 or +61 424 513 998 or wa.me/61424513998',
  'You are Will, on the team at Working Holiday Tax, an Australian service for working holiday makers (backpackers).',
]

describe('WHT is untouched', () => {
  it('rebrandText and rebrandPrompt return the exact same string object for WHT', () => {
    for (const s of WHT_SAMPLES) {
      expect(rebrandText(s, 'wht')).toBe(s)
      expect(rebrandPrompt(s, 'wht')).toBe(s)
    }
  })
  it('every approved message is unchanged for WHT', () => {
    expect(ALL_APPROVED.length).toBeGreaterThan(20)
    for (const s of ALL_APPROVED) {
      expect(rebrandText(s, 'wht')).toBe(s)
    }
  })
})

describe('SVT gets its own name, domain and number', () => {
  it('replaces every WHT mark in customer text', () => {
    for (const s of WHT_SAMPLES) {
      const out = rebrandText(s, 'svt')
      expect(brandLeaks(out, 'svt')).toEqual([])
    }
    expect(rebrandText('https://workingholidaytax.com.au/tax-form', 'svt')).toBe('https://studentvisatax.com.au/tax-form')
    expect(rebrandText('https://www.workingholidaytax.com.au/privacy', 'svt')).toBe('https://studentvisatax.com.au/privacy')
    expect(rebrandText("it's the team at Working Holiday Tax", 'svt')).toBe("it's the team at Student Visa Tax")
  })
  it('every approved message comes out clean for SVT', () => {
    for (const s of ALL_APPROVED) {
      expect(brandLeaks(rebrandText(s, 'svt'), 'svt')).toEqual([])
    }
  })
  it('prompts describe students and use the SVT agent name', () => {
    const p = rebrandPrompt(WHT_SAMPLES[4], 'svt')
    expect(p).toContain(VOICES.svt.agentName)
    expect(p).toContain('Student Visa Tax')
    expect(p).not.toMatch(/working holiday makers \(backpackers\)/i)
    expect(p).toContain('STUDENT VISA TAX')
    expect(brandLeaks(p, 'svt')).toEqual([])
  })
  it('the bank account name stays The Accounting Academy (same business)', () => {
    expect(rebrandText('Account name: The Accounting Academy', 'svt')).toBe('Account name: The Accounting Academy')
  })
})

describe('leak detection works in both directions', () => {
  it('finds the other brand', () => {
    expect(brandLeaks('see workingholidaytax.com.au', 'svt')).toEqual(['workingholidaytax'])
    expect(brandLeaks('Working  Holiday Tax team', 'svt')).toEqual(['Working Holiday Tax'])
    expect(brandLeaks('call 0424513998', 'svt')).toEqual(['WHT phone'])
    expect(brandLeaks('see studentvisatax.com.au', 'wht')).toEqual(['studentvisatax'])
    expect(brandLeaks('Student Visa Tax', 'wht')).toEqual(['Student Visa Tax'])
    expect(brandLeaks('a normal message', 'wht')).toEqual([])
  })
  it('talking about a working holiday visa is not a leak', () => {
    expect(brandLeaks('Were you on a working holiday visa (417) before your student visa?', 'svt')).toEqual([])
  })
})

describe('templates on the shared account', () => {
  it('default: always the _svt twin', () => {
    expect(svtTemplateName('form_reminder', new Set())).toBe('form_reminder_svt')
    expect(svtTemplateName('form_reminder_svt', new Set())).toBe('form_reminder_svt')
  })
  it('a template confirmed neutral is shared as it is', () => {
    expect(svtTemplateName('signature', new Set(['signature']))).toBe('signature')
    expect(sharedTemplatesFromEnv({ SVT_SHARED_TEMPLATES: ' signature, medicare ,' })).toEqual(new Set(['signature', 'medicare']))
  })
  it('readiness sorts Meta templates by whether their approved text names WHT', () => {
    const body = (text: string) => [{ type: 'BODY', text }]
    const r = svtTemplateReadiness([
      { name: 'signature', status: 'APPROVED', components: body('Please sign your return here.') },
      { name: 'winback_en', status: 'APPROVED', components: body("Hi {{1}}, it's the team at Working Holiday Tax 😊") },
      { name: 'winback_en_svt', status: 'APPROVED', components: body("Hi {{1}}, it's the team at Student Visa Tax 😊") },
      { name: 'medicare', status: 'APPROVED', components: body('Details: workingholidaytax.com.au/medicare') },
      { name: 'medicare', status: 'APPROVED', components: body('Medicare details') },
      { name: 'draft', status: 'PENDING', components: body('Working Holiday Tax') },
    ])
    expect(r).toEqual({ shareable: ['signature'], needTwin: ['medicare', 'winback_en'], twinsApproved: ['winback_en'] })
  })
})
