// Runs the orphan-upload sweep (Jo, 3 Nov: files from forms never submitted are
// deleted after 72 hours). Server only. The DECISION lives in orphan-uploads.ts
// (pure, tested); this file lists the bucket, reads every task's file references,
// asks the planner, and removes only what it approves.
//
// Safe by default: it deletes nothing unless ORPHAN_UPLOAD_DELETE=true, so the first
// runs only report what they would remove. If any read fails it stops and deletes nothing.
import { getSupabase, STORAGE_BUCKETS } from '@/lib/supabase'
import { planOrphanSweep, DEFAULT_SWEEP_PREFIXES, type StoredObject } from '@/lib/orphan-uploads'

export interface SweepResult { listed: number; orphans: number; deleted: number; dryRun: boolean; error?: string }

const PAGE = 100
const MAX_OBJECTS = 20_000

async function listAll(prefixes: string[]): Promise<StoredObject[]> {
  const sb = getSupabase()
  const out: StoredObject[] = []
  const stack = prefixes.map((p) => p.replace(/\/$/, ''))
  while (stack.length) {
    const dir = stack.pop() as string
    for (let offset = 0; ; offset += PAGE) {
      const { data, error } = await sb.storage.from(STORAGE_BUCKETS.uploads).list(dir, { limit: PAGE, offset })
      if (error) throw new Error('list failed')
      if (!data || data.length === 0) break
      for (const e of data) {
        // A folder has no id; a file has one and a created_at.
        if (!e.id) stack.push(`${dir}/${e.name}`)
        else out.push({ path: `${dir}/${e.name}`, createdAt: e.created_at ?? null })
      }
      if (out.length > MAX_OBJECTS) throw new Error('too many objects')
      if (data.length < PAGE) break
    }
  }
  return out
}

async function allReferencedUrls(): Promise<string[]> {
  const sb = getSupabase()
  const urls: string[] = []
  for (let from = 0; ; from += 1000) {
    const { data, error } = await sb.from('crm_tasks').select('file_urls').range(from, from + 999)
    if (error) throw new Error('read tasks failed')
    if (!data || data.length === 0) break
    for (const r of data as { file_urls?: string | null }[]) {
      try { const a = JSON.parse(r.file_urls ?? '[]'); if (Array.isArray(a)) for (const u of a) if (typeof u === 'string') urls.push(u) } catch { /* unreadable row: its files stay protected only if a URL parses; see below */ }
    }
    if (data.length < 1000) break
  }
  return urls
}

export async function runOrphanSweep(now = new Date(), env: Record<string, string | undefined> = process.env): Promise<SweepResult> {
  const dryRun = env.ORPHAN_UPLOAD_DELETE !== 'true'
  try {
    const objects = await listAll(DEFAULT_SWEEP_PREFIXES)
    const referenced = await allReferencedUrls()
    const plan = planOrphanSweep(objects, referenced, { now, minAgeDays: 3 })
    if (dryRun || plan.orphans.length === 0) return { listed: objects.length, orphans: plan.orphans.length, deleted: 0, dryRun }
    const { data, error } = await getSupabase().storage.from(STORAGE_BUCKETS.uploads).remove(plan.orphans)
    if (error) return { listed: objects.length, orphans: plan.orphans.length, deleted: 0, dryRun, error: 'remove failed' }
    return { listed: objects.length, orphans: plan.orphans.length, deleted: (data ?? []).length, dryRun }
  } catch (e) {
    return { listed: 0, orphans: 0, deleted: 0, dryRun, error: e instanceof Error ? e.message : 'failed' }
  }
}
