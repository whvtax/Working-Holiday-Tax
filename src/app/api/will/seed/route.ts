// One-time seed for the Supabase-backed store: populates the message Library
// (will_templates) from the approved corpus if it's empty. Idempotent — running
// it again does nothing once templates exist. Call once after the first deploy.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { seedTemplates } from '@/lib/will/seed';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST() {
  if (!sessionValid()) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const existing = await getStore().listTemplates();
  if (existing.length > 0) {
    return NextResponse.json({ ok: true, seeded: 0, note: 'templates already present' });
  }
  const rows = seedTemplates().map((t) => ({
    id: t.id, key: t.key, category: t.category, title: t.title, body: t.body,
    requires_meta: t.requiresMeta, versions: t.versions, updated_at: t.updatedAt,
  }));
  const { error } = await getSupabase().from('will_templates').insert(rows);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, seeded: rows.length });
}
