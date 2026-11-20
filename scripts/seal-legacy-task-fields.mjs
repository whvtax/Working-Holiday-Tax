#!/usr/bin/env node
/**
 * One-time backfill (18 Nov): encrypts the TFN and bank_details of crm_tasks rows
 * written before field sealing was switched on. Same envelope and AAD as
 * src/lib/field-crypto.ts (tested against it in field-seal-18nov.test.ts).
 *
 * Usage (reads FIELD_ENC_KEYS, FIELD_ENC_ACTIVE, NEXT_PUBLIC_SUPABASE_URL,
 * SUPABASE_SERVICE_ROLE_KEY from the environment; prints counts only):
 *   node scripts/seal-legacy-task-fields.mjs            # dry run, writes nothing
 *   node scripts/seal-legacy-task-fields.mjs --apply    # writes
 */
import crypto from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

const APPLY = process.argv.includes('--apply');
const PREFIX = 'enc1';

function parseKeys(spec, active) {
  const keys = new Map();
  for (const part of spec.split(',').map((s) => s.trim()).filter(Boolean)) {
    const i = part.indexOf(':');
    const kid = part.slice(0, i);
    const key = Buffer.from(part.slice(i + 1), 'base64');
    if (key.length !== 32) throw new Error(`key ${kid} must decode to 32 bytes`);
    keys.set(kid, key);
  }
  if (!keys.has(active)) throw new Error('FIELD_ENC_ACTIVE is not in FIELD_ENC_KEYS');
  return keys;
}

function seal(plain, column, rowId, kid, key) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  cipher.setAAD(Buffer.from(JSON.stringify(['crm_tasks', column, rowId]), 'utf8'));
  const ct = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final(), cipher.getAuthTag()]);
  return `${PREFIX}:${kid}:${iv.toString('base64url')}:${ct.toString('base64url')}`;
}

const env = process.env;
if (!env.FIELD_ENC_KEYS || !env.FIELD_ENC_ACTIVE) throw new Error('FIELD_ENC_KEYS and FIELD_ENC_ACTIVE must be set');
const keys = parseKeys(env.FIELD_ENC_KEYS, env.FIELD_ENC_ACTIVE);
const activeKey = keys.get(env.FIELD_ENC_ACTIVE);
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const counts = { rows: 0, tfn: 0, bank_details: 0 };
for (const column of ['tfn', 'bank_details']) {
  let from = 0;
  for (;;) {
    const { data, error } = await sb.from('crm_tasks').select(`id, ${column}`).not(column, 'is', null).neq(column, '').order('id').range(from, from + 499);
    if (error) throw new Error(`read ${column} failed: ${error.message}`);
    if (!data || data.length === 0) break;
    for (const row of data) {
      const v = row[column];
      if (typeof v !== 'string' || v.startsWith(`${PREFIX}:`)) continue;
      counts[column]++;
      if (APPLY) {
        const { error: upErr } = await sb.from('crm_tasks').update({ [column]: seal(v, column, row.id, env.FIELD_ENC_ACTIVE, activeKey) }).eq('id', row.id);
        if (upErr) throw new Error(`update ${column} failed: ${upErr.message}`);
      }
    }
    counts.rows += data.length;
    if (data.length < 500) break;
    from += 500;
  }
}
// tfn_norm (migration 015) is a plain copy of the TFN digits that no code reads any more: clear it.
{
  const { count, error } = await sb.from('crm_tasks').select('id', { count: 'exact', head: true }).not('tfn_norm', 'is', null);
  if (error) throw new Error(`count tfn_norm failed: ${error.message}`);
  counts.tfn_norm_cleared = count ?? 0;
  if (APPLY && count) {
    const { error: e2 } = await sb.from('crm_tasks').update({ tfn_norm: null }).not('tfn_norm', 'is', null);
    if (e2) throw new Error(`clear tfn_norm failed: ${e2.message}`);
  }
}
console.log(APPLY ? 'APPLIED' : 'DRY RUN (nothing written)', JSON.stringify(counts));
