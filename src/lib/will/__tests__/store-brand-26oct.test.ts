/**
 * Decision 004, customer store:
 *  - create: brand written only for SVT (WHT insert unchanged);
 *  - lookups by number filter by brand ONLY once the SVT line is on (the
 *    column exists only after migration 047, and before the line is on every
 *    customer is WHT anyway).
 */
const calls: Array<[string, unknown[]]> = []
const inserted: Array<Record<string, unknown>> = []
function chain(): Record<string, unknown> {
  const c: Record<string, unknown> = {}
  for (const m of ['select', 'eq', 'in', 'limit', 'order', 'not', 'gt', 'range']) c[m] = (...a: unknown[]) => { calls.push([m, a]); return c }
  c.maybeSingle = async () => ({ data: null, error: null })
  c.single = async () => ({ data: { id: 'new', wa_id: '614', state: 'NEW_LEAD', ...inserted[inserted.length - 1] }, error: null })
  c.then = (res: (v: unknown) => unknown) => Promise.resolve({ data: [], error: null }).then(res)
  c.insert = (row: Record<string, unknown>) => { inserted.push(row); return c }
  return c
}
jest.mock('@/lib/supabase', () => ({ getSupabase: () => ({ from: () => chain() }) }))

import { SupabaseStore } from '@/lib/will/store-supabase'
import { withBrand } from '@/lib/will/brand-context'

const env = process.env
beforeEach(() => { calls.length = 0; inserted.length = 0; process.env = { ...env }; delete process.env.SVT_WHATSAPP_PHONE_NUMBER_ID })
afterAll(() => { process.env = env })
const brandFilters = () => calls.filter(([m, a]) => m === 'eq' && a[0] === 'brand')

it('before the SVT line is on: no brand filter, WHT insert has no brand field', async () => {
  const s = new SupabaseStore()
  await s.getCustomerByWaId('61400000001')
  await s.findCustomerByPhone('0400 000 001')
  expect(brandFilters()).toEqual([])
  await s.createCustomer({ waId: '61400000001' })
  expect('brand' in inserted[0]).toBe(false)
})

it('once the line is on: lookups are per brand', async () => {
  process.env.SVT_WHATSAPP_PHONE_NUMBER_ID = 'SVT_ID'
  const s = new SupabaseStore()
  await s.getCustomerByWaId('61400000001')
  await withBrand('svt', () => s.getCustomerByWaId('61400000001'))
  await withBrand('svt', () => s.findCustomerByPhone('0400 000 001'))
  expect(brandFilters().map(([, a]) => a[1])).toEqual(['wht', 'svt', 'svt'])
})

it('a customer created in the SVT context is SVT', async () => {
  const s = new SupabaseStore()
  const c = await withBrand('svt', () => s.createCustomer({ waId: '61400000001' }))
  expect(inserted[0].brand).toBe('svt')
  expect(c.brand).toBe('svt')
})

it('CRM chat list brand filter: ignored before the line is on, applied after', async () => {
  const s = new SupabaseStore()
  await s.listChatPage(0, 10, { brand: 'svt' })
  expect(brandFilters()).toEqual([])
  process.env.SVT_WHATSAPP_PHONE_NUMBER_ID = 'SVT_ID'
  await s.listChatPage(0, 10, { brand: 'svt' })
  expect(brandFilters()).toEqual([['eq', ['brand', 'svt']]])
  calls.length = 0
  await s.listChatPage(0, 10, {})
  expect(brandFilters()).toEqual([])
})
