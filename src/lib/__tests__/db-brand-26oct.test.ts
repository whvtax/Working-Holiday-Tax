/**
 * Decision 003: crm_tasks carries the brand. WHT inserts must stay exactly
 * as they were (so WHT works before and after migration 047), SVT inserts
 * add brand = 'svt', and reading a row without the column gives 'wht'.
 */
const inserted: Array<Record<string, unknown>> = []
let selectRows: Array<Record<string, unknown>> = []

jest.mock('@/lib/supabase', () => ({
  getSupabase: () => ({
    from: () => ({
      insert: (row: Record<string, unknown>) => { inserted.push(row); return Promise.resolve({ error: null }) },
      select: () => ({ eq: () => ({ maybeSingle: () => Promise.resolve({ data: selectRows[0] ?? null, error: null }), single: () => Promise.resolve({ data: selectRows[0] ?? null, error: null }) }) }),
    }),
  }),
}))
jest.mock('@/lib/upload', () => ({ deleteFiles: jest.fn() }))

import { createTask, getTask } from '@/lib/db'

const base = {
  clientId: 'CLT-1', clientName: 'Test Person', taskType: 'tax-return' as const, whatsapp: '+61400000000', email: 't@example.invalid',
  country: 'VN', dob: '2000-01-01', taxYear: '2025-26', submittedAt: '2026-10-26T00:00:00Z', address: '', tfn: '', bankDetails: '',
  primaryJob: '', marital: '', taxStatus: '', howHeard: '', auPhone: '', notes: '', fileUrls: [], reviewStatus: 'pending' as const,
  reviewerNote: '', reviewedAt: '',
}

beforeEach(() => { inserted.length = 0; selectRows = [] })

it('a WHT task is inserted without a brand field (unchanged row)', async () => {
  await createTask(base)
  await createTask({ ...base, brand: 'wht' })
  expect(inserted).toHaveLength(2)
  for (const row of inserted) expect('brand' in row).toBe(false)
})

it('an SVT task is inserted with brand = svt', async () => {
  await createTask({ ...base, brand: 'svt' })
  expect(inserted[0].brand).toBe('svt')
})

it('reading a row: missing or unknown brand is wht, svt stays svt', async () => {
  selectRows = [{ id: 'TASK-1' }]
  expect((await getTask('TASK-1'))?.brand).toBe('wht')
  selectRows = [{ id: 'TASK-1', brand: 'nonsense' }]
  expect((await getTask('TASK-1'))?.brand).toBe('wht')
  selectRows = [{ id: 'TASK-1', brand: 'svt' }]
  expect((await getTask('TASK-1'))?.brand).toBe('svt')
})
