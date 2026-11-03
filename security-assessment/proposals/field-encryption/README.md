# Field-level encryption at rest (proposal; no live column is changed)

Code: `src/lib/field-crypto.ts` (applied, unused, 14 tests). AES-256-GCM, versioned key ids,
random 12-byte IV, AAD binds table, column and row id, so a ciphertext copied to another row
or column fails authentication. HMAC blind index (separate key) for duplicate detection.

## What it protects and what it does not
Protects: a database dump or backup, a Supabase dashboard viewer, SQL access, a leaked anon
credential, a misconfigured RLS flag. Does not protect: an attacker who holds the service-role
key AND the Vercel environment (the app can decrypt for them), a compromised staff session,
or data already sent to Anthropic/Meta. Do not tell customers "TFNs are encrypted" until the
backfill is verified (Privacy Policy s5 currently makes no encryption claim, keep it that way).

## Scope (columns)
crm_tasks: tfn, bank_details, dob, address, au_phone (optional), notes (passport line only: see 4).
crm_clients: dob. will_settings: the WhatsApp access token (`WA_TOKEN_KEY`, stored in plaintext today).
Not encrypted: names, email, WhatsApp number (searched with ILIKE; encrypting them breaks
search and the lead triggers). Not needed: tfn on Done rows (already blanked).

## Plan (each step independently shippable and reversible)
1. Keys. Generate 2 x 32 random bytes (`openssl rand -base64 32`): data key `k1`, index key.
   Vercel env (Production and Preview separately, never NEXT_PUBLIC): `FIELD_ENC_KEYS=k1:<b64>`,
   `FIELD_ENC_ACTIVE=k1`, `FIELD_INDEX_KEY=<b64>`. Store a sealed copy of the keys outside Vercel
   and outside Supabase (password manager vault). Losing the key loses the data.
2. Schema (migration 050, proposal, not run): add `tfn_hash text` and an index; keep columns TEXT
   (the envelope is a TEXT value, no type change). The old `tfn_norm` stays until step 6.
3. Dual-read code first (deploy, no behaviour change): `toTask`/`toClient` call
   `decryptField(v, {table,column,rowId}, ring, {allowPlaintext:true})`. Reads work for both forms.
4. Passport number lives inside `notes` as a "Passport No:" line, which `markTaskDone` strips with a
   regex. Move it to its own column `passport_no` (encrypted) before encrypting; until then it is
   plaintext inside notes. This is the one schema/UX change; staff view must show it from the new column.
5. Write path: `createTask` and the CRM edit routes call `encryptField` for the columns above and set
   `tfn_hash = blindIndex(tfn, 'tfn', ring)`. `findExistingClient` does not use TFN today, so no
   lookup change is needed beyond tfn_hash for the future duplicate check.
6. Backfill script (run locally against a restored copy first, then production in batches of 200,
   idempotent via `needsRewrap`): `rewrapField(value, ctx, ring)` per row, verify by decrypting and
   comparing to the old value in memory, only then UPDATE. Take a table export first.
7. Flip `allowPlaintext` to false so any forgotten plaintext write fails loudly. Null `tfn_norm`.
8. Rotation: add `k2`, set `FIELD_ENC_ACTIVE=k2`, run the same backfill (`needsRewrap`), then remove k1.
Rollback at any step before 7: the dual-read code still reads plaintext; keep the pre-backfill export
until the end of the retention window of the backups.

## Call sites to change (from grep, no values)
src/lib/db.ts (toTask, toClient, createTask, markTaskDone, updateClient), app/api/crm/tasks (POST/PATCH),
app/api/{tax-form,tfn-form,super-form,abn-form}/route.ts (they call createTask only),
DashboardClient.tsx (reads via API, no change), lib/seed.ts (dev only), lib/will/channel.ts saveWaCreds
(token), lib/will/store-supabase.ts getSetting for the token key.
Performance: decrypt cost is microseconds per field; list endpoints return 100 rows, fine.

## Risks to test in staging before production
Search by TFN in the CRM (does it exist? if so it must use tfn_hash), CSV export of leads/clients
(DOB), Will form-link and instant-choice code that reads dob/tfn (`lib/will/instant-choice.ts`,
`will-decides.ts`), key missing at runtime (the helper throws `no_key`: decide fail-closed vs
degrade for the CRM list view: recommend fail-closed with a clear staff banner).
