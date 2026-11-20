import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadSvtLibrary } from '../library-svt'
import { countWords } from '../script/text'
import { validateScript } from '../script/validate'
import type { ScriptDraft, ValidationContext } from '../script/types'
import { workedExample } from './fixtures/worked-example'

const article = loadSvtLibrary().find(a => a.slug === 'tfn-vs-abn-international-students')!
const ctx = (over: Partial<ValidationContext> = {}): ValidationContext => ({
  articleText: article.text, articleCategory: article.category, previousHookType: null,
  recentCtaTypes: [], agentSignoffConfirmed: false, allowPrice: false, ...over,
})
const codes = (d: ScriptDraft, c = ctx()) => validateScript(d, c).map(i => i.code)
const mutate = (f: (d: ScriptDraft) => void) => { const d = workedExample(); f(d); return d }

test('word counting follows the bible', () => {
  assert.equal(countWords('Paid on an A-B-N? Listen.'), 7)
  assert.equal(countWords('So plan for your A-B-N tax.'), 8)
  assert.equal(countWords('Gave your boss your T-F-N?'), 7)
  assert.equal(countWords('"Not sure? Message us on WhatsApp."'), 6)
})

test('the worked example from bible section 19 passes every check', () => {
  assert.deepEqual(validateScript(workedExample(), ctx()), [])
})

const cases: Array<[string, (d: ScriptDraft) => void, string, Partial<ValidationContext>?]> = [
  ['long hook', d => { d.scenes[0].voice = 'If you work on an A-B-N, listen to this.' }, 'hook.long'],
  ['hook too late', d => { d.scenes[0].end = 3.5; d.scenes[1].start = 3.5 }, 'hook.late'],
  ['greeting', d => { d.scenes[0].voice = 'Hey guys, A-B-N pay?' }, 'compliance'],
  ['refund promise', d => { d.scenes[3].voice = 'Get your refund on your tax return.' }, 'compliance'],
  ['tax agent claim', d => { d.captions.instagram = d.captions.instagram.replace('Paid', 'We are registered tax agents. Paid') }, 'compliance'],
  ['residency usually', d => { d.scenes[3].voice = 'Students are usually residents for tax.' }, 'compliance'],
  ['other brand', d => { d.captions.tiktok += ' Working Holiday tips too.' }, 'compliance'],
  ['em dash', d => { d.scenes[2].visual = 'A phone — lit' }, 'compliance.dash'],
  ['asks for TFN', d => { d.scenes[7].voice = 'Comment your T-F-N below.'; d.ctaType = 'Comment' }, 'compliance'],
  ['Ella as a real person', d => { d.scenes[3].voice = 'I lodged mine on my tax return.' }, 'compliance'],
  ['two CTAs', d => { d.scenes[5].voice = 'Save this for tax time.' }, 'cta.early'],
  ['long CTA', d => { d.scenes[7].voice = 'Please send this to every friend who delivers food.' }, 'cta.long'],
  ['WhatsApp before sign-off', d => { d.ctaType = 'WhatsApp'; d.scenes[7].voice = 'Not sure? Message us on WhatsApp.' }, 'gate.agent'],
  ['WhatsApp on a super video', d => { d.ctaType = 'WhatsApp'; d.scenes[7].voice = 'Not sure? Message us on WhatsApp.' }, 'super.cta', { agentSignoffConfirmed: true, articleCategory: 'Super' }],
  ['comment CTA too often', d => { d.ctaType = 'Comment'; d.scenes[7].voice = 'Comment DONE when you have checked.' }, 'cta.frequency', { recentCtaTypes: ['Send', 'Comment'] }],
  ['same hook type twice', () => {}, 'hook.repeat', { previousHookType: 'If you' }],
  ['shot too long', d => { d.scenes[4].end = 18.5; d.scenes[5].start = 18.5 }, 'time.shot'],
  ['voice too fast', d => { d.scenes[1].voice = 'With A-B-N work, tax is usually not taken out of it.' }, 'time.pace'],
  ['too long without reason', d => { const last = d.scenes[7]; last.end = 37; last.start = 33.5; d.scenes[6].end = 33.5 }, 'time.target'],
  ['on-screen text too long', d => { d.scenes[1].onScreen = 'ABN: tax usually not taken out' }, 'screen.long'],
  ['digits in voice', d => { d.scenes[3].voice = 'Tax is 16 percent on your return.' }, 'voice.digits'],
  ['acronym not spelled', d => { d.scenes[6].voice = 'So plan for your ABN tax.' }, 'voice.acronym'],
  ['key term missing from payoff', d => { d.scenes[6].voice = 'So plan for that tax.'; d.scenes[6].onScreen = 'Plan for it' }, 'keyterm.payoff'],
  ['ungrounded claim', d => { d.claims[0].blogLine = 'Students never pay tax on delivery work' }, 'claim.ungrounded'],
  ['non official source', d => { d.claims[0].source = 'https://example.com/tax' }, 'claim.source'],
  ['missing disclaimer', d => { d.captions.tiktok = 'ABN pay. #abnincome' }, 'caption.disclaimer'],
  ['unapproved hashtag', d => { d.captions.tiktok += ' #taxhacks' }, 'caption.hashtag'],
  ['price when off', d => { d.captions.instagram += '\n$220 incl. GST' }, 'caption.price'],
  ['shot asks for a logo', d => { d.scenes[1].shotPrompt += '\nThe bag shows the ATO logo.' }, 'shot.ban'],
  ['shot misses a template line', d => { d.scenes[2].shotPrompt = d.scenes[2].shotPrompt.replace(/LIGHT:.*/, '') }, 'shot.template'],
  ['sync word not spoken', d => { d.scenes[4].syncWord = 'jar' }, 'shot.sync'],
  ['empty field', d => { d.scenes[2].continuity = '' }, 'field.empty'],
  ['say lodge not submit', d => { d.scenes[3].voice = 'Tax is worked out when you submit.' }, 'compliance'],
]

for (const [name, f, code, over] of cases) {
  test(`catches: ${name}`, () => {
    const got = codes(mutate(f), ctx(over))
    assert.ok(got.includes(code), `expected ${code}, got ${JSON.stringify(got)}`)
  })
}
