import { planOrphanSweep, storagePathFromUrl } from '@/lib/orphan-uploads'

const now = new Date('2026-11-02T00:00:00Z')
const base = 'https://abc.supabase.co/storage/v1/object/public/uploads/'
const old = '2026-09-01T00:00:00Z'

describe('planOrphanSweep (synthetic paths only)', () => {
  it('marks an old unreferenced public-form upload as an orphan', () => {
    const p = planOrphanSweep([{ path: 'tax-form/selfie/1-a.jpg', createdAt: old }], [], { now })
    expect(p.orphans).toEqual(['tax-form/selfie/1-a.jpg'])
  })
  it('keeps anything referenced by a task, in any URL spelling or encoding', () => {
    const objs = [
      { path: 'tax-form/selfie/1-a.jpg', createdAt: old },
      { path: 'svt/tax-form/bank/2-b c.pdf', createdAt: old },
      { path: 'tax-form/x/3-c.jpg', createdAt: old },
    ]
    const refs = [
      base + 'tax-form/selfie/1-a.jpg',
      'https://abc.supabase.co/storage/v1/object/sign/uploads/svt/tax-form/bank/2-b%20c.pdf?token=zzz',
      'https://abc.supabase.co/storage/v1/object/uploads/tax-form/x/3-c.jpg',
    ]
    const p = planOrphanSweep(objs, refs, { now })
    expect(p.orphans).toEqual([])
    expect(p.kept.every(k => k.reason === 'referenced')).toBe(true)
  })
  it('keeps young objects (form may still be open)', () => {
    const p = planOrphanSweep([{ path: 'tax-form/a.jpg', createdAt: '2026-10-25T00:00:00Z' }], [], { now })
    expect(p.orphans).toEqual([]); expect(p.kept[0].reason).toBe('too_young')
  })
  it('never touches folders outside the public-form prefixes', () => {
    const objs = ['tfn-form/CLT-1/passport.jpg', 'bank/x.pdf', 'abn-form/a.pdf', 'super-form/a.pdf', 'tax-form-evil/a.jpg', 'other/tax-form/a.jpg']
      .map(path => ({ path, createdAt: old }))
    const p = planOrphanSweep(objs, [], { now })
    expect(p.orphans).toEqual([])
  })
  it('refuses traversal-looking or malformed paths even under a good prefix', () => {
    const objs = ['tax-form/../tfn-form/a.jpg', '/tax-form/a.jpg', 'tax-form//a.jpg', 'tax-form\\a.jpg'].map(path => ({ path, createdAt: old }))
    expect(planOrphanSweep(objs, [], { now }).orphans).toEqual([])
  })
  it('unknown or invalid age is kept, not deleted', () => {
    const p = planOrphanSweep([{ path: 'tax-form/a.jpg' }, { path: 'tax-form/b.jpg', createdAt: 'garbage' }], [], { now })
    expect(p.orphans).toEqual([]); expect(p.kept.map(k => k.reason)).toEqual(['unknown_age', 'unknown_age'])
  })
  it('caps a run', () => {
    const objs = Array.from({ length: 10 }, (_, i) => ({ path: `tax-form/f${i}.jpg`, createdAt: old }))
    const p = planOrphanSweep(objs, [], { now, maxPerRun: 3 })
    expect(p.orphans).toHaveLength(3); expect(p.kept.filter(k => k.reason === 'over_cap')).toHaveLength(7)
  })
  it('an empty reference list with unparseable URLs does not make everything look unreferenced by accident', () => {
    // A reference we cannot parse cannot protect anything: the CALLER must treat a
    // parse failure as "abort the sweep". The planner reports it via storagePathFromUrl.
    expect(storagePathFromUrl('https://evil.example/x')).toBeNull()
    expect(storagePathFromUrl(base + '%E0%A4%A')).toBeNull()
  })
})
