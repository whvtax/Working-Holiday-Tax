import { test } from 'node:test'
import assert from 'node:assert/strict'
import { FULL_DISCLAIMER, captionWords, finishCaption } from '../script/captions'

test('the place is tagged by Instagram, never written in the caption (Jo, Nov 23)', () => {
  const c = finishCaption('Binned your farm work receipts?\n\n\u{1F4CD} Sydney CBD\n\nKeep a photo of each one. #studentvisa')
  assert.ok(!c.includes('Sydney CBD'), c)
  assert.equal(finishCaption(c), c, 'finishing a caption again changes nothing')
  assert.ok(c.includes(FULL_DISCLAIMER))
})

test('caption length counts only the words Ella writes: not the note, the hashtags or emojis', () => {
  const c = finishCaption('Can students on a 500 visa claim work boots? \u{1F97E}\n\nUsually yes, if you buy them only for your job. #studentvisa')
  assert.equal(captionWords(c), 19)
})

test('emojis are counted (Jo, Nov 23: 3 or 4 in every caption)', async () => {
  const { captionEmojis } = await import('../script/captions')
  assert.equal(captionEmojis('Flying with cash? \u{2708}\u{FE0F}\n\nDeclare it \u{1F4B5}\n\nSend this \u{1F4E9}'), 3)
  assert.equal(captionEmojis('No emojis here.'), 0)
})

test('captions: every post ends its call to action with the WhatsApp number (Mia), once, in English', async () => {
  const { WHATSAPP_CAPTION_LINE } = await import('../script/captions')
  assert.equal(WHATSAPP_CAPTION_LINE, 'WhatsApp: +61 431 667 124')
  const c = finishCaption('Paid on an ABN? \u{1F9FE}\n\nTax is usually not taken out.\n\nSave this for tax time. \u{1F4CC}\nWhatsApp: +61431667124 #studentvisa')
  assert.equal(c.split('WhatsApp:').length, 2, 'exactly one WhatsApp line')
  assert.match(c, /\u{1F4CC}\nWhatsApp: \+61 431 667 124\n\n/u, 'right under the call to action, before the note')
  assert.equal(finishCaption(c), c)
  assert.equal(captionWords(c), captionWords(c.replace(/\nWhatsApp:[^\n]*/, '')), 'the line does not count toward the 40 to 50 words')
})
