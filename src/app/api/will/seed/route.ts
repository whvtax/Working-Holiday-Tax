// Seed / sync for the Supabase-backed store: populates the message Library
// (will_templates) from the approved corpus.
//
//  - First run (table empty): inserts every seeded template.
//  - Plain re-run (idempotent): adds only entries whose key is missing, never
//    overwriting anything the owner edited.
//  - Sync mode ({ overwrite: true }): the code (approved-messages.ts, via
//    seedTemplates()) is the source of truth. Every seeded template whose body
//    in the DB differs is UPDATED to match the code, and any missing key is
//    added. This is the templates twin of the knowledge "Sync library from
//    file" flow, and it is what makes "edit the wording in code, deploy, click
//    Sync" actually reach Will, whose opening/price/objection messages live in
//    the DB, not in this file. Owner-added custom templates (a key not in the
//    seed set) are never touched.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { seedTemplates, backfillMissingTemplates, syncTemplatesFromCode } from '@/lib/will/seed';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });

  // Body is optional; tolerate an empty or malformed one (a plain seed click
  // sends nothing). Only { overwrite: true } switches on sync mode.
  let overwrite = false;
  try {
    const raw = await req.text();
    if (raw) overwrite = JSON.parse(raw)?.overwrite === true;
  } catch { /* no body: plain seed */ }

  const store = getStore();
  const existing = await store.listTemplates();

  if (existing.length === 0) {
    // Fresh install: insert the whole seed set.
    const rows = seedTemplates().map((t) => ({
      id: t.id, key: t.key, category: t.category, title: t.title, body: t.body,
      requires_meta: t.requiresMeta, versions: t.versions, updated_at: t.updatedAt,
    }));
    const { error } = await getSupabase().from('will_templates').insert(rows);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, seeded: rows.length, updated: 0, backfilled: 0 });
  }

  if (overwrite) {
    // Sync mode: bring every seeded key's body in the DB up to the code.
    const { updated, added, removed, keys } = await syncTemplatesFromCode(store);
    return NextResponse.json({
      ok: true, seeded: 0, updated, backfilled: added, removed, keys,
      note: updated || added || removed ? 'templates synced from code' : 'templates already match code',
    });
  }

  // Plain re-run: add only missing keys, never overwrite an edited one.
  const backfilled = await backfillMissingTemplates(store);
  return NextResponse.json({
    ok: true, seeded: 0, updated: 0, backfilled: backfilled.length, keys: backfilled,
    note: backfilled.length ? 'templates already present; missing entries added' : 'templates already present',
  });
}
