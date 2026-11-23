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
