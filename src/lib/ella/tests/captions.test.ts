import { test } from 'node:test'
import assert from 'node:assert/strict'
import { FULL_DISCLAIMER, LOCATION_LINE, finishCaption } from '../script/captions'

test('every caption carries the Sydney CBD line once, before the note and the hashtags (Jo, Nov 23)', () => {
  const once = finishCaption('Binned your farm work receipts?\n\nKeep a photo of each one. #studentvisa')
  const twice = finishCaption(once)
  assert.equal(twice, once, 'finishing a caption again changes nothing')
  assert.equal(once.split(LOCATION_LINE).length - 1, 1)
  const parts = once.split('\n\n')
  const at = parts.indexOf(LOCATION_LINE)
  assert.ok(at > 0 && parts[at + 1] === FULL_DISCLAIMER, once)
})
