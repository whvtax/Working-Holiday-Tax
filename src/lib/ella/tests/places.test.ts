import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CBD_SEARCHES, PLACES_KEY, cbdPlaces, createWithPlace, inCbd, parseIds, pickPlace } from '../publish/places'

const store = () => { const s: Record<string, unknown> = {}; return { s, settings: async (k: string[]) => Object.fromEntries(k.map(x => [x, s[x]])), setSettings: async (v: Record<string, unknown>) => { Object.assign(s, v) } } }
const NOW = Date.parse('2026-11-23T00:00:00Z')

test('only map points inside Sydney CBD count', () => {
  assert.ok(inCbd(-33.8731, 151.2065), 'Town Hall')
  assert.ok(inCbd(-33.8612, 151.2108), 'Circular Quay')
  assert.ok(!inCbd(-33.8908, 151.2743), 'Bondi is out')
  assert.ok(!inCbd(-33.8150, 151.0011), 'Parramatta is out')
})

test('Ella finds CBD places by herself, keeps only those inside the CBD, and saves them for 30 days', async () => {
  let calls = 0
  const graph = { get: async <T,>(path: string, p: Record<string, string>) => {
    calls++
    assert.equal(path, 'pages/search')
    const data = p.q === 'Sydney Town Hall'
      ? [{ id: '111', name: 'Sydney Town Hall', location: { latitude: -33.8731, longitude: 151.2065 } }, { id: '999', name: 'Town Hall Hotel Newtown', location: { latitude: -33.8975, longitude: 151.1793 } }]
      : p.q === 'Circular Quay' ? [{ id: '222', name: 'Circular Quay', location: { latitude: -33.8612, longitude: 151.2108 } }] : []
    return { data } as T
  } }
  const st = store()
  const a = await cbdPlaces(st, graph, '', NOW)
  assert.deepEqual(a.places.map(x => x.id).sort(), ['111', '222'])
  assert.equal(calls, CBD_SEARCHES.length)
  const b = await cbdPlaces(st, graph, '', NOW + 86400_000)
  assert.deepEqual(b.places.map(x => x.id).sort(), ['111', '222'])
  assert.equal(calls, CBD_SEARCHES.length, 'the saved list is used, no new search')
  assert.ok(st.s[PLACES_KEY])
})

test('places typed in Settings win; a token that may not search gives no place and says why', async () => {
  const refuse = { get: async () => { throw new Error("Meta: (#10) This endpoint requires the 'pages_read_engagement' permission") } }
  const typed = await cbdPlaces(store(), refuse, '123456789, 987654321', NOW)
  assert.deepEqual(typed.places.map(x => x.id), ['123456789', '987654321'])
  const none = await cbdPlaces(store(), refuse, '', NOW)
  assert.deepEqual(none.places, [])
  assert.match(none.error ?? '', /pages_read_engagement/)
})

test('one place at random; ids are cleaned', () => {
  const places = [{ id: '1', name: 'a' }, { id: '2', name: 'b' }, { id: '3', name: 'c' }]
  assert.equal(pickPlace(places, () => 0)!.id, '1')
  assert.equal(pickPlace(places, () => 0.99)!.id, '3')
  assert.equal(pickPlace([]), null)
  assert.deepEqual(parseIds(' 123456, x,  654321 654321 '), ['123456', '654321'])
})

test('a place never blocks a Reel: if Instagram refuses it, the Reel is created again without one', async () => {
  const sent: Array<string | undefined> = [], refused: string[] = []
  const create = async (loc?: string) => { sent.push(loc); if (loc) throw new Error('Meta: Invalid location'); return 'CONT1' }
  const r = await createWithPlace(create, { id: '111', name: 'Town Hall' }, async e => { refused.push(e) })
  assert.deepEqual(r, { containerId: 'CONT1', place: null })
  assert.deepEqual(sent, ['111', undefined])
  assert.match(refused[0], /Invalid location/)
  const ok = await createWithPlace(async loc => `C-${loc}`, { id: '222', name: 'Quay' }, async () => { throw new Error('not called') })
  assert.deepEqual(ok, { containerId: 'C-222', place: { id: '222', name: 'Quay' } })
})
