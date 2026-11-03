/**
 * PROPOSED test for security-assessment/proposals/retention-and-deletion/P1.
 * Copy to src/lib/__tests__/ together with the patch to db.ts.
 */
type Row = Record<string, unknown>
const state = { tasks: [] as Row[], clients: [] as Row[], deletedTaskIds: [] as string[], inserted: [] as Row[] }
const deleteFiles = jest.fn()

function from(table: string) {
  const api: Record<string, unknown> = {}
  let id: unknown
  api.select = () => api
  api.eq = (_c: string, v: unknown) => { id = v; return api }
  api.maybeSingle = () => Promise.resolve({ data: ((table === 'crm_tasks' ? state.tasks : state.clients).find(r => r.id === id) ?? null), error: null })
  api.insert = (r: Row) => { state.inserted.push(r); return Promise.resolve({ error: null }) }
  api.update = () => ({ eq: () => Promise.resolve({ error: null }) })
  api.delete = () => ({ eq: (_c: string, v: string) => { state.deletedTaskIds.push(v); return Promise.resolve({ error: null }) } })
  return api
}
jest.mock('@/lib/supabase', () => ({ getSupabase: () => ({ from }) }))
jest.mock('@/lib/upload', () => ({ deleteFiles: (...a: unknown[]) => deleteFiles(...a) }))

import { deleteTaskAndArchive } from '@/lib/db'

const task = (over: Row = {}) => ({
  id: 'TASK-1', client_id: 'CLT-1', client_name: 'Test Person', task_type: 'tax-return', tax_year: '2025-26', done: false,
  notes: '', file_urls: JSON.stringify(['https://abc.supabase.co/storage/v1/object/public/uploads/tax-form/selfie/1-a.jpg']), ...over,
})

beforeEach(() => { state.tasks = [task()]; state.clients = []; state.deletedTaskIds = []; state.inserted = []; deleteFiles.mockReset() })

it('deletes the documents, then the row', async () => {
  deleteFiles.mockResolvedValue({ ok: true, deleted: ['tax-form/selfie/1-a.jpg'] })
  await deleteTaskAndArchive('TASK-1')
  expect(deleteFiles).toHaveBeenCalledTimes(1)
  expect(state.deletedTaskIds).toEqual(['TASK-1'])
})
it('keeps the row when the documents cannot be deleted (the row is the only pointer to them)', async () => {
  deleteFiles.mockResolvedValue({ ok: false, deleted: [], error: 'storage down' })
  await expect(deleteTaskAndArchive('TASK-1')).rejects.toThrow(/task was kept/)
  expect(state.deletedTaskIds).toEqual([])
})
it('a Done task (file_urls already empty) never calls storage', async () => {
  state.tasks = [task({ done: true, file_urls: '[]' })]
  await deleteTaskAndArchive('TASK-1')
  expect(deleteFiles).not.toHaveBeenCalled()
  expect(state.deletedTaskIds).toEqual(['TASK-1'])
})
it('an unknown task id is a no-op', async () => {
  await deleteTaskAndArchive('TASK-NOPE')
  expect(deleteFiles).not.toHaveBeenCalled(); expect(state.deletedTaskIds).toEqual([])
})
