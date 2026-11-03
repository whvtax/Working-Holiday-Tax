import { safeErr } from '@/lib/log-safe'

describe('safeErr', () => {
  it('drops PostgREST details and hint entirely', () => {
    const pg = { message: 'insert failed', code: '23502', details: 'Failing row contains (TASK-1, 123456782, 062692 81049952)', hint: 'x' }
    const out = safeErr(pg)
    expect(out).toContain('23502')
    expect(out).not.toMatch(/123456782|062692|Failing row/)
  })
  it('masks a failing row or key that is embedded in the message', () => {
    expect(safeErr(new Error('null value in column "tfn" violates not-null constraint. Failing row contains (a, 123 456 782, b)')))
      .not.toMatch(/123 456 782/)
    expect(safeErr({ message: 'duplicate key value. Key (email)=(someone@example.invalid) already exists.' }))
      .not.toMatch(/someone@example/)
    expect(safeErr({ message: 'invalid input syntax for type date: "31/02/1999"' })).not.toMatch(/1999/)
  })
  it('masks long digit runs and e-mail addresses anywhere in a message', () => {
    const out = safeErr(new Error('failed for 0412 345 678 and a@b.example BSB 062-692 acc 81049952'))
    expect(out).not.toMatch(/0412|345 678|a@b\.example|81049952|062-692/)
  })
  it('returns class, code and message only (no stack, no extra fields)', () => {
    const e = Object.assign(new TypeError('boom'), { code: 'E1', body: 'TFN 123456782', stack: 'at secret' })
    const out = safeErr(e)
    expect(out).toBe('TypeError code=E1: boom')
  })
  it('is bounded and total on odd input', () => {
    expect(safeErr(undefined)).toBe('unknown error')
    expect(safeErr('x'.repeat(5000)).length).toBeLessThanOrEqual(300)
    expect(safeErr(12345678901234)).toHaveLength(14)
    expect(() => safeErr({ message: { nested: 1 } })).not.toThrow()
  })
})

describe('error logging in data routes uses safeErr', () => {
  // Source pin: a whole error object (PostgrestError) must not be handed to console.
  const fs = require('fs'); const path = require('path')
  const root = path.join(__dirname, '..', '..', 'app', 'api')
  const files = [
    'abn-form/route.ts', 'tfn-form/route.ts', 'super-form/route.ts', 'tax-form/route.ts', 'tax-form/upload/route.ts',
    'crm/tasks/route.ts', 'crm/tasks/[id]/route.ts', 'crm/clients/route.ts', 'crm/clients/[id]/route.ts',
  ]
  it.each(files)('%s never logs a raw err', (f) => {
    const src: string = fs.readFileSync(path.join(root, f), 'utf8')
    expect(src).not.toMatch(/console\.error\([^)\n]*,\s*err\)/)
  })
})
