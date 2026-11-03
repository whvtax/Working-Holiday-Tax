/**
 * Round 2 (data): brand isolation inside db.ts lookups.
 *  - findExistingClient('wht') must not match an SVT client or task.
 *  - archiveTaskByPhone must only consider tasks of the caller's brand.
 * Synthetic rows only. A tiny in-memory PostgREST-like builder applies the
 * eq / neq / ilike filters the code asks for, so the test fails if a scope
 * filter is dropped.
 */
type Row = Record<string, unknown>
const tables: Record<string, Row[]> = {}
let brandColumnExists = true
const deleted: string[] = []

function builder(table: string) {
  let rows = () => (tables[table] ?? []).slice()
  const filters: Array<(r: Row) => boolean> = []
  let usesBrand = false
  const api: Record<string, unknown> = {}
  const like = (v: string) => {
    let out = ''
    for (let i = 0; i < v.length; i++) {
      const ch = v[i]
      if (ch === '\\' && i + 1 < v.length) { out += v[++i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); continue }
      out += ch === '%' ? '.*' : ch === '_' ? '.' : ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }
    return new RegExp('^' + out + '$', 'i')
  }
  api.select = () => api
  api.eq = (c: string, v: unknown) => { if (c === 'brand') usesBrand = true; filters.push(r => (r[c] ?? (c === 'brand' ? 'wht' : undefined)) === v); return api }
  api.neq = (c: string, v: unknown) => { if (c === 'brand') usesBrand = true; filters.push(r => (r[c] ?? 'wht') !== v); return api }
  api.ilike = (c: string, v: string) => { const re = like(v); filters.push(r => re.test(String(r[c] ?? ''))); return api }
  api.order = () => api
  api.range = (a: number, b: number) => run(a, b + 1)
  api.limit = (n: number) => run(0, n)
  api.maybeSingle = () => Promise.resolve({ data: rows().filter(r => filters.every(f => f(r)))[0] ?? null, error: null })
  api.insert = () => Promise.resolve({ error: null })
  api.update = () => ({ eq: () => Promise.resolve({ error: null }) })
  api.delete = () => ({ eq: (_c: string, v: string) => { deleted.push(v); return Promise.resolve({ error: null }) } })
  function run(a: number, b: number) {
    if (usesBrand && !brandColumnExists) return Promise.resolve({ data: null, error: { message: 'column crm_tasks.brand does not exist' } })
    return Promise.resolve({ data: rows().filter(r => filters.every(f => f(r))).slice(a, b), error: null })
  }
  return api
}
jest.mock('@/lib/supabase', () => ({ getSupabase: () => ({ from: (t: string) => builder(t) }) }))
jest.mock('@/lib/upload', () => ({ deleteFiles: jest.fn(async () => ({ ok: true, deleted: [] })) }))

import { findExistingClient, archiveTaskByPhone } from '@/lib/db'

beforeEach(() => {
  brandColumnExists = true
  deleted.length = 0
  tables.crm_clients = [
    { id: 'CLT-SVT', email: 'student@example.invalid', whatsapp: '+61400000001', brand: 'svt' },
    { id: 'CLT-WHT', email: 'backpacker@example.invalid', whatsapp: '+61400000002', brand: 'wht' },
    { id: 'CLT-OLD', email: 'legacy@example.invalid', whatsapp: '+61400000003' }, // no brand value: reads as wht
  ]
  tables.crm_tasks = []
})

describe('findExistingClient brand scope', () => {
  it('WHT submission does not match an SVT client (email)', async () => {
    expect(await findExistingClient('Student@Example.invalid', '', 'wht')).toBeNull()
  })
  it('WHT submission does not match an SVT client (phone)', async () => {
    expect(await findExistingClient('', '+61400000001', 'wht')).toBeNull()
  })
  it('WHT submission does not match an SVT pending task either', async () => {
    tables.crm_tasks = [{ id: 'T1', client_id: 'CLT-SVT', email: 'x@example.invalid', whatsapp: '+61400000009', done: false, brand: 'svt' }]
    expect(await findExistingClient('x@example.invalid', '', 'wht')).toBeNull()
  })
  it('WHT still matches WHT clients, including legacy rows', async () => {
    expect(await findExistingClient('backpacker@example.invalid', '', 'wht')).toEqual({ id: 'CLT-WHT' })
    expect(await findExistingClient('legacy@example.invalid', '', 'wht')).toEqual({ id: 'CLT-OLD' })
  })
  it('SVT matches only SVT', async () => {
    expect(await findExistingClient('student@example.invalid', '', 'svt')).toEqual({ id: 'CLT-SVT' })
    expect(await findExistingClient('backpacker@example.invalid', '', 'svt')).toBeNull()
  })
  it('LIKE wildcards in input never widen the match', async () => {
    expect(await findExistingClient('%@%', '', 'wht')).toBeNull()
    expect(await findExistingClient('_', '', 'wht')).toBeNull()
  })
  it('WHT falls back to the old unscoped lookup when the brand column is missing (047 not run)', async () => {
    brandColumnExists = false
    expect(await findExistingClient('backpacker@example.invalid', '', 'wht')).toEqual({ id: 'CLT-WHT' })
  })
  it('SVT never widens when the lookup errors', async () => {
    brandColumnExists = false
    expect(await findExistingClient('backpacker@example.invalid', '', 'svt')).toBeNull()
  })
})

describe('archiveTaskByPhone brand scope', () => {
  const task = (id: string, brand: string | undefined, done: boolean) => ({ id, whatsapp: '+61 400 000 111', done, brand, created_at: '2026-10-01', file_urls: '[]', notes: '', client_id: 'CLT-X', client_name: 'Test Person', task_type: 'tax-return', tax_year: '2025-26' })
  beforeEach(() => {
    // deleteTaskAndArchive reads the task with eq('id').maybeSingle(); with no row it returns early.
    tables.crm_tasks = [task('TASK-SVT', 'svt', true), task('TASK-WHT', 'wht', true)]
  })
  it('a WHT lodged action never selects the SVT card with the same number', async () => {
    const id = await archiveTaskByPhone('+61400000111', 'wht')
    expect(id).toBe('TASK-WHT')
    expect(deleted).toEqual(['TASK-WHT'])
  })
  it('an SVT lodged action never selects the WHT card', async () => {
    const id = await archiveTaskByPhone('+61400000111', 'svt')
    expect(id).toBe('TASK-SVT')
  })
  it('WHT with only an SVT card finds nothing', async () => {
    tables.crm_tasks = [task('TASK-SVT', 'svt', true)]
    expect(await archiveTaskByPhone('+61400000111', 'wht')).toBeNull()
  })
  it('default brand is wht', async () => {
    tables.crm_tasks = [task('TASK-SVT', 'svt', true)]
    expect(await archiveTaskByPhone('+61400000111')).toBeNull()
  })
})
