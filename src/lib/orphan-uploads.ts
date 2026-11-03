// src/lib/orphan-uploads.ts
// ──────────────────────────────────────────────────────────────────────────
// Pure planner for abandoned pre-submit uploads.
//
// The tax form uploads documents BEFORE the task exists (submit-tax-form.ts),
// so a customer who uploads a passport photo and never presses Submit leaves
// an object in the private bucket that no crm_tasks.file_urls row points at.
// Nothing ever deletes it.
//
// STATUS: PROPOSAL CODE. This function only DECIDES; it performs no storage or
// database call and nothing imports it yet. The runner that lists the bucket,
// reads file_urls and (after human review) removes objects is described in
// security-assessment/proposals/retention-and-deletion/.
//
// Safety rules it enforces (each has a test):
//   1. Only objects under the public-form prefixes are ever candidates. Staff and
//      form uploads that other tables might reference (tfn-form/, abn-form/,
//      super-form/, bank/, anything else) are never touched.
//   2. An object younger than minAgeDays is kept: the customer may still be
//      filling in the form (the form can stay open for days on a phone).
//   3. An object referenced by ANY task, done or pending, is kept. References are
//      compared on the decoded storage path, not the raw URL string.
//   4. Objects with no usable creation time are kept (unknown age is not old).
//   5. A per-run cap bounds the blast radius of a bug in the caller.
// ──────────────────────────────────────────────────────────────────────────

export interface StoredObject { path: string; createdAt?: string | null }

export interface SweepOptions {
  now: Date
  /** Default 14 days. Lower values risk deleting a form still being filled in. */
  minAgeDays?: number
  /** Default: the two public-form folders. */
  prefixes?: string[]
  /** Default 200. */
  maxPerRun?: number
}

export interface SweepPlan {
  orphans: string[]
  kept: { path: string; reason: 'outside_prefix' | 'too_young' | 'referenced' | 'unknown_age' | 'over_cap' }[]
}

export const DEFAULT_SWEEP_PREFIXES = ['tax-form/', 'svt/tax-form/']

/** The storage path inside the uploads bucket, from any of the three URL spellings. */
export function storagePathFromUrl(url: string, bucket = 'uploads'): string | null {
  if (typeof url !== 'string') return null
  const m = new RegExp(`/storage/v1/object/(?:public/|sign/)?${bucket}/([^?#]+)`).exec(url)
  if (!m) return null
  try { return decodeURIComponent(m[1]) } catch { return null }
}

function safePath(p: string): boolean {
  return !!p && !p.startsWith('/') && !p.includes('\\') && !p.split('/').some(seg => seg === '..' || seg === '.' || seg === '')
}

export function planOrphanSweep(objects: StoredObject[], referencedUrls: string[], opts: SweepOptions): SweepPlan {
  const minAgeMs = (opts.minAgeDays ?? 14) * 86_400_000
  const prefixes = opts.prefixes ?? DEFAULT_SWEEP_PREFIXES
  const cap = opts.maxPerRun ?? 200
  const referenced = new Set<string>()
  for (const u of referencedUrls) {
    const p = storagePathFromUrl(u)
    if (p) referenced.add(p)
  }
  const plan: SweepPlan = { orphans: [], kept: [] }
  for (const o of objects) {
    if (!safePath(o.path) || !prefixes.some(pre => o.path.startsWith(pre))) { plan.kept.push({ path: o.path, reason: 'outside_prefix' }); continue }
    if (referenced.has(o.path)) { plan.kept.push({ path: o.path, reason: 'referenced' }); continue }
    const t = o.createdAt ? Date.parse(o.createdAt) : NaN
    if (!Number.isFinite(t)) { plan.kept.push({ path: o.path, reason: 'unknown_age' }); continue }
    if (opts.now.getTime() - t < minAgeMs) { plan.kept.push({ path: o.path, reason: 'too_young' }); continue }
    if (plan.orphans.length >= cap) { plan.kept.push({ path: o.path, reason: 'over_cap' }); continue }
    plan.orphans.push(o.path)
  }
  return plan
}
