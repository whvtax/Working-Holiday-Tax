/**
 * The tax return form in nine languages, both brands (decision 017, 18 Nov 2026).
 *
 * What is pinned here:
 *   1. every key the flow shows has all nine languages and none is empty;
 *   2. a missing key is English, never an empty string;
 *   3. no em or en dash, no forbidden job title, no mention of AI or bots, in any form string;
 *   4. placeholders and link markers survive in every language;
 *   5. what is SENT to the server is the same English values in every display language.
 */
import fs from 'node:fs'
import path from 'node:path'

const fetchMock = jest.fn()
global.fetch = fetchMock as unknown as typeof fetch
jest.mock('@/lib/compress-image', () => ({
  compressImage: (f: File) => Promise.resolve(f),
  MAX_UPLOAD_BYTES: 10 * 1024 * 1024,
}))

import { formStrings, FORM_LANGS, splitMarked, thankYouHeading, type AnyFormLang, type FormStringKey } from '@/lib/formStrings'
import { TAX_FORM_KEYS, FORM_LOCALE_BLOCKS, formString } from '@/lib/form-i18n'
import { FORM_LANG_NAMES } from '@/lib/form-lang'
import { submitTaxForm, FIELD_LABELS, type TaxFormPayload } from '@/lib/submit-tax-form'
import { STEPS, OF } from '@/components/ui/FormStepper'
import { RESIDENCY_STEP_COPY } from '@/components/ui/ResidencyStep'
import { RESIDENCY_DECL_COPY } from '@/components/ui/ResidencyDeclaration'
import { RESIDENCY_FIX_COPY } from '@/components/ui/ResidencyFixPanel'
import { SVT_FORM_BRAND } from '@/components/svt/form-brand-svt'
import { WHT_FORM_BRAND } from '@/components/ui/form-brand-wht'
import { formText } from '@/components/ui/form-brand'

const ROOT = path.join(__dirname, '..', '..', '..')
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), 'utf8')
const NEW_LANGS = ['es', 'fr', 'it', 'pt', 'zh', 'vi'] as const

/** Every string a customer can be shown anywhere in the flow, with where it came from. */
function allFormStrings(): Array<[string, string]> {
  const out: Array<[string, string]> = []
  const walk = (where: string, v: unknown) => {
    if (typeof v === 'string') out.push([where, v])
    else if (Array.isArray(v)) v.forEach((x, i) => walk(`${where}[${i}]`, x))
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(`${where}.${k}`, x)
  }
  walk('formStrings', formStrings)
  walk('blocks', FORM_LOCALE_BLOCKS)
  walk('stepper', STEPS)
  for (const l of FORM_LANGS) out.push([`stepper.of.${l}`, OF[l](1, 3)])
  walk('fieldLabels', FIELD_LABELS)
  walk('residencyStep', RESIDENCY_STEP_COPY)
  walk('residencyDecl', RESIDENCY_DECL_COPY)
  walk('residencyFix', RESIDENCY_FIX_COPY)
  walk('svt.text', SVT_FORM_BRAND.text)
  walk('svt.residency', SVT_FORM_BRAND.residency?.copy)
  walk('langNames', FORM_LANG_NAMES)
  return out
}

describe('every form string key has all nine languages', () => {
  it('there are nine languages, in the picker order', () => {
    expect([...FORM_LANGS]).toEqual(['en', 'de', 'ja', 'es', 'fr', 'it', 'pt', 'zh', 'vi'])
  })

  it.each([...FORM_LANGS])('%s: every key of the flow resolves to a non-empty string', (lang) => {
    const empty = TAX_FORM_KEYS.filter((k) => !formString(k, lang).trim())
    expect(empty).toEqual([])
  })

  it('English, German and Japanese are written in formStrings for every key of the flow', () => {
    const missing: string[] = []
    for (const k of TAX_FORM_KEYS) {
      const entry = formStrings[k] as Record<string, string>
      for (const l of ['en', 'de', 'ja']) if (!entry[l] || !entry[l].trim()) missing.push(`${k}.${l}`)
    }
    expect(missing).toEqual([])
  })

  it.each([...NEW_LANGS])('%s: the language block has its own words for every key (not the English fallback)', (lang) => {
    const block = FORM_LOCALE_BLOCKS[lang] as Record<string, string>
    expect(Object.keys(block).sort()).toEqual([...TAX_FORM_KEYS].sort())
    expect(TAX_FORM_KEYS.filter((k) => !block[k] || !block[k].trim())).toEqual([])
    // Labels that are sentences must differ from English; codes and examples may match.
    const sentences: FormStringKey[] = ['whatsapp', 'waHint', 'bankStatementHint', 'selfieHint', 'successNextLead', 'invoicesRequired', 'englishOnlyNotice', 'linkUsedBody']
    for (const k of sentences) expect(`${k}: ${block[k]}`).not.toBe(`${k}: ${(formStrings[k] as { en: string }).en}`)
  })

  it('each new block says it was not checked by a native speaker', () => {
    for (const l of NEW_LANGS) {
      expect(read(`src/lib/form-i18n/${l}.ts`)).toContain('written by an agent, not checked by a native speaker (18 Nov 2026)')
    }
    expect(read('src/components/svt/form-residency-copy.ts').match(/written by an agent, not checked by a native speaker \(18 Nov 2026\)/g)!.length).toBeGreaterThanOrEqual(6)
  })

  it('every key the flow source uses is in the nine-language list', () => {
    const files = ['src/app/(site)/start/FormClient.tsx', 'src/lib/submit-tax-form.ts', 'src/components/ui/ResidencyDeclaration.tsx']
    const used = new Set<string>()
    for (const f of files) {
      const src = read(f)
      for (const m of src.matchAll(/\b(?:T|t|ph)\('([A-Za-z0-9]+)'\)/g)) used.add(m[1])
      for (const m of src.matchAll(/formText\(brand, '([A-Za-z0-9]+)'/g)) used.add(m[1])
    }
    expect(used.size).toBeGreaterThan(60)
    const known = new Set<string>(TAX_FORM_KEYS)
    expect([...used].filter((k) => !known.has(k)).sort()).toEqual([])
  })

  it('the inline language branches are gone from the form', () => {
    const form = read('src/app/(site)/start/FormClient.tsx')
    expect(form).not.toMatch(/lang === '(?:de|ja|zh|vi|es|fr|it|pt)'\s*\?/)
    expect(form).not.toMatch(/\bown\s*\?/)
  })

  it('the stepper, the server field names and the residency step exist in all nine', () => {
    for (const l of FORM_LANGS) {
      expect(STEPS[l]).toHaveLength(3)
      for (const s of STEPS[l]) expect(s.trim()).not.toBe('')
      expect(OF[l](2, 3)).toMatch(/2/)
      for (const [field, labels] of Object.entries(FIELD_LABELS)) expect(`${field}.${l}:${labels[l]}`).not.toBe(`${field}.${l}:`)
      const step = RESIDENCY_STEP_COPY[l]
      expect(step.titleAccent && step.intro && step.introEmph && step.quizIntro && step.sessionLost && step.sessionLostCta).toBeTruthy()
      expect(step.questions).toHaveLength(6)
      for (const v of Object.values(RESIDENCY_DECL_COPY[l])) expect(typeof v).toBe('string')
      expect(RESIDENCY_DECL_COPY[l].intro && RESIDENCY_DECL_COPY[l].confirmYes && RESIDENCY_DECL_COPY[l].confirmNo).toBeTruthy()
      for (const v of Object.values(RESIDENCY_FIX_COPY[l])) expect(v.trim()).not.toBe('')
    }
  })

  it('the student brand has its residency step in all nine, with four questions each', () => {
    const copy = SVT_FORM_BRAND.residency!.copy
    for (const l of FORM_LANGS) {
      const c = copy[l]!
      expect(c).toBeTruthy()
      expect(c.questions).toHaveLength(4)
      for (const [k, v] of Object.entries(c)) if (typeof v === 'string' && k !== 'titleLead' && k !== 'titleTail') expect(`${l}.${k}:${v.trim()}`).not.toBe(`${l}.${k}:`)
      // Students are never working holiday makers.
      expect(JSON.stringify(c)).not.toMatch(/working holiday|WHM|ワーキングホリデー|打工度假/i)
    }
  })
})

describe('a missing key falls back to English, never to an empty string', () => {
  it('a key that only English, German and Japanese carry is English in the other six', () => {
    for (const l of NEW_LANGS) {
      expect(formString('sectionSuper', l)).toBe('Super fund details')
      expect(formString('titleSuper', l)).toBe(formStrings.titleSuper.en)
    }
  })

  it('no key of formStrings resolves to an empty string in any language', () => {
    const empty: string[] = []
    for (const k of Object.keys(formStrings) as FormStringKey[]) for (const l of FORM_LANGS) if (!formString(k, l)) empty.push(`${k}.${l}`)
    expect(empty).toEqual([])
  })

  it('the brand lookup falls through an empty brand word to the shared one', () => {
    const brand = { text: { es: { thankYou: '' } } }
    expect(formText(brand, 'thankYou', 'es')).toBe('Gracias')
    expect(formText({ text: { zh: { thankYou: 'X' } } }, 'thankYou', 'zh')).toBe('X')
    expect(formText({}, 'sectionSuper', 'pt')).toBe('Super fund details')
  })

  it('the student brand keeps its own Chinese and Vietnamese words and gets the shared ones elsewhere', () => {
    expect(formText(SVT_FORM_BRAND, 'hasMedicare', 'zh')).toContain('OSHC')
    // Jo, 18 Nov: the OSHC note is a student answer, in every language, English included.
    for (const l of ['en', 'de', 'ja', 'es', 'fr', 'it', 'pt', 'zh', 'vi'] as const) {
      expect(formText(SVT_FORM_BRAND, 'hasMedicare', l)).toContain('OSHC')
      expect(formText(SVT_FORM_BRAND, 'phJob', l)).toContain('Delivery rider')
      expect(formText(WHT_FORM_BRAND, 'hasMedicare', l)).not.toContain('OSHC')
    }
    expect(formText(SVT_FORM_BRAND, 'hasMedicare', 'es').startsWith(FORM_LOCALE_BLOCKS.es.hasMedicare)).toBe(true)
    // A key the student tables never carried used to be English in Chinese.
    expect(formText(SVT_FORM_BRAND, 'invalidAuPhone', 'zh')).toBe(FORM_LOCALE_BLOCKS.zh.invalidAuPhone)
    expect(formText(WHT_FORM_BRAND, 'hasMedicare', 'zh')).not.toContain('OSHC')
  })
})

describe('wording rules, in every language', () => {
  const all = allFormStrings()

  it('collects the whole flow', () => {
    expect(all.length).toBeGreaterThan(1500)
  })

  it('no em dash, en dash, horizontal bar or figure dash in any form string', () => {
    const hits = all.filter(([, v]) => /[‒–—―⸺⸻]/.test(v)).map(([w, v]) => `${w}: ${v}`)
    expect(hits).toEqual([])
  })

  it('no forbidden job title in any form string', () => {
    const FORBIDDEN = /Steuerberater|税理士|expert[- ]comptable|commercialista|asesor(?:a)? fiscal|contador/i
    const hits = all.filter(([, v]) => FORBIDDEN.test(v)).map(([w, v]) => `${w}: ${v}`)
    expect(hits).toEqual([])
  })

  it('never says the business is a registered tax agent; the seal text names supervision', () => {
    const CLAIM = /\b(we are|we're) (a |an )?(registered )?tax agents?\b|wir sind .{0,20}tax agent|nous sommes .{0,20}(agent|tax agent)|siamo .{0,20}tax agent|somos .{0,20}(agente|tax agent)|我们是.{0,6}税务代理/i
    expect(all.filter(([, v]) => CLAIM.test(v)).map(([w]) => w)).toEqual([])
    const SUPERVISION = /supervis|Aufsicht|監督|监督|giám sát/i
    for (const l of FORM_LANGS) expect(`${l}: ${formString('registeredAgentNo', l)}`).toMatch(SUPERVISION)
  })

  it('never mentions AI or bots, and never promises a refund', () => {
    // "AI" is matched with its capitals only: French "J'ai" and Italian "ai fini" are ordinary words.
    const AI_CAPS = /\bAI\b|\bA\.I\.|\bIA\b|\bKI\b/
    const AI = /\bbots?\b|chatbot|artificial intelligence|künstliche Intelligenz|intelligence artificielle|inteligencia artificial|intelligenza artificiale|inteligência artificial|人工知能|人工智能|机器人|ロボット|trí tuệ nhân tạo/i
    expect(all.filter(([, v]) => AI_CAPS.test(v) || AI.test(v)).map(([w, v]) => `${w}: ${v}`)).toEqual([])
    const PROMISE = /guaranteed refund|you will (get|receive) (a |your )?refund|garantierte (Rück)?erstattung|remboursement garanti|rimborso garantit|devoluci[oó]n garantizad|reembolso garantid|restituição garantid|保证退税|chắc chắn (được )?hoàn thuế/i
    expect(all.filter(([, v]) => PROMISE.test(v)).map(([w, v]) => `${w}: ${v}`)).toEqual([])
  })

  it('names no brand in the shared words, so both brands can use them', () => {
    const blocks = JSON.stringify(FORM_LOCALE_BLOCKS)
    expect(blocks).not.toMatch(/Working Holiday Tax|Student Visa Tax|workingholidaytax|studentvisatax/i)
  })

  it('Australian terms stay in English where the customer will see them in Australia', () => {
    for (const l of FORM_LANGS) {
      expect(`${l}: ${formString('tfn', l)}`).toContain('TFN')
      expect(`${l}: ${formString('invalidTfn', l)}`).toContain('TFN')
      expect(`${l}: ${formString('bankStatementHint', l)}`).toContain('BSB')
      expect(`${l}: ${formString('hasMedicare', l)}`).toMatch(/Medicare/)
      expect(`${l}: ${RESIDENCY_DECL_COPY[l].intro}`).toContain('ATO')
    }
    // The six new languages name the ATO on the thank-you step (the older German line does not).
    for (const l of NEW_LANGS) expect(`${l}: ${formString('stepRefund', l)}`).toContain('ATO')
  })

  it('the "type your answers in English" notice exists in all nine and says English', () => {
    const ENGLISH = /English|Englisch|英語|inglés|anglais|inglese|inglês|英文|tiếng Anh/
    for (const l of FORM_LANGS) expect(`${l}: ${formString('englishOnlyNotice', l)}`).toMatch(ENGLISH)
    expect(read('src/app/(site)/start/FormClient.tsx')).toContain("T('englishOnlyNotice')")
  })

  it('placeholders and link markers are the same in every language', () => {
    const marks = (s: string) => (s.match(/\{\/?[a-z]+\}/g) ?? []).sort().join(' ')
    const bad: string[] = []
    for (const k of TAX_FORM_KEYS) {
      const want = marks((formStrings[k] as { en: string }).en)
      for (const l of FORM_LANGS) if (marks(formString(k, l)) !== want) bad.push(`${k}.${l}`)
      for (const brand of [SVT_FORM_BRAND]) for (const l of FORM_LANGS) if (marks(formText(brand, k, l)) !== want) bad.push(`svt:${k}.${l}`)
    }
    expect(bad).toEqual([])
    for (const l of FORM_LANGS) {
      expect(splitMarked(formString('declaration', l)).filter((p) => p.tag).map((p) => p.tag)).toEqual(['ca', 'pp'])
      expect(splitMarked(formString('expensesQuestion', l)).filter((p) => p.tag).map((p) => p.tag)).toEqual(['link'])
      for (const p of splitMarked(formString('declaration', l)).filter((x) => x.tag)) expect(p.text.trim()).not.toBe('')
    }
  })

  it('splitMarked returns plain text unchanged and keeps the order', () => {
    expect(splitMarked('plain')).toEqual([{ text: 'plain' }])
    expect(splitMarked('a {link}b{/link} c')).toEqual([{ text: 'a ' }, { text: 'b', tag: 'link' }, { text: ' c' }])
  })

  it('the thank-you line is punctuated for the language and English is unchanged', () => {
    expect(thankYouHeading('en', 'Thank you', 'Sam')).toBe('Thank you, Sam!')
    expect(thankYouHeading('es', 'Gracias', 'Ana')).toBe('¡Gracias, Ana!')
    expect(thankYouHeading('fr', 'Merci', 'Lou')).toBe('Merci, Lou !')
    expect(thankYouHeading('ja', 'ありがとうございます', 'Taro')).toBe('ありがとうございます、Taroさん！')
  })
})

describe('option VALUES are identical across languages', () => {
  const payload = (): TaxFormPayload => ({
    waNumber: '+61 400 000 111', auPhone: '0400 000 111',
    fullName: 'Test', lastName: 'Person', address: '1 Example St', email: 'test.person@example.invalid',
    country: 'Testland', dob: '1999-01-02', marital: 'Married', hasMedicare: 'no',
    tfn: '000000000', primaryJob: 'Barista', hasExpenses: 'no', hasOtherIncome: 'yes', otherIncomeText: 'interest',
    taxYears: ['2025-26'], howHeard: 'Instagram', refCode: '', declared: 'yes',
    bankStatement: null, selfiePassport: null, invoices: [],
  })
  const entries = (fd: FormData) => Object.fromEntries([...fd.entries()].filter(([k]) => k !== 'formLang').map(([k, v]) => [k, String(v)]))

  beforeEach(() => {
    fetchMock.mockReset()
    fetchMock.mockResolvedValue({ ok: true, json: () => Promise.resolve({ ok: true }) })
  })

  it.each(['resident', 'whm', 'foreign'] as const)('status %s: the body sent to the server is the same in all nine languages', async (status) => {
    const bodies: Record<string, Record<string, string>> = {}
    for (const l of FORM_LANGS) {
      fetchMock.mockClear()
      const res = await submitTaxForm(payload(), status, l)
      expect(res).toEqual({ ok: true })
      const call = fetchMock.mock.calls.find((c) => String(c[0]) === '/api/tax-form')!
      const fd = call[1].body as FormData
      expect(fd.get('formLang')).toBe(l)
      bodies[l] = entries(fd)
    }
    for (const l of FORM_LANGS) expect(bodies[l]).toEqual(bodies.en)
    expect(bodies.en.marital).toBe('Married')
    expect(bodies.en.hasMedicare).toBe('No')
    expect(bodies.en.hasExpenses).toBe('No')
    expect(bodies.en.hasOtherIncome).toBe('Yes')
    expect(bodies.en.declared).toBe('✓ I’ve read & agree to the Client Agreement & Privacy Policy.')
    expect(bodies.en.taxStatus).toBe(status === 'resident' ? 'Australian resident for tax purposes' : status === 'foreign' ? 'Foreign resident for tax purposes' : 'whm')
  })

  it('the form never uses a translated label as a radio or checkbox value', () => {
    const form = read('src/app/(site)/start/FormClient.tsx')
    expect(form).not.toMatch(/value=\{T\(/)
    expect(form).toContain("(['Single', 'Married'] as const)")
    expect(form).toContain("useState<'Single'|'Married'|''>('')")
    expect(form.match(/\(\['yes','no'\] as const\)/g)!.length).toBeGreaterThanOrEqual(2)
    const decl = read('src/components/ui/ResidencyDeclaration.tsx')
    expect(decl).toContain("{ val: 'resident', label:")
    expect(decl).toContain("{ val: 'whm',      label:")
    const fix = read('src/components/ui/ResidencyFixPanel.tsx')
    expect(fix).toContain("body: JSON.stringify({ k: token, status: pick })")
  })

  it('a server error is shown in the language on screen, never as an empty string', async () => {
    for (const l of FORM_LANGS as readonly AnyFormLang[]) {
      fetchMock.mockReset()
      fetchMock.mockResolvedValue({ ok: false, status: 429, json: () => Promise.resolve({}) })
      const res = await submitTaxForm(payload(), 'resident', l)
      expect(res).toEqual({ ok: false, error: formString('tooMany', l) })
      fetchMock.mockResolvedValue({ ok: false, status: 400, json: () => Promise.resolve({ error: 'invalid_fields', fields: [{ field: 'dob' }] }) })
      const res2 = await submitTaxForm(payload(), 'resident', l)
      expect(res2.ok).toBe(false)
      if (!res2.ok) expect(res2.error).toBe(`${formString('checkFields', l)}${FIELD_LABELS.dob[l]}`)
    }
  })
})
